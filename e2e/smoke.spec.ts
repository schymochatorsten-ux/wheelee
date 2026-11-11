import { expect, test } from "@playwright/test";
import { ansicht } from "./ansicht";

/**
 * Smoke-Test: Läuft die App im echten Browser?
 *
 * Bewusst flach gehalten. Er prüft die Wege, die jede:r beim Öffnen nimmt,
 * und nichts darüber hinaus – ein Smoke-Test, der bei jeder Textänderung
 * umfällt, wird abgeschaltet statt repariert.
 */

/** Köln, nahe der Domplatte – dort stehen genug Parkplätze für den Test. */
const KOELN = { latitude: 50.938, longitude: 6.9551 };

/**
 * Die Seite öffnen und warten, bis die **standortbezogene** Liste da ist.
 *
 * Bis der Standort im Browser angekommen ist, zeigt die Leiste die
 * vorgerenderten Standorte um die Stadtmitte; danach ersetzt sie sie durch die
 * nächsten beim Standort. Wer dazwischen auf einen Eintrag klickt, trifft eine
 * Zeile, die gleich darauf ersetzt wird – der Klick setzt dann kein Ziel.
 * Derselbe Wettlauf steckte hinter den Fehlschlägen in `bewertungen.spec.ts`
 * (dort seit 11.5 genauso gelöst), `sprache.spec.ts` (15.4) und dem Befund zu
 * 3.7, und er ist die gemessene Ursache der Ausfälle dieser Datei unter
 * Nebenlast (2026-11-10, Begründung in `Erledigt.md`).
 *
 * **Eine Stelle statt vier:** Vier Tests dieser Datei klicken Einträge der
 * Auswahl an. Der Wettlauf an jeder einzeln abgefangen hieße, beim nächsten
 * Mal eine zu vergessen.
 */
