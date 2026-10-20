import { afterEach, beforeEach, describe, expect, it } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import { readGoneReports } from "./ratings.mjs";

/**
 * Tests für das Lesen der Bewertungen (ToDo 8.9).
 *
 * **Gegen eine echte Datenbank**, aus demselben Grund wie bei
 * `src/lib/db/ratings.test.ts`: Die Auswertung steckt in SQL, und dort wäre
 * ein Fehler unsichtbar – er zählte entweder falsch oder lieferte nie etwas,
 * und beides fiele erst auf, wenn jemand den Bericht glaubt.
 *
 * Geprüft wird vor allem der Unterschied, auf den es ankommt: **keine Datei**
 * heißt „nicht geprüft" (`null`), **keine Meldung** heißt „geprüft, nichts
 * gefunden" (leere Liste). Die beiden zu verwechseln ist genau der Fehler, der
 * im Importstand einmal eine leere Overpass-Antwort als Ergebnis durchgehen
 * ließ.
 */

let dir: string;
let file: string;

/** Eine Datenbank mit dem Schema, auf das `readGoneReports` trifft. */
function createDatabase(): DatabaseSync {
  const connection = new DatabaseSync(file);
  connection.exec(`
    CREATE TABLE rating (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      spot_id    TEXT NOT NULL,
      account_id TEXT NOT NULL,
      vote       TEXT NOT NULL CHECK (vote IN ('exists', 'gone')),
      created_at TEXT NOT NULL,
      updated_at TEXT,
      UNIQUE (spot_id, account_id)
    );
  `);
  return connection;
}

function insert(
  connection: DatabaseSync,
  spotId: string,
  accountId: string,
  vote: "exists" | "gone",
  createdAt = "2026-10-01T10:00:00.000Z",
  updatedAt: string | null = null,
): void {
  connection
    .prepare(
      "INSERT INTO rating (spot_id, account_id, vote, created_at, updated_at) VALUES (?, ?, ?, ?, ?)",
    )
    .run(spotId, accountId, vote, createdAt, updatedAt);
}

beforeEach(() => {
  dir = fs.mkdtempSync(path.join(os.tmpdir(), "wheelee-ratings-"));
  file = path.join(dir, "test.sqlite");
});

afterEach(() => {
  fs.rmSync(dir, { recursive: true, force: true });
});

describe("readGoneReports", () => {
  it("meldet „nicht geprüft“, wenn es keine Datenbank gibt", () => {
    expect(readGoneReports(2, path.join(dir, "gibtesnicht.sqlite"))).toBeNull();
  });

  it("legt keine Datenbank an – ein Prüfskript darf nichts schreiben", () => {
    const missing = path.join(dir, "keinesfalls.sqlite");
    readGoneReports(2, missing);
    expect(fs.existsSync(missing)).toBe(false);
  });

  it("unterscheidet „nichts gemeldet“ von „nicht geprüft“", () => {
    createDatabase().close();
    // Datei da, Tabelle leer: Das ist geprüft und ergab nichts.
    expect(readGoneReports(2, file)).toEqual([]);
  });

  it("zählt nur ab der Mindestzahl und zählt Konten, nicht Stimmen", () => {
    const connection = createDatabase();
    insert(connection, "a-1", "konto-1", "gone");
    insert(connection, "a-1", "konto-2", "gone");
    insert(connection, "a-2", "konto-1", "gone"); // nur eine Meldung
    connection.close();

    const result = readGoneReports(2, file);
    expect(result).toHaveLength(1);
    expect(result?.[0]).toMatchObject({ spotId: "a-1", goneCount: 2 });
  });

  it("führt die Bestätigungen als Gegengewicht mit", () => {
    const connection = createDatabase();
    insert(connection, "a-1", "konto-1", "gone");
    insert(connection, "a-1", "konto-2", "gone");
    insert(connection, "a-1", "konto-3", "exists");
    insert(connection, "a-1", "konto-4", "exists");
    connection.close();

    const [entry] = readGoneReports(2, file) ?? [];
    expect(entry.goneCount).toBe(2);
    // Ohne diese Zahl liest sich die Liste als Urteil statt als Hinweis.
    expect(entry.existsCount).toBe(2);
  });

  it("nennt als Zeitpunkt, wann die Meldung zuletzt galt", () => {
    const connection = createDatabase();
    // Eine umgedrehte Stimme: angelegt im Mai, auf „gone" geändert im Oktober.
    insert(
      connection,
      "a-1",
      "konto-1",
      "gone",
      "2026-05-01T10:00:00.000Z",
      "2026-10-15T10:00:00.000Z",
    );
    insert(connection, "a-1", "konto-2", "gone", "2026-06-01T10:00:00.000Z");
    connection.close();

    const [entry] = readGoneReports(2, file) ?? [];
    // Maßgeblich ist `COALESCE(updated_at, created_at)` – sonst läse sich eine
    // frisch geänderte Meldung mit dem alten Datum.
    expect(entry.lastGoneAt).toBe("2026-10-15T10:00:00.000Z");
  });

  it("zählt Bestätigungen nicht als Meldung mit", () => {
    const connection = createDatabase();
    insert(connection, "a-1", "konto-1", "exists");
    insert(connection, "a-1", "konto-2", "exists");
    connection.close();

    // Zwei Bestätigungen sind das Gegenteil einer Meldung und dürfen den
    // Parkplatz nicht auf die Prüfliste bringen.
    expect(readGoneReports(2, file)).toEqual([]);
  });

  it("sortiert die häufigsten Meldungen nach oben", () => {
    const connection = createDatabase();
    for (const konto of ["1", "2"]) insert(connection, "wenig", `konto-${konto}`, "gone");
    for (const konto of ["1", "2", "3", "4"]) insert(connection, "viel", `konto-${konto}`, "gone");
    connection.close();

    expect((readGoneReports(2, file) ?? []).map((entry) => entry.spotId)).toEqual([
      "viel",
      "wenig",
    ]);
  });

  it("verträgt eine Datenbank aus der Zeit vor den Bewertungen", () => {
    // Datei ohne Tabelle `rating`: Dann kann es keine Bewertungen geben, und
    // „nichts gemeldet" ist die wahre Auskunft – nicht „nicht geprüft".
    const connection = new DatabaseSync(file);
    connection.exec("CREATE TABLE account (id TEXT PRIMARY KEY)");
    connection.close();

    expect(readGoneReports(2, file)).toEqual([]);
  });
});
