/**
 * Liest Behindertenparkplätze aus beliebigen amtlichen Geodatenquellen.
 *
 * Die Städte veröffentlichen dieselbe Sache in sehr unterschiedlicher Form:
 * WFS, GeoJSON-Datei, JSON-API. Auch die Spaltennamen unterscheiden sich
 * („behindertenstellplaetze", „anzahl", „ANZ_STELLPL", …). Dieses Modul
 * erschließt beides selbst und meldet, wenn es sich nicht sicher ist – lieber
 * eine Stadt zur Handarbeit markieren als Felder raten.
 */

const USER_AGENT = "wheelee-import/0.1 (Behindertenparkplatz-Karte; Kontakt via Repository)";

export interface GeoFeature {
  id?: string;
  geometry: { type: string; coordinates: unknown } | null;
  properties: Record<string, unknown>;
  /** Koordinatensystem laut Quelle, etwa "EPSG:25833". */
  srs?: string;
}

/**
 * UTM-Zone aus einer CRS-Angabe lesen.
 *
 * Unverzichtbar, weil das Raten der Zone *plausibel falsche* Ergebnisse
 * liefert: Dresdens Rechtswert als Zone 32 statt 33 gedeutet ergibt 7,7° Ost –
 * eine Koordinate mitten in Deutschland, nur eben im Rheinland. Die Angabe
 * steht in den Daten, sie muss nur gelesen werden. Schreibweisen reichen von
 * "EPSG:25833" bis "urn:ogc:def:crs:EPSG:7.1:25833".
 */
export function utmZoneFromSrs(srs: string | undefined): number | null {
  if (!srs) return null;
  const code = /(?:EPSG[:/]{1,2}(?:[\d.]+:)?)(\d{4,5})/iu.exec(srs)?.[1];
  if (!code) return null;

  switch (code) {
    case "25832":
    case "3044":
    case "4647":
    case "32632":
      return 32;
    case "25833":
    case "3045":
    case "5650":
    case "32633":
      return 33;
    default:
      return null;
  }
}

/** Plausibler Rahmen für Deutschland – erkennt falsche Koordinatensysteme. */
const GERMANY = { minLat: 47.2, maxLat: 55.1, minLng: 5.8, maxLng: 15.1 };

export const isPlausibleWgs84 = (lat: number, lng: number) =>
  lat >= GERMANY.minLat && lat <= GERMANY.maxLat && lng >= GERMANY.minLng && lng <= GERMANY.maxLng;

/* ------------------------------------------------------------------ *
 * Koordinaten
 * ------------------------------------------------------------------ */

/**
 * UTM (ETRS89 / EPSG:25832 und 25833) nach WGS84.
 *
 * Nötig, weil mehrere WFS-Dienste `srsName=EPSG:4326` ignorieren und weiter in
 * UTM liefern. Ohne Umrechnung landeten die Parkplätze irgendwo im Nirgendwo –
 * und zwar ohne Fehlermeldung.
 */
