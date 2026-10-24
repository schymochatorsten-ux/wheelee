import { afterEach, beforeEach, describe, expect, it } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import { backupDatabase } from "./backup";

/** Konsistente Sicherung der Datenbank (ToDo 12.13), gegen echte Dateien. */

let folder: string;

beforeEach(() => {
  folder = fs.mkdtempSync(path.join(os.tmpdir(), "wheelee-backup-"));
});

afterEach(() => {
  fs.rmSync(folder, { recursive: true, force: true });
});

function laufendeDatenbank(): { file: string; db: DatabaseSync } {
  const file = path.join(folder, "wheelee.sqlite");
  const db = new DatabaseSync(file);
  db.exec("PRAGMA journal_mode = WAL");
  db.exec("CREATE TABLE konto (id INTEGER PRIMARY KEY, adresse TEXT)");
  return { file, db };
}

describe("backupDatabase", () => {
  it("enthält auch Schreibvorgänge, die noch in der WAL-Datei stehen", () => {
    const { file, db } = laufendeDatenbank();
    db.prepare("INSERT INTO konto (adresse) VALUES (?)").run("a@example.org");
    db.prepare("INSERT INTO konto (adresse) VALUES (?)").run("b@example.org");

    // Die App läuft weiter: Die Verbindung bleibt offen, die WAL-Datei besteht.
    expect(fs.existsSync(`${file}-wal`)).toBe(true);

    const target = path.join(folder, "sicherung", "kopie.sqlite");
    backupDatabase(file, target);
    db.close();

    const kopie = new DatabaseSync(target, { readOnly: true });
    const rows = kopie.prepare("SELECT adresse FROM konto ORDER BY id").all() as { adresse: string }[];
    expect(rows.map((row) => row.adresse)).toEqual(["a@example.org", "b@example.org"]);
    expect((kopie.prepare("PRAGMA integrity_check").get() as { integrity_check: string }).integrity_check).toBe("ok");
    kopie.close();
  });

  it("überschreibt keine vorhandene Sicherung", () => {
    const { file, db } = laufendeDatenbank();
    const target = path.join(folder, "kopie.sqlite");
    backupDatabase(file, target);
    expect(() => backupDatabase(file, target)).toThrow(/existiert schon/);
    db.close();
  });

  it("meldet eine fehlende Datenbank, statt eine leere anzulegen", () => {
    expect(() => backupDatabase(path.join(folder, "gibt-es-nicht.sqlite"), path.join(folder, "x.sqlite"))).toThrow(
      /nicht gefunden/,
    );
    expect(fs.existsSync(path.join(folder, "gibt-es-nicht.sqlite"))).toBe(false);
  });
});
