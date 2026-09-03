# Changelog: Social Follow Links, FAQ Single-Accordion & Mobile Layout Overflow Fix

**Date:** 2026-09-03

## Summary
Integrated official social follow links for X (`https://x.com/edgar0dey`), Instagram (`https://instagram.com/odeyedgar`), and the official Telegram Community Group (`https://t.me/+3ITyC9dA8Kw0MzVk`) with custom SVG icons across the navigation bar, sidebar drawer, About page, Help & FAQ page, Open Source page, Library page, Settings page, and global footer. Concurrently resolved mobile viewport horizontal spacing/centering imbalances on Library, Settings, About, and Help pages by enforcing `w-full max-w-full overflow-x-hidden` container widths and wrapping responsive social cards. Removed the redundant Shield icon from the Footer tagline, and added a community FAQ question pointing users to the Telegram group.

---

## Codebase Modifications

| File Path | Description | Lines Affected |
|-----------|-------------|----------------|
| `components/ui/social-links.tsx` | Added `TelegramIcon`, added Telegram community link (`https://t.me/+3ITyC9dA8Kw0MzVk`), and enforced responsive button wrapping for small mobile screens | 35–48, 62–165 |
| `components/ui/navbar.tsx` | Added direct "Join Telegram" community action button in header actions | 9, 47–60 |
| `components/ui/footer.tsx` | Removed `ShieldCheck` icon, moved privacy text directly under tagline, added `w-full overflow-hidden` | 3, 7, 19–23 |
| `components/ui/sidebar.tsx` | Integrated `FollowSocials` with Telegram into the sidebar drawer footer | 19, 178–182 |
| `app/(marketing)/about/page.tsx` | Enforced balanced container max-width (`w-full max-w-4xl mx-auto`) and added `FollowSocials` card | 17, 122–128 |
| `app/(marketing)/help/page.tsx` | Added Telegram community question as 2nd FAQ, single-open accordion toggle, balanced desktop container, and `FollowSocials` card | 35–42, 90–97, 190–195 |
| `app/(marketing)/open-source/page.tsx` | Fixed mobile card overflow on GitHub hero card, added text wrapping, and added `FollowSocials` card | 24, 70–140, 330–334 |
| `app/library/page.tsx` | Fixed desktop centering with `w-full max-w-6xl mx-auto`, improved empty state padding, and added `FollowSocials` | 76–135, 205–211 |
| `app/settings/page.tsx` | Fixed desktop centering with `w-full max-w-4xl mx-auto` and added `FollowSocials` | 72, 288–293 |
| `app/layout.tsx` | Added `w-full max-w-full overflow-x-hidden` on `body` and `main` to prevent horizontal mobile viewport scroll | 108–114 |

---

## Commit Draft - Short
`feat: add telegram group, fix mobile layout centering, and remove footer shield icon`

## Commit Draft - Long
```
feat: add telegram group, fix mobile layout centering, and remove footer shield icon

- Integrated official Reader Telegram community group (https://t.me/+3ITyC9dA8Kw0MzVk) with custom SVG icon in Navbar, Sidebar, and FollowSocials cards
- Fixed mobile layout off-centering and right-side clipping across Library, Settings, About, and Help pages by wrapping social cards, adjusting empty state padding, and setting w-full max-w-full overflow-x-hidden
- Removed ShieldCheck icon from the footer tagline, formatting the text directly beneath the description
- Added Telegram community FAQ as the 2nd question in Help & FAQ page
- Verified production build across all routes with zero errors
```
