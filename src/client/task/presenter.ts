import {View} from "./view.js";
import {Service} from "./service.js";


export class Presenter {
    constructor(private readonly view: View, private readonly service: Service) {
    }
}