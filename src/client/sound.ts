export class Sound {
    private readonly audio: HTMLAudioElement;

    constructor() {
        this.audio = new Audio('./alarm.mp3');
        this.audio.volume = 0.25;
    }

    public setVolume(volume: number): void {
        this.audio.volume = Math.min(1, Math.max(0, volume));
    }

    public play(): void {
        this.audio.play();
    }

    public subscribeWhenSoundEnds(handler: () => void): void {
        this.audio.addEventListener('ended', handler);
    }
}