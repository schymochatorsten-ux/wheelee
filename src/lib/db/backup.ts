import fs from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";

/**
 * Eine **konsistente** Kopie der Datenbank (ToDo 12.13).
 *
 * Die Datei läuft im WAL-Modus: Ein Teil der jüngsten Schreibvorgänge steht in
 * `wheelee.sqlite-wal`, nicht in `wheelee.sqlite`. Wer nur die Hauptdatei
 * kopiert, während die App läuft, sichert einen Stand, der zu keinem Zeitpunkt
 * wirklich bestanden hat – im Zweifel ohne die letzten Konten und Stimmen,
 * unter Umständen beschädigt. `VACUUM INTO` liest die Datenbank über eine
 * normale Verbindung (also einschließlich der WAL-Datei) und schreibt eine
 * vollständige, in sich stimmige Datei, ohne die laufende App anzuhalten.
 *
 * Eine vorhandene Zieldatei wird nicht überschrieben: Eine Sicherung, die eine
 * ältere stillschweigend ersetzt, ist keine.
 */
export function backupDatabase(source: string, target: string): void {
  if (!fs.existsSync(source)) throw new Error(`Datenbank nicht gefunden: ${source}`);
  if (fs.existsSync(target)) throw new Error(`Ziel existiert schon: ${target}`);

  fs.mkdirSync(path.dirname(target), { recursive: true });

  const db = new DatabaseSync(source, { readOnly: false });
  try {
    db.exec("PRAGMA busy_timeout = 5000");
    // Der Pfad geht als gebundener Parameter hinein, nicht in den SQL-Text.
    db.prepare("VACUUM INTO ?").run(target);
  } finally {
    db.close();
  }
}
