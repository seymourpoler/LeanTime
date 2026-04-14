import { Service } from "./service.js";
import { View } from "./view.js";
import { Presenter } from "./presenter.js";
import { Sound } from "./sound.js";
import { io } from 'socket.io-client';

const sound = new Sound();
const service = new Service(io());
const view = new View();
new Presenter(view, service, sound);

// Tabs logic
const tabTimer = document.getElementById('tab-timer');
const tabTasks = document.getElementById('tab-tasks');
const panelTimer = document.getElementById('panel-timer');
const panelTasks = document.getElementById('panel-tasks');

if (tabTimer && tabTasks && panelTimer && panelTasks) {
  tabTimer.addEventListener('click', () => {
    tabTimer.classList.add('active');
    tabTimer.setAttribute('aria-selected', 'true');
    tabTasks.classList.remove('active');
    tabTasks.setAttribute('aria-selected', 'false');
    panelTimer.style.display = '';
    panelTasks.style.display = 'none';
  });
  tabTasks.addEventListener('click', () => {
    tabTasks.classList.add('active');
    tabTasks.setAttribute('aria-selected', 'true');
    tabTimer.classList.remove('active');
    tabTimer.setAttribute('aria-selected', 'false');
    panelTasks.style.display = '';
    panelTimer.style.display = 'none';
  });
}

// Basic tasks logic (client-side only)
const taskForm = document.getElementById('task-form') as HTMLFormElement | null;
const taskInput = document.getElementById('task-input') as HTMLInputElement | null;
const taskList = document.getElementById('task-list') as HTMLUListElement | null;

if (taskForm && taskInput && taskList) {
  taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = taskInput.value.trim();
    if (value) {
      const li = document.createElement('li');
      li.textContent = value;
      taskList.appendChild(li);
      taskInput.value = '';
    }
  });
}
