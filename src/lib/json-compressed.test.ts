import { describe, expect, it } from "vitest";
import { gunzipSync } from "node:zlib";
import { acceptsGzip, jsonCompressed, MIN_GZIP_BYTES } from "./json-compressed";

/**
 * Komprimierte JSON-Antworten (ToDo 12.16).
 *
 * **Was hier wirklich geprüft wird:** dass beim Komprimieren nichts verloren
 * geht und dass niemand gzip bekommt, der es nicht angefragt hat. Das Zweite
 * ist der Fall, der im Betrieb wehtäte – eine Antwort, die ein Zwischenspeicher
 * dem falschen Browser vorsetzt, erscheint dort als Kauderwelsch.
 */

const anfrage = (accept?: string) =>
  new Request("http://wheelee.test/api/spots", {
    headers: accept === undefined ? {} : { "accept-encoding": accept },
  });

/** Groß genug, um über der Grenze zu liegen, und gut komprimierbar. */
const grosseDaten = {
  spots: Array.from({ length: 200 }, (_, i) => ({ id: `koeln-${i}`, lat: 50.9, lng: 6.9 })),
};

describe("acceptsGzip", () => {
  it("erkennt gzip in jeder üblichen Schreibweise", () => {
    expect(acceptsGzip(anfrage("gzip"))).toBe(true);
    expect(acceptsGzip(anfrage("gzip, deflate, br"))).toBe(true);
    expect(acceptsGzip(anfrage("br, gzip;q=0.8"))).toBe(true);
    expect(acceptsGzip(anfrage("*"))).toBe(true);
  });

  it("rät nicht, wenn die Kopfzeile fehlt oder etwas anderes nennt", () => {
    expect(acceptsGzip(anfrage())).toBe(false);
    expect(acceptsGzip(anfrage("identity"))).toBe(false);
    expect(acceptsGzip(anfrage("deflate"))).toBe(false);
    // „gzipfoo" ist nicht gzip – ein Teilstring-Vergleich wäre hier falsch.
    expect(acceptsGzip(anfrage("gzipfoo"))).toBe(false);
  });
});

describe("jsonCompressed", () => {
  it("komprimiert und liefert nach dem Auspacken genau dieselben Daten", async () => {
    const antwort = jsonCompressed(anfrage("gzip"), grosseDaten);
    expect(antwort.headers.get("Content-Encoding")).toBe("gzip");

    const bytes = Buffer.from(await antwort.arrayBuffer());
    expect(JSON.parse(gunzipSync(bytes).toString("utf8"))).toEqual(grosseDaten);
    // Die angekündigte Länge ist die der komprimierten Nutzlast, nicht der rohen.
    expect(Number(antwort.headers.get("Content-Length"))).toBe(bytes.byteLength);
    expect(bytes.byteLength).toBeLessThan(JSON.stringify(grosseDaten).length);
  });

  it("schickt niemandem gzip, der es nicht angefragt hat", async () => {
    for (const accept of [undefined, "identity", "deflate"]) {
      const antwort = jsonCompressed(anfrage(accept), grosseDaten);
      expect(antwort.headers.get("Content-Encoding")).toBeNull();
      expect(await antwort.json()).toEqual(grosseDaten);
    }
  });

  it("lässt kleine Antworten in Ruhe", async () => {
    const klein = { ok: true };
    expect(JSON.stringify(klein).length).toBeLessThan(MIN_GZIP_BYTES);

    const antwort = jsonCompressed(anfrage("gzip"), klein);
    expect(antwort.headers.get("Content-Encoding")).toBeNull();
    expect(await antwort.json()).toEqual(klein);
  });

  /*
   * **In beiden Fällen**, nicht nur im komprimierten: Ohne `Vary` darf ein
   * Zwischenspeicher die eine Antwort für die andere halten, und `/api/spots`
   * trägt `Cache-Control: public`.
   */
  it("nennt Accept-Encoding als Unterscheidung, komprimiert oder nicht", () => {
    expect(jsonCompressed(anfrage("gzip"), grosseDaten).headers.get("Vary")).toContain(
      "Accept-Encoding",
    );
    expect(jsonCompressed(anfrage(), grosseDaten).headers.get("Vary")).toContain("Accept-Encoding");
  });

  it("reicht Status und Kopfzeilen des Aufrufers durch", () => {
    const antwort = jsonCompressed(anfrage("gzip"), grosseDaten, {
      status: 404,
      headers: { "Cache-Control": "no-store" },
    });
    expect(antwort.status).toBe(404);
    expect(antwort.headers.get("Cache-Control")).toBe("no-store");
    expect(antwort.headers.get("Content-Type")).toBe("application/json; charset=utf-8");
  });
});
