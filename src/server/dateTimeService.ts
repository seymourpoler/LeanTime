import {Server} from "socket.io";

export class DateTimeService {
    private interval?: NodeJS.Timeout;

    private seconds: number = 1500;
    private defaultSeconds: number = 1500;

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

    public updateNumberOfSeconds(value: number): void {
        this.seconds = value;
    }
    public getNumberOfSeconds(): number {
        return this.seconds;
    }

    public getDefaultNumberOfSeconds(): Number {
        return this.defaultSeconds;
    }
}