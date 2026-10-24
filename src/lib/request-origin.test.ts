import { describe, expect, it } from "vitest";
import { judgeWritingRequest } from "./request-origin";

const h = (init: Record<string, string>) => new Headers(init);

describe("judgeWritingRequest", () => {
  it("lässt lesende Anfragen immer durch", () => {
    expect(judgeWritingRequest("GET", h({ "sec-fetch-site": "cross-site" }))).toBe("ok");
  });

  it("weist fremde Ursprünge ab – nach Sec-Fetch-Site", () => {
    expect(judgeWritingRequest("POST", h({ "sec-fetch-site": "cross-site" }))).toBe("foreign-origin");
    expect(judgeWritingRequest("DELETE", h({ "sec-fetch-site": "same-site" }))).toBe("foreign-origin");
    expect(judgeWritingRequest("POST", h({ "sec-fetch-site": "same-origin" }))).toBe("ok");
    expect(judgeWritingRequest("POST", h({ "sec-fetch-site": "none" }))).toBe("ok");
  });

  it("vergleicht ohne Sec-Fetch-Site den Origin mit dem Host", () => {
    const eigen = { host: "wheelee.test:3000", origin: "http://wheelee.test:3000" };
    expect(judgeWritingRequest("PUT", h(eigen))).toBe("ok");
    expect(judgeWritingRequest("PUT", h({ ...eigen, origin: "https://boese.example" }))).toBe(
      "foreign-origin",
    );
    expect(judgeWritingRequest("PUT", h({ ...eigen, origin: "null" }))).toBe("foreign-origin");
  });

  it("beachtet den weitergeleiteten Host hinter einem Proxy", () => {
    expect(
      judgeWritingRequest(
        "POST",
        h({ host: "intern:3000", "x-forwarded-host": "wheelee.ts.net", origin: "https://wheelee.ts.net" }),
      ),
    ).toBe("ok");
  });

  it("lässt Programme ohne beide Kopfzeilen durch", () => {
    expect(judgeWritingRequest("POST", h({ "content-type": "application/json", "content-length": "2" }))).toBe("ok");
  });

  it("verlangt JSON, wenn ein Rumpf da ist", () => {
    expect(
      judgeWritingRequest("POST", h({ "content-type": "text/plain", "content-length": "5" })),
    ).toBe("unsupported-media-type");
    expect(judgeWritingRequest("POST", h({ "content-length": "5" }))).toBe("unsupported-media-type");
    expect(
      judgeWritingRequest("POST", h({ "content-type": "application/json; charset=utf-8", "content-length": "5" })),
    ).toBe("ok");
    expect(
      judgeWritingRequest("POST", h({ "content-type": "application/json", "content-length": "20000" })),
    ).toBe("payload-too-large");
    expect(judgeWritingRequest("DELETE", h({ "content-length": "0" }))).toBe("ok");
    expect(judgeWritingRequest("POST", h({}))).toBe("ok");
  });
});
