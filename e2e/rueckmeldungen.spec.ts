import { expect, test } from "@playwright/test";

/**
 * Rückmeldungen und die Übersicht dahinter (ToDos 17.2–17.4).
 *
 * Zwei Dinge sichert dieser Test, und beide würden sonst still verschwinden:
 *
 * 1. **Die Zugangsprüfung der Übersicht.** Sie sitzt auf dem Server. Dass der
 *    Reiter ohne Anmeldung nicht erscheint, ist Bequemlichkeit – wer die
 *    Adresse kennt, ruft den Endpunkt direkt auf. Eine Zugangsprüfung, die
 *    niemand prüft, ist beim nächsten Umbau weg, und es fällt keinem auf,
 *    weil die App weiter funktioniert.
 * 2. **Die Zusage am E-Mail-Feld.** Die Adresse ist freiwillig, und wer sie
 *    angibt, bekommt eine Antwort. Das ist eine Aussage gegenüber
 *    Nutzer:innen, keine Gestaltungsfrage.
 */

test.describe("Übersicht der Rückmeldungen", () => {
  test("gibt ohne Anmeldung nichts preis – auch nicht die Anzahl", async ({ page, request }) => {
    await page.goto("/");

    // Kein Reiter für jemanden, der nicht angemeldet ist.
    await expect(page.getByRole("tab", { name: "Rückmeldungen" })).toHaveCount(0);

    /*
     * Und, was wirklich zählt: Der Endpunkt selbst antwortet nicht. Geprüft
     * werden alle drei Wege – lesen, ändern, löschen. Ein vergessener davon
     * wäre genau die Lücke, die niemand sucht.
     */
    const lesen = await request.get("/api/admin/feedback");
    expect(lesen.status()).toBe(401);
    // Die Antwort darf auch keine Zahlen durchsickern lassen.
    expect(await lesen.text()).not.toMatch(/\d+\s*(Meldung|entries|counts)/u);

    const aendern = await request.patch("/api/admin/feedback/1", {
      data: { status: "umgesetzt" },
    });
    expect(aendern.status()).toBe(401);

    const loeschen = await request.delete("/api/admin/feedback/1");
    expect(loeschen.status()).toBe(401);
  });
});

test.describe("Rückmeldung abschicken", () => {
  /** Das Formular aus den Einstellungen heraus öffnen. */
  async function formularOeffnen(page: import("@playwright/test").Page) {
    await page.goto("/");
    await page.getByRole("tab", { name: "Einstellungen" }).click();
    await page.getByRole("button", { name: /Fehler melden oder Vorschlag/u }).click();
    await expect(page.getByRole("dialog", { name: "Rückmeldung" })).toBeVisible();
  }

  test("bietet zwei Arten an und sagt, wozu die Adresse dient", async ({ page }) => {
    await formularOeffnen(page);
    const dialog = page.getByRole("dialog", { name: "Rückmeldung" });

    // Zwei Schaltflächen, kein Auswahlmenü – es sind genau zwei Möglichkeiten.
    await expect(dialog.getByRole("radio", { name: "Fehler melden" })).toBeVisible();
    await expect(dialog.getByRole("radio", { name: "Verbesserungsvorschlag" })).toBeVisible();

    // Die Adresse ist freiwillig, und das muss dastehen.
    await expect(dialog.getByLabel(/E-Mail-Adresse/u)).toBeVisible();
    await expect(dialog.getByText(/Nur mit Adresse können wir dir antworten/u)).toBeVisible();
    await expect(dialog.getByText(/Ohne Adresse hilft deine Meldung trotzdem/u)).toBeVisible();
  });

  test("schickt nichts ab, solange die Angaben nicht reichen", async ({ page }) => {
    await formularOeffnen(page);
    const dialog = page.getByRole("dialog", { name: "Rückmeldung" });

    // Es darf gar keine Anfrage entstehen – die Prüfung im Browser ist dafür da.
    let gesendet = false;
    page.on("request", (request) => {
      if (request.url().includes("/api/feedback")) gesendet = true;
    });

    await dialog.getByRole("radio", { name: "Fehler melden" }).click();
    await dialog.getByLabel(/Was stimmt nicht/u).fill("kaputt");
    await dialog.getByRole("button", { name: "Absenden" }).click();

    await expect(dialog.getByRole("alert")).toBeVisible();
    expect(gesendet).toBe(false);
  });

  test("weist eine falsch geschriebene Adresse zurück", async ({ page }) => {
    await formularOeffnen(page);
    const dialog = page.getByRole("dialog", { name: "Rückmeldung" });

    await dialog.getByRole("radio", { name: "Verbesserungsvorschlag" }).click();
    await dialog.getByLabel(/Dein Vorschlag/u).fill("Die Umkreiswahl hätte gern eine Stufe 2 km.");
    await dialog.getByLabel(/E-Mail-Adresse/u).fill("torsten@example");
    await dialog.getByRole("button", { name: "Absenden" }).click();

    // Eine Adresse mit Tippfehler ist schlechter als keine: Sie verspricht
    // eine Antwort, die nirgends ankommt.
    await expect(dialog.getByText(/sieht nicht richtig aus/u)).toBeVisible();
  });

  test("bestätigt in der App und sagt, dass ohne Adresse nichts zurückkommt", async ({ page }) => {
    await formularOeffnen(page);
    const dialog = page.getByRole("dialog", { name: "Rückmeldung" });

    await dialog.getByRole("radio", { name: "Verbesserungsvorschlag" }).click();
    await dialog
      .getByLabel(/Dein Vorschlag/u)
      .fill("Prüflauf der E2E-Tests – diese Meldung darf gelöscht werden.");
    await dialog.getByRole("button", { name: "Absenden" }).click();

    /*
     * Der eigentliche Fortschritt gegenüber dem alten `mailto:`-Weg: Es steht
     * **in der App**, dass die Meldung angekommen ist. Vorher endete der Weg
     * im Mailprogramm – und auf einem Telefon ohne eingerichtetes Mailkonto
     * passierte gar nichts, ohne dass es jemand merkte.
     */
    await expect(dialog.getByText("Danke – die Meldung ist angekommen.")).toBeVisible();
    await expect(dialog.getByText(/Du hast keine Adresse angegeben/u)).toBeVisible();
  });
});
