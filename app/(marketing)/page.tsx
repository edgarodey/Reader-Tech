"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Headphones,
  ShieldCheck,
  Zap,
  Clock,
  ChevronRight,
  FileText,
  ScanText,
  EyeOff,
  Sparkles,
  ArrowRight,
  CheckCircle2
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
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 border-b border-slate-100 bg-gradient-to-b from-slate-50/80 via-slate-50/30 to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <Badge variant="brand" className="py-1 px-3.5 text-xs font-semibold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-brand-600 mr-1.5" />
              Free Study Companion for Nigerian University Students
            </Badge>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 max-w-4xl mx-auto leading-[1.18]">
            Listen to your 50-page PDF course handouts{" "}
            <span className="text-brand-600">
              instead of straining your eyes
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Reader turns dense university lecture notes, past questions, and e-courseware into clear,
            spoken audio. Study while commuting in traffic, doing chores, or resting in bed.
            100% free and private in your browser.
          </p>

          {/* Upload Dropzone Box */}
          <div className="mt-10 max-w-2xl mx-auto">
            <FilePicker />
          </div>

          {/* Quick value highlights */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs font-medium text-slate-600">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 100% Offline After Upload
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Zero Data Wastage
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Scanned Handout OCR
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> No Signups or Fees
            </span>
          </div>

          {/* Recently Opened Documents (if any) */}
          {recentDocs.length > 0 && (
            <div className="mt-10 pt-6 border-t border-slate-200 max-w-2xl mx-auto text-left">
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

      {/* Practical Features Built for Real Student Needs */}
      <section className="py-16 md:py-24 bg-slate-50/60 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              Built specifically for students dealing with bulky course PDFs
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2.5 leading-relaxed">
              University handouts are long, heavy, and exhausting to read on small screens. Here is how Reader makes studying painless.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="p-7 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600 border border-brand-100 shadow-xs">
                <Headphones className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Binge-Listen to Handouts on the Go</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Turn 40-page course packs into an instant audiobook. Put your earpieces in and cover entire modules while sitting in traffic, taking a walk, or cooking.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-7 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600 border border-brand-100 shadow-xs">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Zero Data Waste & Works Offline</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Save your mobile data plan. Once you load your course PDF, Reader processes and speaks everything locally in your browser without consuming extra megabytes.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-7 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600 border border-brand-100 shadow-xs">
                <ScanText className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Scanned Handout OCR</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Got blurry photocopies or scanned image PDFs from your lecturer? Reader automatically scans them on-demand with built-in OCR so you can still listen.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-7 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600 border border-brand-100 shadow-xs">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">1.5x & 2.0x Fast Cramming Mode</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Exam or test tomorrow? Speed up playback up to 2.0x to review a semester's worth of materials in half the time with synchronized active-word highlighting.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-7 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600 border border-brand-100 shadow-xs">
                <EyeOff className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Rest Your Eyes & Avoid Headaches</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Stop squinting at rigid multi-column PDFs and tiny laptop fonts late at night. Switch to comfortable reflowable text with soft Sepia or Dark themes.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-7 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600 border border-brand-100 shadow-xs">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">100% Private — Stays on Your Device</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Your notes and materials never leave your device. Stored securely in your browser's local IndexedDB sandbox with zero logins, zero fees, and zero cloud tracking.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
