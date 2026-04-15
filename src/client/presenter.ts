import {View} from "./view.js";
import{ Presenter as TimerPresenter } from '../client/timer/presenter.js';
import{ Presenter as TaskPresenter } from '../client/task/presenter.js';

export class Presenter {
    constructor(private readonly view: View, private readonly timerPresenter: TimerPresenter, private readonly taskPresenter: TaskPresenter) {
        view.subscribeWhenChangeThemeIsRequested(this.onChangeThemeIsRequestedHandler)
        timerPresenter.show()
    }

    private onChangeThemeIsRequestedHandler = (): void => {
        this.view.changeTheme();
    };

    public show(): void {
        throw new Error('Method not implemented.');
    }
}