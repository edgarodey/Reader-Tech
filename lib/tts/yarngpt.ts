import { TTSEngine, VoiceOption, TTSPlaybackOptions, TTSCallbacks } from "./types";

/**
 * YarnGPT TTS Engine Stub
 * 
 * YarnGPT is a specialized Nigerian-accented English TTS model developed by Saheedniyi (Apache-2.0).
 * In V1, this engine serves as the architectural interface placeholder.
 * Post-V1, it can connect to a local ONNX/WASM inference worker or dedicated microservice.
 */
export class YarnGPTEngine implements TTSEngine {
  readonly id = "yarngpt";
  readonly name = "YarnGPT (Nigerian English)";
  readonly description = "Natural Nigerian-accented English speech model with authentic pronunciation.";

  async isAvailable(): Promise<boolean> {
    // Currently reserved for post-V1 deployment
    return false;
  }

  async getVoices(): Promise<VoiceOption[]> {
    return [
      {
        id: "yarngpt-chidi-m",
        name: "YarnGPT - Chidi (Male, Nigerian)",
        lang: "en-NG",
        accent: "Nigerian English",
      },
      {
        id: "yarngpt-amina-f",
        name: "YarnGPT - Amina (Female, Nigerian)",
        lang: "en-NG",
        accent: "Nigerian English",
      },
      {
        id: "yarngpt-funke-f",
        name: "YarnGPT - Funke (Female, Nigerian)",
        lang: "en-NG",
        accent: "Nigerian English",
      },
    ];
  }

  speak(text: string, options: TTSPlaybackOptions, callbacks: TTSCallbacks): void {
    callbacks.onError?.(
      new Error(
        "YarnGPT engine is currently scheduled for post-V1 rollout. Please switch to Browser Web Speech engine in Settings."
      )
    );
  }

  pause(): void {}
  resume(): void {}
  stop(): void {}
}
