import { expect, test } from "@playwright/test";

/**
 * Bewertungen (ToDos 8.1–8.7, Regel festgelegt 2026-10-19).
 *
 * **Die Regel:** Sehen darf jede:r, bewerten nur mit Konto – in beide
 * Richtungen –, höchstens einmal je Parkplatz.
 *
 * Geprüft wird hier vor allem die **Grenze**: Dass der Knopf ohne Konto
 * abgeschaltet aussieht, ist Höflichkeit; dass der Endpunkt ohne Konto
 * ablehnt, ist der Schutz. Eine Zugangsprüfung, die niemand prüft, ist beim
 * nächsten Umbau still verschwunden – dieselbe Lehre wie bei der Übersicht
 * der Rückmeldungen.
 */

/** Köln, nahe der Domplatte – dort liegen genug Parkplätze. */
const KOELN = { latitude: 50.938, longitude: 6.9551 };

/** Die Entwicklerleiste von Next fängt sonst Klicks ab; im Produktionsbau gibt es sie nicht. */
async function devLeisteDurchklickbarMachen(page: import("@playwright/test").Page) {
  await page.addStyleTag({ content: "nextjs-portal { pointer-events: none; }" });
}

/**
 * Den Zählerstand aus der Beschriftung lesen.
 *
 * **Warum relativ geprüft wird und nicht auf feste Zahlen:** Alle Testarbeiter
 * teilen sich einen Entwicklungsserver und damit **eine** Datenbank, und sie
 * öffnen alle denselben erstbesten Parkplatz. Auf „1 Stimme" zu prüfen hieße
 * anzunehmen, dass sonst niemand gleichzeitig bewertet – parallel ausgeführt
 * schlägt das fehl, einzeln nicht. Ein Test, der nur allein grün ist, ist
 * schlimmer als keiner: Er macht die Testsuite unzuverlässig, und irgendwann
 * sieht niemand mehr hin.
 *
 * Geprüft wird deshalb die **Änderung**, und die ist das Verhalten, um das es
 * geht: Eine Stimme kommt dazu, beim Umdrehen wandert sie herüber, beim
 * Zurücknehmen verschwindet sie.
 */
async function stimmen(button: import("@playwright/test").Locator): Promise<number> {
  const name = (await button.getAttribute("aria-label")) ?? "";
  return Number(/(\d+) Stimmen/u.exec(name)?.[1] ?? "0");
}

/** Die Detailansicht des vorgeschlagenen Parkplatzes öffnen. */
async function detailsOeffnen(page: import("@playwright/test").Page) {
  await page.goto("/");
  await devLeisteDurchklickbarMachen(page);
  await page.getByRole("button", { name: "Details" }).first().click();
  await expect(page.getByRole("dialog")).toBeVisible();
}

/**
 * **Ein Konto für die ganze Datei, und das ist eine Lehre aus einem Fehlschlag**
 * (2026-10-21).
 *
 * Vorher legte jeder der beiden Tests sein eigenes Konto über die Oberfläche
 * an. Die Registrierung ist auf fünf Versuche je Stunde und Herkunft gedrosselt
 * (`LIMITS.register`) – beim dritten vollständigen Durchlauf innerhalb einer
 * Stunde scheiterte sie, und **was man sah, war ein abgeschalteter
 * Bewertungsknopf**: Das liest sich wie „die Anmeldepflicht ist kaputt" und ist
 * das Gegenteil. Die Grenze heraufzusetzen käme nicht in Frage – ein echter
 * Schutz für die Bequemlichkeit beim Testen.
 *
 * Angelegt wird das Konto deshalb **einmal über die Schnittstelle**; die Tests
 * melden sich damit über die Oberfläche an. Die Anmeldung ist weiter
 * gefasst (zehn Versuche je zehn Minuten) und für einen Testlauf kein Thema.
 */
const KONTO = {
  email: `bewertung-${Date.now()}@example.de`,
  password: "ein gutes langes Passwort",
};

