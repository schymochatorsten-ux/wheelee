import { describe, expect, it } from "vitest";
import { assignToMunicipality, type Municipality } from "./assign.mjs";

/**
 * Die Beispiele sind bewusst so gebaut, dass die naive Lösung („nimm die
 * nächste Gemeindemitte") danebengreift – genau dafür gibt es die Prüfung
 * auf das umschließende Rechteck.
 */

/** Eine große Flächengemeinde. */
const gross: Municipality = {
  ags: "05374032",
  name: "Flächenstadt",
  lat: 50.0,
  lng: 7.0,
  bounds: { minLat: 49.9, minLng: 6.9, maxLat: 50.1, maxLng: 7.1 },
};

/** Ein kleiner Nachbarort, dicht an der Grenze der großen Gemeinde. */
const klein: Municipality = {
  ags: "05374040",
  name: "Nachbarort",
  lat: 50.105,
  lng: 7.0,
  bounds: { minLat: 50.1, minLng: 6.98, maxLat: 50.12, maxLng: 7.02 },
};

describe("assignToMunicipality", () => {
  it("ordnet einen Punkt der Gemeinde zu, die ihn umschließt", () => {
    const ergebnis = assignToMunicipality({ lat: 50.0, lng: 7.0 }, [gross, klein]);
    expect(ergebnis?.municipality.name).toBe("Flächenstadt");
    expect(ergebnis?.confidence).toBe("eindeutig");
  });

  it("lässt sich nicht von der näheren Mitte des Nachbarorts täuschen", () => {
    // Dieser Punkt liegt noch in der Flächenstadt, aber die Mitte des
    // Nachbarorts ist deutlich näher. Ohne die Rechteckprüfung landete er
    // in der falschen Gemeinde – und damit in der falschen Seed-Datei.
    const amRand = { lat: 50.095, lng: 7.0 };

    const ergebnis = assignToMunicipality(amRand, [gross, klein]);
    expect(ergebnis?.municipality.name).toBe("Flächenstadt");
    expect(ergebnis?.confidence).toBe("eindeutig");
  });

  it("entscheidet bei überlappenden Rechtecken nach der Entfernung", () => {
    const ueberlappend: Municipality = {
      ...klein,
      name: "Überlappend",
      bounds: { minLat: 49.95, minLng: 6.95, maxLat: 50.15, maxLng: 7.05 },
      lat: 50.09,
      lng: 7.0,
    };

    const ergebnis = assignToMunicipality({ lat: 50.088, lng: 7.0 }, [gross, ueberlappend]);
    expect(ergebnis?.municipality.name).toBe("Überlappend");
    expect(ergebnis?.confidence).toBe("mehrdeutig");
  });

  it("kennzeichnet eine Zuordnung ohne passendes Rechteck als geraten", () => {
    const weitWeg = { lat: 52.5, lng: 13.4 };
    const ergebnis = assignToMunicipality(weitWeg, [gross, klein]);
    expect(ergebnis?.confidence).toBe("geraten");
    // Die Entfernung macht sichtbar, wie unsicher das ist.
    expect(ergebnis!.distanceMeters).toBeGreaterThan(400_000);
  });

  it("gibt null zurück, wenn es keine Gemeinden gibt", () => {
    expect(assignToMunicipality({ lat: 50, lng: 7 }, [])).toBeNull();
  });
});
