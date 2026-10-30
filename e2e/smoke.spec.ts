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

  /**
   * Der Reiter „Liste" ist ausgeblendet (2026-10-10), die Ansicht selbst aber
   * erhalten. Diese Tests gehen deshalb über die Navigationsleiste – also über
   * den Weg, den jetzt tatsächlich jede:r nimmt.
   */
  test("Haftungshinweis steht in den Einstellungen", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("tab", { name: "Einstellungen" }).click();

    // Er hing vorher nur in der Listenansicht und war mit ihr verschwunden.
    await expect(page.getByRole("heading", { name: "Bitte vor der Fahrt lesen" })).toBeVisible();
  });

  test("Kopfzeile schweigt in den Einstellungen", async ({ page }) => {
    await page.goto("/");

    /*
     * Geprüft wird die Statuszeile als Ganzes, nicht ein bestimmter Satz
     * darin: Sie zeigt je nach Standortzustand Verschiedenes – die
     * Bestandszahlen („17.864 Parkplätze in 209 Städten"), den nächsten
     * Parkplatz oder eine Standortmeldung. Auf den Text zu prüfen hieße, den
     * Test an den Zufall zu hängen, ob der Browser Standortzugriff gewährt.
     */
    const statuszeile = page.locator('header p[aria-live="polite"]');
    await expect(statuszeile).toBeVisible();

    await page.getByRole("tab", { name: "Einstellungen" }).click();
    await expect(statuszeile).toHaveCount(0);

    // Zurück auf die Karte ist sie wieder da – ausgeblendet, nicht entfernt.
    await page.getByRole("tab", { name: "Karte" }).click();
    await expect(statuszeile).toBeVisible();
  });

  test("Detailansicht öffnet aus der Leiste und schließt mit Escape", async ({ page, context }) => {
    await context.grantPermissions(["geolocation"]);
    await context.setGeolocation(KOELN);
    await page.goto("/");

    await page.getByRole("button", { name: "Details" }).click();

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
    await page.getByRole("button", { name: /Weitere in der Nähe/ }).click();
    const options = page.locator("#parkplatz-auswahl li");
    await expect(options.first()).toBeVisible();

    // Eine Alternative wählen setzt das Ziel.
    await options.nth(1).locator("button").click();
    await expect(page.getByText("Gewähltes Ziel")).toBeVisible();

    // Schließen gibt die Karte frei, lässt sich aber zurückholen (6.15).
    await page.getByRole("button", { name: /Vorschlag schließen/ }).click();
    await expect(page.getByText("Gewähltes Ziel")).toBeHidden();
    await expect(page.getByRole("button", { name: /^\d+(,\d+)?\s*(m|km)$/ })).toBeVisible();
  });

  test("ausgewählter Parkplatz bekommt eine rote Luftlinie", async ({ page, context }) => {
    await context.grantPermissions(["geolocation"]);
    await context.setGeolocation(KOELN);
    await page.goto("/");

    await expect(page.getByText("Nächster Behindertenparkplatz")).toBeVisible();

    // Zwei Linien: weiße Unterlage und rot gestrichelt darüber.
    const red = page.locator('.leaflet-overlay-pane path[stroke="#dc2626"]');
    await expect(red).toHaveCount(1);
    await expect(red).toHaveAttribute("stroke-dasharray", "8 7");
  });

  test("ein Eintrag der Auswahl bringt den Parkplatz auf die Karte", async ({ page, context }) => {
    await context.grantPermissions(["geolocation"]);
    await context.setGeolocation(KOELN);
    await page.goto("/");

    await page.getByRole("button", { name: /Weitere in der Nähe/ }).click();

    const red = page.locator('.leaflet-overlay-pane path[stroke="#dc2626"]');
    const before = await red.getAttribute("d");

    // Eine andere Wahl muss die Luftlinie umhängen – sonst wäre die Auswahl
    // eine Entscheidung ohne sichtbare Folge.
    await page.locator("#parkplatz-auswahl li").nth(2).locator("button").click();
    await expect(red).not.toHaveAttribute("d", before ?? "");
  });

  test("die aufgeklappte Auswahl lässt Karte übrig und zeigt ihre Parkplätze", async ({
    page,
    context,
  }) => {
    await context.grantPermissions(["geolocation"]);
    await context.setGeolocation(KOELN);
    await page.goto("/");

    await page.getByRole("button", { name: /Weitere in der Nähe/ }).click();
    await page.waitForTimeout(1500);

    /*
     * ToDo 6.21: Vorher deckte die Liste die Karte zu, und darunter lagen
     * genau die Parkplätze, über die sie Auskunft gab. Geprüft wird deshalb
     * das Ergebnis und nicht eine Höhenangabe: Bleibt ein brauchbarer
     * Kartenstreifen, und stehen dort auch Marker drin?
     */
    const messung = await page.evaluate(() => {
      const map = document.querySelector(".leaflet-container");
      const list = document.querySelector("#parkplatz-auswahl");
      if (!map || !list) return null;

      const panel = document.querySelector("#parkplatz-leiste");
      if (!panel) return null;

      const frame = map.getBoundingClientRect();
      const bar = panel.getBoundingClientRect();
      const freeStrip = frame.bottom - bar.bottom;

      const visible = [...document.querySelectorAll(".leaflet-marker-icon")].filter((marker) => {
        const box = marker.getBoundingClientRect();
        return box.top >= bar.bottom && box.bottom <= frame.bottom;
      }).length;

      return { share: bar.height / frame.height, freeStrip, visible };
    });

    expect(messung).not.toBeNull();
    // Die Leiste darf nicht mehr als zwei Drittel der Karte einnehmen …
    expect(messung!.share).toBeLessThan(0.67);
    // … und im Rest müssen Parkplätze zu sehen sein, sonst nützt er nichts.
    expect(messung!.freeStrip).toBeGreaterThan(150);
    // Die Marker kommen aus `/api/spots` und brauchen bei größerem Bestand etwas
    // länger; eine feste Wartezeit allein machte den Test zeitabhängig. Deshalb
    // wird bis zum Ergebnis neu gezählt.
    await expect
      .poll(
        () =>
          page.evaluate(() => {
            const map = document.querySelector(".leaflet-container");
            const panel = document.querySelector("#parkplatz-leiste");
            if (!map || !panel) return 0;
            const frame = map.getBoundingClientRect();
            const bar = panel.getBoundingClientRect();
            return [...document.querySelectorAll(".leaflet-marker-icon")].filter((marker) => {
              const box = marker.getBoundingClientRect();
              return box.top >= bar.bottom && box.bottom <= frame.bottom;
            }).length;
          }),
        { timeout: 10_000 },
      )
      .toBeGreaterThan(2);
  });

  test("beide Enden der Luftlinie bleiben im Bild", async ({ page, context }) => {
    await context.grantPermissions(["geolocation"]);
    await context.setGeolocation(KOELN);
    await page.goto("/");

    await page.getByRole("button", { name: /Weitere in der Nähe/ }).click();
    await page.locator("#parkplatz-auswahl li").last().locator("button").click();

    // Die Karte fährt – erst danach messen.
    await page.waitForTimeout(1500);

    /*
     * ToDo 6.22: Vorher sprang die Karte allein auf den Parkplatz, und die
     * Luftlinie lief ohne Erklärung aus dem Bild. Geprüft wird deshalb nicht
     * die Zoomstufe, sondern das, worauf es ankommt: Liegen beide Enden im
     * sichtbaren Ausschnitt?
     */
    const sichtbar = await page.evaluate(() => {
      const path = document.querySelector('.leaflet-overlay-pane path[stroke="#dc2626"]');
      const map = document.querySelector(".leaflet-container");
      if (!path || !map) return null;

      const line = path.getBoundingClientRect();
      const frame = map.getBoundingClientRect();
      return (
        line.left >= frame.left &&
        line.right <= frame.right &&
        line.top >= frame.top &&
        line.bottom <= frame.bottom
      );
    });

    expect(sichtbar).toBe(true);
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
