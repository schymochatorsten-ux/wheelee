# Validierung der Parkplatzdaten

Stand: 2026-10-10

Erzeugt von `npm run validate`. Das Skript ändert keine Daten – es benennt,
was ein Mensch ansehen sollte. Vorgehen siehe [Datenpflege.md](../Datenpflege.md).

## Überblick

| Kennzahl                   | Wert   |
| -------------------------- | ------ |
| geprüfte Städte            | 187    |
| Standorte                  | 17.206 |
| Stellplätze                | 28.957 |
| Städte mit Fehlern         | 3      |
| Städte mit Verdachtsfällen | 5      |

Bewertung: 🔴 Fehler – muss angesehen werden · 🟡 Verdacht – sollte angesehen werden · ⬜ Hinweis

## Städte mit Befund

### Rostock

99 Standorte, 218 Stellplätze · Quelle: OpenStreetMap-Mitwirkende (ODbL)

- ⬜ **Dicht beieinander:** 4 Paare liegen zwischen 1.5 und 10 m auseinander. Das sind im Regelfall benachbarte Stellplätze, keine Dubletten.
  - Behindertenparkplatz Rostock ↔ Behindertenparkplatz Rostock (5.1 m)
  - Behindertenparkplatz Rostock ↔ Behindertenparkplatz Rostock (3.7 m)
  - Behindertenparkplatz Rostock ↔ Behindertenparkplatz Rostock (7.4 m)
- 🔴 **Platzhalter statt Adresse:** 94 von 99 Standorten heißen „Behindertenparkplatz Rostock" – das Adressfeld der Quelle wurde vermutlich nicht erkannt.
- 🟡 **Ohne Straße:** 99 von 99 Standorten haben keinen Straßennamen.
- ⬜ **Kein Stadtteil:** Bei allen Standorten steht der Stadtname als Stadtteil – die Quelle nennt keinen.

### Osnabrück

13 Standorte, 29 Stellplätze · Quelle: OpenStreetMap-Mitwirkende (ODbL)

- 🟡 **Auffällig wenige Stellplätze:** 1.7 Stellplätze je 10.000 Einwohner, Mittelwert aller Städte 8.1. Vermutlich eine lückenhafte Quelle, keine lückenhafte Stadt.

### Salzgitter

10 Standorte, 19 Stellplätze · Quelle: OpenStreetMap-Mitwirkende (ODbL)

- 🟡 **Auffällig wenige Stellplätze:** 1.8 Stellplätze je 10.000 Einwohner, Mittelwert aller Städte 8.1. Vermutlich eine lückenhafte Quelle, keine lückenhafte Stadt.

### Greifswald

9 Standorte, 12 Stellplätze · Quelle: OpenStreetMap-Mitwirkende (ODbL)

- 🟡 **Auffällig wenige Stellplätze:** 2.0 Stellplätze je 10.000 Einwohner, Mittelwert aller Städte 8.1. Vermutlich eine lückenhafte Quelle, keine lückenhafte Stadt.

### Dinslaken

7 Standorte, 11 Stellplätze · Quelle: OpenStreetMap-Mitwirkende (ODbL)

- 🟡 **Auffällig wenige Stellplätze:** 1.6 Stellplätze je 10.000 Einwohner, Mittelwert aller Städte 8.1. Vermutlich eine lückenhafte Quelle, keine lückenhafte Stadt.

### Rheine

3 Standorte, 5 Stellplätze · Quelle: OpenStreetMap-Mitwirkende (ODbL)

- 🔴 **Auffällig wenige Stellplätze:** 0.7 Stellplätze je 10.000 Einwohner, Mittelwert aller Städte 8.1. Vermutlich eine lückenhafte Quelle, keine lückenhafte Stadt.

### Lingen (Ems)

2 Standorte, 5 Stellplätze · Quelle: OpenStreetMap-Mitwirkende (ODbL)

- 🟡 **Auffällig wenige Stellplätze:** 0.9 Stellplätze je 10.000 Einwohner, Mittelwert aller Städte 8.1. Vermutlich eine lückenhafte Quelle, keine lückenhafte Stadt.

### Nordhorn

2 Standorte, 4 Stellplätze · Quelle: OpenStreetMap-Mitwirkende (ODbL)

- 🔴 **Auffällig wenige Stellplätze:** 0.7 Stellplätze je 10.000 Einwohner, Mittelwert aller Städte 8.1. Vermutlich eine lückenhafte Quelle, keine lückenhafte Stadt.

