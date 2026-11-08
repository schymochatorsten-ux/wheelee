import { db, now } from "./sqlite";

/**
 * Die SMTP-Zugangsdaten in der Datenbank (ToDo 10.22).
 *
 * **Wozu das gut ist.** Bis hierher kam der Mailversand nur aus
 * Umgebungsvariablen (D-10). Die stehen in der `.env` auf dem NAS, und dorthin
 * kommt nur Niklas – ein abgelaufenes Postfachpasswort hätte also einen Termin
 * gebraucht, und bis dahin gäbe es kein „Passwort vergessen". Wer die App
 * betreibt, muss das allein ändern können.
 *
 * **Die Umgebung bleibt die Rückfallebene, die Datenbank gewinnt.** Steht hier
 * eine Zeile, gilt sie – auch wenn in der Umgebung etwas anderes steht. Die
 * andere Reihenfolge wäre die gefährlichere: Eine Eingabe in der Verwaltung,
 * die von einer unsichtbaren Variablen überstimmt wird, sähe aus wie
 * gespeichert und hätte keine Wirkung. Die Oberfläche sagt deshalb an, woher
 * die geltenden Angaben kommen.
 */

export interface MailConfigRow {
  host: string;
  port: number;
  secure: boolean;
  username: string | null;
  password: string | null;
  fromAddress: string;
  publicUrl: string;
  enabled: boolean;
  /**
   * Name und Sitz des Versanddienstleisters für die Datenschutzerklärung
   * (Art. 28 DSGVO, siehe 10.16). `null`, solange niemand ihn eingetragen hat –
   * dann nennt die Erklärung den Mangel, statt einen Namen zu erfinden.
   */
  provider: string | null;
  updatedAt: string;
}

/** Was von außen gesetzt werden darf. */
export interface MailConfigInput {
  host: string;
  port: number;
  secure: boolean;
  username: string | null;
  /**
   * `undefined` lässt das gespeicherte Passwort stehen, `null` löscht es.
   *
   * Nötig, weil das Passwort nie an den Browser zurückgeht: Die Oberfläche
   * kann es also gar nicht mitschicken, wenn nur der Server geändert wurde.
   * Ohne diese Unterscheidung wäre jedes Speichern ein Löschen.
   */
  password?: string | null;
  fromAddress: string;
  publicUrl: string;
  enabled: boolean;
  provider: string | null;
}

interface Raw {
  host: string;
  port: number;
  secure: number;
  username: string | null;
  password: string | null;
  from_address: string;
  public_url: string;
  enabled: number;
  provider: string | null;
  updated_at: string;
}

/** Die gespeicherte Konfiguration, oder `null`, wenn nie eine gesetzt wurde. */
export function readMailConfig(): MailConfigRow | null {
  const row = db()
    .prepare(
      `SELECT host, port, secure, username, password, from_address, public_url, enabled, provider, updated_at
       FROM mail_config WHERE id = 1`,
    )
    .get() as Raw | undefined;

  if (!row) return null;

  return {
    host: row.host,
    port: row.port,
    secure: row.secure === 1,
    username: row.username,
    password: row.password,
    fromAddress: row.from_address,
    publicUrl: row.public_url,
    enabled: row.enabled === 1,
    provider: row.provider,
    updatedAt: row.updated_at,
  };
}

/**
 * Speichern – anlegen oder ersetzen, immer Zeile 1.
 *
 * `updated_by` hält fest, wer es war. Nicht aus Misstrauen, sondern weil bei
 * einem plötzlich stummen Versand die erste Frage lautet: Wer hat zuletzt
 * etwas geändert, und wann?
 */
export function saveMailConfig(input: MailConfigInput, accountId: string | null): void {
  const existing = readMailConfig();
  const password =
    input.password === undefined ? (existing?.password ?? null) : input.password || null;

  db()
    .prepare(
      `INSERT INTO mail_config
         (id, host, port, secure, username, password, from_address, public_url, enabled, provider, updated_at, updated_by)
       VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT (id) DO UPDATE SET
         host = excluded.host,
         port = excluded.port,
         secure = excluded.secure,
         username = excluded.username,
         password = excluded.password,
         from_address = excluded.from_address,
         public_url = excluded.public_url,
         enabled = excluded.enabled,
         provider = excluded.provider,
         updated_at = excluded.updated_at,
         updated_by = excluded.updated_by`,
    )
    .run(
      input.host,
      input.port,
      input.secure ? 1 : 0,
      input.username,
      password,
      input.fromAddress,
      input.publicUrl,
      input.enabled ? 1 : 0,
      input.provider,
      now(),
      accountId,
    );
}

/**
 * Die gespeicherten Angaben verwerfen.
 *
 * Danach gilt wieder, was in der Umgebung steht – oder gar nichts. Das ist der
 * Weg zurück, wenn jemand sich mit den Angaben verrannt hat, und er muss ohne
 * Zugriff auf das NAS gehen.
 */
export function clearMailConfig(): void {
  db().prepare("DELETE FROM mail_config WHERE id = 1").run();
}
