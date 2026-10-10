# Aktualität der Quellen

Stand: 2026-10-09

Erzeugt von `npm run sources:check`. Der Lauf lädt **keine** Parkplatzdaten,
er fragt nur nach dem Änderungsdatum. Nicht von Hand bearbeiten.

„Geändert“ stützt sich bei GovData auf `metadata_modified`. Das Feld meldet
jede Änderung an den Metadaten, auch eine korrigierte Beschreibung – es
heißt also „sieh nach“, nicht „die Daten sind neu“.

## Überblick

| Befund                       | Städte |
| ---------------------------- | -----: |
| 🔄 geändert                  |     10 |
| 💀 nicht mehr abrufbar       |      0 |
| 🟡 amtliche Quelle ungenutzt |      8 |
| ✅ unverändert               |      5 |
| ❔ nicht prüfbar             |      0 |
| ⬜ kein Änderungsdatum       |    164 |

## Amtliche Quelle vorhanden, aber ungenutzt

Diese Städte kommen aus OpenStreetMap, obwohl ihre amtliche Quelle
antwortet. Ein erneuter Importversuch lohnt: Düsseldorf kam damit von
171 Standorten auf 340 (ToDo 2d.8a).

**Nicht jede davon ist ein Versäumnis.** „Erreichbar“ heißt nur, dass der
Dienst antwortet – nicht, dass er die richtigen Daten führt. Für Kiel,
Krefeld und Aachen hat die Untersuchung zu 2d.8 ergeben, dass ihre
Datensätze Anwohnerparken beschreiben; dass der Importer sie ablehnt, ist
richtig. Der Importvermerk in der Zeile sagt, was beim letzten Versuch
geschah.

```bash
npm run import:city -- bochum bielefeld karlsruhe kiel aachen krefeld norderstedt viersen
```

- **Bochum** – amtliche Quelle erreichbar, verwendet wird OpenStreetMap · Quelle vom 2026-10-07 · Importvermerk: amtliche Quelle nicht nutzbar, OSM verwendet
- **Bielefeld** – amtliche Quelle erreichbar, verwendet wird OpenStreetMap · Quelle vom 2026-10-09 · Importvermerk: amtliche Quelle nicht nutzbar, OSM verwendet
- **Karlsruhe** – amtliche Quelle erreichbar, verwendet wird OpenStreetMap · Quelle vom 2026-10-09 · Importvermerk: amtliche Quelle nicht nutzbar, OSM verwendet
- **Kiel** – amtliche Quelle erreichbar, verwendet wird OpenStreetMap · Quelle vom 2026-10-09 · Importvermerk: amtliche Quelle nicht nutzbar, OSM verwendet
- **Aachen** – amtliche Quelle erreichbar, verwendet wird OpenStreetMap · Quelle vom 2026-10-09 · Importvermerk: amtliche Quelle nicht nutzbar, OSM verwendet
- **Krefeld** – amtliche Quelle erreichbar, verwendet wird OpenStreetMap · Quelle vom 2026-10-09 · Importvermerk: amtliche Quelle nicht nutzbar, OSM verwendet
- **Norderstedt** – amtliche Quelle erreichbar, verwendet wird OpenStreetMap · Quelle vom 2026-10-09 · Importvermerk: amtliche Quelle nicht nutzbar, OSM verwendet
- **Viersen** – amtliche Quelle erreichbar, verwendet wird OpenStreetMap · Quelle vom 2026-10-09 · Importvermerk: amtliche Quelle nicht nutzbar, OSM verwendet

## Neu zu importieren

```bash
npm run import:city -- hamburg koeln frankfurt duesseldorf dresden gelsenkirchen chemnitz neuss ulm bottrop
npm run import:streets
npm run import:index
```

- **Hamburg** – Quelle vom 2026-10-09, Import vom 2026-10-08
- **Köln** – Quelle vom 2026-10-09, Import vom 2026-10-08
- **Frankfurt am Main** – Quelle vom 2026-10-09, Import vom 2026-10-08
- **Düsseldorf** – Quelle vom 2026-10-09, Import vom 2026-10-08
- **Dresden** – Quelle vom 2026-10-09, Import vom 2026-10-08
- **Gelsenkirchen** – Quelle vom 2026-10-09, Import vom 2026-10-08
- **Chemnitz** – Quelle vom 2026-10-09, Import vom 2026-10-08
- **Neuss** – Quelle vom 2026-10-09, Import vom 2026-10-08
- **Ulm** – Quelle vom 2026-10-09, Import vom 2026-10-08
- **Bottrop** – Quelle vom 2026-10-09, Import vom 2026-10-08

