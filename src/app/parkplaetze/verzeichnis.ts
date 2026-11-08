import type { CityInfo } from "@/lib/parking/spots";

/**
 * Gemeinsames für das Städteverzeichnis (ToDo 19.17) – Gruppierung,
 * Adressen und die Darstellung der Listen.
 *
 * Eine eigene Datei, weil Übersicht und Buchstabenseite dasselbe brauchen und
 * **dieselbe** Einteilung brauchen müssen: Zählt die Übersicht „A (128)“ und
 * die Seite zeigt 130, stimmt eine der beiden Zahlen nicht, und niemand merkt
 * es.
 */

/**
 * Die Verweise werden über die Liste gestaltet, nicht je Element.
 *
 * **Gemessen, nicht geschätzt:** Die Klassenliste eines Verweises ist rund 150
 * Zeichen. Bei 3.763 Städten sind das über 500 KB allein für Klassennamen –
 * und React liefert den Baum ein zweites Mal als Datenblock aus, also doppelt.
 * Am Elternknoten steht sie einmal.
 */
export const LINK_LIST =
  "grid grid-cols-2 gap-x-4 gap-y-1 text-sm sm:grid-cols-3 [&_a]:text-blue-800 [&_a:hover]:underline dark:[&_a]:text-blue-300";

/** Städte ohne Buchstaben am Anfang (Ziffern, Klammern) sammeln sich hier. */
const OTHER = "#";

/** Adresse der Buchstabenseite. Kleingeschrieben, damit es eine Adresse je Buchstabe gibt. */
export function letterPath(letter: string): string {
  return `/parkplaetze/buchstabe/${encodeURIComponent(letter.toLowerCase())}`;
}

/**
 * Städte nach Anfangsbuchstaben, innerhalb alphabetisch.
 *
 * `localeCompare` mit deutscher Sortierung, damit Ä bei A einsortiert wird und
 * nicht hinter Z – und damit Ö und Ü dort stehen, wo jemand sie sucht.
 */
export function cityGroups(cities: readonly CityInfo[]): {
  letters: string[];
  groups: Map<string, CityInfo[]>;
} {
  const groups = new Map<string, CityInfo[]>();

  for (const city of [...cities].sort((a, b) => a.name.localeCompare(b.name, "de"))) {
    const first = city.name[0]?.toUpperCase() ?? OTHER;
    // Umlaute zählen zu ihrem Grundbuchstaben: „Ändern“ wäre sonst eine
    // eigene Gruppe mit drei Einträgen.
    const normalized = first.normalize("NFD").replace(/\p{Diacritic}/gu, "");
    const key = /^\p{L}$/u.test(normalized) ? normalized : OTHER;
    const list = groups.get(key);
    if (list) list.push(city);
    else groups.set(key, [city]);
  }

  const letters = [...groups.keys()].sort((a, b) => a.localeCompare(b, "de"));
  return { letters, groups };
}
