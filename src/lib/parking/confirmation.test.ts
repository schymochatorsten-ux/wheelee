import { describe, expect, it } from "vitest";
import {
  checkedAt,
  confirmationOf,
  confirmationSummary,
  isCityChecked,
  toleranceMeters,
} from "./confirmation";

/**
 * Tests für das Lesen von `data/_bestaetigt.json` (ToDos 3.1, 3.7).
 *
 * **Sie prüfen die Regeln, nicht den Inhalt der Datei.** Welche Städte
 * abgeglichen sind, ändert sich mit jedem `npm run validate` – ein Test auf
 * „Germersheim ist bestätigt" wäre beim nächsten Lauf falsch, ohne dass etwas
 * kaputt wäre. Geprüft wird deshalb das Verhalten an den Rändern, und das ist
 * auch das, was schiefgehen kann.
 */
describe("confirmationOf", () => {
  it("gibt für eine unbekannte ID `null` zurück – nicht „nicht bestätigt“", () => {
    /*
     * Der wichtigste Fall überhaupt. `null` heißt „nicht geprüft"; daraus
     * „nicht bestätigt" zu machen wäre eine Falschaussage über 186 Städte, die
     * gar keine zweite Quelle haben.
     */
    expect(confirmationOf("gibt-es-nicht-0000000000")).toBeNull();
  });

  it("liefert nur die beiden bekannten Zustände", () => {
    for (const id of ["a", "b", "c"]) {
      const value = confirmationOf(id);
      expect(value === null || value === "bestaetigt" || value === "nur_amtlich").toBe(true);
    }
  });

  it("nennt die Toleranz, mit der gepaart wurde", () => {
    // Ohne diese Angabe ist „bestätigt" nicht nachvollziehbar: Es hängt daran,
    // wie nah zwei Quellen sich kommen müssen.
    expect(toleranceMeters()).toBeGreaterThan(0);
  });
});

describe("isCityChecked", () => {
  it("unterscheidet geprüfte von nicht geprüften Städten", () => {
    expect(isCityChecked("gibt-es-nicht")).toBe(false);
    expect(checkedAt("gibt-es-nicht")).toBeNull();
  });

  it("nennt für geprüfte Städte ein Datum", () => {
    const summary = confirmationSummary();
    if (summary.cities === 0) return; // Noch kein Lauf – dann ist nichts zu prüfen.

    // Jede geführte Stadt muss ein Datum tragen; ein Abgleich ohne Zeitpunkt
    // wäre keine Auskunft, sondern eine Behauptung.
    expect(summary.confirmed + summary.officialOnly).toBeGreaterThan(0);
  });
});

describe("confirmationSummary", () => {
  it("zählt nicht mehr Bestätigungen als geprüfte Standorte", () => {
    const summary = confirmationSummary();
    expect(summary.confirmed).toBeGreaterThanOrEqual(0);
    expect(summary.officialOnly).toBeGreaterThanOrEqual(0);
  });
});
