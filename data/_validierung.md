# Validierung der Parkplatzdaten

Stand: 2026-10-10

Erzeugt von `npm run validate`. Das Skript ändert keine Daten – es benennt,
was ein Mensch ansehen sollte. Vorgehen siehe [Datenpflege.md](../Datenpflege.md).

## Überblick

| Kennzahl | Wert |
| --- | --- |
| geprüfte Städte | 209 |
| Standorte | 18.072 |
| Stellplätze | 30.264 |
| Städte mit Fehlern | 3 |
| Städte mit Verdachtsfällen | 7 |

Bewertung: 🔴 Fehler – muss angesehen werden · 🟡 Verdacht – sollte angesehen werden · ⬜ Hinweis

## Städte mit Befund

### Dormagen

82 Standorte, 101 Stellplätze · Quelle: OpenStreetMap-Mitwirkende (ODbL)

- 🟡 **Dubletten:** 1 Paare liegen unter 1.5 m auseinander und heißen gleich – das ist dasselbe Objekt. `npm run data:dedupe` führt sie zusammen.
  - Behindertenparkplatz Dormagen ↔ Behindertenparkplatz Dormagen (0.1 m)
- ⬜ **Dicht beieinander:** 34 Paare liegen zwischen 1.5 und 10 m auseinander. Das sind im Regelfall benachbarte Stellplätze, keine Dubletten.
  - Behindertenparkplatz Dormagen ↔ Behindertenparkplatz Dormagen (3.7 m)
  - Behindertenparkplatz Dormagen ↔ Behindertenparkplatz Dormagen (2.5 m)
  - Behindertenparkplatz Dormagen ↔ Behindertenparkplatz Dormagen (3.5 m)
- 🔴 **Platzhalter statt Adresse:** 75 von 82 Standorten heißen „Behindertenparkplatz Dormagen" – das Adressfeld der Quelle wurde vermutlich nicht erkannt.
- 🟡 **Ohne Straße:** 82 von 82 Standorten haben keinen Straßennamen.
- ⬜ **Kein Stadtteil:** Bei allen Standorten steht der Stadtname als Stadtteil – die Quelle nennt keinen.

### Osnabrück

13 Standorte, 29 Stellplätze · Quelle: OpenStreetMap-Mitwirkende (ODbL)

- 🟡 **Auffällig wenige Stellplätze:** 1.7 Stellplätze je 10.000 Einwohner, Median aller Städte 8.2. Das kann eine lückenhafte Quelle sein oder eine Stadt mit wenig Straßenraum – nachsehen, nicht annehmen.

### Salzgitter

10 Standorte, 19 Stellplätze · Quelle: OpenStreetMap-Mitwirkende (ODbL)

- 🟡 **Auffällig wenige Stellplätze:** 1.8 Stellplätze je 10.000 Einwohner, Median aller Städte 8.2. Das kann eine lückenhafte Quelle sein oder eine Stadt mit wenig Straßenraum – nachsehen, nicht annehmen.

### Dinslaken

7 Standorte, 11 Stellplätze · Quelle: OpenStreetMap-Mitwirkende (ODbL)

- 🟡 **Auffällig wenige Stellplätze:** 1.6 Stellplätze je 10.000 Einwohner, Median aller Städte 8.2. Das kann eine lückenhafte Quelle sein oder eine Stadt mit wenig Straßenraum – nachsehen, nicht annehmen.

### Germersheim

6 Standorte, 14 Stellplätze · Quelle: Behindertenparkplätze TechnologieRegion Karlsruhe – Stadt Karlsruhe / TechnologieRegion Karlsruhe (Creative Commons Namensnennung 4.0 (CC BY 4.0))

- 🟡 **Ohne Straße:** 4 von 6 Standorten haben keinen Straßennamen.

### Gronau (Westf.)

6 Standorte, 10 Stellplätze · Quelle: OpenStreetMap-Mitwirkende (ODbL)

- 🟡 **Auffällig wenige Stellplätze:** 2.0 Stellplätze je 10.000 Einwohner, Median aller Städte 8.2. Das kann eine lückenhafte Quelle sein oder eine Stadt mit wenig Straßenraum – nachsehen, nicht annehmen.

