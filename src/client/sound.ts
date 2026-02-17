export class Sound {
    public play(): void{
        const audio = new Audio('./alarm.mp3');
        audio.play();
    }
}