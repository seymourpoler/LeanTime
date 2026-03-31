import express from 'express';
import { createServer as createHttpServer } from 'http';
import { Server } from 'socket.io';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { ServerToClient } from './serverToClient';
import { ConfigurationTimer } from "./configurationTimer";

async function bootstrap() {
    const app = express();
    const httpServer = createHttpServer(app);
    const io = new Server(httpServer);
    const serverToClient = new ServerToClient(io);
    const configurationTimer = new ConfigurationTimer(serverToClient);

    io.on("connection", (socket) => {
        console.log(`User connected: ${socket.id}`);

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });

        socket.on("join_room", (roomId: string) => {
            socket.join(roomId);
            console.log(`${socket.id} joined ${roomId}`);
        });

        socket.on("leave_room", (roomId: string) => {
            socket.leave(roomId);
        });

        // type StartTimerArgs = {
        //     sender: string;
        //     roomId: string;
        // };
        socket.on("start_timer", (args: {sender:string, roomId: string}) => {
            console.log(`User started: ${args.sender} in room ${args.roomId}`);

            configurationTimer.start(args.roomId);
        });

        socket.on("pause_timer", (args: {sender:string, roomId: string}) => {
            console.log(`User paused: ${args.sender} in room ${args.roomId}`);

            configurationTimer.pause(args.roomId);
        });

        socket.on('reset_timer', (args: {sender:string, roomId: string}) => {
            console.log(`User reset: ${args.sender} in room ${args.roomId}`);

            configurationTimer.reset(args.roomId);
        });

        socket.on('apply_timer', (args: {sender:string, roomId: string, seconds: number}) => {
            console.log(`User reset: ${args.sender} in room ${args.roomId} with time ${args.seconds}`);

            configurationTimer.apply(args.roomId, args.seconds);
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