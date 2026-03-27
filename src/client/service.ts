import {io, Socket} from 'socket.io-client';

export class Service {
    private readonly socket: Socket;

    constructor(){
        this.socket = io();
    }

    public reset() : void {
        this.socket.emit('reset',{
            sender: this.socket.id || "Anonymous",
        });
    }

    public applyTime(seconds: number) : void {
        this.socket.emit('apply',seconds);
    }

    public joinRoom(roomId: string): void {
        this.socket.emit('join_room', roomId);
    }

    public start(roomId: string) : void {
        this.socket.emit('start_timer',{
            sender: this.socket.id || "Anonymous",
            roomId: roomId
        });
    }

    public subscribeWhenTimerIsUpdated(handler:(time: number)=>void):void {
        this.socket.on('timer_updated', (time: number) => {
            handler(time);
        });
    }

    public pause(roomId: string) : void {
        this.socket.emit('pause_timer',{
            sender: this.socket.id || "Anonymous",
            roomId: roomId
        });
    }
}