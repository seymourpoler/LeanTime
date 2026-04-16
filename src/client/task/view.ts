export class View {
  public subscribeWhenAddTaskIsRequested(
    handler: (task: string) => void,
  ): void {
    const button = document.getElementById("add-task");
    const input = document.getElementById(
      "task-input",
    ) as HTMLInputElement | null;
    if (!button || !input) {
      return;
    }

    button.addEventListener("click", (e) => {
      e.preventDefault();
      handler(input.value);
    });
    // input.addEventListener("keydown", (e) => {
    //   if (e.key === "Enter") {
    //     handler(input.value);
    //   }
    // });
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
