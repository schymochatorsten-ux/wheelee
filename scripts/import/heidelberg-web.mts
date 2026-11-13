/**
 * Heidelberg: die Standorte von der Webseite der Stadt holen (ToDo 2d.8a).
 *
 *     npm run import:heidelberg-web -- --dry       # nur berichten, nichts schreiben
 *     npm run import:heidelberg-web -- --unsicher  # die 22 zweifelhaften Zeilen mitnehmen
 *     npm run import:heidelberg-web            # fehlende Standorte geokodieren
 *
 * **Warum ein eigenes Skript und kein regulärer Import.** Heidelbergs amtliche
 * Datei (CKAN) ist seit dem 2026-11-01 tot; auf Nachfrage hat das Amt für
 * Mobilität am 2026-11-12 auf die Webseite verwiesen (Antwort in
 * `Erledigt.md`). Die Seite ist kein Datensatz: HTML-Tabellen mit Straße,
 * Platzzahl und Zeitbeschränkung – **ohne Koordinaten**.
 *
 * **Deshalb wird ergänzt und nicht ersetzt.** Die 214 Einträge im Bestand
 * tragen gemessene Koordinaten aus der amtlichen Datei vom 2026-10-08.
 * Geokodierte Lagen sind gerundet; sie gegen gemessene zu tauschen wäre eine
 * Verschlechterung. Übernommen werden nur Zeilen, deren **Straße im Bestand
 * gar nicht vorkommt** – die sind sicher neu. Zeilen auf bekannten Straßen
 * mit unbekannter Hausnummer werden nur gezählt und berichtet: Ob sie neu
 * sind oder derselbe Platz mit anderer Hausnummer, ist von hier aus nicht zu
 * entscheiden, und `dedupe` fängt sie nicht ab (es führt nur zusammen, was
 * keine 1,5 m auseinanderliegt).
 *
 * Geschrieben wird `data/heidelberg.zusatz.json`; `import-city.mts` hängt die
 * Einträge beim Bauen der Seed-Datei an. So überlebt die Ergänzung einen
 * späteren Import, falls die amtliche Quelle je zurückkommt.
 *
 * **Die 22 berichteten Zeilen sind keine offene Aufgabe mehr** (Torsten,
 * 2026-11-13): Sie sind geprüft und verworfen, 2d.8a ist abgeschlossen.
 * Der Lauf zählt sie weiter auf, weil die Zahl zeigt, dass die Seite
 * unverändert ist – **wer sie liest, soll sie nicht für eine Liste
 * unerledigter Arbeit halten.** Begründung in `Erledigt.md` unter 2d.8a.
 *
 * **Seit 8.11 gibt es `--unsicher`**, das sie gekennzeichnet mitnimmt. Die
 * Entscheidung vom 2026-11-13 bleibt davon unberührt: Der Schalter ist
 * vorhanden, die Vorgabe ist weiter „nicht übernehmen".
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { ParkingSpot } from "../../src/lib/types.js";
import { mergeZusatz } from "./zusatz.mjs";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const data = (name: string) => path.join(projectRoot, "data", name);

const PAGE = "https://www.heidelberg.de/hd/HD/Leben/Schwerbehindertenparkplaetze.html";
const NOMINATIM = "https://nominatim.openstreetmap.org/search";
const USER_AGENT = "wheelee-import/0.1 (Behindertenparkplatz-Karte; Kontakt via Repository)";
const REQUEST_INTERVAL_MS = 1100;

/** Plausibilitätsrahmen Heidelberg – schützt vor Fehltreffern in anderen Orten. */
const BOUNDS = { minLat: 49.34, maxLat: 49.46, minLng: 8.6, maxLng: 8.83 };

/**
 * Was die Seite am 2026-11-12 enthielt. Weicht der Abruf davon ab, bricht das
 * Skript ab, statt still etwas anderes zu importieren: Ein Regex-Durchgang
 * durch fremdes HTML ist genau dann gefährlich, wenn sich die Seite ändert
 * und niemand es merkt.
 */
