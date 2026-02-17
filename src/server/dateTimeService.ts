import {Server} from "socket.io";

export class TimerService {
    private interval?: NodeJS.Timeout;

    public seconds: number = 1500;
    public defaultSeconds: number = 1500;

    constructor(private io: Server) {}

    public start(): void {
        if (this.seconds < 1 || this.interval) return;

        this.interval = setInterval(() => {
            this.seconds--;
            this.io.emit("updated_time", this.seconds);
            if (this.seconds <= 0) this.pause();
        }, 1000);
    }

    public pause(): void {
        if (!this.interval) return;

        clearInterval(this.interval);
        this.interval = undefined;
    }

    public reset(): void {
        this.pause();
        this.seconds = this.defaultSeconds;
        this.io.emit("updated_time", this.seconds);

        if (this.interval) {
            clearInterval(this.interval);
            this.interval = undefined;
        }
    }

    public updateSeconds(value: number): void {
        this.seconds = value;
        this.defaultSeconds = value;
        this.io.emit("updated_time", this.seconds);
    }
}