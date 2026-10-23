"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { useLocale, useT } from "@/i18n/context";
import { rememberPlace, readRecent, type Place } from "@/lib/geocode";
import { distanceMeters, formatDistance, type LatLng } from "@/lib/geo";

/**
 * Ziel eingeben und dort parken (ToDo 6.12).
 *
 * Die wichtigste fehlende Funktion: Bisher beantwortete die App nur „wo parke
 * ich hier". Wer zum Arzt, zum Amt oder zu Besuch fährt, will **vor** der
 * Abfahrt wissen, wo am Ziel ein Platz ist – nachher ist es zu spät.
 *
 * **Vorschläge beim Tippen** (2026-10-10), aber mit einer bewussten
 * Einschränkung. Nominatims Nutzungsbedingungen nennen eine Abfrage je
 * Sekunde als Obergrenze und führen Autovervollständigung ausdrücklich als
 * unerwünschte Nutzung auf – eine Anfrage je Tastendruck wäre also nicht nur
 * unhöflich, sondern ein Verstoß, der zur Sperre führt. Der Weg hier:
 *
 * - Gesucht wird erst, wenn **350 ms nicht getippt** wurde. Beim normalen
 *   Tippen entsteht dadurch eine Anfrage je Wortpause, nicht je Buchstabe.
 * - Jede Antwort wird **im Browser behalten** (`cache`). Buchstabe löschen und
 *   neu tippen, derselbe Begriff zweimal – das kostet keine Anfrage mehr.
 * - Der Server legt zusätzlich eine Stunde lang ab (siehe `api/geocode`).
 *
 * Das fühlt sich an wie Autovervollständigung, ohne sich wie Missbrauch zu
 * verhalten. Soll es wirklich bei jedem Buchstaben vorschlagen, braucht es
 * einen eigenen Geocoder – das wäre eine Entscheidung mit Kosten, keine
 * Einstellung.
 *
 * **Nach Nähe geordnet** (2026-10-16). Vorher kam die Antwort so, wie Nominatim
 * sie sortiert: nach `importance`, einer Kennzahl aus Wikipedia-Verweisen. Wer
 * „Bahnhofstraße" tippte, bekam eine Liste aus ganz Deutschland, und die eigene
 * stand nicht darunter – es gibt sie in über 5.000 Gemeinden. Der Bezugspunkt
 * (Standort oder gesetztes Ziel) geht deshalb mit in die Anfrage, und die
 * Entfernung steht an jedem Vorschlag. Die Regeln dazu stehen in `lib/geocode`.
 */

interface DestinationSearchProps {
  /** Das aktuell gesetzte Ziel, falls eines gewählt wurde. */
  destination: Place | null;
  /**
   * Woher aus gesucht wird: eigener Standort oder gesetztes Ziel.
   *
   * Nur für die Reihenfolge und die Entfernungsangabe. **Er verlässt das Gerät
   * trotzdem** – an den eigenen Server, der Nominatim fragt. Deshalb auf etwa
   * einen Kilometer gerundet (siehe `coarse`): Für die Sortierung genügt das,
   * und der genaue Standort wird nirgends gebraucht.
   */
  reference: LatLng | null;
  onChoose: (place: Place) => void;
  onClear: () => void;
}

/** Ab wann eine Suche überhaupt sinnvoll ist. */
const MIN_CHARS = 3;

/** Wie lange nach dem letzten Tastendruck gewartet wird. */
const IDLE_MS = 350;

/**
 * Antworten dieser Sitzung, nach Suchbegriff **und** Bezugspunkt.
 *
 * Außerhalb der Komponente, damit sie ein Schließen und Öffnen des Feldes
 * überlebt – genau dann tippt man denselben Begriff nämlich erneut.
 */
const cache = new Map<string, Place[]>();

/**
 * Den Bezugspunkt auf etwa einen Kilometer runden.
 *
 * Zwei Gründe, und der zweite ist der wichtigere:
 *
 * - **Datensparsamkeit.** Für die Sortierung ist ein Kilometer genau genug. Der
 *   genaue Standort wird dafür nicht gebraucht, also wird er nicht geschickt.
 * - **Sonst wäre der Zwischenspeicher wirkungslos.** Ein GPS-Standort
 *   schwankt bei jedem Messwert in der sechsten Dezimalstelle. Ungerundet
 *   hätte jede Messung einen eigenen Schlüssel – derselbe Begriff zweimal
 *   getippt wäre zwei Anfragen an Nominatim, und dessen Nutzungsbedingungen
 *   sind genau das, was diese Suche einzuhalten versucht.
 */
function coarse(point: LatLng | null): LatLng | null {
  if (!point) return null;
  return { lat: Math.round(point.lat * 100) / 100, lng: Math.round(point.lng * 100) / 100 };
}

const ICON = "h-[1.15em] w-[1.15em]";

