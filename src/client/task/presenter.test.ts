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
    it.each([
      ["empty string", ""],
      ["single whitespace", " "],
      ["multiple whitespaces", "   "],
      ["tab character", "\t"],
      ["newline character", "\n"],
      ["null", null],
      ["undefined", undefined],
    ])(
      "doesn't add if task is %s",
      (_description: string, value: string | null | undefined) => {
        let onAddTaskIsRequestedHandler: any;
        (view.subscribeWhenAddTaskIsRequested as any).mockImplementation(
          (handler: any) => {
            onAddTaskIsRequestedHandler = handler;
          },
        );
        new Presenter(view, service);

        onAddTaskIsRequestedHandler(value);

        expect(view.showTask).not.toHaveBeenCalled();
      },
    );

    it("add new task", () => {
      let onAddTaskIsRequestedHandler: any;
      (view.subscribeWhenAddTaskIsRequested as any).mockImplementation(
        (handler: any) => {
          onAddTaskIsRequestedHandler = handler;
        },
      );
      new Presenter(view, service);

      onAddTaskIsRequestedHandler("a-simple-task");

      expect(view.showTask).toHaveBeenCalledWith(["a-simple-task"]);
      expect(service.addTask).toHaveBeenCalledWith(["a-simple-task"]);
    });
  });
});
