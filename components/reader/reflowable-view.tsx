"use client";

import React, { useEffect, useRef } from "react";
import { TextBlock } from "@/lib/storage/db";
import { SpeechChunk } from "@/lib/reader/chunker";
import { Play, Volume2 } from "lucide-react";

interface ReflowableViewProps {
  blocks: TextBlock[];
  activeChunk: SpeechChunk | null;
  onSelectChunk: (chunkIndex: number) => void;
  chunks: SpeechChunk[];
  fontSize: number;
  lineHeight: number;
  theme: "dark" | "light" | "sepia";
  onVisiblePageChange?: (pageNum: number) => void;
}

export function ReflowableView({
  blocks,
  activeChunk,
  onSelectChunk,
  chunks,
  fontSize,
  lineHeight,
  theme,
  onVisiblePageChange,
}: ReflowableViewProps) {
  const activeChunkRef = useRef<HTMLSpanElement | null>(null);

  // Auto-scroll when active chunk changes
  useEffect(() => {
    if (activeChunkRef.current) {
      activeChunkRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [activeChunk?.chunkId]);

  // Group blocks by pageNumber for clear reading separation
  const blocksByPage = blocks.reduce<Record<number, TextBlock[]>>((acc, block) => {
    if (!acc[block.pageNumber]) acc[block.pageNumber] = [];
    acc[block.pageNumber].push(block);
    return acc;
  }, {});

  const pageNumbers = Object.keys(blocksByPage)
    .map(Number)
    .sort((a, b) => a - b);

  const getThemeClass = () => {
    if (theme === "light") return "reader-canvas-light";
    if (theme === "sepia") return "reader-canvas-sepia";
    return "reader-canvas-dark";
  };

  const getHighlightClass = () => {
    if (theme === "light") return "bg-yellow-200/80 text-black px-1 rounded transition-colors shadow-sm";
    if (theme === "sepia") return "bg-amber-300/80 text-black px-1 rounded transition-colors shadow-sm";
    return "bg-blue-600/40 text-white px-1 rounded border-b-2 border-blue-400 transition-colors shadow-sm";
  };

  return (
    <div
      className={`w-full min-h-screen py-8 px-4 sm:px-8 md:px-12 transition-colors duration-200 ${getThemeClass()}`}
      style={{
        fontSize: `${fontSize}px`,
        lineHeight: lineHeight,
      }}
    >
      <div className="max-w-3xl mx-auto space-y-10 pb-36">
        {pageNumbers.length === 0 ? (
          <div className="py-20 text-center text-slate-500 font-medium">
            <p>No text content found. If this is a scanned document, please use the OCR button above.</p>
          </div>
        ) : (
          pageNumbers.map((pageNum) => (
            <section key={pageNum} className="space-y-6" id={`page-${pageNum}`}>
              {/* Page Marker */}
              <div className="flex items-center gap-3 my-6 opacity-60 select-none">
                <div className="flex-1 h-px bg-current opacity-20" />
                <span className="text-xs font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded border border-current opacity-75">
                  Page {pageNum}
                </span>
                <div className="flex-1 h-px bg-current opacity-20" />
              </div>

              {/* Page Blocks */}
              <div className="space-y-4">
                {blocksByPage[pageNum].map((block) => {
                  // Find chunks belonging to this block
                  const blockChunks = chunks.filter((c) => c.blockId === block.blockId);

                  if (block.type === "heading") {
                    return (
                      <h2
                        key={block.blockId}
                        className="font-bold tracking-tight mt-6 mb-3 opacity-95 text-xl sm:text-2xl"
                      >
                        {renderBlockContent(
                          block,
                          blockChunks,
                          activeChunk,
                          onSelectChunk,
                          chunks,
                          activeChunkRef,
                          getHighlightClass()
                        )}
                      </h2>
                    );
                  }

                  if (block.type === "list") {
                    return (
                      <div
                        key={block.blockId}
                        className="pl-4 border-l-2 border-current border-opacity-30 my-2"
                      >
                        {renderBlockContent(
                          block,
                          blockChunks,
                          activeChunk,
                          onSelectChunk,
                          chunks,
                          activeChunkRef,
                          getHighlightClass()
                        )}
                      </div>
                    );
                  }

                  return (
                    <p key={block.blockId} className="leading-relaxed">
                      {renderBlockContent(
                        block,
                        blockChunks,
                        activeChunk,
                        onSelectChunk,
                        chunks,
                        activeChunkRef,
                        getHighlightClass()
                      )}
                    </p>
                  );
                })}
              </div>
            </section>
          ))
        )}
      </div>
    </div>
  );
}

function renderBlockContent(
  block: TextBlock,
  blockChunks: SpeechChunk[],
  activeChunk: SpeechChunk | null,
  onSelectChunk: (idx: number) => void,
  allChunks: SpeechChunk[],
  activeChunkRef: React.MutableRefObject<HTMLSpanElement | null>,
  highlightClass: string
) {
  if (blockChunks.length === 0) {
    return block.text;
  }

  return blockChunks.map((chunk) => {
    const isThisChunkActive = activeChunk?.chunkId === chunk.chunkId;
    const globalIdx = allChunks.findIndex((c) => c.chunkId === chunk.chunkId);

    return (
      <span
        key={chunk.chunkId}
        ref={isThisChunkActive ? (el) => { activeChunkRef.current = el; } : undefined}
        onClick={() => {
          if (globalIdx >= 0) onSelectChunk(globalIdx);
        }}
        className={`cursor-pointer transition-all duration-150 inline ${
          isThisChunkActive
            ? highlightClass
            : "hover:underline decoration-dotted decoration-brand-400"
        }`}
        title="Click to play from here"
      >
        {chunk.text}{" "}
      </span>
    );
  });
}