function SearchIcon() {
  return (
    <svg className={ICON} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <circle cx="11" cy="11" r="7" strokeWidth="2" />
      <path d="M16.5 16.5L21 21" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className={ICON} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Zuklappen, nicht löschen.
 *
 * Zwei gleich aussehende ×-Knöpfe nebeneinander – einer löscht die Eingabe,
 * einer schließt die Leiste – wären nicht auseinanderzuhalten. Der Pfeil sagt,
 * was geschieht: Die Leiste geht zu und wird wieder zur Schaltfläche.
 */
function ChevronUpIcon() {
  return (
    <svg className={ICON} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path d="M6 14.5l6-6 6 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Die schwebenden Flächen über der Karte.
 *
 * Bewusst zurückhaltend: dünner Rand, halbdurchsichtig, weicher Schatten.
 * Alles, was hier kräftiger wird, nimmt der Karte Aufmerksamkeit weg – und
 * die Karte ist das, was beantwortet, ob ein Parkplatz erreichbar ist.
 */
const PANEL =
  "pointer-events-auto rounded-xl border border-black/5 bg-white/90 shadow-md ring-1 ring-black/5 backdrop-blur-md dark:border-white/10 dark:bg-neutral-900/90 dark:ring-white/10";

const ICON_BUTTON =
  "flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none dark:hover:bg-neutral-800 dark:hover:text-neutral-100";

export function DestinationSearch({
  destination,
  reference,
  onChoose,
  onClear,
}: DestinationSearchProps) {
  const t = useT();
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Place[]>([]);
  const [recent, setRecent] = useState<Place[]>([]);
  const [status, setStatus] = useState<"bereit" | "sucht" | "leer" | "fehler">("bereit");
  /** Welcher Vorschlag mit den Pfeiltasten angesteuert ist; -1 = keiner. */
  const [active, setActive] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = useId();

  useEffect(() => {
    setRecent(readRecent());
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  /**
   * Der Bezugspunkt, gerundet – so geht er in Anfrage und Schlüssel ein.
   *
   * Der Umweg über die Zeichenkette ist nötig und nicht Zierde: `coarse` gibt
   * bei jedem Rendern ein **neues Objekt** zurück, auch bei unverändertem
   * Standort. Als Abhängigkeit genommen würde damit die Tippverzögerung bei
   * jedem Rendern neu beginnen – und bei laufender Standortbestimmung rendert
   * die Seite ständig. Die Suche käme nie los.
   */
  const originKey = (() => {
    const point = coarse(reference);
    return point ? `${point.lat},${point.lng}` : "";
  })();

  const origin = useMemo<LatLng | null>(() => {
    if (!originKey) return null;
    const [lat, lng] = originKey.split(",").map(Number);
    return { lat, lng };
  }, [originKey]);

  /**
   * Welche Anfrage die neueste ist.
   *
   * Zwei Suchen können sich überholen: „Köln" braucht länger als „Kölner Dom",
   * weil die erste nicht im Zwischenspeicher lag. Ohne diesen Zähler würde die
   * späte Antwort auf den früheren Begriff die richtige Liste überschreiben –
   * man liest dann Vorschläge zu einem Wort, das nicht mehr im Feld steht.
   */
  const latest = useRef(0);

  const keyFor = useCallback((term: string) => `${term.toLowerCase()}|${originKey}`, [originKey]);

  /**
   * Sucht und gibt die Treffer zurück.
   *
   * Der Rückgabewert ist für Enter da: Dort soll nicht nur gesucht, sondern
   * auch gleich der erste Treffer übernommen werden – und das geht nur, wenn
   * der Aufrufer die Antwort in der Hand hat. `null` heißt „kein Ergebnis zum
   * Übernehmen": Fehler, oder von einer neueren Suche überholt.
   */
  const search = useCallback(
    async (term: string): Promise<Place[] | null> => {
      const key = keyFor(term);
      const ticket = (latest.current += 1);

      setStatus("sucht");
      try {
        const url = new URL("/api/geocode", window.location.origin);
        url.searchParams.set("q", term);
        if (origin) {
          url.searchParams.set("lat", String(origin.lat));
          url.searchParams.set("lng", String(origin.lng));
        }

        const response = await fetch(url);
        const data = (await response.json()) as { places?: Place[]; error?: string };

        // Eine überholte Antwort wird verworfen, nicht angezeigt.
        if (ticket !== latest.current) return null;

        if (data.error) {
          setStatus("fehler");
          setResults([]);
          return null;
        }

        const places = data.places ?? [];
        cache.set(key, places);
        setResults(places);
        setStatus(places.length === 0 ? "leer" : "bereit");
        setActive(-1);
        return places;
      } catch {
        if (ticket !== latest.current) return null;
        setStatus("fehler");
        setResults([]);
        return null;
      }
    },
    [keyFor, origin],
  );

  useEffect(() => {
    const term = query.trim();

    if (term.length < MIN_CHARS) {
      setResults([]);
      setStatus("bereit");
      setActive(-1);
      return;
    }

    // Schon bekannt: sofort zeigen, ohne den Dienst zu fragen.
    const known = cache.get(keyFor(term));
    if (known) {
      // Auch hier hochzählen: Eine noch laufende Anfrage zu einem früheren
      // Begriff darf diese Liste nicht mehr überschreiben.
      latest.current += 1;
      setResults(known);
      setStatus(known.length === 0 ? "leer" : "bereit");
      setActive(-1);
      return;
    }

    const timer = setTimeout(() => void search(term), IDLE_MS);
    return () => clearTimeout(timer);
  }, [query, keyFor, search]);

  const choose = (place: Place) => {
    setRecent(rememberPlace(place));
    setQuery("");
    setResults([]);
    setActive(-1);
    setOpen(false);
    onChoose(place);
  };

  /** Was gerade in der Liste steht: Treffer, sonst die letzten Ziele. */
  const shown = results.length > 0 ? results : query.trim().length === 0 ? recent : [];

  /**
   * Tastaturbedienung wie in einer Ortssuche gewohnt: Pfeile wählen, Eingabe
   * übernimmt, Esc schließt. Ohne das müsste man zum Tippen und Antippen
   * wechseln – auf einem Telefon im Auto die unbequemste aller Bewegungen.
   */
  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      setOpen(false);
      return;
    }

    /*
     * Enter sucht sofort und übernimmt den besten Treffer, wenn noch nichts
     * dasteht.
     *
     * Der Fall ist alltäglich und war vorher eine Sackgasse: Man tippt eine
     * vollständige Adresse und drückt Enter, bevor die 350 ms Tippause
     * abgelaufen sind. Die App tat daraufhin **nichts** – kein Treffer, keine
     * Meldung, kein Hinweis.
     *
     * Dass dabei ungesehen ein Ziel gesetzt wird, ist vertretbar: Es ist
     * derselbe Treffer, den Enter auch bei sichtbarer Liste nimmt, er steht
     * danach mit Namen in der Zielzeile, und ein Fehlgriff kostet einen
     * Druck auf „Ziel aufheben". Nichts zu tun war die schlechtere Antwort.
     */
    if (event.key === "Enter" && shown.length === 0) {
      const term = query.trim();
      if (term.length >= MIN_CHARS && status !== "sucht") {
        event.preventDefault();
        void search(term).then((places) => {
          if (places && places.length > 0) choose(places[0]);
        });
      }
      return;
    }

    if (shown.length === 0) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((index) => (index + 1) % shown.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((index) => (index <= 0 ? shown.length - 1 : index - 1));
    } else if (event.key === "Enter") {
      event.preventDefault();
      // Ohne Pfeiltaste ist der erste Vorschlag gemeint – das ist der Treffer,
      // den man beim Tippen im Blick hat.
      choose(shown[active >= 0 ? active : 0]);
    }
  };

  if (destination && !open) {
    return (
      <div className={`${PANEL} flex items-center gap-1 self-start p-1 pl-2.5`}>
        <span className="min-w-0 flex-1 truncate text-xs">
          <span className="text-neutral-500">{t("search.destination")} </span>
          <span className="font-medium">{destination.label}</span>
        </span>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="min-h-11 shrink-0 rounded-lg px-2.5 text-xs font-medium text-blue-800 transition-colors hover:bg-blue-50 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none dark:text-blue-300 dark:hover:bg-neutral-800"
        >
          {t("search.change")}
        </button>
        <button
          type="button"
          onClick={onClear}
          aria-label={t("search.clearDestination")}
          className={ICON_BUTTON}
        >
          <CloseIcon />
        </button>
      </div>
    );
  }

  if (!open) {
    /*
     * Zusammengeklappt nur eine kleine Schaltfläche oben links (auf Wunsch,
     * 2026-10-11). Vorher lief sie über die volle Breite und nahm damit so
     * viel Platz ein wie der Parkplatzvorschlag darüber – für eine
     * Möglichkeit, die die meisten gar nicht brauchen. `self-start` hält sie
     * schmal, obwohl die Spalte darüber streckt; die Trefferfläche bleibt
     * mit 44 px Höhe unverändert.
     */
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`${PANEL} flex min-h-11 w-auto max-w-full items-center gap-2 self-start px-3 text-left text-xs font-medium text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-100`}
      >
        <SearchIcon />
        {t("search.where")}
      </button>
    );
  }

  return (
    <div className={`${PANEL} p-2.5`}>
      <div className="flex items-center gap-2">
        <span aria-hidden="true" className="pl-1 text-neutral-400">
          <SearchIcon />
        </span>
        <input
          ref={inputRef}
          id={`${listId}-eingabe`}
          type="text"
          role="combobox"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={onKeyDown}
          placeholder={t("search.placeholder")}
          autoComplete="off"
          aria-label={t("search.inputLabel")}
          aria-expanded={shown.length > 0}
          aria-controls={`${listId}-liste`}
          aria-autocomplete="list"
          aria-activedescendant={active >= 0 ? `${listId}-option-${active}` : undefined}
          aria-describedby={`${listId}-status`}
          className="min-h-11 min-w-0 flex-1 bg-transparent text-base focus:outline-none"
        />
        {/*
          Eingabe löschen, ohne das Feld zu schließen.
          Vorher ging das nur über „alles markieren" oder langes Drücken der
          Rücktaste – auf einem Telefon einhändig kaum zu machen, und genau
          dann nötig, wenn die Treffer nicht passen und man neu ansetzt. Nur
          sichtbar, wenn etwas dasteht: ein Knopf ohne Wirkung ist schlechter
          als keiner.
        */}
        {query.length > 0 && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setResults([]);
              setActive(-1);
              setStatus("bereit");
              inputRef.current?.focus();
            }}
            aria-label={t("search.clearInput")}
            className={ICON_BUTTON}
          >
            <CloseIcon />
          </button>
        )}
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label={t("search.close")}
          className={`${ICON_BUTTON} border-l border-neutral-200 dark:border-neutral-700`}
        >
          <ChevronUpIcon />
        </button>
      </div>

      {/*
        Die Statuszeile nimmt nur Platz ein, wenn sie etwas zu sagen hat. Eine
        immer sichtbare leere Zeile machte die Leiste ohne Nutzen höher.
      */}
      {(status !== "bereit" || (query.trim().length > 0 && query.trim().length < MIN_CHARS)) && (
        <div className="mt-1 flex items-center gap-2 px-1">
          <p
            id={`${listId}-status`}
            aria-live="polite"
            className="min-w-0 flex-1 text-xs text-neutral-500"
          >
            {status === "sucht" && t("search.searching")}
            {status === "leer" && t("search.empty")}
            {status === "fehler" && t("search.unavailable")}
            {status === "bereit" && t("search.moreLetters")}
          </p>
          {/*
            Bei einem Fehler muss ein zweiter Versuch möglich sein, ohne einen
            Buchstaben zu löschen und neu zu tippen. Nominatim antwortet unter
            Last auch mal nicht – beim nächsten Versuch meist schon, und das
            ist dann die ganze Behebung.
          */}
          {status === "fehler" && (
            <button
              type="button"
              onClick={() => void search(query.trim())}
              className="min-h-11 shrink-0 rounded-lg border border-neutral-300 px-2.5 text-xs font-medium focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none dark:border-neutral-700"
            >
              {t("search.retry")}
            </button>
          )}
        </div>
      )}

      {shown.length > 0 && (
        <>
          {results.length === 0 && (
            <p className="px-1 pt-2 pb-0.5 text-[11px] font-medium tracking-wide text-neutral-500 uppercase">
              {t("search.recent")}
            </p>
          )}
          <ul
            id={`${listId}-liste`}
            role="listbox"
            aria-label={t("search.suggestions")}
            className="mt-1"
          >
            {shown.map((place, index) => (
              <li key={`${place.label}-${place.lat}-${place.lng}`}>
                <button
                  type="button"
                  id={`${listId}-option-${index}`}
                  role="option"
                  aria-selected={index === active}
                  onClick={() => choose(place)}
                  onMouseEnter={() => setActive(index)}
                  className={`min-h-12 w-full rounded-xl px-1.5 py-2 text-left text-sm transition-colors focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none ${
                    index === active
                      ? "bg-blue-50/80 dark:bg-blue-950/40"
                      : "hover:bg-neutral-100/70 dark:hover:bg-neutral-800/70"
                  }`}
                >
                  {/*
                    Beschriftung und Entfernung in einer Zeile. Die Entfernung
                    ist die Angabe, die zwischen zehn gleichnamigen Straßen
                    überhaupt erst entscheiden lässt – „Bahnhofstraße, 1,2 km"
                    gegen „Bahnhofstraße, 340 km". Ohne Bezugspunkt steht dort
                    nichts: Eine Entfernung ab der Stadtmitte wäre keine
                    Auskunft, sondern Zufall.
                  */}
                  <span className="flex items-baseline gap-2">
                    <span className="min-w-0 flex-1 truncate font-medium">{place.label}</span>
                    {origin && (
                      <span className="shrink-0 text-xs text-neutral-500 tabular-nums">
                        {formatDistance(distanceMeters(origin, place), locale)}
                      </span>
                    )}
                  </span>
                  {place.detail && (
                    <span className="block truncate text-xs text-neutral-500">{place.detail}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
