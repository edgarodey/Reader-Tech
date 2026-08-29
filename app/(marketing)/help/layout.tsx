import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Help & Frequently Asked Questions",
  description: "Learn how to use Reader for studying course PDFs, configure voices, troubleshoot OCR, and understand offline IndexedDB storage.",
  openGraph: {
    title: "Help & Frequently Asked Questions | Reader",
    description: "Guides, FAQs, and troubleshooting for studying course PDFs with Reader.",
  },
};

export default function HelpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
