import { expect, test } from "@playwright/test";

/**
 * Mail-Funktionen ohne eingerichteten Versand (D-10, ToDos 11.1 und 11.8).
 *
 * Die Testumgebung hat keine SMTP-Zugangsdaten – und genau das ist der Fall,
 * der zählt: **Ohne Einrichtung darf nichts angeboten werden, was nicht
 * funktioniert.** Der Weg mit Versand ist in den Unit-Tests gegen einen
 * SMTP-Server im Test abgedeckt (`mail.test.ts`, `mail-tokens.test.ts`).
 */

test("ohne Mailversand meldet die Schnittstelle, dass er aus ist", async ({ request }) => {
  const antwort = await request.get("/api/mail");
  expect(antwort.ok()).toBe(true);
  expect(((await antwort.json()) as { enabled: boolean }).enabled).toBe(false);
});

test("ohne Mailversand gibt es die Endpunkte nicht", async ({ request }) => {
  const forgot = await request.post("/api/auth/forgot", { data: { email: "a@example.org" } });
  expect(forgot.status()).toBe(404);
  const reset = await request.post("/api/auth/reset", { data: { token: "x", password: "ein langes Passwort" } });
  expect(reset.status()).toBe(404);
  const confirm = await request.post("/api/account/email/confirm", { data: { token: "x" } });
  expect(confirm.status()).toBe(404);
});

test("die Anmeldemaske bietet kein „Passwort vergessen“ an, sondern sagt, warum", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("tab", { name: "Einstellungen" }).click();
  await expect(page.getByText("lässt sich derzeit nicht selbst zurücksetzen")).toBeVisible();
  await expect(page.getByRole("button", { name: "Passwort vergessen?" })).toHaveCount(0);
});

test("die Linkseiten ohne Token sagen das, statt ein Formular zu zeigen", async ({ page }) => {
  await page.goto("/passwort-zuruecksetzen");
  await expect(page.getByRole("heading", { name: "Neues Passwort setzen" })).toBeVisible();
  await expect(page.getByText("kein Token")).toBeVisible();

  await page.goto("/email-bestaetigen");
  await expect(page.getByRole("heading", { name: "E-Mail-Adresse bestätigen" })).toBeVisible();
  await expect(page.getByText("kein Token")).toBeVisible();
});
