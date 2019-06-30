import beep from '../assets/sounds/beep.mp3';
import beepPrimary from '../assets/sounds/beep-primary.mp3';

export default class Metronome {
  constructor({ bpm }) {
    this.bpm = 60000 / bpm;
    this.beepPrimary = new Audio(beepPrimary);
    this.beep = new Audio(beep);
    // this.beep.addEventListener('canplaythrough', this.onLoadAudio.bind(this, 'beep'))
    // this.beepPrimary.addEventListener('canplaythrough', this.onLoadAudio.bind(this, 'beepPrimary'))
    this.canBeep = 0;
    this.currentBeep = 1;
  }

  onLoadAudio() {
    this.canBeep = this.canBeep + 1;
  }

  start() {
    this.intervalCallback();
    this.interval = setInterval(this.intervalCallback.bind(this), this.bpm);
  }

  intervalCallback() {
    if (this.currentBeep === 1) {
      this.beepPrimary.play();
    } else {
      this.beep.play();
    }

    if (this.currentBeep >= 4) {
      this.currentBeep = 1;
    } else {
      this.currentBeep += 1;
    }
  }

  stop() {
    this.currentBeep = 1;
    clearInterval(this.interval);
  }
}
