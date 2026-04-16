import { Service as TimerService } from "./timer/service.js";
import { View as TimerView } from "./timer/view.js";
import { Presenter as TimerPresenter } from "./timer/presenter.js";
import { Sound } from "./timer/sound.js";
import { io } from "socket.io-client";

import { View as TaskView } from "./task/view.js";
import { Presenter as TaskPresenter } from "./task/presenter.js";
import { Service as TaskService } from "./task/service.js";

import { View } from "./view.js";
import { Presenter } from "./presenter.js";

const sound = new Sound();
const timerService = new TimerService(io());
const timerView = new TimerView();
const timerPresenter = new TimerPresenter(timerView, timerService, sound);

const taskService = new TaskService();
const taskView = new TaskView();
const taskPresenter = new TaskPresenter(taskView, taskService);

const view = new View();
new Presenter(view, timerPresenter, taskPresenter);

// Enhanced tasks logic (client-side only)
const taskForm = document.getElementById("task-form") as HTMLFormElement | null;
const taskInput = document.getElementById(
  "task-input",
) as HTMLInputElement | null;
const taskList = document.getElementById(
  "task-list",
) as HTMLUListElement | null;

function renderTaskLi(taskText: string) {
  const li = document.createElement("li");
  li.tabIndex = 0;
  li.textContent = taskText;
  li.classList.remove("done");
  // Click/tap to cross off
  li.addEventListener("click", (e) => {
    // Don’t toggle if Remove btn is clicked
    if ((e.target as HTMLElement).classList.contains("remove-task-btn")) return;
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
    li.remove();
  });
  li.appendChild(btn);
  return li;
}

if (taskForm && taskInput && taskList) {
  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = taskInput.value.trim();
    if (value) {
      const li = renderTaskLi(value);
      taskList.appendChild(li);
      taskInput.value = "";
    }
  });
}
