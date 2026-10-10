import { describe, expect, it } from "vitest";
import { isMapsPreference, MAPS_CHOICES, resolveMapsTarget } from "./maps-preference";

const IPHONE =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";
const ANDROID =
  "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Mobile Safari/537.36";

describe("resolveMapsTarget", () => {
  it('rät bei „auto" weiter nach Gerät', () => {
    expect(resolveMapsTarget("auto", IPHONE)).toBe("apple");
    expect(resolveMapsTarget("auto", ANDROID)).toBe("google");
  });

  it("respektiert die Wahl gegen die Geräteerkennung", () => {
    // Genau der Fall, um den es geht: Wer auf dem iPhone Google Maps nutzt,
    // soll nicht bei jeder Navigation in Apple Karten landen.
    expect(resolveMapsTarget("google", IPHONE)).toBe("google");
    expect(resolveMapsTarget("waze", ANDROID)).toBe("waze");
    expect(resolveMapsTarget("osm", IPHONE)).toBe("osm");
  });
});

describe("isMapsPreference", () => {
  it("erkennt gültige Werte", () => {
    expect(isMapsPreference("auto")).toBe(true);
    expect(isMapsPreference("apple")).toBe(true);
    expect(isMapsPreference("geo")).toBe(true);
  });

  it("weist Unsinn aus dem Speicher ab", () => {
    expect(isMapsPreference("tomtom")).toBe(false);
    expect(isMapsPreference(null)).toBe(false);
    expect(isMapsPreference(42)).toBe(false);
  });
});

describe("MAPS_CHOICES", () => {
  it("beginnt mit der automatischen Erkennung", () => {
    expect(MAPS_CHOICES[0].id).toBe("auto");
  });

  it("bietet jede unterstützte App an", () => {
    expect(MAPS_CHOICES.map((choice) => choice.id)).toEqual([
      "auto",
      "google",
      "apple",
      "osm",
      "here",
      "waze",
      "geo",
    ]);
  });
});
