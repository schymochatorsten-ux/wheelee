import { DatabaseSync } from "node:sqlite";
import path from "node:path";
import { expect, test, type APIRequestContext, type Page } from "@playwright/test";
import { herkunft } from "./herkunft";

/**
 * Einladungen und Benutzerverwaltung (ToDos 18.1–18.3, geprüft unter 18.5).
 *
 * Gesichert wird, was sonst still verschwände:
 *
 * 1. **Die Zugangsprüfung jeder Verwaltungsroute** – ohne Anmeldung und mit
 *    einem normalen Konto. Sie sitzt auf dem Server; eine nur im Browser
 *    versteckte Ansicht ist keine Sperre.
 * 2. **Der Weg einer Einladung** von der Verwaltung bis zum fertigen Konto, mit
 *    dem Token im Fragment des Links.
 * 3. **Der Schutz des letzten Admin-Kontos.**
 *
 * **Einen Admin gibt es nur über die Datenbank.** Ein neues Konto ist ein
 * normales; das Recht kommt von einem anderen Admin oder aus `ADMIN_EMAILS`.
 * Der Test setzt die Rolle deshalb direkt in der Datei des Entwicklungsservers
 * (`UPDATE account SET role`). Das geht, weil `isAdmin` bei jeder Anfrage aus
 * der Datenbank gelesen wird – und es hängt nicht davon ab, mit welcher
 * Umgebung ein bereits laufender Server gestartet wurde.
 *
 * Die Registrierung ist auf fünf je Stunde und Herkunft gedrosselt
 * (`LIMITS.register`), die anderen Tests brauchen sie auch. Jeder Aufruf hier
 * gibt sich deshalb eine eigene Herkunft (`x-forwarded-for`), wie es hinter dem
 * Proxy in Betrieb ebenfalls der Fall ist.
 */

const PASSWORT = "ein gutes langes Passwort";

const eindeutig = () => `${Date.now()}-${Math.floor(Math.random() * 1e6)}`;

function datenbank(): DatabaseSync {
  const datei =
    process.env.WHEELEE_DB_PATH?.trim() || path.join(process.cwd(), ".data", "wheelee.sqlite");
  const db = new DatabaseSync(datei);
  db.exec("PRAGMA busy_timeout = 5000");
  return db;
}

/** Ein angemeldetes Konto mit Admin-Recht. Liefert die Adresse. */
async function adminAnlegen(api: APIRequestContext): Promise<string> {
  const adresse = `e2e-admin-${eindeutig()}@example.org`;
  const angelegt = await api.post("/api/auth/register", {
    data: { email: adresse, password: PASSWORT },
    headers: herkunft(),
  });
  expect(angelegt.status()).toBe(200);

  const db = datenbank();
  try {
    db.prepare("UPDATE account SET role = 'admin' WHERE email = ?").run(adresse);
  } finally {
    db.close();
  }
  return adresse;
}

/** Eine Einladung über die Schnittstelle erzeugen. */
async function einladen(api: APIRequestContext, email: string, role = "user") {
  const antwort = await api.post("/api/admin/invitations", { data: { email, role } });
  expect(antwort.status()).toBe(201);
  return (await antwort.json()) as { token: string; path: string; email: string };
}

async function verwaltungOeffnen(page: Page) {
  await page.goto("/");
  await page.getByRole("tab", { name: "Rückmeldungen" }).click();
  await expect(page.getByRole("heading", { name: "Benutzer und Einladungen" })).toBeVisible();
}

test.describe("Zugang zu den Verwaltungsrouten", () => {
  const ROUTEN: [string, string][] = [
    ["GET", "/api/admin/accounts"],
    ["PATCH", "/api/admin/accounts/gibt-es-nicht"],
    ["DELETE", "/api/admin/accounts/gibt-es-nicht"],
    ["POST", "/api/admin/invitations"],
    ["DELETE", "/api/admin/invitations/gibt-es-nicht"],
  ];

  async function aufrufen(api: APIRequestContext, methode: string, url: string) {
    return api.fetch(url, { method: methode, data: methode === "GET" ? undefined : {} });
  }

  test("antworten ohne Anmeldung mit 401", async ({ playwright, baseURL }) => {
    const api = await playwright.request.newContext({ baseURL, extraHTTPHeaders: herkunft() });
    for (const [methode, url] of ROUTEN) {
      const antwort = await aufrufen(api, methode, url);
      expect(antwort.status(), `${methode} ${url}`).toBe(401);
    }
    await api.dispose();
  });

  test("antworten einem normalen Konto ebenfalls mit 401", async ({ playwright, baseURL }) => {
    const api = await playwright.request.newContext({ baseURL, extraHTTPHeaders: herkunft() });
    const angelegt = await api.post("/api/auth/register", {
      data: { email: `e2e-nutzer-${eindeutig()}@example.org`, password: PASSWORT },
    });
    expect(angelegt.status()).toBe(200);

    for (const [methode, url] of ROUTEN) {
      const antwort = await aufrufen(api, methode, url);
      expect(antwort.status(), `${methode} ${url}`).toBe(401);
    }
    await api.dispose();
  });

  test("eine unbekannte Einladung wird abgelehnt, ohne etwas zu verraten", async ({
    playwright,
    baseURL,
  }) => {
    const api = await playwright.request.newContext({ baseURL, extraHTTPHeaders: herkunft() });
    const antwort = await api.post("/api/auth/invitation", {
      data: { token: "irgendwas", password: PASSWORT },
    });
    expect(antwort.status()).toBe(400);
    expect(await antwort.text()).toMatch(/ungültig, abgelaufen oder schon benutzt/u);
    await api.dispose();
  });
});

