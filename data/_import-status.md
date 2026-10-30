# Importstand der deutschen Gemeinden

Zuletzt aktualisiert: 2026-10-30T07:11:30.208Z

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
| geprüft | 693 (6 %) |
| davon mit Treffer | 693 |
| davon geprüft, nichts gefunden | 0 |
| noch nicht geprüft | 10.061 |
| mit Problem | 0 |
| importierte Standorte | 26.159 |
| importierte Stellplätze | 43.366 |

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
| ab 10.000 | 0 von 892 | 0 % | 0 % |
| ab 5.000 | 0 von 1.345 | 0 % | 0 % |
| unter 5.000 | 0 von 7.811 | 0 % | 0 % |

## Fortschritt nach Bundesland

Die Einheit des landesweiten Abrufs (2e.7) – hier wird sichtbar, wo ein Lauf
etwas gebracht hat und wo nicht.

| Bundesland | geprüft | Gemeinden | Einwohner |
| --- | ---: | ---: | ---: |
| Baden-Württemberg | 105 von 1.101 | 10 % | 51 % |
| Bayern | 75 von 2.056 | 4 % | 40 % |
| Berlin | 1 von 1 | 100 % | 100 % |
| Brandenburg | 27 von 413 | 7 % | 43 % |
| Bremen | 2 von 2 | 100 % | 100 % |
| Hamburg | 1 von 1 | 100 % | 100 % |
| Hessen | 58 von 421 | 14 % | 54 % |
| Mecklenburg-Vorpommern | 9 von 724 | 1 % | 37 % |
| Niedersachsen | 86 von 941 | 9 % | 54 % |
| Nordrhein-Westfalen | 211 von 396 | 53 % | 87 % |
| Rheinland-Pfalz | 21 von 2.301 | 1 % | 33 % |
| Saarland | 9 von 52 | 17 % | 44 % |
| Sachsen | 24 von 418 | 6 % | 53 % |
| Sachsen-Anhalt | 24 von 218 | 11 % | 54 % |
| Schleswig-Holstein | 21 von 1.104 | 2 % | 41 % |
| Thüringen | 19 von 605 | 3 % | 45 % |

## Angesehene Gemeinden

693 von 10.754 Gemeinden sind angefasst worden. Nur sie stehen hier einzeln – die übrigen
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
