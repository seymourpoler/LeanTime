import { describe, it, beforeEach, expect } from "vitest";
import { Presenter } from "../presenter.js";
import { View } from "../view.js";
import { spyAllMethodsOf } from "../../testing.js";

describe('Presenter', () => {
    let presenter: Presenter;
    let view: View;

    beforeEach(() => {
        view = new View();
        spyAllMethodsOf(view);
        presenter = new Presenter(view);
    })

    it('should be defined', () => {
    });
});