import { TTSEngine, VoiceOption, TTSPlaybackOptions, TTSStatus } from "./types";
import { WebSpeechEngine } from "./web-speech";
import { LocalModelEngine } from "./local-model";
import { SpeechChunk } from "../reader/chunker";
import { saveProgress } from "../storage/documents";

export interface SpeechControllerListener {
  onStatusChange?: (status: TTSStatus) => void;
  onChunkChange?: (chunkIndex: number, chunk: SpeechChunk | null) => void;
  onBoundary?: (charIndex: number, charLength?: number) => void;
  onError?: (err: any) => void;
}

export class SpeechController {
  private engines: Map<string, TTSEngine> = new Map();
  private activeEngine: TTSEngine;
  private chunks: SpeechChunk[] = [];
  private currentChunkIndex: number = -1;
  private status: TTSStatus = "idle";
  private documentId: string | null = null;
  private listeners: Set<SpeechControllerListener> = new Set();
  private options: TTSPlaybackOptions = { rate: 1.0, pitch: 1.0, volume: 1.0 };

  constructor() {
    const webSpeech = new WebSpeechEngine();
    const localModel = new LocalModelEngine();

    this.engines.set(webSpeech.id, webSpeech);
    this.engines.set(localModel.id, localModel);

    this.activeEngine = webSpeech;
  }

  public setEngine(engineId: string) {
    const found = this.engines.get(engineId);
    if (found) {
      this.stop();
      this.activeEngine = found;
    }
  }

  public getActiveEngine(): TTSEngine {
    return this.activeEngine;
  }

  public getAvailableEngines(): TTSEngine[] {
    return Array.from(this.engines.values());
  }

  public async getVoices(): Promise<VoiceOption[]> {
    return this.activeEngine.getVoices();
  }

  public subscribe(listener: SpeechControllerListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  public loadChunks(docId: string, chunks: SpeechChunk[], initialChunkIndex = 0) {
    this.stop();
    this.documentId = docId;
    this.chunks = chunks;
    this.currentChunkIndex = Math.max(0, Math.min(initialChunkIndex, chunks.length - 1));
    this.setStatus("idle");
    this.notifyChunkChange();
  }

  public setOptions(options: Partial<TTSPlaybackOptions>) {
    this.options = { ...this.options, ...options };
    if (options.rate !== undefined && this.activeEngine.setRate) {
      this.activeEngine.setRate(options.rate);
    }
  }

  public getStatus(): TTSStatus {
    return this.status;
  }

  public getCurrentChunk(): SpeechChunk | null {
    if (this.currentChunkIndex >= 0 && this.currentChunkIndex < this.chunks.length) {
      return this.chunks[this.currentChunkIndex];
    }
    return null;
  }

  public getCurrentChunkIndex(): number {
    return this.currentChunkIndex;
  }

  public getTotalChunks(): number {
    return this.chunks.length;
  }

  public play() {
    if (this.chunks.length === 0) return;

    if (this.status === "paused") {
      this.activeEngine.resume();
      this.setStatus("playing");
      return;
    }

    if (this.currentChunkIndex < 0) {
      this.currentChunkIndex = 0;
    }

    this.speakCurrentChunk();
  }

  public pause() {
    if (this.status === "playing") {
      this.activeEngine.pause();
      this.setStatus("paused");
    }
  }

  public stop() {
    this.activeEngine.stop();
    this.setStatus("idle");
  }

  public playChunkAtIndex(index: number) {
    if (index < 0 || index >= this.chunks.length) return;
    this.stop();
    this.currentChunkIndex = index;
    this.speakCurrentChunk();
  }

  public nextChunk() {
    if (this.currentChunkIndex + 1 < this.chunks.length) {
      this.playChunkAtIndex(this.currentChunkIndex + 1);
    } else {
      this.stop();
    }
  }

  public prevChunk() {
    if (this.currentChunkIndex - 1 >= 0) {
      this.playChunkAtIndex(this.currentChunkIndex - 1);
    }
  }

  public seekToPercent(percent: number) {
    if (this.chunks.length === 0) return;
    const targetIdx = Math.floor((Math.max(0, Math.min(100, percent)) / 100) * (this.chunks.length - 1));
    this.playChunkAtIndex(targetIdx);
  }

  private speakCurrentChunk() {
    const chunk = this.getCurrentChunk();
    if (!chunk) {
      this.setStatus("idle");
      return;
    }

    this.setStatus("playing");
    this.notifyChunkChange();
    this.persistCurrentProgress();

    this.activeEngine.speak(chunk.text, this.options, {
      onStart: () => {
        this.setStatus("playing");
      },
      onEnd: () => {
        if (this.status === "playing") {
          if (this.currentChunkIndex + 1 < this.chunks.length) {
            this.currentChunkIndex++;
            this.speakCurrentChunk();
          } else {
            this.setStatus("idle");
            this.notifyChunkChange();
          }
        }
      },
      onPause: () => {
        this.setStatus("paused");
      },
      onResume: () => {
        this.setStatus("playing");
      },
      onError: (err) => {
        this.setStatus("error");
        this.listeners.forEach((l) => l.onError?.(err));
      },
      onBoundary: (charIndex, charLength) => {
        this.listeners.forEach((l) => l.onBoundary?.(charIndex, charLength));
      },
    });
  }

  private setStatus(status: TTSStatus) {
    this.status = status;
    this.listeners.forEach((l) => l.onStatusChange?.(status));
  }

  private notifyChunkChange() {
    const chunk = this.getCurrentChunk();
    this.listeners.forEach((l) => l.onChunkChange?.(this.currentChunkIndex, chunk));
  }

  private async persistCurrentProgress() {
    if (!this.documentId || this.currentChunkIndex < 0 || this.chunks.length === 0) return;
    const chunk = this.getCurrentChunk();
    if (!chunk) return;

    const percent = Math.round((this.currentChunkIndex / this.chunks.length) * 100);

    try {
      await saveProgress({
        documentId: this.documentId,
        textBlockId: chunk.blockId,
        blockIndex: chunk.blockIndex,
        charOffset: chunk.charStartInBlock,
        percent,
        updatedAt: Date.now(),
      });
    } catch (e) {
      console.warn("Failed to auto-save progress:", e);
    }
  }
}

// Global Singleton Speech Controller
let speechControllerInstance: SpeechController | null = null;

export function getSpeechController(): SpeechController {
  if (!speechControllerInstance) {
    speechControllerInstance = new SpeechController();
  }
  return speechControllerInstance;
}
