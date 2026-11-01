# Aktualität der Quellen

Stand: 2026-11-01

Erzeugt von `npm run sources:check`. Der Lauf lädt **keine** Parkplatzdaten,
er fragt nur nach dem Änderungsdatum. Nicht von Hand bearbeiten.

„Geändert“ stützt sich bei GovData auf `metadata_modified`. Das Feld meldet
jede Änderung an den Metadaten, auch eine korrigierte Beschreibung – es
heißt also „sieh nach“, nicht „die Daten sind neu“.

## Überblick

| Befund | Städte |
| --- | ---: |
| 🔄 geändert | 3 |
| 💀 nicht mehr abrufbar | 0 |
| 🟡 amtliche Quelle ungenutzt | 6 |
| ✅ unverändert | 8 |
| ❔ nicht prüfbar | 3 |
| ⬜ kein Änderungsdatum | 3738 |

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
npm run import:city -- bochum karlsruhe kiel rostock norderstedt viersen
```

- **Bochum** – amtliche Quelle erreichbar, verwendet wird OpenStreetMap · Quelle vom 2026-10-29 · Importvermerk: amtliche Quelle nicht nutzbar, OSM verwendet
- **Karlsruhe** – amtliche Quelle erreichbar, verwendet wird OpenStreetMap · Quelle vom 2026-11-01 · Importvermerk: amtliche Quelle nicht nutzbar, OSM verwendet
- **Kiel** – amtliche Quelle erreichbar, verwendet wird OpenStreetMap · Quelle vom 2026-11-01 · Importvermerk: amtliche Quelle nicht nutzbar, OSM verwendet
- **Rostock** – amtliche Quelle erreichbar, verwendet wird OpenStreetMap · Quelle vom 2026-10-29 · Importvermerk: amtliche Quelle „Rostocker Heide" lieferte nur 9 Stellplätze (9 Standorte) – verdächtig leer, OSM verwendet
- **Norderstedt** – amtliche Quelle erreichbar, verwendet wird OpenStreetMap · Quelle vom 2026-11-01 · Importvermerk: amtliche Quelle nicht nutzbar, OSM verwendet
- **Viersen** – amtliche Quelle erreichbar, verwendet wird OpenStreetMap · Quelle vom 2026-11-01 · Importvermerk: amtliche Quelle nicht nutzbar, OSM verwendet

## Neu zu importieren

```bash
npm run import:city -- koeln duesseldorf bielefeld
npm run import:streets
npm run import:index
```

- **Köln** – Quelle vom 2026-11-01, Import vom 2026-10-08
- **Düsseldorf** – Quelle vom 2026-11-01, Import vom 2026-11-01
- **Bielefeld** – Quelle vom 2026-11-01, Import vom 2026-11-01

## Alle Städte

| | Stadt | Befund | Einzelheiten |
| --- | --- | --- | --- |
| ❔ | Berlin | nicht prüfbar | Quelle nennt kein Änderungsdatum |
| ✅ | Hamburg | unverändert | Quelle vom 2026-11-01 · 6 Ressource(n) mit Problem |
| ⬜ | München | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| 🔄 | Köln | geändert | Quelle vom 2026-11-01, Import vom 2026-10-08 |
| ✅ | Frankfurt am Main | unverändert | Quelle vom 2026-11-01 |
| 🔄 | Düsseldorf | geändert | Quelle vom 2026-11-01, Import vom 2026-11-01 |
| ⬜ | Stuttgart | kein Änderungsdatum | OpenStreetMap, zuletzt vor 24 Tagen geholt |
| ⬜ | Leipzig | kein Änderungsdatum | OpenStreetMap, zuletzt vor 24 Tagen geholt |
| ✅ | Dortmund | unverändert | Quelle vom 2026-10-29 |
| ⬜ | Bremen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 24 Tagen geholt |
| ⬜ | Essen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 24 Tagen geholt |
| ✅ | Dresden | unverändert | Quelle vom 2026-10-29 |
| ⬜ | Nürnberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 24 Tagen geholt |
| ⬜ | Hannover | kein Änderungsdatum | OpenStreetMap, zuletzt vor 24 Tagen geholt |
| ⬜ | Duisburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 24 Tagen geholt |
| 🟡 | Bochum | amtliche Quelle ungenutzt | amtliche Quelle erreichbar, verwendet wird OpenStreetMap · Quelle vom 2026-10-29 · Importvermerk: amtliche Quelle nicht nutzbar, OSM verwendet |
| ⬜ | Wuppertal | kein Änderungsdatum | OpenStreetMap, zuletzt vor 24 Tagen geholt |
| 🔄 | Bielefeld | geändert | Quelle vom 2026-11-01, Import vom 2026-11-01 |
| ⬜ | Bonn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 24 Tagen geholt |
| ⬜ | Mannheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 24 Tagen geholt |
| 🟡 | Karlsruhe | amtliche Quelle ungenutzt | amtliche Quelle erreichbar, verwendet wird OpenStreetMap · Quelle vom 2026-11-01 · Importvermerk: amtliche Quelle nicht nutzbar, OSM verwendet |
| ⬜ | Münster | kein Änderungsdatum | OpenStreetMap, zuletzt vor 24 Tagen geholt |
| ⬜ | Augsburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 24 Tagen geholt |
| ⬜ | Wiesbaden | kein Änderungsdatum | OpenStreetMap, zuletzt vor 24 Tagen geholt |
| ❔ | Gelsenkirchen | nicht prüfbar | Quelle nennt kein Änderungsdatum |
| ⬜ | Mönchengladbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 24 Tagen geholt |
| ⬜ | Aachen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 24 Tagen geholt |
| ⬜ | Braunschweig | kein Änderungsdatum | OpenStreetMap, zuletzt vor 24 Tagen geholt |
| 🟡 | Kiel | amtliche Quelle ungenutzt | amtliche Quelle erreichbar, verwendet wird OpenStreetMap · Quelle vom 2026-11-01 · Importvermerk: amtliche Quelle nicht nutzbar, OSM verwendet |
| ⬜ | Chemnitz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 22 Tagen geholt |
| ⬜ | Magdeburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 24 Tagen geholt |
| ✅ | Freiburg im Breisgau | unverändert | Quelle vom 2026-09-23 |
| ⬜ | Krefeld | kein Änderungsdatum | OpenStreetMap, zuletzt vor 24 Tagen geholt |
| ⬜ | Halle (Saale) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 24 Tagen geholt |
| ⬜ | Mainz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 24 Tagen geholt |
| ⬜ | Erfurt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 24 Tagen geholt |
| ⬜ | Lübeck | kein Änderungsdatum | OpenStreetMap, zuletzt vor 24 Tagen geholt |
| ⬜ | Oberhausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 24 Tagen geholt |
| 🟡 | Rostock | amtliche Quelle ungenutzt | amtliche Quelle erreichbar, verwendet wird OpenStreetMap · Quelle vom 2026-10-29 · Importvermerk: amtliche Quelle „Rostocker Heide" lieferte nur 9 Stellplätze (9 Standorte) – verdächtig leer, OSM verwendet |
| ⬜ | Kassel | kein Änderungsdatum | OpenStreetMap, zuletzt vor 24 Tagen geholt |
| ⬜ | Hagen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 24 Tagen geholt |
| ⬜ | Potsdam | kein Änderungsdatum | OpenStreetMap, zuletzt vor 24 Tagen geholt |
| ⬜ | Saarbrücken | kein Änderungsdatum | OpenStreetMap, zuletzt vor 24 Tagen geholt |
| ⬜ | Hamm | kein Änderungsdatum | OpenStreetMap, zuletzt vor 24 Tagen geholt |
| ⬜ | Ludwigshafen am Rhein | kein Änderungsdatum | OpenStreetMap, zuletzt vor 24 Tagen geholt |
| ⬜ | Oldenburg (Oldb) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 24 Tagen geholt |
| ⬜ | Mülheim an der Ruhr | kein Änderungsdatum | OpenStreetMap, zuletzt vor 24 Tagen geholt |
| ⬜ | Leverkusen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 24 Tagen geholt |
| ⬜ | Darmstadt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 24 Tagen geholt |
| ⬜ | Osnabrück | kein Änderungsdatum | OpenStreetMap, zuletzt vor 24 Tagen geholt |
| ⬜ | Solingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 24 Tagen geholt |
| ⬜ | Paderborn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 24 Tagen geholt |
| ⬜ | Herne | kein Änderungsdatum | OpenStreetMap, zuletzt vor 24 Tagen geholt |
| ✅ | Heidelberg | unverändert | Quelle vom 2026-09-23 · 1 Ressource(n) mit Problem |
| ✅ | Neuss | unverändert | Quelle vom 2026-11-01 |
| ⬜ | Regensburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Ingolstadt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 24 Tagen geholt |
| ⬜ | Pforzheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 24 Tagen geholt |
| ⬜ | Würzburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 24 Tagen geholt |
| ⬜ | Offenbach am Main | kein Änderungsdatum | OpenStreetMap, zuletzt vor 24 Tagen geholt |
| ⬜ | Fürth | kein Änderungsdatum | OpenStreetMap, zuletzt vor 24 Tagen geholt |
| ⬜ | Heilbronn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 24 Tagen geholt |
| ✅ | Ulm | unverändert | Quelle vom 2026-11-01 |
| ⬜ | Wolfsburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 24 Tagen geholt |
| ⬜ | Göttingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 24 Tagen geholt |
| ⬜ | Reutlingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 24 Tagen geholt |
| ⬜ | Bremerhaven | kein Änderungsdatum | OpenStreetMap, zuletzt vor 24 Tagen geholt |
| ❔ | Bottrop | nicht prüfbar | Quelle nennt kein Änderungsdatum |
| ⬜ | Erlangen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 24 Tagen geholt |
| ⬜ | Recklinghausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 24 Tagen geholt |
| ⬜ | Remscheid | kein Änderungsdatum | OpenStreetMap, zuletzt vor 24 Tagen geholt |
| ⬜ | Koblenz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 24 Tagen geholt |
| ⬜ | Bergisch Gladbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 24 Tagen geholt |
| ⬜ | Jena | kein Änderungsdatum | OpenStreetMap, zuletzt vor 24 Tagen geholt |
| ⬜ | Salzgitter | kein Änderungsdatum | OpenStreetMap, zuletzt vor 24 Tagen geholt |
| ⬜ | Trier | kein Änderungsdatum | OpenStreetMap, zuletzt vor 24 Tagen geholt |
| ⬜ | Siegen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 24 Tagen geholt |
| ⬜ | Moers | kein Änderungsdatum | OpenStreetMap, zuletzt vor 24 Tagen geholt |
| ⬜ | Gütersloh | kein Änderungsdatum | OpenStreetMap, zuletzt vor 24 Tagen geholt |
| ⬜ | Kaiserslautern | kein Änderungsdatum | OpenStreetMap, zuletzt vor 24 Tagen geholt |
| ⬜ | Hildesheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 24 Tagen geholt |
| ⬜ | Schwerin | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Hanau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Flensburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Esslingen am Neckar | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Gera | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Cottbus | kein Änderungsdatum | OpenStreetMap, zuletzt vor 24 Tagen geholt |
| ⬜ | Düren | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Ludwigsburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Tübingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Iserlohn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Witten | kein Änderungsdatum | OpenStreetMap, zuletzt vor 24 Tagen geholt |
| ⬜ | Villingen-Schwenningen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Ratingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Gießen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Zwickau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Konstanz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Marl | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Worms | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Lünen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Minden | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| 🟡 | Norderstedt | amtliche Quelle ungenutzt | amtliche Quelle erreichbar, verwendet wird OpenStreetMap · Quelle vom 2026-11-01 · Importvermerk: amtliche Quelle nicht nutzbar, OSM verwendet |
| ⬜ | Velbert | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Delmenhorst | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Neumünster | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| 🟡 | Viersen | amtliche Quelle ungenutzt | amtliche Quelle erreichbar, verwendet wird OpenStreetMap · Quelle vom 2026-11-01 · Importvermerk: amtliche Quelle nicht nutzbar, OSM verwendet |
| ⬜ | Rheine | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Bamberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Troisdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Wilhelmshaven | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Gladbeck | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Dessau-Roßlau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Dorsten | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Arnsberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Lüneburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Detmold | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Brandenburg an der Havel | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Marburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Castrop-Rauxel | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Bocholt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Aschaffenburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Bayreuth | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Landshut | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Lüdenscheid | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Lippstadt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Kempten (Allgäu) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Aalen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Herford | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Neuwied | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Dinslaken | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Celle | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Kerpen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Grevenbroich | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Weimar | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Rüsselsheim am Main | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Plauen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Fulda | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Rosenheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Schwäbisch Gmünd | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Dormagen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 22 Tagen geholt |
| ⬜ | Offenburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Friedrichshafen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Neu-Ulm | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Hürth | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Bergheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Sindelfingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Herten | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Wesel | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Neubrandenburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Euskirchen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Langenfeld (Rhld.) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Garbsen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Göppingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Unna | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Hameln | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Stolberg (Rhld.) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Eschweiler | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Waiblingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Frankfurt (Oder) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Meerbusch | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Nordhorn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Baden-Baden | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Bad Homburg v.d.Höhe | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Sankt Augustin | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Lingen (Ems) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Pulheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Greifswald | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Görlitz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Hilden | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Wetzlar | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Schweinfurt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Bad Kreuznach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Langenhagen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Stralsund | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Bad Salzuflen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Hattingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Passau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Kleve | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Neustadt an der Weinstraße | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Ahlen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Wolfenbüttel | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Frechen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Menden (Sauerland) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Ibbenbüren | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Böblingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Lörrach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Elmshorn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Gummersbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Peine | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Lahr/Schwarzwald | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Rastatt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 22 Tagen geholt |
| ⬜ | Ravensburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Bad Oeynhausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Heidenheim an der Brenz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Gronau (Westf.) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 23 Tagen geholt |
| ⬜ | Cuxhaven | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Leonberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bergkamen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Oranienburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Straubing | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Alsdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Erftstadt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Stade | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Herzogenrath | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Landau in der Pfalz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 22 Tagen geholt |
| ⬜ | Bornheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Hennef (Sieg) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Frankenthal (Pfalz) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Rheda-Wiedenbrück | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Dülmen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bruchsal | kein Änderungsdatum | OpenStreetMap, zuletzt vor 22 Tagen geholt |
| ⬜ | Soest | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Singen (Hohentwiel) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Neunkirchen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Dachau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Fellbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Albstadt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Hof | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Oberursel (Taunus) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Melle | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Gotha | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bünde | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Filderstadt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Kaufbeuren | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Weinheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Schwerte | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Falkensee | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Rottenburg am Neckar | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Brühl | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Erkelenz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Rodgau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Wittenberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Pinneberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Neustadt am Rübenberge | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bernau bei Berlin | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Lehrte | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Memmingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Seevetal | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Erkrath | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Monheim am Rhein | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bietigheim-Bissingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Wismar | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Kaarst | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Heinsberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Borken | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Gifhorn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Aurich | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Schwäbisch Hall | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Amberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Siegburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Weiden i.d.OPf. | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Kamen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Kirchheim unter Teck | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Nettetal | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Laatzen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Buchholz in der Nordheide | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Dreieich | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Schorndorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Freiberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Eberswalde | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Wunstorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Hückelhoven | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Leinfelden-Echterdingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bensheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Neumarkt i.d.OPf. | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Coburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Völklingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Germering | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Buxtehude | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Schwabach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Löhne | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Nürtingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Nordhausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Eisenach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Ansbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Königswinter | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Ahaus | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Würselen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Pirna | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Lemgo | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Ostfildern | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Pirmasens | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Kehl | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Mettmann | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Königs Wusterhausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Freital | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Hofheim am Taunus | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Maintal | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Ilmenau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Backnang | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Langen (Hessen) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Ettlingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 22 Tagen geholt |
| ⬜ | Niederkassel | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Coesfeld | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Kamp-Lintfort | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Greven | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Haltern am See | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Wesseling | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Weißenfels | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Neu-Isenburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Halberstadt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Stendal | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Warendorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Saarlouis | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bautzen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Fürstenfeldbruck | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Papenburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Erding | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Beckum | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Tuttlingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Sinsheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Winsen (Luhe) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Meppen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bitterfeld-Wolfen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Cloppenburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Porta Westfalica | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Mühlhausen/Thüringen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Emsdetten | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bad Vilbel | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Limburg a.d.Lahn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Crailsheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Voerde (Niederrhein) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Balingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Dietzenbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Datteln | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | St. Ingbert | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Lage | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Deggendorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Ingelheim am Rhein | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Hemer | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Geldern | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Wedel | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Goch | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Jülich | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Steinfurt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Suhl | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Rheinfelden (Baden) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Korschenbroich | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Biberach an der Riß | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Ahrensburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Viernheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Merseburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Wermelskirchen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Seelze | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Herrenberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Kempen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Leer (Ostfriesland) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Kornwestheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Barsinghausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Stuhr | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Schwedt/Oder | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Vechta | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Geesthacht | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Zweibrücken | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Forchheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Radebeul | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bad Nauheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Achim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Uelzen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Itzehoe | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Nienburg (Weser) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Lampertheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Weil am Rhein | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Wernigerode | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Delbrück | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Fürstenwalde/Spree | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Neuruppin | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Naumburg (Saale) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Emmerich am Rhein | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Radolfzell am Bodensee | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Merzig | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Mörfelden-Walldorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Ganderkesee | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Oer-Erkenschwick | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Georgsmarienhütte | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Rheinberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Altenburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Geestland | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Burgdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Walsrode | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bernburg (Saale) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Lohmar | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Weyhe | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Kreuztal | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bad Hersfeld | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Hoyerswerda | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Rendsburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Schönebeck (Elbe) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Friedberg (Hessen) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bretten | kein Änderungsdatum | OpenStreetMap, zuletzt vor 22 Tagen geholt |
| ⬜ | Werne | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Idar-Oberstein | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Taunusstein | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Neuburg a.d.Donau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Haan | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Rietberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Andernach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Gevelsberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Friedberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Schwandorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Winnenden | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Wedemark | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Einbeck | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Osterholz-Scharmbeck | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bad Zwischenahn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Meschede | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Werl | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Gaggenau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 22 Tagen geholt |
| ⬜ | Ludwigsfelde | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Emmendingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Ennepetal | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Riesa | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Griesheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Landsberg am Lech | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Tönisvorst | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Baesweiler | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Mühlheim am Main | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Mechernich | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Waltrop | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Blankenfelde-Mahlow | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Saalfeld/Saale | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Güstrow | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Vaihingen an der Enz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Meißen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Rödermark | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Rösrath | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Springe | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Arnstadt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bühl | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Geilenkirchen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Unterschleißheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Hattersheim am Main | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Wangen im Allgäu | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Zeitz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Henstedt-Ulzburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Garmisch-Partenkirchen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Kevelaer | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Reinbek | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bramsche | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Kelkheim (Taunus) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Höxter | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Lohne (Oldenburg) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Wegberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Leichlingen (Rhld.) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bad Neuenahr-Ahrweiler | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Schwelm | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Baunatal | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Königsbrunn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Heppenheim (Bergstraße) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Geislingen an der Steige | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Ehingen (Donau) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Wiesloch | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Strausberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Teltow | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Sundern (Sauerland) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Grimma | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Northeim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Olching | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Neukirchen-Vluyn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Verden (Aller) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Weinstadt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Werder (Havel) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Butzbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Pfaffenhofen a.d.Ilm | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Rheinbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Hamminkeln | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Leimen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Hohen Neuendorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Lübbecke | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Mühlacker | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Achern | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Hennigsdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Overath | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Kulmbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Weiterstadt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Unterhaching | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Neckarsulm | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Schloß Holte-Stukenbrock | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Heiligenhaus | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Zirndorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Remseck am Neckar | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Lauf a.d.Pegnitz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Wetter (Ruhr) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Geretsried | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Selm | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Delitzsch | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Nordenham | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Friedrichsdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Lindau (Bodensee) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Verl | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Waldkraiburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Öhringen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Horb am Neckar | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Aschersleben | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Rinteln | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Espelkamp | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Harsewinkel | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Roth | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | St. Wendel | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Salzkotten | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Brilon | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Pfungstadt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Sangerhausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Groß-Gerau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bingen am Rhein | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Schleswig | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Petershagen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Markkleeberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bedburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Obertshausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Zittau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Syke | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Lüdinghausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Stutensee | kein Änderungsdatum | OpenStreetMap, zuletzt vor 22 Tagen geholt |
| ⬜ | Norden | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Wiehl | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Helmstedt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Rathenow | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bad Honnef | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Waldshut-Tiengen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Meiningen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Calw | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Ellwangen (Jagst) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Warstein | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Rottweil | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Vaterstetten | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Weingarten | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Meckenheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Rudolstadt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bad Oldesloe | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Schmallenberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Varel | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Eisenhüttenstadt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Olpe | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Wandlitz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Starnberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Freudenstadt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Mosbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Plettenberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Haren (Ems) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Übach-Palenberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Lennestadt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Herzogenaurach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Sprockhövel | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Leutkirch im Allgäu | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Köthen (Anhalt) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Husum | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Isernhagen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bad Mergentheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Westerstede | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Jüchen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Nagold | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Döbeln | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Ronnenberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Alfter | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Limbach-Oberfrohna | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Senden | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Attendorn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Neu Wulmstorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Kaltenkirchen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Hann.Münden | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Senftenberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Sehnde | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Gersthofen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Moormerland | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Gelnhausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Weilheim i.OB | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Warburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bad Kissingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Staßfurt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Metzingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Riedstadt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Quedlinburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Rotenburg (Wümme) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bad Soden am Taunus | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Vreden | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Netphen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Dillenburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Salzwedel | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Kitzingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Neusäß | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Korbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Rastede | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Haar | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Wertheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Sonneberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Laupheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Ottobrunn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Apolda | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Herdecke | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Überlingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bad Rappenau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Ditzingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Eppingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Stadthagen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Wallenhorst | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Karben | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Burg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bad Salzungen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Lengerich | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Quickborn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Soltau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Eisleben | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Mühldorf a.Inn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Waghäusel | kein Änderungsdatum | OpenStreetMap, zuletzt vor 22 Tagen geholt |
| ⬜ | Büdingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Eschborn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Eislingen/Fils | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Aichach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Heide | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Rees | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Gauting | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Gardelegen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Donaueschingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Zülpich | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Schwetzingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bad Krozingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Mössingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Sonthofen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Germersheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 22 Tagen geholt |
| ⬜ | Hockenheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Lindlar | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Wipperfürth | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Osterode am Harz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Büren | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Radevormwald | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Eckernförde | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Dillingen/Saar | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Versmold | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Waldkirch | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Glauchau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Stadtallendorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Elsdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Günzburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Zossen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Karlsfeld | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Halle (Westf.) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Schifferstadt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Flörsheim am Main | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Seligenstadt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Rheinstetten | kein Änderungsdatum | OpenStreetMap, zuletzt vor 22 Tagen geholt |
| ⬜ | Groß-Umstadt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Xanten | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Wildeshausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Panketal | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Spremberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Westoverledingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Zerbst/Anhalt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Neufahrn b.Freising | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Luckenwalde | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Schortens | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Stadtlohn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Geseke | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Sondershausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Traunstein | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Puchheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Senden | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bad Waldsee | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Dingolfing | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Wülfrath | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Enger | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Schramberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Werdau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bruchköbel | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Fröndenberg/Ruhr | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Lichtenfels | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Coswig | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Wachtberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Herborn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Haßloch | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Ochtrup | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Burgwedel | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Traunreut | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Duderstadt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Nördlingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Schopfheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Steinhagen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Neunkirchen-Seelscheid | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Waren (Müritz) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Blieskastel | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Neustrelitz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Hörstel | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Lilienthal | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Borna | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Nidderau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Müllheim im Markgräflerland | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Telgte | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Uetze | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Wilnsdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Wittmund | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Kürten | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Meinerzhagen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Moosburg a.d.Isar | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Torgau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Donauwörth | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Giengen an der Brenz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Leinefelde-Worbis | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bad Schwartau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Schwanewede | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Schenefeld | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bad Friedrichshall | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Oberkirch | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Ennigerloh | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bad Tölz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Hechingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Dillingen a.d.Donau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Reichenbach im Vogtland | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Waldbröl | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Greiz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Pfullingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Engelskirchen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bad Pyrmont | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Mayen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Nauen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Rhede | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Hiddenhausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Wolfratshausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Korntal-Münchingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Mölln | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Burghausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Marsberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Windeck | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bad Harzburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Alzey | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Lebach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Wenden | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Sarstedt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Sulzbach-Rosenberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Gröbenzell | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Weil der Stadt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Schmalkalden | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Heusenstamm | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Kleinmachnow | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Burscheid | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Neuenhagen bei Berlin | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Eitorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bad Dürkheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Schönefeld | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Haldensleben | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Kolbermoor | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bad Driburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Gilching | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Wittlich | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Schneverdingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Weilerswist | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Blankenburg (Harz) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Hemmingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Prenzlau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Holzminden | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Haiger | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Aue-Bad Schlema | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Oschersleben (Bode) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Schwalmtal | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Annaberg-Buchholz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Hohe Börde | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Eschwege | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Lahnstein | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Reichshof | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Radeberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Kronberg im Taunus | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Seesen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Sachsenheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bergneustadt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Marktoberdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Swisttal | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Hessisch Oldendorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Renningen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Sömmerda | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bad Aibling | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Illertissen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Heusweiler | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Hochheim am Main | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Schwalmstadt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bad Segeberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Gerlingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Wörth am Rhein | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Südbrookmerland | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Püttlingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Weißenburg i.Bay. | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Vlotho | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Rhauderfehn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bad Münstereifel | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bad Reichenhall | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Crimmitschau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Heilbad Heiligenstadt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Buchen (Odenwald) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Hoppegarten | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Großenhain | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Pfinztal | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Kreuzau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Taufkirchen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Vechelde | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Konz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Schwalbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Ismaning | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Vilshofen an der Donau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Halstenbek | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Alzenau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Wadgassen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Alfeld (Leine) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bobingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Parchim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bad Saulgau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Schrobenhausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bexbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bad Säckingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bönen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Babenhausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Pohlheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Vellmar | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Garching b.München | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Diepholz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Oberasbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Stockach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Frankenberg (Eder) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Freilassing | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Remagen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Holzwickede | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Nümbrecht | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Damme | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Trossingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Cham | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Gescher | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bad Wildungen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Freudenberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Horn-Bad Meinberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Auerbach/Vogtl. | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Eutin | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bad Münder am Deister | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Sinzig | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bad Lippspringe | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Oerlinghausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Leopoldshöhe | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Forst (Lausitz) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Marktredwitz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Kelheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Nidda | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Wittenberge | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Eltville am Rhein | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Penzberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Finnentrop | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Schwarzenbek | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Schmelz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Hünfeld | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bad Wörishofen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Kamenz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Künzell | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Sigmaringen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Hövelhof | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bad Bentheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Eggenstein-Leopoldshafen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Thale | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Brackenheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Wurster Nordseeküste | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bruckmühl | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bad Langensalza | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Heidenau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Königstein im Taunus | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Gunzenhausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Eppelborn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Kelsterbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Altena | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Kronach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Simmerath | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bassum | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Poing | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Blaustein | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Eilenburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Losheim am See | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Preetz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Reinheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Ginsheim-Gustavsburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Breisach am Rhein | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Wardenburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Straelen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Wadern | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Kierspe | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Wendelstein | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Herzebrock-Clarholz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Pocking | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Seeheim-Jugenheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Oyten | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Sulzbach/Saar | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Künzelsau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Kirchlengern | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Halver | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Regenstauf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Holzkirchen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Erwitte | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Stockelsdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Drensteinfurt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Hille | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Kirchhain | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bargteheide | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Wurzen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Brüggen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Rahden | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Markranstädt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Brakel | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Walldorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Marienberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Stahnsdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bad Arolsen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Karlsbad | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Petersberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Loxstedt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Hude (Oldb) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Wendlingen am Neckar | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Neustadt in Holstein | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Erlensee | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Kernen im Remstal | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Rüdersdorf bei Berlin | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Großostheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Ascheberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Schiffweiler | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Dieburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Guben | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Odenthal | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Lübbenau/Spreewald | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Boppard | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Schlüchtern | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Usingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Zeulenroda-Triebes | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Eppelheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Stadtbergen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Großenkneten | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Templin | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bitburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Mindelheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Ratekau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Freiberg am Neckar | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Finsterwalde | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Blomberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Altdorf b.Nürnberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Grenzach-Wyhlen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Schwarzenberg/Erzgeb. | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Marbach am Neckar | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Baiersbronn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Schwalbach am Taunus | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Beckingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bad Bramstedt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bad Neustadt a.d.Saale | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Petershagen/Eggersdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Ebersbach an der Fils | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Michelstadt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Königslutter am Elm | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Ribnitz-Damgarten | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Sandhausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Alsfeld | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Gehrden | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Raunheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Füssen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Schwabmünchen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Langenau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Mainburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Weener | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Schriesheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Brake (Unterweser) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Mühlenbecker Land | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Mering | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Garrel | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Isny im Allgäu | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Witzenhausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Grefrath | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Reken | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Ober-Ramstadt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Abensberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Niederzier | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Ratzeburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Rellingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Weißwasser/O.L. | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Lohr a.Main | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Langerwehe | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Montabaur | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Malsch | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Stein | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Oberndorf am Neckar | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Ritterhude | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Münster (Hessen) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Landau a.d.Isar | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Harsefeld | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Neustadt a.d.Donau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Jever | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Landsberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Münsingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Selb | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Karlstadt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Eberbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Homberg (Efze) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Olsberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Büttelborn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Pattensen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Langwedel | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Fredersdorf-Vogelsdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Eching | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Niederkrüchten | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bissendorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Kraichtal | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Langelsheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Schiffdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Tornesch | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Wilsdruff | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Lengede | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Burglengenfeld | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Much | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Gründau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Sassenberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Burbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Murrhardt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Kalkar | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Fritzlar | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Plochingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Aßlar | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Hückeswagen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Eckental | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Löbau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Hainburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Langenselbold | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Hofgeismar | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Ahrensfelde | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Grünstadt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Hilchenbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Gernsbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Immenstadt i.Allgäu | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Saterland | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Niedernhausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Neu-Anspach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Tostedt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Remshalden | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Neubiberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Brühl | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Löningen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Uhingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Markdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Riegelsberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Lorsch | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Eggenfelden | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bad Camberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Ottweiler | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Wennigsen (Deister) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Angermünde | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Neutraubling | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Holzgerlingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Oschatz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Lauda-Königshofen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Krumbach (Schwaben) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Lich | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Sendenhorst | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Sylt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Freigericht | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Erbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Markgröningen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Leuna | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Sandersdorf-Brehna | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Schwentinental | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Rommerskirchen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bovenden | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Lauchhammer | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Rosengarten | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Großefehn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Lübben (Spreewald) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Quakenbrück | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Melsungen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | St. Leon-Rot | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Maisach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Zeven | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Mühltal | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Grafing b.München | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Erbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Dippoldiswalde | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Neuenkirchen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Clausthal-Zellerfeld | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Eichstätt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Beelitz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Lohfelden | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Haßfurt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Friesenheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Mittweida | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Waldbronn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Buchloe | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Hohenstein-Ernstthal | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Barßel | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Lotte | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Obersulm | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Philippsburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Meckenbeuren | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Wanzleben-Börde | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Ettenheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Borchen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Denzlingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bad Soden-Salmünster | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Feucht | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Spaichingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Michendorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Grünberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Hünxe | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Pegnitz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Frankenberg/Sa. | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Hilpoltstein | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Linnich | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Asperg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Markt Schwaben | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Jessen (Elster) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Saarwellingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bedburg-Hau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bad Schönborn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Solms | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Schleiden | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Meerane | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Schüttorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Schmölln | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Uslar | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Haselünne | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Schermbeck | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Gräfelfing | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bergen auf Rügen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Östringen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Tauberbischofsheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Pfullendorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Lappersdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Genthin | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Wentorf bei Hamburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Gangelt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Mutterstadt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Sulingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Kirchheim b.München | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Schneeberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Marienheide | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Neckargemünd | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Oberhaching | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Hüllhorst | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Barsbüttel | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Neustadt a.d.Aisch | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Hagen am Teutoburger Wald | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Weinsberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Kalletal | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Fehmarn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Brieselang | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Kerken | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Ubstadt-Weiher | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Olfen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Winterberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Twistringen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Plattling | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Treuchtlingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Roding | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bad Dürrheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bad Laasphe | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Peißenberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Altötting | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Wehr | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Ketsch | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Schöneiche bei Berlin | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Roßdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bohmte | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Hadamar | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bad Doberan | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Eppstein | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Lauterbach (Hessen) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Hösbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Manching | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Teutschenthal | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bad Salzdetfurth | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Oebisfelde-Weferlingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Weilburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bergen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bischofsheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Biedenkopf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Wietmarschen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bebra | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Rotenburg a.d.Fulda | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Gärtringen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Jüterbog | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Ladenburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Cremlingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Quierschied | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Sulz am Neckar | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Kaufungen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Trebur | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Titisee-Neustadt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Herzberg am Harz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bad Fallingbostel | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Hettstedt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Weeze | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Altenstadt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Pfarrkirchen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Hungen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Fuldatal | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bad Urach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Wächtersbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Velten | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Blaubeuren | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bretzfeld | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Neunkirchen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Brunsbüttel | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Dossenheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Neuenburg am Rhein | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Velen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Beverungen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Mettlach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Möckern | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Wolfhagen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Schongau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Feuchtwangen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bad Abbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Röthenbach a.d.Pegnitz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Alpen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Neuhausen auf den Fildern | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Emstek | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Linkenheim-Hochstetten | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Gaimersheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Rödental | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Graben-Neudorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bad Windsheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Preußisch Oldendorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Hirschaid | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Issum | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Laichingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bad Wünnenberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Gladenbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Ebersberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Niefern-Öschelbronn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Monschau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Ense | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Ihlow | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Wasserburg a.Inn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Hersbruck | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Hessisch Lichtenau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Wolmirstedt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Meitingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Tamm | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | St. Georgen im Schwarzwald | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Heddesheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Zetel | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Edemissen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Osterhofen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Oftersheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Borken (Hessen) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Rielasingen-Worblingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Besigheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Dinkelsbühl | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Salem | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Rosdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Vilsbiburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Kronshagen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Wernau (Neckar) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bad Sassendorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Lauffen am Neckar | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Gundelfingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Glienicke/Nordbahn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Zella-Mehlis | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Oberkrämer | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Geeste | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Apen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Steinheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Leutenbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Wettenberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Hagenow | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Perleberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Gaildorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Welver | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Essenbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Murnau a.Staffelsee | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Stelle | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Ludwigslust | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Hallbergmoos | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Billerbeck | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Uplengen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Anklam | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Hemsbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Drolshagen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Sassenburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Steinheim an der Murr | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Ostrhauderfehn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Teningen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Lippetal | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bad Freienwalde (Oder) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Lehre | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Unterföhring | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Oberschleißheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Eichenzell | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Schöneck | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Neustadt in Sachsen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Peiting | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Remchingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Durmersheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Rangsdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Scharbeutz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Jork | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Oberderdingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bad Nenndorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Limburgerhof | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Schwaigern | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Kissing | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Lauenburg/Elbe | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Mettingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Erkner | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Leingarten | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Wickede (Ruhr) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Hildburghausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Walldürn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Sinzheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Korb | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Lindenberg i.Allgäu | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Miesbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Geisenfeld | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bopfingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Handewitt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Rudersberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Gerstetten | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Eichenau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Muldestausee | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bad Schwalbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Ammerbuch | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bad Dürrenberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Lauingen (Donau) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Eningen unter Achalm | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Ostbevern | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Burgthann | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Dautphetal | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Oestrich-Winkel | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Zeuthen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Diez | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Marktheidenfeld | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Krummhörn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Geisenheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Straubenhardt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Rothenburg ob der Tauber | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Zwönitz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Kriftel | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Waldkirchen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Rheinau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Recke | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Trostberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Schwieberdingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Drochtersen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Engen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Kranenburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Altdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Möhnesee | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Welzheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Rutesheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Isselburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Cadolzburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Balve | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Ochsenfurt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Mömbris | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Südheide | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Kall | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Grünwald | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Riedlingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Raubling | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Mülheim-Kärlich | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Wittingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Coswig (Anhalt) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Stollberg/Erzgeb. | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bannewitz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bad Belzig | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Niestetal | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Herrsching a.Ammersee | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Herxheim bei Landau/Pfalz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Denkendorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Gengenbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Schöningen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Rodenbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Werther (Westf.) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Boizenburg/Elbe | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Braunfels | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Höhenkirchen-Siegertsbrunn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Wustermark | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Regen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Planegg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Burgkirchen a.d.Alz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Wolgast | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Lichtenau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Langgöns | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Egelsbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Eisenberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Oelsnitz/Erzgeb. | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Ebersbach-Neugersdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Haigerloch | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Prien a.Chiemsee | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Neuhof | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Ruppichteroth | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Dallgow-Döberitz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Lichtenstein/Sa. | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Hasbergen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Gottmadingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Malente | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Kleinblittersdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Steinbach (Taunus) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Mandelbachtal | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bad Staffelstein | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Adendorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Grafschaft | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Schkopau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Fürth | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Lorch | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Selfkant | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Möglingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Herbolzheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Nideggen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Nordkirchen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Kenzingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Feldkirchen-Westerham | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Schwielowsee | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Wildau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Hagen im Bremischen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Diedorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Karlsdorf-Neuthard | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Meßstetten | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Dießen am Ammersee | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Burgau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Weinböhla | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bad Iburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Taufkirchen (Vils) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Böhl-Iggelheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Plankstadt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Schorfheide | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bischofswerda | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Donzdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Emsbüren | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Stephanskirchen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Morsbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Hüttenberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Morbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Felsberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Weingarten (Baden) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Gronau (Leine) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Schönwalde-Glien | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Nauheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Nossen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Schalksmühle | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Wald-Michelbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bogen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Langenzenn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Aulendorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Büdelsdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Burgstädt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Steinen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bad Wildbad | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Klipphausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Werlte | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Hünstetten | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Appenweier | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Betzdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Braunsbedra | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Schauenburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Kirchseeon | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Goldenstedt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Anröchte | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Rüthen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Markt Indersdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Friedeburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Altenberge | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Kirchzarten | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Simbach a.Inn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Mörlenbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Steinfeld (Oldenburg) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Schleusingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Birkenfeld | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Lollar | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Tangermünde | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Königsbach-Stein | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Wendeburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Kirkel | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Steinau an der Straße | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Flöha | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Niebüll | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Grevesmühlen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Kirchlinteln | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Mengen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Meuselwitz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bestwig | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Lenggries | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Willstätt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Tangerhütte | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Merchweiler | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Gommern | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Hilter am Teutoburger Wald | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Rödinghausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Oelsnitz/Vogtl. | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bobenheim-Roxheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Bad Ems | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Schwaikheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Nordwalde | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Querfurt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Blumberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 3 Tagen geholt |
| ⬜ | Dettingen an der Erms | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ammersbek | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ohrdruf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wildberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Weil im Schönbuch | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Münchberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Kaufering | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Olbernhau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Nohfelden | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Rehburg-Loccum | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bad Orb | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Tutzing | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Gudensberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Neuried | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ottendorf-Okrilla | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Walzbachtal | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Biebertal | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Rüdesheim am Rhein | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Elchingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Altenholz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Niddatal | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Südlohn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Goldbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Emmerthal | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Nersingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ilsfeld | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Pliezhausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hünfelden | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Eschenburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Kösching | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Everswinkel | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Plüderhausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Höchst i.Odw. | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Visbek | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Erlenbach a.Main | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bad Frankenhausen/Kyffhäuser | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Oldenburg in Holstein | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Nieder-Olm | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Trebbin | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Klötze | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Laubach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Heilsbronn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Linsengericht | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Veitshöchheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Roßtal | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Brandis | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Osthofen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hirschberg an der Bergstraße | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Schotten | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Altlandsberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bad Breisig | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Aichtal | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Demmin | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Birkenau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Oberhausen-Rheinhausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Höchberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Schulzendorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wettin-Löbejün | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Oberharz am Brocken | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Runkel | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Kißlegg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Magstadt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bisingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Perl | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Töging a.Inn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wertingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Heiligenhafen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Großhansdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bockenem | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Visselhövede | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Zorneding | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Oberzent | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Sebnitz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wilkau-Haßlau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wölfersheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Höhr-Grenzhausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ilsenburg (Harz) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ehringshausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Werneuchen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Giesen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Nuthetal | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Osterburg (Altmark) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ochsenhausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Essen (Oldenburg) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Miltenberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Großbeeren | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Kandel | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Laufenburg (Baden) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Worpswede | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wallerfangen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Schmitten im Taunus | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | March | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Zwenkau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bad Liebenzell | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Oberstdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ehningen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Urbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Alsbach-Hähnlein | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Schlitz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wehrheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Mücke | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Kolkwitz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Salzhemmendorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Lügde | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Elsenfeld | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Kemberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hohenmölsen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ebsdorfergrund | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ilvesheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Luckau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Frickenhausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hilzingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hürtgenwald | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Storkow (Mark) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Gäufelden | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Lüchow (Wendland) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Altenbeken | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bleckede | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Aschheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wangerland | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Nittenau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Dassel | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Barleben | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Steinbach-Hallenberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Adelsdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Schaafheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Reinfeld (Holstein) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Tecklenburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Florstadt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Dielheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Gomaringen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Biblis | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Fehrbellin | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Vallendar | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Zwiesel | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Titz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Rehau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bad Schussenried | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Mendig | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hohenbrunn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Weißenthurm | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Kusterdingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Neuötting | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Waldheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bad Gandersheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Grünheide (Mark) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bruchhausen-Vilsen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wunsiedel | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Niesky | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bad Griesbach i.Rottal | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Nittendorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Obernkirchen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Nettersheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Torgelow | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bad Laer | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Sassnitz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Liederbach am Taunus | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Gerstungen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bad Lauchstädt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Elze | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wetter (Hessen) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Kabelsketal | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Neuenkirchen-Vörden | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bockhorn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Borgholzhausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Sulzbach (Taunus) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Plön | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Südharz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Breckerfeld | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Kappeln | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Brand-Erbisdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Neuried | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Roetgen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hallstadt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Obertraubling | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Naunhof | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Heek | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ueckermünde | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Schwaig b.Nürnberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Zschopau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Waldenbuch | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Rimbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Langweid a.Lech | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Dörverden | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Herzberg (Elster) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Kressbronn am Bodensee | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bad Bergzabern | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Eslohe (Sauerland) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Großenlüder | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Kandern | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hemmoor | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bellheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Keltern | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Efringen-Kirchen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Möckmühl | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Sinntal | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wissen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Meßkirch | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Rauenberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Weilmünster | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Untergruppenbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Gleichen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Furth im Wald | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Sande | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Pullach i.Isartal | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Sülzetal | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Obernburg a.Main | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Schladen-Werla | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Fürstenzell | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Schnaittach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Allersberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wörrstadt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Volkach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Biederitz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Dornburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Geratal | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Schleiz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Dietmannsried | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Garching a.d.Alz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Nonnweiler | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Fuldabrück | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Seegebiet Mansfelder Land | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Rülzheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Neuhaus am Rennweg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Staufen im Breisgau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Kahl a.Main | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Doberlug-Kirchhain | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Blankenheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ortenberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ballenstedt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Furtwangen im Schwarzwald | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Schierling | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Möser | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Woltersdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bad Rothenfelde | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Heikendorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Reichenbach an der Fils | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Viechtach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Kleinostheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Großräschen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Friedland | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Landstuhl | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Niederwerrn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Timmendorfer Strand | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Siegsdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Stadtilm | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Langenberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Herrieden | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Staufenberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Meine | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Heroldsberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Willebadessen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Unterwellenborn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hainichen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Colditz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Lützen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Schwarzenbruck | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Biebergemünd | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Borsdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Kuppenheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bersenbrück | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Moritzburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wachtendonk | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hermsdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Uhldingen-Mühlhofen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Grafenau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bad Feilnbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Simmern/Hunsrück | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Dornstetten | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hohberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Mücheln (Geiseltal) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Lahnau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Lauter-Bernsbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Aspach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hausham | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Neuenbürg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bad Sooden-Allendorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Neuendettelsau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Lauchringen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Zell am Harmersbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Helmbrechts | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bönnigheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bad Endorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Schieder-Schwalenberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Kühlungsborn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Elz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Forst | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Nierstein | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Sauerlach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hüfingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Teublitz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Penig | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Premnitz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Neunkirchen a.Brand | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bad Lausick | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Salach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Amt Wachsenburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Meinersen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Haibach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Jettingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bad Sulza | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Beeskow | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Oranienbaum-Wörlitz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bad Füssing | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Lenningen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Dannenberg (Elbe) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Neresheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Salzbergen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Nessetal | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Birkenwerder | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bad Endbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Loßburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Postbauer-Heng | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Medebach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Weikersheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hemmingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Saulheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Baiersdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Althengstett | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Drei Gleichen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Könnern | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Aldingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bordesholm | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Krailling | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hellenthal | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Georgenthal | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Altomünster | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Parsberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Barby | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ehrenkirchen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hengersberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Asbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Erzhausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Illingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Untermeitingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Gundelfingen a.d.Donau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Feldkirchen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Heuchelheim a.d.Lahn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Elsteraue | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bühlertal | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Jesteburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Oberkochen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bützow | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Weissach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bad Grund (Harz) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Nörten-Hardenberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Sögel | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Grasberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bad Düben | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Teuchern | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Lastrup | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Rheinsberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Berchtesgaden | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Küps | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bad Herrenalb | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Löffingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Emlichheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Pfronten | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bad Wimpfen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Kirchberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Elsterwerda | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bad Liebenstein | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bismark (Altmark) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Algermissen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Oberstaufen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Schweich | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ramstein-Miesenbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Vetschau/Spreewald | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bergkirchen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Schonungen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Seefeld | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Calau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Inden | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Schömberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Radeburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Daun | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Rimpar | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Holdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Renchen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Münnerstadt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Großmehring | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Vohenstrauß | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Weissach im Tal | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Oederan | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Barth | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Stadland | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Seeland | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Gettorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Treuenbrietzen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Oberstenfeld | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Allstedt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Dörentrup | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Horstmar | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Jockgrim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Langenargen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Dittelbrunn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Elzach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Otterndorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ahnatal | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Saarburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bad Kötzting | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Dannstadt-Schauernheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Flintbek | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Söhlde | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Naila | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Lugau/Erzgeb. | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Sontra | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bunde | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Altenberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Gundelsheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Klettgau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Heidenrod | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Leipheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Flein | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Schellerten | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Sulzbach a.Main | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Türkheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Heidesee | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bad Berka | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Großkarolinenfeld | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hasselroth | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Baienfurt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Edermünde | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Belgern-Schildau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Burkardroth | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Allensbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Friedrichroda | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Pleinfeld | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Laufen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Sinzing | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ortenburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Schwülper | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Mittenwald | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Pfaffenhofen a.d.Roth | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Harzgerode | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Harztor | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Klingenthal | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Pfalzgrafenweiler | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Zwingenberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wabern | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Alfdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hardegsen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Pulsnitz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wallersdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Weimar (Lahn) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Enkenbach-Alsenborn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ampfing | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Am Mellensee | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bad Sachsa | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Haslach im Kinzigtal | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Nortorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Schwanstetten | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Meldorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Neulußheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Annweiler am Trifels | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bindlach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Greding | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Burgebrach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Roßwein | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Neukieritzsch | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Scheßlitz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Schwendi | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Namborn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Stolzenau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Freyung | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Immenhausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Maxdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Tuntenhausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Oppenheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Waldstetten | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ostrach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Birkenfeld | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Roßleben-Wiehe | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Markneukirchen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bischofswiesen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Berne | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Schöppingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Königsbronn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Sonnenbühl | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Pöttmes | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Am Ettersberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Reinsdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Waging a.See | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Reppenstedt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Lemwerder | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Esens | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Jettingen-Scheppach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Lautertal (Odenwald) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ilshofen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Königsee | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Homberg (Ohm) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Geiselhöring | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Nobitz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Reichelsheim (Wetterau) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Neuhofen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Eiterfeld | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Schallstadt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Durach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Lichtenau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Lambsheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Grassau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Lengenfeld | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Georgensgmünd | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ladbergen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Saerbeck | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Waldeck | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Höchstädt a.d.Donau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Murg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Edenkoben | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Dermbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bakum | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Geithain | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Dettelbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Berglen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bernau a.Chiemsee | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Neukirchen/Erzgeb. | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Putzbrunn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Dietenheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Auenwald | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Müncheberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Horneburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Grömitz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bonndorf im Schwarzwald | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hardheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Eberdingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Dinkelscherben | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Eibenstock | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Schönkirchen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Erndtebrück | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Böhlen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Mutlangen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Stadtroda | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Dettenheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Lathen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Malchin | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Altenkirchen (Westerwald) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Gröditz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Büchen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Leegebruch | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bernkastel-Kues | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Niedere Börde | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Mallersdorf-Pfaffenberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ebermannstadt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ketzin/Havel | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hermeskeil | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Polch | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Heringen (Werra) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Kupferzell | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Brannenburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Zusmarshausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Tiefenbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Osterburken | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Neuenstein | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Schelklingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Gau-Algesheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bardowick | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Mitterteich | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Weisendorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wöllstadt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Schliersee | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Schöffengrund | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Klingenberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Immendingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Grasbrunn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Grafenau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Huy | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Murr | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Pegau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Heitersheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Laudenbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bispingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Jerichow | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Neustadt-Glewe | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bad Sobernheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Fockbek | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Holle | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Greifenstein | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Nattheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Machern | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Blankenhain | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Moringen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Metelen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Volkmarsen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Salzweg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Sanitz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Haag i.OB | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Rheinmünster | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Neustadt (Wied) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hage | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Biebesheim am Rhein | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Kiefersfelden | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Herdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hartha | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Gerbrunn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Cölbe | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Sinn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Sottrum | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Kalbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bad Brückenau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Buttstädt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bietigheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Burgkunstadt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Artern | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Maulbronn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Rheurdt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Röhrmoos | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Immenstaad am Bodensee | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Uffenheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Eppertshausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Eggolsheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Glashütte | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wassertrüdingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Beilstein | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Mainleus | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Thannhausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Burghaun | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Güglingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Zellingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Römhild | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Vilseck | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Unstrut-Hainich | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bad Hönningen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hanstedt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Petershausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ottersweier | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Waldachtal | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Eichwalde | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bad Saarow | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hachenburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Satow | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Neumarkt-Sankt Veit | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hutthurm | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Benningen am Neckar | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Otzberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Brechen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Altlußheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Sohland a.d.Spree | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Veitsbronn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Schwabhausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ihringen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Glücksburg (Ostsee) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Rodenberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Kämpfelbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bammental | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wutha-Farnroda | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Linz am Rhein | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Trochtelfingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Laage | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Oberding | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Havelberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bernsdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Vogtsburg im Kaiserstuhl | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Gersheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bondorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ingersheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Dornhan | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Aarbergen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Deißlingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Erdweg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Schönberg (Holstein) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Zell im Wiesental | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Schliengen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wolfschlugen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Dierdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Edertal | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Adelebsen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bad Rodach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ilmtal-Weinstraße | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Nachrodt-Wiblingwerde | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Dötlingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Gammertingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Dußlingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Niedergörsdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Dettingen unter Teck | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Uder | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Eutingen im Gäu | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ebersdorf b.Coburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Alpirsbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Windsbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Klingenberg a.Main | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Neuffen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Muggensturm | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bad Marienberg (Westerwald) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Gochsheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Riedenburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Nieheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Falkenberg/Elster | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Billigheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hüttlingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Lachendorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Neustadt a.d.Waldnaab | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Dudenhofen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Altbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bickenbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Isenbüttel | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Dohna | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Nesse-Apfelstädt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Waldsee | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Kirchheim am Neckar | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Plaidt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Westerburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Allershausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hörselberg-Hainich | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Rohrbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Schlangenbad | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Spangenberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Butjadingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Malchow | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Königsfeld im Schwarzwald | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Plau am See | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Meersburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Thalheim/Erzgeb. | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Stockstadt am Rhein | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Kirchardt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Burkhardtsdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Langquaid | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Schlüsselfeld | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hohenlockstedt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Uelsen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hebertshausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Mudersbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Lübz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Faßberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Tarp | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Großbreitenbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | An der Schmücke | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Boostedt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Emskirchen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Waldbrunn (Westerwald) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Jade | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Schäftlarn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Dasing | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Beselich | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Tittmoning | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Geltendorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Elztal | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Gmund a.Tegernsee | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Nufringen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bodelshausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Waibstadt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bredstedt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Heringsdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bräunlingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Löchgau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Dietenhofen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Sontheim an der Brenz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Schwarmstedt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Nottertal-Heilinger Höhen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Fürstenberg/Havel | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Kalefeld | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hirschau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Neubulach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ober-Mörlen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bruckberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Herrnhut | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wirges | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Böhmenkirch | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Willingen (Upland) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Odelzhausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Münzenberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Oberboihingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Tacherting | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Kleinwallstadt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Giebelstadt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Weischlitz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ebensfeld | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Mengerskirchen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Beratzhausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Gemmingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Pöcking | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Merzhausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Aying | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hambrücken | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Affing | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Dietramszell | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wolfach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Großpösna | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Leutershausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Tegernheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Limeshain | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Fischbachau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Kaltennordheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Schönenberg-Kübelberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Rochlitz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wesendorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Laboe | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Dettenhausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Seelow | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Zeil a.Main | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wartenberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Rot am See | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Heimsheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Mellrichstadt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Baltmannsweiler | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bad Lobenstein | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Küssaberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Weßling | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Blaichach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Igersheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Büchenbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Mügeln | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ingelfingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wernberg-Köblitz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Kirchentellinsfurt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Rechberghausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Baar-Ebenhausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Aschau i.Chiemgau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Lamspringe | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Vöhl | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Walddorfhäslach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ahlerstedt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Drebkau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Brunnthal | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Sersheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Eschede | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Rottach-Egern | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Stolpen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Frankenblick | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hohenwestedt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Triftern | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bessenbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Grabfeld | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ovelgönne | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Sulzbach an der Murr | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Traben-Trarbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Altenstadt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Dörpen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Forchtenberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Rehfelde | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Rottendorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ertingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ludwigsau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Rockenhausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bad Gottleuba-Berggießhübel | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bernhardswald | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Neuenkirchen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wackersdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Külsheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Grebenstein | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Nackenheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Sasbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Gersfeld (Rhön) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wannweil | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Stühlingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Guxhagen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Norderney | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Kirchdorf a.Inn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ranstadt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Nünchritz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Kusel | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wörthsee | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Dietzhölztal | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Uhlstädt-Kirchhasel | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Schechen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Schönau a.Königssee | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Tiefenbronn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Zarrentin am Schaalsee | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Rosengarten | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Angelbachtal | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Meckesheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Neuberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Seubersdorf i.d.OPf. | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Jestetten | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Laaber | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Calberlah | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ebstorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Waldems | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Prüm | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bergrheinfeld | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Schöppenstedt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Jahnsdorf/Erzgeb. | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Erdmannhausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Süderbrarup | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ühlingen-Birkendorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Mahlberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Mühlhausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Pommelsbrunn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ellrich | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hemhofen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Iffezheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Großschirma | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Adelsheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Lenzkirch | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Oettingen i.Bay. | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wörth a.d.Donau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Pottenstein | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Reichenau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Reichertshausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Diemelstadt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Himmelpforten | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Burg Stargard | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Lonsee | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Tharandt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Steyerberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Erlenbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Karlskron | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wermsdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Kitzscher | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bad Bellingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Steißlingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Oberammergau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Sulzfeld | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ruhla | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hofheim i.UFr. | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Waldmohr | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Achstetten | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bad Boll | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Großschönau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ötigheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Büsum | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Sundhagen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Neuhausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Modautal | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Gadebusch | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Glonn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Heiningen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Laufach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Trappenkamp | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Espenau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Deggingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Lensahn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Mammendorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wiggensbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Igensdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bad Hindelang | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Driedorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Oerlenbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Unkel | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Heroldsbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Binz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Engstingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Marxzell | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Illerkirchberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Weitramsdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Krauchenwies | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Zschorlau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Lichtenau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Großheubach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Übersee | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Windorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Petersaurach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Halsbrücke | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hügelsheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Rheinzabern | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Altentreptow | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Fronreute | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Emmelshausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Windischeschenbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Lohsa | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Schwaan | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Abstatt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Molfsee | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Arnsdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Todtnau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Oberthulba | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Cochem | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Naumburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Waldbüttelbrunn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Zapfendorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Niederstotzingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Niederstetten | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Oberviechtach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Kröpelin | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Lenting | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Vacha | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hartheim am Rhein | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wiesentheid | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Winhöring | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Rust | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Stetten am kalten Markt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Lauchheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Emmingen-Liptingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Stavenhagen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Brachttal | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Drebach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hammersbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Stadecken-Elsheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Braunlage | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bodman-Ludwigshafen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Eriskirch | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Aglasterhausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Inning a.Ammersee | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Alheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Krayenberggemeinde | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Malschwitz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Neuhausen/Spree | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Tönning | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Eggesin | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Kruft | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Seddiner See | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Uttenreuth | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Chieming | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wörth a.Main | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Iphofen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Asbach-Bäumenheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Vellberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Gablingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Uchte | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Rückersdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Mietingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Neukirch/Lausitz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Herbertingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Lommatzsch | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Maselheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bad Bocklet | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hilders | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Raschau-Markersbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hochspeyer | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hesel | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Niederwiesa | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Geisa | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Inzell | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Börnsen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Jahnatal | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wildeck | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Thum | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bellenberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Aindling | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Buchholz (Westerwald) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Altenstadt a.d.Waldnaab | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Heideck | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Röbel/Müritz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Otterfing | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Duingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Burgheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Waldbrunn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Königsbrück | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Neunkirchen a.Sand | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Vierkirchen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Eisingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Leidersbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wilthen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hörsel | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Lähden | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Kreischa | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Röttenbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Müllrose | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bad Bodenteich | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Gutach im Breisgau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Marklohe | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bergen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Nastätten | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Scheinfeld | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Eberhardzell | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Reichenbach/O.L. | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Striegistal | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hitzacker (Elbe) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Oy-Mittelberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Forbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Krautheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bönningstedt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bubenreuth | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Aßling | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Böbingen an der Rems | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Altdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Limbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Freden (Leine) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ober-Olm | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Heimbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Marlow | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Breitengüßbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Rhede (Ems) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Rennerod | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Rauschenberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Vöhringen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Rheinbreitbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ummendorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Creglingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Adorf/Vogtl. | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Gerabronn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Buggingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Knüllwald | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Putbus | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Grebenhain | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Oppenweiler | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Freyburg (Unstrut) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Mittelbiberach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Scheidegg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Maikammer | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wachenheim an der Weinstraße | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Dahlem | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Liebenwalde | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Stegen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hartenstein | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wörth | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Albershausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Breitungen/Werra | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Kirchberg i.Wald | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Nehren | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Güntersleben | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hartmannsdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Augustusburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Suderburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Münsing | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Starzach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Poppenhausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Untereisesheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Zell a.Main | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Rabenau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Donaustauf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Langenlonsheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hankensbüttel | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Heiligengrabe | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Dornum | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Contwig | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Surwold | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ehrenfriedersdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Eurasburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Feldafing | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Offingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Grabenstätt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Röhrnbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Mögglingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Feldberger Seenlandschaft | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Edling | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Kranzberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Schnaittenbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wilster | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Peitz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Gößweinstein | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Badbergen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Dahn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Rheinböllen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Reinhardshagen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Dransfeld | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Triefenstein | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Metten | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Olbersdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Strasburg (Uckermark) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Empfingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Baumholder | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Neufahrn i.NB | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Eching | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Grettstadt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Neureichenau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wachau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Waldfischbach-Burgalben | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Schwarzenbach a.Wald | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Aichhalden | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Neuzelle | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bodenwöhr | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Twistetal | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Pressath | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Nienstädt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Messel | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Niederdorfelden | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Sennfeld | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Amstetten | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Dietingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Neckarbischofsheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bürgstadt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Lauenau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Kirchberg (Hunsrück) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Loitz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Elmenhorst/Lichtenhagen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Niedernhall | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Winkelhaid | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wiesenburg/Mark | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Vogtei | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Burg (Spreewald) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Weinbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wietzendorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Lindhorst | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Rockenberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Gondelsheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Baruth/Mark | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Eging a.See | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bruck i.d.OPf. | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bermatingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Gräfenberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Zaberfeld | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Reichenberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Dahlen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Kirchberg an der Murr | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Stammham | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Altenmarkt a.d.Alz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Graal-Müritz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Selbitz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Tessin | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Schöllkrippen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Niederfischbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wyk auf Föhr | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Buchenberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Baunach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Fronhausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Pfaffing | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Schwebheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Kochel a.See | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Escheburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Mauer | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Langenbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Geringswalde | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Friolzheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Sörup | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Neckarwestheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Mühlhausen-Ehingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Walkenried | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Lichtenfels | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Rothenburg/O.L. | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Gelenau/Erzgeb. | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Graben | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Gars a.Inn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Kraiburg a.Inn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Kreßberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Otterbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ellhofen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Gau-Odernheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Lambrecht (Pfalz) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hasloh | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Mertingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Seckach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Waldalgesheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bad Tabarz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hattorf am Harz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Kritzmow | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Sprendlingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bad Zwesten | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Guntersblum | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Waldenburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hütschenhausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Schefflenz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Rosenbach/Vogtl. | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Philippsthal (Werra) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Neukloster | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Schönberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Dassow | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Cadenberge | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wiesau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Eschau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Süderholz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Amorbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Marschacht | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wäschenbeuren | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Gensingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Helmstadt-Bargen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Grafrath | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Lunzenau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Kiedrich | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hoya | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wolfegg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Germaringen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hamm (Sieg) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Welden | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Pressig | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Neckartailfingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Billigheim-Ingenheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Andechs | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Neckarsteinach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Allendorf (Lumda) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wasserburg (Bodensee) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Eigeltingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | St. Blasien | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Loiching | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Marklkofen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Kyffhäuserland | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Heßdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Regis-Breitingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Schonach im Schwarzwald | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Biberach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Groß Grönau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Aukrug | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Göllheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Nesselwang | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Eppendorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Eichstetten am Kaiserstuhl | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Lorch | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Schondorf am Ammersee | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Rimsting | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Neudrossenfeld | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hollenstedt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Warngau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Döhlau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Zinnowitz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Rickenbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wolkenstein | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Neukirchen/Pleiße | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wahrenholz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Trebsen/Mulde | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Albersdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bergtheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Letschin | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Sigmaringendorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ruhland | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Sankt Peter-Ording | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Michelfeld | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Buttenheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Vettelschoß | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Icking | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bevern | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Markersdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bad Kleinen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Malsfeld | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Liebenau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Forstern | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Burgstetten | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Speicher | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Benediktbeuern | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wallhausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hechthausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Pürgen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Langenenslingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Kraftsdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bodenmais | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Unterwössen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bad Salzschlirf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Deidesheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Kirchheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Gechingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Türkenfeld | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Freudenberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Kleinheubach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Triptis | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Klein-Winternheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Eystrup | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Beuren | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Amtsberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Orsingen-Nenzingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bentwisch | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hildrizhausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bad Muskau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Farchant | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Sexau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Tegernsee | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Grainau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Aiterhofen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Sailauf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Marktrodach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bad Elster | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Dörfles-Esbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Zornheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Happurg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Parthenstein | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hauenstein | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Seifhennersdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ronneburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Schiltach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Stromberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Burgbernheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Jemgum | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Lalendorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Schwindegg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Straßkirchen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Sankt Michaelisdonn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Heimenkirch | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ölbronn-Dürrn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hirschhorn (Neckar) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Sasbach am Kaiserstuhl | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Malsch | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Neustadt (Dosse) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Malterdingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Lucka | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Beindersheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Lauben | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Berge | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Grafenrheinfeld | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ulmen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Moos | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Owen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Spreenhagen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Gößnitz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Angelburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bad Klosterlausnitz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Valley | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Baierbrunn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Kranichfeld | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bad Karlshafen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Urmitz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ohlsbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Langenhorn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hoppstädten-Weiersbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Illerrieden | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Erolzheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Poppenricht | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Volkertshausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Randersacker | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bad Schandau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hohenlinden | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Spraitbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Gaienhofen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Offenberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wilhelmsfeld | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bischofsmais | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Colbitz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Leutersdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Michelbach an der Bilz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Auma-Weidatal | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Krakow am See | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ohlstadt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Schwarzatal | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Walheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Mühlberg/Elbe | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bempflingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Tuningen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Marzling | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Plate | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Staig | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Scharnebeck | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Leinach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Berkheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Deckenpfronn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Kirchenthumbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Saalburg-Ebersdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Neuler | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Tüßling | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Schwegenheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Waldburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Schwangau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Burgbrohl | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Elchesheim-Illingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Unterbreizbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Haina (Kloster) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Kaisersesch | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Geyer | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Warin | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Lorup | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Münchhausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bad Steben | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hunderdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bodnegg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Harthausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Simmelsdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Gosen-Neu Zittau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Irschenberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bad Teinach-Zavelstein | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Obermichelbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wörth a.d.Isar | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hillesheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bischoffen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Vörstetten | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Stephansposching | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Glattbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Dorf Mecklenburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wangen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Alteglofsheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hammah | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Buckenhof | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Fischen i.Allgäu | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Eicklingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Seeshaupt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hohnstein | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Birkenheide | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hülben | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Lauscha | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hirrlingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Babensham | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Kirchenlamitz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Pfatter | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Cleebronn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Gimbsheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Margetshöchheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Mommenheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hodenhagen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Priestewitz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Klein Offenseth-Sparrieshoop | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Maroldsweisach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Radibor | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | St. Egidien | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Vogtareuth | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Großenaspe | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ludwigsstadt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Seeg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Sand a.Main | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Burgberg i.Allgäu | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hettenleidelheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Kammerstein | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Föhren | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Werther | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Gailingen am Hochrhein | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Königheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Pampow | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hanerau-Hademarschen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Jesewitz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Klütz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hohenroda | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Aitrach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Glauburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hahnstätten | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Herschbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Neuental | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bayerisch Gmain | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Schafflund | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Klosterlechfeld | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Aidenbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bischweier | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Braubach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Rengsdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Eitensheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Kalchreuth | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Lohmen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Frasdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wesenberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Münster-Sarmsheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Binzen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Waldenburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Dirmstein | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Kobern-Gondorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Neuenstein | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bodolz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Memmingerberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Horgau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Großharthau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Berglern | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Nebra (Unstrut) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Adenau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Heroldstatt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Sigmarszell | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Schwarzach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Mönsheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Lindow (Mark) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Meißner | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Beetzendorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Undenheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Claußnitz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Euerbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Kenn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Fichtenberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Lambrechtshagen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Schopfloch | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Huglfing | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hatzenbühl | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Kirchweidach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Weißenstadt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Dollnstein | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wildflecken | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Aichstetten | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Heidgraben | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wischhafen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Dömitz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Zemmer | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Lengerich | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hemmingstedt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Sulzemoos | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Blender | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Sollstedt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Offenau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Simmozheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Eggstätt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ringgau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Elfershausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Zingst | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Marktleuthen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Schenefeld | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Marktl | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Kallmünz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Roxheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Detern | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Embsen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Haste | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Käbschütztal | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Frankenau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Reinsberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Landesbergen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Tonna | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Lehrensteinsfeld | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Rieseby | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Altenglan | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bretzenheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wertach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Iffeldorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Lengdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Salching | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Münchweiler an der Rodalb | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Sontheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Weyhausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Eschelbronn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Niederzissen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | St. Peter | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Kutzenhausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Thaleischweiler-Fröschen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Fischbachtal | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Grafling | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hohenkammer | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Rositz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Waigolshausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Möttingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Roggenburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Neuhaus a.d.Pegnitz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Probstzella | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Friedewald | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Erxleben | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Themar | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Elstra | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Thüngersheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Oberelsbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ringsheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Großweitzschen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Steinberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Grafenberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Kist | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Prittriching | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hanhofen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Herleshausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Kefenrod | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Adelsried | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Nordendorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Burkau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Dieblich | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Pfaffenhofen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Lam | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bad Peterstal-Griesbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Leimersheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Lentföhrden | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Schluchsee | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Rosenberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wohltorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Schönwald im Schwarzwald | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Nußdorf a.Inn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Sulzbach-Laufen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Erpel | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Brohl-Lützing | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hetzerath | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Kinding | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ostelsheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Eime | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Helmstadt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Freihung | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Puderbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Berghaupten | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Salmtal | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wiesenttal | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Sasbachwalden | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wasbek | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Dernbach (Westerwald) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Igling | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Schwörstadt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Eimeldingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Gägelow | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Schleusegrund | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Oberwolfach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Heede | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Lauenbrück | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Geldersheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wustrow (Wendland) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hausen b.Würzburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ehrenberg (Rhön) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Rötgesbüttel | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bad Wilsnack | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Sellin | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hinterzarten | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Insel Poel | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Halbe | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hessigheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Mönchberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Chamerau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bad Eilsen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hillerse | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Edesheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Eitelborn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hollenbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Eichenbühl | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Gaiberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Beimerstetten | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Königshain-Wiederau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Straßberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Braunsbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Oberpframmern | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Papendorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ellerstadt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Golßen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Weitersburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Friedrichskoog | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Gyhum | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Epfenbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hergatz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Elmstein | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ohorn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Muhr a.See | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Barendorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Borstel-Hohenraden | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Boltenhagen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Weiding | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Seehausen a.Staffelsee | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bernried am Starnberger See | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Röderaue | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wees | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Weisenbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Handeloh | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Winningen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ziesar | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hürup | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Kummerfeld | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hochdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wegeleben | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Aach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hausen im Wiesental | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Pöhl | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bockenheim an der Weinstraße | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wolpertshausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Breklum | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Viöl | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Lobbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Husby | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wallhausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Mehring | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Neuenkirchen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Köditz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Gartz (Oder) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Nordstrand | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Monsheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Menslage | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Arrach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Lottstetten | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Gelting | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Heidenau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Süderlügum | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Kirchgellersen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Neumagen-Dhron | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Zwiefalten | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Dobel | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Schöpstal | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Egmating | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Taura | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Brieskow-Finkenheerd | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Gutach (Schwarzwaldbahn) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ronshausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Neckargerach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Rehden | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Remlingen-Semmenstedt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Lindberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Suhlendorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Dogern | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Dollern | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Gruibingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hohnhorst | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Erfde | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Radbruch | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Mainbernheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Elxleben | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ahorn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Chorin | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ottrau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Iggensbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Dienheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Großenbrode | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bilshausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Borkheide | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Grosselfingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Kaltenengers | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ducherow | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Insheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Mespelbrunn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wangels | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Delingsdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Garz/Rügen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Rerik | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Reit im Winkl | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Reichartshausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bärenstein | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Königstein/Sächs.Schw. | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Kröv | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Jatznick | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Cavertitz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Albertshofen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Heimbuchenthal | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Balzheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Breitenfelde | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Colmberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Frittlingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Zeltingen-Rachtig | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Treis-Karden | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Illschwang | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Westerstetten | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Egloffstein | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Egenhausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Merklingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Sipplingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Melsdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Felde | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Steinfeld | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Brücken (Pfalz) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bernsdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Geiselbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hüffenhardt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Klostermansfeld | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Jembke | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Kirrweiler (Pfalz) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Eresing | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Meyenburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Weißbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Zandt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Weilbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Berghülen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Nellingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Neuensalz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bordelum | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Fleckeby | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Obergriesbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Neuhäusel | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hagelstadt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Waffenbrunn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Busdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Rieschweiler-Mühlbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ortrand | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Masserberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Erkenbrechtsweiler | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Lautenbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Lauterecken | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Rümmingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Krün | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Oderberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Berg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Berg (Pfalz) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Rechtsupweg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Reckendorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Feldberg (Schwarzwald) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Kriebstein | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Röthenbach (Allgäu) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ottenhofen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Stapel | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ebergötzen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Neusorg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wirsberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Schöngeising | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Dormitz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ehingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Dammbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Todtmoos | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ottensoos | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Schmalfeld | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Oberwiesenthal | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Immenreuth | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Vrees | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Rullstorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Leutenberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Teupitz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Müglitztal | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Neufra | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ringelai | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Glaubitz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Meudt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Kirchheim an der Weinstraße | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Tiefenbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Kelberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Rieneck | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hamberge | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Gebhardshain | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hofstetten | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Steinfeld | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ebrach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Rechlin | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hausen (Wied) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Neukirchen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Eurasburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wasbüttel | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wolfstein | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Sankt Englmar | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Droyßig | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wörnitz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Brunnen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Arzberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Drakenburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bernau im Schwarzwald | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Nortmoor | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Grünendeich | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Fichtelberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Erlenmoos | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wittighausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wulften am Harz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Freudenburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Jünkerath | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Scheden | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Widdern | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Oberottmarshausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Eydelstedt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Borgstedt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Niederalteich | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Nonnenhorn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Obermeitingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Weibersbrunn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Röllbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Untersteinach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Harbke | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Jagsthausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Steinkirchen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Beesten | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Kalkhorst | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Grabenstetten | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Walchum | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wiemersdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Osten | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Thiersheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wechselburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ornbau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Dorfprozelten | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Rhumspringe | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Irrel | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Postau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Starkenberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ramsau b.Berchtesgaden | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Presseck | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ranis | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Sankt Martin | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Breitenbach a.Herzberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Langenleuba-Niederhain | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wain | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Lalling | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Siegelsbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Weidenthal | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Kollmar | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wallhausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Börgerende-Rethwisch | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Eching am Ammersee | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Höfen an der Enz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Krummesse | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Schondra | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bayrischzell | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Vierkirchen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Altenahr | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Schornsheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Himmelstadt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Oberhof | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Oberuckersee | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Grünenbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Gommersheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Kaiserpfalz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Rammingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Rasdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Crossen an der Elster | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Langballig | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Saal a.d.Saale | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wallmerod | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Gablenz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Damp | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Stadtkyll | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Etzenricht | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Frauenneuharting | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Grafenwiesen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | List auf Sylt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Schellhorn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Gundersheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bornheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Koserow | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ellerhoop | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hüttisheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wulkenzin | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Rosenthal-Bielatal | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Sukow | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Zerf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Heiligenstedten | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Mellingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Flossenbürg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Dierhagen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Oberostendorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Schaufling | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Euerdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Velgast | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Rammelsbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Siehdichum | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Sierksdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Heiligenroth | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Breitbrunn a.Chiemsee | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Staudernheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Schönecken | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Strande | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Kleinsendelbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Büsingen am Hochrhein | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Böttingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Manderscheid | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Suthfeld | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ziltendorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Oberschwarzach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Beckedorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Winterhausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wollbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bad Neualbenreuth | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Jonsdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bollingstedt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Seebach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ponitz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hagnau am Bodensee | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Schwenningen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Etzelwang | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hornbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Agathenburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Gillenfeld | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Langenhahn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hornstorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Marktschorgast | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Trabitz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wiltingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Riol | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Dürrholz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Udenheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Sachsenkam | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Mogendorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Biendorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Binau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Rammenau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Göhren | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Balgheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bartenshagen-Parkentin | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ebernhahn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Düngenheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Schöfweg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Mönchhagen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Schafstedt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Oybin | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bad Bayersoien | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Holtsee | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Waake | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Oldenswort | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Prerow | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Dennheritz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Lembruch | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Longuich | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Rammingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Aufseß | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Stolpe | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Züssow | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Stadelhofen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Sulzfeld a.Main | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Gingst | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Enzklösterle | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Leupoldsgrün | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Müssen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Todendorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Lieser | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Herforst | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Schönwald | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wiesenau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Raitenbuch | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Essel | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Rieden | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hauptstuhl | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Freisbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Berlingerode | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Pellworm | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Münchweiler an der Alsenz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Plötzkau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Weißenohe | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hunding | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Neukirchen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wust-Fischbeck | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Eppelsheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Seelingstädt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hemsbünde | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Glan-Münchweiler | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wustrow | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Prosselsheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Dannewerk | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Herzhorn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Groß Sarau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Mühl Rosin | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Stechlin | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Garlstorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Longkamp | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Guderhandviertel | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Eisenberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Glött | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Polle | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Nahrendorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Klüsserath | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Groß Nemerow | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Thaining | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bastorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Prötzel | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Altenkrempe | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Nister | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Reuth b.Erbendorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Lürschau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Trittenheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Mesekenhagen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Mühlhausen im Täle | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bimöhlen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Unterroth | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Gielow | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Malberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bettingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Schinkel | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Weinsheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Nordheim v.d.Rhön | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Gutenberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Marienrachdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hirschfeld | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bodenrode-Westhausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Frankenheim/Rhön | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hohenkirchen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Gattendorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ückeritz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Arenshausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bad Bertrich | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bockhorst | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Born a.Darß | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Pösing | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Schönbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Erharting | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Brokdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Emtmannsberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Guckheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Kapellen-Drusweiler | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Martinsheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Glowe | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ober-Hilbersheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Riethnordhausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wilgartswiesen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bayerisch Eisenstein | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Altdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Greimerath | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wiek | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Harsdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Mauchenheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Müschenbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Baabe | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Neuharlingersiel | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Lohnsfeld | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hasselberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Großbardorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Pelm | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Gerolfingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Vierhöfen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Tiste | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Fischbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wahlrod | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Dagebüll | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Nebel | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Spangdahlem | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Tautenhain | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hörden am Harz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Mühlenfließ | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Zempin | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Waldlaubersheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Rathmannsdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Lichterfeld-Schacksdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Dittweiler | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Eldetal | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Göhren-Lebbin | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Gebenbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Noer | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Abtswind | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Deutschneudorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Winterspelt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Pleisweiler-Oberhofen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Steinberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Konken | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hörnum (Sylt) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Brinkum | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Lohmen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Rabenstein/Fläming | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Nemsdorf-Göhrendorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wollin | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Stemmen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Loissin | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Neuleiningen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Burrweiler | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Mündersbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Brest | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Kempfeld | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Barum | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Schülldorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Trassenheide | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Gallmersgarten | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hohenfelde | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Vogelsang | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wittdün auf Amrum | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Erlenbach bei Kandel | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hohen-Sülzen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hohenstadt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Pruchten | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Milda | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Dörrebach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Rüdenau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Königsfeld | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Greimersburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Dillstädt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Lohheide | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Rehlingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Alken | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ettal | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Brahlstorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Langenfeld | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Rinnthal | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Haschbach am Remigiusberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Reinsdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Boden | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Damscheid | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Zirkow | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Zettlitz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Stein-Bockenheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Tonndorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Zotzenheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Kargow | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ziegenrück | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Kanzem | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ahrenshoop | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Prinzhöfte | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Philippsreut | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Braunichswalde | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Schuld | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Auw bei Prüm | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Kirchgandern | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Niedergebra | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Holzbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Cursdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Matzenbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Siemz-Niendorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Mittelstenahe | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Welgesheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Dätgen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Korswandt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Dornheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bodelwitz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Glees | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Neunkirchen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Dümpelfeld | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Dörth | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hainspitz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Kratzeburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Laasdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Alleshausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bandenitz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ermershausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Norddorf auf Amrum | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Perasdorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Jesendorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hohen Wangelin | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Schwarzburg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Alt Bukow | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Dobbin-Linstow | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Parsteinsee | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Remmels | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Kampen (Sylt) | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Bärenbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Gondenbrett | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Insul | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Oberweid | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hüffler | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Einhaus | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hohenzieritz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Schleifreisen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Kapellendorf | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Dobitschen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Schaprode | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Altwarp | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Osterrade | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Wallenborn | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hahn am See | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Barweiler | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Härtlingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Blankenberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Kluis | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hohenfelden | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Vogelsang-Warsin | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Reitzenhain | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Elbingen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Neddemin | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ettinghausen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Eisenschmitt | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Ockholm | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Stolpe | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Rathen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Reipoltskirchen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Görkwitz | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Rothemühl | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hemmelzen | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Udler | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Grinau | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Oldenbüttel | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Kronsgaard | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Winkelbach | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Lietzow | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Grödersby | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Burgsponheim | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Mähren | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Osterheide | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Putgarten | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Grammow | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Hohenwarte | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Sosberg | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
| ⬜ | Kudensee | kein Änderungsdatum | OpenStreetMap, zuletzt vor 2 Tagen geholt |
