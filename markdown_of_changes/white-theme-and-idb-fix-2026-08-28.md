# Changelog: Fix Detached ArrayBuffer Error, White Theme Redesign & Copy Updates

**Date:** 2026-08-28

## Summary
- Fixed the IndexedDB upload error (`Failed to execute 'put' on 'IDBObjectStore': An ArrayBuffer is detached and could not be cloned`) by passing a cloned slice buffer to PDF.js worker so the original ArrayBuffer remains valid for local IndexedDB persistence.
- Overhauled the entire UI theme: transitioned the primary canvas and background to a clean, elegant white (`#ffffff` / `#f8fafc`) and utilized deep academic blue (`#05233d` / `#062643`) as secondary accents, buttons, cards, and text colors.
- Removed all references to YarnGPT and Miva Open University across marketing, about, help, open-source, layout, and settings pages.
- Updated author attribution and creator branding to **Edgar Odey**.
- Removed YarnGPT from the Settings speech engine choices.

---

## Codebase Modifications

| File Path | Description | Lines Affected |
|-----------|-------------|----------------|
| `lib/pdf/extract.ts` | Cloned buffer before passing to PDF.js to avoid ArrayBuffer detachment | 21–25, 60–65 |
| `lib/pdf/render.ts` | Sliced buffer for PDF.js document loader | 17–20 |
| `lib/storage/db.ts` | Removed YarnGPT from active engine types and set default theme to light | 50–60 |
| `lib/storage/settings.ts` | Default theme updated to light | 3–15 |
| `lib/tts/speech-controller.ts` | Removed YarnGPT engine instance | 1–35 |
| `app/globals.css` | Updated base background to white and set light theme canvas styles | 5–45 |
| `tailwind.config.ts` | Adjusted light surface palette and deep blue secondary tokens | 10–35 |
| `app/layout.tsx` | Changed body background to white and set Edgar Odey metadata | 20–60 |
| `components/ui/navbar.tsx` | Updated header to light glassmorphism with deep blue logo | 15–75 |
| `components/ui/footer.tsx` | Updated footer with light style and Edgar Odey attribution | 10–45 |
| `components/ui/button.tsx` | Updated button variants for light background compatibility | 10–35 |
| `components/ui/badge.tsx` | Updated badge variants for light background compatibility | 8–25 |
| `components/ui/modal.tsx` | Updated dialog modal for light theme | 30–50 |
| `components/pdf/file-picker.tsx` | Redesigned file picker card to white with deep blue accents | 30–140 |
| `app/(marketing)/page.tsx` | Updated home page with light background and removed Miva references | 20–160 |
| `app/(marketing)/about/page.tsx` | Updated about page with Edgar Odey attribution and removed Miva | 10–60 |
| `app/(marketing)/help/page.tsx` | Updated help page with light cards | 10–60 |
| `app/(marketing)/open-source/page.tsx` | Updated open source page with Edgar Odey attribution | 10–60 |
| `app/library/page.tsx` | Updated library page with white background and clean slate cards | 20–180 |
| `app/settings/page.tsx` | Removed YarnGPT option and updated layout to light theme | 20–220 |
| `app/reader/page.tsx` | Updated reader loading/error states for light theme | 260–295 |
| `components/reader/reader-header.tsx` | Updated reader navbar to light styling | 25–140 |
| `components/reader/reflowable-view.tsx` | Updated empty text state for light theme | 50–80 |
| `components/pdf/pdf-canvas-view.tsx` | Updated canvas reference view for light theme | 20–130 |
| `components/playback/playback-bar.tsx` | Updated docked playback bar for light theme | 30–180 |
| `README.md` | Updated README with Edgar Odey attribution and clean text | 1–65 |

---

## Commit Draft - Short
`fix: resolve detached arraybuffer upload issue and overhaul to white theme`

## Commit Draft - Long
```
fix: resolve detached arraybuffer upload issue and overhaul to white theme

- Sliced ArrayBuffer before transferring to PDF.js worker to prevent buffer detachment during IndexedDB put
- Overhauled UI from dark blue to clean white background with deep blue secondary accents
- Removed all mentions of YarnGPT and Miva Open University across codebase and documentation
- Set creator and author attribution to Edgar Odey
- Cleaned speech engine options in settings
```
