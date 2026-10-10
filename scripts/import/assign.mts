/**
 * Einen Punkt der richtigen Gemeinde zuordnen (Teil von ToDo 2e.7).
 *
 * Beim landesweiten Import kommen alle Parkplätze eines Bundeslandes in
 * einer Antwort – ohne Angabe, zu welcher Gemeinde sie gehören. Die
 * Zuordnung muss deshalb lokal geschehen.
 *
 * **Warum nicht einfach die nächste Gemeindemitte?** Weil Gemeinden
 * unterschiedlich groß und nicht rund sind. Ein Parkplatz am Rand einer
 * Flächengemeinde kann der Mitte des kleinen Nachbarorts näher liegen als
 * der eigenen. Deshalb entscheidet zuerst das **umschließende Rechteck**:
 * Nur Gemeinden, deren Ausdehnung den Punkt überhaupt enthält, kommen in
 * Frage. Erst unter diesen entscheidet die Entfernung zur Mitte.
 *
 * Das ist nicht so genau wie ein echter Punkt-in-Fläche-Test, aber ohne die
 * vollständige Grenzgeometrie – zig Megabyte je Bundesland – die beste
 * Näherung. Und es ist ehrlich: Wo keine Gemeinde passt, sagt das Ergebnis
 * das, statt zu raten.
 */

export interface Municipality {
  /** Amtlicher Gemeindeschlüssel, falls OpenStreetMap ihn führt. */
  ags: string | null;
  name: string;
  /** Mittelpunkt der Grenzrelation. */
  lat: number;
  lng: number;
  /** Umschließendes Rechteck der Grenzrelation. */
  bounds: { minLat: number; minLng: number; maxLat: number; maxLng: number };
}

export interface Point {
  lat: number;
  lng: number;
}

const EARTH_RADIUS_METERS = 6_371_008.8;
const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

function distanceMeters(a: Point, b: Point): number {
  const dLat = toRadians(b.lat - a.lat);
  const dLng = toRadians(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(a.lat)) * Math.cos(toRadians(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * EARTH_RADIUS_METERS * Math.asin(Math.min(1, Math.sqrt(h)));
}

function contains(municipality: Municipality, point: Point): boolean {
  const { bounds } = municipality;
  return (
    point.lat >= bounds.minLat &&
    point.lat <= bounds.maxLat &&
    point.lng >= bounds.minLng &&
    point.lng <= bounds.maxLng
  );
}

export interface Assignment {
  municipality: Municipality;
  /** Wie sicher die Zuordnung ist. */
  confidence: "eindeutig" | "mehrdeutig" | "geraten";
  /** Entfernung zur Gemeindemitte in Metern. */
  distanceMeters: number;
}

/**
 * Die passende Gemeinde zu einem Punkt finden.
 *
 * - `eindeutig`: genau eine Gemeinde umschließt den Punkt.
 * - `mehrdeutig`: mehrere Rechtecke überlappen – die nächstgelegene Mitte
 *   gewinnt. Das ist der Normalfall in dicht besiedelten Räumen.
 * - `geraten`: kein Rechteck passt. Dann ist der Punkt wahrscheinlich
 *   außerhalb des Landes oder die Grenzdaten fehlen; die Zuordnung steht
 *   unter Vorbehalt und sollte nicht ungeprüft übernommen werden.
 */
export function assignToMunicipality(
  point: Point,
  municipalities: readonly Municipality[],
): Assignment | null {
  if (municipalities.length === 0) return null;

  const enclosing = municipalities.filter((municipality) => contains(municipality, point));
  const candidates = enclosing.length > 0 ? enclosing : municipalities;

  let best: Municipality | null = null;
  let bestDistance = Number.POSITIVE_INFINITY;

  for (const municipality of candidates) {
    const meters = distanceMeters(point, municipality);
    if (meters < bestDistance) {
      best = municipality;
      bestDistance = meters;
    }
  }

  if (!best) return null;

  return {
    municipality: best,
    confidence:
      enclosing.length === 1 ? "eindeutig" : enclosing.length > 1 ? "mehrdeutig" : "geraten",
    distanceMeters: bestDistance,
  };
}
