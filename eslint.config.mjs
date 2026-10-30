import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier";

/*
 * Flache Konfiguration direkt aus `eslint-config-next` (ab Next 16, ToDo 1.8).
 * Bis Next 15 lief sie über `FlatCompat` aus `@eslint/eslintrc`; die
 * Konfigurationen von Next 16 sind selbst flach, und der Umweg bricht an einem
 * Zirkelverweis im React-Plugin.
 */
export default defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  {
    rules: {
      /*
       * Zwei neue Regeln aus dem React-Compiler-Satz von Next 16 melden 20 Stellen
       * (ToDo 1.8). Es sind **Hinweise auf Optimierung, keine Fehler**, und die
       * Muster sind hier Absicht: Browserzustand (Theme, Teilen, Sprache,
       * Fragment im Link) wird erst nach dem Hydrieren gelesen, damit Server- und
       * Browser-HTML übereinstimmen, und Listen laden beim Einblenden. Sie
       * umzubauen hieße ~20 Komponenten ohne Nutzen für die Nutzer:innen anzufassen.
       * Ausgeschaltet statt per Kommentar an jeder Stelle: Eine neue Stelle soll
       * nicht erst an einer Lint-Meldung auffallen, die nichts bedeutet.
       */
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/preserve-manual-memoization": "off",
      // Bewusst verworfene Felder beim Destrukturieren mit _ kennzeichnen.
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
  globalIgnores(["node_modules/**", ".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);
