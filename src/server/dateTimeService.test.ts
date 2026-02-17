import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Server } from 'socket.io';
import {DateTimeService} from "./dateTimeService";
import {spyAllMethodsOf} from "../testing";

describe('date time service', () => {
    let dateTimeService: DateTimeService;
    let server: Server;

    beforeEach(() => {
        server = new Server();
        spyAllMethodsOf(server)

        dateTimeService = new DateTimeService(server);
        vi.useFakeTimers();
    })

    it('should initialize with default 1500 seconds', () => {
        expect(dateTimeService.seconds).toBe(1500);
        expect(dateTimeService.defaultSeconds).toBe(1500);
    });

    it('should decrement seconds and emit event when started', () => {
        dateTimeService.seconds = 10;
        dateTimeService.start();

        vi.advanceTimersByTime(1000);

        expect(dateTimeService.seconds).toBe(9);
        expect(server.emit).toHaveBeenCalledWith("updated_time", 9);
    });

    it('should not allow multiple intervals to run simultaneously', () => {
        dateTimeService.start();
        dateTimeService.start();

        vi.advanceTimersByTime(1000);

        expect(dateTimeService.seconds).toBe(1499);
    });

    it('should stop decrementing when paused', () => {
        dateTimeService.start();
        vi.advanceTimersByTime(1000);

        dateTimeService.pause();
        vi.advanceTimersByTime(2000);

        expect(dateTimeService.seconds).toBe(1499);
    });

    it('should automatically pause when reaching 0', () => {
        dateTimeService.seconds = 1;
        dateTimeService.start();

        vi.advanceTimersByTime(1000);
        expect(dateTimeService.seconds).toBe(0);

        vi.advanceTimersByTime(1000);
        expect(dateTimeService.seconds).toBe(0);
    });

    it('should reset to default value and emit update', () => {
        dateTimeService.seconds = 500;
        dateTimeService.reset();

        expect(dateTimeService.seconds).toBe(1500);
        expect(server.emit).toHaveBeenCalledWith("updated_time", 1500);
    });

    it('should update both current and default seconds', () => {
        const newTime = 3000;

        dateTimeService.updateSeconds(newTime);

        expect(dateTimeService.seconds).toBe(newTime);
        expect(dateTimeService.defaultSeconds).toBe(newTime);
        expect(server.emit).toHaveBeenCalledWith("updated_time", newTime);
    });

    afterEach(() => {
        vi.restoreAllMocks();
        vi.useRealTimers();
    });
})