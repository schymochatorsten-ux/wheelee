"use client";

import { useRef, useState } from "react";
import type { ParkingSpot } from "@/lib/types";
import { spotTitle } from "@/lib/parking/display";
import { deviceId } from "@/lib/device";
import {
  CONTACT_HINT,
  CONTACT_PRIVACY,
  KIND_LABELS,
  MESSAGE_MAX,
  validateFeedback,
  type FeedbackKind,
} from "@/lib/feedback";

/**
 * Das Formular für Fehlermeldungen und Verbesserungsvorschläge (ToDo 17.3).
 *
 * Es ersetzt den `mailto:`-Knopf. Der Unterschied, auf den es ankommt: Hier
 * **steht am Ende eine Bestätigung in der App**. Der alte Weg endete im
 * Mailprogramm und ließ offen, ob überhaupt etwas angekommen ist – auf einem
 * Telefon ohne eingerichtetes Mailkonto passierte beim Antippen gar nichts.
 */

interface FeedbackFormProps {
  /** Betroffener Parkplatz, falls die Meldung aus der Detailansicht kommt. */
  spot?: ParkingSpot | null;
  /** Adresse des angemeldeten Kontos, als Vorbelegung. */
  accountEmail?: string | null;
  /** Vorauswahl der Art, wenn der Einstieg sie schon kennt. */
  initialKind?: FeedbackKind;
  /** Wird nach erfolgreichem Absenden gerufen, etwa um das Fenster zu schließen. */
  onDone?: () => void;
}

const FIELD =
  "min-h-11 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-base focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none dark:border-neutral-700 dark:bg-neutral-950";

