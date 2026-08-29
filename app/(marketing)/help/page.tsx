"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  HelpCircle,
  ChevronDown,
  Sparkles,
  ExternalLink,
  Zap,
  BookOpen,
  Headphones,
  ShieldCheck,
  Smartphone,
  ScanText
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface FAQItem {
  id: string;
  category: string;
  icon: React.ElementType;
  q: string;
  a: string;
}

const FAQS: FAQItem[] = [
  {
    id: "upload-listen",
    category: "Getting Started",
    icon: BookOpen,
    q: "How do I upload and start listening to my course PDF?",
    a: "Simply drag and drop your course PDF into the upload box on the Home page, or click to browse files from your computer or smartphone. Reader will immediately parse the document and open the reflowable study reader. Tap the Play button on the bottom bar to begin listening instantly.",
  },
  {
    id: "data-consumption",
    category: "Offline & Data",
    icon: Zap,
    q: "Will Reader consume my mobile data while listening to textbooks?",
    a: "No! Reader operates completely in your browser. Once the website is loaded and your PDF is selected, text extraction and audio playback use your device's built-in speech engine locally. Zero continuous internet bandwidth or mobile data is used.",
  },
  {
    id: "scanned-ocr",
    category: "PDF Quality & OCR",
    icon: ScanText,
    q: "What if my lecturer's handout is a scanned photocopy with no selectable text?",
    a: "When Reader detects scanned pages or photocopies that lack embedded text, a 'Run OCR' button automatically appears in the top navigation bar. Clicking it runs an on-device OCR scan (via Tesseract.js Web Worker) to extract readable text directly from the images so you can listen.",
  },
  {
    id: "speed-cramming",
    category: "Speech & Playback",
    icon: Headphones,
    q: "How do I speed up audio for quick exam revision?",
    a: "You can adjust playback speed directly on the bottom playback bar (0.5x, 1.0x, 1.25x, 1.5x, 1.75x, and 2.0x). When you increase the speed, sentence highlighting remains perfectly synchronized with the audio so you can follow along during fast revision.",
  },
  {
    id: "privacy-storage",
    category: "Privacy",
    icon: ShieldCheck,
    q: "Are my course notes uploaded to any cloud server?",
    a: "Never. All documents, reading bookmarks, and personal preferences remain stored in your browser's private local IndexedDB sandbox. No third party or external server has access to your academic materials.",
  },
  {
    id: "install-phone",
    category: "Mobile Use",
    icon: Smartphone,
    q: "Can I install Reader as a standalone app on my Android or iPhone?",
    a: "Yes! Reader is a full Progressive Web App (PWA). On Android Chrome, tap the three dots and select 'Install App' or 'Add to Home Screen'. On iOS Safari, tap the Share icon and choose 'Add to Home Screen'. You can then launch Reader in full screen like a native app.",
  },
  {
    id: "dual-view",
    category: "Reading Modes",
    icon: BookOpen,
    q: "How do I view original diagrams, graphs, and mathematical formulas?",
    a: "Use the View Switcher at the top of the Reader to toggle between 'Reflowable' (clean reading text) and 'Original PDF' (the exact visual layout with diagrams and tables intact).",
  },
];

export default function HelpPage() {
  // Allow multiple or single open tabs
  const [openIds, setOpenIds] = useState<string[]>(["upload-listen", "data-consumption"]);

  const toggleFAQ = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 bg-white flex-1">
      {/* Page Header */}
      <div className="space-y-4 text-center md:text-left mb-10">
        <Badge variant="brand" className="py-1 px-3.5 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 mr-1.5 text-brand-600" />
          Interactive Student Help Center
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Frequently Asked Questions & Guides
        </h1>
        <p className="text-base text-slate-600">
          Click any question below to expand solutions, tips, and step-by-step guides for studying with Reader.
        </p>
      </div>

      {/* Accordion FAQ List */}
      <div className="space-y-3.5">
        {FAQS.map((faq) => {
          const isOpen = openIds.includes(faq.id);
          const Icon = faq.icon;

          return (
            <div
              key={faq.id}
              className={`rounded-3xl border transition-all overflow-hidden ${
                isOpen
                  ? "bg-white border-brand-300 shadow-sm"
                  : "bg-slate-50/80 border-slate-200/90 hover:bg-slate-100/70"
              }`}
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${
                      isOpen
                        ? "bg-brand-600 text-white shadow-xs"
                        : "bg-white text-slate-600 border border-slate-200"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600 block mb-0.5">
                      {faq.category}
                    </span>
                    <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                      {faq.q}
                    </h2>
                  </div>
                </div>

                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180 bg-brand-50 text-brand-600" : "bg-slate-200/60 text-slate-500"
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-6 sm:px-6 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100 animate-in fade-in">
                  <p className="pl-12 sm:pl-12">{faq.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Need More Assistance Card */}
      <section className="mt-12 p-7 rounded-3xl bg-slate-50 border border-slate-200/90 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5 text-center sm:text-left">
          <h3 className="text-base font-bold text-slate-900">
            Have a question or feedback?
          </h3>
          <p className="text-xs text-slate-600">
            Reader is developed by Edgar Odey for students everywhere. Feedback and feature suggestions are welcome.
          </p>
        </div>

        <a
          href="https://edgarodey.com"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white border border-slate-300 text-slate-800 font-semibold text-xs hover:bg-slate-100 transition-all shadow-xs"
        >
          Contact Edgar Odey <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
        </a>
      </section>
    </div>
  );
}
