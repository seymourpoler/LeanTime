import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ServerToClient } from './serverToClient';

describe('ServerToClient', () => {
    let io: any;
    let serverToClient: ServerToClient;

    beforeEach(() => {
        io = {
            to: vi.fn().mockReturnThis(),
            emit: vi.fn()
        };
        serverToClient = new ServerToClient(io);
    });

    it('should emit timer_updated event with correct arguments', () => {
        serverToClient.timerUpdated('room42', 123);

        expect(io.to).toHaveBeenCalledWith('room42');
        expect(io.emit).toHaveBeenCalledWith('timer_updated', 123);
    });
});
