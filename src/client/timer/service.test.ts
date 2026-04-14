import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Service } from './service.js';

describe('Service', () => {
    let service: Service;
    let socket: any;

    beforeEach(() => {
        socket = {
            emit: vi.fn(),
            on: vi.fn(),
            id: 'a-socket-id'
        };
        service = new Service(socket);
    });

    it('joinTimer emits join_timer with timerId', () => {
        service.joinTimer('a-timer');

        expect(socket.emit).toHaveBeenCalledWith('join_timer', 'a-timer');
    });

    it('start emits start_timer with sender and timerId', () => {
        service.start('a-timer');

        expect(socket.emit).toHaveBeenCalledWith('start_timer', {
            sender: 'a-socket-id',
            timerId: 'a-timer'
        });
    });

    it('subscribeWhenTimerIsUpdated registers handler for timer_updated', () => {
        const handler = vi.fn();
        socket.on.mockImplementation((_event: string, cb: Function) => cb(42));

        service.subscribeWhenTimerIsUpdated(handler);

        expect(handler).toHaveBeenCalledWith(42);
    });

    it('pause emits pause_timer with sender and timerId', () => {
        service.pause('a-timer');

        expect(socket.emit).toHaveBeenCalledWith('pause_timer', {
            sender: 'a-socket-id',
            timerId: 'a-timer'
        });
    });

    it('reset emits reset_timer with sender and timerId', () => {
        service.reset('a-timer');

        expect(socket.emit).toHaveBeenCalledWith('reset_timer', {
            sender: 'a-socket-id',
            timerId: 'a-timer'
        });
    });

    it('applyTime emits apply_timer with sender, timerId, and seconds', () => {
        service.applyTime('a-timer', 99);

        expect(socket.emit).toHaveBeenCalledWith('apply_timer', {
            sender: 'a-socket-id',
            timerId: 'a-timer',
            seconds: 99
        });
    });
});
