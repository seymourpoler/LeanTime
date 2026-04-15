import {beforeEach, describe, expect, it, vi} from "vitest";
import {spyAllMethodsOf} from "../../testing.js";
import {View} from "./view.js";
import {Service} from "./service.js";
import {Presenter} from "./presenter.js";
import {Sound} from "./sound.js";
import {Socket} from "socket.io-client";

describe('Presenter', () => {
    let view : View;
    let service: Service;
    let sound: Sound;
    const socket = {} as Socket;

    beforeEach(() =>{
        class MockAudio {
            play = vi.fn();
            volume = 1;
            constructor() {}
        }
        // @ts-ignore
        globalThis.Audio = MockAudio as any;

        view = new View();
        spyAllMethodsOf(view);
        service = new Service(socket);
        spyAllMethodsOf(service);
        sound = new Sound();
        spyAllMethodsOf(sound);
    });

    describe("When application is loaded", () =>{
        it('start a new room', () =>{
            (view.getTimerId as any).mockReturnValue("test");

            new Presenter(view, service, sound);

            expect(service.joinTimer).toHaveBeenCalledWith("test");
        });

        it('initializes the progress bar', () => {
            new Presenter(view, service, sound);

            expect(view.showProgression).toHaveBeenCalledWith(100);
        })

        it('initializes the volume to 25%', () => {
            new Presenter(view, service, sound);

            expect(sound.setVolume).toHaveBeenCalledWith(0.25);
        })
    })

    describe("When Start is requested", () => {
        it('starts', () => {
            let onStartIsRequestedHandler = () =>{};
            (view.subscribeWhenStartIsRequested as any).mockImplementation((handler: any) => {
                onStartIsRequestedHandler = handler;
            });
            (view.getTimerId as any).mockReturnValue("test");
            new Presenter(view, service, sound);

            onStartIsRequestedHandler();

            expect(service.start).toHaveBeenCalledWith("test");
        })
    })

    describe("When Pause is requested", () => {
        it('Pauses', () =>{
            let onPauseIsRequestedHandler = () =>{};
            (view.subscribeWhenPauseIsRequested as any).mockImplementation((handler: any) => {
                onPauseIsRequestedHandler = handler;
            });
            (view.getTimerId as any).mockReturnValue("test");
            new Presenter(view, service, sound);

            onPauseIsRequestedHandler();

            expect(service.pause).toHaveBeenCalledWith("test");
        });
    })

    describe("When Reset is requested", () => {
        it('Resets', () =>{
            let onResetIsRequestedHandler = () =>{};
            (view.subscribeWhenResetIsRequested as any).mockImplementation((handler: any) => {
                onResetIsRequestedHandler = handler;
            });
            (view.getTimerId as any).mockReturnValue("test");
            new Presenter(view, service, sound);

            onResetIsRequestedHandler();

            expect(service.reset).toHaveBeenCalledWith("test");
        });
    })

    describe("When Apply time is requested", () => {
        it('Applies', () =>{
            let onApplyTimeIsRequestedHandler = (minutes: number, seconds: number) =>{};
            (view.subscribeWhenApplyTimeIsRequested as any).mockImplementation((handler: any) => {
                onApplyTimeIsRequestedHandler = handler;
            });
            (view.getTimerId as any).mockReturnValue("test");
            new Presenter(view, service, sound);

            onApplyTimeIsRequestedHandler(25, 15);

            expect(service.applyTime).toHaveBeenCalledWith("test", 1515);
        })
    })

    describe("When time is updated", () => {
        let onTimerIsUpdatedHandler: any;

        beforeEach(() =>{
            (service.subscribeWhenTimerIsUpdated as any).mockImplementation((handler: any) => {
                onTimerIsUpdatedHandler = handler;
            });
            (view.getTimerId as any).mockReturnValue("test");
            new Presenter(view, service, sound);
        })

        it('shows the time', () => {
            onTimerIsUpdatedHandler(25, 0);

            expect(view.showTime).toHaveBeenCalled();
        })

        it('updates progress bar to 100% when time equals totalSeconds (default 1500)', () => {
            // 1500 out of 1500 should be 100%
            onTimerIsUpdatedHandler(1500);
            expect(view.showProgression).toHaveBeenCalledWith(100);
        });

        it('updates progress bar to ~50% when time equals half totalSeconds (default 750)', () => {
            onTimerIsUpdatedHandler(750);
            expect(view.showProgression).toHaveBeenCalledWith(50);
        });

        it('updates progress bar to 0% when time is 0', () => {
            onTimerIsUpdatedHandler(0);
            expect(view.showProgression).toHaveBeenCalledWith(0);
        });

        it('updates progress bar at an arbitrary value (e.g. 375/1500 = 25%)', () => {
            onTimerIsUpdatedHandler(375);
            expect(view.showProgression).toHaveBeenCalledWith(25);
        });

        describe("When the time is up", () => {
            it('sounds the alarm', () => {
                onTimerIsUpdatedHandler(0, 0);

                expect(view.showTime).toHaveBeenCalledWith(0, 0);
                expect(sound.play).toHaveBeenCalled();
                expect(service.pause).toHaveBeenCalledWith("test");
            })
        })
    })

    describe("When showing settings is requested", () => {
        it('shows settings', () =>{
            let onSettingsIsRequestedHandler: any;
            (view.subscribeWhenSettingsIsRequested as any).mockImplementation((handler: any) => {
                onSettingsIsRequestedHandler = handler;
            });
            new Presenter(view, service, sound);

            onSettingsIsRequestedHandler();

            expect(view.showSettings).toHaveBeenCalled();
        });
    })

    describe('when hiding settings is requested', () => {
        it('hides settings', () =>{
            let onSettingsIsRequestedHandler: any;
            (view.subscribeWhenSettingsIsRequested as any).mockImplementation((handler: any) => {
                onSettingsIsRequestedHandler = handler;
            });
            new Presenter(view, service, sound);

            onSettingsIsRequestedHandler();
            onSettingsIsRequestedHandler();

            expect(view.showSettings).toHaveBeenCalled();
            expect(view.hideSettings).toHaveBeenCalled();
        })
    })

    describe("When volume is changed", () => {
        it("delegates the new volume to the sound", () => {
            let onVolumeIsChangedHandler: (volume: number) => void = () => {};
            (view.subscribeWhenVolumeIsChanged as any).mockImplementation((handler: any) => {
                onVolumeIsChangedHandler = handler;
            });
            new Presenter(view, service, sound);

            onVolumeIsChangedHandler(0.4);

            expect(sound.setVolume).toHaveBeenCalledWith(0.4);
        });
    })

    describe("When sound ends", () => {
        it("resets the timer so the configured time is shown again", () => {
            let onSoundEndsHandler: () => void = () => {};
            (sound.subscribeWhenSoundEnds as any).mockImplementation((handler: any) => {
                onSoundEndsHandler = handler;
            });
            (view.getTimerId as any).mockReturnValue("test");
            new Presenter(view, service, sound);

            onSoundEndsHandler();

            expect(service.reset).toHaveBeenCalledWith("test");
        });
    })
});