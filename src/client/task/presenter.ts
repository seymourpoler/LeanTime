import { View } from "./view.js";
import { Service } from "./service.js";

export class Presenter {
  constructor(
    private readonly view: View,
    private readonly service: Service,
  ) {}

  public show(): void {
    this.view.show();
  }

  public hide(): void {
    throw new Error("Not implemented");
  }
}
