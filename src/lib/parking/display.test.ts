import { describe, expect, it } from "vitest";
import { isGenericLabel, spotTitle, stripRedundantPrefix } from "./display";

/** Die Beispiele stammen aus echten Einträgen des Bestands. */
describe("stripRedundantPrefix", () => {
  it("entfernt das Gelsenkirchener Präfix", () => {
    expect(stripRedundantPrefix("Behindertenparkplatz Ahstraße")).toBe("Ahstraße");
  });

  it("entfernt es auch mit Doppelpunkt oder Bindestrich", () => {
    expect(stripRedundantPrefix("Behindertenparkplatz: Markt 4")).toBe("Markt 4");
    expect(stripRedundantPrefix("Behindertenstellplatz - Bahnhofstraße")).toBe("Bahnhofstraße");
  });

  it("behält den Text, wenn danach nichts Eigenes steht", () => {
    // „Behindertenparkplatz Dresden" ist der Platzhalter für Standorte ohne
    // Adresse. Bliebe nur „Dresden" übrig, wäre das irreführender als das
    // Präfix – hier ist die Stadt kein Name, sondern das Eingeständnis, dass
    // es keinen gibt.
    expect(stripRedundantPrefix("Behindertenparkplatz")).toBe("Behindertenparkplatz");
  });

  it("lässt andere Bezeichnungen unangetastet", () => {
    expect(stripRedundantPrefix("Tiefgarage Klinikum")).toBe("Tiefgarage Klinikum");
    expect(stripRedundantPrefix("Wanderparkplatz Tiergarten")).toBe("Wanderparkplatz Tiergarten");
  });
});

/**
 * **Jeder Fall hier stammt aus dem Bestand** (Stand 2026-10-20, die 174
 * Standorte ohne Straßennamen) – keine ausgedachten Varianten. Die
 * Unterscheidung entscheidet, ob `import:streets` eine Bezeichnung
 * überschreiben darf; ein Fehler nach der falschen Seite löscht die Angabe der
 * Quelle.
 */
describe("isGenericLabel", () => {
  it("erkennt den Platzhalter des OSM-Importers", () => {
    expect(isGenericLabel("Behindertenparkplatz Dormagen", "Dormagen")).toBe(true);
    expect(isGenericLabel("Behindertenparkplatz Neumünster", "Neumünster")).toBe(true);
  });

  it("erkennt ihn auch mit Klammerzusatz im Stadtnamen", () => {
    // Hier fällt eine Lösung über „endet mit dem Stadtnamen" nicht auf die
    // Nase, eine über `toSlug` schon – „frankfurt" gibt es zweimal (2d.11).
    expect(isGenericLabel("Behindertenparkplatz Frankfurt (Oder)", "Frankfurt (Oder)")).toBe(true);
    expect(
      isGenericLabel("Behindertenparkplatz Bad Homburg vor der Höhe", "Bad Homburg vor der Höhe"),
    ).toBe(true);
  });

  it("erkennt das Präfix allein als Platzhalter", () => {
    expect(isGenericLabel("Behindertenparkplatz", "Köln")).toBe(true);
    expect(isGenericLabel("Behindertenstellplatz", "Köln")).toBe(true);
  });

  it("schützt echte Namen aus OpenStreetMap", () => {
    expect(isGenericLabel("IKEA", "Duisburg")).toBe(false);
    expect(isGenericLabel("Tiefgarage Klinikum", "Mannheim")).toBe(false);
    expect(isGenericLabel("Wanderparkplatz Tiergarten, Tiergartenhütte", "Siegen")).toBe(false);
    expect(isGenericLabel("Park + Ride Parkhaus Tivoli (Areal C)", "Aachen")).toBe(false);
  });

  it("schützt echte Namen aus amtlichen Quellen", () => {
    // Diese vier hätte der Lauf vom 2026-10-20 zerstört.
    expect(isGenericLabel("Richard-Hecht-Schule", "Stutensee")).toBe(false);
    expect(isGenericLabel("P+R Bahnhof", "Germersheim")).toBe(false);
    expect(isGenericLabel("Tiefgarage Zentrum/Schloss", "Ettlingen")).toBe(false);
    expect(isGenericLabel("Messe Karlsruhe / Peter-Gross-Bau-Areal", "Rheinstetten")).toBe(false);
  });

  it("hält einen Straßennamen hinter dem Präfix für einen echten Namen", () => {
    // Gelsenkirchen stellt das Präfix jedem Eintrag voran (3.0g). Dahinter
    // steht eine Straße, und die darf nicht als Lücke gelten.
    expect(isGenericLabel("Behindertenparkplatz Ahstraße", "Gelsenkirchen")).toBe(false);
  });
});

describe("spotTitle", () => {
  it("bevorzugt Straße und Hausnummer", () => {
    expect(spotTitle({ street: "Berger Straße", houseNumber: "106", label: "irgendwas" })).toBe(
      "Berger Straße 106",
    );
  });

  it("kommt ohne Hausnummer aus", () => {
    expect(spotTitle({ street: "Appellhofplatz", houseNumber: null, label: "x" })).toBe(
      "Appellhofplatz",
    );
  });

  it("fällt auf die bereinigte Bezeichnung zurück", () => {
    expect(
      spotTitle({ street: null, houseNumber: null, label: "Behindertenparkplatz Ahstraße" }),
    ).toBe("Ahstraße");
  });
});
