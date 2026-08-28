import * as pdfjsLib from "pdfjs-dist";

if (typeof window !== "undefined" && !pdfjsLib.GlobalWorkerOptions.workerSrc) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;
}

// PDF Document instances cache to avoid reloading array buffer repeatedly
const pdfDocCache = new Map<string, pdfjsLib.PDFDocumentProxy>();

export async function getOrLoadPDFDocument(
  docId: string,
  arrayBuffer: ArrayBuffer
): Promise<pdfjsLib.PDFDocumentProxy> {
  const cached = pdfDocCache.get(docId);
  if (cached) return cached;

  const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer.slice(0) });
  const pdfDoc = await loadingTask.promise;
  pdfDocCache.set(docId, pdfDoc);
  return pdfDoc;
}

export async function renderPDFPageToCanvas(
  pdfDoc: pdfjsLib.PDFDocumentProxy,
  pageNumber: number,
  canvas: HTMLCanvasElement,
  scale: number = 1.5
): Promise<{ width: number; height: number }> {
  const page = await pdfDoc.getPage(pageNumber);
  const viewport = page.getViewport({ scale });

  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Canvas 2D context is not available");
  }

  canvas.height = viewport.height;
  canvas.width = viewport.width;

  const renderContext = {
    canvasContext: context,
    viewport,
  };

  await page.render(renderContext).promise;

  return { width: viewport.width, height: viewport.height };
}
