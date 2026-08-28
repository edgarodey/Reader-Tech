import { getDB, type DocumentRecord, type PageRecord, type TextBlock, type ProgressRecord } from "./db";

export async function saveDocument(doc: DocumentRecord): Promise<void> {
  const db = await getDB();
  await db.put("documents", doc);
}

export async function getDocument(id: string): Promise<DocumentRecord | undefined> {
  const db = await getDB();
  return db.get("documents", id);
}

export async function getAllDocuments(): Promise<DocumentRecord[]> {
  const db = await getDB();
  const index = db.transaction("documents").store.index("by-lastOpened");
  const docs = await index.getAll();
  return docs.reverse(); // newest first
}

export async function deleteDocument(id: string): Promise<void> {
  const db = await getDB();
  const tx = db.transaction(["documents", "pages", "textBlocks", "progress"], "readwrite");
  
  // 1. Delete document record
  await tx.objectStore("documents").delete(id);

  // 2. Delete progress
  await tx.objectStore("progress").delete(id);

  // 3. Delete pages
  const pageIndex = tx.objectStore("pages").index("by-documentId");
  let pageCursor = await pageIndex.openCursor(IDBKeyRange.only(id));
  while (pageCursor) {
    await pageCursor.delete();
    pageCursor = await pageCursor.continue();
  }

  // 4. Delete textBlocks
  const blockIndex = tx.objectStore("textBlocks").index("by-documentId");
  let blockCursor = await blockIndex.openCursor(IDBKeyRange.only(id));
  while (blockCursor) {
    await blockCursor.delete();
    blockCursor = await blockCursor.continue();
  }

  await tx.done;
}

export async function savePagesAndBlocks(
  pages: PageRecord[],
  blocks: TextBlock[]
): Promise<void> {
  const db = await getDB();
  const tx = db.transaction(["pages", "textBlocks"], "readwrite");
  
  for (const page of pages) {
    await tx.objectStore("pages").put(page);
  }
  for (const block of blocks) {
    await tx.objectStore("textBlocks").put(block);
  }
  await tx.done;
}

export async function getDocumentBlocks(documentId: string): Promise<TextBlock[]> {
  const db = await getDB();
  const index = db.transaction("textBlocks").store.index("by-documentId");
  const blocks = await index.getAll(documentId);
  return blocks.sort((a, b) => a.blockIndex - b.blockIndex);
}

export async function getDocumentPages(documentId: string): Promise<PageRecord[]> {
  const db = await getDB();
  const index = db.transaction("pages").store.index("by-documentId");
  const pages = await index.getAll(documentId);
  return pages.sort((a, b) => a.pageNumber - b.pageNumber);
}

export async function saveProgress(progress: ProgressRecord): Promise<void> {
  const db = await getDB();
  await db.put("progress", progress);
}

export async function getProgress(documentId: string): Promise<ProgressRecord | undefined> {
  const db = await getDB();
  return db.get("progress", documentId);
}

export async function updateLastOpened(id: string): Promise<void> {
  const db = await getDB();
  const doc = await db.get("documents", id);
  if (doc) {
    doc.lastOpenedAt = Date.now();
    await db.put("documents", doc);
  }
}

export async function clearAllLocalData(): Promise<void> {
  const db = await getDB();
  const tx = db.transaction(["documents", "pages", "textBlocks", "progress"], "readwrite");
  await tx.objectStore("documents").clear();
  await tx.objectStore("pages").clear();
  await tx.objectStore("textBlocks").clear();
  await tx.objectStore("progress").clear();
  await tx.done;
}
