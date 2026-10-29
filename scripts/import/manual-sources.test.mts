import { describe, expect, it } from "vitest";
import { manualSourcesFor } from "./manual-sources.mjs";

describe("München (handgepflegte Quelle)", () => {
  const [source] = manualSourcesFor("muenchen");

  it("ist hinterlegt und für andere Städte nicht", () => {
    expect(source.resources[0].format).toBe("GEOJSON");
    expect(manualSourcesFor("hamburg")).toEqual([]);
  });

  it("vermerkt eine Baustelle mit Datum – auch im Kompaktformat der Quelle", () => {
    const note = source.noteOf!({
      status: "Baustelle",
      baustelle_ende: "20261211103557",
      hinweis: "Der Standort ist verlegt.",
    });
    expect(note).toBe("Wegen einer Baustelle vorübergehend geändert (bis 11.12.2026) – Der Standort ist verlegt.");
  });

  it("nimmt ein Datum, das schon lesbar ist, unverändert", () => {
    expect(source.noteOf!({ status: "Baustelle", baustelle_ende: "06.04.2027" })).toBe(
      "Wegen einer Baustelle vorübergehend geändert (bis 06.04.2027)",
    );
  });

  it("vermerkt nichts bei Standorten im Bestand", () => {
    expect(source.noteOf!({ status: "in Bestand", hinweis: "egal" })).toBeNull();
    expect(source.noteOf!({ status: null })).toBeNull();
  });

  it("leitet die Kennung aus der Parkplatz-ID ab, nicht aus der laufenden Nummer", () => {
    expect(source.idOf!({ parkplatz_id: 322 })).toBe("muenchen-322");
    expect(source.idOf!({})).toBeNull();
  });
});
