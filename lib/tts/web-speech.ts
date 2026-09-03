import { TTSEngine, VoiceOption, TTSPlaybackOptions, TTSCallbacks } from "./types";

export class WebSpeechEngine implements TTSEngine {
  readonly id = "web-speech";
  readonly name = "Browser Web Speech";
  readonly description = "Built-in browser voices with no data usage and zero latency.";

  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private currentOptions: TTSPlaybackOptions = { rate: 1.0, pitch: 1.0, volume: 1.0 };
  private voicesCache: VoiceOption[] = [];
  private keepAliveInterval: any = null;
  private watchdogTimeout: any = null;
  private pendingSpeakTimeout: any = null;

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

    // Clear any previous watchdog, keepalive, or pending dispatches
    this.stop();
    this.currentOptions = options;

    // Sanitize text: remove stray non-pronounceable noise symbols common in OCR
    const sanitizedText = text
      .replace(/[\|\_\-—=~*#<>]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    // Pre-flight check: if text contains no pronounceable letters or numbers, skip immediately
    if (!sanitizedText || !/[a-zA-Z0-9]/.test(sanitizedText)) {
      setTimeout(() => callbacks.onEnd?.(), 10);
      return;
    }

    // Small delay (50ms) to prevent the documented Chromium race bug where cancel()
    // wipes out the immediately following speak() call in the same tick.
    this.pendingSpeakTimeout = setTimeout(() => {
      this.pendingSpeakTimeout = null;
      this.dispatchUtterance(sanitizedText, options, callbacks);
    }, 50);
  }

  private dispatchUtterance(text: string, options: TTSPlaybackOptions, callbacks: TTSCallbacks): void {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

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

    // Dynamic Watchdog: estimate duration + generous safety buffer (prevent permanent hanging)
    const wordsCount = text.split(/\s+/).length;
    const currentRate = options.rate || 1.0;
    // ~150 words per minute at 1.0 rate = ~2.5 words/sec. Add 8s buffer.
    const estimatedSeconds = (wordsCount / (2.5 * currentRate)) + 8;
    const watchdogMs = Math.max(8000, Math.min(90000, estimatedSeconds * 1000));

    const resetWatchdog = () => {
      this.clearWatchdog();
      this.watchdogTimeout = setTimeout(() => {
        console.warn("WebSpeech watchdog triggered: utterance timed out without onend event. Advancing queue.");
        this.clearKeepAlive();
        this.currentUtterance = null;
        callbacks.onEnd?.();
      }, watchdogMs);
    };

    utterance.onstart = () => {
      this.startKeepAlive();
      resetWatchdog();
      callbacks.onStart?.();
    };

    utterance.onend = () => {
      this.clearWatchdog();
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
      this.clearWatchdog();
      this.clearKeepAlive();
      this.currentUtterance = null;
      if (e.error === "canceled" || e.error === "interrupted") {
        // Normal interruption during user navigation or chunk change
        return;
      }
      callbacks.onError?.(e);
    };

    utterance.onboundary = (e) => {
      resetWatchdog(); // Reset watchdog on active word boundary progression
      callbacks.onBoundary?.(e.charIndex, (e as any).charLength || 0);
    };

    // Pre-arm watchdog in case onstart never fires (e.g. browser speech engine stall)
    resetWatchdog();

    try {
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.error("speechSynthesis.speak error:", err);
      callbacks.onError?.(err);
    }
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
    if (this.pendingSpeakTimeout) {
      clearTimeout(this.pendingSpeakTimeout);
      this.pendingSpeakTimeout = null;
    }
    this.clearWatchdog();
    this.clearKeepAlive();
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {
        // Ignore cancel errors
      }
    }
    this.currentUtterance = null;
  }

  private startKeepAlive(): void {
    this.clearKeepAlive();
    // Periodically pulse pause/resume to prevent Chrome's 15-second speech stall
    this.keepAliveInterval = setInterval(() => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
          window.speechSynthesis.pause();
          window.speechSynthesis.resume();
        }
      }
    }, 10000);
  }

  private clearKeepAlive(): void {
    if (this.keepAliveInterval) {
      clearInterval(this.keepAliveInterval);
      this.keepAliveInterval = null;
    }
  }

  private clearWatchdog(): void {
    if (this.watchdogTimeout) {
      clearTimeout(this.watchdogTimeout);
      this.watchdogTimeout = null;
    }
  }
}

