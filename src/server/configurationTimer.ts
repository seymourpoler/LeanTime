import {ServerToClient} from "./serverToClient";

type Timer = {
    timeLeft: number;
    interval?: NodeJS.Timeout;
    isRunning: boolean;
    configurationTime: number
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
                configurationTime: this.defaultNumberOfSeconds
            };
        }
        if (this.timers[timerId].interval) {
            clearInterval(this.timers[timerId].interval);
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

        timer.timeLeft = timer.configurationTime;

        if (timer.interval) {
            clearInterval(timer.interval);
            timer.interval = undefined;
        }
        this.serverToClient.timerUpdated(timerId, timer.configurationTime);
    }

    public apply(timerId: string, seconds: number): void {
        this.timers[timerId] = {
            timeLeft: seconds,
            isRunning: false,
            interval: undefined,
            configurationTime: seconds
        };
        if(seconds < 0){
            this.serverToClient.timerUpdated(timerId, 0);
            return;
        }
        this.serverToClient.timerUpdated(timerId, seconds);
    }

}