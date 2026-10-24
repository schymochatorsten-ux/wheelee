import { describe, expect, it } from "vitest";
import { buildVerbaende } from "./verbaende.mjs";

const gemeinde = (over: Record<string, string>) => ({
  GF: "4",
  AGS: "08335043",
  ARS: "083350043043",
  GEN: "Konstanz",
  BEM: "gemeinschaftsangehörig",
  ...over,
});

const verband = (over: Record<string, string>) => ({
  GF: "4",
  ARS: "083350043",
  GEN: "Konstanz",
  BEZ: "Erfüllende Gemeinde",
  ...over,
});

describe("buildVerbaende", () => {
  it("verknüpft über die ersten neun Stellen der ARS", () => {
    const result = buildVerbaende([gemeinde({})], [verband({})]);
    expect(result.get("08335043")).toEqual({ name: "Konstanz", art: "Erfüllende Gemeinde" });
  });

  it("gibt null für Gemeinden, die keiner Gemeinschaft angehören", () => {
    const result = buildVerbaende([gemeinde({ BEM: "--" })], []);
    expect(result.get("08335043")).toBeNull();
  });

  it("bricht ab, wenn der Verband einer angehörigen Gemeinde fehlt", () => {
    expect(() => buildVerbaende([gemeinde({})], [])).toThrow(/Verband 083350043 fehlt/);
  });

  it("ignoriert Flächen ohne Landanteil", () => {
    const result = buildVerbaende([gemeinde({ GF: "2" })], [verband({})]);
    expect(result.size).toBe(0);
  });
});
