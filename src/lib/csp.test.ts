import { describe, expect, it } from "vitest";
import { contentSecurityPolicy } from "./csp";

const scriptSrc = (policy: string) => /script-src ([^;]+)/u.exec(policy)?.[1] ?? "";

describe("contentSecurityPolicy", () => {
  it("erlaubt Skripte nur mit der Nonce – ohne 'unsafe-inline'", () => {
    const quellen = scriptSrc(contentSecurityPolicy("abc123", false));

    expect(quellen).toContain("'nonce-abc123'");
    expect(quellen).not.toContain("'unsafe-inline'");
    expect(quellen).not.toContain("'unsafe-eval'");
  });

  it("lockert nur im Entwicklungsbetrieb: eval und WebSocket", () => {
    const entwicklung = contentSecurityPolicy("n", true);
    const produktion = contentSecurityPolicy("n", false);

    expect(scriptSrc(entwicklung)).toContain("'unsafe-eval'");
    expect(entwicklung).toContain("connect-src 'self' ws:");
    expect(scriptSrc(produktion)).not.toContain("'unsafe-eval'");
    expect(produktion).not.toContain("ws:");
  });

  it("lässt keinen fremden Skript-Server zu", () => {
    expect(scriptSrc(contentSecurityPolicy("n", true))).not.toMatch(/https?:/u);
  });
});
