/**
 * Straßenabgleich per Rückwärtssuche (ToDo 3.3).
 *
 *     npm run check:street-names -- dresden            # 60 Standorte, gleichmäßig gewählt
 *     npm run check:street-names -- dresden --n 200
 *     npm run check:street-names -- dresden --alle     # alle (eine Anfrage je Sekunde!)
 *
 * **Die Frage:** Nennt die Rückwärtssuche bei der Koordinate dieselbe Straße
 * wie die Quelle? Wo nicht, stimmt entweder die Koordinate nicht (Geocoder hat
 * die Hausnummer in den Nachbarblock gelegt) oder der Name (Tippfehler,
 * Umbenennung). Beides soll ein Mensch ansehen – deshalb eine Liste, keine
 * Korrektur.
 *
 * **Gerechnet wird auf einer Stichprobe,** nicht auf allem: Nominatim erlaubt
 * eine Anfrage je Sekunde, bei 18.000 Standorten wären das fünf Stunden. Die
 * Auswahl ist gleichmäßig über die sortierte Liste (nicht zufällig), damit zwei
 * Läufe dasselbe prüfen und die Ergebnisse vergleichbar sind. Antworten landen
 * im gemeinsamen Zwischenspeicher `data/_address-cache.json` (derselbe wie bei
 * `import:addresses`, gleicher Schlüssel) – ein erneuter Lauf fragt nur Neues.
 *
 * **Ein Befund ist kein Beweis.** Eine Straße, die in OpenStreetMap anders
 * heißt als im Amtsverzeichnis („Hauptstr." gegen „Hauptstraße"), zählt nicht
 * als Abweichung (`sameStreet`); eine Koordinate in einer Kreuzung kann zu Recht
 * die Querstraße liefern.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { projectRoot } from "./config.mjs";

const USER_AGENT = "wheelee-import/0.1 (Behindertenparkplatz-Karte; Kontakt via Repository)";
const NOMINATIM_INTERVAL_MS = 1100;

/**
 * Zwei Straßennamen vergleichbar machen: Groß-/Kleinschreibung, ß, Umlaute,
 * „Str."/„Strasse"/„Straße", Bindestriche und Leerzeichen sind keine
 * Unterschiede.
 */
export function normalizeStreet(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/ß/gu, "ss")
    // „St.-Bonifatius-Straße“ und „Sankt-Bonifatius-Straße“ sind dieselbe Straße.
    .replace(/\bst\.[\s-]*/gu, "sankt")
    .replace(/\bstr\b\.?/gu, "strasse")
    .replace(/str\./gu, "strasse")
    .replace(/(?<=\p{L})strasse\b/gu, "strasse")
    .replace(/[\s\-–.,'’]/gu, "");
}

/** Dieselbe Straße? „Hauptstr.“ und „Hauptstraße“ ja, „Hauptstraße“ und „Nebenstraße“ nein. */
export function sameStreet(a: string, b: string): boolean {
  const x = normalizeStreet(a);
  const y = normalizeStreet(b);
  return x.length > 0 && x === y;
}

/** Gleichmäßig gewählte Stichprobe (nicht zufällig – zwei Läufe prüfen dasselbe). */
export function evenSample<T>(items: readonly T[], n: number): T[] {
  if (n >= items.length) return [...items];
  const out: T[] = [];
  const step = items.length / n;
  for (let i = 0; i < n; i += 1) out.push(items[Math.floor(i * step)]);
  return out;
}

interface Address {
  street: string | null;
  houseNumber: string | null;
  place: string | null;
}

const cachePath = path.join(projectRoot, "data", "_address-cache.json");
const cacheKey = (lat: number, lng: number) => `${lat.toFixed(5)},${lng.toFixed(5)}`;
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function reverse(lat: number, lng: number): Promise<Address> {
  const url = new URL("https://nominatim.openstreetmap.org/reverse");
  url.searchParams.set("lat", String(lat));
  url.searchParams.set("lon", String(lng));
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("zoom", "18");
  url.searchParams.set("accept-language", "de");
  const response = await fetch(url, { headers: { "User-Agent": USER_AGENT } });
  if (!response.ok) throw new Error(`Nominatim: HTTP ${response.status}`);
  const json = (await response.json()) as { address?: Record<string, string> };
  const a = json.address ?? {};
  return {
    street: a.road ?? a.pedestrian ?? a.footway ?? a.path ?? null,
    houseNumber: a.house_number ?? null,
    place: a.neighbourhood ?? a.suburb ?? a.hamlet ?? a.village ?? a.quarter ?? null,
  };
}

interface Seed {
  city: { name: string };
  spots: { id: string; label: string; street: string | null; lat: number | null; lng: number | null }[];
}

async function main() {
  const args = process.argv.slice(2);
  const nIndex = args.indexOf("--n");
  const all = args.includes("--alle");
  const n = nIndex >= 0 ? Number(args[nIndex + 1]) || 60 : 60;
  const slugs = args.filter((a, i) => !a.startsWith("--") && !(nIndex >= 0 && i === nIndex + 1));
  if (slugs.length === 0) {
    console.log("Welche Stadt? npm run check:street-names -- dresden");
    return;
  }

  let cache: Record<string, Address> = {};
  try {
    cache = JSON.parse(await fs.readFile(cachePath, "utf8")) as Record<string, Address>;
  } catch {
    // Kein Zwischenspeicher – der erste Lauf legt ihn an.
  }

  for (const slug of slugs) {
    const raw = await fs.readFile(path.join(projectRoot, "data", `${slug}.json`), "utf8");
    const seed = JSON.parse(raw.replace(/^﻿/u, "")) as Seed;
    const candidates = seed.spots
      .filter((s) => s.street && s.lat !== null && s.lng !== null)
      .sort((a, b) => a.id.localeCompare(b.id));
    const chosen = all ? candidates : evenSample(candidates, n);

    console.log(`\n=== ${seed.city.name}: ${chosen.length} von ${candidates.length} Standorten mit Straße`);
    let same = 0;
    let noStreet = 0;
    const different: string[] = [];

    for (const spot of chosen) {
      const key = cacheKey(spot.lat!, spot.lng!);
      let address = cache[key];
      if (!address) {
        await sleep(NOMINATIM_INTERVAL_MS);
        try {
          address = await reverse(spot.lat!, spot.lng!);
          cache[key] = address;
        } catch (error) {
          console.log(`  ⚠ ${spot.id}: ${(error as Error).message}`);
          continue;
        }
      }
      if (!address.street) noStreet += 1;
      else if (sameStreet(spot.street!, address.street)) same += 1;
      else different.push(`  ${spot.id}  Quelle: „${spot.street}“ · Rückwärtssuche: „${address.street}“ (${spot.lat!.toFixed(5)}, ${spot.lng!.toFixed(5)})`);
    }
    await fs.writeFile(cachePath, `${JSON.stringify(cache, null, 2)}\n`, "utf8");

    console.log(
      `gleiche Straße: ${same} · andere Straße: ${different.length} · keine Straße bei der Koordinate: ${noStreet}`,
    );
    for (const line of different) console.log(line);
  }
}

if (process.argv[1]?.replace(/\\/gu, "/").endsWith("street-match.mts")) {
  await main();
}
