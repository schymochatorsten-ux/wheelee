"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "@/i18n/context";
import type { Locale } from "@/i18n";
import { writeLanguagePreference } from "@/i18n/preference";

/**
 * Setzt den Vorrang des Kontos durch (ToDo 15.5): Steht am Konto eine Sprache,
 * die von der gerade angezeigten abweicht – etwa nach der Anmeldung auf einem
 * zweiten Gerät –, wird das Cookie darauf gestellt und die Seite neu geholt.
 *
 * Je Kontowert **höchstens einmal**: Ließe der Browser keine Cookies zu, bliebe
 * der Unterschied bestehen und die Seite lüde endlos neu.
 */
export function LanguageSync({ accountLanguage }: { accountLanguage: Locale | null }) {
  const locale = useLocale();
  const router = useRouter();
  const tried = useRef<Locale | null>(null);

  useEffect(() => {
    if (!accountLanguage || accountLanguage === locale || tried.current === accountLanguage) return;
    tried.current = accountLanguage;
    writeLanguagePreference(accountLanguage);
    router.refresh();
  }, [accountLanguage, locale, router]);

  return null;
}