### Rheine

3 Standorte, 5 Stellplätze · Quelle: OpenStreetMap-Mitwirkende (ODbL)

- 🔴 **Auffällig wenige Stellplätze:** 0.6 Stellplätze je 10.000 Einwohner, Median aller Städte 8.2. Das kann eine lückenhafte Quelle sein oder eine Stadt mit wenig Straßenraum – nachsehen, nicht annehmen.

### Waghäusel

3 Standorte, 6 Stellplätze · Quelle: Behindertenparkplätze TechnologieRegion Karlsruhe – Stadt Karlsruhe / TechnologieRegion Karlsruhe (Creative Commons Namensnennung 4.0 (CC BY 4.0))

- 🟡 **Ohne Straße:** 2 von 3 Standorten haben keinen Straßennamen.
- ⬜ **Auffällig wenige Stellplätze:** 2.7 Stellplätze je 10.000 Einwohner, Median aller Städte 8.2. Das kann eine lückenhafte Quelle sein oder eine Stadt mit wenig Straßenraum – nachsehen, nicht annehmen.

### Lingen (Ems)

2 Standorte, 5 Stellplätze · Quelle: OpenStreetMap-Mitwirkende (ODbL)

- 🟡 **Auffällig wenige Stellplätze:** 0.9 Stellplätze je 10.000 Einwohner, Median aller Städte 8.2. Das kann eine lückenhafte Quelle sein oder eine Stadt mit wenig Straßenraum – nachsehen, nicht annehmen.

### Nordhorn

2 Standorte, 4 Stellplätze · Quelle: OpenStreetMap-Mitwirkende (ODbL)

- 🔴 **Auffällig wenige Stellplätze:** 0.7 Stellplätze je 10.000 Einwohner, Median aller Städte 8.2. Das kann eine lückenhafte Quelle sein oder eine Stadt mit wenig Straßenraum – nachsehen, nicht annehmen.

## Auffällig dünne Datenlage

49 Städte liegen unter der halben Mediandichte (8.2 Stellplätze je 10.000 Einwohner).

Das ist **kein Fehler, sondern eine Rangliste für das Nachsehen.** Ein
niedriger Wert kann eine lückenhafte Quelle sein oder eine kompakte Stadt
mit wenig Straßenraum.

Eine pauschale Erklärung gibt der Bestand nicht her: Städte mit amtlicher Quelle liegen im Median bei 8.4, Städte aus OpenStreetMap bei 7.8 Stellplätzen je 10.000 Einwohner. OpenStreetMap ist also nicht grundsätzlich die dünnere Quelle – woran es bei einer einzelnen Stadt liegt, zeigt erst der Blick auf sie.