export function utmToWgs84(easting: number, northing: number, zone: number) {
  const a = 6378137.0;
  const f = 1 / 298.257222101; // GRS80
  const k0 = 0.9996;
  const e2 = f * (2 - f);
  const e1 = (1 - Math.sqrt(1 - e2)) / (1 + Math.sqrt(1 - e2));

  const x = easting - 500000;
  const m = northing / k0;
  const mu = m / (a * (1 - e2 / 4 - (3 * e2 ** 2) / 64 - (5 * e2 ** 3) / 256));

  const phi1 =
    mu +
    ((3 * e1) / 2 - (27 * e1 ** 3) / 32) * Math.sin(2 * mu) +
    ((21 * e1 ** 2) / 16 - (55 * e1 ** 4) / 32) * Math.sin(4 * mu) +
    ((151 * e1 ** 3) / 96) * Math.sin(6 * mu);

  const sinPhi1 = Math.sin(phi1);
  const cosPhi1 = Math.cos(phi1);
  const tanPhi1 = Math.tan(phi1);

  const ep2 = e2 / (1 - e2);
  const c1 = ep2 * cosPhi1 ** 2;
  const t1 = tanPhi1 ** 2;
  const n1 = a / Math.sqrt(1 - e2 * sinPhi1 ** 2);
  const r1 = (a * (1 - e2)) / (1 - e2 * sinPhi1 ** 2) ** 1.5;
  const d = x / (n1 * k0);

  const lat =
    phi1 -
    ((n1 * tanPhi1) / r1) *
      (d ** 2 / 2 -
        ((5 + 3 * t1 + 10 * c1 - 4 * c1 ** 2 - 9 * ep2) * d ** 4) / 24 +
        ((61 + 90 * t1 + 298 * c1 + 45 * t1 ** 2 - 252 * ep2 - 3 * c1 ** 2) * d ** 6) / 720);

  const lng =
    (d -
      ((1 + 2 * t1 + c1) * d ** 3) / 6 +
      ((5 - 2 * c1 + 28 * t1 - 3 * c1 ** 2 + 8 * ep2 + 24 * t1 ** 2) * d ** 5) / 120) /
    cosPhi1;

  const centralMeridian = zone * 6 - 183;
  return {
    lat: (lat * 180) / Math.PI,
    lng: centralMeridian + (lng * 180) / Math.PI,
  };
}

/** Ersten Punkt einer beliebigen Geometrie finden. */
function firstPosition(coordinates: unknown): [number, number] | null {
  if (!Array.isArray(coordinates)) return null;
  if (typeof coordinates[0] === "number" && typeof coordinates[1] === "number") {
    return [coordinates[0], coordinates[1]];
  }
  for (const part of coordinates) {
    const found = firstPosition(part);
    if (found) return found;
  }
  return null;
}

/** Alle Punkte sammeln, um den Mittelpunkt einer Fläche zu bilden. */
function allPositions(coordinates: unknown, into: [number, number][] = []): [number, number][] {
  if (!Array.isArray(coordinates)) return into;
  if (typeof coordinates[0] === "number" && typeof coordinates[1] === "number") {
    into.push([coordinates[0], coordinates[1]]);
    return into;
  }
  for (const part of coordinates) allPositions(part, into);
  return into;
}

/**
 * Koordinate eines Features in WGS84.
 * Erkennt selbst, ob die Quelle in Grad oder in UTM liefert.
 */
export function coordinatesOf(feature: GeoFeature): { lat: number; lng: number } | null {
  if (!feature.geometry) return null;

  const positions =
    feature.geometry.type === "Point"
      ? [firstPosition(feature.geometry.coordinates)].filter(
          Boolean as unknown as (v: unknown) => v is [number, number],
        )
      : allPositions(feature.geometry.coordinates);

  if (positions.length === 0) return null;

  // Mittelpunkt für Flächen und Linien.
  const sum = positions.reduce(
    (accumulator, [x, y]) => ({ x: accumulator.x + x, y: accumulator.y + y }),
    { x: 0, y: 0 },
  );
  const x = sum.x / positions.length;
  const y = sum.y / positions.length;

  // GeoJSON-Reihenfolge ist [Länge, Breite].
  if (isPlausibleWgs84(y, x)) return { lat: y, lng: x };
  // Manche Dienste drehen die Achsen (EPSG:4326 in WFS 1.1).
  if (isPlausibleWgs84(x, y)) return { lat: x, lng: y };

  // Projizierte Koordinaten. Die Zone muss aus der Quelle kommen – geraten
  // führt sie zu Koordinaten, die plausibel aussehen und trotzdem falsch sind.
  if (Math.abs(y) > 1000) {
    const declared = utmZoneFromSrs(feature.srs);
    const zones = declared !== null ? [declared] : [32, 33];

    for (const zone of zones) {
      const converted = utmToWgs84(x, y, zone);
      if (isPlausibleWgs84(converted.lat, converted.lng)) return converted;
    }
  }

  return null;
}

/* ------------------------------------------------------------------ *
 * Feldzuordnung
 * ------------------------------------------------------------------ */

