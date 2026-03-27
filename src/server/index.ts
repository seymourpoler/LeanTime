import express from 'express';
import { createServer as createHttpServer } from 'http';
import { Server } from 'socket.io';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import {DateTimeService} from "./dateTimeService.js";

async function bootstrap() {
    const app = express();
    const httpServer = createHttpServer(app);
    const io = new Server(httpServer);
    const dateTimeService = new DateTimeService(io);
    type RoomTimer = {
        timeLeft: number;
        interval?: NodeJS.Timeout;
        isRunning: boolean;
    };
    const roomTimers: Record<string, RoomTimer> = {};

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
        const duration: number = 1500;
        socket.on("start_timer", (args: {sender:string, roomId: string}) => {
            console.log(`User started: ${args.sender} in room ${args.roomId}`);
            if(!roomTimers[args.roomId]){
                roomTimers[args.roomId] = {
                    timeLeft: duration,
                    isRunning: false,
                    interval: undefined
                };
            }
            if (roomTimers[args.roomId]?.interval) {
                clearInterval(roomTimers[args.roomId].interval);
            }
            roomTimers[args.roomId].isRunning = true;

            const interval = setInterval(() => {
                const timer = roomTimers[args.roomId];

                if (!timer || !timer.isRunning) return;

                timer.timeLeft--;

                io.to(args.roomId).emit("timer_updated", timer.timeLeft);

                if (timer.timeLeft <= 0) {
                    clearInterval(interval);
                    timer.isRunning = false;
                }
            }, 1000);

            roomTimers[args.roomId].interval = interval;
        });

        socket.on("pause_timer", (args: {sender:string, roomId: string}) => {
            console.log(`User paused: ${args.sender} in room ${args.roomId}`);

            const timer = roomTimers[args.roomId];
            if (!timer || !timer.isRunning) return;

            timer.isRunning = false;

            if (timer.interval) {
                clearInterval(timer.interval);
                timer.interval = undefined;
            }
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