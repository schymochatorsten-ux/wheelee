import { expect, test } from "@playwright/test";

/**
 * Parkplatzdaten einer Stadt vorab laden (ToDo 16.1).
 *
 * Der erste Test läuft auch im Entwicklungsbetrieb (die Cache API gibt es
 * dort ebenfalls); der zweite braucht den Service Worker und überspringt sich
 * ohne ihn – siehe `offline.spec.ts`.
 */
async function openOfflineSection(page: import("@playwright/test").Page) {
  await page.goto("/");
  await page.getByRole("tab", { name: "Einstellungen" }).click();
  await expect(page.getByRole("heading", { name: "Ohne Netz: Parkplätze mitnehmen" })).toBeVisible();
}

test("Stadt vorab laden, Größe und Alter sehen, wieder löschen", async ({ page }) => {
  await openOfflineSection(page);

  // Aus einem früheren Lauf könnte noch etwas liegen.
  await page.evaluate(() => caches.delete("wheelee-city"));
  await page.reload();
  await page.getByRole("tab", { name: "Einstellungen" }).click();
  await expect(page.getByText("Noch keine Stadt auf diesem Gerät gespeichert.")).toBeVisible();

  await page.getByTestId("offline-city").selectOption("koeln");
  await page.getByRole("button", { name: "Vorab laden" }).click();

  const entry = page.getByTestId("offline-koeln");
  await expect(entry).toBeVisible();
  await expect(entry).toContainText(/Standorte, \d+ KB belegt/);
  await expect(entry).toContainText("Stand der Daten:");
  await expect(entry).toContainText("Geladen am");
  await expect(page.getByText(/Zusammen belegt: \d+ KB/)).toBeVisible();

  await page.getByRole("button", { name: /Köln vom Gerät löschen/ }).click();
  await expect(page.getByText("Noch keine Stadt auf diesem Gerät gespeichert.")).toBeVisible();
  await expect(page.getByTestId("offline-message")).toContainText("gelöscht");
});

test("ohne Netz kommen auch ungesehene Ausschnitte aus den geladenen Daten", async ({
  page,
  context,
}) => {
  await page.goto("/");
  const active = await page
    .waitForFunction(() => navigator.serviceWorker.controller !== null, null, { timeout: 8_000 })
    .then(() => true)
    .catch(() => false);
  test.skip(!active, "Kein Service Worker aktiv – vermutlich Entwicklungsbetrieb.");

  await openOfflineSection(page);
  await page.getByTestId("offline-city").selectOption("koeln");
  await page.getByRole("button", { name: "Vorab laden" }).click();
  await expect(page.getByTestId("offline-koeln")).toBeVisible();

  // Ein Ausschnitt, den die Karte nie angefragt hat (Kommastellen gibt es sonst nirgends).
  const bbox = "6.9234567,50.9123457,6.9876543,50.9654321";
  const online = await page.evaluate(
    async (box) => (await (await fetch(`/api/spots?bbox=${box}&limit=2000`)).json()).total,
    bbox,
  );
  expect(online).toBeGreaterThan(0);
  // Einen zweiten, anderen Ausschnitt nur offline abfragen.
  const bbox2 = "6.9234568,50.9123458,6.9876544,50.9654322";

  await context.setOffline(true);
  const offline = await page.evaluate(async (box) => {
    const response = await fetch(`/api/spots?bbox=${box}&limit=2000`);
    return (await response.json()).total as number;
  }, bbox2);
  const nearby = await page.evaluate(async () => {
    const response = await fetch("/api/spots?lat=50.94&lng=6.96&limit=5");
    return (await response.json()).spots.length as number;
  });
  await context.setOffline(false);

  expect(offline).toBe(online);
  expect(nearby).toBe(5);

  await page.getByRole("button", { name: /Köln vom Gerät löschen/ }).click();
});
