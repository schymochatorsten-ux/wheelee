import { defineConfig } from "@playwright/test";
import base from "./playwright.config";

/**
 * Dieselben E2E-Tests gegen den **Produktionsbau** (ToDo 12.12).
 *
 *     npm run test:e2e:prod
 *
 * Der Entwicklungsserver hat keinen Service Worker und liefert die Kopfzeilen
 * anders aus; was dort übersprungen oder anders gemessen wird (der Offline-Fall
 * in `vorab-laden.spec.ts`, die Nonce der Inhaltsrichtlinie), läuft hier mit.
 *
 * `npm run build` und `npm run dev` schreiben beide nach `.next`: Der
 * Entwicklungsserver darf deshalb nicht laufen (siehe README). Darum wird hier
 * ein laufender Server **nicht** mitbenutzt.
 */
export default defineConfig({
  ...base,
  webServer: {
    command: "npm run build && npm run start",
    url: "http://localhost:3000",
    reuseExistingServer: false,
    timeout: 600_000,
  },
});