/** Kandidaten je Bedeutung, von spezifisch nach allgemein. */
const FIELD_PATTERNS = {
  label: [
    /^(description|bezeichnung|beschreibung)$/iu,
    /standort|oertlichkeit|örtlichkeit|lage/iu,
    /^(adresse|anschrift|strasse_hnr|str_hnr)$/iu,
    // Hamburg nennt die Spalte „nahe_adresse" – ein verankertes Muster
    // übersieht sie, und dann hätten alle 936 Einträge denselben Namen.
    /adresse|anschrift/iu,
    /^name$/iu,
    /stra(ss|ß)e/iu,
  ],
  spotCount: [
    /behindertenstellpl|schwerbehindert.*anzahl|anzahl.*behindert/iu,
    /^(anzahl|anz|stellplaetze|stellplätze|plaetze|plätze|capacity|kapazitaet)$/iu,
    /anzahl|stellpl|capacity/iu,
  ],
  district: [/stadtteil|ortsteil|stadtbezirk|^bezirk$|quartier/iu],
  timeRestriction: [
    /oeffnungszeit|öffnungszeit|nutzungszeit|zeitbeschr|beschraenkung|einschraenkung|gueltig|zeiten?$/iu,
  ],
  street: [/^(strasse|straße|str|street|road)$/iu],
  houseNumber: [/^(hausnummer|hnr|haus_nr|hausnr|housenumber)$/iu],
} as const;

export type FieldName = keyof typeof FIELD_PATTERNS;

/** Für jede Bedeutung die passende Spalte suchen. */
export function mapFields(properties: Record<string, unknown>): Partial<Record<FieldName, string>> {
  const keys = Object.keys(properties);
  const mapping: Partial<Record<FieldName, string>> = {};

  for (const [field, patterns] of Object.entries(FIELD_PATTERNS) as [
    FieldName,
    readonly RegExp[],
  ][]) {
    for (const pattern of patterns) {
      const hit = keys.find((key) => pattern.test(key));
      if (hit) {
        mapping[field] = hit;
        break;
      }
    }
  }

  return mapping;
}

/* ------------------------------------------------------------------ *
 * Abruf
 * ------------------------------------------------------------------ */

/**
 * Einige Portale filtern Anfragen ohne browserartige Kennung weg – Bochum
 * antwortet darauf mit 403. Diese Kennung nennt das Werkzeug weiterhin beim
 * Namen, nutzt aber die übliche "compatible"-Schreibweise, die solche Filter
 * durchlassen.
 */
const COMPATIBLE_AGENT =
  "Mozilla/5.0 (compatible; wheelee-import/0.1; +https://github.com/wheelee)";

function normalizeUrl(url: string): string {
  // GovData liefert URLs teils HTML-maskiert ("&amp;"). Ungefiltert übernommen
  // werden daraus Parameter wie "amp;version" – der Dienst antwortet mit 400.
  let clean = url.replace(/&amp;/gu, "&");

  // Karlsruhe hinterlegt die komplette Abfrage prozentkodiert hinter dem Pfad
  // ("/query%3fwhere%3d…"). So verschickt ist es ein Pfad, den es nicht gibt.
  if (/%3f/iu.test(clean)) clean = decodeURIComponent(clean);

  return clean;
}

async function fetchText(url: string): Promise<string> {
  const clean = normalizeUrl(url);

  for (const agent of [USER_AGENT, COMPATIBLE_AGENT]) {
    const response = await fetch(clean, {
      headers: { "User-Agent": agent, Accept: "application/json, application/xml, text/*;q=0.9" },
    });

    if (response.ok) return response.text();
    if (response.status !== 403) throw new Error(`HTTP ${response.status} bei ${clean}`);
  }

  throw new Error(`HTTP 403 bei ${clean} – Portal verweigert den Abruf`);
}

/** Parameter, die der Importer selbst setzt – alle anderen bleiben erhalten. */
const WFS_OWN_PARAMS = new Set([
  "service",
  "version",
  "request",
  "typename",
  "typenames",
  "outputformat",
  "srsname",
  "count",
  "maxfeatures",
]);

