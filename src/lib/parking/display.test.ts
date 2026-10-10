import { describe, expect, it } from "vitest";
import { spotTitle, stripRedundantPrefix } from "./display";

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