/** Über die Oberfläche anmelden – wie es ein Mensch täte. */
async function anmelden(page: import("@playwright/test").Page) {
  await page.getByRole("tab", { name: "Einstellungen" }).click();
  await page.getByRole("radio", { name: "Anmelden" }).click();
  await page.getByLabel("E-Mail-Adresse").fill(KONTO.email);
  await page.getByLabel("Passwort").fill(KONTO.password);
  await page.getByRole("button", { name: "Anmelden" }).click();
  await page.getByRole("tab", { name: "Karte" }).click();
}

test.describe("Bewertungen", () => {
  test.beforeAll(async ({ playwright, baseURL }) => {
    const api = await playwright.request.newContext({ baseURL });
    const angelegt = await api.post("/api/auth/register", { data: KONTO });
    expect(angelegt.status()).toBe(200);
    await api.dispose();
  });

  test.beforeEach(async ({ context }) => {
    await context.grantPermissions(["geolocation"]);
    await context.setGeolocation(KOELN);
  });

  test("sind ohne Konto sichtbar, aber nicht bedienbar", async ({ page }) => {
    await detailsOeffnen(page);

    const bewertung = page.getByRole("region", { name: /Gibt es diesen Parkplatz noch/u });
    await expect(bewertung).toBeVisible();

    /*
     * Beide Knöpfe stehen da und sind abgeschaltet. Sie wegzulassen wäre die
     * naheliegende Lösung und die schlechtere: Eine App, in der die
     * Möglichkeit gar nicht erscheint, wirkt kaputt – man sucht sie.
     */
    await expect(bewertung.getByRole("button", { name: /^Existiert,/u })).toBeDisabled();
    await expect(bewertung.getByRole("button", { name: /^Existiert nicht mehr,/u })).toBeDisabled();

    // Und der Grund steht daneben, nicht irgendwo.
    await expect(bewertung.getByText(/Zum Bewerten brauchst du ein Konto/u)).toBeVisible();
  });

  test("der Endpunkt lehnt ohne Konto ab – darauf kommt es an", async ({ request }) => {
    /*
     * Der abgeschaltete Knopf ist eine Verabredung. Wer die Anfrage selbst
     * schickt, umgeht ihn. Deshalb sitzt die Prüfung auf dem Server, und
     * deshalb wird sie hier geprüft.
     */
    const antwort = await request.post("/api/spots/koeln-irgendwas/ratings", {
      data: { vote: "exists" },
    });

    expect(antwort.status()).toBe(401);
  });

  test("die Zählerstände sind auch ohne Konto abrufbar", async ({ request }) => {
    // Sehen darf jede:r – das ist die andere Hälfte der Regel, und sie darf
    // nicht versehentlich mit der Anmeldepflicht mitgesperrt werden.
    const spots = await request.get("/api/spots?lat=50.938&lng=6.9551&limit=1");
    const { spots: liste } = (await spots.json()) as { spots: { id: string }[] };
    expect(liste.length).toBeGreaterThan(0);

    const antwort = await request.get(`/api/spots/${liste[0].id}/ratings`);
    expect(antwort.status()).toBe(200);

    const daten = (await antwort.json()) as {
      summary: { existsCount: number; goneCount: number };
      myVote: unknown;
    };

    // Zahlen, keine festen Werte: Andere Tests bewerten denselben Parkplatz.
    expect(typeof daten.summary.existsCount).toBe("number");
    expect(typeof daten.summary.goneCount).toBe("number");

    // Das ist der Punkt – ohne Konto gibt es keine eigene Stimme zu zeigen.
    expect(daten.myVote).toBeNull();
  });

  test("ein unbekannter Parkplatz wird nicht stillschweigend angelegt", async ({ request }) => {
    // Sonst ließe sich die Tabelle mit erfundenen IDs füllen, und die
    // Prüfliste aus 8.9 wäre wertlos.
    const antwort = await request.get("/api/spots/gibt-es-nicht/ratings");
    expect(antwort.status()).toBe(404);
  });

  test("mit Konto lässt sich bewerten, umdrehen und zurücknehmen", async ({ page }) => {
    await page.goto("/");
    await devLeisteDurchklickbarMachen(page);
    await anmelden(page);
    await page.getByRole("button", { name: "Details" }).first().click();

    const bewertung = page.getByRole("dialog").getByRole("region", {
      name: /Gibt es diesen Parkplatz noch/u,
    });
    const existiert = bewertung.getByRole("button", { name: /^Existiert,/u });
    const wegGemeldet = bewertung.getByRole("button", { name: /^Existiert nicht mehr,/u });

    await expect(existiert).toBeEnabled();

    const vorherHoch = await stimmen(existiert);
    const vorherRunter = await stimmen(wegGemeldet);

    // Setzen: eine Stimme kommt dazu.
    await existiert.click();
    await expect(existiert).toHaveAttribute("aria-pressed", "true");
    await expect(existiert).toHaveAccessibleName(new RegExp(`${vorherHoch + 1} Stimmen`, "u"));

    /*
     * Umdrehen: Die Stimme **wandert**, sie verdoppelt sich nicht. Das ist der
     * Kern der Regel „höchstens eine je Konto und Parkplatz" – oben geht eine
     * weg, unten kommt eine dazu.
     */
    await wegGemeldet.click();
    await expect(wegGemeldet).toHaveAttribute("aria-pressed", "true");
    await expect(existiert).toHaveAttribute("aria-pressed", "false");
    await expect(existiert).toHaveAccessibleName(new RegExp(`${vorherHoch} Stimmen`, "u"));
    await expect(wegGemeldet).toHaveAccessibleName(new RegExp(`${vorherRunter + 1} Stimmen`, "u"));

    // Noch einmal dieselbe Richtung nimmt zurück.
    await wegGemeldet.click();
    await expect(wegGemeldet).toHaveAttribute("aria-pressed", "false");
    await expect(wegGemeldet).toHaveAccessibleName(new RegExp(`${vorherRunter} Stimmen`, "u"));
  });

  test("die Stimme überlebt das Schließen der Detailansicht", async ({ page }) => {
    /*
     * Der Test, der eine rein optimistische Anzeige entlarvt: Nach dem
     * erneuten Öffnen kommen die Zahlen vom Server. Würde nur im Browser
     * gezählt, stünde hier wieder der alte Wert – und die eigene Stimme wäre
     * vergessen.
     */
    /*
     * **Erst warten, bis die Liste zum Standort passt** (gemessen 2026-10-23,
     * als der Test gelegentlich rot wurde). Bis der Standort da ist, zeigt die
     * Karte „Nächster Parkplatz" einen vorgerenderten Platz (Hamburg); danach
     * springt sie auf den nächsten bei Köln. Laut Ablaufprotokoll (Trace) des
     * Fehlschlags wurde die Stimme auf `hamburg-…` abgegeben und die Detailansicht beim
     * zweiten Öffnen für `koeln-…` geöffnet – die Stimme war nicht verloren,
     * der Test sah einen anderen Parkplatz.
     */
    const nahe = page.waitForResponse((antwort) => /\/api\/spots\?lat=50/u.test(antwort.url()));
    await page.goto("/");
    await devLeisteDurchklickbarMachen(page);
    await anmelden(page);
    await nahe;
    await page.getByRole("button", { name: "Details" }).first().click();

    const existiert = page.getByRole("dialog").getByRole("button", { name: /^Existiert,/u });
    const vorher = await stimmen(existiert);

    await existiert.click();
    await expect(existiert).toHaveAccessibleName(new RegExp(`${vorher + 1} Stimmen`, "u"));

    await page.getByRole("button", { name: "Details schließen" }).click();
    await page.getByRole("button", { name: "Details" }).first().click();

    const wieder = page.getByRole("dialog").getByRole("button", { name: /^Existiert,/u });
    await expect(wieder).toHaveAttribute("aria-pressed", "true");
    await expect(wieder).toHaveAccessibleName(new RegExp(`${vorher + 1} Stimmen`, "u"));
  });
});
