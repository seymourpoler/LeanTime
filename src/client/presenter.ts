import { View } from "./view.js";
import { Presenter as TimerPresenter } from "../client/timer/presenter.js";
import { Presenter as TaskPresenter } from "../client/task/presenter.js";

export class Presenter {
  constructor(
    private readonly view: View,
    private readonly timerPresenter: TimerPresenter,
    private readonly taskPresenter: TaskPresenter,
  ) {
    view.subscribeWhenChangeThemeIsRequested(
      this.onChangeThemeIsRequestedHandler,
    );
    view.subscribeWhenShowTasksIsRequested(this.onShowTasksIsRequestedHandler);
    view.subscribeWhenShowTimerIsRequested(this.onShowTimerIsRequestedHandler);
    timerPresenter.show();
    taskPresenter.hide();
  }

  private onChangeThemeIsRequestedHandler = (): void => {
    this.view.changeTheme();
  };

  private onShowTasksIsRequestedHandler = (): void => {
    this.taskPresenter.show();
    this.timerPresenter.hide();
  };

  private onShowTimerIsRequestedHandler = (): void => {
    this.timerPresenter.show();
    this.taskPresenter.hide();
  };
}
