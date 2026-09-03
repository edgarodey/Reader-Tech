"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Terminal,
  GitPullRequest,
  Github,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Copy,
  Check,
  ExternalLink,
  BookOpen,
  Scale,
  Sparkles,
  Lock,
  Layers,
  Heart
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FollowSocials } from "@/components/ui/social-links";

const LICENSE_TEXT = `PolyForm Noncommercial License 1.0.0
<https://polyformproject.org/licenses/noncommercial/1.0.0>

Copyright 2026 Edgar Odey / Reader Open Source Project (https://reader.edgarodey.com)

## Acceptance
In order to receive this license, you must agree to its rules. The rules of this license are both obligations under that agreement and conditions to your license. You must not do anything with this software that triggers a rule you cannot or will not follow.

## Copyright License
The licensor grants you a copyright license for this software to do everything you might do with the software that would otherwise infringe the licensor's copyright in it, for any permitted purpose. However, you may only use the software for permitted purposes, and you may only distribute copies and changes to the software for permitted purposes.

## Permitted Purposes
Permitted purpose is any purpose other than a commercial purpose.
Commercial purpose is any purpose that is intended for or directed toward commercial advantage or monetary compensation.

## Attribution
You must retain all copyright and other notices from the licensor in the software and must include a copy of this license with any copy or modification you distribute.

## Fair Use
You may have rights under the law, such as "fair use", that cannot be limited by a license. This license does not affect those rights.

## No Other Rights
These terms do not give you any other rights, including rights under patent, trademark, or other intellectual property law.

## Disclaimer
As far as the law allows, this software comes as is, without any warranty or condition, and the licensor will not be liable to you for any damages arising out of these terms or your use of the software.`;

