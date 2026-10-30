import { expect, test } from "@playwright/test";
import { DatabaseSync } from "node:sqlite";
import path from "node:path";
import { herkunft } from "./herkunft";

/**
 * Besucherzählung und Auswertung in der Verwaltung (ToDo 20.1).
 *
 * Playwright selbst meldet sich nie (`navigator.webdriver`), und sein Browser
 * nennt sich „HeadlessChrome" – der Ping wird deshalb hier über die
 * Schnittstelle mit einer gewöhnlichen Browserkennung geschickt.
 */

const BROWSER =
  "Mozilla/5.0 (X11; Linux x86_64; rv:130.0) Gecko/20100101 Firefox/130.0";

test("die Schnittstelle antwortet immer gleich, ob gezählt wird oder nicht", async ({ request }) => {
  const mensch = await request.post("/api/visit", { headers: { "User-Agent": BROWSER } });
  const roboter = await request.post("/api/visit", {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" },
  });
  expect(mensch.status()).toBe(204);
  expect(roboter.status()).toBe(204);
});

test("die Auswertung ist nur für Administratoren da", async ({ request }) => {
  const antwort = await request.get("/api/admin/visits");
  expect(antwort.status()).toBe(401);
});

test("ein automatisierter Browser meldet sich nicht von selbst", async ({ page }) => {
  let pings = 0;
  await page.route("**/api/visit", (route) => {
    pings += 1;
    return route.fulfill({ status: 204 });
  });
  await page.goto("/");
  await page.waitForTimeout(500);
  expect(pings).toBe(0);
});

test("ein Browser ohne Automatisierung meldet sich genau einmal je Seitenaufruf, ohne Cookie", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({ baseURL });
  // So verhält sich ein gewöhnlicher Browser: `navigator.webdriver` ist falsch.
  await context.addInitScript(() => {
    Object.defineProperty(navigator, "webdriver", { get: () => false });
  });
  const page = await context.newPage();
  let pings = 0;
  await page.route("**/api/visit", (route) => {
    pings += 1;
    return route.fulfill({ status: 204 });
  });
  await page.goto("/");
  await expect.poll(() => pings).toBe(1);
  expect(await context.cookies()).toEqual([]);
  expect(await page.evaluate(() => window.localStorage.length)).toBe(0);
  await context.close();
});

test("ein Administrator sieht die Zahlen in der Verwaltung", async ({ playwright, browser, baseURL }) => {
  const api = await playwright.request.newContext({ baseURL, extraHTTPHeaders: herkunft() });
  await api.post("/api/visit", { headers: { "User-Agent": BROWSER } });

  const adresse = `e2e-besucher-${Date.now()}@example.org`;
  const angelegt = await api.post("/api/auth/register", {
    data: { email: adresse, password: "ein gutes langes Passwort" },
  });
  expect(angelegt.status()).toBe(200);

  const datei =
    process.env.WHEELEE_DB_PATH?.trim() || path.join(process.cwd(), ".data", "wheelee.sqlite");
  const db = new DatabaseSync(datei);
  try {
    db.exec("PRAGMA busy_timeout = 5000");
    db.prepare("UPDATE account SET role = 'admin' WHERE email = ?").run(adresse);
  } finally {
    db.close();
  }

  const antwort = await api.get("/api/admin/visits?days=7");
  expect(antwort.ok()).toBe(true);
  const daten = (await antwort.json()) as { total: { visitors: number } };
  expect(daten.total.visitors).toBeGreaterThanOrEqual(1);

  // Dieselbe Sitzung im Browser: die Auswertung steht in der Verwaltung.
  const context = await browser.newContext({ baseURL, storageState: await api.storageState() });
  const page = await context.newPage();
  await page.goto("/");
  await page.getByRole("tab", { name: "Rückmeldungen" }).click();
  await expect(page.getByRole("heading", { name: "Besucher", level: 2 })).toBeVisible();
  await expect(page.getByText("Gezählt werden nur Menschen")).toBeVisible();
  await context.close();
  await api.dispose();
});