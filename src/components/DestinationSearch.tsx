"use client";

import { useEffect, useId, useRef, useState } from "react";
import { rememberPlace, readRecent, type Place } from "@/lib/geocode";

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
 */

interface DestinationSearchProps {
  /** Das aktuell gesetzte Ziel, falls eines gewählt wurde. */
  destination: Place | null;
  onChoose: (place: Place) => void;
  onClear: () => void;
}

/** Ab wann eine Suche überhaupt sinnvoll ist. */
const MIN_CHARS = 3;

/** Wie lange nach dem letzten Tastendruck gewartet wird. */
const IDLE_MS = 350;

/**
 * Antworten dieser Sitzung, nach Suchbegriff.
 *
 * Außerhalb der Komponente, damit sie ein Schließen und Öffnen des Feldes
 * überlebt – genau dann tippt man denselben Begriff nämlich erneut.
 */
const cache = new Map<string, Place[]>();

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

export function DestinationSearch({ destination, onChoose, onClear }: DestinationSearchProps) {
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

  useEffect(() => {
    const term = query.trim();

    if (term.length < MIN_CHARS) {
      setResults([]);
      setStatus("bereit");
      setActive(-1);
      return;
    }

    // Schon bekannt: sofort zeigen, ohne den Dienst zu fragen.
    const known = cache.get(term.toLowerCase());
    if (known) {
      setResults(known);
      setStatus(known.length === 0 ? "leer" : "bereit");
      setActive(-1);
      return;
    }

    const timer = setTimeout(async () => {
      setStatus("sucht");
      try {
        const response = await fetch(`/api/geocode?q=${encodeURIComponent(term)}`);
        const data = (await response.json()) as { places?: Place[]; error?: string };
        if (data.error) {
          setStatus("fehler");
          setResults([]);
          return;
        }
        const places = data.places ?? [];
        cache.set(term.toLowerCase(), places);
        setResults(places);
        setStatus(places.length === 0 ? "leer" : "bereit");
        setActive(-1);
      } catch {
        setStatus("fehler");
        setResults([]);
      }
    }, IDLE_MS);

    return () => clearTimeout(timer);
  }, [query]);

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
          <span className="text-neutral-500">Ziel: </span>
          <span className="font-medium">{destination.label}</span>
        </span>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="min-h-11 shrink-0 rounded-lg px-2.5 text-xs font-medium text-blue-800 transition-colors hover:bg-blue-50 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none dark:text-blue-300 dark:hover:bg-neutral-800"
        >
          Ändern
        </button>
        <button type="button" onClick={onClear} aria-label="Ziel aufheben" className={ICON_BUTTON}>
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
        Wohin willst du?
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
          placeholder="Adresse oder Ort"
          autoComplete="off"
          aria-label="Ziel: Adresse oder Ort"
          aria-expanded={shown.length > 0}
          aria-controls={`${listId}-liste`}
          aria-autocomplete="list"
          aria-activedescendant={active >= 0 ? `${listId}-option-${active}` : undefined}
          aria-describedby={`${listId}-status`}
          className="min-h-11 min-w-0 flex-1 bg-transparent text-base focus:outline-none"
        />
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Zielsuche schließen"
          className={ICON_BUTTON}
        >
          <CloseIcon />
        </button>
      </div>

      {/*
        Die Statuszeile nimmt nur Platz ein, wenn sie etwas zu sagen hat. Eine
        immer sichtbare leere Zeile machte die Leiste ohne Nutzen höher.
      */}
      {(status !== "bereit" || (query.trim().length > 0 && query.trim().length < MIN_CHARS)) && (
        <p
          id={`${listId}-status`}
          aria-live="polite"
          className="mt-1 px-1 text-xs text-neutral-500"
        >
          {status === "sucht" && "Wird gesucht …"}
          {status === "leer" && "Nichts gefunden. Anders schreiben oder Ort ergänzen."}
          {status === "fehler" && "Die Ortssuche ist gerade nicht erreichbar."}
          {status === "bereit" && "Noch ein paar Buchstaben …"}
        </p>
      )}

      {shown.length > 0 && (
        <>
          {results.length === 0 && (
            <p className="px-1 pt-2 pb-0.5 text-[11px] font-medium tracking-wide text-neutral-500 uppercase">
              Zuletzt gesucht
            </p>
          )}
          <ul id={`${listId}-liste`} role="listbox" aria-label="Vorschläge" className="mt-1">
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
                  <span className="block truncate font-medium">{place.label}</span>
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
