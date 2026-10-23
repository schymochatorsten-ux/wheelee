import { expect, test } from "@playwright/test";

/**
 * Passwort ändern und übrige Sitzungen verwerfen (ToDo 10.7).
 *
 * Genau eine Registrierung für die Datei (Drosselung 5/Stunde, siehe
 * `karten-app.spec.ts`).
 */

const ALT = "ein gutes langes Passwort";
const NEU = "ein ganz anderes Passwort";

test("Passwort ändern beendet andere Sitzungen, nicht die eigene", async ({
  playwright,
  baseURL,
}) => {
  const adresse = `passwort-${Date.now()}@example.de`;
  const eigen = await playwright.request.newContext({ baseURL });
  const fremd = await playwright.request.newContext({ baseURL });

  expect(
    (await eigen.post("/api/auth/register", { data: { email: adresse, password: ALT } })).status(),
  ).toBe(200);
  expect(
    (await fremd.post("/api/auth/login", { data: { email: adresse, password: ALT } })).status(),
  ).toBe(200);

  // Falsches bisheriges Passwort: abgelehnt, fremde Sitzung lebt noch.
  const falsch = await eigen.put("/api/account/password", {
    data: { oldPassword: "falsch falsch falsch", newPassword: NEU },
  });
  expect(falsch.status()).toBe(403);
  expect((await fremd.put("/api/account/maps", { data: { preference: "auto" } })).status()).toBe(
    200,
  );

  // Zu kurzes neues Passwort.
  const kurz = await eigen.put("/api/account/password", {
    data: { oldPassword: ALT, newPassword: "kurz" },
  });
  expect(kurz.status()).toBe(400);

  const ok = await eigen.put("/api/account/password", {
    data: { oldPassword: ALT, newPassword: NEU },
  });
  expect(ok.status()).toBe(200);

  // Eigene Sitzung bleibt, fremde ist beendet.
  expect((await eigen.put("/api/account/maps", { data: { preference: "auto" } })).status()).toBe(
    200,
  );
  expect((await fremd.put("/api/account/maps", { data: { preference: "auto" } })).status()).toBe(
    401,
  );

  // Anmelden geht nur noch mit dem neuen Passwort.
  const neu = await playwright.request.newContext({ baseURL });
  expect(
    (await neu.post("/api/auth/login", { data: { email: adresse, password: ALT } })).status(),
  ).toBe(401);
  expect(
    (await neu.post("/api/auth/login", { data: { email: adresse, password: NEU } })).status(),
  ).toBe(200);

  await Promise.all([eigen.dispose(), fremd.dispose(), neu.dispose()]);
});

test("ohne Anmeldung lässt sich das Passwort nicht ändern", async ({ request }) => {
  const antwort = await request.put("/api/account/password", {
    data: { oldPassword: ALT, newPassword: NEU },
  });
  expect(antwort.status()).toBe(401);
});
