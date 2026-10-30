import { de } from "./de";
import { en } from "./en";
import { es } from "./es";
import { fr } from "./fr";
import { it } from "./it";
import { nl } from "./nl";
import { pl } from "./pl";
import { pt } from "./pt";
import { ru } from "./ru";

/**
 * Zugriff auf die Beschriftungen der Oberfläche (ToDo 15.2).
 *
 * Bewusst klein: eine flache Tabelle je Sprache, Platzhalter `{name}`, keine
 * Bibliothek. Eine weitere Sprache ist eine weitere Datei `<code>.ts`, die
 * `Messages` erfüllt – der Compiler meldet dann jeden fehlenden Schlüssel –,
 * plus ein Eintrag in `LOCALES` unten.
 * Übersetzt wird nach D-08 (Erledigt.md): Dateien je Sprache, kein
 * Übersetzer zur Laufzeit.
 *
 * **Welche Sprache gilt, entscheidet nicht dieses Modul.** Es hält keinen
 * „aktuellen" Wert: Der Server rendert gleichzeitig für mehrere Besucher, ein
 * gemeinsamer Wert würde zwischen ihnen überschrieben. Komponenten holen sich
 * die Sprache aus dem Kontext (`context.tsx`, `useT`), Serverseiten aus
 * `server.ts`, Endpunkte aus dem Speicher der Anfrage (`registerLocaleSource`,
 * unten); ohne Angabe gilt Deutsch.
 */

export type MessageKey = keyof typeof de;
export type Messages = Record<MessageKey, string>;

const catalogs = { de, en, es, fr, it, nl, pl, pt, ru } satisfies Record<string, Messages>;

export type Locale = keyof typeof catalogs;
export const DEFAULT_LOCALE: Locale = "de";

/**
 * Die angebotenen Sprachen, in der Reihenfolge der Auswahl.
 *
 * `name` steht **in der Sprache selbst** und wird nie übersetzt: Wer die
 * Oberfläche nicht lesen kann, erkennt trotzdem seine eigene Sprache.
 * `tag` ist das BCP-47-Etikett für `<html lang>` und `Intl` – die Landesform
 * steuert Zahlenschreibweise („1,5" gegen „1.5") und Datumsreihenfolge.
 */
export const LOCALES: Record<Locale, { name: string; tag: string }> = {
  de: { name: "Deutsch", tag: "de-DE" },
  // Britische Landesform: Datum Tag-Monat-Jahr, 24-Stunden-Uhr – im Reiseland
  // Europa die übliche Lesart. Zahlen wie in en-US (Punkt als Dezimalzeichen).
  en: { name: "English", tag: "en-GB" },
  // Spanien-Spanisch: Dezimalkomma wie im Deutschen, Datum Tag-Monat-Jahr.
  es: { name: "Español", tag: "es-ES" },
  // Frankreich-Französisch: Dezimalkomma, Datum Tag-Monat-Jahr, 24-Stunden-Uhr.
  fr: { name: "Français", tag: "fr-FR" },
  // Italien-Italienisch: Dezimalkomma, Datum Tag-Monat-Jahr, 24-Stunden-Uhr.
  it: { name: "Italiano", tag: "it-IT" },
  // Polen-Polnisch: Dezimalkomma, Datum Tag-Monat-Jahr, 24-Stunden-Uhr.
  pl: { name: "Polski", tag: "pl-PL" },
  // Niederlande-Niederländisch: Dezimalkomma, Datum Tag-Monat-Jahr, 24-Stunden-Uhr.
  nl: { name: "Nederlands", tag: "nl-NL" },
  // Portugal-Portugiesisch: Dezimalkomma, Datum Tag-Monat-Jahr, 24-Stunden-Uhr.
  pt: { name: "Português", tag: "pt-PT" },
  // Russland-Russisch: Dezimalkomma, Datum Tag-Monat-Jahr, 24-Stunden-Uhr.
  ru: { name: "Русский", tag: "ru-RU" },
};

export const LOCALE_CODES = Object.keys(LOCALES) as Locale[];

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && Object.hasOwn(LOCALES, value);
}

/** `Intl`-Etikett der Sprache, z. B. `de-DE`. */
export function localeTag(locale: Locale): string {
  return LOCALES[locale].tag;
}

/**
 * Die beste angebotene Sprache für den `Accept-Language`-Kopf des Browsers,
 * oder `null`, wenn keine passt (dann gilt die Vorgabe). Berücksichtigt die
 * Gewichte (`q=`), nimmt nur den Sprachteil („en-GB" → `en`).
 */
export function matchLocale(header: string | null | undefined): Locale | null {
  if (!header) return null;
  const ranked = header
    .split(",")
    .map((part, index) => {
      const [range, ...params] = part.trim().split(";");
      const q = params.map((p) => /^\s*q=([\d.]+)\s*$/.exec(p)?.[1]).find((v) => v !== undefined);
      const weight = q === undefined ? 1 : Number(q);
      return { language: range.trim().toLowerCase().split("-")[0], weight, index };
    })
    .filter((entry) => entry.language && entry.weight > 0 && Number.isFinite(entry.weight))
    .sort((a, b) => b.weight - a.weight || a.index - b.index);
  for (const entry of ranked) {
    if (isLocale(entry.language)) return entry.language;
  }
  return null;
}

export type MessageVars = Record<string, string | number>;

/** Setzt `{name}` in der Beschriftung ein; unbekannte Platzhalter bleiben stehen. */
export function format(template: string, vars?: MessageVars): string {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (whole, name: string) =>
    name in vars ? String(vars[name]) : whole,
  );
}

/**
 * Woher `t` die Sprache nimmt, wenn sie nicht ausdrücklich übergeben wird.
 * Nur auf dem Server gesetzt (`lib/request-locale.ts`, je Anfrage); im Browser
 * und ohne Anfrage gilt Deutsch.
 */
let requestLocale: (() => Locale | undefined) | null = null;

export function registerLocaleSource(source: () => Locale | undefined): void {
  requestLocale = source;
}

export function t(
  key: MessageKey,
  vars?: MessageVars,
  locale: Locale = requestLocale?.() ?? DEFAULT_LOCALE,
): string {
  return format(catalogs[locale][key], vars);
}

/** Die Beschriftung samt Platzhaltern, noch nicht eingesetzt – für `tRich`. */
export function template(key: MessageKey, locale: Locale = DEFAULT_LOCALE): string {
  return catalogs[locale][key];
}

/** Eine auf eine Sprache festgelegte `t` – das, was Komponenten und Hilfsfunktionen bekommen. */
export type Translate = (key: MessageKey, vars?: MessageVars) => string;

export function translator(locale: Locale): Translate {
  return (key, vars) => t(key, vars, locale);
}

/** Der Katalog einer Sprache – für den Vollständigkeitstest. */
export function catalogOf(locale: Locale): Messages {
  return catalogs[locale];
}
