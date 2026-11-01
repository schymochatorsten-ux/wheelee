import { expect, test } from "@playwright/test";

/**
 * Infoseite (ToDo 19.11): sagt, wofür wheelee da ist, und bittet um
 * Rückmeldungen. Sie muss aus den Einstellungen erreichbar sein und der
 * Sprache der Oberfläche folgen – anders als die Rechtstexte.
 */

test.describe("Infoseite", () => {
  test("ist aus den Einstellungen erreichbar und nennt Ziel und Bitte um Rückmeldung", async ({ page }) => {
    await page.goto("/");
    await page.addStyleTag({ content: "nextjs-portal { pointer-events: none; }" });
    await page.getByRole("tab", { name: "Einstellungen" }).click();
    await page.getByRole("link", { name: "Über wheelee" }).click();

    await expect(page).toHaveURL(/\/info$/u);
    await expect(page.getByRole("heading", { level: 1, name: "Über wheelee" })).toBeVisible();
    await expect(page.getByText("Behindertenparkplatz zu finden")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Hilf mit" })).toBeVisible();
    await expect(page.getByText("gemeinsam mit der Community")).toBeVisible();
  });

  test("folgt der Browsersprache", async ({ browser, baseURL }) => {
    const context = await browser.newContext({ locale: "en-GB", baseURL });
    const page = await context.newPage();
    await page.goto("/info");
    await expect(page.getByRole("heading", { level: 1, name: "About wheelee" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Help us" })).toBeVisible();
    await context.close();
  });
});
