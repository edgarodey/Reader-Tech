import * as pdfjsLib from "pdfjs-dist";
import { DocumentRecord, PageRecord, TextBlock } from "../storage/db";
import { segmentPageIntoBlocks } from "../reader/normalizer";

// Ensure worker is properly configured in client environment
if (typeof window !== "undefined" && !pdfjsLib.GlobalWorkerOptions.workerSrc) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;
}

export interface ExtractionResult {
  docRecord: DocumentRecord;
  pages: PageRecord[];
  blocks: TextBlock[];
  hasScannedPages: boolean;
}

export async function extractPDF(
  file: File,
  onProgress?: (current: number, total: number) => void
): Promise<ExtractionResult> {
  const originalBuffer = await file.arrayBuffer();
  // Pass a cloned slice to PDF.js so the original buffer is not detached by web worker transfer
  const workerBuffer = originalBuffer.slice(0);
  const loadingTask = pdfjsLib.getDocument({ data: workerBuffer });
  const pdfDoc = await loadingTask.promise;
  const pageCount = pdfDoc.numPages;

  const docId = `doc_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  const pages: PageRecord[] = [];
  const allBlocks: TextBlock[] = [];
  let blockIndexCounter = 0;
  let hasScannedPages = false;

  for (let pageNum = 1; pageNum <= pageCount; pageNum++) {
    onProgress?.(pageNum, pageCount);
    const page = await pdfDoc.getPage(pageNum);
    const textContent = await page.getTextContent();
    
    // Concatenate text items
    const rawItems = textContent.items
      .map((item: any) => item.str)
      .join(" ");

    const trimmed = rawItems.trim();
    const isTextEmpty = trimmed.length < 20;

    if (isTextEmpty) {
      hasScannedPages = true;
    }

    const { blocks, nextIndex } = segmentPageIntoBlocks(
      trimmed,
      pageNum,
      docId,
      blockIndexCounter
    );
    blockIndexCounter = nextIndex;
    allBlocks.push(...blocks);

    pages.push({
      documentId: docId,
      pageNumber: pageNum,
      text: trimmed,
      sourceType: isTextEmpty ? "empty" : "text",
    });
  }

  const docRecord: DocumentRecord = {
    id: docId,
    fileName: file.name,
    fileSize: file.size,
    fingerprint: `${file.name}_${file.size}_${pageCount}`,
    pageCount,
    createdAt: Date.now(),
    lastOpenedAt: Date.now(),
    extractionStatus: "completed",
    activeView: "reflowable",
    currentPage: 1,
    pdfData: originalBuffer,
  };

  return {
    docRecord,
    pages,
    blocks: allBlocks,
    hasScannedPages,
  };
}