## Alle Städte

|     | Stadt                    | Befund                    | Einzelheiten                                                                                                                                   |
| --- | ------------------------ | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| ✅  | Berlin                   | unverändert               | Quelle vom 2026-10-08                                                                                                                          |
| 🔄  | Hamburg                  | geändert                  | Quelle vom 2026-10-09, Import vom 2026-10-08                                                                                                   |
| ⬜  | München                  | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 1 Tagen geholt                                                                                                      |
| 🔄  | Köln                     | geändert                  | Quelle vom 2026-10-09, Import vom 2026-10-08                                                                                                   |
| 🔄  | Frankfurt am Main        | geändert                  | Quelle vom 2026-10-09, Import vom 2026-10-08                                                                                                   |
| ⬜  | Stuttgart                | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 1 Tagen geholt                                                                                                      |
| 🔄  | Düsseldorf               | geändert                  | Quelle vom 2026-10-09, Import vom 2026-10-08                                                                                                   |
| ⬜  | Leipzig                  | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 1 Tagen geholt                                                                                                      |
| ✅  | Dortmund                 | unverändert               | Quelle vom 2026-10-07                                                                                                                          |
| ⬜  | Essen                    | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 1 Tagen geholt                                                                                                      |
| ⬜  | Bremen                   | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 1 Tagen geholt                                                                                                      |
| 🔄  | Dresden                  | geändert                  | Quelle vom 2026-10-09, Import vom 2026-10-08                                                                                                   |
| ⬜  | Hannover                 | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 1 Tagen geholt                                                                                                      |
| ⬜  | Nürnberg                 | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 1 Tagen geholt                                                                                                      |
| ⬜  | Duisburg                 | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 1 Tagen geholt                                                                                                      |
| 🟡  | Bochum                   | amtliche Quelle ungenutzt | amtliche Quelle erreichbar, verwendet wird OpenStreetMap · Quelle vom 2026-10-07 · Importvermerk: amtliche Quelle nicht nutzbar, OSM verwendet |
| ⬜  | Wuppertal                | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 1 Tagen geholt                                                                                                      |
| 🟡  | Bielefeld                | amtliche Quelle ungenutzt | amtliche Quelle erreichbar, verwendet wird OpenStreetMap · Quelle vom 2026-10-09 · Importvermerk: amtliche Quelle nicht nutzbar, OSM verwendet |
| ⬜  | Bonn                     | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 1 Tagen geholt                                                                                                      |
| ⬜  | Münster                  | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 1 Tagen geholt                                                                                                      |
| ⬜  | Mannheim                 | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 1 Tagen geholt                                                                                                      |
| 🟡  | Karlsruhe                | amtliche Quelle ungenutzt | amtliche Quelle erreichbar, verwendet wird OpenStreetMap · Quelle vom 2026-10-09 · Importvermerk: amtliche Quelle nicht nutzbar, OSM verwendet |
| ⬜  | Augsburg                 | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 1 Tagen geholt                                                                                                      |
| ⬜  | Wiesbaden                | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 1 Tagen geholt                                                                                                      |
| ⬜  | Mönchengladbach          | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 1 Tagen geholt                                                                                                      |
| 🔄  | Gelsenkirchen            | geändert                  | Quelle vom 2026-10-09, Import vom 2026-10-08                                                                                                   |
| ⬜  | Braunschweig             | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 1 Tagen geholt                                                                                                      |
| 🟡  | Kiel                     | amtliche Quelle ungenutzt | amtliche Quelle erreichbar, verwendet wird OpenStreetMap · Quelle vom 2026-10-09 · Importvermerk: amtliche Quelle nicht nutzbar, OSM verwendet |
| 🔄  | Chemnitz                 | geändert                  | Quelle vom 2026-10-09, Import vom 2026-10-08                                                                                                   |
| 🟡  | Aachen                   | amtliche Quelle ungenutzt | amtliche Quelle erreichbar, verwendet wird OpenStreetMap · Quelle vom 2026-10-09 · Importvermerk: amtliche Quelle nicht nutzbar, OSM verwendet |
| ⬜  | Halle (Saale)            | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 1 Tagen geholt                                                                                                      |
| ⬜  | Magdeburg                | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 1 Tagen geholt                                                                                                      |
| ✅  | Freiburg im Breisgau     | unverändert               | Quelle vom 2026-09-23                                                                                                                          |
| 🟡  | Krefeld                  | amtliche Quelle ungenutzt | amtliche Quelle erreichbar, verwendet wird OpenStreetMap · Quelle vom 2026-10-09 · Importvermerk: amtliche Quelle nicht nutzbar, OSM verwendet |
| ⬜  | Mainz                    | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 1 Tagen geholt                                                                                                      |
| ⬜  | Lübeck                   | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 1 Tagen geholt                                                                                                      |
| ⬜  | Erfurt                   | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 1 Tagen geholt                                                                                                      |
| ⬜  | Oberhausen               | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 1 Tagen geholt                                                                                                      |
| ✅  | Rostock                  | unverändert               | Quelle vom 2026-10-08                                                                                                                          |
| ⬜  | Kassel                   | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 1 Tagen geholt                                                                                                      |
| ⬜  | Hagen                    | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 1 Tagen geholt                                                                                                      |
| ⬜  | Potsdam                  | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 1 Tagen geholt                                                                                                      |
| ⬜  | Saarbrücken              | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 1 Tagen geholt                                                                                                      |
| ⬜  | Hamm                     | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 1 Tagen geholt                                                                                                      |
| ⬜  | Oldenburg                | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 1 Tagen geholt                                                                                                      |
| ⬜  | Ludwigshafen am Rhein    | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 1 Tagen geholt                                                                                                      |
| ⬜  | Mülheim an der Ruhr      | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 1 Tagen geholt                                                                                                      |
| ⬜  | Osnabrück                | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 1 Tagen geholt                                                                                                      |
| ⬜  | Leverkusen               | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 1 Tagen geholt                                                                                                      |
| ✅  | Heidelberg               | unverändert               | Quelle vom 2026-09-23                                                                                                                          |
| ⬜  | Darmstadt                | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 1 Tagen geholt                                                                                                      |
| ⬜  | Solingen                 | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 1 Tagen geholt                                                                                                      |
| ⬜  | Herne                    | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 1 Tagen geholt                                                                                                      |
| ⬜  | Regensburg               | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 1 Tagen geholt                                                                                                      |
| ⬜  | Paderborn                | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 1 Tagen geholt                                                                                                      |
| 🔄  | Neuss                    | geändert                  | Quelle vom 2026-10-09, Import vom 2026-10-08                                                                                                   |
| ⬜  | Ingolstadt               | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 1 Tagen geholt                                                                                                      |
| ⬜  | Offenbach am Main        | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 1 Tagen geholt                                                                                                      |
| ⬜  | Fürth                    | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 1 Tagen geholt                                                                                                      |
| 🔄  | Ulm                      | geändert                  | Quelle vom 2026-10-09, Import vom 2026-10-08                                                                                                   |
| ⬜  | Heilbronn                | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 1 Tagen geholt                                                                                                      |
| ⬜  | Pforzheim                | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 1 Tagen geholt                                                                                                      |
| ⬜  | Wolfsburg                | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 1 Tagen geholt                                                                                                      |
| ⬜  | Würzburg                 | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 1 Tagen geholt                                                                                                      |
| ⬜  | Göttingen                | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 1 Tagen geholt                                                                                                      |
| ⬜  | Reutlingen               | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 1 Tagen geholt                                                                                                      |
| 🔄  | Bottrop                  | geändert                  | Quelle vom 2026-10-09, Import vom 2026-10-08                                                                                                   |
| ⬜  | Erlangen                 | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 1 Tagen geholt                                                                                                      |
| ⬜  | Remscheid                | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 1 Tagen geholt                                                                                                      |
| ⬜  | Koblenz                  | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 1 Tagen geholt                                                                                                      |
| ⬜  | Bremerhaven              | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 1 Tagen geholt                                                                                                      |
| ⬜  | Recklinghausen           | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 1 Tagen geholt                                                                                                      |
| ⬜  | Bergisch Gladbach        | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 1 Tagen geholt                                                                                                      |
| ⬜  | Trier                    | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 1 Tagen geholt                                                                                                      |
| ⬜  | Jena                     | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 1 Tagen geholt                                                                                                      |
| ⬜  | Salzgitter               | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 1 Tagen geholt                                                                                                      |
| ⬜  | Moers                    | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 1 Tagen geholt                                                                                                      |
| ⬜  | Siegen                   | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 1 Tagen geholt                                                                                                      |
| ⬜  | Gütersloh                | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 1 Tagen geholt                                                                                                      |
| ⬜  | Hildesheim               | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 1 Tagen geholt                                                                                                      |
| ⬜  | Hanau                    | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Kaiserslautern           | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 1 Tagen geholt                                                                                                      |
| ⬜  | Cottbus                  | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 1 Tagen geholt                                                                                                      |
| ⬜  | Witten                   | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 1 Tagen geholt                                                                                                      |
| ⬜  | Schwerin                 | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Ludwigsburg              | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Esslingen am Neckar      | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Gießen                   | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Iserlohn                 | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Düren                    | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Flensburg                | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Gera                     | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Tübingen                 | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Zwickau                  | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Ratingen                 | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Villingen-Schwenningen   | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Lünen                    | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Konstanz                 | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Worms                    | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Marl                     | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Minden                   | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Velbert                  | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Neumünster               | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| 🟡  | Norderstedt              | amtliche Quelle ungenutzt | amtliche Quelle erreichbar, verwendet wird OpenStreetMap · Quelle vom 2026-10-09 · Importvermerk: amtliche Quelle nicht nutzbar, OSM verwendet |
| ⬜  | Dessau-Roßlau            | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Lüneburg                 | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Delmenhorst              | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Bamberg                  | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Marburg                  | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| 🟡  | Viersen                  | amtliche Quelle ungenutzt | amtliche Quelle erreichbar, verwendet wird OpenStreetMap · Quelle vom 2026-10-09 · Importvermerk: amtliche Quelle nicht nutzbar, OSM verwendet |
| ⬜  | Rheine                   | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Gladbeck                 | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Troisdorf                | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Bayreuth                 | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Dorsten                  | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Detmold                  | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Landshut                 | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Castrop-Rauxel           | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Lüdenscheid              | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Arnsberg                 | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Brandenburg an der Havel | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Aschaffenburg            | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Bocholt                  | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Celle                    | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Fulda                    | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Kempten (Allgäu)         | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Aalen                    | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Lippstadt                | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Dinslaken                | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Herford                  | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Kerpen                   | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Rüsselsheim am Main      | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Neuwied                  | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Weimar                   | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Sindelfingen             | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Rosenheim                | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Plauen                   | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Grevenbroich             | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Neubrandenburg           | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Friedrichshafen          | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Garbsen                  | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Bergheim                 | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Hürth                    | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Schwäbisch Gmünd         | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Offenburg                | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Greifswald               | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Wesel                    | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Göppingen                | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Neu-Ulm                  | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Stralsund                | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Langenfeld (Rheinland)   | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Unna                     | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Lingen (Ems)             | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Euskirchen               | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Hameln                   | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Frankfurt (Oder)         | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Görlitz                  | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Waiblingen               | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Sankt Augustin           | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Hilden                   | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Eschweiler               | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Stolberg (Rhld.)         | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Meerbusch                | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Baden-Baden              | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Bad Homburg vor der Höhe | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Langenhagen              | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Pulheim                  | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Wetzlar                  | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Nordhorn                 | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Schweinfurt              | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Hattingen                | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Willich                  | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Ibbenbüren               | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Passau                   | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Wolfenbüttel             | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Elmshorn                 | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Speyer                   | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Bad Kreuznach            | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Ravensburg               | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Böblingen                | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Gummersbach              | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Goslar                   | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Rastatt                  | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Peine                    | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Emden                    | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Lörrach                  | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
| ⬜  | Freising                 | kein Änderungsdatum       | OpenStreetMap, zuletzt vor 0 Tagen geholt                                                                                                      |
