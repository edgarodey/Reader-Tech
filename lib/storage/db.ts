import { openDB, type DBSchema, type IDBPDatabase } from "idb";

export interface DocumentRecord {
  id: string;
  fileName: string;
  fileSize: number;
  fingerprint: string;
  pageCount: number;
  createdAt: number;
  lastOpenedAt: number;
  extractionStatus: "pending" | "processing" | "completed" | "error";
  activeView: "reflowable" | "pdf";
  currentPage: number;
  currentTextBlockId?: string;
  pdfData?: ArrayBuffer; // stored locally in IndexedDB so student can reload and switch to PDF view anytime
}

export interface PageRecord {
  documentId: string;
  pageNumber: number;
  text: string;
  sourceType: "text" | "ocr" | "empty";
  confidence?: number;
}

export interface TextBlock {
  blockId: string;
  documentId: string;
  pageNumber: number;
  blockIndex: number;
  type: "heading" | "paragraph" | "list" | "table-ish" | "unknown";
  text: string;
  startOffset?: number;
  endOffset?: number;
}

export interface ProgressRecord {
  documentId: string;
  textBlockId: string;
  blockIndex: number;
  charOffset: number;
  percent: number;
  updatedAt: number;
}

export interface SettingsRecord {
  voiceId?: string;
  voiceName?: string;
  rate: number; // 0.5 to 2.5
  pitch: number; // 0.5 to 1.5
  volume: number; // 0 to 1
  fontSize: number; // in px (14 - 32)
  lineHeight: number; // (1.4 - 2.2)
  theme: "light" | "dark" | "sepia";
  autoOCR: boolean;
  activeEngineId: "web-speech" | "local-wasm";
}

interface ReaderDB extends DBSchema {
  documents: {
    key: string;
    value: DocumentRecord;
    indexes: { "by-lastOpened": number };
  };
  pages: {
    key: [string, number]; // [documentId, pageNumber]
    value: PageRecord;
    indexes: { "by-documentId": string };
  };
  textBlocks: {
    key: string; // blockId
    value: TextBlock;
    indexes: { "by-documentId": string; "by-doc-page": [string, number] };
  };
  progress: {
    key: string; // documentId
    value: ProgressRecord;
  };
  settings: {
    key: string;
    value: any;
  };
}

const DB_NAME = "reader_local_db";
const DB_VERSION = 1;

let dbPromise: Promise<IDBPDatabase<ReaderDB>> | null = null;

export function getDB(): Promise<IDBPDatabase<ReaderDB>> {
  if (typeof window === "undefined") {
    // SSR guard
    return Promise.reject(new Error("IndexedDB is only accessible on client side"));
  }

  if (!dbPromise) {
    dbPromise = openDB<ReaderDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("documents")) {
          const docStore = db.createObjectStore("documents", { keyPath: "id" });
          docStore.createIndex("by-lastOpened", "lastOpenedAt");
        }
        if (!db.objectStoreNames.contains("pages")) {
          const pageStore = db.createObjectStore("pages", { keyPath: ["documentId", "pageNumber"] });
          pageStore.createIndex("by-documentId", "documentId");
        }
        if (!db.objectStoreNames.contains("textBlocks")) {
          const blockStore = db.createObjectStore("textBlocks", { keyPath: "blockId" });
          blockStore.createIndex("by-documentId", "documentId");
          blockStore.createIndex("by-doc-page", ["documentId", "pageNumber"]);
        }
        if (!db.objectStoreNames.contains("progress")) {
          db.createObjectStore("progress", { keyPath: "documentId" });
        }
        if (!db.objectStoreNames.contains("settings")) {
          db.createObjectStore("settings");
        }
      },
    });
  }

  return dbPromise;
}
