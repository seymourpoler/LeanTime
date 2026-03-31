import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Service } from './service';

describe('Service', () => {
    let service: Service;
    let socket: any;

    beforeEach(() => {
        socket = {
            emit: vi.fn(),
            on: vi.fn(),
            id: 'test-socket-id'
        };
        service = new Service(socket);
    });

    it('joinRoom emits join_room with roomId', () => {
        service.joinRoom('roomA');

        expect(socket.emit).toHaveBeenCalledWith('join_room', 'roomA');
    });

    it('start emits start_timer with sender and roomId', () => {
        service.start('roomB');

        expect(socket.emit).toHaveBeenCalledWith('start_timer', {
            sender: 'test-socket-id',
            roomId: 'roomB'
        });
    });

    it('subscribeWhenTimerIsUpdated registers handler for timer_updated', () => {
        socket.on.mockImplementation((_event: string, cb: Function) => cb(42));
        const handler = vi.fn();

        service.subscribeWhenTimerIsUpdated(handler);

        expect(handler).toHaveBeenCalledWith(42);
    });

    it('pause emits pause_timer with sender and roomId', () => {
        service.pause('roomC');

        expect(socket.emit).toHaveBeenCalledWith('pause_timer', {
            sender: 'test-socket-id',
            roomId: 'roomC'
        });
    });

    it('reset emits reset_timer with sender and roomId', () => {
        service.reset('roomD');

        expect(socket.emit).toHaveBeenCalledWith('reset_timer', {
            sender: 'test-socket-id',
            roomId: 'roomD'
        });
    });

    it('applyTime emits apply_timer with sender, roomId, and seconds', () => {
        service.applyTime('roomE', 99);

        expect(socket.emit).toHaveBeenCalledWith('apply_timer', {
            sender: 'test-socket-id',
            roomId: 'roomE',
            seconds: 99
        });
    });
});
