import express from 'express';
import { createServer as createHttpServer } from 'http';
import { Server } from 'socket.io';
import { createServer as createViteServer } from 'vite';
import path from 'path';

async function bootstrap() {
    let defaultNumberOfSeconds = 1500;
    let numberOfSeconds = defaultNumberOfSeconds;
    let timerInterval: NodeJS.Timeout | undefined = undefined;

    const app = express();
    const httpServer = createHttpServer(app);
    const io = new Server(httpServer);

    io.on("connection", (socket) => {
        console.log(`User connected: ${socket.id}`);

        socket.on('start', (sender) => {
            console.log(`User started: ${sender}`);

            if(numberOfSeconds < 1){
                console.log("The time is up, ignoring start request");
                if (timerInterval) {
                    clearInterval(timerInterval);
                    timerInterval = undefined;
                    console.log("Timer paused successfully");
                }
                return;
            }

            if (timerInterval) {
                console.log("Timer already running, ignoring start request");
                return;
            }

            timerInterval = setInterval(() => {
                numberOfSeconds--;
                io.emit("updated_time", numberOfSeconds);
            }, 1000);
        });

        socket.on("pause", () => {
            console.log(`User pause: ${socket.id}`);
            if (timerInterval) {
                clearInterval(timerInterval);
                timerInterval = undefined;
                console.log("Timer paused successfully");
            }
        });

        socket.on('reset', () => {
            console.log(`User reset: ${socket.id}`);
            if (timerInterval) {
                clearInterval(timerInterval);
                timerInterval = undefined;
            }
            numberOfSeconds = defaultNumberOfSeconds;
            io.emit("updated_time", numberOfSeconds);
        });

        socket.on('apply', (time: number) => {
            console.log(`User apply: ${socket.id}`);
            console.log("time:", time);
            numberOfSeconds = time;
            defaultNumberOfSeconds = time;
            io.emit("updated_time", numberOfSeconds);
        });
    });

    if (process.env.NODE_ENV !== 'production') {
        // In Dev: Vite handles the frontend requests as middleware
        const vite = await createViteServer({
            server: { middlewareMode: true },
            appType: 'spa'
        });
        app.use(vite.middlewares);
    } else {
        // In Prod: Serve the built files
        const distPath = path.resolve(process.cwd(), 'dist');
        app.use(express.static(distPath));
    }

    const PORT = 3000;
    httpServer.listen(PORT, () => {
        console.log(`🚀 Unified server running at http://localhost:${PORT}`);
    });
}

bootstrap();