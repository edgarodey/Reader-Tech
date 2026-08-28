import { createWorker, Worker } from "tesseract.js";
import { PageRecord, TextBlock } from "../storage/db";
import { segmentPageIntoBlocks } from "../reader/normalizer";

let tesseractWorker: Worker | null = null;
let workerInitPromise: Promise<Worker> | null = null;

export async function getOCRWorker(): Promise<Worker> {
  if (tesseractWorker) return tesseractWorker;

  if (!workerInitPromise) {
    workerInitPromise = (async () => {
      const worker = await createWorker("eng");
      tesseractWorker = worker;
      return worker;
    })();
  }

  return workerInitPromise;
}

export interface OCRProgressEvent {
  status: string;
  progress: number;
}

export async function performPageOCR(
  canvas: HTMLCanvasElement,
  pageNumber: number,
  docId: string,
  startBlockIndex: number = 0,
  onProgress?: (event: OCRProgressEvent) => void
): Promise<{ pageRecord: PageRecord; blocks: TextBlock[]; nextBlockIndex: number }> {
  const worker = await getOCRWorker();

  const ret = await worker.recognize(canvas);
  const text = ret.data.text || "";
  const confidence = ret.data.confidence;

  const { blocks, nextIndex } = segmentPageIntoBlocks(
    text,
    pageNumber,
    docId,
    startBlockIndex
  );

  const pageRecord: PageRecord = {
    documentId: docId,
    pageNumber,
    text,
    sourceType: "ocr",
    confidence,
  };

  return {
    pageRecord,
    blocks,
    nextBlockIndex: nextIndex,
  };
}

export async function terminateOCRWorker(): Promise<void> {
  if (tesseractWorker) {
    await tesseractWorker.terminate();
    tesseractWorker = null;
    workerInitPromise = null;
  }
}
