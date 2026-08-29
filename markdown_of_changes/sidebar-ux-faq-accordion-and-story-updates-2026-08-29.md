# Sidebar UX, Story Updates, FAQ Accordion & Student-Centric Copy

- **Date**: 2026-08-29
- **Summary**: Resolved sidebar open-by-default and mobile flicker bug, sanitized all changelogs to remove local machine paths, integrated Edgar Odey's authentic university origin story, added interactive accordion FAQ tabs, updated landing page with practical Nigerian student-centric feature highlights, linked creator profiles to https://edgarodey.com, and fixed responsive layout on the settings data card.

## Modifications
- `components/ui/sidebar.tsx`: Changed initial state to `false` so the sidebar is closed by default across all viewports, added backdrop overlay with escape key support, and linked creator bio to `https://edgarodey.com` (Lines 35–185).
- `components/ui/footer.tsx`: Linked creator attribution to `https://edgarodey.com` (Lines 40–48).
- `app/(marketing)/page.tsx`: Rewrote feature pillars into practical, student-centric value propositions (Binge-listen to handouts, zero data waste, scanned handout OCR, 2.0x cramming mode, eye strain prevention, 100% private) (Lines 35–160).
- `app/(marketing)/about/page.tsx`: Added Edgar Odey's authentic origin story on late-night PDF courseware exhaustion during distance-learning studies and linked portfolio (Lines 15–65).
- `app/(marketing)/help/page.tsx`: Built an interactive accordion FAQ component allowing students to click and expand/collapse questions smoothly (Lines 15–120).
- `app/(marketing)/open-source/page.tsx`: Added official GitHub repository card, clone command, and non-commercial open governance explanation (Lines 15–90).
- `app/settings/page.tsx`: Fixed "Locally Cached Materials" card to wrap and scale responsively on mobile without squashing buttons (Lines 250–270).
- `app/settings/page.tsx`, `app/library/page.tsx`, `app/reader/page.tsx`: Added dynamic export to prevent SSG prerendering errors during builds.
- `markdown_of_changes/git-repo-init-and-push-2026-08-28.md`, `markdown_of_changes/license-update-polyform-noncommercial-2026-08-28.md`: Removed local user system paths.

## Commit Draft - Short
`feat: improve sidebar UX, add origin story, FAQ accordion, and Nigerian student copy`

## Commit Draft - Long
```
feat: improve sidebar UX, add origin story, FAQ accordion, and Nigerian student copy

- Close navigation sidebar by default to prevent obscuring page hero content
- Add backdrop blur overlay and Escape key support for sidebar drawer
- Replace generic marketing text with practical Nigerian university student-focused features
- Publish authentic origin story by Edgar Odey on the About page
- Implement interactive collapsible FAQ accordion on the Help page
- Add GitHub repository card and clone instructions on Open Source page
- Link all Edgar Odey creator references to https://edgarodey.com
- Fix mobile responsive alignment on Settings data card
- Sanitize changelog files to remove local machine paths
```
