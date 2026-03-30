import {Server} from "socket.io";

export class ServerToClient {
    private readonly io: Server;

    constructor(io: Server) {
        this.io = io;
    }

    public timerUpdated(roomId: string, timeLeft: number) : void {
        this.io.to(roomId).emit("timer_updated", timeLeft);
    }
}

