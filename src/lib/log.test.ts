import { afterEach, describe, expect, it } from "vitest";
import { errorFields, logEvent, safePath, setLogWriter, withLogging, worthLogging } from "./log";

/**
 * Geprüft wird vor allem das, was **nicht** in einer Zeile stehen darf
 * (ToDo 12.6). Das ist keine Formsache: Die Datenschutzerklärung sagt zu, dass
 * weder IP-Adresse noch Standort in ein Protokoll geraten – eine Zusage, die
 * nur ein Test aufrechterhält, denn ein zusätzliches Feld fällt beim Lesen des
 * Codes nicht auf.
 */

function sammeln() {
  const zeilen: Record<string, unknown>[] = [];
  setLogWriter((line) => zeilen.push(JSON.parse(line) as Record<string, unknown>));
  return zeilen;
}

afterEach(() => setLogWriter(null));

describe("safePath", () => {
  it("behält die Namen der Parameter und wirft die Werte weg", () => {
    expect(safePath("http://x/api/spots?bbox=6.9,50.9,7.0,51.0&limit=2000")).toBe(
      "/api/spots?bbox,limit",
    );
  });

  it("nennt keine Koordinaten", () => {
    const pfad = safePath("http://x/api/spots?lat=50.941&lng=6.958");
    expect(pfad).not.toContain("50.9");
    expect(pfad).not.toContain("6.9");
  });

  it("lässt einen Pfad ohne Parameter unverändert", () => {
    expect(safePath("http://x/api/auth/login")).toBe("/api/auth/login");
  });

  it("nennt jeden Parameternamen einmal, in fester Reihenfolge", () => {
    expect(safePath("http://x/a?b=1&a=2&b=3")).toBe("/a?a,b");
  });
});

describe("logEvent", () => {
  it("schreibt eine Zeile mit Zeit, Stufe und Namen", () => {
    const zeilen = sammeln();
    logEvent("info", "test", { status: 200 });

    expect(zeilen).toHaveLength(1);
    expect(zeilen[0]).toMatchObject({ level: "info", event: "test", status: 200 });
    expect(typeof zeilen[0].time).toBe("string");
  });

  it("ersetzt verbotene Felder, statt sie stillschweigend zu schlucken", () => {
    const zeilen = sammeln();
    logEvent("info", "test", { ip: "203.0.113.7", lat: 50.9, email: "a@b.de" });

    expect(zeilen[0].ip).toBe("[entfernt]");
    expect(zeilen[0].lat).toBe("[entfernt]");
    expect(zeilen[0].email).toBe("[entfernt]");
    expect(JSON.stringify(zeilen[0])).not.toContain("203.0.113.7");
  });
});

describe("errorFields", () => {
  it("nennt Art, Meldung und die obersten Stapelzeilen", () => {
    const felder = errorFields(new TypeError("kaputt"));
    expect(felder.errorName).toBe("TypeError");
    expect(felder.errorMessage).toBe("kaputt");
    expect(String(felder.stack)).toContain("log.test");
  });

  it("verträgt auch das, was kein Fehlerobjekt ist", () => {
    expect(errorFields("nur ein Text")).toMatchObject({
      errorName: "NichtFehler",
      errorMessage: "nur ein Text",
    });
  });
});

describe("worthLogging", () => {
  it("lässt die gewöhnliche Kartenabfrage weg", () => {
    expect(worthLogging("GET", 200, 12)).toBe(false);
  });

  it("vermerkt Fehler, Langsames und jede schreibende Anfrage", () => {
    expect(worthLogging("GET", 404, 5)).toBe(true);
    expect(worthLogging("GET", 200, 2_000)).toBe(true);
    expect(worthLogging("POST", 200, 5)).toBe(true);
  });
});

describe("withLogging", () => {
  it("reicht die Antwort unverändert durch", async () => {
    sammeln();
    const handler = withLogging(() => new Response("hallo", { status: 200 }));
    const antwort = await handler(new Request("http://x/api/spots?bbox=1,2,3,4"));

    expect(antwort.status).toBe(200);
    expect(await antwort.text()).toBe("hallo");
  });

  it("schreibt bei einem Fehlerstatus eine Zeile ohne Parameterwerte", async () => {
    const zeilen = sammeln();
    const handler = withLogging(() => new Response("", { status: 400 }));
    await handler(new Request("http://x/api/spots?bbox=6.9,50.9,7.0,51.0"));

    expect(zeilen).toHaveLength(1);
    expect(zeilen[0]).toMatchObject({ level: "warn", event: "api", status: 400 });
    expect(zeilen[0].path).toBe("/api/spots?bbox");
    expect(JSON.stringify(zeilen[0])).not.toContain("50.9");
  });

  it("vermerkt einen geworfenen Fehler und wirft ihn weiter", async () => {
    const zeilen = sammeln();
    const handler = withLogging(() => {
      throw new Error("Datenbank weg");
    });

    await expect(handler(new Request("http://x/api/feedback", { method: "POST" }))).rejects.toThrow(
      "Datenbank weg",
    );
    expect(zeilen[0]).toMatchObject({
      level: "error",
      event: "api-fehler",
      errorMessage: "Datenbank weg",
    });
  });
});
