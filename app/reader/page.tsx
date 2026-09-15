"use client";

import React, { Suspense, useEffect, useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2, AlertCircle, BookOpen, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReaderHeader } from "@/components/reader/reader-header";
import { ReflowableView } from "@/components/reader/reflowable-view";
import { PDFCanvasView } from "@/components/pdf/pdf-canvas-view";
import { PlaybackBar } from "@/components/playback/playback-bar";
import {
  getDocument,
  getDocumentBlocks,
  getDocumentPages,
  getProgress,
  updateLastOpened,
  savePagesAndBlocks,
} from "@/lib/storage/documents";
import { getSettings, saveSettings } from "@/lib/storage/settings";
import { DocumentRecord, PageRecord, TextBlock, SettingsRecord } from "@/lib/storage/db";
import { createSpeechChunks, SpeechChunk } from "@/lib/reader/chunker";
import { getSpeechController, SpeechController } from "@/lib/tts/speech-controller";
import { TTSStatus, VoiceOption } from "@/lib/tts/types";
import { getOrLoadPDFDocument, renderPDFPageToCanvas } from "@/lib/pdf/render";
import { performPageOCR } from "@/lib/ocr/ocr-worker";

export const dynamic = "force-dynamic";

function ReaderContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const docId = searchParams.get("id");

  const [documentRecord, setDocumentRecord] = useState<DocumentRecord | null>(null);
  const [pages, setPages] = useState<PageRecord[]>([]);
  const [blocks, setBlocks] = useState<TextBlock[]>([]);
  const [chunks, setChunks] = useState<SpeechChunk[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // View state
  const [activeView, setActiveView] = useState<"reflowable" | "pdf">("reflowable");
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Playback state
  const [status, setStatus] = useState<TTSStatus>("idle");
  const [currentChunk, setCurrentChunk] = useState<SpeechChunk | null>(null);
  const [currentChunkIndex, setCurrentChunkIndex] = useState<number>(-1);
  const [voices, setVoices] = useState<VoiceOption[]>([]);
  const [settings, setSettings] = useState<SettingsRecord | null>(null);

  // OCR state
  const [isOcrRunning, setIsOcrRunning] = useState<boolean>(false);
  const [ocrProgressMsg, setOcrProgressMsg] = useState<string>("");

  const speechControllerRef = useRef<SpeechController | null>(null);

  // Initialize Speech Controller & Load Document
  useEffect(() => {
    if (!docId) {
      setError("No document ID specified");
      setLoading(false);
      return;
    }

    const controller = getSpeechController();
    speechControllerRef.current = controller;

    // Subscribe to speech controller events
    const unsubscribe = controller.subscribe({
      onStatusChange: (newStatus) => setStatus(newStatus),
      onChunkChange: (chunkIdx, chunk) => {
        setCurrentChunkIndex(chunkIdx);
        setCurrentChunk(chunk);
        if (chunk) {
          setCurrentPage(chunk.pageNumber);
        }
      },
      onError: (err) => console.error("Speech Error:", err),
    });

    async function loadData() {
      try {
        setLoading(true);
        const [doc, docPages, docBlocks, userSettings] = await Promise.all([
          getDocument(docId!),
          getDocumentPages(docId!),
          getDocumentBlocks(docId!),
          getSettings(),
        ]);

        if (!doc) {
          setError("Document not found in local browser storage.");
          setLoading(false);
          return;
        }

        setDocumentRecord(doc);
        setPages(docPages);
        setBlocks(docBlocks);
        setSettings(userSettings);

        // Generate speech chunks
        const speechChunks = createSpeechChunks(docBlocks);
        setChunks(speechChunks);

        // Check for saved progress
        const prog = await getProgress(docId!);
        let initialChunkIdx = 0;
        if (prog && prog.blockIndex !== undefined) {
          const matchIdx = speechChunks.findIndex(
            (c) => c.blockId === prog.textBlockId || c.blockIndex === prog.blockIndex
          );
          if (matchIdx >= 0) initialChunkIdx = matchIdx;
        }

        controller.loadChunks(docId!, speechChunks, initialChunkIdx, {
          name: doc.fileName,
          totalPages: doc.pageCount,
        });
        controller.setDocumentInfo(doc.fileName, doc.pageCount);
        controller.setOptions({
          rate: userSettings.rate,
          pitch: userSettings.pitch,
          volume: userSettings.volume,
          voiceId: userSettings.voiceId,
        });

        const loadedVoices = await controller.getVoices();
        setVoices(loadedVoices);

        await updateLastOpened(docId!);

        if (searchParams.get("autoplay") === "true") {
          setTimeout(() => {
            controller.play();
          }, 300);
        }
      } catch (err: any) {
        console.error("Failed to load reader data:", err);
        setError(err.message || "Failed to load document");
      } finally {
        setLoading(false);
      }
    }

    loadData();

    return () => {
      unsubscribe();
      controller.stop();
    };
  }, [docId]);

  // Handle OCR for empty/scanned pages
  const handleTriggerOCR = async () => {
    if (!documentRecord || !documentRecord.pdfData || isOcrRunning) return;

    setIsOcrRunning(true);
    setOcrProgressMsg("Initializing OCR engine...");

    try {
      const pdfDoc = await getOrLoadPDFDocument(documentRecord.id, documentRecord.pdfData);
      const emptyPages = pages.filter((p) => p.sourceType === "empty" || p.text.trim().length < 20);
      const targetPages = emptyPages.length > 0 ? emptyPages : [pages.find((p) => p.pageNumber === currentPage) || pages[0]];

      const updatedPages = [...pages];
      let updatedBlocks = [...blocks];
      let startBlockIndex = updatedBlocks.length;

      for (let i = 0; i < targetPages.length; i++) {
        const targetPage = targetPages[i];
        setOcrProgressMsg(`Scanning page ${targetPage.pageNumber} (${i + 1}/${targetPages.length})...`);

        // Render page to offscreen canvas
        const offscreenCanvas = document.createElement("canvas");
        await renderPDFPageToCanvas(pdfDoc, targetPage.pageNumber, offscreenCanvas, 2.0);

        // Perform OCR
        const ocrResult = await performPageOCR(
          offscreenCanvas,
          targetPage.pageNumber,
          documentRecord.id,
          startBlockIndex
        );

        startBlockIndex = ocrResult.nextBlockIndex;

        // Replace page record
        const pageIdx = updatedPages.findIndex((p) => p.pageNumber === targetPage.pageNumber);
        if (pageIdx >= 0) {
          updatedPages[pageIdx] = ocrResult.pageRecord;
        }

        // Filter out old blocks for this page and insert OCR blocks
        updatedBlocks = updatedBlocks.filter((b) => b.pageNumber !== targetPage.pageNumber);
        updatedBlocks.push(...ocrResult.blocks);
      }

      updatedBlocks.sort((a, b) => a.blockIndex - b.blockIndex);

      // Persist to IndexedDB
      await savePagesAndBlocks(updatedPages, updatedBlocks);
      setPages(updatedPages);
      setBlocks(updatedBlocks);

      // Refresh speech chunks
      const newChunks = createSpeechChunks(updatedBlocks);
      setChunks(newChunks);
      if (speechControllerRef.current) {
        const wasPlaying = status === "playing";
        speechControllerRef.current.loadChunks(
          documentRecord.id,
          newChunks,
          currentChunkIndex >= 0 ? currentChunkIndex : 0,
          {
            name: documentRecord.fileName,
            totalPages: documentRecord.pageCount,
          }
        );
        if (wasPlaying) {
          speechControllerRef.current.play();
        }
      }

      setOcrProgressMsg("OCR Complete!");
      setTimeout(() => {
        setIsOcrRunning(false);
        setOcrProgressMsg("");
      }, 1500);
    } catch (err: any) {
      console.error("OCR Failed:", err);
      setOcrProgressMsg("OCR encountered an error.");
      setTimeout(() => setIsOcrRunning(false), 2500);
    }
  };

  const handleSelectChunk = (idx: number) => {
    speechControllerRef.current?.playChunkAtIndex(idx);
  };

  const handlePlay = () => {
    speechControllerRef.current?.play();
  };

  const handlePause = () => {
    speechControllerRef.current?.pause();
  };

  const handleNext = () => {
    speechControllerRef.current?.nextChunk();
  };

  const handlePrev = () => {
    speechControllerRef.current?.prevChunk();
  };

  const handleUnstick = () => {
    speechControllerRef.current?.unstick();
  };

  const handleSeekPercent = (percent: number) => {
    speechControllerRef.current?.seekToPercent(percent);
  };

  const handleChangeRate = async (rate: number) => {
    if (settings) {
      const updated = await saveSettings({ rate });
      setSettings(updated);
      speechControllerRef.current?.setOptions({ rate });
    }
  };

  const handleSelectVoice = async (voiceId: string) => {
    if (settings) {
      const updated = await saveSettings({ voiceId });
      setSettings(updated);
      speechControllerRef.current?.setOptions({ voiceId });
    }
  };

  const handleChangeFontSize = async (delta: number) => {
    if (settings) {
      const newSize = Math.max(14, Math.min(28, settings.fontSize + delta));
      const updated = await saveSettings({ fontSize: newSize });
      setSettings(updated);
    }
  };

  const handleChangeTheme = async (theme: "dark" | "light" | "sepia") => {
    if (settings) {
      const updated = await saveSettings({ theme });
      setSettings(updated);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-24 space-y-4 bg-white">
        <Loader2 className="w-8 h-8 animate-spin text-brand-600" />
        <p className="text-sm font-semibold text-slate-700">Loading course document...</p>
      </div>
    );
  }

  if (error || !documentRecord) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-white">
        <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 max-w-md space-y-4 shadow-xs">
          <AlertCircle className="w-10 h-10 text-red-500 mx-auto" />
          <h2 className="text-lg font-bold text-slate-900">Unable to Open Document</h2>
          <p className="text-xs text-slate-600">{error}</p>
          <Button variant="primary" size="md" onClick={() => router.push("/library")}>
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Go to Library
          </Button>
        </div>
      </div>
    );
  }

  const hasEmptyPages = pages.some((p) => p.sourceType === "empty" || p.text.trim().length < 20);

  return (
    <div className="flex flex-col min-h-full">
      {/* Reader Navbar */}
      <ReaderHeader
        fileName={documentRecord.fileName}
        currentPage={currentPage}
        totalPages={documentRecord.pageCount}
        activeView={activeView}
        onViewChange={(v) => setActiveView(v)}
        hasEmptyPages={hasEmptyPages}
        isOcrRunning={isOcrRunning}
        ocrProgressMsg={ocrProgressMsg}
        onTriggerOCR={handleTriggerOCR}
        fontSize={settings?.fontSize || 18}
        onChangeFontSize={handleChangeFontSize}
        theme={settings?.theme || "dark"}
        onChangeTheme={handleChangeTheme}
      />

      {/* Main Study Surface */}
      <main className="flex-1 flex flex-col">
        {activeView === "reflowable" ? (
          <ReflowableView
            blocks={blocks}
            activeChunk={currentChunk}
            onSelectChunk={handleSelectChunk}
            chunks={chunks}
            fontSize={settings?.fontSize || 18}
            lineHeight={settings?.lineHeight || 1.75}
            theme={settings?.theme || "dark"}
            onVisiblePageChange={(p) => setCurrentPage(p)}
          />
        ) : (
          <PDFCanvasView
            docId={documentRecord.id}
            pdfData={documentRecord.pdfData}
            currentPage={currentPage}
            totalPages={documentRecord.pageCount}
            onPageChange={(p) => setCurrentPage(p)}
            onSwitchToReflowable={(p) => {
              setCurrentPage(p);
              setActiveView("reflowable");
            }}
          />
        )}
      </main>

      {/* Docked Playback Bar */}
      <PlaybackBar
        status={status}
        currentChunk={currentChunk}
        currentChunkIndex={currentChunkIndex}
        totalChunks={chunks.length}
        onPlay={handlePlay}
        onPause={handlePause}
        onNext={handleNext}
        onPrev={handlePrev}
        onSeekPercent={handleSeekPercent}
        rate={settings?.rate || 1.0}
        onChangeRate={handleChangeRate}
        voices={voices}
        selectedVoiceId={settings?.voiceId}
        onSelectVoice={handleSelectVoice}
        onUnstick={handleUnstick}
      />
    </div>
  );
}

export default function ReaderPage() {
  return (
    <Suspense
      fallback={
        <div className="flex-1 flex flex-col items-center justify-center py-24">
          <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
        </div>
      }
    >
      <ReaderContent />
    </Suspense>
  );
}
