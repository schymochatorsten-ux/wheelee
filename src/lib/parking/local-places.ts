import type { Place } from "../geocode";
import { distanceMeters, type LatLng } from "../geo";
import { getAllSpots, getCities } from "./spots";

/**
 * Orte und Straßen aus den **eigenen** Daten für die Zielsuche (ToDo 9.18 a).
 *
 * Nominatim braucht Netz, eine Tippause und mindestens drei Zeichen. Gemeinden
 * und Straßen, in denen es Behindertenparkplätze gibt, kennen wir selbst: Das
 * ist genau das, was die meisten suchen, und es lässt sich ohne fremden Dienst
 * sofort beantworten. Nominatim bleibt für alles Übrige (Hausnummern, Kliniken,
 * Bahnhöfe) zuständig.
 *
 * Der Index entsteht einmal je Prozess aus den Seed-Daten, wie `allSpots` in
 * `spots.ts`; er liegt nicht in der Seite (die 128 KB aus 5.4 bleiben), sondern
 * hinter `/api/places`.
 */

type Kind = "city" | "street";

interface Entry {
  /** Normalisierte Schreibweise, nur zum Vergleichen. */
  key: string;
  place: Place & { kind: Kind };
  /** Wie viele Standorte dahinterstehen – Gleichstand wird danach entschieden. */
  weight: number;
}

/**
 * Schreibweise vereinheitlichen: klein, ohne Akzente, ß als ss, „Straße“,
 * „Strasse“ und „Str.“ als dasselbe. Wer „Bahnhofstr“ tippt, meint „Bahnhofstraße“.
 */
export function normalizeForSearch(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .replace(/ß/gu, "ss")
    .replace(/strasse|str\./gu, "str")
    .replace(/\s+/gu, " ")
    .trim();
}

let index: Entry[] | null = null;

function build(): Entry[] {
  const entries: Entry[] = [];

  const names = new Map<string, string>();
  for (const city of getCities()) {
    names.set(city.slug, city.name);
    entries.push({
      key: normalizeForSearch(city.name),
      place: { label: city.name, detail: "", lat: city.center.lat, lng: city.center.lng, kind: "city" },
      weight: city.spotCount,
    });
  }

  const streets = new Map<string, { label: string; city: string; lats: number[]; lngs: number[] }>();
  for (const spot of getAllSpots()) {
    if (!spot.street || spot.lat === null || spot.lng === null) continue;
    const id = `${spot.city}|${spot.street}`;
    const entry = streets.get(id) ?? {
      label: spot.street,
      city: names.get(spot.city) ?? spot.city,
      lats: [],
      lngs: [],
    };
    entry.lats.push(spot.lat);
    entry.lngs.push(spot.lng);
    streets.set(id, entry);
  }

  for (const street of streets.values()) {
    const mean = (values: number[]) => values.reduce((sum, value) => sum + value, 0) / values.length;
    entries.push({
      key: normalizeForSearch(street.label),
      place: {
        label: street.label,
        detail: street.city,
        lat: mean(street.lats),
        lng: mean(street.lngs),
        kind: "street",
      },
      weight: street.lats.length,
    });
  }

  return entries;
}

/**
 * Treffer für einen Suchbegriff.
 *
 * Gezählt wird nur, was **am Wortanfang** passt („bahnhof“ findet „Bahnhofstraße“
 * und „Alter Bahnhof“, nicht „Hauptbahnhof“): Mitten im Wort zu suchen brächte
 * bei Straßennamen vor allem Rauschen. Vorn im Namen geht vor Wortanfang, und
 * innerhalb dessen entscheidet die Nähe zum Bezugspunkt, ohne Bezugspunkt die
 * Zahl der Standorte.
 */
export function searchLocalPlaces(query: string, origin: LatLng | null, limit = 5): Place[] {
  const needle = normalizeForSearch(query);
  if (needle.length < 2) return [];

  index ??= build();

  const found: { entry: Entry; rank: number; meters: number }[] = [];
  for (const entry of index) {
    let rank: number;
    if (entry.key.startsWith(needle)) rank = 0;
    else if (entry.key.includes(` ${needle}`) || entry.key.includes(`-${needle}`)) rank = 1;
    else continue;
    found.push({ entry, rank, meters: origin ? distanceMeters(origin, entry.place) : 0 });
  }

  found.sort(
    (a, b) =>
      a.rank - b.rank ||
      // Ein Ort vor einer gleich gut passenden Straße: Wer „Frankfurt“ tippt, meint
      // meist die Stadt, nicht die nächste „Frankfurter Straße“. Mit wachsendem
      // Bestand (2e.6) gibt es mehr Straßen dieser Art als Plätze in der Liste.
      Number(b.entry.place.kind === "city") - Number(a.entry.place.kind === "city") ||
      (origin ? a.meters - b.meters : 0) ||
      b.entry.weight - a.entry.weight ||
      a.entry.place.label.localeCompare(b.entry.place.label, "de"),
  );

  return found.slice(0, limit).map(({ entry }) => entry.place);
}
