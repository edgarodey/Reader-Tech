import React from "react";
import type { Metadata } from "next";
import { HelpCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Help & FAQ — Reader",
  description:
    "Frequently asked questions about PDF text extraction, OCR, speech voices, mobile reading, and troubleshooting in Reader.",
};

export default function HelpPage() {
  const faqs = [
    {
      q: "Does Reader upload my documents to any server?",
      a: "No. Reader uses local-first client technologies (PDF.js, WebAssembly Tesseract.js, and Web Speech API). Everything runs exclusively inside your browser on your device.",
    },
    {
      q: "Why do some scanned pages have missing text?",
      a: "Some PDFs contain flattened scanned images rather than a selectable text layer. When Reader detects pages without text, it offers client-side Optical Character Recognition (OCR) to convert scanned images into readable text.",
    },
    {
      q: "Can I choose different voice accents or reading speeds?",
      a: "Yes! In the Reader toolbar or Settings page, you can select from available system voices on your device and adjust speed from 0.5x to 2.0x.",
    },
    {
      q: "Will Reader remember my reading position if I close my browser?",
      a: "Yes. Your progress, recent documents, and preferences are automatically saved in your browser's local IndexedDB storage. When you return, click Resume to pick up right where you stopped.",
    },
    {
      q: "Can I install Reader as an app on my phone?",
      a: "Yes! Reader is a Progressive Web App (PWA). On Chrome (Android) or Safari (iOS), tap 'Add to Home Screen' or 'Install App' from your browser menu for a standalone app experience.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 bg-white flex-1">
      <div className="space-y-4 text-center md:text-left mb-10">
        <Badge variant="brand">Help Center</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-base text-slate-600">
          Everything you need to know about using Reader for your academic study.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-2">
            <h3 className="text-base font-bold text-slate-900 flex items-start gap-2.5">
              <HelpCircle className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
              {faq.q}
            </h3>
            <p className="text-sm text-slate-600 pl-7 leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
