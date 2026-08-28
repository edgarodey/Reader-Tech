import { TTSEngine, VoiceOption, TTSPlaybackOptions, TTSCallbacks } from "./types";

export class WebSpeechEngine implements TTSEngine {
  readonly id = "web-speech";
  readonly name = "Browser Web Speech";
  readonly description = "Built-in browser voices with no data usage and zero latency.";

  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private currentOptions: TTSPlaybackOptions = { rate: 1.0, pitch: 1.0, volume: 1.0 };
  private voicesCache: VoiceOption[] = [];
  private keepAliveInterval: any = null;

  async isAvailable(): Promise<boolean> {
    return typeof window !== "undefined" && "speechSynthesis" in window;
  }

  async getVoices(): Promise<VoiceOption[]> {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return [];
    }

    const loadVoices = (): Promise<SpeechSynthesisVoice[]> => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) return Promise.resolve(voices);

      return new Promise((resolve) => {
        const handler = () => {
          window.speechSynthesis.removeEventListener("voiceschanged", handler);
          resolve(window.speechSynthesis.getVoices());
        };
        window.speechSynthesis.addEventListener("voiceschanged", handler);
        // Timeout fallback
        setTimeout(() => {
          window.speechSynthesis.removeEventListener("voiceschanged", handler);
          resolve(window.speechSynthesis.getVoices());
        }, 1000);
      });
    };

    const rawVoices = await loadVoices();
    this.voicesCache = rawVoices.map((v) => ({
      id: v.voiceURI || v.name,
      name: v.name,
      lang: v.lang,
      isDefault: v.default,
      localService: v.localService,
      accent: v.lang.includes("NG") ? "Nigerian English" : v.lang,
    }));

    return this.voicesCache;
  }

  speak(text: string, options: TTSPlaybackOptions, callbacks: TTSCallbacks): void {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      callbacks.onError?.(new Error("Web Speech API is not supported in this environment"));
      return;
    }

    this.stop();
    this.currentOptions = options;

    const utterance = new SpeechSynthesisUtterance(text);
    this.currentUtterance = utterance;

    // Apply speech options
    if (options.rate) utterance.rate = Math.max(0.5, Math.min(2.5, options.rate));
    if (options.pitch) utterance.pitch = Math.max(0.5, Math.min(1.5, options.pitch));
    if (options.volume !== undefined) utterance.volume = Math.max(0, Math.min(1, options.volume));

    // Match voice if requested
    if (options.voiceId) {
      const rawVoices = window.speechSynthesis.getVoices();
      const matched = rawVoices.find((v) => (v.voiceURI || v.name) === options.voiceId);
      if (matched) {
        utterance.voice = matched;
      }
    }

    utterance.onstart = () => {
      this.startKeepAlive();
      callbacks.onStart?.();
    };

    utterance.onend = () => {
      this.clearKeepAlive();
      this.currentUtterance = null;
      callbacks.onEnd?.();
    };

    utterance.onpause = () => {
      callbacks.onPause?.();
    };

    utterance.onresume = () => {
      callbacks.onResume?.();
    };

    utterance.onerror = (e) => {
      this.clearKeepAlive();
      this.currentUtterance = null;
      if (e.error !== "canceled" && e.error !== "interrupted") {
        callbacks.onError?.(e);
      }
    };

    utterance.onboundary = (e) => {
      callbacks.onBoundary?.(e.charIndex, (e as any).charLength || 0);
    };

    window.speechSynthesis.speak(utterance);
  }

  pause(): void {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.pause();
    }
  }

  resume(): void {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.resume();
    }
  }

  stop(): void {
    this.clearKeepAlive();
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    this.currentUtterance = null;
  }

  // Workaround for Chrome 15-second speech stall bug
  private startKeepAlive(): void {
    this.clearKeepAlive();
    this.keepAliveInterval = setInterval(() => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
          window.speechSynthesis.pause();
          window.speechSynthesis.resume();
        }
      }
    }, 12000);
  }

  private clearKeepAlive(): void {
    if (this.keepAliveInterval) {
      clearInterval(this.keepAliveInterval);
      this.keepAliveInterval = null;
    }
  }
}
