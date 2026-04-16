import { Socket } from "socket.io-client";
import { describe, beforeEach, it, expect, vi } from "vitest";
import { View } from "./view.js";
import { Presenter } from "./presenter.js";
import { Presenter as TimerPresenter } from "../client/timer/presenter.js";
import { View as TimerView } from "../client/timer/view.js";
import { Service as TimerService } from "../client/timer/service.js";
import { Sound } from "../client/timer/sound.js";
import { Presenter as TaskPresenter } from "../client/task/presenter.js";
import { View as TaskView } from "../client/task/view.js";
import { Service as TaskService } from "../client/task/service.js";
import { spyAllMethodsOf } from "../testing.js";

// @ts-ignore
globalThis.Audio = class {
  volume = 0.25;
  constructor() {}
};

describe("Presenter", () => {
  let taskPresenter: TaskPresenter;
  let timerPresenter: TimerPresenter;
  let view: View;

  beforeEach(() => {
    view = new View();
    spyAllMethodsOf(view);

    // @ts-ignore
    const socket = {} as Socket;
    const timerService = new TimerService(socket);
    spyAllMethodsOf(timerService);
    const sound = new Sound();
    spyAllMethodsOf(sound);
    const timerView = new TimerView();
    spyAllMethodsOf(timerView);
    timerPresenter = new TimerPresenter(timerView, timerService, sound);
    spyAllMethodsOf(timerPresenter);

    const taskService = new TaskService();
    spyAllMethodsOf(taskService);
    const taskView = new TaskView();
    spyAllMethodsOf(taskView);
    taskPresenter = new TaskPresenter(taskView, taskService);
    spyAllMethodsOf(taskPresenter);
  });

  describe("when loads", () => {
    it("Should show timer", () => {
      new Presenter(view, timerPresenter, taskPresenter);

      expect(timerPresenter.show).toHaveBeenCalled();
      expect(taskPresenter.hide).toHaveBeenCalled();
    });
  });

  describe("When show tasks is requested", () => {
    it("shows tasks", () => {
      let onShowTasksIsRequestedHandler: any;
      (view.subscribeWhenShowTasksIsRequested as any).mockImplementation(
        (handler: any) => {
          onShowTasksIsRequestedHandler = handler;
        },
      );
      new Presenter(view, timerPresenter, taskPresenter);

      onShowTasksIsRequestedHandler();

      expect(timerPresenter.hide).toHaveBeenCalled();
      expect(taskPresenter.show).toHaveBeenCalled();
    });
  });

  describe("When show timer is requested", () => {
    it("shows timer", () => {
      let onShowTimerIsRequestedHandler: any;
      (view.subscribeWhenShowTimerIsRequested as any).mockImplementation(
        (handler: any) => {
          onShowTimerIsRequestedHandler = handler;
        },
      );
      new Presenter(view, timerPresenter, taskPresenter);

      onShowTimerIsRequestedHandler();

      expect(timerPresenter.show).toHaveBeenCalled();
      expect(taskPresenter.hide).toHaveBeenCalled();
    });
  });

  describe("When change theme is requested", () => {
    it("changes the theme", () => {
      let onChangeThemeIsRequestedHandler: any;
      (view.subscribeWhenChangeThemeIsRequested as any).mockImplementation(
        (handler: any) => {
          onChangeThemeIsRequestedHandler = handler;
        },
      );
      new Presenter(view, timerPresenter, taskPresenter);

      onChangeThemeIsRequestedHandler();

      expect(view.changeTheme).toHaveBeenCalled();
    });
  });
});
