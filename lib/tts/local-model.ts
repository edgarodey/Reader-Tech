import { TTSEngine, VoiceOption, TTSPlaybackOptions, TTSCallbacks } from "./types";

export class LocalModelEngine implements TTSEngine {
  readonly id = "local-wasm";
  readonly name = "On-Device Local AI Voice";
  readonly description = "Offline-first embedded WASM / WebGPU speech model.";

  async isAvailable(): Promise<boolean> {
    return false;
  }

  async getVoices(): Promise<VoiceOption[]> {
    return [];
  }

  speak(text: string, options: TTSPlaybackOptions, callbacks: TTSCallbacks): void {
    callbacks.onError?.(
      new Error("Local WASM AI speech model is not yet downloaded on this device.")
    );
  }

  pause(): void {}
  resume(): void {}
  stop(): void {}
}
