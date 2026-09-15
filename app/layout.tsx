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
  metadataBase: new URL("https://reader.edgarodey.com"),
  title: {
    default: "Reader — Free, Local-First Academic PDF Study Companion",
    template: "%s | Reader",
  },
  description:
    "Study your university course PDFs hands-free with synchronized speech, reflowable mobile reading view, client-side OCR, and zero cloud uploads. 100% private in your browser. Built by Edgar Odey.",
  keywords: [
    "PDF reader",
    "Text to speech PDF",
    "audio study companion",
    "local-first PDF",
    "open source PDF TTS",
    "academic PDF reader",
    "Edgar Odey",
    "offline study tool",
    "student PDF reader",
  ],
  authors: [{ name: "Edgar Odey", url: "https://edgarodey.com" }],
  creator: "Edgar Odey",
  publisher: "Edgar Odey",
  applicationName: "Reader",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/assets/images/Reader-Logo-nobg.png" },
      { url: "/assets/images/Reader-Logo-nobg.png", sizes: "192x192", type: "image/png" },
      { url: "/assets/images/Reader-Logo-nobg.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/assets/images/Reader-Logo-nobg.png",
    apple: "/assets/images/Reader-Logo-nobg.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://reader.edgarodey.com",
    siteName: "Reader",
    title: "Reader — Free, Local-First Academic PDF Study Companion",
    description:
      "Study your university course PDFs hands-free with synchronized speech, reflowable mobile reading view, client-side OCR, and zero cloud uploads. Built by Edgar Odey.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Reader — Free, Local-First Academic PDF Study Companion (Built by Edgar Odey)",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reader — Free, Local-First Academic PDF Study Companion",
    description:
      "Listen to university course PDFs hands-free with synchronized sentence highlights, reflowable mobile reader, and client-side OCR. 100% in-browser privacy.",
    images: ["/opengraph-image"],
    creator: "@edgarodey",
  },
  alternates: {
    canonical: "https://reader.edgarodey.com",
  },
  verification: {
    google:
      process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
      process.env.GOOGLE_SITE_VERIFICATION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans min-h-screen flex flex-col bg-white text-slate-900 selection:bg-brand-100 selection:text-brand-900 w-full max-w-full overflow-x-hidden`}
      >
        <SidebarProvider>
          <Sidebar />
          <Navbar />
          <main className="flex-1 flex flex-col w-full max-w-full overflow-x-hidden">{children}</main>
          <Footer />
        </SidebarProvider>
      </body>
    </html>
  );
}
