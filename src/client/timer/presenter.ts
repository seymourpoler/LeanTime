import {View} from "./view.js";
import {Service} from "./service.js";
import {Sound} from "./sound.js";

export class Presenter {
    private isShowSettings: boolean = true;
    private totalSeconds: number = 1500;

    constructor(private readonly view: View, private readonly service: Service, private readonly sound: Sound) {
        view.subscribeWhenStartIsRequested(this.onStartIsRequestedHandler);
        view.subscribeWhenPauseIsRequested(this.onStopIsRequestedHandler);
        view.subscribeWhenResetIsRequested(this.onResetIsRequestedHandler);
        view.subscribeWhenChangeThemeIsRequested(this.onChangeThemeIsRequestedHandler)
        view.subscribeWhenSettingsIsRequested(this.onSettingsIsRequestedHandler)
        view.subscribeWhenApplyTimeIsRequested(this.onApplyTimeIsRequestedHandler)
        view.subscribeWhenVolumeIsChanged(this.onVolumeIsChangedHandler)
        service.subscribeWhenTimerIsUpdated(this.onTimerIsUpdatedHandler);
        sound.subscribeWhenSoundEnds(this.onSoundEndsHandler);
        view.hideSettings();

        this.view.showProgression(100);
        this.sound.setVolume(0.25);
        this.service.joinTimer(this.view.getTimerId());
    }

    private onStartIsRequestedHandler = (): void => {
        this.service.start(this.view.getTimerId());
    }

    private onStopIsRequestedHandler = (): void => {
        this.service.pause(this.view.getTimerId());
    };

    private onResetIsRequestedHandler = (): void => {
        this.service.reset(this.view.getTimerId());
    };

    private onTimerIsUpdatedHandler = (time: number): void => {
        const minutes = Math.floor(time / 60);
        const seconds = time - minutes * 60;
        this.view.showTime(minutes, seconds);
        this.view.showProgression(Math.max(0, Math.min(100, Math.round(100 * (time / this.totalSeconds)))));

        if(time === 0){
            this.sound.play();
            this.service.pause(this.view.getTimerId());
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
        this.totalSeconds = minutes * 60 + seconds;

        this.service.applyTime(this.view.getTimerId(), this.totalSeconds);
    };

    private onVolumeIsChangedHandler = (volume: number): void => {
        this.sound.setVolume(volume);
    };

    private onSoundEndsHandler = (): void => {
        this.service.reset(this.view.getTimerId());
    };
}