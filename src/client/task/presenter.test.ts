import { describe, it, beforeEach, expect, vi } from "vitest";
import { Presenter } from "./presenter.js";
import { Service } from "./service.js";
import { View } from "./view.js";
import { spyAllMethodsOf } from "../../testing.js";

describe("Presenter", () => {
  let presenter: Presenter;
  let view: View;
  let service: Service;

  beforeEach(() => {
    view = new View();
    spyAllMethodsOf(view);
    service = new Service();
    spyAllMethodsOf(service);
  });

  describe("When showing is requested", () => {
    it("shows", () => {
      const presenter = new Presenter(view, service);

      presenter.show();

      expect(view.show).toHaveBeenCalled();
    });
  });

  describe("When hidding is requested", () => {
    it("hides", () => {
      presenter = new Presenter(view, service);

      presenter.hide();

      expect(view.hide).toHaveBeenCalled();
    });
  });

  describe("When adding a task  is requested", () => {
    it("doesn't add if task is empty", () => {
      let onAddTaskIsRequestedHandler: any;
      (view.subscribeWhenAddTaskIsRequested as any).mockImplementation(
        (handler: any) => {
          onAddTaskIsRequestedHandler = handler;
        },
      );
      new Presenter(view, service);

      onAddTaskIsRequestedHandler("");

      expect(view.showTask).not.toHaveBeenCalled();
    });

    it("doesn't add if task is null", () => {
      let onAddTaskIsRequestedHandler: any;
      (view.subscribeWhenAddTaskIsRequested as any).mockImplementation(
        (handler: any) => {
          onAddTaskIsRequestedHandler = handler;
        },
      );
      new Presenter(view, service);

      onAddTaskIsRequestedHandler(null);

      expect(view.showTask).not.toHaveBeenCalled();
    });

    it("doesn't add if task is undefined", () => {
      let onAddTaskIsRequestedHandler: any;
      (view.subscribeWhenAddTaskIsRequested as any).mockImplementation(
        (handler: any) => {
          onAddTaskIsRequestedHandler = handler;
        },
      );
      new Presenter(view, service);

      onAddTaskIsRequestedHandler(undefined);

      expect(view.showTask).not.toHaveBeenCalled();
    });
  });
});
