import { expect, test } from "@playwright/test";

/**
 * Auffindbarkeit (ToDo 19.12): Sitemap, Seite je Stadt, Beschreibung und
 * strukturierte Angaben. Eine Seite, die niemand findet, hilft niemandem –
 * und dass etwas nicht gefunden wird, fällt im Betrieb nie auf.
 */

test.describe("Suchmaschinen", () => {
  test("robots.txt nennt die Sitemap und sperrt nur die Schnittstellen", async ({ request }) => {
    const text = await (await request.get("/robots.txt")).text();
    expect(text).toContain("Sitemap: https://wheelee.de/sitemap.xml");
    expect(text).toContain("Disallow: /api/");
  });

  test("die Sitemap führt feste Seiten und Städte auf", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    expect(response.ok()).toBe(true);
    const xml = await response.text();
    expect(xml).toContain("<loc>https://wheelee.de</loc>");
    expect(xml).toContain("<loc>https://wheelee.de/info</loc>");
    expect(xml).toContain("<loc>https://wheelee.de/parkplaetze/hamburg</loc>");
  });

  test("die Seite einer Stadt hat Titel, Beschreibung, Liste und Link zur Karte", async ({ page }) => {
    await page.goto("/parkplaetze/hamburg");
    await expect(page).toHaveTitle(/Behindertenparkplätze in Hamburg/u);
    await expect(page.getByRole("heading", { level: 1, name: /Hamburg/u })).toBeVisible();
    expect(await page.locator("main li").count()).toBeGreaterThan(10);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /Hamburg/u);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /\/parkplaetze\/hamburg$/u);

    await page.getByRole("link", { name: "Auf der Karte öffnen" }).click();
    await expect(page).toHaveURL(/\?stadt=hamburg$/u);
  });

  test("eine unbekannte Stadt ist 404", async ({ request }) => {
    expect((await request.get("/parkplaetze/gibt-es-nicht")).status()).toBe(404);
  });

  test("die Startseite nennt strukturierte Angaben und eine kanonische Adresse", async ({ page }) => {
    await page.goto("/?stadt=hamburg");
    const json = await page.locator('script[type="application/ld+json"]').textContent();
    const data = JSON.parse(json ?? "{}") as { "@type": string; isAccessibleForFree: boolean };
    expect(data["@type"]).toBe("WebApplication");
    expect(data.isAccessibleForFree).toBe(true);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /wheelee\.de\/?$|\/$/u);
  });
});
