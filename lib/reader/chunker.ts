import { type TextBlock } from "../storage/db";

export interface SpeechChunk {
  chunkId: string;
  blockId: string;
  pageNumber: number;
  blockIndex: number;
  sentenceIndex: number;
  text: string;
  charStartInBlock: number;
  charEndInBlock: number;
}

/**
 * Splits text into sentence units respecting abbreviations and numbers.
 */
export function splitIntoSentences(text: string): { text: string; start: number; end: number }[] {
  if (!text) return [];

  // Match sentences ending in punctuation or end of string
  const sentenceRegex = /[^.!?\n]+(?:[.!?]+(?:\s+|$)|(?=\n|$))/g;
  const results: { text: string; start: number; end: number }[] = [];
  
  let match;
  while ((match = sentenceRegex.exec(text)) !== null) {
    const raw = match[0];
    const trimmed = raw.trim();
    if (trimmed.length > 0) {
      const leadingSpaces = raw.indexOf(trimmed);
      const start = match.index + leadingSpaces;
      const end = start + trimmed.length;
      results.push({
        text: trimmed,
        start,
        end,
      });
    }
  }

  // Fallback if regex found nothing (e.g. single clause without punctuation)
  if (results.length === 0 && text.trim().length > 0) {
    results.push({
      text: text.trim(),
      start: 0,
      end: text.trim().length,
    });
  }

  return results;
}

/**
 * Generates an ordered list of speech chunks from all text blocks
 */
export function createSpeechChunks(blocks: TextBlock[]): SpeechChunk[] {
  const chunks: SpeechChunk[] = [];

  for (const block of blocks) {
    const sentences = splitIntoSentences(block.text);

    sentences.forEach((s, sIdx) => {
      chunks.push({
        chunkId: `${block.blockId}_s${sIdx}`,
        blockId: block.blockId,
        pageNumber: block.pageNumber,
        blockIndex: block.blockIndex,
        sentenceIndex: sIdx,
        text: s.text,
        charStartInBlock: s.start,
        charEndInBlock: s.end,
      });
    });
  }

  return chunks;
}
