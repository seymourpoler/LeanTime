import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());

let defaultNumberOfSeconds = 1500;
let numberOfSeconds = defaultNumberOfSeconds;
let timerInterval: NodeJS.Timeout | undefined = undefined;

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    }
});

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('start', (sender) =>{
        console.log(`User started: ${sender}`);

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

server.listen(3001, () => {
    console.log("Server running on port 3001");
});