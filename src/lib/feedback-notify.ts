import { readMailConfig } from "./db/mail-config";
import { adminAccountEmails } from "./db/accounts";
import { logEvent } from "./log";
import { mailConfigured, publicUrl, sendMail } from "./mail";
import type { ValidFeedback } from "./feedback";

/**
 * Nachricht an den Betreiber, sobald jemand einen Fehler oder einen Vorschlag
 * einträgt (ToDo 17.9, Torsten 2026-11-08).
 *
 * **Warum überhaupt:** Eine Meldung ist nur dann etwas wert, wenn sie jemand
 * liest. Bis hierher musste man sich dafür anmelden und in den Reiter
 * „Rückmeldungen“ sehen – also gerade dann daran denken, wenn nichts darauf
 * hinweist, dass es etwas zu lesen gibt.
 *
 * **Der Betreff ist fest und deutsch:** „Wheelee Fehler“ oder „Wheelee
 * Verbesserungsvorschlag“ (so gewünscht). Er geht an den Betreiber, nicht an
 * Nutzer:innen, und steht deshalb nicht in den Sprachdateien – eine Mail, die
 * je nach eingestellter Oberflächensprache anders heißt, ließe sich im
 * Postfach nicht filtern.
 */

export const NOTIFY_SUBJECT = {
  fehler: "Wheelee Fehler",
  vorschlag: "Wheelee Verbesserungsvorschlag",
} as const;

/**
 * Was in der Mail steht.
 *
 * **Der Meldungstext selbst ist dabei**, denn sonst müsste man für jede
 * Nachricht die Verwaltung öffnen, und die Benachrichtigung spart nichts. Die
 * Antwortadresse steht nur da, wenn sie freiwillig angegeben wurde; ohne sie
 * steht ausdrücklich, dass keine Antwort möglich ist – dieselbe Unterscheidung
 * wie in der Übersicht (Migration 3).
 */
export function notifyText(feedback: ValidFeedback): string {
  const lines = [
    feedback.kind === "fehler" ? "Neuer Fehler:" : "Neuer Verbesserungsvorschlag:",
    "",
    feedback.message,
    "",
  ];

  if (feedback.city) lines.push(`Stadt: ${feedback.city}`);
  if (feedback.spotId) lines.push(`Parkplatz: ${feedback.spotId}`);
  lines.push(
    feedback.contactEmail
      ? `Antwort an: ${feedback.contactEmail}`
      : "Antwortadresse: keine angegeben, eine Antwort ist nicht möglich.",
  );

  const base = publicUrl();
  if (base) lines.push("", `Verwaltung: ${base}`);

  return lines.join("\n");
}

/**
 * Die Benachrichtigung verschicken – oder stillschweigend nichts tun.
 *
 * **Scheitert nie nach außen.** Die Meldung ist gespeichert, bevor das hier
 * läuft; ob eine Mail herausgeht, darf für die Person, die gerade vor einem
 * aufgehobenen Parkplatz steht, keinen Unterschied machen. Ein kaputter
 * Mailserver würde sonst genau die Rückmeldungen verhindern, auf die es
 * ankommt.
 */
