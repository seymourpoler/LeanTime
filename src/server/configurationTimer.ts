import {ServerToClient} from "./serverToClient.js";

type Timer = {
    timeLeft: number;
    interval?: NodeJS.Timeout;
    isRunning: boolean;
    time: number
};

export class ConfigurationTimer {
    private readonly defaultNumberOfSeconds: number = 1500;
    private readonly serverToClient: ServerToClient;
    private readonly timers: Record<string, Timer>;

    constructor(serverToClient: ServerToClient) {
        this.timers = {};
        this.serverToClient = serverToClient;
    }

    public start(timerId: string): void {
        if(!this.timers[timerId]){
            this.timers[timerId] = {
                timeLeft: this.defaultNumberOfSeconds,
                isRunning: false,
                interval: undefined,
                time: this.defaultNumberOfSeconds
            };
        }
        if (this.timers[timerId].interval) {
            clearInterval(this.timers[timerId].interval);
        }
        if (this.timers[timerId].timeLeft <= 0) {
            this.timers[timerId].timeLeft = this.timers[timerId].time;
        }
        this.timers[timerId].isRunning = true;

        const interval = setInterval(() => {
            const timer = this.timers[timerId];

            if (!timer || !timer.isRunning) return;

            timer.timeLeft--;

            this.serverToClient.timerUpdated(timerId, timer.timeLeft);

            if (timer.timeLeft <= 0) {
                clearInterval(interval);
                timer.isRunning = false;
            }
        }, 1000);

        this.timers[timerId].interval = interval;
    }

    public pause(timerId: string): void {
        const timer = this.timers[timerId];
        if (!timer || !timer.isRunning) return;

        timer.isRunning = false;

        if (timer.interval) {
            clearInterval(timer.interval);
            timer.interval = undefined;
        }
    }

    public reset(timerId: string): void {
        const timer = this.timers[timerId];
        if (!timer) return;

        timer.timeLeft = timer.time;

        if (timer.interval) {
            clearInterval(timer.interval);
            timer.interval = undefined;
        }
        this.serverToClient.timerUpdated(timerId, timer.time);
    }

    public apply(timerId: string, seconds: number): void {
        this.timers[timerId] = {
            timeLeft: seconds,
            isRunning: false,
            interval: undefined,
            time: seconds
        };
        if(seconds < 0){
            this.serverToClient.timerUpdated(timerId, 0);
            this.serverToClient.settingsUpdated(timerId, 0);
            return;
        }
        this.serverToClient.timerUpdated(timerId, seconds);
        this.serverToClient.settingsUpdated(timerId, seconds);
    }
}