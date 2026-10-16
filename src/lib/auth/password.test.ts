import { describe, expect, it } from "vitest";
import { hashPassword, verifyPassword } from "./password";
import { MIN_PASSWORD_LENGTH, passwordProblem } from "./password-rules";
import { looksLikeEmail, normalizeEmail } from "./email";

/**
 * Passwörter und Adressen (ToDo 11.1).
 *
 * Diese Tests sichern Eigenschaften, deren Verlust man **nicht sehen würde**:
 * Ein Hash, der zweimal gleich ausfällt, sieht genauso aus wie ein guter. Eine
 * Anmeldung mit falschem Passwort, die durchgeht, fällt erst auf, wenn es zu
 * spät ist.
 */

describe("hashPassword / verifyPassword", () => {
  it("erkennt das richtige Passwort wieder", () => {
    const hash = hashPassword("ein gutes langes Passwort");
    expect(verifyPassword("ein gutes langes Passwort", hash)).toBe(true);
  });

  it("weist ein falsches Passwort ab", () => {
    const hash = hashPassword("ein gutes langes Passwort");
    expect(verifyPassword("ein gutes langes passwort", hash)).toBe(false);
    expect(verifyPassword("", hash)).toBe(false);
    expect(verifyPassword("ein gutes langes Passwort ", hash)).toBe(false);
  });

  it("speichert dasselbe Passwort zweimal verschieden", () => {
    /*
     * Das ist der Zweck des Salzes: Ohne es wären zwei Konten mit demselben
     * Passwort in der Datenbank als gleich zu erkennen – und eine einmal
     * berechnete Tabelle würde für alle gelten.
     */
    const a = hashPassword("dasselbe Passwort");
    const b = hashPassword("dasselbe Passwort");
    expect(a).not.toBe(b);
    expect(verifyPassword("dasselbe Passwort", a)).toBe(true);
    expect(verifyPassword("dasselbe Passwort", b)).toBe(true);
  });

  it("enthält das Passwort nicht im Klartext", () => {
    expect(hashPassword("Bahnhofstrasse12")).not.toContain("Bahnhofstrasse12");
  });

  it("trägt die Kostenparameter mit", () => {
    // Nur dadurch lassen sie sich später erhöhen, ohne alte Konten
    // auszusperren.
    const [verfahren, n, r, p] = hashPassword("ein gutes langes Passwort").split("$");
    expect(verfahren).toBe("scrypt");
    expect(Number(n)).toBeGreaterThanOrEqual(2 ** 14);
    expect(Number(r)).toBeGreaterThan(0);
    expect(Number(p)).toBeGreaterThan(0);
  });

  it("lehnt einen beschädigten Hash ab, statt zu scheitern", () => {
    /*
     * Ein kaputter Eintrag in der Datenbank darf die Anmeldung mit „stimmt
     * nicht" beantworten, nicht mit einem Serverfehler – sonst verrät die
     * Fehlerseite, dass an diesem Konto etwas besonders ist.
     */
    for (const kaputt of [
      "",
      "scrypt$",
      "scrypt$x$8$1$aaaa$bbbb",
      "argon2$16384$8$1$aaaa$bbbb",
      "scrypt$16384$8$1$$",
      "nur-irgendwas",
    ]) {
      expect(verifyPassword("ein gutes langes Passwort", kaputt)).toBe(false);
    }
  });

  it("behandelt gleich aussehende Umlaute gleich", () => {
    // „ü" gibt es in Unicode zweimal: als eigenes Zeichen und als u mit
    // Trema. Wer sein Passwort auf einem anderen Gerät eintippt, bekommt
    // womöglich die andere Schreibweise – und käme ohne Normalisierung nicht
    // mehr hinein.
    const hash = hashPassword("Südstraße-2026");
    expect(verifyPassword("Südstraße-2026", hash)).toBe(true);
  });
});

describe("passwordProblem", () => {
  it("verlangt die Mindestlänge", () => {
    expect(passwordProblem("a".repeat(MIN_PASSWORD_LENGTH - 1))).not.toBeNull();
    expect(passwordProblem("a".repeat(MIN_PASSWORD_LENGTH))).toBeNull();
  });

  it("begrenzt nach oben", () => {
    // Sonst rechnet scrypt bei jedem Versuch über ein Megabyte.
    expect(passwordProblem("a".repeat(201))).not.toBeNull();
  });
});

describe("normalizeEmail / looksLikeEmail", () => {
  it("behandelt Groß- und Kleinschreibung als dieselbe Adresse", () => {
    expect(normalizeEmail("  Torsten@Example.DE ")).toBe("torsten@example.de");
  });

  it("nimmt übliche Adressen an", () => {
    for (const adresse of [
      "a@b.de",
      "vor.nach@beispiel.co.uk",
      "mit+zusatz@beispiel.de",
      "umlaut@müller.de",
    ]) {
      expect(looksLikeEmail(adresse)).toBe(true);
    }
  });

  it("weist ab, was keine Adresse ist", () => {
    for (const falsch of [
      "",
      "torsten",
      "torsten@",
      "@beispiel.de",
      "torsten@beispiel",
      "zwei@@beispiel.de",
      "mit leerzeichen@beispiel.de",
      "a@b.de, c@d.de",
    ]) {
      expect(looksLikeEmail(falsch)).toBe(false);
    }
  });
});
