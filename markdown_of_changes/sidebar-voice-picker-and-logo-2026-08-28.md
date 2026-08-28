# Changelog: Sidebar Navigation, Fixed Voice Picker, Custom Logo & Clean Header

**Date:** 2026-08-28

## Summary
1. **Collapsible Sidebar Navigation**: Moved top navigation options (Library, Settings, About, Help, Open Source) to a responsive collapsible sidebar drawer with open/close hamburger toggle button. This keeps the top bar spacious, distraction-free, and optimized for both desktop and mobile.
2. **Fixed Voice Selector Dropdown**: Resolved vertical font clipping and squashed item bug in the speech playback bar by adding generous padding, search filter, language pills, and clean card items.
3. **Removed "V1" Tag**: Removed the "V1" badge from the Reader logo and header.
4. **Custom Logo & Favicon**: Set the official logo `/assets/images/Reader-Logo-nobg.png` as the application brand icon across Navbar, Sidebar, PWA manifest, and Open Graph/Twitter metadata.

---

## Codebase Modifications

| File Path | Description | Lines Affected |
|-----------|-------------|----------------|
| `components/ui/sidebar.tsx` | New collapsible sidebar drawer with `SidebarProvider` context, navigation items, and logo | 1–160 [NEW] |
| `components/ui/navbar.tsx` | Simplified top navbar to hamburger toggle, clean logo, and quick action | 1–55 |
| `components/reader/reader-header.tsx` | Added hamburger sidebar toggle to reader navbar for seamless menu access | 15–65 |
| `components/playback/playback-bar.tsx` | Redesigned voice dropdown with search input, full-height rows, and zero font clipping | 40–210 |
| `app/layout.tsx` | Integrated `SidebarProvider`, `<Sidebar />`, and custom logo favicon metadata | 1–85 |
| `public/manifest.webmanifest` | Updated PWA icons to `/assets/images/Reader-Logo-nobg.png` | 1–18 |

---

## Commit Draft - Short
`feat: add collapsible sidebar, fix voice selector, and integrate custom logo`

## Commit Draft - Long
```
feat: add collapsible sidebar, fix voice selector, and integrate custom logo

- Replaced crowded top-right navigation links with a collapsible responsive sidebar drawer
- Added hamburger toggle button across all views including reader header
- Fixed vertical squashing and clipping in speech voice selector dropdown
- Removed V1 badge next to Reader name
- Configured Reader-Logo-nobg.png as application logo and favicon
```
