import { expect, test } from "@playwright/test";

/**
 * Keine Tracker, keine Drittanbieter (ToDo 10.4).
 *
 * Das einmal zu prüfen genügt nicht: Eine eingebundene Schriftart, ein
 * Kartenanbieter, ein Fehler-Monitoring – jedes davon holt sich beim
 * Einbauen nebenbei eine fremde Verbindung, und niemand merkt es. Deshalb
 * steht die Zusage hier als Test und nicht nur in der
 * Datenschutzerklärung.
 */

/** Wohin die App fragen darf – und sonst nirgendwohin. */
const ERLAUBTE_HOSTS = [
  /^localhost(:\d+)?$/u,
  /^127\.0\.0\.1(:\d+)?$/u,
  // Kartenkacheln, ohne die es keine Karte gibt. Die Attribution steht sichtbar.
  /^([a-z]\.)?tile\.openstreetmap\.org$/u,
];

test("fragt keine fremden Dienste und setzt keine Tracker", async ({ page, context }) => {
  await context.grantPermissions(["geolocation"]);
  await context.setGeolocation({ latitude: 50.938, longitude: 6.9551 });

  const fremde = new Set<string>();
  page.on("request", (request) => {
    const host = new URL(request.url()).host;
    if (!ERLAUBTE_HOSTS.some((muster) => muster.test(host))) fremde.add(host);
  });

  await page.goto("/");
  await expect(page.locator(".leaflet-marker-icon").first()).toBeVisible();

  // Durch alle erreichbaren Ansichten, damit auch nachgeladene Teile erfasst
  // werden. Der Reiter „Liste" ist seit 2026-10-10 ausgeblendet.
  await page.getByRole("tab", { name: "Einstellungen" }).click();
  await page.getByRole("tab", { name: "Karte" }).click();

  /*
   * Die Zielsuche gehört hierher, weil sie den einzigen Weg nach außen
   * enthält: Nominatim. Sie läuft über `/api/geocode`, also über unseren
   * Server – aus dem Browser darf keine Verbindung zu nominatim.org gehen.
   * Genau das würde ein direkter Aufruf aus der Komponente auslösen, und es
   * fiele niemandem auf.
   */
  await page.getByRole("button", { name: /Wohin willst du/ }).click();
  await page.getByRole("combobox").fill("Köln Hauptbahnhof");
  await expect(page.getByRole("option").first()).toBeVisible();

  expect([...fremde]).toEqual([]);

  /*
   * Im Browser gespeichert werden darf nur, was die App zum Arbeiten
   * braucht: Darstellung, Karten-App, zuletzt gesuchte Ziele. Alles davon
   * bleibt auf dem Gerät und hat nichts mit Wiedererkennung zu tun.
   */
  const schluessel = await page.evaluate(() => Object.keys(localStorage));
  const fremdeSchluessel = schluessel.filter((key) => !key.startsWith("wheelee-"));
  expect(fremdeSchluessel).toEqual([]);

  /*
   * Cookies: Im Entwicklungsbetrieb setzt Next.js einen für das Nachladen.
   *
   * Die App kennt zwei eigene Cookies, beide erst auf eine Handlung hin: das
   * Sitzungstoken nach dem Anmelden (seit 2026-10-11) und `wheelee-lang`, sobald
   * jemand eine Sprache wählt (15.5). Dieser Durchlauf meldet sich nirgends an
   * und wählt nichts – es darf hier also keines geben. Das ist der eigentliche
   * Punkt der Prüfung: Wer die App nur benutzt, bekommt nichts gesetzt, und
   * ein Cookie, das schon vor der Anmeldung käme, wäre eine Wiedererkennung
   * ohne Anlass.
   */
  const cookies = (await context.cookies()).filter(
    (cookie) => !cookie.name.startsWith("__next_hmr"),
  );
  expect(cookies).toEqual([]);
});
