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
        expect(dateTimeService.getNumberOfSeconds()).toBe(1500);
        expect(dateTimeService.getDefaultNumberOfSeconds()).toBe(1500);
    });

    describe('when started', () => {
        it('should emit event', () => {
            dateTimeService.start();

            vi.advanceTimersByTime(1000);

            expect(server.emit).toHaveBeenCalledWith("updated_time", 1499);
        });

        it('should not allow multiple intervals to run simultaneously', () => {
            dateTimeService.start();
            dateTimeService.start();

            vi.advanceTimersByTime(1000);

            expect(dateTimeService.getNumberOfSeconds()).toBe(1499);
        });
    })

    describe('when paused', () => {
        it('should stop decrementing', () => {
            dateTimeService.start();
            vi.advanceTimersByTime(1000);

            dateTimeService.pause();
            vi.advanceTimersByTime(2000);

            expect(dateTimeService.getNumberOfSeconds()).toBe(1499);
        });
    })

    describe('when the time is up', () => {
        it('should automatically pause', () => {
            dateTimeService.updateNumberOfSeconds( 1);
            dateTimeService.start();

            vi.advanceTimersByTime(1000);
            expect(dateTimeService.getNumberOfSeconds()).toBe(0);

            vi.advanceTimersByTime(1000);
            expect(dateTimeService.getNumberOfSeconds()).toBe(0);
        });
    })

    describe('when reset', () => {
        it('should reset to default value and emit update', () => {
            dateTimeService.updateNumberOfSeconds(500);

            dateTimeService.reset();

            expect(dateTimeService.getNumberOfSeconds()).toBe(1500);
            expect(server.emit).toHaveBeenCalledWith("updated_time", 1500);
        });
    })

    it('should update both current and default seconds', () => {
        const newTime = 3000;

        dateTimeService.updateSeconds(newTime);

        expect(dateTimeService.getNumberOfSeconds()).toBe(newTime);
        expect(dateTimeService.getDefaultNumberOfSeconds()).toBe(newTime);
        expect(server.emit).toHaveBeenCalledWith("updated_time", newTime);
    });

    afterEach(() => {
        vi.restoreAllMocks();
        vi.useRealTimers();
    });
})