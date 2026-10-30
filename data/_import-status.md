# Importstand der deutschen Gemeinden

Zuletzt aktualisiert: 2026-10-30T10:08:33.419Z

Diese Datei schreiben die Importskripte selbst nach **jeder einzelnen Stadt**.
Sie ist damit auch nach einem Abbruch mitten im Lauf korrekt.

Geführt werden **alle Gemeinden mit Einwohnern**, nicht nur die oberhalb der
Importgrenze (ToDo 2e.10). Die Einwohnergrenze bestimmt die Reihenfolge, nicht
die Zugehörigkeit – sonst meldet diese Datei „alles abgearbeitet", während der
weitaus größte Teil des Landes nie angesehen wurde.

## Wo weitermachen

Nächste Gemeinde: **Speyer** (Rang 197, Rheinland-Pfalz, 49.564 Einwohner, geplante Quelle: OpenStreetMap)

```bash
npm run import:city -- speyer
# oder alle verbleibenden nacheinander:
npm run import:city -- --rest
```

## Überblick

| Kennzahl | Wert |
| --- | --- |
| Gemeinden im Register | 10.754 |
| geprüft | 3.758 (35 %) |
| davon mit Treffer | 3.758 |
| davon geprüft, nichts gefunden | 0 |
| noch nicht geprüft | 6.996 |
| mit Problem | 0 |
| importierte Standorte | 38.414 |
| importierte Stellplätze | 64.341 |

„Geprüft, nichts gefunden" ist etwas anderes als „noch nicht geprüft": Dort
lief die Abfrage sauber durch und war leer. Diese Gemeinden werden nicht
erneut abgefragt – bei tausenden Gemeinden wäre das ein Missbrauch von
Overpass. Ein erneuter Versuch geht gezielt über den Namen der Gemeinde.

## Fortschritt nach Größenstufe

Zwei Prozentzahlen, weil sie Verschiedenes sagen: **Gemeinden** beantwortet
„sind wir fertig", **Einwohner** beantwortet „wie vielen Menschen nützt es
schon". Beides allein wäre schief.

| Stufe | geprüft | Gemeinden | Einwohner |
| --- | ---: | ---: | ---: |
| ab 100.000 | 80 von 80 | 100 % | 100 % |
| ab 50.000 | 115 von 115 | 100 % | 100 % |
| ab 20.000 | 498 von 511 | 97 % | 97 % |
| ab 10.000 | 795 von 892 | 89 % | 90 % |
| ab 5.000 | 941 von 1.345 | 70 % | 71 % |
| unter 5.000 | 1.329 von 7.811 | 17 % | 30 % |

## Fortschritt nach Bundesland

Die Einheit des landesweiten Abrufs (2e.7) – hier wird sichtbar, wo ein Lauf
etwas gebracht hat und wo nicht.

| Bundesland | geprüft | Gemeinden | Einwohner |
| --- | ---: | ---: | ---: |
| Baden-Württemberg | 655 von 1.101 | 59 % | 87 % |
| Bayern | 782 von 2.056 | 38 % | 74 % |
| Berlin | 1 von 1 | 100 % | 100 % |
| Brandenburg | 146 von 413 | 35 % | 81 % |
| Bremen | 2 von 2 | 100 % | 100 % |
| Hamburg | 1 von 1 | 100 % | 100 % |
| Hessen | 302 von 421 | 72 % | 90 % |
| Mecklenburg-Vorpommern | 142 von 724 | 20 % | 67 % |
| Niedersachsen | 376 von 941 | 40 % | 82 % |
| Nordrhein-Westfalen | 359 von 396 | 91 % | 97 % |
| Rheinland-Pfalz | 325 von 2.301 | 14 % | 63 % |
| Saarland | 37 von 52 | 71 % | 82 % |
| Sachsen | 215 von 418 | 51 % | 85 % |
| Sachsen-Anhalt | 94 von 218 | 43 % | 84 % |
| Schleswig-Holstein | 180 von 1.104 | 16 % | 70 % |
| Thüringen | 141 von 605 | 23 % | 76 % |

## Angesehene Gemeinden

3.758 von 10.754 Gemeinden sind angefasst worden. Nur sie stehen hier einzeln – die übrigen
sind sämtlich „noch nicht geprüft", und zehntausend gleichlautende Zeilen
liest niemand.

| | Rang | Gemeinde | Einwohner | Quelle | Standorte | Stellplätze | Stand |
| --- | ---: | --- | ---: | --- | ---: | ---: | --- |
 | ✅ | 1 | Berlin | 3.685.265 | amtlich (WFS) | 923 | 1560 | fertig | 
 | ✅ | 2 | Hamburg | 1.862.565 | amtlich (WFS) | 936 | 1310 | fertig | 
 | ✅ | 3 | München | 1.505.005 | amtlich (GEOJSON) | 568 | 958 | fertig | 
 | ✅ | 4 | Köln | 1.024.621 | amtlich (WFS) | 445 | 605 | fertig | 
 | ✅ | 5 | Frankfurt am Main | 756.021 | amtlich (WFS) | 458 | 615 | fertig | 
 | ✅ | 6 | Düsseldorf | 618.685 | amtlich (JSON) | 340 | 523 | fertig | 
 | ✅ | 7 | Stuttgart | 612.663 | OpenStreetMap | 266 | 646 | fertig | 
 | ✅ | 8 | Leipzig | 611.850 | OpenStreetMap | 237 | 358 | fertig | 
 | ✅ | 9 | Dortmund | 603.462 | amtlich (GEOJSON) | 368 | 368 | fertig | 
 | ✅ | 10 | Bremen | 586.271 | OpenStreetMap | 112 | 187 | fertig | 
 | ✅ | 11 | Essen | 574.682 | OpenStreetMap | 244 | 549 | fertig | 
 | ✅ | 12 | Dresden | 564.904 | amtlich (WFS) | 481 | 680 | fertig | 
 | ✅ | 13 | Nürnberg | 529.508 | OpenStreetMap | 487 | 640 | fertig | 
 | ✅ | 14 | Hannover | 522.131 | OpenStreetMap | 173 | 335 | fertig | 
 | ✅ | 15 | Duisburg | 502.270 | OpenStreetMap | 116 | 213 | fertig | 
 | ✅ | 16 | Bochum | 358.676 | OpenStreetMap | 165 | 411 | amtliche Quelle nicht nutzbar, OSM verwendet | 
 | ✅ | 17 | Wuppertal | 358.193 | OpenStreetMap | 66 | 136 | fertig | 
 | ✅ | 18 | Bielefeld | 331.605 | amtlich (CSV) | 122 | 199 | fertig | 
 | ✅ | 19 | Bonn | 323.336 | OpenStreetMap | 406 | 608 | fertig | 
 | ✅ | 20 | Mannheim | 318.035 | OpenStreetMap | 86 | 139 | fertig | 
 | ✅ | 21 | Karlsruhe | 309.050 | OpenStreetMap | 330 | 532 | amtliche Quelle nicht nutzbar, OSM verwendet | 
 | ✅ | 22 | Münster | 308.258 | OpenStreetMap | 165 | 324 | fertig | 
 | ✅ | 23 | Augsburg | 301.105 | OpenStreetMap | 400 | 639 | fertig | 
 | ✅ | 24 | Wiesbaden | 288.850 | OpenStreetMap | 51 | 181 | fertig | 
 | ✅ | 25 | Gelsenkirchen | 267.930 | amtlich (JSON) | 219 | 219 | fertig | 
 | ✅ | 26 | Mönchengladbach | 267.213 | OpenStreetMap | 93 | 213 | fertig | 
 | ✅ | 27 | Aachen | 262.670 | OpenStreetMap | 111 | 191 | amtliche Quelle nicht nutzbar, OSM verwendet | 
 | ✅ | 28 | Braunschweig | 252.962 | OpenStreetMap | 85 | 226 | fertig | 
 | ✅ | 29 | Kiel | 252.668 | OpenStreetMap | 85 | 241 | amtliche Quelle nicht nutzbar, OSM verwendet | 
 | ✅ | 30 | Chemnitz | 245.618 | OpenStreetMap | 221 | 337 | fertig | 
 | ✅ | 31 | Magdeburg | 244.329 | OpenStreetMap | 208 | 345 | fertig | 
 | ✅ | 32 | Freiburg im Breisgau | 237.460 | amtlich (WFS) | 330 | 334 | fertig | 
 | ✅ | 33 | Krefeld | 231.406 | OpenStreetMap | 40 | 71 | amtliche Quelle nicht nutzbar, OSM verwendet | 
 | ✅ | 34 | Halle (Saale) | 226.767 | OpenStreetMap | 62 | 178 | fertig | 
 | ✅ | 35 | Mainz | 224.684 | OpenStreetMap | 171 | 295 | fertig | 
 | ✅ | 36 | Erfurt | 218.793 | OpenStreetMap | 88 | 127 | fertig | 
 | ✅ | 37 | Lübeck | 216.889 | OpenStreetMap | 281 | 357 | fertig | 
 | ✅ | 38 | Oberhausen | 213.646 | OpenStreetMap | 78 | 141 | fertig | 
 | ✅ | 39 | Rostock | 205.307 | OpenStreetMap | 99 | 218 | amtliche Quelle „Rostocker Heide" lieferte nur 9 Stellplätze (9 Standorte) – verdächtig leer, OSM verwendet | 
 | ✅ | 40 | Kassel | 197.230 | OpenStreetMap | 93 | 123 | fertig | 
 | ✅ | 41 | Hagen | 190.384 | OpenStreetMap | 64 | 140 | fertig | 
 | ✅ | 42 | Potsdam | 184.754 | OpenStreetMap | 202 | 399 | fertig | 
 | ✅ | 43 | Saarbrücken | 182.971 | OpenStreetMap | 157 | 346 | fertig | 
 | ✅ | 44 | Hamm | 179.968 | OpenStreetMap | 198 | 300 | fertig | 
 | ✅ | 45 | Ludwigshafen am Rhein | 177.222 | OpenStreetMap | 36 | 60 | fertig | 
 | ✅ | 46 | Oldenburg (Oldb) | 176.614 | OpenStreetMap | 92 | 230 | fertig | 
 | ✅ | 47 | Mülheim an der Ruhr | 173.050 | OpenStreetMap | 56 | 121 | fertig | 
 | ✅ | 48 | Leverkusen | 168.581 | OpenStreetMap | 122 | 144 | fertig | 
 | ✅ | 49 | Darmstadt | 167.029 | OpenStreetMap | 90 | 165 | fertig | 
 | ✅ | 50 | Osnabrück | 166.057 | OpenStreetMap | 13 | 29 | fertig | 
 | ✅ | 51 | Solingen | 165.626 | OpenStreetMap | 196 | 233 | fertig | 
 | ✅ | 52 | Paderborn | 156.378 | OpenStreetMap | 107 | 185 | fertig | 
 | ✅ | 53 | Herne | 155.851 | OpenStreetMap | 35 | 64 | fertig | 
 | ✅ | 54 | Heidelberg | 155.756 | amtlich (GEOJSON) | 214 | 214 | fertig | 
 | ✅ | 55 | Neuss | 154.317 | amtlich (GEOJSON) | 38 | 57 | fertig | 
 | ✅ | 56 | Regensburg | 151.389 | OpenStreetMap (Geofabrik-Auszug) | 67 | 121 | fertig | 
 | ✅ | 57 | Ingolstadt | 141.185 | OpenStreetMap | 31 | 54 | fertig | 
 | ✅ | 58 | Pforzheim | 134.912 | OpenStreetMap | 51 | 116 | fertig | 
 | ✅ | 59 | Würzburg | 133.258 | OpenStreetMap | 127 | 196 | fertig | 
 | ✅ | 60 | Offenbach am Main | 132.746 | OpenStreetMap | 23 | 38 | fertig | 
 | ✅ | 61 | Fürth | 132.036 | OpenStreetMap | 42 | 84 | fertig | 
 | ✅ | 62 | Heilbronn | 131.986 | OpenStreetMap | 26 | 49 | fertig | 
 | ✅ | 63 | Ulm | 129.882 | amtlich (GEOJSON) | 48 | 107 | fertig | 
 | ✅ | 64 | Wolfsburg | 129.560 | OpenStreetMap | 82 | 141 | fertig | 
 | ✅ | 65 | Göttingen | 127.259 | OpenStreetMap | 424 | 709 | fertig | 
 | ✅ | 66 | Reutlingen | 118.852 | OpenStreetMap | 47 | 61 | fertig | 
 | ✅ | 67 | Bremerhaven | 118.610 | OpenStreetMap | 25 | 47 | fertig | 
 | ✅ | 68 | Bottrop | 118.535 | amtlich (WFS) | 134 | 134 | fertig | 
 | ✅ | 69 | Erlangen | 115.928 | OpenStreetMap | 108 | 230 | fertig | 
 | ✅ | 70 | Recklinghausen | 115.344 | OpenStreetMap | 57 | 111 | fertig | 
 | ✅ | 71 | Remscheid | 113.828 | OpenStreetMap | 24 | 94 | fertig | 
 | ✅ | 72 | Koblenz | 113.378 | OpenStreetMap | 96 | 203 | fertig | 
 | ✅ | 73 | Bergisch Gladbach | 111.361 | OpenStreetMap | 189 | 309 | fertig | 
 | ✅ | 74 | Jena | 109.725 | OpenStreetMap | 84 | 119 | fertig | 
 | ✅ | 75 | Salzgitter | 104.970 | OpenStreetMap | 10 | 19 | fertig | 
 | ✅ | 76 | Trier | 104.342 | OpenStreetMap | 79 | 109 | fertig | 
 | ✅ | 77 | Siegen | 102.685 | OpenStreetMap | 42 | 84 | fertig | 
 | ✅ | 78 | Moers | 101.503 | OpenStreetMap | 66 | 134 | fertig | 
 | ✅ | 79 | Gütersloh | 100.479 | OpenStreetMap | 33 | 70 | fertig | 
 | ✅ | 80 | Kaiserslautern | 100.426 | OpenStreetMap | 58 | 137 | fertig | 
 | ✅ | 81 | Hildesheim | 98.510 | OpenStreetMap | 37 | 97 | fertig | 
 | ✅ | 82 | Schwerin | 98.308 | OpenStreetMap | 22 | 27 | fertig | 
 | ✅ | 83 | Hanau | 97.956 | OpenStreetMap | 40 | 67 | fertig | 
 | ✅ | 84 | Flensburg | 96.326 | OpenStreetMap | 23 | 63 | fertig | 
 | ✅ | 85 | Esslingen am Neckar | 96.182 | OpenStreetMap | 19 | 39 | fertig | 
 | ✅ | 86 | Gera | 95.608 | OpenStreetMap | 21 | 82 | fertig | 
 | ✅ | 87 | Cottbus | 95.123 | OpenStreetMap | 95 | 190 | fertig | 
 | ✅ | 88 | Düren | 94.568 | OpenStreetMap | 36 | 55 | fertig | 
 | ✅ | 89 | Ludwigsburg | 92.858 | OpenStreetMap | 53 | 151 | fertig | 
 | ✅ | 90 | Tübingen | 92.322 | OpenStreetMap | 105 | 150 | fertig | 
 | ✅ | 91 | Iserlohn | 91.811 | OpenStreetMap | 25 | 42 | fertig | 
 | ✅ | 92 | Witten | 91.808 | OpenStreetMap | 234 | 353 | fertig | 
 | ✅ | 93 | Villingen-Schwenningen | 89.756 | OpenStreetMap | 36 | 63 | fertig | 
 | ✅ | 94 | Ratingen | 89.368 | OpenStreetMap | 11 | 23 | fertig | 
 | ✅ | 95 | Gießen | 89.179 | OpenStreetMap | 29 | 67 | fertig | 
 | ✅ | 96 | Zwickau | 87.410 | OpenStreetMap | 66 | 339 | fertig | 
 | ✅ | 97 | Konstanz | 86.919 | OpenStreetMap | 43 | 75 | fertig | 
 | ✅ | 98 | Marl | 86.766 | OpenStreetMap | 15 | 19 | fertig | 
 | ✅ | 99 | Worms | 86.753 | OpenStreetMap | 98 | 137 | fertig | 
 | ✅ | 100 | Lünen | 86.163 | OpenStreetMap | 43 | 50 | fertig | 
 | ✅ | 101 | Minden | 84.013 | OpenStreetMap | 13 | 23 | fertig | 
 | ✅ | 102 | Norderstedt | 82.844 | OpenStreetMap | 13 | 24 | amtliche Quelle nicht nutzbar, OSM verwendet | 
 | ✅ | 103 | Velbert | 82.463 | OpenStreetMap | 19 | 43 | fertig | 
 | ✅ | 104 | Delmenhorst | 81.406 | OpenStreetMap | 9 | 19 | fertig | 
 | ✅ | 105 | Neumünster | 79.809 | OpenStreetMap | 97 | 108 | fertig | 
 | ✅ | 106 | Viersen | 78.373 | OpenStreetMap | 54 | 84 | amtliche Quelle nicht nutzbar, OSM verwendet | 
 | ✅ | 107 | Rheine | 77.209 | OpenStreetMap | 3 | 5 | fertig | 
 | ✅ | 108 | Bamberg | 77.150 | OpenStreetMap | 62 | 144 | fertig | 
 | ✅ | 109 | Troisdorf | 75.901 | OpenStreetMap | 119 | 159 | fertig | 
 | ✅ | 110 | Wilhelmshaven | 75.745 | OpenStreetMap | 57 | 64 | fertig | 
 | ✅ | 111 | Gladbeck | 75.499 | OpenStreetMap | 12 | 18 | fertig | 
 | ✅ | 112 | Dessau-Roßlau | 75.402 | OpenStreetMap | 51 | 72 | fertig | 
 | ✅ | 113 | Dorsten | 75.277 | OpenStreetMap | 38 | 68 | fertig | 
 | ✅ | 114 | Arnsberg | 74.879 | OpenStreetMap | 45 | 69 | fertig | 
 | ✅ | 115 | Lüneburg | 74.785 | OpenStreetMap | 40 | 85 | fertig | 
 | ✅ | 116 | Detmold | 74.278 | OpenStreetMap | 24 | 38 | fertig | 
 | ✅ | 117 | Brandenburg an der Havel | 74.113 | OpenStreetMap | 17 | 29 | fertig | 
 | ✅ | 118 | Marburg | 73.544 | OpenStreetMap | 26 | 50 | fertig | 
 | ✅ | 119 | Castrop-Rauxel | 73.282 | OpenStreetMap | 22 | 55 | fertig | 
 | ✅ | 120 | Bocholt | 73.257 | OpenStreetMap | 10 | 26 | fertig | 
 | ✅ | 121 | Aschaffenburg | 73.091 | OpenStreetMap | 30 | 46 | fertig | 
 | ✅ | 122 | Bayreuth | 72.940 | OpenStreetMap | 26 | 77 | fertig | 
 | ✅ | 123 | Landshut | 71.863 | OpenStreetMap | 20 | 70 | fertig | 
 | ✅ | 124 | Lüdenscheid | 71.212 | OpenStreetMap | 15 | 22 | fertig | 
 | ✅ | 125 | Lippstadt | 68.739 | OpenStreetMap | 9 | 27 | fertig | 
 | ✅ | 126 | Kempten (Allgäu) | 67.645 | OpenStreetMap | 33 | 59 | fertig | 
 | ✅ | 127 | Aalen | 67.621 | OpenStreetMap | 19 | 47 | fertig | 
 | ✅ | 128 | Herford | 67.503 | OpenStreetMap | 14 | 24 | fertig | 
 | ✅ | 129 | Neuwied | 67.083 | OpenStreetMap | 8 | 20 | fertig | 
 | ✅ | 130 | Dinslaken | 66.993 | OpenStreetMap | 7 | 11 | fertig | 
 | ✅ | 131 | Celle | 66.834 | OpenStreetMap | 17 | 21 | fertig | 
 | ✅ | 132 | Kerpen | 66.585 | OpenStreetMap | 51 | 57 | fertig | 
 | ✅ | 133 | Grevenbroich | 65.983 | OpenStreetMap | 14 | 44 | fertig | 
 | ✅ | 134 | Weimar | 65.954 | OpenStreetMap | 26 | 35 | fertig | 
 | ✅ | 135 | Rüsselsheim am Main | 65.627 | OpenStreetMap | 66 | 135 | fertig | 
 | ✅ | 136 | Plauen | 65.599 | OpenStreetMap | 13 | 34 | fertig | 
 | ✅ | 137 | Fulda | 65.434 | OpenStreetMap | 85 | 159 | fertig | 
 | ✅ | 138 | Rosenheim | 65.274 | OpenStreetMap | 30 | 75 | fertig | 
 | ✅ | 139 | Schwäbisch Gmünd | 64.416 | OpenStreetMap | 41 | 69 | fertig | 
 | ✅ | 140 | Dormagen | 63.799 | OpenStreetMap | 82 | 101 | fertig | 
 | ✅ | 141 | Offenburg | 62.993 | OpenStreetMap | 50 | 92 | fertig | 
 | ✅ | 142 | Friedrichshafen | 62.796 | OpenStreetMap | 67 | 105 | fertig | 
 | ✅ | 143 | Neu-Ulm | 62.641 | OpenStreetMap | 17 | 23 | fertig | 
 | ✅ | 144 | Hürth | 62.160 | OpenStreetMap | 63 | 80 | fertig | 
 | ✅ | 145 | Bergheim | 61.611 | OpenStreetMap | 26 | 45 | fertig | 
 | ✅ | 146 | Sindelfingen | 61.422 | OpenStreetMap | 52 | 76 | fertig | 
 | ✅ | 147 | Herten | 60.941 | OpenStreetMap | 20 | 47 | fertig | 
 | ✅ | 148 | Wesel | 60.785 | OpenStreetMap | 4 | 20 | fertig | 
 | ✅ | 149 | Neubrandenburg | 60.344 | OpenStreetMap | 16 | 23 | fertig | 
 | ✅ | 150 | Euskirchen | 60.021 | OpenStreetMap | 259 | 374 | fertig | 
 | ✅ | 151 | Langenfeld (Rhld.) | 59.975 | OpenStreetMap | 26 | 60 | fertig | 
 | ✅ | 152 | Garbsen | 59.903 | OpenStreetMap | 58 | 114 | fertig | 
 | ✅ | 153 | Göppingen | 58.937 | OpenStreetMap | 35 | 38 | fertig | 
 | ✅ | 154 | Unna | 58.333 | OpenStreetMap | 54 | 86 | fertig | 
 | ✅ | 155 | Hameln | 58.244 | OpenStreetMap | 10 | 19 | fertig | 
 | ✅ | 156 | Stolberg (Rhld.) | 57.684 | OpenStreetMap | 23 | 39 | fertig | 
 | ✅ | 157 | Eschweiler | 57.534 | OpenStreetMap | 55 | 80 | fertig | 
 | ✅ | 158 | Waiblingen | 57.313 | OpenStreetMap | 44 | 62 | fertig | 
 | ✅ | 159 | Frankfurt (Oder) | 57.107 | OpenStreetMap | 35 | 63 | amtliche Quelle nicht nutzbar, OSM verwendet | 
 | ✅ | 160 | Meerbusch | 57.078 | OpenStreetMap | 16 | 22 | fertig | 
 | ✅ | 161 | Nordhorn | 56.973 | OpenStreetMap | 2 | 4 | fertig | 
 | ✅ | 162 | Baden-Baden | 56.881 | OpenStreetMap | 67 | 112 | fertig | 
 | ✅ | 163 | Bad Homburg v.d.Höhe | 56.688 | OpenStreetMap | 39 | 60 | fertig | 
 | ✅ | 164 | Sankt Augustin | 56.521 | OpenStreetMap | 67 | 109 | fertig | 
 | ✅ | 165 | Lingen (Ems) | 56.498 | OpenStreetMap | 2 | 5 | fertig | 
 | ✅ | 166 | Pulheim | 56.150 | OpenStreetMap | 61 | 69 | fertig | 
 | ✅ | 167 | Greifswald | 56.092 | OpenStreetMap | 9 | 12 | fertig | 
 | ✅ | 168 | Görlitz | 55.186 | OpenStreetMap | 20 | 53 | fertig | 
 | ✅ | 169 | Hilden | 55.157 | OpenStreetMap | 31 | 38 | fertig | 
 | ✅ | 170 | Wetzlar | 54.665 | OpenStreetMap | 18 | 30 | fertig | 
 | ✅ | 171 | Schweinfurt | 54.481 | OpenStreetMap | 130 | 226 | fertig | 
 | ✅ | 172 | Bad Kreuznach | 54.168 | OpenStreetMap (Geofabrik-Auszug) | 8 | 10 | fertig | 
 | ✅ | 173 | Langenhagen | 54.142 | OpenStreetMap | 44 | 81 | fertig | 
 | ✅ | 174 | Stralsund | 54.094 | OpenStreetMap | 18 | 29 | fertig | 
 | ✅ | 175 | Bad Salzuflen | 53.958 | OpenStreetMap | 12 | 22 | fertig | 
 | ✅ | 176 | Hattingen | 53.044 | OpenStreetMap | 94 | 157 | fertig | 
 | ✅ | 177 | Passau | 53.039 | OpenStreetMap | 18 | 21 | fertig | 
 | ✅ | 178 | Kleve | 53.028 | OpenStreetMap | 42 | 49 | fertig | 
 | ✅ | 179 | Neustadt an der Weinstraße | 52.945 | OpenStreetMap | 11 | 19 | fertig | 
 | ✅ | 180 | Ahlen | 52.666 | OpenStreetMap | 20 | 21 | fertig | 
 | ✅ | 181 | Wolfenbüttel | 52.604 | OpenStreetMap | 10 | 17 | fertig | 
 | ✅ | 182 | Frechen | 52.309 | OpenStreetMap | 57 | 62 | fertig | 
 | ✅ | 183 | Menden (Sauerland) | 52.255 | OpenStreetMap | 12 | 13 | fertig | 
 | ✅ | 184 | Ibbenbüren | 51.803 | OpenStreetMap | 12 | 17 | fertig | 
 | ✅ | 185 | Böblingen | 51.483 | OpenStreetMap | 54 | 104 | fertig | 
 | ✅ | 186 | Lörrach | 51.349 | OpenStreetMap | 17 | 19 | fertig | 
 | ✅ | 187 | Elmshorn | 51.342 | OpenStreetMap | 9 | 21 | fertig | 
 | ✅ | 188 | Gummersbach | 51.290 | OpenStreetMap | 15 | 24 | fertig | 
 | ✅ | 189 | Peine | 50.987 | OpenStreetMap | 15 | 19 | fertig | 
 | ✅ | 190 | Lahr/Schwarzwald | 50.775 | OpenStreetMap | 10 | 19 | fertig | 
 | ✅ | 191 | Rastatt | 50.741 | amtlich (regional: trk) | 35 | 47 | fertig | 
 | ✅ | 192 | Ravensburg | 50.628 | OpenStreetMap | 20 | 57 | fertig | 
 | ✅ | 193 | Bad Oeynhausen | 50.620 | OpenStreetMap | 31 | 38 | fertig | 
 | ✅ | 194 | Heidenheim an der Brenz | 50.618 | OpenStreetMap | 52 | 84 | fertig | 
 | ✅ | 195 | Gronau (Westf.) | 50.547 | OpenStreetMap | 6 | 10 | fertig | 
 | ✅ | 196 | Cuxhaven | 49.697 | OpenStreetMap (Geofabrik-Auszug) | 77 | 107 | fertig | 
 | ✅ | 198 | Leonberg | 49.480 | OpenStreetMap (Geofabrik-Auszug) | 32 | 40 | fertig | 
 | ✅ | 201 | Bergkamen | 49.143 | OpenStreetMap (Geofabrik-Auszug) | 52 | 83 | fertig | 
 | ✅ | 202 | Oranienburg | 49.122 | OpenStreetMap (Geofabrik-Auszug) | 12 | 25 | fertig | 
 | ✅ | 203 | Straubing | 49.002 | OpenStreetMap (Geofabrik-Auszug) | 3 | 5 | fertig | 
 | ✅ | 205 | Alsdorf | 48.810 | OpenStreetMap (Geofabrik-Auszug) | 9 | 19 | fertig | 
 | ✅ | 206 | Erftstadt | 48.772 | OpenStreetMap (Geofabrik-Auszug) | 37 | 47 | fertig | 
 | ✅ | 207 | Stade | 48.633 | OpenStreetMap (Geofabrik-Auszug) | 15 | 35 | fertig | 
 | ✅ | 208 | Herzogenrath | 48.574 | OpenStreetMap (Geofabrik-Auszug) | 14 | 31 | fertig | 
 | ✅ | 209 | Landau in der Pfalz | 48.209 | amtlich (regional: trk) | 89 | 143 | fertig | 
 | ✅ | 210 | Bornheim | 48.203 | OpenStreetMap (Geofabrik-Auszug) | 41 | 54 | fertig | 
 | ✅ | 211 | Hennef (Sieg) | 48.188 | OpenStreetMap (Geofabrik-Auszug) | 91 | 143 | fertig | 
 | ✅ | 212 | Frankenthal (Pfalz) | 48.140 | OpenStreetMap (Geofabrik-Auszug) | 10 | 16 | fertig | 
 | ✅ | 213 | Rheda-Wiedenbrück | 48.030 | OpenStreetMap (Geofabrik-Auszug) | 7 | 18 | fertig | 
 | ✅ | 214 | Dülmen | 47.989 | OpenStreetMap (Geofabrik-Auszug) | 12 | 26 | fertig | 
 | ✅ | 215 | Bruchsal | 47.784 | amtlich (regional: trk) | 36 | 57 | fertig | 
 | ✅ | 216 | Soest | 47.776 | OpenStreetMap (Geofabrik-Auszug) | 49 | 69 | fertig | 
 | ✅ | 217 | Singen (Hohentwiel) | 47.621 | OpenStreetMap (Geofabrik-Auszug) | 62 | 127 | fertig | 
 | ✅ | 219 | Neunkirchen | 47.344 | OpenStreetMap (Geofabrik-Auszug) | 3 | 7 | fertig | 
 | ✅ | 220 | Dachau | 47.138 | OpenStreetMap (Geofabrik-Auszug) | 35 | 40 | fertig | 
 | ✅ | 221 | Fellbach | 47.120 | OpenStreetMap (Geofabrik-Auszug) | 15 | 17 | fertig | 
 | ✅ | 222 | Albstadt | 46.950 | OpenStreetMap (Geofabrik-Auszug) | 16 | 23 | fertig | 
 | ✅ | 223 | Hof | 46.778 | OpenStreetMap (Geofabrik-Auszug) | 13 | 16 | fertig | 
 | ✅ | 224 | Oberursel (Taunus) | 46.736 | OpenStreetMap (Geofabrik-Auszug) | 24 | 37 | fertig | 
 | ✅ | 225 | Melle | 46.436 | OpenStreetMap (Geofabrik-Auszug) | 4 | 7 | fertig | 
 | ✅ | 226 | Gotha | 46.400 | OpenStreetMap (Geofabrik-Auszug) | 17 | 23 | fertig | 
 | ✅ | 227 | Bünde | 46.365 | OpenStreetMap (Geofabrik-Auszug) | 11 | 16 | fertig | 
 | ✅ | 228 | Filderstadt | 46.243 | OpenStreetMap (Geofabrik-Auszug) | 58 | 96 | fertig | 
 | ✅ | 229 | Kaufbeuren | 46.193 | OpenStreetMap (Geofabrik-Auszug) | 16 | 17 | fertig | 
 | ✅ | 230 | Weinheim | 45.852 | OpenStreetMap (Geofabrik-Auszug) | 30 | 88 | fertig | 
 | ✅ | 231 | Schwerte | 45.821 | OpenStreetMap (Geofabrik-Auszug) | 26 | 38 | fertig | 
 | ✅ | 232 | Falkensee | 45.720 | OpenStreetMap (Geofabrik-Auszug) | 58 | 88 | fertig | 
 | ✅ | 233 | Rottenburg am Neckar | 45.677 | OpenStreetMap (Geofabrik-Auszug) | 21 | 29 | fertig | 
 | ✅ | 234 | Brühl | 45.555 | OpenStreetMap (Geofabrik-Auszug) | 37 | 49 | fertig | 
 | ✅ | 235 | Erkelenz | 45.315 | OpenStreetMap (Geofabrik-Auszug) | 14 | 30 | fertig | 
 | ✅ | 236 | Rodgau | 45.277 | OpenStreetMap (Geofabrik-Auszug) | 17 | 28 | fertig | 
 | ✅ | 237 | Wittenberg | 45.249 | OpenStreetMap (Geofabrik-Auszug) | 7 | 14 | fertig | 
 | ✅ | 238 | Pinneberg | 44.865 | OpenStreetMap (Geofabrik-Auszug) | 9 | 21 | fertig | 
 | ✅ | 239 | Neustadt am Rübenberge | 44.668 | OpenStreetMap (Geofabrik-Auszug) | 19 | 30 | fertig | 
 | ✅ | 240 | Bernau bei Berlin | 44.597 | OpenStreetMap (Geofabrik-Auszug) | 14 | 71 | fertig | 
 | ✅ | 241 | Lehrte | 44.255 | OpenStreetMap (Geofabrik-Auszug) | 6 | 17 | fertig | 
 | ✅ | 242 | Memmingen | 44.192 | OpenStreetMap (Geofabrik-Auszug) | 10 | 28 | fertig | 
 | ✅ | 243 | Seevetal | 44.158 | OpenStreetMap (Geofabrik-Auszug) | 7 | 9 | fertig | 
 | ✅ | 244 | Erkrath | 43.706 | OpenStreetMap (Geofabrik-Auszug) | 12 | 17 | fertig | 
 | ✅ | 245 | Monheim am Rhein | 43.630 | OpenStreetMap (Geofabrik-Auszug) | 29 | 37 | fertig | 
 | ✅ | 246 | Bietigheim-Bissingen | 43.556 | OpenStreetMap (Geofabrik-Auszug) | 42 | 79 | fertig | 
 | ✅ | 248 | Wismar | 43.329 | OpenStreetMap (Geofabrik-Auszug) | 15 | 33 | fertig | 
 | ✅ | 249 | Kaarst | 43.295 | OpenStreetMap (Geofabrik-Auszug) | 42 | 71 | fertig | 
 | ✅ | 250 | Heinsberg | 43.163 | OpenStreetMap (Geofabrik-Auszug) | 14 | 22 | fertig | 
 | ✅ | 251 | Borken | 43.035 | OpenStreetMap (Geofabrik-Auszug) | 18 | 24 | fertig | 
 | ✅ | 252 | Gifhorn | 42.726 | OpenStreetMap (Geofabrik-Auszug) | 25 | 38 | fertig | 
 | ✅ | 253 | Aurich | 42.612 | OpenStreetMap (Geofabrik-Auszug) | 3 | 7 | fertig | 
 | ✅ | 254 | Schwäbisch Hall | 42.598 | OpenStreetMap (Geofabrik-Auszug) | 11 | 14 | fertig | 
 | ✅ | 255 | Amberg | 42.553 | OpenStreetMap (Geofabrik-Auszug) | 7 | 12 | fertig | 
 | ✅ | 256 | Siegburg | 42.445 | OpenStreetMap (Geofabrik-Auszug) | 50 | 81 | fertig | 
 | ✅ | 257 | Weiden i.d.OPf. | 42.444 | OpenStreetMap (Geofabrik-Auszug) | 20 | 39 | fertig | 
 | ✅ | 258 | Kamen | 42.319 | OpenStreetMap (Geofabrik-Auszug) | 48 | 57 | fertig | 
 | ✅ | 259 | Kirchheim unter Teck | 42.299 | OpenStreetMap (Geofabrik-Auszug) | 14 | 32 | fertig | 
 | ✅ | 260 | Nettetal | 41.955 | OpenStreetMap (Geofabrik-Auszug) | 34 | 38 | fertig | 
 | ✅ | 261 | Laatzen | 41.838 | OpenStreetMap (Geofabrik-Auszug) | 9 | 21 | fertig | 
 | ✅ | 262 | Buchholz in der Nordheide | 41.737 | OpenStreetMap (Geofabrik-Auszug) | 27 | 81 | fertig | 
 | ✅ | 263 | Dreieich | 41.692 | OpenStreetMap (Geofabrik-Auszug) | 5 | 11 | fertig | 
 | ✅ | 264 | Schorndorf | 41.647 | OpenStreetMap (Geofabrik-Auszug) | 13 | 19 | fertig | 
 | ✅ | 265 | Freiberg | 41.519 | OpenStreetMap (Geofabrik-Auszug) | 37 | 63 | fertig | 
 | ✅ | 266 | Eberswalde | 41.481 | OpenStreetMap (Geofabrik-Auszug) | 8 | 19 | fertig | 
 | ✅ | 267 | Wunstorf | 41.211 | OpenStreetMap (Geofabrik-Auszug) | 14 | 19 | fertig | 
 | ✅ | 268 | Hückelhoven | 41.192 | OpenStreetMap (Geofabrik-Auszug) | 3 | 5 | fertig | 
 | ✅ | 269 | Leinfelden-Echterdingen | 41.185 | OpenStreetMap (Geofabrik-Auszug) | 50 | 68 | fertig | 
 | ✅ | 270 | Bensheim | 41.124 | OpenStreetMap (Geofabrik-Auszug) | 27 | 40 | fertig | 
 | ✅ | 271 | Neumarkt i.d.OPf. | 41.103 | OpenStreetMap (Geofabrik-Auszug) | 53 | 80 | fertig | 
 | ✅ | 272 | Coburg | 41.064 | OpenStreetMap (Geofabrik-Auszug) | 23 | 30 | fertig | 
 | ✅ | 273 | Völklingen | 40.952 | OpenStreetMap (Geofabrik-Auszug) | 6 | 16 | fertig | 
 | ✅ | 274 | Germering | 40.916 | OpenStreetMap (Geofabrik-Auszug) | 15 | 33 | fertig | 
 | ✅ | 275 | Buxtehude | 40.886 | OpenStreetMap (Geofabrik-Auszug) | 5 | 10 | fertig | 
 | ✅ | 276 | Schwabach | 40.835 | OpenStreetMap (Geofabrik-Auszug) | 5 | 19 | fertig | 
 | ✅ | 277 | Löhne | 40.826 | OpenStreetMap (Geofabrik-Auszug) | 6 | 17 | fertig | 
 | ✅ | 278 | Nürtingen | 40.773 | OpenStreetMap (Geofabrik-Auszug) | 24 | 30 | fertig | 
 | ✅ | 279 | Nordhausen | 40.767 | OpenStreetMap (Geofabrik-Auszug) | 17 | 28 | fertig | 
 | ✅ | 280 | Eisenach | 40.747 | OpenStreetMap (Geofabrik-Auszug) | 25 | 32 | fertig | 
 | ✅ | 281 | Ansbach | 40.742 | OpenStreetMap (Geofabrik-Auszug) | 16 | 27 | fertig | 
 | ✅ | 282 | Königswinter | 40.574 | OpenStreetMap (Geofabrik-Auszug) | 50 | 72 | fertig | 
 | ✅ | 283 | Ahaus | 40.176 | OpenStreetMap (Geofabrik-Auszug) | 2 | 5 | fertig | 
 | ✅ | 284 | Würselen | 40.145 | OpenStreetMap (Geofabrik-Auszug) | 2 | 6 | fertig | 
 | ✅ | 285 | Pirna | 40.128 | OpenStreetMap (Geofabrik-Auszug) | 38 | 83 | fertig | 
 | ✅ | 286 | Lemgo | 39.905 | OpenStreetMap (Geofabrik-Auszug) | 19 | 24 | fertig | 
 | ✅ | 287 | Ostfildern | 39.778 | OpenStreetMap (Geofabrik-Auszug) | 25 | 51 | fertig | 
 | ✅ | 288 | Pirmasens | 39.761 | OpenStreetMap (Geofabrik-Auszug) | 3 | 5 | fertig | 
 | ✅ | 289 | Kehl | 39.584 | OpenStreetMap (Geofabrik-Auszug) | 18 | 29 | fertig | 
 | ✅ | 290 | Mettmann | 39.542 | OpenStreetMap (Geofabrik-Auszug) | 19 | 31 | fertig | 
 | ✅ | 291 | Königs Wusterhausen | 39.360 | OpenStreetMap (Geofabrik-Auszug) | 15 | 25 | fertig | 
 | ✅ | 292 | Freital | 39.281 | OpenStreetMap (Geofabrik-Auszug) | 29 | 68 | fertig | 
 | ✅ | 293 | Hofheim am Taunus | 39.259 | OpenStreetMap (Geofabrik-Auszug) | 8 | 11 | fertig | 
 | ✅ | 294 | Maintal | 38.987 | OpenStreetMap (Geofabrik-Auszug) | 9 | 15 | fertig | 
 | ✅ | 295 | Ilmenau | 38.834 | OpenStreetMap (Geofabrik-Auszug) | 68 | 91 | fertig | 
 | ✅ | 296 | Backnang | 38.818 | OpenStreetMap (Geofabrik-Auszug) | 56 | 83 | fertig | 
 | ✅ | 297 | Langen (Hessen) | 38.785 | OpenStreetMap (Geofabrik-Auszug) | 19 | 29 | fertig | 
 | ✅ | 298 | Ettlingen | 38.578 | amtlich (regional: trk) | 27 | 54 | fertig | 
 | ✅ | 299 | Niederkassel | 38.485 | OpenStreetMap (Geofabrik-Auszug) | 19 | 19 | fertig | 
 | ✅ | 300 | Coesfeld | 38.237 | OpenStreetMap (Geofabrik-Auszug) | 10 | 21 | fertig | 
 | ✅ | 301 | Kamp-Lintfort | 38.217 | OpenStreetMap (Geofabrik-Auszug) | 15 | 29 | fertig | 
 | ✅ | 302 | Greven | 38.212 | OpenStreetMap (Geofabrik-Auszug) | 17 | 24 | fertig | 
 | ✅ | 303 | Haltern am See | 38.142 | OpenStreetMap (Geofabrik-Auszug) | 22 | 53 | fertig | 
 | ✅ | 304 | Wesseling | 38.106 | OpenStreetMap (Geofabrik-Auszug) | 40 | 66 | fertig | 
 | ✅ | 305 | Weißenfels | 37.929 | OpenStreetMap (Geofabrik-Auszug) | 9 | 11 | fertig | 
 | ✅ | 306 | Neu-Isenburg | 37.926 | OpenStreetMap (Geofabrik-Auszug) | 32 | 51 | fertig | 
 | ✅ | 307 | Halberstadt | 37.898 | OpenStreetMap (Geofabrik-Auszug) | 10 | 12 | fertig | 
 | ✅ | 308 | Stendal | 37.850 | OpenStreetMap (Geofabrik-Auszug) | 45 | 47 | fertig | 
 | ✅ | 309 | Warendorf | 37.703 | OpenStreetMap (Geofabrik-Auszug) | 7 | 8 | fertig | 
 | ✅ | 310 | Saarlouis | 37.667 | OpenStreetMap (Geofabrik-Auszug) | 4 | 7 | fertig | 
 | ✅ | 311 | Bautzen | 37.566 | OpenStreetMap (Geofabrik-Auszug) | 8 | 20 | fertig | 
 | ✅ | 312 | Fürstenfeldbruck | 37.420 | OpenStreetMap (Geofabrik-Auszug) | 25 | 58 | fertig | 
 | ✅ | 313 | Papenburg | 37.206 | OpenStreetMap (Geofabrik-Auszug) | 7 | 13 | fertig | 
 | ✅ | 314 | Erding | 37.171 | OpenStreetMap (Geofabrik-Auszug) | 47 | 114 | fertig | 
 | ✅ | 315 | Beckum | 37.133 | OpenStreetMap (Geofabrik-Auszug) | 18 | 23 | fertig | 
 | ✅ | 316 | Tuttlingen | 37.109 | OpenStreetMap (Geofabrik-Auszug) | 8 | 15 | fertig | 
 | ✅ | 317 | Sinsheim | 37.036 | OpenStreetMap (Geofabrik-Auszug) | 48 | 78 | fertig | 
 | ✅ | 318 | Winsen (Luhe) | 36.961 | OpenStreetMap (Geofabrik-Auszug) | 8 | 16 | fertig | 
 | ✅ | 319 | Meppen | 36.930 | OpenStreetMap (Geofabrik-Auszug) | 14 | 19 | fertig | 
 | ✅ | 320 | Bitterfeld-Wolfen | 36.592 | OpenStreetMap (Geofabrik-Auszug) | 31 | 114 | fertig | 
 | ✅ | 321 | Cloppenburg | 36.565 | OpenStreetMap (Geofabrik-Auszug) | 13 | 28 | fertig | 
 | ✅ | 322 | Porta Westfalica | 36.521 | OpenStreetMap (Geofabrik-Auszug) | 20 | 24 | fertig | 
 | ✅ | 323 | Mühlhausen/Thüringen | 36.353 | OpenStreetMap (Geofabrik-Auszug) | 4 | 14 | fertig | 
 | ✅ | 324 | Emsdetten | 36.159 | OpenStreetMap (Geofabrik-Auszug) | 8 | 52 | fertig | 
 | ✅ | 325 | Bad Vilbel | 35.961 | OpenStreetMap (Geofabrik-Auszug) | 17 | 28 | fertig | 
 | ✅ | 326 | Limburg a.d.Lahn | 35.938 | OpenStreetMap (Geofabrik-Auszug) | 6 | 9 | fertig | 
 | ✅ | 327 | Crailsheim | 35.755 | OpenStreetMap (Geofabrik-Auszug) | 19 | 22 | fertig | 
 | ✅ | 328 | Voerde (Niederrhein) | 35.661 | OpenStreetMap (Geofabrik-Auszug) | 4 | 8 | fertig | 
 | ✅ | 329 | Balingen | 35.623 | OpenStreetMap (Geofabrik-Auszug) | 5 | 12 | fertig | 
 | ✅ | 330 | Dietzenbach | 35.561 | OpenStreetMap (Geofabrik-Auszug) | 15 | 29 | fertig | 
 | ✅ | 331 | Datteln | 35.473 | OpenStreetMap (Geofabrik-Auszug) | 3 | 7 | fertig | 
 | ✅ | 332 | St. Ingbert | 35.453 | OpenStreetMap (Geofabrik-Auszug) | 7 | 15 | fertig | 
 | ✅ | 333 | Lage | 35.054 | OpenStreetMap (Geofabrik-Auszug) | 8 | 15 | fertig | 
 | ✅ | 334 | Deggendorf | 35.044 | OpenStreetMap (Geofabrik-Auszug) | 159 | 229 | fertig | 
 | ✅ | 335 | Ingelheim am Rhein | 35.016 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 336 | Hemer | 35.005 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 337 | Geldern | 34.962 | OpenStreetMap (Geofabrik-Auszug) | 29 | 41 | fertig | 
 | ✅ | 338 | Wedel | 34.912 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 339 | Goch | 34.907 | OpenStreetMap (Geofabrik-Auszug) | 3 | 6 | fertig | 
 | ✅ | 340 | Jülich | 34.890 | OpenStreetMap (Geofabrik-Auszug) | 6 | 10 | fertig | 
 | ✅ | 341 | Steinfurt | 34.860 | OpenStreetMap (Geofabrik-Auszug) | 11 | 24 | fertig | 
 | ✅ | 342 | Suhl | 34.685 | OpenStreetMap (Geofabrik-Auszug) | 15 | 47 | fertig | 
 | ✅ | 343 | Rheinfelden (Baden) | 34.674 | OpenStreetMap (Geofabrik-Auszug) | 8 | 16 | fertig | 
 | ✅ | 344 | Korschenbroich | 34.600 | OpenStreetMap (Geofabrik-Auszug) | 29 | 50 | fertig | 
 | ✅ | 345 | Biberach an der Riß | 34.576 | OpenStreetMap (Geofabrik-Auszug) | 44 | 58 | fertig | 
 | ✅ | 346 | Ahrensburg | 34.534 | OpenStreetMap (Geofabrik-Auszug) | 35 | 62 | fertig | 
 | ✅ | 347 | Viernheim | 34.426 | OpenStreetMap (Geofabrik-Auszug) | 15 | 75 | fertig | 
 | ✅ | 348 | Merseburg | 34.392 | OpenStreetMap (Geofabrik-Auszug) | 8 | 17 | fertig | 
 | ✅ | 349 | Wermelskirchen | 34.375 | OpenStreetMap (Geofabrik-Auszug) | 33 | 50 | fertig | 
 | ✅ | 350 | Seelze | 34.364 | OpenStreetMap (Geofabrik-Auszug) | 5 | 9 | fertig | 
 | ✅ | 351 | Herrenberg | 34.192 | OpenStreetMap (Geofabrik-Auszug) | 34 | 45 | fertig | 
 | ✅ | 352 | Kempen | 34.105 | OpenStreetMap (Geofabrik-Auszug) | 25 | 42 | fertig | 
 | ✅ | 353 | Leer (Ostfriesland) | 34.025 | OpenStreetMap (Geofabrik-Auszug) | 28 | 43 | fertig | 
 | ✅ | 354 | Kornwestheim | 33.980 | OpenStreetMap (Geofabrik-Auszug) | 19 | 23 | fertig | 
 | ✅ | 355 | Barsinghausen | 33.941 | OpenStreetMap (Geofabrik-Auszug) | 7 | 7 | fertig | 
 | ✅ | 356 | Stuhr | 33.913 | OpenStreetMap (Geofabrik-Auszug) | 6 | 10 | fertig | 
 | ✅ | 357 | Schwedt/Oder | 33.730 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 358 | Vechta | 33.728 | OpenStreetMap (Geofabrik-Auszug) | 21 | 34 | fertig | 
 | ✅ | 359 | Geesthacht | 33.519 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 360 | Zweibrücken | 33.323 | OpenStreetMap (Geofabrik-Auszug) | 8 | 14 | fertig | 
 | ✅ | 361 | Forchheim | 33.017 | OpenStreetMap (Geofabrik-Auszug) | 39 | 45 | fertig | 
 | ✅ | 362 | Radebeul | 32.979 | OpenStreetMap (Geofabrik-Auszug) | 11 | 24 | fertig | 
 | ✅ | 363 | Bad Nauheim | 32.894 | OpenStreetMap (Geofabrik-Auszug) | 43 | 55 | fertig | 
 | ✅ | 364 | Achim | 32.870 | OpenStreetMap (Geofabrik-Auszug) | 18 | 68 | fertig | 
 | ✅ | 365 | Uelzen | 32.821 | OpenStreetMap (Geofabrik-Auszug) | 5 | 6 | fertig | 
 | ✅ | 366 | Itzehoe | 32.725 | OpenStreetMap (Geofabrik-Auszug) | 16 | 25 | fertig | 
 | ✅ | 367 | Nienburg (Weser) | 32.608 | OpenStreetMap (Geofabrik-Auszug) | 33 | 70 | fertig | 
 | ✅ | 368 | Lampertheim | 32.400 | OpenStreetMap (Geofabrik-Auszug) | 6 | 6 | fertig | 
 | ✅ | 369 | Weil am Rhein | 32.236 | OpenStreetMap (Geofabrik-Auszug) | 11 | 14 | fertig | 
 | ✅ | 370 | Wernigerode | 32.167 | OpenStreetMap (Geofabrik-Auszug) | 23 | 45 | fertig | 
 | ✅ | 371 | Delbrück | 32.166 | OpenStreetMap (Geofabrik-Auszug) | 10 | 13 | fertig | 
 | ✅ | 372 | Fürstenwalde/Spree | 32.002 | OpenStreetMap (Geofabrik-Auszug) | 8 | 14 | fertig | 
 | ✅ | 373 | Neuruppin | 31.962 | OpenStreetMap (Geofabrik-Auszug) | 3 | 6 | fertig | 
 | ✅ | 374 | Naumburg (Saale) | 31.940 | OpenStreetMap (Geofabrik-Auszug) | 7 | 16 | fertig | 
 | ✅ | 375 | Emmerich am Rhein | 31.829 | OpenStreetMap (Geofabrik-Auszug) | 14 | 43 | fertig | 
 | ✅ | 376 | Radolfzell am Bodensee | 31.734 | OpenStreetMap (Geofabrik-Auszug) | 21 | 46 | fertig | 
 | ✅ | 377 | Merzig | 31.697 | OpenStreetMap (Geofabrik-Auszug) | 4 | 4 | fertig | 
 | ✅ | 378 | Mörfelden-Walldorf | 31.638 | OpenStreetMap (Geofabrik-Auszug) | 8 | 24 | fertig | 
 | ✅ | 379 | Ganderkesee | 31.494 | OpenStreetMap (Geofabrik-Auszug) | 7 | 12 | fertig | 
 | ✅ | 380 | Oer-Erkenschwick | 31.404 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 381 | Georgsmarienhütte | 31.244 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 382 | Rheinberg | 31.172 | OpenStreetMap (Geofabrik-Auszug) | 9 | 11 | fertig | 
 | ✅ | 383 | Altenburg | 31.093 | OpenStreetMap (Geofabrik-Auszug) | 10 | 13 | fertig | 
 | ✅ | 384 | Geestland | 31.093 | OpenStreetMap (Geofabrik-Auszug) | 12 | 16 | fertig | 
 | ✅ | 385 | Burgdorf | 31.051 | OpenStreetMap (Geofabrik-Auszug) | 3 | 5 | fertig | 
 | ✅ | 386 | Walsrode | 31.019 | OpenStreetMap (Geofabrik-Auszug) | 12 | 13 | fertig | 
 | ✅ | 387 | Bernburg (Saale) | 30.992 | OpenStreetMap (Geofabrik-Auszug) | 3 | 17 | fertig | 
 | ✅ | 388 | Lohmar | 30.992 | OpenStreetMap (Geofabrik-Auszug) | 7 | 14 | fertig | 
 | ✅ | 389 | Weyhe | 30.975 | OpenStreetMap (Geofabrik-Auszug) | 7 | 15 | fertig | 
 | ✅ | 390 | Kreuztal | 30.905 | OpenStreetMap (Geofabrik-Auszug) | 6 | 8 | fertig | 
 | ✅ | 391 | Bad Hersfeld | 30.846 | OpenStreetMap (Geofabrik-Auszug) | 7 | 15 | fertig | 
 | ✅ | 392 | Hoyerswerda | 30.759 | OpenStreetMap (Geofabrik-Auszug) | 9 | 19 | fertig | 
 | ✅ | 393 | Rendsburg | 30.633 | OpenStreetMap (Geofabrik-Auszug) | 6 | 9 | fertig | 
 | ✅ | 394 | Schönebeck (Elbe) | 30.419 | OpenStreetMap (Geofabrik-Auszug) | 7 | 10 | fertig | 
 | ✅ | 395 | Friedberg (Hessen) | 30.409 | OpenStreetMap (Geofabrik-Auszug) | 21 | 30 | fertig | 
 | ✅ | 396 | Bretten | 30.274 | amtlich (regional: trk) | 16 | 27 | fertig | 
 | ✅ | 397 | Werne | 30.202 | OpenStreetMap (Geofabrik-Auszug) | 39 | 53 | fertig | 
 | ✅ | 398 | Idar-Oberstein | 30.170 | OpenStreetMap (Geofabrik-Auszug) | 9 | 33 | fertig | 
 | ✅ | 399 | Taunusstein | 30.145 | OpenStreetMap (Geofabrik-Auszug) | 9 | 15 | fertig | 
 | ✅ | 400 | Neuburg a.d.Donau | 30.135 | OpenStreetMap (Geofabrik-Auszug) | 5 | 8 | fertig | 
 | ✅ | 402 | Haan | 30.086 | OpenStreetMap (Geofabrik-Auszug) | 15 | 25 | fertig | 
 | ✅ | 403 | Rietberg | 30.055 | OpenStreetMap (Geofabrik-Auszug) | 4 | 4 | fertig | 
 | ✅ | 404 | Andernach | 30.039 | OpenStreetMap (Geofabrik-Auszug) | 11 | 21 | fertig | 
 | ✅ | 405 | Gevelsberg | 30.006 | OpenStreetMap (Geofabrik-Auszug) | 19 | 33 | fertig | 
 | ✅ | 406 | Friedberg | 29.953 | OpenStreetMap (Geofabrik-Auszug) | 86 | 121 | fertig | 
 | ✅ | 407 | Schwandorf | 29.877 | OpenStreetMap (Geofabrik-Auszug) | 5 | 5 | fertig | 
 | ✅ | 408 | Winnenden | 29.876 | OpenStreetMap (Geofabrik-Auszug) | 12 | 22 | fertig | 
 | ✅ | 409 | Wedemark | 29.803 | OpenStreetMap (Geofabrik-Auszug) | 12 | 14 | fertig | 
 | ✅ | 410 | Einbeck | 29.751 | OpenStreetMap (Geofabrik-Auszug) | 18 | 41 | fertig | 
 | ✅ | 411 | Osterholz-Scharmbeck | 29.710 | OpenStreetMap (Geofabrik-Auszug) | 4 | 9 | fertig | 
 | ✅ | 412 | Bad Zwischenahn | 29.698 | OpenStreetMap (Geofabrik-Auszug) | 18 | 21 | fertig | 
 | ✅ | 413 | Meschede | 29.615 | OpenStreetMap (Geofabrik-Auszug) | 15 | 29 | fertig | 
 | ✅ | 414 | Werl | 29.600 | OpenStreetMap (Geofabrik-Auszug) | 38 | 50 | fertig | 
 | ✅ | 415 | Gaggenau | 29.529 | amtlich (regional: trk) | 5 | 8 | fertig | 
 | ✅ | 416 | Ludwigsfelde | 29.514 | OpenStreetMap (Geofabrik-Auszug) | 14 | 20 | fertig | 
 | ✅ | 417 | Emmendingen | 29.502 | OpenStreetMap (Geofabrik-Auszug) | 18 | 30 | fertig | 
 | ✅ | 418 | Ennepetal | 29.446 | OpenStreetMap (Geofabrik-Auszug) | 8 | 14 | fertig | 
 | ✅ | 419 | Riesa | 29.373 | OpenStreetMap (Geofabrik-Auszug) | 38 | 50 | fertig | 
 | ✅ | 420 | Griesheim | 29.309 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 421 | Landsberg am Lech | 29.257 | OpenStreetMap (Geofabrik-Auszug) | 14 | 19 | fertig | 
 | ✅ | 422 | Tönisvorst | 29.251 | OpenStreetMap (Geofabrik-Auszug) | 4 | 4 | fertig | 
 | ✅ | 423 | Baesweiler | 29.206 | OpenStreetMap (Geofabrik-Auszug) | 6 | 10 | fertig | 
 | ✅ | 424 | Mühlheim am Main | 29.194 | OpenStreetMap (Geofabrik-Auszug) | 7 | 8 | fertig | 
 | ✅ | 425 | Mechernich | 29.187 | OpenStreetMap (Geofabrik-Auszug) | 83 | 95 | fertig | 
 | ✅ | 426 | Waltrop | 29.177 | OpenStreetMap (Geofabrik-Auszug) | 3 | 5 | fertig | 
 | ✅ | 427 | Blankenfelde-Mahlow | 29.129 | OpenStreetMap (Geofabrik-Auszug) | 6 | 10 | fertig | 
 | ✅ | 428 | Saalfeld/Saale | 29.086 | OpenStreetMap (Geofabrik-Auszug) | 6 | 8 | fertig | 
 | ✅ | 429 | Güstrow | 28.959 | OpenStreetMap (Geofabrik-Auszug) | 14 | 31 | fertig | 
 | ✅ | 430 | Vaihingen an der Enz | 28.798 | OpenStreetMap (Geofabrik-Auszug) | 35 | 64 | fertig | 
 | ✅ | 431 | Meißen | 28.753 | OpenStreetMap (Geofabrik-Auszug) | 14 | 27 | fertig | 
 | ✅ | 432 | Rödermark | 28.753 | OpenStreetMap (Geofabrik-Auszug) | 32 | 72 | fertig | 
 | ✅ | 433 | Rösrath | 28.709 | OpenStreetMap (Geofabrik-Auszug) | 21 | 39 | fertig | 
 | ✅ | 434 | Springe | 28.669 | OpenStreetMap (Geofabrik-Auszug) | 6 | 10 | fertig | 
 | ✅ | 435 | Arnstadt | 28.615 | OpenStreetMap (Geofabrik-Auszug) | 11 | 16 | fertig | 
 | ✅ | 436 | Bühl | 28.608 | OpenStreetMap (Geofabrik-Auszug) | 22 | 38 | fertig | 
 | ✅ | 437 | Geilenkirchen | 28.494 | OpenStreetMap (Geofabrik-Auszug) | 10 | 20 | fertig | 
 | ✅ | 438 | Unterschleißheim | 28.482 | OpenStreetMap (Geofabrik-Auszug) | 5 | 6 | fertig | 
 | ✅ | 439 | Hattersheim am Main | 28.467 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 440 | Wangen im Allgäu | 28.412 | OpenStreetMap (Geofabrik-Auszug) | 16 | 27 | fertig | 
 | ✅ | 441 | Zeitz | 28.328 | OpenStreetMap (Geofabrik-Auszug) | 7 | 8 | fertig | 
 | ✅ | 442 | Henstedt-Ulzburg | 28.325 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 443 | Garmisch-Partenkirchen | 28.305 | OpenStreetMap (Geofabrik-Auszug) | 29 | 189 | fertig | 
 | ✅ | 444 | Kevelaer | 28.296 | OpenStreetMap (Geofabrik-Auszug) | 13 | 23 | fertig | 
 | ✅ | 445 | Reinbek | 28.274 | OpenStreetMap (Geofabrik-Auszug) | 8 | 9 | fertig | 
 | ✅ | 446 | Bramsche | 28.220 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 447 | Kelkheim (Taunus) | 28.175 | OpenStreetMap (Geofabrik-Auszug) | 4 | 4 | fertig | 
 | ✅ | 448 | Höxter | 28.166 | OpenStreetMap (Geofabrik-Auszug) | 6 | 11 | fertig | 
 | ✅ | 449 | Lohne (Oldenburg) | 28.089 | OpenStreetMap (Geofabrik-Auszug) | 4 | 12 | fertig | 
 | ✅ | 450 | Wegberg | 28.089 | OpenStreetMap (Geofabrik-Auszug) | 33 | 38 | fertig | 
 | ✅ | 451 | Leichlingen (Rhld.) | 28.078 | OpenStreetMap (Geofabrik-Auszug) | 29 | 37 | fertig | 
 | ✅ | 452 | Bad Neuenahr-Ahrweiler | 27.961 | OpenStreetMap (Geofabrik-Auszug) | 57 | 83 | fertig | 
 | ✅ | 453 | Schwelm | 27.953 | OpenStreetMap (Geofabrik-Auszug) | 7 | 19 | fertig | 
 | ✅ | 454 | Baunatal | 27.929 | OpenStreetMap (Geofabrik-Auszug) | 14 | 18 | fertig | 
 | ✅ | 455 | Königsbrunn | 27.879 | OpenStreetMap (Geofabrik-Auszug) | 59 | 90 | fertig | 
 | ✅ | 456 | Heppenheim (Bergstraße) | 27.864 | OpenStreetMap (Geofabrik-Auszug) | 6 | 13 | fertig | 
 | ✅ | 457 | Geislingen an der Steige | 27.791 | OpenStreetMap (Geofabrik-Auszug) | 12 | 25 | fertig | 
 | ✅ | 458 | Ehingen (Donau) | 27.764 | OpenStreetMap (Geofabrik-Auszug) | 5 | 7 | fertig | 
 | ✅ | 459 | Wiesloch | 27.731 | OpenStreetMap (Geofabrik-Auszug) | 16 | 36 | fertig | 
 | ✅ | 460 | Strausberg | 27.719 | OpenStreetMap (Geofabrik-Auszug) | 25 | 38 | fertig | 
 | ✅ | 461 | Teltow | 27.682 | OpenStreetMap (Geofabrik-Auszug) | 12 | 22 | fertig | 
 | ✅ | 462 | Sundern (Sauerland) | 27.654 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 463 | Grimma | 27.529 | OpenStreetMap (Geofabrik-Auszug) | 13 | 16 | fertig | 
 | ✅ | 464 | Northeim | 27.326 | OpenStreetMap (Geofabrik-Auszug) | 18 | 26 | fertig | 
 | ✅ | 465 | Olching | 27.310 | OpenStreetMap (Geofabrik-Auszug) | 7 | 12 | fertig | 
 | ✅ | 466 | Neukirchen-Vluyn | 27.140 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 467 | Verden (Aller) | 27.121 | OpenStreetMap (Geofabrik-Auszug) | 23 | 53 | fertig | 
 | ✅ | 468 | Weinstadt | 27.074 | OpenStreetMap (Geofabrik-Auszug) | 19 | 25 | fertig | 
 | ✅ | 469 | Werder (Havel) | 27.065 | OpenStreetMap (Geofabrik-Auszug) | 13 | 25 | fertig | 
 | ✅ | 470 | Butzbach | 27.046 | OpenStreetMap (Geofabrik-Auszug) | 15 | 20 | fertig | 
 | ✅ | 471 | Pfaffenhofen a.d.Ilm | 26.996 | OpenStreetMap (Geofabrik-Auszug) | 8 | 15 | fertig | 
 | ✅ | 472 | Rheinbach | 26.918 | OpenStreetMap (Geofabrik-Auszug) | 47 | 71 | fertig | 
 | ✅ | 473 | Hamminkeln | 26.873 | OpenStreetMap (Geofabrik-Auszug) | 5 | 14 | fertig | 
 | ✅ | 474 | Leimen | 26.873 | OpenStreetMap (Geofabrik-Auszug) | 26 | 70 | fertig | 
 | ✅ | 475 | Hohen Neuendorf | 26.857 | OpenStreetMap (Geofabrik-Auszug) | 17 | 28 | fertig | 
 | ✅ | 476 | Lübbecke | 26.815 | OpenStreetMap (Geofabrik-Auszug) | 3 | 5 | fertig | 
 | ✅ | 477 | Mühlacker | 26.787 | OpenStreetMap (Geofabrik-Auszug) | 16 | 28 | fertig | 
 | ✅ | 478 | Achern | 26.733 | OpenStreetMap (Geofabrik-Auszug) | 64 | 91 | fertig | 
 | ✅ | 479 | Hennigsdorf | 26.677 | OpenStreetMap (Geofabrik-Auszug) | 7 | 9 | fertig | 
 | ✅ | 480 | Overath | 26.663 | OpenStreetMap (Geofabrik-Auszug) | 63 | 92 | fertig | 
 | ✅ | 481 | Kulmbach | 26.625 | OpenStreetMap (Geofabrik-Auszug) | 4 | 6 | fertig | 
 | ✅ | 482 | Weiterstadt | 26.583 | OpenStreetMap (Geofabrik-Auszug) | 12 | 24 | fertig | 
 | ✅ | 483 | Unterhaching | 26.507 | OpenStreetMap (Geofabrik-Auszug) | 11 | 20 | fertig | 
 | ✅ | 484 | Neckarsulm | 26.431 | OpenStreetMap (Geofabrik-Auszug) | 14 | 39 | fertig | 
 | ✅ | 485 | Schloß Holte-Stukenbrock | 26.297 | OpenStreetMap (Geofabrik-Auszug) | 5 | 9 | fertig | 
 | ✅ | 486 | Heiligenhaus | 26.252 | OpenStreetMap (Geofabrik-Auszug) | 3 | 5 | fertig | 
 | ✅ | 487 | Zirndorf | 26.243 | OpenStreetMap (Geofabrik-Auszug) | 14 | 37 | fertig | 
 | ✅ | 488 | Remseck am Neckar | 26.188 | OpenStreetMap (Geofabrik-Auszug) | 6 | 87 | fertig | 
 | ✅ | 489 | Lauf a.d.Pegnitz | 26.106 | OpenStreetMap (Geofabrik-Auszug) | 8 | 17 | fertig | 
 | ✅ | 490 | Wetter (Ruhr) | 26.090 | OpenStreetMap (Geofabrik-Auszug) | 44 | 62 | fertig | 
 | ✅ | 491 | Geretsried | 25.997 | OpenStreetMap (Geofabrik-Auszug) | 8 | 21 | fertig | 
 | ✅ | 492 | Selm | 25.969 | OpenStreetMap (Geofabrik-Auszug) | 32 | 38 | fertig | 
 | ✅ | 493 | Delitzsch | 25.895 | OpenStreetMap (Geofabrik-Auszug) | 4 | 7 | fertig | 
 | ✅ | 494 | Nordenham | 25.889 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 495 | Friedrichsdorf | 25.871 | OpenStreetMap (Geofabrik-Auszug) | 8 | 15 | fertig | 
 | ✅ | 496 | Lindau (Bodensee) | 25.845 | OpenStreetMap (Geofabrik-Auszug) | 16 | 28 | fertig | 
 | ✅ | 497 | Verl | 25.762 | OpenStreetMap (Geofabrik-Auszug) | 7 | 10 | fertig | 
 | ✅ | 498 | Waldkraiburg | 25.737 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 500 | Öhringen | 25.673 | OpenStreetMap (Geofabrik-Auszug) | 15 | 25 | fertig | 
 | ✅ | 501 | Horb am Neckar | 25.651 | OpenStreetMap (Geofabrik-Auszug) | 3 | 9 | fertig | 
 | ✅ | 502 | Aschersleben | 25.647 | OpenStreetMap (Geofabrik-Auszug) | 4 | 9 | fertig | 
 | ✅ | 503 | Rinteln | 25.602 | OpenStreetMap (Geofabrik-Auszug) | 4 | 12 | fertig | 
 | ✅ | 504 | Espelkamp | 25.576 | OpenStreetMap (Geofabrik-Auszug) | 2 | 6 | fertig | 
 | ✅ | 505 | Harsewinkel | 25.523 | OpenStreetMap (Geofabrik-Auszug) | 2 | 5 | fertig | 
 | ✅ | 506 | Roth | 25.458 | OpenStreetMap (Geofabrik-Auszug) | 8 | 10 | fertig | 
 | ✅ | 507 | St. Wendel | 25.441 | OpenStreetMap (Geofabrik-Auszug) | 8 | 8 | fertig | 
 | ✅ | 508 | Salzkotten | 25.429 | OpenStreetMap (Geofabrik-Auszug) | 6 | 8 | fertig | 
 | ✅ | 509 | Brilon | 25.424 | OpenStreetMap (Geofabrik-Auszug) | 6 | 11 | fertig | 
 | ✅ | 510 | Pfungstadt | 25.415 | OpenStreetMap (Geofabrik-Auszug) | 5 | 6 | fertig | 
 | ✅ | 511 | Sangerhausen | 25.392 | OpenStreetMap (Geofabrik-Auszug) | 8 | 10 | fertig | 
 | ✅ | 512 | Groß-Gerau | 25.388 | OpenStreetMap (Geofabrik-Auszug) | 59 | 60 | fertig | 
 | ✅ | 513 | Bingen am Rhein | 25.384 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 514 | Schleswig | 25.352 | OpenStreetMap (Geofabrik-Auszug) | 27 | 30 | fertig | 
 | ✅ | 515 | Petershagen | 25.340 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 516 | Markkleeberg | 25.331 | OpenStreetMap (Geofabrik-Auszug) | 27 | 31 | fertig | 
 | ✅ | 517 | Bedburg | 25.316 | OpenStreetMap (Geofabrik-Auszug) | 12 | 24 | fertig | 
 | ✅ | 518 | Obertshausen | 25.316 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 519 | Zittau | 25.286 | OpenStreetMap (Geofabrik-Auszug) | 9 | 17 | fertig | 
 | ✅ | 520 | Syke | 25.270 | OpenStreetMap (Geofabrik-Auszug) | 4 | 7 | fertig | 
 | ✅ | 521 | Lüdinghausen | 25.265 | OpenStreetMap (Geofabrik-Auszug) | 26 | 44 | fertig | 
 | ✅ | 522 | Stutensee | 25.259 | amtlich (regional: trk) | 32 | 49 | fertig | 
 | ✅ | 523 | Norden | 25.178 | OpenStreetMap (Geofabrik-Auszug) | 22 | 34 | fertig | 
 | ✅ | 524 | Wiehl | 25.164 | OpenStreetMap (Geofabrik-Auszug) | 8 | 8 | fertig | 
 | ✅ | 525 | Helmstedt | 25.099 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 526 | Rathenow | 25.087 | OpenStreetMap (Geofabrik-Auszug) | 18 | 26 | fertig | 
 | ✅ | 527 | Bad Honnef | 25.061 | OpenStreetMap (Geofabrik-Auszug) | 28 | 38 | fertig | 
 | ✅ | 528 | Waldshut-Tiengen | 25.019 | OpenStreetMap (Geofabrik-Auszug) | 12 | 19 | fertig | 
 | ✅ | 529 | Meiningen | 25.002 | OpenStreetMap (Geofabrik-Auszug) | 12 | 14 | fertig | 
 | ✅ | 530 | Calw | 25.001 | OpenStreetMap (Geofabrik-Auszug) | 13 | 22 | fertig | 
 | ✅ | 531 | Ellwangen (Jagst) | 25.001 | OpenStreetMap (Geofabrik-Auszug) | 8 | 18 | fertig | 
 | ✅ | 532 | Warstein | 24.988 | OpenStreetMap (Geofabrik-Auszug) | 13 | 20 | fertig | 
 | ✅ | 533 | Rottweil | 24.985 | OpenStreetMap (Geofabrik-Auszug) | 7 | 11 | fertig | 
 | ✅ | 534 | Vaterstetten | 24.981 | OpenStreetMap (Geofabrik-Auszug) | 40 | 46 | fertig | 
 | ✅ | 535 | Weingarten | 24.940 | OpenStreetMap (Geofabrik-Auszug) | 5 | 19 | fertig | 
 | ✅ | 536 | Meckenheim | 24.925 | OpenStreetMap (Geofabrik-Auszug) | 43 | 69 | fertig | 
 | ✅ | 537 | Rudolstadt | 24.852 | OpenStreetMap (Geofabrik-Auszug) | 5 | 18 | fertig | 
 | ✅ | 538 | Bad Oldesloe | 24.846 | OpenStreetMap (Geofabrik-Auszug) | 4 | 5 | fertig | 
 | ✅ | 539 | Schmallenberg | 24.711 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 540 | Varel | 24.704 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 541 | Eisenhüttenstadt | 24.703 | OpenStreetMap (Geofabrik-Auszug) | 27 | 40 | fertig | 
 | ✅ | 542 | Olpe | 24.695 | OpenStreetMap (Geofabrik-Auszug) | 8 | 22 | fertig | 
 | ✅ | 543 | Wandlitz | 24.503 | OpenStreetMap (Geofabrik-Auszug) | 3 | 6 | fertig | 
 | ✅ | 544 | Starnberg | 24.471 | OpenStreetMap (Geofabrik-Auszug) | 6 | 18 | fertig | 
 | ✅ | 545 | Freudenstadt | 24.464 | OpenStreetMap (Geofabrik-Auszug) | 18 | 29 | fertig | 
 | ✅ | 546 | Mosbach | 24.459 | OpenStreetMap (Geofabrik-Auszug) | 5 | 13 | fertig | 
 | ✅ | 547 | Plettenberg | 24.429 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 548 | Haren (Ems) | 24.365 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 549 | Übach-Palenberg | 24.277 | OpenStreetMap (Geofabrik-Auszug) | 4 | 15 | fertig | 
 | ✅ | 550 | Lennestadt | 24.238 | OpenStreetMap (Geofabrik-Auszug) | 5 | 10 | fertig | 
 | ✅ | 551 | Herzogenaurach | 24.237 | OpenStreetMap (Geofabrik-Auszug) | 7 | 10 | fertig | 
 | ✅ | 552 | Sprockhövel | 24.232 | OpenStreetMap (Geofabrik-Auszug) | 9 | 15 | fertig | 
 | ✅ | 553 | Leutkirch im Allgäu | 24.226 | OpenStreetMap (Geofabrik-Auszug) | 5 | 14 | fertig | 
 | ✅ | 554 | Köthen (Anhalt) | 24.110 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 555 | Husum | 24.090 | OpenStreetMap (Geofabrik-Auszug) | 7 | 12 | fertig | 
 | ✅ | 556 | Isernhagen | 24.074 | OpenStreetMap (Geofabrik-Auszug) | 3 | 18 | fertig | 
 | ✅ | 557 | Bad Mergentheim | 24.023 | OpenStreetMap (Geofabrik-Auszug) | 32 | 42 | fertig | 
 | ✅ | 558 | Westerstede | 23.938 | OpenStreetMap (Geofabrik-Auszug) | 3 | 6 | fertig | 
 | ✅ | 559 | Jüchen | 23.926 | OpenStreetMap (Geofabrik-Auszug) | 5 | 7 | fertig | 
 | ✅ | 560 | Nagold | 23.864 | OpenStreetMap (Geofabrik-Auszug) | 4 | 5 | fertig | 
 | ✅ | 561 | Döbeln | 23.819 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 562 | Ronnenberg | 23.814 | OpenStreetMap (Geofabrik-Auszug) | 7 | 9 | fertig | 
 | ✅ | 563 | Alfter | 23.719 | OpenStreetMap (Geofabrik-Auszug) | 51 | 67 | fertig | 
 | ✅ | 564 | Limbach-Oberfrohna | 23.673 | OpenStreetMap (Geofabrik-Auszug) | 9 | 11 | fertig | 
 | ✅ | 565 | Senden | 23.641 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 566 | Attendorn | 23.554 | OpenStreetMap (Geofabrik-Auszug) | 12 | 17 | fertig | 
 | ✅ | 567 | Neu Wulmstorf | 23.550 | OpenStreetMap (Geofabrik-Auszug) | 6 | 8 | fertig | 
 | ✅ | 568 | Kaltenkirchen | 23.502 | OpenStreetMap (Geofabrik-Auszug) | 24 | 74 | fertig | 
 | ✅ | 569 | Hann.Münden | 23.478 | OpenStreetMap (Geofabrik-Auszug) | 26 | 33 | fertig | 
 | ✅ | 570 | Senftenberg | 23.466 | OpenStreetMap (Geofabrik-Auszug) | 5 | 14 | fertig | 
 | ✅ | 571 | Sehnde | 23.431 | OpenStreetMap (Geofabrik-Auszug) | 2 | 6 | fertig | 
 | ✅ | 572 | Gersthofen | 23.427 | OpenStreetMap (Geofabrik-Auszug) | 13 | 15 | fertig | 
 | ✅ | 573 | Moormerland | 23.365 | OpenStreetMap (Geofabrik-Auszug) | 19 | 30 | fertig | 
 | ✅ | 574 | Gelnhausen | 23.290 | OpenStreetMap (Geofabrik-Auszug) | 49 | 83 | fertig | 
 | ✅ | 575 | Weilheim i.OB | 23.279 | OpenStreetMap (Geofabrik-Auszug) | 2 | 5 | fertig | 
 | ✅ | 576 | Warburg | 23.252 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 577 | Bad Kissingen | 23.223 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 578 | Staßfurt | 23.181 | OpenStreetMap (Geofabrik-Auszug) | 6 | 9 | fertig | 
 | ✅ | 579 | Metzingen | 23.178 | OpenStreetMap (Geofabrik-Auszug) | 42 | 65 | fertig | 
 | ✅ | 580 | Riedstadt | 23.146 | OpenStreetMap (Geofabrik-Auszug) | 4 | 5 | fertig | 
 | ✅ | 581 | Quedlinburg | 23.139 | OpenStreetMap (Geofabrik-Auszug) | 23 | 35 | fertig | 
 | ✅ | 582 | Rotenburg (Wümme) | 23.117 | OpenStreetMap (Geofabrik-Auszug) | 4 | 8 | fertig | 
 | ✅ | 583 | Bad Soden am Taunus | 23.103 | OpenStreetMap (Geofabrik-Auszug) | 5 | 12 | fertig | 
 | ✅ | 584 | Vreden | 23.099 | OpenStreetMap (Geofabrik-Auszug) | 7 | 12 | fertig | 
 | ✅ | 585 | Netphen | 23.080 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 586 | Dillenburg | 22.974 | OpenStreetMap (Geofabrik-Auszug) | 7 | 9 | fertig | 
 | ✅ | 587 | Salzwedel | 22.964 | OpenStreetMap (Geofabrik-Auszug) | 4 | 28 | fertig | 
 | ✅ | 588 | Kitzingen | 22.936 | OpenStreetMap (Geofabrik-Auszug) | 31 | 33 | fertig | 
 | ✅ | 589 | Neusäß | 22.904 | OpenStreetMap (Geofabrik-Auszug) | 46 | 61 | fertig | 
 | ✅ | 590 | Korbach | 22.901 | OpenStreetMap (Geofabrik-Auszug) | 45 | 67 | fertig | 
 | ✅ | 591 | Rastede | 22.896 | OpenStreetMap (Geofabrik-Auszug) | 7 | 11 | fertig | 
 | ✅ | 592 | Haar | 22.878 | OpenStreetMap (Geofabrik-Auszug) | 29 | 41 | fertig | 
 | ✅ | 593 | Wertheim | 22.874 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 594 | Sonneberg | 22.843 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 595 | Laupheim | 22.839 | OpenStreetMap (Geofabrik-Auszug) | 9 | 15 | fertig | 
 | ✅ | 596 | Ottobrunn | 22.829 | OpenStreetMap (Geofabrik-Auszug) | 21 | 36 | fertig | 
 | ✅ | 597 | Apolda | 22.787 | OpenStreetMap (Geofabrik-Auszug) | 3 | 9 | fertig | 
 | ✅ | 598 | Herdecke | 22.772 | OpenStreetMap (Geofabrik-Auszug) | 17 | 33 | fertig | 
 | ✅ | 599 | Überlingen | 22.735 | OpenStreetMap (Geofabrik-Auszug) | 11 | 16 | fertig | 
 | ✅ | 600 | Bad Rappenau | 22.703 | OpenStreetMap (Geofabrik-Auszug) | 46 | 86 | fertig | 
 | ✅ | 602 | Ditzingen | 22.666 | OpenStreetMap (Geofabrik-Auszug) | 7 | 8 | fertig | 
 | ✅ | 603 | Eppingen | 22.666 | OpenStreetMap (Geofabrik-Auszug) | 4 | 8 | fertig | 
 | ✅ | 604 | Stadthagen | 22.638 | OpenStreetMap (Geofabrik-Auszug) | 3 | 5 | fertig | 
 | ✅ | 606 | Wallenhorst | 22.614 | OpenStreetMap (Geofabrik-Auszug) | 4 | 8 | fertig | 
 | ✅ | 607 | Karben | 22.600 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 608 | Burg | 22.585 | OpenStreetMap (Geofabrik-Auszug) | 53 | 63 | fertig | 
 | ✅ | 609 | Bad Salzungen | 22.557 | OpenStreetMap (Geofabrik-Auszug) | 6 | 6 | fertig | 
 | ✅ | 610 | Lengerich | 22.557 | OpenStreetMap (Geofabrik-Auszug) | 3 | 5 | fertig | 
 | ✅ | 611 | Quickborn | 22.521 | OpenStreetMap (Geofabrik-Auszug) | 14 | 18 | fertig | 
 | ✅ | 612 | Soltau | 22.511 | OpenStreetMap (Geofabrik-Auszug) | 10 | 13 | fertig | 
 | ✅ | 613 | Eisleben | 22.505 | OpenStreetMap (Geofabrik-Auszug) | 10 | 14 | fertig | 
 | ✅ | 614 | Mühldorf a.Inn | 22.503 | OpenStreetMap (Geofabrik-Auszug) | 11 | 25 | fertig | 
 | ✅ | 615 | Waghäusel | 22.466 | amtlich (regional: trk) | 3 | 6 | fertig | 
 | ✅ | 616 | Büdingen | 22.411 | OpenStreetMap (Geofabrik-Auszug) | 8 | 13 | fertig | 
 | ✅ | 617 | Eschborn | 22.403 | OpenStreetMap (Geofabrik-Auszug) | 7 | 14 | fertig | 
 | ✅ | 618 | Eislingen/Fils | 22.325 | OpenStreetMap (Geofabrik-Auszug) | 2 | 5 | fertig | 
 | ✅ | 619 | Aichach | 22.015 | OpenStreetMap (Geofabrik-Auszug) | 27 | 35 | fertig | 
 | ✅ | 620 | Heide | 22.002 | OpenStreetMap (Geofabrik-Auszug) | 16 | 22 | fertig | 
 | ✅ | 621 | Rees | 21.913 | OpenStreetMap (Geofabrik-Auszug) | 11 | 15 | fertig | 
 | ✅ | 622 | Gauting | 21.860 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 623 | Gardelegen | 21.822 | OpenStreetMap (Geofabrik-Auszug) | 18 | 23 | fertig | 
 | ✅ | 624 | Donaueschingen | 21.790 | OpenStreetMap (Geofabrik-Auszug) | 4 | 5 | fertig | 
 | ✅ | 625 | Zülpich | 21.780 | OpenStreetMap (Geofabrik-Auszug) | 21 | 29 | fertig | 
 | ✅ | 626 | Schwetzingen | 21.767 | OpenStreetMap (Geofabrik-Auszug) | 20 | 29 | fertig | 
 | ✅ | 627 | Bad Krozingen | 21.755 | OpenStreetMap (Geofabrik-Auszug) | 5 | 6 | fertig | 
 | ✅ | 628 | Mössingen | 21.751 | OpenStreetMap (Geofabrik-Auszug) | 5 | 8 | fertig | 
 | ✅ | 629 | Sonthofen | 21.734 | OpenStreetMap (Geofabrik-Auszug) | 4 | 7 | fertig | 
 | ✅ | 630 | Germersheim | 21.715 | amtlich (regional: trk) | 6 | 14 | fertig | 
 | ✅ | 631 | Hockenheim | 21.623 | OpenStreetMap (Geofabrik-Auszug) | 22 | 32 | fertig | 
 | ✅ | 632 | Lindlar | 21.615 | OpenStreetMap (Geofabrik-Auszug) | 10 | 15 | fertig | 
 | ✅ | 633 | Wipperfürth | 21.604 | OpenStreetMap (Geofabrik-Auszug) | 21 | 33 | fertig | 
 | ✅ | 634 | Osterode am Harz | 21.598 | OpenStreetMap (Geofabrik-Auszug) | 50 | 66 | fertig | 
 | ✅ | 635 | Büren | 21.593 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 636 | Radevormwald | 21.565 | OpenStreetMap (Geofabrik-Auszug) | 30 | 43 | fertig | 
 | ✅ | 637 | Eckernförde | 21.563 | OpenStreetMap (Geofabrik-Auszug) | 23 | 31 | fertig | 
 | ✅ | 638 | Dillingen/Saar | 21.529 | OpenStreetMap (Geofabrik-Auszug) | 8 | 13 | fertig | 
 | ✅ | 639 | Versmold | 21.513 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 640 | Waldkirch | 21.510 | OpenStreetMap (Geofabrik-Auszug) | 23 | 33 | fertig | 
 | ✅ | 642 | Glauchau | 21.442 | OpenStreetMap (Geofabrik-Auszug) | 4 | 5 | fertig | 
 | ✅ | 643 | Stadtallendorf | 21.425 | OpenStreetMap (Geofabrik-Auszug) | 2 | 5 | fertig | 
 | ✅ | 644 | Elsdorf | 21.424 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 645 | Günzburg | 21.423 | OpenStreetMap (Geofabrik-Auszug) | 34 | 41 | fertig | 
 | ✅ | 646 | Zossen | 21.412 | OpenStreetMap (Geofabrik-Auszug) | 134 | 159 | fertig | 
 | ✅ | 647 | Karlsfeld | 21.403 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 648 | Halle (Westf.) | 21.393 | OpenStreetMap (Geofabrik-Auszug) | 25 | 34 | fertig | 
 | ✅ | 649 | Schifferstadt | 21.387 | OpenStreetMap (Geofabrik-Auszug) | 10 | 21 | fertig | 
 | ✅ | 650 | Flörsheim am Main | 21.344 | OpenStreetMap (Geofabrik-Auszug) | 7 | 9 | fertig | 
 | ✅ | 651 | Seligenstadt | 21.298 | OpenStreetMap (Geofabrik-Auszug) | 4 | 15 | fertig | 
 | ✅ | 652 | Rheinstetten | 21.267 | amtlich (regional: trk) | 17 | 100 | fertig | 
 | ✅ | 653 | Groß-Umstadt | 21.245 | OpenStreetMap (Geofabrik-Auszug) | 4 | 6 | fertig | 
 | ✅ | 654 | Xanten | 21.179 | OpenStreetMap (Geofabrik-Auszug) | 9 | 19 | fertig | 
 | ✅ | 655 | Wildeshausen | 21.155 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 656 | Panketal | 21.153 | OpenStreetMap (Geofabrik-Auszug) | 3 | 5 | fertig | 
 | ✅ | 657 | Spremberg | 21.140 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 658 | Westoverledingen | 21.127 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 659 | Zerbst/Anhalt | 21.124 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 660 | Neufahrn b.Freising | 21.061 | OpenStreetMap (Geofabrik-Auszug) | 6 | 11 | fertig | 
 | ✅ | 661 | Luckenwalde | 21.010 | OpenStreetMap (Geofabrik-Auszug) | 5 | 5 | fertig | 
 | ✅ | 662 | Schortens | 20.995 | OpenStreetMap (Geofabrik-Auszug) | 9 | 9 | fertig | 
 | ✅ | 663 | Stadtlohn | 20.946 | OpenStreetMap (Geofabrik-Auszug) | 17 | 20 | fertig | 
 | ✅ | 664 | Geseke | 20.930 | OpenStreetMap (Geofabrik-Auszug) | 8 | 11 | fertig | 
 | ✅ | 665 | Sondershausen | 20.910 | OpenStreetMap (Geofabrik-Auszug) | 4 | 11 | fertig | 
 | ✅ | 666 | Traunstein | 20.877 | OpenStreetMap (Geofabrik-Auszug) | 11 | 32 | fertig | 
 | ✅ | 667 | Puchheim | 20.858 | OpenStreetMap (Geofabrik-Auszug) | 4 | 8 | fertig | 
 | ✅ | 668 | Senden | 20.844 | OpenStreetMap (Geofabrik-Auszug) | 43 | 60 | fertig | 
 | ✅ | 669 | Bad Waldsee | 20.838 | OpenStreetMap (Geofabrik-Auszug) | 11 | 31 | fertig | 
 | ✅ | 670 | Dingolfing | 20.749 | OpenStreetMap (Geofabrik-Auszug) | 11 | 12 | fertig | 
 | ✅ | 671 | Wülfrath | 20.731 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 672 | Enger | 20.688 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 673 | Schramberg | 20.610 | OpenStreetMap (Geofabrik-Auszug) | 8 | 11 | fertig | 
 | ✅ | 675 | Werdau | 20.520 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 676 | Bruchköbel | 20.509 | OpenStreetMap (Geofabrik-Auszug) | 20 | 28 | fertig | 
 | ✅ | 677 | Fröndenberg/Ruhr | 20.504 | OpenStreetMap (Geofabrik-Auszug) | 23 | 28 | fertig | 
 | ✅ | 678 | Lichtenfels | 20.488 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 679 | Coswig | 20.479 | OpenStreetMap (Geofabrik-Auszug) | 14 | 24 | fertig | 
 | ✅ | 680 | Wachtberg | 20.471 | OpenStreetMap (Geofabrik-Auszug) | 27 | 31 | fertig | 
 | ✅ | 681 | Herborn | 20.421 | OpenStreetMap (Geofabrik-Auszug) | 30 | 70 | fertig | 
 | ✅ | 682 | Haßloch | 20.396 | OpenStreetMap (Geofabrik-Auszug) | 3 | 5 | fertig | 
 | ✅ | 683 | Ochtrup | 20.394 | OpenStreetMap (Geofabrik-Auszug) | 22 | 27 | fertig | 
 | ✅ | 684 | Burgwedel | 20.379 | OpenStreetMap (Geofabrik-Auszug) | 5 | 7 | fertig | 
 | ✅ | 685 | Traunreut | 20.379 | OpenStreetMap (Geofabrik-Auszug) | 5 | 7 | fertig | 
 | ✅ | 686 | Duderstadt | 20.375 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 687 | Nördlingen | 20.352 | OpenStreetMap (Geofabrik-Auszug) | 6 | 10 | fertig | 
 | ✅ | 688 | Schopfheim | 20.332 | OpenStreetMap (Geofabrik-Auszug) | 6 | 8 | fertig | 
 | ✅ | 689 | Steinhagen | 20.302 | OpenStreetMap (Geofabrik-Auszug) | 13 | 16 | fertig | 
 | ✅ | 690 | Neunkirchen-Seelscheid | 20.283 | OpenStreetMap (Geofabrik-Auszug) | 10 | 12 | fertig | 
 | ✅ | 691 | Waren (Müritz) | 20.260 | OpenStreetMap (Geofabrik-Auszug) | 5 | 9 | fertig | 
 | ✅ | 693 | Blieskastel | 20.197 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 694 | Neustrelitz | 20.191 | OpenStreetMap (Geofabrik-Auszug) | 11 | 25 | fertig | 
 | ✅ | 695 | Hörstel | 20.166 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 696 | Lilienthal | 20.166 | OpenStreetMap (Geofabrik-Auszug) | 7 | 8 | fertig | 
 | ✅ | 697 | Borna | 20.131 | OpenStreetMap (Geofabrik-Auszug) | 7 | 8 | fertig | 
 | ✅ | 698 | Nidderau | 20.119 | OpenStreetMap (Geofabrik-Auszug) | 10 | 18 | fertig | 
 | ✅ | 699 | Müllheim im Markgräflerland | 20.097 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 700 | Telgte | 20.069 | OpenStreetMap (Geofabrik-Auszug) | 6 | 9 | fertig | 
 | ✅ | 701 | Uetze | 20.064 | OpenStreetMap (Geofabrik-Auszug) | 11 | 21 | fertig | 
 | ✅ | 702 | Wilnsdorf | 20.039 | OpenStreetMap (Geofabrik-Auszug) | 5 | 10 | fertig | 
 | ✅ | 703 | Wittmund | 20.037 | OpenStreetMap (Geofabrik-Auszug) | 10 | 16 | fertig | 
 | ✅ | 704 | Kürten | 20.033 | OpenStreetMap (Geofabrik-Auszug) | 11 | 17 | fertig | 
 | ✅ | 705 | Meinerzhagen | 20.019 | OpenStreetMap (Geofabrik-Auszug) | 10 | 32 | fertig | 
 | ✅ | 706 | Moosburg a.d.Isar | 20.012 | OpenStreetMap (Geofabrik-Auszug) | 16 | 20 | fertig | 
 | ✅ | 707 | Torgau | 19.992 | OpenStreetMap (Geofabrik-Auszug) | 4 | 4 | fertig | 
 | ✅ | 708 | Donauwörth | 19.990 | OpenStreetMap (Geofabrik-Auszug) | 15 | 23 | fertig | 
 | ✅ | 709 | Giengen an der Brenz | 19.967 | OpenStreetMap (Geofabrik-Auszug) | 4 | 22 | fertig | 
 | ✅ | 710 | Leinefelde-Worbis | 19.957 | OpenStreetMap (Geofabrik-Auszug) | 15 | 21 | fertig | 
 | ✅ | 711 | Bad Schwartau | 19.954 | OpenStreetMap (Geofabrik-Auszug) | 15 | 22 | fertig | 
 | ✅ | 712 | Schwanewede | 19.937 | OpenStreetMap (Geofabrik-Auszug) | 7 | 9 | fertig | 
 | ✅ | 713 | Schenefeld | 19.909 | OpenStreetMap (Geofabrik-Auszug) | 4 | 4 | fertig | 
 | ✅ | 714 | Bad Friedrichshall | 19.853 | OpenStreetMap (Geofabrik-Auszug) | 11 | 19 | fertig | 
 | ✅ | 715 | Oberkirch | 19.847 | OpenStreetMap (Geofabrik-Auszug) | 14 | 19 | fertig | 
 | ✅ | 716 | Ennigerloh | 19.841 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 717 | Bad Tölz | 19.826 | OpenStreetMap (Geofabrik-Auszug) | 8 | 23 | fertig | 
 | ✅ | 718 | Hechingen | 19.807 | OpenStreetMap (Geofabrik-Auszug) | 21 | 27 | fertig | 
 | ✅ | 719 | Dillingen a.d.Donau | 19.806 | OpenStreetMap (Geofabrik-Auszug) | 4 | 4 | fertig | 
 | ✅ | 720 | Reichenbach im Vogtland | 19.797 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 721 | Waldbröl | 19.795 | OpenStreetMap (Geofabrik-Auszug) | 7 | 11 | fertig | 
 | ✅ | 722 | Greiz | 19.766 | OpenStreetMap (Geofabrik-Auszug) | 5 | 8 | fertig | 
 | ✅ | 723 | Pfullingen | 19.759 | OpenStreetMap (Geofabrik-Auszug) | 19 | 21 | fertig | 
 | ✅ | 724 | Engelskirchen | 19.737 | OpenStreetMap (Geofabrik-Auszug) | 9 | 15 | fertig | 
 | ✅ | 725 | Bad Pyrmont | 19.722 | OpenStreetMap (Geofabrik-Auszug) | 6 | 14 | fertig | 
 | ✅ | 726 | Mayen | 19.713 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 728 | Nauen | 19.679 | OpenStreetMap (Geofabrik-Auszug) | 5 | 9 | fertig | 
 | ✅ | 729 | Rhede | 19.674 | OpenStreetMap (Geofabrik-Auszug) | 9 | 9 | fertig | 
 | ✅ | 730 | Hiddenhausen | 19.669 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 731 | Wolfratshausen | 19.658 | OpenStreetMap (Geofabrik-Auszug) | 4 | 5 | fertig | 
 | ✅ | 732 | Korntal-Münchingen | 19.654 | OpenStreetMap (Geofabrik-Auszug) | 5 | 6 | fertig | 
 | ✅ | 733 | Mölln | 19.627 | OpenStreetMap (Geofabrik-Auszug) | 6 | 7 | fertig | 
 | ✅ | 734 | Burghausen | 19.558 | OpenStreetMap (Geofabrik-Auszug) | 8 | 13 | fertig | 
 | ✅ | 735 | Marsberg | 19.555 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 736 | Windeck | 19.555 | OpenStreetMap (Geofabrik-Auszug) | 15 | 22 | fertig | 
 | ✅ | 737 | Bad Harzburg | 19.489 | OpenStreetMap (Geofabrik-Auszug) | 8 | 15 | fertig | 
 | ✅ | 738 | Alzey | 19.468 | OpenStreetMap (Geofabrik-Auszug) | 10 | 13 | fertig | 
 | ✅ | 739 | Lebach | 19.468 | OpenStreetMap (Geofabrik-Auszug) | 10 | 14 | fertig | 
 | ✅ | 740 | Wenden | 19.415 | OpenStreetMap (Geofabrik-Auszug) | 3 | 6 | fertig | 
 | ✅ | 741 | Sarstedt | 19.405 | OpenStreetMap (Geofabrik-Auszug) | 10 | 19 | fertig | 
 | ✅ | 742 | Sulzbach-Rosenberg | 19.379 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 743 | Gröbenzell | 19.362 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 744 | Weil der Stadt | 19.353 | OpenStreetMap (Geofabrik-Auszug) | 26 | 44 | fertig | 
 | ✅ | 745 | Schmalkalden | 19.323 | OpenStreetMap (Geofabrik-Auszug) | 6 | 14 | fertig | 
 | ✅ | 746 | Heusenstamm | 19.312 | OpenStreetMap (Geofabrik-Auszug) | 26 | 27 | fertig | 
 | ✅ | 747 | Kleinmachnow | 19.274 | OpenStreetMap (Geofabrik-Auszug) | 7 | 17 | fertig | 
 | ✅ | 748 | Burscheid | 19.272 | OpenStreetMap (Geofabrik-Auszug) | 16 | 18 | fertig | 
 | ✅ | 749 | Neuenhagen bei Berlin | 19.225 | OpenStreetMap (Geofabrik-Auszug) | 14 | 20 | fertig | 
 | ✅ | 751 | Eitorf | 19.172 | OpenStreetMap (Geofabrik-Auszug) | 23 | 29 | fertig | 
 | ✅ | 752 | Bad Dürkheim | 19.159 | OpenStreetMap (Geofabrik-Auszug) | 7 | 9 | fertig | 
 | ✅ | 753 | Schönefeld | 19.154 | OpenStreetMap (Geofabrik-Auszug) | 37 | 68 | fertig | 
 | ✅ | 754 | Haldensleben | 19.121 | OpenStreetMap (Geofabrik-Auszug) | 28 | 41 | fertig | 
 | ✅ | 755 | Kolbermoor | 19.094 | OpenStreetMap (Geofabrik-Auszug) | 8 | 14 | fertig | 
 | ✅ | 756 | Bad Driburg | 19.080 | OpenStreetMap (Geofabrik-Auszug) | 3 | 6 | fertig | 
 | ✅ | 757 | Gilching | 19.062 | OpenStreetMap (Geofabrik-Auszug) | 13 | 14 | fertig | 
 | ✅ | 758 | Wittlich | 19.049 | OpenStreetMap (Geofabrik-Auszug) | 7 | 22 | fertig | 
 | ✅ | 759 | Schneverdingen | 19.016 | OpenStreetMap (Geofabrik-Auszug) | 10 | 19 | fertig | 
 | ✅ | 760 | Weilerswist | 18.980 | OpenStreetMap (Geofabrik-Auszug) | 34 | 41 | fertig | 
 | ✅ | 761 | Blankenburg (Harz) | 18.970 | OpenStreetMap (Geofabrik-Auszug) | 10 | 21 | fertig | 
 | ✅ | 762 | Hemmingen | 18.932 | OpenStreetMap (Geofabrik-Auszug) | 9 | 22 | fertig | 
 | ✅ | 763 | Prenzlau | 18.928 | OpenStreetMap (Geofabrik-Auszug) | 5 | 6 | fertig | 
 | ✅ | 764 | Holzminden | 18.921 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 766 | Haiger | 18.888 | OpenStreetMap (Geofabrik-Auszug) | 12 | 33 | fertig | 
 | ✅ | 767 | Aue-Bad Schlema | 18.868 | OpenStreetMap (Geofabrik-Auszug) | 7 | 16 | fertig | 
 | ✅ | 768 | Oschersleben (Bode) | 18.859 | OpenStreetMap (Geofabrik-Auszug) | 35 | 142 | fertig | 
 | ✅ | 770 | Schwalmtal | 18.826 | OpenStreetMap (Geofabrik-Auszug) | 62 | 72 | fertig | 
 | ✅ | 771 | Annaberg-Buchholz | 18.815 | OpenStreetMap (Geofabrik-Auszug) | 7 | 15 | fertig | 
 | ✅ | 772 | Hohe Börde | 18.747 | OpenStreetMap (Geofabrik-Auszug) | 24 | 28 | fertig | 
 | ✅ | 773 | Eschwege | 18.743 | OpenStreetMap (Geofabrik-Auszug) | 18 | 22 | fertig | 
 | ✅ | 774 | Lahnstein | 18.719 | OpenStreetMap (Geofabrik-Auszug) | 9 | 14 | fertig | 
 | ✅ | 775 | Reichshof | 18.688 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 776 | Radeberg | 18.683 | OpenStreetMap (Geofabrik-Auszug) | 11 | 37 | fertig | 
 | ✅ | 778 | Kronberg im Taunus | 18.671 | OpenStreetMap (Geofabrik-Auszug) | 5 | 13 | fertig | 
 | ✅ | 779 | Seesen | 18.657 | OpenStreetMap (Geofabrik-Auszug) | 3 | 5 | fertig | 
 | ✅ | 780 | Sachsenheim | 18.638 | OpenStreetMap (Geofabrik-Auszug) | 7 | 13 | fertig | 
 | ✅ | 781 | Bergneustadt | 18.628 | OpenStreetMap (Geofabrik-Auszug) | 8 | 9 | fertig | 
 | ✅ | 782 | Marktoberdorf | 18.617 | OpenStreetMap (Geofabrik-Auszug) | 6 | 9 | fertig | 
 | ✅ | 783 | Swisttal | 18.580 | OpenStreetMap (Geofabrik-Auszug) | 36 | 56 | fertig | 
 | ✅ | 784 | Hessisch Oldendorf | 18.567 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 785 | Renningen | 18.567 | OpenStreetMap (Geofabrik-Auszug) | 30 | 81 | fertig | 
 | ✅ | 787 | Sömmerda | 18.503 | OpenStreetMap (Geofabrik-Auszug) | 23 | 52 | fertig | 
 | ✅ | 788 | Bad Aibling | 18.497 | OpenStreetMap (Geofabrik-Auszug) | 57 | 89 | fertig | 
 | ✅ | 789 | Illertissen | 18.433 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 790 | Heusweiler | 18.427 | OpenStreetMap (Geofabrik-Auszug) | 8 | 14 | fertig | 
 | ✅ | 791 | Hochheim am Main | 18.422 | OpenStreetMap (Geofabrik-Auszug) | 5 | 5 | fertig | 
 | ✅ | 792 | Schwalmstadt | 18.420 | OpenStreetMap (Geofabrik-Auszug) | 4 | 6 | fertig | 
 | ✅ | 794 | Bad Segeberg | 18.399 | OpenStreetMap (Geofabrik-Auszug) | 9 | 10 | fertig | 
 | ✅ | 795 | Gerlingen | 18.392 | OpenStreetMap (Geofabrik-Auszug) | 35 | 275 | fertig | 
 | ✅ | 796 | Wörth am Rhein | 18.387 | OpenStreetMap (Geofabrik-Auszug) | 5 | 9 | fertig | 
 | ✅ | 797 | Südbrookmerland | 18.368 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 798 | Püttlingen | 18.361 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 799 | Weißenburg i.Bay. | 18.345 | OpenStreetMap (Geofabrik-Auszug) | 7 | 9 | fertig | 
 | ✅ | 800 | Vlotho | 18.335 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 801 | Rhauderfehn | 18.310 | OpenStreetMap (Geofabrik-Auszug) | 5 | 6 | fertig | 
 | ✅ | 802 | Bad Münstereifel | 18.297 | OpenStreetMap (Geofabrik-Auszug) | 16 | 23 | fertig | 
 | ✅ | 803 | Bad Reichenhall | 18.288 | OpenStreetMap (Geofabrik-Auszug) | 5 | 8 | fertig | 
 | ✅ | 804 | Crimmitschau | 18.272 | OpenStreetMap (Geofabrik-Auszug) | 7 | 23 | fertig | 
 | ✅ | 805 | Heilbad Heiligenstadt | 18.230 | OpenStreetMap (Geofabrik-Auszug) | 20 | 27 | fertig | 
 | ✅ | 806 | Buchen (Odenwald) | 18.226 | OpenStreetMap (Geofabrik-Auszug) | 8 | 31 | fertig | 
 | ✅ | 807 | Hoppegarten | 18.218 | OpenStreetMap (Geofabrik-Auszug) | 18 | 25 | fertig | 
 | ✅ | 808 | Großenhain | 18.183 | OpenStreetMap (Geofabrik-Auszug) | 12 | 23 | fertig | 
 | ✅ | 809 | Pfinztal | 18.178 | OpenStreetMap (Geofabrik-Auszug) | 10 | 14 | fertig | 
 | ✅ | 810 | Kreuzau | 18.149 | OpenStreetMap (Geofabrik-Auszug) | 7 | 10 | fertig | 
 | ✅ | 811 | Taufkirchen | 18.140 | OpenStreetMap (Geofabrik-Auszug) | 15 | 26 | fertig | 
 | ✅ | 812 | Vechelde | 18.138 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 813 | Konz | 18.121 | OpenStreetMap (Geofabrik-Auszug) | 7 | 19 | fertig | 
 | ✅ | 814 | Schwalbach | 18.108 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 815 | Ismaning | 18.093 | OpenStreetMap (Geofabrik-Auszug) | 7 | 24 | fertig | 
 | ✅ | 816 | Vilshofen an der Donau | 18.084 | OpenStreetMap (Geofabrik-Auszug) | 6 | 10 | fertig | 
 | ✅ | 817 | Halstenbek | 18.082 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 818 | Alzenau | 18.034 | OpenStreetMap (Geofabrik-Auszug) | 10 | 15 | fertig | 
 | ✅ | 819 | Wadgassen | 18.025 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 820 | Alfeld (Leine) | 17.956 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 821 | Bobingen | 17.905 | OpenStreetMap (Geofabrik-Auszug) | 31 | 48 | fertig | 
 | ✅ | 822 | Parchim | 17.893 | OpenStreetMap (Geofabrik-Auszug) | 8 | 19 | fertig | 
 | ✅ | 823 | Bad Saulgau | 17.889 | OpenStreetMap (Geofabrik-Auszug) | 9 | 13 | fertig | 
 | ✅ | 824 | Schrobenhausen | 17.815 | OpenStreetMap (Geofabrik-Auszug) | 6 | 8 | fertig | 
 | ✅ | 826 | Bexbach | 17.793 | OpenStreetMap (Geofabrik-Auszug) | 3 | 7 | fertig | 
 | ✅ | 827 | Bad Säckingen | 17.767 | OpenStreetMap (Geofabrik-Auszug) | 25 | 30 | fertig | 
 | ✅ | 828 | Bönen | 17.734 | OpenStreetMap (Geofabrik-Auszug) | 27 | 40 | fertig | 
 | ✅ | 830 | Babenhausen | 17.695 | OpenStreetMap (Geofabrik-Auszug) | 12 | 14 | fertig | 
 | ✅ | 831 | Pohlheim | 17.677 | OpenStreetMap (Geofabrik-Auszug) | 3 | 5 | fertig | 
 | ✅ | 832 | Vellmar | 17.663 | OpenStreetMap (Geofabrik-Auszug) | 10 | 12 | fertig | 
 | ✅ | 833 | Garching b.München | 17.656 | OpenStreetMap (Geofabrik-Auszug) | 50 | 84 | fertig | 
 | ✅ | 834 | Diepholz | 17.648 | OpenStreetMap (Geofabrik-Auszug) | 2 | 5 | fertig | 
 | ✅ | 835 | Oberasbach | 17.647 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 836 | Stockach | 17.646 | OpenStreetMap (Geofabrik-Auszug) | 5 | 11 | fertig | 
 | ✅ | 837 | Frankenberg (Eder) | 17.635 | OpenStreetMap (Geofabrik-Auszug) | 10 | 31 | fertig | 
 | ✅ | 838 | Freilassing | 17.619 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 840 | Remagen | 17.603 | OpenStreetMap (Geofabrik-Auszug) | 13 | 21 | fertig | 
 | ✅ | 841 | Holzwickede | 17.596 | OpenStreetMap (Geofabrik-Auszug) | 7 | 9 | fertig | 
 | ✅ | 842 | Nümbrecht | 17.580 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 843 | Damme | 17.508 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 844 | Trossingen | 17.489 | OpenStreetMap (Geofabrik-Auszug) | 6 | 7 | fertig | 
 | ✅ | 845 | Cham | 17.433 | OpenStreetMap (Geofabrik-Auszug) | 6 | 9 | fertig | 
 | ✅ | 846 | Gescher | 17.433 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 847 | Bad Wildungen | 17.364 | OpenStreetMap (Geofabrik-Auszug) | 10 | 18 | fertig | 
 | ✅ | 848 | Freudenberg | 17.355 | OpenStreetMap (Geofabrik-Auszug) | 8 | 17 | fertig | 
 | ✅ | 849 | Horn-Bad Meinberg | 17.320 | OpenStreetMap (Geofabrik-Auszug) | 77 | 80 | fertig | 
 | ✅ | 850 | Auerbach/Vogtl. | 17.314 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 851 | Eutin | 17.275 | OpenStreetMap (Geofabrik-Auszug) | 7 | 9 | fertig | 
 | ✅ | 852 | Bad Münder am Deister | 17.261 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 853 | Sinzig | 17.256 | OpenStreetMap (Geofabrik-Auszug) | 14 | 24 | fertig | 
 | ✅ | 854 | Bad Lippspringe | 17.252 | OpenStreetMap (Geofabrik-Auszug) | 15 | 26 | fertig | 
 | ✅ | 855 | Oerlinghausen | 17.233 | OpenStreetMap (Geofabrik-Auszug) | 5 | 11 | fertig | 
 | ✅ | 856 | Leopoldshöhe | 17.226 | OpenStreetMap (Geofabrik-Auszug) | 9 | 12 | fertig | 
 | ✅ | 857 | Forst (Lausitz) | 17.155 | OpenStreetMap (Geofabrik-Auszug) | 13 | 19 | fertig | 
 | ✅ | 858 | Marktredwitz | 17.121 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 859 | Kelheim | 17.066 | OpenStreetMap (Geofabrik-Auszug) | 6 | 6 | fertig | 
 | ✅ | 860 | Nidda | 17.060 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 861 | Wittenberge | 17.058 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 862 | Eltville am Rhein | 17.031 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 863 | Penzberg | 17.028 | OpenStreetMap (Geofabrik-Auszug) | 16 | 27 | fertig | 
 | ✅ | 864 | Finnentrop | 17.022 | OpenStreetMap (Geofabrik-Auszug) | 14 | 30 | fertig | 
 | ✅ | 865 | Schwarzenbek | 16.999 | OpenStreetMap (Geofabrik-Auszug) | 4 | 5 | fertig | 
 | ✅ | 866 | Schmelz | 16.981 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 867 | Hünfeld | 16.955 | OpenStreetMap (Geofabrik-Auszug) | 37 | 59 | fertig | 
 | ✅ | 868 | Bad Wörishofen | 16.933 | OpenStreetMap (Geofabrik-Auszug) | 4 | 6 | fertig | 
 | ✅ | 869 | Kamenz | 16.918 | OpenStreetMap (Geofabrik-Auszug) | 11 | 18 | fertig | 
 | ✅ | 870 | Künzell | 16.903 | OpenStreetMap (Geofabrik-Auszug) | 6 | 12 | fertig | 
 | ✅ | 871 | Sigmaringen | 16.884 | OpenStreetMap (Geofabrik-Auszug) | 14 | 19 | fertig | 
 | ✅ | 872 | Hövelhof | 16.809 | OpenStreetMap (Geofabrik-Auszug) | 9 | 21 | fertig | 
 | ✅ | 873 | Bad Bentheim | 16.798 | OpenStreetMap (Geofabrik-Auszug) | 8 | 12 | fertig | 
 | ✅ | 874 | Eggenstein-Leopoldshafen | 16.798 | OpenStreetMap (Geofabrik-Auszug) | 11 | 20 | fertig | 
 | ✅ | 875 | Thale | 16.788 | OpenStreetMap (Geofabrik-Auszug) | 13 | 24 | fertig | 
 | ✅ | 876 | Brackenheim | 16.774 | OpenStreetMap (Geofabrik-Auszug) | 7 | 10 | fertig | 
 | ✅ | 877 | Wurster Nordseeküste | 16.769 | OpenStreetMap (Geofabrik-Auszug) | 5 | 9 | fertig | 
 | ✅ | 878 | Bruckmühl | 16.735 | OpenStreetMap (Geofabrik-Auszug) | 30 | 40 | fertig | 
 | ✅ | 879 | Bad Langensalza | 16.717 | OpenStreetMap (Geofabrik-Auszug) | 5 | 8 | fertig | 
 | ✅ | 880 | Heidenau | 16.686 | OpenStreetMap (Geofabrik-Auszug) | 4 | 10 | fertig | 
 | ✅ | 881 | Königstein im Taunus | 16.680 | OpenStreetMap (Geofabrik-Auszug) | 14 | 45 | fertig | 
 | ✅ | 882 | Gunzenhausen | 16.665 | OpenStreetMap (Geofabrik-Auszug) | 5 | 8 | fertig | 
 | ✅ | 883 | Eppelborn | 16.661 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 884 | Kelsterbach | 16.622 | OpenStreetMap (Geofabrik-Auszug) | 5 | 8 | fertig | 
 | ✅ | 885 | Altena | 16.621 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 886 | Kronach | 16.616 | OpenStreetMap (Geofabrik-Auszug) | 10 | 13 | fertig | 
 | ✅ | 887 | Simmerath | 16.612 | OpenStreetMap (Geofabrik-Auszug) | 8 | 11 | fertig | 
 | ✅ | 888 | Bassum | 16.604 | OpenStreetMap (Geofabrik-Auszug) | 7 | 12 | fertig | 
 | ✅ | 889 | Poing | 16.585 | OpenStreetMap (Geofabrik-Auszug) | 8 | 19 | fertig | 
 | ✅ | 890 | Blaustein | 16.581 | OpenStreetMap (Geofabrik-Auszug) | 4 | 7 | fertig | 
 | ✅ | 891 | Eilenburg | 16.539 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 892 | Losheim am See | 16.535 | OpenStreetMap (Geofabrik-Auszug) | 2 | 5 | fertig | 
 | ✅ | 893 | Preetz | 16.503 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 894 | Reinheim | 16.503 | OpenStreetMap (Geofabrik-Auszug) | 12 | 18 | fertig | 
 | ✅ | 895 | Ginsheim-Gustavsburg | 16.488 | OpenStreetMap (Geofabrik-Auszug) | 5 | 6 | fertig | 
 | ✅ | 896 | Breisach am Rhein | 16.487 | OpenStreetMap (Geofabrik-Auszug) | 6 | 7 | fertig | 
 | ✅ | 897 | Wardenburg | 16.484 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 899 | Straelen | 16.458 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 900 | Wadern | 16.453 | OpenStreetMap (Geofabrik-Auszug) | 6 | 11 | fertig | 
 | ✅ | 901 | Kierspe | 16.450 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 902 | Wendelstein | 16.446 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 903 | Herzebrock-Clarholz | 16.419 | OpenStreetMap (Geofabrik-Auszug) | 9 | 17 | fertig | 
 | ✅ | 904 | Pocking | 16.414 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 905 | Seeheim-Jugenheim | 16.392 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 906 | Oyten | 16.380 | OpenStreetMap (Geofabrik-Auszug) | 17 | 20 | fertig | 
 | ✅ | 907 | Sulzbach/Saar | 16.376 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 908 | Künzelsau | 16.348 | OpenStreetMap (Geofabrik-Auszug) | 5 | 15 | fertig | 
 | ✅ | 909 | Kirchlengern | 16.334 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 910 | Halver | 16.322 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 911 | Regenstauf | 16.318 | OpenStreetMap (Geofabrik-Auszug) | 4 | 7 | fertig | 
 | ✅ | 912 | Holzkirchen | 16.310 | OpenStreetMap (Geofabrik-Auszug) | 5 | 7 | fertig | 
 | ✅ | 913 | Erwitte | 16.300 | OpenStreetMap (Geofabrik-Auszug) | 11 | 18 | fertig | 
 | ✅ | 914 | Stockelsdorf | 16.289 | OpenStreetMap (Geofabrik-Auszug) | 8 | 9 | fertig | 
 | ✅ | 915 | Drensteinfurt | 16.282 | OpenStreetMap (Geofabrik-Auszug) | 19 | 27 | fertig | 
 | ✅ | 916 | Hille | 16.274 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 918 | Kirchhain | 16.254 | OpenStreetMap (Geofabrik-Auszug) | 5 | 6 | fertig | 
 | ✅ | 919 | Bargteheide | 16.245 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 920 | Wurzen | 16.238 | OpenStreetMap (Geofabrik-Auszug) | 5 | 11 | fertig | 
 | ✅ | 921 | Brüggen | 16.198 | OpenStreetMap (Geofabrik-Auszug) | 8 | 8 | fertig | 
 | ✅ | 922 | Rahden | 16.195 | OpenStreetMap (Geofabrik-Auszug) | 3 | 5 | fertig | 
 | ✅ | 923 | Markranstädt | 16.194 | OpenStreetMap (Geofabrik-Auszug) | 3 | 10 | fertig | 
 | ✅ | 924 | Brakel | 16.193 | OpenStreetMap (Geofabrik-Auszug) | 36 | 43 | fertig | 
 | ✅ | 925 | Walldorf | 16.188 | OpenStreetMap (Geofabrik-Auszug) | 22 | 40 | fertig | 
 | ✅ | 926 | Marienberg | 16.139 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 927 | Stahnsdorf | 16.087 | OpenStreetMap (Geofabrik-Auszug) | 2 | 6 | fertig | 
 | ✅ | 928 | Bad Arolsen | 16.050 | OpenStreetMap (Geofabrik-Auszug) | 4 | 11 | fertig | 
 | ✅ | 929 | Karlsbad | 16.049 | OpenStreetMap (Geofabrik-Auszug) | 7 | 12 | fertig | 
 | ✅ | 930 | Petersberg | 16.038 | OpenStreetMap (Geofabrik-Auszug) | 2 | 7 | fertig | 
 | ✅ | 931 | Loxstedt | 16.012 | OpenStreetMap (Geofabrik-Auszug) | 4 | 8 | fertig | 
 | ✅ | 932 | Hude (Oldb) | 15.994 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 933 | Wendlingen am Neckar | 15.988 | OpenStreetMap (Geofabrik-Auszug) | 9 | 11 | fertig | 
 | ✅ | 935 | Neustadt in Holstein | 15.930 | OpenStreetMap (Geofabrik-Auszug) | 4 | 6 | fertig | 
 | ✅ | 936 | Erlensee | 15.907 | OpenStreetMap (Geofabrik-Auszug) | 9 | 12 | fertig | 
 | ✅ | 937 | Kernen im Remstal | 15.906 | OpenStreetMap (Geofabrik-Auszug) | 2 | 6 | fertig | 
 | ✅ | 938 | Rüdersdorf bei Berlin | 15.889 | OpenStreetMap (Geofabrik-Auszug) | 2 | 7 | fertig | 
 | ✅ | 939 | Großostheim | 15.873 | OpenStreetMap (Geofabrik-Auszug) | 11 | 19 | fertig | 
 | ✅ | 941 | Ascheberg | 15.831 | OpenStreetMap (Geofabrik-Auszug) | 32 | 39 | fertig | 
 | ✅ | 942 | Schiffweiler | 15.805 | OpenStreetMap (Geofabrik-Auszug) | 4 | 7 | fertig | 
 | ✅ | 943 | Dieburg | 15.798 | OpenStreetMap (Geofabrik-Auszug) | 5 | 7 | fertig | 
 | ✅ | 944 | Guben | 15.794 | OpenStreetMap (Geofabrik-Auszug) | 6 | 6 | fertig | 
 | ✅ | 945 | Odenthal | 15.782 | OpenStreetMap (Geofabrik-Auszug) | 16 | 22 | fertig | 
 | ✅ | 946 | Lübbenau/Spreewald | 15.778 | OpenStreetMap (Geofabrik-Auszug) | 9 | 12 | fertig | 
 | ✅ | 947 | Boppard | 15.771 | OpenStreetMap (Geofabrik-Auszug) | 12 | 14 | fertig | 
 | ✅ | 948 | Schlüchtern | 15.723 | OpenStreetMap (Geofabrik-Auszug) | 16 | 24 | fertig | 
 | ✅ | 949 | Usingen | 15.683 | OpenStreetMap (Geofabrik-Auszug) | 9 | 13 | fertig | 
 | ✅ | 950 | Zeulenroda-Triebes | 15.677 | OpenStreetMap (Geofabrik-Auszug) | 9 | 20 | fertig | 
 | ✅ | 951 | Eppelheim | 15.663 | OpenStreetMap (Geofabrik-Auszug) | 8 | 10 | fertig | 
 | ✅ | 952 | Stadtbergen | 15.649 | OpenStreetMap (Geofabrik-Auszug) | 44 | 61 | fertig | 
 | ✅ | 953 | Großenkneten | 15.613 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 954 | Templin | 15.590 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 955 | Bitburg | 15.554 | OpenStreetMap (Geofabrik-Auszug) | 12 | 18 | fertig | 
 | ✅ | 956 | Mindelheim | 15.531 | OpenStreetMap (Geofabrik-Auszug) | 14 | 14 | fertig | 
 | ✅ | 957 | Ratekau | 15.527 | OpenStreetMap (Geofabrik-Auszug) | 5 | 5 | fertig | 
 | ✅ | 958 | Freiberg am Neckar | 15.520 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 959 | Finsterwalde | 15.496 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 960 | Blomberg | 15.485 | OpenStreetMap (Geofabrik-Auszug) | 7 | 9 | fertig | 
 | ✅ | 961 | Altdorf b.Nürnberg | 15.478 | OpenStreetMap (Geofabrik-Auszug) | 10 | 193 | fertig | 
 | ✅ | 962 | Grenzach-Wyhlen | 15.476 | OpenStreetMap (Geofabrik-Auszug) | 5 | 8 | fertig | 
 | ✅ | 963 | Schwarzenberg/Erzgeb. | 15.475 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 964 | Marbach am Neckar | 15.474 | OpenStreetMap (Geofabrik-Auszug) | 4 | 8 | fertig | 
 | ✅ | 965 | Baiersbronn | 15.465 | OpenStreetMap (Geofabrik-Auszug) | 13 | 18 | fertig | 
 | ✅ | 966 | Schwalbach am Taunus | 15.443 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 967 | Beckingen | 15.442 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 968 | Bad Bramstedt | 15.439 | OpenStreetMap (Geofabrik-Auszug) | 5 | 6 | fertig | 
 | ✅ | 969 | Bad Neustadt a.d.Saale | 15.434 | OpenStreetMap (Geofabrik-Auszug) | 13 | 14 | fertig | 
 | ✅ | 970 | Petershagen/Eggersdorf | 15.432 | OpenStreetMap (Geofabrik-Auszug) | 12 | 15 | fertig | 
 | ✅ | 971 | Ebersbach an der Fils | 15.420 | OpenStreetMap (Geofabrik-Auszug) | 12 | 17 | fertig | 
 | ✅ | 972 | Michelstadt | 15.396 | OpenStreetMap (Geofabrik-Auszug) | 18 | 19 | fertig | 
 | ✅ | 973 | Königslutter am Elm | 15.395 | OpenStreetMap (Geofabrik-Auszug) | 4 | 7 | fertig | 
 | ✅ | 974 | Ribnitz-Damgarten | 15.333 | OpenStreetMap (Geofabrik-Auszug) | 9 | 13 | fertig | 
 | ✅ | 975 | Sandhausen | 15.330 | OpenStreetMap (Geofabrik-Auszug) | 17 | 32 | fertig | 
 | ✅ | 976 | Alsfeld | 15.307 | OpenStreetMap (Geofabrik-Auszug) | 11 | 14 | fertig | 
 | ✅ | 977 | Gehrden | 15.301 | OpenStreetMap (Geofabrik-Auszug) | 9 | 19 | fertig | 
 | ✅ | 978 | Raunheim | 15.297 | OpenStreetMap (Geofabrik-Auszug) | 23 | 23 | fertig | 
 | ✅ | 979 | Füssen | 15.287 | OpenStreetMap (Geofabrik-Auszug) | 15 | 28 | fertig | 
 | ✅ | 980 | Schwabmünchen | 15.277 | OpenStreetMap (Geofabrik-Auszug) | 16 | 21 | fertig | 
 | ✅ | 981 | Langenau | 15.274 | OpenStreetMap (Geofabrik-Auszug) | 25 | 46 | fertig | 
 | ✅ | 982 | Mainburg | 15.271 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 983 | Weener | 15.215 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 984 | Schriesheim | 15.209 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 985 | Brake (Unterweser) | 15.200 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 986 | Mühlenbecker Land | 15.177 | OpenStreetMap (Geofabrik-Auszug) | 14 | 29 | fertig | 
 | ✅ | 987 | Mering | 15.164 | OpenStreetMap (Geofabrik-Auszug) | 38 | 45 | fertig | 
 | ✅ | 988 | Garrel | 15.152 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 989 | Isny im Allgäu | 15.145 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 990 | Witzenhausen | 15.132 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 991 | Grefrath | 15.117 | OpenStreetMap (Geofabrik-Auszug) | 11 | 11 | fertig | 
 | ✅ | 992 | Reken | 15.109 | OpenStreetMap (Geofabrik-Auszug) | 3 | 5 | fertig | 
 | ✅ | 993 | Ober-Ramstadt | 15.078 | OpenStreetMap (Geofabrik-Auszug) | 4 | 7 | fertig | 
 | ✅ | 995 | Abensberg | 15.061 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 996 | Niederzier | 15.060 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 997 | Ratzeburg | 15.026 | OpenStreetMap (Geofabrik-Auszug) | 3 | 6 | fertig | 
 | ✅ | 998 | Rellingen | 15.026 | OpenStreetMap (Geofabrik-Auszug) | 9 | 9 | fertig | 
 | ✅ | 999 | Weißwasser/O.L. | 15.002 | OpenStreetMap (Geofabrik-Auszug) | 2 | 6 | fertig | 
 | ✅ | 1000 | Lohr a.Main | 14.996 | OpenStreetMap (Geofabrik-Auszug) | 5 | 15 | fertig | 
 | ✅ | 1001 | Langerwehe | 14.976 | OpenStreetMap (Geofabrik-Auszug) | 4 | 18 | fertig | 
 | ✅ | 1004 | Montabaur | 14.884 | OpenStreetMap (Geofabrik-Auszug) | 9 | 11 | fertig | 
 | ✅ | 1005 | Malsch | 14.880 | OpenStreetMap (Geofabrik-Auszug) | 5 | 5 | fertig | 
 | ✅ | 1006 | Stein | 14.866 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 1007 | Oberndorf am Neckar | 14.853 | OpenStreetMap (Geofabrik-Auszug) | 10 | 21 | fertig | 
 | ✅ | 1008 | Ritterhude | 14.836 | OpenStreetMap (Geofabrik-Auszug) | 5 | 5 | fertig | 
 | ✅ | 1010 | Münster (Hessen) | 14.813 | OpenStreetMap (Geofabrik-Auszug) | 9 | 15 | fertig | 
 | ✅ | 1011 | Landau a.d.Isar | 14.801 | OpenStreetMap (Geofabrik-Auszug) | 16 | 19 | fertig | 
 | ✅ | 1012 | Harsefeld | 14.782 | OpenStreetMap (Geofabrik-Auszug) | 8 | 13 | fertig | 
 | ✅ | 1013 | Neustadt a.d.Donau | 14.778 | OpenStreetMap (Geofabrik-Auszug) | 5 | 6 | fertig | 
 | ✅ | 1014 | Jever | 14.774 | OpenStreetMap (Geofabrik-Auszug) | 4 | 4 | fertig | 
 | ✅ | 1015 | Landsberg | 14.772 | OpenStreetMap (Geofabrik-Auszug) | 6 | 7 | fertig | 
 | ✅ | 1016 | Münsingen | 14.772 | OpenStreetMap (Geofabrik-Auszug) | 5 | 5 | fertig | 
 | ✅ | 1018 | Selb | 14.743 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 1019 | Karlstadt | 14.739 | OpenStreetMap (Geofabrik-Auszug) | 4 | 5 | fertig | 
 | ✅ | 1020 | Eberbach | 14.727 | OpenStreetMap (Geofabrik-Auszug) | 4 | 4 | fertig | 
 | ✅ | 1021 | Homberg (Efze) | 14.703 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 1022 | Olsberg | 14.700 | OpenStreetMap (Geofabrik-Auszug) | 2 | 5 | fertig | 
 | ✅ | 1023 | Büttelborn | 14.685 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 1024 | Pattensen | 14.666 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 1025 | Langwedel | 14.645 | OpenStreetMap (Geofabrik-Auszug) | 8 | 11 | fertig | 
 | ✅ | 1026 | Fredersdorf-Vogelsdorf | 14.644 | OpenStreetMap (Geofabrik-Auszug) | 12 | 16 | fertig | 
 | ✅ | 1027 | Eching | 14.627 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 1029 | Niederkrüchten | 14.619 | OpenStreetMap (Geofabrik-Auszug) | 11 | 12 | fertig | 
 | ✅ | 1030 | Bissendorf | 14.614 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 1033 | Kraichtal | 14.602 | OpenStreetMap (Geofabrik-Auszug) | 11 | 16 | fertig | 
 | ✅ | 1034 | Langelsheim | 14.599 | OpenStreetMap (Geofabrik-Auszug) | 4 | 4 | fertig | 
 | ✅ | 1035 | Schiffdorf | 14.598 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 1036 | Tornesch | 14.588 | OpenStreetMap (Geofabrik-Auszug) | 2 | 6 | fertig | 
 | ✅ | 1037 | Wilsdruff | 14.583 | OpenStreetMap (Geofabrik-Auszug) | 11 | 20 | fertig | 
 | ✅ | 1038 | Lengede | 14.575 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 1039 | Burglengenfeld | 14.569 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 1040 | Much | 14.561 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 1041 | Gründau | 14.560 | OpenStreetMap (Geofabrik-Auszug) | 26 | 30 | fertig | 
 | ✅ | 1042 | Sassenberg | 14.558 | OpenStreetMap (Geofabrik-Auszug) | 2 | 5 | fertig | 
 | ✅ | 1043 | Burbach | 14.553 | OpenStreetMap (Geofabrik-Auszug) | 3 | 5 | fertig | 
 | ✅ | 1044 | Murrhardt | 14.551 | OpenStreetMap (Geofabrik-Auszug) | 14 | 21 | fertig | 
 | ✅ | 1045 | Kalkar | 14.513 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 1046 | Fritzlar | 14.493 | OpenStreetMap (Geofabrik-Auszug) | 4 | 7 | fertig | 
 | ✅ | 1047 | Plochingen | 14.487 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 1048 | Aßlar | 14.482 | OpenStreetMap (Geofabrik-Auszug) | 4 | 4 | fertig | 
 | ✅ | 1049 | Hückeswagen | 14.480 | OpenStreetMap (Geofabrik-Auszug) | 18 | 27 | fertig | 
 | ✅ | 1050 | Eckental | 14.476 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 1051 | Löbau | 14.467 | OpenStreetMap (Geofabrik-Auszug) | 3 | 7 | fertig | 
 | ✅ | 1052 | Hainburg | 14.465 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 1053 | Langenselbold | 14.440 | OpenStreetMap (Geofabrik-Auszug) | 9 | 18 | fertig | 
 | ✅ | 1054 | Hofgeismar | 14.439 | OpenStreetMap (Geofabrik-Auszug) | 3 | 6 | fertig | 
 | ✅ | 1055 | Ahrensfelde | 14.423 | OpenStreetMap (Geofabrik-Auszug) | 4 | 4 | fertig | 
 | ✅ | 1056 | Grünstadt | 14.419 | OpenStreetMap (Geofabrik-Auszug) | 43 | 48 | fertig | 
 | ✅ | 1057 | Hilchenbach | 14.412 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 1058 | Gernsbach | 14.405 | OpenStreetMap (Geofabrik-Auszug) | 5 | 15 | fertig | 
 | ✅ | 1059 | Immenstadt i.Allgäu | 14.391 | OpenStreetMap (Geofabrik-Auszug) | 12 | 14 | fertig | 
 | ✅ | 1060 | Saterland | 14.378 | OpenStreetMap (Geofabrik-Auszug) | 6 | 28 | fertig | 
 | ✅ | 1061 | Niedernhausen | 14.345 | OpenStreetMap (Geofabrik-Auszug) | 13 | 13 | fertig | 
 | ✅ | 1062 | Neu-Anspach | 14.342 | OpenStreetMap (Geofabrik-Auszug) | 1 | 5 | fertig | 
 | ✅ | 1063 | Tostedt | 14.341 | OpenStreetMap (Geofabrik-Auszug) | 17 | 25 | fertig | 
 | ✅ | 1064 | Remshalden | 14.337 | OpenStreetMap (Geofabrik-Auszug) | 5 | 10 | fertig | 
 | ✅ | 1065 | Neubiberg | 14.329 | OpenStreetMap (Geofabrik-Auszug) | 10 | 17 | fertig | 
 | ✅ | 1066 | Brühl | 14.328 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 1068 | Löningen | 14.307 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 1069 | Uhingen | 14.304 | OpenStreetMap (Geofabrik-Auszug) | 4 | 6 | fertig | 
 | ✅ | 1070 | Markdorf | 14.300 | OpenStreetMap (Geofabrik-Auszug) | 35 | 41 | fertig | 
 | ✅ | 1071 | Riegelsberg | 14.296 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 1072 | Lorsch | 14.283 | OpenStreetMap (Geofabrik-Auszug) | 4 | 16 | fertig | 
 | ✅ | 1073 | Eggenfelden | 14.271 | OpenStreetMap (Geofabrik-Auszug) | 2 | 41 | fertig | 
 | ✅ | 1074 | Bad Camberg | 14.268 | OpenStreetMap (Geofabrik-Auszug) | 3 | 5 | fertig | 
 | ✅ | 1075 | Ottweiler | 14.255 | OpenStreetMap (Geofabrik-Auszug) | 2 | 5 | fertig | 
 | ✅ | 1076 | Wennigsen (Deister) | 14.251 | OpenStreetMap (Geofabrik-Auszug) | 5 | 6 | fertig | 
 | ✅ | 1078 | Angermünde | 14.233 | OpenStreetMap (Geofabrik-Auszug) | 4 | 4 | fertig | 
 | ✅ | 1079 | Neutraubling | 14.224 | OpenStreetMap (Geofabrik-Auszug) | 8 | 9 | fertig | 
 | ✅ | 1081 | Holzgerlingen | 14.184 | OpenStreetMap (Geofabrik-Auszug) | 9 | 10 | fertig | 
 | ✅ | 1082 | Oschatz | 14.184 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 1083 | Lauda-Königshofen | 14.180 | OpenStreetMap (Geofabrik-Auszug) | 14 | 18 | fertig | 
 | ✅ | 1084 | Krumbach (Schwaben) | 14.178 | OpenStreetMap (Geofabrik-Auszug) | 8 | 9 | fertig | 
 | ✅ | 1085 | Lich | 14.167 | OpenStreetMap (Geofabrik-Auszug) | 4 | 8 | fertig | 
 | ✅ | 1086 | Sendenhorst | 14.167 | OpenStreetMap (Geofabrik-Auszug) | 15 | 17 | fertig | 
 | ✅ | 1087 | Sylt | 14.167 | OpenStreetMap (Geofabrik-Auszug) | 5 | 10 | fertig | 
 | ✅ | 1088 | Freigericht | 14.165 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 1089 | Erbach | 14.140 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 1090 | Markgröningen | 14.138 | OpenStreetMap (Geofabrik-Auszug) | 18 | 33 | fertig | 
 | ✅ | 1091 | Leuna | 14.131 | OpenStreetMap (Geofabrik-Auszug) | 29 | 35 | fertig | 
 | ✅ | 1092 | Sandersdorf-Brehna | 14.130 | OpenStreetMap (Geofabrik-Auszug) | 4 | 8 | fertig | 
 | ✅ | 1093 | Schwentinental | 14.091 | OpenStreetMap (Geofabrik-Auszug) | 9 | 10 | fertig | 
 | ✅ | 1094 | Rommerskirchen | 14.079 | OpenStreetMap (Geofabrik-Auszug) | 11 | 19 | fertig | 
 | ✅ | 1095 | Bovenden | 14.078 | OpenStreetMap (Geofabrik-Auszug) | 31 | 38 | fertig | 
 | ✅ | 1097 | Lauchhammer | 14.042 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 1098 | Rosengarten | 14.033 | OpenStreetMap (Geofabrik-Auszug) | 12 | 16 | fertig | 
 | ✅ | 1099 | Großefehn | 14.029 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 1100 | Lübben (Spreewald) | 14.028 | OpenStreetMap (Geofabrik-Auszug) | 15 | 21 | fertig | 
 | ✅ | 1101 | Quakenbrück | 14.007 | OpenStreetMap (Geofabrik-Auszug) | 17 | 32 | fertig | 
 | ✅ | 1102 | Melsungen | 13.994 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 1103 | St. Leon-Rot | 13.979 | OpenStreetMap (Geofabrik-Auszug) | 7 | 12 | fertig | 
 | ✅ | 1104 | Maisach | 13.974 | OpenStreetMap (Geofabrik-Auszug) | 15 | 36 | fertig | 
 | ✅ | 1105 | Zeven | 13.958 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 1106 | Mühltal | 13.951 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 1107 | Grafing b.München | 13.942 | OpenStreetMap (Geofabrik-Auszug) | 21 | 33 | fertig | 
 | ✅ | 1108 | Erbach | 13.935 | OpenStreetMap (Geofabrik-Auszug) | 17 | 18 | fertig | 
 | ✅ | 1109 | Dippoldiswalde | 13.915 | OpenStreetMap (Geofabrik-Auszug) | 12 | 18 | fertig | 
 | ✅ | 1110 | Neuenkirchen | 13.915 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 1111 | Clausthal-Zellerfeld | 13.912 | OpenStreetMap (Geofabrik-Auszug) | 28 | 31 | fertig | 
 | ✅ | 1113 | Eichstätt | 13.891 | OpenStreetMap (Geofabrik-Auszug) | 4 | 8 | fertig | 
 | ✅ | 1114 | Beelitz | 13.879 | OpenStreetMap (Geofabrik-Auszug) | 25 | 53 | fertig | 
 | ✅ | 1116 | Lohfelden | 13.870 | OpenStreetMap (Geofabrik-Auszug) | 17 | 26 | fertig | 
 | ✅ | 1117 | Haßfurt | 13.867 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 1119 | Friesenheim | 13.858 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 1120 | Mittweida | 13.839 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 1121 | Waldbronn | 13.838 | OpenStreetMap (Geofabrik-Auszug) | 12 | 18 | fertig | 
 | ✅ | 1122 | Buchloe | 13.815 | OpenStreetMap (Geofabrik-Auszug) | 5 | 5 | fertig | 
 | ✅ | 1124 | Hohenstein-Ernstthal | 13.788 | OpenStreetMap (Geofabrik-Auszug) | 6 | 11 | fertig | 
 | ✅ | 1125 | Barßel | 13.780 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 1126 | Lotte | 13.770 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 1127 | Obersulm | 13.756 | OpenStreetMap (Geofabrik-Auszug) | 9 | 11 | fertig | 
 | ✅ | 1128 | Philippsburg | 13.748 | OpenStreetMap (Geofabrik-Auszug) | 10 | 16 | fertig | 
 | ✅ | 1129 | Meckenbeuren | 13.735 | OpenStreetMap (Geofabrik-Auszug) | 5 | 6 | fertig | 
 | ✅ | 1130 | Wanzleben-Börde | 13.724 | OpenStreetMap (Geofabrik-Auszug) | 17 | 27 | fertig | 
 | ✅ | 1131 | Ettenheim | 13.722 | OpenStreetMap (Geofabrik-Auszug) | 4 | 4 | fertig | 
 | ✅ | 1132 | Borchen | 13.721 | OpenStreetMap (Geofabrik-Auszug) | 11 | 25 | fertig | 
 | ✅ | 1133 | Denzlingen | 13.720 | OpenStreetMap (Geofabrik-Auszug) | 8 | 13 | fertig | 
 | ✅ | 1134 | Bad Soden-Salmünster | 13.719 | OpenStreetMap (Geofabrik-Auszug) | 11 | 16 | fertig | 
 | ✅ | 1135 | Feucht | 13.714 | OpenStreetMap (Geofabrik-Auszug) | 10 | 16 | fertig | 
 | ✅ | 1136 | Spaichingen | 13.714 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 1137 | Michendorf | 13.708 | OpenStreetMap (Geofabrik-Auszug) | 11 | 22 | fertig | 
 | ✅ | 1138 | Grünberg | 13.683 | OpenStreetMap (Geofabrik-Auszug) | 9 | 12 | fertig | 
 | ✅ | 1139 | Hünxe | 13.676 | OpenStreetMap (Geofabrik-Auszug) | 4 | 8 | fertig | 
 | ✅ | 1140 | Pegnitz | 13.665 | OpenStreetMap (Geofabrik-Auszug) | 7 | 13 | fertig | 
 | ✅ | 1141 | Frankenberg/Sa. | 13.659 | OpenStreetMap (Geofabrik-Auszug) | 12 | 19 | fertig | 
 | ✅ | 1142 | Hilpoltstein | 13.654 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 1143 | Linnich | 13.653 | OpenStreetMap (Geofabrik-Auszug) | 4 | 4 | fertig | 
 | ✅ | 1144 | Asperg | 13.650 | OpenStreetMap (Geofabrik-Auszug) | 11 | 19 | fertig | 
 | ✅ | 1145 | Markt Schwaben | 13.643 | OpenStreetMap (Geofabrik-Auszug) | 5 | 9 | fertig | 
 | ✅ | 1146 | Jessen (Elster) | 13.639 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 1148 | Saarwellingen | 13.616 | OpenStreetMap (Geofabrik-Auszug) | 3 | 5 | fertig | 
 | ✅ | 1149 | Bedburg-Hau | 13.599 | OpenStreetMap (Geofabrik-Auszug) | 11 | 14 | fertig | 
 | ✅ | 1150 | Bad Schönborn | 13.583 | OpenStreetMap (Geofabrik-Auszug) | 3 | 7 | fertig | 
 | ✅ | 1151 | Solms | 13.579 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 1152 | Schleiden | 13.578 | OpenStreetMap (Geofabrik-Auszug) | 11 | 21 | fertig | 
 | ✅ | 1153 | Meerane | 13.567 | OpenStreetMap (Geofabrik-Auszug) | 12 | 22 | fertig | 
 | ✅ | 1154 | Schüttorf | 13.562 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 1155 | Schmölln | 13.542 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 1156 | Uslar | 13.536 | OpenStreetMap (Geofabrik-Auszug) | 15 | 16 | fertig | 
 | ✅ | 1157 | Haselünne | 13.527 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 1158 | Schermbeck | 13.516 | OpenStreetMap (Geofabrik-Auszug) | 4 | 7 | fertig | 
 | ✅ | 1159 | Gräfelfing | 13.472 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 1161 | Bergen auf Rügen | 13.457 | OpenStreetMap (Geofabrik-Auszug) | 17 | 19 | fertig | 
 | ✅ | 1162 | Östringen | 13.450 | OpenStreetMap (Geofabrik-Auszug) | 5 | 7 | fertig | 
 | ✅ | 1163 | Tauberbischofsheim | 13.445 | OpenStreetMap (Geofabrik-Auszug) | 8 | 13 | fertig | 
 | ✅ | 1164 | Pfullendorf | 13.442 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 1165 | Lappersdorf | 13.419 | OpenStreetMap (Geofabrik-Auszug) | 6 | 8 | fertig | 
 | ✅ | 1166 | Genthin | 13.416 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 1167 | Wentorf bei Hamburg | 13.414 | OpenStreetMap (Geofabrik-Auszug) | 3 | 13 | fertig | 
 | ✅ | 1168 | Gangelt | 13.410 | OpenStreetMap (Geofabrik-Auszug) | 5 | 5 | fertig | 
 | ✅ | 1169 | Mutterstadt | 13.403 | OpenStreetMap (Geofabrik-Auszug) | 11 | 17 | fertig | 
 | ✅ | 1170 | Sulingen | 13.394 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 1171 | Kirchheim b.München | 13.392 | OpenStreetMap (Geofabrik-Auszug) | 3 | 6 | fertig | 
 | ✅ | 1172 | Schneeberg | 13.377 | OpenStreetMap (Geofabrik-Auszug) | 4 | 6 | fertig | 
 | ✅ | 1173 | Marienheide | 13.356 | OpenStreetMap (Geofabrik-Auszug) | 5 | 8 | fertig | 
 | ✅ | 1175 | Neckargemünd | 13.335 | OpenStreetMap (Geofabrik-Auszug) | 22 | 25 | fertig | 
 | ✅ | 1177 | Oberhaching | 13.318 | OpenStreetMap (Geofabrik-Auszug) | 12 | 23 | fertig | 
 | ✅ | 1179 | Hüllhorst | 13.304 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 1180 | Barsbüttel | 13.302 | OpenStreetMap (Geofabrik-Auszug) | 3 | 6 | fertig | 
 | ✅ | 1181 | Neustadt a.d.Aisch | 13.294 | OpenStreetMap (Geofabrik-Auszug) | 5 | 5 | fertig | 
 | ✅ | 1182 | Hagen am Teutoburger Wald | 13.275 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 1183 | Weinsberg | 13.268 | OpenStreetMap (Geofabrik-Auszug) | 10 | 13 | fertig | 
 | ✅ | 1184 | Kalletal | 13.256 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 1186 | Fehmarn | 13.200 | OpenStreetMap (Geofabrik-Auszug) | 24 | 40 | fertig | 
 | ✅ | 1187 | Brieselang | 13.187 | OpenStreetMap (Geofabrik-Auszug) | 3 | 8 | fertig | 
 | ✅ | 1188 | Kerken | 13.186 | OpenStreetMap (Geofabrik-Auszug) | 8 | 11 | fertig | 
 | ✅ | 1189 | Ubstadt-Weiher | 13.178 | OpenStreetMap (Geofabrik-Auszug) | 13 | 17 | fertig | 
 | ✅ | 1190 | Olfen | 13.175 | OpenStreetMap (Geofabrik-Auszug) | 6 | 8 | fertig | 
 | ✅ | 1191 | Winterberg | 13.168 | OpenStreetMap (Geofabrik-Auszug) | 5 | 11 | fertig | 
 | ✅ | 1193 | Twistringen | 13.162 | OpenStreetMap (Geofabrik-Auszug) | 1 | 4 | fertig | 
 | ✅ | 1194 | Plattling | 13.160 | OpenStreetMap (Geofabrik-Auszug) | 11 | 15 | fertig | 
 | ✅ | 1195 | Treuchtlingen | 13.159 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 1196 | Roding | 13.157 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 1197 | Bad Dürrheim | 13.149 | OpenStreetMap (Geofabrik-Auszug) | 7 | 26 | fertig | 
 | ✅ | 1198 | Bad Laasphe | 13.148 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 1199 | Peißenberg | 13.148 | OpenStreetMap (Geofabrik-Auszug) | 6 | 10 | fertig | 
 | ✅ | 1200 | Altötting | 13.138 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 1201 | Wehr | 13.126 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 1202 | Ketsch | 13.117 | OpenStreetMap (Geofabrik-Auszug) | 7 | 12 | fertig | 
 | ✅ | 1203 | Schöneiche bei Berlin | 13.102 | OpenStreetMap (Geofabrik-Auszug) | 5 | 7 | fertig | 
 | ✅ | 1204 | Roßdorf | 13.096 | OpenStreetMap (Geofabrik-Auszug) | 4 | 5 | fertig | 
 | ✅ | 1206 | Bohmte | 13.083 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 1207 | Hadamar | 13.082 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 1209 | Bad Doberan | 13.079 | OpenStreetMap (Geofabrik-Auszug) | 17 | 35 | fertig | 
 | ✅ | 1210 | Eppstein | 13.070 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 1211 | Lauterbach (Hessen) | 13.047 | OpenStreetMap (Geofabrik-Auszug) | 3 | 7 | fertig | 
 | ✅ | 1212 | Hösbach | 13.046 | OpenStreetMap (Geofabrik-Auszug) | 13 | 21 | fertig | 
 | ✅ | 1213 | Manching | 13.042 | OpenStreetMap (Geofabrik-Auszug) | 4 | 5 | fertig | 
 | ✅ | 1215 | Teutschenthal | 13.038 | OpenStreetMap (Geofabrik-Auszug) | 3 | 6 | fertig | 
 | ✅ | 1216 | Bad Salzdetfurth | 13.037 | OpenStreetMap (Geofabrik-Auszug) | 4 | 19 | fertig | 
 | ✅ | 1217 | Oebisfelde-Weferlingen | 13.002 | OpenStreetMap (Geofabrik-Auszug) | 17 | 22 | fertig | 
 | ✅ | 1218 | Weilburg | 12.992 | OpenStreetMap (Geofabrik-Auszug) | 9 | 13 | fertig | 
 | ✅ | 1219 | Bergen | 12.991 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 1220 | Bischofsheim | 12.979 | OpenStreetMap (Geofabrik-Auszug) | 4 | 7 | fertig | 
 | ✅ | 1221 | Biedenkopf | 12.969 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 1222 | Wietmarschen | 12.959 | OpenStreetMap (Geofabrik-Auszug) | 2 | 6 | fertig | 
 | ✅ | 1223 | Bebra | 12.945 | OpenStreetMap (Geofabrik-Auszug) | 32 | 37 | fertig | 
 | ✅ | 1224 | Rotenburg a.d.Fulda | 12.937 | OpenStreetMap (Geofabrik-Auszug) | 3 | 5 | fertig | 
 | ✅ | 1225 | Gärtringen | 12.934 | OpenStreetMap (Geofabrik-Auszug) | 16 | 23 | fertig | 
 | ✅ | 1226 | Jüterbog | 12.926 | OpenStreetMap (Geofabrik-Auszug) | 11 | 13 | fertig | 
 | ✅ | 1227 | Ladenburg | 12.914 | OpenStreetMap (Geofabrik-Auszug) | 8 | 10 | fertig | 
 | ✅ | 1228 | Cremlingen | 12.907 | OpenStreetMap (Geofabrik-Auszug) | 6 | 11 | fertig | 
 | ✅ | 1229 | Quierschied | 12.895 | OpenStreetMap (Geofabrik-Auszug) | 4 | 6 | fertig | 
 | ✅ | 1233 | Sulz am Neckar | 12.847 | OpenStreetMap (Geofabrik-Auszug) | 6 | 8 | fertig | 
 | ✅ | 1234 | Kaufungen | 12.838 | OpenStreetMap (Geofabrik-Auszug) | 4 | 8 | fertig | 
 | ✅ | 1235 | Trebur | 12.799 | OpenStreetMap (Geofabrik-Auszug) | 5 | 8 | fertig | 
 | ✅ | 1236 | Titisee-Neustadt | 12.797 | OpenStreetMap (Geofabrik-Auszug) | 7 | 9 | fertig | 
 | ✅ | 1237 | Herzberg am Harz | 12.792 | OpenStreetMap (Geofabrik-Auszug) | 11 | 14 | fertig | 
 | ✅ | 1238 | Bad Fallingbostel | 12.783 | OpenStreetMap (Geofabrik-Auszug) | 7 | 9 | fertig | 
 | ✅ | 1239 | Hettstedt | 12.783 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 1240 | Weeze | 12.766 | OpenStreetMap (Geofabrik-Auszug) | 35 | 37 | fertig | 
 | ✅ | 1241 | Altenstadt | 12.764 | OpenStreetMap (Geofabrik-Auszug) | 4 | 9 | fertig | 
 | ✅ | 1242 | Pfarrkirchen | 12.764 | OpenStreetMap (Geofabrik-Auszug) | 4 | 4 | fertig | 
 | ✅ | 1243 | Hungen | 12.754 | OpenStreetMap (Geofabrik-Auszug) | 7 | 7 | fertig | 
 | ✅ | 1244 | Fuldatal | 12.752 | OpenStreetMap (Geofabrik-Auszug) | 4 | 4 | fertig | 
 | ✅ | 1245 | Bad Urach | 12.751 | OpenStreetMap (Geofabrik-Auszug) | 16 | 28 | fertig | 
 | ✅ | 1246 | Wächtersbach | 12.731 | OpenStreetMap (Geofabrik-Auszug) | 14 | 41 | fertig | 
 | ✅ | 1247 | Velten | 12.727 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 1248 | Blaubeuren | 12.719 | OpenStreetMap (Geofabrik-Auszug) | 4 | 4 | fertig | 
 | ✅ | 1249 | Bretzfeld | 12.713 | OpenStreetMap (Geofabrik-Auszug) | 8 | 10 | fertig | 
 | ✅ | 1251 | Neunkirchen | 12.705 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 1252 | Brunsbüttel | 12.692 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 1253 | Dossenheim | 12.690 | OpenStreetMap (Geofabrik-Auszug) | 7 | 10 | fertig | 
 | ✅ | 1254 | Neuenburg am Rhein | 12.690 | OpenStreetMap (Geofabrik-Auszug) | 3 | 6 | fertig | 
 | ✅ | 1256 | Velen | 12.678 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 1257 | Beverungen | 12.669 | OpenStreetMap (Geofabrik-Auszug) | 1 | 4 | fertig | 
 | ✅ | 1258 | Mettlach | 12.621 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 1259 | Möckern | 12.591 | OpenStreetMap (Geofabrik-Auszug) | 15 | 17 | fertig | 
 | ✅ | 1260 | Wolfhagen | 12.582 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 1261 | Schongau | 12.572 | OpenStreetMap (Geofabrik-Auszug) | 14 | 14 | fertig | 
 | ✅ | 1262 | Feuchtwangen | 12.551 | OpenStreetMap (Geofabrik-Auszug) | 2 | 5 | fertig | 
 | ✅ | 1263 | Bad Abbach | 12.545 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 1264 | Röthenbach a.d.Pegnitz | 12.529 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 1266 | Alpen | 12.515 | OpenStreetMap (Geofabrik-Auszug) | 5 | 7 | fertig | 
 | ✅ | 1267 | Neuhausen auf den Fildern | 12.506 | OpenStreetMap (Geofabrik-Auszug) | 6 | 6 | fertig | 
 | ✅ | 1268 | Emstek | 12.487 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 1269 | Linkenheim-Hochstetten | 12.484 | OpenStreetMap (Geofabrik-Auszug) | 5 | 9 | fertig | 
 | ✅ | 1270 | Gaimersheim | 12.468 | OpenStreetMap (Geofabrik-Auszug) | 9 | 11 | fertig | 
 | ✅ | 1271 | Rödental | 12.457 | OpenStreetMap (Geofabrik-Auszug) | 6 | 42 | fertig | 
 | ✅ | 1272 | Graben-Neudorf | 12.453 | OpenStreetMap (Geofabrik-Auszug) | 8 | 12 | fertig | 
 | ✅ | 1273 | Bad Windsheim | 12.446 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 1274 | Preußisch Oldendorf | 12.439 | OpenStreetMap (Geofabrik-Auszug) | 4 | 5 | fertig | 
 | ✅ | 1275 | Hirschaid | 12.429 | OpenStreetMap (Geofabrik-Auszug) | 6 | 6 | fertig | 
 | ✅ | 1276 | Issum | 12.428 | OpenStreetMap (Geofabrik-Auszug) | 27 | 33 | fertig | 
 | ✅ | 1277 | Laichingen | 12.425 | OpenStreetMap (Geofabrik-Auszug) | 3 | 6 | fertig | 
 | ✅ | 1278 | Bad Wünnenberg | 12.418 | OpenStreetMap (Geofabrik-Auszug) | 7 | 13 | fertig | 
 | ✅ | 1279 | Gladenbach | 12.415 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 1280 | Ebersberg | 12.408 | OpenStreetMap (Geofabrik-Auszug) | 10 | 14 | fertig | 
 | ✅ | 1281 | Niefern-Öschelbronn | 12.402 | OpenStreetMap (Geofabrik-Auszug) | 5 | 9 | fertig | 
 | ✅ | 1282 | Monschau | 12.389 | OpenStreetMap (Geofabrik-Auszug) | 4 | 5 | fertig | 
 | ✅ | 1283 | Ense | 12.383 | OpenStreetMap (Geofabrik-Auszug) | 8 | 9 | fertig | 
 | ✅ | 1284 | Ihlow | 12.376 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 1285 | Wasserburg a.Inn | 12.375 | OpenStreetMap (Geofabrik-Auszug) | 4 | 9 | fertig | 
 | ✅ | 1288 | Hersbruck | 12.346 | OpenStreetMap (Geofabrik-Auszug) | 15 | 22 | fertig | 
 | ✅ | 1289 | Hessisch Lichtenau | 12.337 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 1290 | Wolmirstedt | 12.323 | OpenStreetMap (Geofabrik-Auszug) | 16 | 23 | fertig | 
 | ✅ | 1291 | Meitingen | 12.307 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 1292 | Tamm | 12.305 | OpenStreetMap (Geofabrik-Auszug) | 6 | 19 | fertig | 
 | ✅ | 1293 | St. Georgen im Schwarzwald | 12.301 | OpenStreetMap (Geofabrik-Auszug) | 3 | 5 | fertig | 
 | ✅ | 1294 | Heddesheim | 12.294 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 1295 | Zetel | 12.293 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 1296 | Edemissen | 12.281 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 1297 | Osterhofen | 12.280 | OpenStreetMap (Geofabrik-Auszug) | 5 | 6 | fertig | 
 | ✅ | 1298 | Oftersheim | 12.272 | OpenStreetMap (Geofabrik-Auszug) | 6 | 15 | fertig | 
 | ✅ | 1299 | Borken (Hessen) | 12.268 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 1300 | Rielasingen-Worblingen | 12.268 | OpenStreetMap (Geofabrik-Auszug) | 6 | 12 | fertig | 
 | ✅ | 1301 | Besigheim | 12.267 | OpenStreetMap (Geofabrik-Auszug) | 11 | 13 | fertig | 
 | ✅ | 1302 | Dinkelsbühl | 12.260 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 1303 | Salem | 12.243 | OpenStreetMap (Geofabrik-Auszug) | 4 | 6 | fertig | 
 | ✅ | 1304 | Rosdorf | 12.239 | OpenStreetMap (Geofabrik-Auszug) | 37 | 44 | fertig | 
 | ✅ | 1305 | Vilsbiburg | 12.237 | OpenStreetMap (Geofabrik-Auszug) | 2 | 6 | fertig | 
 | ✅ | 1306 | Kronshagen | 12.235 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 1308 | Wernau (Neckar) | 12.200 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 1309 | Bad Sassendorf | 12.194 | OpenStreetMap (Geofabrik-Auszug) | 3 | 11 | fertig | 
 | ✅ | 1310 | Lauffen am Neckar | 12.189 | OpenStreetMap (Geofabrik-Auszug) | 9 | 12 | fertig | 
 | ✅ | 1311 | Gundelfingen | 12.168 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 1312 | Glienicke/Nordbahn | 12.159 | OpenStreetMap (Geofabrik-Auszug) | 14 | 14 | fertig | 
 | ✅ | 1313 | Zella-Mehlis | 12.157 | OpenStreetMap (Geofabrik-Auszug) | 6 | 40 | fertig | 
 | ✅ | 1314 | Oberkrämer | 12.145 | OpenStreetMap (Geofabrik-Auszug) | 3 | 9 | fertig | 
 | ✅ | 1316 | Geeste | 12.129 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 1319 | Apen | 12.118 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 1321 | Steinheim | 12.107 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 1322 | Leutenbach | 12.093 | OpenStreetMap (Geofabrik-Auszug) | 6 | 8 | fertig | 
 | ✅ | 1323 | Wettenberg | 12.077 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 1325 | Hagenow | 12.022 | OpenStreetMap (Geofabrik-Auszug) | 2 | 7 | fertig | 
 | ✅ | 1326 | Perleberg | 12.022 | OpenStreetMap (Geofabrik-Auszug) | 2 | 7 | fertig | 
 | ✅ | 1327 | Gaildorf | 12.005 | OpenStreetMap (Geofabrik-Auszug) | 7 | 8 | fertig | 
 | ✅ | 1328 | Welver | 11.999 | OpenStreetMap (Geofabrik-Auszug) | 1 | 4 | fertig | 
 | ✅ | 1329 | Essenbach | 11.998 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 1330 | Murnau a.Staffelsee | 11.994 | OpenStreetMap (Geofabrik-Auszug) | 14 | 16 | fertig | 
 | ✅ | 1331 | Stelle | 11.974 | OpenStreetMap (Geofabrik-Auszug) | 3 | 12 | fertig | 
 | ✅ | 1333 | Ludwigslust | 11.961 | OpenStreetMap (Geofabrik-Auszug) | 6 | 12 | fertig | 
 | ✅ | 1335 | Hallbergmoos | 11.959 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 1336 | Billerbeck | 11.945 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 1337 | Uplengen | 11.930 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 1338 | Anklam | 11.917 | OpenStreetMap (Geofabrik-Auszug) | 15 | 21 | fertig | 
 | ✅ | 1339 | Hemsbach | 11.915 | OpenStreetMap (Geofabrik-Auszug) | 4 | 5 | fertig | 
 | ✅ | 1340 | Drolshagen | 11.913 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 1341 | Sassenburg | 11.913 | OpenStreetMap (Geofabrik-Auszug) | 9 | 15 | fertig | 
 | ✅ | 1342 | Steinheim an der Murr | 11.908 | OpenStreetMap (Geofabrik-Auszug) | 4 | 5 | fertig | 
 | ✅ | 1343 | Ostrhauderfehn | 11.885 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 1344 | Teningen | 11.884 | OpenStreetMap (Geofabrik-Auszug) | 4 | 11 | fertig | 
 | ✅ | 1345 | Lippetal | 11.883 | OpenStreetMap (Geofabrik-Auszug) | 4 | 4 | fertig | 
 | ✅ | 1346 | Bad Freienwalde (Oder) | 11.877 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 1348 | Lehre | 11.874 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 1350 | Unterföhring | 11.866 | OpenStreetMap (Geofabrik-Auszug) | 4 | 11 | fertig | 
 | ✅ | 1351 | Oberschleißheim | 11.857 | OpenStreetMap (Geofabrik-Auszug) | 5 | 6 | fertig | 
 | ✅ | 1352 | Eichenzell | 11.852 | OpenStreetMap (Geofabrik-Auszug) | 6 | 12 | fertig | 
 | ✅ | 1353 | Schöneck | 11.837 | OpenStreetMap (Geofabrik-Auszug) | 5 | 6 | fertig | 
 | ✅ | 1355 | Neustadt in Sachsen | 11.810 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 1356 | Peiting | 11.798 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 1357 | Remchingen | 11.798 | OpenStreetMap (Geofabrik-Auszug) | 12 | 20 | fertig | 
 | ✅ | 1358 | Durmersheim | 11.780 | OpenStreetMap (Geofabrik-Auszug) | 9 | 11 | fertig | 
 | ✅ | 1359 | Rangsdorf | 11.754 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 1361 | Scharbeutz | 11.694 | OpenStreetMap (Geofabrik-Auszug) | 16 | 20 | fertig | 
 | ✅ | 1362 | Jork | 11.693 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 1363 | Oberderdingen | 11.690 | OpenStreetMap (Geofabrik-Auszug) | 4 | 6 | fertig | 
 | ✅ | 1364 | Bad Nenndorf | 11.686 | OpenStreetMap (Geofabrik-Auszug) | 23 | 29 | fertig | 
 | ✅ | 1365 | Limburgerhof | 11.684 | OpenStreetMap (Geofabrik-Auszug) | 4 | 7 | fertig | 
 | ✅ | 1366 | Schwaigern | 11.661 | OpenStreetMap (Geofabrik-Auszug) | 4 | 7 | fertig | 
 | ✅ | 1367 | Kissing | 11.657 | OpenStreetMap (Geofabrik-Auszug) | 55 | 102 | fertig | 
 | ✅ | 1368 | Lauenburg/Elbe | 11.657 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 1369 | Mettingen | 11.654 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 1370 | Erkner | 11.641 | OpenStreetMap (Geofabrik-Auszug) | 3 | 29 | fertig | 
 | ✅ | 1371 | Leingarten | 11.637 | OpenStreetMap (Geofabrik-Auszug) | 4 | 8 | fertig | 
 | ✅ | 1372 | Wickede (Ruhr) | 11.637 | OpenStreetMap (Geofabrik-Auszug) | 14 | 15 | fertig | 
 | ✅ | 1373 | Hildburghausen | 11.632 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 1376 | Walldürn | 11.614 | OpenStreetMap (Geofabrik-Auszug) | 4 | 6 | fertig | 
 | ✅ | 1377 | Sinzheim | 11.608 | OpenStreetMap (Geofabrik-Auszug) | 12 | 24 | fertig | 
 | ✅ | 1378 | Korb | 11.607 | OpenStreetMap (Geofabrik-Auszug) | 3 | 5 | fertig | 
 | ✅ | 1379 | Lindenberg i.Allgäu | 11.587 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 1380 | Miesbach | 11.573 | OpenStreetMap (Geofabrik-Auszug) | 4 | 4 | fertig | 
 | ✅ | 1381 | Geisenfeld | 11.563 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 1382 | Bopfingen | 11.560 | OpenStreetMap (Geofabrik-Auszug) | 6 | 14 | fertig | 
 | ✅ | 1383 | Handewitt | 11.556 | OpenStreetMap (Geofabrik-Auszug) | 4 | 6 | fertig | 
 | ✅ | 1384 | Rudersberg | 11.555 | OpenStreetMap (Geofabrik-Auszug) | 6 | 9 | fertig | 
 | ✅ | 1385 | Gerstetten | 11.551 | OpenStreetMap (Geofabrik-Auszug) | 7 | 9 | fertig | 
 | ✅ | 1386 | Eichenau | 11.540 | OpenStreetMap (Geofabrik-Auszug) | 5 | 5 | fertig | 
 | ✅ | 1387 | Muldestausee | 11.540 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 1388 | Bad Schwalbach | 11.532 | OpenStreetMap (Geofabrik-Auszug) | 15 | 22 | fertig | 
 | ✅ | 1389 | Ammerbuch | 11.522 | OpenStreetMap (Geofabrik-Auszug) | 15 | 48 | fertig | 
 | ✅ | 1390 | Bad Dürrenberg | 11.521 | OpenStreetMap (Geofabrik-Auszug) | 7 | 13 | fertig | 
 | ✅ | 1391 | Lauingen (Donau) | 11.510 | OpenStreetMap (Geofabrik-Auszug) | 7 | 7 | fertig | 
 | ✅ | 1393 | Eningen unter Achalm | 11.506 | OpenStreetMap (Geofabrik-Auszug) | 10 | 11 | fertig | 
 | ✅ | 1394 | Ostbevern | 11.469 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 1395 | Burgthann | 11.466 | OpenStreetMap (Geofabrik-Auszug) | 5 | 9 | fertig | 
 | ✅ | 1396 | Dautphetal | 11.466 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 1397 | Oestrich-Winkel | 11.443 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 1398 | Zeuthen | 11.431 | OpenStreetMap (Geofabrik-Auszug) | 10 | 19 | fertig | 
 | ✅ | 1399 | Diez | 11.428 | OpenStreetMap (Geofabrik-Auszug) | 2 | 9 | fertig | 
 | ✅ | 1402 | Marktheidenfeld | 11.402 | OpenStreetMap (Geofabrik-Auszug) | 4 | 7 | fertig | 
 | ✅ | 1403 | Krummhörn | 11.384 | OpenStreetMap (Geofabrik-Auszug) | 4 | 6 | fertig | 
 | ✅ | 1404 | Geisenheim | 11.369 | OpenStreetMap (Geofabrik-Auszug) | 4 | 6 | fertig | 
 | ✅ | 1405 | Straubenhardt | 11.367 | OpenStreetMap (Geofabrik-Auszug) | 4 | 5 | fertig | 
 | ✅ | 1406 | Rothenburg ob der Tauber | 11.365 | OpenStreetMap (Geofabrik-Auszug) | 7 | 14 | fertig | 
 | ✅ | 1407 | Zwönitz | 11.358 | OpenStreetMap (Geofabrik-Auszug) | 5 | 13 | fertig | 
 | ✅ | 1408 | Kriftel | 11.356 | OpenStreetMap (Geofabrik-Auszug) | 5 | 7 | fertig | 
 | ✅ | 1409 | Waldkirchen | 11.356 | OpenStreetMap (Geofabrik-Auszug) | 3 | 15 | fertig | 
 | ✅ | 1410 | Rheinau | 11.346 | OpenStreetMap (Geofabrik-Auszug) | 12 | 20 | fertig | 
 | ✅ | 1411 | Recke | 11.341 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 1412 | Trostberg | 11.337 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 1413 | Schwieberdingen | 11.318 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 1414 | Drochtersen | 11.313 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 1415 | Engen | 11.311 | OpenStreetMap (Geofabrik-Auszug) | 26 | 40 | fertig | 
 | ✅ | 1416 | Kranenburg | 11.303 | OpenStreetMap (Geofabrik-Auszug) | 1 | 8 | fertig | 
 | ✅ | 1417 | Altdorf | 11.300 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 1418 | Möhnesee | 11.274 | OpenStreetMap (Geofabrik-Auszug) | 4 | 6 | fertig | 
 | ✅ | 1420 | Welzheim | 11.264 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 1422 | Rutesheim | 11.258 | OpenStreetMap (Geofabrik-Auszug) | 13 | 17 | fertig | 
 | ✅ | 1423 | Isselburg | 11.251 | OpenStreetMap (Geofabrik-Auszug) | 5 | 5 | fertig | 
 | ✅ | 1424 | Cadolzburg | 11.250 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 1427 | Balve | 11.240 | OpenStreetMap (Geofabrik-Auszug) | 10 | 12 | fertig | 
 | ✅ | 1429 | Ochsenfurt | 11.219 | OpenStreetMap (Geofabrik-Auszug) | 8 | 11 | fertig | 
 | ✅ | 1430 | Mömbris | 11.202 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 1431 | Südheide | 11.182 | OpenStreetMap (Geofabrik-Auszug) | 4 | 7 | fertig | 
 | ✅ | 1432 | Kall | 11.180 | OpenStreetMap (Geofabrik-Auszug) | 20 | 26 | fertig | 
 | ✅ | 1433 | Grünwald | 11.179 | OpenStreetMap (Geofabrik-Auszug) | 5 | 6 | fertig | 
 | ✅ | 1434 | Riedlingen | 11.176 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 1435 | Raubling | 11.161 | OpenStreetMap (Geofabrik-Auszug) | 7 | 22 | fertig | 
 | ✅ | 1436 | Mülheim-Kärlich | 11.159 | OpenStreetMap (Geofabrik-Auszug) | 32 | 35 | fertig | 
 | ✅ | 1437 | Wittingen | 11.136 | OpenStreetMap (Geofabrik-Auszug) | 13 | 20 | fertig | 
 | ✅ | 1438 | Coswig (Anhalt) | 11.129 | OpenStreetMap (Geofabrik-Auszug) | 7 | 10 | fertig | 
 | ✅ | 1439 | Stollberg/Erzgeb. | 11.127 | OpenStreetMap (Geofabrik-Auszug) | 5 | 8 | fertig | 
 | ✅ | 1440 | Bannewitz | 11.122 | OpenStreetMap (Geofabrik-Auszug) | 3 | 5 | fertig | 
 | ✅ | 1441 | Bad Belzig | 11.118 | OpenStreetMap (Geofabrik-Auszug) | 5 | 15 | fertig | 
 | ✅ | 1442 | Niestetal | 11.118 | OpenStreetMap (Geofabrik-Auszug) | 13 | 13 | fertig | 
 | ✅ | 1443 | Herrsching a.Ammersee | 11.099 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 1444 | Herxheim bei Landau/Pfalz | 11.093 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 1445 | Denkendorf | 11.092 | OpenStreetMap (Geofabrik-Auszug) | 5 | 6 | fertig | 
 | ✅ | 1446 | Gengenbach | 11.081 | OpenStreetMap (Geofabrik-Auszug) | 20 | 29 | fertig | 
 | ✅ | 1447 | Schöningen | 11.078 | OpenStreetMap (Geofabrik-Auszug) | 1 | 4 | fertig | 
 | ✅ | 1448 | Rodenbach | 11.074 | OpenStreetMap (Geofabrik-Auszug) | 12 | 14 | fertig | 
 | ✅ | 1449 | Werther (Westf.) | 11.051 | OpenStreetMap (Geofabrik-Auszug) | 9 | 10 | fertig | 
 | ✅ | 1450 | Boizenburg/Elbe | 11.048 | OpenStreetMap (Geofabrik-Auszug) | 4 | 7 | fertig | 
 | ✅ | 1451 | Braunfels | 11.045 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 1453 | Höhenkirchen-Siegertsbrunn | 11.039 | OpenStreetMap (Geofabrik-Auszug) | 10 | 19 | fertig | 
 | ✅ | 1454 | Wustermark | 11.024 | OpenStreetMap (Geofabrik-Auszug) | 19 | 43 | fertig | 
 | ✅ | 1455 | Regen | 11.018 | OpenStreetMap (Geofabrik-Auszug) | 1 | 45 | fertig | 
 | ✅ | 1456 | Planegg | 11.007 | OpenStreetMap (Geofabrik-Auszug) | 8 | 10 | fertig | 
 | ✅ | 1457 | Burgkirchen a.d.Alz | 11.006 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 1458 | Wolgast | 10.991 | OpenStreetMap (Geofabrik-Auszug) | 5 | 13 | fertig | 
 | ✅ | 1459 | Lichtenau | 10.985 | OpenStreetMap (Geofabrik-Auszug) | 3 | 7 | fertig | 
 | ✅ | 1460 | Langgöns | 10.965 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 1461 | Egelsbach | 10.960 | OpenStreetMap (Geofabrik-Auszug) | 4 | 6 | fertig | 
 | ✅ | 1462 | Eisenberg | 10.955 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 1463 | Oelsnitz/Erzgeb. | 10.954 | OpenStreetMap (Geofabrik-Auszug) | 9 | 15 | fertig | 
 | ✅ | 1464 | Ebersbach-Neugersdorf | 10.937 | OpenStreetMap (Geofabrik-Auszug) | 3 | 6 | fertig | 
 | ✅ | 1465 | Haigerloch | 10.930 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 1466 | Prien a.Chiemsee | 10.915 | OpenStreetMap (Geofabrik-Auszug) | 13 | 13 | fertig | 
 | ✅ | 1467 | Neuhof | 10.893 | OpenStreetMap (Geofabrik-Auszug) | 12 | 12 | fertig | 
 | ✅ | 1469 | Ruppichteroth | 10.887 | OpenStreetMap (Geofabrik-Auszug) | 7 | 12 | fertig | 
 | ✅ | 1470 | Dallgow-Döberitz | 10.882 | OpenStreetMap (Geofabrik-Auszug) | 6 | 7 | fertig | 
 | ✅ | 1472 | Lichtenstein/Sa. | 10.875 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 1473 | Hasbergen | 10.874 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 1474 | Gottmadingen | 10.871 | OpenStreetMap (Geofabrik-Auszug) | 9 | 15 | fertig | 
 | ✅ | 1475 | Malente | 10.858 | OpenStreetMap (Geofabrik-Auszug) | 3 | 9 | fertig | 
 | ✅ | 1476 | Kleinblittersdorf | 10.856 | OpenStreetMap (Geofabrik-Auszug) | 4 | 6 | fertig | 
 | ✅ | 1477 | Steinbach (Taunus) | 10.856 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 1479 | Mandelbachtal | 10.844 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 1480 | Bad Staffelstein | 10.821 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 1481 | Adendorf | 10.818 | OpenStreetMap (Geofabrik-Auszug) | 42 | 59 | fertig | 
 | ✅ | 1482 | Grafschaft | 10.817 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 1483 | Schkopau | 10.815 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 1484 | Fürth | 10.810 | OpenStreetMap (Geofabrik-Auszug) | 11 | 18 | fertig | 
 | ✅ | 1485 | Lorch | 10.806 | OpenStreetMap (Geofabrik-Auszug) | 6 | 8 | fertig | 
 | ✅ | 1487 | Selfkant | 10.786 | OpenStreetMap (Geofabrik-Auszug) | 3 | 7 | fertig | 
 | ✅ | 1488 | Möglingen | 10.784 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 1489 | Herbolzheim | 10.783 | OpenStreetMap (Geofabrik-Auszug) | 7 | 7 | fertig | 
 | ✅ | 1490 | Nideggen | 10.764 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 1491 | Nordkirchen | 10.762 | OpenStreetMap (Geofabrik-Auszug) | 6 | 8 | fertig | 
 | ✅ | 1492 | Kenzingen | 10.748 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 1493 | Feldkirchen-Westerham | 10.742 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 1494 | Schwielowsee | 10.723 | OpenStreetMap (Geofabrik-Auszug) | 8 | 14 | fertig | 
 | ✅ | 1495 | Wildau | 10.717 | OpenStreetMap (Geofabrik-Auszug) | 22 | 41 | fertig | 
 | ✅ | 1496 | Hagen im Bremischen | 10.705 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 1497 | Diedorf | 10.699 | OpenStreetMap (Geofabrik-Auszug) | 9 | 10 | fertig | 
 | ✅ | 1499 | Karlsdorf-Neuthard | 10.693 | OpenStreetMap (Geofabrik-Auszug) | 3 | 5 | fertig | 
 | ✅ | 1501 | Meßstetten | 10.677 | OpenStreetMap (Geofabrik-Auszug) | 2 | 8 | fertig | 
 | ✅ | 1502 | Dießen am Ammersee | 10.673 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 1503 | Burgau | 10.670 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 1504 | Weinböhla | 10.659 | OpenStreetMap (Geofabrik-Auszug) | 8 | 17 | fertig | 
 | ✅ | 1505 | Bad Iburg | 10.652 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 1506 | Taufkirchen (Vils) | 10.652 | OpenStreetMap (Geofabrik-Auszug) | 1 | 4 | fertig | 
 | ✅ | 1507 | Böhl-Iggelheim | 10.645 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 1508 | Plankstadt | 10.644 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 1509 | Schorfheide | 10.632 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 1511 | Bischofswerda | 10.576 | OpenStreetMap (Geofabrik-Auszug) | 6 | 8 | fertig | 
 | ✅ | 1512 | Donzdorf | 10.568 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 1513 | Emsbüren | 10.559 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 1514 | Stephanskirchen | 10.558 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 1515 | Morsbach | 10.555 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 1516 | Hüttenberg | 10.550 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 1517 | Morbach | 10.542 | OpenStreetMap (Geofabrik-Auszug) | 13 | 15 | fertig | 
 | ✅ | 1518 | Felsberg | 10.535 | OpenStreetMap (Geofabrik-Auszug) | 4 | 6 | fertig | 
 | ✅ | 1519 | Weingarten (Baden) | 10.534 | OpenStreetMap (Geofabrik-Auszug) | 10 | 14 | fertig | 
 | ✅ | 1520 | Gronau (Leine) | 10.527 | OpenStreetMap (Geofabrik-Auszug) | 9 | 10 | fertig | 
 | ✅ | 1521 | Schönwalde-Glien | 10.523 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 1523 | Nauheim | 10.496 | OpenStreetMap (Geofabrik-Auszug) | 13 | 14 | fertig | 
 | ✅ | 1525 | Nossen | 10.486 | OpenStreetMap (Geofabrik-Auszug) | 4 | 5 | fertig | 
 | ✅ | 1527 | Schalksmühle | 10.463 | OpenStreetMap (Geofabrik-Auszug) | 9 | 12 | fertig | 
 | ✅ | 1528 | Wald-Michelbach | 10.455 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 1529 | Bogen | 10.453 | OpenStreetMap (Geofabrik-Auszug) | 6 | 15 | fertig | 
 | ✅ | 1530 | Langenzenn | 10.438 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 1533 | Aulendorf | 10.417 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 1534 | Büdelsdorf | 10.417 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 1535 | Burgstädt | 10.413 | OpenStreetMap (Geofabrik-Auszug) | 5 | 6 | fertig | 
 | ✅ | 1536 | Steinen | 10.409 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 1538 | Bad Wildbad | 10.388 | OpenStreetMap (Geofabrik-Auszug) | 7 | 16 | fertig | 
 | ✅ | 1539 | Klipphausen | 10.384 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 1540 | Werlte | 10.382 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 1542 | Hünstetten | 10.380 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 1543 | Appenweier | 10.374 | OpenStreetMap (Geofabrik-Auszug) | 17 | 26 | fertig | 
 | ✅ | 1544 | Betzdorf | 10.363 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 1545 | Braunsbedra | 10.352 | OpenStreetMap (Geofabrik-Auszug) | 3 | 14 | fertig | 
 | ✅ | 1546 | Schauenburg | 10.352 | OpenStreetMap (Geofabrik-Auszug) | 4 | 6 | fertig | 
 | ✅ | 1547 | Kirchseeon | 10.342 | OpenStreetMap (Geofabrik-Auszug) | 5 | 7 | fertig | 
 | ✅ | 1548 | Goldenstedt | 10.313 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 1549 | Anröchte | 10.304 | OpenStreetMap (Geofabrik-Auszug) | 2 | 7 | fertig | 
 | ✅ | 1551 | Rüthen | 10.290 | OpenStreetMap (Geofabrik-Auszug) | 4 | 4 | fertig | 
 | ✅ | 1553 | Markt Indersdorf | 10.283 | OpenStreetMap (Geofabrik-Auszug) | 2 | 6 | fertig | 
 | ✅ | 1554 | Friedeburg | 10.280 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 1555 | Altenberge | 10.278 | OpenStreetMap (Geofabrik-Auszug) | 10 | 12 | fertig | 
 | ✅ | 1556 | Kirchzarten | 10.266 | OpenStreetMap (Geofabrik-Auszug) | 7 | 258 | fertig | 
 | ✅ | 1557 | Simbach a.Inn | 10.261 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 1559 | Mörlenbach | 10.245 | OpenStreetMap (Geofabrik-Auszug) | 2 | 5 | fertig | 
 | ✅ | 1560 | Steinfeld (Oldenburg) | 10.228 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 1561 | Schleusingen | 10.225 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 1562 | Birkenfeld | 10.224 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 1563 | Lollar | 10.222 | OpenStreetMap (Geofabrik-Auszug) | 4 | 6 | fertig | 
 | ✅ | 1565 | Tangermünde | 10.212 | OpenStreetMap (Geofabrik-Auszug) | 15 | 16 | fertig | 
 | ✅ | 1567 | Königsbach-Stein | 10.201 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 1568 | Wendeburg | 10.199 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 1569 | Kirkel | 10.191 | OpenStreetMap (Geofabrik-Auszug) | 2 | 6 | fertig | 
 | ✅ | 1570 | Steinau an der Straße | 10.189 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 1572 | Flöha | 10.183 | OpenStreetMap (Geofabrik-Auszug) | 14 | 28 | fertig | 
 | ✅ | 1574 | Niebüll | 10.173 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 1575 | Grevesmühlen | 10.167 | OpenStreetMap (Geofabrik-Auszug) | 5 | 8 | fertig | 
 | ✅ | 1577 | Kirchlinteln | 10.148 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 1578 | Mengen | 10.148 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 1579 | Meuselwitz | 10.148 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 1580 | Bestwig | 10.147 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 1581 | Lenggries | 10.147 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 1583 | Willstätt | 10.124 | OpenStreetMap (Geofabrik-Auszug) | 4 | 5 | fertig | 
 | ✅ | 1584 | Tangerhütte | 10.108 | OpenStreetMap (Geofabrik-Auszug) | 17 | 24 | fertig | 
 | ✅ | 1585 | Merchweiler | 10.099 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 1587 | Gommern | 10.090 | OpenStreetMap (Geofabrik-Auszug) | 33 | 56 | fertig | 
 | ✅ | 1588 | Hilter am Teutoburger Wald | 10.067 | OpenStreetMap (Geofabrik-Auszug) | 4 | 4 | fertig | 
 | ✅ | 1589 | Rödinghausen | 10.064 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 1590 | Oelsnitz/Vogtl. | 10.062 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 1592 | Bobenheim-Roxheim | 10.045 | OpenStreetMap (Geofabrik-Auszug) | 11 | 24 | fertig | 
 | ✅ | 1593 | Bad Ems | 10.030 | OpenStreetMap (Geofabrik-Auszug) | 6 | 16 | fertig | 
 | ✅ | 1594 | Schwaikheim | 10.028 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 1596 | Nordwalde | 10.024 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 1597 | Querfurt | 10.007 | OpenStreetMap (Geofabrik-Auszug) | 6 | 9 | fertig | 
 | ✅ | 1598 | Blumberg | 10.003 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 1599 | Dettingen an der Erms | 9.993 | OpenStreetMap (Geofabrik-Auszug) | 4 | 4 | fertig | 
 | ✅ | 1600 | Ammersbek | 9.991 | OpenStreetMap (Geofabrik-Auszug) | 3 | 7 | fertig | 
 | ✅ | 1601 | Ohrdruf | 9.991 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 1602 | Wildberg | 9.977 | OpenStreetMap (Geofabrik-Auszug) | 2 | 14 | fertig | 
 | ✅ | 1603 | Weil im Schönbuch | 9.970 | OpenStreetMap (Geofabrik-Auszug) | 6 | 37 | fertig | 
 | ✅ | 1604 | Münchberg | 9.969 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 1605 | Kaufering | 9.957 | OpenStreetMap (Geofabrik-Auszug) | 16 | 20 | fertig | 
 | ✅ | 1606 | Olbernhau | 9.953 | OpenStreetMap (Geofabrik-Auszug) | 13 | 14 | fertig | 
 | ✅ | 1607 | Nohfelden | 9.949 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 1608 | Rehburg-Loccum | 9.942 | OpenStreetMap (Geofabrik-Auszug) | 1 | 4 | fertig | 
 | ✅ | 1609 | Bad Orb | 9.934 | OpenStreetMap (Geofabrik-Auszug) | 9 | 17 | fertig | 
 | ✅ | 1610 | Tutzing | 9.926 | OpenStreetMap (Geofabrik-Auszug) | 8 | 11 | fertig | 
 | ✅ | 1611 | Gudensberg | 9.925 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 1613 | Neuried | 9.919 | OpenStreetMap (Geofabrik-Auszug) | 1 | 4 | fertig | 
 | ✅ | 1614 | Ottendorf-Okrilla | 9.909 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 1615 | Walzbachtal | 9.904 | OpenStreetMap (Geofabrik-Auszug) | 7 | 9 | fertig | 
 | ✅ | 1618 | Biebertal | 9.893 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 1621 | Rüdesheim am Rhein | 9.879 | OpenStreetMap (Geofabrik-Auszug) | 2 | 12 | fertig | 
 | ✅ | 1622 | Elchingen | 9.869 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 1623 | Altenholz | 9.865 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 1624 | Niddatal | 9.861 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 1625 | Südlohn | 9.861 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 1626 | Goldbach | 9.857 | OpenStreetMap (Geofabrik-Auszug) | 9 | 9 | fertig | 
 | ✅ | 1628 | Emmerthal | 9.834 | OpenStreetMap (Geofabrik-Auszug) | 4 | 6 | fertig | 
 | ✅ | 1631 | Nersingen | 9.827 | OpenStreetMap (Geofabrik-Auszug) | 1 | 12 | fertig | 
 | ✅ | 1632 | Ilsfeld | 9.826 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 1633 | Pliezhausen | 9.821 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 1634 | Hünfelden | 9.818 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 1636 | Eschenburg | 9.795 | OpenStreetMap (Geofabrik-Auszug) | 4 | 5 | fertig | 
 | ✅ | 1637 | Kösching | 9.788 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 1639 | Everswinkel | 9.772 | OpenStreetMap (Geofabrik-Auszug) | 17 | 25 | fertig | 
 | ✅ | 1640 | Plüderhausen | 9.766 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 1641 | Höchst i.Odw. | 9.744 | OpenStreetMap (Geofabrik-Auszug) | 3 | 8 | fertig | 
 | ✅ | 1642 | Visbek | 9.735 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 1644 | Erlenbach a.Main | 9.717 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 1646 | Bad Frankenhausen/Kyffhäuser | 9.715 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 1647 | Oldenburg in Holstein | 9.711 | OpenStreetMap (Geofabrik-Auszug) | 32 | 52 | fertig | 
 | ✅ | 1648 | Nieder-Olm | 9.703 | OpenStreetMap (Geofabrik-Auszug) | 7 | 9 | fertig | 
 | ✅ | 1649 | Trebbin | 9.700 | OpenStreetMap (Geofabrik-Auszug) | 4 | 4 | fertig | 
 | ✅ | 1650 | Klötze | 9.699 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 1651 | Laubach | 9.699 | OpenStreetMap (Geofabrik-Auszug) | 13 | 29 | fertig | 
 | ✅ | 1652 | Heilsbronn | 9.692 | OpenStreetMap (Geofabrik-Auszug) | 11 | 16 | fertig | 
 | ✅ | 1653 | Linsengericht | 9.679 | OpenStreetMap (Geofabrik-Auszug) | 13 | 40 | fertig | 
 | ✅ | 1654 | Veitshöchheim | 9.671 | OpenStreetMap (Geofabrik-Auszug) | 7 | 16 | fertig | 
 | ✅ | 1656 | Roßtal | 9.663 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 1657 | Brandis | 9.654 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 1658 | Osthofen | 9.650 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 1659 | Hirschberg an der Bergstraße | 9.647 | OpenStreetMap (Geofabrik-Auszug) | 4 | 5 | fertig | 
 | ✅ | 1660 | Schotten | 9.641 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 1662 | Altlandsberg | 9.630 | OpenStreetMap (Geofabrik-Auszug) | 4 | 5 | fertig | 
 | ✅ | 1663 | Bad Breisig | 9.623 | OpenStreetMap (Geofabrik-Auszug) | 12 | 14 | fertig | 
 | ✅ | 1664 | Aichtal | 9.599 | OpenStreetMap (Geofabrik-Auszug) | 8 | 8 | fertig | 
 | ✅ | 1665 | Demmin | 9.583 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 1666 | Birkenau | 9.565 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 1667 | Oberhausen-Rheinhausen | 9.565 | OpenStreetMap (Geofabrik-Auszug) | 5 | 8 | fertig | 
 | ✅ | 1668 | Höchberg | 9.564 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 1669 | Schulzendorf | 9.562 | OpenStreetMap (Geofabrik-Auszug) | 5 | 5 | fertig | 
 | ✅ | 1670 | Wettin-Löbejün | 9.554 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 1671 | Oberharz am Brocken | 9.547 | OpenStreetMap (Geofabrik-Auszug) | 7 | 9 | fertig | 
 | ✅ | 1672 | Runkel | 9.543 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 1673 | Kißlegg | 9.530 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 1674 | Magstadt | 9.513 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 1676 | Bisingen | 9.506 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 1677 | Perl | 9.503 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 1678 | Töging a.Inn | 9.496 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 1679 | Wertingen | 9.486 | OpenStreetMap (Geofabrik-Auszug) | 3 | 6 | fertig | 
 | ✅ | 1680 | Heiligenhafen | 9.484 | OpenStreetMap (Geofabrik-Auszug) | 4 | 8 | fertig | 
 | ✅ | 1683 | Großhansdorf | 9.469 | OpenStreetMap (Geofabrik-Auszug) | 5 | 7 | fertig | 
 | ✅ | 1685 | Bockenem | 9.465 | OpenStreetMap (Geofabrik-Auszug) | 2 | 5 | fertig | 
 | ✅ | 1686 | Visselhövede | 9.458 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 1687 | Zorneding | 9.452 | OpenStreetMap (Geofabrik-Auszug) | 16 | 24 | fertig | 
 | ✅ | 1689 | Oberzent | 9.429 | OpenStreetMap (Geofabrik-Auszug) | 2 | 11 | fertig | 
 | ✅ | 1690 | Sebnitz | 9.421 | OpenStreetMap (Geofabrik-Auszug) | 11 | 17 | fertig | 
 | ✅ | 1691 | Wilkau-Haßlau | 9.418 | OpenStreetMap (Geofabrik-Auszug) | 10 | 14 | fertig | 
 | ✅ | 1692 | Wölfersheim | 9.417 | OpenStreetMap (Geofabrik-Auszug) | 10 | 10 | fertig | 
 | ✅ | 1693 | Höhr-Grenzhausen | 9.415 | OpenStreetMap (Geofabrik-Auszug) | 2 | 5 | fertig | 
 | ✅ | 1694 | Ilsenburg (Harz) | 9.414 | OpenStreetMap (Geofabrik-Auszug) | 7 | 11 | fertig | 
 | ✅ | 1696 | Ehringshausen | 9.399 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 1697 | Werneuchen | 9.397 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 1699 | Giesen | 9.382 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 1700 | Nuthetal | 9.376 | OpenStreetMap (Geofabrik-Auszug) | 1 | 4 | fertig | 
 | ✅ | 1702 | Osterburg (Altmark) | 9.371 | OpenStreetMap (Geofabrik-Auszug) | 17 | 17 | fertig | 
 | ✅ | 1704 | Ochsenhausen | 9.358 | OpenStreetMap (Geofabrik-Auszug) | 5 | 7 | fertig | 
 | ✅ | 1705 | Essen (Oldenburg) | 9.356 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 1706 | Miltenberg | 9.351 | OpenStreetMap (Geofabrik-Auszug) | 6 | 8 | fertig | 
 | ✅ | 1707 | Großbeeren | 9.344 | OpenStreetMap (Geofabrik-Auszug) | 2 | 5 | fertig | 
 | ✅ | 1708 | Kandel | 9.337 | OpenStreetMap (Geofabrik-Auszug) | 4 | 6 | fertig | 
 | ✅ | 1709 | Laufenburg (Baden) | 9.335 | OpenStreetMap (Geofabrik-Auszug) | 32 | 41 | fertig | 
 | ✅ | 1711 | Worpswede | 9.328 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 1712 | Wallerfangen | 9.324 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 1713 | Schmitten im Taunus | 9.323 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 1715 | March | 9.309 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 1717 | Zwenkau | 9.305 | OpenStreetMap (Geofabrik-Auszug) | 2 | 5 | fertig | 
 | ✅ | 1719 | Bad Liebenzell | 9.301 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 1720 | Oberstdorf | 9.279 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 1721 | Ehningen | 9.277 | OpenStreetMap (Geofabrik-Auszug) | 7 | 11 | fertig | 
 | ✅ | 1722 | Urbach | 9.277 | OpenStreetMap (Geofabrik-Auszug) | 4 | 7 | fertig | 
 | ✅ | 1723 | Alsbach-Hähnlein | 9.273 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 1724 | Schlitz | 9.271 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 1725 | Wehrheim | 9.271 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 1726 | Mücke | 9.267 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 1728 | Kolkwitz | 9.265 | OpenStreetMap (Geofabrik-Auszug) | 4 | 4 | fertig | 
 | ✅ | 1733 | Salzhemmendorf | 9.233 | OpenStreetMap (Geofabrik-Auszug) | 2 | 5 | fertig | 
 | ✅ | 1734 | Lügde | 9.232 | OpenStreetMap (Geofabrik-Auszug) | 2 | 5 | fertig | 
 | ✅ | 1735 | Elsenfeld | 9.225 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 1736 | Kemberg | 9.217 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 1738 | Hohenmölsen | 9.211 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 1739 | Ebsdorfergrund | 9.207 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 1740 | Ilvesheim | 9.207 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 1741 | Luckau | 9.203 | OpenStreetMap (Geofabrik-Auszug) | 6 | 12 | fertig | 
 | ✅ | 1742 | Frickenhausen | 9.201 | OpenStreetMap (Geofabrik-Auszug) | 4 | 4 | fertig | 
 | ✅ | 1743 | Hilzingen | 9.196 | OpenStreetMap (Geofabrik-Auszug) | 3 | 8 | fertig | 
 | ✅ | 1744 | Hürtgenwald | 9.196 | OpenStreetMap (Geofabrik-Auszug) | 5 | 7 | fertig | 
 | ✅ | 1745 | Storkow (Mark) | 9.196 | OpenStreetMap (Geofabrik-Auszug) | 5 | 7 | fertig | 
 | ✅ | 1747 | Gäufelden | 9.181 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 1749 | Lüchow (Wendland) | 9.170 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 1751 | Altenbeken | 9.161 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 1752 | Bleckede | 9.154 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 1754 | Aschheim | 9.149 | OpenStreetMap (Geofabrik-Auszug) | 4 | 16 | fertig | 
 | ✅ | 1755 | Wangerland | 9.149 | OpenStreetMap (Geofabrik-Auszug) | 10 | 12 | fertig | 
 | ✅ | 1757 | Nittenau | 9.145 | OpenStreetMap (Geofabrik-Auszug) | 7 | 14 | fertig | 
 | ✅ | 1758 | Dassel | 9.142 | OpenStreetMap (Geofabrik-Auszug) | 3 | 5 | fertig | 
 | ✅ | 1759 | Barleben | 9.137 | OpenStreetMap (Geofabrik-Auszug) | 20 | 31 | fertig | 
 | ✅ | 1761 | Steinbach-Hallenberg | 9.130 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 1763 | Adelsdorf | 9.126 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 1764 | Schaafheim | 9.113 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 1765 | Reinfeld (Holstein) | 9.107 | OpenStreetMap (Geofabrik-Auszug) | 5 | 6 | fertig | 
 | ✅ | 1766 | Tecklenburg | 9.098 | OpenStreetMap (Geofabrik-Auszug) | 13 | 15 | fertig | 
 | ✅ | 1767 | Florstadt | 9.097 | OpenStreetMap (Geofabrik-Auszug) | 7 | 7 | fertig | 
 | ✅ | 1768 | Dielheim | 9.094 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 1769 | Gomaringen | 9.080 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 1770 | Biblis | 9.076 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 1771 | Fehrbellin | 9.076 | OpenStreetMap (Geofabrik-Auszug) | 2 | 8 | fertig | 
 | ✅ | 1773 | Vallendar | 9.062 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 1774 | Zwiesel | 9.059 | OpenStreetMap (Geofabrik-Auszug) | 8 | 10 | fertig | 
 | ✅ | 1775 | Titz | 9.052 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 1776 | Rehau | 9.045 | OpenStreetMap (Geofabrik-Auszug) | 3 | 6 | fertig | 
 | ✅ | 1777 | Bad Schussenried | 9.044 | OpenStreetMap (Geofabrik-Auszug) | 3 | 10 | fertig | 
 | ✅ | 1778 | Mendig | 9.034 | OpenStreetMap (Geofabrik-Auszug) | 1 | 4 | fertig | 
 | ✅ | 1779 | Hohenbrunn | 9.032 | OpenStreetMap (Geofabrik-Auszug) | 5 | 5 | fertig | 
 | ✅ | 1780 | Weißenthurm | 9.020 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 1781 | Kusterdingen | 9.016 | OpenStreetMap (Geofabrik-Auszug) | 3 | 6 | fertig | 
 | ✅ | 1784 | Neuötting | 8.991 | OpenStreetMap (Geofabrik-Auszug) | 5 | 5 | fertig | 
 | ✅ | 1785 | Waldheim | 8.989 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 1787 | Bad Gandersheim | 8.983 | OpenStreetMap (Geofabrik-Auszug) | 2 | 5 | fertig | 
 | ✅ | 1788 | Grünheide (Mark) | 8.978 | OpenStreetMap (Geofabrik-Auszug) | 9 | 36 | fertig | 
 | ✅ | 1789 | Bruchhausen-Vilsen | 8.970 | OpenStreetMap (Geofabrik-Auszug) | 4 | 6 | fertig | 
 | ✅ | 1790 | Wunsiedel | 8.970 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 1792 | Niesky | 8.956 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 1793 | Bad Griesbach i.Rottal | 8.952 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 1794 | Nittendorf | 8.920 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 1795 | Obernkirchen | 8.912 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 1796 | Nettersheim | 8.902 | OpenStreetMap (Geofabrik-Auszug) | 4 | 10 | fertig | 
 | ✅ | 1798 | Torgelow | 8.899 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 1800 | Bad Laer | 8.895 | OpenStreetMap (Geofabrik-Auszug) | 2 | 8 | fertig | 
 | ✅ | 1801 | Sassnitz | 8.893 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 1803 | Liederbach am Taunus | 8.887 | OpenStreetMap (Geofabrik-Auszug) | 5 | 7 | fertig | 
 | ✅ | 1804 | Gerstungen | 8.884 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 1805 | Bad Lauchstädt | 8.883 | OpenStreetMap (Geofabrik-Auszug) | 2 | 6 | fertig | 
 | ✅ | 1806 | Elze | 8.880 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 1808 | Wetter (Hessen) | 8.867 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 1809 | Kabelsketal | 8.859 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 1811 | Neuenkirchen-Vörden | 8.858 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 1812 | Bockhorn | 8.851 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 1813 | Borgholzhausen | 8.847 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 1815 | Sulzbach (Taunus) | 8.846 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 1816 | Plön | 8.844 | OpenStreetMap (Geofabrik-Auszug) | 5 | 12 | fertig | 
 | ✅ | 1819 | Südharz | 8.829 | OpenStreetMap (Geofabrik-Auszug) | 6 | 11 | fertig | 
 | ✅ | 1820 | Breckerfeld | 8.816 | OpenStreetMap (Geofabrik-Auszug) | 6 | 6 | fertig | 
 | ✅ | 1821 | Kappeln | 8.812 | OpenStreetMap (Geofabrik-Auszug) | 6 | 15 | fertig | 
 | ✅ | 1823 | Brand-Erbisdorf | 8.797 | OpenStreetMap (Geofabrik-Auszug) | 7 | 14 | fertig | 
 | ✅ | 1824 | Neuried | 8.795 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 1825 | Roetgen | 8.786 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 1826 | Hallstadt | 8.781 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 1827 | Obertraubling | 8.779 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 1828 | Naunhof | 8.776 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 1829 | Heek | 8.773 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 1830 | Ueckermünde | 8.768 | OpenStreetMap (Geofabrik-Auszug) | 3 | 5 | fertig | 
 | ✅ | 1831 | Schwaig b.Nürnberg | 8.761 | OpenStreetMap (Geofabrik-Auszug) | 7 | 19 | fertig | 
 | ✅ | 1832 | Zschopau | 8.760 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 1835 | Waldenbuch | 8.750 | OpenStreetMap (Geofabrik-Auszug) | 7 | 11 | fertig | 
 | ✅ | 1837 | Rimbach | 8.738 | OpenStreetMap (Geofabrik-Auszug) | 7 | 11 | fertig | 
 | ✅ | 1838 | Langweid a.Lech | 8.737 | OpenStreetMap (Geofabrik-Auszug) | 9 | 9 | fertig | 
 | ✅ | 1839 | Dörverden | 8.735 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 1840 | Herzberg (Elster) | 8.732 | OpenStreetMap (Geofabrik-Auszug) | 4 | 7 | fertig | 
 | ✅ | 1841 | Kressbronn am Bodensee | 8.727 | OpenStreetMap (Geofabrik-Auszug) | 5 | 5 | fertig | 
 | ✅ | 1842 | Bad Bergzabern | 8.724 | OpenStreetMap (Geofabrik-Auszug) | 16 | 19 | fertig | 
 | ✅ | 1844 | Eslohe (Sauerland) | 8.717 | OpenStreetMap (Geofabrik-Auszug) | 10 | 11 | fertig | 
 | ✅ | 1845 | Großenlüder | 8.714 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 1846 | Kandern | 8.710 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 1847 | Hemmoor | 8.709 | OpenStreetMap (Geofabrik-Auszug) | 6 | 9 | fertig | 
 | ✅ | 1848 | Bellheim | 8.706 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 1851 | Keltern | 8.693 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 1853 | Efringen-Kirchen | 8.683 | OpenStreetMap (Geofabrik-Auszug) | 8 | 12 | fertig | 
 | ✅ | 1854 | Möckmühl | 8.680 | OpenStreetMap (Geofabrik-Auszug) | 5 | 8 | fertig | 
 | ✅ | 1855 | Sinntal | 8.680 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 1856 | Wissen | 8.679 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 1857 | Meßkirch | 8.676 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 1858 | Rauenberg | 8.675 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 1859 | Weilmünster | 8.674 | OpenStreetMap (Geofabrik-Auszug) | 4 | 5 | fertig | 
 | ✅ | 1860 | Untergruppenbach | 8.670 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 1861 | Gleichen | 8.663 | OpenStreetMap (Geofabrik-Auszug) | 4 | 6 | fertig | 
 | ✅ | 1862 | Furth im Wald | 8.659 | OpenStreetMap (Geofabrik-Auszug) | 4 | 9 | fertig | 
 | ✅ | 1865 | Sande | 8.619 | OpenStreetMap (Geofabrik-Auszug) | 4 | 4 | fertig | 
 | ✅ | 1866 | Pullach i.Isartal | 8.601 | OpenStreetMap (Geofabrik-Auszug) | 7 | 8 | fertig | 
 | ✅ | 1867 | Sülzetal | 8.577 | OpenStreetMap (Geofabrik-Auszug) | 23 | 31 | fertig | 
 | ✅ | 1868 | Obernburg a.Main | 8.575 | OpenStreetMap (Geofabrik-Auszug) | 8 | 13 | fertig | 
 | ✅ | 1869 | Schladen-Werla | 8.566 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 1870 | Fürstenzell | 8.565 | OpenStreetMap (Geofabrik-Auszug) | 3 | 5 | fertig | 
 | ✅ | 1871 | Schnaittach | 8.561 | OpenStreetMap (Geofabrik-Auszug) | 4 | 6 | fertig | 
 | ✅ | 1873 | Allersberg | 8.550 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 1875 | Wörrstadt | 8.515 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 1877 | Volkach | 8.512 | OpenStreetMap (Geofabrik-Auszug) | 4 | 5 | fertig | 
 | ✅ | 1878 | Biederitz | 8.508 | OpenStreetMap (Geofabrik-Auszug) | 18 | 30 | fertig | 
 | ✅ | 1880 | Dornburg | 8.506 | OpenStreetMap (Geofabrik-Auszug) | 1 | 8 | fertig | 
 | ✅ | 1881 | Geratal | 8.504 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 1882 | Schleiz | 8.501 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 1883 | Dietmannsried | 8.498 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 1885 | Garching a.d.Alz | 8.491 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 1888 | Nonnweiler | 8.484 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 1890 | Fuldabrück | 8.474 | OpenStreetMap (Geofabrik-Auszug) | 13 | 14 | fertig | 
 | ✅ | 1891 | Seegebiet Mansfelder Land | 8.474 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 1892 | Rülzheim | 8.472 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 1893 | Neuhaus am Rennweg | 8.468 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 1894 | Staufen im Breisgau | 8.459 | OpenStreetMap (Geofabrik-Auszug) | 12 | 17 | fertig | 
 | ✅ | 1895 | Kahl a.Main | 8.457 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 1896 | Doberlug-Kirchhain | 8.438 | OpenStreetMap (Geofabrik-Auszug) | 3 | 5 | fertig | 
 | ✅ | 1897 | Blankenheim | 8.434 | OpenStreetMap (Geofabrik-Auszug) | 14 | 28 | fertig | 
 | ✅ | 1898 | Ortenberg | 8.423 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 1899 | Ballenstedt | 8.422 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 1900 | Furtwangen im Schwarzwald | 8.420 | OpenStreetMap (Geofabrik-Auszug) | 16 | 18 | fertig | 
 | ✅ | 1902 | Schierling | 8.395 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 1903 | Möser | 8.386 | OpenStreetMap (Geofabrik-Auszug) | 5 | 7 | fertig | 
 | ✅ | 1904 | Woltersdorf | 8.386 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 1905 | Bad Rothenfelde | 8.385 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 1906 | Heikendorf | 8.372 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 1907 | Reichenbach an der Fils | 8.362 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 1908 | Viechtach | 8.361 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 1909 | Kleinostheim | 8.360 | OpenStreetMap (Geofabrik-Auszug) | 14 | 23 | fertig | 
 | ✅ | 1910 | Großräschen | 8.355 | OpenStreetMap (Geofabrik-Auszug) | 3 | 6 | fertig | 
 | ✅ | 1911 | Friedland | 8.332 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 1912 | Landstuhl | 8.332 | OpenStreetMap (Geofabrik-Auszug) | 6 | 7 | fertig | 
 | ✅ | 1913 | Niederwerrn | 8.331 | OpenStreetMap (Geofabrik-Auszug) | 14 | 18 | fertig | 
 | ✅ | 1914 | Timmendorfer Strand | 8.320 | OpenStreetMap (Geofabrik-Auszug) | 14 | 21 | fertig | 
 | ✅ | 1916 | Siegsdorf | 8.314 | OpenStreetMap (Geofabrik-Auszug) | 4 | 11 | fertig | 
 | ✅ | 1917 | Stadtilm | 8.312 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 1918 | Langenberg | 8.311 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 1920 | Herrieden | 8.295 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 1922 | Staufenberg | 8.291 | OpenStreetMap (Geofabrik-Auszug) | 4 | 9 | fertig | 
 | ✅ | 1923 | Meine | 8.286 | OpenStreetMap (Geofabrik-Auszug) | 5 | 7 | fertig | 
 | ✅ | 1926 | Heroldsberg | 8.281 | OpenStreetMap (Geofabrik-Auszug) | 3 | 5 | fertig | 
 | ✅ | 1927 | Willebadessen | 8.281 | OpenStreetMap (Geofabrik-Auszug) | 3 | 7 | fertig | 
 | ✅ | 1929 | Unterwellenborn | 8.261 | OpenStreetMap (Geofabrik-Auszug) | 2 | 10 | fertig | 
 | ✅ | 1930 | Hainichen | 8.255 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 1931 | Colditz | 8.249 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 1933 | Lützen | 8.242 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 1934 | Schwarzenbruck | 8.241 | OpenStreetMap (Geofabrik-Auszug) | 8 | 18 | fertig | 
 | ✅ | 1935 | Biebergemünd | 8.240 | OpenStreetMap (Geofabrik-Auszug) | 10 | 12 | fertig | 
 | ✅ | 1936 | Borsdorf | 8.229 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 1937 | Kuppenheim | 8.224 | OpenStreetMap (Geofabrik-Auszug) | 17 | 23 | fertig | 
 | ✅ | 1938 | Bersenbrück | 8.221 | OpenStreetMap (Geofabrik-Auszug) | 1 | 6 | fertig | 
 | ✅ | 1939 | Moritzburg | 8.217 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 1940 | Wachtendonk | 8.217 | OpenStreetMap (Geofabrik-Auszug) | 5 | 5 | fertig | 
 | ✅ | 1941 | Hermsdorf | 8.210 | OpenStreetMap (Geofabrik-Auszug) | 5 | 15 | fertig | 
 | ✅ | 1942 | Uhldingen-Mühlhofen | 8.210 | OpenStreetMap (Geofabrik-Auszug) | 6 | 11 | fertig | 
 | ✅ | 1943 | Grafenau | 8.203 | OpenStreetMap (Geofabrik-Auszug) | 19 | 27 | fertig | 
 | ✅ | 1944 | Bad Feilnbach | 8.198 | OpenStreetMap (Geofabrik-Auszug) | 8 | 10 | fertig | 
 | ✅ | 1945 | Simmern/Hunsrück | 8.195 | OpenStreetMap (Geofabrik-Auszug) | 12 | 14 | fertig | 
 | ✅ | 1946 | Dornstetten | 8.194 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 1948 | Hohberg | 8.186 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 1950 | Mücheln (Geiseltal) | 8.185 | OpenStreetMap (Geofabrik-Auszug) | 5 | 8 | fertig | 
 | ✅ | 1952 | Lahnau | 8.181 | OpenStreetMap (Geofabrik-Auszug) | 6 | 9 | fertig | 
 | ✅ | 1953 | Lauter-Bernsbach | 8.179 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 1954 | Aspach | 8.178 | OpenStreetMap (Geofabrik-Auszug) | 5 | 5 | fertig | 
 | ✅ | 1955 | Hausham | 8.177 | OpenStreetMap (Geofabrik-Auszug) | 6 | 17 | fertig | 
 | ✅ | 1958 | Neuenbürg | 8.162 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 1960 | Bad Sooden-Allendorf | 8.141 | OpenStreetMap (Geofabrik-Auszug) | 1 | 10 | fertig | 
 | ✅ | 1961 | Neuendettelsau | 8.138 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 1962 | Lauchringen | 8.137 | OpenStreetMap (Geofabrik-Auszug) | 5 | 7 | fertig | 
 | ✅ | 1963 | Zell am Harmersbach | 8.129 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 1965 | Helmbrechts | 8.125 | OpenStreetMap (Geofabrik-Auszug) | 4 | 8 | fertig | 
 | ✅ | 1966 | Bönnigheim | 8.123 | OpenStreetMap (Geofabrik-Auszug) | 4 | 4 | fertig | 
 | ✅ | 1967 | Bad Endorf | 8.117 | OpenStreetMap (Geofabrik-Auszug) | 3 | 5 | fertig | 
 | ✅ | 1970 | Schieder-Schwalenberg | 8.098 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 1975 | Kühlungsborn | 8.088 | OpenStreetMap (Geofabrik-Auszug) | 12 | 32 | fertig | 
 | ✅ | 1977 | Elz | 8.083 | OpenStreetMap (Geofabrik-Auszug) | 2 | 5 | fertig | 
 | ✅ | 1978 | Forst | 8.083 | OpenStreetMap (Geofabrik-Auszug) | 4 | 18 | fertig | 
 | ✅ | 1979 | Nierstein | 8.078 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 1980 | Sauerlach | 8.063 | OpenStreetMap (Geofabrik-Auszug) | 4 | 5 | fertig | 
 | ✅ | 1981 | Hüfingen | 8.060 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 1982 | Teublitz | 8.060 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 1983 | Penig | 8.059 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 1984 | Premnitz | 8.057 | OpenStreetMap (Geofabrik-Auszug) | 5 | 5 | fertig | 
 | ✅ | 1985 | Neunkirchen a.Brand | 8.056 | OpenStreetMap (Geofabrik-Auszug) | 30 | 50 | fertig | 
 | ✅ | 1988 | Bad Lausick | 8.043 | OpenStreetMap (Geofabrik-Auszug) | 11 | 12 | fertig | 
 | ✅ | 1989 | Salach | 8.042 | OpenStreetMap (Geofabrik-Auszug) | 2 | 5 | fertig | 
 | ✅ | 1990 | Amt Wachsenburg | 8.041 | OpenStreetMap (Geofabrik-Auszug) | 5 | 12 | fertig | 
 | ✅ | 1991 | Meinersen | 8.038 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 1994 | Haibach | 8.019 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 1995 | Jettingen | 8.012 | OpenStreetMap (Geofabrik-Auszug) | 7 | 9 | fertig | 
 | ✅ | 1998 | Bad Sulza | 8.001 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 1999 | Beeskow | 7.998 | OpenStreetMap (Geofabrik-Auszug) | 5 | 5 | fertig | 
 | ✅ | 2000 | Oranienbaum-Wörlitz | 7.998 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 2001 | Bad Füssing | 7.981 | OpenStreetMap (Geofabrik-Auszug) | 3 | 11 | fertig | 
 | ✅ | 2002 | Lenningen | 7.974 | OpenStreetMap (Geofabrik-Auszug) | 4 | 4 | fertig | 
 | ✅ | 2003 | Dannenberg (Elbe) | 7.966 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2005 | Neresheim | 7.954 | OpenStreetMap (Geofabrik-Auszug) | 6 | 8 | fertig | 
 | ✅ | 2006 | Salzbergen | 7.949 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2009 | Nessetal | 7.938 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 2010 | Birkenwerder | 7.935 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 2011 | Bad Endbach | 7.933 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 2013 | Loßburg | 7.919 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 2014 | Postbauer-Heng | 7.912 | OpenStreetMap (Geofabrik-Auszug) | 2 | 5 | fertig | 
 | ✅ | 2015 | Medebach | 7.906 | OpenStreetMap (Geofabrik-Auszug) | 3 | 7 | fertig | 
 | ✅ | 2016 | Weikersheim | 7.902 | OpenStreetMap (Geofabrik-Auszug) | 3 | 7 | fertig | 
 | ✅ | 2017 | Hemmingen | 7.901 | OpenStreetMap (Geofabrik-Auszug) | 5 | 7 | fertig | 
 | ✅ | 2018 | Saulheim | 7.893 | OpenStreetMap (Geofabrik-Auszug) | 5 | 8 | fertig | 
 | ✅ | 2019 | Baiersdorf | 7.890 | OpenStreetMap (Geofabrik-Auszug) | 13 | 14 | fertig | 
 | ✅ | 2020 | Althengstett | 7.886 | OpenStreetMap (Geofabrik-Auszug) | 12 | 38 | fertig | 
 | ✅ | 2022 | Drei Gleichen | 7.882 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 2023 | Könnern | 7.875 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 2025 | Aldingen | 7.858 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2026 | Bordesholm | 7.855 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2027 | Krailling | 7.847 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 2030 | Hellenthal | 7.834 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 2032 | Georgenthal | 7.824 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 2033 | Altomünster | 7.818 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 2034 | Parsberg | 7.818 | OpenStreetMap (Geofabrik-Auszug) | 3 | 6 | fertig | 
 | ✅ | 2035 | Barby | 7.813 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 2036 | Ehrenkirchen | 7.813 | OpenStreetMap (Geofabrik-Auszug) | 3 | 7 | fertig | 
 | ✅ | 2037 | Hengersberg | 7.810 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 2038 | Asbach | 7.807 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 2039 | Erzhausen | 7.794 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 2040 | Illingen | 7.791 | OpenStreetMap (Geofabrik-Auszug) | 6 | 8 | fertig | 
 | ✅ | 2041 | Untermeitingen | 7.789 | OpenStreetMap (Geofabrik-Auszug) | 5 | 5 | fertig | 
 | ✅ | 2042 | Gundelfingen a.d.Donau | 7.783 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 2043 | Feldkirchen | 7.780 | OpenStreetMap (Geofabrik-Auszug) | 3 | 6 | fertig | 
 | ✅ | 2044 | Heuchelheim a.d.Lahn | 7.773 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2045 | Elsteraue | 7.765 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 2046 | Bühlertal | 7.764 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2047 | Jesteburg | 7.758 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 2048 | Oberkochen | 7.746 | OpenStreetMap (Geofabrik-Auszug) | 4 | 7 | fertig | 
 | ✅ | 2049 | Bützow | 7.745 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 2050 | Weissach | 7.745 | OpenStreetMap (Geofabrik-Auszug) | 5 | 7 | fertig | 
 | ✅ | 2051 | Bad Grund (Harz) | 7.738 | OpenStreetMap (Geofabrik-Auszug) | 4 | 6 | fertig | 
 | ✅ | 2053 | Nörten-Hardenberg | 7.719 | OpenStreetMap (Geofabrik-Auszug) | 9 | 24 | fertig | 
 | ✅ | 2055 | Sögel | 7.718 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 2057 | Grasberg | 7.714 | OpenStreetMap (Geofabrik-Auszug) | 3 | 5 | fertig | 
 | ✅ | 2058 | Bad Düben | 7.713 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2059 | Teuchern | 7.712 | OpenStreetMap (Geofabrik-Auszug) | 4 | 4 | fertig | 
 | ✅ | 2060 | Lastrup | 7.700 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 2061 | Rheinsberg | 7.699 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2062 | Berchtesgaden | 7.697 | OpenStreetMap (Geofabrik-Auszug) | 15 | 29 | fertig | 
 | ✅ | 2063 | Küps | 7.697 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2064 | Bad Herrenalb | 7.694 | OpenStreetMap (Geofabrik-Auszug) | 6 | 7 | fertig | 
 | ✅ | 2065 | Löffingen | 7.692 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 2066 | Emlichheim | 7.691 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 2067 | Pfronten | 7.687 | OpenStreetMap (Geofabrik-Auszug) | 5 | 12 | fertig | 
 | ✅ | 2068 | Bad Wimpfen | 7.686 | OpenStreetMap (Geofabrik-Auszug) | 6 | 8 | fertig | 
 | ✅ | 2069 | Kirchberg | 7.678 | OpenStreetMap (Geofabrik-Auszug) | 9 | 10 | fertig | 
 | ✅ | 2070 | Elsterwerda | 7.663 | OpenStreetMap (Geofabrik-Auszug) | 5 | 15 | fertig | 
 | ✅ | 2071 | Bad Liebenstein | 7.662 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 2072 | Bismark (Altmark) | 7.660 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 2073 | Algermissen | 7.658 | OpenStreetMap (Geofabrik-Auszug) | 3 | 5 | fertig | 
 | ✅ | 2075 | Oberstaufen | 7.654 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 2078 | Schweich | 7.643 | OpenStreetMap (Geofabrik-Auszug) | 9 | 16 | fertig | 
 | ✅ | 2080 | Ramstein-Miesenbach | 7.636 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2081 | Vetschau/Spreewald | 7.635 | OpenStreetMap (Geofabrik-Auszug) | 6 | 7 | fertig | 
 | ✅ | 2082 | Bergkirchen | 7.630 | OpenStreetMap (Geofabrik-Auszug) | 6 | 7 | fertig | 
 | ✅ | 2083 | Schonungen | 7.628 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 2084 | Seefeld | 7.628 | OpenStreetMap (Geofabrik-Auszug) | 3 | 11 | fertig | 
 | ✅ | 2085 | Calau | 7.626 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2086 | Inden | 7.624 | OpenStreetMap (Geofabrik-Auszug) | 1 | 4 | fertig | 
 | ✅ | 2087 | Schömberg | 7.620 | OpenStreetMap (Geofabrik-Auszug) | 4 | 6 | fertig | 
 | ✅ | 2088 | Radeburg | 7.615 | OpenStreetMap (Geofabrik-Auszug) | 4 | 6 | fertig | 
 | ✅ | 2089 | Daun | 7.608 | OpenStreetMap (Geofabrik-Auszug) | 2 | 6 | fertig | 
 | ✅ | 2092 | Rimpar | 7.587 | OpenStreetMap (Geofabrik-Auszug) | 5 | 6 | fertig | 
 | ✅ | 2093 | Holdorf | 7.586 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 2094 | Renchen | 7.582 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 2095 | Münnerstadt | 7.577 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2096 | Großmehring | 7.576 | OpenStreetMap (Geofabrik-Auszug) | 1 | 4 | fertig | 
 | ✅ | 2097 | Vohenstrauß | 7.576 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 2098 | Weissach im Tal | 7.576 | OpenStreetMap (Geofabrik-Auszug) | 3 | 7 | fertig | 
 | ✅ | 2099 | Oederan | 7.569 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 2100 | Barth | 7.568 | OpenStreetMap (Geofabrik-Auszug) | 5 | 7 | fertig | 
 | ✅ | 2102 | Stadland | 7.561 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2104 | Seeland | 7.553 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 2105 | Gettorf | 7.540 | OpenStreetMap (Geofabrik-Auszug) | 4 | 6 | fertig | 
 | ✅ | 2106 | Treuenbrietzen | 7.539 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 2107 | Oberstenfeld | 7.537 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2108 | Allstedt | 7.535 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 2110 | Dörentrup | 7.528 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2111 | Horstmar | 7.528 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2112 | Jockgrim | 7.528 | OpenStreetMap (Geofabrik-Auszug) | 8 | 9 | fertig | 
 | ✅ | 2113 | Langenargen | 7.525 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 2114 | Dittelbrunn | 7.519 | OpenStreetMap (Geofabrik-Auszug) | 6 | 11 | fertig | 
 | ✅ | 2116 | Elzach | 7.515 | OpenStreetMap (Geofabrik-Auszug) | 4 | 8 | fertig | 
 | ✅ | 2117 | Otterndorf | 7.515 | OpenStreetMap (Geofabrik-Auszug) | 14 | 24 | fertig | 
 | ✅ | 2118 | Ahnatal | 7.513 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 2122 | Saarburg | 7.504 | OpenStreetMap (Geofabrik-Auszug) | 6 | 8 | fertig | 
 | ✅ | 2124 | Bad Kötzting | 7.494 | OpenStreetMap (Geofabrik-Auszug) | 2 | 7 | fertig | 
 | ✅ | 2125 | Dannstadt-Schauernheim | 7.487 | OpenStreetMap (Geofabrik-Auszug) | 3 | 5 | fertig | 
 | ✅ | 2126 | Flintbek | 7.486 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 2127 | Söhlde | 7.486 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 2128 | Naila | 7.482 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2129 | Lugau/Erzgeb. | 7.481 | OpenStreetMap (Geofabrik-Auszug) | 17 | 17 | fertig | 
 | ✅ | 2131 | Sontra | 7.466 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 2132 | Bunde | 7.463 | OpenStreetMap (Geofabrik-Auszug) | 5 | 7 | fertig | 
 | ✅ | 2133 | Altenberg | 7.462 | OpenStreetMap (Geofabrik-Auszug) | 5 | 9 | fertig | 
 | ✅ | 2135 | Gundelsheim | 7.449 | OpenStreetMap (Geofabrik-Auszug) | 2 | 6 | fertig | 
 | ✅ | 2136 | Klettgau | 7.445 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 2138 | Heidenrod | 7.437 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 2139 | Leipheim | 7.434 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 2140 | Flein | 7.432 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 2141 | Schellerten | 7.428 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 2142 | Sulzbach a.Main | 7.423 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 2143 | Türkheim | 7.410 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 2144 | Heidesee | 7.407 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 2145 | Bad Berka | 7.389 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 2147 | Großkarolinenfeld | 7.387 | OpenStreetMap (Geofabrik-Auszug) | 6 | 9 | fertig | 
 | ✅ | 2149 | Hasselroth | 7.386 | OpenStreetMap (Geofabrik-Auszug) | 3 | 5 | fertig | 
 | ✅ | 2150 | Baienfurt | 7.382 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 2151 | Edermünde | 7.371 | OpenStreetMap (Geofabrik-Auszug) | 8 | 9 | fertig | 
 | ✅ | 2152 | Belgern-Schildau | 7.363 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2153 | Burkardroth | 7.361 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 2154 | Allensbach | 7.353 | OpenStreetMap (Geofabrik-Auszug) | 8 | 10 | fertig | 
 | ✅ | 2155 | Friedrichroda | 7.352 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 2156 | Pleinfeld | 7.350 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 2157 | Laufen | 7.336 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 2158 | Sinzing | 7.332 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 2159 | Ortenburg | 7.330 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2160 | Schwülper | 7.328 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 2161 | Mittenwald | 7.323 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 2163 | Pfaffenhofen a.d.Roth | 7.311 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 2164 | Harzgerode | 7.309 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2165 | Harztor | 7.306 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 2166 | Klingenthal | 7.289 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 2167 | Pfalzgrafenweiler | 7.286 | OpenStreetMap (Geofabrik-Auszug) | 6 | 8 | fertig | 
 | ✅ | 2170 | Zwingenberg | 7.283 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 2175 | Wabern | 7.262 | OpenStreetMap (Geofabrik-Auszug) | 4 | 7 | fertig | 
 | ✅ | 2176 | Alfdorf | 7.260 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 2177 | Hardegsen | 7.250 | OpenStreetMap (Geofabrik-Auszug) | 8 | 10 | fertig | 
 | ✅ | 2178 | Pulsnitz | 7.246 | OpenStreetMap (Geofabrik-Auszug) | 6 | 7 | fertig | 
 | ✅ | 2179 | Wallersdorf | 7.246 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2180 | Weimar (Lahn) | 7.240 | OpenStreetMap (Geofabrik-Auszug) | 2 | 6 | fertig | 
 | ✅ | 2181 | Enkenbach-Alsenborn | 7.236 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 2182 | Ampfing | 7.234 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 2183 | Am Mellensee | 7.224 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2186 | Bad Sachsa | 7.193 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 2189 | Haslach im Kinzigtal | 7.190 | OpenStreetMap (Geofabrik-Auszug) | 4 | 4 | fertig | 
 | ✅ | 2190 | Nortorf | 7.190 | OpenStreetMap (Geofabrik-Auszug) | 3 | 12 | fertig | 
 | ✅ | 2192 | Schwanstetten | 7.167 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 2193 | Meldorf | 7.166 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 2194 | Neulußheim | 7.162 | OpenStreetMap (Geofabrik-Auszug) | 4 | 5 | fertig | 
 | ✅ | 2195 | Annweiler am Trifels | 7.160 | OpenStreetMap (Geofabrik-Auszug) | 3 | 13 | fertig | 
 | ✅ | 2197 | Bindlach | 7.156 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2198 | Greding | 7.154 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2201 | Burgebrach | 7.149 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 2202 | Roßwein | 7.149 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 2203 | Neukieritzsch | 7.147 | OpenStreetMap (Geofabrik-Auszug) | 4 | 5 | fertig | 
 | ✅ | 2204 | Scheßlitz | 7.129 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 2209 | Schwendi | 7.098 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 2210 | Namborn | 7.096 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2211 | Stolzenau | 7.079 | OpenStreetMap (Geofabrik-Auszug) | 8 | 11 | fertig | 
 | ✅ | 2212 | Freyung | 7.078 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 2213 | Immenhausen | 7.078 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 2214 | Maxdorf | 7.075 | OpenStreetMap (Geofabrik-Auszug) | 3 | 5 | fertig | 
 | ✅ | 2215 | Tuntenhausen | 7.074 | OpenStreetMap (Geofabrik-Auszug) | 7 | 9 | fertig | 
 | ✅ | 2216 | Oppenheim | 7.071 | OpenStreetMap (Geofabrik-Auszug) | 15 | 17 | fertig | 
 | ✅ | 2217 | Waldstetten | 7.067 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 2218 | Ostrach | 7.066 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2219 | Birkenfeld | 7.062 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 2220 | Roßleben-Wiehe | 7.062 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 2221 | Markneukirchen | 7.061 | OpenStreetMap (Geofabrik-Auszug) | 5 | 9 | fertig | 
 | ✅ | 2222 | Bischofswiesen | 7.055 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2224 | Berne | 7.053 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 2225 | Schöppingen | 7.033 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2226 | Königsbronn | 7.028 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 2227 | Sonnenbühl | 7.022 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 2228 | Pöttmes | 7.012 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2229 | Am Ettersberg | 7.010 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2230 | Reinsdorf | 7.009 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2231 | Waging a.See | 7.007 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2232 | Reppenstedt | 7.005 | OpenStreetMap (Geofabrik-Auszug) | 10 | 23 | fertig | 
 | ✅ | 2233 | Lemwerder | 6.999 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 2234 | Esens | 6.998 | OpenStreetMap (Geofabrik-Auszug) | 11 | 12 | fertig | 
 | ✅ | 2235 | Jettingen-Scheppach | 6.996 | OpenStreetMap (Geofabrik-Auszug) | 7 | 14 | fertig | 
 | ✅ | 2238 | Lautertal (Odenwald) | 6.991 | OpenStreetMap (Geofabrik-Auszug) | 2 | 8 | fertig | 
 | ✅ | 2239 | Ilshofen | 6.990 | OpenStreetMap (Geofabrik-Auszug) | 5 | 8 | fertig | 
 | ✅ | 2240 | Königsee | 6.979 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2242 | Homberg (Ohm) | 6.973 | OpenStreetMap (Geofabrik-Auszug) | 7 | 12 | fertig | 
 | ✅ | 2243 | Geiselhöring | 6.964 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2244 | Nobitz | 6.962 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2245 | Reichelsheim (Wetterau) | 6.961 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 2248 | Neuhofen | 6.946 | OpenStreetMap (Geofabrik-Auszug) | 7 | 14 | fertig | 
 | ✅ | 2250 | Eiterfeld | 6.940 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 2251 | Schallstadt | 6.937 | OpenStreetMap (Geofabrik-Auszug) | 4 | 7 | fertig | 
 | ✅ | 2254 | Durach | 6.918 | OpenStreetMap (Geofabrik-Auszug) | 3 | 16 | fertig | 
 | ✅ | 2255 | Lichtenau | 6.912 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 2256 | Lambsheim | 6.911 | OpenStreetMap (Geofabrik-Auszug) | 1 | 4 | fertig | 
 | ✅ | 2257 | Grassau | 6.910 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 2258 | Lengenfeld | 6.910 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 2259 | Georgensgmünd | 6.907 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 2260 | Ladbergen | 6.906 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 2261 | Saerbeck | 6.906 | OpenStreetMap (Geofabrik-Auszug) | 12 | 22 | fertig | 
 | ✅ | 2262 | Waldeck | 6.905 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 2263 | Höchstädt a.d.Donau | 6.902 | OpenStreetMap (Geofabrik-Auszug) | 7 | 22 | fertig | 
 | ✅ | 2264 | Murg | 6.900 | OpenStreetMap (Geofabrik-Auszug) | 13 | 17 | fertig | 
 | ✅ | 2266 | Edenkoben | 6.896 | OpenStreetMap (Geofabrik-Auszug) | 15 | 16 | fertig | 
 | ✅ | 2268 | Dermbach | 6.889 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2270 | Bakum | 6.872 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 2271 | Geithain | 6.870 | OpenStreetMap (Geofabrik-Auszug) | 15 | 18 | fertig | 
 | ✅ | 2272 | Dettelbach | 6.866 | OpenStreetMap (Geofabrik-Auszug) | 2 | 5 | fertig | 
 | ✅ | 2273 | Berglen | 6.860 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 2275 | Bernau a.Chiemsee | 6.855 | OpenStreetMap (Geofabrik-Auszug) | 5 | 5 | fertig | 
 | ✅ | 2276 | Neukirchen/Erzgeb. | 6.845 | OpenStreetMap (Geofabrik-Auszug) | 4 | 4 | fertig | 
 | ✅ | 2277 | Putzbrunn | 6.845 | OpenStreetMap (Geofabrik-Auszug) | 12 | 20 | fertig | 
 | ✅ | 2278 | Dietenheim | 6.843 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 2279 | Auenwald | 6.833 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 2280 | Müncheberg | 6.831 | OpenStreetMap (Geofabrik-Auszug) | 6 | 11 | fertig | 
 | ✅ | 2282 | Horneburg | 6.823 | OpenStreetMap (Geofabrik-Auszug) | 4 | 6 | fertig | 
 | ✅ | 2284 | Grömitz | 6.812 | OpenStreetMap (Geofabrik-Auszug) | 19 | 49 | fertig | 
 | ✅ | 2285 | Bonndorf im Schwarzwald | 6.802 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 2286 | Hardheim | 6.802 | OpenStreetMap (Geofabrik-Auszug) | 4 | 4 | fertig | 
 | ✅ | 2287 | Eberdingen | 6.800 | OpenStreetMap (Geofabrik-Auszug) | 16 | 20 | fertig | 
 | ✅ | 2288 | Dinkelscherben | 6.797 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2289 | Eibenstock | 6.795 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 2290 | Schönkirchen | 6.794 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2291 | Erndtebrück | 6.792 | OpenStreetMap (Geofabrik-Auszug) | 3 | 6 | fertig | 
 | ✅ | 2292 | Böhlen | 6.787 | OpenStreetMap (Geofabrik-Auszug) | 3 | 6 | fertig | 
 | ✅ | 2293 | Mutlangen | 6.786 | OpenStreetMap (Geofabrik-Auszug) | 4 | 6 | fertig | 
 | ✅ | 2294 | Stadtroda | 6.785 | OpenStreetMap (Geofabrik-Auszug) | 5 | 7 | fertig | 
 | ✅ | 2295 | Dettenheim | 6.782 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 2300 | Lathen | 6.767 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 2301 | Malchin | 6.767 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 2302 | Altenkirchen (Westerwald) | 6.758 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 2304 | Gröditz | 6.752 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2307 | Büchen | 6.733 | OpenStreetMap (Geofabrik-Auszug) | 7 | 14 | fertig | 
 | ✅ | 2308 | Leegebruch | 6.732 | OpenStreetMap (Geofabrik-Auszug) | 1 | 4 | fertig | 
 | ✅ | 2309 | Bernkastel-Kues | 6.727 | OpenStreetMap (Geofabrik-Auszug) | 4 | 7 | fertig | 
 | ✅ | 2311 | Niedere Börde | 6.726 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2314 | Mallersdorf-Pfaffenberg | 6.722 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2321 | Ebermannstadt | 6.688 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2323 | Ketzin/Havel | 6.684 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2324 | Hermeskeil | 6.677 | OpenStreetMap (Geofabrik-Auszug) | 3 | 5 | fertig | 
 | ✅ | 2325 | Polch | 6.675 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 2327 | Heringen (Werra) | 6.669 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 2328 | Kupferzell | 6.665 | OpenStreetMap (Geofabrik-Auszug) | 4 | 6 | fertig | 
 | ✅ | 2329 | Brannenburg | 6.658 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 2330 | Zusmarshausen | 6.655 | OpenStreetMap (Geofabrik-Auszug) | 4 | 4 | fertig | 
 | ✅ | 2332 | Tiefenbach | 6.650 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 2333 | Osterburken | 6.639 | OpenStreetMap (Geofabrik-Auszug) | 4 | 4 | fertig | 
 | ✅ | 2335 | Neuenstein | 6.618 | OpenStreetMap (Geofabrik-Auszug) | 3 | 5 | fertig | 
 | ✅ | 2336 | Schelklingen | 6.616 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 2337 | Gau-Algesheim | 6.606 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2338 | Bardowick | 6.604 | OpenStreetMap (Geofabrik-Auszug) | 3 | 6 | fertig | 
 | ✅ | 2339 | Mitterteich | 6.604 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 2342 | Weisendorf | 6.597 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 2343 | Wöllstadt | 6.593 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2344 | Schliersee | 6.591 | OpenStreetMap (Geofabrik-Auszug) | 4 | 8 | fertig | 
 | ✅ | 2345 | Schöffengrund | 6.590 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 2346 | Klingenberg | 6.588 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 2347 | Immendingen | 6.585 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 2348 | Grasbrunn | 6.581 | OpenStreetMap (Geofabrik-Auszug) | 8 | 14 | fertig | 
 | ✅ | 2350 | Grafenau | 6.578 | OpenStreetMap (Geofabrik-Auszug) | 7 | 8 | fertig | 
 | ✅ | 2351 | Huy | 6.578 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 2352 | Murr | 6.578 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 2353 | Pegau | 6.578 | OpenStreetMap (Geofabrik-Auszug) | 2 | 6 | fertig | 
 | ✅ | 2354 | Heitersheim | 6.577 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 2355 | Laudenbach | 6.573 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 2356 | Bispingen | 6.572 | OpenStreetMap (Geofabrik-Auszug) | 14 | 25 | fertig | 
 | ✅ | 2357 | Jerichow | 6.571 | OpenStreetMap (Geofabrik-Auszug) | 5 | 5 | fertig | 
 | ✅ | 2359 | Neustadt-Glewe | 6.566 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 2361 | Bad Sobernheim | 6.564 | OpenStreetMap (Geofabrik-Auszug) | 14 | 24 | fertig | 
 | ✅ | 2362 | Fockbek | 6.561 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2363 | Holle | 6.561 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 2364 | Greifenstein | 6.560 | OpenStreetMap (Geofabrik-Auszug) | 1 | 5 | fertig | 
 | ✅ | 2365 | Nattheim | 6.555 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2366 | Machern | 6.548 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 2367 | Blankenhain | 6.543 | OpenStreetMap (Geofabrik-Auszug) | 1 | 12 | fertig | 
 | ✅ | 2369 | Moringen | 6.540 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 2370 | Metelen | 6.539 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2371 | Volkmarsen | 6.535 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2373 | Salzweg | 6.533 | OpenStreetMap (Geofabrik-Auszug) | 5 | 5 | fertig | 
 | ✅ | 2374 | Sanitz | 6.533 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 2375 | Haag i.OB | 6.532 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 2377 | Rheinmünster | 6.527 | OpenStreetMap (Geofabrik-Auszug) | 8 | 12 | fertig | 
 | ✅ | 2378 | Neustadt (Wied) | 6.526 | OpenStreetMap (Geofabrik-Auszug) | 3 | 9 | fertig | 
 | ✅ | 2379 | Hage | 6.520 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2380 | Biebesheim am Rhein | 6.515 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 2381 | Kiefersfelden | 6.513 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2382 | Herdorf | 6.508 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 2383 | Hartha | 6.503 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 2385 | Gerbrunn | 6.493 | OpenStreetMap (Geofabrik-Auszug) | 6 | 7 | fertig | 
 | ✅ | 2386 | Cölbe | 6.491 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 2388 | Sinn | 6.485 | OpenStreetMap (Geofabrik-Auszug) | 7 | 20 | fertig | 
 | ✅ | 2390 | Sottrum | 6.479 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 2391 | Kalbach | 6.477 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 2394 | Bad Brückenau | 6.470 | OpenStreetMap (Geofabrik-Auszug) | 5 | 11 | fertig | 
 | ✅ | 2395 | Buttstädt | 6.470 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2396 | Bietigheim | 6.468 | OpenStreetMap (Geofabrik-Auszug) | 8 | 19 | fertig | 
 | ✅ | 2398 | Burgkunstadt | 6.463 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 2399 | Artern | 6.462 | OpenStreetMap (Geofabrik-Auszug) | 4 | 5 | fertig | 
 | ✅ | 2400 | Maulbronn | 6.452 | OpenStreetMap (Geofabrik-Auszug) | 5 | 8 | fertig | 
 | ✅ | 2401 | Rheurdt | 6.450 | OpenStreetMap (Geofabrik-Auszug) | 5 | 8 | fertig | 
 | ✅ | 2402 | Röhrmoos | 6.449 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 2404 | Immenstaad am Bodensee | 6.448 | OpenStreetMap (Geofabrik-Auszug) | 7 | 18 | fertig | 
 | ✅ | 2409 | Uffenheim | 6.431 | OpenStreetMap (Geofabrik-Auszug) | 5 | 10 | fertig | 
 | ✅ | 2410 | Eppertshausen | 6.429 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2413 | Eggolsheim | 6.414 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 2414 | Glashütte | 6.414 | OpenStreetMap (Geofabrik-Auszug) | 4 | 4 | fertig | 
 | ✅ | 2415 | Wassertrüdingen | 6.414 | OpenStreetMap (Geofabrik-Auszug) | 1 | 4 | fertig | 
 | ✅ | 2416 | Beilstein | 6.412 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2417 | Mainleus | 6.410 | OpenStreetMap (Geofabrik-Auszug) | 2 | 6 | fertig | 
 | ✅ | 2418 | Thannhausen | 6.406 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 2421 | Burghaun | 6.404 | OpenStreetMap (Geofabrik-Auszug) | 11 | 18 | fertig | 
 | ✅ | 2422 | Güglingen | 6.394 | OpenStreetMap (Geofabrik-Auszug) | 4 | 7 | fertig | 
 | ✅ | 2424 | Zellingen | 6.390 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 2426 | Römhild | 6.383 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2427 | Vilseck | 6.382 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 2429 | Unstrut-Hainich | 6.378 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2434 | Bad Hönningen | 6.355 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 2435 | Hanstedt | 6.354 | OpenStreetMap (Geofabrik-Auszug) | 4 | 6 | fertig | 
 | ✅ | 2436 | Petershausen | 6.353 | OpenStreetMap (Geofabrik-Auszug) | 4 | 28 | fertig | 
 | ✅ | 2437 | Ottersweier | 6.350 | OpenStreetMap (Geofabrik-Auszug) | 10 | 11 | fertig | 
 | ✅ | 2438 | Waldachtal | 6.346 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2439 | Eichwalde | 6.341 | OpenStreetMap (Geofabrik-Auszug) | 5 | 7 | fertig | 
 | ✅ | 2440 | Bad Saarow | 6.340 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 2442 | Hachenburg | 6.336 | OpenStreetMap (Geofabrik-Auszug) | 9 | 14 | fertig | 
 | ✅ | 2443 | Satow | 6.336 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2444 | Neumarkt-Sankt Veit | 6.334 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 2445 | Hutthurm | 6.332 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 2451 | Benningen am Neckar | 6.323 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 2452 | Otzberg | 6.322 | OpenStreetMap (Geofabrik-Auszug) | 5 | 6 | fertig | 
 | ✅ | 2453 | Brechen | 6.321 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2454 | Altlußheim | 6.317 | OpenStreetMap (Geofabrik-Auszug) | 6 | 8 | fertig | 
 | ✅ | 2455 | Sohland a.d.Spree | 6.317 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 2456 | Veitsbronn | 6.312 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2457 | Schwabhausen | 6.311 | OpenStreetMap (Geofabrik-Auszug) | 4 | 4 | fertig | 
 | ✅ | 2459 | Ihringen | 6.308 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 2460 | Glücksburg (Ostsee) | 6.306 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 2466 | Rodenberg | 6.287 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2467 | Kämpfelbach | 6.283 | OpenStreetMap (Geofabrik-Auszug) | 4 | 5 | fertig | 
 | ✅ | 2468 | Bammental | 6.278 | OpenStreetMap (Geofabrik-Auszug) | 6 | 6 | fertig | 
 | ✅ | 2472 | Wutha-Farnroda | 6.268 | OpenStreetMap (Geofabrik-Auszug) | 6 | 11 | fertig | 
 | ✅ | 2473 | Linz am Rhein | 6.265 | OpenStreetMap (Geofabrik-Auszug) | 13 | 14 | fertig | 
 | ✅ | 2474 | Trochtelfingen | 6.264 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 2475 | Laage | 6.253 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 2476 | Oberding | 6.251 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2478 | Havelberg | 6.246 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 2479 | Bernsdorf | 6.242 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 2480 | Vogtsburg im Kaiserstuhl | 6.234 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 2482 | Gersheim | 6.232 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 2483 | Bondorf | 6.230 | OpenStreetMap (Geofabrik-Auszug) | 3 | 10 | fertig | 
 | ✅ | 2485 | Ingersheim | 6.223 | OpenStreetMap (Geofabrik-Auszug) | 6 | 24 | fertig | 
 | ✅ | 2487 | Dornhan | 6.219 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2489 | Aarbergen | 6.210 | OpenStreetMap (Geofabrik-Auszug) | 4 | 12 | fertig | 
 | ✅ | 2490 | Deißlingen | 6.208 | OpenStreetMap (Geofabrik-Auszug) | 2 | 5 | fertig | 
 | ✅ | 2491 | Erdweg | 6.206 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 2492 | Schönberg (Holstein) | 6.206 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 2493 | Zell im Wiesental | 6.204 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2495 | Schliengen | 6.200 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2496 | Wolfschlugen | 6.199 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 2497 | Dierdorf | 6.192 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2498 | Edertal | 6.181 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 2499 | Adelebsen | 6.180 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 2500 | Bad Rodach | 6.179 | OpenStreetMap (Geofabrik-Auszug) | 4 | 4 | fertig | 
 | ✅ | 2501 | Ilmtal-Weinstraße | 6.169 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2503 | Nachrodt-Wiblingwerde | 6.159 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 2504 | Dötlingen | 6.155 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 2505 | Gammertingen | 6.155 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 2506 | Dußlingen | 6.153 | OpenStreetMap (Geofabrik-Auszug) | 4 | 4 | fertig | 
 | ✅ | 2507 | Niedergörsdorf | 6.147 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 2508 | Dettingen unter Teck | 6.138 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 2510 | Uder | 6.134 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2514 | Eutingen im Gäu | 6.120 | OpenStreetMap (Geofabrik-Auszug) | 4 | 8 | fertig | 
 | ✅ | 2515 | Ebersdorf b.Coburg | 6.119 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2517 | Alpirsbach | 6.114 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2518 | Windsbach | 6.114 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 2519 | Klingenberg a.Main | 6.112 | OpenStreetMap (Geofabrik-Auszug) | 4 | 4 | fertig | 
 | ✅ | 2520 | Neuffen | 6.104 | OpenStreetMap (Geofabrik-Auszug) | 4 | 4 | fertig | 
 | ✅ | 2521 | Muggensturm | 6.103 | OpenStreetMap (Geofabrik-Auszug) | 6 | 12 | fertig | 
 | ✅ | 2522 | Bad Marienberg (Westerwald) | 6.096 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 2524 | Gochsheim | 6.093 | OpenStreetMap (Geofabrik-Auszug) | 2 | 6 | fertig | 
 | ✅ | 2526 | Riedenburg | 6.090 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 2530 | Nieheim | 6.081 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 2532 | Falkenberg/Elster | 6.070 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2535 | Billigheim | 6.063 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 2536 | Hüttlingen | 6.060 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 2537 | Lachendorf | 6.059 | OpenStreetMap (Geofabrik-Auszug) | 1 | 7 | fertig | 
 | ✅ | 2538 | Neustadt a.d.Waldnaab | 6.057 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 2540 | Dudenhofen | 6.054 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2541 | Altbach | 6.047 | OpenStreetMap (Geofabrik-Auszug) | 6 | 7 | fertig | 
 | ✅ | 2545 | Bickenbach | 6.031 | OpenStreetMap (Geofabrik-Auszug) | 2 | 5 | fertig | 
 | ✅ | 2546 | Isenbüttel | 6.031 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 2547 | Dohna | 6.030 | OpenStreetMap (Geofabrik-Auszug) | 1 | 5 | fertig | 
 | ✅ | 2549 | Nesse-Apfelstädt | 6.021 | OpenStreetMap (Geofabrik-Auszug) | 6 | 12 | fertig | 
 | ✅ | 2550 | Waldsee | 6.016 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2551 | Kirchheim am Neckar | 6.004 | OpenStreetMap (Geofabrik-Auszug) | 5 | 7 | fertig | 
 | ✅ | 2552 | Plaidt | 6.003 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2554 | Westerburg | 6.002 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2561 | Allershausen | 5.980 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2562 | Hörselberg-Hainich | 5.979 | OpenStreetMap (Geofabrik-Auszug) | 4 | 4 | fertig | 
 | ✅ | 2564 | Rohrbach | 5.970 | OpenStreetMap (Geofabrik-Auszug) | 3 | 7 | fertig | 
 | ✅ | 2567 | Schlangenbad | 5.967 | OpenStreetMap (Geofabrik-Auszug) | 5 | 7 | fertig | 
 | ✅ | 2569 | Spangenberg | 5.967 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 2570 | Butjadingen | 5.966 | OpenStreetMap (Geofabrik-Auszug) | 7 | 20 | fertig | 
 | ✅ | 2572 | Malchow | 5.961 | OpenStreetMap (Geofabrik-Auszug) | 4 | 5 | fertig | 
 | ✅ | 2573 | Königsfeld im Schwarzwald | 5.960 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2574 | Plau am See | 5.960 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 2576 | Meersburg | 5.956 | OpenStreetMap (Geofabrik-Auszug) | 8 | 15 | fertig | 
 | ✅ | 2577 | Thalheim/Erzgeb. | 5.956 | OpenStreetMap (Geofabrik-Auszug) | 10 | 15 | fertig | 
 | ✅ | 2578 | Stockstadt am Rhein | 5.945 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2579 | Kirchardt | 5.939 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 2580 | Burkhardtsdorf | 5.936 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 2581 | Langquaid | 5.936 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2582 | Schlüsselfeld | 5.932 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2583 | Hohenlockstedt | 5.918 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 2585 | Uelsen | 5.909 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2586 | Hebertshausen | 5.894 | OpenStreetMap (Geofabrik-Auszug) | 5 | 7 | fertig | 
 | ✅ | 2587 | Mudersbach | 5.894 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 2588 | Lübz | 5.892 | OpenStreetMap (Geofabrik-Auszug) | 28 | 33 | fertig | 
 | ✅ | 2590 | Faßberg | 5.890 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 2591 | Tarp | 5.890 | OpenStreetMap (Geofabrik-Auszug) | 4 | 6 | fertig | 
 | ✅ | 2592 | Großbreitenbach | 5.884 | OpenStreetMap (Geofabrik-Auszug) | 2 | 7 | fertig | 
 | ✅ | 2593 | An der Schmücke | 5.881 | OpenStreetMap (Geofabrik-Auszug) | 4 | 5 | fertig | 
 | ✅ | 2597 | Boostedt | 5.868 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 2603 | Emskirchen | 5.854 | OpenStreetMap (Geofabrik-Auszug) | 18 | 22 | fertig | 
 | ✅ | 2607 | Waldbrunn (Westerwald) | 5.847 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2609 | Jade | 5.843 | OpenStreetMap (Geofabrik-Auszug) | 3 | 6 | fertig | 
 | ✅ | 2611 | Schäftlarn | 5.840 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 2613 | Dasing | 5.838 | OpenStreetMap (Geofabrik-Auszug) | 6 | 7 | fertig | 
 | ✅ | 2614 | Beselich | 5.835 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 2617 | Tittmoning | 5.826 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2619 | Geltendorf | 5.817 | OpenStreetMap (Geofabrik-Auszug) | 4 | 8 | fertig | 
 | ✅ | 2620 | Elztal | 5.814 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2621 | Gmund a.Tegernsee | 5.813 | OpenStreetMap (Geofabrik-Auszug) | 7 | 11 | fertig | 
 | ✅ | 2622 | Nufringen | 5.806 | OpenStreetMap (Geofabrik-Auszug) | 6 | 10 | fertig | 
 | ✅ | 2623 | Bodelshausen | 5.805 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2625 | Waibstadt | 5.794 | OpenStreetMap (Geofabrik-Auszug) | 4 | 6 | fertig | 
 | ✅ | 2626 | Bredstedt | 5.790 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 2627 | Heringsdorf | 5.790 | OpenStreetMap (Geofabrik-Auszug) | 6 | 13 | fertig | 
 | ✅ | 2629 | Bräunlingen | 5.784 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 2631 | Löchgau | 5.778 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2634 | Dietenhofen | 5.771 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 2635 | Sontheim an der Brenz | 5.771 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 2638 | Schwarmstedt | 5.759 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 2641 | Nottertal-Heilinger Höhen | 5.750 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2642 | Fürstenberg/Havel | 5.741 | OpenStreetMap (Geofabrik-Auszug) | 4 | 8 | fertig | 
 | ✅ | 2643 | Kalefeld | 5.732 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 2644 | Hirschau | 5.726 | OpenStreetMap (Geofabrik-Auszug) | 5 | 5 | fertig | 
 | ✅ | 2648 | Neubulach | 5.713 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2649 | Ober-Mörlen | 5.706 | OpenStreetMap (Geofabrik-Auszug) | 4 | 6 | fertig | 
 | ✅ | 2651 | Bruckberg | 5.700 | OpenStreetMap (Geofabrik-Auszug) | 3 | 5 | fertig | 
 | ✅ | 2652 | Herrnhut | 5.695 | OpenStreetMap (Geofabrik-Auszug) | 5 | 7 | fertig | 
 | ✅ | 2653 | Wirges | 5.694 | OpenStreetMap (Geofabrik-Auszug) | 6 | 12 | fertig | 
 | ✅ | 2655 | Böhmenkirch | 5.684 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2656 | Willingen (Upland) | 5.672 | OpenStreetMap (Geofabrik-Auszug) | 9 | 15 | fertig | 
 | ✅ | 2658 | Odelzhausen | 5.671 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 2660 | Münzenberg | 5.663 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 2663 | Oberboihingen | 5.644 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 2665 | Tacherting | 5.643 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2668 | Kleinwallstadt | 5.632 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 2671 | Giebelstadt | 5.617 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2672 | Weischlitz | 5.617 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 2674 | Ebensfeld | 5.614 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2675 | Mengerskirchen | 5.612 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 2677 | Beratzhausen | 5.594 | OpenStreetMap (Geofabrik-Auszug) | 5 | 6 | fertig | 
 | ✅ | 2678 | Gemmingen | 5.593 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 2679 | Pöcking | 5.589 | OpenStreetMap (Geofabrik-Auszug) | 3 | 7 | fertig | 
 | ✅ | 2681 | Merzhausen | 5.584 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2682 | Aying | 5.581 | OpenStreetMap (Geofabrik-Auszug) | 7 | 14 | fertig | 
 | ✅ | 2683 | Hambrücken | 5.581 | OpenStreetMap (Geofabrik-Auszug) | 2 | 7 | fertig | 
 | ✅ | 2685 | Affing | 5.575 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 2686 | Dietramszell | 5.572 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 2688 | Wolfach | 5.571 | OpenStreetMap (Geofabrik-Auszug) | 5 | 5 | fertig | 
 | ✅ | 2689 | Großpösna | 5.570 | OpenStreetMap (Geofabrik-Auszug) | 40 | 43 | fertig | 
 | ✅ | 2690 | Leutershausen | 5.570 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2692 | Tegernheim | 5.570 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 2697 | Limeshain | 5.563 | OpenStreetMap (Geofabrik-Auszug) | 6 | 9 | fertig | 
 | ✅ | 2698 | Fischbachau | 5.562 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 2699 | Kaltennordheim | 5.562 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2702 | Schönenberg-Kübelberg | 5.557 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2706 | Rochlitz | 5.549 | OpenStreetMap (Geofabrik-Auszug) | 20 | 29 | fertig | 
 | ✅ | 2707 | Wesendorf | 5.549 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2709 | Laboe | 5.546 | OpenStreetMap (Geofabrik-Auszug) | 5 | 15 | fertig | 
 | ✅ | 2714 | Dettenhausen | 5.543 | OpenStreetMap (Geofabrik-Auszug) | 5 | 5 | fertig | 
 | ✅ | 2715 | Seelow | 5.541 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 2716 | Zeil a.Main | 5.540 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2717 | Wartenberg | 5.539 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 2719 | Rot am See | 5.531 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 2720 | Heimsheim | 5.530 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 2721 | Mellrichstadt | 5.530 | OpenStreetMap (Geofabrik-Auszug) | 3 | 5 | fertig | 
 | ✅ | 2722 | Baltmannsweiler | 5.525 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 2723 | Bad Lobenstein | 5.523 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 2724 | Küssaberg | 5.520 | OpenStreetMap (Geofabrik-Auszug) | 4 | 9 | fertig | 
 | ✅ | 2725 | Weßling | 5.519 | OpenStreetMap (Geofabrik-Auszug) | 6 | 15 | fertig | 
 | ✅ | 2726 | Blaichach | 5.518 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2727 | Igersheim | 5.517 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 2729 | Büchenbach | 5.514 | OpenStreetMap (Geofabrik-Auszug) | 3 | 31 | fertig | 
 | ✅ | 2730 | Mügeln | 5.505 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 2733 | Ingelfingen | 5.501 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2734 | Wernberg-Köblitz | 5.494 | OpenStreetMap (Geofabrik-Auszug) | 2 | 5 | fertig | 
 | ✅ | 2735 | Kirchentellinsfurt | 5.492 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 2736 | Rechberghausen | 5.491 | OpenStreetMap (Geofabrik-Auszug) | 12 | 14 | fertig | 
 | ✅ | 2737 | Baar-Ebenhausen | 5.488 | OpenStreetMap (Geofabrik-Auszug) | 6 | 12 | fertig | 
 | ✅ | 2739 | Aschau i.Chiemgau | 5.471 | OpenStreetMap (Geofabrik-Auszug) | 8 | 12 | fertig | 
 | ✅ | 2741 | Lamspringe | 5.460 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2742 | Vöhl | 5.460 | OpenStreetMap (Geofabrik-Auszug) | 9 | 11 | fertig | 
 | ✅ | 2743 | Walddorfhäslach | 5.457 | OpenStreetMap (Geofabrik-Auszug) | 3 | 5 | fertig | 
 | ✅ | 2744 | Ahlerstedt | 5.456 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2745 | Drebkau | 5.455 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 2747 | Brunnthal | 5.451 | OpenStreetMap (Geofabrik-Auszug) | 6 | 6 | fertig | 
 | ✅ | 2750 | Sersheim | 5.448 | OpenStreetMap (Geofabrik-Auszug) | 3 | 5 | fertig | 
 | ✅ | 2751 | Eschede | 5.443 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 2753 | Rottach-Egern | 5.441 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2756 | Stolpen | 5.436 | OpenStreetMap (Geofabrik-Auszug) | 6 | 15 | fertig | 
 | ✅ | 2757 | Frankenblick | 5.434 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 2758 | Hohenwestedt | 5.428 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 2759 | Triftern | 5.428 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 2760 | Bessenbach | 5.425 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 2761 | Grabfeld | 5.425 | OpenStreetMap (Geofabrik-Auszug) | 4 | 4 | fertig | 
 | ✅ | 2765 | Ovelgönne | 5.421 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 2766 | Sulzbach an der Murr | 5.421 | OpenStreetMap (Geofabrik-Auszug) | 5 | 7 | fertig | 
 | ✅ | 2767 | Traben-Trarbach | 5.421 | OpenStreetMap (Geofabrik-Auszug) | 6 | 12 | fertig | 
 | ✅ | 2769 | Altenstadt | 5.416 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 2772 | Dörpen | 5.405 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 2773 | Forchtenberg | 5.405 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2774 | Rehfelde | 5.403 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 2775 | Rottendorf | 5.398 | OpenStreetMap (Geofabrik-Auszug) | 3 | 5 | fertig | 
 | ✅ | 2778 | Ertingen | 5.381 | OpenStreetMap (Geofabrik-Auszug) | 2 | 9 | fertig | 
 | ✅ | 2781 | Ludwigsau | 5.375 | OpenStreetMap (Geofabrik-Auszug) | 1 | 20 | fertig | 
 | ✅ | 2782 | Rockenhausen | 5.371 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 2783 | Bad Gottleuba-Berggießhübel | 5.367 | OpenStreetMap (Geofabrik-Auszug) | 4 | 8 | fertig | 
 | ✅ | 2784 | Bernhardswald | 5.366 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2785 | Neuenkirchen | 5.365 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2786 | Wackersdorf | 5.364 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 2787 | Külsheim | 5.360 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 2788 | Grebenstein | 5.358 | OpenStreetMap (Geofabrik-Auszug) | 1 | 4 | fertig | 
 | ✅ | 2789 | Nackenheim | 5.358 | OpenStreetMap (Geofabrik-Auszug) | 6 | 6 | fertig | 
 | ✅ | 2793 | Sasbach | 5.357 | OpenStreetMap (Geofabrik-Auszug) | 4 | 6 | fertig | 
 | ✅ | 2796 | Gersfeld (Rhön) | 5.352 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 2797 | Wannweil | 5.352 | OpenStreetMap (Geofabrik-Auszug) | 3 | 5 | fertig | 
 | ✅ | 2798 | Stühlingen | 5.351 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 2800 | Guxhagen | 5.347 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 2801 | Norderney | 5.343 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2804 | Kirchdorf a.Inn | 5.341 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 2806 | Ranstadt | 5.340 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2807 | Nünchritz | 5.339 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 2808 | Kusel | 5.332 | OpenStreetMap (Geofabrik-Auszug) | 37 | 38 | fertig | 
 | ✅ | 2810 | Wörthsee | 5.330 | OpenStreetMap (Geofabrik-Auszug) | 3 | 6 | fertig | 
 | ✅ | 2811 | Dietzhölztal | 5.328 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 2814 | Uhlstädt-Kirchhasel | 5.320 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2815 | Schechen | 5.316 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2816 | Schönau a.Königssee | 5.315 | OpenStreetMap (Geofabrik-Auszug) | 5 | 10 | fertig | 
 | ✅ | 2817 | Tiefenbronn | 5.315 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2818 | Zarrentin am Schaalsee | 5.312 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 2822 | Rosengarten | 5.309 | OpenStreetMap (Geofabrik-Auszug) | 6 | 7 | fertig | 
 | ✅ | 2825 | Angelbachtal | 5.299 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2826 | Meckesheim | 5.298 | OpenStreetMap (Geofabrik-Auszug) | 8 | 13 | fertig | 
 | ✅ | 2827 | Neuberg | 5.296 | OpenStreetMap (Geofabrik-Auszug) | 5 | 9 | fertig | 
 | ✅ | 2828 | Seubersdorf i.d.OPf. | 5.295 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 2829 | Jestetten | 5.290 | OpenStreetMap (Geofabrik-Auszug) | 4 | 6 | fertig | 
 | ✅ | 2830 | Laaber | 5.290 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2833 | Calberlah | 5.288 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 2834 | Ebstorf | 5.288 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2835 | Waldems | 5.288 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 2837 | Prüm | 5.284 | OpenStreetMap (Geofabrik-Auszug) | 6 | 11 | fertig | 
 | ✅ | 2838 | Bergrheinfeld | 5.276 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 2841 | Schöppenstedt | 5.265 | OpenStreetMap (Geofabrik-Auszug) | 1 | 4 | fertig | 
 | ✅ | 2845 | Jahnsdorf/Erzgeb. | 5.262 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 2846 | Erdmannhausen | 5.261 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 2847 | Süderbrarup | 5.255 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 2848 | Ühlingen-Birkendorf | 5.255 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 2849 | Mahlberg | 5.254 | OpenStreetMap (Geofabrik-Auszug) | 5 | 9 | fertig | 
 | ✅ | 2850 | Mühlhausen | 5.251 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 2852 | Pommelsbrunn | 5.242 | OpenStreetMap (Geofabrik-Auszug) | 5 | 14 | fertig | 
 | ✅ | 2853 | Ellrich | 5.239 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 2855 | Hemhofen | 5.220 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 2856 | Iffezheim | 5.219 | OpenStreetMap (Geofabrik-Auszug) | 5 | 7 | fertig | 
 | ✅ | 2857 | Großschirma | 5.217 | OpenStreetMap (Geofabrik-Auszug) | 6 | 8 | fertig | 
 | ✅ | 2859 | Adelsheim | 5.207 | OpenStreetMap (Geofabrik-Auszug) | 5 | 6 | fertig | 
 | ✅ | 2861 | Lenzkirch | 5.201 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2862 | Oettingen i.Bay. | 5.196 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 2864 | Wörth a.d.Donau | 5.196 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 2865 | Pottenstein | 5.190 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 2866 | Reichenau | 5.189 | OpenStreetMap (Geofabrik-Auszug) | 9 | 11 | fertig | 
 | ✅ | 2867 | Reichertshausen | 5.188 | OpenStreetMap (Geofabrik-Auszug) | 3 | 5 | fertig | 
 | ✅ | 2868 | Diemelstadt | 5.186 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 2871 | Himmelpforten | 5.172 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 2872 | Burg Stargard | 5.171 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 2873 | Lonsee | 5.170 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2874 | Tharandt | 5.170 | OpenStreetMap (Geofabrik-Auszug) | 4 | 8 | fertig | 
 | ✅ | 2877 | Steyerberg | 5.159 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 2879 | Erlenbach | 5.155 | OpenStreetMap (Geofabrik-Auszug) | 4 | 4 | fertig | 
 | ✅ | 2880 | Karlskron | 5.150 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 2881 | Wermsdorf | 5.148 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2882 | Kitzscher | 5.140 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 2884 | Bad Bellingen | 5.134 | OpenStreetMap (Geofabrik-Auszug) | 3 | 5 | fertig | 
 | ✅ | 2885 | Steißlingen | 5.133 | OpenStreetMap (Geofabrik-Auszug) | 5 | 8 | fertig | 
 | ✅ | 2886 | Oberammergau | 5.132 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 2887 | Sulzfeld | 5.131 | OpenStreetMap (Geofabrik-Auszug) | 4 | 6 | fertig | 
 | ✅ | 2888 | Ruhla | 5.126 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2889 | Hofheim i.UFr. | 5.125 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 2890 | Waldmohr | 5.124 | OpenStreetMap (Geofabrik-Auszug) | 4 | 4 | fertig | 
 | ✅ | 2891 | Achstetten | 5.116 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2892 | Bad Boll | 5.116 | OpenStreetMap (Geofabrik-Auszug) | 2 | 6 | fertig | 
 | ✅ | 2893 | Großschönau | 5.114 | OpenStreetMap (Geofabrik-Auszug) | 7 | 18 | fertig | 
 | ✅ | 2894 | Ötigheim | 5.110 | OpenStreetMap (Geofabrik-Auszug) | 12 | 39 | fertig | 
 | ✅ | 2895 | Büsum | 5.105 | OpenStreetMap (Geofabrik-Auszug) | 4 | 10 | fertig | 
 | ✅ | 2896 | Sundhagen | 5.096 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 2898 | Neuhausen | 5.095 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 2900 | Modautal | 5.090 | OpenStreetMap (Geofabrik-Auszug) | 4 | 4 | fertig | 
 | ✅ | 2901 | Gadebusch | 5.087 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 2902 | Glonn | 5.085 | OpenStreetMap (Geofabrik-Auszug) | 4 | 6 | fertig | 
 | ✅ | 2903 | Heiningen | 5.077 | OpenStreetMap (Geofabrik-Auszug) | 1 | 5 | fertig | 
 | ✅ | 2904 | Laufach | 5.075 | OpenStreetMap (Geofabrik-Auszug) | 8 | 14 | fertig | 
 | ✅ | 2906 | Trappenkamp | 5.073 | OpenStreetMap (Geofabrik-Auszug) | 7 | 7 | fertig | 
 | ✅ | 2907 | Espenau | 5.069 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 2908 | Deggingen | 5.066 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 2909 | Lensahn | 5.066 | OpenStreetMap (Geofabrik-Auszug) | 13 | 16 | fertig | 
 | ✅ | 2910 | Mammendorf | 5.066 | OpenStreetMap (Geofabrik-Auszug) | 8 | 10 | fertig | 
 | ✅ | 2911 | Wiggensbach | 5.065 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 2913 | Igensdorf | 5.063 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2916 | Bad Hindelang | 5.058 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 2917 | Driedorf | 5.056 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2920 | Oerlenbach | 5.051 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2921 | Unkel | 5.051 | OpenStreetMap (Geofabrik-Auszug) | 8 | 9 | fertig | 
 | ✅ | 2922 | Heroldsbach | 5.050 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 2923 | Binz | 5.049 | OpenStreetMap (Geofabrik-Auszug) | 5 | 33 | fertig | 
 | ✅ | 2925 | Engstingen | 5.041 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 2926 | Marxzell | 5.040 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 2929 | Illerkirchberg | 5.036 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 2931 | Weitramsdorf | 5.029 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2933 | Krauchenwies | 5.023 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 2935 | Zschorlau | 5.018 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2936 | Lichtenau | 5.015 | OpenStreetMap (Geofabrik-Auszug) | 19 | 25 | fertig | 
 | ✅ | 2937 | Großheubach | 5.013 | OpenStreetMap (Geofabrik-Auszug) | 6 | 8 | fertig | 
 | ✅ | 2938 | Übersee | 5.013 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2940 | Windorf | 5.005 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2943 | Petersaurach | 5.000 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2944 | Halsbrücke | 4.999 | OpenStreetMap (Geofabrik-Auszug) | 6 | 9 | fertig | 
 | ✅ | 2945 | Hügelsheim | 4.999 | OpenStreetMap (Geofabrik-Auszug) | 8 | 12 | fertig | 
 | ✅ | 2946 | Rheinzabern | 4.998 | OpenStreetMap (Geofabrik-Auszug) | 8 | 9 | fertig | 
 | ✅ | 2947 | Altentreptow | 4.992 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 2949 | Fronreute | 4.983 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 2950 | Emmelshausen | 4.980 | OpenStreetMap (Geofabrik-Auszug) | 8 | 10 | fertig | 
 | ✅ | 2951 | Windischeschenbach | 4.980 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 2952 | Lohsa | 4.978 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2954 | Schwaan | 4.976 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2955 | Abstatt | 4.975 | OpenStreetMap (Geofabrik-Auszug) | 6 | 12 | fertig | 
 | ✅ | 2958 | Molfsee | 4.972 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2962 | Arnsdorf | 4.960 | OpenStreetMap (Geofabrik-Auszug) | 4 | 11 | fertig | 
 | ✅ | 2963 | Todtnau | 4.960 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2966 | Oberthulba | 4.948 | OpenStreetMap (Geofabrik-Auszug) | 2 | 11 | fertig | 
 | ✅ | 2967 | Cochem | 4.946 | OpenStreetMap (Geofabrik-Auszug) | 10 | 14 | fertig | 
 | ✅ | 2971 | Naumburg | 4.935 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 2976 | Waldbüttelbrunn | 4.926 | OpenStreetMap (Geofabrik-Auszug) | 6 | 7 | fertig | 
 | ✅ | 2978 | Zapfendorf | 4.922 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 2979 | Niederstotzingen | 4.916 | OpenStreetMap (Geofabrik-Auszug) | 6 | 9 | fertig | 
 | ✅ | 2983 | Niederstetten | 4.906 | OpenStreetMap (Geofabrik-Auszug) | 6 | 9 | fertig | 
 | ✅ | 2984 | Oberviechtach | 4.905 | OpenStreetMap (Geofabrik-Auszug) | 2 | 7 | fertig | 
 | ✅ | 2987 | Kröpelin | 4.899 | OpenStreetMap (Geofabrik-Auszug) | 2 | 5 | fertig | 
 | ✅ | 2988 | Lenting | 4.895 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 2990 | Vacha | 4.891 | OpenStreetMap (Geofabrik-Auszug) | 1 | 15 | fertig | 
 | ✅ | 2992 | Hartheim am Rhein | 4.887 | OpenStreetMap (Geofabrik-Auszug) | 2 | 12 | fertig | 
 | ✅ | 2999 | Wiesentheid | 4.875 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3001 | Winhöring | 4.871 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 3005 | Rust | 4.865 | OpenStreetMap (Geofabrik-Auszug) | 6 | 10 | fertig | 
 | ✅ | 3007 | Stetten am kalten Markt | 4.859 | OpenStreetMap (Geofabrik-Auszug) | 4 | 4 | fertig | 
 | ✅ | 3008 | Lauchheim | 4.857 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 3009 | Emmingen-Liptingen | 4.856 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 3010 | Stavenhagen | 4.855 | OpenStreetMap (Geofabrik-Auszug) | 4 | 4 | fertig | 
 | ✅ | 3011 | Brachttal | 4.844 | OpenStreetMap (Geofabrik-Auszug) | 10 | 61 | fertig | 
 | ✅ | 3012 | Drebach | 4.844 | OpenStreetMap (Geofabrik-Auszug) | 1 | 4 | fertig | 
 | ✅ | 3013 | Hammersbach | 4.843 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 3014 | Stadecken-Elsheim | 4.842 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 3018 | Braunlage | 4.839 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 3019 | Bodman-Ludwigshafen | 4.838 | OpenStreetMap (Geofabrik-Auszug) | 6 | 18 | fertig | 
 | ✅ | 3020 | Eriskirch | 4.834 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 3022 | Aglasterhausen | 4.825 | OpenStreetMap (Geofabrik-Auszug) | 5 | 8 | fertig | 
 | ✅ | 3023 | Inning a.Ammersee | 4.822 | OpenStreetMap (Geofabrik-Auszug) | 2 | 5 | fertig | 
 | ✅ | 3027 | Alheim | 4.819 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3028 | Krayenberggemeinde | 4.818 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3029 | Malschwitz | 4.818 | OpenStreetMap (Geofabrik-Auszug) | 3 | 5 | fertig | 
 | ✅ | 3032 | Neuhausen/Spree | 4.814 | OpenStreetMap (Geofabrik-Auszug) | 9 | 16 | fertig | 
 | ✅ | 3034 | Tönning | 4.814 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 3036 | Eggesin | 4.812 | OpenStreetMap (Geofabrik-Auszug) | 5 | 5 | fertig | 
 | ✅ | 3037 | Kruft | 4.800 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3039 | Seddiner See | 4.794 | OpenStreetMap (Geofabrik-Auszug) | 4 | 8 | fertig | 
 | ✅ | 3042 | Uttenreuth | 4.790 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3046 | Chieming | 4.778 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 3051 | Wörth a.Main | 4.769 | OpenStreetMap (Geofabrik-Auszug) | 4 | 6 | fertig | 
 | ✅ | 3052 | Iphofen | 4.768 | OpenStreetMap (Geofabrik-Auszug) | 7 | 7 | fertig | 
 | ✅ | 3058 | Asbach-Bäumenheim | 4.750 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 3059 | Vellberg | 4.747 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3060 | Gablingen | 4.746 | OpenStreetMap (Geofabrik-Auszug) | 4 | 4 | fertig | 
 | ✅ | 3061 | Uchte | 4.745 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3062 | Rückersdorf | 4.744 | OpenStreetMap (Geofabrik-Auszug) | 2 | 9 | fertig | 
 | ✅ | 3063 | Mietingen | 4.743 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 3064 | Neukirch/Lausitz | 4.742 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3066 | Herbertingen | 4.738 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 3067 | Lommatzsch | 4.737 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 3069 | Maselheim | 4.736 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 3070 | Bad Bocklet | 4.734 | OpenStreetMap (Geofabrik-Auszug) | 6 | 13 | fertig | 
 | ✅ | 3072 | Hilders | 4.733 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 3073 | Raschau-Markersbach | 4.730 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 3075 | Hochspeyer | 4.721 | OpenStreetMap (Geofabrik-Auszug) | 4 | 7 | fertig | 
 | ✅ | 3078 | Hesel | 4.714 | OpenStreetMap (Geofabrik-Auszug) | 6 | 6 | fertig | 
 | ✅ | 3081 | Niederwiesa | 4.712 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 3082 | Geisa | 4.708 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 3083 | Inzell | 4.704 | OpenStreetMap (Geofabrik-Auszug) | 2 | 9 | fertig | 
 | ✅ | 3084 | Börnsen | 4.702 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 3085 | Jahnatal | 4.702 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3086 | Wildeck | 4.701 | OpenStreetMap (Geofabrik-Auszug) | 3 | 5 | fertig | 
 | ✅ | 3087 | Thum | 4.695 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3088 | Bellenberg | 4.694 | OpenStreetMap (Geofabrik-Auszug) | 3 | 5 | fertig | 
 | ✅ | 3089 | Aindling | 4.691 | OpenStreetMap (Geofabrik-Auszug) | 5 | 5 | fertig | 
 | ✅ | 3090 | Buchholz (Westerwald) | 4.688 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 3091 | Altenstadt a.d.Waldnaab | 4.687 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 3092 | Heideck | 4.684 | OpenStreetMap (Geofabrik-Auszug) | 2 | 20 | fertig | 
 | ✅ | 3093 | Röbel/Müritz | 4.684 | OpenStreetMap (Geofabrik-Auszug) | 2 | 5 | fertig | 
 | ✅ | 3094 | Otterfing | 4.682 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3095 | Duingen | 4.680 | OpenStreetMap (Geofabrik-Auszug) | 12 | 43 | fertig | 
 | ✅ | 3096 | Burgheim | 4.678 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 3099 | Waldbrunn | 4.670 | OpenStreetMap (Geofabrik-Auszug) | 1 | 6 | fertig | 
 | ✅ | 3102 | Königsbrück | 4.665 | OpenStreetMap (Geofabrik-Auszug) | 4 | 4 | fertig | 
 | ✅ | 3104 | Neunkirchen a.Sand | 4.662 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 3106 | Vierkirchen | 4.654 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 3109 | Eisingen | 4.648 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 3111 | Leidersbach | 4.642 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3112 | Wilthen | 4.642 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3114 | Hörsel | 4.636 | OpenStreetMap (Geofabrik-Auszug) | 2 | 6 | fertig | 
 | ✅ | 3115 | Lähden | 4.631 | OpenStreetMap (Geofabrik-Auszug) | 3 | 5 | fertig | 
 | ✅ | 3117 | Kreischa | 4.629 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 3119 | Röttenbach | 4.625 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 3120 | Müllrose | 4.622 | OpenStreetMap (Geofabrik-Auszug) | 6 | 15 | fertig | 
 | ✅ | 3123 | Bad Bodenteich | 4.609 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3126 | Gutach im Breisgau | 4.599 | OpenStreetMap (Geofabrik-Auszug) | 4 | 6 | fertig | 
 | ✅ | 3128 | Marklohe | 4.594 | OpenStreetMap (Geofabrik-Auszug) | 14 | 18 | fertig | 
 | ✅ | 3130 | Bergen | 4.592 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 3133 | Nastätten | 4.588 | OpenStreetMap (Geofabrik-Auszug) | 5 | 7 | fertig | 
 | ✅ | 3135 | Scheinfeld | 4.583 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3137 | Eberhardzell | 4.580 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 3140 | Reichenbach/O.L. | 4.574 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3141 | Striegistal | 4.570 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 3143 | Hitzacker (Elbe) | 4.566 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3144 | Oy-Mittelberg | 4.564 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 3145 | Forbach | 4.562 | OpenStreetMap (Geofabrik-Auszug) | 4 | 4 | fertig | 
 | ✅ | 3147 | Krautheim | 4.561 | OpenStreetMap (Geofabrik-Auszug) | 1 | 11 | fertig | 
 | ✅ | 3149 | Bönningstedt | 4.559 | OpenStreetMap (Geofabrik-Auszug) | 9 | 10 | fertig | 
 | ✅ | 3153 | Bubenreuth | 4.547 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3154 | Aßling | 4.545 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 3156 | Böbingen an der Rems | 4.539 | OpenStreetMap (Geofabrik-Auszug) | 5 | 7 | fertig | 
 | ✅ | 3159 | Altdorf | 4.529 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 3164 | Limbach | 4.513 | OpenStreetMap (Geofabrik-Auszug) | 1 | 15 | fertig | 
 | ✅ | 3165 | Freden (Leine) | 4.508 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3168 | Ober-Olm | 4.497 | OpenStreetMap (Geofabrik-Auszug) | 2 | 5 | fertig | 
 | ✅ | 3174 | Heimbach | 4.487 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 3175 | Marlow | 4.487 | OpenStreetMap (Geofabrik-Auszug) | 1 | 6 | fertig | 
 | ✅ | 3176 | Breitengüßbach | 4.481 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 3181 | Rhede (Ems) | 4.465 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 3182 | Rennerod | 4.464 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 3183 | Rauschenberg | 4.463 | OpenStreetMap (Geofabrik-Auszug) | 4 | 4 | fertig | 
 | ✅ | 3184 | Vöhringen | 4.462 | OpenStreetMap (Geofabrik-Auszug) | 4 | 8 | fertig | 
 | ✅ | 3185 | Rheinbreitbach | 4.460 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3187 | Ummendorf | 4.456 | OpenStreetMap (Geofabrik-Auszug) | 8 | 9 | fertig | 
 | ✅ | 3188 | Creglingen | 4.453 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3189 | Adorf/Vogtl. | 4.451 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3190 | Gerabronn | 4.451 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3192 | Buggingen | 4.449 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3195 | Knüllwald | 4.443 | OpenStreetMap (Geofabrik-Auszug) | 15 | 24 | fertig | 
 | ✅ | 3198 | Putbus | 4.441 | OpenStreetMap (Geofabrik-Auszug) | 5 | 9 | fertig | 
 | ✅ | 3199 | Grebenhain | 4.436 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3200 | Oppenweiler | 4.435 | OpenStreetMap (Geofabrik-Auszug) | 11 | 20 | fertig | 
 | ✅ | 3201 | Freyburg (Unstrut) | 4.433 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 3203 | Mittelbiberach | 4.433 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3204 | Scheidegg | 4.432 | OpenStreetMap (Geofabrik-Auszug) | 1 | 6 | fertig | 
 | ✅ | 3209 | Maikammer | 4.426 | OpenStreetMap (Geofabrik-Auszug) | 7 | 8 | fertig | 
 | ✅ | 3210 | Wachenheim an der Weinstraße | 4.421 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 3211 | Dahlem | 4.416 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 3212 | Liebenwalde | 4.413 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 3213 | Stegen | 4.413 | OpenStreetMap (Geofabrik-Auszug) | 7 | 7 | fertig | 
 | ✅ | 3214 | Hartenstein | 4.411 | OpenStreetMap (Geofabrik-Auszug) | 4 | 5 | fertig | 
 | ✅ | 3215 | Wörth | 4.409 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 3216 | Albershausen | 4.408 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 3220 | Breitungen/Werra | 4.394 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3221 | Kirchberg i.Wald | 4.392 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3222 | Nehren | 4.390 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3224 | Güntersleben | 4.382 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3225 | Hartmannsdorf | 4.382 | OpenStreetMap (Geofabrik-Auszug) | 11 | 11 | fertig | 
 | ✅ | 3226 | Augustusburg | 4.379 | OpenStreetMap (Geofabrik-Auszug) | 3 | 10 | fertig | 
 | ✅ | 3227 | Suderburg | 4.379 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 3231 | Münsing | 4.373 | OpenStreetMap (Geofabrik-Auszug) | 5 | 6 | fertig | 
 | ✅ | 3232 | Starzach | 4.373 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 3234 | Poppenhausen | 4.371 | OpenStreetMap (Geofabrik-Auszug) | 3 | 8 | fertig | 
 | ✅ | 3237 | Untereisesheim | 4.367 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3240 | Zell a.Main | 4.360 | OpenStreetMap (Geofabrik-Auszug) | 8 | 11 | fertig | 
 | ✅ | 3241 | Rabenau | 4.359 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 3242 | Donaustauf | 4.357 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3243 | Langenlonsheim | 4.357 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 3245 | Hankensbüttel | 4.354 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 3246 | Heiligengrabe | 4.352 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3247 | Dornum | 4.351 | OpenStreetMap (Geofabrik-Auszug) | 5 | 7 | fertig | 
 | ✅ | 3249 | Contwig | 4.348 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 3251 | Surwold | 4.346 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 3252 | Ehrenfriedersdorf | 4.343 | OpenStreetMap (Geofabrik-Auszug) | 5 | 8 | fertig | 
 | ✅ | 3253 | Eurasburg | 4.343 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 3255 | Feldafing | 4.337 | OpenStreetMap (Geofabrik-Auszug) | 5 | 7 | fertig | 
 | ✅ | 3257 | Offingen | 4.336 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 3261 | Grabenstätt | 4.324 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3262 | Röhrnbach | 4.323 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3265 | Mögglingen | 4.317 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 3266 | Feldberger Seenlandschaft | 4.315 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3271 | Edling | 4.307 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3272 | Kranzberg | 4.304 | OpenStreetMap (Geofabrik-Auszug) | 1 | 4 | fertig | 
 | ✅ | 3273 | Schnaittenbach | 4.304 | OpenStreetMap (Geofabrik-Auszug) | 3 | 6 | fertig | 
 | ✅ | 3275 | Wilster | 4.302 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3276 | Peitz | 4.301 | OpenStreetMap (Geofabrik-Auszug) | 2 | 5 | fertig | 
 | ✅ | 3277 | Gößweinstein | 4.298 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 3278 | Badbergen | 4.297 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3279 | Dahn | 4.297 | OpenStreetMap (Geofabrik-Auszug) | 2 | 5 | fertig | 
 | ✅ | 3280 | Rheinböllen | 4.296 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3282 | Reinhardshagen | 4.291 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3283 | Dransfeld | 4.290 | OpenStreetMap (Geofabrik-Auszug) | 4 | 4 | fertig | 
 | ✅ | 3284 | Triefenstein | 4.289 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 3285 | Metten | 4.288 | OpenStreetMap (Geofabrik-Auszug) | 2 | 101 | fertig | 
 | ✅ | 3287 | Olbersdorf | 4.281 | OpenStreetMap (Geofabrik-Auszug) | 3 | 11 | fertig | 
 | ✅ | 3289 | Strasburg (Uckermark) | 4.278 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3293 | Empfingen | 4.269 | OpenStreetMap (Geofabrik-Auszug) | 2 | 7 | fertig | 
 | ✅ | 3296 | Baumholder | 4.265 | OpenStreetMap (Geofabrik-Auszug) | 1 | 4 | fertig | 
 | ✅ | 3297 | Neufahrn i.NB | 4.263 | OpenStreetMap (Geofabrik-Auszug) | 2 | 14 | fertig | 
 | ✅ | 3301 | Eching | 4.254 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 3302 | Grettstadt | 4.251 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 3306 | Neureichenau | 4.238 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 3308 | Wachau | 4.233 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 3309 | Waldfischbach-Burgalben | 4.232 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3311 | Schwarzenbach a.Wald | 4.231 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 3312 | Aichhalden | 4.225 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 3315 | Neuzelle | 4.223 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 3316 | Bodenwöhr | 4.221 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 3319 | Twistetal | 4.219 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3321 | Pressath | 4.217 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 3323 | Nienstädt | 4.216 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3324 | Messel | 4.215 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 3325 | Niederdorfelden | 4.215 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3327 | Sennfeld | 4.212 | OpenStreetMap (Geofabrik-Auszug) | 8 | 10 | fertig | 
 | ✅ | 3328 | Amstetten | 4.208 | OpenStreetMap (Geofabrik-Auszug) | 7 | 8 | fertig | 
 | ✅ | 3331 | Dietingen | 4.204 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 3337 | Neckarbischofsheim | 4.195 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3338 | Bürgstadt | 4.193 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 3339 | Lauenau | 4.191 | OpenStreetMap (Geofabrik-Auszug) | 4 | 5 | fertig | 
 | ✅ | 3340 | Kirchberg (Hunsrück) | 4.189 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 3341 | Loitz | 4.189 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3342 | Elmenhorst/Lichtenhagen | 4.186 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 3344 | Niedernhall | 4.185 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3347 | Winkelhaid | 4.184 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 3348 | Wiesenburg/Mark | 4.182 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3349 | Vogtei | 4.180 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3350 | Burg (Spreewald) | 4.179 | OpenStreetMap (Geofabrik-Auszug) | 7 | 9 | fertig | 
 | ✅ | 3353 | Weinbach | 4.176 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3354 | Wietzendorf | 4.176 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 3355 | Lindhorst | 4.175 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3357 | Rockenberg | 4.173 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3358 | Gondelsheim | 4.172 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 3361 | Baruth/Mark | 4.168 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3362 | Eging a.See | 4.168 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 3363 | Bruck i.d.OPf. | 4.167 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3366 | Bermatingen | 4.160 | OpenStreetMap (Geofabrik-Auszug) | 8 | 12 | fertig | 
 | ✅ | 3367 | Gräfenberg | 4.160 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3369 | Zaberfeld | 4.156 | OpenStreetMap (Geofabrik-Auszug) | 7 | 10 | fertig | 
 | ✅ | 3377 | Reichenberg | 4.148 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 3380 | Dahlen | 4.144 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 3381 | Kirchberg an der Murr | 4.144 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 3383 | Stammham | 4.142 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 3385 | Altenmarkt a.d.Alz | 4.141 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 3386 | Graal-Müritz | 4.141 | OpenStreetMap (Geofabrik-Auszug) | 3 | 5 | fertig | 
 | ✅ | 3387 | Selbitz | 4.141 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3388 | Tessin | 4.139 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3389 | Schöllkrippen | 4.136 | OpenStreetMap (Geofabrik-Auszug) | 3 | 7 | fertig | 
 | ✅ | 3391 | Niederfischbach | 4.129 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 3395 | Wyk auf Föhr | 4.113 | OpenStreetMap (Geofabrik-Auszug) | 4 | 8 | fertig | 
 | ✅ | 3396 | Buchenberg | 4.110 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3397 | Baunach | 4.109 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 3398 | Fronhausen | 4.108 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3401 | Pfaffing | 4.104 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 3402 | Schwebheim | 4.103 | OpenStreetMap (Geofabrik-Auszug) | 4 | 7 | fertig | 
 | ✅ | 3406 | Kochel a.See | 4.095 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 3412 | Escheburg | 4.075 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3413 | Mauer | 4.073 | OpenStreetMap (Geofabrik-Auszug) | 5 | 7 | fertig | 
 | ✅ | 3415 | Langenbach | 4.068 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3417 | Geringswalde | 4.066 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3420 | Friolzheim | 4.062 | OpenStreetMap (Geofabrik-Auszug) | 2 | 7 | fertig | 
 | ✅ | 3421 | Sörup | 4.060 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 3422 | Neckarwestheim | 4.059 | OpenStreetMap (Geofabrik-Auszug) | 5 | 6 | fertig | 
 | ✅ | 3424 | Mühlhausen-Ehingen | 4.054 | OpenStreetMap (Geofabrik-Auszug) | 9 | 14 | fertig | 
 | ✅ | 3428 | Walkenried | 4.053 | OpenStreetMap (Geofabrik-Auszug) | 2 | 15 | fertig | 
 | ✅ | 3430 | Lichtenfels | 4.051 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3435 | Rothenburg/O.L. | 4.047 | OpenStreetMap (Geofabrik-Auszug) | 4 | 13 | fertig | 
 | ✅ | 3437 | Gelenau/Erzgeb. | 4.039 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 3438 | Graben | 4.038 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 3445 | Gars a.Inn | 4.021 | OpenStreetMap (Geofabrik-Auszug) | 4 | 5 | fertig | 
 | ✅ | 3446 | Kraiburg a.Inn | 4.021 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 3450 | Kreßberg | 4.008 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3451 | Otterbach | 4.008 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3453 | Ellhofen | 3.998 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 3454 | Gau-Odernheim | 3.995 | OpenStreetMap (Geofabrik-Auszug) | 5 | 6 | fertig | 
 | ✅ | 3455 | Lambrecht (Pfalz) | 3.995 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 3457 | Hasloh | 3.990 | OpenStreetMap (Geofabrik-Auszug) | 3 | 8 | fertig | 
 | ✅ | 3459 | Mertingen | 3.980 | OpenStreetMap (Geofabrik-Auszug) | 3 | 5 | fertig | 
 | ✅ | 3460 | Seckach | 3.978 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3463 | Waldalgesheim | 3.975 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3464 | Bad Tabarz | 3.973 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 3465 | Hattorf am Harz | 3.972 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3468 | Kritzmow | 3.964 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3470 | Sprendlingen | 3.959 | OpenStreetMap (Geofabrik-Auszug) | 7 | 9 | fertig | 
 | ✅ | 3475 | Bad Zwesten | 3.941 | OpenStreetMap (Geofabrik-Auszug) | 6 | 8 | fertig | 
 | ✅ | 3476 | Guntersblum | 3.941 | OpenStreetMap (Geofabrik-Auszug) | 4 | 4 | fertig | 
 | ✅ | 3479 | Waldenburg | 3.941 | OpenStreetMap (Geofabrik-Auszug) | 1 | 40 | fertig | 
 | ✅ | 3481 | Hütschenhausen | 3.937 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 3482 | Schefflenz | 3.933 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3484 | Rosenbach/Vogtl. | 3.927 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 3485 | Philippsthal (Werra) | 3.926 | OpenStreetMap (Geofabrik-Auszug) | 4 | 15 | fertig | 
 | ✅ | 3486 | Neukloster | 3.925 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3487 | Schönberg | 3.925 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3488 | Dassow | 3.922 | OpenStreetMap (Geofabrik-Auszug) | 3 | 8 | fertig | 
 | ✅ | 3490 | Cadenberge | 3.917 | OpenStreetMap (Geofabrik-Auszug) | 6 | 6 | fertig | 
 | ✅ | 3491 | Wiesau | 3.916 | OpenStreetMap (Geofabrik-Auszug) | 1 | 7 | fertig | 
 | ✅ | 3492 | Eschau | 3.915 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 3496 | Süderholz | 3.911 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3497 | Amorbach | 3.907 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 3499 | Marschacht | 3.895 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3500 | Wäschenbeuren | 3.895 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 3504 | Gensingen | 3.889 | OpenStreetMap (Geofabrik-Auszug) | 15 | 17 | fertig | 
 | ✅ | 3505 | Helmstadt-Bargen | 3.887 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 3506 | Grafrath | 3.885 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 3509 | Lunzenau | 3.880 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 3510 | Kiedrich | 3.873 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 3513 | Hoya | 3.862 | OpenStreetMap (Geofabrik-Auszug) | 4 | 6 | fertig | 
 | ✅ | 3515 | Wolfegg | 3.861 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3516 | Germaringen | 3.860 | OpenStreetMap (Geofabrik-Auszug) | 4 | 4 | fertig | 
 | ✅ | 3519 | Hamm (Sieg) | 3.851 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 3521 | Welden | 3.849 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3524 | Pressig | 3.843 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3525 | Neckartailfingen | 3.841 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3528 | Billigheim-Ingenheim | 3.833 | OpenStreetMap (Geofabrik-Auszug) | 1 | 8 | fertig | 
 | ✅ | 3530 | Andechs | 3.830 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3532 | Neckarsteinach | 3.828 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 3533 | Allendorf (Lumda) | 3.824 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 3536 | Wasserburg (Bodensee) | 3.823 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3537 | Eigeltingen | 3.821 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3540 | St. Blasien | 3.818 | OpenStreetMap (Geofabrik-Auszug) | 4 | 6 | fertig | 
 | ✅ | 3542 | Loiching | 3.814 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 3543 | Marklkofen | 3.813 | OpenStreetMap (Geofabrik-Auszug) | 1 | 15 | fertig | 
 | ✅ | 3546 | Kyffhäuserland | 3.810 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 3549 | Heßdorf | 3.808 | OpenStreetMap (Geofabrik-Auszug) | 2 | 7 | fertig | 
 | ✅ | 3550 | Regis-Breitingen | 3.803 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3554 | Schonach im Schwarzwald | 3.800 | OpenStreetMap (Geofabrik-Auszug) | 2 | 6 | fertig | 
 | ✅ | 3555 | Biberach | 3.799 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 3556 | Groß Grönau | 3.795 | OpenStreetMap (Geofabrik-Auszug) | 4 | 7 | fertig | 
 | ✅ | 3557 | Aukrug | 3.794 | OpenStreetMap (Geofabrik-Auszug) | 4 | 7 | fertig | 
 | ✅ | 3562 | Göllheim | 3.789 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3563 | Nesselwang | 3.789 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3566 | Eppendorf | 3.787 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3568 | Eichstetten am Kaiserstuhl | 3.780 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 3569 | Lorch | 3.780 | OpenStreetMap (Geofabrik-Auszug) | 5 | 7 | fertig | 
 | ✅ | 3572 | Schondorf am Ammersee | 3.776 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3573 | Rimsting | 3.775 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3574 | Neudrossenfeld | 3.774 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3575 | Hollenstedt | 3.771 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3577 | Warngau | 3.768 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 3579 | Döhlau | 3.767 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3580 | Zinnowitz | 3.765 | OpenStreetMap (Geofabrik-Auszug) | 7 | 12 | fertig | 
 | ✅ | 3581 | Rickenbach | 3.764 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 3583 | Wolkenstein | 3.762 | OpenStreetMap (Geofabrik-Auszug) | 1 | 6 | fertig | 
 | ✅ | 3584 | Neukirchen/Pleiße | 3.761 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3586 | Wahrenholz | 3.760 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3592 | Trebsen/Mulde | 3.744 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 3594 | Albersdorf | 3.742 | OpenStreetMap (Geofabrik-Auszug) | 5 | 5 | fertig | 
 | ✅ | 3596 | Bergtheim | 3.740 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 3599 | Letschin | 3.735 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3600 | Sigmaringendorf | 3.735 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3602 | Ruhland | 3.728 | OpenStreetMap (Geofabrik-Auszug) | 11 | 11 | fertig | 
 | ✅ | 3604 | Sankt Peter-Ording | 3.724 | OpenStreetMap (Geofabrik-Auszug) | 7 | 10 | fertig | 
 | ✅ | 3606 | Michelfeld | 3.720 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 3608 | Buttenheim | 3.719 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 3610 | Vettelschoß | 3.718 | OpenStreetMap (Geofabrik-Auszug) | 1 | 4 | fertig | 
 | ✅ | 3611 | Icking | 3.715 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3612 | Bevern | 3.714 | OpenStreetMap (Geofabrik-Auszug) | 4 | 5 | fertig | 
 | ✅ | 3614 | Markersdorf | 3.709 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 3615 | Bad Kleinen | 3.704 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3621 | Hausen | 3.698 | OpenStreetMap (Geofabrik-Auszug) | 8 | 8 | fertig | 
 | ✅ | 3622 | Malsfeld | 3.698 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 3623 | Liebenau | 3.695 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3631 | Forstern | 3.683 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 3633 | Burgstetten | 3.681 | OpenStreetMap (Geofabrik-Auszug) | 5 | 12 | fertig | 
 | ✅ | 3634 | Speicher | 3.681 | OpenStreetMap (Geofabrik-Auszug) | 8 | 38 | fertig | 
 | ✅ | 3635 | Benediktbeuern | 3.679 | OpenStreetMap (Geofabrik-Auszug) | 2 | 6 | fertig | 
 | ✅ | 3638 | Wallhausen | 3.671 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 3639 | Hechthausen | 3.669 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 3645 | Pürgen | 3.659 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 3647 | Langenenslingen | 3.649 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 3649 | Kraftsdorf | 3.646 | OpenStreetMap (Geofabrik-Auszug) | 5 | 8 | fertig | 
 | ✅ | 3652 | Bodenmais | 3.641 | OpenStreetMap (Geofabrik-Auszug) | 3 | 5 | fertig | 
 | ✅ | 3661 | Unterwössen | 3.633 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3664 | Bad Salzschlirf | 3.629 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3666 | Deidesheim | 3.623 | OpenStreetMap (Geofabrik-Auszug) | 3 | 5 | fertig | 
 | ✅ | 3667 | Kirchheim | 3.623 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 3668 | Gechingen | 3.621 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3669 | Türkenfeld | 3.619 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 3672 | Freudenberg | 3.615 | OpenStreetMap (Geofabrik-Auszug) | 2 | 5 | fertig | 
 | ✅ | 3677 | Kleinheubach | 3.607 | OpenStreetMap (Geofabrik-Auszug) | 4 | 5 | fertig | 
 | ✅ | 3679 | Triptis | 3.606 | OpenStreetMap (Geofabrik-Auszug) | 6 | 7 | fertig | 
 | ✅ | 3681 | Klein-Winternheim | 3.600 | OpenStreetMap (Geofabrik-Auszug) | 5 | 9 | fertig | 
 | ✅ | 3684 | Eystrup | 3.597 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 3686 | Beuren | 3.591 | OpenStreetMap (Geofabrik-Auszug) | 8 | 9 | fertig | 
 | ✅ | 3687 | Amtsberg | 3.590 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 3688 | Orsingen-Nenzingen | 3.588 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 3689 | Bentwisch | 3.582 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 3690 | Hildrizhausen | 3.581 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 3693 | Bad Muskau | 3.577 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3695 | Farchant | 3.571 | OpenStreetMap (Geofabrik-Auszug) | 2 | 8 | fertig | 
 | ✅ | 3696 | Sexau | 3.568 | OpenStreetMap (Geofabrik-Auszug) | 6 | 12 | fertig | 
 | ✅ | 3699 | Tegernsee | 3.567 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 3701 | Grainau | 3.564 | OpenStreetMap (Geofabrik-Auszug) | 4 | 24 | fertig | 
 | ✅ | 3702 | Aiterhofen | 3.563 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 3708 | Sailauf | 3.555 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3709 | Marktrodach | 3.554 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 3711 | Bad Elster | 3.552 | OpenStreetMap (Geofabrik-Auszug) | 1 | 24 | fertig | 
 | ✅ | 3712 | Dörfles-Esbach | 3.549 | OpenStreetMap (Geofabrik-Auszug) | 4 | 7 | fertig | 
 | ✅ | 3714 | Zornheim | 3.549 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3715 | Happurg | 3.547 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 3717 | Parthenstein | 3.545 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3720 | Hauenstein | 3.541 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3721 | Seifhennersdorf | 3.536 | OpenStreetMap (Geofabrik-Auszug) | 3 | 5 | fertig | 
 | ✅ | 3724 | Ronneburg | 3.532 | OpenStreetMap (Geofabrik-Auszug) | 4 | 9 | fertig | 
 | ✅ | 3727 | Schiltach | 3.517 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 3731 | Stromberg | 3.514 | OpenStreetMap (Geofabrik-Auszug) | 3 | 7 | fertig | 
 | ✅ | 3733 | Burgbernheim | 3.512 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 3736 | Jemgum | 3.506 | OpenStreetMap (Geofabrik-Auszug) | 4 | 5 | fertig | 
 | ✅ | 3740 | Lalendorf | 3.493 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3744 | Schwindegg | 3.490 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 3745 | Straßkirchen | 3.489 | OpenStreetMap (Geofabrik-Auszug) | 4 | 6 | fertig | 
 | ✅ | 3746 | Sankt Michaelisdonn | 3.487 | OpenStreetMap (Geofabrik-Auszug) | 5 | 6 | fertig | 
 | ✅ | 3747 | Heimenkirch | 3.484 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 3749 | Ölbronn-Dürrn | 3.483 | OpenStreetMap (Geofabrik-Auszug) | 6 | 12 | fertig | 
 | ✅ | 3750 | Hirschhorn (Neckar) | 3.482 | OpenStreetMap (Geofabrik-Auszug) | 4 | 4 | fertig | 
 | ✅ | 3751 | Sasbach am Kaiserstuhl | 3.481 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3753 | Malsch | 3.478 | OpenStreetMap (Geofabrik-Auszug) | 8 | 13 | fertig | 
 | ✅ | 3756 | Neustadt (Dosse) | 3.469 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 3758 | Malterdingen | 3.467 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 3760 | Lucka | 3.457 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 3763 | Beindersheim | 3.451 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 3765 | Lauben | 3.448 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3769 | Berge | 3.436 | OpenStreetMap (Geofabrik-Auszug) | 3 | 36 | fertig | 
 | ✅ | 3770 | Grafenrheinfeld | 3.435 | OpenStreetMap (Geofabrik-Auszug) | 1 | 4 | fertig | 
 | ✅ | 3772 | Ulmen | 3.432 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 3782 | Moos | 3.417 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 3783 | Owen | 3.417 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3784 | Spreenhagen | 3.417 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 3786 | Gößnitz | 3.413 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 3789 | Angelburg | 3.410 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 3795 | Bad Klosterlausnitz | 3.399 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 3807 | Valley | 3.385 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 3811 | Baierbrunn | 3.376 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3812 | Kranichfeld | 3.376 | OpenStreetMap (Geofabrik-Auszug) | 3 | 7 | fertig | 
 | ✅ | 3813 | Bad Karlshafen | 3.373 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 3815 | Urmitz | 3.373 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 3818 | Ohlsbach | 3.368 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 3821 | Langenhorn | 3.363 | OpenStreetMap (Geofabrik-Auszug) | 4 | 4 | fertig | 
 | ✅ | 3823 | Hoppstädten-Weiersbach | 3.362 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 3824 | Illerrieden | 3.361 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3825 | Erolzheim | 3.360 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3826 | Poppenricht | 3.360 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3831 | Volkertshausen | 3.354 | OpenStreetMap (Geofabrik-Auszug) | 6 | 25 | fertig | 
 | ✅ | 3832 | Randersacker | 3.353 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3834 | Bad Schandau | 3.346 | OpenStreetMap (Geofabrik-Auszug) | 14 | 20 | fertig | 
 | ✅ | 3841 | Hohenlinden | 3.339 | OpenStreetMap (Geofabrik-Auszug) | 1 | 6 | fertig | 
 | ✅ | 3846 | Spraitbach | 3.335 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 3847 | Gaienhofen | 3.334 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 3848 | Offenberg | 3.334 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 3849 | Wilhelmsfeld | 3.332 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 3850 | Bischofsmais | 3.331 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 3851 | Colbitz | 3.331 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 3852 | Leutersdorf | 3.330 | OpenStreetMap (Geofabrik-Auszug) | 1 | 7 | fertig | 
 | ✅ | 3854 | Michelbach an der Bilz | 3.325 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3855 | Auma-Weidatal | 3.324 | OpenStreetMap (Geofabrik-Auszug) | 3 | 5 | fertig | 
 | ✅ | 3856 | Krakow am See | 3.324 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 3857 | Ohlstadt | 3.323 | OpenStreetMap (Geofabrik-Auszug) | 4 | 5 | fertig | 
 | ✅ | 3859 | Schwarzatal | 3.319 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3863 | Walheim | 3.316 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3868 | Mühlberg/Elbe | 3.309 | OpenStreetMap (Geofabrik-Auszug) | 4 | 7 | fertig | 
 | ✅ | 3875 | Bempflingen | 3.301 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 3879 | Tuningen | 3.292 | OpenStreetMap (Geofabrik-Auszug) | 1 | 5 | fertig | 
 | ✅ | 3882 | Marzling | 3.287 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 3884 | Plate | 3.283 | OpenStreetMap (Geofabrik-Auszug) | 2 | 6 | fertig | 
 | ✅ | 3886 | Staig | 3.281 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 3890 | Scharnebeck | 3.279 | OpenStreetMap (Geofabrik-Auszug) | 5 | 12 | fertig | 
 | ✅ | 3892 | Leinach | 3.277 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3893 | Berkheim | 3.275 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3894 | Deckenpfronn | 3.274 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 3895 | Kirchenthumbach | 3.274 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 3896 | Saalburg-Ebersdorf | 3.271 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 3897 | Neuler | 3.270 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 3898 | Tüßling | 3.270 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 3902 | Schwegenheim | 3.267 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 3903 | Waldburg | 3.267 | OpenStreetMap (Geofabrik-Auszug) | 1 | 4 | fertig | 
 | ✅ | 3907 | Schwangau | 3.263 | OpenStreetMap (Geofabrik-Auszug) | 1 | 7 | fertig | 
 | ✅ | 3908 | Burgbrohl | 3.262 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 3909 | Elchesheim-Illingen | 3.262 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3911 | Unterbreizbach | 3.261 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 3915 | Haina (Kloster) | 3.256 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 3916 | Kaisersesch | 3.256 | OpenStreetMap (Geofabrik-Auszug) | 9 | 13 | fertig | 
 | ✅ | 3918 | Geyer | 3.255 | OpenStreetMap (Geofabrik-Auszug) | 4 | 13 | fertig | 
 | ✅ | 3919 | Warin | 3.255 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 3923 | Lorup | 3.247 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 3925 | Münchhausen | 3.243 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 3927 | Bad Steben | 3.240 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 3928 | Hunderdorf | 3.238 | OpenStreetMap (Geofabrik-Auszug) | 1 | 7 | fertig | 
 | ✅ | 3930 | Bodnegg | 3.235 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 3935 | Harthausen | 3.230 | OpenStreetMap (Geofabrik-Auszug) | 2 | 27 | fertig | 
 | ✅ | 3937 | Simmelsdorf | 3.229 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 3938 | Gosen-Neu Zittau | 3.226 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 3939 | Irschenberg | 3.226 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 3941 | Bad Teinach-Zavelstein | 3.220 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3943 | Obermichelbach | 3.217 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3944 | Wörth a.d.Isar | 3.214 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 3946 | Hillesheim | 3.207 | OpenStreetMap (Geofabrik-Auszug) | 2 | 6 | fertig | 
 | ✅ | 3950 | Bischoffen | 3.196 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 3952 | Vörstetten | 3.196 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3953 | Stephansposching | 3.189 | OpenStreetMap (Geofabrik-Auszug) | 6 | 6 | fertig | 
 | ✅ | 3954 | Glattbach | 3.186 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 3957 | Dorf Mecklenburg | 3.183 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3959 | Wangen | 3.183 | OpenStreetMap (Geofabrik-Auszug) | 7 | 7 | fertig | 
 | ✅ | 3970 | Alteglofsheim | 3.171 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3971 | Hammah | 3.171 | OpenStreetMap (Geofabrik-Auszug) | 2 | 6 | fertig | 
 | ✅ | 3976 | Buckenhof | 3.161 | OpenStreetMap (Geofabrik-Auszug) | 7 | 10 | fertig | 
 | ✅ | 3982 | Fischen i.Allgäu | 3.156 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 3984 | Eicklingen | 3.151 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3985 | Seeshaupt | 3.151 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3986 | Hohnstein | 3.150 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 3989 | Birkenheide | 3.146 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 3994 | Hülben | 3.135 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 3995 | Lauscha | 3.133 | OpenStreetMap (Geofabrik-Auszug) | 3 | 5 | fertig | 
 | ✅ | 4004 | Hirrlingen | 3.123 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 4005 | Babensham | 3.122 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4006 | Kirchenlamitz | 3.122 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4010 | Pfatter | 3.119 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4011 | Cleebronn | 3.118 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 4014 | Gimbsheim | 3.113 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4015 | Margetshöchheim | 3.113 | OpenStreetMap (Geofabrik-Auszug) | 7 | 11 | fertig | 
 | ✅ | 4023 | Mommenheim | 3.106 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 4036 | Hodenhagen | 3.099 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 4040 | Priestewitz | 3.094 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 4046 | Klein Offenseth-Sparrieshoop | 3.088 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 4047 | Maroldsweisach | 3.088 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 4048 | Radibor | 3.084 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4053 | St. Egidien | 3.077 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 4060 | Vogtareuth | 3.072 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 4064 | Großenaspe | 3.068 | OpenStreetMap (Geofabrik-Auszug) | 8 | 10 | fertig | 
 | ✅ | 4066 | Ludwigsstadt | 3.068 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4070 | Seeg | 3.061 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4071 | Sand a.Main | 3.060 | OpenStreetMap (Geofabrik-Auszug) | 5 | 8 | fertig | 
 | ✅ | 4073 | Burgberg i.Allgäu | 3.057 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 4075 | Hettenleidelheim | 3.056 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 4079 | Kammerstein | 3.050 | OpenStreetMap (Geofabrik-Auszug) | 3 | 9 | fertig | 
 | ✅ | 4081 | Föhren | 3.048 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 4083 | Werther | 3.047 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4084 | Gailingen am Hochrhein | 3.044 | OpenStreetMap (Geofabrik-Auszug) | 4 | 8 | fertig | 
 | ✅ | 4085 | Königheim | 3.043 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4087 | Pampow | 3.040 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 4088 | Hanerau-Hademarschen | 3.037 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 4089 | Jesewitz | 3.036 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 4090 | Klütz | 3.036 | OpenStreetMap (Geofabrik-Auszug) | 8 | 19 | fertig | 
 | ✅ | 4092 | Hohenroda | 3.033 | OpenStreetMap (Geofabrik-Auszug) | 7 | 10 | fertig | 
 | ✅ | 4097 | Aitrach | 3.028 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 4101 | Glauburg | 3.018 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 4102 | Hahnstätten | 3.018 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 4103 | Herschbach | 3.018 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4104 | Neuental | 3.018 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 4108 | Bayerisch Gmain | 3.014 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4110 | Schafflund | 3.014 | OpenStreetMap (Geofabrik-Auszug) | 5 | 6 | fertig | 
 | ✅ | 4112 | Klosterlechfeld | 3.008 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4114 | Aidenbach | 3.005 | OpenStreetMap (Geofabrik-Auszug) | 3 | 5 | fertig | 
 | ✅ | 4115 | Bischweier | 3.003 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 4116 | Braubach | 3.002 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 4117 | Rengsdorf | 3.001 | OpenStreetMap (Geofabrik-Auszug) | 4 | 11 | fertig | 
 | ✅ | 4119 | Eitensheim | 2.999 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4123 | Kalchreuth | 2.994 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4124 | Lohmen | 2.994 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 4125 | Frasdorf | 2.993 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4127 | Wesenberg | 2.992 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4129 | Münster-Sarmsheim | 2.989 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 4131 | Binzen | 2.988 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 4133 | Waldenburg | 2.986 | OpenStreetMap (Geofabrik-Auszug) | 4 | 9 | fertig | 
 | ✅ | 4138 | Dirmstein | 2.982 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4139 | Kobern-Gondorf | 2.982 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 4140 | Neuenstein | 2.981 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 4152 | Bodolz | 2.962 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4155 | Memmingerberg | 2.957 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 4158 | Horgau | 2.953 | OpenStreetMap (Geofabrik-Auszug) | 4 | 7 | fertig | 
 | ✅ | 4160 | Großharthau | 2.952 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 4163 | Berglern | 2.945 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4172 | Nebra (Unstrut) | 2.937 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 4175 | Adenau | 2.935 | OpenStreetMap (Geofabrik-Auszug) | 15 | 30 | fertig | 
 | ✅ | 4179 | Heroldstatt | 2.931 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4180 | Sigmarszell | 2.931 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4186 | Schwarzach | 2.925 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4187 | Mönsheim | 2.924 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 4189 | Lindow (Mark) | 2.921 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4194 | Meißner | 2.915 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 4195 | Beetzendorf | 2.913 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4200 | Undenheim | 2.906 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 4201 | Claußnitz | 2.905 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 4204 | Euerbach | 2.899 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 4207 | Kenn | 2.897 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4208 | Fichtenberg | 2.895 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 4209 | Lambrechtshagen | 2.894 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 4213 | Schopfloch | 2.890 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 4217 | Huglfing | 2.882 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 4219 | Hatzenbühl | 2.881 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 4220 | Kirchweidach | 2.881 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4223 | Weißenstadt | 2.880 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 4225 | Dollnstein | 2.878 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 4227 | Wildflecken | 2.876 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 4230 | Aichstetten | 2.874 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 4232 | Heidgraben | 2.872 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 4233 | Wischhafen | 2.869 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 4235 | Dömitz | 2.864 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 4237 | Zemmer | 2.864 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 4239 | Lengerich | 2.862 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 4240 | Hemmingstedt | 2.860 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 4245 | Sulzemoos | 2.859 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4247 | Blender | 2.850 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4249 | Sollstedt | 2.849 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 4250 | Offenau | 2.848 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 4251 | Simmozheim | 2.848 | OpenStreetMap (Geofabrik-Auszug) | 5 | 9 | fertig | 
 | ✅ | 4254 | Eggstätt | 2.846 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 4263 | Ringgau | 2.830 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 4264 | Elfershausen | 2.827 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 4269 | Zingst | 2.823 | OpenStreetMap (Geofabrik-Auszug) | 13 | 16 | fertig | 
 | ✅ | 4272 | Marktleuthen | 2.820 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 4273 | Schenefeld | 2.820 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 4279 | Marktl | 2.812 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 4281 | Kallmünz | 2.810 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 4283 | Roxheim | 2.807 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4295 | Detern | 2.789 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 4298 | Embsen | 2.787 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 4301 | Haste | 2.785 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 4302 | Käbschütztal | 2.783 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 4303 | Frankenau | 2.782 | OpenStreetMap (Geofabrik-Auszug) | 2 | 5 | fertig | 
 | ✅ | 4305 | Reinsberg | 2.777 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 4306 | Landesbergen | 2.774 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4311 | Tonna | 2.769 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4320 | Lehrensteinsfeld | 2.758 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 4322 | Rieseby | 2.755 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 4323 | Altenglan | 2.754 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 4326 | Bretzenheim | 2.752 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 4330 | Wertach | 2.749 | OpenStreetMap (Geofabrik-Auszug) | 3 | 6 | fertig | 
 | ✅ | 4335 | Iffeldorf | 2.743 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 4336 | Lengdorf | 2.742 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4337 | Salching | 2.742 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 4339 | Münchweiler an der Rodalb | 2.739 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 4340 | Sontheim | 2.739 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4342 | Weyhausen | 2.735 | OpenStreetMap (Geofabrik-Auszug) | 5 | 6 | fertig | 
 | ✅ | 4345 | Eschelbronn | 2.733 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 4350 | Niederzissen | 2.729 | OpenStreetMap (Geofabrik-Auszug) | 7 | 20 | fertig | 
 | ✅ | 4353 | St. Peter | 2.727 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 4354 | Kutzenhausen | 2.726 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4361 | Thaleischweiler-Fröschen | 2.718 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 4368 | Fischbachtal | 2.707 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 4369 | Grafling | 2.707 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 4379 | Hohenkammer | 2.697 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4385 | Rositz | 2.686 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4386 | Waigolshausen | 2.686 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 4388 | Möttingen | 2.683 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4391 | Roggenburg | 2.679 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 4394 | Neuhaus a.d.Pegnitz | 2.676 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 4397 | Probstzella | 2.672 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 4400 | Friedewald | 2.668 | OpenStreetMap (Geofabrik-Auszug) | 4 | 5 | fertig | 
 | ✅ | 4404 | Erxleben | 2.664 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 4405 | Themar | 2.664 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4416 | Elstra | 2.651 | OpenStreetMap (Geofabrik-Auszug) | 7 | 9 | fertig | 
 | ✅ | 4417 | Thüngersheim | 2.649 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 4419 | Oberelsbach | 2.647 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4422 | Ringsheim | 2.645 | OpenStreetMap (Geofabrik-Auszug) | 6 | 9 | fertig | 
 | ✅ | 4423 | Großweitzschen | 2.643 | OpenStreetMap (Geofabrik-Auszug) | 10 | 10 | fertig | 
 | ✅ | 4432 | Steinberg | 2.633 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 4433 | Grafenberg | 2.632 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 4434 | Kist | 2.632 | OpenStreetMap (Geofabrik-Auszug) | 1 | 4 | fertig | 
 | ✅ | 4436 | Prittriching | 2.630 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4440 | Hanhofen | 2.624 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4446 | Herleshausen | 2.620 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 4448 | Kefenrod | 2.616 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 4452 | Adelsried | 2.610 | OpenStreetMap (Geofabrik-Auszug) | 1 | 4 | fertig | 
 | ✅ | 4456 | Nordendorf | 2.599 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 4460 | Burkau | 2.595 | OpenStreetMap (Geofabrik-Auszug) | 2 | 5 | fertig | 
 | ✅ | 4461 | Dieblich | 2.595 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 4462 | Pfaffenhofen | 2.593 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4465 | Lam | 2.586 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4466 | Bad Peterstal-Griesbach | 2.583 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 4467 | Leimersheim | 2.583 | OpenStreetMap (Geofabrik-Auszug) | 2 | 5 | fertig | 
 | ✅ | 4472 | Lentföhrden | 2.579 | OpenStreetMap (Geofabrik-Auszug) | 1 | 4 | fertig | 
 | ✅ | 4473 | Schluchsee | 2.577 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 4474 | Rosenberg | 2.575 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 4475 | Wohltorf | 2.575 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4482 | Schönwald im Schwarzwald | 2.566 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 4488 | Nußdorf a.Inn | 2.562 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4489 | Sulzbach-Laufen | 2.560 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4495 | Erpel | 2.554 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 4497 | Brohl-Lützing | 2.553 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 4498 | Hetzerath | 2.553 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 4501 | Kinding | 2.549 | OpenStreetMap (Geofabrik-Auszug) | 1 | 4 | fertig | 
 | ✅ | 4502 | Ostelsheim | 2.549 | OpenStreetMap (Geofabrik-Auszug) | 4 | 7 | fertig | 
 | ✅ | 4503 | Eime | 2.548 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4505 | Helmstadt | 2.547 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 4507 | Freihung | 2.545 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 4513 | Puderbach | 2.542 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4514 | Berghaupten | 2.539 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 4515 | Salmtal | 2.539 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 4516 | Wiesenttal | 2.539 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4517 | Sasbachwalden | 2.538 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 4518 | Wasbek | 2.536 | OpenStreetMap (Geofabrik-Auszug) | 1 | 6 | fertig | 
 | ✅ | 4522 | Dernbach (Westerwald) | 2.533 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4525 | Igling | 2.531 | OpenStreetMap (Geofabrik-Auszug) | 4 | 4 | fertig | 
 | ✅ | 4527 | Schwörstadt | 2.531 | OpenStreetMap (Geofabrik-Auszug) | 11 | 20 | fertig | 
 | ✅ | 4528 | Eimeldingen | 2.529 | OpenStreetMap (Geofabrik-Auszug) | 4 | 4 | fertig | 
 | ✅ | 4529 | Gägelow | 2.529 | OpenStreetMap (Geofabrik-Auszug) | 1 | 4 | fertig | 
 | ✅ | 4532 | Schleusegrund | 2.528 | OpenStreetMap (Geofabrik-Auszug) | 3 | 5 | fertig | 
 | ✅ | 4534 | Oberwolfach | 2.527 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4536 | Heede | 2.526 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4537 | Lauenbrück | 2.526 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 4539 | Geldersheim | 2.524 | OpenStreetMap (Geofabrik-Auszug) | 4 | 6 | fertig | 
 | ✅ | 4540 | Wustrow (Wendland) | 2.524 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4546 | Hausen b.Würzburg | 2.520 | OpenStreetMap (Geofabrik-Auszug) | 4 | 9 | fertig | 
 | ✅ | 4547 | Ehrenberg (Rhön) | 2.519 | OpenStreetMap (Geofabrik-Auszug) | 3 | 9 | fertig | 
 | ✅ | 4548 | Rötgesbüttel | 2.519 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4553 | Bad Wilsnack | 2.512 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4554 | Sellin | 2.511 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4555 | Hinterzarten | 2.510 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 4557 | Insel Poel | 2.507 | OpenStreetMap (Geofabrik-Auszug) | 2 | 12 | fertig | 
 | ✅ | 4561 | Halbe | 2.504 | OpenStreetMap (Geofabrik-Auszug) | 31 | 60 | fertig | 
 | ✅ | 4566 | Hessigheim | 2.502 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4568 | Mönchberg | 2.500 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4570 | Chamerau | 2.498 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4571 | Bad Eilsen | 2.494 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 4574 | Hillerse | 2.489 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4579 | Edesheim | 2.486 | OpenStreetMap (Geofabrik-Auszug) | 4 | 4 | fertig | 
 | ✅ | 4580 | Eitelborn | 2.486 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 4585 | Hollenbach | 2.484 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 4587 | Eichenbühl | 2.481 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4588 | Gaiberg | 2.480 | OpenStreetMap (Geofabrik-Auszug) | 2 | 6 | fertig | 
 | ✅ | 4589 | Beimerstetten | 2.479 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4590 | Königshain-Wiederau | 2.479 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 4595 | Straßberg | 2.474 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 4597 | Braunsbach | 2.472 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 4602 | Oberpframmern | 2.467 | OpenStreetMap (Geofabrik-Auszug) | 3 | 5 | fertig | 
 | ✅ | 4607 | Papendorf | 2.464 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 4610 | Ellerstadt | 2.459 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4611 | Golßen | 2.458 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4614 | Weitersburg | 2.457 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 4615 | Friedrichskoog | 2.456 | OpenStreetMap (Geofabrik-Auszug) | 4 | 5 | fertig | 
 | ✅ | 4620 | Gyhum | 2.451 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4622 | Epfenbach | 2.448 | OpenStreetMap (Geofabrik-Auszug) | 1 | 8 | fertig | 
 | ✅ | 4623 | Hergatz | 2.448 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4626 | Elmstein | 2.446 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4631 | Ohorn | 2.443 | OpenStreetMap (Geofabrik-Auszug) | 2 | 6 | fertig | 
 | ✅ | 4633 | Muhr a.See | 2.441 | OpenStreetMap (Geofabrik-Auszug) | 3 | 5 | fertig | 
 | ✅ | 4636 | Barendorf | 2.436 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4640 | Borstel-Hohenraden | 2.432 | OpenStreetMap (Geofabrik-Auszug) | 1 | 4 | fertig | 
 | ✅ | 4644 | Boltenhagen | 2.430 | OpenStreetMap (Geofabrik-Auszug) | 7 | 12 | fertig | 
 | ✅ | 4649 | Weiding | 2.424 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4650 | Seehausen a.Staffelsee | 2.422 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 4652 | Bernried am Starnberger See | 2.420 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 4659 | Röderaue | 2.413 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4671 | Wees | 2.400 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 4672 | Weisenbach | 2.400 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 4674 | Handeloh | 2.399 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4679 | Winningen | 2.390 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 4681 | Ziesar | 2.389 | OpenStreetMap (Geofabrik-Auszug) | 1 | 5 | fertig | 
 | ✅ | 4682 | Hürup | 2.388 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4683 | Kummerfeld | 2.386 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 4686 | Hochdorf | 2.383 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4692 | Wegeleben | 2.378 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4693 | Aach | 2.377 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4697 | Hausen im Wiesental | 2.371 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4699 | Pöhl | 2.367 | OpenStreetMap (Geofabrik-Auszug) | 3 | 16 | fertig | 
 | ✅ | 4700 | Bockenheim an der Weinstraße | 2.366 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4705 | Wolpertshausen | 2.365 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 4714 | Breklum | 2.357 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 4717 | Viöl | 2.356 | OpenStreetMap (Geofabrik-Auszug) | 6 | 7 | fertig | 
 | ✅ | 4718 | Lobbach | 2.353 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 4726 | Husby | 2.345 | OpenStreetMap (Geofabrik-Auszug) | 2 | 5 | fertig | 
 | ✅ | 4729 | Wallhausen | 2.344 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 4732 | Mehring | 2.341 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4734 | Neuenkirchen | 2.340 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 4736 | Köditz | 2.339 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4749 | Gartz (Oder) | 2.328 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 4752 | Nordstrand | 2.326 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 4757 | Monsheim | 2.322 | OpenStreetMap (Geofabrik-Auszug) | 12 | 14 | fertig | 
 | ✅ | 4760 | Menslage | 2.318 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 4764 | Arrach | 2.314 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 4765 | Lottstetten | 2.313 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4766 | Gelting | 2.311 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4768 | Heidenau | 2.310 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4770 | Süderlügum | 2.308 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 4772 | Kirchgellersen | 2.306 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4773 | Neumagen-Dhron | 2.306 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4774 | Zwiefalten | 2.305 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4777 | Dobel | 2.297 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 4785 | Schöpstal | 2.288 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4788 | Egmating | 2.286 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 4789 | Taura | 2.285 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4794 | Brieskow-Finkenheerd | 2.282 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 4798 | Gutach (Schwarzwaldbahn) | 2.279 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 4807 | Ronshausen | 2.271 | OpenStreetMap (Geofabrik-Auszug) | 8 | 12 | fertig | 
 | ✅ | 4812 | Neckargerach | 2.266 | OpenStreetMap (Geofabrik-Auszug) | 4 | 6 | fertig | 
 | ✅ | 4813 | Rehden | 2.266 | OpenStreetMap (Geofabrik-Auszug) | 4 | 10 | fertig | 
 | ✅ | 4814 | Remlingen-Semmenstedt | 2.266 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4819 | Lindberg | 2.259 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 4820 | Suhlendorf | 2.256 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 4824 | Dogern | 2.254 | OpenStreetMap (Geofabrik-Auszug) | 6 | 6 | fertig | 
 | ✅ | 4827 | Dollern | 2.251 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 4829 | Gruibingen | 2.249 | OpenStreetMap (Geofabrik-Auszug) | 2 | 7 | fertig | 
 | ✅ | 4834 | Hohnhorst | 2.246 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 4836 | Erfde | 2.243 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4837 | Radbruch | 2.243 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 4853 | Mainbernheim | 2.230 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4854 | Elxleben | 2.229 | OpenStreetMap (Geofabrik-Auszug) | 6 | 6 | fertig | 
 | ✅ | 4869 | Ahorn | 2.209 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 4872 | Chorin | 2.208 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 4879 | Ottrau | 2.207 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 4880 | Iggensbach | 2.206 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 4884 | Dienheim | 2.204 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 4885 | Großenbrode | 2.202 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4887 | Bilshausen | 2.201 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 4888 | Borkheide | 2.201 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4892 | Grosselfingen | 2.198 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 4893 | Kaltenengers | 2.198 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4895 | Ducherow | 2.197 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4900 | Insheim | 2.193 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4901 | Mespelbrunn | 2.193 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 4905 | Wangels | 2.190 | OpenStreetMap (Geofabrik-Auszug) | 2 | 10 | fertig | 
 | ✅ | 4908 | Delingsdorf | 2.186 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4926 | Garz/Rügen | 2.170 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4931 | Rerik | 2.166 | OpenStreetMap (Geofabrik-Auszug) | 3 | 6 | fertig | 
 | ✅ | 4936 | Reit im Winkl | 2.161 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4945 | Reichartshausen | 2.154 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4946 | Bärenstein | 2.152 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 4948 | Königstein/Sächs.Schw. | 2.151 | OpenStreetMap (Geofabrik-Auszug) | 5 | 8 | fertig | 
 | ✅ | 4949 | Kröv | 2.150 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4952 | Jatznick | 2.148 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4953 | Cavertitz | 2.147 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4955 | Albertshofen | 2.142 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 4958 | Heimbuchenthal | 2.140 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 4963 | Balzheim | 2.137 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4965 | Breitenfelde | 2.136 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 4967 | Colmberg | 2.134 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4974 | Frittlingen | 2.127 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4977 | Zeltingen-Rachtig | 2.125 | OpenStreetMap (Geofabrik-Auszug) | 4 | 6 | fertig | 
 | ✅ | 4983 | Treis-Karden | 2.120 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 4984 | Illschwang | 2.114 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 4987 | Westerstetten | 2.111 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 4991 | Egloffstein | 2.108 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 5002 | Egenhausen | 2.099 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 5004 | Merklingen | 2.098 | OpenStreetMap (Geofabrik-Auszug) | 16 | 29 | fertig | 
 | ✅ | 5005 | Sipplingen | 2.098 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 5009 | Melsdorf | 2.096 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 5010 | Felde | 2.095 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 5017 | Steinfeld | 2.088 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 5019 | Brücken (Pfalz) | 2.086 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 5025 | Bernsdorf | 2.083 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 5028 | Geiselbach | 2.080 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 5032 | Hüffenhardt | 2.077 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 5034 | Klostermansfeld | 2.073 | OpenStreetMap (Geofabrik-Auszug) | 1 | 50 | fertig | 
 | ✅ | 5035 | Jembke | 2.072 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 5037 | Kirrweiler (Pfalz) | 2.070 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 5040 | Eresing | 2.066 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 5044 | Meyenburg | 2.061 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 5045 | Weißbach | 2.060 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 5046 | Zandt | 2.057 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 5052 | Weilbach | 2.054 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 5056 | Berghülen | 2.051 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 5062 | Nellingen | 2.047 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 5069 | Neuensalz | 2.041 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 5070 | Bordelum | 2.040 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 5078 | Fleckeby | 2.034 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 5084 | Obergriesbach | 2.030 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 5085 | Neuhäusel | 2.029 | OpenStreetMap (Geofabrik-Auszug) | 7 | 11 | fertig | 
 | ✅ | 5095 | Hagelstadt | 2.020 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 5099 | Waffenbrunn | 2.019 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 5103 | Busdorf | 2.015 | OpenStreetMap (Geofabrik-Auszug) | 3 | 21 | fertig | 
 | ✅ | 5114 | Rieschweiler-Mühlbach | 2.003 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 5123 | Ortrand | 1.996 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 5127 | Masserberg | 1.993 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 5130 | Erkenbrechtsweiler | 1.992 | OpenStreetMap (Geofabrik-Auszug) | 1 | 6 | fertig | 
 | ✅ | 5131 | Lautenbach | 1.991 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 5134 | Lauterecken | 1.990 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 5137 | Rümmingen | 1.989 | OpenStreetMap (Geofabrik-Auszug) | 1 | 5 | fertig | 
 | ✅ | 5142 | Krün | 1.985 | OpenStreetMap (Geofabrik-Auszug) | 2 | 7 | fertig | 
 | ✅ | 5143 | Oderberg | 1.981 | OpenStreetMap (Geofabrik-Auszug) | 11 | 15 | fertig | 
 | ✅ | 5158 | Berg | 1.970 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 5160 | Berg (Pfalz) | 1.969 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 5164 | Rechtsupweg | 1.964 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 5167 | Reckendorf | 1.962 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 5172 | Feldberg (Schwarzwald) | 1.956 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 5173 | Kriebstein | 1.956 | OpenStreetMap (Geofabrik-Auszug) | 3 | 6 | fertig | 
 | ✅ | 5178 | Röthenbach (Allgäu) | 1.955 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 5181 | Ottenhofen | 1.953 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 5182 | Stapel | 1.952 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 5187 | Ebergötzen | 1.949 | OpenStreetMap (Geofabrik-Auszug) | 8 | 9 | fertig | 
 | ✅ | 5188 | Neusorg | 1.949 | OpenStreetMap (Geofabrik-Auszug) | 3 | 6 | fertig | 
 | ✅ | 5192 | Wirsberg | 1.945 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 5195 | Schöngeising | 1.943 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 5197 | Dormitz | 1.942 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 5199 | Ehingen | 1.940 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 5204 | Dammbach | 1.938 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 5206 | Todtmoos | 1.938 | OpenStreetMap (Geofabrik-Auszug) | 2 | 6 | fertig | 
 | ✅ | 5215 | Ottensoos | 1.931 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 5216 | Schmalfeld | 1.931 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 5218 | Oberwiesenthal | 1.929 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 5219 | Immenreuth | 1.928 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 5224 | Vrees | 1.926 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 5228 | Rullstorf | 1.920 | OpenStreetMap (Geofabrik-Auszug) | 1 | 4 | fertig | 
 | ✅ | 5229 | Leutenberg | 1.919 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 5248 | Teupitz | 1.902 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 5249 | Müglitztal | 1.900 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 5250 | Neufra | 1.899 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 5268 | Ringelai | 1.890 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 5271 | Glaubitz | 1.886 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 5272 | Meudt | 1.885 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 5289 | Kirchheim an der Weinstraße | 1.871 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 5290 | Tiefenbach | 1.871 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 5293 | Kelberg | 1.869 | OpenStreetMap (Geofabrik-Auszug) | 7 | 14 | fertig | 
 | ✅ | 5296 | Rieneck | 1.868 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 5312 | Hamberge | 1.854 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 5314 | Gebhardshain | 1.852 | OpenStreetMap (Geofabrik-Auszug) | 4 | 5 | fertig | 
 | ✅ | 5317 | Hofstetten | 1.850 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 5324 | Steinfeld | 1.844 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 5327 | Ebrach | 1.843 | OpenStreetMap (Geofabrik-Auszug) | 2 | 16 | fertig | 
 | ✅ | 5333 | Rechlin | 1.841 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 5336 | Hausen (Wied) | 1.840 | OpenStreetMap (Geofabrik-Auszug) | 1 | 5 | fertig | 
 | ✅ | 5338 | Neukirchen | 1.839 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 5340 | Eurasburg | 1.838 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 5344 | Wasbüttel | 1.836 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 5346 | Wolfstein | 1.835 | OpenStreetMap (Geofabrik-Auszug) | 1 | 80 | fertig | 
 | ✅ | 5357 | Sankt Englmar | 1.827 | OpenStreetMap (Geofabrik-Auszug) | 1 | 4 | fertig | 
 | ✅ | 5365 | Droyßig | 1.820 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 5369 | Wörnitz | 1.819 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 5370 | Brunnen | 1.818 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 5372 | Arzberg | 1.815 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 5380 | Drakenburg | 1.812 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 5388 | Bernau im Schwarzwald | 1.806 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 5393 | Nortmoor | 1.805 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 5400 | Grünendeich | 1.798 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 5402 | Fichtelberg | 1.795 | OpenStreetMap (Geofabrik-Auszug) | 5 | 14 | fertig | 
 | ✅ | 5409 | Erlenmoos | 1.790 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 5413 | Wittighausen | 1.789 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 5414 | Wulften am Harz | 1.789 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 5415 | Freudenburg | 1.788 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 5419 | Jünkerath | 1.784 | OpenStreetMap (Geofabrik-Auszug) | 4 | 9 | fertig | 
 | ✅ | 5421 | Scheden | 1.783 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 5423 | Widdern | 1.782 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 5427 | Oberottmarshausen | 1.773 | OpenStreetMap (Geofabrik-Auszug) | 1 | 4 | fertig | 
 | ✅ | 5429 | Eydelstedt | 1.771 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 5440 | Borgstedt | 1.767 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 5444 | Niederalteich | 1.762 | OpenStreetMap (Geofabrik-Auszug) | 1 | 10 | fertig | 
 | ✅ | 5454 | Nonnenhorn | 1.756 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 5455 | Obermeitingen | 1.756 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 5465 | Weibersbrunn | 1.752 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 5468 | Röllbach | 1.751 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 5470 | Untersteinach | 1.751 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 5477 | Harbke | 1.748 | OpenStreetMap (Geofabrik-Auszug) | 5 | 8 | fertig | 
 | ✅ | 5478 | Jagsthausen | 1.747 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 5491 | Steinkirchen | 1.741 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 5498 | Beesten | 1.736 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 5505 | Kalkhorst | 1.732 | OpenStreetMap (Geofabrik-Auszug) | 2 | 8 | fertig | 
 | ✅ | 5518 | Grabenstetten | 1.726 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 5521 | Walchum | 1.726 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 5523 | Wiemersdorf | 1.724 | OpenStreetMap (Geofabrik-Auszug) | 4 | 6 | fertig | 
 | ✅ | 5526 | Osten | 1.723 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 5528 | Thiersheim | 1.723 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 5532 | Wechselburg | 1.722 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 5540 | Ornbau | 1.720 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 5550 | Dorfprozelten | 1.710 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 5564 | Rhumspringe | 1.703 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 5570 | Irrel | 1.698 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 5571 | Postau | 1.695 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 5574 | Starkenberg | 1.692 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 5581 | Ramsau b.Berchtesgaden | 1.683 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 5584 | Presseck | 1.681 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 5587 | Ranis | 1.680 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 5592 | Sankt Martin | 1.679 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 5598 | Breitenbach a.Herzberg | 1.675 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 5599 | Langenleuba-Niederhain | 1.675 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 5616 | Wain | 1.661 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 5633 | Lalling | 1.651 | OpenStreetMap (Geofabrik-Auszug) | 6 | 8 | fertig | 
 | ✅ | 5645 | Siegelsbach | 1.643 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 5646 | Weidenthal | 1.643 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 5670 | Kollmar | 1.625 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 5675 | Wallhausen | 1.623 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 5676 | Börgerende-Rethwisch | 1.621 | OpenStreetMap (Geofabrik-Auszug) | 5 | 7 | fertig | 
 | ✅ | 5677 | Eching am Ammersee | 1.620 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 5678 | Höfen an der Enz | 1.620 | OpenStreetMap (Geofabrik-Auszug) | 4 | 4 | fertig | 
 | ✅ | 5686 | Krummesse | 1.613 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 5687 | Schondra | 1.613 | OpenStreetMap (Geofabrik-Auszug) | 2 | 6 | fertig | 
 | ✅ | 5692 | Bayrischzell | 1.607 | OpenStreetMap (Geofabrik-Auszug) | 3 | 7 | fertig | 
 | ✅ | 5696 | Vierkirchen | 1.607 | OpenStreetMap (Geofabrik-Auszug) | 6 | 9 | fertig | 
 | ✅ | 5699 | Altenahr | 1.605 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 5708 | Schornsheim | 1.600 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 5711 | Himmelstadt | 1.598 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 5720 | Oberhof | 1.592 | OpenStreetMap (Geofabrik-Auszug) | 3 | 10 | fertig | 
 | ✅ | 5723 | Oberuckersee | 1.589 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 5732 | Grünenbach | 1.581 | OpenStreetMap (Geofabrik-Auszug) | 1 | 4 | fertig | 
 | ✅ | 5733 | Gommersheim | 1.580 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 5742 | Kaiserpfalz | 1.572 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 5746 | Rammingen | 1.569 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 5747 | Rasdorf | 1.569 | OpenStreetMap (Geofabrik-Auszug) | 8 | 11 | fertig | 
 | ✅ | 5749 | Crossen an der Elster | 1.568 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 5754 | Langballig | 1.566 | OpenStreetMap (Geofabrik-Auszug) | 1 | 4 | fertig | 
 | ✅ | 5768 | Saal a.d.Saale | 1.559 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 5776 | Wallmerod | 1.551 | OpenStreetMap (Geofabrik-Auszug) | 4 | 4 | fertig | 
 | ✅ | 5777 | Gablenz | 1.550 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 5778 | Damp | 1.549 | OpenStreetMap (Geofabrik-Auszug) | 3 | 6 | fertig | 
 | ✅ | 5786 | Stadtkyll | 1.546 | OpenStreetMap (Geofabrik-Auszug) | 2 | 7 | fertig | 
 | ✅ | 5790 | Etzenricht | 1.544 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 5791 | Frauenneuharting | 1.543 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 5792 | Grafenwiesen | 1.543 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 5794 | List auf Sylt | 1.540 | OpenStreetMap (Geofabrik-Auszug) | 2 | 9 | fertig | 
 | ✅ | 5795 | Schellhorn | 1.539 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 5799 | Gundersheim | 1.537 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 5805 | Bornheim | 1.533 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 5811 | Koserow | 1.530 | OpenStreetMap (Geofabrik-Auszug) | 9 | 16 | fertig | 
 | ✅ | 5816 | Ellerhoop | 1.526 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 5820 | Hüttisheim | 1.524 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 5824 | Wulkenzin | 1.523 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 5830 | Rosenthal-Bielatal | 1.521 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 5834 | Sukow | 1.517 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 5842 | Zerf | 1.515 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 5866 | Heiligenstedten | 1.500 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 5870 | Mellingen | 1.498 | OpenStreetMap (Geofabrik-Auszug) | 12 | 12 | fertig | 
 | ✅ | 5874 | Flossenbürg | 1.496 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 5877 | Dierhagen | 1.495 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 5884 | Oberostendorf | 1.490 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 5892 | Schaufling | 1.487 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 5894 | Euerdorf | 1.484 | OpenStreetMap (Geofabrik-Auszug) | 7 | 9 | fertig | 
 | ✅ | 5910 | Velgast | 1.476 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 5912 | Rammelsbach | 1.475 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 5928 | Siehdichum | 1.467 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 5935 | Sierksdorf | 1.462 | OpenStreetMap (Geofabrik-Auszug) | 3 | 11 | fertig | 
 | ✅ | 5936 | Heiligenroth | 1.461 | OpenStreetMap (Geofabrik-Auszug) | 4 | 13 | fertig | 
 | ✅ | 5947 | Breitbrunn a.Chiemsee | 1.453 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 5953 | Staudernheim | 1.451 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 5956 | Schönecken | 1.450 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 5970 | Strande | 1.443 | OpenStreetMap (Geofabrik-Auszug) | 3 | 5 | fertig | 
 | ✅ | 5973 | Kleinsendelbach | 1.441 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 5975 | Büsingen am Hochrhein | 1.440 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 5978 | Böttingen | 1.438 | OpenStreetMap (Geofabrik-Auszug) | 1 | 6 | fertig | 
 | ✅ | 5991 | Manderscheid | 1.434 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 5996 | Suthfeld | 1.428 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 5997 | Ziltendorf | 1.428 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 6003 | Oberschwarzach | 1.423 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 6004 | Beckedorf | 1.422 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 6006 | Winterhausen | 1.422 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 6011 | Wollbach | 1.420 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 6019 | Bad Neualbenreuth | 1.412 | OpenStreetMap (Geofabrik-Auszug) | 4 | 4 | fertig | 
 | ✅ | 6021 | Jonsdorf | 1.411 | OpenStreetMap (Geofabrik-Auszug) | 4 | 4 | fertig | 
 | ✅ | 6022 | Bollingstedt | 1.410 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 6023 | Seebach | 1.410 | OpenStreetMap (Geofabrik-Auszug) | 1 | 5 | fertig | 
 | ✅ | 6028 | Ponitz | 1.407 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 6034 | Hagnau am Bodensee | 1.402 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 6047 | Schwenningen | 1.399 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 6070 | Etzelwang | 1.387 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 6071 | Hornbach | 1.387 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 6098 | Agathenburg | 1.371 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 6102 | Gillenfeld | 1.370 | OpenStreetMap (Geofabrik-Auszug) | 1 | 4 | fertig | 
 | ✅ | 6106 | Langenhahn | 1.369 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 6126 | Hornstorf | 1.359 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 6130 | Marktschorgast | 1.357 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 6136 | Trabitz | 1.356 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 6137 | Wiltingen | 1.356 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 6152 | Riol | 1.348 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 6155 | Dürrholz | 1.347 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 6168 | Udenheim | 1.338 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 6175 | Sachsenkam | 1.333 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 6183 | Mogendorf | 1.329 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 6185 | Biendorf | 1.328 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 6196 | Binau | 1.323 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 6202 | Rammenau | 1.321 | OpenStreetMap (Geofabrik-Auszug) | 3 | 5 | fertig | 
 | ✅ | 6203 | Göhren | 1.320 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 6207 | Balgheim | 1.317 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 6217 | Bartenshagen-Parkentin | 1.310 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 6230 | Ebernhahn | 1.303 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 6233 | Düngenheim | 1.302 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 6241 | Schöfweg | 1.297 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 6254 | Mönchhagen | 1.290 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 6255 | Schafstedt | 1.290 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 6276 | Oybin | 1.281 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 6283 | Bad Bayersoien | 1.278 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 6287 | Holtsee | 1.276 | OpenStreetMap (Geofabrik-Auszug) | 1 | 4 | fertig | 
 | ✅ | 6304 | Waake | 1.271 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 6305 | Oldenswort | 1.270 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 6307 | Prerow | 1.269 | OpenStreetMap (Geofabrik-Auszug) | 4 | 10 | fertig | 
 | ✅ | 6312 | Dennheritz | 1.266 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 6316 | Lembruch | 1.265 | OpenStreetMap (Geofabrik-Auszug) | 4 | 4 | fertig | 
 | ✅ | 6317 | Longuich | 1.265 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 6319 | Rammingen | 1.264 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 6320 | Aufseß | 1.263 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 6322 | Stolpe | 1.263 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 6338 | Züssow | 1.255 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 6360 | Stadelhofen | 1.247 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 6368 | Sulzfeld a.Main | 1.242 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 6371 | Gingst | 1.241 | OpenStreetMap (Geofabrik-Auszug) | 1 | 12 | fertig | 
 | ✅ | 6374 | Enzklösterle | 1.240 | OpenStreetMap (Geofabrik-Auszug) | 1 | 6 | fertig | 
 | ✅ | 6378 | Leupoldsgrün | 1.238 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 6380 | Müssen | 1.237 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 6381 | Todendorf | 1.237 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 6392 | Lieser | 1.231 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 6396 | Herforst | 1.228 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 6400 | Schönwald | 1.226 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 6403 | Wiesenau | 1.225 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 6416 | Raitenbuch | 1.219 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 6425 | Essel | 1.213 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 6441 | Rieden | 1.207 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 6453 | Hauptstuhl | 1.199 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 6466 | Freisbach | 1.193 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 6470 | Berlingerode | 1.192 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 6484 | Pellworm | 1.185 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 6489 | Münchweiler an der Alsenz | 1.183 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 6495 | Plötzkau | 1.180 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 6517 | Weißenohe | 1.170 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 6532 | Hunding | 1.162 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 6547 | Neukirchen | 1.156 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 6551 | Wust-Fischbeck | 1.154 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 6561 | Eppelsheim | 1.147 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 6562 | Seelingstädt | 1.147 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 6563 | Hemsbünde | 1.145 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 6578 | Glan-Münchweiler | 1.141 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 6599 | Wustrow | 1.134 | OpenStreetMap (Geofabrik-Auszug) | 5 | 11 | fertig | 
 | ✅ | 6606 | Prosselsheim | 1.130 | OpenStreetMap (Geofabrik-Auszug) | 2 | 50 | fertig | 
 | ✅ | 6614 | Dannewerk | 1.126 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 6615 | Herzhorn | 1.126 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 6620 | Groß Sarau | 1.125 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 6621 | Mühl Rosin | 1.125 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 6626 | Stechlin | 1.123 | OpenStreetMap (Geofabrik-Auszug) | 1 | 6 | fertig | 
 | ✅ | 6634 | Garlstorf | 1.120 | OpenStreetMap (Geofabrik-Auszug) | 4 | 6 | fertig | 
 | ✅ | 6640 | Longkamp | 1.118 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 6648 | Guderhandviertel | 1.116 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 6670 | Eisenberg | 1.103 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 6672 | Glött | 1.103 | OpenStreetMap (Geofabrik-Auszug) | 1 | 14 | fertig | 
 | ✅ | 6673 | Polle | 1.103 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 6677 | Nahrendorf | 1.101 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 6681 | Klüsserath | 1.100 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 6683 | Groß Nemerow | 1.099 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 6685 | Thaining | 1.098 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 6687 | Bastorf | 1.096 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 6694 | Prötzel | 1.093 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 6710 | Altenkrempe | 1.089 | OpenStreetMap (Geofabrik-Auszug) | 3 | 5 | fertig | 
 | ✅ | 6718 | Nister | 1.084 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 6719 | Reuth b.Erbendorf | 1.084 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 6727 | Lürschau | 1.080 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 6739 | Trittenheim | 1.075 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 6741 | Mesekenhagen | 1.074 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 6748 | Mühlhausen im Täle | 1.072 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 6771 | Bimöhlen | 1.061 | OpenStreetMap (Geofabrik-Auszug) | 6 | 10 | fertig | 
 | ✅ | 6774 | Unterroth | 1.061 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 6786 | Gielow | 1.056 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 6787 | Malberg | 1.056 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 6788 | Bettingen | 1.055 | OpenStreetMap (Geofabrik-Auszug) | 2 | 7 | fertig | 
 | ✅ | 6807 | Schinkel | 1.051 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 6811 | Weinsheim | 1.050 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 6822 | Nordheim v.d.Rhön | 1.046 | OpenStreetMap (Geofabrik-Auszug) | 6 | 6 | fertig | 
 | ✅ | 6831 | Gutenberg | 1.043 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 6835 | Marienrachdorf | 1.041 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 6838 | Hirschfeld | 1.040 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 6850 | Bodenrode-Westhausen | 1.036 | OpenStreetMap (Geofabrik-Auszug) | 7 | 7 | fertig | 
 | ✅ | 6869 | Frankenheim/Rhön | 1.029 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 6871 | Hohenkirchen | 1.029 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 6872 | Gattendorf | 1.028 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 6877 | Ückeritz | 1.026 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 6879 | Arenshausen | 1.025 | OpenStreetMap (Geofabrik-Auszug) | 1 | 4 | fertig | 
 | ✅ | 6897 | Bad Bertrich | 1.020 | OpenStreetMap (Geofabrik-Auszug) | 1 | 5 | fertig | 
 | ✅ | 6916 | Bockhorst | 1.015 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 6923 | Born a.Darß | 1.013 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 6926 | Pösing | 1.012 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 6937 | Schönbach | 1.009 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 6946 | Erharting | 1.005 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 6951 | Brokdorf | 1.000 | OpenStreetMap (Geofabrik-Auszug) | 1 | 5 | fertig | 
 | ✅ | 6953 | Emtmannsberg | 998 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 6955 | Guckheim | 997 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 6977 | Kapellen-Drusweiler | 988 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 7001 | Martinsheim | 979 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 7008 | Glowe | 977 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 7009 | Ober-Hilbersheim | 977 | OpenStreetMap (Geofabrik-Auszug) | 1 | 7 | fertig | 
 | ✅ | 7021 | Riethnordhausen | 971 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 7024 | Wilgartswiesen | 970 | OpenStreetMap (Geofabrik-Auszug) | 3 | 7 | fertig | 
 | ✅ | 7037 | Bayerisch Eisenstein | 965 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 7049 | Altdorf | 962 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 7051 | Greimerath | 962 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 7063 | Wiek | 961 | OpenStreetMap (Geofabrik-Auszug) | 1 | 5 | fertig | 
 | ✅ | 7067 | Harsdorf | 959 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 7068 | Mauchenheim | 959 | OpenStreetMap (Geofabrik-Auszug) | 1 | 5 | fertig | 
 | ✅ | 7069 | Müschenbach | 959 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 7071 | Baabe | 957 | OpenStreetMap (Geofabrik-Auszug) | 3 | 6 | fertig | 
 | ✅ | 7097 | Neuharlingersiel | 949 | OpenStreetMap (Geofabrik-Auszug) | 4 | 5 | fertig | 
 | ✅ | 7120 | Lohnsfeld | 941 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 7149 | Hasselberg | 932 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 7151 | Großbardorf | 931 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 7159 | Pelm | 929 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 7172 | Gerolfingen | 925 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 7177 | Vierhöfen | 924 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 7191 | Tiste | 918 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 7194 | Fischbach | 917 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 7196 | Wahlrod | 917 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 7202 | Dagebüll | 914 | OpenStreetMap (Geofabrik-Auszug) | 5 | 7 | fertig | 
 | ✅ | 7203 | Nebel | 914 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 7208 | Spangdahlem | 913 | OpenStreetMap (Geofabrik-Auszug) | 1 | 6 | fertig | 
 | ✅ | 7212 | Tautenhain | 910 | OpenStreetMap (Geofabrik-Auszug) | 1 | 4 | fertig | 
 | ✅ | 7213 | Hörden am Harz | 909 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 7226 | Mühlenfließ | 905 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 7264 | Zempin | 889 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 7280 | Waldlaubersheim | 884 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 7284 | Rathmannsdorf | 882 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 7289 | Lichterfeld-Schacksdorf | 880 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 7292 | Dittweiler | 879 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 7333 | Eldetal | 869 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 7368 | Göhren-Lebbin | 857 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 7379 | Gebenbach | 852 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 7380 | Noer | 852 | OpenStreetMap (Geofabrik-Auszug) | 3 | 5 | fertig | 
 | ✅ | 7406 | Abtswind | 843 | OpenStreetMap (Geofabrik-Auszug) | 1 | 5 | fertig | 
 | ✅ | 7407 | Deutschneudorf | 843 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 7409 | Winterspelt | 842 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 7428 | Pleisweiler-Oberhofen | 836 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 7432 | Steinberg | 835 | OpenStreetMap (Geofabrik-Auszug) | 1 | 4 | fertig | 
 | ✅ | 7464 | Konken | 825 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 7467 | Hörnum (Sylt) | 824 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 7488 | Brinkum | 819 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 7504 | Lohmen | 814 | OpenStreetMap (Geofabrik-Auszug) | 5 | 7 | fertig | 
 | ✅ | 7508 | Rabenstein/Fläming | 813 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 7535 | Nemsdorf-Göhrendorf | 807 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 7542 | Wollin | 805 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 7545 | Stemmen | 804 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 7580 | Loissin | 793 | OpenStreetMap (Geofabrik-Auszug) | 1 | 6 | fertig | 
 | ✅ | 7585 | Neuleiningen | 792 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 7595 | Burrweiler | 790 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 7630 | Mündersbach | 781 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 7634 | Brest | 779 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 7675 | Kempfeld | 766 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 7681 | Barum | 764 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 7682 | Schülldorf | 764 | OpenStreetMap (Geofabrik-Auszug) | 3 | 6 | fertig | 
 | ✅ | 7700 | Trassenheide | 760 | OpenStreetMap (Geofabrik-Auszug) | 3 | 6 | fertig | 
 | ✅ | 7730 | Gallmersgarten | 751 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 7744 | Hohenfelde | 746 | OpenStreetMap (Geofabrik-Auszug) | 2 | 6 | fertig | 
 | ✅ | 7779 | Vogelsang | 738 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 7800 | Wittdün auf Amrum | 734 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 7801 | Erlenbach bei Kandel | 733 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 7804 | Hohen-Sülzen | 733 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 7805 | Hohenstadt | 733 | OpenStreetMap (Geofabrik-Auszug) | 1 | 8 | fertig | 
 | ✅ | 7816 | Pruchten | 730 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 7822 | Milda | 728 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 7835 | Dörrebach | 724 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 7837 | Rüdenau | 724 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 7860 | Königsfeld | 717 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 7868 | Greimersburg | 712 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 7873 | Dillstädt | 711 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 7887 | Lohheide | 708 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 7924 | Rehlingen | 695 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 7963 | Alken | 681 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 7964 | Ettal | 681 | OpenStreetMap (Geofabrik-Auszug) | 1 | 4 | fertig | 
 | ✅ | 7973 | Brahlstorf | 679 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 7975 | Langenfeld | 678 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 7977 | Rinnthal | 678 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 7980 | Haschbach am Remigiusberg | 677 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 8000 | Reinsdorf | 672 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 8020 | Boden | 668 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 8035 | Damscheid | 663 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 8080 | Zirkow | 652 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 8084 | Zettlitz | 651 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 8090 | Stein-Bockenheim | 650 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 8119 | Tonndorf | 641 | OpenStreetMap (Geofabrik-Auszug) | 1 | 5 | fertig | 
 | ✅ | 8128 | Zotzenheim | 639 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 8169 | Kargow | 628 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 8177 | Ziegenrück | 626 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 8184 | Kanzem | 624 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 8187 | Ahrenshoop | 622 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 8197 | Prinzhöfte | 621 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 8211 | Philippsreut | 618 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 8238 | Braunichswalde | 611 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 8261 | Schuld | 606 | OpenStreetMap (Geofabrik-Auszug) | 1 | 4 | fertig | 
 | ✅ | 8277 | Auw bei Prüm | 601 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 8291 | Kirchgandern | 596 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 8297 | Niedergebra | 595 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 8302 | Holzbach | 594 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 8316 | Cursdorf | 590 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 8318 | Matzenbach | 589 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 8346 | Siemz-Niendorf | 581 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 8351 | Mittelstenahe | 580 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 8354 | Welgesheim | 580 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 8371 | Dätgen | 575 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 8383 | Korswandt | 573 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 8399 | Dornheim | 568 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 8422 | Bodelwitz | 561 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 8424 | Glees | 561 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 8429 | Neunkirchen | 560 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 8443 | Dümpelfeld | 557 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 8456 | Dörth | 554 | OpenStreetMap (Geofabrik-Auszug) | 2 | 5 | fertig | 
 | ✅ | 8458 | Hainspitz | 554 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 8481 | Kratzeburg | 548 | OpenStreetMap (Geofabrik-Auszug) | 1 | 6 | fertig | 
 | ✅ | 8553 | Laasdorf | 532 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 8555 | Alleshausen | 531 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 8556 | Bandenitz | 531 | OpenStreetMap (Geofabrik-Auszug) | 1 | 5 | fertig | 
 | ✅ | 8564 | Ermershausen | 528 | OpenStreetMap (Geofabrik-Auszug) | 1 | 10 | fertig | 
 | ✅ | 8574 | Norddorf auf Amrum | 526 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 8576 | Perasdorf | 526 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 8581 | Jesendorf | 524 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 8592 | Hohen Wangelin | 522 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 8625 | Schwarzburg | 515 | OpenStreetMap (Geofabrik-Auszug) | 2 | 5 | fertig | 
 | ✅ | 8633 | Alt Bukow | 512 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 8642 | Dobbin-Linstow | 510 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 8645 | Parsteinsee | 510 | OpenStreetMap (Geofabrik-Auszug) | 1 | 6 | fertig | 
 | ✅ | 8694 | Remmels | 496 | OpenStreetMap (Geofabrik-Auszug) | 1 | 6 | fertig | 
 | ✅ | 8706 | Kampen (Sylt) | 492 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 8714 | Bärenbach | 490 | OpenStreetMap (Geofabrik-Auszug) | 2 | 5 | fertig | 
 | ✅ | 8762 | Gondenbrett | 479 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 8772 | Insul | 477 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 8785 | Oberweid | 475 | OpenStreetMap (Geofabrik-Auszug) | 2 | 2 | fertig | 
 | ✅ | 8804 | Hüffler | 471 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 8921 | Einhaus | 444 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 8923 | Hohenzieritz | 444 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 9044 | Schleifreisen | 420 | OpenStreetMap (Geofabrik-Auszug) | 3 | 3 | fertig | 
 | ✅ | 9067 | Kapellendorf | 415 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 9084 | Dobitschen | 411 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 9104 | Schaprode | 407 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 9106 | Altwarp | 406 | OpenStreetMap (Geofabrik-Auszug) | 1 | 5 | fertig | 
 | ✅ | 9124 | Osterrade | 403 | OpenStreetMap (Geofabrik-Auszug) | 3 | 6 | fertig | 
 | ✅ | 9134 | Wallenborn | 401 | OpenStreetMap (Geofabrik-Auszug) | 1 | 5 | fertig | 
 | ✅ | 9148 | Hahn am See | 397 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 9177 | Barweiler | 389 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 9180 | Härtlingen | 389 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 9227 | Blankenberg | 379 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 9228 | Kluis | 379 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 9249 | Hohenfelden | 374 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 9257 | Vogelsang-Warsin | 373 | OpenStreetMap (Geofabrik-Auszug) | 2 | 7 | fertig | 
 | ✅ | 9353 | Reitzenhain | 352 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 9362 | Elbingen | 349 | OpenStreetMap (Geofabrik-Auszug) | 3 | 4 | fertig | 
 | ✅ | 9406 | Neddemin | 340 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 9408 | Ettinghausen | 339 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 9424 | Eisenschmitt | 336 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 9433 | Ockholm | 335 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 9435 | Stolpe | 335 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 9450 | Rathen | 332 | OpenStreetMap (Geofabrik-Auszug) | 2 | 3 | fertig | 
 | ✅ | 9451 | Reipoltskirchen | 332 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 9567 | Görkwitz | 305 | OpenStreetMap (Geofabrik-Auszug) | 6 | 6 | fertig | 
 | ✅ | 9679 | Rothemühl | 283 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 9684 | Hemmelzen | 282 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 9690 | Udler | 282 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 9703 | Grinau | 278 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 9758 | Oldenbüttel | 266 | OpenStreetMap (Geofabrik-Auszug) | 2 | 4 | fertig | 
 | ✅ | 9800 | Kronsgaard | 257 | OpenStreetMap (Geofabrik-Auszug) | 1 | 3 | fertig | 
 | ✅ | 9922 | Winkelbach | 233 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 9952 | Lietzow | 228 | OpenStreetMap (Geofabrik-Auszug) | 1 | 6 | fertig | 
 | ✅ | 9993 | Grödersby | 219 | OpenStreetMap (Geofabrik-Auszug) | 1 | 4 | fertig | 
 | ✅ | 10006 | Burgsponheim | 217 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 10015 | Mähren | 216 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 10050 | Osterheide | 209 | OpenStreetMap (Geofabrik-Auszug) | 1 | 5 | fertig | 
 | ✅ | 10154 | Putgarten | 186 | OpenStreetMap (Geofabrik-Auszug) | 1 | 6 | fertig | 
 | ✅ | 10271 | Grammow | 164 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 10304 | Hohenwarte | 158 | OpenStreetMap (Geofabrik-Auszug) | 1 | 1 | fertig | 
 | ✅ | 10374 | Sosberg | 145 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 
 | ✅ | 10518 | Kudensee | 109 | OpenStreetMap (Geofabrik-Auszug) | 1 | 2 | fertig | 

## Genaue Herkunft je Gemeinde

- **Berlin** (amtlich (WFS)): `https://gdi.berlin.de/services/wfs/behindertenparkplaetze?request=GetFeature&service=WFS&version=2.0.0&typeNames=behindertenparkplaetze%3Abpark&outputFormat=application%2Fjson&srsName=EPSG%3A4326`
- **Hamburg** (amtlich (WFS)): `https://geodienste.hamburg.de/wfs_behindertenstellplaetze?service=WFS&version=2.0.0&request=GetFeature&typeNames=de.hh.up%3Abehindertenstellplaetze`
- **München** (amtlich (GEOJSON)): `https://geoportal.muenchen.de/geoserver/mor_wfs/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=mor_wfs:behindertenparkplaetze&outputFormat=application/json`
- **Köln** (amtlich (WFS)): `https://geoportal.stadt-koeln.de/arcgis/services/verkehr/behindertenparkplaetze/MapServer/WFSServer?service=WFS&version=2.0.0&request=GetFeature&typeNames=behindertenparkplaetze%3ABehindertenparkplatz`
- **Frankfurt am Main** (amtlich (WFS)): `https://geowebdienste.frankfurt.de/Parken?service=WFS&version=2.0.0&request=GetFeature&typeNames=opendata%3ABehindertenparkplaetze&outputFormat=application%2Fjson&srsName=EPSG%3A4326`
- **Düsseldorf** (amtlich (JSON)): `https://maps.duesseldorf.de/services/verkehr/wfs?service=WFS&amp;version=2.0.0&amp;request=GetFeature&amp;typeName=verkehr:behindertenparkplatz&amp;outputFormat=application/json&amp;srsName=epsg:25832&amp;limit=1000`
- **Stuttgart** (OpenStreetMap): `Overpass, OSM relation/62375 (Stuttgart, Baden-Württemberg, Deutschland)`
- **Leipzig** (OpenStreetMap): `Overpass, OSM relation/62649 (Leipzig, Sachsen, Deutschland)`
- **Dortmund** (amtlich (GEOJSON)): `https://open-data.dortmund.de/api/v2/catalog/datasets/fb66-behindertenstellplaetze/exports/geojson`
- **Bremen** (OpenStreetMap): `Overpass, OSM relation/62559 (Bremen, Deutschland)`
- **Essen** (OpenStreetMap): `Overpass, OSM relation/62713 (Essen, Nordrhein-Westfalen, Deutschland)`
- **Dresden** (amtlich (WFS)): `https://kommisdd.dresden.de/net3/public/ogc.ashx?NodeId=1462&service=WFS&version=2.0.0&request=GetFeature&typeNames=cls%3AL1113`
- **Nürnberg** (OpenStreetMap): `Overpass, OSM relation/62780 (Nürnberg, Bayern, Deutschland)`
- **Hannover** (OpenStreetMap): `Overpass, OSM relation/59418 (Hannover, Region Hannover, Niedersachsen, Deutschland)`
- **Duisburg** (OpenStreetMap): `Overpass, OSM relation/62456 (Duisburg, Nordrhein-Westfalen, Deutschland)`
- **Bochum** (OpenStreetMap): `Overpass, OSM relation/62644 (Bochum, Nordrhein-Westfalen, Deutschland)`
- **Wuppertal** (OpenStreetMap): `Overpass, OSM relation/62478 (Wuppertal, Nordrhein-Westfalen, Deutschland)`
- **Bielefeld** (amtlich (CSV)): `https://www.bielefeld01.de/md/WFS/schwerbehindertenparkplatze/01?SERVICE=WFS&VERSION=1.1.0&REQUEST=GetFeature&TYPENAME=parken_schwerbehinderte_p&SRSNAME=EPSG:25832&OUTPUTFORMAT=text/csv`
- **Bonn** (OpenStreetMap): `Overpass, OSM relation/62508 (Bonn, Nordrhein-Westfalen, Deutschland)`
- **Mannheim** (OpenStreetMap): `Overpass, OSM relation/62691 (Mannheim, Baden-Württemberg, Deutschland)`
- **Karlsruhe** (OpenStreetMap): `Overpass, OSM relation/62518 (Karlsruhe, Baden-Württemberg, Deutschland)`
- **Münster** (OpenStreetMap): `Overpass, OSM relation/62591 (Münster, Nordrhein-Westfalen, Deutschland)`
- **Augsburg** (OpenStreetMap): `Overpass, OSM relation/62407 (Augsburg, Bayern, Deutschland)`
- **Wiesbaden** (OpenStreetMap): `Overpass, OSM relation/62496 (Wiesbaden, Hessen, Deutschland)`
- **Gelsenkirchen** (amtlich (JSON)): `https://maps.gelsenkirchen.de/geoserver/infrastrukturdatenbank/ogc/features/v1/collections/behindertenparkplatz/items?f=json`
- **Mönchengladbach** (OpenStreetMap): `Overpass, OSM relation/62410 (Mönchengladbach, Nordrhein-Westfalen, Deutschland)`
- **Aachen** (OpenStreetMap): `Overpass, OSM relation/62564 (Aachen, Städteregion Aachen, Nordrhein-Westfalen, Deutschland)`
- **Braunschweig** (OpenStreetMap): `Overpass, OSM relation/62531 (Braunschweig, Niedersachsen, Deutschland)`
- **Kiel** (OpenStreetMap): `Overpass, OSM relation/27021 (Kiel, Altenholz, Schleswig-Holstein, Deutschland)`
- **Chemnitz** (OpenStreetMap): `Overpass, OSM relation/62594 (Chemnitz, Lichtenau, Sachsen, Deutschland)`
- **Magdeburg** (OpenStreetMap): `Overpass, OSM relation/62481 (Magdeburg, Sachsen-Anhalt, Deutschland)`
- **Freiburg im Breisgau** (amtlich (WFS)): `https://geoportal.freiburg.de/wfs/gut_parken/gut_parken?service=WFS&version=2.0.0&request=GetFeature&typeNames=ms%3Abehindertenparkplatz_detail`
- **Krefeld** (OpenStreetMap): `Overpass, OSM relation/62748 (Krefeld, Nordrhein-Westfalen, Deutschland)`
- **Halle (Saale)** (OpenStreetMap): `Overpass, OSM relation/62638 (Halle (Saale), Sachsen-Anhalt, Deutschland)`
- **Mainz** (OpenStreetMap): `Overpass, OSM relation/62630 (Mainz, Rheinland-Pfalz, Deutschland)`
- **Erfurt** (OpenStreetMap): `Overpass, OSM relation/62745 (Erfurt, Thüringen, Deutschland)`
- **Lübeck** (OpenStreetMap): `Overpass, OSM relation/27027 (Lübeck, Schleswig-Holstein, Deutschland)`
- **Oberhausen** (OpenStreetMap): `Overpass, OSM relation/62734 (Oberhausen, Nordrhein-Westfalen, Deutschland)`
- **Rostock** (OpenStreetMap): `Overpass, OSM relation/62405 (Rostock, Mecklenburg-Vorpommern, Deutschland)`
- **Kassel** (OpenStreetMap): `Overpass, OSM relation/62598 (Kassel, Hessen, Deutschland)`
- **Hagen** (OpenStreetMap): `Overpass, OSM relation/1800297 (Hagen, Nordrhein-Westfalen, Deutschland)`
- **Potsdam** (OpenStreetMap): `Overpass, OSM relation/62369 (Potsdam, Brandenburg, Deutschland)`
- **Saarbrücken** (OpenStreetMap): `Overpass, OSM relation/1187159 (Saarbrücken, Regionalverband Saarbrücken, Saarland, Deutschland)`
- **Hamm** (OpenStreetMap): `Overpass, OSM relation/62499 (Hamm, Nordrhein-Westfalen, Deutschland)`
- **Ludwigshafen am Rhein** (OpenStreetMap): `Overpass, OSM relation/62347 (Ludwigshafen am Rhein, Rheinland-Pfalz, Deutschland)`
- **Oldenburg (Oldb)** (OpenStreetMap): `Overpass, OSM relation/62409 (Oldenburg, Niedersachsen, Deutschland)`
- **Mülheim an der Ruhr** (OpenStreetMap): `Overpass, OSM relation/62385 (Mülheim an der Ruhr, Nordrhein-Westfalen, Deutschland)`
- **Leverkusen** (OpenStreetMap): `Overpass, OSM relation/62449 (Leverkusen, Nordrhein-Westfalen, Deutschland)`
- **Darmstadt** (OpenStreetMap): `Overpass, OSM relation/62581 (Darmstadt, Hessen, Deutschland)`
- **Osnabrück** (OpenStreetMap): `Overpass, OSM relation/62631 (Osnabrück, Niedersachsen, Deutschland)`
- **Solingen** (OpenStreetMap): `Overpass, OSM relation/62699 (Solingen, Nordrhein-Westfalen, Deutschland)`
- **Paderborn** (OpenStreetMap): `Overpass, OSM relation/148074 (Paderborn, Kreis Paderborn, Nordrhein-Westfalen, Deutschland)`
- **Herne** (OpenStreetMap): `Overpass, OSM relation/62396 (Herne, Nordrhein-Westfalen, Deutschland)`
- **Heidelberg** (amtlich (GEOJSON)): `https://ckan.datenplattform.heidelberg.de/dataset/708df8e2-d452-483e-9e57-f04027d52a17/resource/6dc64728-65ba-47ed-bbe2-9e59b5dbaa0c/download/features_new.geojson`
- **Neuss** (amtlich (GEOJSON)): `https://opendata.rhein-kreis-neuss.de/api/v2/catalog/datasets/stadt-neuss-behindertenparkplaetze/exports/geojson`
- **Regensburg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Ingolstadt** (OpenStreetMap): `Overpass, OSM relation/62381 (Ingolstadt, Bayern, Deutschland)`
- **Pforzheim** (OpenStreetMap): `Overpass, OSM relation/62471 (Pforzheim, Baden-Württemberg, Deutschland)`
- **Würzburg** (OpenStreetMap): `Overpass, OSM relation/62464 (Würzburg, Bayern, Deutschland)`
- **Offenbach am Main** (OpenStreetMap): `Overpass, OSM relation/62695 (Offenbach am Main, Hessen, Deutschland)`
- **Fürth** (OpenStreetMap): `Overpass, OSM relation/62374 (Fürth, Bayern, Deutschland)`
- **Heilbronn** (OpenStreetMap): `Overpass, OSM relation/62751 (Heilbronn, Baden-Württemberg, Deutschland)`
- **Ulm** (amtlich (GEOJSON)): `https://datenhub.ulm.de/ckan/dataset/694e940c-6255-472a-865b-2f36c726f13e/resource/546b9525-236a-4be8-8bca-74618a0e7118/download/blaue_parkplatze_web.geojson`
- **Wolfsburg** (OpenStreetMap): `Overpass, OSM relation/62418 (Wolfsburg, Niedersachsen, Deutschland)`
- **Göttingen** (OpenStreetMap): `Overpass, OSM relation/191361 (Göttingen, Radolfshausen, Landkreis Göttingen, Niedersachsen, Deutschland)`
- **Reutlingen** (OpenStreetMap): `Overpass, OSM relation/2772661 (Reutlingen, Landkreis Reutlingen, Baden-Württemberg, Deutschland)`
- **Bremerhaven** (OpenStreetMap): `Overpass, OSM relation/62658 (Bremerhaven, Bremen, Deutschland)`
- **Bottrop** (amtlich (WFS)): `https://gis.bottrop.de/arcgis/services/Themenkarten/Parkplaetze/MapServer/WFSServer?service=WFS&version=2.0.0&request=GetFeature&typeNames=Parkplaetze%3ABehinderten_Parkplaetze__Punkte_`
- **Erlangen** (OpenStreetMap): `Overpass, OSM relation/62403 (Erlangen, Bayern, Deutschland)`
- **Recklinghausen** (OpenStreetMap): `Overpass, OSM relation/56665 (Recklinghausen, Kreis Recklinghausen, Nordrhein-Westfalen, Deutschland)`
- **Remscheid** (OpenStreetMap): `Overpass, OSM relation/62455 (Remscheid, Nordrhein-Westfalen, Deutschland)`
- **Koblenz** (OpenStreetMap): `Overpass, OSM relation/62512 (Koblenz, Rheinland-Pfalz, Deutschland)`
- **Bergisch Gladbach** (OpenStreetMap): `Overpass, OSM relation/173103 (Bergisch Gladbach, Rheinisch-Bergischer Kreis, Nordrhein-Westfalen, Deutschland)`
- **Jena** (OpenStreetMap): `Overpass, OSM relation/62693 (Jena, Thüringen, Deutschland)`
- **Salzgitter** (OpenStreetMap): `Overpass, OSM relation/62659 (Salzgitter, Niedersachsen, Deutschland)`
- **Trier** (OpenStreetMap): `Overpass, OSM relation/172679 (Trier, Trierweiler, Rheinland-Pfalz, Deutschland)`
- **Siegen** (OpenStreetMap): `Overpass, OSM relation/163256 (Siegen, Kreis Siegen-Wittgenstein, Nordrhein-Westfalen, Deutschland)`
- **Moers** (OpenStreetMap): `Overpass, OSM relation/58623 (Moers, Kreis Wesel, Nordrhein-Westfalen, Deutschland)`
- **Gütersloh** (OpenStreetMap): `Overpass, OSM relation/138119 (Gütersloh, Kreis Gütersloh, Nordrhein-Westfalen, Deutschland)`
- **Kaiserslautern** (OpenStreetMap): `Overpass, OSM relation/62652 (Kaiserslautern, Rheinland-Pfalz, Deutschland)`
- **Hildesheim** (OpenStreetMap): `Overpass, OSM relation/1176503 (Hildesheim, Landkreis Hildesheim, Niedersachsen, Deutschland)`
- **Schwerin** (OpenStreetMap): `Overpass, OSM relation/62685 (Schwerin, Mecklenburg-Vorpommern, Deutschland)`
- **Hanau** (OpenStreetMap): `Overpass, OSM relation/535895 (Hanau, Hessen, Deutschland)`
- **Flensburg** (OpenStreetMap): `Overpass, OSM relation/27020 (Flensburg, Schnarup-Thumby, Schleswig-Holstein, 24891, Deutschland)`
- **Esslingen am Neckar** (OpenStreetMap): `Overpass, OSM relation/2792882 (Esslingen am Neckar, Landkreis Esslingen, Baden-Württemberg, Deutschland)`
- **Gera** (OpenStreetMap): `Overpass, OSM relation/62671 (Gera, Thüringen, Deutschland)`
- **Cottbus** (OpenStreetMap): `Overpass, OSM relation/62430 (Cottbus, Brandenburg, Deutschland)`
- **Düren** (OpenStreetMap): `Overpass, OSM relation/163046 (Düren, Kreis Düren, Nordrhein-Westfalen, Deutschland)`
- **Ludwigsburg** (OpenStreetMap): `Overpass, OSM relation/405292 (Ludwigsburg, Landkreis Ludwigsburg, Baden-Württemberg, Deutschland)`
- **Tübingen** (OpenStreetMap): `Overpass, OSM relation/2778914 (Tübingen, Landkreis Tübingen, Baden-Württemberg, Deutschland)`
- **Iserlohn** (OpenStreetMap): `Overpass, OSM relation/1800165 (Iserlohn, Märkischer Kreis, Nordrhein-Westfalen, Deutschland)`
- **Witten** (OpenStreetMap): `Overpass, OSM relation/162826 (Witten, Ennepe-Ruhr-Kreis, Nordrhein-Westfalen, Deutschland)`
- **Villingen-Schwenningen** (OpenStreetMap): `Overpass, OSM relation/1242298 (Villingen-Schwenningen, VVG der Stadt Villingen-Schwenningen, Schwarzwald-Baar-Kreis, Baden-Württemberg, Deutschland)`
- **Ratingen** (OpenStreetMap): `Overpass, OSM relation/56682 (Ratingen, Kreis Mettmann, Nordrhein-Westfalen, Deutschland)`
- **Gießen** (OpenStreetMap): `Overpass, OSM relation/418617 (Gießen, Landkreis Gießen, Hessen, Deutschland)`
- **Zwickau** (OpenStreetMap): `Overpass, OSM relation/397076 (Zwickau, Sachsen, Deutschland)`
- **Konstanz** (OpenStreetMap): `Overpass, OSM relation/2784842 (Konstanz, VVG der Stadt Konstanz, Landkreis Konstanz, Baden-Württemberg, Deutschland)`
- **Marl** (OpenStreetMap): `Overpass, OSM relation/63460 (Marl, Kreis Recklinghausen, Nordrhein-Westfalen, Deutschland)`
- **Worms** (OpenStreetMap): `Overpass, OSM relation/62453 (Worms, Rheinland-Pfalz, Deutschland)`
- **Lünen** (OpenStreetMap): `Overpass, OSM relation/158454 (Lünen, Kreis Unna, Nordrhein-Westfalen, Deutschland)`
- **Minden** (OpenStreetMap): `Overpass, OSM relation/139087 (Minden, Kreis Minden-Lübbecke, Nordrhein-Westfalen, Deutschland)`
- **Norderstedt** (OpenStreetMap): `Overpass, OSM relation/422634 (Norderstedt, Kreis Segeberg, Schleswig-Holstein, Deutschland)`
- **Velbert** (OpenStreetMap): `Overpass, OSM relation/56679 (Velbert, Kreis Mettmann, Nordrhein-Westfalen, Deutschland)`
- **Delmenhorst** (OpenStreetMap): `Overpass, OSM relation/62414 (Delmenhorst, Dötlingen, Niedersachsen, Deutschland)`
- **Neumünster** (OpenStreetMap): `Overpass, OSM relation/62528 (Neumünster, Schleswig-Holstein, Deutschland)`
- **Viersen** (OpenStreetMap): `Overpass, OSM relation/88531 (Viersen, Kreis Viersen, Nordrhein-Westfalen, Deutschland)`
- **Rheine** (OpenStreetMap): `Overpass, OSM relation/155707 (Rheine, Kreis Steinfurt, Nordrhein-Westfalen, Deutschland)`
- **Bamberg** (OpenStreetMap): `Overpass, OSM relation/62525 (Bamberg, Bayern, Deutschland)`
- **Troisdorf** (OpenStreetMap): `Overpass, OSM relation/55060 (Troisdorf, Rhein-Sieg-Kreis, Nordrhein-Westfalen, Deutschland)`
- **Wilhelmshaven** (OpenStreetMap): `Overpass, OSM relation/62444 (Wilhelmshaven, Wangerland, Niedersachsen, Deutschland)`
- **Gladbeck** (OpenStreetMap): `Overpass, OSM relation/63504 (Gladbeck, Kreis Recklinghausen, Nordrhein-Westfalen, Deutschland)`
- **Dessau-Roßlau** (OpenStreetMap): `Overpass, OSM relation/62526 (Dessau-Roßlau, Sachsen-Anhalt, Deutschland)`
- **Dorsten** (OpenStreetMap): `Overpass, OSM relation/63505 (Dorsten, Kreis Recklinghausen, Nordrhein-Westfalen, Deutschland)`
- **Arnsberg** (OpenStreetMap): `Overpass, OSM relation/157396 (Arnsberg, Hochsauerlandkreis, Nordrhein-Westfalen, Deutschland)`
- **Lüneburg** (OpenStreetMap): `Overpass, OSM relation/2420744 (Lüneburg, Landkreis Lüneburg, Niedersachsen, Deutschland)`
- **Detmold** (OpenStreetMap): `Overpass, OSM relation/142681 (Detmold, Kreis Lippe, Nordrhein-Westfalen, Deutschland)`
- **Brandenburg an der Havel** (OpenStreetMap): `Overpass, OSM relation/62470 (Brandenburg an der Havel, Brandenburg, Deutschland)`
- **Marburg** (OpenStreetMap): `Overpass, OSM relation/225494 (Marburg, Landkreis Marburg-Biedenkopf, Hessen, Deutschland)`
- **Castrop-Rauxel** (OpenStreetMap): `Overpass, OSM relation/56664 (Castrop-Rauxel, Kreis Recklinghausen, Nordrhein-Westfalen, Deutschland)`
- **Bocholt** (OpenStreetMap): `Overpass, OSM relation/162715 (Bocholt, Kreis Borken, Nordrhein-Westfalen, Deutschland)`
- **Aschaffenburg** (OpenStreetMap): `Overpass, OSM relation/62532 (Aschaffenburg, Bayern, Deutschland)`
- **Bayreuth** (OpenStreetMap): `Overpass, OSM relation/62640 (Bayreuth, Bayern, Deutschland)`
- **Landshut** (OpenStreetMap): `Overpass, OSM relation/62484 (Landshut, Bayern, Deutschland)`
- **Lüdenscheid** (OpenStreetMap): `Overpass, OSM relation/168563 (Lüdenscheid, Märkischer Kreis, Nordrhein-Westfalen, Deutschland)`
- **Lippstadt** (OpenStreetMap): `Overpass, OSM relation/152781 (Lippstadt, Kreis Soest, Nordrhein-Westfalen, Deutschland)`
- **Kempten (Allgäu)** (OpenStreetMap): `Overpass, OSM relation/62701 (Kempten (Allgäu), Bayern, Deutschland)`
- **Aalen** (OpenStreetMap): `Overpass, OSM relation/915486 (Aalen, VVG der Stadt Aalen, Ostalbkreis, Baden-Württemberg, Deutschland)`
- **Herford** (OpenStreetMap): `Overpass, OSM relation/146654 (Herford, Kreis Herford, Nordrhein-Westfalen, Deutschland)`
- **Neuwied** (OpenStreetMap): `Overpass, OSM relation/79194 (Neuwied, Landkreis Neuwied, Rheinland-Pfalz, Deutschland)`
- **Dinslaken** (OpenStreetMap): `Overpass, OSM relation/54462 (Dinslaken, Kreis Wesel, Nordrhein-Westfalen, Deutschland)`
- **Celle** (OpenStreetMap): `Overpass, OSM relation/1797918 (Celle, Landkreis Celle, Niedersachsen, Deutschland)`
- **Kerpen** (OpenStreetMap): `Overpass, OSM relation/168483 (Kerpen, Rhein-Erft-Kreis, Nordrhein-Westfalen, Deutschland)`
- **Grevenbroich** (OpenStreetMap): `Overpass, OSM relation/168489 (Grevenbroich, Rhein-Kreis Neuss, Nordrhein-Westfalen, Deutschland)`
- **Weimar** (OpenStreetMap): `Overpass, OSM relation/62493 (Weimar, Thüringen, Deutschland)`
- **Rüsselsheim am Main** (OpenStreetMap): `Overpass, OSM relation/444912 (Rüsselsheim am Main, Kreis Groß-Gerau, Hessen, 65428, Deutschland)`
- **Plauen** (OpenStreetMap): `Overpass, OSM relation/409608 (Plauen, Vogtlandkreis, Sachsen, Deutschland)`
- **Fulda** (OpenStreetMap): `Overpass, OSM relation/454863 (Fulda, Landkreis Fulda, Hessen, Deutschland)`
- **Rosenheim** (OpenStreetMap): `Overpass, OSM relation/2168233 (Rosenheim, Bayern, Deutschland)`
- **Schwäbisch Gmünd** (OpenStreetMap): `Overpass, OSM relation/2792080 (Schwäbisch Gmünd, VVG der Stadt Schwäbisch Gmünd, Ostalbkreis, Baden-Württemberg, Deutschland)`
- **Dormagen** (OpenStreetMap): `Overpass, OSM relation/168449 (Dormagen, Rhein-Kreis Neuss, Nordrhein-Westfalen, Deutschland)`
- **Offenburg** (OpenStreetMap): `Overpass, OSM relation/452988 (Offenburg, VVG der Stadt Offenburg, Ortenaukreis, Baden-Württemberg, Deutschland)`
- **Friedrichshafen** (OpenStreetMap): `Overpass, OSM relation/2783849 (Friedrichshafen, VVG der Stadt Friedrichshafen, Bodenseekreis, Baden-Württemberg, Deutschland)`
- **Neu-Ulm** (OpenStreetMap): `Overpass, OSM relation/941087 (Neu-Ulm, Landkreis Neu-Ulm, Bayern, Deutschland)`
- **Hürth** (OpenStreetMap): `Overpass, OSM relation/162473 (Hürth, Rhein-Erft-Kreis, Nordrhein-Westfalen, 50354, Deutschland)`
- **Bergheim** (OpenStreetMap): `Overpass, OSM relation/168469 (Bergheim, Rhein-Erft-Kreis, Nordrhein-Westfalen, Deutschland)`
- **Sindelfingen** (OpenStreetMap): `Overpass, OSM relation/722092 (Sindelfingen, Landkreis Böblingen, Baden-Württemberg, Deutschland)`
- **Herten** (OpenStreetMap): `Overpass, OSM relation/63503 (Herten, Kreis Recklinghausen, Nordrhein-Westfalen, Deutschland)`
- **Wesel** (OpenStreetMap): `Overpass, OSM relation/58590 (Wesel, Kreis Wesel, Nordrhein-Westfalen, Deutschland)`
- **Neubrandenburg** (OpenStreetMap): `Overpass, OSM relation/62705 (Neubrandenburg, Mecklenburgische Seenplatte, Mecklenburg-Vorpommern, Deutschland)`
- **Euskirchen** (OpenStreetMap): `Overpass, OSM relation/62555 (Kreis Euskirchen, Nordrhein-Westfalen, Deutschland)`
- **Langenfeld (Rhld.)** (OpenStreetMap): `Overpass, OSM relation/66578 (Langenfeld (Rheinland), Kreis Mettmann, Nordrhein-Westfalen, 40764, Deutschland)`
- **Garbsen** (OpenStreetMap): `Overpass, OSM relation/59417 (Garbsen, Region Hannover, Niedersachsen, Deutschland)`
- **Göppingen** (OpenStreetMap): `Overpass, OSM relation/2792098 (Göppingen, VVG der Stadt Göppingen, Landkreis Göppingen, Baden-Württemberg, Deutschland)`
- **Unna** (OpenStreetMap): `Overpass, OSM relation/158445 (Unna, Kreis Unna, Nordrhein-Westfalen, Deutschland)`
- **Hameln** (OpenStreetMap): `Overpass, OSM relation/1730383 (Hameln, Landkreis Hameln-Pyrmont, Niedersachsen, Deutschland)`
- **Stolberg (Rhld.)** (OpenStreetMap): `Overpass, OSM relation/157996 (Stolberg, Städteregion Aachen, Nordrhein-Westfalen, Deutschland)`
- **Eschweiler** (OpenStreetMap): `Overpass, OSM relation/157995 (Eschweiler, Städteregion Aachen, Nordrhein-Westfalen, 52249, Deutschland)`
- **Waiblingen** (OpenStreetMap): `Overpass, OSM relation/401697 (Waiblingen, Rems-Murr-Kreis, Baden-Württemberg, Deutschland)`
- **Frankfurt (Oder)** (OpenStreetMap): `Overpass, OSM relation/62523 (Frankfurt (Oder), Brandenburg, Deutschland)`
- **Meerbusch** (OpenStreetMap): `Overpass, OSM relation/161503 (Meerbusch, Rhein-Kreis Neuss, Nordrhein-Westfalen, Deutschland)`
- **Nordhorn** (OpenStreetMap): `Overpass, OSM relation/1853267 (Nordhorn, Landkreis Grafschaft Bentheim, Niedersachsen, Deutschland)`
- **Baden-Baden** (OpenStreetMap): `Overpass, OSM relation/62340 (Baden-Baden, Baden-Württemberg, Deutschland)`
- **Bad Homburg v.d.Höhe** (OpenStreetMap): `Overpass, OSM relation/338875 (Bad Homburg vor der Höhe, Hochtaunuskreis, Hessen, Deutschland)`
- **Sankt Augustin** (OpenStreetMap): `Overpass, OSM relation/158642 (Sankt Augustin, Rhein-Sieg-Kreis, Nordrhein-Westfalen, 53757, Deutschland)`
- **Lingen (Ems)** (OpenStreetMap): `Overpass, OSM relation/1075335 (Lingen (Ems), Landkreis Emsland, Niedersachsen, Deutschland)`
- **Pulheim** (OpenStreetMap): `Overpass, OSM relation/168464 (Pulheim, Rhein-Erft-Kreis, Nordrhein-Westfalen, 50259, Deutschland)`
- **Greifswald** (OpenStreetMap): `Overpass, OSM relation/62363 (Greifswald, Vorpommern-Greifswald, Mecklenburg-Vorpommern, Deutschland)`
- **Görlitz** (OpenStreetMap): `Overpass, OSM relation/409676 (Görlitz, Sachsen, Deutschland)`
- **Hilden** (OpenStreetMap): `Overpass, OSM relation/66555 (Hilden, Kreis Mettmann, Nordrhein-Westfalen, Deutschland)`
- **Wetzlar** (OpenStreetMap): `Overpass, OSM relation/215978 (Wetzlar, Lahn-Dill-Kreis, Hessen, Deutschland)`
- **Schweinfurt** (OpenStreetMap): `Overpass, OSM relation/62534 (Schweinfurt, Bayern, Deutschland)`
- **Bad Kreuznach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Langenhagen** (OpenStreetMap): `Overpass, OSM relation/59415 (Langenhagen, Region Hannover, Niedersachsen, Deutschland)`
- **Stralsund** (OpenStreetMap): `Overpass, OSM relation/26225 (Stralsund, Vorpommern-Rügen, Mecklenburg-Vorpommern, Deutschland)`
- **Bad Salzuflen** (OpenStreetMap): `Overpass, OSM relation/142623 (Bad Salzuflen, Kreis Lippe, Nordrhein-Westfalen, Deutschland)`
- **Hattingen** (OpenStreetMap): `Overpass, OSM relation/162828 (Hattingen, Ennepe-Ruhr-Kreis, Nordrhein-Westfalen, Deutschland)`
- **Passau** (OpenStreetMap): `Overpass, OSM relation/62629 (Passau, Bayern, Deutschland)`
- **Kleve** (OpenStreetMap): `Overpass, OSM relation/167966 (Kleve, Bedburg-Hau, Kreis Kleve, Nordrhein-Westfalen, 47533, Deutschland)`
- **Neustadt an der Weinstraße** (OpenStreetMap): `Overpass, OSM relation/62724 (Neustadt an der Weinstraße, Rheinland-Pfalz, Deutschland)`
- **Ahlen** (OpenStreetMap): `Overpass, OSM relation/152285 (Ahlen, Kreis Warendorf, Nordrhein-Westfalen, Deutschland)`
- **Wolfenbüttel** (OpenStreetMap): `Overpass, OSM relation/1432648 (Wolfenbüttel, Landkreis Wolfenbüttel, Niedersachsen, Deutschland)`
- **Frechen** (OpenStreetMap): `Overpass, OSM relation/168477 (Frechen, Rhein-Erft-Kreis, Nordrhein-Westfalen, 50226, Deutschland)`
- **Menden (Sauerland)** (OpenStreetMap): `Overpass, OSM relation/2063638 (Menden (Sauerland), Märkischer Kreis, Nordrhein-Westfalen, Deutschland)`
- **Ibbenbüren** (OpenStreetMap): `Overpass, OSM relation/155641 (Ibbenbüren, Kreis Steinfurt, Nordrhein-Westfalen, Deutschland)`
- **Böblingen** (OpenStreetMap): `Overpass, OSM relation/722090 (Böblingen, Landkreis Böblingen, Baden-Württemberg, Deutschland)`
- **Lörrach** (OpenStreetMap): `Overpass, OSM relation/2787952 (Lörrach, VVG der Stadt Lörrach, Landkreis Lörrach, Baden-Württemberg, Deutschland)`
- **Elmshorn** (OpenStreetMap): `Overpass, OSM relation/443302 (Elmshorn, Kreis Pinneberg, Schleswig-Holstein, Deutschland)`
- **Gummersbach** (OpenStreetMap): `Overpass, OSM relation/173858 (Gummersbach, Oberbergischer Kreis, Nordrhein-Westfalen, Deutschland)`
- **Peine** (OpenStreetMap): `Overpass, OSM relation/62494 (Landkreis Peine, Niedersachsen, Deutschland)`
- **Lahr/Schwarzwald** (OpenStreetMap): `Overpass, OSM relation/453002 (Lahr/Schwarzwald, VVG der Stadt Lahr/Schwarzwald, Ortenaukreis, Baden-Württemberg, 77933, Deutschland)`
- **Rastatt** (amtlich (regional: trk)): `https://mobil.trk.de/geoserver/TBA/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=TBA%3Abehinderten_parkplaetze&outputFormat=application%2Fjson`
- **Ravensburg** (OpenStreetMap): `Overpass, OSM relation/2808301 (Ravensburg, GVV Mittleres Schussental, Landkreis Ravensburg, Baden-Württemberg, Deutschland)`
- **Bad Oeynhausen** (OpenStreetMap): `Overpass, OSM relation/144930 (Bad Oeynhausen, Kreis Minden-Lübbecke, Nordrhein-Westfalen, Deutschland)`
- **Heidenheim an der Brenz** (OpenStreetMap): `Overpass, OSM relation/2791896 (Heidenheim an der Brenz, VVG der Stadt Heidenheim an der Brenz, Landkreis Heidenheim, Baden-Württemberg, Deutschland)`
- **Gronau (Westf.)** (OpenStreetMap): `Overpass, OSM relation/162865 (Gronau, Kreis Borken, Nordrhein-Westfalen, 48599, Deutschland)`
- **Cuxhaven** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Leonberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Bergkamen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Oranienburg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Straubing** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Alsdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Erftstadt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Stade** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Herzogenrath** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Landau in der Pfalz** (amtlich (regional: trk)): `https://mobil.trk.de/geoserver/TBA/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=TBA%3Abehinderten_parkplaetze&outputFormat=application%2Fjson`
- **Bornheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Hennef (Sieg)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Frankenthal (Pfalz)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Rheda-Wiedenbrück** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Dülmen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Bruchsal** (amtlich (regional: trk)): `https://mobil.trk.de/geoserver/TBA/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=TBA%3Abehinderten_parkplaetze&outputFormat=application%2Fjson`
- **Soest** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Singen (Hohentwiel)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Neunkirchen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Saarland (saarland-latest.osm.pbf)`
- **Dachau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Fellbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Albstadt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Hof** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Oberursel (Taunus)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Melle** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Gotha** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Bünde** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Filderstadt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Kaufbeuren** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Weinheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Schwerte** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Falkensee** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Rottenburg am Neckar** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Brühl** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Erkelenz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Rodgau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Wittenberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Pinneberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Neustadt am Rübenberge** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Bernau bei Berlin** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Lehrte** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Memmingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Seevetal** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Erkrath** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Monheim am Rhein** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Bietigheim-Bissingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Wismar** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Kaarst** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Heinsberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Borken** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Gifhorn** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Aurich** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Schwäbisch Hall** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Amberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Siegburg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Weiden i.d.OPf.** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Kamen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Kirchheim unter Teck** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Nettetal** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Laatzen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Buchholz in der Nordheide** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Dreieich** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Schorndorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Freiberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Eberswalde** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Wunstorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Hückelhoven** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Leinfelden-Echterdingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Bensheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Neumarkt i.d.OPf.** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Coburg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Völklingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Saarland (saarland-latest.osm.pbf)`
- **Germering** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Buxtehude** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Schwabach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Löhne** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Nürtingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Nordhausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Eisenach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Ansbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Königswinter** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Ahaus** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Würselen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Pirna** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Lemgo** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Ostfildern** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Pirmasens** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Kehl** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Mettmann** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Königs Wusterhausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Freital** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Hofheim am Taunus** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Maintal** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Ilmenau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Backnang** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Langen (Hessen)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Ettlingen** (amtlich (regional: trk)): `https://mobil.trk.de/geoserver/TBA/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=TBA%3Abehinderten_parkplaetze&outputFormat=application%2Fjson`
- **Niederkassel** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Coesfeld** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Kamp-Lintfort** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Greven** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Haltern am See** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Wesseling** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Weißenfels** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Neu-Isenburg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Halberstadt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Stendal** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Warendorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Saarlouis** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Saarland (saarland-latest.osm.pbf)`
- **Bautzen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Fürstenfeldbruck** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Papenburg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Erding** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Beckum** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Tuttlingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Sinsheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Winsen (Luhe)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Meppen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Bitterfeld-Wolfen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Cloppenburg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Porta Westfalica** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Mühlhausen/Thüringen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Emsdetten** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Bad Vilbel** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Limburg a.d.Lahn** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Crailsheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Voerde (Niederrhein)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Balingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Dietzenbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Datteln** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **St. Ingbert** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Saarland (saarland-latest.osm.pbf)`
- **Lage** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Deggendorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Ingelheim am Rhein** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Hemer** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Geldern** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Wedel** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Goch** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Jülich** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Steinfurt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Suhl** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Rheinfelden (Baden)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Korschenbroich** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Biberach an der Riß** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Ahrensburg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Viernheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Merseburg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Wermelskirchen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Seelze** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Herrenberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Kempen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Leer (Ostfriesland)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Kornwestheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Barsinghausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Stuhr** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Schwedt/Oder** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Vechta** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Geesthacht** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Zweibrücken** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Forchheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Radebeul** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Bad Nauheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Achim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Uelzen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Itzehoe** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Nienburg (Weser)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Lampertheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Weil am Rhein** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Wernigerode** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Delbrück** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Fürstenwalde/Spree** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Neuruppin** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Naumburg (Saale)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Emmerich am Rhein** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Radolfzell am Bodensee** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Merzig** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Saarland (saarland-latest.osm.pbf)`
- **Mörfelden-Walldorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Ganderkesee** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Oer-Erkenschwick** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Georgsmarienhütte** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Rheinberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Altenburg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Geestland** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Burgdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Walsrode** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Bernburg (Saale)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Lohmar** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Weyhe** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Kreuztal** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Bad Hersfeld** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Hoyerswerda** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Rendsburg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Schönebeck (Elbe)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Friedberg (Hessen)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Bretten** (amtlich (regional: trk)): `https://mobil.trk.de/geoserver/TBA/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=TBA%3Abehinderten_parkplaetze&outputFormat=application%2Fjson`
- **Werne** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Idar-Oberstein** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Taunusstein** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Neuburg a.d.Donau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Haan** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Rietberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Andernach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Gevelsberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Friedberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Schwandorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Winnenden** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Wedemark** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Einbeck** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Osterholz-Scharmbeck** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Bad Zwischenahn** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Meschede** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Werl** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Gaggenau** (amtlich (regional: trk)): `https://mobil.trk.de/geoserver/TBA/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=TBA%3Abehinderten_parkplaetze&outputFormat=application%2Fjson`
- **Ludwigsfelde** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Emmendingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Ennepetal** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Riesa** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Griesheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Landsberg am Lech** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Tönisvorst** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Baesweiler** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Mühlheim am Main** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Mechernich** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Waltrop** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Blankenfelde-Mahlow** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Saalfeld/Saale** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Güstrow** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Vaihingen an der Enz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Meißen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Rödermark** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Rösrath** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Springe** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Arnstadt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Bühl** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Geilenkirchen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Unterschleißheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Hattersheim am Main** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Wangen im Allgäu** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Zeitz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Henstedt-Ulzburg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Garmisch-Partenkirchen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Kevelaer** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Reinbek** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Bramsche** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Kelkheim (Taunus)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Höxter** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Lohne (Oldenburg)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Wegberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Leichlingen (Rhld.)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Bad Neuenahr-Ahrweiler** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Schwelm** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Baunatal** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Königsbrunn** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Heppenheim (Bergstraße)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Geislingen an der Steige** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Ehingen (Donau)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Wiesloch** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Strausberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Teltow** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Sundern (Sauerland)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Grimma** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Northeim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Olching** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Neukirchen-Vluyn** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Verden (Aller)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Weinstadt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Werder (Havel)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Butzbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Pfaffenhofen a.d.Ilm** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Rheinbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Hamminkeln** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Leimen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Hohen Neuendorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Lübbecke** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Mühlacker** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Achern** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Hennigsdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Overath** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Kulmbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Weiterstadt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Unterhaching** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Neckarsulm** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Schloß Holte-Stukenbrock** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Heiligenhaus** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Zirndorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Remseck am Neckar** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Lauf a.d.Pegnitz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Wetter (Ruhr)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Geretsried** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Selm** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Delitzsch** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Nordenham** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Friedrichsdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Lindau (Bodensee)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Verl** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Waldkraiburg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Öhringen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Horb am Neckar** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Aschersleben** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Rinteln** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Espelkamp** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Harsewinkel** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Roth** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **St. Wendel** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Saarland (saarland-latest.osm.pbf)`
- **Salzkotten** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Brilon** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Pfungstadt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Sangerhausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Groß-Gerau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Bingen am Rhein** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Schleswig** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Petershagen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Markkleeberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Bedburg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Obertshausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Zittau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Syke** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Lüdinghausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Stutensee** (amtlich (regional: trk)): `https://mobil.trk.de/geoserver/TBA/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=TBA%3Abehinderten_parkplaetze&outputFormat=application%2Fjson`
- **Norden** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Wiehl** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Helmstedt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Rathenow** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Bad Honnef** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Waldshut-Tiengen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Meiningen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Calw** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Ellwangen (Jagst)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Warstein** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Rottweil** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Vaterstetten** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Weingarten** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Meckenheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Rudolstadt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Bad Oldesloe** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Schmallenberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Varel** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Eisenhüttenstadt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Olpe** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Wandlitz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Starnberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Freudenstadt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Mosbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Plettenberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Haren (Ems)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Übach-Palenberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Lennestadt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Herzogenaurach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Sprockhövel** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Leutkirch im Allgäu** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Köthen (Anhalt)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Husum** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Isernhagen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Bad Mergentheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Westerstede** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Jüchen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Nagold** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Döbeln** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Ronnenberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Alfter** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Limbach-Oberfrohna** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Senden** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Attendorn** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Neu Wulmstorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Kaltenkirchen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Hann.Münden** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Senftenberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Sehnde** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Gersthofen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Moormerland** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Gelnhausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Weilheim i.OB** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Warburg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Bad Kissingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Staßfurt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Metzingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Riedstadt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Quedlinburg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Rotenburg (Wümme)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Bad Soden am Taunus** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Vreden** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Netphen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Dillenburg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Salzwedel** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Kitzingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Neusäß** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Korbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Rastede** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Haar** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Wertheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Sonneberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Laupheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Ottobrunn** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Apolda** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Herdecke** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Überlingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Bad Rappenau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Ditzingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Eppingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Stadthagen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Wallenhorst** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Karben** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Burg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Bad Salzungen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Lengerich** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Quickborn** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Soltau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Eisleben** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Mühldorf a.Inn** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Waghäusel** (amtlich (regional: trk)): `https://mobil.trk.de/geoserver/TBA/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=TBA%3Abehinderten_parkplaetze&outputFormat=application%2Fjson`
- **Büdingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Eschborn** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Eislingen/Fils** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Aichach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Heide** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Rees** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Gauting** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Gardelegen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Donaueschingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Zülpich** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Schwetzingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Bad Krozingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Mössingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Sonthofen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Germersheim** (amtlich (regional: trk)): `https://mobil.trk.de/geoserver/TBA/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=TBA%3Abehinderten_parkplaetze&outputFormat=application%2Fjson`
- **Hockenheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Lindlar** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Wipperfürth** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Osterode am Harz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Büren** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Radevormwald** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Eckernförde** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Dillingen/Saar** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Saarland (saarland-latest.osm.pbf)`
- **Versmold** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Waldkirch** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Glauchau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Stadtallendorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Elsdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Günzburg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Zossen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Karlsfeld** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Halle (Westf.)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Schifferstadt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Flörsheim am Main** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Seligenstadt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Rheinstetten** (amtlich (regional: trk)): `https://mobil.trk.de/geoserver/TBA/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=TBA%3Abehinderten_parkplaetze&outputFormat=application%2Fjson`
- **Groß-Umstadt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Xanten** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Wildeshausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Panketal** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Spremberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Westoverledingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Zerbst/Anhalt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Neufahrn b.Freising** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Luckenwalde** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Schortens** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Stadtlohn** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Geseke** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Sondershausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Traunstein** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Puchheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Senden** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Bad Waldsee** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Dingolfing** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Wülfrath** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Enger** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Schramberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Werdau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Bruchköbel** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Fröndenberg/Ruhr** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Lichtenfels** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Coswig** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Wachtberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Herborn** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Haßloch** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Ochtrup** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Burgwedel** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Traunreut** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Duderstadt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Nördlingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Schopfheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Steinhagen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Neunkirchen-Seelscheid** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Waren (Müritz)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Blieskastel** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Saarland (saarland-latest.osm.pbf)`
- **Neustrelitz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Hörstel** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Lilienthal** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Borna** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Nidderau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Müllheim im Markgräflerland** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Telgte** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Uetze** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Wilnsdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Wittmund** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Kürten** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Meinerzhagen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Moosburg a.d.Isar** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Torgau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Donauwörth** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Giengen an der Brenz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Leinefelde-Worbis** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Bad Schwartau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Schwanewede** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Schenefeld** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Bad Friedrichshall** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Oberkirch** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Ennigerloh** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Bad Tölz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Hechingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Dillingen a.d.Donau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Reichenbach im Vogtland** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Waldbröl** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Greiz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Pfullingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Engelskirchen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Bad Pyrmont** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Mayen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Nauen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Rhede** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Hiddenhausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Wolfratshausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Korntal-Münchingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Mölln** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Burghausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Marsberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Windeck** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Bad Harzburg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Alzey** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Lebach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Saarland (saarland-latest.osm.pbf)`
- **Wenden** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Sarstedt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Sulzbach-Rosenberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Gröbenzell** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Weil der Stadt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Schmalkalden** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Heusenstamm** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Kleinmachnow** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Burscheid** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Neuenhagen bei Berlin** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Eitorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Bad Dürkheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Schönefeld** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Haldensleben** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Kolbermoor** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Bad Driburg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Gilching** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Wittlich** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Schneverdingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Weilerswist** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Blankenburg (Harz)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Hemmingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Prenzlau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Holzminden** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Haiger** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Aue-Bad Schlema** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Oschersleben (Bode)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Schwalmtal** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Annaberg-Buchholz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Hohe Börde** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Eschwege** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Lahnstein** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Reichshof** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Radeberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Kronberg im Taunus** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Seesen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Sachsenheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Bergneustadt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Marktoberdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Swisttal** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Hessisch Oldendorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Renningen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Sömmerda** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Bad Aibling** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Illertissen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Heusweiler** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Saarland (saarland-latest.osm.pbf)`
- **Hochheim am Main** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Schwalmstadt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Bad Segeberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Gerlingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Wörth am Rhein** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Südbrookmerland** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Püttlingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Saarland (saarland-latest.osm.pbf)`
- **Weißenburg i.Bay.** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Vlotho** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Rhauderfehn** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Bad Münstereifel** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Bad Reichenhall** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Crimmitschau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Heilbad Heiligenstadt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Buchen (Odenwald)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Hoppegarten** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Großenhain** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Pfinztal** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Kreuzau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Taufkirchen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Vechelde** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Konz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Schwalbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Saarland (saarland-latest.osm.pbf)`
- **Ismaning** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Vilshofen an der Donau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Halstenbek** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Alzenau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Wadgassen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Saarland (saarland-latest.osm.pbf)`
- **Alfeld (Leine)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Bobingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Parchim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Bad Saulgau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Schrobenhausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Bexbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Saarland (saarland-latest.osm.pbf)`
- **Bad Säckingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Bönen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Babenhausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Pohlheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Vellmar** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Garching b.München** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Diepholz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Oberasbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Stockach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Frankenberg (Eder)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Freilassing** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Remagen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Holzwickede** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Nümbrecht** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Damme** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Trossingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Cham** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Gescher** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Bad Wildungen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Freudenberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Horn-Bad Meinberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Auerbach/Vogtl.** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Eutin** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Bad Münder am Deister** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Sinzig** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Bad Lippspringe** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Oerlinghausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Leopoldshöhe** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Forst (Lausitz)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Marktredwitz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Kelheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Nidda** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Wittenberge** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Eltville am Rhein** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Penzberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Finnentrop** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Schwarzenbek** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Schmelz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Saarland (saarland-latest.osm.pbf)`
- **Hünfeld** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Bad Wörishofen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Kamenz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Künzell** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Sigmaringen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Hövelhof** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Bad Bentheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Eggenstein-Leopoldshafen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Thale** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Brackenheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Wurster Nordseeküste** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Bruckmühl** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Bad Langensalza** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Heidenau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Königstein im Taunus** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Gunzenhausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Eppelborn** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Saarland (saarland-latest.osm.pbf)`
- **Kelsterbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Altena** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Kronach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Simmerath** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Bassum** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Poing** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Blaustein** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Eilenburg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Losheim am See** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Saarland (saarland-latest.osm.pbf)`
- **Preetz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Reinheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Ginsheim-Gustavsburg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Breisach am Rhein** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Wardenburg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Straelen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Wadern** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Saarland (saarland-latest.osm.pbf)`
- **Kierspe** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Wendelstein** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Herzebrock-Clarholz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Pocking** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Seeheim-Jugenheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Oyten** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Sulzbach/Saar** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Saarland (saarland-latest.osm.pbf)`
- **Künzelsau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Kirchlengern** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Halver** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Regenstauf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Holzkirchen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Erwitte** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Stockelsdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Drensteinfurt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Hille** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Kirchhain** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Bargteheide** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Wurzen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Brüggen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Rahden** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Markranstädt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Brakel** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Walldorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Marienberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Stahnsdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Bad Arolsen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Karlsbad** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Petersberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Loxstedt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Hude (Oldb)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Wendlingen am Neckar** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Neustadt in Holstein** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Erlensee** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Kernen im Remstal** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Rüdersdorf bei Berlin** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Großostheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Ascheberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Schiffweiler** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Saarland (saarland-latest.osm.pbf)`
- **Dieburg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Guben** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Odenthal** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Lübbenau/Spreewald** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Boppard** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Schlüchtern** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Usingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Zeulenroda-Triebes** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Eppelheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Stadtbergen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Großenkneten** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Templin** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Bitburg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Mindelheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Ratekau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Freiberg am Neckar** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Finsterwalde** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Blomberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Altdorf b.Nürnberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Grenzach-Wyhlen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Schwarzenberg/Erzgeb.** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Marbach am Neckar** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Baiersbronn** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Schwalbach am Taunus** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Beckingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Saarland (saarland-latest.osm.pbf)`
- **Bad Bramstedt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Bad Neustadt a.d.Saale** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Petershagen/Eggersdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Ebersbach an der Fils** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Michelstadt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Königslutter am Elm** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Ribnitz-Damgarten** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Sandhausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Alsfeld** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Gehrden** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Raunheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Füssen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Schwabmünchen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Langenau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Mainburg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Weener** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Schriesheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Brake (Unterweser)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Mühlenbecker Land** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Mering** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Garrel** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Isny im Allgäu** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Witzenhausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Grefrath** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Reken** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Ober-Ramstadt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Abensberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Niederzier** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Ratzeburg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Rellingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Weißwasser/O.L.** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Lohr a.Main** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Langerwehe** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Montabaur** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Malsch** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Stein** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Oberndorf am Neckar** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Ritterhude** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Münster (Hessen)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Landau a.d.Isar** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Harsefeld** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Neustadt a.d.Donau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Jever** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Landsberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Münsingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Selb** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Karlstadt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Eberbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Homberg (Efze)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Olsberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Büttelborn** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Pattensen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Langwedel** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Fredersdorf-Vogelsdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Eching** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Niederkrüchten** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Bissendorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Kraichtal** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Langelsheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Schiffdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Tornesch** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Wilsdruff** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Lengede** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Burglengenfeld** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Much** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Gründau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Sassenberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Burbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Murrhardt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Kalkar** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Fritzlar** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Plochingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Aßlar** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Hückeswagen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Eckental** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Löbau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Hainburg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Langenselbold** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Hofgeismar** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Ahrensfelde** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Grünstadt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Hilchenbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Gernsbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Immenstadt i.Allgäu** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Saterland** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Niedernhausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Neu-Anspach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Tostedt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Remshalden** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Neubiberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Brühl** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Löningen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Uhingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Markdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Riegelsberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Saarland (saarland-latest.osm.pbf)`
- **Lorsch** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Eggenfelden** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Bad Camberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Ottweiler** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Saarland (saarland-latest.osm.pbf)`
- **Wennigsen (Deister)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Angermünde** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Neutraubling** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Holzgerlingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Oschatz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Lauda-Königshofen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Krumbach (Schwaben)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Lich** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Sendenhorst** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Sylt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Freigericht** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Erbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Markgröningen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Leuna** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Sandersdorf-Brehna** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Schwentinental** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Rommerskirchen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Bovenden** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Lauchhammer** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Rosengarten** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Großefehn** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Lübben (Spreewald)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Quakenbrück** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Melsungen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **St. Leon-Rot** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Maisach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Zeven** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Mühltal** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Grafing b.München** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Erbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Dippoldiswalde** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Neuenkirchen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Clausthal-Zellerfeld** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Eichstätt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Beelitz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Lohfelden** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Haßfurt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Friesenheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Mittweida** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Waldbronn** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Buchloe** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Hohenstein-Ernstthal** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Barßel** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Lotte** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Obersulm** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Philippsburg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Meckenbeuren** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Wanzleben-Börde** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Ettenheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Borchen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Denzlingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Bad Soden-Salmünster** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Feucht** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Spaichingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Michendorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Grünberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Hünxe** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Pegnitz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Frankenberg/Sa.** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Hilpoltstein** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Linnich** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Asperg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Markt Schwaben** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Jessen (Elster)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Saarwellingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Saarland (saarland-latest.osm.pbf)`
- **Bedburg-Hau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Bad Schönborn** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Solms** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Schleiden** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Meerane** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Schüttorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Schmölln** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Uslar** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Haselünne** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Schermbeck** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Gräfelfing** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Bergen auf Rügen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Östringen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Tauberbischofsheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Pfullendorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Lappersdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Genthin** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Wentorf bei Hamburg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Gangelt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Mutterstadt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Sulingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Kirchheim b.München** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Schneeberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Marienheide** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Neckargemünd** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Oberhaching** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Hüllhorst** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Barsbüttel** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Neustadt a.d.Aisch** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Hagen am Teutoburger Wald** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Weinsberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Kalletal** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Fehmarn** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Brieselang** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Kerken** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Ubstadt-Weiher** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Olfen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Winterberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Twistringen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Plattling** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Treuchtlingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Roding** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Bad Dürrheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Bad Laasphe** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Peißenberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Altötting** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Wehr** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Ketsch** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Schöneiche bei Berlin** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Roßdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Bohmte** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Hadamar** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Bad Doberan** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Eppstein** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Lauterbach (Hessen)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Hösbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Manching** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Teutschenthal** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Bad Salzdetfurth** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Oebisfelde-Weferlingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Weilburg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Bergen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Bischofsheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Biedenkopf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Wietmarschen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Bebra** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Rotenburg a.d.Fulda** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Gärtringen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Jüterbog** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Ladenburg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Cremlingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Quierschied** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Saarland (saarland-latest.osm.pbf)`
- **Sulz am Neckar** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Kaufungen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Trebur** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Titisee-Neustadt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Herzberg am Harz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Bad Fallingbostel** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Hettstedt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Weeze** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Altenstadt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Pfarrkirchen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Hungen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Fuldatal** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Bad Urach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Wächtersbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Velten** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Blaubeuren** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Bretzfeld** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Neunkirchen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Brunsbüttel** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Dossenheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Neuenburg am Rhein** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Velen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Beverungen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Mettlach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Saarland (saarland-latest.osm.pbf)`
- **Möckern** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Wolfhagen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Schongau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Feuchtwangen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Bad Abbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Röthenbach a.d.Pegnitz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Alpen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Neuhausen auf den Fildern** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Emstek** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Linkenheim-Hochstetten** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Gaimersheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Rödental** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Graben-Neudorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Bad Windsheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Preußisch Oldendorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Hirschaid** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Issum** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Laichingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Bad Wünnenberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Gladenbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Ebersberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Niefern-Öschelbronn** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Monschau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Ense** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Ihlow** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Wasserburg a.Inn** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Hersbruck** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Hessisch Lichtenau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Wolmirstedt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Meitingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Tamm** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **St. Georgen im Schwarzwald** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Heddesheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Zetel** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Edemissen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Osterhofen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Oftersheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Borken (Hessen)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Rielasingen-Worblingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Besigheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Dinkelsbühl** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Salem** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Rosdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Vilsbiburg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Kronshagen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Wernau (Neckar)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Bad Sassendorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Lauffen am Neckar** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Gundelfingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Glienicke/Nordbahn** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Zella-Mehlis** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Oberkrämer** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Geeste** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Apen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Steinheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Leutenbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Wettenberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Hagenow** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Perleberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Gaildorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Welver** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Essenbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Murnau a.Staffelsee** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Stelle** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Ludwigslust** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Hallbergmoos** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Billerbeck** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Uplengen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Anklam** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Hemsbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Drolshagen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Sassenburg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Steinheim an der Murr** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Ostrhauderfehn** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Teningen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Lippetal** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Bad Freienwalde (Oder)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Lehre** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Unterföhring** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Oberschleißheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Eichenzell** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Schöneck** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Neustadt in Sachsen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Peiting** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Remchingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Durmersheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Rangsdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Scharbeutz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Jork** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Oberderdingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Bad Nenndorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Limburgerhof** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Schwaigern** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Kissing** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Lauenburg/Elbe** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Mettingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Erkner** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Leingarten** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Wickede (Ruhr)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Hildburghausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Walldürn** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Sinzheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Korb** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Lindenberg i.Allgäu** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Miesbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Geisenfeld** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Bopfingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Handewitt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Rudersberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Gerstetten** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Eichenau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Muldestausee** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Bad Schwalbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Ammerbuch** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Bad Dürrenberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Lauingen (Donau)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Eningen unter Achalm** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Ostbevern** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Burgthann** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Dautphetal** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Oestrich-Winkel** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Zeuthen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Diez** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Marktheidenfeld** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Krummhörn** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Geisenheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Straubenhardt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Rothenburg ob der Tauber** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Zwönitz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Kriftel** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Waldkirchen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Rheinau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Recke** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Trostberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Schwieberdingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Drochtersen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Engen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Kranenburg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Altdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Möhnesee** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Welzheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Rutesheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Isselburg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Cadolzburg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Balve** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Ochsenfurt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Mömbris** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Südheide** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Kall** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Grünwald** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Riedlingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Raubling** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Mülheim-Kärlich** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Wittingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Coswig (Anhalt)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Stollberg/Erzgeb.** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Bannewitz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Bad Belzig** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Niestetal** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Herrsching a.Ammersee** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Herxheim bei Landau/Pfalz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Denkendorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Gengenbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Schöningen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Rodenbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Werther (Westf.)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Boizenburg/Elbe** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Braunfels** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Höhenkirchen-Siegertsbrunn** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Wustermark** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Regen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Planegg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Burgkirchen a.d.Alz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Wolgast** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Lichtenau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Langgöns** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Egelsbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Eisenberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Oelsnitz/Erzgeb.** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Ebersbach-Neugersdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Haigerloch** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Prien a.Chiemsee** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Neuhof** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Ruppichteroth** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Dallgow-Döberitz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Lichtenstein/Sa.** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Hasbergen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Gottmadingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Malente** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Kleinblittersdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Saarland (saarland-latest.osm.pbf)`
- **Steinbach (Taunus)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Mandelbachtal** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Saarland (saarland-latest.osm.pbf)`
- **Bad Staffelstein** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Adendorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Grafschaft** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Schkopau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Fürth** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Lorch** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Selfkant** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Möglingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Herbolzheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Nideggen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Nordkirchen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Kenzingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Feldkirchen-Westerham** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Schwielowsee** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Wildau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Hagen im Bremischen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Diedorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Karlsdorf-Neuthard** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Meßstetten** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Dießen am Ammersee** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Burgau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Weinböhla** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Bad Iburg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Taufkirchen (Vils)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Böhl-Iggelheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Plankstadt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Schorfheide** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Bischofswerda** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Donzdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Emsbüren** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Stephanskirchen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Morsbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Hüttenberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Morbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Felsberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Weingarten (Baden)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Gronau (Leine)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Schönwalde-Glien** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Nauheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Nossen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Schalksmühle** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Wald-Michelbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Bogen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Langenzenn** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Aulendorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Büdelsdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Burgstädt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Steinen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Bad Wildbad** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Klipphausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Werlte** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Hünstetten** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Appenweier** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Betzdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Braunsbedra** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Schauenburg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Kirchseeon** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Goldenstedt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Anröchte** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Rüthen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Markt Indersdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Friedeburg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Altenberge** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Kirchzarten** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Simbach a.Inn** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Mörlenbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Steinfeld (Oldenburg)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Schleusingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Birkenfeld** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Lollar** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Tangermünde** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Königsbach-Stein** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Wendeburg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Kirkel** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Saarland (saarland-latest.osm.pbf)`
- **Steinau an der Straße** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Flöha** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Niebüll** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Grevesmühlen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Kirchlinteln** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Mengen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Meuselwitz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Bestwig** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Lenggries** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Willstätt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Tangerhütte** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Merchweiler** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Saarland (saarland-latest.osm.pbf)`
- **Gommern** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Hilter am Teutoburger Wald** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Rödinghausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Oelsnitz/Vogtl.** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Bobenheim-Roxheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Bad Ems** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Schwaikheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Nordwalde** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Querfurt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Blumberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Dettingen an der Erms** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Ammersbek** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Ohrdruf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Wildberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Weil im Schönbuch** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Münchberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Kaufering** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Olbernhau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Nohfelden** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Saarland (saarland-latest.osm.pbf)`
- **Rehburg-Loccum** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Bad Orb** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Tutzing** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Gudensberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Neuried** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Ottendorf-Okrilla** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Walzbachtal** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Biebertal** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Rüdesheim am Rhein** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Elchingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Altenholz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Niddatal** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Südlohn** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Goldbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Emmerthal** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Nersingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Ilsfeld** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Pliezhausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Hünfelden** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Eschenburg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Kösching** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Everswinkel** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Plüderhausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Höchst i.Odw.** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Visbek** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Erlenbach a.Main** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Bad Frankenhausen/Kyffhäuser** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Oldenburg in Holstein** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Nieder-Olm** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Trebbin** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Klötze** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Laubach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Heilsbronn** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Linsengericht** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Veitshöchheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Roßtal** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Brandis** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Osthofen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Hirschberg an der Bergstraße** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Schotten** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Altlandsberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Bad Breisig** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Aichtal** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Demmin** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Birkenau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Oberhausen-Rheinhausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Höchberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Schulzendorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Wettin-Löbejün** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Oberharz am Brocken** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Runkel** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Kißlegg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Magstadt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Bisingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Perl** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Saarland (saarland-latest.osm.pbf)`
- **Töging a.Inn** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Wertingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Heiligenhafen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Großhansdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Bockenem** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Visselhövede** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Zorneding** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Oberzent** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Sebnitz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Wilkau-Haßlau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Wölfersheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Höhr-Grenzhausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Ilsenburg (Harz)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Ehringshausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Werneuchen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Giesen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Nuthetal** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Osterburg (Altmark)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Ochsenhausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Essen (Oldenburg)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Miltenberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Großbeeren** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Kandel** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Laufenburg (Baden)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Worpswede** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Wallerfangen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Saarland (saarland-latest.osm.pbf)`
- **Schmitten im Taunus** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **March** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Zwenkau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Bad Liebenzell** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Oberstdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Ehningen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Urbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Alsbach-Hähnlein** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Schlitz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Wehrheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Mücke** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Kolkwitz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Salzhemmendorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Lügde** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Elsenfeld** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Kemberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Hohenmölsen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Ebsdorfergrund** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Ilvesheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Luckau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Frickenhausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Hilzingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Hürtgenwald** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Storkow (Mark)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Gäufelden** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Lüchow (Wendland)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Altenbeken** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Bleckede** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Aschheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Wangerland** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Nittenau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Dassel** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Barleben** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Steinbach-Hallenberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Adelsdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Schaafheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Reinfeld (Holstein)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Tecklenburg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Florstadt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Dielheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Gomaringen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Biblis** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Fehrbellin** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Vallendar** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Zwiesel** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Titz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Rehau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Bad Schussenried** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Mendig** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Hohenbrunn** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Weißenthurm** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Kusterdingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Neuötting** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Waldheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Bad Gandersheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Grünheide (Mark)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Bruchhausen-Vilsen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Wunsiedel** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Niesky** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Bad Griesbach i.Rottal** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Nittendorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Obernkirchen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Nettersheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Torgelow** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Bad Laer** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Sassnitz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Liederbach am Taunus** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Gerstungen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Bad Lauchstädt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Elze** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Wetter (Hessen)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Kabelsketal** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Neuenkirchen-Vörden** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Bockhorn** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Borgholzhausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Sulzbach (Taunus)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Plön** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Südharz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Breckerfeld** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Kappeln** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Brand-Erbisdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Neuried** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Roetgen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Hallstadt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Obertraubling** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Naunhof** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Heek** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Ueckermünde** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Schwaig b.Nürnberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Zschopau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Waldenbuch** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Rimbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Langweid a.Lech** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Dörverden** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Herzberg (Elster)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Kressbronn am Bodensee** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Bad Bergzabern** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Eslohe (Sauerland)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Großenlüder** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Kandern** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Hemmoor** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Bellheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Keltern** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Efringen-Kirchen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Möckmühl** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Sinntal** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Wissen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Meßkirch** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Rauenberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Weilmünster** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Untergruppenbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Gleichen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Furth im Wald** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Sande** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Pullach i.Isartal** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Sülzetal** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Obernburg a.Main** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Schladen-Werla** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Fürstenzell** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Schnaittach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Allersberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Wörrstadt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Volkach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Biederitz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Dornburg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Geratal** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Schleiz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Dietmannsried** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Garching a.d.Alz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Nonnweiler** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Saarland (saarland-latest.osm.pbf)`
- **Fuldabrück** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Seegebiet Mansfelder Land** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Rülzheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Neuhaus am Rennweg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Staufen im Breisgau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Kahl a.Main** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Doberlug-Kirchhain** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Blankenheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Ortenberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Ballenstedt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Furtwangen im Schwarzwald** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Schierling** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Möser** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Woltersdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Bad Rothenfelde** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Heikendorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Reichenbach an der Fils** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Viechtach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Kleinostheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Großräschen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Friedland** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Landstuhl** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Niederwerrn** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Timmendorfer Strand** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Siegsdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Stadtilm** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Langenberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Herrieden** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Staufenberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Meine** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Heroldsberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Willebadessen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Unterwellenborn** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Hainichen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Colditz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Lützen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Schwarzenbruck** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Biebergemünd** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Borsdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Kuppenheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Bersenbrück** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Moritzburg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Wachtendonk** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Hermsdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Uhldingen-Mühlhofen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Grafenau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Bad Feilnbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Simmern/Hunsrück** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Dornstetten** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Hohberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Mücheln (Geiseltal)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Lahnau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Lauter-Bernsbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Aspach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Hausham** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Neuenbürg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Bad Sooden-Allendorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Neuendettelsau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Lauchringen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Zell am Harmersbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Helmbrechts** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Bönnigheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Bad Endorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Schieder-Schwalenberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Kühlungsborn** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Elz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Forst** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Nierstein** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Sauerlach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Hüfingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Teublitz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Penig** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Premnitz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Neunkirchen a.Brand** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Bad Lausick** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Salach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Amt Wachsenburg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Meinersen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Haibach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Jettingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Bad Sulza** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Beeskow** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Oranienbaum-Wörlitz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Bad Füssing** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Lenningen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Dannenberg (Elbe)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Neresheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Salzbergen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Nessetal** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Birkenwerder** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Bad Endbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Loßburg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Postbauer-Heng** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Medebach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Weikersheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Hemmingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Saulheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Baiersdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Althengstett** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Drei Gleichen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Könnern** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Aldingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Bordesholm** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Krailling** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Hellenthal** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Georgenthal** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Altomünster** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Parsberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Barby** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Ehrenkirchen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Hengersberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Asbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Erzhausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Illingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Untermeitingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Gundelfingen a.d.Donau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Feldkirchen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Heuchelheim a.d.Lahn** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Elsteraue** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Bühlertal** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Jesteburg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Oberkochen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Bützow** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Weissach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Bad Grund (Harz)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Nörten-Hardenberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Sögel** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Grasberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Bad Düben** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Teuchern** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Lastrup** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Rheinsberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Berchtesgaden** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Küps** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Bad Herrenalb** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Löffingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Emlichheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Pfronten** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Bad Wimpfen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Kirchberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Elsterwerda** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Bad Liebenstein** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Bismark (Altmark)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Algermissen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Oberstaufen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Schweich** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Ramstein-Miesenbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Vetschau/Spreewald** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Bergkirchen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Schonungen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Seefeld** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Calau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Inden** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Schömberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Radeburg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Daun** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Rimpar** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Holdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Renchen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Münnerstadt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Großmehring** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Vohenstrauß** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Weissach im Tal** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Oederan** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Barth** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Stadland** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Seeland** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Gettorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Treuenbrietzen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Oberstenfeld** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Allstedt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Dörentrup** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Horstmar** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Jockgrim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Langenargen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Dittelbrunn** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Elzach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Otterndorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Ahnatal** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Saarburg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Bad Kötzting** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Dannstadt-Schauernheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Flintbek** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Söhlde** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Naila** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Lugau/Erzgeb.** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Sontra** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Bunde** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Altenberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Gundelsheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Klettgau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Heidenrod** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Leipheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Flein** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Schellerten** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Sulzbach a.Main** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Türkheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Heidesee** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Bad Berka** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Großkarolinenfeld** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Hasselroth** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Baienfurt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Edermünde** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Belgern-Schildau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Burkardroth** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Allensbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Friedrichroda** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Pleinfeld** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Laufen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Sinzing** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Ortenburg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Schwülper** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Mittenwald** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Pfaffenhofen a.d.Roth** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Harzgerode** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Harztor** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Klingenthal** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Pfalzgrafenweiler** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Zwingenberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Wabern** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Alfdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Hardegsen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Pulsnitz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Wallersdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Weimar (Lahn)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Enkenbach-Alsenborn** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Ampfing** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Am Mellensee** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Bad Sachsa** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Haslach im Kinzigtal** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Nortorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Schwanstetten** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Meldorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Neulußheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Annweiler am Trifels** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Bindlach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Greding** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Burgebrach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Roßwein** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Neukieritzsch** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Scheßlitz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Schwendi** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Namborn** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Saarland (saarland-latest.osm.pbf)`
- **Stolzenau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Freyung** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Immenhausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Maxdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Tuntenhausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Oppenheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Waldstetten** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Ostrach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Birkenfeld** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Roßleben-Wiehe** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Markneukirchen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Bischofswiesen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Berne** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Schöppingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Königsbronn** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Sonnenbühl** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Pöttmes** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Am Ettersberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Reinsdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Waging a.See** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Reppenstedt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Lemwerder** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Esens** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Jettingen-Scheppach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Lautertal (Odenwald)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Ilshofen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Königsee** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Homberg (Ohm)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Geiselhöring** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Nobitz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Reichelsheim (Wetterau)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Neuhofen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Eiterfeld** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Schallstadt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Durach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Lichtenau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Lambsheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Grassau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Lengenfeld** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Georgensgmünd** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Ladbergen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Saerbeck** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Waldeck** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Höchstädt a.d.Donau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Murg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Edenkoben** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Dermbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Bakum** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Geithain** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Dettelbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Berglen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Bernau a.Chiemsee** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Neukirchen/Erzgeb.** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Putzbrunn** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Dietenheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Auenwald** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Müncheberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Horneburg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Grömitz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Bonndorf im Schwarzwald** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Hardheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Eberdingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Dinkelscherben** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Eibenstock** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Schönkirchen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Erndtebrück** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Böhlen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Mutlangen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Stadtroda** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Dettenheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Lathen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Malchin** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Altenkirchen (Westerwald)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Gröditz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Büchen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Leegebruch** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Bernkastel-Kues** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Niedere Börde** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Mallersdorf-Pfaffenberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Ebermannstadt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Ketzin/Havel** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Hermeskeil** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Polch** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Heringen (Werra)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Kupferzell** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Brannenburg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Zusmarshausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Tiefenbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Osterburken** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Neuenstein** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Schelklingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Gau-Algesheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Bardowick** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Mitterteich** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Weisendorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Wöllstadt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Schliersee** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Schöffengrund** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Klingenberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Immendingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Grasbrunn** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Grafenau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Huy** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Murr** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Pegau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Heitersheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Laudenbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Bispingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Jerichow** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Neustadt-Glewe** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Bad Sobernheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Fockbek** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Holle** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Greifenstein** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Nattheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Machern** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Blankenhain** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Moringen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Metelen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Volkmarsen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Salzweg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Sanitz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Haag i.OB** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Rheinmünster** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Neustadt (Wied)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Hage** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Biebesheim am Rhein** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Kiefersfelden** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Herdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Hartha** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Gerbrunn** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Cölbe** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Sinn** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Sottrum** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Kalbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Bad Brückenau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Buttstädt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Bietigheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Burgkunstadt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Artern** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Maulbronn** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Rheurdt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Röhrmoos** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Immenstaad am Bodensee** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Uffenheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Eppertshausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Eggolsheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Glashütte** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Wassertrüdingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Beilstein** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Mainleus** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Thannhausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Burghaun** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Güglingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Zellingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Römhild** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Vilseck** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Unstrut-Hainich** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Bad Hönningen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Hanstedt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Petershausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Ottersweier** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Waldachtal** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Eichwalde** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Bad Saarow** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Hachenburg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Satow** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Neumarkt-Sankt Veit** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Hutthurm** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Benningen am Neckar** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Otzberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Brechen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Altlußheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Sohland a.d.Spree** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Veitsbronn** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Schwabhausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Ihringen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Glücksburg (Ostsee)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Rodenberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Kämpfelbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Bammental** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Wutha-Farnroda** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Linz am Rhein** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Trochtelfingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Laage** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Oberding** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Havelberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Bernsdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Vogtsburg im Kaiserstuhl** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Gersheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Saarland (saarland-latest.osm.pbf)`
- **Bondorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Ingersheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Dornhan** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Aarbergen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Deißlingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Erdweg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Schönberg (Holstein)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Zell im Wiesental** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Schliengen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Wolfschlugen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Dierdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Edertal** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Adelebsen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Bad Rodach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Ilmtal-Weinstraße** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Nachrodt-Wiblingwerde** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Dötlingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Gammertingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Dußlingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Niedergörsdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Dettingen unter Teck** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Uder** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Eutingen im Gäu** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Ebersdorf b.Coburg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Alpirsbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Windsbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Klingenberg a.Main** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Neuffen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Muggensturm** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Bad Marienberg (Westerwald)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Gochsheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Riedenburg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Nieheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Falkenberg/Elster** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Billigheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Hüttlingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Lachendorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Neustadt a.d.Waldnaab** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Dudenhofen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Altbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Bickenbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Isenbüttel** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Dohna** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Nesse-Apfelstädt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Waldsee** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Kirchheim am Neckar** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Plaidt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Westerburg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Allershausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Hörselberg-Hainich** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Rohrbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Schlangenbad** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Spangenberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Butjadingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Malchow** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Königsfeld im Schwarzwald** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Plau am See** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Meersburg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Thalheim/Erzgeb.** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Stockstadt am Rhein** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Kirchardt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Burkhardtsdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Langquaid** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Schlüsselfeld** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Hohenlockstedt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Uelsen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Hebertshausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Mudersbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Lübz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Faßberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Tarp** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Großbreitenbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **An der Schmücke** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Boostedt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Emskirchen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Waldbrunn (Westerwald)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Jade** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Schäftlarn** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Dasing** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Beselich** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Tittmoning** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Geltendorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Elztal** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Gmund a.Tegernsee** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Nufringen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Bodelshausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Waibstadt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Bredstedt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Heringsdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Bräunlingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Löchgau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Dietenhofen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Sontheim an der Brenz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Schwarmstedt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Nottertal-Heilinger Höhen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Fürstenberg/Havel** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Kalefeld** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Hirschau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Neubulach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Ober-Mörlen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Bruckberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Herrnhut** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Wirges** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Böhmenkirch** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Willingen (Upland)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Odelzhausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Münzenberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Oberboihingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Tacherting** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Kleinwallstadt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Giebelstadt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Weischlitz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Ebensfeld** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Mengerskirchen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Beratzhausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Gemmingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Pöcking** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Merzhausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Aying** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Hambrücken** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Affing** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Dietramszell** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Wolfach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Großpösna** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Leutershausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Tegernheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Limeshain** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Fischbachau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Kaltennordheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Schönenberg-Kübelberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Rochlitz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Wesendorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Laboe** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Dettenhausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Seelow** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Zeil a.Main** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Wartenberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Rot am See** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Heimsheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Mellrichstadt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Baltmannsweiler** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Bad Lobenstein** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Küssaberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Weßling** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Blaichach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Igersheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Büchenbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Mügeln** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Ingelfingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Wernberg-Köblitz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Kirchentellinsfurt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Rechberghausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Baar-Ebenhausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Aschau i.Chiemgau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Lamspringe** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Vöhl** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Walddorfhäslach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Ahlerstedt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Drebkau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Brunnthal** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Sersheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Eschede** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Rottach-Egern** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Stolpen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Frankenblick** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Hohenwestedt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Triftern** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Bessenbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Grabfeld** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Ovelgönne** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Sulzbach an der Murr** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Traben-Trarbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Altenstadt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Dörpen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Forchtenberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Rehfelde** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Rottendorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Ertingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Ludwigsau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Rockenhausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Bad Gottleuba-Berggießhübel** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Bernhardswald** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Neuenkirchen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Wackersdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Külsheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Grebenstein** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Nackenheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Sasbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Gersfeld (Rhön)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Wannweil** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Stühlingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Guxhagen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Norderney** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Kirchdorf a.Inn** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Ranstadt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Nünchritz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Kusel** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Wörthsee** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Dietzhölztal** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Uhlstädt-Kirchhasel** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Schechen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Schönau a.Königssee** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Tiefenbronn** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Zarrentin am Schaalsee** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Rosengarten** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Angelbachtal** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Meckesheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Neuberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Seubersdorf i.d.OPf.** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Jestetten** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Laaber** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Calberlah** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Ebstorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Waldems** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Prüm** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Bergrheinfeld** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Schöppenstedt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Jahnsdorf/Erzgeb.** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Erdmannhausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Süderbrarup** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Ühlingen-Birkendorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Mahlberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Mühlhausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Pommelsbrunn** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Ellrich** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Hemhofen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Iffezheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Großschirma** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Adelsheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Lenzkirch** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Oettingen i.Bay.** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Wörth a.d.Donau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Pottenstein** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Reichenau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Reichertshausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Diemelstadt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Himmelpforten** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Burg Stargard** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Lonsee** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Tharandt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Steyerberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Erlenbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Karlskron** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Wermsdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Kitzscher** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Bad Bellingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Steißlingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Oberammergau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Sulzfeld** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Ruhla** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Hofheim i.UFr.** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Waldmohr** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Achstetten** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Bad Boll** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Großschönau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Ötigheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Büsum** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Sundhagen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Neuhausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Modautal** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Gadebusch** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Glonn** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Heiningen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Laufach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Trappenkamp** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Espenau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Deggingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Lensahn** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Mammendorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Wiggensbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Igensdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Bad Hindelang** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Driedorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Oerlenbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Unkel** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Heroldsbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Binz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Engstingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Marxzell** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Illerkirchberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Weitramsdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Krauchenwies** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Zschorlau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Lichtenau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Großheubach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Übersee** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Windorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Petersaurach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Halsbrücke** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Hügelsheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Rheinzabern** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Altentreptow** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Fronreute** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Emmelshausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Windischeschenbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Lohsa** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Schwaan** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Abstatt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Molfsee** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Arnsdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Todtnau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Oberthulba** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Cochem** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Naumburg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Waldbüttelbrunn** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Zapfendorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Niederstotzingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Niederstetten** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Oberviechtach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Kröpelin** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Lenting** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Vacha** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Hartheim am Rhein** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Wiesentheid** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Winhöring** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Rust** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Stetten am kalten Markt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Lauchheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Emmingen-Liptingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Stavenhagen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Brachttal** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Drebach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Hammersbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Stadecken-Elsheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Braunlage** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Bodman-Ludwigshafen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Eriskirch** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Aglasterhausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Inning a.Ammersee** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Alheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Krayenberggemeinde** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Malschwitz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Neuhausen/Spree** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Tönning** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Eggesin** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Kruft** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Seddiner See** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Uttenreuth** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Chieming** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Wörth a.Main** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Iphofen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Asbach-Bäumenheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Vellberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Gablingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Uchte** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Rückersdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Mietingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Neukirch/Lausitz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Herbertingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Lommatzsch** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Maselheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Bad Bocklet** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Hilders** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Raschau-Markersbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Hochspeyer** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Hesel** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Niederwiesa** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Geisa** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Inzell** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Börnsen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Jahnatal** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Wildeck** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Thum** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Bellenberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Aindling** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Buchholz (Westerwald)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Altenstadt a.d.Waldnaab** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Heideck** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Röbel/Müritz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Otterfing** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Duingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Burgheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Waldbrunn** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Königsbrück** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Neunkirchen a.Sand** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Vierkirchen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Eisingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Leidersbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Wilthen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Hörsel** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Lähden** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Kreischa** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Röttenbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Müllrose** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Bad Bodenteich** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Gutach im Breisgau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Marklohe** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Bergen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Nastätten** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Scheinfeld** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Eberhardzell** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Reichenbach/O.L.** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Striegistal** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Hitzacker (Elbe)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Oy-Mittelberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Forbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Krautheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Bönningstedt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Bubenreuth** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Aßling** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Böbingen an der Rems** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Altdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Limbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Freden (Leine)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Ober-Olm** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Heimbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Marlow** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Breitengüßbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Rhede (Ems)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Rennerod** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Rauschenberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Vöhringen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Rheinbreitbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Nordrhein-Westfalen (nordrhein-westfalen-latest.osm.pbf)`
- **Ummendorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Creglingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Adorf/Vogtl.** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Gerabronn** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Buggingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Knüllwald** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Putbus** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Grebenhain** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Oppenweiler** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Freyburg (Unstrut)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Mittelbiberach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Scheidegg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Maikammer** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Wachenheim an der Weinstraße** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Dahlem** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Liebenwalde** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Stegen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Hartenstein** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Wörth** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Albershausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Breitungen/Werra** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Kirchberg i.Wald** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Nehren** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Güntersleben** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Hartmannsdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Augustusburg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Suderburg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Münsing** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Starzach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Poppenhausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Untereisesheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Zell a.Main** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Rabenau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Donaustauf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Langenlonsheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Hankensbüttel** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Heiligengrabe** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Dornum** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Contwig** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Surwold** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Ehrenfriedersdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Eurasburg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Feldafing** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Offingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Grabenstätt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Röhrnbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Mögglingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Feldberger Seenlandschaft** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Edling** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Kranzberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Schnaittenbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Wilster** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Peitz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Gößweinstein** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Badbergen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Dahn** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Rheinböllen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Reinhardshagen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Dransfeld** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Triefenstein** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Metten** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Olbersdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Strasburg (Uckermark)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Empfingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Baumholder** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Neufahrn i.NB** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Eching** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Grettstadt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Neureichenau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Wachau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Waldfischbach-Burgalben** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Schwarzenbach a.Wald** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Aichhalden** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Neuzelle** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Bodenwöhr** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Twistetal** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Pressath** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Nienstädt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Messel** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Niederdorfelden** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Sennfeld** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Amstetten** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Dietingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Neckarbischofsheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Bürgstadt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Lauenau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Kirchberg (Hunsrück)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Loitz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Elmenhorst/Lichtenhagen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Niedernhall** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Winkelhaid** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Wiesenburg/Mark** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Vogtei** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Burg (Spreewald)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Weinbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Wietzendorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Lindhorst** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Rockenberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Gondelsheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Baruth/Mark** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Eging a.See** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Bruck i.d.OPf.** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Bermatingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Gräfenberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Zaberfeld** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Reichenberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Dahlen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Kirchberg an der Murr** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Stammham** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Altenmarkt a.d.Alz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Graal-Müritz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Selbitz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Tessin** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Schöllkrippen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Niederfischbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Wyk auf Föhr** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Buchenberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Baunach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Fronhausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Pfaffing** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Schwebheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Kochel a.See** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Escheburg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Mauer** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Langenbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Geringswalde** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Friolzheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Sörup** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Neckarwestheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Mühlhausen-Ehingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Walkenried** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Lichtenfels** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Rothenburg/O.L.** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Gelenau/Erzgeb.** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Graben** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Gars a.Inn** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Kraiburg a.Inn** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Kreßberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Otterbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Ellhofen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Gau-Odernheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Lambrecht (Pfalz)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Hasloh** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Mertingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Seckach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Waldalgesheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Bad Tabarz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Hattorf am Harz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Kritzmow** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Sprendlingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Bad Zwesten** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Guntersblum** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Waldenburg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Hütschenhausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Schefflenz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Rosenbach/Vogtl.** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Philippsthal (Werra)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Neukloster** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Schönberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Dassow** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Cadenberge** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Wiesau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Eschau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Süderholz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Amorbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Marschacht** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Wäschenbeuren** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Gensingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Helmstadt-Bargen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Grafrath** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Lunzenau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Kiedrich** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Hoya** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Wolfegg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Germaringen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Hamm (Sieg)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Welden** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Pressig** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Neckartailfingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Billigheim-Ingenheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Andechs** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Neckarsteinach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Allendorf (Lumda)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Wasserburg (Bodensee)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Eigeltingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **St. Blasien** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Loiching** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Marklkofen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Kyffhäuserland** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Heßdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Regis-Breitingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Schonach im Schwarzwald** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Biberach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Groß Grönau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Aukrug** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Göllheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Nesselwang** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Eppendorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Eichstetten am Kaiserstuhl** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Lorch** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Schondorf am Ammersee** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Rimsting** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Neudrossenfeld** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Hollenstedt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Warngau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Döhlau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Zinnowitz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Rickenbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Wolkenstein** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Neukirchen/Pleiße** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Wahrenholz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Trebsen/Mulde** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Albersdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Bergtheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Letschin** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Sigmaringendorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Ruhland** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Sankt Peter-Ording** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Michelfeld** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Buttenheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Vettelschoß** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Icking** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Bevern** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Markersdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Bad Kleinen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Hausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Malsfeld** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Liebenau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Forstern** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Burgstetten** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Speicher** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Benediktbeuern** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Wallhausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Hechthausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Pürgen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Langenenslingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Kraftsdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Bodenmais** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Unterwössen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Bad Salzschlirf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Deidesheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Kirchheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Gechingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Türkenfeld** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Freudenberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Kleinheubach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Triptis** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Klein-Winternheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Eystrup** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Beuren** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Amtsberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Orsingen-Nenzingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Bentwisch** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Hildrizhausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Bad Muskau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Farchant** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Sexau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Tegernsee** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Grainau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Aiterhofen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Sailauf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Marktrodach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Bad Elster** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Dörfles-Esbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Zornheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Happurg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Parthenstein** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Hauenstein** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Seifhennersdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Ronneburg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Schiltach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Stromberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Burgbernheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Jemgum** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Lalendorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Schwindegg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Straßkirchen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Sankt Michaelisdonn** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Heimenkirch** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Ölbronn-Dürrn** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Hirschhorn (Neckar)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Sasbach am Kaiserstuhl** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Malsch** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Neustadt (Dosse)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Malterdingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Lucka** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Beindersheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Lauben** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Berge** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Grafenrheinfeld** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Ulmen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Moos** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Owen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Spreenhagen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Gößnitz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Angelburg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Bad Klosterlausnitz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Valley** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Baierbrunn** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Kranichfeld** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Bad Karlshafen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Urmitz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Ohlsbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Langenhorn** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Hoppstädten-Weiersbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Illerrieden** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Erolzheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Poppenricht** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Volkertshausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Randersacker** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Bad Schandau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Hohenlinden** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Spraitbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Gaienhofen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Offenberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Wilhelmsfeld** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Bischofsmais** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Colbitz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Leutersdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Michelbach an der Bilz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Auma-Weidatal** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Krakow am See** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Ohlstadt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Schwarzatal** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Walheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Mühlberg/Elbe** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Bempflingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Tuningen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Marzling** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Plate** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Staig** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Scharnebeck** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Leinach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Berkheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Deckenpfronn** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Kirchenthumbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Saalburg-Ebersdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Neuler** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Tüßling** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Schwegenheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Waldburg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Schwangau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Burgbrohl** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Elchesheim-Illingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Unterbreizbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Haina (Kloster)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Kaisersesch** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Geyer** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Warin** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Lorup** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Münchhausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Bad Steben** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Hunderdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Bodnegg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Harthausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Simmelsdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Gosen-Neu Zittau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Irschenberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Bad Teinach-Zavelstein** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Obermichelbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Wörth a.d.Isar** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Hillesheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Bischoffen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Vörstetten** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Stephansposching** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Glattbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Dorf Mecklenburg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Wangen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Alteglofsheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Hammah** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Buckenhof** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Fischen i.Allgäu** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Eicklingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Seeshaupt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Hohnstein** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Birkenheide** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Hülben** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Lauscha** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Hirrlingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Babensham** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Kirchenlamitz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Pfatter** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Cleebronn** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Gimbsheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Margetshöchheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Mommenheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Hodenhagen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Priestewitz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Klein Offenseth-Sparrieshoop** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Maroldsweisach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Radibor** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **St. Egidien** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Vogtareuth** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Großenaspe** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Ludwigsstadt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Seeg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Sand a.Main** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Burgberg i.Allgäu** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Hettenleidelheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Kammerstein** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Föhren** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Werther** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Gailingen am Hochrhein** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Königheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Pampow** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Hanerau-Hademarschen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Jesewitz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Klütz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Hohenroda** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Aitrach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Glauburg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Hahnstätten** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Herschbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Neuental** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Bayerisch Gmain** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Schafflund** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Klosterlechfeld** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Aidenbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Bischweier** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Braubach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Rengsdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Eitensheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Kalchreuth** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Lohmen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Frasdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Wesenberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Münster-Sarmsheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Binzen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Waldenburg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Dirmstein** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Kobern-Gondorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Neuenstein** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Bodolz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Memmingerberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Horgau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Großharthau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Berglern** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Nebra (Unstrut)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Adenau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Heroldstatt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Sigmarszell** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Schwarzach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Mönsheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Lindow (Mark)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Meißner** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Beetzendorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Undenheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Claußnitz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Euerbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Kenn** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Fichtenberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Lambrechtshagen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Schopfloch** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Huglfing** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Hatzenbühl** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Kirchweidach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Weißenstadt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Dollnstein** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Wildflecken** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Aichstetten** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Heidgraben** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Wischhafen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Dömitz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Zemmer** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Lengerich** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Hemmingstedt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Sulzemoos** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Blender** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Sollstedt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Offenau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Simmozheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Eggstätt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Ringgau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Elfershausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Zingst** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Marktleuthen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Schenefeld** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Marktl** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Kallmünz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Roxheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Detern** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Embsen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Haste** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Käbschütztal** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Frankenau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Reinsberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Landesbergen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Tonna** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Lehrensteinsfeld** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Rieseby** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Altenglan** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Bretzenheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Wertach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Iffeldorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Lengdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Salching** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Münchweiler an der Rodalb** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Sontheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Weyhausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Eschelbronn** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Niederzissen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **St. Peter** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Kutzenhausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Thaleischweiler-Fröschen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Fischbachtal** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Grafling** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Hohenkammer** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Rositz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Waigolshausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Möttingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Roggenburg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Neuhaus a.d.Pegnitz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Probstzella** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Friedewald** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Erxleben** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Themar** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Elstra** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Thüngersheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Oberelsbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Ringsheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Großweitzschen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Steinberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Grafenberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Kist** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Prittriching** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Hanhofen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Herleshausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Kefenrod** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Adelsried** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Nordendorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Burkau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Dieblich** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Pfaffenhofen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Lam** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Bad Peterstal-Griesbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Leimersheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Lentföhrden** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Schluchsee** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Rosenberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Wohltorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Schönwald im Schwarzwald** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Nußdorf a.Inn** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Sulzbach-Laufen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Erpel** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Brohl-Lützing** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Hetzerath** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Kinding** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Ostelsheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Eime** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Helmstadt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Freihung** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Puderbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Berghaupten** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Salmtal** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Wiesenttal** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Sasbachwalden** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Wasbek** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Dernbach (Westerwald)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Igling** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Schwörstadt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Eimeldingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Gägelow** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Schleusegrund** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Oberwolfach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Heede** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Lauenbrück** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Geldersheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Wustrow (Wendland)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Hausen b.Würzburg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Ehrenberg (Rhön)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Rötgesbüttel** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Bad Wilsnack** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Sellin** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Hinterzarten** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Insel Poel** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Halbe** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Hessigheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Mönchberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Chamerau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Bad Eilsen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Hillerse** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Edesheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Eitelborn** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Hollenbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Eichenbühl** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Gaiberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Beimerstetten** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Königshain-Wiederau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Straßberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Braunsbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Oberpframmern** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Papendorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Ellerstadt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Golßen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Weitersburg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Friedrichskoog** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Gyhum** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Epfenbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Hergatz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Elmstein** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Ohorn** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Muhr a.See** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Barendorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Borstel-Hohenraden** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Boltenhagen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Weiding** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Seehausen a.Staffelsee** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Bernried am Starnberger See** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Röderaue** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Wees** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Weisenbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Handeloh** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Winningen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Ziesar** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Hürup** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Kummerfeld** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Hochdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Wegeleben** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Aach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Hausen im Wiesental** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Pöhl** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Bockenheim an der Weinstraße** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Wolpertshausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Breklum** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Viöl** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Lobbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Husby** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Wallhausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Mehring** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Neuenkirchen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Köditz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Gartz (Oder)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Nordstrand** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Monsheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Menslage** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Arrach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Lottstetten** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Gelting** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Heidenau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Süderlügum** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Kirchgellersen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Neumagen-Dhron** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Zwiefalten** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Dobel** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Schöpstal** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Egmating** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Taura** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Brieskow-Finkenheerd** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Gutach (Schwarzwaldbahn)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Ronshausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Neckargerach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Rehden** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Remlingen-Semmenstedt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Lindberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Suhlendorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Dogern** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Dollern** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Gruibingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Hohnhorst** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Erfde** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Radbruch** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Mainbernheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Elxleben** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Ahorn** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Chorin** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Ottrau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Iggensbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Dienheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Großenbrode** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Bilshausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Borkheide** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Grosselfingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Kaltenengers** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Ducherow** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Insheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Mespelbrunn** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Wangels** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Delingsdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Garz/Rügen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Rerik** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Reit im Winkl** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Reichartshausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Bärenstein** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Königstein/Sächs.Schw.** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Kröv** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Jatznick** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Cavertitz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Albertshofen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Heimbuchenthal** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Balzheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Breitenfelde** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Colmberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Frittlingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Zeltingen-Rachtig** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Treis-Karden** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Illschwang** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Westerstetten** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Egloffstein** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Egenhausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Merklingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Sipplingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Melsdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Felde** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Steinfeld** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Brücken (Pfalz)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Bernsdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Geiselbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Hüffenhardt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Klostermansfeld** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Jembke** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Kirrweiler (Pfalz)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Eresing** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Meyenburg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Weißbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Zandt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Weilbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Berghülen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Nellingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Neuensalz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Bordelum** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Fleckeby** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Obergriesbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Neuhäusel** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Hagelstadt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Waffenbrunn** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Busdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Rieschweiler-Mühlbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Ortrand** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Masserberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Erkenbrechtsweiler** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Lautenbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Lauterecken** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Rümmingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Krün** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Oderberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Berg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Berg (Pfalz)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Rechtsupweg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Reckendorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Feldberg (Schwarzwald)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Kriebstein** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Röthenbach (Allgäu)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Ottenhofen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Stapel** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Ebergötzen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Neusorg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Wirsberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Schöngeising** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Dormitz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Ehingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Dammbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Todtmoos** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Ottensoos** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Schmalfeld** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Oberwiesenthal** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Immenreuth** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Vrees** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Rullstorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Leutenberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Teupitz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Müglitztal** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Neufra** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Ringelai** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Glaubitz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Meudt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Kirchheim an der Weinstraße** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Tiefenbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Kelberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Rieneck** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Hamberge** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Gebhardshain** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Hofstetten** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Steinfeld** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Ebrach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Rechlin** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Hausen (Wied)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Neukirchen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Eurasburg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Wasbüttel** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Wolfstein** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Sankt Englmar** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Droyßig** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Wörnitz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Brunnen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Arzberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Drakenburg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Bernau im Schwarzwald** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Nortmoor** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Grünendeich** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Fichtelberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Erlenmoos** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Wittighausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Wulften am Harz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Freudenburg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Jünkerath** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Scheden** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Widdern** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Oberottmarshausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Eydelstedt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Borgstedt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Niederalteich** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Nonnenhorn** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Obermeitingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Weibersbrunn** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Röllbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Untersteinach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Harbke** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Jagsthausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Steinkirchen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Beesten** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Kalkhorst** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Grabenstetten** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Walchum** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Wiemersdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Osten** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Thiersheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Wechselburg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Ornbau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Dorfprozelten** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Rhumspringe** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Irrel** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Postau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Starkenberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Ramsau b.Berchtesgaden** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Presseck** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Ranis** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Sankt Martin** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Breitenbach a.Herzberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Langenleuba-Niederhain** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Wain** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Lalling** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Siegelsbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Weidenthal** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Kollmar** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Wallhausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Börgerende-Rethwisch** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Eching am Ammersee** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Höfen an der Enz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Krummesse** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Schondra** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Bayrischzell** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Vierkirchen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Altenahr** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Schornsheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Himmelstadt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Oberhof** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Oberuckersee** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Grünenbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Gommersheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Kaiserpfalz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Rammingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Rasdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Hessen (hessen-latest.osm.pbf)`
- **Crossen an der Elster** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Langballig** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Saal a.d.Saale** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Wallmerod** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Gablenz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Damp** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Stadtkyll** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Etzenricht** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Frauenneuharting** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Grafenwiesen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **List auf Sylt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Schellhorn** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Gundersheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Bornheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Koserow** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Ellerhoop** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Hüttisheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Wulkenzin** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Rosenthal-Bielatal** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Sukow** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Zerf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Heiligenstedten** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Mellingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Flossenbürg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Dierhagen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Oberostendorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Schaufling** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Euerdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Velgast** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Rammelsbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Siehdichum** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Sierksdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Heiligenroth** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Breitbrunn a.Chiemsee** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Staudernheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Schönecken** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Strande** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Kleinsendelbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Büsingen am Hochrhein** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Böttingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Manderscheid** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Suthfeld** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Ziltendorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Oberschwarzach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Beckedorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Winterhausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Wollbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Bad Neualbenreuth** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Jonsdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Bollingstedt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Seebach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Ponitz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Hagnau am Bodensee** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Schwenningen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Etzelwang** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Hornbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Agathenburg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Gillenfeld** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Langenhahn** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Hornstorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Marktschorgast** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Trabitz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Wiltingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Riol** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Dürrholz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Udenheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Sachsenkam** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Mogendorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Biendorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Binau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Rammenau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Göhren** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Balgheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Bartenshagen-Parkentin** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Ebernhahn** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Düngenheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Schöfweg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Mönchhagen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Schafstedt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Oybin** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Bad Bayersoien** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Holtsee** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Waake** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Oldenswort** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Prerow** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Dennheritz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Lembruch** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Longuich** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Rammingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Aufseß** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Stolpe** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Züssow** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Stadelhofen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Sulzfeld a.Main** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Gingst** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Enzklösterle** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Leupoldsgrün** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Müssen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Todendorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Lieser** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Herforst** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Schönwald** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Wiesenau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Raitenbuch** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Essel** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Rieden** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Hauptstuhl** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Freisbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Berlingerode** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Pellworm** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Münchweiler an der Alsenz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Plötzkau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Weißenohe** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Hunding** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Neukirchen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Wust-Fischbeck** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Eppelsheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Seelingstädt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Hemsbünde** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Glan-Münchweiler** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Wustrow** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Prosselsheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Dannewerk** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Herzhorn** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Groß Sarau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Mühl Rosin** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Stechlin** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Garlstorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Longkamp** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Guderhandviertel** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Eisenberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Glött** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Polle** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Nahrendorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Klüsserath** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Groß Nemerow** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Thaining** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Bastorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Prötzel** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Altenkrempe** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Nister** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Reuth b.Erbendorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Lürschau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Trittenheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Mesekenhagen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Mühlhausen im Täle** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Bimöhlen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Unterroth** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Gielow** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Malberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Bettingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Schinkel** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Weinsheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Nordheim v.d.Rhön** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Gutenberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Marienrachdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Hirschfeld** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Bodenrode-Westhausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Frankenheim/Rhön** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Hohenkirchen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Gattendorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Ückeritz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Arenshausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Bad Bertrich** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Bockhorst** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Born a.Darß** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Pösing** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Schönbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Erharting** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Brokdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Emtmannsberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Guckheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Kapellen-Drusweiler** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Martinsheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Glowe** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Ober-Hilbersheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Riethnordhausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Wilgartswiesen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Bayerisch Eisenstein** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Altdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Greimerath** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Wiek** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Harsdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Mauchenheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Müschenbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Baabe** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Neuharlingersiel** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Lohnsfeld** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Hasselberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Großbardorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Pelm** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Gerolfingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Vierhöfen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Tiste** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Fischbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Wahlrod** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Dagebüll** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Nebel** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Spangdahlem** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Tautenhain** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Hörden am Harz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Mühlenfließ** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Zempin** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Waldlaubersheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Rathmannsdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Lichterfeld-Schacksdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Dittweiler** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Eldetal** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Göhren-Lebbin** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Gebenbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Noer** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Abtswind** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Deutschneudorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Winterspelt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Pleisweiler-Oberhofen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Steinberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Konken** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Hörnum (Sylt)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Brinkum** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Lohmen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Rabenstein/Fläming** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Nemsdorf-Göhrendorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen-Anhalt (sachsen-anhalt-latest.osm.pbf)`
- **Wollin** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Stemmen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Loissin** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Neuleiningen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Burrweiler** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Mündersbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Brest** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Kempfeld** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Barum** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Schülldorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Trassenheide** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Gallmersgarten** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Hohenfelde** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Vogelsang** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Wittdün auf Amrum** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Erlenbach bei Kandel** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Hohen-Sülzen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Hohenstadt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Pruchten** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Milda** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Dörrebach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Rüdenau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Königsfeld** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Greimersburg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Dillstädt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Lohheide** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Rehlingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Alken** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Ettal** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Brahlstorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Langenfeld** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Rinnthal** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Haschbach am Remigiusberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Reinsdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Boden** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Damscheid** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Zirkow** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Zettlitz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Stein-Bockenheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Tonndorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Zotzenheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Kargow** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Ziegenrück** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Kanzem** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Ahrenshoop** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Prinzhöfte** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Philippsreut** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Braunichswalde** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Schuld** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Auw bei Prüm** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Kirchgandern** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Niedergebra** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Holzbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Cursdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Matzenbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Siemz-Niendorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Mittelstenahe** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Welgesheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Dätgen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Korswandt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Dornheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Bodelwitz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Glees** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Neunkirchen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Dümpelfeld** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Dörth** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Hainspitz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Kratzeburg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Laasdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Alleshausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Baden-Württemberg (baden-wuerttemberg-latest.osm.pbf)`
- **Bandenitz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Ermershausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Norddorf auf Amrum** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Perasdorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Bayern (bayern-latest.osm.pbf)`
- **Jesendorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Hohen Wangelin** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Schwarzburg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Alt Bukow** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Dobbin-Linstow** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Parsteinsee** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Brandenburg (brandenburg-latest.osm.pbf)`
- **Remmels** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Kampen (Sylt)** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Bärenbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Gondenbrett** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Insul** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Oberweid** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Hüffler** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Einhaus** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Hohenzieritz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Schleifreisen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Kapellendorf** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Dobitschen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Schaprode** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Altwarp** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Osterrade** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Wallenborn** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Hahn am See** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Barweiler** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Härtlingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Blankenberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Kluis** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Hohenfelden** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Vogelsang-Warsin** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Reitzenhain** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Elbingen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Neddemin** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Ettinghausen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Eisenschmitt** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Ockholm** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Stolpe** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Rathen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Sachsen (sachsen-latest.osm.pbf)`
- **Reipoltskirchen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Görkwitz** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Rothemühl** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Hemmelzen** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Udler** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Grinau** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Oldenbüttel** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Kronsgaard** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Winkelbach** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Lietzow** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Grödersby** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
- **Burgsponheim** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Mähren** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Osterheide** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Niedersachsen (niedersachsen-latest.osm.pbf)`
- **Putgarten** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Grammow** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Mecklenburg-Vorpommern (mecklenburg-vorpommern-latest.osm.pbf)`
- **Hohenwarte** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Thüringen (thueringen-latest.osm.pbf)`
- **Sosberg** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Rheinland-Pfalz (rheinland-pfalz-latest.osm.pbf)`
- **Kudensee** (OpenStreetMap (Geofabrik-Auszug)): `Geofabrik, Schleswig-Holstein (schleswig-holstein-latest.osm.pbf)`
