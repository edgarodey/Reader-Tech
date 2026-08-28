"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Headphones,
  ShieldCheck,
  Layers,
  ArrowRight,
  Sparkles,
  Clock,
  ChevronRight,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FilePicker } from "@/components/pdf/file-picker";
import { getAllDocuments } from "@/lib/storage/documents";
import { DocumentRecord } from "@/lib/storage/db";
import { formatBytes } from "@/lib/utils";

export default function HomePage() {
  const [recentDocs, setRecentDocs] = useState<DocumentRecord[]>([]);

  useEffect(() => {
    getAllDocuments()
      .then((docs) => setRecentDocs(docs.slice(0, 3)))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="flex flex-col min-h-full bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 border-b border-slate-100 bg-gradient-to-b from-slate-50/80 to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <Badge variant="brand" className="py-1 px-3.5 text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5 text-brand-600 mr-1" />
              Open Source Study Companion
            </Badge>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 max-w-4xl mx-auto leading-[1.15]">
            Study university course PDFs{" "}
            <span className="text-brand-600">
              by listening
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            A free, local-first reader that turns academic PDFs into a comfortable reflowable view
            with synchronized audio. 100% private in your browser.
          </p>

          {/* Upload Dropzone Box */}
          <div className="mt-10 max-w-2xl mx-auto">
            <FilePicker />
          </div>

          {/* Recently Opened Documents (if any) */}
          {recentDocs.length > 0 && (
            <div className="mt-8 pt-6 border-t border-slate-200 max-w-2xl mx-auto text-left">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  Continue Reading
                </span>
                <Link
                  href="/library"
                  className="text-xs text-brand-600 hover:text-brand-800 flex items-center gap-1 font-medium transition-colors"
                >
                  View Library <ChevronRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="space-y-2">
                {recentDocs.map((doc) => (
                  <Link
                    key={doc.id}
                    href={`/reader?id=${doc.id}`}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 transition-all group shadow-xs"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600 shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-900 truncate group-hover:text-brand-600">
                          {doc.fileName}
                        </p>
                        <p className="text-xs text-slate-500">
                          {doc.pageCount} pages • {formatBytes(doc.fileSize)}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="shrink-0 text-brand-600 group-hover:text-brand-800 font-medium">
                      Resume <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Feature Pillars */}
      <section className="py-16 md:py-24 bg-slate-50/50 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Engineered for seamless study habits
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Never pinch-to-zoom on a tiny phone screen again.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="p-7 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600 border border-brand-100 shadow-xs">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Dual-View Reading</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Enjoy a clean, reflowable single-column layout optimized for mobile screens. Switch
                to the original PDF page view whenever you need to inspect complex diagrams or formulas.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-7 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600 border border-brand-100 shadow-xs">
                <Headphones className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Synchronized Playback</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Listen hands-free while commuting, cooking, or resting your eyes. Active sentences are
                highlighted in real time with playback speed controls (0.5x to 2.0x).
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-7 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600 border border-brand-100 shadow-xs">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Local-First & Private</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Your course materials remain 100% inside your browser. No user account required, no
                cloud uploads, and all progress is safely saved in local IndexedDB storage.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
