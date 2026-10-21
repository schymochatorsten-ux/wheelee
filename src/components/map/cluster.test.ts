import { describe, expect, it } from "vitest";
import { clusterLabel, clusterSize, MIN_CLUSTER_PX } from "./cluster";

describe("clusterSize", () => {
  it("unterschreitet nie das Mindestmaß für Bedienziele", () => {
    for (const anzahl of [2, 3, 9, 10, 99, 100, 5_000]) {
      expect(clusterSize(anzahl)).toBeGreaterThanOrEqual(MIN_CLUSTER_PX);
    }
  });

  it("wächst mit der Anzahl, aber nicht unbegrenzt", () => {
    expect(clusterSize(5)).toBeLessThan(clusterSize(50));
    expect(clusterSize(50)).toBeLessThan(clusterSize(500));
    expect(clusterSize(50_000)).toBe(clusterSize(500));
  });
});

describe("clusterLabel", () => {
  it("sagt, was die Zahl bedeutet und was ein Antippen bewirkt", () => {
    expect(clusterLabel(47)).toBe("47 Parkplätze in diesem Bereich, zum Aufteilen antippen");
  });

  it("beugt auch die Einzahl", () => {
    expect(clusterLabel(1)).toContain("1 Parkplatz in");
  });
});
