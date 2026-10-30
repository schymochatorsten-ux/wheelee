import { expect, test } from "@playwright/test";

/** Städteliste nachgeladen statt im HTML (ToDo 19.9). */

test.describe("Städteliste", () => {
  test("die Schnittstelle liefert alle Städte mit Quelle und Zahlen", async ({ request }) => {
    const antwort = await request.get("/api/cities");
    expect(antwort.status()).toBe(200);
    const { cities } = await antwort.json();
    expect(cities.length).toBeGreaterThan(100);
    for (const city of cities.slice(0, 20)) {
      expect(city.slug).toBeTruthy();
      expect(city.attribution).toBeTruthy();
      expect(city.spotCount).toBeGreaterThan(0);
    }
  });

  test("die Startseite trägt die Liste nicht mehr im HTML", async ({ request }) => {
    const html = await (await request.get("/")).text();
    // Die Standardstadt steht darin, sonst ist die Liste nicht im Dokument.
    expect(html.length).toBeLessThan(150_000);
    expect(html).not.toContain('"attribution":"OpenStreetMap-Mitwirkende');
  });

  test("die Auswahl für den Vorab-Download füllt sich nach dem Laden", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("tab", { name: "Einstellungen" }).click();
    // Die Seite trägt nur die Standardstadt; der Rest kommt von /api/cities.
    await expect.poll(() => page.locator("select option").count(), { timeout: 15_000 }).toBeGreaterThan(100);
  });
});
