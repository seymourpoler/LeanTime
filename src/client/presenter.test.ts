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

    describe("When application is loaded", () =>{
        it('start a new room', () =>{
            (view.getRoomId as any).mockReturnValue("test");

            new Presenter(view, service, sound);

            expect(service.joinRoom).toHaveBeenCalledWith("test");
        })
    })

    describe("When Start is requested", () => {
        it('starts', () => {
            let onStartIsRequestedHandler = () =>{};
            (view.subscribeWhenStartIsRequested as any).mockImplementation((handler: any) => {
                onStartIsRequestedHandler = handler;
            });
            (view.getRoomId as any).mockReturnValue("test");
            new Presenter(view, service, sound);

            onStartIsRequestedHandler();

            expect(service.start).toHaveBeenCalledWith("test");
        })
    });

    describe("When Pause is requested", () => {
        it('Pauses', () =>{
            let onPauseIsRequestedHandler = () =>{};
            (view.subscribeWhenPauseIsRequested as any).mockImplementation((handler: any) => {
                onPauseIsRequestedHandler = handler;
            });
            (view.getRoomId as any).mockReturnValue("test");
            new Presenter(view, service, sound);

            onPauseIsRequestedHandler();

            expect(service.pause).toHaveBeenCalledWith("test");
        });
    });

    describe("When Reset is requested", () => {
        it('Resets', () =>{
            let onResetIsRequestedHandler = () =>{};
            (view.subscribeWhenResetIsRequested as any).mockImplementation((handler: any) => {
                onResetIsRequestedHandler = handler;
            });
            (view.getRoomId as any).mockReturnValue("test");
            new Presenter(view, service, sound);

            onResetIsRequestedHandler();

            expect(service.reset).toHaveBeenCalledWith("test");
        });
    });

    describe("When Apply time is requested", () => {
        it('Applies', () =>{
            let onApplyTimeIsRequestedHandler = (minutes: number, seconds: number) =>{};
            (view.subscribeWhenApplyTimeIsRequested as any).mockImplementation((handler: any) => {
                onApplyTimeIsRequestedHandler = handler;
            });
            (view.getRoomId as any).mockReturnValue("test");
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
            (view.getRoomId as any).mockReturnValue("test");
            new Presenter(view, service, sound);
        })

        it('shows the time', () => {

            onTimerIsUpdatedHandler(25, 0);

            expect(view.showTime).toHaveBeenCalled();
        });

        describe("When the time is up", () => {
            it('sounds the alarm', () => {
                onTimerIsUpdatedHandler(0, 0);

                expect(view.showTime).toHaveBeenCalledWith(0, 0);
                expect(sound.play).toHaveBeenCalled();
                expect(service.pause).toHaveBeenCalledWith("test");
            })
        })
    });

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