| Stadt | je 10.000 Einw. | Einwohner | Standorte | Quelle |
| --- | ---: | ---: | ---: | --- |
| Rheine | 0.6 | 77.209 | 3 | OpenStreetMap |
| Nordhorn | 0.7 | 56.973 | 2 | OpenStreetMap |
| Lingen (Ems) | 0.9 | 56.498 | 2 | OpenStreetMap |
| Dinslaken | 1.6 | 66.993 | 7 | OpenStreetMap |
| Osnabrück | 1.7 | 166.057 | 13 | OpenStreetMap |
| Salzgitter | 1.8 | 104.970 | 10 | OpenStreetMap |
| Gronau (Westf.) | 2.0 | 50.547 | 6 | OpenStreetMap |
| Greifswald | 2.1 | 56.092 | 9 | OpenStreetMap |
| Marl | 2.2 | 86.766 | 15 | OpenStreetMap |
| Delmenhorst | 2.3 | 81.406 | 9 | OpenStreetMap |
| Gladbeck | 2.4 | 75.499 | 12 | OpenStreetMap |
| Menden (Sauerland) | 2.5 | 52.255 | 12 | OpenStreetMap |
| Ratingen | 2.6 | 89.368 | 11 | OpenStreetMap |
| Waghäusel | 2.7 | 22.466 | 3 | amtlich |
| Gaggenau | 2.7 | 29.529 | 5 | amtlich |
| Minden | 2.7 | 84.013 | 13 | OpenStreetMap |
| Schwerin | 2.7 | 98.308 | 22 | OpenStreetMap |
| Offenbach am Main | 2.9 | 132.746 | 23 | OpenStreetMap |
| Norderstedt | 2.9 | 82.844 | 13 | OpenStreetMap |
| Neuwied | 3.0 | 67.083 | 8 | OpenStreetMap |
| Krefeld | 3.1 | 231.406 | 40 | OpenStreetMap |
| Ibbenbüren | 3.1 | 51.803 | 11 | OpenStreetMap |
| Lüdenscheid | 3.1 | 71.212 | 15 | OpenStreetMap |
| Celle | 3.1 | 66.834 | 17 | OpenStreetMap |
| Bremen | 3.2 | 586.271 | 112 | OpenStreetMap |
| Wolfenbüttel | 3.2 | 52.604 | 10 | OpenStreetMap |
| Hameln | 3.3 | 58.244 | 10 | OpenStreetMap |
| Wesel | 3.3 | 60.785 | 4 | OpenStreetMap |
| Ludwigshafen am Rhein | 3.4 | 177.222 | 36 | OpenStreetMap |
| Bocholt | 3.5 | 73.257 | 10 | OpenStreetMap |
| Herford | 3.6 | 67.503 | 14 | OpenStreetMap |
| Neustadt an der Weinstraße | 3.6 | 52.945 | 11 | OpenStreetMap |
| Neu-Ulm | 3.7 | 62.641 | 17 | OpenStreetMap |
| Neuss | 3.7 | 154.317 | 38 | amtlich |
| Lörrach | 3.7 | 51.349 | 17 | OpenStreetMap |
| Heilbronn | 3.7 | 131.986 | 26 | OpenStreetMap |
| Peine | 3.7 | 50.987 | 15 | OpenStreetMap |
| Lahr/Schwarzwald | 3.7 | 50.775 | 10 | OpenStreetMap |
| Wuppertal | 3.8 | 358.193 | 66 | OpenStreetMap |
| Neubrandenburg | 3.8 | 60.344 | 16 | OpenStreetMap |
| Ingolstadt | 3.8 | 141.185 | 31 | OpenStreetMap |
| Meerbusch | 3.9 | 57.078 | 16 | OpenStreetMap |
| Brandenburg an der Havel | 3.9 | 74.113 | 17 | OpenStreetMap |
| Lippstadt | 3.9 | 68.739 | 9 | OpenStreetMap |
| Passau | 4.0 | 53.039 | 18 | OpenStreetMap |
| Bremerhaven | 4.0 | 118.610 | 25 | OpenStreetMap |
| Ahlen | 4.0 | 52.666 | 20 | OpenStreetMap |
| Esslingen am Neckar | 4.1 | 96.182 | 19 | OpenStreetMap |
| Bad Salzuflen | 4.1 | 53.958 | 12 | OpenStreetMap |

## Alle Städte

