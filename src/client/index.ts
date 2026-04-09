import { Service } from "./service.js";
import { View } from "./view.js";
import { Presenter } from "./presenter.js";
import { Sound } from "./sound.js";
import { io } from 'socket.io-client';

const sound = new Sound();
const service = new Service(io());
const view = new View();
new Presenter(view, service, sound);