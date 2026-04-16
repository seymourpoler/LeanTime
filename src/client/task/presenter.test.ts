import { describe, it, beforeEach, expect, vi } from "vitest";
import { Presenter } from "./presenter.js";
import { Service } from "./service.js";
import { View } from "./view.js";
import { spyAllMethodsOf } from "../../testing.js";

describe("Presenter", () => {
  let presenter: Presenter;
  let view: View;
  let service: Service;

  beforeEach(() => {
    view = new View();
    spyAllMethodsOf(view);
    service = new Service();
    spyAllMethodsOf(service);

    presenter = new Presenter(view, service);
  });

  describe("When showing is requested", () => {
    it("shows", () => {
      presenter.show();

      expect(view.show).toHaveBeenCalled();
    });
  });
});