const ERWARTET = { zeilen: 100, plaetze: 196 };

const SOURCE = "Schwerbehindertenparkplätze (Webseite der Stadt Heidelberg)";

interface WebRow {
  label: string;
  street: string;
  houseNumber: string | null;
  note: string | null;
  timeRestriction: string | null;
  spotCount: number;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * Abstand, ab dem ein geokodierter Treffer als derselbe Platz gilt wie einer
 * im Bestand. **Nicht die 1,5 m aus `dedupe`:** Dort liegen zwei gemessene
 * Koordinaten nebeneinander, hier trifft eine gerundete auf eine gemessene.
 * „Hauptbahnhof“ und der vorhandene „Willy-Brandt-Platz“ sind derselbe
 * Parkplatz unter zwei Namen – genau das soll diese Prüfung abfangen.
 */
const DUBLETTE_METER = 40;

/**
 * Bis hierher gilt ein Treffer als derselbe Platz, **wenn auch der Name
 * passt**. Reiner Abstand reicht in beide Richtungen nicht: „Hauptbahnhof“
 * landete 108 m neben den fünf vorhandenen Plätzen am Willy-Brandt-Platz und
 * ist derselbe Parkplatz; „Friedhof Rohrbach“ liegt 85 m vom Bierhelderweg
 * und ist ein anderer. Deshalb: 40 m blind, bis 150 m nur bei
 * Namensgleichheit – die Seite nennt die Zweitnamen selbst in Klammern.
 */
const NAMENSGLEICH_METER = 150;

function distanceMeters(a: { lat: number; lng: number }, b: { lat: number; lng: number }): number {
  const toRad = (x: number) => (x * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * 6_371_008.8 * Math.asin(Math.min(1, Math.sqrt(h)));
}

function text(html: string): string {
  return html
    .replace(/<[^>]+>/gu, " ")
    .replace(/&nbsp;/gu, " ")
    .replace(/&amp;/gu, "&")
    .replace(/&quot;/gu, '"')
    .replace(/&#8211;/gu, "–")
    .replace(/\s+/gu, " ")
    .trim();
}

/** Straße und Hausnummer trennen; „Friedhof Rohrbach“ behält street ohne Nummer. */
function splitAddress(line: string): { street: string; houseNumber: string | null } {
  const match = /^(.*?)[ ]+(\d+\s?[a-z]?(?:[–-]\s?\d+\s?[a-z]?)?)$/u.exec(line);
  if (!match) return { street: line.trim(), houseNumber: null };
  return { street: match[1].trim(), houseNumber: match[2].replace(/\s+/gu, "") };
}

function parseRows(html: string): WebRow[] {
  // Nur die beiden A–Z-Tabellen: die Stadtteiltabellen führen dieselben Zeilen
  // noch einmal, und zweimal dasselbe ergäbe doppelte Standorte.
  const tables = [...html.matchAll(/<table[^>]*>([\s\S]*?)<\/table>/gu)].slice(0, 2);
  const rows: WebRow[] = [];
  for (const table of tables) {
    for (const tr of table[1].matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gu)) {
      const cells = [...tr[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gu)].map((c) => c[1]);
      if (cells.length < 3) continue;

      // Die erste Zeile der Zelle ist die Adresse, alles nach einem <br> ist
      // Zusatz: Zeitangabe oder Hinweis.
      const parts = cells[0]
        .split(/<br\s*\/?>/giu)
        .map(text)
        .filter(Boolean);
      const [addressLine, ...rest] = parts;
      if (!addressLine) continue;

      const zusatz = rest.join(" · ") || null;
      const zeit =
        zusatz && /\d|Stunde|Minuten|werktags|Montag|Samstag/u.test(zusatz) ? zusatz : null;

      const counts = [...text(cells[2]).matchAll(/(\d+)\s*Pl/gu)].map((m) => Number(m[1]));
      const je = /\bje\b/u.test(text(cells[2]));
      const teile = addressLine.split(/\s+und\s+/u).length;
      const spotCount =
        counts.length === 0 ? 1 : je ? counts[0] * teile : counts.reduce((a, b) => a + b, 0);

      // Vor dem Trennen auf die **erste** Örtlichkeit kürzen: Die Seite führt
      // Paare („Poststraße 5 und Poststraße 17“) und Ecken („Kußmaulstraße /
      // Handschuhsheimer Landstraße“) in einer Zeile. Ungekürzt landete die
      // zweite Straße im Namen der ersten, und die Zeile galt als unbekannte
      // Straße, obwohl sie längst im Bestand steht.
      const anchor = addressLine
        .replace(/\s*\(.*$/u, "")
        .split(/\s+und\s+|\s*\/\s*|\s*=\s*/u)[0]
        .trim();
      const { street, houseNumber } = splitAddress(anchor);
      // „Köpfel (Sportzentrum Ziegelhausen, Parkplatz 1. Ebene“ – die Klammer
      // ist auf der Seite der Stadt offen geblieben. Ungeschlossen sähe es in
      // der App wie ein abgeschnittener Text aus, also hier geschlossen.
      const label =
        (addressLine.match(/\(/gu)?.length ?? 0) > (addressLine.match(/\)/gu)?.length ?? 0)
          ? `${addressLine})`
          : addressLine;

      rows.push({
        label,
        street,
        houseNumber,
        // Der Klammerzusatz steht schon im Namen; `note` trägt nur, was in
        // einer eigenen Zeile stand und keine Zeitangabe ist – etwa „derzeit
        // wegen Baustelle nicht verfügbar“.
        note: zusatz && !zeit ? zusatz : null,
        timeRestriction: zeit,
        spotCount,
      });
    }
  }
  return rows;
}

const norm = (s: string) =>
  s
    .toLowerCase()
    .replace(/ä/gu, "a")
    .replace(/ö/gu, "o")
    .replace(/ü/gu, "u")
    .replace(/ß/gu, "ss")
    .replace(/stra(ss|s)e\b/gu, "str")
    .replace(/[^a-z0-9]/gu, "");

interface GeocodeHit {
  lat: number;
  lng: number;
  accuracy: "house" | "street" | "approximate";
  query: string;
  displayName: string;
}

/**
 * Zwischenspeicher der Nominatim-Antworten. Nominatim wird von Freiwilligen
 * bezahlt; ein zweiter Lauf soll nicht dieselben Fragen noch einmal stellen.
 * Der Unterstrich im Namen hält die Datei aus den Stadt-Suchen heraus.
 */
const cachePath = data("_geocode-heidelberg.json");
type Cache = Record<string, GeocodeHit | null>;

async function loadCache(): Promise<Cache> {
  try {
    return JSON.parse(await fs.readFile(cachePath, "utf8")) as Cache;
  } catch {
    return {};
  }
}

async function geocode(query: string): Promise<GeocodeHit | null> {
  const url = new URL(NOMINATIM);
  url.searchParams.set("q", `${query}, Heidelberg`);
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("limit", "1");
  url.searchParams.set("countrycodes", "de");
  const response = await fetch(url, { headers: { "user-agent": USER_AGENT } });
  if (!response.ok) return null;
  const [hit] = (await response.json()) as {
    lat: string;
    lon: string;
    display_name: string;
    addresstype?: string;
  }[];
  if (!hit) return null;
  const lat = Number(hit.lat);
  const lng = Number(hit.lon);
  if (lat < BOUNDS.minLat || lat > BOUNDS.maxLat || lng < BOUNDS.minLng || lng > BOUNDS.maxLng) {
    console.log(`  ! ${query}: Treffer liegt außerhalb Heidelbergs (${lat}, ${lng}) – verworfen`);
    return null;
  }
  const type = hit.addresstype ?? "";
  const accuracy = ["house", "building", "address"].includes(type)
    ? "house"
    : ["road", "street"].includes(type)
      ? "street"
      : "approximate";
  return { lat, lng, accuracy, query, displayName: hit.display_name };
}

async function main() {
  const dry = process.argv.includes("--dry");
  /*
   * **`--unsicher` nimmt die zweifelhaften Zeilen mit** (8.11, ab 2026-11-14):
   * die auf einer bekannten Straße mit unbekannter Hausnummer. Sie kommen dann
   * mit `unsicher: true` herein, bekommen in der App den Hinweis vor dem
   * Navigieren und verschwinden schon nach wenigen Meldungen wieder.
   *
   * **Ein Schalter und nicht die neue Vorgabe**, und das ist Absicht: Torsten
   * hat diese 22 Zeilen am 2026-11-13 ausdrücklich verworfen (2d.8a in
   * `Erledigt.md`). Die neue Regel macht sie wieder möglich, hebt aber keine
   * Entscheidung auf, die jemand getroffen hat. Wer den Schalter setzt, nimmt
   * sie bewusst auf.
   */
  const mitUnsicheren = process.argv.includes("--unsicher");

  const response = await fetch(PAGE, { headers: { "user-agent": USER_AGENT } });
  if (!response.ok) throw new Error(`Seite antwortet mit ${response.status}`);
  const rows = parseRows(await response.text());
  const plaetze = rows.reduce((sum, row) => sum + row.spotCount, 0);
  console.log(`Seite: ${rows.length} Zeilen, ${plaetze} Plätze`);
  if (rows.length !== ERWARTET.zeilen || plaetze !== ERWARTET.plaetze) {
    throw new Error(
      `Erwartet waren ${ERWARTET.zeilen} Zeilen und ${ERWARTET.plaetze} Plätze. ` +
        `Die Seite hat sich geändert – erst ansehen, dann die Erwartung anpassen.`,
    );
  }

  const seedAll = JSON.parse(await fs.readFile(data("heidelberg.json"), "utf8")) as {
    spots: {
      id: string;
      street: string | null;
      houseNumber: string | null;
      lat: number;
      lng: number;
    }[];
  };
  // **Ohne die eigenen Einträge rechnen.** Sie stehen nach dem ersten Lauf in
  // der Seed-Datei; zählte man sie mit, wäre beim zweiten Lauf jede Zeile eine
  // „bekannte Straße“ und das Ergebnis leer – genau das ist hier passiert.
  const seed = { spots: seedAll.spots.filter((spot) => !spot.id.startsWith("heidelberg-web-")) };
  const bekannteStrassen = new Set(seed.spots.map((s) => norm(s.street ?? "")));

  const neu = rows.filter((row) => !bekannteStrassen.has(norm(row.street)));
  const unklar = rows.filter(
    (row) =>
      bekannteStrassen.has(norm(row.street)) &&
      row.houseNumber !== null &&
      !seed.spots.some(
        (s) =>
          norm(s.street ?? "") === norm(row.street) && (s.houseNumber ?? "") === row.houseNumber,
      ),
  );

  console.log(
    `Neue Straßen: ${neu.length} Zeilen · bekannte Straße, andere Hausnummer: ${unklar.length} ` +
      (mitUnsicheren ? "(als unsicher übernommen)" : "(nicht übernommen)"),
  );
  for (const row of unklar) console.log(`  ? ${row.label}`);
  if (dry) {
    for (const row of neu) console.log(`  + ${row.label} (${row.spotCount})`);
    return;
  }

  const cache = await loadCache();
  const spots: Record<string, unknown>[] = [];
  // Die zweifelhaften hinten anhängen: Die IDs der sicheren Zeilen bleiben
  // damit dieselben wie vorher, und daran hängen Bewertungen und Favoriten.
  const zuImportieren = mitUnsicheren
    ? [
        ...neu.map((row) => ({ row, unsicher: false })),
        ...unklar.map((row) => ({ row, unsicher: true })),
      ]
    : neu.map((row) => ({ row, unsicher: false }));

  for (const [index, { row, unsicher }] of zuImportieren.entries()) {
    const query = row.houseNumber ? `${row.street} ${row.houseNumber}` : row.street;
    let hit = cache[query];
    if (hit === undefined) {
      hit = await geocode(query);
      cache[query] = hit;
      await fs.writeFile(cachePath, `${JSON.stringify(cache, null, 2)}\n`, "utf8");
      await sleep(REQUEST_INTERVAL_MS);
    }
    if (!hit) {
      console.log(`  – ${row.label}: kein Treffer, übersprungen`);
      continue;
    }
    const labelNorm = norm(row.label);
    const nah = seed.spots.find((s) => {
      const meter = distanceMeters(hit, s);
      if (meter <= DUBLETTE_METER) return true;
      if (meter > NAMENSGLEICH_METER) return false;
      const strasse = norm(s.street ?? "");
      return strasse.length >= 6 && labelNorm.includes(strasse);
    });
    if (nah) {
      console.log(
        `  ~ ${row.label}: ${Math.round(distanceMeters(hit, nah))} m von „${nah.street ?? "?"} ${nah.houseNumber ?? ""}“ – als Dublette übersprungen`,
      );
      continue;
    }
    console.log(
      `  + ${row.label} → ${hit.lat.toFixed(5)}, ${hit.lng.toFixed(5)} (${hit.accuracy})`,
    );
    spots.push({
      id: `heidelberg-web-${String(index + 1).padStart(2, "0")}`,
      city: "heidelberg",
      label: row.label,
      street: row.street,
      houseNumber: row.houseNumber,
      note: row.note,
      timeRestriction: row.timeRestriction,
      district: "Heidelberg",
      spotCount: row.spotCount,
      lat: hit.lat,
      lng: hit.lng,
      geoAccuracy: hit.accuracy,
      source: SOURCE,
      geocodedFrom: hit.displayName,
      ...(unsicher ? { unsicher: true } : {}),
    });
  }

  await fs.writeFile(
    data("heidelberg.zusatz.json"),
    `${JSON.stringify({ source: SOURCE, page: PAGE, fetchedAt: new Date().toISOString().slice(0, 10), spots }, null, 2)}\n`,
    "utf8",
  );

  // Dieselbe Funktion, die auch ein Neu-Import benutzt – damit die Seed-Datei
  // hier nicht anders entsteht als dort.
  const seedFile = JSON.parse(await fs.readFile(data("heidelberg.json"), "utf8")) as {
    spots: ParkingSpot[];
  } & Record<string, unknown>;
  // Die eigenen Einträge zuerst herausnehmen: Sonst gewönne beim zweiten Lauf
  // die alte Fassung (mergeZusatz lässt Vorhandenem den Vortritt), und eine
  // Berichtigung käme nie an.
  const merged = mergeZusatz(
    seedFile.spots.filter((spot) => !spot.id.startsWith("heidelberg-web-")),
    spots as unknown as ParkingSpot[],
  ).sort((a, b) => a.label.localeCompare(b.label, "de-DE"));
  await fs.writeFile(
    data("heidelberg.json"),
    `${JSON.stringify({ ...seedFile, generatedAt: new Date().toISOString().slice(0, 10), spots: merged }, null, 2)}\n`,
    "utf8",
  );
  console.log(
    `\nGeschrieben: data/heidelberg.zusatz.json mit ${spots.length} Standorten; ` +
      `data/heidelberg.json hat jetzt ${merged.length}.`,
  );
  console.log("Danach nötig: npm run generate:index");
}

await main();
