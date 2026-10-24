import fs from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";

/**
 * Räumt nach dem Lauf die Konten auf, die die Tests angelegt haben (ToDo 12.11).
 *
 * Die Specs legen ihre Konten mit Adressen nach festem Muster an
 * (`…-<Zeitstempel>@example.de`, `e2e-…@example.org`) und räumten bisher nicht
 * auf; in der Entwicklungsdatenbank sammelten sich Konten und Einladungen. Hier
 * wird **nur nach diesen Mustern** gelöscht – keine echte Adresse endet auf
 * `@example.de` oder `@example.org`, aber das Muster ist die einzige Sicherung,
 * deshalb bleibt es eng.
 *
 * Gelöscht wird in derselben Datei, die der Entwicklungsserver benutzt; WAL
 * erlaubt das gleichzeitige Öffnen. Sitzungen, Bewertungen und Favoriten fallen
 * über `ON DELETE CASCADE` mit weg, Rückmeldungen verlieren nur den Bezug zum
 * Konto (`SET NULL`), deshalb muss `foreign_keys` an sein.
 */
export default function globalTeardown(): void {
  const file = process.env.WHEELEE_DB_PATH?.trim() || path.join(process.cwd(), ".data", "wheelee.sqlite");
  if (!fs.existsSync(file)) return;

  const db = new DatabaseSync(file);
  try {
    db.exec("PRAGMA busy_timeout = 5000");
    db.exec("PRAGMA foreign_keys = ON");
    db.exec("BEGIN");
    db.exec(`
      DELETE FROM invitation WHERE email LIKE 'e2e-%@example.org';
      DELETE FROM account
       WHERE email LIKE 'e2e-%@example.org' OR email LIKE '%-%@example.de';
    `);
    db.exec("COMMIT");
  } catch (error) {
    // Aufräumen ist Komfort: Es darf einen grünen Lauf nicht rot machen.
    try {
      db.exec("ROLLBACK");
    } catch {
      // keine offene Transaktion
    }
    console.warn("Testkonten nicht aufgeräumt:", error instanceof Error ? error.message : error);
  } finally {
    db.close();
  }
}
