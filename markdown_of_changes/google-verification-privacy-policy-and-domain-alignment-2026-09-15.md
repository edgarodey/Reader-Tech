# Changelog: Google Verification, Privacy Policy & Domain Alignment

## Date
2026-09-15

## Summary
Resolved Google Cloud OAuth verification rejection issues for `https://reader.edgarodey.com`. Added a responsive and legally comprehensive Privacy Policy page compliant with Google's API Services User Data Policy (Limited Use disclosure), created a companion Terms of Service page, established explicit `"Privacy Policy"` navigation links across the home page, site footer, and sidebar drawer, updated Next.js metadata and canonical URLs from `reader-tech.vercel.app` to `https://reader.edgarodey.com`, and added native support for Google site verification meta tags.

## Modifications
- `app/(marketing)/privacy/page.tsx`: **[NEW]** Lines 1–391 — Full Privacy Policy page detailing client-side PDF extraction, WebAssembly OCR, Web Speech TTS, zero cloud uploads, local IndexedDB storage, user deletion mechanisms, and mandatory Google API Services User Data Policy / Limited Use disclosures.
- `app/(marketing)/terms/page.tsx`: **[NEW]** Lines 1–160 — Companion Terms of Service page covering academic use, non-commercial open-source licensing, user content ownership, and disclaimers.
- `app/layout.tsx`: **[MODIFIED]** Lines 21, 56, 79, 81–85 — Aligned `metadataBase`, OpenGraph `url`, and canonical `alternates` to `https://reader.edgarodey.com`, and configured `verification.google` for Google Search Console HTML verification meta tags.
- `components/ui/footer.tsx`: **[MODIFIED]** Lines 33–38, 42 — Added explicit anchor links for `"Privacy Policy"` (`/privacy`) and `"Terms of Service"` (`/terms`) to the site footer rendered on the home page and all sub-pages.
- `components/ui/sidebar.tsx`: **[MODIFIED]** Line 75 — Integrated `"Privacy Policy"` (`/privacy`) with the `ShieldCheck` icon into the sidebar navigation links.
- `app/(marketing)/page.tsx`: **[MODIFIED]** Lines 200–203 — Added a direct anchor link to the Privacy Policy within the local-first storage value card on the homepage.

## Commit Draft - Short
`feat: add responsive privacy policy and align canonical domain for google verification`

## Commit Draft - Long
```text
feat: add responsive privacy policy and align canonical domain for google verification

Address Google Cloud OAuth consent verification feedback for https://reader.edgarodey.com:
- Create comprehensive Privacy Policy (/privacy) detailing in-browser PDF/OCR/TTS processing, zero cloud uploads, IndexedDB persistence, and explicit adherence to Google API Services User Data Policy Limited Use requirements.
- Create companion Terms of Service (/terms) covering acceptable educational usage and PolyForm Noncommercial 1.0.0 licensing.
- Add explicit 'Privacy Policy' links to the home page, site footer, and navigation sidebar to satisfy verification crawlers.
- Update app/layout.tsx metadataBase, OpenGraph URL, and canonical URL to https://reader.edgarodey.com, resolving domain mismatch.
- Support Google Search Console verification via NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION meta tag in layout.
```

---

## Update: Sidebar Cleanup & UI Importer Removal (2026-09-15)

### Summary
Removed "Miva Importer", "Privacy Policy", and "Open Source" links from the sidebar navigation drawer per user instruction, keeping the sidebar focused solely on primary user sections (`Library`, `Settings`, `About`, and `Help & FAQ`). The Miva Importer option is now completely hidden from the entire UI. Privacy Policy and Terms of Service remain accessible in the site footer for Google verification compliance.

### Modifications
- `components/ui/sidebar.tsx`: **[MODIFIED]** Lines 11–17, 72–77 — Removed `Zap` and `Code` icon imports; removed Miva Importer (`/import`), Privacy Policy (`/privacy`), and Open Source (`/open-source`) from `navLinks`.

### Commit Draft - Short
`refactor: remove miva importer, privacy, and open source links from sidebar navigation`

### Commit Draft - Long
```text
refactor: remove miva importer, privacy, and open source links from sidebar navigation

- Strip Miva Importer (/import) from sidebar navigation drawer, completely hiding the importer from the user-facing UI.
- Remove redundant Privacy Policy and Open Source links from the sidebar drawer to maintain a clean, distraction-free navigation menu.
- Clean up unused icon imports (Zap, Code) in components/ui/sidebar.tsx.
- Retain Privacy Policy and Terms of Service in the global site footer for legal compliance and Google OAuth crawler verification.
```

