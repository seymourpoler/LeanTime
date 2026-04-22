import { describe, it, beforeEach, expect, vi } from "vitest";
import { Presenter } from "./presenter.js";
import { Service } from "./service.js";
import { View } from "./view.js";
import { spyAllMethodsOf } from "../../testing.js";
import { IdGenerator } from "./idGenerator.js";

describe("Presenter", () => {
  let presenter: Presenter;
  let view: View;
  let service: Service;
  let idGenerator: IdGenerator;

  beforeEach(() => {
    view = new View();
    spyAllMethodsOf(view);
    service = new Service();
    spyAllMethodsOf(service);
    idGenerator = new IdGenerator();
    spyAllMethodsOf(idGenerator);
  });

  describe("When showing is requested", () => {
    it("shows", () => {
      const presenter = new Presenter(view, service, idGenerator);

      presenter.show();

      expect(view.show).toHaveBeenCalled();
    });
  });

  describe("When hidding is requested", () => {
    it("hides", () => {
      presenter = new Presenter(view, service, idGenerator);

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
        new Presenter(view, service, idGenerator);

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
      (idGenerator.generate as any).mockReturnValue("1");
      new Presenter(view, service, idGenerator);

      onAddTaskIsRequestedHandler("a-simple-task");

      expect(view.showTask).toHaveBeenCalledWith([
        { id: "1", title: "a-simple-task" },
      ]);
      expect(service.addTask).toHaveBeenCalledWith([
        { id: "1", title: "a-simple-task" },
      ]);
    });
  });

  describe("When remove task is requested", () => {
    it("removes a task", () => {
      let onRemoveTaskIsRequestedHandler: any;
      (view.subscribeWhenRemoveTaskIsRequested as any).mockImplementation(
        (handler: any) => {
          onRemoveTaskIsRequestedHandler = handler;
        },
      );
      let onAddTaskIsRequestedHandler: any;
      (view.subscribeWhenAddTaskIsRequested as any).mockImplementation(
        (handler: any) => {
          onAddTaskIsRequestedHandler = handler;
        },
      );
      (idGenerator.generate as any).mockReturnValue("1");
      new Presenter(view, service, idGenerator);
      onAddTaskIsRequestedHandler("a-simple-task");

      onRemoveTaskIsRequestedHandler("1");

      expect(view.showTask).toHaveBeenCalledWith([]);
      expect(service.removeTask).toHaveBeenCalledWith("1");
    });
  });
});
