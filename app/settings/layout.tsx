import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings & Voice Options",
  description: "Customize your text-to-speech voice, playback rate, pitch, typography, and local storage data management.",
  openGraph: {
    title: "Settings & Voice Options | Reader",
    description: "Customize your text-to-speech voice, playback speed, reading theme, and local cache storage in Reader.",
  },
};

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
