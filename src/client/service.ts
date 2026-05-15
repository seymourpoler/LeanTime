import { Socket } from 'socket.io-client';

export class Service {
    private readonly socket: Socket;

    constructor(socket: Socket){
        this.socket = socket
    }

    public joinTimer(timerId: string) : void {
        this.socket.emit('join_timer', timerId);
    }

    public start(timerId: string) : void {
        this.socket.emit('start_timer',{
            sender: this.socket.id || "Anonymous",
            timerId: timerId
        });
    }

    public subscribeWhenTimerIsUpdated(handler:(time: number)=>void) : void {
        this.socket.on('timer_updated', (time: number) => {
            handler(time);
        });
    }

    public subscribeWhenSettingsAreUpdated(handler:(time: number)=>void) : void {
        this.socket.on('settings_updated', (time:number) => {
            handler(time);
        });
    }

    public pause(timerId: string) : void {
        this.socket.emit('pause_timer',{
            sender: this.socket.id || "Anonymous",
            timerId: timerId
        });
    }

    public reset(timerId: string) : void {
        this.socket.emit('reset_timer',{
            sender: this.socket.id || "Anonymous",
            timerId: timerId
        });
    }

    public applyTime(timerId: string, seconds: number) : void {
        this.socket.emit('apply_timer', {
            sender: this.socket.id || "Anonymous",
            timerId: timerId,
            seconds: seconds
        });
    }
}