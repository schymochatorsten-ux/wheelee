import { describe, expect, it } from "vitest";
import {
  coordinatesOf,
  isPlausibleWgs84,
  mapFields,
  parseCsv,
  parseGml,
  utmToWgs84,
  utmZoneFromSrs,
  wgs84ToUtm,
  type GeoFeature,
} from "./geo-source.mjs";

/**
 * Tests für die Importkette.
 *
 * Diese Stellen haben beim Aufbau der Daten die teuersten Fehler erzeugt –
 * Koordinaten 450 km daneben, 936 gleich benannte Standorte, 11.485 erfundene
 * Stellplätze. Alle hier geprüften Fälle sind echte Vorkommnisse aus den
 * Quellen, keine ausgedachten.
 */

describe("utmToWgs84", () => {
  it("rechnet Zone 32 korrekt (Hamburg)", () => {
    // Aus dem GML des Hamburger WFS, EPSG:25832.
    const result = utmToWgs84(565596.793, 5934808.893, 32);
    expect(result.lat).toBeCloseTo(53.5563, 2);
    expect(result.lng).toBeCloseTo(9.9937, 2);
  });

  it("rechnet Zone 33 korrekt (Dresden)", () => {
    // Aus dem GML des Dresdner WFS, EPSG:25833.
    const result = utmToWgs84(411802.901489, 5653855.863525, 33);
    expect(result.lat).toBeCloseTo(51.0295, 2);
    expect(result.lng).toBeCloseTo(13.7423, 2);
  });

  it("liefert für die falsche Zone ein plausibles, aber falsches Ergebnis", () => {
    // Der Kern des Dresden-Fehlers: Zone 32 statt 33 ergibt Koordinaten, die
    // immer noch in Deutschland liegen – nur 450 km zu weit westlich.
    const falsch = utmToWgs84(411802.901489, 5653855.863525, 32);
    expect(isPlausibleWgs84(falsch.lat, falsch.lng)).toBe(true);
    expect(falsch.lng).toBeLessThan(9);
  });
});

describe("wgs84ToUtm", () => {
  it("trifft die Werte aus dem Hamburger WFS wieder", () => {
    // Derselbe Punkt wie oben, diesmal von WGS84 aus. Als Ausgangswert dient
    // das Ergebnis der Rückrechnung, nicht eine auf zwei Stellen gerundete
    // Angabe – sonst prüft der Test die Rundung und nicht die Projektion.
    const wgs84 = utmToWgs84(565596.793, 5934808.893, 32);
    const result = wgs84ToUtm(wgs84.lat, wgs84.lng, 32);

    expect(result.easting).toBeCloseTo(565596.793, 2);
    expect(result.northing).toBeCloseTo(5934808.893, 2);
  });

  /*
   * Der Rundlauf ist der eigentliche Test: Der Punkt-in-Fläche-Test (2e.7)
   * rechnet jeden Parkplatz nach UTM32, die Gemeindegrenze bleibt amtlich.
   * Weicht die Umrechnung ab, wandern grenznahe Parkplätze in die
   * Nachbargemeinde – derselbe Fehler wie zuvor, nur unauffälliger.
   */
  it("kommt im Rundlauf auf unter einen Dezimeter zurück", () => {
    for (const [lat, lng] of [
      [47.5, 7.6], // Südwestecke, weit vom Mittelmeridian
      [54.9, 8.4], // Nordfriesland
      [51.03, 13.74], // Dresden, geographisch Zone 33
      [48.137, 11.575], // München
    ]) {
      const { easting, northing } = wgs84ToUtm(lat, lng, 32);
      const zurueck = utmToWgs84(easting, northing, 32);
      // 1e-6 Grad sind rund 10 cm. Weiter reicht die abgeschnittene Reihe am
      // Rand der Zone nicht – für eine Gemeindegrenze ist das belanglos.
      expect(zurueck.lat).toBeCloseTo(lat, 6);
      expect(zurueck.lng).toBeCloseTo(lng, 6);
    }
  });
});

describe("utmZoneFromSrs", () => {
  it("liest die Zone aus den gängigen Schreibweisen", () => {
    expect(utmZoneFromSrs("EPSG:25832")).toBe(32);
    expect(utmZoneFromSrs("EPSG:25833")).toBe(33);
    expect(utmZoneFromSrs("urn:ogc:def:crs:EPSG:7.1:25833")).toBe(33);
    expect(utmZoneFromSrs("urn:ogc:def:crs:EPSG::25832")).toBe(32);
  });

  it("kennt die verwandten Kennungen", () => {
    expect(utmZoneFromSrs("EPSG:3044")).toBe(32);
    expect(utmZoneFromSrs("EPSG:3045")).toBe(33);
  });

  it("gibt null zurück, wenn die Angabe fehlt oder unbekannt ist", () => {
    expect(utmZoneFromSrs(undefined)).toBeNull();
    expect(utmZoneFromSrs("EPSG:4326")).toBeNull();
    expect(utmZoneFromSrs("Unsinn")).toBeNull();
  });
});

