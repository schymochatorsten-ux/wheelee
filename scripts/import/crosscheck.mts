/**
 * Amtliche Standorte gegen OpenStreetMap paaren (ToDo 3.1).
 *
 * **Was dieser Vergleich leistet und was nicht.** Standorte, die zwei
 * unabhängige Quellen kennen, sind die verlässlichsten im ganzen Bestand – das
 * ist die Angabe, die vor einer vergeblichen Fahrt schützt (3.7). Ein
 * fehlender Gegenpart ist dagegen **kein Fehler**: OpenStreetMap ist
 * unvollständig, und eine amtliche Liste führt Stellplätze, die dort nie
 * eingetragen wurden.
 *
 * **Drei Gruppen statt einer Quote**, und das ist der eigentliche Punkt dieser
 * Datei. Bisher zählte die Validierung nur, wie viele einen Gegenpart haben.
 * Welche es sind, fiel weg – damit konnte die Oberfläche nichts kennzeichnen,
 * und jede Anzeige hätte den Lauf wiederholen müssen. Vor allem aber fehlte
 * die dritte Gruppe:
 *
 * - **bestätigt** – beide Quellen kennen den Standort.
 * - **nur amtlich** – in OpenStreetMap nicht erfasst. Kein Fehler, nur
 *   ungeprüft.
 * - **nur OSM** – entweder neu hinzugekommen oder **in der amtlichen Liste
 *   vergessen.** Diese Gruppe ist die interessanteste, weil sie auf eine Lücke
 *   in der Quelle zeigt, die man sonst nie bemerkt: Eine amtliche Liste gilt
 *   als vollständig, und niemand sucht in ihr nach Fehlendem.
 *
 * Diese Datei enthält **nur die Rechnung, keinen Netzzugriff** – damit sie
 * sich testen lässt, ohne einen Gemeinschaftsdienst zu befragen.
 */

/** Ein Punkt mit Kennung, wie beide Seiten ihn liefern. */
export interface CrossCheckPoint {
  id: string;
  lat: number;
  lng: number;
  label: string;
}

export interface CrossCheckGroups {
  /** IDs der amtlichen Standorte, die OpenStreetMap ebenfalls kennt. */
  confirmed: string[];
  /** IDs der amtlichen Standorte ohne Gegenpart. */
  officialOnly: string[];
  /** OSM-Standorte, die in der amtlichen Liste fehlen. */
  osmOnly: CrossCheckPoint[];
}

/**
 * Abstand in Metern, lokale Näherung.
 *
 * Dieselbe Projektion wie in `street-names.mts`: Auf Stadtgröße ist die
 * Erdkrümmung vernachlässigbar, und es geht um Abstände von Metern. Haversine
 * wäre genauer, als die Frage verlangt, und für den Vergleich jedes Standorts
 * mit jedem merklich langsamer.
 */
function meters(a: CrossCheckPoint, b: CrossCheckPoint, metersPerLng: number): number {
  const dy = (a.lat - b.lat) * 110_574;
  const dx = (a.lng - b.lng) * metersPerLng;
  return Math.hypot(dx, dy);
}

/**
 * Die drei Gruppen bestimmen.
 *
 * **Jeder OSM-Standort bestätigt höchstens einen amtlichen.** Ohne diese
 * Einschränkung wäre das Ergebnis geschmeichelt: An einem Krankenhaus liegen
 * zwanzig amtliche Stellplätze auf engem Raum, und ein einziger
 * OSM-Parkplatz („capacity:disabled=20") würde sie alle als „von zwei Quellen
 * bestätigt" ausweisen. Bestätigt heißt dann nichts mehr. Die Paarung ist
 * deshalb eins zu eins, und zwar immer zum **nächstgelegenen** freien
 * Gegenpart.
 *
 * Die Gegenprobe steckt in der Zählung: `confirmed.length` kann nie größer
 * sein als die Anzahl der OSM-Standorte.
 */
export function pairSpots(
  official: CrossCheckPoint[],
  osm: CrossCheckPoint[],
  toleranceMeters: number,
): CrossCheckGroups {
  // Längengrad-Skalierung einmal für die Gegend, nicht je Paar.
  const lat0 = official[0]?.lat ?? osm[0]?.lat ?? 51;
  const metersPerLng = 111_320 * Math.cos((lat0 * Math.PI) / 180);

  const confirmed: string[] = [];
  const officialOnly: string[] = [];
  const used = new Set<number>();

  /*
   * Erst alle Paare unter der Toleranz sammeln, dann **die kürzesten zuerst**
   * zuordnen. Reihenfolge nach Datei hätte sonst entschieden, wer den
   * Gegenpart bekommt: Steht ein 28 m entferntes Paar vor einem 3 m
   * entfernten, nimmt das falsche ihn weg – und der richtige Standort gilt
   * als unbestätigt. Das wäre eine Auskunft, die von der Sortierung der
   * Quelldatei abhängt.
   */
  const candidates: { officialIndex: number; osmIndex: number; meters: number }[] = [];

  for (const [officialIndex, spot] of official.entries()) {
    for (const [osmIndex, other] of osm.entries()) {
      const distance = meters(spot, other, metersPerLng);
      if (distance <= toleranceMeters)
        candidates.push({ officialIndex, osmIndex, meters: distance });
    }
  }

  candidates.sort((a, b) => a.meters - b.meters);

  const matchedOfficial = new Set<number>();
  for (const candidate of candidates) {
    if (matchedOfficial.has(candidate.officialIndex) || used.has(candidate.osmIndex)) continue;
    matchedOfficial.add(candidate.officialIndex);
    used.add(candidate.osmIndex);
  }

  for (const [index, spot] of official.entries()) {
    if (matchedOfficial.has(index)) confirmed.push(spot.id);
    else officialOnly.push(spot.id);
  }

  const osmOnly = osm.filter((_, index) => !used.has(index));

  return { confirmed, officialOnly, osmOnly };
}
