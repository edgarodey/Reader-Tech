import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  FileCheck2,
  Shield,
  Scale,
  Cpu,
  Mail,
  ExternalLink,
  BookOpen,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Terms of Service — Reader Academic PDF Study Companion",
  description:
    "Terms of Service for Reader, an open-source, local-first academic study tool built by Edgar Odey.",
  alternates: {
    canonical: "https://reader.edgarodey.com/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 bg-white flex-1">
      {/* Page Header */}
      <div className="space-y-4 text-left mb-10 pb-8 border-b border-slate-200">
        <Badge variant="brand" className="py-1 px-3.5 text-xs font-semibold">
          <Scale className="w-3.5 h-3.5 mr-1.5 text-brand-600" />
          Terms & Licensing
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Terms of Service
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          Please read these Terms of Service (&ldquo;Terms&rdquo;) carefully before using <strong>Reader</strong> (accessible at{" "}
          <Link href="/" className="text-brand-600 font-semibold underline decoration-brand-200 hover:text-brand-800">
            https://reader.edgarodey.com
          </Link>
          ) or the <strong>Reader Chrome Extension</strong>, developed and maintained by <strong>Edgar Odey</strong> (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;).
        </p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-500 pt-2 font-medium">
          <span>Effective Date: <strong>September 15, 2026</strong></span>
          <span>•</span>
          <span>Last Updated: <strong>September 15, 2026</strong></span>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-10 text-slate-700 leading-relaxed text-sm sm:text-base">
        {/* Section 1: Acceptance */}
        <section className="space-y-3">
          <div className="flex items-center gap-2.5 text-slate-900 font-bold text-lg">
            <FileCheck2 className="w-5 h-5 text-brand-600 shrink-0" />
            <h2>1. Acceptance of Terms</h2>
          </div>
          <p>
            By accessing or using Reader, you acknowledge that you have read, understood, and agree to be bound by these Terms and our{" "}
            <Link href="/privacy" className="text-brand-600 font-medium underline">
              Privacy Policy
            </Link>
            . If you do not agree to these terms, please do not use the application.
          </p>
        </section>

        {/* Section 2: Educational & Local-First Purpose */}
        <section className="space-y-3">
          <div className="flex items-center gap-2.5 text-slate-900 font-bold text-lg">
            <BookOpen className="w-5 h-5 text-brand-600 shrink-0" />
            <h2>2. Purpose and Educational Use</h2>
          </div>
          <p>
            Reader is provided as a free, local-first academic companion to help students, distance learners, and researchers read and listen to educational PDFs, lecture slides, and course handouts. All document processing is performed on the user&apos;s local device.
          </p>
        </section>

        {/* Section 3: User Responsibilities & Content */}
        <section className="space-y-3">
          <div className="flex items-center gap-2.5 text-slate-900 font-bold text-lg">
            <Shield className="w-5 h-5 text-brand-600 shrink-0" />
            <h2>3. User Content & Intellectual Property</h2>
          </div>
          <p>
            You retain all intellectual property rights and ownership of any files, PDFs, or materials you open or process with Reader. Because Reader executes entirely within your browser and does not upload your files to any remote server, we do not claim any ownership, rights, or license over your documents.
          </p>
          <p>
            You represent that you have lawful access and necessary permissions to study and read the materials you load into Reader.
          </p>
        </section>

        {/* Section 4: Open Source License */}
        <section className="space-y-3">
          <div className="flex items-center gap-2.5 text-slate-900 font-bold text-lg">
            <Cpu className="w-5 h-5 text-brand-600 shrink-0" />
            <h2>4. Source Code and Licensing</h2>
          </div>
          <p>
            Reader&apos;s source code is licensed under the <strong>PolyForm Noncommercial License 1.0.0</strong>. You are welcome to inspect, audit, and use the software for personal, academic, and non-commercial purposes. Commercial exploitation, re-branding for sale, or closed-source commercial redistribution is prohibited without prior written license from the copyright holder, Edgar Odey. See our{" "}
            <Link href="/open-source" className="text-brand-600 font-medium underline">
              Open Source page
            </Link>{" "}
            for complete license text.
          </p>
        </section>

        {/* Section 5: Disclaimer of Warranties */}
        <section className="space-y-3">
          <div className="flex items-center gap-2.5 text-slate-900 font-bold text-lg">
            <Scale className="w-5 h-5 text-brand-600 shrink-0" />
            <h2>5. Disclaimer of Warranties</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            READER IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES, OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF, OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
          </p>
        </section>

        {/* Section 6: Contact */}
        <section className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
          <div className="flex items-center gap-2.5 text-slate-900 font-bold text-lg">
            <Mail className="w-5 h-5 text-brand-600 shrink-0" />
            <h2>6. Contact</h2>
          </div>
          <p>
            For questions regarding these Terms, please reach out to Edgar Odey at{" "}
            <a href="mailto:eo@edgarodey.com" className="text-brand-600 underline">
              eo@edgarodey.com
            </a>{" "}
            or visit{" "}
            <a
              href="https://edgarodey.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-600 underline inline-flex items-center gap-1"
            >
              https://edgarodey.com <ExternalLink className="w-3 h-3 inline" />
            </a>.
          </p>
        </section>
      </div>

      {/* Footer Return Link */}
      <div className="mt-12 pt-6 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
        <Link
          href="/"
          className="text-brand-600 hover:text-brand-800 font-semibold underline underline-offset-2"
        >
          &larr; Back to Reader Home
        </Link>
        <Link
          href="/privacy"
          className="text-slate-600 hover:text-brand-600 underline underline-offset-2"
        >
          Privacy Policy &rarr;
        </Link>
      </div>
    </div>
  );
}
