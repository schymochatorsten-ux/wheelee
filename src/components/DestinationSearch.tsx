"use client";

import { useEffect, useId, useRef, useState } from "react";
import { rememberPlace, readRecent, type Place } from "@/lib/geocode";

/**
 * Ziel eingeben und dort parken (ToDo 6.12).
 *
 * Die wichtigste fehlende Funktion: Bisher beantwortete die App nur „wo parke
 * ich hier". Wer zum Arzt, zum Amt oder zu Besuch fährt, will **vor** der
 * Abfahrt wissen, wo am Ziel ein Platz ist – nachher ist es zu spät.
 */

interface DestinationSearchProps {
  /** Das aktuell gesetzte Ziel, falls eines gewählt wurde. */
  destination: Place | null;
  onChoose: (place: Place) => void;
  onClear: () => void;
}

export function DestinationSearch({ destination, onChoose, onClear }: DestinationSearchProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Place[]>([]);
  const [recent, setRecent] = useState<Place[]>([]);
  const [status, setStatus] = useState<"bereit" | "sucht" | "leer" | "fehler">("bereit");
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = useId();

  useEffect(() => {
    setRecent(readRecent());
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Erst tippen lassen, dann suchen: Eine Anfrage je Tastendruck wäre
  // Missbrauch eines kostenlos betriebenen Dienstes.
  useEffect(() => {
    const term = query.trim();
    if (term.length < 3) {
      setResults([]);
      setStatus("bereit");
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
        setResults(data.places ?? []);
        setStatus((data.places ?? []).length === 0 ? "leer" : "bereit");
      } catch {
        setStatus("fehler");
        setResults([]);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const choose = (place: Place) => {
    setRecent(rememberPlace(place));
    setQuery("");
    setResults([]);
    setOpen(false);
    onChoose(place);
  };

  if (destination && !open) {
    return (
      <div className="pointer-events-auto flex items-center gap-2 rounded-xl bg-white/95 p-2 shadow-lg backdrop-blur dark:bg-neutral-900/95">
        <span className="min-w-0 flex-1 truncate text-sm">
          <span className="text-xs text-neutral-500">Ziel</span>
          <span className="block truncate font-medium">{destination.label}</span>
        </span>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="min-h-11 shrink-0 rounded-lg px-3 text-sm font-medium text-blue-800 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none dark:text-blue-300"
        >
          Ändern
        </button>
        <button
          type="button"
          onClick={onClear}
          aria-label="Ziel aufheben"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-xl text-neutral-500 hover:bg-neutral-100 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none dark:hover:bg-neutral-800"
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>
    );
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="pointer-events-auto flex min-h-11 w-full items-center gap-2 rounded-xl bg-white/95 px-3 text-left text-sm text-neutral-600 shadow-lg backdrop-blur focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none dark:bg-neutral-900/95 dark:text-neutral-400"
      >
        <span aria-hidden="true">🔎</span>
        Wohin willst du? Parkplatz am Ziel suchen
      </button>
    );
  }

  return (
    <div className="pointer-events-auto rounded-xl bg-white/95 p-3 shadow-lg backdrop-blur dark:bg-neutral-900/95">
      <label htmlFor={`${listId}-eingabe`} className="text-xs text-neutral-500">
        Ziel: Adresse oder Ort
      </label>
      <div className="mt-1 flex gap-2">
        <input
          ref={inputRef}
          id={`${listId}-eingabe`}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Escape") setOpen(false);
          }}
          placeholder="z. B. Klinikum Mitte, Bahnhofstraße 5"
          autoComplete="off"
          aria-describedby={`${listId}-status`}
          className="min-h-11 min-w-0 flex-1 rounded-lg border border-neutral-300 px-3 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none dark:border-neutral-700 dark:bg-neutral-800"
        />
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="min-h-11 shrink-0 rounded-lg border border-neutral-300 px-3 text-sm font-medium focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none dark:border-neutral-700"
        >
          Abbrechen
        </button>
      </div>

      <p id={`${listId}-status`} aria-live="polite" className="mt-1 text-xs text-neutral-500">
        {status === "sucht" && "Wird gesucht …"}
        {status === "leer" && "Nichts gefunden. Anders schreiben oder Ort ergänzen."}
        {status === "fehler" && "Die Ortssuche ist gerade nicht erreichbar."}
        {status === "bereit" &&
          query.trim().length > 0 &&
          query.trim().length < 3 &&
          "Noch ein paar Buchstaben …"}
      </p>

      {(results.length > 0 || (query.length === 0 && recent.length > 0)) && (
        <ul className="mt-1 divide-y divide-neutral-200 dark:divide-neutral-800">
          {query.length === 0 && (
            <li className="pt-1 pb-0.5 text-xs text-neutral-500">Zuletzt gesucht</li>
          )}
          {(results.length > 0 ? results : recent).map((place) => (
            <li key={`${place.label}-${place.lat}-${place.lng}`}>
              <button
                type="button"
                onClick={() => choose(place)}
                className="min-h-12 w-full py-2 text-left text-sm focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none"
              >
                <span className="block font-medium">{place.label}</span>
                {place.detail && (
                  <span className="block text-xs text-neutral-500">{place.detail}</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
