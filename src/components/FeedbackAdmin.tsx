"use client";

import { useCallback, useEffect, useState } from "react";
import type { ParkingSpot } from "@/lib/types";
import {
  FEEDBACK_STATUSES,
  KIND_LABELS,
  STATUS_LABELS,
  type FeedbackKind,
  type FeedbackStatus,
} from "@/lib/feedback";
import { formatDate } from "./DataDisclaimer";

/**
 * Übersicht der Rückmeldungen – nur für den Administrator (ToDo 17.4).
 *
 * **Der Zweck ist nicht Verwaltung, sondern Datenkorrektur.** Eine Meldung mit
 * Parkplatz-ID ist ein Hinweis auf einen falschen Datensatz; häufen sich
 * „existiert nicht mehr" zu einem Platz, gehört er geprüft (Abschnitt 3).
 * Deshalb führt jede Meldung mit Parkplatz direkt auf die Karte – ihn von Hand
 * zusammenzusuchen ist genau die Arbeit, an der eine Korrektur scheitert.
 *
 * Geschützt wird **serverseitig** (`/api/admin/feedback` antwortet ohne
 * Anmeldung mit 401). Dass diese Ansicht hier nicht gerendert wird, ist
 * Bequemlichkeit, keine Zugangsprüfung.
 */

interface FeedbackEntryView {
  id: number;
  kind: FeedbackKind;
  message: string;
  contactEmail: string | null;
  /** Gesetzt, wenn die Antwortadresse nach der Frist entfernt wurde (17.6). */
  contactRemovedAt?: string | null;
  accountEmail: string | null;
  spotId: string | null;
  city: string | null;
  url: string | null;
  userAgent: string | null;
  status: FeedbackStatus;
  note: string | null;
  createdAt: string;
  updatedAt: string | null;
}

interface Counts {
  neu: number;
  in_arbeit: number;
  umgesetzt: number;
  verworfen: number;
  gesamt: number;
}

interface FeedbackAdminProps {
  /** Einen gemeldeten Parkplatz auf der Karte zeigen. */
  onShowSpot: (spot: ParkingSpot) => void;
}

const STATUS_STYLE: Record<FeedbackStatus, string> = {
  neu: "bg-blue-100 text-blue-900 dark:bg-blue-950 dark:text-blue-200",
  in_arbeit: "bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200",
  umgesetzt: "bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200",
  verworfen: "bg-neutral-200 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300",
};

