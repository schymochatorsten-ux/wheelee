import { describe, expect, it } from "vitest";
import { BodyTooLargeError, MAX_JSON_BYTES, readJson } from "./read-json";

const post = (body: BodyInit | null, headers: Record<string, string> = {}) =>
  new Request("http://x/api/feedback", { method: "POST", body, headers });

describe("readJson", () => {
  it("liest gültiges JSON", async () => {
    expect(await readJson(post('{"a":1}'))).toEqual({ a: 1 });
  });

  it("wirft bei ungültigem JSON und bei fehlendem Rumpf", async () => {
    await expect(readJson(post("{kaputt"))).rejects.toBeInstanceOf(SyntaxError);
    await expect(readJson(post(null))).rejects.toBeInstanceOf(SyntaxError);
  });

  it("weist zu große Rümpfe ab, auch ohne ehrliche Content-Length", async () => {
    const gross = JSON.stringify({ message: "x".repeat(MAX_JSON_BYTES) });
    await expect(readJson(post(gross))).rejects.toBeInstanceOf(BodyTooLargeError);

    const lügt = post(gross, { "content-length": "10" });
    await expect(readJson(lügt)).rejects.toBeInstanceOf(BodyTooLargeError);
  });

  it("nennt in der Fehlermeldung keinen Inhalt", async () => {
    const gross = JSON.stringify({ geheim: "passwort123".repeat(3000) });
    const fehler = await readJson(post(gross)).catch((e: Error) => e);
    expect((fehler as Error).message).not.toContain("passwort123");
  });

  it("lässt genau die Obergrenze durch", async () => {
    const rumpf = JSON.stringify({ s: "x".repeat(MAX_JSON_BYTES - 8) });
    expect(new TextEncoder().encode(rumpf).length).toBe(MAX_JSON_BYTES);
    await expect(readJson(post(rumpf))).resolves.toBeTruthy();
  });
});
