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
          <div className="inline-flex items-center justify-center max-w-full mb-6">
            <Badge variant="brand" className="py-1 px-3 sm:px-3.5 text-[11px] sm:text-xs font-semibold shadow-xs leading-snug inline-flex items-center text-center">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-600 mr-1.5 shrink-0" />
              <span>Free Study Companion for Nigerian University Students</span>
            </Badge>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 max-w-4xl mx-auto leading-[1.18]">
            Listen to your course materials.{" "}
            <span className="text-brand-600">
              Give your eyes a break.
            </span>
          </h1>

          <p className="mt-5 text-sm sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Reader turns university PDFs, lecture notes, handouts, and past questions into a comfortable listening experience — right in your browser. Upload a PDF, let Reader turn it into readable text, and listen at your own pace while commuting, cooking, walking, or resting your eyes.
          </p>

          {/* Upload Dropzone Box */}
          <div className="mt-10 max-w-2xl mx-auto">
            <FilePicker />
          </div>

          {/* Quick value highlights */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs font-medium text-slate-600">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> 100% Offline After Upload
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Your PDFs Stay on Your Device
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Scanned Handout OCR
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> No Signups or Fees
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
              Your PDFs were made to be studied — not stared at for hours
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2.5 leading-relaxed">
              University course materials can be long, dense, and exhausting to read on a small screen. Here is how Reader helps you turn them into something easier to consume.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="p-7 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600 border border-brand-100 shadow-xs">
                <Headphones className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Listen to Long Course Handouts</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Turn a 40- or 50-page course handout into a listening session. Put on your earphones and keep studying while you&apos;re commuting, walking, or away from your desk.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-7 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600 border border-brand-100 shadow-xs">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Read in a Way That Feels Comfortable</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Reader extracts course content into a clean, reflowable view that works beautifully on phones, tablets, and laptops. Adjust font sizes and follow along easily.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-7 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600 border border-brand-100 shadow-xs">
                <ScanText className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Study Scanned PDFs Too</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Some handouts are scanned photocopies rather than digital text. Reader uses built-in client OCR to recognize text on-demand and make them readable and listenable.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-7 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600 border border-brand-100 shadow-xs">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Study at Your Speed</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Control your study pace with speed adjustments (0.5x to 2.0x), sentence highlighting, and paragraph hopping. Slow it down when learning, speed it up when revising.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-7 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600 border border-brand-100 shadow-xs">
                <EyeOff className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Rest Your Eyes Without Stopping</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Stop squinting at rigid multi-column PDFs and tiny fonts late at night. Switch to comfortable reflowable typography with soft Sepia or Dark themes.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-7 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600 border border-brand-100 shadow-xs">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Your Materials Stay on Your Device</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Reader is built local-first. Your course PDFs are parsed in your browser rather than sent to cloud servers. No accounts, no subscriptions, no tracking.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
