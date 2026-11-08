import { expect, test, type Locator } from "@playwright/test";

/**
 * Die Knopfzeile über der Karte (ToDo 9.30).
 *
 * **Warum ein E2E-Test und kein Blick:** Es geht um Positionen in Pixeln, und
 * die entstehen erst aus Umbruch, Breite und Inhalt zusammen. Genau dieser
 * Fehler – „Wohin willst du?" oben, Entfernung und Standortknopf eine Zeile
 * darunter – war im Quelltext nicht zu sehen, sondern nur im Bild.
 */

const KOELN = { latitude: 50.938, longitude: 6.9551 };

/** Die obere Kante eines Elements, gerundet. */
async function oben(element: Locator): Promise<number> {
  const box = await element.boundingBox();
  if (!box) throw new Error("Element hat keine Fläche");
  return Math.round(box.y);
}

test.describe("Knopfzeile über der Karte", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("zugeklappt stehen Entfernung und Standort neben der Zielsuche", async ({
    page,
    context,
  }) => {
    await context.grantPermissions(["geolocation"]);
    await context.setGeolocation(KOELN);
    await page.goto("/");
    await page.addStyleTag({ content: "nextjs-portal { pointer-events: none; }" });

    // Der Parkplatzvorschlag nimmt aufgeklappt die ganze Breite; weggeklickt
    // bleiben die zwei kleinen Knöpfe.
    const leiste = page.locator("#parkplatz-leiste");
    await expect(leiste).toBeVisible();
    await leiste.getByRole("button", { name: "Vorschlag schließen und Karte freigeben" }).click();
    await expect(leiste).toHaveCount(0);

    const suche = page.getByRole("button", { name: /Wohin willst du/u });
    const standort = page.getByRole("button", { name: "Karte auf meinen Standort zentrieren" });
    await expect(suche).toBeVisible();
    await expect(standort).toBeVisible();

    // Eine Zeile heißt: dieselbe obere Kante, bis auf wenige Pixel.
    expect(Math.abs((await oben(standort)) - (await oben(suche)))).toBeLessThanOrEqual(4);

    // Und der Standortknopf steht rechts von der Suche, nicht darunter.
    const sucheBox = (await suche.boundingBox())!;
    const standortBox = (await standort.boundingBox())!;
    expect(standortBox.x).toBeGreaterThan(sucheBox.x + sucheBox.width);
  });

  test("geöffnete Suche schiebt die beiden Knöpfe nach unten", async ({ page, context }) => {
    await context.grantPermissions(["geolocation"]);
    await context.setGeolocation(KOELN);
    await page.goto("/");
    await page.addStyleTag({ content: "nextjs-portal { pointer-events: none; }" });

    await page.locator("#parkplatz-leiste").getByRole("button", { name: "Vorschlag schließen und Karte freigeben" }).click();
    await page.getByRole("button", { name: /Wohin willst du/u }).click();

    const feld = page.getByRole("combobox");
    const standort = page.getByRole("button", { name: "Karte auf meinen Standort zentrieren" });
    await expect(feld).toBeVisible();

    // So gewünscht (Torsten, 2026-11-08): Beim Öffnen dürfen sie weichen.
    expect(await oben(standort)).toBeGreaterThan(await oben(feld));
  });
});
