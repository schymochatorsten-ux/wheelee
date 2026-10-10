import { defineConfig, devices } from "@playwright/test";

/**
 * Konfiguration des Smoke-Tests (ToDo 12.3).
 *
 * Der Test beantwortet eine einzige Frage: Läuft die App überhaupt noch? Er
 * ersetzt die Unit-Tests nicht, sondern deckt ab, was sie nicht können – dass
 * Karte, Liste und Detailansicht im echten Browser zusammenspielen. Genau das
 * ging in diesem Projekt schon zweimal kaputt, ohne dass ein Test es merkte:
 * einmal durch einen alten `.next`-Stand, einmal durch Leaflets Zugriff auf
 * `window` beim Serverrendern.
 *
 * Geprüft wird auf einem **Telefonformat**, weil die App dafür gebaut ist.
 */
export default defineConfig({
  testDir: "./e2e",
  // Die Seite trägt alle Standorte im HTML; das Laden dauert entsprechend.
  timeout: 60_000,
  expect: { timeout: 15_000 },
  fullyParallel: false,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: "http://localhost:3000",
    trace: "retain-on-failure",
  },
  projects: [{ name: "Mobil (Pixel 7)", use: { ...devices["Pixel 7"] } }],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    // Einen laufenden Entwicklungsserver mitbenutzen, statt einen zweiten zu
    // starten: Beide schrieben sonst nach `.next` und stolperten übereinander.
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
