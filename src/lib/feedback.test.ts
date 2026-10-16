import { describe, expect, it } from "vitest";
import {
  isFeedbackKind,
  isFeedbackStatus,
  MESSAGE_MAX,
  validateFeedback,
  CONTACT_HINT,
} from "./feedback";

/**
 * Die Prüfung der Rückmeldungen (ToDos 17.2, 17.3).
 *
 * Sie läuft in Browser **und** Server aus derselben Datei. Diese Tests sind
 * damit die einzige Stelle, an der beide Seiten gemeinsam abgesichert sind –
 * hielte sich nur eine an die Regeln, wäre es entweder ein unbrauchbares
 * Formular oder ein offener Endpunkt.
 */

const gueltig = {
  kind: "fehler",
  message: "Der Parkplatz Bahnhofstraße 4 ist aufgehoben.",
};

describe("validateFeedback", () => {
  it("nimmt eine vollständige Fehlermeldung an", () => {
    const result = validateFeedback(gueltig);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.kind).toBe("fehler");
      expect(result.value.contactEmail).toBeNull();
    }
  });

  it("verlangt eine der beiden Arten", () => {
    const result = validateFeedback({ ...gueltig, kind: "" });
    expect(result).toMatchObject({ ok: false, field: "kind" });

    // Auch eine erfundene Art darf nicht durchkommen: Die Spalte in der
    // Datenbank hat eine CHECK-Bedingung, und ein Verstoß wäre ein
    // Serverfehler statt einer Rückmeldung an die Nutzerin.
    expect(validateFeedback({ ...gueltig, kind: "lob" })).toMatchObject({
      ok: false,
      field: "kind",
    });
  });

  it("weist eine zu knappe Nachricht ab", () => {
    expect(validateFeedback({ ...gueltig, message: "kaputt" })).toMatchObject({
      ok: false,
      field: "message",
    });
  });

  it("weist eine überlange Nachricht ab, statt sie abzuschneiden", () => {
    // Abschneiden wäre schlimmer: Die Meldung sähe abgeschickt aus, und der
    // entscheidende Satz am Ende fehlte.
    const result = validateFeedback({ ...gueltig, message: "a".repeat(MESSAGE_MAX + 1) });
    expect(result).toMatchObject({ ok: false, field: "message" });
  });

  it("erlaubt eine Nachricht genau an der Grenze", () => {
    expect(validateFeedback({ ...gueltig, message: "a".repeat(MESSAGE_MAX) }).ok).toBe(true);
  });

  it("behandelt eine fehlende Adresse als richtig und nicht als Mangel", () => {
    // Die Adresse ist freiwillig – das ist die Zusage aus dem Formular.
    for (const leer of [undefined, null, "", "   "]) {
      expect(validateFeedback({ ...gueltig, contactEmail: leer }).ok).toBe(true);
    }
  });

  it("weist eine falsch geschriebene Adresse ab", () => {
    // Eine Adresse mit Tippfehler ist schlechter als keine: Sie verspricht
    // eine Antwort, die nirgends ankommt.
    for (const falsch of ["torsten", "torsten@", "@example.de", "torsten@example"]) {
      expect(validateFeedback({ ...gueltig, contactEmail: falsch })).toMatchObject({
        ok: false,
        field: "contactEmail",
      });
    }
  });

  it("vereinheitlicht die Adresse", () => {
    const result = validateFeedback({ ...gueltig, contactEmail: "  Torsten@Example.DE " });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.value.contactEmail).toBe("torsten@example.de");
  });

  it("schneidet Begleitangaben auf eine Höchstlänge", () => {
    const result = validateFeedback({
      ...gueltig,
      userAgent: "x".repeat(1_000),
      url: "https://wheelee.de/".padEnd(1_000, "a"),
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.userAgent!.length).toBeLessThanOrEqual(300);
      expect(result.value.url!.length).toBeLessThanOrEqual(500);
    }
  });

  it("entfernt Leerraum um die Nachricht", () => {
    const result = validateFeedback({ ...gueltig, message: `  ${gueltig.message}  ` });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.value.message).toBe(gueltig.message);
  });
});

describe("Arten und Stände", () => {
  it("kennt genau die beiden Arten", () => {
    expect(isFeedbackKind("fehler")).toBe(true);
    expect(isFeedbackKind("vorschlag")).toBe(true);
    expect(isFeedbackKind("sonstiges")).toBe(false);
  });

  it("kennt die vier Stände der Übersicht", () => {
    for (const stand of ["neu", "in_arbeit", "umgesetzt", "verworfen"]) {
      expect(isFeedbackStatus(stand)).toBe(true);
    }
    expect(isFeedbackStatus("erledigt")).toBe(false);
  });
});

describe("Hinweis zur E-Mail-Adresse", () => {
  it("sagt, dass es ohne Adresse keine Antwort gibt", () => {
    /*
     * Dieser Test prüft eine **Zusage**, nicht eine Formulierung: Das Feld ist
     * freiwillig, und wer es leer lässt, muss wissen, dass er nichts hört. Wird
     * der Text einmal umgeschrieben, soll auffallen, wenn dabei genau diese
     * Aussage verloren geht.
     */
    expect(CONTACT_HINT).toMatch(/Nur mit Adresse/u);
    expect(CONTACT_HINT).toMatch(/Ohne Adresse/u);
  });
});
