import { describe, expect, it } from "vitest";
import {
  dedupePlaces,
  NEARBY_RADIUS_METERS,
  orderByProximity,
  toPlace,
  toPlaces,
  type Place,
} from "./geocode";

/**
 * Die Regeln der Ortssuche.
 *
 * Geprüft wird hier **nicht**, ob Nominatim antwortet, sondern was aus seiner
 * Antwort gemacht wird: welche Reihenfolge die Vorschläge bekommen und was als
 * derselbe Ort gilt. Das ist der Teil, der am 2026-10-16 geändert wurde, und
 * der Teil, bei dem ein Fehler nicht auffällt – eine falsch sortierte Liste
 * sieht aus wie eine richtig sortierte.
 */

const place = (label: string, lat: number, lng: number): Place => ({
  label,
  detail: "",
  lat,
  lng,
});

/** Köln, Domplatte. */
const KOELN = { lat: 50.9413, lng: 6.9583 };

describe("orderByProximity", () => {
  it("bringt den nahen Treffer vor den bekannteren fernen", () => {
    /*
     * Der Fall, der die Änderung ausgelöst hat: Nominatim sortiert nach
     * `importance`, und die Berliner Bahnhofstraße ist bekannter als die in
     * Köln. Wer in Köln steht und „Bahnhofstraße" tippt, meint aber die hier.
     */
    const berlin = place("Bahnhofstraße", 52.52, 13.405);
    const koeln = place("Bahnhofstraße", 50.94, 6.96);

    const ordered = orderByProximity([berlin, koeln], KOELN);

    expect(ordered.map((entry) => entry.lat)).toEqual([koeln.lat, berlin.lat]);
  });

  it("sortiert die nahen Treffer untereinander nach Entfernung", () => {
    const fern = place("Ziel fern", 51.2, 6.8); // ~30 km
    const nah = place("Ziel nah", 50.945, 6.96); // wenige hundert Meter

    expect(orderByProximity([fern, nah], KOELN).map((entry) => entry.label)).toEqual([
      "Ziel nah",
      "Ziel fern",
    ]);
  });

  it("lässt die ferne Gruppe in der Reihenfolge des Dienstes", () => {
    /*
     * Jenseits des Umkreises ist die Entfernung keine brauchbare Auskunft mehr:
     * Zwischen 300 und 400 km entschiede sie nach Zufall, während Nominatims
     * Reihenfolge immerhin die Bekanntheit abbildet.
     */
    const hamburg = place("Hauptbahnhof", 53.553, 10.006);
    const muenchen = place("Hauptbahnhof", 48.14, 11.558);

    expect(orderByProximity([hamburg, muenchen], KOELN).map((entry) => entry.lat)).toEqual([
      hamburg.lat,
      muenchen.lat,
    ]);
  });

  it("lässt ohne Bezugspunkt alles unverändert", () => {
    // Keine Sortierung ist besser als eine erfundene.
    const places = [place("A", 52, 13), place("B", 50, 7)];

    expect(orderByProximity(places, null)).toEqual(places);
  });

  it("gibt ein neues Array zurück und verändert die Eingabe nicht", () => {
    const places = [place("A", 52, 13), place("B", 50.94, 6.96)];
    const copy = [...places];

    orderByProximity(places, KOELN);

    expect(places).toEqual(copy);
  });

  it("zählt genau an der Umkreisgrenze noch als nah", () => {
    // Ein Treffer knapp innerhalb muss vor einem knapp außerhalb stehen,
    // sonst ist die Grenze an der einen Stelle wirkungslos, an der sie zählt.
    const knappDrin = place("drin", KOELN.lat + 0.4, KOELN.lng); // ~44 km
    const knappDraussen = place("draußen", KOELN.lat + 0.6, KOELN.lng); // ~67 km

    expect(NEARBY_RADIUS_METERS).toBe(50_000);
    expect(orderByProximity([knappDraussen, knappDrin], KOELN)[0].label).toBe("drin");
  });
});

