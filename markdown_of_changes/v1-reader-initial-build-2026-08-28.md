# Changelog: Initial V1 Release of Reader Local-First PDF Study Tool

**Date:** 2026-08-28

## Summary
Architected, built, and verified the complete V1 foundation of **Reader** — a free, open-source, local-first academic study reader designed for Miva Open University students and distance learners. The implementation delivers dual-view reading (reflowable typography + original PDF canvas reference), client-side worker PDF text extraction, WebAssembly OCR for scanned pages, speech synthesis with sentence highlighting, and local IndexedDB persistence with zero cloud uploads.

---

## Codebase Modifications

| File Path | Description | Lines Added |
|-----------|-------------|-------------|
| `package.json` | Next.js 14, React 18, TypeScript, Tailwind, PDF.js, Tesseract.js, IDB, and Lucide icons setup | 1–35 |
| `tailwind.config.ts` | Configured official academic dark-blue PRD palette tokens and typography | 1–41 |
| `postcss.config.mjs` | PostCSS config for Tailwind CSS processing | 1–10 |
| `tsconfig.json` | TypeScript compiler configuration with Next.js path aliases | 1–25 |
| `next.config.mjs` | Next.js configuration with Webpack canvas fallbacks for PDF.js | 1–13 |
| `app/globals.css` | Global styling, theme classes (dark, light, sepia), and sentence highlights | 1–55 |
| `app/layout.tsx` | App shell layout, Google Inter & JetBrains fonts, and SEO/OpenGraph metadata | 1–64 |
| `public/manifest.webmanifest` | PWA web app manifest for installability | 1–19 |
| `public/sw.js` | Service worker for offline shell and asset caching | 1–40 |
| `lib/utils.ts` | Tailwind class merger and byte/time formatting helpers | 1–20 |
| `lib/storage/db.ts` | IndexedDB database schema (`documents`, `pages`, `textBlocks`, `progress`, `settings`) | 1–102 |
| `lib/storage/documents.ts` | IndexedDB CRUD operations for documents, pages, and reading progress | 1–90 |
| `lib/storage/settings.ts` | User preference persistence for TTS and typography | 1–39 |
| `lib/reader/normalizer.ts` | Text cleaning, hyphenation repair, and semantic block segmentation | 1–68 |
| `lib/reader/chunker.ts` | Sentence-level chunking and offset tracking for speech queue | 1–66 |
| `lib/tts/types.ts` | Modular `TTSEngine` interface and audio types | 1–40 |
| `lib/tts/web-speech.ts` | Browser `SpeechSynthesis` engine with keep-alive and boundary tracking | 1–135 |
| `lib/tts/yarngpt.ts` | YarnGPT Nigerian-accented English TTS engine architecture placeholder | 1–54 |
| `lib/tts/local-model.ts` | On-device local AI voice engine architecture placeholder | 1–27 |
| `lib/tts/speech-controller.ts` | Centralized playback controller, queue manager, and progress auto-saver | 1–205 |
| `lib/pdf/extract.ts` | PDF.js client-side worker text extraction and page parsing | 1–85 |
| `lib/pdf/render.ts` | PDF.js canvas rendering and document proxy caching | 1–46 |
| `lib/ocr/ocr-worker.ts` | Tesseract.js client worker integration for scanned pages | 1–65 |
| `components/ui/button.tsx` | Accessible button component with multiple brand variants | 1–45 |
| `components/ui/badge.tsx` | Status and tag badges | 1–32 |
| `components/ui/modal.tsx` | Accessible dialog and confirmation modal | 1–56 |
| `components/ui/navbar.tsx` | Header navigation with responsive mobile menu | 1–88 |
| `components/ui/footer.tsx` | Footer with mission notice and copyright disclaimer | 1–48 |
| `components/pdf/file-picker.tsx` | Drag-and-drop PDF importer with extraction progress and validation | 1–155 |
| `components/reader/reader-header.tsx` | Reader navigation bar with dual-view toggle, OCR trigger, and typography menu | 1–160 |
| `components/reader/reflowable-view.tsx` | Reflowable reading view with active sentence highlight and auto-scroll | 1–190 |
| `components/pdf/pdf-canvas-view.tsx` | Original PDF canvas view with zoom, pan, and page sync | 1–145 |
| `components/playback/playback-bar.tsx` | Docked audio playback controller with speed and voice picker | 1–210 |
| `app/(marketing)/page.tsx` | Home landing page with hero, file picker, and recent library documents | 1–175 |
| `app/(marketing)/about/page.tsx` | About page highlighting Miva focus, mission, and architecture | 1–62 |
| `app/(marketing)/help/page.tsx` | FAQ & Help guide for student workflows | 1–65 |
| `app/(marketing)/open-source/page.tsx` | Open-source governance and architecture guide | 1–60 |
| `app/library/page.tsx` | Local library management with search, progress badges, and deletion | 1–185 |
| `app/settings/page.tsx` | Preferences for speech rate, voice, theme, font size, and local storage | 1–245 |
| `app/reader/page.tsx` | Full dual-view reader coordinator with audio sync and OCR | 1–295 |
| `README.md` | Comprehensive project documentation and getting-started guide | 1–62 |
| `ARCHITECTURE.md` | System design, worker data flow, and TTS abstraction architecture | 1–45 |
| `CONTRIBUTING.md` | Open-source contribution guidelines | 1–32 |
| `LICENSE` | Apache 2.0 open-source license | 1–16 |

---

## Commit Draft - Short
`feat: initial release of reader local-first pdf study tool`

## Commit Draft - Long
```
feat: initial release of reader local-first pdf study tool

- Implemented Next.js 14 App Router application shell with custom academic dark-blue palette
- Built client-side PDF.js worker extraction pipeline and Tesseract.js OCR engine
- Implemented modular TTSEngine abstraction with active WebSpeechEngine and YarnGPT placeholders
- Built dual-view reading experience: reflowable responsive typography and original PDF canvas
- Integrated IndexedDB local persistence for documents, extracted text, and reading progress
- Added PWA manifest and service worker for offline app shell caching
- Created full suite of marketing, about, help, open-source, library, and settings pages
- Verified production build and static pre-rendering with zero compile errors
```
