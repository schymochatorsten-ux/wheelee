import nodemailer from "nodemailer";

/**
 * Mailversand über SMTP (Entscheidung D-10, ToDos 11.1 und 11.8).
 *
 * Alles kommt aus Umgebungsvariablen; die App hat kein eigenes Postfach.
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

function config(): SmtpConfig | null {
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
  const value = process.env.WHEELEE_PUBLIC_URL?.trim().replace(/\/+$/, "");
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.hostname === "localhost" ? value : null;
  } catch {
    return null;
  }
}
