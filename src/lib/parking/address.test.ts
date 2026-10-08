import { describe, expect, it } from "vitest";
import { extractTimeRestriction, splitAddress } from "./address";

describe("extractTimeRestriction", () => {
  it("löst eine Zeitangabe in Klammern heraus", () => {
    expect(extractTimeRestriction("Berger Straße 40-42 ( Mo-Fr 8-19 Uhr )")).toEqual({
      rest: "Berger Straße 40-42",
      timeRestriction: "Mo-Fr 8-19 Uhr",
    });
  });

  it("löst eine Zeitangabe ohne Klammern heraus", () => {
    expect(extractTimeRestriction("Zimmerweg 6, Mo-Fr 7-21h")).toEqual({
      rest: "Zimmerweg 6",
      timeRestriction: "Mo-Fr 7-21h",
    });
  });

  it("erkennt werktags als Zeitangabe", () => {
    const result = extractTimeRestriction("Wittelsbacher Allee 36 (werktags 9-18h)");
    expect(result.rest).toBe("Wittelsbacher Allee 36");
    expect(result.timeRestriction).toBe("werktags 9-18h");
  });

  it("lässt Klammern ohne Zeitbezug stehen", () => {
    expect(extractTimeRestriction("Alfred-Brehm-Platz (Zoo)")).toEqual({
      rest: "Alfred-Brehm-Platz (Zoo)",
      timeRestriction: null,
    });
  });

  it("gibt null zurück, wenn keine Zeitangabe vorkommt", () => {
    expect(extractTimeRestriction("Berger Straße 106").timeRestriction).toBeNull();
  });
});

describe("splitAddress", () => {
  it("trennt Straße und Hausnummer", () => {
    expect(splitAddress("Berger Straße 106")).toEqual({
      street: "Berger Straße",
      houseNumber: "106",
      note: null,
      timeRestriction: null,
    });
  });

  it("behandelt Hausnummern mit Buchstaben und Bereichen", () => {
    expect(splitAddress("Adolf-Miersch-Straße 4e").houseNumber).toBe("4e");
    expect(splitAddress("Am Weingarten 18-20").houseNumber).toBe("18-20");
    expect(splitAddress("Alexanderstraße 94/96").houseNumber).toBe("94");
  });

  it("nimmt die Angabe nach dem Schrägstrich als Zusatz", () => {
    expect(splitAddress("Baumweg 45 / Arztpraxis")).toEqual({
      street: "Baumweg",
      houseNumber: "45",
      note: "Arztpraxis",
      timeRestriction: null,
    });
  });

  it("behandelt Kreuzungen ohne Hausnummer", () => {
    expect(splitAddress("Adalbertstr./Barmer Ersatzkasse")).toEqual({
      street: "Adalbertstr.",
      houseNumber: null,
      note: "Barmer Ersatzkasse",
      timeRestriction: null,
    });
  });

  it("zerlegt Adresse, Zusatz und Zeit gemeinsam", () => {
    expect(splitAddress("Alt Griesheim 18 Ärzthaus Mo-Fr 7.30-19.00 Uhr")).toEqual({
      street: "Alt Griesheim",
      houseNumber: "18",
      note: "Ärzthaus",
      timeRestriction: "Mo-Fr 7.30-19.00 Uhr",
    });
  });

  it("trennt Lagehinweise vom Straßennamen", () => {
    expect(splitAddress("Adalbertstr. vor Hausnummer 4")).toEqual({
      street: "Adalbertstr.",
      houseNumber: "4",
      note: "vor Hausnummer",
      timeRestriction: null,
    });

    const gegenueber = splitAddress(
      "Rat-Beil-Straße ggü. Hsnr. 41 (Hauptfriedhof Jüdischer Bereich)",
    );
    expect(gegenueber.street).toBe("Rat-Beil-Straße");
    expect(gegenueber.houseNumber).toBe("41");
    expect(gegenueber.note).toContain("ggü. Hsnr.");

    expect(splitAddress("Amperestraße Höhe Kleingartenanlage").street).toBe("Amperestraße");
  });

  it("behält mehrere Zusätze bei", () => {
    const result = splitAddress("Alte Falterstraße / Hartmannsweilerstraße / HL - Markt");
    expect(result.street).toBe("Alte Falterstraße");
    expect(result.note).toBe("Hartmannsweilerstraße / HL - Markt");
  });
});
