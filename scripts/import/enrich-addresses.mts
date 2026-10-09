/**
 * Ergänzt fehlende Straßennamen in den Seed-Dateien.
 *
 *     npm run import:addresses                  # alle Städte, größte zuerst
 *     npm run import:addresses -- nuernberg
 *     npm run import:addresses -- --max 500     # nur so viele Abfragen
 *
 * **Warum das nötig ist:** OpenStreetMap-Objekte tragen selten ein
 * `addr:street`. Ohne Nachbesserung heißen 61 % aller importierten Standorte
 * „Behindertenparkplatz <Stadt>" – in Nürnberg 473 von 487. Auf der Karte
 * fällt das kaum auf, in der Liste und in der Detailansicht ist es wertlos.
 *
 * **Laufzeit:** Nominatim erlaubt eine Anfrage pro Sekunde. Bei rund 8.200
 * offenen Standorten sind das etwa zweieinhalb Stunden. Der Lauf ist
 * jederzeit abbrechbar: Der Zwischenstand liegt in `data/_address-cache.json`
 * und wird beim nächsten Start weiterverwendet.
 */
import fs from "node:fs/promises";
import path from "node:path";
import type { ParkingSpot } from "../../src/lib/types.js";
import { projectRoot } from "./config.mjs";

const USER_AGENT = "wheelee-import/0.1 (Behindertenparkplatz-Karte; Kontakt via Repository)";
const NOMINATIM_INTERVAL_MS = 1100;

interface SeedFile {
  city: { slug: string; name: string; center: { lat: number; lng: number } };
  source: string;
  generatedAt: string;
  spots: ParkingSpot[];
}

interface Address {
  street: string | null;
  houseNumber: string | null;
  /** Ortsteil oder Flurname, wenn es gar keine Straße gibt. */
  place: string | null;
}

type AddressCache = Record<string, Address>;

const cachePath = path.join(projectRoot, "data", "_address-cache.json");
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function readJson<T>(file: string, fallback: T): Promise<T> {
  try {
    return JSON.parse(await fs.readFile(file, "utf8")) as T;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return fallback;
    throw error;
  }
}

/** Schlüssel mit fünf Nachkommastellen – rund ein Meter genau. */
const cacheKey = (lat: number, lng: number) => `${lat.toFixed(5)},${lng.toFixed(5)}`;

async function reverseGeocode(lat: number, lng: number) {
  const url = new URL("https://nominatim.openstreetmap.org/reverse");
  url.searchParams.set("lat", String(lat));
  url.searchParams.set("lon", String(lng));
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("zoom", "18");
  url.searchParams.set("accept-language", "de");

  const response = await fetch(url, { headers: { "User-Agent": USER_AGENT } });
  if (!response.ok) throw new Error(`Nominatim: HTTP ${response.status}`);

  const json = (await response.json()) as { address?: Record<string, string> };
  const address = json.address ?? {};

  return {
    street: address.road ?? address.pedestrian ?? address.footway ?? address.path ?? null,
    houseNumber: address.house_number ?? null,
    // Wo keine Straße in der Nähe ist – Parkplätze im Grünen, am Waldrand,
    // an Seen –, ist der Ortsteil immer noch besser als gar nichts.
    place:
      address.neighbourhood ??
      address.suburb ??
      address.hamlet ??
      address.village ??
      address.quarter ??
      null,
  };
}

/**
 * Hat dieser Standort einen brauchbaren Namen?
 *
 * Nicht nur „keine Straße": Standorte, die beim letzten Lauf statt einer
 * Straße einen Ortsteil bekommen haben, sollen nicht bei jedem Durchgang
 * erneut abgefragt werden.
 */
const needsAddress = (spot: ParkingSpot) =>
  !spot.street &&
  spot.lat !== null &&
  spot.lng !== null &&
  /^Behindertenparkplatz\b/u.test(spot.label);

