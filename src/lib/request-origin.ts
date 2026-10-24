/**
 * Schreibende Anfragen an die Schnittstelle: nur vom eigenen Ursprung, nur als
 * JSON (ToDo 10.13).
 *
 * `SameSite=Lax` am Sitzungs-Cookie hält fremde Seiten schon davon ab, per
 * POST im Namen einer angemeldeten Person zu schreiben – aber nur in Browsern,
 * die es umsetzen, und nicht bei Unterdomänen. Diese Prüfung ist der zweite
 * Riegel und kostet nichts.
 *
 * **Anfragen ohne `Origin` und ohne `Sec-Fetch-Site` werden durchgelassen.**
 * Das sind keine Browser-Formulare (die senden mindestens eine der beiden
 * Zeilen), sondern Programme wie curl oder die Testwerkzeuge – und die brauchen
 * zum Schreiben ohnehin das Cookie.
 */

const WRITING = new Set(["POST", "PUT", "PATCH", "DELETE"]);

import { MAX_JSON_BYTES } from "./read-json";

export type OriginVerdict = "ok" | "foreign-origin" | "unsupported-media-type" | "payload-too-large";

function hostOf(value: string | null): string | null {
  if (!value) return null;
  try {
    return new URL(value).host;
  } catch {
    return null;
  }
}

/** `"ok"` heißt: nichts zu beanstanden. */
export function judgeWritingRequest(method: string, headers: Headers): OriginVerdict {
  if (!WRITING.has(method.toUpperCase())) return "ok";

  const fetchSite = headers.get("sec-fetch-site");
  if (fetchSite) {
    // `none` = vom Nutzer selbst ausgelöst (Adresszeile, Lesezeichen).
    if (fetchSite !== "same-origin" && fetchSite !== "none") return "foreign-origin";
  } else {
    const origin = headers.get("origin");
    if (origin !== null) {
      const eigene = headers.get("x-forwarded-host") ?? headers.get("host");
      if (!eigene || hostOf(origin) !== eigene) return "foreign-origin";
    }
  }

  // Ein Rumpf muss JSON sein. Ohne Rumpf (Abmelden, Löschen) gibt es nichts zu
  // prüfen.
  const length = headers.get("content-length");
  const hasBody = (length !== null && length !== "0") || headers.has("transfer-encoding");
  if (hasBody) {
    const type = (headers.get("content-type") ?? "").split(";")[0]?.trim().toLowerCase();
    if (type !== "application/json") return "unsupported-media-type";
    // Ehrliche Überlängen früh abweisen (ToDo 10.14); den Rest fängt `readJson`.
    if (Number(length) > MAX_JSON_BYTES) return "payload-too-large";
  }
  return "ok";
}
