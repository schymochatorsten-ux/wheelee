import { expect, test } from "@playwright/test";
import { ansicht } from "./ansicht";

/** Städteliste nachgeladen statt im HTML (ToDo 19.9). */

test.describe("Städteliste", () => {
  test("die Schnittstelle liefert alle Städte mit Quelle und Zahlen", async ({ request }) => {
    const antwort = await request.get("/api/cities");
    expect(antwort.status()).toBe(200);
    const { cities, sources } = await antwort.json();
    expect(cities.length).toBeGreaterThan(100);
    // Verdichtet (2e.14): wenige Quellen, jede Stadt verweist darauf.
    expect(sources.length).toBeLessThan(cities.length / 10);
    for (const city of cities.slice(0, 20)) {
      expect(city.slug).toBeTruthy();
      expect(sources[city.src].attribution).toBeTruthy();
      expect(city.spotCount).toBeGreaterThan(0);
    }
  });

  test("die Startseite trägt die Liste nicht mehr im HTML", async ({ request }) => {
    const html = await (await request.get("/")).text();
    // Die Standardstadt steht darin, sonst ist die Liste nicht im Dokument.
    expect(html.length).toBeLessThan(150_000);
    expect(html).not.toContain('"attribution":"OpenStreetMap-Mitwirkende');
  });

  /*
   * Seit 9.31 gibt es für den Vorab-Download keine Auswahlliste mehr, sondern
   * ein Feld mit Vorschlägen. Geprüft wird dieselbe Sache wie vorher: dass die
   * nachgeladenen Städte ankommen (19.9) und dass die Eingabe sie eingrenzt
   * (2e.14) – nur eben an dem Bedienelement, das es jetzt gibt.
   */
  test("die Vorschläge kommen aus den nachgeladenen Städten", async ({ page }) => {
    await page.goto("/");
    await ansicht(page, "Einstellungen");

    const feld = page.getByRole("combobox", { name: "Stadt" });
    // Die Seite trägt nur die Standardstadt; der Rest kommt von /api/cities.
    // „Köln" steht nicht im ersten HTML – ein Vorschlag dazu beweist also,
    // dass die Liste nachgeladen wurde.
    await feld.fill("Köln");
    await expect(page.getByTestId("offline-vorschlag-koeln")).toBeVisible({ timeout: 15_000 });
  });

  test("die Vorschläge beginnen am Wortanfang und bleiben wenige (ToDo 2e.14)", async ({
    page,
  }) => {
    await page.goto("/");
    await ansicht(page, "Einstellungen");

    const feld = page.getByRole("combobox", { name: "Stadt" });
    await feld.fill("Mo");
    // Auf die Vorschlagsliste eingegrenzt: Die Auswahlzeilen für Sprache und
    // Karten-App sind echte `<select>` und bringen eigene Optionen mit.
    const vorschlaege = page.getByRole("listbox", { name: "Vorschläge" }).getByRole("option");
    await expect(vorschlaege.first()).toBeVisible({ timeout: 15_000 });
    // Höchstens acht, und der erste beginnt mit der Eingabe.
    await expect.poll(() => vorschlaege.count()).toBeLessThanOrEqual(8);
    await expect(vorschlaege.first()).toHaveText(/^Mo/u);
  });
});
