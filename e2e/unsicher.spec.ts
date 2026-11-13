import { expect, test } from "@playwright/test";
import { herkunft } from "./herkunft";

/**
 * Unsichere Parkplätze, Schwellen und das Melden eines fehlenden Platzes
 * (ToDo 8.11).
 *
 * **Was hier wirklich geprüft wird: die Grenzen.** Diese Änderung kann Daten
 * aus der App entfernen und neue hineinschreiben – beides auf Zuruf von
 * Nutzer:innen. Die Prüfungen dafür sitzen auf dem Server, und ein
 * abgeschaltetes Formular ist keine davon. Geprüft werden deshalb
 * vor allem die Endpunkte, dazu der sichtbare Hinweis vor dem Navigieren.
 */

/** Köln, nahe der Domplatte – dort liegen genug Parkplätze. */
const KOELN = { latitude: 50.938, longitude: 6.9551 };

const KONTO = {
  email: `melden-${Date.now()}@example.de`,
  password: "ein gutes langes Passwort",
};

/** Die Entwicklerleiste von Next fängt sonst Klicks ab. */
async function devLeisteDurchklickbarMachen(page: import("@playwright/test").Page) {
  await page.addStyleTag({ content: "nextjs-portal { pointer-events: none; }" });
}

test.describe("Unsichere Parkplätze", () => {
  test.beforeAll(async ({ playwright, baseURL }) => {
    const api = await playwright.request.newContext({ baseURL });
    const angelegt = await api.post("/api/auth/register", { data: KONTO, headers: herkunft() });
    expect(angelegt.status()).toBe(200);
    await api.dispose();
  });

  test.beforeEach(async ({ context }) => {
    await context.grantPermissions(["geolocation"]);
    await context.setGeolocation(KOELN);
  });

  test("melden geht nicht ohne Konto – und das entscheidet der Server", async ({ request }) => {
    const antwort = await request.post("/api/spots/melden", {
      data: { label: "Teststraße 1", lat: 50.938, lng: 6.9551 },
      headers: herkunft(),
    });

    expect(antwort.status()).toBe(401);
  });

  test("die Schwellen sind nur für Administratoren zu sehen und zu ändern", async ({ request }) => {
    /*
     * Diese zwei Zahlen entscheiden, wie leicht ein Parkplatz verschwindet.
     * Wer sie setzen kann, kann die Karte leeren – deshalb 401 für alle
     * anderen, und zwar auf **beiden** Wegen.
     */
    expect((await request.get("/api/admin/schwellen")).status()).toBe(401);
    expect(
      (
        await request.post("/api/admin/schwellen", {
          data: { schwelleUnsicher: 1, schwelleSicher: 1 },
          headers: herkunft(),
        })
      ).status(),
    ).toBe(401);
  });

  test("auch die Liste der gemeldeten Plätze ist geschützt", async ({ request }) => {
    expect((await request.get("/api/admin/gemeldet")).status()).toBe(401);
  });

  test("ein Punkt weit außerhalb wird keiner Gemeinde zugeschlagen", async ({
    playwright,
    baseURL,
  }) => {
    /*
     * Ohne diese Prüfung bekäme ein Punkt mitten im Atlantik die am wenigsten
     * weit entfernte Gemeinde zugewiesen – und stünde dann unter ihrem Namen
     * in der Städteliste. Geraten wird hier nichts.
     */
    const api = await playwright.request.newContext({ baseURL });
    await api.post("/api/auth/login", { data: KONTO, headers: herkunft() });

    const antwort = await api.post("/api/spots/melden", {
      data: { label: "Mitten im Nirgendwo", lat: 0, lng: 0 },
      headers: herkunft(),
    });
    expect(antwort.status()).toBe(400);

    await api.dispose();
  });

  test("ein gemeldeter Parkplatz steht sofort auf der Karte und ist als unsicher gekennzeichnet", async ({
    playwright,
    baseURL,
  }) => {
    const api = await playwright.request.newContext({ baseURL });
    const angemeldet = await api.post("/api/auth/login", { data: KONTO, headers: herkunft() });
    expect(angemeldet.status()).toBe(200);

    const gemeldet = await api.post("/api/spots/melden", {
      data: { label: "Teststraße 99", lat: KOELN.latitude, lng: KOELN.longitude, spotCount: 2 },
      headers: herkunft(),
    });
    expect(gemeldet.status()).toBe(201);
    const { spotId } = (await gemeldet.json()) as { spotId: string };

    // **Sofort sichtbar**, ohne Freigabe – das ist die Entscheidung dahinter.
    const abgerufen = await api.get(`/api/spots?id=${encodeURIComponent(spotId)}`);
    expect(abgerufen.status()).toBe(200);
    const { spot } = (await abgerufen.json()) as {
      spot: { origin?: string; spotCount: number; label: string };
    };
    expect(spot.label).toBe("Teststraße 99");
    expect(spot.spotCount).toBe(2);
    // Und gekennzeichnet: daran hängen der Hinweis und die niedrige Schwelle.
    expect(spot.origin).toBe("gemeldet");

    // Die Zählerstände nennen jetzt auch, was eine Stimme bewirken würde.
    const bewertungen = await api.get(`/api/spots/${encodeURIComponent(spotId)}/ratings`);
    const { uncertain, threshold } = (await bewertungen.json()) as {
      uncertain: boolean;
      threshold: number;
    };
    expect(uncertain).toBe(true);
    expect(threshold).toBeGreaterThanOrEqual(1);

    await api.dispose();
  });

  test("der Knopf zum Melden steht auf der Karte und verlangt ein Konto", async ({ page }) => {
    await page.goto("/");
    await devLeisteDurchklickbarMachen(page);

    await page.getByRole("button", { name: "Parkplatz melden" }).click();

    const formular = page.getByRole("region", { name: "Fehlenden Parkplatz melden" });
    await expect(formular).toBeVisible();
    // Ohne Konto steht hier der Grund, nicht ein leeres Formular.
    await expect(formular.getByText(/ist ein Konto nötig/u)).toBeVisible();
  });

  test("vor dem Navigieren steht der Hinweis, wenn der Platz unsicher ist", async ({ page }) => {
    /*
     * Der Hinweis muss **über** dem Knopf in die Karten-App stehen: Wer dort
     * angekommen ist, fährt im nächsten Moment los.
     *
     * **Der unsichere Platz wird für diesen Test selbst angelegt**, und zwar
     * genau auf dem Standort. Sonst hinge der Test daran, ob gerade einer im
     * Ausschnitt liegt – und ein Test, der sich je nach Datenlage selbst
     * überspringt, prüft irgendwann nichts mehr. Ein eigener Platz in null
     * Metern Entfernung ist der nächstgelegene und damit der, den „Details"
     * öffnet.
     *
     * `page.request` teilt die Cookies mit der Seite: Die Anmeldung hier gilt
     * also auch für den Browser daneben.
     */
    /*
     * **Eigene Stelle und eigener Name, und das ist eine Lehre aus dem ersten
     * Lauf.** Zuerst lag der gemeldete Platz genau auf dem Standort aus
     * `beforeEach` – damit war er zwar der nächste, aber gleich weit entfernt
     * wie die Plätze der anderen Tests, die dieselbe Stelle benutzen. Im
     * vollen Lauf stand dann ein Platz aus Hamburg im Vorschlag: Die
     * Standortfreigabe war noch nicht da, und die Karte zeigte die
     * Vorgabestadt. Jetzt hat dieser Test seine eigene Stelle, seinen eigenen
     * Namen – und er **wartet auf den Namen**, statt auf „der erste Knopf wird
     * schon der richtige sein" zu hoffen.
     */
    const name = `Hinweisstraße ${Date.now()}`;
    const stelle = { lat: KOELN.latitude + 0.004, lng: KOELN.longitude + 0.004 };
    await page.context().setGeolocation({ latitude: stelle.lat, longitude: stelle.lng });

    await page.request.post("/api/auth/login", { data: KONTO, headers: herkunft() });
    const gemeldet = await page.request.post("/api/spots/melden", {
      data: { label: name, lat: stelle.lat, lng: stelle.lng, spotCount: 1 },
      headers: herkunft(),
    });
    expect(gemeldet.status()).toBe(201);

    await page.goto("/");
    await devLeisteDurchklickbarMachen(page);

    // Warten, bis der Vorschlag **dieser** Platz ist: Das schließt die
    // Standortfreigabe und die Kartenabfrage mit ein, ohne eine Wartezeit zu
    // raten.
    await expect(page.getByRole("button", { name: new RegExp(name, "u") })).toBeVisible();
    await page.getByRole("button", { name: "Details" }).first().click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("heading", { name: new RegExp(name, "u") })).toBeVisible();

    const hinweis = dialog.getByRole("region", { name: /Unsicherer Parkplatz/u });
    await expect(hinweis).toBeVisible();
    await expect(hinweis.getByText(/nicht gesichert/u)).toBeVisible();

    /*
     * Und jetzt die Reihenfolge: Der Hinweis steht **vor** dem Knopf in die
     * Karten-App. Geprüft über die Position im Baum, nicht über Pixel – eine
     * Prüfung auf Koordinaten wäre bei einem scrollbaren Blatt wacklig.
     */
    const reihenfolge = await dialog.evaluate((node) => {
      const warnung = node.querySelector("#spot-uncertain-title");
      const link = node.querySelector("a[target='_blank']");
      if (!warnung || !link) return null;
      // 4 = DOCUMENT_POSITION_FOLLOWING: Der Link kommt nach der Warnung.
      return Boolean(warnung.compareDocumentPosition(link) & 4);
    });
    expect(reihenfolge).toBe(true);
  });
});
