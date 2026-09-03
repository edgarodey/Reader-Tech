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
 * Splits text into natural sentence units respecting abbreviations and numbers.
 * Ensures every chunk contains pronounceable text.
 */
export function splitIntoSentences(text: string): { text: string; start: number; end: number }[] {
  if (!text || text.trim().length === 0) return [];

  // Match sentences ending in punctuation (.!?) or end of paragraph
  // Avoid splitting blindly on single newlines
  const sentenceRegex = /[^.!?]+(?:[.!?]+(?:\s+|$)|$)/g;
  const rawResults: { text: string; start: number; end: number }[] = [];

  let match;
  while ((match = sentenceRegex.exec(text)) !== null) {
    const raw = match[0];
    const trimmed = raw.trim();
    if (trimmed.length > 0 && /[a-zA-Z0-9]/.test(trimmed)) {
      const leadingSpaces = raw.indexOf(trimmed);
      const start = match.index + leadingSpaces;
      const end = start + trimmed.length;
      rawResults.push({
        text: trimmed,
        start,
        end,
      });
    }
  }

  // Fallback if regex found nothing or text was a single unpunctuated block
  if (rawResults.length === 0 && text.trim().length > 0 && /[a-zA-Z0-9]/.test(text)) {
    const trimmed = text.trim();
    const leading = text.indexOf(trimmed);
    rawResults.push({
      text: trimmed,
      start: leading >= 0 ? leading : 0,
      end: (leading >= 0 ? leading : 0) + trimmed.length,
    });
  }

  // Merge overly short fragments (e.g. "e.g.", "Fig. 1", "No.") into subsequent sentence
  const merged: { text: string; start: number; end: number }[] = [];
  for (let i = 0; i < rawResults.length; i++) {
    const current = rawResults[i];
    // If very short (under 12 chars) and not the last sentence, and looks like an abbreviation/header
    if (
      current.text.length < 12 &&
      i + 1 < rawResults.length &&
      !current.text.endsWith("!") &&
      !current.text.endsWith("?")
    ) {
      const next = rawResults[i + 1];
      rawResults[i + 1] = {
        text: `${current.text} ${next.text}`,
        start: current.start,
        end: next.end,
      };
    } else {
      merged.push(current);
    }
  }

  return merged;
}

/**
 * Generates an ordered list of speech chunks from all text blocks
 * Filters out empty or non-pronounceable noise blocks
 */
export function createSpeechChunks(blocks: TextBlock[]): SpeechChunk[] {
  const chunks: SpeechChunk[] = [];

  for (const block of blocks) {
    if (!block.text || !/[a-zA-Z0-9]/.test(block.text)) {
      continue;
    }

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

