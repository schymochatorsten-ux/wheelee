import fs from "node:fs";
import path from "node:path";

/**
 * Wann wurde jede amtliche Stadt zuletzt mit ihrer Quelle verglichen (ToDo 19.15)?
 *
 * Die Datei schreibt der Datenlauf (`scripts/import/auto-update.mts`); sie liegt
 * **neben der Datenbank** (`/app/var/geprueft.json` im Container, `.data/` in der
 * Entwicklung) und nicht im Repository: Ein Lauf, der nur nachsieht und nichts
 * findet, soll keinen Commit und keinen Neubau auslösen, aber trotzdem sichtbar
 * werden. Fehlt die Datei, gibt es kein „geprüft“ – nie ein erfundenes Datum.
 */
export interface CheckedInfo {
  /** Wann der Lauf zuletzt durchlief (ISO), oder `null`. */
  updatedAt: string | null;
  /** Je Stadt der Tag des letzten Vergleichs (ISO). */
  cities: Record<string, string>;
}

function checkedFile(): string {
  const db = process.env.WHEELEE_DB_PATH?.trim();
  return db ? path.join(path.dirname(db), "geprueft.json") : path.join(process.cwd(), ".data", "geprueft.json");
}

export function readChecked(): CheckedInfo {
  try {
    const parsed = JSON.parse(fs.readFileSync(checkedFile(), "utf8")) as Partial<CheckedInfo>;
    return { updatedAt: parsed.updatedAt ?? null, cities: parsed.cities ?? {} };
  } catch {
    return { updatedAt: null, cities: {} };
  }
}
