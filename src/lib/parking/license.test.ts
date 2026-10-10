import { describe, expect, it } from "vitest";
import { attributionOf, licenseOf, splitSource } from "./license";

/**
 * Die geprüften Fälle stammen aus echten Seed-Dateien des Bestands, nicht aus
 * Erfundenem – einschließlich der Kölner Angabe, bei der GovData keine Lizenz
 * führt.
 */
describe("splitSource", () => {
  it("trennt Titel und Lizenz", () => {
    expect(
      splitSource("Behindertenstellplätze – Hamburg (Datenlizenz Deutschland – Zero 2.0)"),
    ).toEqual({
      title: "Behindertenstellplätze – Hamburg",
      license: "Datenlizenz Deutschland – Zero 2.0",
    });
  });

  it("erkennt OpenStreetMap", () => {
    expect(splitSource("OpenStreetMap-Mitwirkende (ODbL)")).toEqual({
      title: "OpenStreetMap-Mitwirkende",
      license: "ODbL",
    });
  });

  it('wertet „nicht angegeben" als fehlende Lizenz, nicht als Lizenznamen', () => {
    expect(splitSource("Behindertenparkplätze in Köln – Köln (nicht angegeben)")).toEqual({
      title: "Behindertenparkplätze in Köln – Köln",
      license: null,
    });
  });

  it("lässt eine Angabe ohne Klammer unverändert", () => {
    expect(splitSource("Stadt Musterstadt, Straßenverkehrsbehörde")).toEqual({
      title: "Stadt Musterstadt, Straßenverkehrsbehörde",
      license: null,
    });
  });

  it("greift nur die letzte Klammer, nicht eine im Titel", () => {
    expect(splitSource("Parken (Behinderte) – Musterstadt (CC BY 4.0)")).toEqual({
      title: "Parken (Behinderte) – Musterstadt",
      license: "CC BY 4.0",
    });
  });
});

describe("licenseOf", () => {
  it("bevorzugt das eigene Feld vor der eingebetteten Angabe", () => {
    expect(licenseOf({ source: "Titel (ODbL)", license: "CC BY 4.0" })).toBe("CC BY 4.0");
  });

  it("fällt auf die Quellenangabe zurück, wenn das Feld fehlt", () => {
    expect(licenseOf({ source: "Titel (ODbL)" })).toBe("ODbL");
  });

  it("behandelt ein leeres Feld wie ein fehlendes", () => {
    expect(licenseOf({ source: "Titel (ODbL)", license: "nicht angegeben" })).toBe("ODbL");
  });

  it("gibt null zurück, wenn nirgends eine Lizenz steht", () => {
    expect(licenseOf({ source: "Titel", license: null })).toBeNull();
  });
});

describe("attributionOf", () => {
  it("setzt Titel und Lizenz wieder zusammen", () => {
    expect(attributionOf({ source: "OpenStreetMap-Mitwirkende (ODbL)" })).toBe(
      "OpenStreetMap-Mitwirkende (ODbL)",
    );
  });

  it("nennt nur den Titel, wenn keine Lizenz bekannt ist", () => {
    expect(
      attributionOf({ source: "Behindertenparkplätze in Köln – Köln (nicht angegeben)" }),
    ).toBe("Behindertenparkplätze in Köln – Köln");
  });
});