async function oeffnenMitStandort(page: import("@playwright/test").Page) {
  const nahe = page.waitForResponse((antwort) => /\/api\/spots\?lat=50/u.test(antwort.url()));
  await page.goto("/");
  await nahe;
}

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
    await ansicht(page, "Einstellungen");

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

    await ansicht(page, "Einstellungen");
    await expect(statuszeile).toHaveCount(0);

    // Zurück auf die Karte ist sie wieder da – ausgeblendet, nicht entfernt.
    await ansicht(page, "Karte");
    await expect(statuszeile).toBeVisible();
  });

  test("Detailansicht öffnet aus der Leiste und schließt mit Escape", async ({ page, context }) => {
    await context.grantPermissions(["geolocation"]);
    await context.setGeolocation(KOELN);
    await oeffnenMitStandort(page);

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
    await oeffnenMitStandort(page);

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
    await oeffnenMitStandort(page);

    await expect(page.getByText("Nächster Behindertenparkplatz")).toBeVisible();

    // Zwei Linien: weiße Unterlage und rot gestrichelt darüber.
    const red = page.locator('.leaflet-overlay-pane path[stroke="#dc2626"]');
    await expect(red).toHaveCount(1);
    await expect(red).toHaveAttribute("stroke-dasharray", "8 7");
  });

  test("ein Eintrag der Auswahl bringt den Parkplatz auf die Karte", async ({ page, context }) => {
    await context.grantPermissions(["geolocation"]);
    await context.setGeolocation(KOELN);
    await oeffnenMitStandort(page);

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
    await oeffnenMitStandort(page);

    await page.getByRole("button", { name: /Weitere in der Nähe/ }).click();

    /*
     * ToDo 6.21: Vorher deckte die Liste die Karte zu, und darunter lagen
     * genau die Parkplätze, über die sie Auskunft gab. Geprüft wird deshalb
     * das Ergebnis und nicht eine Höhenangabe: Bleibt ein brauchbarer
     * Kartenstreifen, und stehen dort auch Marker drin?
     *
     * **Alles in einem wiederholten Block, nicht nach festem Warten**
     * (gemessen am 2026-11-10, Begründung in `Erledigt.md`). Hier standen
     * 1,5 s Wartezeit und danach eine einzige Messung. Unter Nebenlast kam
     * entweder die Auswahl zu spät (`messung` war `null`) oder die Karte hatte
     * ihren Ausschnitt noch nicht eingepasst. Die Wartezeit durch Prüfungen auf
     * die Auswahl zu ersetzen machte es **schlechter**: Dann war die Messung
     * früher dran als Leaflet, und `.leaflet-container` fehlte. Drei Dinge
     * müssen zugleich stehen – Karte, Leiste und die nachgeladenen Marker –,
     * und das ist genau der Fall für einen Block, der bis zum Ergebnis
     * wiederholt wird.
     */
    await expect(async () => {
      const messung = await page.evaluate(() => {
        const map = document.querySelector(".leaflet-container");
        const list = document.querySelector("#parkplatz-auswahl");
        const panel = document.querySelector("#parkplatz-leiste");
        if (!map || !list || !panel) return null;

        const frame = map.getBoundingClientRect();
        const bar = panel.getBoundingClientRect();

        return {
          share: bar.height / frame.height,
          freeStrip: frame.bottom - bar.bottom,
          visible: [...document.querySelectorAll(".leaflet-marker-icon")].filter((marker) => {
            const box = marker.getBoundingClientRect();
            return box.top >= bar.bottom && box.bottom <= frame.bottom;
          }).length,
        };
      });

      expect(messung).not.toBeNull();
      // Die Leiste darf nicht mehr als zwei Drittel der Karte einnehmen …
      expect(messung!.share).toBeLessThan(0.67);
      // … und im Rest müssen Parkplätze zu sehen sein, sonst nützt er nichts.
      expect(messung!.freeStrip).toBeGreaterThan(150);
      // Die Marker kommen aus `/api/spots` und brauchen bei größerem Bestand
      // etwas länger.
      expect(messung!.visible).toBeGreaterThan(2);
    }).toPass({ timeout: 20_000 });
  });

  test("beide Enden der Luftlinie bleiben im Bild", async ({ page, context }) => {
    await context.grantPermissions(["geolocation"]);
    await context.setGeolocation(KOELN);
    await oeffnenMitStandort(page);

    await page.getByRole("button", { name: /Weitere in der Nähe/ }).click();
    await page.locator("#parkplatz-auswahl li").last().locator("button").click();

    /*
     * ToDo 6.22: Vorher sprang die Karte allein auf den Parkplatz, und die
     * Luftlinie lief ohne Erklärung aus dem Bild. Geprüft wird deshalb nicht
     * die Zoomstufe, sondern das, worauf es ankommt: Liegen beide Enden im
     * sichtbaren Ausschnitt?
     *
     * **Bis zum Ergebnis neu gemessen, nicht nach festem Warten** – wie in der
     * Markerzählung oben. Hier stand `waitForTimeout(1500)` für die Fahrt der
     * Karte (`flyToBounds`); unter Nebenlast ist sie danach noch nicht zu Ende,
     * die Linie steht dann noch heraus und der Test fiel aus. Gemessen am
     * 2026-11-10: 100 von 100 Durchläufen grün ohne Last, 98 von 100 mit – die
     * beiden Fehlschläge genau hier. Begründung in `Erledigt.md`.
     */
    await expect
      .poll(
        () =>
          page.evaluate(() => {
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
          }),
        { timeout: 10_000 },
      )
      .toBe(true);
  });

  test("Einstellungen merken die Karten-App", async ({ page }) => {
    await page.goto("/");
    await ansicht(page, "Einstellungen");

    // Seit 9.31 eine Auswahlzeile statt einer Liste von Radioknöpfen.
    const auswahl = page.getByRole("combobox", { name: "Karten-App wählen" });
    await auswahl.selectOption("waze");
    await page.reload();

    await ansicht(page, "Einstellungen");
    await expect(page.getByRole("combobox", { name: "Karten-App wählen" })).toHaveValue("waze");
  });
});
