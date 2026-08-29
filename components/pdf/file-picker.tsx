"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { UploadCloud, FileText, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { extractPDF } from "@/lib/pdf/extract";
import { saveDocument, savePagesAndBlocks } from "@/lib/storage/documents";

interface FilePickerProps {
  className?: string;
}

export function FilePicker({ className }: FilePickerProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressMsg, setProgressMsg] = useState<string>("");
  const [percent, setPercent] = useState<number>(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const processFile = async (file: File) => {
    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".pdf") && file.type !== "application/pdf") {
      setErrorMsg("Please select a valid PDF document (.pdf)");
      return;
    }

    if (file.size > 80 * 1024 * 1024) {
      setErrorMsg("Document is very large (> 80MB). Processing may consume significant memory.");
    }

    setErrorMsg(null);
    setIsProcessing(true);
    setProgressMsg("Reading PDF file...");
    setPercent(10);

    try {
      const result = await extractPDF(file, (current, total) => {
        const pct = Math.round(15 + (current / total) * 75);
        setPercent(pct);
        setProgressMsg(`Extracting text from page ${current} of ${total}...`);
      });

      setProgressMsg("Saving document locally...");
      setPercent(95);

      // Persist to IndexedDB (safe non-detached originalBuffer)
      await saveDocument(result.docRecord);
      await savePagesAndBlocks(result.pages, result.blocks);

      setPercent(100);
      setProgressMsg("Ready!");

      // Navigate to reader
      setTimeout(() => {
        router.push(`/reader?id=${result.docRecord.id}`);
      }, 300);
    } catch (err: any) {
      console.error("PDF Processing error:", err);
      setErrorMsg(
        err?.message || "Failed to process PDF. The document might be password-protected or corrupted."
      );
      setIsProcessing(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div className={className}>
      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf,.pdf"
        className="hidden"
        onChange={handleFileInput}
      />

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => !isProcessing && fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center transition-all cursor-pointer select-none bg-white shadow-sm ${
          isDragging
            ? "border-brand-500 bg-brand-50/50 scale-[1.01]"
            : "border-slate-300 hover:border-brand-500 hover:bg-slate-50/60"
        } ${isProcessing ? "pointer-events-none opacity-90" : ""}`}
      >
        {isProcessing ? (
          <div className="flex flex-col items-center justify-center space-y-4 py-4">
            <div className="w-14 h-14 rounded-2xl bg-brand-50 flex items-center justify-center border border-brand-200 shadow-sm text-brand-600 animate-pulse">
              <Loader2 className="w-7 h-7 animate-spin text-brand-600" />
            </div>

            <div className="space-y-2 w-full max-w-sm">
              <p className="text-base font-semibold text-slate-800">{progressMsg}</p>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
                <div
                  className="bg-brand-600 h-full transition-all duration-200"
                  style={{ width: `${percent}%` }}
                />
              </div>
              <p className="text-xs text-slate-500">{percent}% completed</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-brand-50 border border-brand-200 flex items-center justify-center text-brand-600 shadow-xs group-hover:scale-105 transition-transform">
              <UploadCloud className="w-8 h-8 text-brand-600" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                Upload course PDF to begin reading
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Drag and drop your study material or click to browse from your device.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <Button
                variant="primary"
                size="md"
                className="shadow-sm font-medium"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
              >
                <FileText className="w-4 h-4 mr-1.5" />
                Select PDF File
              </Button>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[11px] sm:text-xs text-slate-500">
              <span className="inline-flex items-center gap-1 shrink-0 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> 100% Private (In-Browser)
              </span>
              <span className="inline-flex items-center gap-1 shrink-0 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-600 shrink-0" /> Web Speech TTS
              </span>
              <span className="inline-flex items-center gap-1 shrink-0 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" /> Client OCR
              </span>
            </div>
          </div>
        )}
      </div>

      {errorMsg && (
        <div className="mt-4 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-start gap-3 shadow-xs">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-red-900">Upload Issue</p>
            <p className="text-xs text-red-700 mt-0.5">{errorMsg}</p>
          </div>
        </div>
      )}
    </div>
  );
}
