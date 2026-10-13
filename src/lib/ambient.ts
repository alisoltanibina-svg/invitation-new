const SRC = "/audio/wedding.mp3";

export class AmbientPlayer {
  private audio: HTMLAudioElement | null = null;
  playing = false;

  async start() {
    if (this.playing) return;
    const audio = this.audio ?? new Audio(SRC);
    audio.loop = true;
    audio.volume = 0.55;
    this.audio = audio;
    await audio.play();
    this.playing = true;
  }

  async stop() {
    if (!this.playing || !this.audio) return;
    this.audio.pause();
    this.audio.currentTime = 0;
    this.playing = false;
  }
}

export const ambient = new AmbientPlayer();
