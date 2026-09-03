import { TTSEngine, VoiceOption, TTSPlaybackOptions, TTSStatus } from "./types";
import { WebSpeechEngine } from "./web-speech";
import { LocalModelEngine } from "./local-model";
import { SpeechChunk } from "../reader/chunker";
import { saveProgress } from "../storage/documents";
import { getBackgroundAudioManager, BackgroundAudioManager } from "./background-audio";
import { getMediaSessionManager, MediaSessionManager } from "./media-session";

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
  private documentName: string = "Course Material";
  private totalPages: number = 1;
  private listeners: Set<SpeechControllerListener> = new Set();
  private options: TTSPlaybackOptions = { rate: 1.0, pitch: 1.0, volume: 1.0 };
  private backgroundAudio: BackgroundAudioManager;
  private mediaSession: MediaSessionManager;

  constructor() {
    const webSpeech = new WebSpeechEngine();
    const localModel = new LocalModelEngine();

    this.engines.set(webSpeech.id, webSpeech);
    this.engines.set(localModel.id, localModel);

    this.activeEngine = webSpeech;
    this.backgroundAudio = getBackgroundAudioManager();
    this.mediaSession = getMediaSessionManager();

    // Wire native MediaSession controls (iOS Control Center / Android Lockscreen / Media Keys)
    this.mediaSession.registerHandlers({
      onPlay: () => this.play(),
      onPause: () => this.pause(),
      onPreviousTrack: () => this.prevChunk(),
      onNextTrack: () => this.nextChunk(),
      onStop: () => this.stop(),
    });
  }

  public setDocumentInfo(name: string, totalPages: number) {
    this.documentName = name;
    this.totalPages = totalPages;
    this.syncMediaSession();
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

  public loadChunks(
    docId: string,
    chunks: SpeechChunk[],
    initialChunkIndex = 0,
    docInfo?: { name?: string; totalPages?: number }
  ) {
    this.stop();
    this.documentId = docId;
    if (docInfo?.name) this.documentName = docInfo.name;
    if (docInfo?.totalPages) this.totalPages = docInfo.totalPages;
    this.chunks = chunks;
    this.currentChunkIndex = Math.max(0, Math.min(initialChunkIndex, chunks.length - 1));
    this.setStatus("idle");
    this.notifyChunkChange();
    this.syncMediaSession();
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

    // Start background audio session (silent loop + wake lock) to persist when phone locks
    this.backgroundAudio.start().catch(() => {});

    if (this.status === "paused") {
      this.activeEngine.resume();
      this.setStatus("playing");
      this.mediaSession.setPlaybackState("playing");
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
      this.backgroundAudio.pause();
      this.setStatus("paused");
      this.mediaSession.setPlaybackState("paused");
    }
  }

  public stop() {
    this.activeEngine.stop();
    this.backgroundAudio.stop();
    this.setStatus("idle");
    this.mediaSession.setPlaybackState("none");
  }

  public unstick() {
    // Quick recovery for when browser speech engine stalls
    this.stop();
    setTimeout(() => {
      this.play();
    }, 100);
  }

  public playChunkAtIndex(index: number) {
    if (index < 0 || index >= this.chunks.length) return;
    this.stop();
    this.currentChunkIndex = index;
    // Allow stop/cancel cycle to clear before speaking next chunk
    setTimeout(() => {
      this.speakCurrentChunk();
    }, 60);
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
      this.mediaSession.setPlaybackState("none");
      this.backgroundAudio.stop();
      return;
    }

    this.setStatus("playing");
    this.mediaSession.setPlaybackState("playing");
    this.notifyChunkChange();
    this.syncMediaSession();
    this.persistCurrentProgress();

    // Ensure background audio session remains active for lockscreen persistence
    this.backgroundAudio.start().catch(() => {});

    this.activeEngine.speak(chunk.text, this.options, {
      onStart: () => {
        this.setStatus("playing");
        this.mediaSession.setPlaybackState("playing");
      },
      onEnd: () => {
        if (this.status === "playing") {
          if (this.currentChunkIndex + 1 < this.chunks.length) {
            this.currentChunkIndex++;
            // Small pause between sentences for natural cadenced speech
            setTimeout(() => {
              if (this.status === "playing") {
                this.speakCurrentChunk();
              }
            }, 80);
          } else {
            this.setStatus("idle");
            this.mediaSession.setPlaybackState("none");
            this.backgroundAudio.stop();
            this.notifyChunkChange();
          }
        }
      },
      onPause: () => {
        this.setStatus("paused");
        this.mediaSession.setPlaybackState("paused");
        this.backgroundAudio.pause();
      },
      onResume: () => {
        this.setStatus("playing");
        this.mediaSession.setPlaybackState("playing");
        this.backgroundAudio.start().catch(() => {});
      },
      onError: (err) => {
        console.warn("TTS chunk playback error, attempting recovery:", err);
        // If an individual chunk errors, don't crash the entire session; advance to next
        if (this.status === "playing" && this.currentChunkIndex + 1 < this.chunks.length) {
          this.currentChunkIndex++;
          setTimeout(() => this.speakCurrentChunk(), 150);
        } else {
          this.setStatus("error");
          this.backgroundAudio.pause();
          this.listeners.forEach((l) => l.onError?.(err));
        }
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

  private syncMediaSession() {
    const chunk = this.getCurrentChunk();
    this.mediaSession.updateMetadata({
      title: chunk ? chunk.text : this.documentName,
      documentName: this.documentName,
      pageNumber: chunk?.pageNumber || 1,
      totalPages: this.totalPages,
      snippet: chunk ? chunk.text : undefined,
    });
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

