/**
 * MediaSessionManager
 * 
 * Interfaces with the W3C Media Session API (`navigator.mediaSession`) to expose
 * native playback controls and metadata on:
 * - iOS Control Center (swipe down from top right)
 * - iOS Lock Screen player widget
 * - Android Notification Shade / Lockscreen player
 * - Desktop OS media notification overlays & hardware media keys
 */

export interface MediaMetadataPayload {
  title: string;
  documentName?: string;
  pageNumber?: number;
  totalPages?: number;
  snippet?: string;
}

export interface MediaSessionCallbacks {
  onPlay: () => void;
  onPause: () => void;
  onPreviousTrack: () => void;
  onNextTrack: () => void;
  onStop?: () => void;
}

export class MediaSessionManager {
  private callbacks: MediaSessionCallbacks | null = null;
  private currentPayload: MediaMetadataPayload | null = null;

  constructor() {
    // MediaSession initialization
  }

  public registerHandlers(callbacks: MediaSessionCallbacks) {
    this.callbacks = callbacks;
    if (typeof navigator === "undefined" || !("mediaSession" in navigator)) {
      return;
    }

    try {
      navigator.mediaSession.setActionHandler("play", () => {
        this.callbacks?.onPlay();
      });

      navigator.mediaSession.setActionHandler("pause", () => {
        this.callbacks?.onPause();
      });

      navigator.mediaSession.setActionHandler("previoustrack", () => {
        this.callbacks?.onPreviousTrack();
      });

      navigator.mediaSession.setActionHandler("nexttrack", () => {
        this.callbacks?.onNextTrack();
      });

      navigator.mediaSession.setActionHandler("seekbackward", () => {
        this.callbacks?.onPreviousTrack();
      });

      navigator.mediaSession.setActionHandler("seekforward", () => {
        this.callbacks?.onNextTrack();
      });

      navigator.mediaSession.setActionHandler("stop", () => {
        if (this.callbacks?.onStop) {
          this.callbacks.onStop();
        } else {
          this.callbacks?.onPause();
        }
      });
    } catch (err) {
      console.warn("Could not bind MediaSession action handlers:", err);
    }
  }

  public updateMetadata(payload: MediaMetadataPayload) {
    this.currentPayload = payload;
    if (typeof navigator === "undefined" || !("mediaSession" in navigator)) {
      return;
    }

    try {
      const pageInfo =
        payload.pageNumber && payload.totalPages
          ? `Page ${payload.pageNumber} of ${payload.totalPages}`
          : payload.pageNumber
          ? `Page ${payload.pageNumber}`
          : "";

      const docTitle = payload.documentName || "Course Material";
      const displayTitle = payload.snippet || payload.title || docTitle;

      navigator.mediaSession.metadata = new (window as any).MediaMetadata({
        title: displayTitle,
        artist: docTitle,
        album: pageInfo ? `${pageInfo} • Reader Tech` : "Reader Tech Study Companion",
        artwork: [
          {
            src: "/assets/images/Reader-Logo-nobg.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/assets/images/Reader-Logo-nobg.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      });
    } catch (err) {
      console.debug("Failed to set MediaMetadata:", err);
    }
  }

  public setPlaybackState(state: "none" | "paused" | "playing") {
    if (typeof navigator === "undefined" || !("mediaSession" in navigator)) {
      return;
    }

    try {
      navigator.mediaSession.playbackState = state;
    } catch (err) {
      console.debug("Failed to set MediaSession playbackState:", err);
    }
  }

  public clear() {
    if (typeof navigator !== "undefined" && "mediaSession" in navigator) {
      try {
        navigator.mediaSession.playbackState = "none";
        navigator.mediaSession.metadata = null;
      } catch (err) {
        // Ignore
      }
    }
  }
}

// Global Singleton
let mediaSessionInstance: MediaSessionManager | null = null;

export function getMediaSessionManager(): MediaSessionManager {
  if (!mediaSessionInstance) {
    mediaSessionInstance = new MediaSessionManager();
  }
  return mediaSessionInstance;
}
