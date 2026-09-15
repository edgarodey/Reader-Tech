# Reader - Miva Chrome Extension (Side Panel Companion) 🎙️📚

> **Docked study audio player for university course materials. Built for Miva Open University.**

---

## 🚀 How to Install in Chrome (Takes 30 Seconds)

No waiting for Chrome Web Store approval! You can use this immediately via Chrome's built-in **Developer Mode**:

1. Open Google Chrome.
2. In the address bar, type:
   ```text
   chrome://extensions/
   ```
   and press **Enter**.
3. In the top-right corner of the page, toggle on **Developer mode**.
4. Click the **Load unpacked** button in the top-left corner.
5. In the file picker, select this folder:
   ```text
   Reader-Tech/extension
   ```
6. **Done!** The Reader extension icon will appear in your Chrome toolbar.

---

## 📌 How to Use on Miva Open University

1. Open your course page on Miva (e.g. `lms.miva.university/mod/url/view.php?id=...`).
2. Click the **Reader extension icon** in your toolbar (or pin it for quick access).
3. The **Reader Side Panel** opens docked directly beside your lecture notes and PDF.
4. Use the controls:
   - **Play / Pause**: Start listening to the page or course document.
   - **👨 Male / 👩 Female Toggle**: 1-click switch between natural male and female voices.
   - **Speed (0.75x – 2.0x)**: Speed up during exam revisions.
   - **Full App ↗**: Click anytime to transfer the document in-memory into the full dual-view Reader web app without downloading!

---

## 📦 How to Share with Classmates or Prepare for Chrome Web Store

To share with friends:
1. Right-click the `extension` folder and click **Send to > Compressed (zipped) folder** (or `zip -r reader-extension.zip extension/`).
2. Send the `.zip` to your classmate.
3. They unzip it, go to `chrome://extensions`, toggle **Developer Mode**, and click **Load unpacked**!

When you're ready to deploy publicly to the Chrome Web Store:
- The `manifest.json` is already Manifest V3 compliant.
- All icons (16px, 48px, 128px) are pre-generated in `icons/`.
- Upload the `.zip` file directly to the [Chrome Developer Dashboard](https://chrome.google.com/webstore/devconsole).
