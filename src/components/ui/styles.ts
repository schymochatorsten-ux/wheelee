/**
 * Die Formen, die in der ganzen App gelten (ToDo 9.31) – Felder und Knöpfe
 * nach dem Vorbild der Apple-Systemapps.
 *
 * **Warum als gemeinsame Zeichenketten und nicht je Komponente.** Vor diesem
 * Schritt trug fast jede Ansicht ihre eigene Fassung: `AccountPanel` und
 * `FeedbackForm` je ein eigenes `FIELD` mit gleichem Inhalt, `AdminUsers` ein
 * `button`, die übrigen Verwaltungsansichten dieselben Klassen inline. Das ist
 * keine Frage des Geschmacks: Beim nächsten Mal weicht eine Fassung ab, und
 * dann sieht die Verwaltung anders aus als die Einstellungen – genau der
 * Zustand, den 9.21 schon einmal aufgeräumt hat.
 *
 * **Gefüllt statt umrandet.** Ein Eingabefeld ist eine Fläche, in die man
 * schreibt; ein Rahmen zeichnet dieselbe Aussage mit mehr Linien. Die Füllung
 * hebt sich in beiden Darstellungen vom Untergrund ab, ohne dass dafür eine
 * weitere Farbe nötig wäre.
 *
 * **44 px bleiben 44 px.** Jede Form hier hält die Mindestgröße aus 9.5; die
 * kleinen Knöpfe (`smallButton`) sind 36 px hoch und nur für Dinge gedacht,
 * die **neben** einer Zeile stehen, nie für den einzigen Weg weiter.
 */

/** Eingabefeld, Textfeld, Auswahlfeld. */
export const fieldClass =
  "min-h-11 w-full rounded-xl bg-neutral-200/70 px-3 py-2 text-base placeholder:text-neutral-500 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none disabled:opacity-60 dark:bg-neutral-800/70";

/** Der eine Knopf, der die Sache abschließt: anmelden, absenden, navigieren. */
export const primaryButton =
  "inline-flex min-h-11 items-center justify-center rounded-xl bg-blue-700 px-4 font-medium text-white hover:bg-blue-800 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:outline-none disabled:opacity-60";

/** Alles daneben: abbrechen, aufklappen, zurückziehen. */
export const secondaryButton =
  "inline-flex min-h-11 items-center justify-center rounded-xl bg-neutral-200/80 px-4 text-sm font-medium focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none disabled:opacity-60 dark:bg-neutral-800";

/** Dasselbe, nur klein – für Knöpfe am Rand einer Zeile. */
export const smallButton =
  "inline-flex min-h-9 items-center rounded-full bg-neutral-200/80 px-3 text-xs font-medium focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none disabled:opacity-50 dark:bg-neutral-800";

/**
 * Löschen und Sperren. **Rot, aber nicht gefüllt:** Ein roter Block zieht den
 * Blick auf sich und wird dadurch öfter getroffen, als er sollte – bei einem
 * Konto, das danach weg ist, ist das die falsche Richtung.
 */
export const dangerButton =
  "inline-flex min-h-11 items-center justify-center rounded-xl bg-red-100 px-4 text-sm font-medium text-red-900 focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:outline-none disabled:opacity-60 dark:bg-red-950/60 dark:text-red-200";

/**
 * Zwei oder drei gleichrangige Stellungen in **einer** Fläche – die Form, die
 * `Segmented` in `ui/List.tsx` zeichnet, für Stellen, die ihre Knöpfe selbst
 * bauen müssen (eigene Rollen, eigene Zustände).
 *
 * **Die gewählte Stellung ist weiß, nicht blau.** Innerhalb der Fläche trägt
 * schon die erhobene Kachel die Auswahl; blau wäre ein zweites Signal für
 * dieselbe Sache. Im Dunkelmodus ist sie dunkler statt heller – die Palette
 * dieses Projekts dreht die Grauwerte (`globals.css`), helles Grau trüge
 * weiße Schrift unter dem Kontrast, den 9.7 verlangt.
 */
export const segmentGroup =
  "flex gap-0.5 rounded-xl bg-neutral-200/80 p-0.5 dark:bg-neutral-800/80";

export const segmentItem = (selected: boolean) =>
  `min-h-11 flex-1 rounded-[0.6rem] px-3 text-sm font-medium focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none motion-safe:transition-colors ${
    selected
      ? "bg-white text-neutral-900 shadow-sm dark:bg-neutral-950 dark:text-white"
      : "text-neutral-700 dark:text-neutral-300"
  }`;

/**
 * Die schwebenden Flächen über der Karte (Parkplatzvorschlag, Zielsuche,
 * Legende). **Eine Fassung für alle drei:** Sie liegen gleichzeitig im Bild,
 * und zwei verschiedene Eckradien nebeneinander sieht man sofort, ohne sagen
 * zu können, woran es liegt. `rounded-2xl` wie die Gruppen in den
 * Einstellungen und wie das Blatt der Detailansicht.
 *
 * **Deckend und ohne `backdrop-blur`** (ToDo 9.36, dieselbe Ursache wie 9.26
 * und 9.29). Ein Weichzeichner zwingt den Browser zu einer eigenen Ebene, und
 * auf der zeichnet er Schrift ohne Subpixel-Glättung: Die kleine Zeile oben
 * („Nächster Behindertenparkplatz“) wirkte auf dem iPhone verwaschen, während
 * die Schrift darunter scharf stand. Milchglas ist hübsch, aber es war hier
 * schon dreimal die Ursache für „sieht unscharf aus“.
 */
export const floatingPanel =
  "pointer-events-auto rounded-2xl border border-black/5 bg-white shadow-md ring-1 ring-black/5 dark:border-white/10 dark:bg-neutral-900 dark:ring-white/10";

/** Beschriftung über einem Feld. */
export const labelClass = "text-sm font-medium";

/** Der erklärende Satz unter einem Feld oder einer Gruppe. */
export const hintClass = "text-xs leading-snug text-neutral-600 dark:text-neutral-400";
