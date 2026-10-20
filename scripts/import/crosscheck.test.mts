import { describe, expect, it } from "vitest";
import { pairSpots, type CrossCheckPoint } from "./crosscheck.mjs";

/**
 * Tests für die Paarung amtlich ↔ OpenStreetMap (ToDo 3.1).
 *
 * Die Abstände sind in Metern gerechnet und hier über Gradabstände gesetzt:
 * Bei 51° Nord entspricht 0,00001° Breite rund 1,1 m. Die Beispiele bleiben
 * klein, weil es um die **Zuordnungsregel** geht und nicht um Geometrie – die
 * steckt in einer Zeile und ist dieselbe wie in `street-names.mts`.
 */

const METER_LAT = 1 / 110_574;

function point(id: string, lat: number, lng = 7, label = id): CrossCheckPoint {
  return { id, lat, lng, label };
}

describe("pairSpots", () => {
  it("bestätigt einen Standort, den beide Quellen kennen", () => {
    const result = pairSpots([point("amt-1", 51)], [point("osm-1", 51 + 5 * METER_LAT)], 30);

    expect(result.confirmed).toEqual(["amt-1"]);
    expect(result.officialOnly).toEqual([]);
    expect(result.osmOnly).toEqual([]);
  });

  it("führt einen Standort ohne Gegenpart als „nur amtlich“", () => {
    const result = pairSpots([point("amt-1", 51)], [point("osm-1", 51 + 200 * METER_LAT)], 30);

    expect(result.confirmed).toEqual([]);
    expect(result.officialOnly).toEqual(["amt-1"]);
    // Der OSM-Standort bleibt übrig – das ist die dritte Gruppe.
    expect(result.osmOnly.map((spot) => spot.id)).toEqual(["osm-1"]);
  });

  it("nennt OSM-Standorte, die der amtlichen Liste fehlen", () => {
    const result = pairSpots(
      [point("amt-1", 51)],
      [point("osm-1", 51), point("osm-2", 51.01), point("osm-3", 51.02)],
      30,
    );

    expect(result.confirmed).toEqual(["amt-1"]);
    // Zwei Standorte, die es laut amtlicher Liste nicht gibt. Entweder neu
    // oder dort vergessen – genau die Lücke, die man sonst nie bemerkt.
    expect(result.osmOnly.map((spot) => spot.id)).toEqual(["osm-2", "osm-3"]);
  });

  it("lässt einen OSM-Standort höchstens einen amtlichen bestätigen", () => {
    /*
     * Der Fall vom Krankenhaus: zwanzig amtliche Stellplätze auf engem Raum,
     * ein einziger OSM-Parkplatz darüber. Ohne die Eins-zu-eins-Regel wären
     * alle zwanzig „von zwei Quellen bestätigt" – und das Wort wäre wertlos.
     */
    const official = Array.from({ length: 20 }, (_, index) =>
      point(`amt-${index}`, 51 + index * METER_LAT),
    );
    const result = pairSpots(official, [point("osm-1", 51)], 30);

    expect(result.confirmed).toHaveLength(1);
    expect(result.officialOnly).toHaveLength(19);
  });

  it("ordnet dem nächstgelegenen Gegenpart zu, nicht dem erstgenannten", () => {
    /*
     * Reihenfolge nach Datei hätte sonst entschieden: Der weiter entfernte
     * Standort steht zuerst und nimmt den Gegenpart weg, der nähere gilt als
     * unbestätigt. Eine Auskunft, die von der Sortierung der Quelldatei
     * abhängt, ist keine.
     */
    const result = pairSpots(
      [point("weit", 51 + 25 * METER_LAT), point("nah", 51 + 2 * METER_LAT)],
      [point("osm-1", 51)],
      30,
    );

    expect(result.confirmed).toEqual(["nah"]);
    expect(result.officialOnly).toEqual(["weit"]);
  });

  it("hält die Toleranz ein", () => {
    const knapp = pairSpots([point("amt-1", 51)], [point("osm-1", 51 + 29 * METER_LAT)], 30);
    expect(knapp.confirmed).toEqual(["amt-1"]);

    const daneben = pairSpots([point("amt-1", 51)], [point("osm-1", 51 + 31 * METER_LAT)], 30);
    expect(daneben.confirmed).toEqual([]);
  });

  it("verträgt leere Seiten", () => {
    expect(pairSpots([], [], 30)).toEqual({ confirmed: [], officialOnly: [], osmOnly: [] });

    const ohneOsm = pairSpots([point("amt-1", 51)], [], 30);
    expect(ohneOsm.officialOnly).toEqual(["amt-1"]);

    const ohneAmt = pairSpots([], [point("osm-1", 51)], 30);
    expect(ohneAmt.osmOnly.map((spot) => spot.id)).toEqual(["osm-1"]);
  });

  it("zählt nie mehr Bestätigungen, als es OSM-Standorte gibt", () => {
    // Die Gegenprobe zur Eins-zu-eins-Regel, als Eigenschaft formuliert.
    const official = Array.from({ length: 50 }, (_, index) =>
      point(`amt-${index}`, 51 + index * METER_LAT),
    );
    const osm = Array.from({ length: 3 }, (_, index) =>
      point(`osm-${index}`, 51 + index * 10 * METER_LAT),
    );

    const result = pairSpots(official, osm, 30);
    expect(result.confirmed.length).toBeLessThanOrEqual(osm.length);
    expect(result.confirmed.length + result.officialOnly.length).toBe(official.length);
  });
});