/**
 * WFS-URL bauen und dabei portalspezifische Parameter behalten.
 *
 * Den Query-String pauschal zu leeren wäre falsch: Dresden adressiert den
 * Datensatz über `NodeId=1462`, ohne den antwortet der Dienst mit einer
 * ServiceException. Umgekehrt müssen die eigenen Parameter gesetzt werden,
 * ohne dass Dubletten in abweichender Schreibweise stehen bleiben.
 */
function buildWfsUrl(baseUrl: string, params: Record<string, string>): URL {
  const source = new URL(baseUrl.replace(/&amp;/gu, "&"));
  const url = new URL(source.origin + source.pathname);

  for (const [key, value] of source.searchParams) {
    if (!WFS_OWN_PARAMS.has(key.toLowerCase())) url.searchParams.set(key, value);
  }
  for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value);

  return url;
}

/**
 * Layer eines WFS auflisten und den mit Behindertenparkplätzen wählen.
 *
 * `allowSingleLayerFallback` darf nur gesetzt werden, wenn schon der
 * Datensatz-Titel von Behindertenparkplätzen handelt. Sonst greift der
 * Fallback bei beliebigen Parkdiensten zu: Aachen bekam so den Datensatz
 * „Bewohnerparkzonen" – fachlich etwas völlig anderes, und der Abgleich mit
 * OpenStreetMap bestätigte prompt keinen einzigen Standort.
 */
export async function findWfsLayer(
  baseUrl: string,
  allowSingleLayerFallback = false,
): Promise<string> {
  const url = buildWfsUrl(baseUrl, { service: "WFS", request: "GetCapabilities" });

  const xml = await fetchText(url.toString());

  // Jeden FeatureType als Paar aus Name und Titel lesen. Der Name allein
  // genügt nicht: Dresden nennt seine Ebene `cls:L1113`, erst der Titel sagt,
  // worum es geht.
  const layers = [
    ...xml.matchAll(/<(?:[\w.]+:)?FeatureType[^>]*>([\s\S]*?)<\/(?:[\w.]+:)?FeatureType>/gu),
  ]
    .map((match) => {
      const block = match[1];
      // Das Name-Element kann Attribute tragen – Hamburg hängt dort einen
      // Namensraum an (`<Name xmlns:de.hh.up="…">`).
      const name = /<(?:[\w.]+:)?Name(?:\s[^>]*)?>([^<]+)</iu.exec(block)?.[1];
      const title = /<(?:[\w.]+:)?Title(?:\s[^>]*)?>([^<]*)</iu.exec(block)?.[1] ?? "";
      return name ? { name, title } : null;
    })
    .filter((layer): layer is { name: string; title: string } => layer !== null);

  if (layers.length === 0) throw new Error("Dienst nennt keine Ebenen.");

  const relevant = layers.find((layer) =>
    /behinderten|schwerbehinderten|rollstuhl/iu.test(`${layer.name} ${layer.title}`),
  );
  if (relevant) return relevant.name;

  // Hat der Dienst nur eine Ebene und handelt der Datensatz nachweislich von
  // Behindertenparkplätzen, ist sie gemeint.
  if (layers.length === 1 && allowSingleLayerFallback) return layers[0].name;

  throw new Error(
    `Kein Layer mit Behindertenparkplätzen gefunden. Vorhanden: ${layers
      .map((layer) => `${layer.name} (${layer.title})`)
      .slice(0, 12)
      .join(", ")}`,
  );
}

/** GeoJSON von einem WFS holen. */
export async function fetchWfsFeatures(
  baseUrl: string,
  typeName: string,
): Promise<{ features: GeoFeature[]; url: string }> {
  const attempts = ["2.0.0", "1.1.0"];
  let lastError = "";

  for (const version of attempts) {
    const url = buildWfsUrl(baseUrl, {
      service: "WFS",
      version,
      request: "GetFeature",
      [version === "2.0.0" ? "typeNames" : "typeName"]: typeName,
      outputFormat: "application/json",
      srsName: "EPSG:4326",
    });

    try {
      const text = await fetchText(url.toString());
      if (!text.trimStart().startsWith("{")) {
        lastError = `kein GeoJSON (${text.slice(0, 120).replace(/\s+/gu, " ")})`;
        continue;
      }
      const json = JSON.parse(text) as {
        features?: GeoFeature[];
        numberMatched?: number;
      };
      const features = json.features ?? [];

      if (json.numberMatched !== undefined && json.numberMatched > features.length) {
        throw new Error(
          `Dienst paginiert: ${features.length} von ${json.numberMatched} Objekten geliefert.`,
        );
      }
      return { features, url: url.toString() };
    } catch (error) {
      lastError = (error as Error).message;
    }
  }

  // Kein GeoJSON? Dann GML – viele deutsche Dienste können nichts anderes.
  try {
    return await fetchWfsGml(baseUrl, typeName);
  } catch (error) {
    throw new Error(`WFS nicht verwertbar: ${lastError}; GML: ${(error as Error).message}`);
  }
}

