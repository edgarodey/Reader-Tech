export interface ExtractedLine {
  text: string;
  height: number;
  y: number;
  x: number;
  isHeading?: boolean;
}

export function cleanRawText(text: string): string {
  if (!text) return "";
  
  return text
    // Replace non-standard whitespace and form feeds
    .replace(/[\f\v\r]+/g, " ")
    .replace(/\u00A0/g, " ")
    // Fix hyphenated words broken across line wraps (e.g. "struc-\nture" -> "structure")
    .replace(/(\w+)-\s*\n\s*(\w+)/g, "$1$2")
    // Fix multiple spaces
    .replace(/[ \t]+/g, " ")
    .trim();
}

/**
 * Breaks raw page text into structured blocks (headings, paragraphs, lists)
 */
export function segmentPageIntoBlocks(
  pageText: string,
  pageNumber: number,
  docId: string,
  startIndex: number = 0
): { blocks: any[]; nextIndex: number } {
  const cleaned = cleanRawText(pageText);
  if (!cleaned) {
    return { blocks: [], nextIndex: startIndex };
  }

  // Split into rough paragraphs by double newlines or significant line breaks
  const rawParagraphs = cleaned
    .split(/\n\s*\n+/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  const blocks: any[] = [];
  let currentIndex = startIndex;

  for (const rawPara of rawParagraphs) {
    // Determine block type
    let type: "heading" | "paragraph" | "list" = "paragraph";
    
    // Check if short line and starts with uppercase or number header pattern
    const isShort = rawPara.length < 85 && !rawPara.endsWith(".");
    const isNumberedHeading = /^(chapter|module|unit|section|\d+\.?\d*)\s+/i.test(rawPara);
    const isListItem = /^([•\-–—*]|\d+\.|\([a-z0-9]\))\s+/i.test(rawPara);

    if (isListItem) {
      type = "list";
    } else if (isShort && (isNumberedHeading || rawPara === rawPara.toUpperCase())) {
      type = "heading";
    }

    blocks.push({
      blockId: `${docId}_p${pageNumber}_b${currentIndex}`,
      documentId: docId,
      pageNumber,
      blockIndex: currentIndex,
      type,
      text: rawPara,
    });

    currentIndex++;
  }

  return { blocks, nextIndex: currentIndex };
}
