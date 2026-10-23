import { expect, test } from "@playwright/test";

/**
 * Gespeicherte Parkplätze (ToDo 11.5).
 *
 * Ein Konto für die ganze Datei, über die Schnittstelle angelegt (Registrierung
 * gedrosselt, siehe `bewertungen.spec.ts`). Der Platz ist nicht der erstbeste:
 * Der gehört den Bewertungstests, die dort relativ zählen.
 */

const KOELN = { latitude: 50.938, longitude: 6.9551 };

const KONTO = {
  email: `favoriten-${Date.now()}@example.de`,
  password: "ein gutes langes Passwort",
};

test.describe("Gespeicherte Parkplätze", () => {
  let spotId = "";

  test.beforeAll(async ({ playwright, baseURL }) => {
    const api = await playwright.request.newContext({ baseURL });
    expect((await api.post("/api/auth/register", { data: KONTO })).status()).toBe(200);

    const spots = await api.get("/api/spots?lat=50.938&lng=6.9551&limit=8");
    spotId = ((await spots.json()) as { spots: { id: string }[] }).spots[6].id;
    await api.dispose();
  });

  test("ohne Konto lehnen die Endpunkte ab", async ({ request }) => {
    expect((await request.get("/api/account/favorites")).status()).toBe(401);
    expect((await request.get(`/api/spots/${spotId}/favorite`)).status()).toBe(401);
    expect((await request.put(`/api/spots/${spotId}/favorite`)).status()).toBe(401);
    expect((await request.delete(`/api/spots/${spotId}/favorite`)).status()).toBe(401);
  });

  test("der Knopf ist ohne Konto abgeschaltet und nennt den Grund", async ({ page, context }) => {
    await context.grantPermissions(["geolocation"]);
    await context.setGeolocation(KOELN);
    await page.goto("/");
    await page.addStyleTag({ content: "nextjs-portal { pointer-events: none; }" });
    await page.getByRole("button", { name: "Details" }).first().click();

    const dialog = page.getByRole("dialog");
    await expect(dialog.getByRole("button", { name: "Parkplatz speichern" })).toBeDisabled();
    await expect(dialog.getByText(/Zum Speichern brauchst du ein Konto/u)).toBeVisible();
  });

  test("speichern, in der Liste sehen, auf die Karte führen, entfernen", async ({
    page,
    context,
  }) => {
    await context.grantPermissions(["geolocation"]);
    await context.setGeolocation(KOELN);
    await page.goto("/");
    await page.addStyleTag({ content: "nextjs-portal { pointer-events: none; }" });

    await page.getByRole("tab", { name: "Einstellungen" }).click();
    await page.getByRole("radio", { name: "Anmelden" }).click();
    await page.getByLabel("E-Mail-Adresse").fill(KONTO.email);
    await page.getByLabel("Passwort").fill(KONTO.password);
    await page.getByRole("button", { name: "Anmelden" }).click();
    await expect(page.getByRole("button", { name: "Abmelden" })).toBeVisible();

    // Speichern über die Schnittstelle, Gegenprobe über die Detailansicht.
    expect((await page.request.put(`/api/spots/${spotId}/favorite`)).status()).toBe(200);
    // Ein erfundener Platz wird nicht gespeichert.
    expect((await page.request.put("/api/spots/gibt-es-nicht/favorite")).status()).toBe(404);

    await page.getByRole("button", { name: "Meine Bewertungen", exact: true }).waitFor({
      state: "visible",
    });
    await page.getByRole("button", { name: "Gespeicherte Parkplätze", exact: true }).click();
    const liste = page.locator("#meine-favoriten-liste");
    await expect(liste.getByRole("listitem")).toHaveCount(1);
    // Standort liegt vor: Die Entfernung steht dabei.
    await expect(liste.getByText(/entfernt/u)).toBeVisible();

    for (const knopf of await liste.getByRole("button").all()) {
      const box = await knopf.boundingBox();
      expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);
    }

    // Auf die Karte: Detailansicht mit gesetztem Stern.
    await liste.getByRole("button", { name: /auf der Karte zeigen/u }).click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    const stern = dialog.getByRole("button", { name: "Gespeichert – entfernen" });
    await expect(stern).toHaveAttribute("aria-pressed", "true");

    // Über den Stern wieder entfernen.
    await stern.click();
    await expect(dialog.getByRole("button", { name: "Parkplatz speichern" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );

    const danach = await page.request.get("/api/account/favorites");
    expect(((await danach.json()) as { favorites: unknown[] }).favorites).toEqual([]);

    // Und wieder speichern, dann in der Liste entfernen.
    await dialog.getByRole("button", { name: "Parkplatz speichern" }).click();
    await expect(stern).toBeVisible();
    await page.getByRole("button", { name: "Details schließen" }).click();
    await page.getByRole("tab", { name: "Einstellungen" }).click();
    await page.getByRole("button", { name: "Gespeicherte Parkplätze", exact: true }).click();
    await page.getByRole("button", { name: /aus den gespeicherten Parkplätzen entfernen/u }).click();
    await expect(page.getByText(/Noch nichts gespeichert/u)).toBeVisible();
  });
});