export async function notifyNewFeedback(feedback: ValidFeedback): Promise<void> {
  /*
   * **Ohne eingetragene Adresse gehen die Mails an die Admin-Konten**
   * (ToDo 17.11). Bis zum 2026-11-08 war das Feld in der Verwaltung die
   * einzige Quelle, und leer hieß: kein Versand. Das sah aus wie eingerichtet
   * – die Testmail kam ja an, denn die geht an das **angemeldete Konto** –,
   * und es kam trotzdem nichts.
   *
   * **Die Erwartung ist die umgekehrte**, und sie ist die richtige: Wer die
   * Verwaltung bedient, will von neuen Meldungen erfahren. 17.9 hatte
   * argumentiert, ein still mitbenachrichtigter zweiter Admin wäre eine
   * Überraschung. Das stimmt – aber eine Mail zu viel an jemanden, der die
   * Meldungen ohnehin bearbeitet, wiegt leichter als jede Meldung, von der
   * niemand erfährt. Wer es anders will, trägt genau eine Adresse ein.
   */
  const eingetragen = readMailConfig()?.notifyEmail?.trim();
  const to = eingetragen || adminAccountEmails().join(", ");

  /*
   * **Still gegenüber der meldenden Person, aber nicht gegenüber dem
   * Betreiber** (ToDo 17.10). Bis zum 2026-11-08 endete jeder dieser Fälle in
   * einem leeren `return` bzw. einem leeren `catch`: Es kam keine Mail an,
   * und es gab **nirgends** eine Spur davon – weder in der Verwaltung noch im
   * Protokoll. Genau das ist dann passiert, und die Suche danach begann mit
   * Raten. Eine Zeile im Protokoll kostet nichts und beantwortet die Frage
   * beim nächsten Mal in Sekunden.
   *
   * Die Adresse selbst steht **nicht** in der Zeile: Protokolliert werden nie
   * Inhalte und keine E-Mail-Adressen (siehe `log.ts`).
   */
  if (!to) {
    // Jetzt nur noch möglich, wenn es gar kein Admin-Konto gibt.
    logEvent("warn", "feedback_notify_skipped", { grund: "keine_adresse" });
    return;
  }
  if (!mailConfigured()) {
    logEvent("warn", "feedback_notify_skipped", { grund: "versand_aus" });
    return;
  }

  try {
    await sendMail({
      to,
      subject: NOTIFY_SUBJECT[feedback.kind],
      text: notifyText(feedback),
    });
    logEvent("info", "feedback_notify_sent", {
      art: feedback.kind,
      // Nur **welcher Weg**, nie die Adresse.
      empfaenger: eingetragen ? "eingetragen" : "admin_konten",
    });
  } catch (error) {
    logEvent("error", "feedback_notify_failed", smtpFehlerfelder(error));
  }
}

/**
 * Was von einem Versandfehler ins Protokoll darf (ToDo 10.23).
 *
 * **Die Meldung selbst darf es nicht**, und das ist gemessen, nicht vermutet:
 * Lehnt ein Server den Empfänger ab, lautet `error.message`
 * `Can't send mail - all recipients were rejected: 550 5.1.1 <name@example.de>:
 * Recipient address rejected` – **mit der Adresse darin**. Bis zum 2026-11-09
 * stand genau diese Meldung in der Zeile, direkt unter dem Kommentar „nicht die
 * Adresse". Die Datenschutzerklärung und `log.ts` sagen beide zu, dass keine
 * E-Mail-Adresse in ein Protokoll gelangt; `log.ts` kann es nicht abfangen,
 * weil seine Sperrliste nach Feldnamen geht und hier `fehler` darüberstand.
 *
 * **Der Test, der das verhindern sollte, griff nicht:** Er maß den Fall
 * „Mailserver antwortet nicht" (`connect ECONNREFUSED 127.0.0.1:1`) – eine
 * Meldung, die zufällig keine Adresse enthält. Er lief deshalb grün, während
 * der eigentliche Fall unbeobachtet blieb.
 *
 * Übrig bleibt, was die Störung einordnet und nichts über Personen sagt:
 * nodemailers Fehlerkennung (`EENVELOPE`, `ECONNECTION`, `EAUTH`) und der
 * SMTP-Statuscode. Für die Frage „warum kam keine Mail an" ist das mehr wert
 * als der Fließtext: `EAUTH` heißt abgelaufenes Postfachpasswort, `550` ein
 * Problem mit der Adresse.
 */
function smtpFehlerfelder(error: unknown): Record<string, string | number | null> {
  const smtp = error as { code?: unknown; responseCode?: unknown };
  return {
    art: error instanceof Error ? error.name : "unbekannt",
    code: typeof smtp.code === "string" ? smtp.code : null,
    status: typeof smtp.responseCode === "number" ? smtp.responseCode : null,
  };
}
