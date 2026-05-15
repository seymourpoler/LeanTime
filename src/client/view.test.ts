import { describe, expect, it, vi } from "vitest";
import { View } from "./view.js";

describe("View", () => {
  describe("When getting timer id", () => {
    describe("From non-root path", () => {
      it.each([
        {
          name: "extracts timer id from path",
          path: "/abc123",
          expectedId: "abc123",
        },
        {
          name: "handles path with multiple slashes",
          path: "/timer/abc123",
          expectedId: "timer/abc123",
        },
      ])("$name", ({ path, expectedId }) => {
        vi.stubGlobal("location", { pathname: path });

        const view = new View();
        expect(view.getTimerId()).toBe(expectedId);
      });
    });

    describe("From root path", () => {
      it("returns timerId", () => {
        vi.stubGlobal("location", { pathname: "/" });

        const view = new View();
        const timerId = view.getTimerId();

        expect(timerId.length).toBeGreaterThan(0);
        expect(timerId).toBe("default");
      });
    });
  });
});
