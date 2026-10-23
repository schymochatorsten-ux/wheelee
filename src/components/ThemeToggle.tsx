"use client";

import { useEffect, useState } from "react";
import { useT } from "@/i18n/context";
import { applyTheme, readTheme, THEMES, type Theme } from "@/lib/theme";

/**
 * Umschalter für Hell und Dunkel.
 *
 * Drei Stellungen statt zwei, damit „folge dem System" möglich bleibt – sonst
 * müsste man morgens und abends von Hand wechseln.
 */
export function ThemeToggle() {
  const t = useT();
  const [theme, setTheme] = useState<Theme | null>(null);

  // Erst nach dem Laden lesen: Auf dem Server gibt es keinen Speicher, und
  // ein abweichender erster Rendergang führte sonst zu einem Hydrationsfehler.
  useEffect(() => {
    setTheme(readTheme());
  }, []);

  // Bei „System" auf Änderungen der Systemeinstellung reagieren.
  useEffect(() => {
    if (theme !== "system") return;
    const query = window.matchMedia("(prefers-color-scheme: dark)");
    const update = () => applyTheme("system");
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, [theme]);

  const choose = (next: Theme) => {
    setTheme(next);
    applyTheme(next);
  };

  return (
    <div
      role="radiogroup"
      aria-label={t("theme.group")}
      className="flex shrink-0 overflow-hidden rounded-lg border border-neutral-300 text-sm dark:border-neutral-700"
    >
      {THEMES.map((option) => (
        <button
          key={option.id}
          type="button"
          role="radio"
          aria-checked={theme === option.id}
          onClick={() => choose(option.id)}
          className={`min-h-11 px-3 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none ${
            theme === option.id
              ? "bg-blue-700 text-white"
              : "bg-white text-neutral-700 dark:bg-neutral-900 dark:text-neutral-300"
          }`}
        >
          {t(option.label)}
        </button>
      ))}
    </div>
  );
}