describe("coordinatesOf", () => {
  const punkt = (coordinates: unknown, srs?: string): GeoFeature => ({
    geometry: { type: "Point", coordinates },
    properties: {},
    srs,
  });

  it("nimmt GeoJSON-Koordinaten in der Reihenfolge Länge, Breite", () => {
    expect(coordinatesOf(punkt([9.9937, 53.5563]))).toEqual({ lat: 53.5563, lng: 9.9937 });
  });

  it("dreht vertauschte Achsen um", () => {
    // WFS 1.1 liefert EPSG:4326 teils als Breite, Länge.
    expect(coordinatesOf(punkt([53.5563, 9.9937]))).toEqual({ lat: 53.5563, lng: 9.9937 });
  });

  it("nutzt die angegebene UTM-Zone statt zu raten", () => {
    const result = coordinatesOf(punkt([411802.9, 5653855.86], "EPSG:25833"));
    expect(result!.lng).toBeCloseTo(13.7423, 2);
  });

  it("bildet bei Flächen den Mittelpunkt", () => {
    const flaeche: GeoFeature = {
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [9.99, 53.55],
            [10.01, 53.55],
            [10.01, 53.57],
            [9.99, 53.57],
          ],
        ],
      },
      properties: {},
    };
    const result = coordinatesOf(flaeche);
    expect(result!.lat).toBeCloseTo(53.56, 3);
    expect(result!.lng).toBeCloseTo(10.0, 3);
  });

  it("gibt null zurück, wenn nichts Brauchbares dabei ist", () => {
    expect(coordinatesOf({ geometry: null, properties: {} })).toBeNull();
  });
});

describe("mapFields", () => {
  it("erkennt die Frankfurter Spalten", () => {
    const fields = mapFields({
      description: "Ackermannstraße 10",
      behindertenstellplaetze: 1,
      vti_anschrift: "Gallusviertel",
      vti_oeffnungszeiten: "durchgehend",
    });
    expect(fields.label).toBe("description");
    expect(fields.spotCount).toBe("behindertenstellplaetze");
  });

  it("erkennt Hamburgs nahe_adresse", () => {
    // Ein verankertes Muster übersah diese Spalte, und alle 936 Standorte
    // hießen danach gleich.
    const fields = mapFields({ nahe_adresse: "Esplanade 36 ggü.", anzahl: 2 });
    expect(fields.label).toBe("nahe_adresse");
    expect(fields.spotCount).toBe("anzahl");
  });

  it("erkennt Berlins Spalten", () => {
    const fields = mapFields({ standort: "Aachener Straße 16", anzahl: 1, bezirk: "Pankow" });
    expect(fields.label).toBe("standort");
    expect(fields.district).toBe("bezirk");
  });

  it("lässt Felder leer, die es nicht gibt", () => {
    const fields = mapFields({ stellplatzanzahl: 1, nutzungszeit: "von 00:00 Uhr bis 24:00 Uhr" });
    expect(fields.label).toBeUndefined();
    expect(fields.spotCount).toBe("stellplatzanzahl");
    expect(fields.timeRestriction).toBe("nutzungszeit");
  });
});

describe("parseGml", () => {
  const hamburg = `<?xml version='1.0' encoding='UTF-8'?>
<wfs:FeatureCollection xmlns:wfs="http://www.opengis.net/wfs">
<gml:featureMember><de.hh.up:behindertenstellplaetze xmlns:de.hh.up="x" gml:id="A_1">
<de.hh.up:nahe_adresse>Esplanade 36 ggü.</de.hh.up:nahe_adresse>
<de.hh.up:anzahl>2</de.hh.up:anzahl>
<de.hh.up:geom><gml:Point gml:id="g1" srsName="EPSG:25832"><gml:pos>565596.793 5934808.893</gml:pos></gml:Point></de.hh.up:geom>
</de.hh.up:behindertenstellplaetze></gml:featureMember>
</wfs:FeatureCollection>`;

  it("liest Sachattribute und Geometrie", () => {
    const [feature] = parseGml(hamburg);
    expect(feature.properties.nahe_adresse).toBe("Esplanade 36 ggü.");
    expect(feature.properties.anzahl).toBe("2");
    expect(feature.geometry?.coordinates).toEqual([565596.793, 5934808.893]);
  });

  it("merkt sich das Koordinatensystem", () => {
    const [feature] = parseGml(hamburg);
    expect(utmZoneFromSrs(feature.srs)).toBe(32);
  });

  it("nimmt Geometrieteile nicht als Sachattribute", () => {
    const [feature] = parseGml(hamburg);
    expect(feature.properties.pos).toBeUndefined();
  });

  it("verträgt eine leere Sammlung", () => {
    expect(parseGml("<wfs:FeatureCollection></wfs:FeatureCollection>")).toEqual([]);
  });
});

describe("parseCsv", () => {
  it("erkennt Semikolon als Trennzeichen", () => {
    const rows = parseCsv("strasse;anzahl\nHauptstraße 1;2\nNebenweg 3;1");
    expect(rows).toHaveLength(2);
    expect(rows[0]).toEqual({ strasse: "Hauptstraße 1", anzahl: "2" });
  });

  it("erkennt Komma als Trennzeichen", () => {
    const rows = parseCsv("a,b\n1,2");
    expect(rows[0]).toEqual({ a: "1", b: "2" });
  });

  it("beachtet Anführungszeichen mit Trennzeichen darin", () => {
    const rows = parseCsv('ort;nr\n"Straße A; Ecke B";7');
    expect(rows[0].ort).toBe("Straße A; Ecke B");
  });

  it("behandelt doppelte Anführungszeichen als eines", () => {
    const rows = parseCsv('text\n"Er sagte ""halt"""');
    expect(rows[0].text).toBe('Er sagte "halt"');
  });

  it("entfernt eine Byte-Order-Mark", () => {
    const rows = parseCsv("﻿a;b\n1;2");
    expect(Object.keys(rows[0])).toEqual(["a", "b"]);
  });

  it("überspringt leere Zeilen", () => {
    const rows = parseCsv("a;b\n1;2\n\n3;4\n");
    expect(rows).toHaveLength(2);
  });
});
