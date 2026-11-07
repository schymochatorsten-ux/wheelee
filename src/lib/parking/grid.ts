/**
 * Das Gitter, in dem weit herausgezoomte Ausschnitte gebündelt werden
 * (ToDo 9.20).
 *
 * **Warum überhaupt gebündelt wird.** `spotsInBounds` liefert höchstens
 * `limit` Standorte, und zwar die ersten in Seed-Reihenfolge – eine Teilmenge
 * Stadt für Stadt, keine Auswahl nach Fläche. Sie zu zeichnen hieße, an
 * manchen Orten „hier ist nichts" vorzutäuschen; genau deshalb blendete die
 * Karte sie bisher aus (9.16). Ein Zähler je Gebiet ist aus **allen**
 * Standorten des Ausschnitts gerechnet und damit exakt – er beseitigt die
 * Ursache, statt sie zu verschweigen.
 *
 * **Eigene Datei ohne Leaflet und ohne Seed-Daten**, aus demselben Grund wie
 * bei `components/map/cluster.ts`: Die Rechnung ist prüfbar, sobald sie nichts
 * anderes anfasst.
 */

/** Nur die vier Kanten – absichtlich strukturell, damit `Bounds` aus `spots.ts` passt. */
export interface GridBounds {
  minLat: number;
  minLng: number;
  maxLat: number;
  maxLng: number;
}

export interface GridCell {
  /** Breite und Höhe einer Zelle in Grad. */
  lat: number;
  lng: number;
}

/**
 * Angestrebte Kantenlänge einer Zelle auf dem Bildschirm.
 *
 * Ein Bündel ist bis zu 64 px breit (`clusterSize`); mit 88 px Raster bleibt
 * sichtbar Luft dazwischen. Enger gesetzt überlappen die Kreise, und dann ist
 * nicht mehr zu erkennen, welche Zahl zu welcher Gegend gehört.
 */
const CELL_PX = 88;

/**
 * Mehr Zellen je Achse gibt es nicht.
 *
 * Eine Notbremse gegen eine abwegige Anfrage (winziger Ausschnitt, hohe
 * Zoomstufe oder umgekehrt): Ohne sie könnte eine einzelne Anfrage eine
 * beliebig lange Antwort erzeugen. 64 × 64 ist weit jenseits dessen, was ein
 * Bildschirm fasst.
 */
const MAX_CELLS_PER_AXIS = 64;

/** Zoomstufen außerhalb dessen, was die Karte kennt, werden hereingeholt. */
function clampZoom(zoom: number): number {
  if (!Number.isFinite(zoom)) return 1;
  return Math.min(Math.max(zoom, 1), 18);
}

/**
 * Wie groß eine Zelle in Grad ist.
 *
 * **Die Höhe ist nicht gleich der Breite.** Auf der Mercator-Karte nimmt ein
 * Breitengrad mehr Pixel ein als ein Längengrad, und zwar um den Faktor
 * 1/cos(Breite). Ohne diese Korrektur wären die Zellen in Deutschland deutlich
 * höher als breit, und die Zähler stünden in Reihen statt in einem Raster.
 *
 * Ohne bekannte Zoomstufe wird die Breite aus dem Ausschnitt selbst
 * abgeleitet (zwölf Spalten): Das ist gröber als die Rechnung mit Pixeln, aber
 * es ist nie falsch – und ein Rateversuch nach Bildschirmgröße wäre genau das,
 * was dieses Projekt nicht tut.
 */
export function cellSize(bounds: GridBounds, zoom: number | null): GridCell {
  const spanLng = Math.max(bounds.maxLng - bounds.minLng, 0);
  const spanLat = Math.max(bounds.maxLat - bounds.minLat, 0);

  const midLat = (bounds.minLat + bounds.maxLat) / 2;
  // Nahe den Polen geht der Kosinus gegen null und die Höhe gegen unendlich
  // klein. Dort liegen keine Daten, aber eine Division durch fast null bleibt
  // eine Division durch fast null.
  const cosLat = Math.max(Math.cos((midLat * Math.PI) / 180), 0.05);

  let lng =
    zoom === null ? spanLng / 12 : (CELL_PX * 360) / (256 * Math.pow(2, clampZoom(zoom)));

  // Notbremse je Achse. Die Höhe hängt an der Breite, deshalb wird auch die
  // Zeilenzahl über die Breite begrenzt.
  lng = Math.max(lng, spanLng / MAX_CELLS_PER_AXIS, spanLat / (MAX_CELLS_PER_AXIS * cosLat));

  // Ein Ausschnitt ohne Ausdehnung (beide Spannen null, keine Zoomstufe) ergäbe
  // sonst eine Zelle der Größe null und damit unendlich viele Zellen.
  lng = Math.max(lng, 1e-6);

  return { lng, lat: lng * cosLat };
}

/**
 * In welcher Zelle ein Punkt liegt.
 *
 * **Der Ursprung ist die Erde, nicht der Ausschnitt** (−180, −90). Würde am
 * linken Rand des Bildes gezählt, verschöben sich beim Ziehen der Karte alle
 * Zellgrenzen: Die Zahlen sprängen bei jeder Bewegung, obwohl sich nichts
 * geändert hat.
 */
export function cellKey(lat: number, lng: number, cell: GridCell): string {
  const row = Math.floor((lat + 90) / cell.lat);
  const column = Math.floor((lng + 180) / cell.lng);
  return `${row}:${column}`;
}
