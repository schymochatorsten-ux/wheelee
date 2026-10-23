/**
 * Hell/Dunkel-Umschaltung.
 *
 * Vorgabe ist **dunkel**, nicht die Systemeinstellung: Die App wird oft im
 * Auto und bei Dunkelheit benutzt, und eine hell aufblitzende Karte blendet.
 * Wer es anders will, stellt es einmal um.
 */

import type { MessageKey } from "@/i18n";

export type Theme = "dark" | "light" | "system";

export const THEMES: { id: Theme; label: MessageKey }[] = [
  { id: "dark", label: "theme.dark" },
  { id: "light", label: "theme.light" },
  { id: "system", label: "theme.system" },
];

export const STORAGE_KEY = "wheelee-theme";

/** Vorgabe, wenn nichts gespeichert ist. */
export const DEFAULT_THEME: Theme = "dark";

export function isTheme(value: unknown): value is Theme {
  return value === "dark" || value === "light" || value === "system";
}

/**
 * Das Skript, das vor dem ersten Rendern läuft.
 *
 * Es muss im `<head>` stehen und darf nichts importieren: Würde React die
 * Einstellung erst nach dem Laden anwenden, blitzte die Seite kurz in der
 * falschen Helligkeit auf – genau das, was bei einer Vorgabe „dunkel" am
 * meisten stört.
 *
 * `data-theme` am `<html>`-Element steuert danach das CSS.
 */
export const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem(${JSON.stringify(STORAGE_KEY)});
    var theme = stored === "light" || stored === "dark" || stored === "system"
      ? stored
      : ${JSON.stringify(DEFAULT_THEME)};
    var dark = theme === "dark" ||
      (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    document.documentElement.style.colorScheme = dark ? "dark" : "light";
  } catch (error) {
    // Privater Modus oder blockierter Speicher: dann eben die Vorgabe.
    document.documentElement.dataset.theme = ${JSON.stringify(DEFAULT_THEME)};
  }
})();
`;

/** Gespeicherte Auswahl lesen. */
export function readTheme(): Theme {
  if (typeof window === "undefined") return DEFAULT_THEME;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return isTheme(stored) ? stored : DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
}

/** Auswahl anwenden und merken. */
export function applyTheme(theme: Theme): void {
  if (typeof document === "undefined") return;

  const dark =
    theme === "dark" ||
    (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  document.documentElement.dataset.theme = dark ? "dark" : "light";
  document.documentElement.style.colorScheme = dark ? "dark" : "light";

  try {
    window.localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Ohne Speicher gilt die Auswahl nur für diese Sitzung – besser als nichts.
  }
}
