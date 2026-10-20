import fs from "node:fs";
import path from "node:path";
import { expect, test } from "@playwright/test";

/**
 * „Von zwei Quellen bestätigt" in der Detailansicht (ToDos 3.1, 3.7).
 *
 * **Diese Angabe ist die, auf die sich jemand verlässt, bevor er losfährt** –
 * und genau deshalb wird sie hier geprüft. Sie steht nur dort, wo zwei
 * unabhängige Quellen denselben Stellplatz kennen; ihr Fehlen ist **keine**
 * Aussage, weil erst 23 von 209 Städten überhaupt eine zweite Quelle haben.
 *
 * Der Test arbeitet gegen den echten Bestand und nimmt sich die Koordinate aus
 * `data/_bestaetigt.json` **über die API**, statt eine ID festzuschreiben: Die
 * Datei entsteht neu bei jedem `npm run validate`, und ein Test auf eine feste
 * ID wäre beim nächsten Lauf rot, ohne dass etwas kaputt ist.
 */

/** Die Entwicklerleiste von Next fängt sonst Klicks ab. */
async function devLeisteDurchklickbarMachen(page: import("@playwright/test").Page) {
  await page.addStyleTag({ content: "nextjs-portal { pointer-events: none; }" });
}

/**
 * Die ID eines bestätigten Standorts aus dem gespeicherten Abgleich.
 *
 * Gelesen wird die Datei selbst und nicht eine festgeschriebene ID: Welche
 * Standorte bestätigt sind, ändert sich mit jedem `npm run validate`.
 */
function einBestaetigterStandort(): string | null {
  const datei = path.join(process.cwd(), "data", "_bestaetigt.json");
  if (!fs.existsSync(datei)) return null;

  const daten = JSON.parse(fs.readFileSync(datei, "utf8")) as {
    standorte?: Record<string, string>;
  };

  const treffer = Object.entries(daten.standorte ?? {}).find(
    ([, zustand]) => zustand === "bestaetigt",
  );
  return treffer?.[0] ?? null;
}

test.describe("Bestätigte Standorte", () => {
  test("die Detailansicht nennt einen bestätigten Standort als solchen", async ({
    page,
    context,
    request,
  }) => {
    /*
     * Gibt es keinen bestätigten Standort – etwa weil `npm run validate` mit
     * Netz noch nicht gelaufen ist –, überspringt sich der Test selbst, statt
     * rot zu werden: Dass niemand abgeglichen hat, ist kein Fehler der
     * Oberfläche. Dieselbe Linie wie beim Offline-Test.
     */
    const id = einBestaetigterStandort();
    test.skip(id === null, "Kein bestätigter Standort im Bestand – `validate` mit Netz nötig.");
    if (!id) return;

    const antwort = await request.get(`/api/spots?id=${encodeURIComponent(id)}`);
    expect(antwort.ok()).toBe(true);

    const { spot: beispiel } = (await antwort.json()) as {
      spot: {
        lat: number;
        lng: number;
        label: string;
        street: string | null;
        houseNumber: string | null;
        confirmation?: string;
      };
    };

    // Die API muss den Zustand mitliefern – ohne das kann die Oberfläche
    // nichts kennzeichnen, und der Test darunter wäre wertlos.
    expect(beispiel.confirmation).toBe("bestaetigt");

    // Dieselbe Regel wie `spotTitle`: Straße vor Bezeichnung.
    const titel =
      [beispiel.street, beispiel.houseNumber].filter(Boolean).join(" ").trim() || beispiel.label;

    await context.grantPermissions(["geolocation"]);
    // Genau auf den Standort: Dann ist er der nächstgelegene, und die Leiste
    // schlägt ihn vor.
    await context.setGeolocation({ latitude: beispiel.lat, longitude: beispiel.lng });

    await page.goto("/");
    await devLeisteDurchklickbarMachen(page);

    /*
     * **Erst warten, bis die Leiste wirklich diesen Standort vorschlägt.**
     * Beim Laden zeigt sie die servergerenderten Standorte um die Stadtmitte
     * (ToDo 5.4) und ersetzt sie erst, wenn die Standortfreigabe da ist. Ohne
     * dieses Warten klickt der Test auf den Vorschlag von vorher – und
     * scheitert an einem Standort, über den er nichts behauptet hat.
     *
     * Genau daran ist dieser Test beim ersten vollständigen Durchlauf
     * gescheitert, allein ausgeführt aber nicht: dieselbe Falle wie bei den
     * Bewertungen (8.1–8.7). **Ein Test, der nur allein grün ist, ist
     * schlimmer als keiner.**
     */
    await expect(page.locator("#parkplatz-leiste")).toContainText(titel);

    await page.getByRole("button", { name: "Details" }).first().click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    // Erst die Gegenprobe, dass es der gemeinte Standort ist …
    await expect(dialog.getByRole("heading", { level: 2 })).toHaveText(titel);
    // … dann die Angabe, um die es geht.
    await expect(dialog.getByText(/Von zwei Quellen bestätigt/u)).toBeVisible();
  });

  test("bei einem nicht abgeglichenen Standort steht dort nichts", async ({ page, context }) => {
    /*
     * **Der wichtigere der beiden Tests.** Köln ist nicht abgeglichen, und
     * dort darf weder „bestätigt" noch „nicht bestätigt" stehen: Das Fehlen
     * einer zweiten Quelle ist keine Aussage über den Stellplatz. Stünde hier
     * eine Warnung, wäre sie eine Behauptung über Daten, die niemand
     * angesehen hat – und sie träfe 186 von 209 Städten.
     */
    await context.grantPermissions(["geolocation"]);
    await context.setGeolocation({ latitude: 50.938, longitude: 6.9551 });

    await page.goto("/");
    await devLeisteDurchklickbarMachen(page);
    await page.getByRole("button", { name: "Details" }).first().click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.getByText(/Von zwei Quellen bestätigt/u)).toHaveCount(0);
    await expect(dialog.getByText(/nicht bestätigt/u)).toHaveCount(0);
  });
});
