import { readMailConfig } from "./db/mail-config";
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
  const to = readMailConfig()?.notifyEmail?.trim();

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
    logEvent("info", "feedback_notify_sent", { art: feedback.kind });
  } catch (error) {
    logEvent("error", "feedback_notify_failed", {
      // Nur die Art des Fehlers, nicht die Adresse und nicht der Meldungstext.
      fehler: error instanceof Error ? error.message : "unbekannt",
    });
  }
}
