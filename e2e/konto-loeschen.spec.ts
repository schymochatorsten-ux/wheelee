import { expect, test } from "@playwright/test";
import { herkunft } from "./herkunft";

/**
 * Konto löschen und Auskunft (ToDo 11.7).
 *
 * Genau eine Registrierung für die Datei (Drosselung 5/Stunde, siehe
 * `karten-app.spec.ts`).
 */

const PASSWORT = "ein gutes langes Passwort";

test("Auskunft liefert die eigenen Daten, Löschen beendet das Konto", async ({
  playwright,
  baseURL,
}) => {
  const adresse = `loeschen-${Date.now()}@example.de`;
  const konto = await playwright.request.newContext({ baseURL });

  expect(
    (
      await konto.post("/api/auth/register", { data: { email: adresse, password: PASSWORT }, headers: herkunft() })
    ).status(),
  ).toBe(200);
  await konto.put("/api/account/maps", { data: { preference: "waze" } });

  const auskunft = await konto.get("/api/account/export");
  expect(auskunft.status()).toBe(200);
  expect(auskunft.headers()["content-disposition"]).toContain("attachment");
  const daten = (await auskunft.json()) as {
    account: { email: string; mapsPreference: string };
    ratings: unknown[];
    favorites: unknown[];
    feedback: unknown[];
  };
  expect(daten.account.email).toBe(adresse);
  expect(daten.account.mapsPreference).toBe("waze");
  expect(daten.ratings).toEqual([]);
  expect(daten.favorites).toEqual([]);

  // Falsches Passwort: nichts geschieht.
  expect(
    (await konto.delete("/api/account", { data: { password: "falsch falsch falsch" } })).status(),
  ).toBe(403);
  expect((await konto.get("/api/account/export")).status()).toBe(200);

  expect((await konto.delete("/api/account", { data: { password: PASSWORT } })).status()).toBe(200);
  expect((await konto.get("/api/account/export")).status()).toBe(401);

  const danach = await playwright.request.newContext({ baseURL });
  expect(
    (
      await danach.post("/api/auth/login", { data: { email: adresse, password: PASSWORT } })
    ).status(),
  ).toBe(401);

  await Promise.all([konto.dispose(), danach.dispose()]);
});

test("ohne Anmeldung gibt es weder Auskunft noch Löschen", async ({ request }) => {
  expect((await request.get("/api/account/export")).status()).toBe(401);
  expect((await request.delete("/api/account", { data: { password: PASSWORT } })).status()).toBe(
    401,
  );
});