/* ------------------------------------------------------------------ *
 * GML
 * ------------------------------------------------------------------ */

/** Namensraum-Präfix entfernen: `de.hh.up:strasse` wird zu `strasse`. */
const localName = (tag: string) => tag.replace(/^[\w.]+:/u, "");

/**
 * Punktkoordinate aus einem GML-Fragment lesen.
 * GML 3 nutzt `<gml:pos>`, GML 2 `<gml:coordinates>`.
 */
function gmlPosition(fragment: string): [number, number] | null {
  const pos = /<(?:[\w.]+:)?pos(?:List)?[^>]*>([^<]+)</iu.exec(fragment);
  if (pos) {
    const [a, b] = pos[1]
      .trim()
      .split(/[\s,]+/u)
      .map(Number);
    if (Number.isFinite(a) && Number.isFinite(b)) return [a, b];
  }

  const coordinates = /<(?:[\w.]+:)?coordinates[^>]*>([^<]+)</iu.exec(fragment);
  if (coordinates) {
    const [a, b] = coordinates[1]
      .trim()
      .split(/[,\s]+/u)
      .map(Number);
    if (Number.isFinite(a) && Number.isFinite(b)) return [a, b];
  }

  return null;
}

/**
 * GML-Antwort eines WFS in Features übersetzen.
 *
 * Kein vollwertiger GML-Parser, sondern genau so viel, wie Punktdaten mit
 * flachen Sachattributen brauchen – mehr liefern diese Dienste nicht. Nötig
 * ist das, weil etliche deutsche WFS ausschließlich GML ausgeben; Hamburg
 * etwa lehnt `outputFormat=application/json` rundheraus ab.
 */
export function parseGml(xml: string): GeoFeature[] {
  // Jedes Mitglied der Sammlung ist ein Feature.
  const members = [
    ...xml.matchAll(
      /<(?:[\w.]+:)?(?:member|featureMember)[^>]*>([\s\S]*?)<\/(?:[\w.]+:)?(?:member|featureMember)>/gu,
    ),
  ].map((match) => match[1]);

  // Manche Dienste nennen das Koordinatensystem nur einmal am Anfang.
  const documentSrs = /srsName="([^"]+)"/u.exec(xml)?.[1];

  const features: GeoFeature[] = [];

  for (const member of members) {
    const position = gmlPosition(member);
    if (!position) continue;

    const properties: Record<string, unknown> = {};
    // Blattelemente mit Textinhalt sind die Sachattribute.
    for (const match of member.matchAll(/<([\w.]+:[\w.-]+)(?:\s[^>]*)?>([^<>]+)<\/\1>/gu)) {
      const key = localName(match[1]);
      const value = match[2].trim();
      // Geometrieteile sind keine Sachattribute.
      if (/^(pos|posList|coordinates|lowerCorner|upperCorner)$/iu.test(key)) continue;
      if (value.length > 0 && !(key in properties)) properties[key] = value;
    }

    const id = /gml:id="([^"]+)"/u.exec(member)?.[1];
    const srs = /srsName="([^"]+)"/u.exec(member)?.[1] ?? documentSrs;

    features.push({
      id,
      geometry: { type: "Point", coordinates: position },
      properties,
      srs,
    });
  }

  return features;
}

