import { looksLikeEmail, normalizeEmail } from "./auth/email";

/**
 * Rückmeldungen: Fehlermeldungen und Verbesserungsvorschläge (ToDos 17).
 *
 * Nutzer:innen sind die einzige Quelle, die merkt, wenn ein Parkplatz nicht
 * mehr existiert oder an der falschen Stelle liegt. Die Hürde dafür muss
 * niedrig sein.
 *
 * **Der Weg über `mailto:` ist am 2026-10-11 entfallen** (D-06, Abschnitt 17).
 * Er hatte vier Mängel, und jeder einzelne hätte Meldungen verloren:
 *
 * - Eine Adresse im ausgelieferten Quelltext ist öffentlich und bekommt Spam.
 * - `mailto:` setzt ein eingerichtetes Mailprogramm voraus. Auf einem
 *   geliehenen oder frisch aufgesetzten Telefon passiert beim Antippen
 *   **nichts** – und die Meldung ist weg, ohne dass es jemand merkt.
 * - Meldungen in einem Postfach lassen sich nicht auswerten. „Dieser Parkplatz
 *   existiert nicht mehr" dreimal oder einmal – in einer Tabelle sieht man
 *   das, in einem Posteingang nicht.
 * - Wer schreibt, gibt dabei unfreiwillig seine Absenderadresse preis.
 *
 * Diese Datei hält, was **Browser und Server gemeinsam** brauchen: die beiden
 * Arten, die Grenzen und die Prüfung. Sie wird bewusst auf beiden Seiten
 * benutzt – der Browser, damit ein Fehler sofort am Feld steht, der Server,
 * weil eine Prüfung nur im Browser keine Prüfung ist.
 */

/**
 * Zwei Arten, nicht mehr.
 *
 * Sie unterscheiden sich im Ton, nicht nur in der Ablage: Wer einen falschen
 * Parkplatz meldet, ist in Eile; wer einen Vorschlag schreibt, nimmt sich
 * Zeit. Deshalb stehen im Formular zwei Schaltflächen und kein Auswahlmenü –
 * ein Menü verlangt erst einen Griff, um zu zeigen, dass es genau zwei
 * Möglichkeiten gibt.
 */
export const FEEDBACK_KINDS = ["fehler", "vorschlag"] as const;
export type FeedbackKind = (typeof FEEDBACK_KINDS)[number];

export const KIND_LABELS: Record<FeedbackKind, string> = {
  fehler: "Fehler melden",
  vorschlag: "Verbesserungsvorschlag",
};

/** Bearbeitungsstand, wie die Übersicht ihn führt. */
export const FEEDBACK_STATUSES = ["neu", "in_arbeit", "umgesetzt", "verworfen"] as const;
export type FeedbackStatus = (typeof FEEDBACK_STATUSES)[number];

export const STATUS_LABELS: Record<FeedbackStatus, string> = {
  neu: "Neu",
  in_arbeit: "In Arbeit",
  umgesetzt: "Umgesetzt",
  verworfen: "Verworfen",
};

/**
 * Höchstlänge der Nachricht.
 *
 * 2.000 Zeichen sind etwa eine Schreibmaschinenseite – mehr als genug für
 * „Der Parkplatz an der Bahnhofstraße 4 ist aufgehoben, dort ist jetzt eine
 * Ladesäule". Eine Grenze braucht es trotzdem: Ein offener Schreib-Endpunkt
 * ohne Längenbegrenzung ist eine Einladung, die Datenbank zu füllen.
 */
export const MESSAGE_MAX = 2_000;

/**
 * Mindestlänge.
 *
 * Unter zehn Zeichen ist keine Meldung, mit der sich etwas anfangen lässt –
 * „kaputt" nennt weder den Parkplatz noch das Problem. Die Grenze ist
 * absichtlich niedrig: Wer sich Mühe gibt, aber kurz schreibt, soll nicht
 * abgewiesen werden.
 */
export const MESSAGE_MIN = 10;

export interface FeedbackInput {
  kind: string;
  message: string;
  /** Freiwillig – siehe `CONTACT_HINT`. */
  contactEmail?: string | null;
  /** Betroffener Parkplatz, falls die Meldung aus der Detailansicht kommt. */
  spotId?: string | null;
  city?: string | null;
  url?: string | null;
  userAgent?: string | null;
  appVersion?: string | null;
  deviceId?: string | null;
}

