import { afterEach, beforeEach, describe, expect, it } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { closeDb, db } from "./sqlite";
import { createAccount, createSession } from "./accounts";
import { listFeedback, saveFeedback, updateFeedback } from "./feedback";
import { FEEDBACK_RETENTION_DAYS, maybePurge, purgeExpired, resetPurgeThrottle } from "./cleanup";
import type { ValidFeedback } from "../feedback";

/**
 * Aufräumen nach Frist (ToDo 17.5).
 *
 * Geprüft wird gegen eine echte Datenbank, nicht gegen eine Nachbildung: Die
 * Bedingung steckt in SQL (`COALESCE(updated_at, created_at)`), und genau dort
 * wäre ein Fehler unsichtbar – er löschte entweder zu viel oder nie etwas, und
 * beides fällt im Betrieb erst nach Monaten auf.
 */

let folder: string;

beforeEach(() => {
  folder = fs.mkdtempSync(path.join(os.tmpdir(), "wheelee-cleanup-"));
  process.env.WHEELEE_DB_PATH = path.join(folder, "test.sqlite");
  closeDb();
  resetPurgeThrottle();
});

afterEach(() => {
  closeDb();
  delete process.env.WHEELEE_DB_PATH;
  fs.rmSync(folder, { recursive: true, force: true });
});

const TAG = 24 * 60 * 60 * 1000;

const meldung = (over: Partial<ValidFeedback> = {}): ValidFeedback => ({
  kind: "fehler",
  message: "Der Parkplatz Bahnhofstraße 4 ist aufgehoben.",
  contactEmail: null,
  spotId: null,
  city: null,
  url: null,
  userAgent: null,
  appVersion: null,
  deviceId: null,
  ...over,
});

/** Eine Meldung künstlich altern lassen – anders ist eine Frist nicht prüfbar. */
function datiere(id: number, createdAt: string, updatedAt: string | null): void {
  db()
    .prepare("UPDATE feedback SET created_at = ?, updated_at = ? WHERE id = ?")
    .run(createdAt, updatedAt, id);
}

const vorTagen = (tage: number) => new Date(Date.now() - tage * TAG).toISOString();

describe("purgeExpired – Rückmeldungen", () => {
  it("löscht eine erledigte Meldung nach Ablauf der Frist", () => {
    const id = saveFeedback(meldung(), null);
    updateFeedback(id, { status: "umgesetzt" });
    datiere(id, vorTagen(500), vorTagen(400));

    expect(purgeExpired().feedback).toBe(1);
    expect(listFeedback()).toHaveLength(0);
  });

  it("löscht auch verworfene Meldungen", () => {
    const id = saveFeedback(meldung(), null);
    updateFeedback(id, { status: "verworfen" });
    datiere(id, vorTagen(500), vorTagen(400));

    expect(purgeExpired().feedback).toBe(1);
  });

  it("lässt offene Meldungen stehen, egal wie alt", () => {
    /*
     * Eine Meldung, die niemand bearbeitet hat, ist nicht erledigt – sie ist
     * liegen geblieben. Sie zu löschen hieße, einen Hinweis auf einen
     * womöglich falschen Parkplatz zu verlieren, weil sich niemand darum
     * gekümmert hat.
     */
    const neu = saveFeedback(meldung(), null);
    datiere(neu, vorTagen(900), null);

    const inArbeit = saveFeedback(meldung(), null);
    updateFeedback(inArbeit, { status: "in_arbeit" });
    datiere(inArbeit, vorTagen(900), vorTagen(800));

    expect(purgeExpired().feedback).toBe(0);
    expect(listFeedback()).toHaveLength(2);
  });

  it("rechnet ab der Erledigung, nicht ab dem Eingang", () => {
    /*
     * Der Fall, auf den es ankommt: dreizehn Monate offen gelegen, gestern
     * abgeschlossen. Nach dem Eingangsdatum gerechnet verschwände die Meldung
     * noch am selben Tag – und niemand könnte mehr nachsehen, worauf sich die
     * Korrektur stützte.
     */
    const id = saveFeedback(meldung(), null);
    updateFeedback(id, { status: "umgesetzt" });
    datiere(id, vorTagen(400), vorTagen(1));

    expect(purgeExpired().feedback).toBe(0);
  });

  it("lässt eine Meldung knapp innerhalb der Frist stehen", () => {
    const id = saveFeedback(meldung(), null);
    updateFeedback(id, { status: "umgesetzt" });
    datiere(id, vorTagen(400), vorTagen(FEEDBACK_RETENTION_DAYS - 2));

    expect(purgeExpired().feedback).toBe(0);
  });

  it("nimmt die freiwillige Antwortadresse mit", () => {
    // Das Formular sagt zu, dass die Adresse „mit der Meldung gelöscht" wird.
    // Eine Zusage ohne Ausführung ist schlimmer als keine Zusage.
    const id = saveFeedback(meldung({ contactEmail: "jemand@example.de" }), null);
    updateFeedback(id, { status: "umgesetzt" });
    datiere(id, vorTagen(500), vorTagen(400));

    purgeExpired();

    const rest = db()
      .prepare("SELECT COUNT(*) AS anzahl FROM feedback WHERE contact_email IS NOT NULL")
      .get() as { anzahl: number };
    expect(Number(rest.anzahl)).toBe(0);
  });
});

describe("purgeExpired – Sitzungen", () => {
  it("entfernt abgelaufene Sitzungen", () => {
    /*
     * Vorher verschwand eine Sitzung erst beim nächsten Versuch, sie zu
     * benutzen. Wer sich einmal anmeldet und nie wiederkommt, hinterließ damit
     * dauerhaft eine Zeile, die sein Konto mit einem Zeitpunkt verknüpft.
     */
    const konto = createAccount("jemand@example.de", "ein gutes langes Passwort");
    expect(konto).not.toBeNull();

    const token = createSession(konto!.id);
    db().prepare("UPDATE session SET expires_at = ? WHERE token_hash IS NOT NULL").run(vorTagen(1));

    expect(purgeExpired().sessions).toBe(1);
    expect(token).toBeTruthy();
  });

  it("lässt gültige Sitzungen in Ruhe", () => {
    const konto = createAccount("jemand@example.de", "ein gutes langes Passwort");
    createSession(konto!.id);

    expect(purgeExpired().sessions).toBe(0);
  });
});

describe("maybePurge", () => {
  it("läuft beim ersten Mal und danach einen Tag lang nicht mehr", () => {
    expect(maybePurge()).not.toBeNull();
    expect(maybePurge()).toBeNull();
  });

  it("läuft nach einem Tag wieder", () => {
    maybePurge();
    expect(maybePurge(Date.now() + TAG + 1)).not.toBeNull();
  });

  it("wird vom Speichern einer Meldung ausgelöst", () => {
    // Ohne diesen Weg hinge das Löschen daran, dass ein Administrator
    // hineinschaut – und die Frist wäre eine Absichtserklärung.
    const alt = saveFeedback(meldung(), null);
    updateFeedback(alt, { status: "umgesetzt" });
    datiere(alt, vorTagen(500), vorTagen(400));

    resetPurgeThrottle();
    saveFeedback(meldung(), null);

    // Die alte ist weg, die eben geschriebene steht da.
    expect(listFeedback()).toHaveLength(1);
  });
});
