/**
 * Ortssuche für das Reiseziel (ToDo 6.12).
 *
 * Bisher beantwortet die App nur „wo parke ich *hier*". Die häufigere Frage
 * ist „wo parke ich *dort*, wo ich hinwill" – zum Arzttermin, zum Amt, zum
 * Besuch. Und man will das **vor** der Abfahrt wissen, nicht nach der Ankunft.
 */

import { distanceMeters, type LatLng } from "./geo";

/** Art eines Ortes, soweit sie sich verlässlich bestimmen lässt (ToDo 9.18 e). */
export type PlaceKind = "city" | "street";

export interface Place {
  /** Anzeigename, gekürzt auf das Wesentliche. */
  label: string;
  /** Vollständige Anschrift, als zweite Zeile. */
  detail: string;
  lat: number;
  lng: number;
  /** Fehlt, wenn die Art unklar ist – dann zeigt die Oberfläche nichts an. */
  kind?: PlaceKind;
}

interface NominatimResult {
  display_name?: string;
  lat?: string;
  lon?: string;
  name?: string;
  address?: Record<string, string>;
  addresstype?: string;
}

const CITY_TYPES = new Set(["city", "town", "village", "hamlet", "municipality", "suburb", "borough"]);

function kindOf(addresstype: string | undefined): PlaceKind | undefined {
  if (!addresstype) return undefined;
  if (CITY_TYPES.has(addresstype)) return "city";
  if (addresstype === "road") return "street";
  return undefined;
}

/**
 * Aus Nominatims `display_name` eine lesbare Überschrift und eine Unterzeile
 * machen.
 *
 * `display_name` ist eine lange Kette („Kölner Dom, Domkloster, Altstadt-Nord,
 * Innenstadt, Köln, Nordrhein-Westfalen, 50667, Deutschland"). Ungekürzt
 * passt sie in keine Telefonzeile, und das Wichtigste steht vorn.
 */
export function toPlace(result: NominatimResult): Place | null {
  const lat = Number(result.lat);
  const lng = Number(result.lon);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;

  const parts = (result.display_name ?? "").split(",").map((part) => part.trim());
  if (parts.length === 0 || parts[0].length === 0) return null;

  const label = result.name?.trim() || parts[0];

  // „Deutschland" am Ende hilft niemandem, der in Deutschland sucht.
  const rest = parts.slice(1).filter((part) => part !== "Deutschland" && part.length > 0);

  const kind = kindOf(result.addresstype);
  return { label, detail: rest.slice(0, 3).join(", "), lat, lng, ...(kind ? { kind } : {}) };
}

/** Treffer von Nominatim in unsere Form bringen, leere Einträge verwerfen. */
export function toPlaces(results: unknown): Place[] {
  if (!Array.isArray(results)) return [];
  return results
    .map((result) => toPlace(result as NominatimResult))
    .filter((place): place is Place => place !== null);
}

/**
 * Bis hierher gilt ein Treffer als „in der Nähe".
 *
 * 50 km ist bewusst großzügig: Es soll den Bahnhof im Nachbarkreis einschließen
 * und den gleichnamigen am anderen Ende Deutschlands ausschließen. Eine engere
 * Grenze würde genau die Fahrten verschlechtern, für die die Zielsuche da ist –
 * zum Facharzt oder zum Amt in der Kreisstadt.
 */
export const NEARBY_RADIUS_METERS = 50_000;

/**
 * Treffer nach Nähe ordnen – der eigentliche Unterschied zu einer rohen
 * Nominatim-Antwort.
 *
 * Nominatim sortiert nach `importance`, einer Kennzahl aus Wikipedia-Verweisen
 * und Objektart. Für eine Ortssuche ist das die falsche Frage: Wer „Bahnhofstraße"
 * tippt, meint fast immer die in seiner Nähe, und es gibt sie in über 5.000
 * deutschen Gemeinden. Ungeordnet stand der eigene Ort irgendwo unter zehn
 * gleichnamigen.
 *
 * Die Regel in zwei Stufen, und beide sind nötig:
 *
 * - **Was in der Nähe liegt, kommt zuerst – und zwar nach Entfernung sortiert.**
 *   Zwischen zwei Bahnhofstraßen im Umkreis entscheidet die Entfernung, nicht
 *   die Bekanntheit.
 * - **Alles Weitere behält Nominatims Reihenfolge.** Dort ist die Entfernung
 *   keine brauchbare Auskunft mehr: Zwischen zwei Treffern in 300 und 400 km
 *   ist die Bekanntheit der bessere Hinweis darauf, was gemeint war.
 *
 * Ohne Bezugspunkt bleibt die Reihenfolge unverändert. Eine erfundene ist
 * schlechter als die des Dienstes.
 */
export function orderByProximity(places: readonly Place[], origin: LatLng | null): Place[] {
  if (!origin) return [...places];

  const near: { place: Place; meters: number }[] = [];
  const far: Place[] = [];

  for (const place of places) {
    const meters = distanceMeters(origin, { lat: place.lat, lng: place.lng });
    if (meters <= NEARBY_RADIUS_METERS) near.push({ place, meters });
    else far.push(place);
  }

  near.sort((a, b) => a.meters - b.meters);

  return [...near.map((entry) => entry.place), ...far];
}

