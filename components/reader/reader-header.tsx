"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  FileText,
  ScanText,
  Type,
  Loader2,
  Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";

interface ReaderHeaderProps {
  fileName: string;
  currentPage: number;
  totalPages: number;
  activeView: "reflowable" | "pdf";
  onViewChange: (view: "reflowable" | "pdf") => void;
  hasEmptyPages?: boolean;
  isOcrRunning?: boolean;
  ocrProgressMsg?: string;
  onTriggerOCR?: () => void;
  fontSize: number;
  onChangeFontSize: (delta: number) => void;
  theme: "light" | "dark" | "sepia";
  onChangeTheme: (theme: "light" | "dark" | "sepia") => void;
}

export function ReaderHeader({
  fileName,
  currentPage,
  totalPages,
  activeView,
  onViewChange,
  hasEmptyPages,
  isOcrRunning,
  ocrProgressMsg,
  onTriggerOCR,
  fontSize,
  onChangeFontSize,
  theme,
  onChangeTheme,
}: ReaderHeaderProps) {
  const [typographyOpen, setTypographyOpen] = useState(false);
  const { toggleSidebar } = useSidebar();

  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md px-4 py-2.5 flex items-center justify-between gap-3 shadow-xs">
      {/* Left: Sidebar Toggle + Back to Library + Title */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 shrink-0"
          title="Open menu"
          aria-label="Toggle navigation sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <Link href="/library">
          <Button variant="ghost" size="icon" title="Return to Library" className="h-9 w-9 text-slate-700 shrink-0">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>

        <div className="min-w-0">
          <h1 className="text-sm font-bold text-slate-900 truncate max-w-[150px] sm:max-w-xs md:max-w-md" title={fileName}>
            {fileName}
          </h1>
          <p className="text-[11px] text-slate-500 font-medium">
            Page {currentPage} of {totalPages}
          </p>
        </div>
      </div>

      {/* Center: View Switcher Tabs */}
      <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200">
        <button
          onClick={() => onViewChange("reflowable")}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
            activeView === "reflowable"
              ? "bg-white text-brand-700 shadow-xs border border-slate-200/60"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reflowable</span>
        </button>

        <button
          onClick={() => onViewChange("pdf")}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
            activeView === "pdf"
              ? "bg-white text-brand-700 shadow-xs border border-slate-200/60"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Original PDF</span>
        </button>
      </div>

      {/* Right: Actions (OCR & Typography) */}
      <div className="flex items-center gap-2">
        {/* OCR Action Button if scanned/empty pages detected */}
        {hasEmptyPages && (
          <Button
            variant="secondary"
            size="sm"
            onClick={onTriggerOCR}
            disabled={isOcrRunning}
            className="text-xs h-8 px-2.5 bg-amber-50 border-amber-200 text-amber-900 hover:bg-amber-100"
          >
            {isOcrRunning ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin mr-1 text-amber-600" />
                <span className="hidden sm:inline">{ocrProgressMsg || "Processing OCR..."}</span>
              </>
            ) : (
              <>
                <ScanText className="w-3.5 h-3.5 mr-1 text-amber-700" />
                <span className="hidden sm:inline">Run OCR</span>
              </>
            )}
          </Button>
        )}

        {/* Typography Quick Dropdown */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTypographyOpen(!typographyOpen)}
            title="Adjust Typography"
            className="h-9 w-9 text-slate-700 hover:bg-slate-100"
          >
            <Type className="w-4 h-4" />
          </Button>

          {typographyOpen && (
            <div className="absolute right-0 mt-2 w-64 p-4 rounded-3xl bg-white border border-slate-200 shadow-xl z-50 space-y-3.5 animate-in fade-in text-slate-900">
              <div className="flex items-center justify-between text-xs font-bold text-slate-900 border-b border-slate-100 pb-2">
                <span>Reading Style</span>
                <span className="text-brand-600 font-mono">{fontSize}px</span>
              </div>

              {/* Font Size controls */}
              <div className="flex items-center justify-between gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => onChangeFontSize(-1)}
                  disabled={fontSize <= 14}
                  className="w-full text-xs font-bold"
                >
                  A-
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => onChangeFontSize(1)}
                  disabled={fontSize >= 28}
                  className="w-full text-xs font-bold"
                >
                  A+
                </Button>
              </div>

              {/* Palette theme selector */}
              <div>
                <span className="text-[11px] text-slate-500 font-medium block mb-1.5">Canvas Palette</span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => onChangeTheme("light")}
                    className={`py-1.5 text-xs rounded-xl border font-semibold ${
                      theme === "light" ? "bg-brand-50 text-brand-800 border-brand-300 ring-2 ring-brand-500" : "bg-white text-slate-700 border-slate-200"
                    }`}
                  >
                    Light
                  </button>
                  <button
                    onClick={() => onChangeTheme("sepia")}
                    className={`py-1.5 text-xs rounded-xl border font-semibold ${
                      theme === "sepia" ? "bg-[#fbf0d9] text-amber-950 border-amber-300 ring-2 ring-amber-600" : "bg-[#fbf0d9] text-amber-900 border-amber-200"
                    }`}
                  >
                    Sepia
                  </button>
                  <button
                    onClick={() => onChangeTheme("dark")}
                    className={`py-1.5 text-xs rounded-xl border font-semibold ${
                      theme === "dark" ? "bg-[#05233d] text-white border-brand-700 ring-2 ring-brand-400" : "bg-[#05233d] text-slate-200 border-brand-800"
                    }`}
                  >
                    Dark
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
