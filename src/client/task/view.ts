export class View {
  public subscribeWhenAddTaskIsRequested(
    handler: (task: string) => void,
  ): void {
    throw new Error("Method not implemented.");
  }

  public show(): void {
    const tab = document.getElementById("tab-tasks");
    const panel = document.getElementById("panel-tasks");
    if (!tab || !panel) {
      return;
    }

    tab.classList.add("active");
    tab.setAttribute("aria-selected", "true");
    panel.style.display = "";
  }

  public hide(): void {
    const tab = document.getElementById("tab-tasks");
    const panel = document.getElementById("panel-tasks");
    if (!tab || !panel) {
      return;
    }

    tab.classList.remove("active");
    tab.setAttribute("aria-selected", "false");
    panel.style.display = "none";
  }

  public showTask(tasks: string[]): void {
    throw new Error("Method not implemented.");
  }
}