export interface ValidFeedback {
  kind: FeedbackKind;
  message: string;
  contactEmail: string | null;
  spotId: string | null;
  city: string | null;
  url: string | null;
  userAgent: string | null;
  appVersion: string | null;
  deviceId: string | null;
}

/**
 * Was im Formular über die Adresse steht.
 *
 * Hier als Konstante, weil es **zwei Zusagen** enthält, die stimmen müssen:
 * dass ohne Adresse keine Antwort kommt, und dass die Adresse nur für die
 * Antwort benutzt wird. Stünde der Text nur in der Komponente, ließe sich die
 * eine ändern und die andere vergessen.
 *
 * Wichtig ist die **Richtung** der Aussage: nicht „gib deine Adresse an, dann
 * antworten wir", sondern „ohne Adresse können wir nicht antworten". Das
 * Zweite ist wahr und drängt nicht.
 */
export const CONTACT_HINT =
  "Nur mit Adresse können wir dir antworten – bei Rückfragen oder wenn der Fehler behoben ist. " +
  "Ohne Adresse hilft deine Meldung trotzdem, du hörst dann aber nichts von uns.";

/** Was mit der Adresse geschieht – gehört neben das Feld, nicht ins Impressum. */
export const CONTACT_PRIVACY =
  "Die Adresse wird nur für die Antwort auf diese Meldung benutzt, nicht weitergegeben " +
  "und mit der Meldung gelöscht – spätestens nach zwei Jahren.";

function trimmed(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const text = value.trim();
  if (text.length === 0) return null;
  return text.slice(0, max);
}

export function isFeedbackKind(value: unknown): value is FeedbackKind {
  return typeof value === "string" && (FEEDBACK_KINDS as readonly string[]).includes(value);
}

export function isFeedbackStatus(value: unknown): value is FeedbackStatus {
  return typeof value === "string" && (FEEDBACK_STATUSES as readonly string[]).includes(value);
}

export type Validation =
  | { ok: true; value: ValidFeedback }
  | { ok: false; field: "kind" | "message" | "contactEmail"; error: string };

/**
 * Eine Meldung prüfen.
 *
 * Gibt beim ersten Mangel das **Feld** mit zurück, damit die Oberfläche den
 * Hinweis dort anzeigen kann, wo er hingehört. Eine Fehlermeldung über dem
 * ganzen Formular lässt den Nutzer suchen – und wer gerade im Auto sitzt,
 * bricht dann ab.
 */
export function validateFeedback(input: FeedbackInput): Validation {
  if (!isFeedbackKind(input.kind)) {
    return { ok: false, field: "kind", error: "Bitte wähle aus, worum es geht." };
  }

  const message = typeof input.message === "string" ? input.message.trim() : "";
  if (message.length < MESSAGE_MIN) {
    return {
      ok: false,
      field: "message",
      error: "Bitte beschreibe mit ein paar Worten, was nicht stimmt.",
    };
  }
  if (message.length > MESSAGE_MAX) {
    return {
      ok: false,
      field: "message",
      error: `Bitte kürzer fassen – höchstens ${MESSAGE_MAX.toLocaleString("de-DE")} Zeichen.`,
    };
  }

  // Leer ist richtig und erlaubt; falsch geschrieben nicht. Eine Adresse mit
  // Tippfehler ist schlechter als keine: Sie verspricht eine Antwort, die
  // nirgends ankommt.
  const rawEmail = trimmed(input.contactEmail, 254);
  if (rawEmail !== null && !looksLikeEmail(rawEmail)) {
    return {
      ok: false,
      field: "contactEmail",
      error: "Diese E-Mail-Adresse sieht nicht richtig aus. Lass das Feld sonst einfach leer.",
    };
  }

  return {
    ok: true,
    value: {
      kind: input.kind,
      message,
      contactEmail: rawEmail === null ? null : normalizeEmail(rawEmail),
      spotId: trimmed(input.spotId, 120),
      city: trimmed(input.city, 120),
      url: trimmed(input.url, 500),
      userAgent: trimmed(input.userAgent, 300),
      appVersion: trimmed(input.appVersion, 50),
      deviceId: trimmed(input.deviceId, 100),
    },
  };
}
