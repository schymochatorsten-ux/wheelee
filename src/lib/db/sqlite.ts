import { DatabaseSync } from "node:sqlite";
import fs from "node:fs";
import path from "node:path";

/**
 * Die Datenbank der App (Entscheidung D-02, 2026-10-11: **SQLite**).
 *
 * Bisher brauchte wheelee keine: Die Parkplatzdaten sind statisch ins Bundle
 * importiert. Mit Benutzerkonten und Rückmeldungen gibt es erstmals Daten, die
 * zur Laufzeit entstehen und einen Neustart überleben müssen.
 *
 * **Warum SQLite und nicht Supabase oder Neon**, wie in `ToDos.md` lange
 * vorgemerkt: Die App läuft auf dem eigenen NAS hinter einem
 * Tailscale-Tunnel – es gibt bewusst keinen offenen Port und keinen fremden
 * Dienst im Weg (siehe `wheelee-infrastruktur.md`). Eine Cloud-Datenbank hätte
 * genau diese Eigenschaft aufgegeben, und zwar für ein paar tausend Zeilen.
 * SQLite in einem Docker-Volume ist dort laut Infrastruktur-Briefing das
 * Hausmuster.
 *
 * **Warum `node:sqlite` und keine Bibliothek:** Es ist seit Node 24 im
 * Standardumfang. `better-sqlite3` wäre eine native Abhängigkeit, die im
 * Alpine-Abbild erst Compiler und Python nachzieht – dieselbe Abwägung wie bei
 * `zip.mts` und `xlsx.mts` in 2e.4, nur dass hier nicht einmal etwas
 * nachgebaut werden muss.
 *
 * **Die Datenbank liegt nicht in `data/`.** Dort stehen die versionierten
 * Seed-Dateien des Imports; eine Datei, die sich im Betrieb ändert, hat zwischen
 * ihnen nichts zu suchen – sie würde bei jedem Importlauf im Weg stehen und
 * im Zweifel mitversioniert. Vorgabe ist deshalb `.data/` (lokal, ignoriert)
 * bzw. `/app/var/` im Container (ein Volume).
 */

/** Wo die Datei liegt – im Container über die Umgebung gesetzt. */
function databaseFile(): string {
  const configured = process.env.WHEELEE_DB_PATH?.trim();
  if (configured) return configured;
  return path.join(process.cwd(), ".data", "wheelee.sqlite");
}

/**
 * Das Schema, als Folge von Schritten.
 *
 * Jeder Schritt läuft genau einmal; `PRAGMA user_version` hält fest, wie weit
 * die Datei ist. Ein Migrationswerkzeug wäre hier mehr Apparat als Nutzen –
 * aber **von Hand nachgepflegte Tabellen sind keine Option**: Dann unterscheidet
 * sich das Schema auf dem NAS von dem im Repo, und niemand merkt es, bis eine
 * Abfrage auf eine Spalte zugreift, die dort nie angelegt wurde.
 *
 * Schritte werden nur **angehängt**, nie geändert. Eine geänderte Migration
 * läuft auf einer bestehenden Datenbank nicht noch einmal.
 */
