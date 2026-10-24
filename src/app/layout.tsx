import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { headers } from "next/headers";
import { ServiceWorker } from "@/components/ServiceWorker";
import { LocaleProvider } from "@/i18n/context";
import { t, localeTag } from "@/i18n";
import { getLocale } from "@/i18n/server";
import { DEFAULT_THEME, themeInitScript } from "@/lib/theme";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

/**
 * Titel und Beschreibung in der Sprache der Anfrage (ToDo 15.5) – deshalb eine
 * Funktion statt einer festen Angabe.
 */
export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const TITEL = t("meta.title", undefined, locale);
  const BESCHREIBUNG = t("meta.description", undefined, locale);
  return {
    // Seit dem Deployment auf wheelee.de bekannt. Ohne diese Angabe macht
    // Next aus jedem Vorschaubild einen relativen Pfad, und geteilte Links
    // zeigen in Messengern nichts an.
    metadataBase: new URL("https://wheelee.de"),
    title: TITEL,
    description: BESCHREIBUNG,
    openGraph: {
      title: TITEL,
      description: BESCHREIBUNG,
      url: "https://wheelee.de",
      siteName: "wheelee",
      locale: localeTag(locale).replace("-", "_"),
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
}

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Die Nonce dieser Anfrage aus `src/middleware.ts` (ToDo 10.7). Ohne sie
  // würde die Inhaltsrichtlinie das Theme-Skript blockieren. Die Abfrage macht
  // jede Seite dynamisch – gewollt, eine Nonce lässt sich nicht vorab backen.
  const nonce = (await headers()).get("x-nonce") ?? undefined;

  // Sprache der Anfrage (ToDo 15.5). Sie steht schon im ersten HTML, damit
  // `<html lang>` stimmt, bevor irgendein Skript läuft: Silbentrennung
  // (`hyphens-auto`) und die Aussprache im Screenreader hängen daran.
  // Serverseitig aus Cookie und Browsersprache, weil Skripte erst nach dem
  // ersten Zeichnen liefen – und die CSP-Nonce braucht dafür nichts Neues,
  // das Layout ist durch `headers()` ohnehin je Anfrage gerendert.
  const locale = await getLocale();

  return (
    // `suppressHydrationWarning`, weil das Skript unten `data-theme` setzt,
    // bevor React übernimmt – der Unterschied zum Server-HTML ist gewollt.
    <html lang={locale} data-theme={DEFAULT_THEME} suppressHydrationWarning>
      <head>
        {/*
          Muss vor dem ersten Zeichnen laufen, sonst blitzt die Seite kurz in
          der falschen Helligkeit auf.

          **Der ausdrückliche `<head>` ist nicht die Ursache dafür, dass Titel
          und Beschreibung im Körper landen** – am 2026-10-21 einmal ohne ihn
          gebaut und gemessen, es ändert nichts (siehe 12.10). Er bleibt, weil
          er sagt, wohin dieses Skript gehört.
        */}
        {/*
          `suppressHydrationWarning` am Skript selbst (ToDo 15.8): Der Browser
          versteckt das `nonce`-Attribut nach dem Parsen („nonce hiding“), im
          DOM steht dann `nonce=""`, und React meldet im Dev-Server den
          Unterschied zum Server-HTML. Das Attribut am `html` reicht dafür
          nicht, es gilt nur für das eigene Element. Die Nonce selbst und die
          Richtlinie bleiben unverändert.
        */}
        <script
          nonce={nonce}
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
      </head>
      {/*
        Der Rahmen hält die Bildschirmhöhe, damit der Offline-Hinweis die
        Karte zusammenschiebt, statt die Seite länger zu machen – sonst
        entstünde ausgerechnet im Funkloch ein Scrollbalken über der Karte.
      */}
      <body className={`${geistSans.variable} flex h-dvh flex-col antialiased`}>
        <LocaleProvider locale={locale}>
          <ServiceWorker />
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
