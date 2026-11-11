"use client";

import { ListGroup } from "./ui/List";

/**
 * Ein umrahmter Einstellungsblock – die eine Form für **alle** Bereiche, in
 * denen etwas eingestellt wird (ToDo 9.21).
 *
 * **Warum eine gemeinsame Komponente und nicht dieselben Klassen fünfmal.**
 * Bis hierher trug jeder Bereich seinen eigenen Rahmen: Der Reiter
 * „Einstellungen“ hatte Karten (Überschrift innen), die Verwaltung nur dünne
 * Trennlinien, der Mailversand gar nichts. Das war kein Schönheitsfehler,
 * sondern ein Lesbarkeitsproblem: Wo nichts umrahmt ist, sieht man nicht,
 * welche Angabe zu welcher Einstellung gehört – und beim fünften Mal
 * Klassenkopieren weicht ohnehin eine Fassung ab.
 *
 * **Die Überschrift steht über dem Rahmen, nicht darin** (so das Beispiel, das
 * Torsten am 2026-11-08 gezeigt hat). Sie wird damit zur Beschriftung der
 * Gruppe statt zu deren erster Zeile, und zwei Blöcke untereinander sind auf
 * einen Blick zu trennen.
 *
 * **Der Erklärungssatz gehört in den Rahmen**, weil er zum Inhalt gehört und
 * nicht zur Beschriftung.
 */

interface SettingsSectionProps {
  title: string;
  /** Ein Satz, was dieser Block tut. Steht oben im Rahmen. */
  description?: React.ReactNode;
  /**
   * Zusatz rechts neben der Überschrift – etwa ein Zustand („Der Versand
   * läuft“). Steht außerhalb des Rahmens, weil es die Gruppe beschreibt.
   */
  aside?: React.ReactNode;
  children: React.ReactNode;
}

export function SettingsSection({ title, description, aside, children }: SettingsSectionProps) {
  /*
   * **Seit 9.31 nur noch eine dünne Hülle um `ListGroup`.** Die Form aller
   * Gruppen steht jetzt an einer Stelle (`ui/List.tsx`), und die Verwaltung
   * folgt ihr, ohne dass jede ihrer fünf Ansichten angefasst werden musste.
   *
   * **Die Beschreibung ist von oben nach unten gewandert.** Sie stand als
   * erster Satz im Rahmen, also zwischen Überschrift und Bedienelement: Wer
   * etwas einstellen wollte, musste sie jedes Mal überspringen. Als Fußnote
   * unter der Gruppe ist sie da, wo man nachliest – nicht im Weg, wo man
   * bedient. Das ist dieselbe Entscheidung wie bei den Einstellungen.
   *
   * `clip={false}`, weil mehrere Verwaltungsansichten Blätter und Menüs
   * öffnen, die über den Rand der Gruppe hinausragen – abgeschnitten wären
   * sie unbedienbar (gefunden von `e2e/rueckmeldungen.spec.ts`).
   */
  return (
    <ListGroup title={title} aside={aside} footer={description} clip={false}>
      <div className="px-4 py-3">{children}</div>
    </ListGroup>
  );
}
