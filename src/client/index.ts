import {Service} from "./service";
import {View} from "./view";
import {Presenter} from "./presenter";
import {Sound} from "./sound";

const sound = new Sound();
const service = new Service();
const view = new View();
new Presenter(view, service, sound);