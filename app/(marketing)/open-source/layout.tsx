import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Open Source & PolyForm Noncommercial License",
  description: "Reader is free and open-source under PolyForm Noncommercial License 1.0.0, created by Edgar Odey for students and learners worldwide.",
  openGraph: {
    title: "Open Source & PolyForm Noncommercial License | Reader",
    description: "Learn about Reader's noncommercial open-source license, architecture, and contribution guidelines.",
  },
};

export default function OpenSourceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
