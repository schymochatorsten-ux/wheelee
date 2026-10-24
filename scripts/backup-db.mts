import path from "node:path";
import { backupDatabase } from "../src/lib/db/backup";

/**
 * Konsistente Sicherung der Datenbank (ToDo 12.13).
 *
 *     npm run db:backup                 → .data/sicherung/wheelee-<Datum>.sqlite
 *     npm run db:backup -- <Zieldatei>
 *
 * Quelle ist `WHEELEE_DB_PATH`, sonst `.data/wheelee.sqlite` – wie in der App.
 * Im Container steht `tsx` nicht zur Verfügung; dort genügt der Einzeiler aus
 * der README (Abschnitt „Sicherung“), der dieselbe Anweisung ausführt.
 */
const source = process.env.WHEELEE_DB_PATH?.trim() || path.join(process.cwd(), ".data", "wheelee.sqlite");
const stamp = new Date().toISOString().replace(/[:.]/g, "-");
const target = process.argv[2] ?? path.join(path.dirname(source), "sicherung", `wheelee-${stamp}.sqlite`);

backupDatabase(source, target);
console.log(`Gesichert: ${target}`);
