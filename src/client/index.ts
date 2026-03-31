import { Service } from "./service";
import { View } from "./view";
import { Presenter } from "./presenter";
import { Sound } from "./sound";
import { io } from 'socket.io-client';

const sound = new Sound();
const service = new Service(io());
const view = new View();
new Presenter(view, service, sound);