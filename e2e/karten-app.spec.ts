import { expect, test, type APIRequestContext } from "@playwright/test";
import { herkunft } from "./herkunft";

/**
 * Die Karten-App am Konto (ToDo 11.3a).
 *
 * **Über die Schnittstelle und nicht über die Oberfläche**, obwohl es eine
 * Einstellung ist: Geprüft werden soll, dass die Wahl den **Browser** überlebt
 * – also genau das, was eine Sitzung im selben Browser nicht zeigen kann. Der
 * Weg über mehrere Anfragen bildet nach, was auf einem zweiten Gerät geschieht:
 * dort gibt es keinen gefüllten `localStorage`, nur die Anmeldung.
 *
 * **Genau eine Registrierung für die ganze Datei, und das ist kein Geiz.** Die
 * Registrierung ist auf fünf Versuche je Stunde und Herkunft gedrosselt
 * (`LIMITS.register`). Legte jeder Test sein eigenes Konto an, wäre der
 * vollständige Durchlauf nach zwei Wiederholungen innerhalb einer Stunde rot –
 * und zwar an einer Stelle, die mit der Änderung nichts zu tun hat. Dieser
 * Fehlschlag ist hier schon einmal eingetreten (siehe `Erledigt.md`).
 */

const PASSWORT = "ein gutes langes Passwort";

let konto: APIRequestContext;
let adresse: string;

test.beforeAll(async ({ playwright, baseURL }) => {
  adresse = `karten-app-${Date.now()}@example.de`;
  konto = await playwright.request.newContext({ baseURL });

  const angelegt = await konto.post("/api/auth/register", {
    data: { email: adresse, password: PASSWORT },
    headers: herkunft(),
  });
  expect(angelegt.status()).toBe(200);

  // Ein frisches Konto hat keine Wahl getroffen – dann gilt der Browser.
  const daten = (await angelegt.json()) as { user: { mapsPreference: string | null } };
  expect(daten.user.mapsPreference).toBeNull();
});

test.afterAll(async () => {
  await konto.dispose();
});

test("die gewählte Karten-App kommt mit der Anmeldung zurück", async ({ playwright, baseURL }) => {
  expect((await konto.put("/api/account/maps", { data: { preference: "waze" } })).status()).toBe(
    200,
  );

  // Ein zweiter Zugang ohne jeden gespeicherten Zustand – das zweite Gerät.
  const zweitesGeraet = await playwright.request.newContext({ baseURL });
  const anmeldung = await zweitesGeraet.post("/api/auth/login", {
    data: { email: adresse, password: PASSWORT },
  });

  expect(anmeldung.status()).toBe(200);
  const daten = (await anmeldung.json()) as { user: { mapsPreference: string | null } };
  expect(daten.user.mapsPreference).toBe("waze");

  await zweitesGeraet.dispose();
});

test("die gewählte Sprache kommt mit der Anmeldung zurück (ToDo 15.5)", async ({
  playwright,
  baseURL,
}) => {
  expect((await konto.put("/api/account/language", { data: { language: "de" } })).status()).toBe(
    200,
  );

  const zweitesGeraet = await playwright.request.newContext({ baseURL });
  const anmeldung = await zweitesGeraet.post("/api/auth/login", {
    data: { email: adresse, password: PASSWORT },
  });
  const daten = (await anmeldung.json()) as { user: { language: string | null } };
  expect(daten.user.language).toBe("de");
  await zweitesGeraet.dispose();
});

test("eine unbekannte Sprache wird abgewiesen, ohne Anmeldung nichts abgelegt", async ({
  request,
}) => {
  expect((await konto.put("/api/account/language", { data: { language: "xx" } })).status()).toBe(
    400,
  );
  expect((await request.put("/api/account/language", { data: { language: "de" } })).status()).toBe(
    401,
  );
});

test("ohne Anmeldung lässt sich nichts am Konto ablegen", async ({ request }) => {
  const antwort = await request.put("/api/account/maps", { data: { preference: "waze" } });
  expect(antwort.status()).toBe(401);
});

test("eine unbekannte Karten-App wird abgewiesen", async () => {
  // Geprüft wird am Endpunkt, nicht in der Datenbank (siehe Migration 4);
  // ohne diesen Test wäre die Spalte für beliebigen Text offen.
  const antwort = await konto.put("/api/account/maps", { data: { preference: "wunschkarte" } });
  expect(antwort.status()).toBe(400);
});
