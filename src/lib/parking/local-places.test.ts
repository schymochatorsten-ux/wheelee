import { describe, expect, it } from "vitest";
import { toPlace } from "../geocode";
import { normalizeForSearch, searchLocalPlaces } from "./local-places";

/** Zielsuche aus den eigenen Daten (ToDo 9.18 a), gegen den echten Bestand. */

describe("normalizeForSearch", () => {
  it("vereinheitlicht Groß-/Kleinschreibung, Akzente und ß", () => {
    expect(normalizeForSearch("Ärztehaus Müllerstraße")).toBe("arztehaus mullerstr");
    expect(normalizeForSearch("Café")).toBe("cafe");
  });

  it("behandelt Straße, Strasse und Str. als dasselbe", () => {
    const keys = ["Bahnhofstraße", "Bahnhofstrasse", "Bahnhofstr."].map(normalizeForSearch);
    expect(new Set(keys).size).toBe(1);
  });
});

describe("searchLocalPlaces", () => {
  it("antwortet unter zwei Zeichen nicht", () => {
    expect(searchLocalPlaces("a", null)).toEqual([]);
    expect(searchLocalPlaces("", null)).toEqual([]);
  });

  it("findet eine Stadt am Wortanfang und kennzeichnet sie", () => {
    const places = searchLocalPlaces("frankfurt", null);
    expect(places.length).toBeGreaterThan(0);
    expect(places.some((place) => place.kind === "city" && place.label.startsWith("Frankfurt"))).toBe(true);
  });

  it("zeigt die Stadt vor gleich gut passenden Straßen, auch wenn diese näher liegen", () => {
    // Köln ist näher an etlichen „Frankfurter Straße“ als an Frankfurt am Main;
    // trotzdem soll die Stadt unter den fünf Vorschlägen sein.
    const koeln = { lat: 50.938, lng: 6.9551 };
    const places = searchLocalPlaces("frankfurt", koeln, 5);
    expect(places.some((place) => place.kind === "city" && place.label.startsWith("Frankfurt"))).toBe(true);
  });

  it("findet Straßen mit Ortsangabe und gültigen Koordinaten", () => {
    const places = searchLocalPlaces("bahnhofstr", null, 20);
    const streets = places.filter((place) => place.kind === "street");
    expect(streets.length).toBeGreaterThan(0);
    for (const street of streets) {
      expect(street.detail.length).toBeGreaterThan(0);
      expect(Number.isFinite(street.lat)).toBe(true);
      expect(Number.isFinite(street.lng)).toBe(true);
    }
  });

  it("findet nicht mitten im Wort", () => {
    // „bahnhof“ steckt in „Hauptbahnhof“, soll dort aber nicht treffen.
    for (const place of searchLocalPlaces("bahnhof", null, 50)) {
      const key = normalizeForSearch(place.label);
      expect(key.startsWith("bahnhof") || key.includes(" bahnhof") || key.includes("-bahnhof")).toBe(true);
    }
  });

  it("ordnet mit Bezugspunkt gleichrangige Treffer nach Nähe", () => {
    const koeln = { lat: 50.938, lng: 6.9551 };
    const places = searchLocalPlaces("bahnhofstr", koeln, 20);
    const first = places.filter((place) => normalizeForSearch(place.label).startsWith("bahnhofstr"));
    const meters = first.map((place) => Math.hypot(place.lat - koeln.lat, (place.lng - koeln.lng) * 0.64));
    expect(meters).toEqual([...meters].sort((a, b) => a - b));
  });

  it("begrenzt die Zahl der Treffer", () => {
    expect(searchLocalPlaces("str", null, 3).length).toBeLessThanOrEqual(3);
  });
});

describe("toPlace und die Art des Ortes", () => {
  const basis = { display_name: "Köln, Nordrhein-Westfalen, Deutschland", lat: "50.9", lon: "6.9" };

  it("erkennt Orte und Straßen", () => {
    expect(toPlace({ ...basis, addresstype: "city" })?.kind).toBe("city");
    expect(toPlace({ ...basis, addresstype: "road" })?.kind).toBe("street");
  });

  it("lässt die Art offen, wenn sie unklar ist", () => {
    expect(toPlace({ ...basis, addresstype: "building" })).not.toHaveProperty("kind");
    expect(toPlace(basis)).not.toHaveProperty("kind");
  });
});
