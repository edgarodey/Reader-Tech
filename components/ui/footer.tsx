import React from "react";
import Link from "next/link";
import { ShieldCheck, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 mt-auto py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8">
          {/* Brand and Tagline */}
          <div className="flex flex-col items-start text-left max-w-md">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
              <span>Reader</span>
              <span className="text-slate-400">•</span>
              <span className="text-xs font-normal text-slate-500">
                Open-source local-first study reader
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-2 flex items-start gap-2 leading-relaxed text-left">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Your course PDFs never leave your browser. Zero cloud uploads.</span>
            </p>
          </div>

          {/* Navigation Links - Left aligned */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap items-start justify-start gap-y-2.5 gap-x-6 text-xs text-slate-600 font-medium">
            <Link href="/about" className="hover:text-brand-600 transition-colors">
              About & Mission
            </Link>
            <Link href="/help" className="hover:text-brand-600 transition-colors">
              Help & FAQ
            </Link>
            <Link href="/open-source" className="hover:text-brand-600 transition-colors">
              Open Source (PolyForm NC)
            </Link>
            <Link href="/settings" className="hover:text-brand-600 transition-colors">
              Privacy & Settings
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] text-slate-500 gap-2 text-left">
          <span>Designed for university students and distance learners everywhere</span>
          <span className="flex items-center gap-1 font-medium text-slate-700">
            Built with <Heart className="w-3 h-3 text-red-500 inline fill-red-500" /> by{" "}
            <a
              href="https://edgarodey.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-600 hover:text-brand-800 font-semibold underline decoration-brand-300 underline-offset-2 transition-colors"
            >
              Edgar Odey
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
