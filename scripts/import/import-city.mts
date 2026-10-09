/**
 * Importiert eine Großstadt vollständig und schreibt den Stand sofort fort.
 *
 *     npm run import:city -- berlin       # eine bestimmte Stadt
 *     npm run import:city -- --next       # die nächste offene
 *     npm run import:city -- --rest       # alle offenen, größte zuerst
 *     npm run import:city -- --rest --max 5
 *
 * Reihenfolge der Quellen, wie in der Quellenstrategie festgelegt:
 * amtlicher Geodienst, dann amtliche GeoJSON-Datei, dann OpenStreetMap.
 *
 * Eine Stadt wird immer erst abgeschlossen – Seed-Datei geschrieben und
 * Status vermerkt – bevor die nächste beginnt.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";
import type { ParkingSpot } from "../../src/lib/types.js";
import { splitAddress } from "../../src/lib/parking/address.js";
import { projectRoot } from "./config.mjs";
import { findCity, type GermanCity } from "./german-cities.mjs";
import { loadStatus, recordCity } from "./status.mjs";
import {
  coordinatesOf,
  fetchArcGis,
  fetchGeoJson,
  fetchWfsFeatures,
  findWfsLayer,
  mapFields,
  type GeoFeature,
} from "./geo-source.mjs";
import { importFromOsm } from "./osm-source.mjs";

interface SourceEntry {
  title: string;
  govdata: string;
  license: string;
  resources: { format: string; url: string }[];
}

interface QuellenStatus {
  slug: string;
  official: SourceEntry[];
  plan: "official" | "osm";
}

async function readJson<T>(file: string, fallback: T): Promise<T> {
  try {
    return JSON.parse(await fs.readFile(file, "utf8")) as T;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return fallback;
    throw error;
  }
}

const asText = (value: unknown): string | null => {
  if (value === null || value === undefined) return null;
  const text = String(value).trim();
  return text.length > 0 && text.toLowerCase() !== "null" ? text : null;
};

/** „durchgehend" ist keine Beschränkung und gehört nicht in die Anzeige. */
const NO_RESTRICTION = /^(durchgehend|ganztägig|ganztaegig|rund um die uhr|24\/7|immer|ja)$/iu;

/**
 * Stadtteil nur übernehmen, wenn er ein Name ist.
 * Köln liefert in „Stadtbezirk__Nr__" die Nummer 3 – als Stadtteil angezeigt
 * wäre das für Suchende wertlos. Dann lieber der Stadtname.
 */
function readDistrict(value: unknown): string | null {
  const text = asText(value);
  if (text === null || /^\d+$/u.test(text)) return null;
  return text;
}

/**
 * Anzahl der Stellplätze – bewusst streng.
 *
 * Die frühere Fassung entfernte alle Nicht-Ziffern. Aus einem Datum wie
 * „1.1.2012" wurde dadurch die Zahl 112012, und Freiburg kam auf 11.485
 * Stellplätze an 330 Standorten – das 60-Fache des Üblichen. Wird hier ein
 * falsches Feld erwischt, ist eine 1 die harmlosere Annahme als eine
 * Fantasiezahl.
 *
 * Mehr als 50 ausgewiesene Behindertenstellplätze an einem Standort gibt es
 * in der Praxis nicht; ein solcher Wert bedeutet die falsche Spalte.
 */
function readCount(value: unknown): number {
  const text = String(value ?? "").trim();
  const match = /^(\d{1,3})$/u.exec(text);
  if (!match) return 1;

  const parsed = Number.parseInt(match[1], 10);
  return parsed >= 1 && parsed <= 50 ? parsed : 1;
}

function spotId(slug: string, feature: GeoFeature, index: number): string {
  const identity = feature.id ?? `${slug}-${index}`;
  return `${slug}-${createHash("sha256").update(String(identity), "utf8").digest("hex").slice(0, 10)}`;
}

