import { expect, test } from "@playwright/test";

/**
 * Offline-Fähigkeit (ToDos 12.8, 12.9).
 *
 * Der Service Worker wird **nur im Produktionsbetrieb** angemeldet – im
 * Entwicklungsbetrieb würde er die eigenen Änderungen zwischenspeichern.
 * Läuft dieser Test gegen `npm run dev`, überspringt er sich selbst mit
 * Begründung, statt fälschlich zu scheitern.
 *
 *     npm run build && npm run start   # in einem zweiten Fenster
 *     npx playwright test offline
 */
test.describe("ohne Netz", () => {
  test("zeigt den zuletzt geladenen Stand statt einer leeren Seite", async ({ page, context }) => {
    await page.goto("/");

    // Warten, bis der Service Worker die Seite übernommen hat.
    const active = await page
      .waitForFunction(() => navigator.serviceWorker.controller !== null, null, { timeout: 8_000 })
      .then(() => true)
      .catch(() => false);

    test.skip(!active, "Kein Service Worker aktiv – vermutlich Entwicklungsbetrieb.");

    // Einmal warten, bis die Karte ihre Parkplätze geholt hat – erst dann
    // liegen sie im Speicher des Service Workers. Vorher ging das über die
    // Listenansicht; deren Reiter ist seit 2026-10-10 ausgeblendet.
    await expect(page.locator(".leaflet-marker-icon").first()).toBeVisible();
    await page.getByRole("tab", { name: "Einstellungen" }).click();
    await expect(page.getByRole("heading", { name: "Bitte vor der Fahrt lesen" })).toBeVisible();
    await page.getByRole("tab", { name: "Karte" }).click();

    await context.setOffline(true);
    await page.reload();

    // Die Seite muss stehen – genau dafür ist der Service Worker da.
    await expect(page.getByRole("heading", { name: /Behindertenparkplätze/ })).toBeVisible();
    await expect(page.getByRole("status")).toContainText("Kein Netz");

    await context.setOffline(false);
  });
});
