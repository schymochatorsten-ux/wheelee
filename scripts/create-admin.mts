/**
 * Ein Konto durch die Betreiber:innen anlegen – gedacht für den ersten Admin
 * (ToDo 18.7).
 *
 *     npm run admin:create -- --username Torsten --email <adresse> --password <startpasswort>
 *     npm run admin:create -- --username Torsten --email <adresse> --role user
 *
 * Das Passwort kann statt als Argument in der Umgebung stehen
 * (`WHEELEE_START_PASSWORD`); dann taucht es nicht in der Shell-Historie auf.
 *
 * **Es ist ein Startpasswort:** Das Konto verlangt bei der ersten Anmeldung ein
 * eigenes Passwort und hat bis dahin keine Verwaltungsrechte. Es unterliegt
 * deshalb nicht der Mindestlänge. Das Startpasswort gehört nicht ins
 * Repository und nicht in den Chat; es wird auch nicht ausgegeben.
 *
 * Die Datenbank ist die, auf die `WHEELEE_DB_PATH` zeigt (sonst `.data/`). Auf
 * dem NAS: siehe `deploy/Datenlauf.md`, Abschnitt „Ersten Admin anlegen“.
 */
import { createOperatorAccount } from "../src/lib/db/accounts";

function option(name: string): string | undefined {
  const index = process.argv.indexOf(`--${name}`);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

const username = option("username");
const email = option("email");
const password = option("password") ?? process.env.WHEELEE_START_PASSWORD;
const role = option("role") === "user" ? "user" : "admin";

if (!username || !email || !password) {
  console.error(
    "Aufruf: npm run admin:create -- --username <name> --email <adresse> --password <startpasswort> [--role user]\n" +
      "(das Passwort ersatzweise in WHEELEE_START_PASSWORD)",
  );
  process.exit(2);
}

try {
  const account = createOperatorAccount({ email, username, password, role });
  if (!account) {
    console.error("Abgebrochen: Adresse oder Benutzername sind schon vergeben. Nichts geändert.");
    process.exit(1);
  }
  console.log(
    `Konto angelegt: ${account.username} <${account.email}>, Rolle ${account.role}. ` +
      "Bei der ersten Anmeldung muss das Passwort geändert werden.",
  );
} catch (error) {
  console.error(`Abgebrochen: ${(error as Error).message}`);
  process.exit(1);
}
