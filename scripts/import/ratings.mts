/**
 * Bewertungen für die Datenpflege lesen (ToDo 8.9).
 *
 * **Hier wird aus Bewertungen Datenpflege.** Ein Parkplatz, den mehrere
 * Menschen als aufgehoben gemeldet haben, gehört auf die Prüfliste aus
 * Abschnitt 3 – das war der letzte fehlende Schritt: Die Meldungen lagen in
 * der Datenbank, und `npm run validate` wusste nichts von ihnen.
 *
 * **Diese Datei öffnet die Datenbank ausdrücklich nur lesend**, und das ist
 * keine Vorsichtsmaßnahme, sondern der Grund, warum sie überhaupt existiert:
 * `src/lib/db/sqlite.ts` legt die Datei an, erzeugt das Verzeichnis und führt
 * Migrationen aus. Ein Prüfskript, das von sich sagt „ändert keine Daten",
 * darf beides nicht tun – es würde auf einem frischen Rechner eine leere
 * Datenbank anlegen, nur weil jemand einen Bericht erzeugt hat.
 *
 * **Fehlt die Datei, ist das Ergebnis `null` und nicht „nichts gemeldet".**
 * Dieselbe Regel wie beim Abgleich mit OpenStreetMap (`crossCheckWithOsm`
 * gibt bei leerer Antwort `null` zurück): Ein nicht durchgeführter Abgleich
 * darf nicht wie ein gutes Ergebnis aussehen. Die Datenbank liegt im Betrieb
 * auf dem NAS; wer den Bericht auf seinem Rechner erzeugt, hat sie nicht, und
 * „kein Parkplatz ist gemeldet" wäre dort eine Falschaussage.
 */
import fs from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import { projectRoot } from "./config.mjs";
import {
  accountFactors,
  assessSpot,
  reportReasons,
  roundWeight,
  type ReportReason,
  type VoteRecord,
} from "../../src/lib/ratings/trust.js";

/** Eine Meldung, wie der Bericht sie braucht. */
export interface GoneReport {
  spotId: string;
  /** Konten, die „existiert nicht mehr" gemeldet haben. */
  goneCount: number;
  /** Konten, die ihn bestätigt haben – das Gegengewicht. */
  existsCount: number;
  /** Gewichtete Summen nach Alter und Konto (11.6), neben den rohen Zählern. */
  goneWeight: number;
  existsWeight: number;
  /** Warum der Parkplatz auf der Liste steht. */
  reasons: ReportReason[];
  lastGoneAt: string | null;
}

/**
 * Wo die Datenbank liegt.
 *
 * Dieselbe Vorgabe wie in `src/lib/db/sqlite.ts`, nur gegen `projectRoot`
 * statt `process.cwd()`: Ein Skript soll dieselbe Datei finden, egal aus
 * welchem Verzeichnis es gestartet wurde.
 */
export function databaseFile(): string {
  const configured = process.env.WHEELEE_DB_PATH?.trim();
  if (configured) return configured;
  return path.join(projectRoot, ".data", "wheelee.sqlite");
}

/**
 * Alle Parkplätze mit mindestens `minimum` „aufgehoben"-Meldungen.
 *
 * `null` heißt „keine Datenbank vorhanden, nicht geprüft". Eine leere Liste
 * heißt „geprüft, nichts gemeldet" – der Unterschied ist derselbe wie zwischen
 * `⚪ geprüft, nichts gefunden` und `⬜ noch nicht geprüft` im Importstand, und
 * er wurde dort aus genau demselben Grund eingeführt.
 */
export function readGoneReports(
  minimum = 2,
  file = databaseFile(),
  now: Date = new Date(),
): GoneReport[] | null {
  if (!fs.existsSync(file)) return null;

  /*
   * `readOnly` ist das Entscheidende an dieser Funktion. Ohne das Flag würde
   * `node:sqlite` die Datei bei Bedarf anlegen und – schlimmer – im
   * WAL-Betrieb beim Öffnen Begleitdateien schreiben. Auf der Datenbank des
   * laufenden Betriebs hat ein Berichtsskript nichts zu schreiben.
   */
  let connection: DatabaseSync | null = null;
  try {
    connection = new DatabaseSync(file, { readOnly: true });

    /*
     * Alle Stimmen, nicht nur die der gemeldeten Parkplätze: Der Konto-Faktor
     * (11.6) entsteht aus der Übereinstimmung über alle Parkplätze. Die
     * Rechnung steht in `src/lib/ratings/trust.ts`, ohne Datenbank.
     */
    const votes = (
      connection
        .prepare(
          `SELECT spot_id AS spotId, account_id AS accountId, vote,
                  COALESCE(updated_at, created_at) AS at
             FROM rating`,
        )
        .all() as unknown as VoteRecord[]
    ).map((row) => ({
      spotId: String(row.spotId),
      accountId: String(row.accountId),
      vote: row.vote,
      at: String(row.at),
    }));

    const factors = accountFactors(votes);
    const bySpot = new Map<string, VoteRecord[]>();
    for (const record of votes) {
      const list = bySpot.get(record.spotId);
      if (list) list.push(record);
      else bySpot.set(record.spotId, [record]);
    }

    const reports: GoneReport[] = [];
    for (const [spotId, list] of bySpot) {
      const assessment = assessSpot(list, factors, now);
      if (assessment.goneCount < minimum) continue;
      const lastGoneAt = list
        .filter((record) => record.vote === "gone")
        .map((record) => record.at)
        .sort()
        .pop();
      reports.push({
        spotId,
        goneCount: assessment.goneCount,
        existsCount: assessment.existsCount,
        goneWeight: roundWeight(assessment.goneWeight),
        existsWeight: roundWeight(assessment.existsWeight),
        reasons: reportReasons(assessment, minimum),
        lastGoneAt: lastGoneAt ?? null,
      });
    }

    return reports.sort((a, b) => b.goneCount - a.goneCount || a.spotId.localeCompare(b.spotId));
  } catch (error) {
    /*
     * Die Tabelle fehlt: Die Datei stammt aus einer Zeit vor Migrationsschritt
     * 2. Dann **kann** es keine Bewertungen geben, und „geprüft, nichts
     * gemeldet" ist die wahre Auskunft – nicht „nicht geprüft".
     */
    if (/no such table/iu.test((error as Error).message)) return [];
    throw error;
  } finally {
    connection?.close();
  }
}