test.describe("Einladung", () => {
  test("führt von der Verwaltung zum fertigen Konto – und lässt sich nur einmal einlösen", async ({
    page,
    baseURL,
  }) => {
    // Der Admin meldet sich im Browser an (Cookie im selben Kontext).
    const adresseAdmin = await adminAnlegen(page.request);
    await verwaltungOeffnen(page);

    const eingeladen = `e2e-neu-${eindeutig()}@example.org`;
    await page.getByLabel("E-Mail-Adresse der Einladung").fill(eingeladen);
    await page.getByLabel("Rolle").selectOption("user");
    await page.getByRole("button", { name: "Einladungslink erzeugen" }).click();

    // Der Link wird angezeigt – einmal – und führt zur Einladungsseite.
    const feld = page.getByRole("textbox", { name: "Link kopieren" });
    await expect(feld).toBeVisible();
    const link = await feld.inputValue();
    expect(link).toMatch(/\/einladung#[\w-]{40,}$/u);

    // Die Einladung steht offen in der Liste, samt Adresse.
    await expect(page.getByText(eingeladen).last()).toBeVisible();
    await expect(page.getByText(/offen/u).first()).toBeVisible();

    // Eingelöst wird in einem frischen Kontext ohne Anmeldung.
    const kontext = await page.context().browser()!.newContext({ locale: "de-DE", baseURL });
    const gast = await kontext.newPage();
    await gast.goto(link);
    await expect(gast.getByRole("heading", { name: "Einladung annehmen" })).toBeVisible();

    // Das Token verschwindet aus der Adresszeile (Verlauf, Lesezeichen).
    await expect(gast).toHaveURL(/\/einladung$/u);

    await gast.getByLabel("Passwort").fill(PASSWORT);
    await gast.getByRole("button", { name: "Konto anlegen" }).click();
    await expect(gast.getByText("Dein Konto ist angelegt, du bist angemeldet.")).toBeVisible();

    // Zweiter Versuch mit demselben Link: abgelehnt.
    const zweiter = await kontext.newPage();
    await zweiter.goto(link);
    await zweiter.getByLabel("Passwort").fill(PASSWORT);
    await zweiter.getByRole("button", { name: "Konto anlegen" }).click();
    // Nicht über \`role="alert"\`: Next hat selbst einen Routen-Ansager mit dieser Rolle.
    await expect(zweiter.getByText(/ungültig, abgelaufen oder schon benutzt/u)).toBeVisible();
    await kontext.close();

    // Und die Verwaltung zeigt die Einladung nun als eingelöst.
    await verwaltungOeffnen(page);
    await expect(page.getByText(/eingelöst/u).first()).toBeVisible();
    expect(adresseAdmin).toContain("e2e-admin-");
  });

  test("ein zu schwaches Passwort verbraucht die Einladung nicht", async ({
    playwright,
    baseURL,
  }) => {
    const admin = await playwright.request.newContext({ baseURL, extraHTTPHeaders: herkunft() });
    await adminAnlegen(admin);
    const einladung = await einladen(admin, `e2e-schwach-${eindeutig()}@example.org`);

    const gast = await playwright.request.newContext({ baseURL, extraHTTPHeaders: herkunft() });
    const zuKurz = await gast.post("/api/auth/invitation", {
      data: { token: einladung.token, password: "kurz" },
    });
    expect(zuKurz.status()).toBe(400);

    const richtig = await gast.post("/api/auth/invitation", {
      data: { token: einladung.token, password: PASSWORT },
    });
    expect(richtig.status()).toBe(200);
    await admin.dispose();
    await gast.dispose();
  });

  test("eine zurückgezogene Einladung lässt sich nicht einlösen", async ({
    playwright,
    baseURL,
  }) => {
    const admin = await playwright.request.newContext({ baseURL, extraHTTPHeaders: herkunft() });
    await adminAnlegen(admin);
    const adresse = `e2e-zurueck-${eindeutig()}@example.org`;
    const einladung = await einladen(admin, adresse);

    const liste = await (await admin.get("/api/admin/accounts")).json();
    const eintrag = liste.invitations.find((i: { email: string }) => i.email === adresse);
    expect((await admin.delete(`/api/admin/invitations/${eintrag.id}`)).status()).toBe(200);

    const gast = await playwright.request.newContext({ baseURL, extraHTTPHeaders: herkunft() });
    const antwort = await gast.post("/api/auth/invitation", {
      data: { token: einladung.token, password: PASSWORT },
    });
    expect(antwort.status()).toBe(400);
    await admin.dispose();
    await gast.dispose();
  });
});

test.describe("Verwaltung", () => {
  test("liefert weder Passwort-Hash noch Token", async ({ playwright, baseURL }) => {
    const admin = await playwright.request.newContext({ baseURL, extraHTTPHeaders: herkunft() });
    await adminAnlegen(admin);
    const einladung = await einladen(admin, `e2e-geheim-${eindeutig()}@example.org`);

    const text = await (await admin.get("/api/admin/accounts")).text();
    expect(text).not.toContain("scrypt");
    expect(text).not.toContain("password");
    expect(text).not.toContain(einladung.token);
    await admin.dispose();
  });

  test("die Kontenliste ist begrenzt, durchsuchbar und zählt die Treffer (ToDo 18.6)", async ({
    playwright,
    baseURL,
  }) => {
    const admin = await playwright.request.newContext({ baseURL, extraHTTPHeaders: herkunft() });
    const adresse = await adminAnlegen(admin);

    const knapp = await (await admin.get("/api/admin/accounts?limit=1")).json();
    expect(knapp.accounts).toHaveLength(1);
    expect(knapp.total).toBeGreaterThanOrEqual(1);
    // Ohne Angabe: eine Seite, nie mehr als die Obergrenze – auch bei absurdem Wunsch.
    const standard = await (await admin.get("/api/admin/accounts")).json();
    expect(standard.accounts.length).toBeLessThanOrEqual(25);
    const riesig = await (await admin.get("/api/admin/accounts?limit=100000")).json();
    expect(riesig.accounts.length).toBeLessThanOrEqual(200);
    // Admins stehen vorn.
    expect(standard.accounts[0].role).toBe("admin");

    // Suche: Teil der Adresse, Groß-/Kleinschreibung egal.
    const treffer = await (
      await admin.get(`/api/admin/accounts?q=${encodeURIComponent(adresse.toUpperCase())}`)
    ).json();
    expect(treffer.total).toBe(1);
    expect(treffer.accounts.map((a: { email: string }) => a.email)).toEqual([adresse]);

    // Sonderzeichen der Mustersuche sind keine: „%“ trifft keine Adresse.
    const muster = await (await admin.get("/api/admin/accounts?q=%25")).json();
    expect(muster.total).toBe(0);
    await admin.dispose();
  });

  test("die Oberfläche sucht in den Konten und zeigt, wie viele es sind (ToDo 18.6)", async ({
    page,
  }) => {
    const adresse = await adminAnlegen(page.request);
    await verwaltungOeffnen(page);

    await page.getByLabel("Konten suchen (Teil der E-Mail-Adresse)").fill(adresse);
    await expect(page.getByText("1 von 1 Konten – Admins und gesperrte zuerst")).toBeVisible();
    await expect(page.getByRole("button", { name: "Weitere Konten anzeigen" })).toHaveCount(0);

    await page.getByLabel("Konten suchen (Teil der E-Mail-Adresse)").fill("gibt-es-nicht-xyz");
    await expect(page.getByText("Kein Konto passt zur Suche.")).toBeVisible();
  });

  test("das eigene Konto lässt sich in der Verwaltung nicht löschen", async ({
    playwright,
    baseURL,
  }) => {
    // Der Schutz des letzten Admin-Kontos (Herabstufen, Sperren, Löschen) ist in
    // `admin.test.ts` und `roles.test.ts` gesichert. Hier nicht: Dafür müssten
    // alle anderen Admins der Entwicklungsdatenbank herabgestuft werden, und das
    // träfe auch das Konto, mit dem jemand gerade arbeitet.
    const admin = await playwright.request.newContext({ baseURL, extraHTTPHeaders: herkunft() });
    const adresse = await adminAnlegen(admin);
    // Gesucht wird nach der Adresse: Die Liste ist seit 18.6 begrenzt.
    const liste = await (
      await admin.get(`/api/admin/accounts?q=${encodeURIComponent(adresse)}`)
    ).json();
    const ich = liste.accounts.find((a: { email: string }) => a.email === adresse);
    expect(ich.isYou).toBe(true);

    expect((await admin.delete(`/api/admin/accounts/${ich.id}`)).status()).toBe(409);
    // Der Zugang besteht weiter.
    expect((await admin.get("/api/admin/accounts")).status()).toBe(200);
    await admin.dispose();
  });
});
