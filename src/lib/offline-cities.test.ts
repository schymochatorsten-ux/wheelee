import { describe, expect, it } from "vitest";
import { formatBytes, stalenessOf } from "./offline-cities";

const now = new Date("2026-10-23T12:00:00Z");

describe("stalenessOf", () => {
  it("frische Daten, frische Kopie", () => {
    expect(stalenessOf({ importedAt: "2026-10-01", savedAt: "2026-10-20T10:00:00Z" }, now)).toBe(
      "fresh",
    );
  });

  it("Kopie über einen Monat alt", () => {
    expect(stalenessOf({ importedAt: "2026-10-01", savedAt: "2026-08-01T10:00:00Z" }, now)).toBe(
      "copy",
    );
  });

  it("Daten über ein halbes Jahr alt, auch bei frischer Kopie", () => {
    expect(stalenessOf({ importedAt: "2026-03-01", savedAt: "2026-10-22T10:00:00Z" }, now)).toBe(
      "data",
    );
  });

  it("Daten knapp unter der Schwelle gelten noch", () => {
    expect(stalenessOf({ importedAt: "2026-04-20", savedAt: "2026-10-22T10:00:00Z" }, now)).toBe(
      "fresh",
    );
  });
});

describe("formatBytes", () => {
  it("rundet auf KB und MB", () => {
    expect(formatBytes(200 * 1024)).toBe("200 KB");
    expect(formatBytes(10)).toBe("1 KB");
    expect(formatBytes(3.5 * 1024 * 1024)).toBe("3,5 MB");
  });
});
