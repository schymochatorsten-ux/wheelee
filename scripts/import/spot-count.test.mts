import { describe, expect, it } from "vitest";
import { readSpotCount } from "./spot-count.mjs";

/**
 * Die Stellplatzzahl aus OSM-Tags (ToDo 8.11).
 *
 * **Geprüft wird vor allem die Grenze zwischen „zweifelhaft" und „falsch".**
 * Sie ist der ganze Inhalt dieser Funktion: Ein nicht deutbarer Wert kommt
 * gekennzeichnet herein, ein ausdrückliches „hier keine" bleibt draußen. Wer
 * das eine für das andere nimmt, füllt die Karte entweder mit Plätzen, die es
 * nicht gibt, oder verliert welche, die es gibt.
 */

describe("readSpotCount", () => {
  it("liest eine Zahl als Zahl", () => {
    expect(readSpotCount({ "capacity:disabled": "3" })).toEqual({ count: 3, unsicher: false });
  });

  it("nimmt „yes“ als einen Stellplatz, ohne Zweifel daran", () => {
    expect(readSpotCount({ "capacity:disabled": "yes" })).toEqual({ count: 1, unsicher: false });
    expect(readSpotCount({ "capacity:disabled": "designated" })).toEqual({
      count: 1,
      unsicher: false,
    });
  });

  it("erkennt die Ausweisung ohne Zähler", () => {
    expect(readSpotCount({ parking_space: "disabled" })).toEqual({ count: 1, unsicher: false });
    expect(readSpotCount({ wheelchair: "designated" })).toEqual({ count: 1, unsicher: false });
  });

  it("lässt ein ausdrückliches „hier keine“ draußen", () => {
    /*
     * **Das ist die Stelle, an der „lieber einer zu viel“ falsch wäre.** Hier
     * steht nicht eine Lücke, sondern eine Aussage: An diesem Parkplatz gibt
     * es keine ausgewiesenen Behindertenstellplätze. Ihn gekennzeichnet
     * aufzunehmen hieße, der Quelle zu widersprechen.
     */
    for (const raw of ["no", "none", "0", "NO"]) {
      expect(readSpotCount({ "capacity:disabled": raw })).toBeNull();
    }
  });

  it("lässt draußen, wofür es gar keinen Hinweis gibt", () => {
    // Ein gewöhnlicher Parkplatz ist kein unsicherer Behindertenparkplatz,
    // sondern keiner.
    expect(readSpotCount({ amenity: "parking" })).toBeNull();
    expect(readSpotCount({ amenity: "parking", wheelchair: "yes" })).toBeNull();
    expect(readSpotCount({})).toBeNull();
  });

  it("nimmt einen nicht deutbaren Wert gekennzeichnet herein", () => {
    // Neu seit dem 2026-11-14: Vorher fiel das Objekt hier heraus.
    for (const raw of ["unknown", "ja", "einige", "?", "0,5"]) {
      expect(readSpotCount({ "capacity:disabled": raw })).toEqual({ count: 1, unsicher: true });
    }
  });

  it("nimmt eine Spanne mit ihrer kleineren Zahl, ohne Kennzeichnung", () => {
    // „1-2“ liest `parseInt` als 1. Das ist die vorsichtige Annahme und keine
    // zweifelhafte Angabe – die Zahl steht ja da.
    expect(readSpotCount({ "capacity:disabled": "1-2" })).toEqual({ count: 1, unsicher: false });
  });
});
