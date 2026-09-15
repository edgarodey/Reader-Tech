import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  EyeOff,
  Database,
  Trash2,
  Cpu,
  Mail,
  ExternalLink,
  CheckCircle2,
  FileText,
  AlertCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Privacy Policy — Reader Academic PDF Study Companion",
  description:
    "Learn how Reader protects student privacy. Zero cloud uploads, 100% in-browser processing, local IndexedDB storage, and full compliance with Google API Services User Data Policy.",
  alternates: {
    canonical: "https://reader.edgarodey.com/privacy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 bg-white flex-1">
      {/* Page Header */}
      <div className="space-y-4 text-left mb-10 pb-8 border-b border-slate-200">
        <Badge variant="brand" className="py-1 px-3.5 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-brand-600" />
          Transparency & Security
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Privacy Policy
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          At <strong>Reader</strong> (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), we are committed to safeguarding the privacy and personal data of students, researchers, and learners. This Privacy Policy outlines how <strong>Reader</strong> (the web application accessible at{" "}
          <Link href="/" className="text-brand-600 font-semibold underline decoration-brand-200 hover:text-brand-800">
            https://reader.edgarodey.com
          </Link>
          ) and its companion <strong>Reader Chrome Extension</strong> handle your data.
        </p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-500 pt-2 font-medium">
          <span>Effective Date: <strong>September 15, 2026</strong></span>
          <span>•</span>
          <span>Last Updated: <strong>September 15, 2026</strong></span>
          <span>•</span>
          <span>Developer: <strong>Edgar Odey</strong></span>
        </div>
      </div>

      {/* Summary Highlight Box */}
      <div className="mb-12 p-6 sm:p-8 rounded-3xl bg-emerald-50/70 border border-emerald-200/80 space-y-3.5">
        <div className="flex items-center gap-2 text-emerald-900 font-bold text-base sm:text-lg">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <h2>Core Privacy Commitment: Local-First & Zero Cloud Uploads</h2>
        </div>
        <p className="text-sm text-emerald-950 leading-relaxed">
          Reader is intentionally designed as an <strong>offline-capable, local-first study companion</strong>. Your PDF course handouts, scanned documents, OCR extractions, and synthesized audio <strong>never leave your device</strong> and are never transmitted to our servers or any third-party clouds. You retain complete ownership and control over your files at all times.
        </p>
      </div>

      {/* Main Privacy Sections */}
      <div className="space-y-12 text-slate-700 leading-relaxed text-sm sm:text-base">
        {/* Section 1: Who We Are & Scope */}
        <section className="space-y-3.5">
          <div className="flex items-center gap-2.5 text-slate-900 font-bold text-lg">
            <Cpu className="w-5 h-5 text-brand-600 shrink-0" />
            <h2>1. Identification of Application and Developer</h2>
          </div>
          <p>
            <strong>Application Name:</strong> Reader — Free, Local-First Academic PDF Study Companion (including the web application at{" "}
            <code>https://reader.edgarodey.com</code> and the companion browser extension).
          </p>
          <p>
            <strong>Developer & Entity:</strong> Edgar Odey, independent software engineer and academic tools developer.
          </p>
          <p>
            <strong>Official Website:</strong>{" "}
            <a
              href="https://edgarodey.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-600 hover:text-brand-800 font-medium underline"
            >
              https://edgarodey.com
            </a>
          </p>
          <p>
            <strong>Contact Email:</strong>{" "}
            <a
              href="mailto:eo@edgarodey.com"
              className="text-brand-600 hover:text-brand-800 font-medium underline"
            >
              eo@edgarodey.com
            </a>
          </p>
        </section>

        {/* Section 2: What Data is Handled */}
        <section className="space-y-4">
          <div className="flex items-center gap-2.5 text-slate-900 font-bold text-lg">
            <FileText className="w-5 h-5 text-brand-600 shrink-0" />
            <h2>2. Information We Process and How It Is Used</h2>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-slate-900">A. Course Materials & PDF Handouts</h3>
            <p>
              When you select or drop a PDF document into Reader, the file is parsed exclusively in your web browser&apos;s memory using client-side JavaScript (<a href="https://mozilla.github.io/pdf.js/" target="_blank" rel="noopener noreferrer" className="underline text-brand-600">PDF.js</a>). We extract text and page structures so you can read reflowed content and listen to synchronized speech. The contents of your files are <strong>never uploaded to an external server</strong>.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-slate-900">B. Optical Character Recognition (OCR)</h3>
            <p>
              For scanned handouts or image-based PDF pages, Reader runs OCR directly in your browser using client-side WebAssembly (<a href="https://tesseract.projectnaptha.com/" target="_blank" rel="noopener noreferrer" className="underline text-brand-600">Tesseract.js</a>). All pixel analysis and character recognition occur locally on your machine&apos;s CPU/GPU. No images or scanned pages are sent across the network.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-slate-900">C. Text-to-Speech Audio Generation</h3>
            <p>
              Reader utilizes your browser&apos;s native <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API" target="_blank" rel="noopener noreferrer" className="underline text-brand-600">Web Speech API</a> (SpeechSynthesis) to voice your study materials aloud. Voice synthesis is executed locally by your operating system or browser speech engine. We do not store or transmit your voice or audio tracks to any server.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-slate-900">D. User Accounts and Personal Information</h3>
            <p>
              Reader does <strong>not</strong> require user registration, account creation, passwords, phone numbers, or credit card information. You can use all core features anonymously without revealing your identity.
            </p>
          </div>
        </section>

        {/* Section 3: Google API Services User Data Policy Compliance */}
        <section className="space-y-4 p-6 sm:p-8 rounded-3xl bg-brand-50/40 border border-brand-200">
          <div className="flex items-center gap-2.5 text-brand-950 font-bold text-lg">
            <Lock className="w-5 h-5 text-brand-700 shrink-0" />
            <h2>3. Google API Services User Data Policy & Limited Use Disclosure</h2>
          </div>

          <p className="text-slate-800">
            If Reader integrates with any Google APIs or services (such as Google OAuth authentication, Google Drive file selection, or Google Cloud services), our use of your information strictly adheres to Google&apos;s published policies:
          </p>

          <blockquote className="p-4 rounded-2xl bg-white border-l-4 border-brand-600 border border-brand-200 text-slate-900 font-semibold text-sm sm:text-base italic">
            &ldquo;Reader&apos;s use and transfer of information received from Google APIs to any other app will adhere to the{" "}
            <a
              href="https://developers.google.com/terms/api-services-user-data-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-700 underline hover:text-brand-900"
            >
              Google API Services User Data Policy
            </a>
            , including the Limited Use requirements.&rdquo;
          </blockquote>

          <div className="space-y-2 text-sm text-slate-800">
            <p className="font-semibold text-slate-900">In accordance with Limited Use requirements:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                <strong>No Transfer to Third Parties:</strong> We do not transfer Google user data to any external parties unless necessary to provide or improve user-facing features that are prominent in the user interface, comply with applicable law, or as part of a merger/acquisition with user notification.
              </li>
              <li>
                <strong>No Commercial Advertising:</strong> We never use or transfer Google user data for serving advertisements, including personalized, re-targeted, or interest-based advertising.
              </li>
              <li>
                <strong>No AI/ML Model Training:</strong> We do not use Google user data to train, fine-tune, or improve generalized artificial intelligence (AI) or machine learning (ML) models.
              </li>
              <li>
                <strong>No Human Inspection:</strong> We do not allow humans to read user data received through Google APIs unless: (1) we have obtained the user&apos;s affirmative agreement for specific messages or files, (2) it is necessary for security purposes (such as investigating abuse), (3) it is required to comply with applicable law, or (4) the data is aggregated and anonymized for internal operations.
              </li>
            </ul>
          </div>
        </section>

        {/* Section 4: Data Storage and Retention */}
        <section className="space-y-3.5">
          <div className="flex items-center gap-2.5 text-slate-900 font-bold text-lg">
            <Database className="w-5 h-5 text-brand-600 shrink-0" />
            <h2>4. Data Storage, Retention, and Location</h2>
          </div>
          <p>
            All document metadata, extracted text blocks, reading progress, and customized user preferences (such as speech rate, pitch, and voice choice) are stored <strong>strictly client-side</strong> in your browser&apos;s local storage mechanisms:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base">
            <li>
              <strong>IndexedDB (<code className="text-xs bg-slate-100 px-1 py-0.5 rounded">ReaderStorageDB</code>):</strong> Caches parsed PDF documents, page text, and OCR blocks locally so you can continue reading offline without re-uploading.
            </li>
            <li>
              <strong>localStorage:</strong> Stores lightweight UI preferences (theme choice, active voice preference, audio speed).
            </li>
          </ul>
          <p>
            Because this data is stored on your local device, it persists only as long as you choose to keep it. We have no remote copy of your documents.
          </p>
        </section>

        {/* Section 5: Data Deletion & User Rights */}
        <section className="space-y-3.5">
          <div className="flex items-center gap-2.5 text-slate-900 font-bold text-lg">
            <Trash2 className="w-5 h-5 text-brand-600 shrink-0" />
            <h2>5. Your Rights: How to Delete and Export Your Data</h2>
          </div>
          <p>
            You have full autonomy over your information at all times:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <h4 className="font-bold text-slate-900 text-sm mb-1">Delete Individual Documents</h4>
              <p className="text-xs text-slate-600">
                Navigate to your{" "}
                <Link href="/library" className="text-brand-600 underline font-medium">
                  Library
                </Link>
                , click the menu on any document card, and click &ldquo;Delete&rdquo;. The document, extracted text, and bookmarks are immediately purged from your browser&apos;s IndexedDB.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <h4 className="font-bold text-slate-900 text-sm mb-1">Wipe All Stored Data</h4>
              <p className="text-xs text-slate-600">
                Navigate to{" "}
                <Link href="/settings" className="text-brand-600 underline font-medium">
                  Settings
                </Link>
                {" "}and select &ldquo;Clear All Stored Documents & Data&rdquo;. You can also clear your browser&apos;s cache and cookies at any time to permanently remove all stored items.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6: Third-Party Sharing and Sale of Data */}
        <section className="space-y-3.5">
          <div className="flex items-center gap-2.5 text-slate-900 font-bold text-lg">
            <EyeOff className="w-5 h-5 text-brand-600 shrink-0" />
            <h2>6. Third-Party Sharing and Prohibition on Data Sale</h2>
          </div>
          <p>
            We adhere to a strict policy regarding third-party disclosure:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm sm:text-base">
            <li>
              <strong>We do NOT sell, rent, trade, or monetize your personal data or document content</strong> to data brokers, ad networks, or commercial enterprises.
            </li>
            <li>
              <strong>We do NOT use tracking cookies</strong>, behavioral advertising trackers, or invasive telemetry scripts.
            </li>
            <li>
              <strong>No third-party SDKs</strong> have access to your uploaded study materials or reading history.
            </li>
          </ul>
        </section>

        {/* Section 7: Browser Extension Specific Disclosures */}
        <section className="space-y-3.5">
          <div className="flex items-center gap-2.5 text-slate-900 font-bold text-lg">
            <Cpu className="w-5 h-5 text-brand-600 shrink-0" />
            <h2>7. Reader Chrome Extension Permissions</h2>
          </div>
          <p>
            If you install the optional Reader Chrome Extension (e.g., Miva Course Importer / Study Companion), it requests only the minimum necessary permissions:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base">
            <li>
              <code>activeTab</code> & <code>scripting</code>: Used solely to detect PDF course handouts opened in your active tab when you click the Reader action or button.
            </li>
            <li>
              <code>sidePanel</code>: Enables the docked audio study player beside your course materials for seamless listening without tab switching.
            </li>
            <li>
              <code>storage</code>: Stores local player preferences (playback speed, voice selection) in your browser&apos;s extension storage.
            </li>
          </ul>
          <p className="text-sm text-slate-600">
            The extension does not monitor, record, or transmit your general web browsing history or web traffic.
          </p>
        </section>

        {/* Section 8: Children's and Student Privacy */}
        <section className="space-y-3.5">
          <div className="flex items-center gap-2.5 text-slate-900 font-bold text-lg">
            <ShieldCheck className="w-5 h-5 text-brand-600 shrink-0" />
            <h2>8. Children&apos;s and Student Privacy</h2>
          </div>
          <p>
            Reader is designed for educational use by secondary and tertiary students, adult learners, and educators. Because we do not collect personal identifiers, email addresses, or demographic data from any user, Reader does not knowingly collect personally identifiable information from children under 13 (or under 16 in the European Union).
          </p>
        </section>

        {/* Section 9: Security Measures */}
        <section className="space-y-3.5">
          <div className="flex items-center gap-2.5 text-slate-900 font-bold text-lg">
            <Lock className="w-5 h-5 text-brand-600 shrink-0" />
            <h2>9. Security Measures</h2>
          </div>
          <p>
            We implement industry-standard web security practices:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm sm:text-base">
            <li>
              <strong>Enforced HTTPS:</strong> All communication between your browser and our static hosting delivery network is encrypted in transit using modern TLS/SSL cryptographic protocols.
            </li>
            <li>
              <strong>Browser Sandbox Isolation:</strong> Reader runs within standard modern browser security sandboxes, protecting memory space and client storage from unauthorized cross-origin access.
            </li>
            <li>
              <strong>Zero Server Database:</strong> Because we do not operate a remote database containing user documents or credentials, there is no centralized database vulnerable to data breaches or credential leaks.
            </li>
          </ul>
        </section>

        {/* Section 10: Changes to this Policy */}
        <section className="space-y-3.5">
          <div className="flex items-center gap-2.5 text-slate-900 font-bold text-lg">
            <AlertCircle className="w-5 h-5 text-brand-600 shrink-0" />
            <h2>10. Updates to This Privacy Policy</h2>
          </div>
          <p>
            We may periodically update this Privacy Policy to reflect enhancements in application functionality, updates to local-first features, or adjustments in legal and regulatory frameworks. When updates occur, the &ldquo;Last Updated&rdquo; date at the top of this document will be updated. Continued use of Reader following any changes signifies your acceptance of the updated terms.
          </p>
        </section>

        {/* Section 11: Contact Us */}
        <section className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
          <div className="flex items-center gap-2.5 text-slate-900 font-bold text-lg">
            <Mail className="w-5 h-5 text-brand-600 shrink-0" />
            <h2>11. Contact Information & Privacy Inquiries</h2>
          </div>
          <p className="text-slate-700">
            If you have questions, comments, or concerns about this Privacy Policy, or wish to make an inquiry regarding our privacy practices or data handling, please contact us:
          </p>
          <div className="space-y-1.5 text-sm text-slate-800 font-medium">
            <p><strong>Edgar Odey</strong> (Lead Developer & Creator of Reader)</p>
            <p>
              Email:{" "}
              <a
                href="mailto:eo@edgarodey.com"
                className="text-brand-600 hover:text-brand-800 underline"
              >
                eo@edgarodey.com
              </a>{" "}
            </p>
            <p>
              Website:{" "}
              <a
                href="https://edgarodey.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-600 hover:text-brand-800 underline inline-flex items-center gap-1"
              >
                https://edgarodey.com <ExternalLink className="w-3 h-3 inline" />
              </a>
            </p>
            <p>
              Web Application:{" "}
              <a
                href="https://reader.edgarodey.com"
                className="text-brand-600 hover:text-brand-800 underline"
              >
                https://reader.edgarodey.com
              </a>
            </p>
          </div>
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
          href="/terms"
          className="text-slate-600 hover:text-brand-600 underline underline-offset-2"
        >
          Terms of Service &rarr;
        </Link>
      </div>
    </div>
  );
}
