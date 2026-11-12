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
  /**
   * Name der verantwortlichen Person oder Körperschaft – **kann fehlen**,
   * wenn die Umgebung ihn nicht nennt (siehe `operator()`).
   */
  name: string | null;
  /**
   * Anschrift, zeilenweise – Straße, Postleitzahl und Ort, Land.
   *
   * **Kann leer sein** (siehe `operator()`): Dann steht der Name ohne
   * Anschrift da, statt dass die ganze Angabe verschwindet.
   */
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

/**
 * Die Kontaktadresse des Projekts, fest im Quelltext (Torsten, 2026-11-12:
 * „bitte einfach in den Texten mit angeben, das sollte ohne mich gehen").
 *
 * **Warum das kein Widerspruch zur Regel oben ist.** Dort geht es um die
 * ladungsfähige Anschrift – eine Wohnadresse, die niemand in die Historie
 * eines öffentlichen Repositories schreiben will. Diese Adresse ist eine
 * eigens für das Projekt eingerichtete Postfachadresse, sie steht ohnehin
 * auf jeder Seite, und sie soll gerade dann da sein, wenn auf dem NAS
 * niemand etwas eingetragen hat. `WHEELEE_OPERATOR_EMAIL` sticht sie, falls
 * sich das Postfach einmal ändert.
 */
const VORGABE_EMAIL = "wheelee@gmx.net";

function value(name: string): string | null {
  const raw = process.env[name]?.trim();
  return raw && raw.length > 0 ? raw : null;
}

/**
 * Die Betreiberangaben – oder `null`, wenn Name oder E-Mail fehlen.
 *
 * **Die Anschrift ist seit dem 2026-11-12 nicht mehr Bedingung.** Vorher
 * galt: fehlt eine der drei Angaben, zeigt die Seite gar nichts – „ein halbes
 * Impressum erfüllt die Pflicht nicht, sieht aber so aus". Die Folge in der
 * Wirklichkeit war eine andere: Torsten hat die Anschrift am 2026-10-24
 * bewusst weggelassen (10.2a), und damit stand auf `wheelee.de/impressum`
 * **auch keine E-Mail-Adresse** – nachgesehen am 2026-11-12, die Seite trug
 * unter „Verantwortlich für den Inhalt" nur „Siehe oben." und darüber nichts.
 *
 * Das ist die schlechtere der beiden Unvollständigkeiten: Ohne Anschrift ist
 * das Impressum nach § 5 DDG lückenhaft, ohne jede Kontaktangabe fehlt
 * zusätzlich der Weg, auf dem sich jemand überhaupt melden kann – und genau
 * den verlangt § 5 Abs. 1 Nr. 2 („schnelle elektronische Kontaktaufnahme").
 * Gezeigt wird deshalb, was da ist; was fehlt, fehlt sichtbar.
 *
 * **Seit dem 2026-11-12 reicht die E-Mail-Adresse**, und die hat eine
 * Vorgabe (`VORGABE_EMAIL`) – `null` kommt damit praktisch nicht mehr vor.
 * Der Name bleibt, wo er hingehört: in der Umgebung. Fehlt er, steht der
 * Kontakt trotzdem da; das ist besser als eine Seite ohne jede Angabe.
 */
export function operator(): Operator | null {
  const name = value("WHEELEE_OPERATOR_NAME");
  const rawAddress = value("WHEELEE_OPERATOR_ADDRESS");
  const email = contactEmail();

  if (!email) return null;

  const address = rawAddress ? addressLines(rawAddress) : [];

  return {
    name,
    address,
    email,
    phone: value("WHEELEE_OPERATOR_PHONE"),
    vatId: value("WHEELEE_OPERATOR_VAT_ID"),
  };
}

/**
 * Nur die Kontaktadresse – für Seiten, die keinen Betreiber darstellen,
 * sondern nur sagen, wohin man schreiben kann (`/info`, ToDo 21.3).
 *
 * Eigene Funktion statt `operator()?.email`, damit die Adresse nicht daran
 * hängt, ob Name und Anschrift gesetzt sind: Für „schreib uns" ist der Name
 * des Betreibers unerheblich.
 */
export function contactEmail(): string | null {
  return value("WHEELEE_OPERATOR_EMAIL") ?? VORGABE_EMAIL;
}

/** Nur für Tests und die Anzeige: Zerlegen der Anschrift einzeln prüfbar. */
export { addressLines };
