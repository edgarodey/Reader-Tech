# Reader 📚🎙️

> **Free, local-first academic study reader for university students who learn from PDFs. Built by Edgar Odey.**

Reader transforms static, dense course PDFs into a responsive, reflowable study interface accompanied by real-time synchronized text-to-speech, client-side OCR for scanned notes, and dual-view PDF inspection.

---

## 🌟 Key Features

- **📖 Reflowable Study View**: Designed mobile-first so students never need to pinch-to-zoom on phones.
- **🖼️ Dual-View PDF Reference**: Toggle to the original PDF canvas view at any time to inspect diagrams, tables, and mathematical formulas.
- **🎙️ Synchronized Playback**: Listen hands-free with active sentence highlighting and speed controls (0.5x – 2.0x).
- **🔒 100% Local-First & Private**: Course documents are parsed and read locally in your browser sandbox using IndexedDB. Zero cloud uploads.
- **⚡ Client-Side OCR**: Uses Tesseract.js in a Web Worker to extract readable text from scanned pages on-demand.
- **🎙️ Pluggable TTS Engine**: Clean abstraction boundary supporting web speech and offline WASM AI models.
- **📱 Installable PWA**: Add to home screen on Android and iOS for full-screen offline-ready study sessions.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, TypeScript, Tailwind CSS)
- **PDF Engine**: [PDF.js](https://mozilla.github.io/pdf.js/) (Client-side worker)
- **OCR Engine**: [Tesseract.js](https://github.com/naptha/tesseract.js) (WebAssembly worker)
- **Speech Engine**: Browser Web Speech API (`SpeechSynthesis`) + Modular `TTSEngine` abstraction
- **Local Storage**: IndexedDB via [`idb`](https://github.com/jakearchibald/idb)

---

## 🚀 Getting Started

### Prerequisites

- Node.js `v18+` or `v20+`
- npm or yarn

### Installation & Local Run

```bash
# 1. Clone the repository
git clone https://github.com/your-username/reader-tech.git
cd reader-tech

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🏛️ Architecture & Governance

- See [ARCHITECTURE.md](./ARCHITECTURE.md) for full module structure and data flow.
- See [CONTRIBUTING.md](./CONTRIBUTING.md) for community contribution guidelines.

---

## 📄 License

Licensed under the [PolyForm Noncommercial License 1.0.0](./LICENSE) (strictly non-commercial, open for academic and community study). Built by Edgar Odey.

