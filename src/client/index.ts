import { Service as TimerService } from "./timer/service.js";
import { View as TimerView }  from "./timer/view.js";
import { Presenter as TimerPresenter } from "./timer/presenter.js";
import { Sound } from "./timer/sound.js";
import { io } from 'socket.io-client';

const sound = new Sound();
const timerService = new TimerService(io());
const timerView = new TimerView();
new TimerPresenter(timerView, timerService, sound);

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

// Enhanced tasks logic (client-side only)
const taskForm = document.getElementById('task-form') as HTMLFormElement | null;
const taskInput = document.getElementById('task-input') as HTMLInputElement | null;
const taskList = document.getElementById('task-list') as HTMLUListElement | null;

function renderTaskLi(taskText: string) {
  const li = document.createElement('li');
  li.tabIndex = 0;
  li.textContent = taskText;
  li.classList.remove('done');
  // Click/tap to cross off
  li.addEventListener('click', (e) => {
    // Don’t toggle if Remove btn is clicked
    if ((e.target as HTMLElement).classList.contains('remove-task-btn')) return;
    li.classList.toggle('done');
  });
  // Remove button
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.textContent = '✕';
  btn.className = 'remove-task-btn';
  btn.title = 'Remove task';
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    li.remove();
  });
  li.appendChild(btn);
  return li;
}

if (taskForm && taskInput && taskList) {
  taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = taskInput.value.trim();
    if (value) {
      const li = renderTaskLi(value);
      taskList.appendChild(li);
      taskInput.value = '';
    }
  });
}
