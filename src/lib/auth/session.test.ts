import { describe, expect, it } from "vitest";
import { readCookie } from "./session";

const request = (cookie?: string) =>
  new Request("http://localhost/", cookie ? { headers: { cookie } } : {});

describe("readCookie", () => {
  it("liest den Wert und dekodiert ihn", () => {
    expect(readCookie(request("a=1; wheelee-session=ab%20c"), "wheelee-session")).toBe("ab c");
  });

  it("liefert undefined ohne Cookie oder ohne den Namen", () => {
    expect(readCookie(request(), "wheelee-session")).toBeUndefined();
    expect(readCookie(request("a=1"), "wheelee-session")).toBeUndefined();
  });

  // Gemessen im Produktionsbau (10.9): Das warf URIError und ergab 500.
  it("wirft bei ungültigem %-Code nicht, sondern gilt als nicht vorhanden", () => {
    expect(readCookie(request("wheelee-session=%E0%A4%A"), "wheelee-session")).toBeUndefined();
    expect(readCookie(request("wheelee-session=%zz"), "wheelee-session")).toBeUndefined();
  });
});
