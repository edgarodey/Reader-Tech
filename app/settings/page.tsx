"use client";

import React, { useEffect, useState } from "react";
import {
  Settings,
  Volume2,
  Type,
  ShieldCheck,
  Trash2,
  Check,
  AlertTriangle,
  RotateCcw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { FollowSocials } from "@/components/ui/social-links";
import { getSettings, saveSettings, DEFAULT_SETTINGS } from "@/lib/storage/settings";
import { SettingsRecord } from "@/lib/storage/db";
import { getSpeechController } from "@/lib/tts/speech-controller";
import { VoiceOption } from "@/lib/tts/types";
import { clearAllLocalData, getAllDocuments } from "@/lib/storage/documents";
import { formatBytes } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default function SettingsPage() {
  const [mounted, setMounted] = useState(false);
  const [settings, setSettings] = useState<SettingsRecord>(DEFAULT_SETTINGS);
  const [voices, setVoices] = useState<VoiceOption[]>([]);
  const [docCount, setDocCount] = useState(0);
  const [totalSize, setTotalSize] = useState(0);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [confirmClearOpen, setConfirmClearOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    getSettings().then(setSettings);

    const controller = getSpeechController();
    controller.getVoices().then(setVoices);

    getAllDocuments().then((docs) => {
      setDocCount(docs.length);
      const total = docs.reduce((acc, d) => acc + (d.fileSize || 0), 0);
      setTotalSize(total);
    });
  }, []);

  const handleUpdate = async (patch: Partial<SettingsRecord>) => {
    const updated = await saveSettings(patch);
    setSettings(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleReset = async () => {
    const updated = await saveSettings(DEFAULT_SETTINGS);
    setSettings(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleClearData = async () => {
    await clearAllLocalData();
    setConfirmClearOpen(false);
    setDocCount(0);
    setTotalSize(0);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex-1 bg-white">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-2.5">
            <Settings className="w-7 h-7 text-brand-600" />
            Preferences & Settings
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Customize speech synthesis, typography, and local browser storage.
          </p>
        </div>

        {savedSuccess && (
          <Badge variant="success" className="animate-in fade-in">
            <Check className="w-3.5 h-3.5 mr-1" /> Preferences Saved
          </Badge>
        )}
      </div>

      <div className="space-y-8">
        {/* Section 1: Speech Engine & Voices */}
        <section className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2.5">
              <Volume2 className="w-5 h-5 text-brand-600" />
              <h2 className="text-lg font-bold text-slate-900">Audio & Speech Engine</h2>
            </div>
            <Badge variant="brand">Active Engine</Badge>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                Active Speech Engine
              </label>
              <select
                value={settings.activeEngineId}
                onChange={(e) =>
                  handleUpdate({
                    activeEngineId: e.target.value as any,
                  })
                }
                className="w-full sm:w-80 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
              >
                <option value="web-speech">Browser Web Speech API (Fast, Free)</option>
                <option value="local-wasm" disabled>
                  On-Device Local AI Voice (Offline WASM)
                </option>
              </select>
              <p className="text-xs text-slate-500 mt-1">
                Zero data cost, fast, and uses installed system voices.
              </p>
            </div>

            {/* Voice Picker */}
            {voices.length > 0 && (
              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                  Default System Voice
                </label>
                <select
                  value={settings.voiceId || ""}
                  onChange={(e) =>
                    handleUpdate({
                      voiceId: e.target.value,
                      voiceName: voices.find((v) => v.id === e.target.value)?.name,
                    })
                  }
                  className="w-full sm:w-80 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white truncate"
                >
                  <option value="">Default System Voice</option>
                  {voices.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.name} ({v.lang})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Speed Slider */}
            <div>
              <div className="flex items-center justify-between text-sm font-semibold text-slate-800 mb-1.5">
                <span>Default Playback Speed</span>
                <span className="font-bold text-brand-600">{settings.rate}x</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="2.0"
                step="0.25"
                value={settings.rate}
                onChange={(e) => handleUpdate({ rate: parseFloat(e.target.value) })}
                className="w-full accent-brand-600 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-medium">
                <span>0.5x (Slow)</span>
                <span>1.0x (Normal)</span>
                <span>1.5x (Fast)</span>
                <span>2.0x (Double)</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Reading Appearance */}
        <section className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2.5">
              <Type className="w-5 h-5 text-brand-600" />
              <h2 className="text-lg font-bold text-slate-900">Reflowable Reading Appearance</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Font Size */}
            <div>
              <div className="flex items-center justify-between text-sm font-semibold text-slate-800 mb-1.5">
                <span>Font Size</span>
                <span className="font-bold text-brand-600">{settings.fontSize}px</span>
              </div>
              <input
                type="range"
                min="14"
                max="28"
                step="1"
                value={settings.fontSize}
                onChange={(e) => handleUpdate({ fontSize: parseInt(e.target.value) })}
                className="w-full accent-brand-600 cursor-pointer"
              />
            </div>

            {/* Line Height */}
            <div>
              <div className="flex items-center justify-between text-sm font-semibold text-slate-800 mb-1.5">
                <span>Line Height</span>
                <span className="font-bold text-brand-600">{settings.lineHeight}</span>
              </div>
              <input
                type="range"
                min="1.4"
                max="2.2"
                step="0.1"
                value={settings.lineHeight}
                onChange={(e) => handleUpdate({ lineHeight: parseFloat(e.target.value) })}
                className="w-full accent-brand-600 cursor-pointer"
              />
            </div>
          </div>

          {/* Reading Canvas Theme */}
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-2">
              Reading Canvas Palette
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: "light", label: "Clean White", bg: "bg-white", text: "text-slate-900", border: "border-slate-300" },
                { id: "sepia", label: "Soft Sepia", bg: "bg-[#fbf0d9]", text: "text-amber-950", border: "border-amber-300" },
                { id: "dark", label: "Dark Blue", bg: "bg-[#05233d]", text: "text-white", border: "border-brand-700" },
              ].map((th) => (
                <button
                  key={th.id}
                  onClick={() => handleUpdate({ theme: th.id as any })}
                  className={`p-3 rounded-2xl border text-center font-medium text-xs transition-all shadow-xs ${
                    th.bg
                  } ${th.text} ${th.border} ${
                    settings.theme === th.id
                      ? "ring-2 ring-brand-600 font-bold"
                      : "opacity-80 hover:opacity-100"
                  }`}
                >
                  {th.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Local Storage & Privacy */}
        <section className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <h2 className="text-lg font-bold text-slate-900">Browser Storage & Privacy</h2>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-900">Locally Cached Materials</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {docCount} course documents • ~{formatBytes(totalSize)} stored in IndexedDB
                </p>
              </div>
              <Button
                variant="danger"
                size="sm"
                onClick={() => setConfirmClearOpen(true)}
                className="shrink-0 w-full sm:w-auto text-xs"
              >
                <Trash2 className="w-4 h-4 mr-1.5" />
                Clear Local Data
              </Button>
            </div>

            <div className="flex items-center justify-between pt-2">
              <Button variant="ghost" size="sm" onClick={handleReset}>
                <RotateCcw className="w-3.5 h-3.5 mr-1" />
                Reset Defaults
              </Button>
            </div>
          </div>
        </section>
      </div>

      {/* Follow on Socials Section */}
      <FollowSocials variant="card" title="Follow Edgar on socials for updates" className="mt-8" />

      {/* Confirmation Modal */}
      <Modal
        isOpen={confirmClearOpen}
        onClose={() => setConfirmClearOpen(false)}
        title="Clear All Local Study Data"
        description="This will permanently delete all stored PDFs, OCR caches, and reading progress records from this device."
      >
        <div className="space-y-4 pt-2">
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <span>
              This action cannot be undone. You will need to re-import your course PDFs to read them again.
            </span>
          </div>
          <div className="flex items-center justify-end gap-3 pt-2">
            <Button variant="ghost" size="md" onClick={() => setConfirmClearOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" size="md" onClick={handleClearData}>
              Clear Everything
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
