import { View } from "./view.js";
import { Service } from "./service.js";

export class Presenter {
  constructor(
    private readonly view: View,
    private readonly service: Service,
  ) {
    this.view.subscribeWhenAddTaskIsRequested(this.AddTaskIsRequestedHandler);
  }

  private AddTaskIsRequestedHandler(task: string): void {
    if (!task) {
      return;
    }
    throw new Error("not implemented");
  }

  public show(): void {
    this.view.show();
  }

  public hide(): void {
    this.view.hide();
  }
}
