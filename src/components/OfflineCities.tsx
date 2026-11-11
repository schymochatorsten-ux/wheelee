"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocale, useT } from "@/i18n/context";
import { localeTag, type Locale } from "@/i18n";
import type { CityInfo } from "@/lib/parking/spots";
import { ListGroup, Row } from "./ui/List";
import { smallButton } from "./ui/styles";
import {
  formatBytes,
  listOfflineCities,
  offlineSupported,
  removeOfflineCity,
  saveOfflineCity,
  stalenessOf,
  type OfflineCitySummary,
} from "@/lib/offline-cities";

/**
 * Städte vorab laden (ToDo 16.1) – nur die Parkplatzdaten, keine Kartenkacheln
 * (16.2 wurde verworfen, Begründung in `Erledigt.md`).
 *
 * **Ein Feld statt dreier Bedienelemente** (ToDo 9.31, auf Torstens Wunsch:
 * „nur ein Feld zum Download; wenn man anfängt zu tippen, die Vorschläge
 * anzeigen, die zum Anfang des Eingetippten passen"). Vorher standen hier ein
 * Suchfeld, eine Auswahlliste und ein Knopf – drei Schritte für eine Absicht,
 * und die Auswahlliste bot bei 648 Städten ohne Suche ohnehin nichts
 * Brauchbares. Jetzt ist das Tippen die Suche, und der Vorschlag ist der Knopf:
 * **antippen lädt**.
 *
 * **Vorschläge beginnen am Wortanfang.** Wer „Mo" tippt, will Moers und
 * Mönchengladbach sehen und nicht alles mit „mo" in der Mitte; ein Treffer
 * innerhalb des Namens steht deshalb hinter den Anfangstreffern. Ohne diese
 * Reihenfolge stand bei kurzen Eingaben Zufälliges oben.
 */

const formatDate = (iso: string, locale: Locale) =>
  new Intl.DateTimeFormat(localeTag(locale), { dateStyle: "medium" }).format(new Date(iso));

/** So viele Vorschläge auf einmal – mehr liest niemand, und sie kosten Platz. */
const SUGGESTION_LIMIT = 8;

