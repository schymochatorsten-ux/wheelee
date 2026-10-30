/**
 * Straße aus der Koordinate nachtragen, wo das Straßenfeld der Quelle keine
 * Straße ist (ToDo 3.12).
 *
 *     npm run fix:street-descriptions -- duesseldorf            # nur ansehen
 *     npm run fix:street-descriptions -- duesseldorf --schreiben
 *
 * **Anlass:** Der Straßenabgleich (3.3) fand in Düsseldorf bei 29 von 30
 * Standorten „Straßen“ wie „Sanitätshaus“, „Krankenhaus“, „Altstadt“,
 * „Arztpraxis“ – die Quelle beschreibt dort das **Ziel**, nicht die Straße. Das
 * sieht in der Liste richtig aus und ist es nicht: Jemand sucht eine Straße und
 * findet „Friedhof“.
 *
 * **Was es tut:** Für jeden Standort, dessen Straße die Rückwärtssuche nicht
 * bestätigt (`sameStreet`), wird die Straße der Koordinate eingetragen und der
 * ursprüngliche Text der Quelle als **Hinweis** behalten („Sanitätshaus“ ist eine
 * gute Auskunft, nur eben keine Adresse). Standorte, deren Straße bestätigt wird,
 * bleiben unverändert.
 *
 * **Geschrieben wird an zwei Stellen:** in die Seed-Datei und in
 * `data/<stadt>.overrides.json` – Korrekturen gehören dorthin, sonst überschreibt
 * sie der nächste Import (Datenpflege.md, Schritt 8). Ohne `--schreiben` zeigt
 * der Lauf nur, was geschähe.
 *
 * Eine Anfrage je Sekunde bei Nominatim; Antworten im gemeinsamen
 * Zwischenspeicher `data/_address-cache.json`.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { projectRoot } from "./config.mjs";
import { sameStreet } from "./street-match.mjs";

const USER_AGENT = "wheelee-import/0.1 (Behindertenparkplatz-Karte; Kontakt via Repository)";
const INTERVAL_MS = 1100;

interface Address {
  street: string | null;
  houseNumber: string | null;
  place: string | null;
}

interface Spot {
  id: string;
  label: string;
  street: string | null;
  houseNumber: string | null;
  note: string | null;
  lat: number | null;
  lng: number | null;
  [key: string]: unknown;
}

/** Sieht ein Text nach einem Straßennamen aus? Grob; dient nur dazu, nichts Richtiges zu überschreiben. */
export function looksLikeStreet(text: string): boolean {
  return /(stra(ß|ss)e|str\.|weg\b|platz|allee|ring\b|ufer\b|damm\b|gasse|markt\b|pfad|steig|chaussee|brücke|^(am|an der|auf dem|auf der|im|in der|zum|zur|unter|vor dem) )/iu.test(
    text.trim(),
  );
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const key = (lat: number, lng: number) => `${lat.toFixed(5)},${lng.toFixed(5)}`;
const readJson = async <T,>(file: string, fallback: T): Promise<T> => {
  try {
    return JSON.parse((await fs.readFile(file, "utf8")).replace(/^﻿/u, "")) as T;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return fallback;
    throw error;
  }
};

async function reverse(lat: number, lng: number): Promise<Address> {
  const url = new URL("https://nominatim.openstreetmap.org/reverse");
  url.searchParams.set("lat", String(lat));
  url.searchParams.set("lon", String(lng));
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("zoom", "18");
  url.searchParams.set("accept-language", "de");
  const response = await fetch(url, { headers: { "User-Agent": USER_AGENT } });
  if (!response.ok) throw new Error(`Nominatim: HTTP ${response.status}`);
  const a = ((await response.json()) as { address?: Record<string, string> }).address ?? {};
  return {
    street: a.road ?? a.pedestrian ?? a.footway ?? a.path ?? null,
    houseNumber: a.house_number ?? null,
    place: a.neighbourhood ?? a.suburb ?? a.hamlet ?? a.village ?? a.quarter ?? null,
  };
}

async function main() {
  const args = process.argv.slice(2);
  const write = args.includes("--schreiben");
  const slug = args.find((a) => !a.startsWith("--"));
  if (!slug) {
    console.log("Welche Stadt? npm run fix:street-descriptions -- duesseldorf [--schreiben]");
    return;
  }

  const seedPath = path.join(projectRoot, "data", `${slug}.json`);
  const overridesPath = path.join(projectRoot, "data", `${slug}.overrides.json`);
  const cachePath = path.join(projectRoot, "data", "_address-cache.json");

  const seed = await readJson<{ spots: Spot[] } & Record<string, unknown>>(seedPath, { spots: [] });
  const overrides = await readJson<{ spots?: Record<string, Partial<Spot>> } & Record<string, unknown>>(
    overridesPath,
    {},
  );
  const cache = await readJson<Record<string, Address>>(cachePath, {});

  const changes: Record<string, Partial<Spot>> = {};
  let confirmed = 0;
  let unanswered = 0;
  let doubtful = 0;

  for (const spot of seed.spots) {
    if (spot.lat === null || spot.lng === null || !spot.street) continue;
    const k = key(spot.lat, spot.lng);
    let address = cache[k];
    if (!address) {
      await sleep(INTERVAL_MS);
      try {
        address = await reverse(spot.lat, spot.lng);
        cache[k] = address;
      } catch {
        unanswered += 1;
        continue;
      }
    }
    if (!address.street) {
      unanswered += 1;
      continue;
    }
    if (sameStreet(spot.street, address.street)) {
      confirmed += 1;
      continue;
    }
    // Sieht der Text der Quelle wie eine Straße aus („Am Gatherhof“), ist die
    // nächste Straße der Koordinate nicht automatisch richtiger: Dort kann die
    // Hausnummer an einer Querstraße liegen. Solche Fälle bleiben stehen und
    // werden gezählt.
    if (looksLikeStreet(spot.street)) {
      doubtful += 1;
      continue;
    }
    // Der Text der Quelle bleibt als Hinweis stehen, wenn er nicht schon dort steht.
    const original = spot.label;
    changes[spot.id] = {
      label: address.street,
      street: address.street,
      houseNumber: null,
      note: [original !== address.street ? original : null, spot.note].filter(Boolean).join(" · ") || null,
    };
  }

  await fs.writeFile(cachePath, `${JSON.stringify(cache, null, 2)}\n`, "utf8");

  const count = Object.keys(changes).length;
  console.log(
    `${seed.spots.length} Standorte: Straße bestätigt ${confirmed} · würde geändert ${count} · ` +
      `sieht nach Straße aus, bleibt ${doubtful} · ohne Antwort ${unanswered}`,
  );
  for (const [id, change] of Object.entries(changes).slice(0, 8)) {
    const old = seed.spots.find((s) => s.id === id);
    console.log(`  ${id}  „${old?.label}“ → „${change.label}“`);
  }

  if (!write) {
    console.log("(nur angesehen – mit --schreiben festhalten)");
    return;
  }

  overrides.spots = { ...(overrides.spots ?? {}), ...changes };
  await fs.writeFile(overridesPath, `${JSON.stringify(overrides, null, 2)}\n`, "utf8");
  seed.spots = seed.spots.map((spot) => (changes[spot.id] ? { ...spot, ...changes[spot.id] } : spot));
  await fs.writeFile(seedPath, `${JSON.stringify(seed, null, 2)}\n`, "utf8");
  console.log(`Geschrieben: ${path.basename(overridesPath)} und ${path.basename(seedPath)}`);
}

if (process.argv[1]?.replace(/\\/gu, "/").endsWith("street-from-coordinates.mts")) {
  await main();
}
