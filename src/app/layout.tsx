import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "wheelee – Behindertenparkplätze",
  description:
    "Findet den nächstgelegenen öffentlichen Behindertenparkplatz auf einer Karte – mobil, ohne Anmeldung.",
};

export const viewport: Viewport = {
  // Die Karte füllt den Bildschirm; Zoom bleibt erlaubt, weil er für
  // Sehbehinderte unverzichtbar ist.
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={`${geistSans.variable} antialiased`}>{children}</body>
    </html>
  );
}
