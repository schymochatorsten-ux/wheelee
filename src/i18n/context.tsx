"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { DEFAULT_LOCALE, translator, type Locale, type Translate } from "./index";

/**
 * Die Sprache der Oberfläche für alle Komponenten (ToDo 15.5).
 *
 * Ein Kontext und kein Modulwert, weil der Server mehrere Besucher gleichzeitig
 * rendert (siehe `index.ts`). Gesetzt wird er in `layout.tsx` aus Cookie und
 * Browsersprache; ein Wechsel lädt die Seite nicht neu, sondern holt das
 * Layout mit `router.refresh()` erneut – dadurch ändern sich Beschriftungen und
 * `<html lang>` gemeinsam.
 */
const LocaleContext = createContext<Locale>(DEFAULT_LOCALE);

export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

export function useLocale(): Locale {
  return useContext(LocaleContext);
}

/** Die Übersetzungsfunktion der aktuellen Sprache – `const t = useT();`. */
export function useT(): Translate {
  const locale = useLocale();
  return useMemo(() => translator(locale), [locale]);
}
