import { expect, test } from "@playwright/test";

/**
 * Impressum und Datenschutzerklärung (ToDo 10.2).
 *
 * **Warum als Test:** Beide Seiten sind Pflicht, und das Merkmal dieser
 * Pflicht ist, dass ihre Verletzung **nichts kaputtmacht**. Die App läuft
 * ohne sie tadellos; auffallen würde es erst durch eine Abmahnung. Dasselbe
 * gilt für die Erreichbarkeit: Eine Seite, die es gibt, aber zu der kein Link
 * führt, erfüllt die Pflicht nicht („leicht erkennbar und unmittelbar
 * erreichbar").
 *
 * Die Betreiberangaben stehen in der Umgebung und sind im Testlauf **nicht**
 * gesetzt. Genau das wird hier mitgeprüft: Dann muss ein Hinweis dastehen und
 * kein erfundener Name.
 */

/**
 * Die Entwicklerleiste von Next.js aus dem Weg räumen.
 *
 * Sie sitzt unten links als schwebende Schaltfläche und **fängt den Klick auf
 * die Links in der Fußzeile ab** – genau dort, wo Impressum und
 * Datenschutzerklärung stehen. Im Produktionsbau gibt es sie nicht; für
 * Nutzer:innen ist der Link frei.
 *
 * Abgeschaltet wird sie nicht, nur auf `pointer-events: none` gesetzt. Der
 * Unterschied zählt: Erscheint einmal die **Fehleranzeige** von Next über
 * demselben Portal, bleibt sie sichtbar und landet im Screenshot eines
 * gescheiterten Tests. Sie ganz zu verstecken hieße, Fehler zu verstecken.
 */
async function devLeisteDurchklickbarMachen(page: import("@playwright/test").Page) {
  await page.addStyleTag({ content: "nextjs-portal { pointer-events: none; }" });
}

test.describe("Rechtstexte", () => {
  test("sind aus den Einstellungen erreichbar", async ({ page }) => {
    await page.goto("/");
    await devLeisteDurchklickbarMachen(page);
    await page.getByRole("tab", { name: "Einstellungen" }).click();

    const rechtliches = page.getByRole("navigation", { name: "Rechtliches" });
    await expect(rechtliches.getByRole("link", { name: "Impressum" })).toBeVisible();
    await expect(rechtliches.getByRole("link", { name: "Datenschutzerklärung" })).toBeVisible();

    await rechtliches.getByRole("link", { name: "Impressum" }).click();
    await expect(page.getByRole("heading", { name: "Impressum", level: 1 })).toBeVisible();
  });

  test("das Impressum nennt die Pflichtabschnitte", async ({ page }) => {
    await page.goto("/impressum");

    await expect(page.getByRole("heading", { name: /Angaben gemäß § 5 DDG/u })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Haftung für Inhalte/u })).toBeVisible();

    // Der Haftungshinweis ist bei dieser App kein Textbaustein: Wer vor einem
    // aufgehobenen Parkplatz steht, hat einen echten Schaden.
    await expect(page.getByText(/Vor Ort gilt die Beschilderung/u)).toBeVisible();
  });

  test("die Datenschutzerklärung nennt die drei Dinge, auf die es ankommt", async ({ page }) => {
    await page.goto("/datenschutz");

    // 1. Der Standort bleibt auf dem Gerät – die zentrale Zusage der App.
    await expect(page.getByText(/Dein Standort verlässt dein Gerät nicht/u)).toBeVisible();

    // 2. Die Kartenkacheln sind der einzige fremde Abruf. Eine
    //    Datenschutzerklärung, die ihn verschweigt, ist unvollständig – und
    //    genau das übersehen Generatoren.
    await expect(page.getByText(/tile\.openstreetmap\.org/u)).toBeVisible();

    // 3. Löschen und Auskunft gibt es in der App (seit 11.7); die Erklärung
    //    darf nicht mehr das Gegenteil behaupten und nennt, was ohne Konto bleibt.
    await expect(page.getByText(/Mit Konto geht beides in der App selbst/u)).toBeVisible();
    await expect(page.getByText(/nicht in der App selbst löschen/u)).toHaveCount(0);
  });

  test("erfinden keine Betreiberangaben, wenn keine hinterlegt sind", async ({ page }) => {
    /*
     * Der eigentliche Punkt dieses Tests. Die Versuchung wäre, Platzhalter
     * anzuzeigen – „Max Mustermann, Musterstraße 1". Das sähe nach einem
     * erfüllten Impressum aus und wäre keines, und es fiele niemandem auf,
     * am wenigsten dem Betreiber, der die Seite selten selbst aufruft.
     */
    for (const pfad of ["/impressum", "/datenschutz"]) {
      await page.goto(pfad);
      await expect(page.getByText("Diese Angaben fehlen noch").first()).toBeVisible();
      await expect(page.getByText(/Mustermann|Musterstraße/u)).toHaveCount(0);
    }
  });

  test("führen zurück zur Karte", async ({ page }) => {
    // Ohne Kopfzeile und ohne Reiter bliebe auf dem Telefon nur die
    // Zurück-Geste, und die kennt nicht jede:r.
    await page.goto("/datenschutz");
    await page.getByRole("link", { name: /Zurück zur Karte/u }).click();

    await expect(page.getByRole("heading", { name: "Behindertenparkplätze" })).toBeVisible();
  });

  test("verweisen aufeinander", async ({ page }) => {
    await page.goto("/impressum");
    await page.getByRole("link", { name: "Datenschutzerklärung" }).click();
    await expect(
      page.getByRole("heading", { name: "Datenschutzerklärung", level: 1 }),
    ).toBeVisible();

    await page.getByRole("link", { name: "Impressum" }).click();
    await expect(page.getByRole("heading", { name: "Impressum", level: 1 })).toBeVisible();
  });
});
