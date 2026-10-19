/**
 * Wer diese Seite betreibt – für Impressum und Datenschutzerklärung
 * (ToDo 10.2).
 *
 * **Die Angaben stehen in der Umgebung, nicht im Quelltext.** Das ist dieselbe
 * Entscheidung wie bei `ADMIN_EMAILS` (17.0) und hier noch zwingender: Ein
 * Impressum verlangt nach § 5 DDG eine **ladungsfähige Anschrift**. Bei einem
 * privaten Projekt ist das die Wohnadresse einer Person. Sie in eine
 * versionierte Datei zu schreiben hieße, sie in die Git-Historie zu schreiben –
 * dort bleibt sie auch dann, wenn sie später entfernt wird, und bei einem
 * öffentlichen Repository liest sie jeder.
 *
 * Auf der veröffentlichten Seite steht sie trotzdem, denn genau das verlangt
 * das Gesetz. Der Unterschied ist, **wo sie herkommt**: aus der `.env` auf dem
 * NAS, die das Repository nie sieht.
 *
 * **Fehlt die Konfiguration, wird nichts erfunden.** Die Seite sagt dann offen,
 * dass die Angaben fehlen. Ein Impressum mit Platzhaltern wäre schlimmer als
 * keines: Es sieht aus, als sei die Pflicht erfüllt.
 */

export interface Operator {
  /** Name der verantwortlichen Person oder Körperschaft. */
  name: string;
  /** Anschrift, zeilenweise – Straße, Postleitzahl und Ort, Land. */
  address: string[];
  /** E-Mail-Adresse für die Kontaktaufnahme (§ 5 Abs. 1 Nr. 2 DDG). */
  email: string;
  /**
   * Telefonnummer – **freiwillig.**
   *
   * Das Gesetz verlangt „Angaben, die eine schnelle elektronische
   * Kontaktaufnahme ermöglichen". Eine E-Mail-Adresse genügt dafür nach
   * ständiger Rechtsprechung; eine Telefonnummer ist nicht zwingend.
   */
  phone: string | null;
  /** Umsatzsteuer-Identifikationsnummer, falls vorhanden. */
  vatId: string | null;
}

/**
 * Die Anschrift kommt als **eine** Variable, Zeilen durch `|` getrennt.
 *
 * Mehrere Variablen (Straße, PLZ, Ort) wären scheinbar ordentlicher und in der
 * Sache falsch: Anschriften sind nicht überall gleich aufgebaut, und sobald
 * jemand eine abweichende Form braucht – ein Postfach, einen Zusatz „c/o" –,
 * passt das Schema nicht mehr. Zeilen sind das, was auf dem Briefumschlag
 * steht.
 */
function addressLines(raw: string): string[] {
  return raw
    .split(/[|\n]/u)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

function value(name: string): string | null {
  const raw = process.env[name]?.trim();
  return raw && raw.length > 0 ? raw : null;
}

/**
 * Die Betreiberangaben – oder `null`, wenn die Pflichtangaben fehlen.
 *
 * Pflicht sind Name, Anschrift und E-Mail. Fehlt eines davon, gilt die
 * Konfiguration als nicht vorhanden: Ein halbes Impressum erfüllt die Pflicht
 * nicht, sieht aber so aus.
 */
export function operator(): Operator | null {
  const name = value("WHEELEE_OPERATOR_NAME");
  const rawAddress = value("WHEELEE_OPERATOR_ADDRESS");
  const email = value("WHEELEE_OPERATOR_EMAIL");

  if (!name || !rawAddress || !email) return null;

  const address = addressLines(rawAddress);
  if (address.length === 0) return null;

  return {
    name,
    address,
    email,
    phone: value("WHEELEE_OPERATOR_PHONE"),
    vatId: value("WHEELEE_OPERATOR_VAT_ID"),
  };
}

/** Nur für Tests und die Anzeige: Zerlegen der Anschrift einzeln prüfbar. */
export { addressLines };