| Stadt | Standorte | Stellplätze | je 10.000 Einw. | von OSM bestätigt | Befunde |
| --- | ---: | ---: | ---: | ---: | --- |
| Aachen | 111 | 191 | 7.3 | nicht geprüft | – |
| Aalen | 19 | 47 | 7.0 | nicht geprüft | – |
| Ahlen | 20 | 21 | 4.0 | nicht geprüft | – |
| Arnsberg | 45 | 69 | 9.2 | nicht geprüft | – |
| Aschaffenburg | 30 | 46 | 6.3 | nicht geprüft | – |
| Augsburg | 400 | 639 | 21.2 | nicht geprüft | – |
| Bad Homburg vor der Höhe | 39 | 60 | 10.6 | nicht geprüft | – |
| Bad Oeynhausen | 31 | 38 | 7.5 | nicht geprüft | – |
| Bad Salzuflen | 12 | 22 | 4.1 | nicht geprüft | – |
| Baden-Baden | 66 | 111 | 19.5 | nicht geprüft | – |
| Bamberg | 62 | 144 | 18.7 | nicht geprüft | – |
| Bayreuth | 26 | 77 | 10.6 | nicht geprüft | – |
| Bergheim | 26 | 45 | 7.3 | nicht geprüft | – |
| Bergisch Gladbach | 186 | 306 | 27.5 | nicht geprüft | – |
| Berlin | 923 | 1560 | 4.2 | nicht geprüft | – |
| Bielefeld | 125 | 229 | 6.9 | nicht geprüft | – |
| Böblingen | 54 | 104 | 20.2 | nicht geprüft | – |
| Bocholt | 10 | 26 | 3.5 | nicht geprüft | – |
| Bochum | 165 | 411 | 11.5 | nicht geprüft | – |
| Bonn | 395 | 597 | 18.5 | nicht geprüft | – |
| Bottrop | 134 | 134 | 11.3 | nicht geprüft | – |
| Brandenburg an der Havel | 17 | 29 | 3.9 | nicht geprüft | – |
| Braunschweig | 85 | 226 | 8.9 | nicht geprüft | – |
| Bremen | 112 | 187 | 3.2 | nicht geprüft | – |
| Bremerhaven | 25 | 47 | 4.0 | nicht geprüft | – |
| Bretten | 16 | 27 | 8.9 | nicht geprüft | – |
| Bruchsal | 36 | 57 | 11.9 | nicht geprüft | – |
| Castrop-Rauxel | 22 | 55 | 7.5 | nicht geprüft | – |
| Celle | 17 | 21 | 3.1 | nicht geprüft | – |
| Chemnitz | 221 | 337 | 13.7 | nicht geprüft | – |
| Cottbus | 95 | 190 | 20.0 | nicht geprüft | – |
| Darmstadt | 87 | 162 | 9.7 | nicht geprüft | – |
| Delmenhorst | 9 | 19 | 2.3 | nicht geprüft | – |
| Dessau-Roßlau | 51 | 72 | 9.5 | nicht geprüft | – |
| Detmold | 24 | 38 | 5.1 | nicht geprüft | – |
| Dinslaken | 7 | 11 | 1.6 | nicht geprüft | 🟡 |
| Dormagen | 82 | 101 | 15.8 | nicht geprüft | 🔴 |
| Dorsten | 37 | 67 | 8.9 | nicht geprüft | – |
| Dortmund | 368 | 368 | 6.1 | nicht geprüft | – |
| Dresden | 477 | 676 | 12.0 | nicht geprüft | – |
| Duisburg | 116 | 213 | 4.2 | nicht geprüft | – |
| Düren | 36 | 55 | 5.8 | nicht geprüft | – |
| Düsseldorf | 339 | 522 | 8.4 | nicht geprüft | – |
| Elmshorn | 9 | 21 | 4.1 | nicht geprüft | – |
| Emden | 45 | 72 | – | nicht geprüft | – |
| Erfurt | 88 | 127 | 5.8 | nicht geprüft | – |
| Erlangen | 108 | 230 | 19.8 | nicht geprüft | – |
| Eschweiler | 55 | 80 | 13.9 | nicht geprüft | – |
| Essen | 243 | 529 | 9.2 | nicht geprüft | – |
| Esslingen am Neckar | 19 | 39 | 4.1 | nicht geprüft | – |
| Ettlingen | 27 | 54 | 14.0 | nicht geprüft | – |
| Euskirchen | 258 | 373 | 62.1 | nicht geprüft | – |
| Flensburg | 22 | 61 | 6.3 | nicht geprüft | – |
| Frankfurt (Oder) | 35 | 63 | 11.0 | nicht geprüft | – |
| Frankfurt am Main | 458 | 615 | 8.1 | nicht geprüft | – |
| Frechen | 57 | 62 | 11.9 | nicht geprüft | – |
| Freiburg im Breisgau | 325 | 329 | 13.9 | nicht geprüft | – |
| Freising | 39 | 97 | – | nicht geprüft | – |
| Friedrichshafen | 66 | 104 | 16.6 | nicht geprüft | – |
| Fulda | 85 | 159 | 24.3 | nicht geprüft | – |
| Fürth | 42 | 84 | 6.4 | nicht geprüft | – |
| Gaggenau | 5 | 8 | 2.7 | nicht geprüft | – |
| Garbsen | 58 | 114 | 19.0 | nicht geprüft | – |
| Gelsenkirchen | 219 | 219 | 8.2 | nicht geprüft | – |
| Gera | 21 | 82 | 8.6 | nicht geprüft | – |
| Germersheim | 6 | 14 | 6.4 | nicht geprüft | 🟡 |
| Gießen | 29 | 67 | 7.5 | nicht geprüft | – |
| Gladbeck | 12 | 18 | 2.4 | nicht geprüft | – |
| Göppingen | 35 | 38 | 6.4 | nicht geprüft | – |
| Görlitz | 20 | 53 | 9.6 | nicht geprüft | – |
| Goslar | 15 | 30 | – | nicht geprüft | – |
| Göttingen | 419 | 704 | 55.3 | nicht geprüft | – |
| Greifswald | 9 | 12 | 2.1 | nicht geprüft | – |
| Grevenbroich | 14 | 44 | 6.7 | nicht geprüft | – |
| Gronau (Westf.) | 6 | 10 | 2.0 | nicht geprüft | 🟡 |
| Gummersbach | 15 | 24 | 4.7 | nicht geprüft | – |
| Gütersloh | 33 | 70 | 7.0 | nicht geprüft | – |
| Hagen | 64 | 140 | 7.4 | nicht geprüft | – |
| Halle (Saale) | 62 | 178 | 7.8 | nicht geprüft | – |
| Hamburg | 935 | 1309 | 7.0 | nicht geprüft | – |
| Hameln | 10 | 19 | 3.3 | nicht geprüft | – |
| Hamm | 197 | 299 | 16.6 | nicht geprüft | – |
| Hanau | 40 | 67 | 6.8 | nicht geprüft | – |
| Hannover | 172 | 334 | 6.4 | nicht geprüft | – |
| Hattingen | 93 | 156 | 29.4 | nicht geprüft | – |
| Heidelberg | 214 | 214 | 13.7 | nicht geprüft | – |
| Heidenheim an der Brenz | 52 | 84 | 16.6 | nicht geprüft | – |
| Heilbronn | 26 | 49 | 3.7 | nicht geprüft | – |
| Herford | 14 | 24 | 3.6 | nicht geprüft | – |
| Herne | 35 | 64 | 4.1 | nicht geprüft | – |
| Herten | 20 | 47 | 7.7 | nicht geprüft | – |
| Hilden | 31 | 38 | 6.9 | nicht geprüft | – |
| Hildesheim | 36 | 94 | 9.5 | nicht geprüft | – |
| Hürth | 63 | 80 | 12.9 | nicht geprüft | – |
| Ibbenbüren | 11 | 16 | 3.1 | nicht geprüft | – |
| Idstein | 6 | 9 | – | nicht geprüft | – |
| Ingolstadt | 31 | 54 | 3.8 | nicht geprüft | – |
| Iserlohn | 25 | 42 | 4.6 | nicht geprüft | – |
| Jena | 83 | 118 | 10.8 | nicht geprüft | – |
| Kaiserslautern | 58 | 137 | 13.6 | nicht geprüft | – |
| Karlsruhe | 330 | 532 | 17.2 | nicht geprüft | – |
| Kassel | 93 | 123 | 6.2 | nicht geprüft | – |
| Kempten (Allgäu) | 33 | 59 | 8.7 | nicht geprüft | – |
| Kerpen | 51 | 57 | 8.6 | nicht geprüft | – |
| Kiel | 85 | 241 | 9.5 | nicht geprüft | – |
| Kleve | 42 | 49 | 9.2 | nicht geprüft | – |
| Koblenz | 96 | 203 | 17.9 | nicht geprüft | – |
| Köln | 445 | 605 | 5.9 | nicht geprüft | – |
| Konstanz | 43 | 75 | 8.6 | nicht geprüft | – |
| Krefeld | 40 | 71 | 3.1 | nicht geprüft | – |
| Lahr/Schwarzwald | 10 | 19 | 3.7 | nicht geprüft | – |
| Landau | 89 | 143 | 29.7 | nicht geprüft | – |
| Landshut | 20 | 70 | 9.7 | nicht geprüft | – |
| Langenfeld (Rheinland) | 26 | 60 | 10.0 | nicht geprüft | – |
| Langenhagen | 44 | 81 | 15.0 | nicht geprüft | – |
| Leipzig | 233 | 354 | 5.8 | nicht geprüft | – |
| Leverkusen | 122 | 144 | 8.5 | nicht geprüft | – |
| Lingen (Ems) | 2 | 5 | 0.9 | nicht geprüft | 🟡 |
| Lippstadt | 9 | 27 | 3.9 | nicht geprüft | – |
| Lörrach | 17 | 19 | 3.7 | nicht geprüft | – |
| Lübeck | 280 | 356 | 16.4 | nicht geprüft | – |
| Lüdenscheid | 15 | 22 | 3.1 | nicht geprüft | – |
| Ludwigsburg | 53 | 151 | 16.3 | nicht geprüft | – |
| Ludwigshafen am Rhein | 36 | 60 | 3.4 | nicht geprüft | – |
| Lüneburg | 39 | 84 | 11.2 | nicht geprüft | – |
| Lünen | 43 | 50 | 5.8 | nicht geprüft | – |
| Magdeburg | 204 | 341 | 14.0 | nicht geprüft | – |
| Mainz | 168 | 292 | 13.0 | nicht geprüft | – |
| Mannheim | 86 | 139 | 4.4 | nicht geprüft | – |
| Marburg | 25 | 46 | 6.3 | nicht geprüft | – |
| Marl | 15 | 19 | 2.2 | nicht geprüft | – |
| Meerbusch | 16 | 22 | 3.9 | nicht geprüft | – |
| Menden (Sauerland) | 12 | 13 | 2.5 | nicht geprüft | – |
| Minden | 13 | 23 | 2.7 | nicht geprüft | – |
| Moers | 64 | 132 | 13.0 | nicht geprüft | – |
| Mönchengladbach | 93 | 213 | 8.0 | nicht geprüft | – |
| Mülheim an der Ruhr | 56 | 121 | 7.0 | nicht geprüft | – |
| München | 218 | 628 | 4.2 | nicht geprüft | – |
| Münster | 163 | 319 | 10.3 | nicht geprüft | – |
| Neu-Ulm | 17 | 23 | 3.7 | nicht geprüft | – |
| Neubrandenburg | 16 | 23 | 3.8 | nicht geprüft | – |
| Neumünster | 97 | 108 | 13.5 | nicht geprüft | – |
| Neuss | 38 | 57 | 3.7 | nicht geprüft | – |
| Neustadt an der Weinstraße | 11 | 19 | 3.6 | nicht geprüft | – |
| Neuwied | 8 | 20 | 3.0 | nicht geprüft | – |
| Norderstedt | 13 | 24 | 2.9 | nicht geprüft | – |
| Nordhorn | 2 | 4 | 0.7 | nicht geprüft | 🔴 |
| Nürnberg | 468 | 621 | 11.7 | nicht geprüft | – |
| Oberhausen | 78 | 141 | 6.6 | nicht geprüft | – |
| Offenbach am Main | 23 | 38 | 2.9 | nicht geprüft | – |
| Offenburg | 50 | 92 | 14.6 | nicht geprüft | – |
| Oldenburg | 92 | 230 | 13.0 | nicht geprüft | – |
| Osnabrück | 13 | 29 | 1.7 | nicht geprüft | 🟡 |
| Paderborn | 107 | 185 | 11.8 | nicht geprüft | – |
| Passau | 18 | 21 | 4.0 | nicht geprüft | – |
| Peine | 15 | 19 | 3.7 | nicht geprüft | – |
| Pforzheim | 51 | 116 | 8.6 | nicht geprüft | – |
| Plauen | 13 | 34 | 5.2 | nicht geprüft | – |
| Potsdam | 197 | 388 | 21.0 | nicht geprüft | – |
| Pulheim | 61 | 69 | 12.3 | nicht geprüft | – |
| Rastatt | 35 | 47 | 9.3 | nicht geprüft | – |
| Ratingen | 11 | 23 | 2.6 | nicht geprüft | – |
| Ravensburg | 20 | 57 | 11.3 | nicht geprüft | – |
| Recklinghausen | 56 | 110 | 9.5 | nicht geprüft | – |
| Remscheid | 24 | 94 | 8.3 | nicht geprüft | – |
| Reutlingen | 47 | 61 | 5.1 | nicht geprüft | – |
| Rheine | 3 | 5 | 0.6 | nicht geprüft | 🔴 |
| Rheinstetten | 17 | 100 | 47.0 | nicht geprüft | – |
| Rosenheim | 30 | 75 | 11.5 | nicht geprüft | – |
| Rostock | 99 | 218 | 10.6 | nicht geprüft | – |
| Rüsselsheim am Main | 64 | 133 | 20.3 | nicht geprüft | – |
| Saarbrücken | 157 | 346 | 18.9 | nicht geprüft | – |
| Salzgitter | 10 | 19 | 1.8 | nicht geprüft | 🟡 |
| Sankt Augustin | 66 | 108 | 19.1 | nicht geprüft | – |
| Schwäbisch Gmünd | 41 | 69 | 10.7 | nicht geprüft | – |
| Schweinfurt | 127 | 223 | 40.9 | nicht geprüft | – |
| Schwerin | 22 | 27 | 2.7 | nicht geprüft | – |
| Siegen | 42 | 84 | 8.2 | nicht geprüft | – |
| Sindelfingen | 52 | 76 | 12.4 | nicht geprüft | – |
| Solingen | 195 | 232 | 14.0 | nicht geprüft | – |
| Speyer | 28 | 53 | – | nicht geprüft | – |
| Stolberg (Rhld.) | 23 | 39 | 6.8 | nicht geprüft | – |
| Stralsund | 18 | 29 | 5.4 | nicht geprüft | – |
| Stutensee | 32 | 49 | 19.4 | nicht geprüft | – |
| Stuttgart | 266 | 646 | 10.5 | nicht geprüft | – |
| Trier | 79 | 109 | 10.4 | nicht geprüft | – |
| Troisdorf | 116 | 156 | 20.6 | nicht geprüft | – |
| Tübingen | 104 | 149 | 16.1 | nicht geprüft | – |
| Ulm | 48 | 107 | 8.2 | nicht geprüft | – |
| Unna | 54 | 86 | 14.7 | nicht geprüft | – |
| Velbert | 19 | 43 | 5.2 | nicht geprüft | – |
| Viersen | 54 | 84 | 10.7 | nicht geprüft | – |
| Villingen-Schwenningen | 36 | 63 | 7.0 | nicht geprüft | – |
| Waghäusel | 3 | 6 | 2.7 | nicht geprüft | 🟡 |
| Waiblingen | 44 | 62 | 10.8 | nicht geprüft | – |
| Weimar | 26 | 35 | 5.3 | nicht geprüft | – |
| Weißenhorn | 4 | 7 | – | nicht geprüft | – |
| Wesel | 4 | 20 | 3.3 | nicht geprüft | – |
| Wetzlar | 18 | 30 | 5.5 | nicht geprüft | – |
| Wiesbaden | 51 | 181 | 6.3 | nicht geprüft | – |
| Wilhelmshaven | 57 | 64 | 8.4 | nicht geprüft | – |
| Willich | 39 | 58 | – | nicht geprüft | – |
| Witten | 233 | 352 | 38.3 | nicht geprüft | – |
| Wolfenbüttel | 10 | 17 | 3.2 | nicht geprüft | – |
| Wolfsburg | 82 | 141 | 10.9 | nicht geprüft | – |
| Worms | 98 | 137 | 15.8 | nicht geprüft | – |
| Wuppertal | 66 | 136 | 3.8 | nicht geprüft | – |
| Würzburg | 126 | 195 | 14.6 | nicht geprüft | – |
| Zwickau | 66 | 339 | 38.8 | nicht geprüft | – |