export default function OpenSourcePage() {
  const [copiedClone, setCopiedClone] = useState(false);
  const [copiedLicense, setCopiedLicense] = useState(false);
  const [showFullLicense, setShowFullLicense] = useState(false);

  const handleCopyClone = () => {
    navigator.clipboard.writeText("git clone https://github.com/edgarodey/Reader-Tech.git");
    setCopiedClone(true);
    setTimeout(() => setCopiedClone(false), 2000);
  };

  const handleCopyLicense = () => {
    navigator.clipboard.writeText(LICENSE_TEXT);
    setCopiedLicense(true);
    setTimeout(() => setCopiedLicense(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 bg-white flex-1 w-full overflow-x-hidden">
      {/* Header */}
      <div className="space-y-4 text-center md:text-left mb-10">
        <div className="inline-flex items-center gap-2">
          <Badge variant="brand" className="py-1 px-3.5 text-xs font-semibold shadow-xs">
            <Scale className="w-3.5 h-3.5 mr-1.5 text-brand-600" />
            Open Source & Noncommercial License
          </Badge>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Built openly for students, educators & researchers
        </h1>
        <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
          Reader is an open-source project released under the{" "}
          <strong className="text-slate-900 font-semibold">PolyForm Noncommercial License 1.0.0</strong>.
          It is free forever for personal study, teaching, and non-commercial academic research.
        </p>
      </div>

      <div className="space-y-10 w-full">
        {/* GitHub Repository Hero Card */}
        <section className="p-5 sm:p-7 md:p-8 rounded-3xl bg-slate-900 text-white shadow-xl space-y-5 sm:space-y-6 relative overflow-hidden w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-5 relative z-10 w-full">
            <div className="flex items-center gap-3 sm:gap-3.5 min-w-0 flex-1">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white border border-white/15 shadow-inner shrink-0">
                <Github className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-base sm:text-xl font-bold text-white tracking-tight truncate">
                    edgarodey / Reader-Tech
                  </h2>
                  <span className="px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-300 text-[10px] font-bold uppercase tracking-wider border border-brand-400/30 shrink-0">
                    Public
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5 break-words">
                  Official Public Repository • Next.js 14, Web Speech, PDF.js, Tesseract.js
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 shrink-0 pt-1 sm:pt-0">
              <a
                href="https://github.com/edgarodey/Reader-Tech"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold transition-all shadow-md active:scale-95"
              >
                <Github className="w-4 h-4" /> View on GitHub <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
              </a>
            </div>
          </div>

          {/* Terminal Command Snippet */}
          <div className="relative p-3 sm:p-4 rounded-2xl bg-black/50 border border-white/10 font-mono text-xs text-slate-300 flex items-center justify-between gap-2 overflow-hidden w-full">
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1 overflow-hidden">
              <span className="text-slate-500 select-none shrink-0">$</span>
              <span className="text-emerald-400 shrink-0">git clone</span>
              <span className="text-slate-200 truncate block text-[11px] sm:text-xs">https://github.com/edgarodey/Reader-Tech.git</span>
            </div>
            <button
              onClick={handleCopyClone}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors shrink-0"
              title="Copy git clone command"
            >
              {copiedClone ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </section>

        {/* License Permission Matrix (What You Can Do vs Prohibited) */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-brand-600" />
            <h2 className="text-xl font-bold text-slate-900">License Breakdown: PolyForm Noncommercial 1.0.0</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600">
            This license is designed to keep Reader open and accessible for all students, while preventing third parties from taking the software and packaging it into a paid commercial product.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
            {/* Allowed Card */}
            <div className="p-6 rounded-3xl bg-emerald-50/60 border border-emerald-200/80 shadow-xs space-y-3.5">
              <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm sm:text-base">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <h3>What You Can Freely Do (Permitted)</h3>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-emerald-950">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span><strong>Personal study & learning:</strong> Use Reader freely on all your devices to study coursework.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span><strong>Academic & classroom use:</strong> Share with students, lecturers, universities, and study groups.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span><strong>Open source contributions:</strong> Inspect source code, fix bugs, add voices, and submit pull requests.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span><strong>Self-hosting & fork for non-commercial:</strong> Run your own private instance for non-monetized purposes.</span>
                </li>
              </ul>
            </div>

            {/* Prohibited Card */}
            <div className="p-6 rounded-3xl bg-rose-50/60 border border-rose-200/80 shadow-xs space-y-3.5">
              <div className="flex items-center gap-2 text-rose-900 font-bold text-sm sm:text-base">
                <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                <h3>What Is Prohibited (Commercial Restriction)</h3>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-rose-950">
                <li className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold">•</span>
                  <span><strong>Selling access:</strong> Charging users a fee or subscription to access Reader.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold">•</span>
                  <span><strong>Commercial bundling:</strong> Wrapping Reader into a commercial closed-source SaaS product.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold">•</span>
                  <span><strong>Paid ad networks / monetization:</strong> Running paywalls or monetized commercial wrappers around the core engine.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold">•</span>
                  <span><strong>Removing attribution:</strong> Removing original copyright and license notices.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Full Legal Text Accordion */}
        <section className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Scale className="w-5 h-5 text-slate-700" />
              <div>
                <h3 className="text-base font-bold text-slate-900">Official Legal License Text</h3>
                <p className="text-xs text-slate-500">PolyForm Noncommercial License 1.0.0</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyLicense}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
              >
                {copiedLicense ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" /> Copied Text
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-500" /> Copy License
                  </>
                )}
              </button>
              <Button
                variant="ghost"
                size="sm"
                className="text-brand-600 text-xs"
                onClick={() => setShowFullLicense(!showFullLicense)}
              >
                {showFullLicense ? "Collapse" : "View Full Text"}
              </Button>
            </div>
          </div>

          {showFullLicense && (
            <div className="mt-4 p-5 rounded-2xl bg-slate-50 border border-slate-200 font-mono text-xs text-slate-700 whitespace-pre-wrap leading-relaxed overflow-x-auto max-h-96">
              {LICENSE_TEXT}
            </div>
          )}

          <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100">
            <span>Standardized by the PolyForm Project</span>
            <a
              href="https://polyformproject.org/licenses/noncommercial/1.0.0"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-600 hover:underline flex items-center gap-1"
            >
              Verify on polyformproject.org <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </section>

        {/* Tech Stack Architecture */}
        <section className="p-7 rounded-3xl bg-slate-50/80 border border-slate-200/90 space-y-5">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
            <Layers className="w-5 h-5 text-brand-600" />
            <h2>Core Technology Architecture</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-700">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
              <strong className="text-slate-900 block font-semibold">Frontend & Routing</strong>
              <p className="text-xs text-slate-600">Next.js 14 App Router, React 18, TypeScript, Tailwind CSS.</p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
              <strong className="text-slate-900 block font-semibold">PDF Text & Rendering</strong>
              <p className="text-xs text-slate-600">PDF.js Web Worker for client text extraction and high-DPI canvas preview.</p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
              <strong className="text-slate-900 block font-semibold">Client-Side OCR Worker</strong>
              <p className="text-xs text-slate-600">Tesseract.js WebAssembly Worker for on-demand text recognition in scanned handouts.</p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
              <strong className="text-slate-900 block font-semibold">Speech & Local DB</strong>
              <p className="text-xs text-slate-600">Web Speech API (`SpeechSynthesis`) and local IndexedDB sandbox via `idb`.</p>
            </div>
          </div>
        </section>

        {/* How to Contribute & Author Bio */}
        <section className="p-7 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
            <GitPullRequest className="w-5 h-5 text-brand-600" />
            <h2>Contributing Guidelines</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            We welcome issues and pull requests from students and developers worldwide!
            Priorities include Nigerian accent speech heuristics, offline WASM TTS integration,
            e-courseware parsing rules, and accessibility enhancements.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
              <strong className="text-slate-900 block mb-1">1. Local Privacy First</strong>
              Zero server upload endpoints. Keep all document processing on-device.
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
              <strong className="text-slate-900 block mb-1">2. Strict TypeScript</strong>
              Strict typing and clean modular abstractions across all components.
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
              <strong className="text-slate-900 block mb-1">3. Accessible UI</strong>
              High contrast, keyboard navigation, and responsive mobile-first layouts.
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <span className="text-slate-500">
              Have questions or want to collaborate? Reach out to the creator.
            </span>
            <a
              href="https://edgarodey.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-600 hover:text-brand-800 font-semibold underline decoration-brand-300 underline-offset-2 flex items-center gap-1"
            >
              Edgar Odey • edgarodey.com <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </section>

        {/* Follow on Socials Card */}
        <FollowSocials variant="card" title="Follow Edgar on socials for updates" className="mt-8" />
      </div>
    </div>
  );
}
