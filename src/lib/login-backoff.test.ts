import { beforeEach, describe, expect, it } from "vitest";
import {
  BACKOFF,
  clearLoginFailures,
  loginPauseSeconds,
  recordLoginFailure,
  resetLoginBackoff,
} from "./login-backoff";

/** Mindestpause je Adresse (ToDo 10.15 c); mit übergebener Uhrzeit, ohne Warten. */

beforeEach(() => resetLoginBackoff());

function fail(address: string, times: number, at: number): void {
  for (let i = 0; i < times; i += 1) recordLoginFailure(address, at);
}

describe("loginPauseSeconds", () => {
  it("lässt bis zur Grenze ohne Pause durch", () => {
    fail("a@example.org", BACKOFF.freeFailures, 0);
    expect(loginPauseSeconds("a@example.org", 0)).toBe(0);
  });

  it("verlangt nach dem ersten Fehlversuch über der Grenze 30 Sekunden", () => {
    fail("a@example.org", BACKOFF.freeFailures + 1, 0);
    expect(loginPauseSeconds("a@example.org", 0)).toBe(30);
    expect(loginPauseSeconds("a@example.org", 10_000)).toBe(20);
    expect(loginPauseSeconds("a@example.org", 30_000)).toBe(0);
  });

  it("verdoppelt die Pause mit jedem weiteren Fehlversuch, höchstens auf 15 Minuten", () => {
    fail("a@example.org", BACKOFF.freeFailures + 2, 0);
    expect(loginPauseSeconds("a@example.org", 0)).toBe(60);
    fail("a@example.org", 1, 0);
    expect(loginPauseSeconds("a@example.org", 0)).toBe(120);
    fail("a@example.org", 30, 0);
    expect(loginPauseSeconds("a@example.org", 0)).toBe(15 * 60);
  });

  it("zählt Adressen getrennt", () => {
    fail("a@example.org", BACKOFF.freeFailures + 1, 0);
    expect(loginPauseSeconds("b@example.org", 0)).toBe(0);
  });

  it("vergisst Fehlversuche nach dem Fenster", () => {
    fail("a@example.org", BACKOFF.freeFailures + 1, 0);
    expect(loginPauseSeconds("a@example.org", BACKOFF.windowMs)).toBe(0);
  });

  it("setzt sich mit einer gelungenen Anmeldung zurück", () => {
    fail("a@example.org", BACKOFF.freeFailures + 1, 0);
    clearLoginFailures("a@example.org");
    expect(loginPauseSeconds("a@example.org", 0)).toBe(0);
  });

  it("behandelt unbekannte Adressen wie bekannte", () => {
    // Die Funktion kennt keine Konten – genau das hält sie von einer Auskunft
    // darüber frei, wer eines hat.
    fail("niemand@example.org", BACKOFF.freeFailures + 1, 0);
    expect(loginPauseSeconds("niemand@example.org", 0)).toBe(30);
  });

  it("begrenzt die Zahl der verfolgten Adressen", () => {
    for (let i = 0; i < BACKOFF.maxTracked + 5; i += 1) recordLoginFailure(`x${i}@example.org`, 0);
    fail("spaet@example.org", BACKOFF.freeFailures + 1, 0);
    // Eine neue Adresse jenseits der Grenze wird nicht mehr verfolgt.
    expect(loginPauseSeconds("spaet@example.org", 0)).toBe(0);
  });
});
