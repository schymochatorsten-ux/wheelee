import { describe, expect, it } from "vitest";
import {
  distanceToNearestStreet,
  distanceToSegment,
  farFromStreets,
  type Polyline,
} from "./street-distance.mjs";

/** 0,001° Breite sind rund 110,5 m; auf 50° Breite 0,001° Länge rund 71,5 m. */
const M_PER_LAT_DEG = 110_540;

describe("distanceToSegment", () => {
  const a = { lat: 50, lng: 8 };
  const b = { lat: 50, lng: 8.01 }; // Ost-West-Strecke, rund 715 m

  it("misst senkrecht zur Strecke", () => {
    const point = { lat: 50 + 20 / M_PER_LAT_DEG, lng: 8.005 };
    expect(distanceToSegment(point, a, b)).toBeCloseTo(20, 0);
  });

  it("misst über das Ende hinaus zum Endpunkt, nicht zur Verlängerung", () => {
    const point = { lat: 50, lng: 8.011 };
    const expected = 0.001 * Math.cos((50 * Math.PI) / 180) * 111_320;
    expect(distanceToSegment(point, a, b)).toBeCloseTo(expected, 0);
  });

  it("liegt der Punkt auf der Strecke, ist der Abstand null", () => {
    expect(distanceToSegment({ lat: 50, lng: 8.004 }, a, b)).toBeCloseTo(0, 3);
  });

  it("verträgt eine Strecke der Länge null", () => {
    expect(distanceToSegment({ lat: 50 + 10 / M_PER_LAT_DEG, lng: 8 }, a, a)).toBeCloseTo(10, 0);
  });
});

describe("farFromStreets", () => {
  const street: Polyline = [
    { lat: 50, lng: 8 },
    { lat: 50, lng: 8.01 },
  ];

  it("meldet nur Standorte über der Schwelle, weiteste zuerst", () => {
    const spots = [
      { id: "nah", label: "an der Straße", lat: 50 + 5 / M_PER_LAT_DEG, lng: 8.005 },
      { id: "fern", label: "mitten im Feld", lat: 50 + 60 / M_PER_LAT_DEG, lng: 8.005 },
      { id: "weiter", label: "noch weiter", lat: 50 + 200 / M_PER_LAT_DEG, lng: 8.005 },
    ];
    const findings = farFromStreets(spots, [street]);
    expect(findings.map((f) => f.id)).toEqual(["weiter", "fern"]);
    expect(findings[1].distanceMeters).toBeCloseTo(60, 0);
  });

  it("überspringt Standorte ohne Koordinate", () => {
    expect(farFromStreets([{ id: "x", label: "ohne", lat: null, lng: null }], [street])).toEqual([]);
  });

  it("nimmt die nächste von mehreren Straßen", () => {
    const other: Polyline = [
      { lat: 50.001, lng: 8 },
      { lat: 50.001, lng: 8.01 },
    ];
    const point = { lat: 50.001 - 4 / M_PER_LAT_DEG, lng: 8.005 };
    expect(distanceToNearestStreet(point, [street, other])).toBeCloseTo(4, 0);
  });

  it("ohne Straßen ist der Abstand unendlich – alles wird gemeldet", () => {
    expect(distanceToNearestStreet({ lat: 50, lng: 8 }, [])).toBe(Infinity);
  });
});
