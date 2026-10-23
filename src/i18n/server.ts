import { cookies, headers } from "next/headers";
import { currentUser } from "@/lib/auth/session";
import {
  DEFAULT_LOCALE,
  isLocale,
  matchLocale,
  translator,
  type Locale,
  type Translate,
} from "./index";
import { LANGUAGE_COOKIE } from "./preference";

/**
 * Die Sprache dieser Anfrage (ToDo 15.5), in dieser Reihenfolge:
 *
 * 1. das Cookie – die Wahl auf diesem Gerät;
 * 2. die Sprache am Konto – für ein Gerät, auf dem noch nichts gewählt wurde;
 * 3. die Browsersprache (`Accept-Language`);
 * 4. Deutsch.
 *
 * Dass das Konto hier nach dem Cookie kommt und nicht davor, ist kein
 * Widerspruch zu „das Konto gewinnt": Den Vorrang setzt der Browser durch
 * (`LanguageSync`), indem er bei einem Unterschied das Cookie auf die Kontowahl
 * stellt. Serverseitig dient das Konto nur dazu, dass ein neues Gerät gleich
 * in der richtigen Sprache zeichnet.
 *
 * Nur für Serverseiten und -layouts. Die Abfrage von Cookie und Kopfzeile
 * macht die Seite dynamisch – das ist sie wegen der Nonce (`middleware.ts`)
 * ohnehin.
 */
export async function getLocale(): Promise<Locale> {
  const chosen = (await cookies()).get(LANGUAGE_COOKIE)?.value;
  if (isLocale(chosen)) return chosen;
  const fromAccount = (await currentUser())?.language;
  if (fromAccount) return fromAccount;
  return matchLocale((await headers()).get("accept-language")) ?? DEFAULT_LOCALE;
}

export async function getT(): Promise<Translate> {
  return translator(await getLocale());
}
