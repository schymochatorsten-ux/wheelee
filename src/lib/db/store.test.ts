import { afterEach, beforeEach, describe, expect, it } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { closeDb, db } from "./sqlite";
import {
  accountCount,
  accountForSession,
  authenticate,
  createAccount,
  createSession,
  deleteSession,
  findAccountByEmail,
} from "./accounts";
import {
  deleteFeedback,
  feedbackCounts,
  listFeedback,
  saveFeedback,
  updateFeedback,
} from "./feedback";
import type { ValidFeedback } from "../feedback";

/**
 * Konten, Sitzungen und Rückmeldungen gegen eine echte Datenbank
 * (ToDos 11.1, 17.1, 17.4).
 *
 * **Jeder Testlauf bekommt eine eigene Datei** in einem Temp-Verzeichnis. Eine
 * gemeinsame Datei wäre eine Falle: Die Tests liefen in beliebiger Reihenfolge
 * auf den Daten der vorigen, und ein Fehlschlag wäre nicht mehr
 * nachvollziehbar. Außerdem prüft das nebenbei, dass die Migrationen aus einer
 * **leeren** Datei ein vollständiges Schema bauen – genau das muss auf dem NAS
 * beim ersten Start passieren.
 */

let folder: string;

beforeEach(() => {
  folder = fs.mkdtempSync(path.join(os.tmpdir(), "wheelee-test-"));
  process.env.WHEELEE_DB_PATH = path.join(folder, "test.sqlite");
  closeDb();
});

afterEach(() => {
  closeDb();
  delete process.env.WHEELEE_DB_PATH;
  fs.rmSync(folder, { recursive: true, force: true });
});

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

describe("Schema", () => {
  it("legt eine leere Datenbank vollständig an", () => {
    expect(accountCount()).toBe(0);
    expect(listFeedback()).toEqual([]);
  });

  it("läuft ein zweites Mal ohne Schaden", () => {
    createAccount("torsten@example.de", "ein langes Passwort");
    closeDb();
    // Erneutes Öffnen heißt: Migrationen prüfen. Liefen sie noch einmal,
    // scheiterte es hier an bereits vorhandenen Tabellen – oder, schlimmer,
    // die Daten wären weg.
    expect(accountCount()).toBe(1);
  });
});

describe("Konten", () => {
  it("legt ein Konto an und findet es wieder", () => {
    const account = createAccount("Torsten@Example.de", "ein langes Passwort");
    expect(account).not.toBeNull();
    // Die Adresse wird vereinheitlicht gespeichert.
    expect(account!.email).toBe("torsten@example.de");
    expect(findAccountByEmail("TORSTEN@EXAMPLE.DE")?.id).toBe(account!.id);
  });

  it("vergibt dieselbe Adresse nicht zweimal", () => {
    expect(createAccount("torsten@example.de", "ein langes Passwort")).not.toBeNull();
    expect(createAccount("Torsten@example.de", "ein anderes Passwort")).toBeNull();
    expect(accountCount()).toBe(1);
  });

  it("speichert das Passwort nicht im Klartext", () => {
    createAccount("torsten@example.de", "Bahnhofstrasse12");
    const row = db().prepare("SELECT password_hash FROM account").get() as {
      password_hash: string;
    };
    expect(row.password_hash).not.toContain("Bahnhofstrasse12");
    expect(row.password_hash.startsWith("scrypt$")).toBe(true);
  });

  it("meldet mit richtigem Passwort an und sonst nicht", () => {
    createAccount("torsten@example.de", "ein langes Passwort");
    expect(authenticate("torsten@example.de", "ein langes Passwort")).not.toBeNull();
    expect(authenticate("torsten@example.de", "falsches Passwort")).toBeNull();
    expect(authenticate("unbekannt@example.de", "ein langes Passwort")).toBeNull();
  });
});

