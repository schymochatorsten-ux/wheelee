import { describe, expect, it } from "vitest";
import { spotSummary } from "./spot-summary";

describe("spotSummary", () => {
  it("gibt null zurück, wenn der Bestand den Parkplatz nicht kennt", () => {
    // Daran hängt, dass Stimmen und Favoriten auf verschwundene Plätze in der
    // Liste bleiben, statt stillschweigend zu fehlen (ToDos 11.4, 11.5).
    expect(spotSummary("gibt-es-nicht-0000")).toBeNull();
  });
});
