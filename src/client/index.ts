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
import { IdGenerator } from "./task/idGenerator.js";

const sound = new Sound();
const timerService = new TimerService(io());
const timerView = new TimerView();
const timerPresenter = new TimerPresenter(timerView, timerService, sound);

const taskService = new TaskService();
const taskView = new TaskView();
const idGenerator = new IdGenerator();
const taskPresenter = new TaskPresenter(taskView, taskService, idGenerator);

const view = new View();
new Presenter(view, timerPresenter, taskPresenter);
