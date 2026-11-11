import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { confirmationSummary } from "@/lib/parking/confirmation";
import { readChecked } from "@/lib/checked";
import { getCities } from "@/lib/parking/spots";

/**
 * Wie vollständig sind die Daten? (ToDo 19.4)
 *
 * Die App sagt schon, dass OpenStreetMap-Daten unvollständig sind. Mit Zahlen
 * je Stadt wird das nachprüfbar: Wo die Stadt selbst eine Liste veröffentlicht,
 * ist sie vollständig im Sinne der Stadt; überall sonst ist es eine
 * Mindestzahl. Gebaut aus denselben Seed-Dateien wie die Karte.
 */

export const metadata: Metadata = {
  title: "Datenabdeckung – wheelee",
  description: "Welche Städte amtliche Listen haben und wie viele Standorte erfasst sind.",
};

export default function Abdeckung() {
  const cities = getCities();
  const official = cities
    .filter((city) => city.coverage === "official")
    .sort((a, b) => b.spaceCount - a.spaceCount);
  const crowd = cities.filter((city) => city.coverage === "crowdsourced");
  const sum = (list: typeof cities, key: "spotCount" | "spaceCount") =>
    list.reduce((total, city) => total + city[key], 0);
  const confirmation = confirmationSummary();
  const number = (value: number) => value.toLocaleString("de-DE");
  /*
   * **Zwei Daten, zwei Zeilen** (ToDo 19.16).
   *
   * Bis hierher stand oben **ein** Datum: der jüngere von letztem Import und
   * letztem Lauf. Das las sich als „so alt sind die Daten“ und war es nicht –
   * ein nächtlicher Lauf, der die Quellen prüft und nichts Neues findet,
   * schob das Datum jede Nacht vor, obwohl sich am Bestand nichts geändert
   * hatte. Genau die Verwechslung, vor der dieses Projekt sich sonst hütet:
   * Es sah frischer aus, als es war.
   *
   * Jetzt steht beides getrennt da – „Daten vom“ (jüngster Import, ändert
   * sich nur mit den Daten) und „Zuletzt aktualisiert (nächtlicher Lauf)“
   * (wann zuletzt überhaupt nachgesehen wurde).
   *
   * Das Laufdatum kommt aus `geprueft.json` neben der Datenbank, nicht aus
   * dem Repository: Ein Lauf ohne Fund soll keinen Commit und keinen Neubau
   * auslösen (siehe `lib/checked.ts` und `deploy/Datenlauf.md`). Fehlt die
   * Datei, steht „noch nicht gelaufen“ – nie ein erfundenes Datum.
   */
  const checked = readChecked();
  const newestImport = cities.reduce(
    (latest, city) => (city.importedAt > latest ? city.importedAt : latest),
    "2026-01-01",
  );
  // Die größten Städte insgesamt, gleich welcher Quelle – die Tabelle der amtlichen
  // Listen allein zeigt nicht, wo es die meisten Stellplätze gibt.
  const largest = [...cities].sort((a, b) => b.spaceCount - a.spaceCount).slice(0, 25);

  return (
    <LegalPage
      title="Datenabdeckung"
      updated={newestImport}
      updatedKey="legal.dataFrom"
      lastRun={checked.updatedAt}
    >
      <section>
        <h2>Überblick</h2>
        <p>
          {number(cities.length)} Städte und Gemeinden mit {number(sum(cities, "spotCount"))}{" "}
          Standorten ({number(sum(cities, "spaceCount"))} Stellplätze). {number(official.length)}{" "}
          davon beziehen ihre Liste von der Stadtverwaltung, {number(crowd.length)} aus
          OpenStreetMap. <strong>Aus OpenStreetMap ist es eine Mindestzahl</strong> – fehlende
          Einträge bedeuten nicht, dass es dort keine Plätze gibt.
        </p>
        <p>
          In {number(confirmation.cities)} Städten wurden die amtlichen Standorte mit OpenStreetMap
          abgeglichen: {number(confirmation.confirmed)} Standorte kennen beide Quellen,{" "}
          {number(confirmation.officialOnly)} nur die Stadt.
        </p>
      </section>

      <section>
        <h2>Städte mit amtlicher Liste</h2>
        {/*
          **Die Tabelle wandert, statt sich zu quetschen** (ToDo 9.31). Auf
          375 px blieben für „Zuletzt geprüft“ zwei Zeichen je Zeile; das
          Datum stand dreizeilig. Der Rahmen scrollt jetzt seitwärts, die
          Seite selbst nicht (9.8) – negative Ränder, damit er am
          Bildschirmrand beginnt und nicht mitten im Text.
        */}
        <div className="-mx-4 overflow-x-auto px-4">
          <table className="mt-2 w-full min-w-[22rem] text-left text-sm">
            <thead>
              <tr>
                <th>Stadt</th>
                <th>Standorte</th>
                <th>Stellplätze</th>
                <th>Daten vom</th>
                <th>Zuletzt geprüft</th>
              </tr>
            </thead>
            <tbody>
              {official.map((city) => (
                <tr key={city.slug}>
                  <td>{city.name}</td>
                  <td>{number(city.spotCount)}</td>
                  <td>{number(city.spaceCount)}</td>
                  <td>{city.importedAt.slice(0, 10)}</td>
                  <td>{checked.cities[city.slug]?.slice(0, 10) ?? "–"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-sm">
          „Daten vom“ ist der Tag, an dem sich der Bestand zuletzt geändert hat; „Zuletzt geprüft“
          der Tag des letzten Vergleichs mit der Quelle der Stadt, auch wenn sich nichts geändert
          hat. Quellen ohne Änderungsdatum werden dafür monatlich neu geholt und verglichen. „–“
          heißt: noch nicht geprüft, oder die Quelle ist derzeit nicht erreichbar.
        </p>
      </section>

      <section>
        <h2>Die 25 Städte mit den meisten Stellplätzen</h2>
        <p>
          Aus allen Quellen, nach Stellplätzen sortiert. Dass Städte wie Stuttgart oder Nürnberg
          hier stehen, aber nicht oben bei den amtlichen Listen, liegt an der Quelle: Sie haben
          keine veröffentlichte Liste, ihre Zahlen stammen aus OpenStreetMap und sind eine
          Mindestzahl.
        </p>
        <div className="-mx-4 overflow-x-auto px-4">
          <table className="mt-2 w-full min-w-[22rem] text-left text-sm">
            <thead>
              <tr>
                <th>Stadt</th>
                <th>Standorte</th>
                <th>Stellplätze</th>
                <th>Quelle</th>
              </tr>
            </thead>
            <tbody>
              {largest.map((city) => (
                <tr key={city.slug}>
                  <td>{city.name}</td>
                  <td>{number(city.spotCount)}</td>
                  <td>{number(city.spaceCount)}</td>
                  <td>{city.coverage === "official" ? "amtlich" : "OpenStreetMap"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </LegalPage>
  );
}
