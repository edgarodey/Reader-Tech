"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Library,
  FileText,
  Trash2,
  BookOpen,
  Plus,
  Clock,
  Search,
  AlertTriangle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { FollowSocials } from "@/components/ui/social-links";
import { getAllDocuments, deleteDocument, getProgress } from "@/lib/storage/documents";
import { DocumentRecord } from "@/lib/storage/db";
import { formatBytes } from "@/lib/utils";

interface DocWithProgress extends DocumentRecord {
  progressPercent?: number;
}

export const dynamic = "force-dynamic";

export default function LibraryPage() {
  const router = useRouter();
  const [documents, setDocuments] = useState<DocWithProgress[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [docToDelete, setDocToDelete] = useState<DocWithProgress | null>(null);

  const loadDocs = async () => {
    setLoading(true);
    try {
      const docs = await getAllDocuments();
      const docsWithProg = await Promise.all(
        docs.map(async (d) => {
          const prog = await getProgress(d.id);
          return {
            ...d,
            progressPercent: prog ? prog.percent : 0,
          };
        })
      );
      setDocuments(docsWithProg);
    } catch (err) {
      console.error("Failed to load documents:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDocs();
  }, []);

  const handleDelete = async () => {
    if (!docToDelete) return;
    try {
      await deleteDocument(docToDelete.id);
      setDocToDelete(null);
      await loadDocs();
    } catch (err) {
      console.error("Failed to delete document:", err);
    }
  };

  const filteredDocs = documents.filter((d) =>
    d.fileName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex-1 flex flex-col bg-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 w-full">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-2.5">
            <Library className="w-7 h-7 text-brand-600 shrink-0" />
            My Study Library
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Documents saved locally in your browser storage.
          </p>
        </div>

        {!loading && documents.length > 0 && (
          <Link href="/">
            <Button variant="primary" size="md">
              <Plus className="w-4 h-4 mr-1.5" />
              Upload New PDF
            </Button>
          </Link>
        )}
      </div>

      {/* Search Bar */}
      {documents.length > 0 && (
        <div className="relative mb-8 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search documents by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all"
          />
        </div>
      )}

      {/* Document Grid */}
      {loading ? (
        <div className="py-20 text-center text-slate-500 w-full">
          <p className="text-sm">Loading your local documents...</p>
        </div>
      ) : filteredDocs.length === 0 ? (
        <div className="py-12 sm:py-16 text-center border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50 p-6 sm:p-8 w-full max-w-full overflow-hidden">
          <FileText className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-900">No documents in library</h3>
          <p className="text-sm text-slate-600 max-w-sm mx-auto mt-1 mb-6">
            {searchQuery
              ? "No course documents match your search query."
              : "Upload a course PDF to start studying with reflowable text and speech."}
          </p>
          <Link href="/">
            <Button variant="primary" size="md">
              Upload PDF
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
          {filteredDocs.map((doc) => (
            <div
              key={doc.id}
              className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between group space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600 shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <button
                    onClick={() => setDocToDelete(doc)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    title="Delete document"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div>
                  <h3
                    className="text-base font-semibold text-slate-900 group-hover:text-brand-600 transition-colors line-clamp-2"
                    title={doc.fileName}
                  >
                    {doc.fileName}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5 font-medium">
                    <span>{doc.pageCount} pages</span>
                    <span>•</span>
                    <span>{formatBytes(doc.fileSize)}</span>
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span className="flex items-center gap-1 font-medium">
                      <Clock className="w-3 h-3 text-slate-400" /> Progress
                    </span>
                    <span className="font-bold text-brand-600">
                      {doc.progressPercent || 0}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-brand-600 h-full transition-all duration-300"
                      style={{ width: `${doc.progressPercent || 0}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-medium">
                  {new Date(doc.lastOpenedAt).toLocaleDateString()}
                </span>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => router.push(`/reader?id=${doc.id}`)}
                >
                  <BookOpen className="w-3.5 h-3.5 mr-1" />
                  Study Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Follow on Socials Section */}
      <div className="mt-12 pt-6 border-t border-slate-100">
        <FollowSocials variant="card" title="Follow Edgar on socials for updates" />
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!docToDelete}
        onClose={() => setDocToDelete(null)}
        title="Delete Document"
        description="Are you sure you want to remove this document from your local browser storage?"
      >
        <div className="space-y-4 pt-2">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-700 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
            <span className="truncate">{docToDelete?.fileName}</span>
          </div>
          <div className="flex items-center justify-end gap-3 pt-2">
            <Button variant="ghost" size="md" onClick={() => setDocToDelete(null)}>
              Cancel
            </Button>
            <Button variant="danger" size="md" onClick={handleDelete}>
              Delete Document
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
