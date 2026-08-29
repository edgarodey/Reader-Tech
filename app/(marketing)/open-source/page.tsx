import React from "react";
import type { Metadata } from "next";
import {
  Terminal,
  GitPullRequest,
  Github,
  ShieldCheck,
  Code2,
  ExternalLink,
  BookOpen
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Open Source Repository & Governance — Reader",
  description:
    "Explore Reader's open source repository on GitHub, built by Edgar Odey under the PolyForm Noncommercial License 1.0.0.",
};

export default function OpenSourcePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 bg-white flex-1">
      {/* Header */}
      <div className="space-y-4 text-center md:text-left mb-10">
        <Badge variant="brand" className="py-1 px-3.5 text-xs font-semibold">
          <Github className="w-3.5 h-3.5 mr-1.5 text-brand-600" />
          Open Source Repository & Architecture
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Built openly for students, educators & developers
        </h1>
        <p className="text-base text-slate-600">
          Reader is released under the <strong>PolyForm Noncommercial License 1.0.0</strong> to keep it
          free forever and prevent proprietary commercial exploitation.
        </p>
      </div>

      <div className="space-y-8">
        {/* GitHub Repository Card */}
        <section className="p-7 rounded-3xl bg-slate-900 text-white shadow-xl space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white border border-white/20">
                <Github className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">edgarodey / Reader-Tech</h2>
                <p className="text-xs text-slate-400">
                  Official Public Repository • Next.js 14, Web Speech, PDF.js, Tesseract.js
                </p>
              </div>
            </div>

            <a
              href="https://github.com/edgarodey/Reader-Tech"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold transition-all shadow-md shrink-0"
            >
              <Github className="w-4 h-4" /> View on GitHub <ExternalLink className="w-3 h-3 ml-1" />
            </a>
          </div>

          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 font-mono text-xs text-slate-300 overflow-x-auto">
            <div className="text-slate-500 mb-1"># Clone repository locally</div>
            <span className="text-emerald-400">git clone</span> https://github.com/edgarodey/Reader-Tech.git
          </div>
        </section>

        {/* Tech Stack */}
        <section className="p-7 rounded-3xl bg-slate-50 border border-slate-200/90 space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Terminal className="w-5 h-5 text-brand-600" />
            Core Technology Architecture
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-sm text-slate-700">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <strong className="text-slate-900 block mb-1 font-semibold">Frontend Framework</strong>
              Next.js 14 App Router, React 18, TypeScript, Tailwind CSS
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <strong className="text-slate-900 block mb-1 font-semibold">PDF Engine</strong>
              PDF.js Client Worker (Text layer normalization & page canvas render)
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <strong className="text-slate-900 block mb-1 font-semibold">Client OCR Engine</strong>
              Tesseract.js WebAssembly Worker (On-device scanned PDF text recognition)
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <strong className="text-slate-900 block mb-1 font-semibold">Speech & Local Storage</strong>
              Web Speech API (`SpeechSynthesis`), IndexedDB via `idb`
            </div>
          </div>
        </section>

        {/* Non-Commercial License Protection */}
        <section className="p-7 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            PolyForm Noncommercial License 1.0.0
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Reader is strictly open and free for academic study, research, student self-learning, and
            open-source non-commercial improvement. Commercial distribution, selling access, or wrapping
            the codebase into a proprietary commercial service is strictly prohibited by law.
          </p>
        </section>

        {/* How to Contribute & Author Bio */}
        <section className="p-7 rounded-3xl bg-slate-50 border border-slate-200/90 space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <GitPullRequest className="w-5 h-5 text-brand-600" />
            Contributing to Reader
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Pull requests are welcomed for voice accessibility optimizations, performance improvements,
            localized Nigerian accent heuristics, and reflow typography tweaks. All contributions must
            adhere to TypeScript strict mode and maintain 100% local-first privacy.
          </p>
          <div className="pt-2">
            <a
              href="https://edgarodey.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-brand-600 hover:text-brand-800 underline decoration-brand-300 underline-offset-2"
            >
              Created with ❤️ by Edgar Odey • Visit edgarodey.com
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
