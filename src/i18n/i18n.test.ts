import { describe, expect, it } from "vitest";
import {
  catalogOf,
  DEFAULT_LOCALE,
  format,
  isLocale,
  LOCALE_CODES,
  localeTag,
  matchLocale,
  t,
  type MessageKey,
} from "./index";
import { effectiveLanguage } from "./preference";
import { formatDistance } from "../lib/geo";
import { localeFromRequest, runWithLocale } from "../lib/request-locale";

const placeholders = (text: string) => [...text.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort();

describe("Kataloge (ToDo 15.1)", () => {
  const reference = catalogOf(DEFAULT_LOCALE);
  const keys = Object.keys(reference) as MessageKey[];

  for (const locale of LOCALE_CODES) {
    describe(locale, () => {
      const catalog = catalogOf(locale);

      it("hat jeden Schlüssel der Vorlage – und keinen zusätzlichen", () => {
        expect(Object.keys(catalog).sort()).toEqual([...keys].sort());
      });

      it("hat in keiner Beschriftung einen leeren Text", () => {
        const leer = keys.filter((key) => catalog[key].trim() === "");
        expect(leer).toEqual([]);
      });

      it("verwendet dieselben Platzhalter wie die deutsche Vorlage", () => {
        const abweichend = keys.filter(
          (key) =>
            JSON.stringify(placeholders(catalog[key])) !==
            JSON.stringify(placeholders(reference[key])),
        );
        expect(abweichend).toEqual([]);
      });
    });
  }
});

describe("matchLocale (Browsersprache als erster Vorschlag)", () => {
  it("nimmt den Sprachteil und ignoriert die Landesform", () => {
    expect(matchLocale("de-AT,en;q=0.5")).toBe("de");
    expect(matchLocale("es-MX,es;q=0.9,en;q=0.8")).toBe("es");
  });

  it("liefert null, wenn keine angebotene Sprache vorkommt", () => {
    expect(matchLocale("ja,zh;q=0.8")).toBeNull();
  });

  it("liefert null ohne Kopfzeile", () => {
    expect(matchLocale(null)).toBeNull();
    expect(matchLocale("")).toBeNull();
  });

  it("beachtet die Gewichte vor der Reihenfolge", () => {
    expect(matchLocale("ja;q=0.1,de;q=0.9")).toBe("de");
  });

  it("überspringt q=0", () => {
    expect(matchLocale("de;q=0")).toBeNull();
  });
});

describe("Sprachwahl", () => {
  it("erkennt nur angebotene Sprachen", () => {
    expect(isLocale("de")).toBe(true);
    expect(isLocale("xx")).toBe(false);
    expect(isLocale("toString")).toBe(false);
    expect(isLocale(null)).toBe(false);
  });

  it("lässt das Konto gewinnen, sobald dort etwas steht", () => {
    expect(effectiveLanguage("de", null)).toBe("de");
    expect(effectiveLanguage(null, "de")).toBe("de");
    expect(effectiveLanguage(undefined, null)).toBeNull();
  });
});

describe("Formatierung folgt der Sprache (ToDo 15.3)", () => {
  it("benennt jede Sprache mit einem Etikett für Intl", () => {
    for (const locale of LOCALE_CODES) {
      expect(() => new Intl.NumberFormat(localeTag(locale))).not.toThrow();
    }
  });

  it("schreibt Entfernungen mit dem Dezimalzeichen der Sprache", () => {
    expect(formatDistance(1500, "de")).toBe("1,5 km");
    expect(formatDistance(1500, "en")).toBe("1.5 km");
    expect(formatDistance(12_400, "en")).toBe("12 km");
    expect(formatDistance(834, "en")).toBe("830 m");
    expect(formatDistance(1500, "es")).toBe("1,5 km");
    expect(formatDistance(12_400, "es")).toBe("12 km");
  });

  it("schreibt Datum und große Zahlen mit den Gewohnheiten der Sprache", () => {
    const tag = (locale: "de" | "en" | "es") => localeTag(locale);
    expect((1234567).toLocaleString(tag("de"))).toBe("1.234.567");
    expect((1234567).toLocaleString(tag("en"))).toBe("1,234,567");
    expect((1234567).toLocaleString(tag("es"))).toBe("1.234.567");
  });

  it("setzt Platzhalter ein und lässt unbekannte stehen", () => {
    expect(format("a {x} b {y}", { x: 1 })).toBe("a 1 b {y}");
    expect(t("share.text", { name: "X" })).toContain("X");
  });
});

describe("Sprache einer Schnittstellenanfrage (ToDo 15.1)", () => {
  const anfrage = (headers: Record<string, string>) =>
    new Request("http://localhost/api/x", { headers });

  it("nimmt das Cookie vor der Browsersprache", () => {
    expect(
      localeFromRequest(anfrage({ cookie: "a=b; wheelee-lang=de", "accept-language": "en" })),
    ).toBe("de");
  });

  it("fällt auf die Browsersprache und dann auf Deutsch zurück", () => {
    expect(localeFromRequest(anfrage({ "accept-language": "en-GB,en;q=0.9" }))).toBe("en");
    expect(localeFromRequest(anfrage({ cookie: "wheelee-lang=xx" }))).toBe("de");
    expect(localeFromRequest(anfrage({}))).toBe("de");
  });

  it("lässt t() in der Sprache der Anfrage antworten und gleichzeitige Anfragen getrennt", async () => {
    const antworten = await Promise.all(
      (["en", "de", "en", "de"] as const).map((locale) =>
        runWithLocale(locale, async () => {
          await new Promise((resolve) => setTimeout(resolve, 5 * Math.random()));
          return t("api.notSignedIn");
        }),
      ),
    );
    expect(antworten).toEqual([
      "Not signed in.",
      "Nicht angemeldet.",
      "Not signed in.",
      "Nicht angemeldet.",
    ]);
  });

  it("antwortet ohne Anfrage deutsch", () => {
    expect(t("api.notSignedIn")).toBe("Nicht angemeldet.");
  });
});
