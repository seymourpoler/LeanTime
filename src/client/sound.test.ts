import { describe, it, expect, vi, beforeEach } from "vitest";
import { Sound } from "./sound";

describe("Sound", () => {
    let play: ReturnType<typeof vi.fn>;
    let audioConstructor: any; // <-- Fix: type as any

    let sound: Sound;

    beforeEach(() => {
        play = vi.fn();
        audioConstructor = vi.fn();
        class MockAudio {
            play = play;
            constructor(src: string) {
                audioConstructor(src); // <-- Now valid
            }
        }
        // @ts-ignore
        globalThis.Audio = MockAudio as any;
        sound = new Sound();
    });

    it("calls play() on Audio when play() is called", () => {
        sound.play();
        expect(audioConstructor).toHaveBeenCalledWith('./alarm.mp3');
        expect(play).toHaveBeenCalled();
    });
});
