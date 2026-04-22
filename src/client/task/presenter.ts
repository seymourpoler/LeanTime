import { View } from "./view.js";
import { Service } from "./service.js";
import { IdGenerator } from "./idGenerator.js";
import type { Task } from "./task.js";

export class Presenter {
  private readonly tasks: Task[];

  constructor(
    private readonly view: View,
    private readonly service: Service,
    private readonly idGenerator: IdGenerator,
  ) {
    this.tasks = [];
    this.view.subscribeWhenAddTaskIsRequested(this.AddTaskIsRequestedHandler);
    if (typeof this.view.subscribeWhenRemoveTaskIsRequested === "function") {
      this.view.subscribeWhenRemoveTaskIsRequested(
        this.RemoveTaskIsRequestedHandler,
      );
    }
    this.view.hide();
  }

  private AddTaskIsRequestedHandler = (task: string): void => {
    if (!task || !task.trim()) {
      return;
    }

    const newTask: Task = { id: this.idGenerator.generate(), title: task };
    this.tasks.push(newTask);
    this.service.addTask(this.tasks);
    this.view.showTask(this.tasks);
  };

  private RemoveTaskIsRequestedHandler = (idTask: string): void => {
    const index = this.tasks.findIndex((task) => task.id === idTask);
    if (index === -1) {
      return;
    }

    this.tasks.splice(index, 1);
    this.service.removeTask(idTask);
    this.view.showTask(this.tasks);
  };

  public show(): void {
    this.view.show();
  }

  public hide(): void {
    this.view.hide();
  }
}
