import React from "react";
import Link from "next/link";
import { ShieldCheck, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 mt-auto py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
              <span>Reader</span>
              <span className="text-slate-400">•</span>
              <span className="text-xs font-normal text-slate-500">
                Open-source local-first study reader
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Your course PDFs never leave your browser. Zero cloud uploads.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600">
            <Link href="/about" className="hover:text-brand-600 transition-colors font-medium">
              About & Mission
            </Link>
            <Link href="/help" className="hover:text-brand-600 transition-colors font-medium">
              Help & FAQ
            </Link>
            <Link href="/open-source" className="hover:text-brand-600 transition-colors font-medium">
              Open Source (PolyForm NC)
            </Link>
            <Link href="/settings" className="hover:text-brand-600 transition-colors font-medium">
              Privacy & Settings
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
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
