import { describe, expect, it } from "vitest";
import {
  ambiguousCores,
  cityCore,
  isRelevant,
  matchesCity,
  type CkanDataset,
} from "./scan-sources.mjs";

/**
 * Prüft die Zuordnung Datensatz → Stadt.
 *
 * Der Anlass ist echt: „Frankfurt (Oder)" bekam den Datensatz von „Frankfurt
 * am Main", weil beide auf „frankfurt" verkürzt wurden. Gefangen hat es nur
 * die Abstandsprüfung beim Import – bei zwei gleichnamigen Städten nahe
 * beieinander hätte sie nicht angeschlagen.
 */

const REGISTER = [
  { name: "Frankfurt am Main", state: "Hessen" },
  { name: "Frankfurt (Oder)", state: "Brandenburg" },
  { name: "Essen", state: "Nordrhein-Westfalen" },
  { name: "Halle (Saale)", state: "Sachsen-Anhalt" },
];

const ambiguous = ambiguousCores(REGISTER);

function dataset(title: string, url = "https://example.invalid/daten"): CkanDataset {
  return { name: "x", title, resources: [{ url, format: "WFS" }] };
}

describe("cityCore", () => {
  it("streicht Klammerzusatz und Flussangabe", () => {
    expect(cityCore("Frankfurt (Oder)")).toBe("frankfurt");
    expect(cityCore("Frankfurt am Main")).toBe("frankfurt");
    expect(cityCore("Halle (Saale)")).toBe("halle");
  });
});

describe("ambiguousCores", () => {
  it("findet nur die mehrfach vergebenen Kernnamen", () => {
    expect([...ambiguous]).toEqual(["frankfurt"]);
  });
});

describe("matchesCity", () => {
  const ffm = REGISTER[0];
  const ffo = REGISTER[1];

  it("ordnet den Frankfurter Datensatz nicht Frankfurt (Oder) zu", () => {
    const d = dataset("WFS Parken in der Stadt Frankfurt am Main");
    expect(matchesCity(d, ffm, ambiguous)).toBe(true);
    expect(matchesCity(d, ffo, ambiguous)).toBe(false);
  });

  it("erkennt Frankfurt (Oder) am Zusatz", () => {
    const d = dataset("Behindertenparkplätze Frankfurt (Oder)");
    expect(matchesCity(d, ffo, ambiguous)).toBe(true);
  });

  it("erkennt Frankfurt (Oder) am Bundesland", () => {
    const d = dataset("Parken Frankfurt", "https://geo.brandenburg.de/wfs/parken");
    expect(matchesCity(d, ffo, ambiguous)).toBe(true);
  });

  it("lehnt einen mehrdeutigen Treffer ohne Unterscheidung bei beiden ab", () => {
    // Lieber keine Zuordnung als die falsche: Der Importer fällt dann auf
    // OpenStreetMap zurück, statt die Daten der anderen Stadt zu übernehmen.
    const d = dataset("Parkplätze Frankfurt");
    expect(matchesCity(d, ffm, ambiguous)).toBe(false);
    expect(matchesCity(d, ffo, ambiguous)).toBe(false);
  });

  it('prüft weiterhin auf Wortgrenzen – „Essen" steckt in „Hessen"', () => {
    const d = dataset("Behindertenparkplätze des Landes Hessen");
    expect(matchesCity(d, REGISTER[2], ambiguous)).toBe(false);
  });

  it("lässt eindeutige Namen mit Klammerzusatz unangetastet", () => {
    const d = dataset("Behindertenparkplätze Halle");
    expect(matchesCity(d, REGISTER[3], ambiguous)).toBe(true);
  });

  it("findet den Stadtnamen auch nur in der Ressourcen-URL", () => {
    const d = dataset("Behindertenstellplätze", "https://gdi.berlin.de/wfs/behindertenparkplaetze");
    expect(matchesCity(d, { name: "Berlin", state: "Berlin" }, ambiguous)).toBe(true);
  });
});

describe("isRelevant", () => {
  /**
   * Der Anlass ist echt und hat Schaden angerichtet: Chemnitz kam mit 13
   * Standorten aus „Parkplätze Wohnmobil" – Wohnmobilstellplätze, in der App
   * als Behindertenparkplätze ausgewiesen (ToDo 2d.10).
   */
  it("lehnt Parkdatensätze für eine andere Zielgruppe ab", () => {
    expect(isRelevant(dataset("Parkplätze Wohnmobil"))).toBe(false);
    expect(isRelevant(dataset("Parkplätze Reisebus"))).toBe(false);
    expect(isRelevant(dataset("Bewohnerparken Krefeld"))).toBe(false);
    expect(isRelevant(dataset("Anwohnerparkzonen"))).toBe(false);
    expect(isRelevant(dataset("Lademöglichkeiten E-Ladesäulen Parkplätze"))).toBe(false);
  });

  it("nimmt den eindeutigen Datensatz weiterhin an", () => {
    expect(isRelevant(dataset("Behindertenstellplätze Hamburg"))).toBe(true);
    expect(isRelevant(dataset("Schwerbehindertenparkplätze Dresden"))).toBe(true);
  });

  it("lässt den Sammeldienst durch, aus dem die Ebene geholt wird", () => {
    // Frankfurts Datensatz heißt nur „WFS Parken…"; die Behindertenparkplätze
    // sind eine Ebene darin. Diese Ausnahme muss erhalten bleiben.
    expect(isRelevant(dataset("WFS Parken in der Stadt Frankfurt am Main"))).toBe(true);
  });

  it("lehnt ab, was gar nicht von Parken handelt", () => {
    // Für Hamburg schlug die Suche Werkstätten für Menschen mit Behinderung vor.
    expect(isRelevant(dataset("Werkstätten für Menschen mit Behinderung"))).toBe(false);
  });
});
