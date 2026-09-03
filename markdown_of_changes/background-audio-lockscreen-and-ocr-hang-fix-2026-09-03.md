# Changelog: Background Lockscreen Audio & OCR Text Hang Fix

**Date:** 2026-09-03

## Summary
Resolved mobile background playback stoppage when the device screen is locked or when switching apps (e.g., WhatsApp) by introducing a silent HTML5 audio loop keep-alive manager, screen wake lock support, and full iOS Control Center / Android lock screen native controls via the W3C Media Session API. Concurrently eliminated speech freezing and hanging on OCR-extracted PDF text by introducing smart line-break unwrapping, non-pronounceable noise artifact stripping, strict speakable chunk filtering, a dynamic watchdog recovery timer in `WebSpeechEngine`, and safe cancel-to-speak race condition guards.

---

## Codebase Modifications

| File Path | Description | Lines Affected |
|-----------|-------------|----------------|
| `lib/tts/background-audio.ts` | **[NEW]** Silent HTML5 audio loop keep-alive (`AVAudioSessionCategoryPlayback` / Audio Focus) and Screen Wake Lock manager | 1–138 |
| `lib/tts/media-session.ts` | **[NEW]** Media Session API bridge for iOS Control Center, lockscreen player, metadata, and hardware playback keys | 1–146 |
| `lib/reader/normalizer.ts` | Smart line-break unwrapping for OCR paragraphs, border noise filtering, and speakable text validation | 11–74 |
| `lib/reader/chunker.ts` | Punctuation-based sentence splitting, speakable alphanumeric chunk filtering, and abbreviation fragment merging | 12–75 |
| `lib/tts/web-speech.ts` | Dynamic watchdog timeout recovery, cancel-to-speak queue debounce, text sanitization, and stall prevention | 9–153 |
| `lib/tts/speech-controller.ts` | Integrated `BackgroundAudioManager` and `MediaSessionManager`, added `unstick()` recovery, and metadata sync | 3–270 |
| `components/playback/playback-bar.tsx` | Added Lockscreen Audio active badge, `RotateCcw` unstick/restart button, and responsive controls | 10–165 |
| `app/reader/page.tsx` | Linked document metadata to speech controller, connected unstick handler, and smoothed OCR chunk reload | 114–383 |

---

## Commit Draft - Short
`feat: add background lockscreen audio, media session controls, and ocr speech hang recovery`

## Commit Draft - Long
```
feat: add background lockscreen audio, media session controls, and ocr speech hang recovery

- Added BackgroundAudioManager with looping silent HTML5 audio track to prevent mobile OSes (iOS Safari / Android Chrome / PWA) from killing audio processes when screen locks or switching to other apps (e.g. WhatsApp)
- Added Screen Wake Lock integration to keep screen active during continuous reading sessions
- Integrated W3C Media Session API to expose native playback controls (play, pause, next/prev chunk, seek) and live sentence/document metadata in iOS Control Center and Android lock screen
- Overhauled OCR text normalization with mid-sentence line break unwrapping and border artifact stripping
- Improved sentence chunker to avoid splitting on raw newlines and filter out non-pronounceable noise blocks that caused SpeechSynthesis to stall
- Implemented dynamic watchdog timer in WebSpeechEngine to automatically advance queue if browser fails to emit onend event
- Added cancel-to-speak queue cooldown to avoid Chromium utterance discard race conditions
- Added speech unstick recovery button and lockscreen audio indicator in PlaybackBar
- Verified production build across all routes with zero errors
```
