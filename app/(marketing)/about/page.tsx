import React from "react";
import type { Metadata } from "next";
import { BookOpen, ShieldCheck, Cpu } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "About — Reader Local-First Study Tool",
  description:
    "Learn about Reader, built by Edgar Odey to empower university students and distance learners worldwide with accessible local-first PDF audio tools.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 bg-white flex-1">
      <div className="space-y-4 text-center md:text-left mb-10">
        <Badge variant="brand">Our Mission</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Empowering university students through effortless listening
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Reader is a free, open-source tool built by <strong>Edgar Odey</strong> to remove friction
          from studying large, dense course materials on mobile devices and laptops.
        </p>
      </div>

      <div className="space-y-6 text-slate-700 leading-relaxed">
        <section className="p-7 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-brand-600" />
            Designed for University Students & Distance Learners
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Studying multi-page course PDFs on phones is often frustrating. Text is tiny, pinching-to-zoom
            breaks reading flow, and looking at bright screens for hours causes eye fatigue. Reader
            transforms these materials into clean reflowable text with audio accompaniment.
          </p>
        </section>

        <section className="p-7 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            Local-First Architecture & Copyright Posture
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Reader operates strictly on a <strong>local-first</strong> foundation. Your documents are
            parsed, normalized, and read aloud completely inside your browser sandbox via IndexedDB and
            Web Speech. No course materials are ever transmitted to or stored on servers, preserving
            total privacy and respecting copyright protections.
          </p>
        </section>

        <section className="p-7 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-brand-600" />
            Extensible TTS Architecture
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Reader utilizes zero-cost, zero-latency browser Web Speech synthesis with a modular{" "}
            <code>TTSEngine</code> boundary, paving the way for on-device AI voice synthesis in
            future updates.
          </p>
        </section>
      </div>
    </div>
  );
}