/** Features in Parkplätze übersetzen. */
function toSpots(
  city: GermanCity,
  features: GeoFeature[],
  sourceLabel: string,
): { spots: ParkingSpot[]; skipped: number; fields: Record<string, string | undefined> } {
  const sample = features.find((feature) => feature.properties) ?? features[0];
  const fields = mapFields(sample?.properties ?? {});

  const spots: ParkingSpot[] = [];
  let skipped = 0;

  for (const [index, feature] of features.entries()) {
    const coordinates = coordinatesOf(feature);
    if (!coordinates) {
      skipped += 1;
      continue;
    }

    const properties = feature.properties ?? {};
    const explicitStreet = fields.street ? asText(properties[fields.street]) : null;
    const explicitNumber = fields.houseNumber ? asText(properties[fields.houseNumber]) : null;

    const rawLabel =
      (fields.label ? asText(properties[fields.label]) : null) ??
      [explicitStreet, explicitNumber].filter(Boolean).join(" ");

    const label = rawLabel && rawLabel.length > 0 ? rawLabel : `Behindertenparkplatz ${city.name}`;
    const parsed = splitAddress(label);

    const time = fields.timeRestriction ? asText(properties[fields.timeRestriction]) : null;

    spots.push({
      id: spotId(city.slug, feature, index),
      city: city.slug,
      label,
      street: explicitStreet ?? parsed.street,
      houseNumber: explicitNumber ?? parsed.houseNumber,
      note: parsed.note,
      timeRestriction: time && !NO_RESTRICTION.test(time) ? time : (parsed.timeRestriction ?? null),
      district: readDistrict(fields.district ? properties[fields.district] : null) ?? city.name,
      spotCount: fields.spotCount ? readCount(properties[fields.spotCount]) : 1,
      lat: coordinates.lat,
      lng: coordinates.lng,
      // Amtliche Geometrie – genauer wird es nicht.
      geoAccuracy: "house",
      source: sourceLabel,
    });
  }

  return { spots, skipped, fields };
}

async function writeSeed(city: GermanCity, spots: ParkingSpot[], source: string) {
  const file = path.join(projectRoot, "data", `${city.slug}.json`);
  const overrides = await readJson<{ spots?: Record<string, Partial<ParkingSpot>> }>(
    path.join(projectRoot, "data", `${city.slug}.overrides.json`),
    {},
  );

  const merged = spots
    .map((spot) => ({ ...spot, ...(overrides.spots?.[spot.id] ?? {}) }))
    .sort((a, b) => a.label.localeCompare(b.label, "de-DE"));

  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(
    file,
    `${JSON.stringify(
      {
        city: {
          slug: city.slug,
          name: city.name,
          center: centerOf(merged),
        },
        source,
        generatedAt: new Date().toISOString().slice(0, 10),
        spots: merged,
      },
      null,
      2,
    )}\n`,
    "utf8",
  );

  return merged;
}

/** Kartenmittelpunkt aus den Daten selbst – keine gepflegte Koordinatenliste nötig. */
function centerOf(spots: ParkingSpot[]): { lat: number; lng: number } {
  const located = spots.filter((spot) => spot.lat !== null && spot.lng !== null);
  if (located.length === 0) return { lat: 51.1, lng: 10.4 };

  const lats = located.map((spot) => spot.lat!).sort((a, b) => a - b);
  const lngs = located.map((spot) => spot.lng!).sort((a, b) => a - b);
  const middle = Math.floor(located.length / 2);
  // Median statt Mittelwert: unempfindlich gegen einzelne Ausreißer.
  return { lat: lats[middle], lng: lngs[middle] };
}

type AddressCache = Record<string, { street: string | null; houseNumber: string | null }>;

const addressCachePath = path.join(projectRoot, "data", "_address-cache.json");

/**
 * Adressen für Parkplätze nachschlagen, deren Quelle keine liefert.
 *
 * Dresdens Datensatz etwa ist eine Barrierefreiheits-Erhebung – er kennt
 * Breite, Neigung und Belag jedes Stellplatzes, aber keinen Straßennamen.
 * Ohne Adresse wäre jeder Eintrag in der Detailansicht namenlos.
 *
 * Nominatim erlaubt eine Anfrage pro Sekunde; die Ergebnisse werden
 * versioniert zwischengespeichert, damit ein erneuter Lauf nichts wiederholt.
 */
async function addAddresses(spots: ParkingSpot[], cityName: string): Promise<void> {
  const cache = await readJson<AddressCache>(addressCachePath, {});
  let fetched = 0;

  for (const [index, spot] of spots.entries()) {
    if (spot.lat === null || spot.lng === null) continue;

    const key = `${spot.lat.toFixed(5)},${spot.lng.toFixed(5)}`;
    let address = cache[key];

    if (!address) {
      await new Promise((resolve) => setTimeout(resolve, 1100));

      const url = new URL("https://nominatim.openstreetmap.org/reverse");
      url.searchParams.set("lat", String(spot.lat));
      url.searchParams.set("lon", String(spot.lng));
      url.searchParams.set("format", "jsonv2");
      url.searchParams.set("zoom", "18");
      url.searchParams.set("accept-language", "de");

      try {
        const response = await fetch(url, {
          headers: { "User-Agent": "wheelee-import/0.1 (Behindertenparkplatz-Karte)" },
        });
        const json = (await response.json()) as { address?: Record<string, string> };
        address = {
          street: json.address?.road ?? json.address?.pedestrian ?? null,
          houseNumber: json.address?.house_number ?? null,
        };
        cache[key] = address;
        fetched += 1;

        // Zwischenstand sichern – ein Abbruch soll die Arbeit nicht verwerfen.
        if (fetched % 25 === 0) {
          await fs.writeFile(addressCachePath, `${JSON.stringify(cache, null, 2)}\n`, "utf8");
          console.log(`    Adressen: ${index + 1}/${spots.length}`);
        }
      } catch {
        address = { street: null, houseNumber: null };
      }
    }

    if (address.street) {
      spot.street = address.street;
      spot.houseNumber = address.houseNumber;
      spot.label = [address.street, address.houseNumber].filter(Boolean).join(" ");
    } else {
      spot.label = `Behindertenparkplatz ${cityName}`;
    }
  }

  await fs.writeFile(addressCachePath, `${JSON.stringify(cache, null, 2)}\n`, "utf8");
}

