import { expect, test } from "@playwright/test";
import { herkunft } from "./herkunft";
import { ansicht } from "./ansicht";

/**
 * Eigene Bewertungen einsehen und zurückziehen (ToDo 11.4).
 *
 * Ein Konto für die ganze Datei, angelegt über die Schnittstelle – die
 * Registrierung ist auf fünf Versuche je Stunde gedrosselt (siehe
 * `bewertungen.spec.ts`).
 */

const KOELN = { latitude: 50.938, longitude: 6.9551 };

const KONTO = {
  email: `meine-bewertungen-${Date.now()}@example.de`,
  password: "ein gutes langes Passwort",
};

test.describe("Meine Bewertungen", () => {
  let spotId = "";

  test.beforeAll(async ({ playwright, baseURL }) => {
    const api = await playwright.request.newContext({ baseURL });
    expect(
      (await api.post("/api/auth/register", { data: KONTO, headers: herkunft() })).status(),
    ).toBe(200);

    // Nicht der erstbeste Platz: `bewertungen.spec.ts` zählt dort die Stimmen
    // relativ, und eine fremde Stimme zur selben Zeit ließe seine Rechnung
    // (parallel laufende Dateien, eine Datenbank) falsch ausgehen.
    const spots = await api.get("/api/spots?lat=50.938&lng=6.9551&limit=8");
    spotId = ((await spots.json()) as { spots: { id: string }[] }).spots[7].id;
    await api.dispose();
  });

  test("ohne Konto gibt es keine Liste", async ({ request }) => {
    expect((await request.get("/api/account/ratings")).status()).toBe(401);
    expect((await request.delete(`/api/spots/${spotId}/ratings`)).status()).toBe(401);
  });

  test("Liste zeigt die Stimme, führt auf die Karte und lässt sich zurückziehen", async ({
    page,
    context,
  }) => {
    await context.grantPermissions(["geolocation"]);
    await context.setGeolocation(KOELN);

    // Über die Schnittstelle abstimmen und im Browser anmelden.
    await page.goto("/");
    await page.addStyleTag({ content: "nextjs-portal { pointer-events: none; }" });
    // Konto seit 9.27 hinter dem Benutzersymbol oben rechts.
    await ansicht(page, "Konto");
    await page.getByRole("radio", { name: "Anmelden" }).click();
    await page.getByLabel("E-Mail-Adresse").fill(KONTO.email);
    await page.getByLabel("Passwort").fill(KONTO.password);
    await page.getByRole("button", { name: "Anmelden" }).click();
    await expect(page.getByRole("button", { name: "Abmelden" })).toBeVisible();

    /*
     * **Bestätigen und nicht melden** – und das ist seit dem 2026-11-19 keine
     * Geschmacksfrage mehr (ToDo 8.12): Die Schwelle für unsichere Plätze steht
     * auf **1**, und die Kölner Plätze stammen alle aus OpenStreetMap, sind
     * also unsicher. Eine einzige „gone"-Stimme blendet den Platz damit aus,
     * `entry.spot` ist null, und `MyRatings` zeigt dann **keinen** Knopf „Auf
     * der Karte zeigen" – richtig so, aber dieser Test käme nicht mehr bis zur
     * Karte. Genau daran ist er am 2026-11-19 gescheitert. Der ausgeblendete
     * Fall steht deshalb als eigener Test darunter.
     */
    const vote = await page.request.post(`/api/spots/${spotId}/ratings`, {
      data: { vote: "exists" },
    });
    expect(vote.status()).toBe(200);

    await page.getByRole("button", { name: "Meine Bewertungen", exact: true }).click();
    const liste = page.locator("#meine-bewertungen-liste");
    await expect(liste.getByText("Existiert")).toBeVisible();

    // Trefferflächen mindestens 44 px.
    for (const knopf of await liste.getByRole("button").all()) {
      const box = await knopf.boundingBox();
      expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);
    }

    // Auf der Karte zeigen: Wechsel auf den Kartenreiter mit Detailansicht.
    await liste.getByRole("button", { name: /auf der Karte zeigen/u }).click();
    // Am `main` und nicht am Reiter: Der liegt auf dem Telefon seit 9.34
    // hinter dem Menü, und geprüft werden soll die Ansicht, nicht das Menü.
    await expect(page.locator("main")).toHaveAttribute("data-ansicht", "map");
    await expect(page.getByRole("dialog")).toBeVisible();

    // Zurückziehen.
    await page.getByRole("button", { name: "Details schließen" }).click();
    await ansicht(page, "Konto");
    await page.getByRole("button", { name: "Meine Bewertungen", exact: true }).click();
    await page.getByRole("button", { name: /Stimme zu .* zurückziehen/u }).click();
    await expect(page.getByText("Du hast noch keinen Parkplatz bewertet.")).toBeVisible();

    const danach = await page.request.get(`/api/spots/${spotId}/ratings`);
    expect(((await danach.json()) as { myVote: unknown }).myVote).toBeNull();
  });

  test("eine eigene Meldung blendet den unsicheren Platz aus – die Liste bleibt", async ({
    playwright,
    baseURL,
  }) => {
    /*
     * **Die Folge der Schwelle 1 festgehalten** (ToDo 8.12, 2026-11-19): Wer
     * einen unsicheren Platz als aufgehoben meldet, lässt ihn damit allein
     * verschwinden. Das ist gewollt – gelöscht wird nichts, die Verwaltung holt
     * ihn zurück –, aber es darf **nicht** die eigene Stimme verschlucken:
     * Sonst kann niemand zurücknehmen, was er gemeldet hat.
     *
     * **Ein selbst gemeldeter Platz und kein vorhandener**, und das ist der
     * Kern: Beim ersten Versuch stand hier `spots[6]` aus Köln – und der Test
     * fiel im Gesamtlauf um, weil `bewertungen.spec.ts` denselben Platz vorher
     * bestätigt hatte. Gezählt wird der **Überhang**, und eine Bestätigung
     * gegen eine Meldung ergibt null. Ein frisch gemeldeter Platz gehört
     * dagegen niemandem sonst: unsicher von Anfang an, ohne fremde Stimmen.
     */
    const api = await playwright.request.newContext({ baseURL });
    const konto = {
      email: `meine-bewertungen-ausgeblendet-${Date.now()}@example.de`,
      password: "ein gutes langes Passwort",
    };
    expect(
      (await api.post("/api/auth/register", { data: konto, headers: herkunft() })).status(),
    ).toBe(200);

    const gemeldet = await api.post("/api/spots/melden", {
      data: { label: "Ausgeblendet-Teststraße 1", lat: 50.9381, lng: 6.9552 },
      headers: herkunft(),
    });
    expect(gemeldet.status()).toBe(201);
    const anderer = ((await gemeldet.json()) as { spotId: string }).spotId;

    expect(
      (await api.post(`/api/spots/${anderer}/ratings`, { data: { vote: "gone" } })).status(),
    ).toBe(200);

    const liste = (await (await api.get("/api/account/ratings")).json()) as {
      ratings: { spotId: string; vote: string; spot: unknown }[];
    };
    const eintrag = liste.ratings.find((r) => r.spotId === anderer);
    expect(eintrag?.vote).toBe("gone");
    // **Der Platz ist weg, der Eintrag nicht.** `spot` ist null, und genau
    // daran erkennt die Oberfläche, dass sie keinen Kartenknopf anbieten darf.
    expect(eintrag?.spot).toBeNull();

    await api.dispose();
  });
});
