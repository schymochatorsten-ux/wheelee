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

  // 7 – Rolle und Sperre am Konto (ToDo 18.1).
  `
  -- Die Rolle wird in der Tabelle geprüft: Ein falscher Wert soll nicht
  -- stillschweigend als Administrator oder als Nutzer durchgehen.
  ALTER TABLE account ADD COLUMN role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin'));
  ALTER TABLE account ADD COLUMN disabled_at TEXT;
  `,

  // 8 – Einladungen (ToDo 18.2).
  `
  CREATE TABLE invitation (
    id         TEXT PRIMARY KEY,
    -- Nur der SHA-256 des Tokens, wie bei \`session\`: Eine Sicherung der Datei
    -- genügt nicht, um eine Einladung einzulösen.
    token_hash TEXT NOT NULL UNIQUE,
    email      TEXT NOT NULL,
    role       TEXT NOT NULL CHECK (role IN ('user', 'admin')),
    -- Wird das einladende Konto gelöscht, bleibt die Einladung als Nachweis.
    invited_by TEXT REFERENCES account(id) ON DELETE SET NULL,
    created_at TEXT NOT NULL,
    expires_at TEXT NOT NULL,
    used_at    TEXT,
    revoked_at TEXT
  );

  CREATE INDEX invitation_email ON invitation(email);
  `,

  // 9 – Einmal-Links per Mail: Passwort zurücksetzen, E-Mail ändern (ToDo 11.1, 11.8).
  `
  CREATE TABLE mail_token (
    id         TEXT PRIMARY KEY,
    -- Nur der SHA-256, wie bei \`session\` und \`invitation\`: Aus einer Sicherung
    -- lässt sich kein Link einlösen.
    token_hash TEXT NOT NULL UNIQUE,
    account_id TEXT NOT NULL REFERENCES account(id) ON DELETE CASCADE,
    kind       TEXT NOT NULL CHECK (kind IN ('reset', 'email')),
    -- Nur bei \`email\`: die Adresse, auf die gewechselt werden soll. Sie steht
    -- hier und nicht im Link, damit der Link sie nicht verändern kann.
    new_email  TEXT,
    created_at TEXT NOT NULL,
    expires_at TEXT NOT NULL,
    used_at    TEXT
  );

  CREATE INDEX mail_token_account ON mail_token(account_id, kind);
  `,

  // 10 – Besucherzählung je Tag (ToDo 20.1): nur Zahlen, nichts über Personen.
  `
  CREATE TABLE visit_day (
    -- Kalendertag in Europe/Berlin, "2026-10-29".
    day      TEXT PRIMARY KEY,
    -- Verschiedene Besucher an diesem Tag (siehe lib/visits.ts: im Arbeitsspeicher
    -- unterschieden, hier steht nur die Summe).
    visitors INTEGER NOT NULL DEFAULT 0,
    -- Seitenaufrufe von Menschen an diesem Tag.
    views    INTEGER NOT NULL DEFAULT 0
  );
  `,

  // 11 – Bestätigte E-Mail-Adresse (ToDo 10.21).
  `
  -- Wann der Besitz der Adresse per Mail-Link nachgewiesen wurde. Konten, die vor
  -- dieser Spalte bestanden, gelten als bestätigt: Es gab nichts zu bestätigen, und
  -- ihnen nachträglich Rechte zu nehmen, träfe vor allem den Besitzer.
  ALTER TABLE account ADD COLUMN email_verified_at TEXT;
  UPDATE account SET email_verified_at = created_at;
  `,

  // 12 – Benutzername und Pflicht zum Passwortwechsel (ToDo 18.7).
  `
  -- Zusätzlich zur E-Mail-Adresse; Anmeldung mit beidem. Ohne Groß-/Kleinschreibung
  -- eindeutig, damit „Torsten“ und „torsten“ nicht zwei Konten sind.
  ALTER TABLE account ADD COLUMN username TEXT;
  CREATE UNIQUE INDEX account_username ON account(username COLLATE NOCASE) WHERE username IS NOT NULL;
  -- 1 = beim nächsten Anmelden muss das Passwort geändert werden (Startpasswort).
  ALTER TABLE account ADD COLUMN must_change_password INTEGER NOT NULL DEFAULT 0;
  `,

  // 13 – Mailversand aus der Verwaltung statt aus der Umgebung (ToDo 10.22).
  `
  -- **Warum in der Datenbank und nicht weiter nur in der \`.env\`:** Die Datei
  -- liegt auf dem NAS, und dorthin kommt nur Niklas. Jede Änderung an den
  -- SMTP-Daten – ein neues Passwort, ein anderer Server – hieße sonst: einen
  -- Termin ausmachen, bis dahin kein „Passwort vergessen". Die Angaben gehören
  -- demjenigen, der die App betreibt, nicht demjenigen, der das Blech besitzt.
  --
  -- **Eine Zeile, erzwungen durch \`CHECK (id = 1)\`.** Eine Tabelle, in der
  -- versehentlich zwei Konfigurationen stehen können, hätte eine stille
  -- Reihenfolgefrage: Welche gilt? Die Antwort soll nicht von \`ORDER BY\`
  -- abhängen.
  --
  -- **Das Passwort steht im Klartext**, und das ist keine Nachlässigkeit,
  -- sondern unvermeidlich: Ein SMTP-Server verlangt das Passwort selbst, kein
  -- Hash davon. Eine Verschlüsselung hier bräuchte einen Schlüssel, und der
  -- läge wieder in der Umgebung auf demselben NAS – gewonnen wäre nichts außer
  -- dem Anschein. Was daraus folgt, steht am Endpunkt (es geht nie an den
  -- Browser zurück) und in \`README.md\` unter „Sicherung" (es steht in jeder
  -- Kopie der Datenbank).
  CREATE TABLE mail_config (
    id           INTEGER PRIMARY KEY CHECK (id = 1),
    host         TEXT NOT NULL,
    port         INTEGER NOT NULL,
    secure       INTEGER NOT NULL DEFAULT 0,
    username     TEXT,
    password     TEXT,
    from_address TEXT NOT NULL,
    -- Adresse der App für Links in Mails. Steht hier und nicht im \`Host\`-Kopf
    -- der Anfrage – die Begründung (Host-Header-Poisoning) in \`lib/mail.ts\`.
    public_url   TEXT NOT NULL,
    -- Ausschalten, ohne die Angaben zu verlieren: Wer einen Fehler sucht, soll
    -- den Versand stilllegen können, ohne das Passwort neu eintippen zu müssen.
    enabled      INTEGER NOT NULL DEFAULT 0,
    updated_at   TEXT NOT NULL,
    updated_by   TEXT REFERENCES account(id) ON DELETE SET NULL
  );
  `,

  // 14 – Versanddienstleister für die Datenschutzerklärung (ToDo 10.22, zu 10.16).
  `
  -- **Ein eigener Schritt und keine Änderung an Migration 13**, obwohl beide am
  -- selben Tag entstanden sind: Ein bereits gelaufener Schritt läuft nicht noch
  -- einmal, und eine nachträglich geänderte Migration fehlt genau dort, wo das
  -- Schema schon angelegt wurde.
  --
  -- **Warum die Angabe hierher gehört:** Die Datenschutzerklärung nennt den
  -- Dienstleister, der beim Versand Empfängeradresse und Link sieht (Art. 28
  -- DSGVO). Bisher kam der Name aus \`WHEELEE_MAIL_PROVIDER\`, also aus der
  -- \`.env\` auf dem NAS. Damit hätte das Einschalten des Versands in der
  -- Verwaltung eine unvollständige Datenschutzerklärung hinterlassen – der rote
  -- Hinweis „Angabe fehlt“ –, und nur Niklas hätte sie vervollständigen können.
  -- Das wäre genau die Abhängigkeit, die 10.22 auflöst.
  ALTER TABLE mail_config ADD COLUMN provider TEXT;
  `,

  // 15 – Benachrichtigung bei neuer Rückmeldung (ToDo 17.9).
  `
  -- An welche Adresse eine Nachricht geht, sobald jemand einen Fehler oder
  -- einen Vorschlag einträgt. Leer heißt: keine Benachrichtigung.
  --
  -- **Eine eigene Angabe und nicht „alle Admin-Konten":** Wer die Verwaltung
  -- bedienen darf, will nicht zwangsläufig jede Meldung ins Postfach bekommen
  -- – und ein zweiter Admin, der still mitbenachrichtigt wird, ohne es
  -- eingestellt zu haben, wäre eine Überraschung. Hier steht genau eine
  -- Adresse, und jemand hat sie eingetragen.
  ALTER TABLE mail_config ADD COLUMN notify_email TEXT;
  `,

  // 16 – Standortfreigabe am Konto (ToDo 9.25).
  `
  -- Ob die App den Standort von sich aus abfragen darf. \`on\` oder \`off\`;
  -- NULL heißt: nie entschieden, dann wird gefragt wie bisher.
  --
  -- **Das ist die Absicht, nicht die Erlaubnis.** Die Erlaubnis selbst
  -- vergibt der Browser je Gerät, und kein Server kann sie setzen – das ist
  -- eine Zusage des Browsers an die Nutzerin, keine Lücke. Gespeichert wird
  -- hier nur, ob überhaupt gefragt werden soll; das erspart auf dem zweiten
  -- Gerät das erneute Wegklicken.
  --
  -- Ohne Prüfung in der Datenbank, wie \`maps_preference\` (Migration 4): Der
  -- Wert wird am Endpunkt geprüft.
  ALTER TABLE account ADD COLUMN location_preference TEXT;
  `,

  // 17 – Unsichere Parkplätze, Schwellen und gemeldete Standorte (ToDo 8.11).
  `
  -- **Hier kehrt sich eine Festlegung um, und das muss man wissen.** Bisher
  -- galt (Konzept, Abschnitt 2 und 8.6): Bewertungen ändern **nichts** an den
  -- Daten, kein Parkplatz verschwindet, die Meldungen führen auf eine
  -- Prüfliste für einen Menschen. Torsten hat am 2026-11-13 das Gegenteil
  -- verlangt, und zwar mit Begründung: **Lieber ein Parkplatz zu viel, klar
  -- als unsicher gekennzeichnet, und bei Rückmeldungen raus.** Ein fehlender
  -- Platz hilft niemandem; ein zweifelhafter, der sich als falsch erweist,
  -- verschwindet jetzt von selbst.
  --
  -- **Ausgeblendet heißt nicht gelöscht.** Die Zeile bleibt, die Verwaltung
  -- zeigt sie und kann sie zurückholen. Löschen wäre nicht umkehrbar, und bei
  -- einem Standort aus einer Seed-Datei käme er beim nächsten Import ohnehin
  -- wieder – dann mit verlorener Begründung.
  -- **Zwei Zustände in einer Tabelle, und der zweite ist nötig.** „Wieder
  -- einblenden" kann nicht einfach das Löschen der Zeile sein: Die Stimmen
  -- bleiben ja stehen, also überschritte die nächste Prüfung die Schwelle
  -- erneut und der Platz wäre sofort wieder weg – die Verwaltung hätte einen
  -- Knopf, der nichts bewirkt. \`kept\` ist deshalb eine eigene Entscheidung:
  -- **von Hand gesetzt, und die Automatik rührt sie nicht an.**
  CREATE TABLE spot_decision (
    -- Ohne Fremdschlüssel auf den Bestand, wie \`rating\` und \`favorite\`: Der
    -- Bestand liegt in Dateien, nicht in der Datenbank.
    spot_id    TEXT PRIMARY KEY,
    -- 'hidden' = nicht mehr sichtbar, 'kept' = sichtbar, Automatik ausgesetzt.
    status     TEXT NOT NULL CHECK (status IN ('hidden', 'kept')),
    -- 'votes' = automatisch nach Erreichen der Schwelle, 'admin' = von Hand.
    reason     TEXT NOT NULL CHECK (reason IN ('votes', 'admin')),
    -- Die Zählerstände im Moment des Ausblendens. Sie stehen hier als Beleg:
    -- Wer die Liste später ansieht, soll sehen, **weshalb** der Platz ging,
    -- auch wenn Stimmen danach zurückgezogen wurden.
    gone_count   INTEGER NOT NULL DEFAULT 0,
    exists_count INTEGER NOT NULL DEFAULT 0,
    -- Ob der Platz zum Zeitpunkt des Ausblendens als unsicher galt; damit ist
    -- nachvollziehbar, welche der beiden Schwellen angewandt wurde.
    was_unsicher INTEGER NOT NULL DEFAULT 0,
    decided_at   TEXT NOT NULL,
    decided_by   TEXT REFERENCES account(id) ON DELETE SET NULL
  );
  CREATE INDEX spot_decision_status ON spot_decision(status, decided_at DESC);

  -- **Eine Zeile, erzwungen durch \`CHECK (id = 1)\`** – dieselbe Begründung
  -- wie bei \`mail_config\` (Migration 13): Zwei Konfigurationen hätten eine
  -- stille Reihenfolgefrage.
  --
  -- **Gezählt werden Konten, nicht gewichtete Summen.** Die Gewichtung aus
  -- 11.6 (\`ratings/trust.ts\`) bleibt der Verwaltung als Zusatzinfo. Eine
  -- Schwelle muss erklärbar sein: „drei Leute" heißt drei Leute. Mit
  -- Gewichtung wäre „3" je nach Alter der Stimmen auch mal 2,4 – und niemand
  -- könnte sagen, wann ein Platz verschwindet.
  CREATE TABLE spot_policy (
    id                INTEGER PRIMARY KEY CHECK (id = 1),
    -- Wie viele Konten „existiert nicht mehr" melden müssen, damit ein
    -- **unsicherer** Platz verschwindet. Niedriger, weil bei ihm von Anfang an
    -- offen ist, ob er stimmt.
    schwelle_unsicher INTEGER NOT NULL DEFAULT 2 CHECK (schwelle_unsicher >= 1),
    -- Dasselbe für einen **gesicherten** Platz aus amtlicher, bestätigter
    -- Quelle. Höher, weil hier eine geprüfte Angabe gegen einige Stimmen steht.
    schwelle_sicher   INTEGER NOT NULL DEFAULT 5 CHECK (schwelle_sicher >= 1),
    updated_at        TEXT NOT NULL,
    updated_by        TEXT REFERENCES account(id) ON DELETE SET NULL
  );

  -- Von Nutzer:innen gemeldete Parkplätze.
  --
  -- **Nur mit Konto** (Torsten, 2026-11-13) – dieselbe Zugangsregel wie beim
  -- Bewerten. Eine Karte, in die jeder ohne Konto Punkte setzen kann, ist in
  -- einer Woche voller Unsinn, und es gäbe niemanden, dem man die Stimme
  -- entziehen könnte.
  --
  -- **Sichtbar ist der Platz sofort, aber als unsicher.** Er wird erst zum
  -- gewöhnlichen Platz, wenn ihn so viele Konten bestätigt haben, wie
  -- \`schwelle_sicher\` verlangt – **nicht** \`schwelle_unsicher\`: Etwas in den
  -- Bestand aufzunehmen soll schwerer sein, als es wieder loszuwerden.
  CREATE TABLE user_spot (
    id           TEXT PRIMARY KEY,
    -- **\`SET NULL\` und nicht \`CASCADE\`, anders als bei \`rating\` und
    -- \`favorite\`.** Eine Bewertung ist eine Aussage **einer Person** – ohne
    -- sie ist sie nichts und geht mit dem Konto. Ein gemeldeter Parkplatz ist
    -- nach der Bestätigung eine Angabe über einen **Ort**: Löschte ihn die
    -- Kontolöschung mit, verschwände ein Platz, auf den sich inzwischen andere
    -- verlassen – und das wäre keine Datensparsamkeit, sondern ein Datenverlust
    -- bei Dritten. Die Zuordnung zur Person verschwindet, der Ort bleibt.
    account_id   TEXT REFERENCES account(id) ON DELETE SET NULL,
    label        TEXT NOT NULL,
    street       TEXT,
    house_number TEXT,
    note         TEXT,
    city         TEXT NOT NULL,
    lat          REAL NOT NULL,
    lng          REAL NOT NULL,
    spot_count   INTEGER NOT NULL DEFAULT 1 CHECK (spot_count >= 1),
    -- 'offen' = sichtbar als unsicher, 'bestaetigt' = genug Zustimmung,
    -- 'verworfen' = von der Verwaltung abgelehnt, nicht mehr sichtbar.
    status       TEXT NOT NULL DEFAULT 'offen'
                 CHECK (status IN ('offen', 'bestaetigt', 'verworfen')),
    created_at   TEXT NOT NULL,
    decided_at   TEXT,
    decided_by   TEXT REFERENCES account(id) ON DELETE SET NULL
  );
  CREATE INDEX user_spot_status ON user_spot(status, created_at DESC);
  CREATE INDEX user_spot_account ON user_spot(account_id);
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
