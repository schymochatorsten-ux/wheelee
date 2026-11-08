import nodemailer from "nodemailer";
import { readMailConfig } from "./db/mail-config";

/**
 * Mailversand über SMTP (Entscheidung D-10, ToDos 11.1 und 11.8).
 *
 * **Zwei Quellen, und die Verwaltung gewinnt** (ToDo 10.22): Zuerst gilt, was
 * in der Datenbank steht und eingeschaltet ist – eingetragen im Reiter
 * „Rückmeldungen" –, sonst die Umgebungsvariablen unten. Vorher ging es nur
 * über die Umgebung, und die liegt in der `.env` auf dem NAS: Ein neues
 * Postfachpasswort hätte einen Termin mit dem gebraucht, der Zugang zum Gerät
 * hat. Die Begründung für diese Reihenfolge steht in `db/mail-config.ts`.
 *
 * Die App hat kein eigenes Postfach.
 * **Ohne Zugangsdaten gibt es keinen Versand – und keine Oberfläche dafür.**
 * `mailConfigured()` ist die eine Stelle, die darüber entscheidet: Die
 * Endpunkte antworten dann mit 404, und die Oberfläche blendet „Passwort
 * vergessen" und „E-Mail ändern" aus. Ein Knopf, der nichts verschickt, wäre
 * schlimmer als keiner.
 *
 * | Variable      | Bedeutung                                              |
 * | ------------- | ------------------------------------------------------ |
 * | `SMTP_HOST`   | Server – ohne ihn ist der Versand aus                  |
 * | `SMTP_PORT`   | Vorgabe 587 (STARTTLS); 465 ist TLS von Anfang an     |
 * | `SMTP_USER`   | Benutzer, falls der Server eine Anmeldung verlangt     |
 * | `SMTP_PASS`   | Passwort dazu                                          |
 * | `SMTP_FROM`   | Absenderadresse – ohne sie ist der Versand aus         |
 * | `SMTP_SECURE` | `true` erzwingt TLS von Anfang an (sonst nur bei 465)  |
 * | `WHEELEE_PUBLIC_URL` | Adresse der App für Links, `https://…` – ohne sie ist der Versand aus |
 */

interface SmtpConfig {
  host: string;
  port: number;
  secure: boolean;
  user: string | null;
  pass: string | null;
  from: string;
}

/**
 * Die eingeschaltete Konfiguration aus der Datenbank, falls es eine gibt.
 *
 * Ausgeschaltet heißt: Es gibt sie, aber sie gilt nicht – und sie fällt auch
 * **nicht** auf die Umgebung zurück. Wer den Versand in der Verwaltung
 * abschaltet, will ihn aus haben, nicht heimlich über den alten Weg weiterlaufen
 * lassen.
 */
function stored(): SmtpConfig | null {
  const row = readMailConfig();
  if (!row) return null;
  if (!row.enabled) return null;
  return {
    host: row.host,
    port: row.port,
    secure: row.secure,
    user: row.username,
    pass: row.password,
    from: row.fromAddress,
  };
}

/** Ob überhaupt eine gespeicherte Konfiguration besteht – auch eine abgeschaltete. */
function storedExists(): boolean {
  return readMailConfig() !== null;
}

function config(): SmtpConfig | null {
  const fromDatabase = stored();
  if (fromDatabase) return fromDatabase;
  // Eine abgeschaltete Konfiguration überstimmt die Umgebung: siehe `stored()`.
  if (storedExists()) return null;

  const host = process.env.SMTP_HOST?.trim();
  const from = process.env.SMTP_FROM?.trim();
  if (!host || !from) return null;

  const port = Number(process.env.SMTP_PORT?.trim() || 587);
  const secure = process.env.SMTP_SECURE?.trim()
    ? process.env.SMTP_SECURE.trim() === "true"
    : port === 465;

  return {
    host,
    port: Number.isInteger(port) && port > 0 ? port : 587,
    secure,
    user: process.env.SMTP_USER?.trim() || null,
    pass: process.env.SMTP_PASS ?? null,
    from,
  };
}

/** Ob Mails verschickt werden können. */
export function mailConfigured(): boolean {
  return config() !== null && publicUrl() !== null;
}

/**
 * Ob in der **Umgebung** vollständige Angaben stehen.
 *
 * Nur für die Anzeige in der Verwaltung: Dort soll stehen, dass es einen
 * zweiten Satz Angaben gibt und welcher gerade gilt. Ohne diese Auskunft
 * stünde jemand vor einem Formular, das er für wirkungslos hält, oder vor
 * einem Versand, dessen Herkunft er nicht erklären kann.
 */
export function envMailConfigured(): boolean {
  return Boolean(
    process.env.SMTP_HOST?.trim() &&
      process.env.SMTP_FROM?.trim() &&
      validUrl(process.env.WHEELEE_PUBLIC_URL),
  );
}

export interface Mail {
  to: string;
  subject: string;
  text: string;
}

/**
 * Eine Mail verschicken. Wirft, wenn der Versand scheitert – der Aufrufer
 * entscheidet, was er dem Menschen davor sagt. (Bei „Passwort vergessen" gar
 * nichts: Die Antwort darf nicht verraten, ob die Adresse bekannt war.)
 */
export async function sendMail(mail: Mail): Promise<void> {
  const settings = config();
  if (!settings) throw new Error("Mailversand ist nicht eingerichtet.");

  const transport = nodemailer.createTransport({
    host: settings.host,
    port: settings.port,
    secure: settings.secure,
    auth: settings.user ? { user: settings.user, pass: settings.pass ?? "" } : undefined,
    // Kurze Fristen: Eine hängende Verbindung soll die Anfrage nicht ewig
    // offenhalten.
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });

  try {
    await transport.sendMail({
      from: settings.from,
      to: mail.to,
      subject: mail.subject,
      text: mail.text,
    });
  } finally {
    transport.close();
  }
}

/**
 * Die öffentliche Adresse der App für Links in Mails, ohne Schrägstrich am Ende.
 *
 * **Aus der Umgebung und nicht aus dem `Host`-Kopf der Anfrage.** Ein Link zum
 * Zurücksetzen, den der Absender einer Anfrage über den Kopf umlenken kann,
 * wäre „Host-Header-Poisoning": Jemand ruft „Passwort vergessen" für eine
 * fremde Adresse auf, schickt einen falschen `Host` mit, und das Opfer bekommt
 * einen echten Token auf der Seite des Angreifers.
 */
export function publicUrl(): string | null {
  const row = readMailConfig();
  if (row) return row.enabled ? validUrl(row.publicUrl) : null;
  return validUrl(process.env.WHEELEE_PUBLIC_URL);
}

/**
 * Eine brauchbare öffentliche Adresse, ohne Schrägstrich am Ende – sonst `null`.
 *
 * `https` oder `localhost`, weil ein Link zum Zurücksetzen über eine
 * unverschlüsselte Verbindung mitgelesen werden kann. Dieselbe Prüfung gilt für
 * die Eingabe in der Verwaltung; sie steckt deshalb in einer eigenen Funktion
 * und nicht zweimal nebeneinander.
 */
export function validUrl(value: string | undefined | null): string | null {
  const trimmed = value?.trim().replace(/\/+$/, "");
  if (!trimmed) return null;
  try {
    const url = new URL(trimmed);
    return url.protocol === "https:" || url.hostname === "localhost" ? trimmed : null;
  } catch {
    return null;
  }
}
