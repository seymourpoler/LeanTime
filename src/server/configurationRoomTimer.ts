import {ServerToClient} from "./serverToClient";

type RoomTimer = {
    timeLeft: number;
    interval?: NodeJS.Timeout;
    isRunning: boolean;
    configurationTime: number
};

export class ConfigurationRoomTimer {
    private readonly defaultNumberOfSeconds: number = 1500;
    private readonly serverToClient: ServerToClient;
    private readonly roomTimers: Record<string, RoomTimer>;

    constructor(serverToClient: ServerToClient) {
        this.roomTimers = {};
        this.serverToClient = serverToClient;
    }

    public start(roomId: string): void {
        if(!this.roomTimers[roomId]){
            this.roomTimers[roomId] = {
                timeLeft: this.defaultNumberOfSeconds,
                isRunning: false,
                interval: undefined,
                configurationTime: this.defaultNumberOfSeconds
            };
        }
        if (this.roomTimers[roomId]?.interval) {
            clearInterval(this.roomTimers[roomId].interval);
        }
        this.roomTimers[roomId].isRunning = true;

        const interval = setInterval(() => {
            const timer = this.roomTimers[roomId];

            if (!timer || !timer.isRunning) return;

            timer.timeLeft--;

            this.serverToClient.timerUpdated(roomId, timer.timeLeft);

            if (timer.timeLeft <= 0) {
                clearInterval(interval);
                timer.isRunning = false;
            }
        }, 1000);

        this.roomTimers[roomId].interval = interval;
    }

    public pause(roomId: string): void {
        const timer = this.roomTimers[roomId];
        if (!timer || !timer.isRunning) return;

        timer.isRunning = false;

        if (timer.interval) {
            clearInterval(timer.interval);
            timer.interval = undefined;
        }
    }

    public reset(roomId: string): void {
        const timer = this.roomTimers[roomId];
        if (!timer) return;

        timer.timeLeft = timer.configurationTime;

        if (timer.interval) {
            clearInterval(timer.interval);
            timer.interval = undefined;
        }
        this.serverToClient.timerUpdated(roomId, timer.configurationTime);
    }

    public apply(roomId: string, seconds: number): void {
        this.roomTimers[roomId] = {
            timeLeft: seconds,
            isRunning: false,
            interval: undefined,
            configurationTime: seconds
        };
        this.serverToClient.timerUpdated(roomId, seconds);
    }

}