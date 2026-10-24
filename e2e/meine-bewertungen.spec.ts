import { expect, test } from "@playwright/test";
import { herkunft } from "./herkunft";

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
    expect((await api.post("/api/auth/register", { data: KONTO, headers: herkunft() })).status()).toBe(200);

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
    await page.getByRole("tab", { name: "Einstellungen" }).click();
    await page.getByRole("radio", { name: "Anmelden" }).click();
    await page.getByLabel("E-Mail-Adresse").fill(KONTO.email);
    await page.getByLabel("Passwort").fill(KONTO.password);
    await page.getByRole("button", { name: "Anmelden" }).click();
    await expect(page.getByRole("button", { name: "Abmelden" })).toBeVisible();

    const vote = await page.request.post(`/api/spots/${spotId}/ratings`, {
      data: { vote: "gone" },
    });
    expect(vote.status()).toBe(200);

    await page.getByRole("button", { name: "Meine Bewertungen", exact: true }).click();
    const liste = page.locator("#meine-bewertungen-liste");
    await expect(liste.getByText("Existiert nicht mehr")).toBeVisible();

    // Trefferflächen mindestens 44 px.
    for (const knopf of await liste.getByRole("button").all()) {
      const box = await knopf.boundingBox();
      expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);
    }

    // Auf der Karte zeigen: Wechsel auf den Kartenreiter mit Detailansicht.
    await liste.getByRole("button", { name: /auf der Karte zeigen/u }).click();
    await expect(page.getByRole("tab", { name: "Karte" })).toHaveAttribute("aria-selected", "true");
    await expect(page.getByRole("dialog")).toBeVisible();

    // Zurückziehen.
    await page.getByRole("button", { name: "Details schließen" }).click();
    await page.getByRole("tab", { name: "Einstellungen" }).click();
    await page.getByRole("button", { name: "Meine Bewertungen", exact: true }).click();
    await page.getByRole("button", { name: /Stimme zu .* zurückziehen/u }).click();
    await expect(page.getByText("Du hast noch keinen Parkplatz bewertet.")).toBeVisible();

    const danach = await page.request.get(`/api/spots/${spotId}/ratings`);
    expect(((await danach.json()) as { myVote: unknown }).myVote).toBeNull();
  });
});
