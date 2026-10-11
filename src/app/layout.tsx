import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { ServiceWorker } from "@/components/ServiceWorker";
import { DEFAULT_THEME, themeInitScript } from "@/lib/theme";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const BESCHREIBUNG =
  "Findet den nächstgelegenen öffentlichen Behindertenparkplatz auf einer Karte – mobil, ohne Anmeldung.";

export const metadata: Metadata = {
  // Seit dem Deployment auf wheelee.de bekannt. Ohne diese Angabe macht
  // Next aus jedem Vorschaubild einen relativen Pfad, und geteilte Links
  // zeigen in Messengern nichts an.
  metadataBase: new URL("https://wheelee.de"),
  title: "wheelee – Behindertenparkplätze",
  description: BESCHREIBUNG,
  openGraph: {
    title: "wheelee – Behindertenparkplätze",
    description: BESCHREIBUNG,
    url: "https://wheelee.de",
    siteName: "wheelee",
    locale: "de_DE",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: "/icon-192.png",
  },
  applicationName: "wheelee",
  appleWebApp: { capable: true, title: "wheelee", statusBarStyle: "black-translucent" },
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
    // `suppressHydrationWarning`, weil das Skript unten `data-theme` setzt,
    // bevor React übernimmt – der Unterschied zum Server-HTML ist gewollt.
    <html lang="de" data-theme={DEFAULT_THEME} suppressHydrationWarning>
      <head>
        {/*
          Muss vor dem ersten Zeichnen laufen, sonst blitzt die Seite kurz in
          der falschen Helligkeit auf.
        */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      {/*
        Der Rahmen hält die Bildschirmhöhe, damit der Offline-Hinweis die
        Karte zusammenschiebt, statt die Seite länger zu machen – sonst
        entstünde ausgerechnet im Funkloch ein Scrollbalken über der Karte.
      */}
      <body className={`${geistSans.variable} flex h-dvh flex-col antialiased`}>
        <ServiceWorker />
        {children}
      </body>
    </html>
  );
}
