export type TTSStatus = "idle" | "preparing" | "playing" | "paused" | "error";

export interface VoiceOption {
  id: string;
  name: string;
  lang: string;
  accent?: string;
  isDefault?: boolean;
  localService?: boolean;
}

export interface TTSPlaybackOptions {
  voiceId?: string;
  rate?: number; // 0.5 to 2.5
  pitch?: number; // 0.5 to 1.5
  volume?: number; // 0 to 1
}

export interface TTSCallbacks {
  onStart?: () => void;
  onEnd?: () => void;
  onPause?: () => void;
  onResume?: () => void;
  onError?: (err: any) => void;
  onBoundary?: (charIndex: number, charLength?: number) => void;
}

export interface TTSEngine {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  isAvailable(): Promise<boolean>;
  getVoices(): Promise<VoiceOption[]>;
  speak(text: string, options: TTSPlaybackOptions, callbacks: TTSCallbacks): void;
  pause(): void;
  resume(): void;
  stop(): void;
  setRate?(rate: number): void;
}
