import { View } from "./view.js";
import { Service } from "./service.js";

export class Presenter {
  private readonly tasks: string[];

  constructor(
    private readonly view: View,
    private readonly service: Service,
  ) {
    this.tasks = [];
    this.view.subscribeWhenAddTaskIsRequested(this.AddTaskIsRequestedHandler);
  }

  private AddTaskIsRequestedHandler = (task: string): void => {
    if (!task || !task.trim()) {
      return;
    }

    this.tasks.push(task);
    this.view.showTask(this.tasks);
  };

  public show(): void {
    this.view.show();
  }

  public hide(): void {
    this.view.hide();
  }
}
