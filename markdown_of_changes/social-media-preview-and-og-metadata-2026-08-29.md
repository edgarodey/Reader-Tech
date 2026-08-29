# Social Media Preview (Open Graph & Twitter Cards) Added

- **Date**: 2026-08-29
- **Summary**: Implemented high-resolution Open Graph and Twitter Card social media preview metadata, auto-generated Next.js 14 App Router image endpoints (`/opengraph-image.png` and `/twitter-image.png`), created static 1200x630 fallback banners (`/og-image.png`), added route-level metadata layouts for Library, Settings, Reader, Help, and Open Source routes, and enhanced rich meta descriptions and title templates across the entire web application.

## Codebase Modifications

- `app/layout.tsx`: Configured root `metadata` with title template, descriptive student-first study companion copy, full `openGraph` tags (title, description, URL, siteName, 1200x630 image dimensions, type), `twitter` large image card tags (`summary_large_image`, creator, description), and search engine robot directives (Lines 20–70).
- `app/opengraph-image.png`: High-resolution Open Graph image banner asset serving automatic dynamic social card metadata across scrapers (Facebook, WhatsApp, LinkedIn, Discord, Telegram, iMessage, Twitter).
- `app/twitter-image.png`: High-resolution Twitter summary large image card asset.
- `public/og-image.png` & `public/og-image.jpg`: Static fallback preview banners.
- `public/assets/images/reader-og-preview.png`: Static asset copy.
- `app/library/layout.tsx`: Added dedicated title and Open Graph metadata for the Library view (Lines 1–18).
- `app/settings/layout.tsx`: Added dedicated title and Open Graph metadata for Settings & Voice Options (Lines 1–18).
- `app/reader/layout.tsx`: Added dedicated title and Open Graph metadata for Study Reader workspace (Lines 1–18).
- `app/(marketing)/help/layout.tsx`: Added dedicated title and Open Graph metadata for Help & FAQ (Lines 1–18).
- `app/(marketing)/open-source/layout.tsx`: Added dedicated title and Open Graph metadata for Open Source & License (Lines 1–18).

## Commit Draft - Short
`feat: add rich social media preview cards and open graph metadata`

## Commit Draft - Long
```text
feat: add rich social media preview cards and open graph metadata

- Add high-resolution 1200x630 Open Graph & Twitter summary_large_image preview assets to app and public directories
- Configure Next.js 14 metadataBase, title template, and rich openGraph/twitter tags in root layout
- Create route-level metadata layouts for Library, Reader, Settings, Help, and Open Source views
- Ensure social link sharing across Twitter/X, WhatsApp, LinkedIn, Telegram, Discord, and iMessage displays rich previews with tagline, description, and branding
```
