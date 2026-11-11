"use client";

import { useId } from "react";

/**
 * Die Bausteine der Oberfläche nach dem Vorbild der Apple-Systemapps
 * („Inset Grouped List", wie in iOS-Einstellungen).
 *
 * **Warum eine eigene Bausteinsammlung und nicht Klassen je Komponente.**
 * Bis hierher trug jeder Einstellungsblock seine eigene Form (`SettingsSection`
 * mit Rahmen und Erklärungssatz), und jede Wahl bestand aus einer Liste von
 * Radioknöpfen mit vollständigem Satz daneben. Das ist bedienbar, aber es ist
 * nicht die Form, die auf einem Telefon gelernt ist: Dort steht **eine Zeile je
 * Einstellung**, links die Sache, rechts ihr Zustand – und der erklärende Satz
 * steht klein **unter** der Gruppe, wo er niemanden beim Bedienen aufhält.
 *
 * Drei Regeln, die hier stecken und für die ganze App gelten sollen:
 *
 * 1. **Die Zeile ist das Bedienelement**, nicht ein Kästchen in der Zeile. Sie
 *    ist mindestens 44 px hoch (9.5) und auf ihrer ganzen Breite zu treffen.
 * 2. **Zwei Zustände sind ein Schalter, nicht zwei Felder.** Ein Schalter sagt
 *    seinen Zustand selbst; zwei Felder verlangen, beide Beschriftungen zu
 *    lesen, um ihn zu erkennen.
 * 3. **Beschreibungen sind Fußnoten.** Was ohnehin klar ist, wird nicht
 *    erklärt. Was erklärt werden muss, steht klein unter der Gruppe.
 *
 * **Barrierefreiheit bleibt, was sie war.** Der Schalter ist ein echtes
 * `role="switch"`, die Auswahlzeile ein echtes `<select>` (nur unsichtbar über
 * der Zeile), die Gruppenüberschrift ein `<h2>` mit `aria-labelledby`. Die
 * Form ist neu, der Baum darunter nicht – `e2e/zugaenglichkeit.spec.ts` prüft
 * das in beiden Darstellungen.
 */

/** Eine Gruppe von Zeilen mit Überschrift darüber und Fußnote darunter. */
export function ListGroup({
  title,
  footer,
  aside,
  clip = true,
  children,
}: {
  /** Kurz, ein bis zwei Wörter. Steht klein und gesperrt über der Gruppe. */
  title: string;
  /** Die Fußnote: ein knapper Satz, oder nichts. */
  footer?: React.ReactNode;
  /** Zustand rechts neben der Überschrift, etwa „Der Versand läuft“. */
  aside?: React.ReactNode;
  /**
   * Die Ecken schneiden den Inhalt zu. **Für eine Gruppe, aus der etwas
   * herausragen muss, `false`** – das Rückmeldeformular etwa liegt als Blatt
   * über der Seite und war beschnitten unbedienbar (gefunden von
   * `e2e/rueckmeldungen.spec.ts`, nicht beim Draufschauen).
   */
  clip?: boolean;
  children: React.ReactNode;
}) {
  // `useId`, damit zwei Gruppen mit gleichem Titel nicht dieselbe ID tragen –
  // eine doppelte ID macht `aria-labelledby` für Screenreader unbrauchbar.
  const headingId = useId();

  return (
    <section aria-labelledby={headingId}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 px-4">
        <h2
          id={headingId}
          className="text-xs font-semibold tracking-wide text-neutral-600 uppercase dark:text-neutral-400"
        >
          {title}
        </h2>
        {aside}
      </div>
      <div
        className={`mt-1.5 rounded-2xl border border-neutral-200/70 bg-white/80 shadow-sm backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/60 ${clip ? "overflow-hidden" : ""}`}
      >
        {/*
          Die Trennlinie sitzt zwischen den Zeilen und nicht um sie herum: So
          beginnt sie wie in den Systemapps erst hinter der Beschriftung und
          die Gruppe bleibt ein Block.
        */}
        <div className="divide-y divide-neutral-200/70 dark:divide-neutral-800">{children}</div>
      </div>
      {footer ? (
        <p className="mt-1.5 px-4 text-xs leading-snug text-neutral-600 dark:text-neutral-400">
          {footer}
        </p>
      ) : null}
    </section>
  );
}

/**
 * Eine Zeile: links die Beschriftung, rechts der Zustand oder das
 * Bedienelement.
 *
 * `children` statt `control`, damit auch etwas Mehrzeiliges in eine Zeile kann
 * (die Liste der mitgenommenen Städte etwa). Ohne Beschriftung füllt es die
 * ganze Breite – dann ist die Zeile nur ein Fach, kein Paar.
 */
