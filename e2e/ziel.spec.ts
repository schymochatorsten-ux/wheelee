import { expect, test } from "@playwright/test";

/**
 * Zielsuche (ToDo 6.12).
 *
 * Die Ortssuche selbst fragt Nominatim – einen fremden, kostenlos
 * betriebenen Dienst. Ihn bei jedem Testlauf zu befragen wäre unhöflich und
 * machte den Test von seiner Verfügbarkeit abhängig. Deshalb wird
 * `/api/geocode` hier **abgefangen**: Geprüft wird, was die App mit der
 * Antwort macht, nicht ob Nominatim antwortet.
 */

/** Köln, nahe der Domplatte. */
const KOELN = { latitude: 50.938, longitude: 6.9551 };

/** Ein Ziel rund 2,5 km entfernt, damit sich die Parkplatzliste ändert. */
const ZIEL = { label: "Universitätsklinikum Köln", detail: "Lindenthal", lat: 50.925, lng: 6.918 };

test.describe("Zielsuche", () => {
  test.beforeEach(async ({ context }) => {
    await context.grantPermissions(["geolocation"]);
    await context.setGeolocation(KOELN);
    await context.route("**/api/geocode**", (route) => route.fulfill({ json: { places: [ZIEL] } }));
  });

  test("Ziel wählen verschiebt den Bezugspunkt und markiert den Zielpunkt", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByText("Nächster Behindertenparkplatz")).toBeVisible();

    await page.getByRole("button", { name: /Wohin willst du/ }).click();
    await page.getByRole("combobox").fill("Uniklinik");
    await page.getByRole("option", { name: new RegExp(ZIEL.label) }).click();

    // Die Leiste rechnet jetzt ab dem Ziel, nicht ab dem eigenen Standort.
    await expect(page.getByText(`Parkplatz bei ${ZIEL.label}`)).toBeVisible();

    // Der Zielpunkt muss eigens markiert sein, sonst ist er von einem
    // Parkplatz nicht zu unterscheiden.
    await expect(page.locator(".wheelee-destination")).toHaveCount(1);

    // Die Attribution darf von der Leiste nicht verdeckt werden (ODbL).
    await expect(page.locator(".leaflet-control-attribution")).toBeVisible();
  });

  test("Umkreis begrenzt die Auswahl", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /Wohin willst du/ }).click();
    await page.getByRole("combobox").fill("Uniklinik");
    await page.getByRole("option", { name: new RegExp(ZIEL.label) }).click();

    const umkreis = page.getByRole("radiogroup", { name: "Umkreis" });
    await expect(umkreis).toBeVisible();

    const zahl = (text: string | null) => Number(/(\d+) im Umkreis/.exec(text ?? "")?.[1] ?? 0);

    await umkreis.getByRole("radio", { name: "1 km" }).click();
    const weit = await page.getByText(/im Umkreis/).textContent();

    await umkreis.getByRole("radio", { name: "300 m" }).click();
    const eng = await page.getByText(/im Umkreis/).textContent();

    // Ein engerer Umkreis darf nie mehr Treffer liefern als ein weiter.
    expect(zahl(eng)).toBeLessThanOrEqual(zahl(weit));
  });

  test("außerhalb des Umkreises wird als solches ausgewiesen", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /Wohin willst du/ }).click();
    await page.getByRole("combobox").fill("Uniklinik");
    await page.getByRole("option", { name: new RegExp(ZIEL.label) }).click();

    await page
      .getByRole("radiogroup", { name: "Umkreis" })
      .getByRole("radio", { name: "300 m" })
      .click();
    await page.getByRole("button", { name: /Weitere in der Nähe/ }).click();

    /*
     * Der beobachtete Fall: Am Ziel liegt wenig im Umkreis, und ohne
     * Alternativen stand man mit einem einzigen Vorschlag da. Jetzt kommen
     * weitere dahinter – aber getrennt ausgewiesen, damit der Umkreis seine
     * Aussage behält.
     */
    await expect(page.getByText("Darüber hinaus")).toBeVisible();
  });

  /*
   * Die Nähe-Sortierung geschieht auf dem Server (`orderByProximity`), und
   * dessen Unit-Tests prüfen sie. Hier wird die Übergabe geprüft: Kommt der
   * Bezugspunkt überhaupt in der Anfrage an? Ohne ihn fällt der Server
   * stillschweigend auf Nominatims Reihenfolge zurück – es gäbe keinen
   * Fehler, nur wieder eine Liste aus ganz Deutschland.
   */
  test("schickt den Standort als Bezugspunkt mit, gerundet", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /Wohin willst du/ }).click();

    const anfrage = page.waitForRequest((request) => request.url().includes("/api/geocode"));
    await page.getByRole("combobox").fill("Uniklinik");

    const params = new URL((await anfrage).url()).searchParams;
    expect(Number(params.get("lat"))).toBeCloseTo(KOELN.latitude, 1);
    expect(Number(params.get("lng"))).toBeCloseTo(KOELN.longitude, 1);

    // Gerundet auf zwei Stellen: Der genaue Standort wird für die Sortierung
    // nicht gebraucht, also verlässt er das Gerät auch nicht.
    expect(params.get("lat")).not.toContain("50.938000");
    expect(Number(params.get("lat")) * 100).toBe(Math.round(Number(params.get("lat")) * 100));
  });

  test("nennt die Entfernung an jedem Vorschlag", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /Wohin willst du/ }).click();
    await page.getByRole("combobox").fill("Uniklinik");

    /*
     * Zwischen zehn gleichnamigen Straßen ist die Entfernung die Angabe, die
     * überhaupt erst entscheiden lässt. Das Ziel liegt rund 2,5 km entfernt,
     * also muss eine Kilometerangabe dastehen.
     */
    await expect(page.getByRole("option", { name: new RegExp(ZIEL.label) })).toContainText(/km/);
  });

  test("Eingabe löschen leert das Feld und lässt die Suche offen", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /Wohin willst du/ }).click();

    const feld = page.getByRole("combobox");
    await feld.fill("Uniklinik");
    await expect(page.getByRole("option", { name: new RegExp(ZIEL.label) })).toBeVisible();

    await page.getByRole("button", { name: "Eingabe löschen" }).click();

    // Leer, aber offen: Wer neu ansetzt, will nicht erst wieder aufklappen.
    await expect(feld).toHaveValue("");
    await expect(feld).toBeVisible();
    await expect(page.getByRole("option", { name: new RegExp(ZIEL.label) })).toHaveCount(0);
  });

  test("Enter sucht sofort, ohne auf die Tippause zu warten", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /Wohin willst du/ }).click();

    /*
     * Der Fall war vorher eine Sackgasse: vollständige Adresse getippt, Enter
     * gedrückt, bevor die 350 ms um waren – und die App tat nichts. Hier wird
     * deshalb mit `pressSequentially` getippt und sofort Enter gedrückt.
     */
    await page.getByRole("combobox").pressSequentially("Uniklinik");
    await page.getByRole("combobox").press("Enter");

    await expect(page.getByText(`Parkplatz bei ${ZIEL.label}`)).toBeVisible();
  });

  test("bei nicht erreichbarer Ortssuche steht ein zweiter Versuch bereit", async ({
    page,
    context,
  }) => {
    // Nominatim antwortet unter Last auch mal nicht. Vorher musste man einen
    // Buchstaben löschen und neu tippen, um es noch einmal zu versuchen.
    await context.route("**/api/geocode**", (route) =>
      route.fulfill({ json: { places: [], error: "Suche gerade nicht erreichbar." } }),
    );

    await page.goto("/");
    await page.getByRole("button", { name: /Wohin willst du/ }).click();
    await page.getByRole("combobox").fill("Uniklinik");

    await expect(page.getByText("Die Ortssuche ist gerade nicht erreichbar.")).toBeVisible();
    await expect(page.getByRole("button", { name: "Erneut" })).toBeVisible();
  });

  test("Ziel aufheben führt zurück zum eigenen Standort", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /Wohin willst du/ }).click();
    await page.getByRole("combobox").fill("Uniklinik");
    await page.getByRole("option", { name: new RegExp(ZIEL.label) }).click();
    await expect(page.getByText(`Parkplatz bei ${ZIEL.label}`)).toBeVisible();

    await page.getByRole("button", { name: "Ziel aufheben" }).click();

    await expect(page.getByText("Nächster Behindertenparkplatz")).toBeVisible();
    await expect(page.locator(".wheelee-destination")).toHaveCount(0);
  });
});
