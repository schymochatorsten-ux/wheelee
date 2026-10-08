/**
 * Gemeinsame Typen für Parkplatzdaten und Bewertungen.
 * Bewusst frei von Framework- und Datenbank-Details, damit Kartendarstellung,
 * Datenimport und Bewertungen unabhängig voneinander bleiben.
 */

/** Wie verlässlich die Koordinaten eines Parkplatzes sind. */
export type GeoAccuracy =
  /** Haus- bzw. Gebäudegenauigkeit – Koordinate direkt verwendbar. */
  | "house"
  /** Nur die Straße konnte verortet werden (z. B. bei Kreuzungsangaben). */
  | "street"
  /** Grobe Verortung, etwa auf Stadtteilebene. */
  | "approximate"
  /** Keine Koordinate ermittelbar – nur in der Listenansicht zeigen. */
  | "none";

/** Ein Stellplatz-Standort aus einer städtischen Liste. */
export interface ParkingSpot {
  /** Stabile ID über Importläufe hinweg, z. B. `ffm-0042`. */
  id: string;
  /** Stadt-Slug, z. B. `frankfurt`. */
  city: string;
  /** Unveränderter Text der Quelle („Örtlichkeit"). */
  label: string;
  /** Aus dem Label gelöste Straße, sofern erkennbar. */
  street: string | null;
  /** Aus dem Label gelöste Hausnummer, sofern erkennbar. */
  houseNumber: string | null;
  /** Zusatzangabe wie Einrichtung oder Kreuzung („Ärztehaus", „/ Dalbergstraße"). */
  note: string | null;
  /** Zeitliche Beschränkung im Klartext, z. B. „Mo-Fr 8-18 h". */
  timeRestriction: string | null;
  /** Stadtteil laut Quelle. */
  district: string;
  /** Anzahl der Stellplätze an diesem Standort. */
  spotCount: number;
  lat: number | null;
  lng: number | null;
  geoAccuracy: GeoAccuracy;
  /** Herkunft der Daten, für Attribution und spätere Aktualisierung. */
  source: string;
}

/** Bewertungsrichtung durch Nutzer:innen. */
export type RatingVote = "exists" | "gone";

/** Aggregierte Bewertungen zu einem Parkplatz, wie sie die UI anzeigt. */
export interface RatingSummary {
  spotId: string;
  existsCount: number;
  goneCount: number;
  /** ISO-Zeitpunkt der letzten „Existiert"-Bewertung. */
  lastExistsAt: string | null;
  /** ISO-Zeitpunkt der letzten „Existiert nicht mehr"-Bewertung. */
  lastGoneAt: string | null;
}

/**
 * Ein Parkplatz mit Entfernung zum aktuellen Standort.
 * Nur verortete Parkplätze haben eine Entfernung, deshalb sind die Koordinaten
 * hier gesetzt.
 */
export type ParkingSpotWithDistance = ParkingSpot & {
  lat: number;
  lng: number;
  /** Luftlinie in Metern. */
  distanceMeters: number;
};
