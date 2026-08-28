import React from "react";
import type { Metadata } from "next";
import { Terminal, GitPullRequest } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Open Source Governance & Architecture — Reader",
  description:
    "Reader is open source under the Apache 2.0 license. Built by Edgar Odey.",
};

export default function OpenSourcePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 bg-white flex-1">
      <div className="space-y-4 text-center md:text-left mb-10">
        <Badge variant="brand">Open Source & Community</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Built openly for the academic community
        </h1>
        <p className="text-base text-slate-600">
          Reader is released under the Apache-2.0 License. Built by Edgar Odey and open to student
          and developer contributions.
        </p>
      </div>

      <div className="space-y-8">
        <section className="p-7 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Terminal className="w-5 h-5 text-brand-600" />
            Core Technology Stack
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-700">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <strong className="text-slate-900 block mb-1 font-semibold">Frontend Framework</strong>
              Next.js 14 App Router, React, TypeScript, Tailwind CSS
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <strong className="text-slate-900 block mb-1 font-semibold">PDF Engine</strong>
              PDF.js (client worker for parsing & canvas rendering)
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <strong className="text-slate-900 block mb-1 font-semibold">OCR Engine</strong>
              Tesseract.js (WASM worker for scanned page OCR)
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <strong className="text-slate-900 block mb-1 font-semibold">Speech & Storage</strong>
              Web Speech API (V1), IndexedDB via IDB
            </div>
          </div>
        </section>

        <section className="p-7 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <GitPullRequest className="w-5 h-5 text-brand-600" />
            How to Contribute
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            We welcome bug fixes, performance optimizations, localized voice heuristics, and
            accessibility enhancements. Ensure code adheres to TypeScript strict mode, passes unit
            tests, and does not introduce server dependencies for core client reading workflows.
          </p>
        </section>
      </div>
    </div>
  );
}
