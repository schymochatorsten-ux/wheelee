import { expect, test } from "@playwright/test";

/**
 * Sprachwahl (ToDo 15.5, 15.3).
 *
 * Läuft mit Deutsch als Vorgabe (`locale` in der Playwright-Konfiguration). Die
 * Sprache am Konto prüft `karten-app.spec.ts` mit, weil die Registrierung
 * gedrosselt ist und jede weitere ein Fehlschlagen von außen näher rückt.
 */

test("die Sprache steht schon im ersten HTML", async ({ request }) => {
  const antwort = await request.get("/");
  expect(await antwort.text()).toMatch(/<html lang="de"/u);
});

test("ein unbekannter Cookie-Wert fällt auf die Browsersprache zurück", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({ locale: "de-DE", baseURL });
  await context.addCookies([{ name: "wheelee-lang", value: "xx", url: baseURL! }]);
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("lang", "de");
  await context.close();
});

test("die Einstellungen bieten die Sprachwahl", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("tab", { name: "Einstellungen" }).click();
  await expect(page.getByRole("heading", { name: "Sprache", level: 2 })).toBeVisible();
  await expect(page.getByRole("radio", { name: "Deutsch" })).toBeChecked();
});

test.describe("Englisch", () => {
  test("die Browsersprache ist der erste Vorschlag – ohne ein Cookie zu setzen", async ({
    browser,
    baseURL,
  }) => {
    const context = await browser.newContext({ locale: "en-GB", baseURL });
    const page = await context.newPage();
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await page.getByRole("tab", { name: "Settings" }).click();
    await expect(page.getByRole("heading", { name: "Language", level: 2 })).toBeVisible();
    await expect(page.getByRole("radio", { name: "English" })).toBeChecked();

    const eigene = (await context.cookies()).filter((c) => !c.name.startsWith("__next_hmr"));
    expect(eigene).toEqual([]);
    await context.close();
  });

  test("Haftungshinweis bleibt deutsch, davor steht ein Hinweis in der Sprache der Oberfläche", async ({
    browser,
    baseURL,
  }) => {
    const context = await browser.newContext({ locale: "en-GB", baseURL });
    const page = await context.newPage();
    await page.goto("/");
    await page.getByRole("tab", { name: "Settings" }).click();
    await expect(page.getByText("available in German only. On site, the signs")).toBeVisible();
    await expect(page.getByText("Bitte vor der Fahrt lesen")).toBeVisible();
    await context.close();
  });

  test("Umschalten wirkt sofort, bleibt nach dem Neuladen und stellt <html lang> um", async ({
    browser,
    baseURL,
  }) => {
    const context = await browser.newContext({ locale: "en-GB", baseURL });
    const page = await context.newPage();
    await page.goto("/");
    await page.getByRole("tab", { name: "Settings" }).click();
    await page.getByRole("radio", { name: "Deutsch" }).click();

    await expect(page.locator("html")).toHaveAttribute("lang", "de");
    await expect(page.getByRole("heading", { name: "Sprache", level: 2 })).toBeVisible();

    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("lang", "de");
    const cookie = (await context.cookies()).find((c) => c.name === "wheelee-lang");
    expect(cookie?.value).toBe("de");
    await context.close();
  });

  test("die Rechtstexte bleiben deutsch, Rahmen und Hinweis folgen der Sprache", async ({
    browser,
    baseURL,
  }) => {
    const context = await browser.newContext({ locale: "en-GB", baseURL });
    const page = await context.newPage();
    await page.goto("/datenschutz");
    await expect(page.getByRole("link", { name: /Back to the map/u })).toBeVisible();
    await expect(page.getByText("available in German only")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Datenschutzerklärung", level: 1 }),
    ).toBeVisible();
    await context.close();
  });

  test("Fehlermeldungen der Schnittstelle kommen in der Sprache der Anfrage", async ({
    playwright,
    baseURL,
  }) => {
    const english = await playwright.request.newContext({
      baseURL,
      extraHTTPHeaders: { "Accept-Language": "en-GB" },
    });
    const antwort = await english.put("/api/account/language", { data: { language: "de" } });
    expect(antwort.status()).toBe(401);
    expect(((await antwort.json()) as { error: string }).error).toBe("Not signed in.");
    await english.dispose();
  });
});

test.describe("Spanisch", () => {
  test("Browsersprache Spanisch: Oberfläche, Haftungshinweis mit Hinweis, Rechtstexte deutsch", async ({
    browser,
    baseURL,
  }) => {
    const context = await browser.newContext({ locale: "es-ES", baseURL });
    const page = await context.newPage();
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("lang", "es");
    await page.getByRole("tab", { name: "Ajustes" }).click();
    await expect(page.getByRole("heading", { name: "Idioma", level: 2 })).toBeVisible();
    await expect(page.getByRole("radio", { name: "Español" })).toBeChecked();
    await expect(page.getByText("solo existe en alemán. In situ")).toBeVisible();
    await expect(page.getByText("Bitte vor der Fahrt lesen")).toBeVisible();

    await page.goto("/impressum");
    await expect(page.getByRole("link", { name: /Volver al mapa/u })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Impressum", level: 1 })).toBeVisible();
    await context.close();
  });
});

test.describe("Zeitangaben und Entfernungen (ToDo 15.3, 15.4)", () => {
  /**
   * Aschaffenburg, Parkplatz mit `Mo-Sa 09:00-20:00` in den Daten
   * (`data/aschaffenburg.json`, id `aschaffenburg-2a66375028`). **Hängt am
   * Bestand:** Fällt die Zeitangabe bei einem späteren Import weg, braucht der
   * Test einen anderen Parkplatz mit Zeitangabe.
   */
  const standort = { latitude: 49.9787778, longitude: 9.1522083 };

  const detailsOeffnen = async (
    browser: import("@playwright/test").Browser,
    baseURL: string | undefined,
    locale: string,
    detailsName: string,
  ) => {
    const context = await browser.newContext({
      locale,
      baseURL,
      geolocation: standort,
      permissions: ["geolocation"],
    });
    const page = await context.newPage();
    await page.goto("/");
    // Erst wenn der Standort da ist: Davor zeigt die Leiste den Parkplatz nahe der
    // Stadtmitte von Hamburg, und der Klick träfe den falschen.
    await expect(page.getByText(/– 0 m\b/u).first()).toBeVisible();
    await page.getByRole("button", { name: detailsName, exact: true }).first().click();
    return { page, context };
  };

  test("englisch: Wochentage und Uhrzeit in der Sprache der Oberfläche", async ({
    browser,
    baseURL,
  }) => {
    const { page, context } = await detailsOeffnen(browser, baseURL, "en-GB", "Details");
    await expect(page.getByText("Mon–Sat 09:00–20:00")).toBeVisible();
    await context.close();
  });

  test("spanisch: Wochentage und Uhrzeit in der Sprache der Oberfläche", async ({
    browser,
    baseURL,
  }) => {
    const { page, context } = await detailsOeffnen(browser, baseURL, "es-ES", "Detalles");
    await expect(page.getByText("lun–sáb 09:00–20:00")).toBeVisible();
    await context.close();
  });

  test("deutsch: der Quelltext bleibt, wie er in den Daten steht", async ({ browser, baseURL }) => {
    const { page, context } = await detailsOeffnen(browser, baseURL, "de-DE", "Details");
    await expect(page.getByText("Mo-Sa 09:00-20:00")).toBeVisible();
    await context.close();
  });
});