/** Zeitpunkt für die Anzeige – Datum und Uhrzeit, denn beides zählt hier. */
function formatMoment(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleString("de-DE", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function FeedbackAdmin({ onShowSpot }: FeedbackAdminProps) {
  const [entries, setEntries] = useState<FeedbackEntryView[]>([]);
  const [counts, setCounts] = useState<Counts | null>(null);
  const [kind, setKind] = useState<FeedbackKind | "alle">("alle");
  const [status, setStatus] = useState<FeedbackStatus | "alle">("alle");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (kind !== "alle") params.set("kind", kind);
      if (status !== "alle") params.set("status", status);

      const response = await fetch(`/api/admin/feedback?${params.toString()}`);
      if (response.status === 401) {
        setError("Nicht angemeldet oder keine Berechtigung.");
        setEntries([]);
        return;
      }
      if (!response.ok) {
        setError("Die Rückmeldungen konnten nicht geladen werden.");
        return;
      }
      const data = (await response.json()) as { entries: FeedbackEntryView[]; counts: Counts };
      setEntries(data.entries);
      setCounts(data.counts);
    } catch {
      setError("Keine Verbindung.");
    } finally {
      setLoading(false);
    }
  }, [kind, status]);

  useEffect(() => {
    void load();
  }, [load]);

  /**
   * Stand ändern.
   *
   * Die Liste wird danach neu geholt statt im Browser nachgebessert: Bei einem
   * gesetzten Filter wandert der Eintrag unter Umständen heraus, und eine
   * Zeile, die laut Anzeige „umgesetzt" ist, aber im Filter „neu" noch steht,
   * wäre eine falsche Auskunft über den eigenen Datenstand.
   */
  const setEntryStatus = async (id: number, next: FeedbackStatus) => {
    const response = await fetch(`/api/admin/feedback/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
    if (!response.ok) {
      setError("Ändern hat nicht geklappt.");
      return;
    }
    await load();
  };

  const saveNote = async (id: number, note: string) => {
    const response = await fetch(`/api/admin/feedback/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ note: note.trim() === "" ? null : note }),
    });
    if (!response.ok) setError("Die Notiz konnte nicht gespeichert werden.");
    else await load();
  };

  /**
   * Löschen ist endgültig, deshalb wird gefragt.
   *
   * Eine Meldung ist der einzige Hinweis, den es auf diesen Fehler gibt – ein
   * Fehlgriff auf dem Telefon soll ihn nicht vernichten.
   */
  const remove = async (entry: FeedbackEntryView) => {
    const vorschau = entry.message.slice(0, 80);
    if (!window.confirm(`Meldung #${entry.id} endgültig löschen?\n\n„${vorschau}…“`)) return;

    const response = await fetch(`/api/admin/feedback/${entry.id}`, { method: "DELETE" });
    if (!response.ok) {
      setError("Löschen hat nicht geklappt.");
      return;
    }
    await load();
  };

  /** Den gemeldeten Parkplatz holen und auf der Karte zeigen. */
  const showSpot = async (spotId: string) => {
    try {
      const response = await fetch(`/api/spots?id=${encodeURIComponent(spotId)}`);
      if (!response.ok) {
        setError(`Den Parkplatz ${spotId} gibt es nicht mehr im Bestand.`);
        return;
      }
      const data = (await response.json()) as { spot: ParkingSpot };
      onShowSpot(data.spot);
    } catch {
      setError("Keine Verbindung.");
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-base font-semibold">Rückmeldungen</h2>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
          {counts
            ? `${counts.gesamt} ${counts.gesamt === 1 ? "Meldung" : "Meldungen"}, ` +
              `davon ${counts.neu} neu und ${counts.umgesetzt} umgesetzt.`
            : "…"}
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <div>
          <label htmlFor="filter-art" className="block text-xs text-neutral-500 uppercase">
            Art
          </label>
          <select
            id="filter-art"
            value={kind}
            onChange={(event) => setKind(event.target.value as FeedbackKind | "alle")}
            className="mt-1 min-h-11 rounded-lg border border-neutral-300 bg-white px-2 text-sm dark:border-neutral-700 dark:bg-neutral-950"
          >
            <option value="alle">Alle</option>
            <option value="fehler">{KIND_LABELS.fehler}</option>
            <option value="vorschlag">{KIND_LABELS.vorschlag}</option>
          </select>
        </div>
        <div>
          <label htmlFor="filter-stand" className="block text-xs text-neutral-500 uppercase">
            Stand
          </label>
          <select
            id="filter-stand"
            value={status}
            onChange={(event) => setStatus(event.target.value as FeedbackStatus | "alle")}
            className="mt-1 min-h-11 rounded-lg border border-neutral-300 bg-white px-2 text-sm dark:border-neutral-700 dark:bg-neutral-950"
          >
            <option value="alle">Alle</option>
            {FEEDBACK_STATUSES.map((option) => (
              <option key={option} value={option}>
                {STATUS_LABELS[option]}
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          onClick={() => void load()}
          className="mt-5 min-h-11 rounded-lg border border-neutral-300 px-3 text-sm font-medium focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none dark:border-neutral-700"
        >
          Neu laden
        </button>
      </div>

      {error && (
        <p
          role="alert"
          className="rounded-lg bg-red-50 p-3 text-sm text-red-800 dark:bg-red-950 dark:text-red-200"
        >
          {error}
        </p>
      )}

      {loading && <p className="text-sm text-neutral-500">Wird geladen …</p>}

      {!loading && entries.length === 0 && !error && (
        <p className="rounded-xl border border-neutral-200 p-4 text-sm text-neutral-500 dark:border-neutral-800">
          Keine Meldungen – mit diesem Filter jedenfalls.
        </p>
      )}

      <ul className="space-y-3">
        {entries.map((entry) => (
          <li
            key={entry.id}
            className="rounded-xl border border-neutral-200 p-3 dark:border-neutral-800"
          >
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="rounded bg-neutral-100 px-1.5 py-0.5 font-medium dark:bg-neutral-800">
                {KIND_LABELS[entry.kind]}
              </span>
              <span className={`rounded px-1.5 py-0.5 font-medium ${STATUS_STYLE[entry.status]}`}>
                {STATUS_LABELS[entry.status]}
              </span>
              <span className="text-neutral-500">#{entry.id}</span>
              <span className="text-neutral-500">{formatMoment(entry.createdAt)}</span>
            </div>

            <p className="mt-2 text-sm whitespace-pre-wrap">{entry.message}</p>

            <dl className="mt-2 space-y-0.5 text-xs text-neutral-500">
              {entry.contactEmail && (
                <div className="flex gap-2">
                  <dt>Antwort an</dt>
                  <dd>
                    {/*
                      Ein `mailto:`-Link – hier ist er richtig, anders als im
                      Formular: Der Administrator sitzt an einem Gerät mit
                      Mailprogramm, und die Adresse ist ihm schon bekannt.
                    */}
                    <a href={`mailto:${entry.contactEmail}`} className="underline">
                      {entry.contactEmail}
                    </a>
                  </dd>
                </div>
              )}
              {/*
                Stand hier einmal eine Adresse und ist sie nach der Frist
                entfernt worden, muss das dastehen (ToDo 17.6). Sonst sieht die
                Meldung aus wie eine ohne Adresse – und der Unterschied ist
                genau der, auf den es ankommt: Hier wollte jemand eine Antwort.
              */}
              {!entry.contactEmail && entry.contactRemovedAt && (
                <div className="flex gap-2">
                  <dt>Antwort an</dt>
                  <dd>
                    Adresse nach zwei Jahren entfernt ({formatMoment(entry.contactRemovedAt)}) – die
                    Meldung blieb so lange unbearbeitet.
                  </dd>
                </div>
              )}
              {entry.accountEmail && (
                <div className="flex gap-2">
                  <dt>Konto</dt>
                  <dd>{entry.accountEmail}</dd>
                </div>
              )}
              {entry.city && (
                <div className="flex gap-2">
                  <dt>Stadt</dt>
                  <dd>{entry.city}</dd>
                </div>
              )}
              {entry.userAgent && (
                <div className="flex gap-2">
                  <dt>Browser</dt>
                  <dd className="truncate">{entry.userAgent}</dd>
                </div>
              )}
              {entry.updatedAt && (
                <div className="flex gap-2">
                  <dt>Geändert</dt>
                  <dd>{formatDate(entry.updatedAt.slice(0, 10))}</dd>
                </div>
              )}
            </dl>

            <div className="mt-2 flex flex-wrap gap-1.5">
              {entry.spotId && (
                <button
                  type="button"
                  onClick={() => void showSpot(entry.spotId!)}
                  className="min-h-11 rounded-lg border border-neutral-300 px-2.5 text-sm font-medium focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none dark:border-neutral-700"
                >
                  Parkplatz auf der Karte
                </button>
              )}
              {entry.status !== "umgesetzt" ? (
                <button
                  type="button"
                  onClick={() => void setEntryStatus(entry.id, "umgesetzt")}
                  className="min-h-11 rounded-lg bg-emerald-700 px-2.5 text-sm font-medium text-white focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none"
                >
                  Als umgesetzt markieren
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => void setEntryStatus(entry.id, "neu")}
                  className="min-h-11 rounded-lg border border-neutral-300 px-2.5 text-sm font-medium focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none dark:border-neutral-700"
                >
                  Wieder auf „neu“
                </button>
              )}
              {entry.status !== "verworfen" && (
                <button
                  type="button"
                  onClick={() => void setEntryStatus(entry.id, "verworfen")}
                  className="min-h-11 rounded-lg border border-neutral-300 px-2.5 text-sm font-medium focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none dark:border-neutral-700"
                >
                  Verwerfen
                </button>
              )}
              <button
                type="button"
                onClick={() => void remove(entry)}
                className="min-h-11 rounded-lg px-2.5 text-sm font-medium text-red-700 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none dark:text-red-400"
              >
                Löschen
              </button>
            </div>

            <NoteField
              id={entry.id}
              note={entry.note}
              onSave={(note) => void saveNote(entry.id, note)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Die interne Notiz.
 *
 * Eigene Komponente, damit das Tippen nicht die ganze Liste neu rendert – und
 * damit ein Neuladen der Liste eine halb geschriebene Notiz nicht verwirft.
 * Gespeichert wird erst auf Knopfdruck: Ein Feld, das bei jedem Zeichen
 * speichert, schickt dreißig Anfragen für einen Satz.
 */
function NoteField({
  id,
  note,
  onSave,
}: {
  id: number;
  note: string | null;
  onSave: (note: string) => void;
}) {
  const [value, setValue] = useState(note ?? "");
  const [open, setOpen] = useState(false);

  if (!open && (note === null || note.length === 0)) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-2 min-h-11 text-sm font-medium text-blue-800 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none dark:text-blue-300"
      >
        Notiz hinzufügen
      </button>
    );
  }

  return (
    <div className="mt-2">
      <label htmlFor={`notiz-${id}`} className="text-xs text-neutral-500 uppercase">
        Interne Notiz
      </label>
      <textarea
        id={`notiz-${id}`}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        rows={2}
        className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-2 py-1.5 text-sm dark:border-neutral-700 dark:bg-neutral-950"
      />
      <button
        type="button"
        onClick={() => {
          onSave(value);
          setOpen(false);
        }}
        className="mt-1 min-h-11 rounded-lg border border-neutral-300 px-2.5 text-sm font-medium focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none dark:border-neutral-700"
      >
        Notiz speichern
      </button>
    </div>
  );
}
