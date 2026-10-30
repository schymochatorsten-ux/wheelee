import { describe, expect, it } from "vitest";
import { looksLikeStreet } from "./street-from-coordinates.mjs";

describe("looksLikeStreet", () => {
  it("erkennt Straßennamen", () => {
    for (const name of [
      "Bismarckstraße",
      "Hauptstr.",
      "Am Gatherhof",
      "Kennedyplatz",
      "Bilker Allee",
      "Rheinufer",
      "Im Emscherbruch",
      "Zur Mühle",
    ]) {
      expect(looksLikeStreet(name), name).toBe(true);
    }
  });

  it("erkennt Beschreibungen des Ziels, die keine Straße sind", () => {
    for (const text of [
      "Sanitätshaus",
      "Krankenhaus",
      "Altstadt",
      "Arztpraxis",
      "Friedhof",
      "allgemeiner Bedarf",
      "Praxis für Physiotherapie",
      "Fernbusbahnhof",
    ]) {
      expect(looksLikeStreet(text), text).toBe(false);
    }
  });
});
