export class View {
    public subscribeWhenStartIsRequested (handler: () => void) : void {
        document.getElementById('start')?.addEventListener('click', (event: Event) => {
            event.preventDefault();

            handler();
        });
    }

    public subscribeWhenPauseIsRequested(handler: () => void) : void {
        document.getElementById('pause')?.addEventListener('click', (event: Event) => {
            event.preventDefault();

            handler();
        });
    }

    public subscribeWhenResetIsRequested(handler: () => void) : void {
        document.getElementById('reset')?.addEventListener('click', (event: Event) => {
            event.preventDefault();

            handler();
        });
    }

    public subscribeWhenSettingsIsRequested(handler: () => void) : void {
        document.getElementById('settings')?.addEventListener('click', (event: Event) => {
            event.preventDefault();

            handler();
        });
    }

    public subscribeWhenApplyTimeIsRequested(handler: (minutes: number, seconds: number) => void) : void {
        document.getElementById('apply-config')?.addEventListener('click', (event: Event) => {
            event.preventDefault();

            const minutes = document.getElementById('config-minutes') as HTMLInputElement;
            const seconds = document.getElementById('config-seconds') as HTMLInputElement;
            if(minutes && seconds){
                handler(Number(minutes.value), Number(seconds.value));
            }
        });
    }

    public subscribeWhenVolumeIsChanged(handler: (volume: number) => void): void {
        document.getElementById('volume-slider')?.addEventListener('input', (event: Event) => {
            const input = event.target as HTMLInputElement;
            handler(parseFloat(input.value));
        });
    }

    public showTime(minutes: number, seconds: number) : void {
        const htmlElementMinutes = document.getElementById('minutes');
        const htmlElementSeconds = document.getElementById('seconds');

        if (htmlElementMinutes) htmlElementMinutes.innerHTML = getTwoDigitsNumber(minutes);
        if (htmlElementSeconds) htmlElementSeconds.innerHTML = getTwoDigitsNumber(seconds);

        function getTwoDigitsNumber(value: number): string {
            return value.toString().padStart(2, '0');
        }
    }

    public showProgression(percentage: number): void {
        const progressBar = document.querySelector('.progress-bar') as HTMLElement;
        const label = document.querySelector('.progress-label') as HTMLElement;
        if (progressBar) {
            progressBar.style.width = `${percentage}%`;
        }
        if (label) {
            label.textContent = `${Math.floor(percentage)}%`;
        }
    }

    public showSettings() : void {
        this.settings('block');
    }

    public hideSettings() : void {
        this.settings('none');
    }

    private settings (display: string):void{
        const element = document.getElementById('configuration');
        if(element){
            element.style.display = display
        }
    }

    public getTimerId() : string {
        const path = window.location.pathname;
        const timerId = path.replace("/", "");

        return timerId || "default";
    }
}