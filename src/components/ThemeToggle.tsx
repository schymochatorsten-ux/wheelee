"use client";

import { useEffect, useState } from "react";
import { useT } from "@/i18n/context";
import { applyTheme, readTheme, THEMES, type Theme } from "@/lib/theme";
import { Segmented } from "./ui/List";

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

  /*
   * Ein Segmentschalter wie in den Systemapps von Apple (ToDo 9.31) statt
   * dreier Knöpfe mit Rahmen: Drei gleichrangige Stellungen gehören in eine
   * Fläche, und welche gilt, zeigt die hervorgehobene Stellung – ohne dass
   * dafür eine Farbe des Hauses verbraucht wird.
   */
  return (
    <Segmented
      value={theme}
      label={t("theme.group")}
      onChange={choose}
      options={THEMES.map((option) => ({ value: option.id, label: t(option.label) }))}
    />
  );
}
