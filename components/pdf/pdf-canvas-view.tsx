"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Loader2,
  BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getOrLoadPDFDocument, renderPDFPageToCanvas } from "@/lib/pdf/render";

interface PDFCanvasViewProps {
  docId: string;
  pdfData?: ArrayBuffer;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onSwitchToReflowable: (page: number) => void;
}

export function PDFCanvasView({
  docId,
  pdfData,
  currentPage,
  totalPages,
  onPageChange,
  onSwitchToReflowable,
}: PDFCanvasViewProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [scale, setScale] = useState<number>(1.4);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    async function renderPage() {
      if (!pdfData || !canvasRef.current) return;
      setLoading(true);
      setError(null);

      try {
        const pdfDoc = await getOrLoadPDFDocument(docId, pdfData);
        if (isCancelled) return;

        await renderPDFPageToCanvas(pdfDoc, currentPage, canvasRef.current, scale);
      } catch (err: any) {
        if (!isCancelled) {
          console.error("Failed to render PDF page:", err);
          setError(err.message || "Failed to render PDF page");
        }
      } finally {
        if (!isCancelled) setLoading(false);
      }
    }

    renderPage();

    return () => {
      isCancelled = true;
    };
  }, [docId, pdfData, currentPage, scale]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-slate-100/70 pb-36">
      {/* Floating Canvas Controls */}
      <div className="sticky top-16 z-20 w-full max-w-2xl mx-auto px-4 py-2 flex items-center justify-between bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200 shadow-md my-4">
        {/* Page Nav */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage <= 1}
            className="h-8 w-8 text-slate-700"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <span className="text-xs font-bold text-slate-900 font-mono">
            Page {currentPage} / {totalPages}
          </span>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage >= totalPages}
            className="h-8 w-8 text-slate-700"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setScale((s) => Math.max(0.8, s - 0.2))}
            disabled={scale <= 0.8}
            className="h-8 w-8 text-slate-700"
            title="Zoom out"
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
          <span className="text-xs font-mono font-bold text-slate-600 w-12 text-center">
            {Math.round(scale * 100)}%
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setScale((s) => Math.min(2.4, s + 0.2))}
            disabled={scale >= 2.4}
            className="h-8 w-8 text-slate-700"
            title="Zoom in"
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
        </div>

        {/* Switch to Reflowable */}
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onSwitchToReflowable(currentPage)}
          className="text-xs h-8 font-semibold"
        >
          <BookOpen className="w-3.5 h-3.5 mr-1" />
          Read Reflowable
        </Button>
      </div>

      {/* Canvas Viewport */}
      <div className="relative flex items-center justify-center p-4 overflow-auto w-full">
        {loading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60 backdrop-blur-xs">
            <Loader2 className="w-8 h-8 animate-spin text-brand-600" />
          </div>
        )}

        {error ? (
          <div className="p-6 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-sm text-center max-w-md">
            <p className="font-bold text-red-900 mb-1">Canvas Render Error</p>
            <p className="text-xs">{error}</p>
          </div>
        ) : (
          <div className="shadow-lg rounded-2xl overflow-hidden border border-slate-300 bg-white">
            <canvas ref={canvasRef} className="block max-w-full h-auto" />
          </div>
        )}
      </div>
    </div>
  );
}
