# Changelog: Miva In-Memory Importer, Chrome Side Panel Extension & Voice Inflection Upgrade

**Date:** 2026-09-05

## Summary

1. **User Voice Feedback Fix (Voice Inflection & Male Voice Option)**:
   - **Gender Classification Heuristics**: Automatically detects and categorizes voices across Windows, Chromium, macOS, and Android into `Male` 👨, `Female` 👩, and `Neutral`.
   - **Natural/Neural Voice Priority**: Scans for natural and neural voice providers (`Microsoft Natural`, `Google`, `Enhanced`, `Wavenet`) and ranks them to the top of the speech list, avoiding flat legacy synthesizer defaults.
   - **1-Tap Male / Female Quick Switcher**: Added an instant 1-tap gender toggle button directly onto the reader playback bar.
   - **Categorized Voice Menu**: Added filter tabs (`All`, `✨ Natural`, `👨 Male`, `👩 Female`) and visual badges on each voice card so students can choose their ideal narrator.
   - **Inflection Pacing**: Tuned default utterance pitch (1.02) and rate (0.98) for a warmer, human-sounding reading cadence.

2. **"1-Click Send to Reader" Bookmarklet & In-Memory Receiver (`/import`)**:
   - Built a zero-download in-memory PDF bridge.
   - Using the bookmarklet on any Miva Open University course page (`lms.miva.university`), the PDF is fetched in-memory using the student's active authenticated session and passed directly to Reader via `window.postMessage`.
   - Documents are extracted via `extractPDF`, persisted to IndexedDB, and opened with auto-playback in zero clicks—without ever downloading a file to local disk.

3. **"Unpacked" Chrome Side Panel Extension (`/extension`)**:
   - Created a standalone, Manifest V3 companion extension in `extension/`.
   - Configured with `chrome.sidePanel` to dock directly beside Miva course materials.
   - Detects embedded PDF iframes and lecture text automatically.
   - Includes full playback controls (Play/Pause, Prev/Next sentence, 1-tap Male/Female toggle, speed slider, and "Full App ↗" one-click transfer).
   - Generated valid 16px, 48px, and 128px PNG brand icons and created step-by-step developer-mode loading instructions.

---

## Codebase Modifications

| File Path | Description | Lines Affected |
|-----------|-------------|----------------|
| `lib/tts/types.ts` | Added `gender` and `isNatural` fields to `VoiceOption` | 5–10 |
| `lib/tts/web-speech.ts` | Gender detection heuristics, natural voice priority sorting, prosody defaults | 42–102, 137–160 |
| `components/playback/playback-bar.tsx` | Added 1-tap Male/Female button, category chips, and voice badges | 56–105, 240–345 |
| `app/settings/page.tsx` | Added gender and natural badges to settings voice dropdown | 142–148 |
| `app/reader/page.tsx` | Added `autoplay=true` query support for instant playback on import | 130–140 |
| `app/import/page.tsx` | New in-memory PDF receiver page with postMessage listener and bookmarklet setup | 1–305 [NEW] |
| `components/ui/sidebar.tsx` | Added "Miva Importer" link in sidebar navigation | 13–20, 70–76 |
| `extension/manifest.json` | Manifest V3 configuration for Side Panel extension | 1–35 [NEW] |
| `extension/background.js` | Service worker configuring `openPanelOnActionClick` | 1–16 [NEW] |
| `extension/content.js` | Content script detecting Miva iframe PDF streams and page text | 1–65 [NEW] |
| `extension/sidepanel/index.html` | Side panel UI for docked study playback | 1–105 [NEW] |
| `extension/sidepanel/sidepanel.css` | Brand-themed styling for docked side panel | 1–280 [NEW] |
| `extension/sidepanel/sidepanel.js` | Speech playback engine and Miva bridge for side panel | 1–260 [NEW] |
| `extension/generate-icons.js` | Node script generating valid 16px, 48px, 128px PNG icons | 1–80 [NEW] |
| `extension/README.md` | Quickstart guide for loading unpacked extension in 30 seconds | 1–55 [NEW] |

---

## Commit Draft - Short
`feat: add miva in-memory pdf importer, chrome side panel extension, and voice inflection upgrade`

## Commit Draft - Long
```
feat: add miva in-memory pdf importer, chrome side panel extension, and voice inflection upgrade

- Add gender classification heuristics and natural voice prioritization in WebSpeechEngine
- Add 1-tap Male/Female quick switcher and category filters on reader playback bar
- Build /import in-memory receiver page supporting postMessage PDF transfer from Miva
- Create 1-click bookmarklet allowing students to listen to Miva materials without downloading files
- Build Manifest V3 Chrome Side Panel extension in /extension for docked study sessions
- Generate valid 16px, 48px, and 128px PNG extension icons
- Add Miva Importer quick link in navigation sidebar
```