export function OfflineCities({ cities }: { cities: readonly CityInfo[] }) {
  const t = useT();
  const locale = useLocale();
  const [saved, setSaved] = useState<OfflineCitySummary[]>([]);
  const [supported, setSupported] = useState(true);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [busy, setBusy] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const fieldId = "offline-stadt";

  const reload = () =>
    listOfflineCities()
      .then(setSaved)
      .catch(() => setSupported(false));

  // Erst nach dem Laden prüfen: Auf dem Server gibt es keine Cache API.
  useEffect(() => {
    if (!offlineSupported()) {
      setSupported(false);
      return;
    }
    void reload();
  }, []);

  const tag = localeTag(locale);
  const needle = query.trim().toLocaleLowerCase(tag);

  /*
   * Erst die Namen, die mit der Eingabe beginnen, dann die, die sie enthalten.
   * Ohne Eingabe gibt es keine Vorschläge: Eine Liste aller Städte beim Öffnen
   * wäre genau die Auswahlliste, die hier abgeschafft wurde.
   */
  const suggestions = useMemo(() => {
    if (!needle) return [];
    const starts: CityInfo[] = [];
    const contains: CityInfo[] = [];
    for (const city of cities) {
      const name = city.name.toLocaleLowerCase(tag);
      if (name.startsWith(needle)) starts.push(city);
      else if (name.includes(needle)) contains.push(city);
      if (starts.length >= SUGGESTION_LIMIT) break;
    }
    const byName = (a: CityInfo, b: CityInfo) => a.name.localeCompare(b.name, tag);
    return [...starts.sort(byName), ...contains.sort(byName)].slice(0, SUGGESTION_LIMIT);
  }, [cities, needle, tag]);

  const download = async (slug: string) => {
    setBusy(slug);
    setMessage(null);
    try {
      const summary = await saveOfflineCity(slug);
      setMessage(t("offline.saved", { name: summary.name }));
      setQuery("");
      setOpen(false);
      await reload();
    } catch {
      setMessage(t("offline.failed"));
    } finally {
      setBusy(null);
    }
  };

  const remove = async (entry: OfflineCitySummary) => {
    await removeOfflineCity(entry.slug);
    setMessage(t("offline.removed", { name: entry.name }));
    await reload();
  };

  /*
   * Tastaturbedienung wie bei der Zielsuche (6.20): Pfeile wählen, Eingabe
   * nimmt, Escape schließt. Eine Vorschlagsliste, die nur mit dem Finger
   * bedienbar ist, schließt genau die Leute aus, für die diese App gebaut ist.
   */
  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!suggestions.length) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpen(true);
      setActive((index) => (index + 1) % suggestions.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setOpen(true);
      setActive((index) => (index - 1 + suggestions.length) % suggestions.length);
    } else if (event.key === "Enter") {
      event.preventDefault();
      const city = suggestions[active] ?? suggestions[0];
      if (city) void download(city.slug);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  };

  const total = saved.reduce((sum, entry) => sum + entry.bytes, 0);
  const listOpen = open && suggestions.length > 0;

  return (
    <ListGroup
      title={t("offline.heading")}
      footer={
        saved.length > 0
          ? t("offline.total", { size: formatBytes(total, locale) })
          : t("offline.note")
      }
    >
      {!supported ? (
        <Row>{t("offline.unsupported")}</Row>
      ) : (
        <>
          <Row>
            <div className="relative">
              <input
                id={fieldId}
                type="text"
                role="combobox"
                aria-expanded={listOpen}
                aria-controls="offline-vorschlaege"
                aria-autocomplete="list"
                aria-activedescendant={
                  listOpen ? `offline-vorschlag-${suggestions[active]?.slug ?? ""}` : undefined
                }
                aria-label={t("offline.cityLabel")}
                placeholder={t("offline.pick")}
                autoComplete="off"
                value={query}
                disabled={busy !== null}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setActive(0);
                  setOpen(true);
                }}
                onFocus={() => setOpen(true)}
                onKeyDown={onKeyDown}
                onBlur={() => setOpen(false)}
                className="min-h-11 w-full rounded-xl bg-neutral-200/70 px-3 text-[15px] placeholder:text-neutral-500 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none disabled:opacity-60 dark:bg-neutral-800/70"
              />

              {listOpen && (
                /*
                 * **Die Vorschläge stehen in der Gruppe, nicht schwebend
                 * darüber.** Ein absolut gesetztes Menü wurde vom
                 * `overflow-hidden` der Gruppe abgeschnitten – zu sehen war
                 * nichts. Darunter statt darüber ist hier ohnehin richtig:
                 * Die Gruppe wächst, nichts verdeckt etwas, und auf dem
                 * Telefon liegt die Liste damit über der Tastatur statt
                 * dahinter.
                 */
                <ul
                  id="offline-vorschlaege"
                  role="listbox"
                  aria-label={t("offline.suggestions")}
                  className="mt-1 overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-800"
                >
                  {suggestions.map((city, index) => (
                    <li key={city.slug} role="none">
                      <button
                        type="button"
                        role="option"
                        id={`offline-vorschlag-${city.slug}`}
                        aria-selected={index === active}
                        data-testid={`offline-vorschlag-${city.slug}`}
                        onMouseEnter={() => setActive(index)}
                        /*
                         * **Der Druck darf dem Feld den Fokus nicht nehmen.**
                         * Sonst schließt das `onBlur` die Liste, noch ehe der
                         * Klick ankommt – der erste Versuch war ein Timer, der
                         * das abwartet, und genau solche Zeitfenster gehen auf
                         * langsamen Geräten daneben. `preventDefault` hier
                         * verhindert den Fokuswechsel ganz.
                         */
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => void download(city.slug)}
                        className={`flex min-h-11 w-full items-center justify-between gap-3 px-3 text-left text-[15px] ${
                          index === active ? "bg-neutral-100 dark:bg-neutral-800" : ""
                        }`}
                      >
                        <span>{city.name}</span>
                        <span className="text-xs text-neutral-500">
                          {busy === city.slug ? t("offline.downloading") : t("offline.download")}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {needle && suggestions.length === 0 && (
                <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-400">
                  {t("list.cityNone")}
                </p>
              )}

              <p
                aria-live="polite"
                data-testid="offline-message"
                className="mt-2 min-h-4 text-xs text-neutral-600 dark:text-neutral-400"
              >
                {/*
                  Rückmeldung und Leerstand stehen nebeneinander, nicht
                  wechselweise: Wer gerade gelöscht hat, soll beides lesen –
                  dass es geklappt hat und dass jetzt nichts mehr da ist.
                */}
                {message ? <span className="block">{message}</span> : null}
                {saved.length === 0 ? <span className="block">{t("offline.none")}</span> : null}
              </p>
            </div>
          </Row>

          {saved.map((entry) => {
            const staleness = stalenessOf(entry);
            return (
              <Row
                key={entry.slug}
                // Auf dem Telefon rutschen die beiden Knöpfe unter den Text:
                // nebeneinander blieben für die Angaben keine 20 Zeichen je
                // Zeile.
                className="flex-wrap items-start"
                label={
                  <span data-testid={`offline-${entry.slug}`}>
                    <span className="font-medium">{entry.name}</span>
                    <span className="mt-0.5 block text-xs text-neutral-600 dark:text-neutral-400">
                      {t("offline.entry", {
                        count: entry.spotCount,
                        size: formatBytes(entry.bytes, locale),
                      })}
                      {" · "}
                      {t("offline.dataDate", { date: formatDate(entry.importedAt, locale) })}
                      {" · "}
                      {t("offline.savedDate", { date: formatDate(entry.savedAt, locale) })}
                    </span>
                    {staleness !== "fresh" && (
                      <span className="mt-0.5 block text-xs font-medium text-amber-800 dark:text-amber-300">
                        {staleness === "data" ? t("offline.staleData") : t("offline.staleCopy")}
                      </span>
                    )}
                  </span>
                }
              >
                <div className="flex gap-2 max-sm:mt-1">
                  <button
                    type="button"
                    className={smallButton}
                    disabled={busy !== null}
                    aria-label={t("offline.refreshLabel", { name: entry.name })}
                    onClick={() => void download(entry.slug)}
                  >
                    {t("offline.refresh")}
                  </button>
                  <button
                    type="button"
                    className={smallButton}
                    aria-label={t("offline.removeLabel", { name: entry.name })}
                    onClick={() => void remove(entry)}
                  >
                    {t("offline.remove")}
                  </button>
                </div>
              </Row>
            );
          })}
        </>
      )}
    </ListGroup>
  );
}
