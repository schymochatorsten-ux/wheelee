import { describe, expect, it } from "vitest";
import { confirmedOsmIds } from "./crosscheck-regional.mjs";

const point = (id: string) => ({ id, lat: 49, lng: 8, label: id });

describe("confirmedOsmIds", () => {
  it("nimmt alle OSM-Standorte, die nicht als „nur OSM“ übrig blieben", () => {
    const osm = [point("a"), point("b"), point("c")];
    expect(confirmedOsmIds(osm, [point("b")])).toEqual(["a", "c"]);
  });

  it("bestätigt nichts, wenn alle OSM-Standorte ohne Gegenpart blieben", () => {
    const osm = [point("a"), point("b")];
    expect(confirmedOsmIds(osm, osm)).toEqual([]);
  });
});
