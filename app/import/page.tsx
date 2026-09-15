"use client";

import React, { Suspense, useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  BookOpen,
  Loader2,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Bookmark,
  ExternalLink,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { extractPDF } from "@/lib/pdf/extract";
import { saveDocument, savePagesAndBlocks } from "@/lib/storage/documents";

export const dynamic = "force-dynamic";

function ImportContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlParam = searchParams.get("url");

  const [status, setStatus] = useState<"waiting" | "receiving" | "extracting" | "ready" | "error">("waiting");
  const [progressMsg, setProgressMsg] = useState<string>("Waiting for document from Miva tab...");
  const [percent, setPercent] = useState<number>(10);
  const [docTitle, setDocTitle] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const processingRef = useRef(false);

  // Function to process received PDF buffer
  const handleProcessBuffer = async (buffer: ArrayBuffer, fileName?: string) => {
    if (processingRef.current) return;
    processingRef.current = true;

    try {
      setStatus("extracting");
      const title = fileName || "Miva_Course_Material.pdf";
      setDocTitle(title);
      setProgressMsg("Preparing document buffer...");
      setPercent(20);

      const file = new File([buffer], title, { type: "application/pdf" });

      const result = await extractPDF(file, (current, total) => {
        const pct = Math.round(20 + (current / total) * 70);
        setPercent(pct);
        setProgressMsg(`Extracting text from page ${current} of ${total}...`);
      });

      setProgressMsg("Saving to local study database...");
      setPercent(95);

      await saveDocument(result.docRecord);
      await savePagesAndBlocks(result.pages, result.blocks);

      setPercent(100);
      setStatus("ready");
      setProgressMsg("Ready! Launching study reader...");

      setTimeout(() => {
        router.push(`/reader?id=${result.docRecord.id}&autoplay=true`);
      }, 500);
    } catch (err: any) {
      console.error("Import processing error:", err);
      setStatus("error");
      setErrorMessage(err?.message || "Failed to parse PDF document.");
      processingRef.current = false;
    }
  };

  useEffect(() => {
    // Notify opener (Miva tab or extension) that Reader receiver is ready
    if (typeof window !== "undefined" && window.opener) {
      try {
        window.opener.postMessage({ type: "READER_RECEIVER_READY" }, "*");
      } catch (e) {
        // Cross-origin opener notice
      }
    }

    // Message listener for postMessage transfers
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === "READER_IMPORT_PDF" && event.data?.buffer) {
        setStatus("receiving");
        setProgressMsg("Receiving PDF stream from course tab...");
        handleProcessBuffer(event.data.buffer, event.data.fileName);
      }
    };

    window.addEventListener("message", handleMessage);

    // If a direct URL was passed in query parameter, try fetching it
    if (urlParam && !processingRef.current) {
      setStatus("receiving");
      setProgressMsg("Fetching course document from URL...");
      fetch(urlParam)
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP Error ${res.status}: Failed to fetch PDF`);
          return res.arrayBuffer();
        })
        .then((buf) => {
          const guessedName = urlParam.split("/").pop()?.split("?")[0] || "Course_Material.pdf";
          handleProcessBuffer(buf, decodeURIComponent(guessedName));
        })
        .catch((err) => {
          console.error(err);
          setStatus("error");
          setErrorMessage("Could not fetch PDF directly. (It may be protected by login cookies. Use the bookmarklet on Miva instead).");
        });
    }

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [urlParam]);

  // Self-contained bookmarklet code for Miva
  const bookmarkletCode = `javascript:(function(){
  try {
    var iframe = document.querySelector('iframe');
    var embed = document.querySelector('embed');
    var pdfUrl = iframe ? iframe.src : (embed ? embed.src : null);
    if (!pdfUrl) {
      var links = Array.from(document.querySelectorAll('a')).map(function(a){ return a.href; });
      pdfUrl = links.find(function(h){ return h && (h.indexOf('.pdf') !== -1 || h.indexOf('pluginfile.php') !== -1); });
    }
    if (!pdfUrl) {
      alert('Reader: No PDF course material detected on this page. Make sure the course document is visible.');
      return;
    }
    var toast = document.createElement('div');
    toast.style.cssText = 'position:fixed;top:20px;right:20px;z-index:999999;background:#0284c7;color:#fff;padding:14px 20px;border-radius:16px;font-family:sans-serif;font-size:13px;font-weight:600;box-shadow:0 10px 25px rgba(0,0,0,0.2);display:flex;align-items:center;gap:10px;';
    toast.innerHTML = '<span>⏳ Reader: Fetching course PDF in-memory...</span>';
    document.body.appendChild(toast);

    var readerUrl = '${typeof window !== "undefined" ? window.location.origin : "http://localhost:3000"}/import';
    var readerTab = window.open(readerUrl, '_blank');

    fetch(pdfUrl, { credentials: 'include' })
      .then(function(res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.arrayBuffer();
      })
      .then(function(buffer) {
        toast.innerHTML = '<span>⚡ Reader: Sending to study player...</span>';
        var sent = false;
        function send() {
          if (!readerTab || readerTab.closed) return;
          var title = document.title || 'Miva_Course_Material.pdf';
          readerTab.postMessage({ type: 'READER_IMPORT_PDF', buffer: buffer, fileName: title.replace(/[^a-zA-Z0-9._-]/g, '_') + '.pdf' }, '*');
          sent = true;
        }
        var onMsg = function(e) {
          if (e.data && e.data.type === 'READER_RECEIVER_READY') {
            send();
            window.removeEventListener('message', onMsg);
          }
        };
        window.addEventListener('message', onMsg);
        setTimeout(function(){ if(!sent) send(); }, 1200);
        setTimeout(function(){ toast.remove(); }, 3500);
      })
      .catch(function(err) {
        toast.style.background = '#dc2626';
        toast.innerHTML = '<span>❌ Error: ' + (err.message || 'Failed to grab PDF') + '</span>';
        setTimeout(function(){ toast.remove(); }, 4000);
      });
  } catch(e) {
    alert('Reader error: ' + e.message);
  }
})();`;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 sm:p-6 text-slate-900">
      <div className="max-w-xl w-full bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
          <div className="w-11 h-11 rounded-2xl bg-brand-50 border border-brand-200 flex items-center justify-center text-brand-600 shadow-xs">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900">Miva & Course In-Memory Importer</h1>
            <p className="text-xs text-slate-500">Instant study reader without saving files to disk</p>
          </div>
        </div>

        {/* Dynamic Status Display */}
        {status !== "waiting" && (
          <div className="my-6 p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-700 flex items-center gap-2">
                {status === "ready" ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : status === "error" ? (
                  <span className="text-red-600 font-bold">⚠️ Error</span>
                ) : (
                  <Loader2 className="w-4 h-4 text-brand-600 animate-spin" />
                )}
                {progressMsg}
              </span>
              <span className="text-xs font-mono font-bold text-brand-600">{percent}%</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-brand-600 transition-all duration-300 rounded-full"
                style={{ width: `${percent}%` }}
              />
            </div>

            {docTitle && (
              <p className="text-[11px] font-mono text-slate-500 mt-2 truncate">
                Document: <span className="font-semibold text-slate-700">{docTitle}</span>
              </p>
            )}

            {errorMessage && (
              <div className="mt-3 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
                {errorMessage}
              </div>
            )}
          </div>
        )}

        {/* Instructions & Bookmarklet Setup (Always visible so students can bookmark it) */}
        <div className="space-y-5">
          <div className="p-4 rounded-2xl bg-brand-50/60 border border-brand-100 text-xs text-brand-900 leading-relaxed">
            <div className="flex items-center gap-2 font-bold mb-1 text-brand-800">
              <Zap className="w-4 h-4 text-brand-600 shrink-0" />
              1-Click Send to Reader (Zero Downloads!)
            </div>
            <p className="text-slate-600 mb-3">
              Drag this button directly to your browser&apos;s <strong>Bookmarks Bar</strong>. When viewing any course PDF on Miva, click it to immediately listen in Reader!
            </p>

            {/* Draggable Bookmarklet Link */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <a
                href={bookmarkletCode}
                onClick={(e) => {
                  e.preventDefault();
                  alert("Drag this button up to your Bookmarks Bar (Ctrl+Shift+B if bookmarks bar is hidden)!");
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md transition-all cursor-grab active:cursor-grabbing shrink-0"
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>Drag to Bookmarks: 📚 Send to Reader</span>
              </a>
              <span className="text-[11px] text-slate-500 text-center sm:text-left">
                (Or click to view shortcut instructions)
              </span>
            </div>
          </div>

          <div className="border border-slate-200 rounded-2xl p-4 text-xs text-slate-600 space-y-2">
            <h3 className="font-bold text-slate-800">How to use on Miva Open University:</h3>
            <ol className="list-decimal pl-4 space-y-1 text-slate-600">
              <li>Open your course material on Miva (e.g., <em>AMS 101 Principles</em>).</li>
              <li>Click <strong>&quot;📚 Send to Reader&quot;</strong> in your bookmarks bar.</li>
              <li>Reader opens in a tab and plays the material automatically—no download to your phone or computer required!</li>
            </ol>
          </div>

          <div className="flex items-center justify-between pt-2">
            <Link href="/" className="text-xs text-slate-500 hover:text-slate-800 font-medium">
              ← Return Home
            </Link>
            <Link href="/library" className="text-xs text-brand-600 hover:text-brand-800 font-bold flex items-center gap-1">
              Go to Library <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ImportPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
          <div className="flex items-center gap-2 text-slate-600 text-sm font-medium">
            <Loader2 className="w-5 h-5 text-brand-600 animate-spin" />
            <span>Loading Miva Importer...</span>
          </div>
        </div>
      }
    >
      <ImportContent />
    </Suspense>
  );
}
