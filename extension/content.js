// Reader Extension Content Script for Miva & University LMS pages

function detectCourseMaterial() {
  const title = document.title || "Course Material";
  let pdfUrl = null;

  // 1. Look for iframe with PDF embed (standard Moodle / Miva pattern)
  const iframes = Array.from(document.querySelectorAll("iframe"));
  for (const f of iframes) {
    if (f.src && (f.src.includes(".pdf") || f.src.includes("pluginfile.php") || f.src.includes("view.php") || f.src.includes("chrome-extension"))) {
      pdfUrl = f.src;
      break;
    }
  }

  // 2. Look for embed or object elements
  if (!pdfUrl) {
    const embed = document.querySelector("embed[type='application/pdf'], object[type='application/pdf']");
    if (embed) pdfUrl = embed.src || embed.data;
  }

  // 3. Look for resource links on page
  if (!pdfUrl) {
    const links = Array.from(document.querySelectorAll("a"));
    const match = links.find((a) => a.href && (a.href.includes(".pdf") || a.href.includes("pluginfile.php")));
    if (match) pdfUrl = match.href;
  }

  // 4. Extract visible main article/text content if no PDF is found
  let pageText = "";
  const mainContent = document.querySelector("main") || document.querySelector("#region-main") || document.querySelector(".course-content") || document.body;
  if (mainContent) {
    pageText = mainContent.innerText || "";
  }

  return {
    title,
    pdfUrl,
    hasPdf: !!pdfUrl,
    textPreview: pageText.slice(0, 500),
    url: window.location.href,
  };
}

// Listen for queries from Side Panel
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "GET_COURSE_PAGE_INFO") {
    const info = detectCourseMaterial();
    sendResponse(info);
    return true;
  }

  if (request.type === "FETCH_PDF_BUFFER") {
    const info = detectCourseMaterial();
    if (!info.pdfUrl) {
      sendResponse({ error: "No PDF course material found on this page" });
      return true;
    }

    fetch(info.pdfUrl, { credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error("HTTP " + res.status + ": Failed to grab PDF");
        return res.arrayBuffer();
      })
      .then((buf) => {
        // Convert ArrayBuffer to byte array for JSON serialization
        const byteArray = Array.from(new Uint8Array(buf));
        sendResponse({ success: true, byteArray, title: info.title });
      })
      .catch((err) => {
        sendResponse({ error: err.message || "Failed to fetch PDF data" });
      });

    return true; // Keep message channel open for async response
  }
});