const MIGRATIONS: readonly string[] = [
  // 1 – Konten, Sitzungen und Rückmeldungen (ToDos 11.1, 17.1).
  `
  CREATE TABLE account (
    id            TEXT PRIMARY KEY,
    email         TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at    TEXT NOT NULL,
    last_login_at TEXT
  );

  CREATE TABLE session (
    -- Gespeichert wird der SHA-256 des Sitzungstokens, nicht das Token selbst.
    -- Wer die Datei in die Hand bekommt, kann sich damit nicht anmelden.
    token_hash TEXT PRIMARY KEY,
    account_id TEXT NOT NULL REFERENCES account(id) ON DELETE CASCADE,
    created_at TEXT NOT NULL,
    expires_at TEXT NOT NULL
  );
  CREATE INDEX session_account ON session(account_id);
  CREATE INDEX session_expires ON session(expires_at);

  CREATE TABLE feedback (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    kind          TEXT NOT NULL CHECK (kind IN ('fehler', 'vorschlag')),
    message       TEXT NOT NULL,
    -- Freiwillig. Ohne Adresse gibt es keine Antwort, und das sagt das
    -- Formular auch so.
    contact_email TEXT,
    -- Gesetzt, wenn die Meldung aus einem angemeldeten Konto kam.
    account_id    TEXT REFERENCES account(id) ON DELETE SET NULL,
    spot_id       TEXT,
    city          TEXT,
    url           TEXT,
    user_agent    TEXT,
    app_version   TEXT,
    -- Nur für die Drosselung, keine Person dahinter erkennbar.
    device_hash   TEXT,
    status        TEXT NOT NULL DEFAULT 'neu'
                  CHECK (status IN ('neu', 'in_arbeit', 'umgesetzt', 'verworfen')),
    note          TEXT,
    created_at    TEXT NOT NULL,
    updated_at    TEXT
  );
  CREATE INDEX feedback_created ON feedback(created_at DESC);
  CREATE INDEX feedback_status ON feedback(status);
  `,

  // 2 – Bewertungen (ToDos 8.1–8.7, Regel festgelegt 2026-10-19).
  `
  CREATE TABLE rating (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    spot_id    TEXT NOT NULL,
    -- NOT NULL, und das ist die ganze Zugangsregel: Bewerten setzt ein Konto
    -- voraus, in beide Richtungen. Sehen darf die Zählerstände jede:r.
    account_id TEXT NOT NULL REFERENCES account(id) ON DELETE CASCADE,
    vote       TEXT NOT NULL CHECK (vote IN ('exists', 'gone')),
    created_at TEXT NOT NULL,
    -- Gesetzt, wenn jemand seine Stimme später umgedreht hat.
    updated_at TEXT,

    -- **Die eigentliche Schutzmaßnahme.** „Höchstens eine Stimme je Konto und
    -- Parkplatz" ist damit keine Regel, die der Server durchsetzen muss,
    -- sondern eine Eigenschaft der Tabelle: Ein zweiter Versuch kann gar
    -- keine zweite Zeile erzeugen. Das macht nebenbei das versehentliche
    -- Doppeltippen folgenlos – der häufigste Fall von allen.
    UNIQUE (spot_id, account_id)
  );

  -- Die Abfrage lautet immer „alle Stimmen zu diesem Parkplatz".
  CREATE INDEX rating_spot ON rating(spot_id);
  `,

  // 3 – Wann die Antwortadresse einer offenen Meldung entfernt wurde (ToDo 17.6).
  `
  -- **Warum eine eigene Spalte und nicht nur ein leeres Feld:** Ohne sie sähe
  -- eine Meldung, deren Adresse nach der Frist entfernt wurde, genauso aus wie
  -- eine, bei der nie jemand eine angegeben hat. Der Unterschied zählt: Im
  -- ersten Fall wollte jemand eine Antwort und bekommt keine mehr, und die
  -- Übersicht soll das sagen können, statt es zu verschweigen.
  ALTER TABLE feedback ADD COLUMN contact_removed_at TEXT;
  `,

  // 4 – Bevorzugte Karten-App am Konto (ToDo 11.3a).
  `
  -- **Ohne Prüfung der erlaubten Werte, anders als bei \`status\` und \`vote\`.**
  -- Die Liste der Karten-Apps steht im Code (\`navigation.ts\`) und wächst dort;
  -- eine CHECK-Bedingung hier müsste bei jeder neuen App über eine Migration
  -- nachgezogen werden, und bis dahin ließe sich die neue App nicht speichern.
  -- Geprüft wird deshalb am Endpunkt, und ein unbekannter Wert fällt beim Lesen
  -- auf „automatisch" zurück – das ist genau das Verhalten, das auch für einen
  -- leeren Browser-Speicher gilt.
  ALTER TABLE account ADD COLUMN maps_preference TEXT;
  `,

  // 5 – Gespeicherte Parkplätze am Konto (ToDo 11.5).
  `
  CREATE TABLE favorite (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    -- Ohne Fremdschlüssel auf den Bestand: Der liegt in Dateien, nicht in der
    -- Datenbank (wie bei \`rating\`). Ein Platz, der beim Import verschwindet,
    -- bleibt als Eintrag stehen und die Liste sagt das.
    spot_id    TEXT NOT NULL,
    account_id TEXT NOT NULL REFERENCES account(id) ON DELETE CASCADE,
    created_at TEXT NOT NULL,

    -- Wie bei \`rating\`: Doppeltes Speichern kann keine zweite Zeile erzeugen.
    UNIQUE (spot_id, account_id)
  );

  -- Die Abfrage lautet immer „alle Favoriten dieses Kontos"; die
  -- Eindeutigkeit oben hilft nur bei „Spalte spot_id zuerst".
  CREATE INDEX favorite_account ON favorite(account_id);
  `,

  // 6 – Gewählte Sprache am Konto (ToDo 15.5).
  `
  -- Wie bei \`maps_preference\` (Migration 4) **ohne Prüfung der erlaubten
  -- Werte**: Die Liste der Sprachen steht im Code (\`src/i18n/index.ts\`) und
  -- wächst dort mit jeder Datei. Geprüft wird am Endpunkt; ein unbekannter Wert
  -- fällt beim Lesen auf „nie gewählt" zurück.
  ALTER TABLE account ADD COLUMN language TEXT;
  `,
];