/**
 * Liegen die importierten Punkte überhaupt in der richtigen Stadt?
 *
 * Diese Prüfung ist keine Formsache. Dresdens Dienst liefert UTM-Zone 33;
 * als Zone 32 gedeutet ergaben sich Koordinaten bei 7,7° Ost – mitten in
 * Deutschland, aber 450 km vom Ziel entfernt, und jede einzelne davon sah für
 * sich genommen plausibel aus. Nur der Abgleich mit der Stadt fällt darauf
 * nicht herein.
 */
async function assertNearCity(city: GermanCity, spots: ParkingSpot[]): Promise<void> {
  const located = spots.filter((spot) => spot.lat !== null && spot.lng !== null);
  if (located.length === 0) return;

  const reference = await cityCenter(city);
  if (!reference) return;

  const median = centerOf(located);
  const km = distanceKm(median, reference);

  // Großzügig: Berlin und Hamburg sind groß, und der Median darf abweichen.
  if (km > 60) {
    throw new Error(
      `Importierte Punkte liegen ${Math.round(km)} km von ${city.name} entfernt ` +
        `(Median ${median.lat.toFixed(3)}, ${median.lng.toFixed(3)}). ` +
        "Vermutlich ein falsch gedeutetes Koordinatensystem – nichts geschrieben.",
    );
  }
}

function distanceKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }): number {
  const toRad = (degrees: number) => (degrees * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.min(1, Math.sqrt(h)));
}

/** Stadtmittelpunkt über Nominatim, einmal je Lauf zwischengespeichert. */
const centerCache = new Map<string, { lat: number; lng: number } | null>();

async function cityCenter(city: GermanCity): Promise<{ lat: number; lng: number } | null> {
  if (centerCache.has(city.slug)) return centerCache.get(city.slug)!;

  try {
    await new Promise((resolve) => setTimeout(resolve, 1100));
    const url = new URL("https://nominatim.openstreetmap.org/search");
    url.searchParams.set("q", `${city.name}, ${city.state}, Deutschland`);
    url.searchParams.set("format", "jsonv2");
    url.searchParams.set("limit", "1");

    const response = await fetch(url, {
      headers: { "User-Agent": "wheelee-import/0.1 (Behindertenparkplatz-Karte)" },
    });
    const [hit] = (await response.json()) as { lat?: string; lon?: string }[];
    const center = hit?.lat && hit?.lon ? { lat: Number(hit.lat), lng: Number(hit.lon) } : null;

    centerCache.set(city.slug, center);
    return center;
  } catch {
    centerCache.set(city.slug, null);
    return null;
  }
}

