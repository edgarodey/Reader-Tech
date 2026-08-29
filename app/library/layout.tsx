import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Library",
  description: "Access and manage your uploaded course PDFs, lecture modules, and study materials locally stored in your browser.",
  openGraph: {
    title: "My Library | Reader",
    description: "Manage and continue studying your saved course PDFs with zero cloud uploads and 100% in-browser storage.",
  },
};

export default function LibraryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
