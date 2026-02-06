export class Sound {
    public play(): void{
        const audio = new Audio('./client/alarm.mp3');
        audio.play();
    }
}