async function main() {
  const args = process.argv.slice(2);
  const maxIndex = args.indexOf("--max");
  const budget =
    maxIndex >= 0 ? Number.parseInt(args[maxIndex + 1] ?? "", 10) : Number.POSITIVE_INFINITY;
  const wanted = args.filter(
    (argument) => !argument.startsWith("--") && argument !== String(budget),
  );

  const dataDir = path.join(projectRoot, "data");
  const skip =
    /^_|\.(overrides|parsed|report|line-fixups)\.|^geocode-cache|^osm-address|^frankfurt-pdf-liste/u;

  const files = (await fs.readdir(dataDir)).filter(
    (file) => file.endsWith(".json") && !skip.test(file),
  );

  // Städte mit den meisten offenen Standorten zuerst – dort bringt jede
  // Minute Laufzeit am meisten.
  const todo: { file: string; seed: SeedFile; open: number }[] = [];

  for (const file of files) {
    const seed = await readJson<SeedFile | null>(path.join(dataDir, file), null);
    if (!seed?.city?.slug || !Array.isArray(seed.spots)) continue;
    if (wanted.length > 0 && !wanted.includes(seed.city.slug)) continue;

    const open = seed.spots.filter(needsAddress).length;
    if (open > 0) todo.push({ file, seed, open });
  }

  todo.sort((a, b) => b.open - a.open);

  const totalOpen = todo.reduce((sum, entry) => sum + entry.open, 0);
  console.log(`${todo.length} Städte mit zusammen ${totalOpen} Standorten ohne Straßennamen.`);
  if (Number.isFinite(budget)) console.log(`Begrenzt auf ${budget} Abfragen.`);
  console.log(
    `Geschätzte Dauer: ${Math.ceil((Math.min(totalOpen, budget) * NOMINATIM_INTERVAL_MS) / 60_000)} Minuten.\n`,
  );

  const cache = await readJson<AddressCache>(cachePath, {});
  let requests = 0;
  let resolved = 0;

  const saveCache = () => fs.writeFile(cachePath, `${JSON.stringify(cache, null, 2)}\n`, "utf8");

  for (const entry of todo) {
    if (requests >= budget) break;

    const { seed, file } = entry;
    let changed = 0;

    for (const spot of seed.spots) {
      if (!needsAddress(spot)) continue;
      if (requests >= budget) break;

      const key = cacheKey(spot.lat!, spot.lng!);
      let address = cache[key];

      if (!address) {
        await sleep(NOMINATIM_INTERVAL_MS);
        try {
          address = await reverseGeocode(spot.lat!, spot.lng!);
          cache[key] = address;
          requests += 1;
          if (requests % 50 === 0) {
            await saveCache();
            console.log(`  ${requests} Abfragen, ${resolved} Adressen gefunden`);
          }
        } catch (error) {
          console.log(`  Fehler: ${(error as Error).message}`);
          // Nicht als "keine Adresse" merken – beim nächsten Lauf erneut versuchen.
          continue;
        }
      }

      if (address.street) {
        spot.street = address.street;
        spot.houseNumber = address.houseNumber;
        spot.label = [address.street, address.houseNumber].filter(Boolean).join(" ");
        changed += 1;
        resolved += 1;
      } else if (address.place) {
        // Keine Straße, aber ein Ortsteil: Der steht nicht als Adresse da,
        // sondern als Lagebeschreibung – deshalb bleibt `street` leer.
        spot.label = `Parkplatz ${address.place}`;
        changed += 1;
        resolved += 1;
      }
    }

    if (changed > 0) {
      // Sortierung nachziehen, weil sich die Bezeichnungen geändert haben.
      seed.spots.sort((a, b) => a.label.localeCompare(b.label, "de-DE"));
      await fs.writeFile(path.join(dataDir, file), `${JSON.stringify(seed, null, 2)}\n`, "utf8");
      console.log(`${seed.city.name}: ${changed} Adressen ergänzt`);
    }

    await saveCache();
  }

  await saveCache();
  console.log(`\nFertig. ${requests} Abfragen, ${resolved} Adressen ergänzt.`);
  if (requests >= budget) {
    console.log("Budget aufgebraucht – erneut starten, um weiterzumachen.");
  }
}

await main();
