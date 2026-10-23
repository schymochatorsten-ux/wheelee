import { expect, test } from "@playwright/test";

/**
 * Sicherheits-Kopfzeilen (ToDo 10.6, bis zum 2026-10-20 als 10.3 geführt –
 * das war eine Doppelbelegung mit der Lizenz- und Attributionsfrage).
 *
 * **Warum als Test und nicht nur als Konfiguration:** Eine Kopfzeile, die
 * niemand prüft, ist beim nächsten Umbau still verschwunden – genau wie die
 * Zugangsprüfung in `rueckmeldungen.spec.ts`. Der Unterschied zu einem Fehler
 * im Ablauf ist, dass hier **nichts kaputtgeht**: Die App funktioniert ohne
 * jede dieser Zeilen tadellos. Nur der Schutz ist weg, und das sieht man nicht.
 *
 * Geprüft wird gegen den Entwicklungsserver, weil die E2E-Tests dort laufen.
 * Die beiden Lockerungen, die nur dort gelten (`'unsafe-eval'` und `ws:` für
 * das Nachladen), sind deshalb ausdrücklich erlaubt – aber nur sie.
 */

test.describe("Sicherheits-Kopfzeilen", () => {
  test("die Seite liefert alle erwarteten Kopfzeilen aus", async ({ request }) => {
    const antwort = await request.get("/");
    const header = antwort.headers();

    expect(header["x-content-type-options"]).toBe("nosniff");
    expect(header["x-frame-options"]).toBe("DENY");
    expect(header["referrer-policy"]).toBe("strict-origin-when-cross-origin");
    expect(header["strict-transport-security"]).toContain("max-age=");

    // Die App braucht genau eine Gerätefunktion. Alles andere steht
    // ausdrücklich auf leer, damit ein späterer Einbau nicht stillschweigend
    // Zugriff bekommt.
    expect(header["permissions-policy"]).toContain("geolocation=(self)");
    expect(header["permissions-policy"]).toContain("camera=()");
  });

  test("die Inhaltsrichtlinie verbietet fremde Herkunft und fremde Rahmen", async ({ request }) => {
    const csp = (await request.get("/")).headers()["content-security-policy"];
    expect(csp).toBeTruthy();

    expect(csp).toContain("default-src 'self'");

    /*
     * **Die Seite darf in keinen fremden Rahmen.** Bei einer Karten-App ist
     * das nicht theoretisch: Wer sie unsichtbar über eine andere Seite legt,
     * kann Klicks auf Knöpfe lenken, die Standortfreigabe oder Navigation
     * auslösen.
     */
    expect(csp).toContain("frame-ancestors 'none'");

    // Der Browser spricht nur mit dem eigenen Server. Die Ortssuche läuft über
    // `/api/geocode`; eine direkte Verbindung zu Nominatim wäre ein Verstoß.
    expect(csp).toMatch(/connect-src 'self'/u);
    expect(csp).not.toContain("connect-src *");

    // Kartenkacheln sind die einzige erlaubte fremde Herkunft überhaupt.
    expect(csp).toContain("https://tile.openstreetmap.org");

    // Kein fremder Skript-Server – das ist der Weg, über den ein
    // Analysewerkzeug oder eine kompromittierte CDN-Adresse hereinkäme.
    const scriptSrc = /script-src ([^;]+)/u.exec(csp ?? "")?.[1] ?? "";
    expect(scriptSrc).not.toMatch(/https?:\/\//u);
  });

  test("Skripte laufen nur mit Nonce, und die ist je Anfrage neu (ToDo 10.7)", async ({
    request,
  }) => {
    const erste = await request.get("/");
    const zweite = await request.get("/");
    const nonce = (antwort: typeof erste) =>
      /script-src [^;]*'nonce-([^']+)'/u.exec(
        antwort.headers()["content-security-policy"] ?? "",
      )?.[1];

    const a = nonce(erste);
    const b = nonce(zweite);
    expect(a).toBeTruthy();
    expect(b).toBeTruthy();
    expect(a).not.toBe(b);

    const csp = erste.headers()["content-security-policy"] ?? "";
    expect(/script-src ([^;]+)/u.exec(csp)?.[1]).not.toContain("'unsafe-inline'");

    // Jedes Skript im ausgelieferten HTML trägt die Nonce dieser Antwort – das
    // Theme-Skript ebenso wie Nexts Hydrationsdaten.
    const html = await erste.text();
    const skripte = [...html.matchAll(/<script\b([^>]*)>/gu)].map((treffer) => treffer[1]);
    expect(skripte.length).toBeGreaterThan(0);
    const inline = skripte.filter((attribute) => !/\bsrc=/u.test(attribute));
    expect(inline.length).toBeGreaterThan(0);
    for (const attribute of inline) expect(attribute).toContain(`nonce="${a}"`);
  });

  test("die Seite startet unter der Richtlinie ohne Verstoß", async ({ page }) => {
    const verstoesse: string[] = [];
    page.on("console", (nachricht) => {
      if (/Content Security Policy|Refused to/u.test(nachricht.text())) {
        verstoesse.push(nachricht.text());
      }
    });

    await page.goto("/");
    // Das Theme-Skript hat vor dem ersten Zeichnen gelaufen, die Hydration auch.
    await expect(page.locator("html")).toHaveAttribute("data-theme", /.+/u);
    await expect(page.getByRole("tab").first()).toBeVisible();

    expect(verstoesse).toEqual([]);
  });

  test("der Service Worker bekommt keine Inhaltsrichtlinie, aber die übrigen Zeilen", async ({
    request,
  }) => {
    /*
     * Die CSP eines Service-Worker-Skripts gilt für den Worker selbst. Unter
     * `connect-src 'self'` könnte er keine Kartenkacheln mehr holen – im
     * Funkloch gäbe es dann eine Liste statt einer Karte, also die Hälfte
     * dessen, wofür er gebaut wurde.
     */
    const antwort = await request.get("/sw.js");
    expect(antwort.status()).toBe(200);

    const header = antwort.headers();
    expect(header["content-security-policy"]).toBeUndefined();
    expect(header["x-content-type-options"]).toBe("nosniff");
  });

  test("auch die Schnittstellen sind abgedeckt", async ({ request }) => {
    // Die Regel gilt für alle Pfade, nicht nur für die Startseite. Eine
    // Antwort der Schnittstelle ohne `nosniff` wäre eine Lücke an der Stelle,
    // an der Fremddaten zurückgegeben werden.
    const header = (await request.get("/api/spots?lat=50.94&lng=6.96&limit=1")).headers();
    expect(header["x-content-type-options"]).toBe("nosniff");
  });
});
