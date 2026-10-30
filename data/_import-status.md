# Importstand der deutschen Gemeinden

Zuletzt aktualisiert: 2026-10-30T08:34:08.844Z

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
| geprüft | 1.488 (14 %) |
| davon mit Treffer | 1.488 |
| davon geprüft, nichts gefunden | 0 |
| noch nicht geprüft | 9.266 |
| mit Problem | 0 |
| importierte Standorte | 32.109 |
| importierte Stellplätze | 53.514 |

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
| ab 5.000 | 0 von 1.345 | 0 % | 0 % |
| unter 5.000 | 0 von 7.811 | 0 % | 0 % |

## Fortschritt nach Bundesland

Die Einheit des landesweiten Abrufs (2e.7) – hier wird sichtbar, wo ein Lauf
etwas gebracht hat und wo nicht.

| Bundesland | geprüft | Gemeinden | Einwohner |
| --- | ---: | ---: | ---: |
| Baden-Württemberg | 250 von 1.101 | 23 % | 69 % |
| Bayern | 214 von 2.056 | 10 % | 55 % |
| Berlin | 1 von 1 | 100 % | 100 % |
| Brandenburg | 68 von 413 | 16 % | 66 % |
| Bremen | 2 von 2 | 100 % | 100 % |
| Hamburg | 1 von 1 | 100 % | 100 % |
| Hessen | 157 von 421 | 37 % | 76 % |
| Mecklenburg-Vorpommern | 19 von 724 | 3 % | 45 % |
| Niedersachsen | 180 von 941 | 19 % | 70 % |
| Nordrhein-Westfalen | 326 von 396 | 82 % | 96 % |
| Rheinland-Pfalz | 45 von 2.301 | 2 % | 41 % |
| Saarland | 31 von 52 | 60 % | 77 % |
| Sachsen | 63 von 418 | 15 % | 67 % |
| Sachsen-Anhalt | 49 von 218 | 22 % | 70 % |
| Schleswig-Holstein | 50 von 1.104 | 5 % | 55 % |
| Thüringen | 32 von 605 | 5 % | 55 % |

## Angesehene Gemeinden

1.488 von 10.754 Gemeinden sind angefasst worden. Nur sie stehen hier einzeln – die übrigen
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
