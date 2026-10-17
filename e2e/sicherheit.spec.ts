import { expect, test } from "@playwright/test";

/**
 * Sicherheits-Kopfzeilen (ToDo 10.3).
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
