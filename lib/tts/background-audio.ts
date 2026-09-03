/**
 * BackgroundAudioManager
 * 
 * Keeps mobile browsers (iOS Safari / Android Chrome / PWA) from suspending
 * the application when the screen locks or the user switches tabs/apps (e.g. WhatsApp).
 * 
 * Utilizes:
 * 1. An HTML5 silent audio element loop to maintain an active OS-level audio session
 *    (AVAudioSession on iOS, Audio Focus on Android).
 * 2. Screen Wake Lock API to prevent screen timeout while actively studying.
 */

// A valid, minimal 1-second 8kHz mono 8-bit silent WAV Data URI
const SILENT_WAV_DATA_URI =
  "data:audio/wav;base64,UklGRjIAAABXQVZFZm10IBIAAAABAAEAQB8AAEAfAAABAAgAAABkYXRhFAAAAAAAAAAAAAAAAAAAAAAAAAA=";

export class BackgroundAudioManager {
  private audioElement: HTMLAudioElement | null = null;
  private wakeLock: any = null;
  private isPlayingAudio: boolean = false;
  private visibilityHandler: (() => void) | null = null;

  constructor() {
    if (typeof window !== "undefined") {
      this.initAudioElement();
      this.setupVisibilityListener();
    }
  }

  private initAudioElement() {
    try {
      const audio = new Audio();
      audio.src = SILENT_WAV_DATA_URI;
      audio.loop = true;
      audio.preload = "auto";
      audio.autoplay = false;
      audio.volume = 0.01; // Non-zero minimal volume to ensure iOS registers media track
      (audio as any).playsInline = true;
      audio.setAttribute("playsinline", "true");
      audio.setAttribute("webkit-playsinline", "true");
      this.audioElement = audio;
    } catch (e) {
      console.warn("Failed to initialize silent background audio:", e);
    }
  }

  private setupVisibilityListener() {
    if (typeof document === "undefined") return;

    this.visibilityHandler = async () => {
      if (document.visibilityState === "visible" && this.isPlayingAudio) {
        // Re-acquire wake lock if released by OS when screen was locked
        await this.requestWakeLock();
      }
    };

    document.addEventListener("visibilitychange", this.visibilityHandler);
  }

  public async start(): Promise<void> {
    this.isPlayingAudio = true;

    // Start silent audio loop to hold background audio session
    if (this.audioElement) {
      try {
        if (this.audioElement.paused) {
          const playPromise = this.audioElement.play();
          if (playPromise !== undefined) {
            await playPromise.catch((err) => {
              // May fail if not triggered by direct user gesture, acceptable fallback
              console.debug("Silent audio keep-alive play deferred:", err);
            });
          }
        }
      } catch (e) {
        console.debug("Silent audio play error:", e);
      }
    }

    // Acquire Screen Wake Lock
    await this.requestWakeLock();
  }

  public pause(): void {
    this.isPlayingAudio = false;

    if (this.audioElement && !this.audioElement.paused) {
      try {
        this.audioElement.pause();
      } catch (e) {
        console.debug("Silent audio pause error:", e);
      }
    }

    this.releaseWakeLock();
  }

  public stop(): void {
    this.pause();
    if (this.audioElement) {
      try {
        this.audioElement.currentTime = 0;
      } catch (e) {
        // Ignore
      }
    }
  }

  private async requestWakeLock(): Promise<void> {
    if (typeof navigator === "undefined" || !("wakeLock" in navigator)) return;
    if (this.wakeLock) return; // Already active

    try {
      this.wakeLock = await (navigator as any).wakeLock.request("screen");
      this.wakeLock.addEventListener("release", () => {
        this.wakeLock = null;
      });
    } catch (err) {
      console.debug("Screen Wake Lock could not be acquired:", err);
    }
  }

  private releaseWakeLock(): void {
    if (this.wakeLock) {
      try {
        this.wakeLock.release();
      } catch (err) {
        // Ignore
      }
      this.wakeLock = null;
    }
  }

  public getAudioElement(): HTMLAudioElement | null {
    return this.audioElement;
  }

  public cleanup(): void {
    this.stop();
    if (typeof document !== "undefined" && this.visibilityHandler) {
      document.removeEventListener("visibilitychange", this.visibilityHandler);
    }
    this.audioElement = null;
  }
}

// Global Singleton
let backgroundAudioInstance: BackgroundAudioManager | null = null;

export function getBackgroundAudioManager(): BackgroundAudioManager {
  if (!backgroundAudioInstance) {
    backgroundAudioInstance = new BackgroundAudioManager();
  }
  return backgroundAudioInstance;
}