/** GML von einem WFS holen, wenn er kein GeoJSON kann. */
export async function fetchWfsGml(
  baseUrl: string,
  typeName: string,
): Promise<{ features: GeoFeature[]; url: string }> {
  for (const version of ["2.0.0", "1.1.0"]) {
    const url = buildWfsUrl(baseUrl, {
      service: "WFS",
      version,
      request: "GetFeature",
      [version === "2.0.0" ? "typeNames" : "typeName"]: typeName,
    });

    const xml = await fetchText(url.toString());
    if (/ExceptionReport|ServiceException/iu.test(xml)) continue;

    const features = parseGml(xml);
    if (features.length > 0) return { features, url: url.toString() };
  }

  throw new Error("GML-Abruf lieferte keine Punktobjekte.");
}

/**
 * ArcGIS-REST-Dienst abfragen.
 *
 * Viele Städte betreiben ihr Geoportal mit ArcGIS. Deren WFS-Fassade liefert
 * kein GeoJSON, die REST-Schnittstelle dagegen schon – sie braucht nur die
 * richtigen Parameter und eine Ebenennummer am Ende des Pfads.
 */
export async function fetchArcGis(
  baseUrl: string,
): Promise<{ features: GeoFeature[]; url: string }> {
  // GovData liefert URLs teils HTML-maskiert („&amp;"); ungefiltert übernommen
  // erzeugt das Parameter wie „amp;pretty" und HTTP 400.
  const cleaned = baseUrl.replace(/&amp;/gu, "&");

  // Query-String abschneiden, bevor der Ebenenpfad angehängt wird – sonst
  // landet „/0/query" hinter dem Fragezeichen und der Dienst sieht es nie.
  const withoutQuery = cleaned.split("?")[0].replace(/\/$/u, "");
  const service = withoutQuery.replace(/\/(?:\d+)?\/?query$/iu, "").replace(/\/\d+$/u, "");
  const root = /MapServer|FeatureServer/iu.test(service) ? service : `${service}/MapServer`;

  const problems: string[] = [];

  for (const layer of [0, 1, 2]) {
    const url = new URL(`${root}/${layer}/query`);
    url.searchParams.set("where", "1=1");
    url.searchParams.set("outFields", "*");
    url.searchParams.set("outSR", "4326");
    url.searchParams.set("f", "geojson");
    url.searchParams.set("returnGeometry", "true");

    try {
      const text = await fetchText(url.toString());
      if (!text.trimStart().startsWith("{")) {
        problems.push(`Ebene ${layer}: kein JSON`);
        continue;
      }

      const json = JSON.parse(text) as {
        features?: GeoFeature[];
        error?: { message?: string };
        exceededTransferLimit?: boolean;
      };

      if (json.error) {
        problems.push(`Ebene ${layer}: ${json.error.message ?? "Fehler"}`);
        continue;
      }
      if (json.exceededTransferLimit) {
        throw new Error(`ArcGIS begrenzt die Ausgabe (Ebene ${layer}) – Seitenabruf nötig.`);
      }

      const features = json.features ?? [];
      if (features.length > 0) return { features, url: url.toString() };
      problems.push(`Ebene ${layer}: 0 Objekte`);
    } catch (error) {
      problems.push(`Ebene ${layer}: ${(error as Error).message}`);
    }
  }

  throw new Error(`ArcGIS nicht verwertbar: ${problems.join("; ")}`);
}

/**
 * Manche Portale verlinken statt der Datei die Ressourcenseite ihres
 * CKAN-Katalogs – Düsseldorfs „JSON" liefert so eine HTML-Seite. Die
 * CKAN-API nennt dazu die echte Datei-URL.
 */
async function resolveCkanResource(url: string): Promise<string> {
  const match = /^(https?:\/\/[^/]+)\/dataset\/[^/]+\/resource\/([0-9a-f-]{36})/iu.exec(url);
  if (!match) return url;

  const [, origin, resourceId] = match;
  try {
    const text = await fetchText(`${origin}/api/3/action/resource_show?id=${resourceId}`);
    const json = JSON.parse(text) as { result?: { url?: string } };
    return json.result?.url ?? url;
  } catch {
    return url;
  }
}

