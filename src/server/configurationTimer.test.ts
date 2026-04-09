import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ConfigurationTimer } from './configurationTimer.js';

describe('ConfigurationTimer', () => {
    let timer: ConfigurationTimer;
    const serverToClient = { timerUpdated: vi.fn() } as any;
    const timerId = 'timer1';

    beforeEach(() => {
        timer = new ConfigurationTimer(serverToClient);
        serverToClient.timerUpdated.mockClear();
    });

    it('pause stops the timer and clears interval', () => {
        timer.pause(timerId);

        expect(serverToClient.timerUpdated).not.toHaveBeenCalled();
    });

    it('apply sets new configuration and resets timer', () => {
        timer.apply(timerId, 42);

        expect(serverToClient.timerUpdated).toHaveBeenCalledWith(timerId, 42);
    });

    it('start initializes timer if not present and but not starting interval', () => {
        vi.useFakeTimers();

        timer.start(timerId);

        expect(serverToClient.timerUpdated).not.toHaveBeenCalled();
    });

    it('start resets and restarts interval if already present', () => {
        vi.useFakeTimers();

        timer.start(timerId);
        vi.advanceTimersByTime(1000);

        expect(serverToClient.timerUpdated).toHaveBeenCalled();
    });

    it('timer decrements timeLeft and emits timerUpdated, stops at zero', () => {
        vi.useFakeTimers();

        timer.apply(timerId, 2);
        timer.start(timerId);
        vi.advanceTimersByTime(1000);

        expect(serverToClient.timerUpdated).toHaveBeenCalledWith(timerId, 1);
        vi.advanceTimersByTime(1000);
        expect(serverToClient.timerUpdated).toHaveBeenCalledWith(timerId, 0);
        vi.advanceTimersByTime(1000);
        expect(serverToClient.timerUpdated).toHaveBeenCalledTimes(3);
    });

    it('reset on non-existent timer does nothing', () => {
        timer.reset('no-timer');

        expect(serverToClient.timerUpdated).not.toHaveBeenCalled();
    });

    it('pause on non-existent timer does nothing', () => {
        timer.pause('no-timer');

        expect(serverToClient.timerUpdated).not.toHaveBeenCalled();
    });

    it('start on timer already at 0 restarts from the configured time', () => {
        vi.useFakeTimers();
        timer.apply(timerId, 3);

        timer.start(timerId);
        vi.advanceTimersByTime(3000);   // timer reaches 0 and stops
        serverToClient.timerUpdated.mockClear();

        timer.start(timerId);           // user hits play again — must restart from 3, not go to -1
        vi.advanceTimersByTime(1000);

        expect(serverToClient.timerUpdated).toHaveBeenCalledWith(timerId, 2);
        expect(serverToClient.timerUpdated).not.toHaveBeenCalledWith(timerId, -1);
    });

    it('apply with negative seconds sets timer to negative value', () => {
        timer.apply(timerId, -10);

        expect(serverToClient.timerUpdated).toHaveBeenCalledWith(timerId, 0);
    });

    it('apply with zero seconds sets timer to 0', () => {
        timer.apply(timerId, 0);

        expect(serverToClient.timerUpdated).toHaveBeenCalledWith(timerId, 0);
    });

    it('start, pause, then start again resumes timer', () => {
        vi.useFakeTimers();
        timer.apply(timerId, 3);
        timer.start(timerId);
        vi.advanceTimersByTime(1000);
        timer.pause(timerId);
        vi.advanceTimersByTime(2000);
        timer.start(timerId);
        vi.advanceTimersByTime(1000);

        expect(serverToClient.timerUpdated).toHaveBeenCalledWith(timerId, 1);
    });

    it('start, apply, then start again uses new configuration', () => {
        vi.useFakeTimers();
        timer.start(timerId);
        timer.apply(timerId, 5);
        timer.start(timerId);
        vi.advanceTimersByTime(1000);

        expect(serverToClient.timerUpdated).toHaveBeenCalledWith(timerId, 4);
    });

    it('reset sets timer to configurationTime', () => {
        timer.apply(timerId, 7);
        timer.reset(timerId);
        expect(serverToClient.timerUpdated).toHaveBeenCalledWith(timerId, 7);
    });

    afterEach(() => {
        vi.useRealTimers();
    });
});
