import { describe, expect, it } from "vitest";
import { parseParkingList, totalSpotCount } from "./parse-list";

describe("parseParkingList", () => {
  it("liest eine einfache Zeile", () => {
    const { entries } = parseParkingList("Berger Straße 106 1 Nordend-Ost");
    expect(entries).toEqual([
      { label: "Berger Straße 106", spotCount: 1, district: "Nordend-Ost" },
    ]);
  });

  it("nimmt die letzte Zahl als Anzahl, nicht die Hausnummer", () => {
    const { entries } = parseParkingList("Alte Mainzer Gasse 4 2 Altstadt");
    expect(entries[0]).toEqual({
      label: "Alte Mainzer Gasse 4",
      spotCount: 2,
      district: "Altstadt",
    });
  });

  it("lässt Zahlen in Öffnungszeiten im Label", () => {
    const { entries } = parseParkingList(
      "Adolf-Miersch-Straße 4e; Mo-Fr 8-20h und Sa 10-14h 1 Niederrad",
    );
    expect(entries[0]).toEqual({
      label: "Adolf-Miersch-Straße 4e; Mo-Fr 8-20h und Sa 10-14h",
      spotCount: 1,
      district: "Niederrad",
    });
  });

  it("fügt umgebrochene Zeilen zusammen", () => {
    const { entries, unparsed } = parseParkingList(
      [
        "Wittelsbacher Allee 86/Multiple Sklerose Gesellschaft (Mo - Fr, 8 - 16",
        "Uhr) 2 Ostend",
      ].join("\n"),
    );
    expect(unparsed).toEqual([]);
    expect(entries[0].label).toBe(
      "Wittelsbacher Allee 86/Multiple Sklerose Gesellschaft (Mo - Fr, 8 - 16 Uhr)",
    );
    expect(entries[0].spotCount).toBe(2);
  });

  it("fügt nach einem Bindestrich am Zeilenende ohne Leerzeichen zusammen", () => {
    const { entries } = parseParkingList(
      [
        "Bartholomäusgasse /Alt Zeilsh - KathKirche (Di-Do 7.30-20.00, So 9-",
        "12) 1 Zeilsheim",
      ].join("\n"),
    );
    expect(entries[0].label).toContain("So 9-12)");
    expect(entries[0].district).toBe("Zeilsheim");
  });

  it("ignoriert Abschnitts-Buchstaben, Tabellenkopf und Seitenmarkierungen", () => {
    const { entries, unparsed } = parseParkingList(
      [
        "Örtlichkeit Anzahl Stadtteil",
        "A",
        "Ackermannstraße 10 1 Gallusviertel",
        "",
        "-- 1 of 9 --",
        "B",
        "Baumweg 45 / Arztpraxis 1 Nordend-Ost",
      ].join("\n"),
    );
    expect(unparsed).toEqual([]);
    expect(entries.map((entry) => entry.label)).toEqual([
      "Ackermannstraße 10",
      "Baumweg 45 / Arztpraxis",
    ]);
  });

  it("erkennt die Gesamtsumme am Ende", () => {
    const { declaredTotal } = parseParkingList("Berger Straße 106 1 Nordend-Ost\n505");
    expect(declaredTotal).toBe(505);
  });

  it("meldet unauflösbare Zeilen statt den nächsten Eintrag zu verfälschen", () => {
    const { entries, unparsed } = parseParkingList(
      [
        "Friedberger Landstraße / Ecke Gießener Straße / Eingang",
        "Friedberger Landstraße 142 1 Nordend-Ost",
      ].join("\n"),
    );
    expect(unparsed).toEqual(["Friedberger Landstraße / Ecke Gießener Straße / Eingang"]);
    expect(entries).toEqual([
      { label: "Friedberger Landstraße 142", spotCount: 1, district: "Nordend-Ost" },
    ]);
  });

  it("akzeptiert Zeilen, denen in der Quelle der Stadtteil fehlt", () => {
    const { entries, unparsed } = parseParkingList(
      [
        "Bockenheimer Landstr. / Sozialgericht 2",
        "Bockenheimer Warte/Universitätsbibliothek 1 Bockenheim",
      ].join("\n"),
    );
    expect(unparsed).toEqual([]);
    expect(entries).toEqual([
      { label: "Bockenheimer Landstr. / Sozialgericht", spotCount: 2, district: null },
      {
        label: "Bockenheimer Warte/Universitätsbibliothek",
        spotCount: 1,
        district: "Bockenheim",
      },
    ]);
  });

  it("entfernt Glyph-Artefakte des Textextrakts", () => {
    const { entries } = parseParkingList("Oeder Weg 1 / Kino Metropolis 1 Nordend+D332-West");
    expect(entries[0].district).toBe("Nordend-West");
  });

  it("trennt eine Fortsetzung von einem eigenständigen Folgeeintrag", () => {
    const { entries } = parseParkingList(
      [
        "Riederwaldsiedlung / Parkplatz am alten Volkshaus Di 14-19 Uhr, Do",
        "14-17 Uhr 1 Riederwald",
        "Rödelheimer Landstraße 50 1 Bockenheim",
      ].join("\n"),
    );
    expect(entries).toHaveLength(2);
    expect(entries[0].label).toBe(
      "Riederwaldsiedlung / Parkplatz am alten Volkshaus Di 14-19 Uhr, Do 14-17 Uhr",
    );
    expect(entries[1].label).toBe("Rödelheimer Landstraße 50");
  });

  it("verbindet geprüfte Ausnahmen über forcedJoins", () => {
    const lines = [
      "Bockenheimer Anlage 2-3 / A298 (Mo-Fr 9-17 h) Höchstparkdauer 2",
      "Std. 1 Westend",
    ].join("\n");

    expect(parseParkingList(lines).entries).toHaveLength(2);

    const { entries } = parseParkingList(lines, {
      forcedJoins: ["Bockenheimer Anlage 2-3 / A298 (Mo-Fr 9-17 h) Höchstparkdauer 2"],
    });
    expect(entries).toEqual([
      {
        label: "Bockenheimer Anlage 2-3 / (Mo-Fr 9-17 h) Höchstparkdauer 2 Std.",
        spotCount: 1,
        district: "Westend",
      },
    ]);
  });

  it("entfernt Glyph-Artefakte auch ohne Pluszeichen", () => {
    const { entries } = parseParkingList("Offenbacher Landstraße 299 A274 1 Oberrad");
    expect(entries[0].label).toBe("Offenbacher Landstraße 299");
  });

  it("summiert die Stellplätze", () => {
    const { entries } = parseParkingList(
      ["Ackermannstraße 10 1 Gallusviertel", "Alte Mainzer Gasse 4 2 Altstadt"].join("\n"),
    );
    expect(totalSpotCount(entries)).toBe(3);
  });
});
