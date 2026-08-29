import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Study Reader",
  description: "Listen to and read your course PDFs with synchronized text highlighting, dual reflowable view, and client-side OCR.",
  openGraph: {
    title: "Study Reader | Reader",
    description: "Hands-free PDF reading with real-time synchronized audio and in-browser privacy.",
  },
};

export default function ReaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
