import type { MetadataRoute } from "next";

/**
 * Web-App-Manifest.
 *
 * Damit lässt sich wheelee auf den Startbildschirm legen und startet ohne
 * Browserleiste. Für eine App, die man im Auto und oft unterwegs aufruft, ist
 * das kein Beiwerk: Jeder gesparte Handgriff zählt, wenn man im Rollstuhl
 * sitzt und das Telefon in der Hand hält.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "wheelee – Behindertenparkplätze",
    short_name: "wheelee",
    description:
      "Findet den nächstgelegenen öffentlichen Behindertenparkplatz auf einer Karte – mobil, ohne Anmeldung.",
    start_url: "/",
    display: "standalone",
    // Dunkel ist die Vorgabe der App; der Startbildschirm soll dazu passen.
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    lang: "de",
    dir: "ltr",
    orientation: "any",
    categories: ["navigation", "travel", "utilities"],
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-maskable.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