/** Eine Stadt importieren – amtlich, sonst OpenStreetMap. */
async function importCity(city: GermanCity): Promise<void> {
  console.log(`\n=== Rang ${city.rank}: ${city.name} (${city.state}) ===`);

  const quellen = await readJson<QuellenStatus[]>(
    path.join(projectRoot, "data", "_quellen-status.json"),
    [],
  );
  const entry = quellen.find((item) => item.slug === city.slug);

  // 1. Amtliche Geodienste, in der Reihenfolge WFS, dann GeoJSON.
  for (const official of entry?.official ?? []) {
    // Reihenfolge: Geodienste zuerst, dann fertige Dateien.
    const ordered = ["WFS", "ARCGIS", "GEOJSON", "JSON", "CSV"].flatMap((format) =>
      official.resources.filter((resource) => resource.format === format),
    );

    for (const resource of ordered) {
      try {
        console.log(`  Versuche ${resource.format}: ${resource.url.slice(0, 90)}`);

        // Nur wenn der Datensatz selbst von Behinderung handelt, darf eine
        // einzelne namenlose Ebene als die richtige gelten.
        const titleMentionsDisability = /behinder|rollstuhl|barrierefrei/iu.test(official.title);

        const result =
          resource.format === "WFS"
            ? await fetchWfsFeatures(
                resource.url,
                await findWfsLayer(resource.url, titleMentionsDisability),
              )
            : resource.format === "ARCGIS"
              ? await fetchArcGis(resource.url)
              : await fetchGeoJson(resource.url);

        if (result.features.length === 0) {
          console.log("  → 0 Objekte, nächste Quelle");
          continue;
        }

        const sourceLabel = `${official.title} – ${city.name} (${official.license})`;
        const { spots, skipped, fields } = toSpots(city, result.features, sourceLabel);

        if (spots.length === 0) {
          console.log(`  → keine verwertbare Geometrie (${skipped} übersprungen)`);
          continue;
        }

        await assertNearCity(city, spots);

        if (!fields.label) {
          console.log(`  Quelle ohne Adressen – ${spots.length} Adressen werden nachgeschlagen`);
          await addAddresses(spots, city.name);
        }

        const written = await writeSeed(city, spots, sourceLabel);
        const spaces = written.reduce((sum, spot) => sum + spot.spotCount, 0);

        console.log(`  Felder: ${JSON.stringify(fields)}`);
        console.log(`  ✅ ${written.length} Standorte, ${spaces} Stellplätze`);

        await recordCity(city.slug, {
          status: "fertig",
          usedSource: `amtlich (${resource.format})`,
          usedUrl: result.url,
          locations: written.length,
          spaces,
          message: skipped > 0 ? `${skipped} Objekte ohne Geometrie übersprungen` : null,
        });
        return;
      } catch (error) {
        console.log(`  → ${(error as Error).message.slice(0, 160)}`);
      }
    }
  }

  // 2. OpenStreetMap als Rückfallebene.
  try {
    console.log("  Keine amtliche Quelle nutzbar – OpenStreetMap");
    const { spots, query } = await importFromOsm(city);

    if (spots.length === 0) {
      await recordCity(city.slug, {
        status: "fertig",
        usedSource: "OpenStreetMap",
        usedUrl: query,
        locations: 0,
        spaces: 0,
        message: "OSM kennt hier keine Behindertenparkplätze",
      });
      console.log("  ⬜ 0 Standorte – OSM hat für diese Stadt nichts");
      return;
    }

    const written = await writeSeed(city, spots, "OpenStreetMap-Mitwirkende (ODbL)");
    const spaces = written.reduce((sum, spot) => sum + spot.spotCount, 0);
    console.log(`  ✅ ${written.length} Standorte, ${spaces} Stellplätze`);

    await recordCity(city.slug, {
      status: "fertig",
      usedSource: "OpenStreetMap",
      usedUrl: query,
      locations: written.length,
      spaces,
      message: entry?.plan === "official" ? "amtliche Quelle nicht nutzbar, OSM verwendet" : null,
    });
  } catch (error) {
    const message = (error as Error).message;
    console.log(`  ❌ ${message.slice(0, 200)}`);
    await recordCity(city.slug, {
      status: "fehlgeschlagen",
      message: message.slice(0, 300),
    });
  }
}

async function main() {
  const args = process.argv.slice(2);
  const status = await loadStatus();
  const open = status.records.filter((record) => record.status === "offen");

  const maxIndex = args.indexOf("--max");
  const max =
    maxIndex >= 0 ? Number.parseInt(args[maxIndex + 1] ?? "", 10) : Number.POSITIVE_INFINITY;

  let targets: GermanCity[];

  if (args.includes("--rest")) {
    targets = open
      .slice(0, Number.isFinite(max) ? max : undefined)
      .map((record) => findCity(record.slug)!)
      .filter(Boolean);
  } else if (args.includes("--next")) {
    targets = open[0] ? [findCity(open[0].slug)!] : [];
  } else {
    const named = args.filter((argument) => !argument.startsWith("--") && argument !== String(max));
    targets = named.map((name) => {
      const city = findCity(name);
      if (!city) throw new Error(`Unbekannte Stadt: ${name}`);
      return city;
    });
  }

  if (targets.length === 0) {
    console.log("Nichts zu tun. Stand siehe data/_import-status.md");
    return;
  }

  for (const city of targets) {
    await importCity(city);
  }

  const after = await loadStatus();
  const done = after.records.filter((record) => record.status === "fertig").length;
  console.log(`\nFertig: ${done} von ${after.records.length} Städten.`);
  console.log("Stand: data/_import-status.md");
}

await main();
