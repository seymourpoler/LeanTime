import { Socket } from 'socket.io-client';

export class Service {
    private readonly socket: Socket;

    constructor(socket: Socket){
        this.socket = socket
    }

    public joinRoom(roomId: string) : void {
        this.socket.emit('join_room', roomId);
    }

    public start(roomId: string) : void {
        this.socket.emit('start_timer',{
            sender: this.socket.id || "Anonymous",
            roomId: roomId
        });
    }

    public subscribeWhenTimerIsUpdated(handler:(time: number)=>void) : void {
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

    public reset(roomId: string) : void {
        this.socket.emit('reset_timer',{
            sender: this.socket.id || "Anonymous",
            roomId: roomId
        });
    }

    public applyTime(roomId: string, seconds: number) : void {
        this.socket.emit('apply_timer', {
            sender: this.socket.id || "Anonymous",
            roomId: roomId,
            seconds: seconds
        });
    }
}