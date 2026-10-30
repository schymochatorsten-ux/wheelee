import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { getCities } from "@/lib/parking/spots";

/**
 * Quellen und Lizenzen auf einer Seite (ToDo 19.8).
 *
 * dl-de/by-2.0 und ODbL verlangen den Quellenvermerk. Er stand bisher nur in
 * der Städteliste, die in der Oberfläche ausgeblendet ist (9.11) – wer nach
 * der Herkunft der Daten fragt, fand nichts. Hier steht er gebündelt: eine
 * Zeile je Quelle, darunter die Städte, die sie liefert.
 *
 * Aus denselben Seed-Dateien gebaut wie die Karte, also nie älter als die
 * Daten. Deutsch, wie die übrigen Seiten für Rechtliches (D-08).
 */

export const metadata: Metadata = {
  title: "Quellen und Lizenzen – wheelee",
  description: "Woher die Parkplatzdaten stammen und unter welcher Lizenz.",
};

export default function Quellen() {
  const groups = new Map<string, { attribution: string; license: string | null; cities: string[] }>();
  for (const city of getCities()) {
    const key = `${city.attribution}\u0000${city.license ?? ""}`;
    const group = groups.get(key) ?? {
      attribution: city.attribution,
      license: city.license,
      cities: [],
    };
    group.cities.push(city.name);
    groups.set(key, group);
  }
  const sorted = [...groups.values()].sort(
    (a, b) => b.cities.length - a.cities.length || a.attribution.localeCompare(b.attribution, "de-DE"),
  );

  return (
    <LegalPage title="Quellen und Lizenzen" updated="2026-10-30">
      <section>
        <h2>Karte und Standorte</h2>
        <p>
          Kartendarstellung und der größte Teil der Parkplatzdaten:{" "}
          <a href="https://www.openstreetmap.org/copyright">© OpenStreetMap-Mitwirkende</a>, Open
          Database License (ODbL). Gemeindenamen und -schlüssel: © Bundesamt für Kartographie und
          Geodäsie (2026), Datenlizenz Deutschland – Namensnennung – Version 2.0.
        </p>
      </section>

      <section>
        <h2>Quellen je Stadt</h2>
        <p>
          Die Daten sind unvollständig und können veraltet sein; im Zweifel gelten die Schilder vor
          Ort. {sorted.length} Quellen, nach Zahl der Städte geordnet.
        </p>
        <ul>
          {sorted.map((group) => (
            <li key={`${group.attribution}${group.license}`}>
              <strong>{group.attribution}</strong>
              {group.license ? ` – ${group.license}` : " – Lizenz nicht angegeben"} (
              {group.cities.length === 1 ? "1 Stadt" : `${group.cities.length} Städte`}
              {group.cities.length <= 12 ? `: ${group.cities.join(", ")}` : ""})
            </li>
          ))}
        </ul>
      </section>
    </LegalPage>
  );
}