/** Spaltennamen, unter denen Koordinaten in Tabellen und JSON stehen. */
const LAT_KEYS = /^(lat|latitude|breite|breitengrad|y|y_koord|ykoord|wgs84_lat|geo_lat)$/iu;
const LNG_KEYS =
  /^(lon|lng|long|longitude|laenge|länge|laengengrad|x|x_koord|xkoord|wgs84_lon|geo_lon)$/iu;

/** Deutsche Dezimalkommas zulassen. */
const toNumber = (value: unknown): number =>
  Number(
    String(value ?? "")
      .trim()
      .replace(",", "."),
  );

/** Datensätze mit Koordinatenspalten in Features übersetzen. */
function recordsToFeatures(records: Record<string, unknown>[]): GeoFeature[] {
  const keys = Object.keys(records[0] ?? {});
  const latKey = keys.find((key) => LAT_KEYS.test(key));
  const lngKey = keys.find((key) => LNG_KEYS.test(key));
  if (!latKey || !lngKey) return [];

  const features: GeoFeature[] = [];

  for (const [index, record] of records.entries()) {
    const lat = toNumber(record[latKey]);
    const lng = toNumber(record[lngKey]);
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) continue;

    features.push({
      id: String(record.id ?? record.ID ?? index),
      geometry: { type: "Point", coordinates: [lng, lat] },
      properties: record,
    });
  }

  return features;
}

/** Einfacher CSV-Leser: Trennzeichen erkennen, Anführungszeichen beachten. */
export function parseCsv(text: string): Record<string, unknown>[] {
  const clean = text.replace(/^﻿/u, "");
  const firstLine = clean.slice(0, clean.indexOf("\n") + 1 || undefined);
  const delimiter = [";", ",", "\t"]
    .map((candidate) => ({ candidate, count: firstLine.split(candidate).length }))
    .sort((a, b) => b.count - a.count)[0].candidate;

  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let quoted = false;

  for (let index = 0; index < clean.length; index += 1) {
    const char = clean[index];

    if (quoted) {
      if (char === '"') {
        if (clean[index + 1] === '"') {
          field += '"';
          index += 1;
        } else quoted = false;
      } else field += char;
      continue;
    }

    if (char === '"') quoted = true;
    else if (char === delimiter) {
      row.push(field);
      field = "";
    } else if (char === "\n") {
      row.push(field.replace(/\r$/u, ""));
      rows.push(row);
      row = [];
      field = "";
    } else field += char;
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field.replace(/\r$/u, ""));
    rows.push(row);
  }

  const [header, ...body] = rows.filter((entry) => entry.some((cell) => cell.trim().length > 0));
  if (!header) return [];

  return body.map((cells) =>
    Object.fromEntries(header.map((key, index) => [key.trim(), cells[index]?.trim() ?? ""])),
  );
}

/**
 * GeoJSON, sonstiges JSON oder CSV laden.
 * Welches davon es ist, entscheidet der Inhalt – die Formatangabe der
 * Portale stimmt zu oft nicht.
 */
export async function fetchGeoJson(url: string): Promise<{ features: GeoFeature[]; url: string }> {
  const resolved = await resolveCkanResource(url);
  const text = await fetchText(resolved);
  const trimmed = text.trimStart();

  if (trimmed.startsWith("<")) {
    throw new Error("Antwort ist HTML, keine Daten – vermutlich eine Katalogseite.");
  }

  if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
    const json = JSON.parse(text) as
      { features?: GeoFeature[]; [key: string]: unknown } | Record<string, unknown>[];

    if (Array.isArray(json)) return { features: recordsToFeatures(json), url: resolved };
    if (Array.isArray(json.features)) return { features: json.features, url: resolved };

    // Manche Portale verpacken die Liste in ein Feld.
    const embedded = Object.values(json).find(
      (value): value is Record<string, unknown>[] =>
        Array.isArray(value) && typeof value[0] === "object",
    );
    if (embedded) return { features: recordsToFeatures(embedded), url: resolved };

    return { features: [], url: resolved };
  }

  return { features: recordsToFeatures(parseCsv(text)), url: resolved };
}