describe("dedupePlaces", () => {
  it("führt gleich beschriftete Treffer am selben Punkt zusammen", () => {
    // Nominatim liefert einen Bahnhof als Gebäude, Haltestelle und Knoten.
    const a = place("Köln Hauptbahnhof", 50.9429, 6.9583);
    const b = place("Köln Hauptbahnhof", 50.94292, 6.95832);

    expect(dedupePlaces([a, b])).toHaveLength(1);
  });

  it("behält den ersten Treffer – das ist der beste des Dienstes", () => {
    const a = { ...place("Dom", 50.9413, 6.9583), detail: "Domkloster" };
    const b = { ...place("Dom", 50.94131, 6.95831), detail: "Innenstadt" };

    expect(dedupePlaces([a, b])[0].detail).toBe("Domkloster");
  });

  it("behält verschiedene Namen am selben Punkt", () => {
    // Geschäft und Gebäude liegen aufeinander; welches gemeint ist, weiß nur
    // die Nutzerin.
    const haus = place("Hansahochhaus", 50.9475, 6.9525);
    const laden = place("Apotheke", 50.9475, 6.9525);

    expect(dedupePlaces([haus, laden])).toHaveLength(2);
  });

  it("behält gleichnamige Treffer in verschiedenen Orten", () => {
    // Zwei Bahnhofstraßen gut einen Kilometer auseinander und in
    // verschiedenen Ortsteilen sind zwei Orte, nicht einer.
    const eine = { ...place("Bahnhofstraße", 50.94, 6.96), detail: "Porz, Köln" };
    const andere = { ...place("Bahnhofstraße", 50.951, 6.96), detail: "Sürth, Köln" };

    expect(dedupePlaces([eine, andere])).toHaveLength(2);
  });

  it("führt Adresspunkt und Gebäudefläche desselben Hauses zusammen", () => {
    /*
     * Gemessen am 2026-10-16: Beim Hamburger Rathaus liefert Nominatim den
     * Adresspunkt und den Schwerpunkt der Gebäudefläche – 98 m auseinander,
     * verschiedene Unterzeilen, dasselbe Rathaus. Mit der alten Grenze von
     * 30 m stand es zweimal in der Liste.
     */
    const punkt = {
      ...place("Rathaus", 53.5503287, 9.9925658),
      detail: "1, Rathausmarkt, Altstadt",
    };
    const flaeche = {
      ...place("Rathaus", 53.550371, 9.9940526),
      detail: "Rathausmarkt, Altstadt, Hamburg-Mitte",
    };

    expect(dedupePlaces([punkt, flaeche])).toHaveLength(1);
  });

  it("führt die Abschnitte derselben Straße zusammen", () => {
    /*
     * Gefunden bei der Probe gegen echte Daten (2026-10-16): Von Köln aus
     * ergab „Bahnhofstraße" dreimal „Bahnhofstraße | Porz, Köln". In
     * OpenStreetMap ist eine Straße in Abschnitte geteilt, und Nominatim
     * liefert jeden als eigenen Treffer – drei Zeilen für dieselbe Straße,
     * auf Kosten der echten Alternativen.
     */
    const abschnitte = [
      { ...place("Bahnhofstraße", 50.889, 7.056), detail: "Porz, Köln" },
      { ...place("Bahnhofstraße", 50.891, 7.059), detail: "Porz, Köln" },
      { ...place("Bahnhofstraße", 50.894, 7.062), detail: "Porz, Köln" },
    ];

    expect(dedupePlaces(abschnitte)).toHaveLength(1);
  });

  it("führt gleichnamige Treffer ohne Ortsangabe nicht zusammen", () => {
    // Eine leere Unterzeile sagt nichts aus. Als Übereinstimmung gewertet
    // bliebe von zehn Treffern ohne Ortsangabe genau einer übrig.
    const eine = place("Marktplatz", 50.94, 6.96);
    const andere = place("Marktplatz", 48.14, 11.56);

    expect(dedupePlaces([eine, andere])).toHaveLength(2);
  });
});

describe("toPlace", () => {
  it('nimmt den Namen und lässt „Deutschland" weg', () => {
    const result = toPlace({
      name: "Kölner Dom",
      display_name: "Kölner Dom, Domkloster, Altstadt-Nord, Köln, 50667, Deutschland",
      lat: "50.9413",
      lon: "6.9583",
    });

    expect(result?.label).toBe("Kölner Dom");
    expect(result?.detail).not.toContain("Deutschland");
  });

  it("verwirft Treffer ohne brauchbare Koordinate", () => {
    expect(toPlace({ display_name: "Irgendwo", lat: "keine", lon: "6.9" })).toBeNull();
  });
});

describe("toPlaces", () => {
  it("verträgt eine Antwort, die kein Array ist", () => {
    // Nominatim antwortet bei einem Fehler mit einem Objekt. Ungeprüft
    // übernommen wäre das ein Absturz in der Suchleiste.
    expect(toPlaces({ error: "nope" })).toEqual([]);
  });
});
