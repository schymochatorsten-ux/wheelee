import path from "node:path";
import { projectRoot } from "./config.mjs";

/**
 * Städte, deren Parkplätze aus OpenStreetMap kommen.
 *
 * Frankfurt hat eine amtliche Liste und eine eigene Importkette (parse-pdf).
 * Für kleinere Städte gibt es keine offene Verwaltungsliste; dort ist OSM die
 * einzige brauchbare Quelle. Die Datenlage unterscheidet sich dadurch
 * grundlegend – siehe `note` – und das muss in der App sichtbar bleiben.
 */

export interface OsmCity {
  /** Slug und ID-Präfix. */
  slug: string;
  /** Anzeigename. */
  name: string;
  /** Suchbegriff für Nominatim, um die Bounding-Box zu bestimmen. */
  searchQuery: string;
  /** Kartenmittelpunkt. */
  center: { lat: number; lng: number };
  /** Quellenangabe für die Oberfläche. */
  source: string;
}

export const osmCities: readonly OsmCity[] = [
  {
    slug: "idstein",
    name: "Idstein",
    searchQuery: "Idstein, Hessen, Deutschland",
    center: { lat: 50.2187, lng: 8.2686 },
    source: "OpenStreetMap-Mitwirkende (ODbL)",
  },
  {
    slug: "weissenhorn",
    name: "Weißenhorn",
    searchQuery: "Weißenhorn, Bayern, Deutschland",
    center: { lat: 48.3047, lng: 10.1594 },
    source: "OpenStreetMap-Mitwirkende (ODbL)",
  },
];

/** Dateipfade je Stadt. */
export function cityPaths(slug: string) {
  return {
    seed: path.join(projectRoot, "data", `${slug}.json`),
    report: path.join(projectRoot, "data", `${slug}.report.md`),
    overrides: path.join(projectRoot, "data", `${slug}.overrides.json`),
  };
}

/**
 * Städte mit amtlichem WFS-Dienst.
 *
 * Das ist die beste aller Quellen: amtlich, vollständig, mit Koordinaten aus
 * dem Kataster statt aus einer Adresssuche. Wo es so etwas gibt, hat es Vorrang
 * vor PDF-Listen und erst recht vor OpenStreetMap.
 */
export interface WfsCity {
  slug: string;
  name: string;
  center: { lat: number; lng: number };
  /** Basis-URL des WFS-Dienstes. */
  url: string;
  /** Name der Ebene mit den Behindertenparkplätzen. */
  typeName: string;
  source: string;
  /** Welche Eigenschaft welche Bedeutung hat. */
  fields: {
    /** Örtlichkeit. */
    label: string;
    /** Anzahl der Stellplätze. */
    spotCount: string;
    /** Stadtteil. */
    district: string;
    /** Zeitliche Beschränkung. */
    timeRestriction: string;
  };
}

export const wfsCities: readonly WfsCity[] = [
  {
    slug: "frankfurt",
    name: "Frankfurt am Main",
    center: { lat: 50.1109, lng: 8.6821 },
    url: "https://geowebdienste.frankfurt.de/Parken",
    typeName: "opendata:Behindertenparkplaetze",
    source: "Stadt Frankfurt am Main, Open Data (WFS Parken)",
    fields: {
      label: "description",
      spotCount: "behindertenstellplaetze",
      district: "vti_anschrift",
      timeRestriction: "vti_oeffnungszeiten",
    },
  },
];

/** Gemeinsamer Cache für die Rückwärtssuche von Adressen. */
export const addressCachePath = path.join(projectRoot, "data", "osm-address-cache.json");
