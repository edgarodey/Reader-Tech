import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Sparkles, ShieldCheck, Heart, ArrowRight, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FollowSocials } from "@/components/ui/social-links";

export const metadata: Metadata = {
  title: "The Story Behind Reader — Built by Edgar Odey",
  description:
    "How the exhaustion of reading 50-page PDF course handouts inspired Edgar Odey to create Reader for university students and distance learners.",
};

export default function AboutPage() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 bg-white flex-1">
      {/* Header */}
      <div className="space-y-4 text-center md:text-left mb-10">
        <Badge variant="brand" className="py-1 px-3.5 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 mr-1.5 text-brand-600" />
          Origin Story & Mission
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          How late-night PDF exhaustion sparked the creation of Reader
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          The story of how a distance-learning university student transformed heavy semester courseware into an effortless audio study companion.
        </p>
      </div>

      <div className="space-y-8 text-slate-700 leading-relaxed">
        {/* The Real Story Section */}
        <section className="p-8 rounded-3xl bg-slate-50/80 border border-slate-200/90 space-y-6">
          <div className="flex items-center gap-2.5 text-brand-700 font-bold text-lg">
            <BookOpen className="w-5 h-5 text-brand-600" />
            <h2>The Spark: Dealing with Hundreds of Pages of Course PDFs</h2>
          </div>

          <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
            <p>
              When I got admitted into university for my degree, virtually all our course materials,
              lecture modules, and study packs were distributed as dense, multi-page PDFs.
            </p>

            <p>
              Balancing everyday life, work responsibilities, and academic deadlines meant spending
              hours every single night staring at a laptop and smartphone screen, scrolling through
              endless columns of small, rigid PDF text.
            </p>

            <blockquote className="p-4 rounded-2xl bg-white border-l-4 border-brand-600 border border-slate-200 text-slate-900 font-medium italic my-4">
              &ldquo;Reading page after page after a long day of work is exhausting. My eyes would hurt,
              fatigue would set in, and I thought to myself: Why do I have to sit glued to a screen to absorb this material?
              What if I could just upload my course PDFs and have them read aloud to me clearly while I rest my eyes,
              cook, or commute?&rdquo;
            </blockquote>

            <p>
              That single question was the turning point. I wanted a study tool that wasn&apos;t locked behind
              expensive subscriptions, didn&apos;t demand cloud uploads or signups, and didn&apos;t consume heavy mobile data.
            </p>

            <p>
              So I built <strong>Reader</strong>—a local-first academic audio companion designed to give students their time,
              energy, and eyesight back.
            </p>
          </div>
        </section>

        {/* Core Principles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-slate-900 font-bold">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <h3>100% In-Browser Privacy</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Your study notes and university handouts never touch any external server. They remain
              strictly in your browser sandbox using IndexedDB, respecting student privacy and copyright.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-slate-900 font-bold">
              <Heart className="w-5 h-5 text-red-500 fill-red-500" />
              <h3>Free & Open for Students</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Protected under the PolyForm Noncommercial License to ensure no corporation or third party
              can monetize or commercialize it. Reader is and will remain free for all learners.
            </p>
          </div>
        </div>

        {/* Creator Bio & Links */}
        <section className="p-7 rounded-3xl bg-brand-50/50 border border-brand-200/80 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center sm:text-left">
            <h3 className="text-base font-bold text-slate-900">
              Built by Edgar Odey
            </h3>
            <p className="text-xs text-slate-600">
              Software Engineer & Creator of Reader • Accessible at{" "}
              <a
                href="https://reader.edgarodey.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-600 font-semibold hover:underline"
              >
                reader.edgarodey.com
              </a>
            </p>
          </div>

          <a
            href="https://edgarodey.com/experience"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-brand-600 text-white font-semibold text-xs hover:bg-brand-700 transition-all shadow-xs"
          >
            Visit Portfolio <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </section>

        {/* Follow on Socials Card */}
        <FollowSocials variant="card" title="Follow Edgar on socials for updates" />
      </div>
    </div>
  );
}
