"use client";

import React, { useState, useMemo } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Gauge,
  Sparkles,
  Search,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SpeechChunk } from "@/lib/reader/chunker";
import { TTSStatus, VoiceOption } from "@/lib/tts/types";

interface PlaybackBarProps {
  status: TTSStatus;
  currentChunk: SpeechChunk | null;
  currentChunkIndex: number;
  totalChunks: number;
  onPlay: () => void;
  onPause: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSeekPercent: (percent: number) => void;
  rate: number;
  onChangeRate: (rate: number) => void;
  voices: VoiceOption[];
  selectedVoiceId?: string;
  onSelectVoice: (voiceId: string) => void;
}

export function PlaybackBar({
  status,
  currentChunk,
  currentChunkIndex,
  totalChunks,
  onPlay,
  onPause,
  onNext,
  onPrev,
  onSeekPercent,
  rate,
  onChangeRate,
  voices,
  selectedVoiceId,
  onSelectVoice,
}: PlaybackBarProps) {
  const [speedMenuOpen, setSpeedMenuOpen] = useState(false);
  const [voiceMenuOpen, setVoiceMenuOpen] = useState(false);
  const [voiceSearch, setVoiceSearch] = useState("");

  const isPlaying = status === "playing";
  const percent = totalChunks > 0 ? Math.round(((currentChunkIndex + 1) / totalChunks) * 100) : 0;

  const speedOptions = [0.75, 1.0, 1.25, 1.5, 1.75, 2.0];

  const filteredVoices = useMemo(() => {
    if (!voiceSearch.trim()) return voices;
    const query = voiceSearch.toLowerCase();
    return voices.filter(
      (v) => v.name.toLowerCase().includes(query) || v.lang.toLowerCase().includes(query)
    );
  }, [voices, voiceSearch]);

  const currentVoiceName = useMemo(() => {
    return voices.find((v) => v.id === selectedVoiceId)?.name || "Default Voice";
  }, [voices, selectedVoiceId]);

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200 shadow-xl p-3 sm:p-4">
      <div className="max-w-4xl mx-auto flex flex-col gap-2.5">
        {/* Scrubber & Progress */}
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono font-bold text-slate-500 w-9 text-right">
            {percent}%
          </span>
          <input
            type="range"
            min="0"
            max="100"
            value={percent}
            onChange={(e) => onSeekPercent(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
          />
          <span className="text-[11px] font-mono font-medium text-slate-500 w-16 text-left truncate">
            {currentChunkIndex >= 0 ? `${currentChunkIndex + 1}/${totalChunks}` : "0/0"}
          </span>
        </div>

        {/* Playback Controls Row */}
        <div className="flex items-center justify-between gap-2">
          {/* Left: Current Sentence Preview */}
          <div className="hidden sm:flex items-center gap-2 min-w-0 flex-1 pr-4">
            <Volume2 className="w-4 h-4 text-brand-600 shrink-0" />
            <p className="text-xs text-slate-700 truncate italic font-medium">
              {currentChunk ? `"${currentChunk.text}"` : "Ready to listen"}
            </p>
          </div>

          {/* Center: Main Buttons */}
          <div className="flex items-center justify-center gap-2 mx-auto sm:mx-0">
            {/* Prev Chunk */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onPrev}
              disabled={currentChunkIndex <= 0}
              title="Previous Sentence"
              className="h-9 w-9 text-slate-700"
            >
              <SkipBack className="w-4 h-4" />
            </Button>

            {/* Play/Pause Main Button */}
            <Button
              variant="primary"
              size="icon"
              onClick={isPlaying ? onPause : onPlay}
              title={isPlaying ? "Pause Speech" : "Play Speech"}
              className="h-11 w-11 rounded-full bg-brand-600 hover:bg-brand-500 text-white shadow-md"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-current" />
              ) : (
                <Play className="w-5 h-5 fill-current ml-0.5" />
              )}
            </Button>

            {/* Next Chunk */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onNext}
              disabled={currentChunkIndex >= totalChunks - 1}
              title="Next Sentence"
              className="h-9 w-9 text-slate-700"
            >
              <SkipForward className="w-4 h-4" />
            </Button>
          </div>

          {/* Right: Speed & Voice Pickers */}
          <div className="flex items-center gap-1.5">
            {/* Speed Control */}
            <div className="relative">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setSpeedMenuOpen(!speedMenuOpen);
                  setVoiceMenuOpen(false);
                }}
                className="text-xs h-8 px-2.5 font-mono text-brand-800 font-bold"
              >
                <Gauge className="w-3.5 h-3.5 mr-1 text-brand-600" />
                {rate}x
              </Button>

              {speedMenuOpen && (
                <div className="absolute bottom-full right-0 mb-2 p-1.5 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 flex flex-col gap-1 min-w-[90px] animate-in fade-in">
                  {speedOptions.map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        onChangeRate(s);
                        setSpeedMenuOpen(false);
                      }}
                      className={`px-3 py-1.5 text-xs rounded-xl text-left font-mono transition-colors ${
                        rate === s
                          ? "bg-brand-50 text-brand-700 font-bold"
                          : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {s}x
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Voice Control (Fixed vertical clipping & readable list) */}
            {voices.length > 0 && (
              <div className="relative">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setVoiceMenuOpen(!voiceMenuOpen);
                    setSpeedMenuOpen(false);
                  }}
                  className="text-xs h-8 px-2.5 text-brand-800 max-w-[120px] sm:max-w-[160px] truncate font-medium"
                >
                  <Sparkles className="w-3.5 h-3.5 mr-1 text-brand-600 shrink-0" />
                  <span className="truncate">{currentVoiceName}</span>
                </Button>

                {voiceMenuOpen && (
                  <div className="absolute bottom-full right-0 mb-3 p-3 bg-white border border-slate-200 rounded-3xl shadow-2xl z-50 flex flex-col gap-2 w-72 sm:w-84 max-h-80 animate-in fade-in text-slate-900">
                    <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        Speech Voices ({voices.length})
                      </span>
                      <span className="text-[10px] text-brand-600 font-semibold">Web Speech API</span>
                    </div>

                    {/* Search Input */}
                    {voices.length > 5 && (
                      <div className="relative my-1">
                        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          placeholder="Search voice or language..."
                          value={voiceSearch}
                          onChange={(e) => setVoiceSearch(e.target.value)}
                          className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-800"
                        />
                      </div>
                    )}

                    {/* Voice List */}
                    <div className="overflow-y-auto space-y-1 pr-1 max-h-52">
                      {filteredVoices.map((v) => {
                        const isSelected = selectedVoiceId === v.id;
                        return (
                          <button
                            key={v.id}
                            onClick={() => {
                              onSelectVoice(v.id);
                              setVoiceMenuOpen(false);
                            }}
                            className={`w-full p-2.5 rounded-2xl text-left transition-all flex items-center justify-between gap-2 ${
                              isSelected
                                ? "bg-brand-50 border border-brand-200 shadow-xs"
                                : "hover:bg-slate-50 border border-transparent"
                            }`}
                          >
                            <div className="min-w-0 flex-1">
                              <p className={`text-xs truncate ${isSelected ? "font-bold text-brand-900" : "font-medium text-slate-800"}`}>
                                {v.name}
                              </p>
                              <p className="text-[10px] text-slate-500 font-mono mt-0.5">
                                {v.lang} {v.accent ? `• ${v.accent}` : ""}
                              </p>
                            </div>
                            {isSelected && <Check className="w-4 h-4 text-brand-600 shrink-0" />}
                          </button>
                        );
                      })}
                      {filteredVoices.length === 0 && (
                        <p className="text-center py-4 text-xs text-slate-400">No voices match your search.</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
