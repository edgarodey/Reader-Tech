import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/ui/navbar";
import { Sidebar, SidebarProvider } from "@/components/ui/sidebar";
import { Footer } from "@/components/ui/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://reader-tech.vercel.app"),
  title: "Reader — Free, Local-First PDF Study Reader",
  description:
    "Study your course PDFs hands-free with synchronized speech, reflowable mobile reading view, client-side OCR, and zero cloud uploads. Built by Edgar Odey.",
  keywords: [
    "PDF reader",
    "Text to speech PDF",
    "audio study",
    "local-first PDF",
    "open source PDF TTS",
    "Edgar Odey"
  ],
  authors: [{ name: "Edgar Odey" }],
  creator: "Edgar Odey",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/assets/images/Reader-Logo-nobg.png",
    shortcut: "/assets/images/Reader-Logo-nobg.png",
    apple: "/assets/images/Reader-Logo-nobg.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://reader-tech.vercel.app",
    title: "Reader — Study Course PDFs by Listening",
    description: "Free, local-first academic study reader with dual reflowable and original PDF views. Built by Edgar Odey.",
    siteName: "Reader",
    images: [
      {
        url: "/assets/images/Reader-Logo-nobg.png",
        width: 512,
        height: 512,
        alt: "Reader Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reader — Local-First PDF Study Reader",
    description: "Listen to university course PDFs with synchronized sentence highlights. Built by Edgar Odey.",
    images: ["/assets/images/Reader-Logo-nobg.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#05233d",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans min-h-screen flex flex-col bg-white text-slate-900 selection:bg-brand-100 selection:text-brand-900`}
      >
        <SidebarProvider>
          <Sidebar />
          <Navbar />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
        </SidebarProvider>
      </body>
    </html>
  );
}
