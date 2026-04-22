import type { Task } from "./task.js";

export class View {
  private removeTaskHandler: ((taskId: string) => void) | null = null;

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

  public subscribeWhenRemoveTaskIsRequested(
    handler: (taskId: string) => void,
  ): void {
    this.removeTaskHandler = handler;
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

  public showTask(tasks: Task[]): void {
    const listOfTasks = document.getElementById(
      "task-list",
    ) as HTMLUListElement | null;
    if (!listOfTasks) {
      return;
    }
    listOfTasks.innerHTML = "";
    for (const task of tasks) {
      listOfTasks.appendChild(this.renderTask(task.id, task.title));
    }
  }

  private renderTask(id: string, text: string) {
    const li = document.createElement("li");
    li.textContent = text;
    li.id = id;
    li.classList.remove("done");
    // Click/tap to cross off
    li.addEventListener("click", (e) => {
      // Don’t toggle if Remove btn is clicked
      if ((e.target as HTMLElement).classList.contains("remove-task-btn"))
        return;
      li.classList.toggle("done");
    });
    // Remove button
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = "✕";
    btn.className = "remove-task-btn";
    btn.title = "Remove task";
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      this.removeTaskHandler?.(id);
    });
    li.appendChild(btn);
    return li;
  }
}