let database: DatabaseSync | null = null;

/**
 * Die offene Verbindung – einmal je Prozess.
 *
 * `WAL` ist hier nicht Feinschliff, sondern nötig: Ohne ihn sperrt ein
 * Schreibvorgang die ganze Datei, und schon zwei gleichzeitige Anfragen –
 * jemand schickt eine Meldung ab, während die Übersicht lädt – laufen in
 * „database is locked". `busy_timeout` fängt den Rest ab, statt sofort zu
 * scheitern.
 */
export function db(): DatabaseSync {
  if (database) return database;

  const file = databaseFile();
  fs.mkdirSync(path.dirname(file), { recursive: true });

  const connection = new DatabaseSync(file);
  connection.exec("PRAGMA journal_mode = WAL");
  connection.exec("PRAGMA busy_timeout = 5000");
  connection.exec("PRAGMA foreign_keys = ON");

  migrate(connection);

  database = connection;
  return connection;
}

/** Offene Schritte anwenden. Läuft bei jedem Start und tut meist nichts. */
function migrate(connection: DatabaseSync): void {
  const row = connection.prepare("PRAGMA user_version").get() as
    { user_version?: number } | undefined;
  const current = Number(row?.user_version ?? 0);

  for (let step = current; step < MIGRATIONS.length; step += 1) {
    // Jeder Schritt ganz oder gar nicht: Bricht er in der Mitte ab, bliebe
    // sonst ein halbes Schema zurück, das sich beim nächsten Start für fertig
    // hält.
    connection.exec("BEGIN");
    try {
      connection.exec(MIGRATIONS[step]);
      connection.exec(`PRAGMA user_version = ${step + 1}`);
      connection.exec("COMMIT");
    } catch (error) {
      connection.exec("ROLLBACK");
      throw error;
    }
  }
}

/**
 * Verbindung schließen und vergessen – für Tests, die je Fall eine eigene
 * Datei benutzen.
 */
export function closeDb(): void {
  database?.close();
  database = null;
}

/** ISO-Zeitstempel, einheitlich für alle Tabellen. */
export function now(): string {
  return new Date().toISOString();
}
