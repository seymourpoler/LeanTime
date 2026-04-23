import type { Task } from "./task.js";

export class View {
  private removeTaskHandler: ((taskId: string) => void) | null = null;

  public subscribeWhenAddTaskIsRequested(
    handler: (task: string) => void,
  ): void {
    const btnAdd = document.getElementById("add-task");
    const taskTitle = document.getElementById(
      "task-input",
    ) as HTMLInputElement | null;
    if (!btnAdd || !taskTitle) {
      return;
    }

    btnAdd.addEventListener("click", (e) => {
      e.preventDefault();
      handler(taskTitle.value);
      taskTitle.value = "";
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

  private renderTask(id: string, text: string): HTMLLIElement {
    const list = document.createElement("li");
    list.textContent = text;
    list.id = id;
    list.classList.remove("done");
    list.addEventListener("click", (event) => {
      if ((event.target as HTMLElement).classList.contains("remove-task-btn"))
        return;
      list.classList.toggle("done");
    });

    const btnRemove = document.createElement("button");
    btnRemove.type = "button";
    btnRemove.textContent = "✕";
    btnRemove.className = "remove-task-btn";
    btnRemove.title = "Remove task";
    btnRemove.addEventListener("click", (e) => {
      e.stopPropagation();
      this.removeTaskHandler?.(id);
    });
    list.appendChild(btnRemove);
    return list;
  }
}