describe("Sitzungen", () => {
  it("führt vom Token zum Konto", () => {
    const account = createAccount("torsten@example.de", "ein langes Passwort")!;
    const token = createSession(account.id);
    expect(accountForSession(token)?.email).toBe("torsten@example.de");
  });

  it("speichert das Token nicht, sondern nur dessen Hash", () => {
    /*
     * Der Punkt, auf den es ankommt: Wer die Datei in die Hand bekommt – etwa
     * aus einem Backup –, soll damit keine Sitzung übernehmen können.
     */
    const account = createAccount("torsten@example.de", "ein langes Passwort")!;
    const token = createSession(account.id);
    const row = db().prepare("SELECT token_hash FROM session").get() as { token_hash: string };
    expect(row.token_hash).not.toBe(token);
    expect(row.token_hash).toHaveLength(64);
  });

  it("gilt nach dem Abmelden nicht mehr", () => {
    const account = createAccount("torsten@example.de", "ein langes Passwort")!;
    const token = createSession(account.id);
    deleteSession(token);
    expect(accountForSession(token)).toBeNull();
  });

  it("lehnt ein unbekanntes oder fehlendes Token ab", () => {
    expect(accountForSession(undefined)).toBeNull();
    expect(accountForSession("erfunden")).toBeNull();
  });

  it("lehnt eine abgelaufene Sitzung ab und räumt sie weg", () => {
    const account = createAccount("torsten@example.de", "ein langes Passwort")!;
    const token = createSession(account.id);
    db()
      .prepare("UPDATE session SET expires_at = ?")
      .run(new Date(Date.now() - 1_000).toISOString());

    expect(accountForSession(token)).toBeNull();
    const row = db().prepare("SELECT COUNT(*) AS anzahl FROM session").get() as {
      anzahl: number;
    };
    expect(Number(row.anzahl)).toBe(0);
  });

  it("verschwindet mit dem Konto", () => {
    // `ON DELETE CASCADE` wirkt nur, wenn `foreign_keys` eingeschaltet ist –
    // und in SQLite ist das standardmäßig **aus**. Ohne diesen Test bliebe
    // eine Sitzung ohne Konto zurück, und niemand würde es merken.
    const account = createAccount("torsten@example.de", "ein langes Passwort")!;
    const token = createSession(account.id);
    db().prepare("DELETE FROM account WHERE id = ?").run(account.id);
    expect(accountForSession(token)).toBeNull();
  });
});

