import express from 'express';
import { createServer as createHttpServer } from 'http';
import { Server } from 'socket.io';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import {TimerService} from "./dateTimeService";

async function bootstrap() {
    let defaultNumberOfSeconds = 1500;
    let numberOfSeconds = defaultNumberOfSeconds;

    const app = express();
    const httpServer = createHttpServer(app);
    const io = new Server(httpServer);
    const timerService = new TimerService(io);

    io.on("connection", (socket) => {
        console.log(`User connected: ${socket.id}`);

        socket.on('start', (sender) => {
            console.log(`User started: ${sender}`);
            timerService.start();
        });

        socket.on("pause", () => {
            console.log(`User pause: ${socket.id}`);
            timerService.pause();
        });

        socket.on('reset', () => {
            console.log(`User reset: ${socket.id}`);
            timerService.reset()
        });

        socket.on('apply', (time: number) => {
            console.log(`User apply: ${socket.id}`);
            console.log("time:", time);
            timerService.updateDefaultSeconds(time);
            timerService.updateSeconds(time);
            io.emit("updated_time", timerService.seconds);
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