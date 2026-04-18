import { describe, expect, it, vi } from "vitest";
import { View } from "./view";

describe("View", () => {
  describe("When getting timer id", () => {
    it.each([
      {
        name: "extracts timer id from path",
        path: "/abc123",
        expectedId: "abc123",
      },
      {
        name: "returns default when path is just a slash",
        path: "/",
        expectedId: "default",
      },
      {
        name: "handles path with multiple slashes",
        path: "/timer/abc123",
        expectedId: "timer/abc123",
      },
    ])("$name", ({ path, expectedId: expected }) => {
      vi.stubGlobal("location", { pathname: path });

      const view = new View();
      expect(view.getTimerId()).toBe(expected);
    });
  });
});
