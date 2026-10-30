import { describe, expect, it } from "vitest";
import { evenSample, normalizeStreet, sameStreet } from "./street-match.mjs";

describe("sameStreet", () => {
  it("gleicht Schreibweisen von Straße aus", () => {
    expect(sameStreet("Hauptstr.", "Hauptstraße")).toBe(true);
    expect(sameStreet("Hauptstrasse", "Hauptstraße")).toBe(true);
    expect(sameStreet("Haupt-Straße", "Hauptstraße")).toBe(true);
    expect(sameStreet("Am Römerkastell", "am romerkastell")).toBe(true);
    expect(sameStreet("St.-Bonifatius-Straße", "Sankt-Bonifatius-Straße")).toBe(true);
    // Hausnummer im Straßenfeld der Quelle (Gelsenkirchen)
    expect(sameStreet("Bismarckstraße 313", "Bismarckstraße")).toBe(true);
    expect(sameStreet("Horster Straße 19a", "Horster Straße")).toBe(true);
    expect(sameStreet("Hauptstraße 4-6", "Hauptstraße")).toBe(true);
    expect(sameStreet("Bismarckstraße 313", "Kennedyplatz")).toBe(false);
  });

  it("unterscheidet verschiedene Straßen", () => {
    expect(sameStreet("Hauptstraße", "Nebenstraße")).toBe(false);
    expect(sameStreet("Bahnhofstraße", "Bahnhofsplatz")).toBe(false);
  });

  it("zählt leere Namen nicht als gleich", () => {
    expect(sameStreet("", "")).toBe(false);
  });

  it("normalisiert Umlaute und ß", () => {
    expect(normalizeStreet("Größenstraße")).toBe(normalizeStreet("Grossenstrasse"));
  });
});

describe("evenSample", () => {
  const items = Array.from({ length: 100 }, (_, i) => i);

  it("wählt gleichmäßig und immer dasselbe", () => {
    const a = evenSample(items, 5);
    expect(a).toEqual([0, 20, 40, 60, 80]);
    expect(evenSample(items, 5)).toEqual(a);
  });

  it("gibt alles zurück, wenn weniger da ist als gewünscht", () => {
    expect(evenSample([1, 2, 3], 10)).toEqual([1, 2, 3]);
  });
});
