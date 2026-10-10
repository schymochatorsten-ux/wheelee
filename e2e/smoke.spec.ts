import { expect, test } from "@playwright/test";

/**
 * Smoke-Test: Läuft die App im echten Browser?
 *
 * Bewusst flach gehalten. Er prüft die Wege, die jede:r beim Öffnen nimmt,
 * und nichts darüber hinaus – ein Smoke-Test, der bei jeder Textänderung
 * umfällt, wird abgeschaltet statt repariert.
 */

/** Köln, nahe der Domplatte – dort stehen genug Parkplätze für den Test. */
const KOELN = { latitude: 50.938, longitude: 6.9551 };

test.describe("wheelee", () => {
  test("Karte lädt mit Attribution und Markern", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { name: /Behindertenparkplätze/ })).toBeVisible();

    // Die ODbL verlangt die sichtbare Namensnennung – sie ist keine Kosmetik.
    await expect(page.locator(".leaflet-control-attribution")).toContainText("OpenStreetMap");

    // Marker oder Cluster müssen erscheinen, sonst ist die Karte leer.
    await expect(page.locator(".leaflet-marker-icon").first()).toBeVisible();
  });

  test("Liste zeigt Parkplätze und den Haftungshinweis", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("tab", { name: "Liste" }).click();

    await expect(page.getByRole("heading", { name: "Bitte vor der Fahrt lesen" })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Parkplätze|Nächste/ }).first()).toBeVisible();

    // Mindestens ein Eintrag mit Entfernungsangabe.
    await expect(page.getByText(/\d+\s*(m|km)\b/).first()).toBeVisible();
  });

  test("Detailansicht öffnet aus der Liste und schließt mit Escape", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("tab", { name: "Liste" }).click();

    const first = page.locator("li button").first();
    await first.click();

    const sheet = page.getByRole("dialog");
    await expect(sheet).toBeVisible();
    await expect(sheet.getByRole("link", { name: /öffnen/ })).toBeVisible();

    // Der Fokus muss im Sheet landen, sonst hängt die Tastaturbedienung.
    await expect(sheet.getByRole("button", { name: "Details schließen" })).toBeFocused();

    await page.keyboard.press("Escape");
    await expect(sheet).toBeHidden();
  });

  test("mit Standort erscheint die Navigationsleiste und lässt sich schließen", async ({
    page,
    context,
  }) => {
    await context.grantPermissions(["geolocation"]);
    await context.setGeolocation(KOELN);
    await page.goto("/");

    const bar = page.getByText("Nächster Behindertenparkplatz");
    await expect(bar).toBeVisible();

    // Auswahl aufklappen (ToDo 6.16).
    await page.getByRole("button", { name: /Weitere Parkplätze in der Nähe/ }).click();
    const options = page.locator("#parkplatz-auswahl li");
    await expect(options.first()).toBeVisible();

    // Eine Alternative wählen setzt das Ziel.
    await options.nth(1).locator("button").click();
    await expect(page.getByText("Gewähltes Ziel")).toBeVisible();

    // Schließen gibt die Karte frei, holt sich aber zurückholen lassen (6.15).
    await page.getByRole("button", { name: /Vorschlag schließen/ }).click();
    await expect(page.getByText("Gewähltes Ziel")).toBeHidden();
    await expect(page.getByRole("button", { name: /Nächster Parkplatz:/ })).toBeVisible();
  });

  test("Einstellungen merken die Karten-App", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("tab", { name: "Einstellungen" }).click();

    await page.getByRole("radio", { name: "Waze" }).check();
    await page.reload();

    await page.getByRole("tab", { name: "Einstellungen" }).click();
    await expect(page.getByRole("radio", { name: "Waze" })).toBeChecked();
  });
});
