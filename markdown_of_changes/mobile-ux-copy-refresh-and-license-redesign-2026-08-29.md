# Mobile UX, Copy Refresh, Library Button Logic & License Redesign — 2026-08-29

## Date
2026-08-29

## Summary
Resolved several mobile layout and UX issues, refreshed marketing copy to focus cleanly on student listening benefits, fixed dual upload button behavior in the Library view, corrected the GitHub repository clone URL in documentation, and completely redesigned the Open Source & PolyForm Noncommercial License page with interactive permission matrices and copy-to-clipboard utilities.

---

## Modifications

1. `app/(marketing)/page.tsx`:
   - **Lines 39-44**: Refactored the hero badge to use responsive font sizing (`text-[11px] sm:text-xs`), compact padding (`py-1 px-3 sm:px-3.5`), and `shrink-0` on the sparkles icon to eliminate awkward mobile spacing and line breaks.
   - **Lines 46-56**: Updated headline to *"Listen to your course materials. Give your eyes a break."* and refined subheadline copy to emphasize listening to dense university PDFs at the student's own pace.
   - **Lines 65-78**: Replaced *"Zero Data Wastage"* with *"Your PDFs Stay on Your Device"* and improved mobile wrapping.
   - **Lines 131-205**: Upgraded feature section headline to *"Your PDFs were made to be studied — not stared at for hours"* and replaced all 6 feature cards with refined, calm, academic copy (including *"Study at Your Speed"* instead of fast cramming).

2. `components/pdf/file-picker.tsx`:
   - **Lines 162-172**: Fixed value tags below the upload dropzone on mobile by switching to `flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[11px] sm:text-xs`, ensuring each tag wraps cleanly without misaligning icons.

3. `components/ui/footer.tsx`:
   - **Lines 9-38**: Converted footer branding and navigation to be left-aligned (`items-start text-left`), aligned the shield icon cleanly beside the privacy message (`items-start gap-2`), and organized menu links to stand neatly to the left on mobile screens.

4. `components/ui/navbar.tsx`:
   - **Lines 50-57**: Re-engineered the mobile navbar `+` button into a sleek, compact square icon button (`h-8 w-8 rounded-xl`) with centered icon, transitioning to a full text button on desktop (`sm:w-auto sm:px-3`).

5. `app/library/page.tsx`:
   - **Lines 89-95**: Added conditional check `!loading && documents.length > 0` to hide the top-right *"Upload New PDF"* button when the library is empty, preventing confusing duplicate buttons.

6. `CONTRIBUTING.md`:
   - **Lines 10-13**: Updated git clone command to point to `https://github.com/edgarodey/Reader-Tech.git` and directory `Reader-Tech`.

7. `README.md`:
   - **Lines 41-43**: Updated repository clone instructions to point to `https://github.com/edgarodey/Reader-Tech.git`.

8. `app/(marketing)/open-source/page.tsx`:
   - Completely redesigned the Open Source & License page with a modern UI, 1-click clone command snippet, interactive *"What You Can Freely Do"* vs *"What Is Prohibited"* permission matrix, collapsible full PolyForm Noncommercial 1.0.0 text with copy button, and structured architecture cards.

---

## Commit Draft - Short
`feat: mobile layout fixes, homepage copy refresh, library button logic & license redesign`

## Commit Draft - Long
```
feat: mobile layout fixes, homepage copy refresh, library button logic & license redesign

- Fix hero badge and file picker feature tags wrapping and alignment on mobile viewports
- Convert footer layout and menu items to clean left-aligned structure with inline shield icon
- Refactor navbar mobile '+' button into a compact, refined square icon button
- Conditionally render top upload button in library page only when documents exist
- Refresh homepage headline and feature copy to convey calm, academic listening benefits
- Redesign open-source & license page with permission matrix, copy utilities, and full legal text
- Update repository clone URLs in CONTRIBUTING.md and README.md to edgarodey/Reader-Tech
```