export function Row({
  label,
  detail,
  children,
  className,
}: {
  label?: React.ReactNode;
  /** Zweite Zeile unter der Beschriftung, klein und grau. */
  detail?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex min-h-12 items-center gap-3 px-4 py-2 ${className ?? ""}`.trimEnd()}>
      {label !== undefined ? (
        <div className="min-w-0 flex-1">
          <div className="text-[15px]">{label}</div>
          {detail ? (
            <div className="mt-0.5 text-xs text-neutral-600 dark:text-neutral-400">{detail}</div>
          ) : null}
        </div>
      ) : null}
      {children !== undefined ? (
        <div className={label === undefined ? "w-full" : "shrink-0"}>{children}</div>
      ) : null}
    </div>
  );
}

/**
 * Der Schalter – ein Zustand, kein Paar aus zwei Feldern.
 *
 * `role="switch"` und nicht eine Kiste aus `div`s: Ein Screenreader soll „ein“
 * oder „aus“ ansagen, und die Leertaste muss umschalten. Die Bewegung des
 * Knopfes entfällt bei `prefers-reduced-motion` (9.6) – dafür sorgt die
 * `motion-safe`-Variante.
 */
export function Switch({
  checked,
  onChange,
  label,
  id,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  /** Für Screenreader, wenn die Zeile die sichtbare Beschriftung trägt. */
  label: string;
  id?: string;
}) {
  return (
    <button
      type="button"
      id={id}
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-[31px] w-[51px] shrink-0 items-center rounded-full focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:outline-none motion-safe:transition-colors ${
        checked ? "bg-blue-700" : "bg-neutral-300 dark:bg-neutral-700"
      }`}
    >
      <span
        aria-hidden="true"
        className={`absolute top-[2px] left-[2px] h-[27px] w-[27px] rounded-full bg-white shadow motion-safe:transition-transform ${
          checked ? "translate-x-[20px]" : "translate-x-0"
        }`}
      />
    </button>
  );
}

/**
 * Eine Auswahlzeile: rechts steht der gewählte Wert, dahinter das Zeichen für
 * „hier geht ein Menü auf“.
 *
 * **Das echte `<select>` liegt unsichtbar über der ganzen Zeile.** Damit öffnet
 * das Telefon sein eigenes Auswahlrad und der Rechner sein Menü – beides
 * bedienbar mit Tastatur, Screenreader und Sprachsteuerung, ohne dass hier ein
 * Menü nachgebaut wird. Nachgebaute Menüs sind der häufigste Weg, Bedienbarkeit
 * zu verlieren; und die Tests, die `selectOption` benutzen, bleiben gültig.
 */
export function SelectRow<T extends string>({
  label,
  value,
  options,
  onChange,
  id,
  ariaLabel,
}: {
  label: string;
  value: T;
  options: readonly { value: T; label: string; lang?: string }[];
  onChange: (next: T) => void;
  id?: string;
  /** Beschriftung für das Auswahlfeld selbst, falls sie abweicht. */
  ariaLabel?: string;
}) {
  const shown = options.find((option) => option.value === value);

  return (
    // Der Fokus liegt auf dem unsichtbaren Feld; sichtbar machen muss ihn
    // deshalb die Zeile (`focus-within`), sonst sieht man bei Tastaturbedienung
    // gar nichts.
    <div className="relative flex min-h-12 items-center gap-3 px-4 py-2 focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-inset">
      <span className="min-w-0 flex-1 text-[15px]">{label}</span>
      <span className="flex shrink-0 items-center gap-1 text-[15px] text-neutral-600 dark:text-neutral-400">
        <span lang={shown?.lang}>{shown?.label ?? ""}</span>
        <Chevron />
      </span>
      {/*
        **Unsichtbar allein über `opacity`, nicht über `text-transparent`**
        (gemeldet am 2026-11-11: Im aufgeklappten Menü war nur die Zeile zu
        lesen, über der die Maus stand). Das Menü zeichnet der Browser selbst,
        außerhalb der Seite – die Deckkraft des Feldes gilt dort nicht, seine
        **Schriftfarbe** aber schon. Durchsichtige Schrift hieß: unsichtbare
        Einträge, sichtbar nur der hervorgehobene, der die Farbe des Systems
        bekommt. Die Farben stehen deshalb ausdrücklich am Feld und an jedem
        Eintrag.
      */}
      <select
        id={id}
        aria-label={ariaLabel ?? label}
        value={value}
        onChange={(event) => onChange(event.target.value as T)}
        className="absolute inset-0 h-full w-full cursor-pointer appearance-none bg-white text-neutral-900 opacity-0 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none dark:bg-neutral-900 dark:text-neutral-100"
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            lang={option.lang}
            className="bg-white text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100"
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

/** Das Winkelzeichen der Systemapps („auf, ab“ bzw. „weiter“). */
export function Chevron({ direction = "updown" }: { direction?: "updown" | "right" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 12 20"
      className="h-3.5 w-2.5 text-neutral-400"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {direction === "updown" ? (
        <>
          <path d="M2 8l4-4 4 4" />
          <path d="M2 12l4 4 4-4" />
        </>
      ) : (
        <path d="M3 4l5 6-5 6" />
      )}
    </svg>
  );
}

/**
 * Der Segmentschalter für wenige, gleichrangige Stellungen (Hell, Dunkel,
 * System). Für mehr als vier Stellungen ist `SelectRow` richtig – ein
 * Segmentschalter wird dann auf dem Telefon unlesbar schmal.
 */
export function Segmented<T extends string>({
  value,
  options,
  onChange,
  label,
}: {
  value: T | null;
  options: readonly { value: T; label: string }[];
  onChange: (next: T) => void;
  label: string;
}) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className="flex w-full gap-0.5 rounded-xl bg-neutral-200/80 p-0.5 text-[13px] font-medium dark:bg-neutral-800/80"
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={value === option.value}
          onClick={() => onChange(option.value)}
          className={`min-h-9 flex-1 rounded-[0.6rem] px-2 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none motion-safe:transition-colors ${
            value === option.value
              ? // Im Dunkelmodus die dunklere Fläche – die Grauwerte sind in
                // `globals.css` gedreht, helles Grau trüge weiße Schrift nur
                // mit 2,6 : 1 (9.7 verlangt 4,5 : 1).
                "bg-white text-neutral-900 shadow-sm dark:bg-neutral-950 dark:text-white"
              : "text-neutral-700 dark:text-neutral-300"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
