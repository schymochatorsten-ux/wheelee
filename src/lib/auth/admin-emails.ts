import { normalizeEmail } from "./email";

/**
 * Die Adressen aus `ADMIN_EMAILS` (ToDo 17.0, entschieden 2026-10-11), durch
 * Komma getrennt.
 *
 * **Sie sind nur der Erstzugang und werden nicht mehr bei jeder Anfrage
 * ausgewertet** (ToDo 10.19). Beim ersten Zugriff auf die Konten hebt
 * `bootstrapAdmins` in `db/accounts.ts` die *bereits vorhandenen* Konten mit
 * diesen Adressen einmalig zu Admins in der Datenbank, und nur solange dort noch
 * kein aktives Admin-Konto steht. Danach zählt allein die Rolle am Konto.
 */
export function adminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((entry) => normalizeEmail(entry))
    .filter((entry) => entry.length > 0);
}

export function isAdminEmail(email: string): boolean {
  return adminEmails().includes(normalizeEmail(email));
}