describe("Rückmeldungen", () => {
  it("speichert eine Meldung ohne Konto und ohne Adresse", () => {
    const id = saveFeedback(meldung(), null);
    const [entry] = listFeedback();
    expect(entry.id).toBe(id);
    expect(entry.status).toBe("neu");
    expect(entry.contactEmail).toBeNull();
    expect(entry.accountEmail).toBeNull();
  });

  it("behält die freiwillige Adresse für die Antwort", () => {
    saveFeedback(meldung({ contactEmail: "melder@example.de" }), null);
    expect(listFeedback()[0].contactEmail).toBe("melder@example.de");
  });

  it("vermerkt das Konto, wenn jemand angemeldet war", () => {
    const account = createAccount("torsten@example.de", "ein langes Passwort")!;
    saveFeedback(meldung(), account.id);
    expect(listFeedback()[0].accountEmail).toBe("torsten@example.de");
  });

  it("speichert vom Gerät nur einen Hash", () => {
    saveFeedback(meldung({ deviceId: "1234-5678" }), null);
    const row = db().prepare("SELECT device_hash FROM feedback").get() as {
      device_hash: string;
    };
    expect(row.device_hash).not.toContain("1234-5678");
    expect(row.device_hash).toHaveLength(16);
  });

  it("speichert weder Standort noch IP-Adresse", () => {
    /*
     * Die Zusage aus 17.1, als Test. Käme eine solche Spalte später hinzu,
     * fiele es hier auf – und nicht erst jemandem, der die Datenschutzerklärung
     * mit der Wirklichkeit vergleicht.
     */
    saveFeedback(meldung(), null);
    const spalten = (
      db().prepare("PRAGMA table_info(feedback)").all() as unknown as {
        name: string;
      }[]
    ).map((spalte) => spalte.name);

    for (const verboten of ["lat", "lng", "position", "ip", "ip_address", "name"]) {
      expect(spalten).not.toContain(verboten);
    }
  });

  it("gibt die neuesten zuerst", () => {
    const alt = saveFeedback(meldung({ message: "Die ältere Meldung von gestern." }), null);
    const neu = saveFeedback(meldung({ message: "Die neuere Meldung von heute." }), null);
    db()
      .prepare("UPDATE feedback SET created_at = ? WHERE id = ?")
      .run("2026-10-01T10:00:00.000Z", alt);

    expect(listFeedback().map((entry) => entry.id)).toEqual([neu, alt]);
  });

  it("filtert nach Art und Stand", () => {
    saveFeedback(meldung(), null);
    const vorschlag = saveFeedback(
      meldung({ kind: "vorschlag", message: "Die Umkreiswahl hätte gern 2 km." }),
      null,
    );

    expect(listFeedback({ kind: "vorschlag" }).map((e) => e.id)).toEqual([vorschlag]);
    expect(listFeedback({ status: "umgesetzt" })).toEqual([]);

    updateFeedback(vorschlag, { status: "umgesetzt" });
    expect(listFeedback({ status: "umgesetzt" }).map((e) => e.id)).toEqual([vorschlag]);
  });

  it("markiert als umgesetzt und vermerkt den Zeitpunkt", () => {
    const id = saveFeedback(meldung(), null);
    expect(updateFeedback(id, { status: "umgesetzt" })).toBe(true);

    const entry = listFeedback()[0];
    expect(entry.status).toBe("umgesetzt");
    expect(entry.updatedAt).not.toBeNull();
  });

  it("nimmt einen Statuswechsel die Notiz nicht mit", () => {
    // Beides getrennt zu ändern ist der Grund, warum `note` ein eigenes,
    // optionales Feld ist: Sonst löschte jeder Klick auf „umgesetzt" die
    // Notiz, in der steht, warum.
    const id = saveFeedback(meldung(), null);
    updateFeedback(id, { note: "Mit der Stadt geklärt." });
    updateFeedback(id, { status: "umgesetzt" });
    expect(listFeedback()[0].note).toBe("Mit der Stadt geklärt.");
  });

  it("löscht eine Notiz auf Wunsch", () => {
    const id = saveFeedback(meldung(), null);
    updateFeedback(id, { note: "Zwischenstand." });
    updateFeedback(id, { note: null });
    expect(listFeedback()[0].note).toBeNull();
  });

  it("meldet, wenn es den Eintrag nicht gibt", () => {
    expect(updateFeedback(999, { status: "umgesetzt" })).toBe(false);
    expect(deleteFeedback(999)).toBe(false);
  });

  it("löscht endgültig", () => {
    const id = saveFeedback(meldung(), null);
    expect(deleteFeedback(id)).toBe(true);
    expect(listFeedback()).toEqual([]);
  });

  it("zählt je Stand", () => {
    const a = saveFeedback(meldung(), null);
    saveFeedback(meldung(), null);
    updateFeedback(a, { status: "umgesetzt" });

    const counts = feedbackCounts();
    expect(counts.gesamt).toBe(2);
    expect(counts.neu).toBe(1);
    expect(counts.umgesetzt).toBe(1);
    expect(counts.verworfen).toBe(0);
  });

  it("lehnt eine erfundene Art auf Ebene der Datenbank ab", () => {
    /*
     * Die Prüfung in `validateFeedback` ist die erste Verteidigungslinie. Die
     * CHECK-Bedingung ist die zweite, und sie gilt auch für einen künftigen
     * Importweg, der die erste nicht benutzt.
     */
    expect(() => saveFeedback(meldung({ kind: "lob" as never }), null)).toThrow();
  });

  it("behält eine Meldung, wenn ihr Konto gelöscht wird", () => {
    // `ON DELETE SET NULL` und nicht `CASCADE`: Die Meldung beschreibt einen
    // Fehler in den Parkplatzdaten. Dass das Konto dahinter verschwindet,
    // macht den Fehler nicht ungeschehen.
    const account = createAccount("torsten@example.de", "ein langes Passwort")!;
    saveFeedback(meldung(), account.id);
    db().prepare("DELETE FROM account WHERE id = ?").run(account.id);

    const entries = listFeedback();
    expect(entries).toHaveLength(1);
    expect(entries[0].accountEmail).toBeNull();
  });
});
