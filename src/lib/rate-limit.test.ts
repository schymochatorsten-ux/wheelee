import { beforeEach, describe, expect, it } from "vitest";
import { allow, clientKey, resetLimits } from "./rate-limit";

/**
 * Die Drosselung (ToDos 17.2, D-03).
 *
 * Geprüft wird mit einer **übergebenen Uhrzeit** statt mit Wartezeiten: Ein
 * Test, der zehn Minuten schläft, wird abgeschaltet.
 */

beforeEach(() => resetLimits());

const limit = { max: 3, windowMs: 1_000 };

describe("allow", () => {
  it("lässt bis zur Grenze durch und dann nicht mehr", () => {
    expect(allow("a", limit, 0)).toBe(true);
    expect(allow("a", limit, 1)).toBe(true);
    expect(allow("a", limit, 2)).toBe(true);
    expect(allow("a", limit, 3)).toBe(false);
  });

  it("zählt Schlüssel getrennt", () => {
    // Sonst sperrt ein Vielschreiber alle anderen mit aus.
    expect(allow("a", limit, 0)).toBe(true);
    expect(allow("a", limit, 0)).toBe(true);
    expect(allow("a", limit, 0)).toBe(true);
    expect(allow("a", limit, 0)).toBe(false);
    expect(allow("b", limit, 0)).toBe(true);
  });

  it("gibt nach Ablauf des Fensters wieder frei", () => {
    for (let i = 0; i < 3; i += 1) expect(allow("a", limit, 0)).toBe(true);
    expect(allow("a", limit, 999)).toBe(false);
    expect(allow("a", limit, 1_001)).toBe(true);
  });

  it("zählt abgelehnte Versuche mit", () => {
    /*
     * Der wichtigste Fall, und der am leichtesten falsch gebaute: Zählte ein
     * abgelehnter Versuch **nicht** mit, dürfte ein Dauerbeschuss unmittelbar
     * nach Ablauf des Fensters wieder die volle Menge schicken. So aber
     * belegen die abgelehnten Versuche die Plätze weiter, und wer durchgehend
     * hämmert, bleibt durchgehend ausgebremst.
     */
    for (let i = 0; i < 3; i += 1) expect(allow("a", limit, 0)).toBe(true);

    // Hämmert weiter, während er abgelehnt wird.
    for (const t of [200, 400, 600, 800, 900]) expect(allow("a", limit, t)).toBe(false);

    // Kurz nach Ablauf der ersten drei Versuche: trotzdem noch gesperrt, denn
    // die abgelehnten von 600 bis 900 liegen im Fenster.
    expect(allow("a", limit, 1_050)).toBe(false);

    // Erst wenn wirklich Ruhe war, geht es weiter.
    expect(allow("a", limit, 2_500)).toBe(true);
  });

  it("gleitet, statt zum Fensterwechsel zurückzusetzen", () => {
    /*
     * Ein Zähler je Kalenderfenster – „drei pro Sekunde, Zähler bei jeder
     * neuen Sekunde auf null" – ließe an der Grenze die doppelte Menge durch:
     * drei am Ende der einen Sekunde, drei am Anfang der nächsten. Hier
     * zählen die drei dicht beieinanderliegenden Versuche weiter, auch wenn
     * die Sekundengrenze dazwischen liegt.
     */
    for (const t of [900, 950, 990]) expect(allow("a", limit, t)).toBe(true);
    expect(allow("a", limit, 1_010)).toBe(false);
  });
});

describe("clientKey", () => {
  const mit = (headers: Record<string, string>) =>
    clientKey(new Request("https://wheelee.de/api/feedback", { headers }));

  it("nimmt den ersten Eintrag aus X-Forwarded-For", () => {
    // Die Kette wird von jedem Proxy hinten angehängt; vorn steht der echte
    // Absender. Hinter dem Nginx Proxy Manager ist das die einzige Stelle, an
    // der er überhaupt steht.
    expect(mit({ "x-forwarded-for": "203.0.113.7, 100.71.71.105" })).toBe("203.0.113.7");
  });

  it("weicht auf X-Real-IP aus", () => {
    expect(mit({ "x-real-ip": "203.0.113.9" })).toBe("203.0.113.9");
  });

  it("liefert einen festen Wert, wenn nichts da ist", () => {
    /*
     * Wichtig, dass hier **nicht** `undefined` oder ein Zufallswert entsteht:
     * Sonst bekäme jede Anfrage ohne diese Kopfzeilen ihren eigenen Zähler,
     * und die Drosselung wäre genau dort wirkungslos, wo sie gebraucht wird.
     */
    expect(mit({})).toBe("unbekannt");
  });
});