## Alle Städte

| Stadt                    | Standorte | Stellplätze | je 10.000 Einw. | von OSM bestätigt | Befunde |
| ------------------------ | --------: | ----------: | --------------: | ----------------: | ------- |
| Aachen                   |       111 |         191 |             7.7 |     nicht geprüft | –       |
| Aalen                    |        19 |          47 |             6.9 |     nicht geprüft | –       |
| Arnsberg                 |        45 |          69 |             9.6 |     nicht geprüft | –       |
| Aschaffenburg            |        30 |          46 |             6.4 |     nicht geprüft | –       |
| Augsburg                 |       400 |         639 |            21.2 |     nicht geprüft | –       |
| Bad Homburg vor der Höhe |        39 |          60 |            10.9 |     nicht geprüft | –       |
| Baden-Baden              |        66 |         111 |            20.1 |     nicht geprüft | –       |
| Bamberg                  |        62 |         144 |            18.7 |     nicht geprüft | –       |
| Bayreuth                 |        26 |          77 |            10.3 |     nicht geprüft | –       |
| Bergheim                 |        26 |          45 |             7.3 |     nicht geprüft | –       |
| Bergisch Gladbach        |       186 |         306 |            27.3 |     nicht geprüft | –       |
| Berlin                   |       923 |        1560 |             4.1 |     nicht geprüft | –       |
| Bielefeld                |       125 |         229 |             6.7 |     nicht geprüft | –       |
| Böblingen                |        54 |         104 |            20.5 |     nicht geprüft | –       |
| Bocholt                  |        10 |          26 |             3.7 |     nicht geprüft | –       |
| Bochum                   |       165 |         411 |            11.2 |     nicht geprüft | –       |
| Bonn                     |       395 |         597 |            17.7 |     nicht geprüft | –       |
| Bottrop                  |       134 |         134 |            11.4 |     nicht geprüft | –       |
| Brandenburg an der Havel |        17 |          29 |             4.0 |     nicht geprüft | –       |
| Braunschweig             |        85 |         226 |             8.9 |     nicht geprüft | –       |
| Bremen                   |       112 |         187 |             3.2 |     nicht geprüft | –       |
| Bremerhaven              |        25 |          47 |             4.1 |     nicht geprüft | –       |
| Castrop-Rauxel           |        22 |          55 |             7.5 |     nicht geprüft | –       |
| Celle                    |        17 |          21 |             3.0 |     nicht geprüft | –       |
| Chemnitz                 |        13 |          56 |             2.2 |     nicht geprüft | –       |
| Cottbus                  |        95 |         190 |            19.4 |     nicht geprüft | –       |
| Darmstadt                |        87 |         162 |            10.0 |     nicht geprüft | –       |
| Delmenhorst              |         9 |          19 |             2.5 |     nicht geprüft | –       |
| Dessau-Roßlau            |        51 |          72 |             9.2 |     nicht geprüft | –       |
| Detmold                  |        24 |          38 |             5.1 |     nicht geprüft | –       |
| Dinslaken                |         7 |          11 |             1.6 |     nicht geprüft | 🟡      |
| Dorsten                  |        37 |          67 |             9.0 |     nicht geprüft | –       |
| Dortmund                 |       368 |         368 |             6.2 |     nicht geprüft | –       |
| Dresden                  |       477 |         676 |            11.9 |     nicht geprüft | –       |
| Duisburg                 |       116 |         213 |             4.3 |     nicht geprüft | –       |
| Düren                    |        36 |          55 |             6.0 |     nicht geprüft | –       |
| Düsseldorf               |       339 |         522 |             8.3 |     nicht geprüft | –       |
| Elmshorn                 |         9 |          21 |             4.1 |     nicht geprüft | –       |
| Emden                    |        45 |          72 |            14.3 |     nicht geprüft | –       |
| Erfurt                   |        88 |         127 |             5.9 |     nicht geprüft | –       |
| Erlangen                 |       108 |         230 |            19.8 |     nicht geprüft | –       |
| Eschweiler               |        55 |          80 |            14.3 |     nicht geprüft | –       |
| Essen                    |       243 |         529 |             9.0 |     nicht geprüft | –       |
| Esslingen am Neckar      |        19 |          39 |             4.2 |     nicht geprüft | –       |
| Euskirchen               |       258 |         373 |            64.3 |     nicht geprüft | –       |
| Flensburg                |        22 |          61 |             6.6 |     nicht geprüft | –       |
| Frankfurt (Oder)         |        35 |          63 |            11.1 |     nicht geprüft | –       |
| Frankfurt am Main        |       458 |         615 |             7.9 |     nicht geprüft | –       |
| Freiburg im Breisgau     |       325 |         329 |            13.9 |     nicht geprüft | –       |
| Freising                 |        39 |          97 |            19.4 |     nicht geprüft | –       |
| Friedrichshafen          |        66 |         104 |            16.6 |     nicht geprüft | –       |
| Fulda                    |        85 |         159 |            23.0 |     nicht geprüft | –       |
| Fürth                    |        42 |          84 |             6.4 |     nicht geprüft | –       |
| Garbsen                  |        58 |         114 |            18.3 |     nicht geprüft | –       |
| Gelsenkirchen            |       219 |         219 |             8.5 |     nicht geprüft | –       |
| Gera                     |        21 |          82 |             8.9 |     nicht geprüft | –       |
| Gießen                   |        29 |          67 |             7.2 |     nicht geprüft | –       |
| Gladbeck                 |        12 |          18 |             2.4 |     nicht geprüft | –       |
| Göppingen                |        35 |          38 |             6.4 |     nicht geprüft | –       |
| Görlitz                  |        20 |          53 |             9.4 |     nicht geprüft | –       |
| Goslar                   |        15 |          30 |             5.9 |     nicht geprüft | –       |
| Göttingen                |       419 |         704 |            58.2 |     nicht geprüft | –       |
| Greifswald               |         9 |          12 |             2.0 |     nicht geprüft | 🟡      |
| Grevenbroich             |        14 |          44 |             6.9 |     nicht geprüft | –       |
| Gummersbach              |        15 |          24 |             4.7 |     nicht geprüft | –       |
| Gütersloh                |        33 |          70 |             6.9 |     nicht geprüft | –       |
| Hagen                    |        64 |         140 |             7.4 |     nicht geprüft | –       |
| Halle (Saale)            |        62 |         178 |             7.4 |     nicht geprüft | –       |
| Hamburg                  |       935 |        1309 |             6.9 |     nicht geprüft | –       |
| Hameln                   |        10 |          19 |             3.3 |     nicht geprüft | –       |
| Hamm                     |       197 |         299 |            16.6 |     nicht geprüft | –       |
| Hanau                    |        40 |          67 |             6.6 |     nicht geprüft | –       |
| Hannover                 |       172 |         334 |             6.1 |     nicht geprüft | –       |
| Hattingen                |        93 |         156 |            29.2 |     nicht geprüft | –       |
| Heidelberg               |       214 |         214 |            13.2 |     nicht geprüft | –       |
| Heilbronn                |        26 |          49 |             3.8 |     nicht geprüft | –       |
| Herford                  |        14 |          24 |             3.6 |     nicht geprüft | –       |
| Herne                    |        35 |          64 |             4.1 |     nicht geprüft | –       |
| Hilden                   |        31 |          38 |             6.8 |     nicht geprüft | –       |
| Hildesheim               |        36 |          94 |             9.3 |     nicht geprüft | –       |
| Hürth                    |        63 |          80 |            13.0 |     nicht geprüft | –       |
| Ibbenbüren               |        11 |          16 |             3.1 |     nicht geprüft | –       |
| Idstein                  |         6 |           9 |               – |     nicht geprüft | –       |
| Ingolstadt               |        31 |          54 |             3.8 |     nicht geprüft | –       |
| Iserlohn                 |        25 |          42 |             4.5 |     nicht geprüft | –       |
| Jena                     |        83 |         118 |            10.6 |     nicht geprüft | –       |
| Kaiserslautern           |        58 |         137 |            13.6 |     nicht geprüft | –       |
| Karlsruhe                |       330 |         532 |            17.2 |     nicht geprüft | –       |
| Kassel                   |        93 |         123 |             6.0 |     nicht geprüft | –       |
| Kempten (Allgäu)         |        33 |          59 |             8.6 |     nicht geprüft | –       |
| Kerpen                   |        51 |          57 |             8.6 |     nicht geprüft | –       |
| Kiel                     |        85 |         241 |             9.6 |     nicht geprüft | –       |
| Koblenz                  |        96 |         203 |            17.7 |     nicht geprüft | –       |
| Köln                     |       445 |         605 |             5.6 |     nicht geprüft | –       |
| Konstanz                 |        43 |          75 |             8.8 |     nicht geprüft | –       |
| Krefeld                  |        40 |          71 |             3.1 |     nicht geprüft | –       |
| Landshut                 |        20 |          70 |             9.5 |     nicht geprüft | –       |
| Langenfeld (Rheinland)   |        26 |          60 |            10.2 |     nicht geprüft | –       |
| Langenhagen              |        44 |          81 |            14.8 |     nicht geprüft | –       |
| Leipzig                  |       233 |         354 |             5.7 |     nicht geprüft | –       |
| Leverkusen               |       122 |         144 |             8.6 |     nicht geprüft | –       |
| Lingen (Ems)             |         2 |           5 |             0.9 |     nicht geprüft | 🟡      |
| Lippstadt                |         9 |          27 |             4.0 |     nicht geprüft | –       |
| Lörrach                  |        17 |          19 |             3.8 |     nicht geprüft | –       |
| Lübeck                   |       280 |         356 |            16.3 |     nicht geprüft | –       |
| Lüdenscheid              |        15 |          22 |             3.0 |     nicht geprüft | –       |
| Ludwigsburg              |        53 |         151 |            16.1 |     nicht geprüft | –       |
| Ludwigshafen am Rhein    |        36 |          60 |             3.5 |     nicht geprüft | –       |
| Lüneburg                 |        39 |          84 |            10.8 |     nicht geprüft | –       |
| Lünen                    |        43 |          50 |             5.8 |     nicht geprüft | –       |
| Magdeburg                |       204 |         341 |            14.2 |     nicht geprüft | –       |
| Mainz                    |       168 |         292 |            13.3 |     nicht geprüft | –       |
| Mannheim                 |        86 |         139 |             4.3 |     nicht geprüft | –       |
| Marburg                  |        25 |          46 |             6.0 |     nicht geprüft | –       |
| Marl                     |        15 |          19 |             2.3 |     nicht geprüft | –       |
| Meerbusch                |        16 |          22 |             3.9 |     nicht geprüft | –       |
| Minden                   |        13 |          23 |             2.8 |     nicht geprüft | –       |
| Moers                    |        64 |         132 |            12.6 |     nicht geprüft | –       |
| Mönchengladbach          |        93 |         213 |             8.1 |     nicht geprüft | –       |
| Mülheim an der Ruhr      |        56 |         121 |             7.0 |     nicht geprüft | –       |
| München                  |       218 |         628 |             4.2 |     nicht geprüft | –       |
| Münster                  |       163 |         319 |             9.9 |     nicht geprüft | –       |
| Neu-Ulm                  |        17 |          23 |             3.9 |     nicht geprüft | –       |
| Neubrandenburg           |        16 |          23 |             3.7 |     nicht geprüft | –       |
| Neumünster               |        97 |         108 |            13.4 |     nicht geprüft | –       |
| Neuss                    |        38 |          57 |             3.7 |     nicht geprüft | –       |
| Neuwied                  |         8 |          20 |             3.1 |     nicht geprüft | –       |
| Norderstedt              |        13 |          24 |             3.0 |     nicht geprüft | –       |
| Nordhorn                 |         2 |           4 |             0.7 |     nicht geprüft | 🔴      |
| Nürnberg                 |       468 |         621 |            11.9 |     nicht geprüft | –       |
| Oberhausen               |        78 |         141 |             6.7 |     nicht geprüft | –       |
| Offenbach am Main        |        23 |          38 |             2.7 |     nicht geprüft | –       |
| Offenburg                |        50 |          92 |            15.2 |     nicht geprüft | –       |
| Oldenburg                |        92 |         230 |            13.0 |     nicht geprüft | –       |
| Osnabrück                |        13 |          29 |             1.7 |     nicht geprüft | 🟡      |
| Paderborn                |       107 |         185 |            11.9 |     nicht geprüft | –       |
| Passau                   |        18 |          21 |             4.0 |     nicht geprüft | –       |
| Peine                    |        15 |          19 |             3.8 |     nicht geprüft | –       |
| Pforzheim                |        51 |         116 |             9.0 |     nicht geprüft | –       |
| Plauen                   |        13 |          34 |             5.3 |     nicht geprüft | –       |
| Potsdam                  |       197 |         388 |            20.7 |     nicht geprüft | –       |
| Pulheim                  |        61 |          69 |            12.6 |     nicht geprüft | –       |
| Rastatt                  |        20 |          28 |             5.6 |     nicht geprüft | –       |
| Ratingen                 |        11 |          23 |             2.6 |     nicht geprüft | –       |
| Ravensburg               |        20 |          57 |            11.2 |     nicht geprüft | –       |
| Recklinghausen           |        56 |         110 |             9.8 |     nicht geprüft | –       |
| Remscheid                |        24 |          94 |             8.1 |     nicht geprüft | –       |
| Reutlingen               |        47 |          61 |             5.2 |     nicht geprüft | –       |
| Rheine                   |         3 |           5 |             0.7 |     nicht geprüft | 🔴      |
| Rosenheim                |        30 |          75 |            11.6 |     nicht geprüft | –       |
| Rostock                  |        99 |         218 |            10.4 |     nicht geprüft | 🔴      |
| Rüsselsheim am Main      |        64 |         133 |            20.2 |     nicht geprüft | –       |
| Saarbrücken              |       157 |         346 |            19.0 |     nicht geprüft | –       |
| Salzgitter               |        10 |          19 |             1.8 |     nicht geprüft | 🟡      |
| Sankt Augustin           |        66 |         108 |            19.2 |     nicht geprüft | –       |
| Schwäbisch Gmünd         |        41 |          69 |            11.3 |     nicht geprüft | –       |
| Schweinfurt              |       127 |         223 |            41.4 |     nicht geprüft | –       |
| Schwerin                 |        22 |          27 |             2.8 |     nicht geprüft | –       |
| Siegen                   |        42 |          84 |             8.2 |     nicht geprüft | –       |
| Sindelfingen             |        52 |          76 |            11.7 |     nicht geprüft | –       |
| Solingen                 |       195 |         232 |            14.4 |     nicht geprüft | –       |
| Speyer                   |        28 |          53 |            10.4 |     nicht geprüft | –       |
| Stolberg (Rhld.)         |        23 |          39 |             7.0 |     nicht geprüft | –       |
| Stralsund                |        18 |          29 |             4.9 |     nicht geprüft | –       |
| Stuttgart                |       266 |         646 |            10.2 |     nicht geprüft | –       |
| Trier                    |        79 |         109 |             9.8 |     nicht geprüft | –       |
| Troisdorf                |       116 |         156 |            20.8 |     nicht geprüft | –       |
| Tübingen                 |       104 |         149 |            16.4 |     nicht geprüft | –       |
| Ulm                      |        48 |         107 |             8.3 |     nicht geprüft | –       |
| Unna                     |        54 |          86 |            14.7 |     nicht geprüft | –       |
| Velbert                  |        19 |          43 |             5.3 |     nicht geprüft | –       |
| Viersen                  |        54 |          84 |            10.9 |     nicht geprüft | –       |
| Villingen-Schwenningen   |        36 |          63 |             7.3 |     nicht geprüft | –       |
| Waiblingen               |        44 |          62 |            11.0 |     nicht geprüft | –       |
| Weimar                   |        26 |          35 |             5.4 |     nicht geprüft | –       |
| Weißenhorn               |         4 |           7 |               – |     nicht geprüft | –       |
| Wesel                    |         4 |          20 |             3.3 |     nicht geprüft | –       |
| Wetzlar                  |        18 |          30 |             5.6 |     nicht geprüft | –       |
| Wiesbaden                |        51 |         181 |             6.4 |     nicht geprüft | –       |
| Willich                  |        39 |          58 |            11.0 |     nicht geprüft | –       |
| Witten                   |       233 |         352 |            36.7 |     nicht geprüft | –       |
| Wolfenbüttel             |        10 |          17 |             3.3 |     nicht geprüft | –       |
| Wolfsburg                |        82 |         141 |            11.0 |     nicht geprüft | –       |
| Worms                    |        98 |         137 |            16.3 |     nicht geprüft | –       |
| Wuppertal                |        66 |         136 |             3.8 |     nicht geprüft | –       |
| Würzburg                 |       126 |         195 |            15.2 |     nicht geprüft | –       |
| Zwickau                  |        66 |         339 |            38.9 |     nicht geprüft | –       |
