# Reader Architecture & System Design

Reader is engineered with a **local-first, client-heavy paradigm** to maximize student privacy, avoid recurring cloud inference/storage costs, and enable reliable offline study habits.

---

## High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    Reader Web Application                   │
│                     (Next.js App Router)                    │
└──────────────────────────────┬──────────────────────────────┘
                               │
            ┌──────────────────┴──────────────────┐
            ▼                                     ▼
┌───────────────────────┐             ┌───────────────────────┐
│     Client Worker     │             │     Local Storage     │
│   Extraction & OCR    │             │      (IndexedDB)      │
│                       │             │                       │
│ • PDF.js Worker       │             │ • Documents           │
│ • Tesseract.js (WASM) │────────────►│ • Pages & TextBlocks  │
│ • Normalizer/Chunker  │             │ • Reading Progress    │
└───────────────────────┘             │ • User Preferences    │
                                      └───────────┬───────────┘
                                                  │
            ┌─────────────────────────────────────┘
            ▼
┌─────────────────────────────────────────────────────────────┐
│                   Dual-View Presentation                    │
├──────────────────────────────┬──────────────────────────────┤
│  Reflowable Reading View     │  Original PDF Canvas View    │
│  (Dynamic typography, meas-  │  (PDF.js Canvas rendering,   │
│  ure, active sync highlight) │  zoom, diagrams & equations) │
└──────────────┬───────────────┴──────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────────────────────┐
│                   Speech Queue Controller                   │
├─────────────────────────────────────────────────────────────┤
│  TTS Engine Interface (TTSEngine)                           │
│  ├── [Active V1] WebSpeechEngine (Browser SpeechSynthesis)  │
│  ├── [Roadmap] YarnGPTEngine (Nigerian-Accented English)    │
│  └── [Roadmap] LocalModelEngine (On-Device WASM/ONNX)       │
└─────────────────────────────────────────────────────────────┘
```

---

## Core Principles

1. **Zero Server Dependency for Documents**: PDFs never leave the user's browser. All parsing, OCR, and storage happens client-side.
2. **Reflowable Default**: The primary study interface converts dense PDF pages into responsive single-column typography optimized for mobile devices (320px – 430px).
3. **Pluggable Speech Synthesis**: All audio playback is managed through the `TTSEngine` interface (`lib/tts/types.ts`), allowing easy integration of new TTS engines like YarnGPT without modifying UI components.