/**
 * Wie weit zwei **gleich beschriftete** Treffer auseinanderliegen dürfen und
 * trotzdem derselbe Ort sind.
 *
 * 150 m, und das ist mit Absicht großzügig: Maßgeblich ist die Ausdehnung
 * eines großen Gebäudes, nicht die Messgenauigkeit. OpenStreetMap kennt
 * dasselbe Haus oft zweimal – als Adresspunkt und als Gebäudefläche –, und
 * Nominatim gibt von der Fläche den Schwerpunkt zurück. Beim Hamburger
 * Rathaus liegen die beiden **98 m** auseinander (gemessen 2026-10-16), und es
 * stand zweimal in der Liste.
 *
 * Der Preis ist benannt: Zwei wirklich verschiedene Orte gleichen Namens
 * innerhalb von 150 m werden zu einem zusammengefasst. Bei Zielen – Kliniken,
 * Ämtern, Bahnhöfen, Straßen – kommt das praktisch nicht vor, und ein
 * doppelter Eintrag verdrängt eine echte Alternative aus einer Liste mit acht
 * Plätzen.
 */
const SAME_PLACE_METERS = 150;

/**
 * Denselben Ort nicht zweimal anbieten.
 *
 * Nominatim liefert für „Köln Hauptbahnhof" den Bahnhof als Gebäude, als
 * Haltestelle und als Verkehrsknoten – drei Einträge, gleich beschriftet, auf
 * demselben Fleck. In einer Vorschlagsliste mit Platz für ein halbes Dutzend
 * Zeilen verdrängen sie die echten Alternativen.
 *
 * Zusammengeführt wird in **zwei** Fällen, und der zweite kam erst bei der
 * Probe gegen echte Daten heraus:
 *
 * 1. **Gleiche Beschriftung, unter 150 m Abstand.** Das ist dasselbe Objekt,
 *    mehrfach erfasst – meist als Adresspunkt und als Gebäudefläche.
 * 2. **Gleiche Beschriftung und gleiche Unterzeile**, ganz ohne Rücksicht auf
 *    den Abstand. Eine Straße ist in OpenStreetMap in Abschnitte geteilt, und
 *    Nominatim liefert jeden einzeln: Die Suche nach „Bahnhofstraße" ergab von
 *    Köln aus dreimal „Bahnhofstraße | Porz, Köln" – drei Zeilen, die dieselbe
 *    Straße meinen und die Plätze der echten Alternativen belegten. Zwei
 *    verschiedene Straßen gleichen Namens im **selben** Ortsteil gibt es
 *    nicht; Straßennamen werden je Ort nur einmal vergeben.
 *
 * Zwei verschiedene Namen am selben Punkt bleiben stehen: Das sind meist
 * Geschäft und Gebäude, und welches gemeint ist, weiß nur die Nutzerin.
 */
export function dedupePlaces(places: readonly Place[]): Place[] {
  const kept: Place[] = [];

  for (const place of places) {
    const duplicate = kept.some(
      (entry) =>
        entry.label === place.label &&
        // Eine **leere** Unterzeile sagt nichts aus und darf nicht als
        // Übereinstimmung gelten – sonst bliebe von zehn Treffern ohne
        // Ortsangabe genau einer übrig.
        ((place.detail.length > 0 && entry.detail === place.detail) ||
          distanceMeters(entry, place) < SAME_PLACE_METERS),
    );
    if (!duplicate) kept.push(place);
  }

  return kept;
}

/** Zuletzt gesuchte Ziele – wiederkehrende Fahrten sind der Normalfall. */
export const RECENT_KEY = "wheelee-ziele";
const MAX_RECENT = 5;

export function readRecent(): Place[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(RECENT_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (entry): entry is Place =>
        typeof entry === "object" &&
        entry !== null &&
        typeof (entry as Place).label === "string" &&
        Number.isFinite((entry as Place).lat),
    );
  } catch {
    return [];
  }
}

/** Ein einzelnes Ziel aus den letzten entfernen (ToDo 9.18 c). */
export function forgetPlace(place: Place, existing: Place[] = readRecent()): Place[] {
  const next = existing.filter(
    (entry) => !(entry.label === place.label && Math.abs(entry.lat - place.lat) < 1e-6),
  );

  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(RECENT_KEY, JSON.stringify(next));
    } catch {
      // Ohne Speicher gilt die Änderung nur für diese Sitzung.
    }
  }

  return next;
}

/** Ein Ziel vorn einfügen, Dubletten entfernen, Liste kurz halten. */
export function rememberPlace(place: Place, existing: Place[] = readRecent()): Place[] {
  const without = existing.filter(
    (entry) => !(entry.label === place.label && Math.abs(entry.lat - place.lat) < 1e-6),
  );
  const next = [place, ...without].slice(0, MAX_RECENT);

  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(RECENT_KEY, JSON.stringify(next));
    } catch {
      // Ohne Speicher gilt die Liste nur für diese Sitzung.
    }
  }

  return next;
}
