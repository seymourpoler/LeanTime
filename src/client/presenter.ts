import {View} from "./view";
import {Service} from "./service";
import {Sound} from "./sound";

export class Presenter {
    private isShowSettings: boolean = true;

    constructor(private readonly view: View, private readonly service: Service, private readonly sound: Sound) {
        view.subscribeWhenStartIsRequested(this.onStartIsRequestedHandler);
        view.subscribeWhenPauseIsRequested(this.onStopIsRequestedHandler);
        view.subscribeWhenResetIsRequested(this.onResetIsRequestedHandler);
        view.subscribeWhenChangeThemeIsRequested(this.onChangeThemeIsRequestedHandler)
        view.subscribeWhenSettingsIsRequested(this.onSettingsIsRequestedHandler)
        view.subscribeWhenApplyTimeIsRequested(this.onApplyTimeIsRequestedHandler)
        service.subscribeWhenTimeIsUpdated(this.onTimeIsUpdatedHandler);
        view.hideSettings();
    }

    private onStartIsRequestedHandler = (): void => {
        this.service.start();
    }

    private onStopIsRequestedHandler = (): void => {
        this.service.pause();
    };

    private onResetIsRequestedHandler = (): void => {
        this.service.reset();
    };

    private onTimeIsUpdatedHandler = (time: number): void => {
        const minutes = Math.floor(time / 60);
        const seconds = time - minutes * 60;
        this.view.showTime(minutes, seconds);

        if(time === 0){
            this.sound.play();
            this.service.pause();
            return;
        }
    };

    private onChangeThemeIsRequestedHandler = (): void => {
        this.view.changeTheme();
    };

    private onSettingsIsRequestedHandler = (): void => {
        if(this.isShowSettings){
            this.isShowSettings = false;
            this.view.showSettings();
            return;
        }
        this.isShowSettings = true;
        this.view.hideSettings();
    };

    private onApplyTimeIsRequestedHandler = (minutes: number, seconds: number): void => {
        const totalSeconds = minutes * 60 + seconds;
        this.service.applyTime(totalSeconds);
    }
}