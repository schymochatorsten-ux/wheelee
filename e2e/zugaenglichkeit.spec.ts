import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

/**
 * Automatische Zugänglichkeitsprüfung (ToDo 19.1).
 *
 * Die Zielgruppe ist barrierebedürftig; ein Kontrastfehler fiele sonst erst im
 * Gebrauch auf. Geprüft wird gegen WCAG 2.0/2.1 A und AA. Automatik findet
 * nur einen Teil der Fehler – sie ersetzt keine Prüfung mit Screenreader.
 *
 * Die Kartenkacheln (Fremdbild, `.leaflet-container`) sind ausgenommen: Ihren
 * Kontrast bestimmt der Kartendienst, nicht diese App.
 */

async function pruefen(page: Page) {
  // Während eines Einblendens (Übergang) rechnet axe mit halbtransparenten
  // Farben und meldet Kontrastfehler, die nach Sekundenbruchteilen keine
  // mehr sind – erst prüfen, wenn Netz und Übergänge ruhen.
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(700);
  const ergebnis = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .exclude(".leaflet-container")
    .analyze();
  const kurz = ergebnis.violations.map((v) => ({
    regel: v.id,
    auswirkung: v.impact,
    stellen: v.nodes.slice(0, 3).map((n) => n.target.join(" ")),
  }));
  expect(kurz).toEqual([]);
}

for (const modus of ["light", "dark"] as const) {
  test.describe(`Zugänglichkeit (${modus})`, () => {
    test.use({ colorScheme: modus });

    test("Startseite mit Karte", async ({ page }) => {
      await page.goto("/");
      await expect(page.getByRole("tab", { name: "Einstellungen" })).toBeVisible();
      await pruefen(page);
    });

    test("Einstellungen", async ({ page }) => {
      await page.goto("/");
      await page.getByRole("tab", { name: "Einstellungen" }).click();
      await expect(page.getByRole("heading", { name: "Sprache", level: 2 })).toBeVisible();
      await pruefen(page);
    });

    for (const pfad of ["/quellen", "/abdeckung", "/datenschutz"]) {
      test(`Seite ${pfad}`, async ({ page }) => {
        await page.goto(pfad);
        await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
        await pruefen(page);
      });
    }
  });
}
