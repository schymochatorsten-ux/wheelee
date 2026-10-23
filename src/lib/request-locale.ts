import { AsyncLocalStorage } from "node:async_hooks";
import { DEFAULT_LOCALE, isLocale, matchLocale, registerLocaleSource, type Locale } from "@/i18n";
import { LANGUAGE_COOKIE } from "@/i18n/preference";

/**
 * Die Sprache einer Schnittstellenanfrage (ToDo 15.1).
 *
 * Die Fehlermeldungen der Endpunkte (`api.*`) gehen als Text an die
 * Oberfläche, die sie anzeigt – in Englisch wäre eine deutsche Meldung mitten
 * im englischen Satz ein Bruch. Statt jeden Endpunkt eine Sprache durchreichen
 * zu lassen, steht sie hier **je Anfrage** in einem `AsyncLocalStorage`;
 * `withLogging` setzt sie (alle Endpunkte laufen dadurch), und `t()` liest sie,
 * wenn es keine Sprache ausdrücklich bekommt. Das ist anders als ein Modulwert
 * für alle Besucher, weil der Speicher an die Anfrage gebunden ist und nicht an
 * den Prozess.
 *
 * Reihenfolge wie `getLocale` im Browserweg: Cookie, dann `Accept-Language`.
 * Die Sprache am Konto wird hier nicht nachgeschlagen – sie steht ohnehin im
 * Cookie, sobald die Oberfläche sie angewendet hat (`LanguageSync`).
 */

const storage = new AsyncLocalStorage<Locale>();

registerLocaleSource(() => storage.getStore());

export function localeFromRequest(request: Request): Locale {
  const cookie = request.headers
    .get("cookie")
    ?.split(";")
    .map((part) => part.trim().split("="))
    .find(([name]) => name === LANGUAGE_COOKIE)?.[1];
  if (isLocale(cookie)) return cookie;
  return matchLocale(request.headers.get("accept-language")) ?? DEFAULT_LOCALE;
}

export function runWithLocale<T>(locale: Locale, work: () => T): T {
  return storage.run(locale, work);
}