export function FeedbackForm({
  spot = null,
  accountEmail = null,
  initialKind,
  onDone,
}: FeedbackFormProps) {
  const [kind, setKind] = useState<FeedbackKind | null>(initialKind ?? null);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState(accountEmail ?? "");
  const [sending, setSending] = useState(false);
  const [problem, setProblem] = useState<{ field: string; error: string } | null>(null);
  /** Nach dem Absenden: Hat die Meldung eine Adresse für die Antwort? */
  const [sent, setSent] = useState<{ willReply: boolean } | null>(null);

  const messageRef = useRef<HTMLTextAreaElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (sending) return;

    setProblem(null);

    /*
     * Dieselbe Prüfung wie auf dem Server, aus demselben Modul. Hier ist sie
     * eine Höflichkeit – der Hinweis steht sofort am Feld, ohne Wartezeit und
     * ohne Anfrage ins Funkloch. Verlassen wird sich darauf nicht: Der Server
     * prüft noch einmal, und nur das ist die eigentliche Prüfung.
     */
    const check = validateFeedback({
      kind: kind ?? "",
      message,
      contactEmail: email.trim() === "" ? null : email,
    });
    if (!check.ok) {
      setProblem({ field: check.field, error: check.error });
      if (check.field === "contactEmail") emailRef.current?.focus();
      else if (check.field === "message") messageRef.current?.focus();
      return;
    }

    setSending(true);

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind,
          message,
          contactEmail: email.trim() === "" ? null : email,
          spotId: spot?.id ?? null,
          city: spot?.city ?? null,
          url: window.location.href,
          userAgent: navigator.userAgent,
          deviceId: deviceId(),
        }),
      });

      const data = (await response.json()) as {
        ok?: boolean;
        willReply?: boolean;
        field?: string;
        error?: string;
      };

      if (!response.ok || !data.ok) {
        setProblem({
          field: data.field ?? "message",
          error: data.error ?? "Das hat nicht geklappt. Bitte später erneut versuchen.",
        });
        // Den Fokus dorthin, wo der Mangel sitzt – sonst muss man ihn suchen.
        if (data.field === "contactEmail") emailRef.current?.focus();
        else messageRef.current?.focus();
        return;
      }

      setSent({ willReply: data.willReply === true });
    } catch {
      setProblem({
        field: "message",
        // Der Fall ist hier wahrscheinlicher als sonst: Wer vor einem
        // aufgehobenen Parkplatz steht, steht oft im Funkloch.
        error: "Keine Verbindung. Die Meldung ist nicht abgeschickt – bitte später erneut.",
      });
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div
        role="status"
        className="rounded-xl bg-emerald-50 p-4 text-sm text-emerald-900 dark:bg-emerald-950 dark:text-emerald-100"
      >
        <p className="font-semibold">Danke – die Meldung ist angekommen.</p>
        <p className="mt-1">
          {sent.willReply
            ? "Wir sehen sie uns an und melden uns per E-Mail, wenn es etwas zu sagen gibt."
            : "Du hast keine Adresse angegeben, deshalb bekommst du keine Antwort – deine Meldung hilft trotzdem."}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              setSent(null);
              setKind(null);
              setMessage("");
            }}
            className="min-h-11 rounded-lg border border-emerald-700/40 px-3 font-medium focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none"
          >
            Noch etwas melden
          </button>
          {onDone && (
            <button
              type="button"
              onClick={onDone}
              className="min-h-11 rounded-lg bg-emerald-700 px-3 font-medium text-white focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none"
            >
              Fertig
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      {/*
        Zwei Schaltflächen, kein Auswahlmenü. Es sind genau zwei Möglichkeiten,
        und sie unterscheiden sich im Ton: Wer einen falschen Parkplatz meldet,
        ist in Eile; wer einen Vorschlag schreibt, nimmt sich Zeit. Ein Menü
        verlangt erst einen Griff, um das zu zeigen.
      */}
      <fieldset>
        <legend className="text-sm font-medium">Worum geht es?</legend>
        <div role="radiogroup" aria-label="Art der Rückmeldung" className="mt-2 flex gap-2">
          {(Object.keys(KIND_LABELS) as FeedbackKind[]).map((option) => (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={kind === option}
              onClick={() => {
                setKind(option);
                setProblem(null);
              }}
              className={`min-h-11 flex-1 rounded-lg border px-3 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none ${
                kind === option
                  ? "border-blue-700 bg-blue-700 text-white"
                  : "border-neutral-300 dark:border-neutral-700"
              }`}
            >
              {KIND_LABELS[option]}
            </button>
          ))}
        </div>
        {problem?.field === "kind" && (
          <p role="alert" className="mt-1 text-sm text-red-700 dark:text-red-400">
            {problem.error}
          </p>
        )}
      </fieldset>

      {/* Aus der Detailansicht heraus ist klar, worum es geht – das muss man
          nicht noch einmal tippen, und es darf auch nicht falsch sein. */}
      {spot && (
        <p className="rounded-lg bg-neutral-100 px-3 py-2 text-sm dark:bg-neutral-800">
          <span className="text-neutral-500">Meldung zu: </span>
          <span className="font-medium">{spotTitle(spot)}</span>
        </p>
      )}

      <div>
        <label htmlFor="feedback-text" className="text-sm font-medium">
          {kind === "vorschlag" ? "Dein Vorschlag" : "Was stimmt nicht?"}
        </label>
        <textarea
          id="feedback-text"
          ref={messageRef}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          maxLength={MESSAGE_MAX}
          rows={5}
          required
          aria-invalid={problem?.field === "message" || undefined}
          aria-describedby="feedback-text-hilfe"
          placeholder={
            kind === "vorschlag"
              ? "Zum Beispiel: Die Umkreiswahl hätte gern 2 km."
              : "Zum Beispiel: Der Parkplatz Bahnhofstraße 4 ist aufgehoben, dort ist jetzt eine Ladesäule."
          }
          className={`${FIELD} mt-1 min-h-32 resize-y`}
        />
        <p id="feedback-text-hilfe" className="mt-1 text-xs text-neutral-500">
          {problem?.field === "message" ? (
            <span role="alert" className="font-medium text-red-700 dark:text-red-400">
              {problem.error}
            </span>
          ) : (
            `Noch ${(MESSAGE_MAX - message.length).toLocaleString("de-DE")} Zeichen möglich.`
          )}
        </p>
      </div>

      <div>
        <label htmlFor="feedback-email" className="text-sm font-medium">
          E-Mail-Adresse <span className="font-normal text-neutral-500">(freiwillig)</span>
        </label>
        {/*
          Der Hinweis steht **über** dem Feld, nicht darunter: Er soll die
          Entscheidung beeinflussen, ob man die Adresse angibt, und nicht erst
          erklären, was man gerade getan hat.
        */}
        <p
          id="feedback-email-hilfe"
          className="mt-1 text-xs text-neutral-600 dark:text-neutral-400"
        >
          {CONTACT_HINT}
        </p>
        <input
          id="feedback-email"
          ref={emailRef}
          type="email"
          inputMode="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          aria-invalid={problem?.field === "contactEmail" || undefined}
          aria-describedby="feedback-email-hilfe feedback-email-datenschutz"
          placeholder="name@beispiel.de"
          className={`${FIELD} mt-1.5`}
        />
        <p id="feedback-email-datenschutz" className="mt-1 text-xs text-neutral-500">
          {problem?.field === "contactEmail" ? (
            <span role="alert" className="font-medium text-red-700 dark:text-red-400">
              {problem.error}
            </span>
          ) : (
            CONTACT_PRIVACY
          )}
        </p>
        {accountEmail && email === accountEmail && (
          <p className="mt-1 text-xs text-neutral-500">Aus deinem Konto übernommen.</p>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="submit"
          disabled={sending}
          className="min-h-12 flex-1 rounded-xl bg-blue-700 px-4 font-medium text-white hover:bg-blue-800 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:outline-none disabled:opacity-60"
        >
          {sending ? "Wird gesendet …" : "Absenden"}
        </button>
        {onDone && (
          <button
            type="button"
            onClick={onDone}
            className="min-h-12 rounded-xl border border-neutral-300 px-4 font-medium focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none dark:border-neutral-700"
          >
            Abbrechen
          </button>
        )}
      </div>
    </form>
  );
}
