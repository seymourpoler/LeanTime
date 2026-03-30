import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ConfigurationRoomTimer } from './configurationRoomTimer';

describe('ConfigureRoomTimer', () => {
    let timer: ConfigurationRoomTimer;
    const serverToClient = { timerUpdated: vi.fn() } as any;
    const roomId = 'room1';

    beforeEach(() => {
        timer = new ConfigurationRoomTimer(serverToClient);
    });


    it('pause stops the timer and clears interval', () => {
        timer.pause(roomId);

        expect(serverToClient.timerUpdated).not.toHaveBeenCalled();
    });

    it('apply sets new configuration and resets timer', () => {
        timer.apply(roomId, 42);

        expect(serverToClient.timerUpdated).toHaveBeenCalledWith(roomId, 42);
    });

    it('start initializes timer if not present and starts interval', () => {
        vi.useFakeTimers();

        timer.start(roomId);

        expect(serverToClient.timerUpdated).toHaveBeenCalled();
        vi.runOnlyPendingTimers();
    });

    it('start resets and restarts interval if already present', () => {
        vi.useFakeTimers();
        timer.start(roomId);

        vi.advanceTimersByTime(1000);

        expect(serverToClient.timerUpdated).toHaveBeenCalled();
        vi.runOnlyPendingTimers();
    });

    it('timer decrements timeLeft and emits timerUpdated, stops at zero', () => {
        vi.useFakeTimers();
        timer.apply(roomId, 2);
        timer.start(roomId);
        vi.advanceTimersByTime(1000);

        expect(serverToClient.timerUpdated).toHaveBeenCalledWith(roomId, 1);
        vi.advanceTimersByTime(1000);

        expect(serverToClient.timerUpdated).toHaveBeenCalledWith(roomId, 0);
        vi.advanceTimersByTime(1000);
        expect(serverToClient.timerUpdated).toHaveBeenCalledTimes(7);
    });

    afterEach(() => {
        vi.useRealTimers();
    });
});
