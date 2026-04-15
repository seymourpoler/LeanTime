import { describe, it, expect, vi, beforeEach } from "vitest";
import { Sound } from "./sound.js";

describe("Sound", () => {
    let play: ReturnType<typeof vi.fn>;
    let audioConstructor: any;
    let audio: { play: ReturnType<typeof vi.fn>; volume: number; addEventListener: ReturnType<typeof vi.fn> };

    let sound: Sound;

    beforeEach(() => {
        play = vi.fn();
        audioConstructor = vi.fn();
        audio = { play, volume: 1, addEventListener: vi.fn() };
        class AudioSound {
            play = play;
            volume = 1;
            addEventListener = vi.fn();
            constructor(src: string) {
                audioConstructor(src);
                audio = this as any;
            }
        }
        // @ts-ignore
        globalThis.Audio = AudioSound as any;
        sound = new Sound();
    });

    it("calls play() on Audio when play() is called", () => {
        sound.play();

        expect(audioConstructor).toHaveBeenCalledWith('./alarm.mp3');

        expect(play).toHaveBeenCalled();
    });

    it("creates the Audio instance only once across multiple play() calls", () => {
        sound.play();
        sound.play();

        expect(audioConstructor).toHaveBeenCalledTimes(1);
    });

    describe("setVolume", () => {
        it("sets the volume applied to the audio element on play", () => {
            sound.setVolume(0.5);

            sound.play();

            expect(audio.volume).toBe(0.5);
        });

        it("updates the volume of the existing Audio instance immediately, without a new play()", () => {
            sound.play();

            sound.setVolume(0.7);

            expect(audio.volume).toBe(0.7);
        });

        it("clamps the volume to 0 when a negative value is given", () => {
            sound.setVolume(-1);

            sound.play();

            expect(audio.volume).toBe(0);
        });

        it("clamps the volume to 1 when a value greater than 1 is given", () => {
            sound.setVolume(2);

            sound.play();

            expect(audio.volume).toBe(1);
        });

        it("uses 25% volume by default when setVolume is never called", () => {
            sound.play();

            expect(audio.volume).toBe(0.25);
        });
    });

    describe("subscribeWhenSoundEnds", () => {
        it("registers the handler on the audio 'ended' event", () => {
            const handler = vi.fn();

            sound.subscribeWhenSoundEnds(handler);

            expect(audio.addEventListener).toHaveBeenCalledWith('ended', handler);
        });
    });
});
