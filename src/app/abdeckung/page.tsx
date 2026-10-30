import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { confirmationSummary } from "@/lib/parking/confirmation";
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

  return (
    <LegalPage title="Datenabdeckung" updated="2026-10-30">
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
          In {number(confirmation.cities)} Städten wurden die amtlichen Standorte mit
          OpenStreetMap abgeglichen: {number(confirmation.confirmed)} Standorte kennen beide Quellen,{" "}
          {number(confirmation.officialOnly)} nur die Stadt.
        </p>
      </section>

      <section>
        <h2>Städte mit amtlicher Liste</h2>
        <table className="mt-2 w-full text-left text-sm">
          <thead>
            <tr>
              <th>Stadt</th>
              <th>Standorte</th>
              <th>Stellplätze</th>
              <th>Stand</th>
            </tr>
          </thead>
          <tbody>
            {official.map((city) => (
              <tr key={city.slug}>
                <td>{city.name}</td>
                <td>{number(city.spotCount)}</td>
                <td>{number(city.spaceCount)}</td>
                <td>{city.importedAt.slice(0, 10)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </LegalPage>
  );
}
