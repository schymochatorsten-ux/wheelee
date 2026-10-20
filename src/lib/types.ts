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

/**
 * Ergebnis des Abgleichs mit einer zweiten Quelle (ToDos 3.1, 3.7).
 *
 * `bestaetigt` heißt: Zwei unabhängige Quellen kennen diesen Standort.
 * `nur_amtlich` heißt: geprüft, aber in OpenStreetMap nicht erfasst – kein
 * Mangel am Standort, nur eine Quelle weniger. **Fehlt die Angabe ganz, wurde
 * nicht geprüft**, und das ist etwas anderes als `nur_amtlich`.
 */
export type ConfirmationState = "bestaetigt" | "nur_amtlich";

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
  /**
   * Ergebnis des Kreuzvergleichs, **beim Ausliefern ergänzt**.
   *
   * Steht bewusst **nicht** in den Seed-Dateien: Es ist kein Datum der Quelle,
   * sondern das Ergebnis einer Prüfung, die `npm run validate` nach
   * `data/_bestaetigt.json` schreibt. Es hier anzuhängen ist der günstigste
   * Weg zur Oberfläche – die Datei selbst an den Browser zu schicken hieße,
   * eine Liste mit tausenden IDs mitzuladen, und die 128 KB der Seite sind
   * hart erarbeitet (5.4).
   *
   * `undefined` heißt „nicht geprüft", nicht „nicht bestätigt".
   */
  confirmation?: ConfirmationState;
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
