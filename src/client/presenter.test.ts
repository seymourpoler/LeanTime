import {beforeEach, describe, expect, it} from "vitest";
import {spyAllMethodsOf} from "../testing";
import {View} from "./view";
import {Service} from "./service";
import {Presenter} from "./presenter";
import {Sound} from "./sound";

describe('Presenter', () => {
    let view : View;
    let service: Service;
    let sound: Sound;

    beforeEach(() =>{
        view = new View();
        spyAllMethodsOf(view);
        service = new Service();
        spyAllMethodsOf(service);
        sound = new Sound();
        spyAllMethodsOf(sound);
    });

    describe("When Start is requested", () => {
        it('Starts', () =>{
            let onStartIsRequestedHandler = () =>{};
            (view.subscribeWhenStartIsRequested as any).mockImplementation((handler: any) => {
                onStartIsRequestedHandler = handler;
            });
            new Presenter(view, service, sound);

            onStartIsRequestedHandler();

            expect(service.start).toHaveBeenCalled();
        });
    });

    describe("When Pause is requested", () => {
        it('Pauses', () =>{
            let onPauseIsRequestedHandler = () =>{};
            (view.subscribeWhenPauseIsRequested as any).mockImplementation((handler: any) => {
                onPauseIsRequestedHandler = handler;
            });
            new Presenter(view, service, sound);

            onPauseIsRequestedHandler();

            expect(service.pause).toHaveBeenCalled();
        });
    });

    describe("When Reset is requested", () => {
        it('Resets', () =>{
            let onResetIsRequestedHandler = () =>{};
            (view.subscribeWhenResetIsRequested as any).mockImplementation((handler: any) => {
                onResetIsRequestedHandler = handler;
            });
            new Presenter(view, service, sound);

            onResetIsRequestedHandler();

            expect(service.reset).toHaveBeenCalled();
        });
    });

    describe("When Apply time is requested", () => {
        it('Applies', () =>{
            let onApplyTimeIsRequestedHandler = (minutes: number, seconds: number) =>{};
            (view.subscribeWhenApplyTimeIsRequested as any).mockImplementation((handler: any) => {
                onApplyTimeIsRequestedHandler = handler;
            });
            new Presenter(view, service, sound);

            onApplyTimeIsRequestedHandler(25, 15);

            expect(service.applyTime).toHaveBeenCalledWith(1515);
        })
    })

    describe("When timer is updated", () => {
        describe("When timer is updated", () => {
            it('shows the time', () => {
                let onTimerIsUpdatedHandler: any;
                (service.subscribeWhenTimeIsUpdated as any).mockImplementation((handler: any) => {
                    onTimerIsUpdatedHandler = handler;
                });
                new Presenter(view, service, sound);

                onTimerIsUpdatedHandler(25, 0);

                expect(view.showTime).toHaveBeenCalled();
            });
        });
    });

    describe("When the time is up", () => {
        it('sounds the alarm', () => {
            let onTimerIsUpdatedHandler: any;
            (service.subscribeWhenTimeIsUpdated as any).mockImplementation((handler: any) => {
                onTimerIsUpdatedHandler = handler;
            });
            new Presenter(view, service, sound);

            onTimerIsUpdatedHandler(0, 0);

            expect(view.showTime).toHaveBeenCalledWith(0, 0);
            expect(sound.play).toHaveBeenCalled();
            expect(service.pause).toHaveBeenCalled();
        })
    })

    describe("When change theme is requested", () => {
        it('changes the theme', () => {
            let onChangeThemeIsRequestedHandler: any;
            (view.subscribeWhenChangeThemeIsRequested as any).mockImplementation((handler: any) => {
                onChangeThemeIsRequestedHandler = handler;
            });
            new Presenter(view, service, sound);

            onChangeThemeIsRequestedHandler();

            expect(view.changeTheme).toHaveBeenCalled();
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
});