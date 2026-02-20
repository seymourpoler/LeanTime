import express from 'express';
import { createServer as createHttpServer } from 'http';
import { Server } from 'socket.io';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import {DateTimeService} from "./dateTimeService";

async function bootstrap() {
    const app = express();
    const httpServer = createHttpServer(app);
    const io = new Server(httpServer);
    const dateTimeService = new DateTimeService(io);

    io.on("connection", (socket) => {
        console.log(`User connected: ${socket.id}`);

        socket.on('start', (sender) => {
            console.log(`User started: ${sender}`);
            dateTimeService.start();
        });

        socket.on("pause", () => {
            console.log(`User pause: ${socket.id}`);
            dateTimeService.pause();
        });

        socket.on('reset', () => {
            console.log(`User reset: ${socket.id}`);
            dateTimeService.reset()
        });

        socket.on('apply', (time: number) => {
            console.log(`User apply: ${socket.id}`);
            console.log("time:", time);
            dateTimeService.updateSeconds(time);
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
        console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
}

bootstrap();