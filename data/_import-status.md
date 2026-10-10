# Importstand der deutschen Gemeinden

Zuletzt aktualisiert: 2026-10-10T18:24:13.142Z

Diese Datei schreiben die Importskripte selbst nach **jeder einzelnen Stadt**.
Sie ist damit auch nach einem Abbruch mitten im Lauf korrekt.

## Wo weitermachen

Alle Städte abgearbeitet.

```bash
# nichts offen
# oder alle verbleibenden nacheinander:
npm run import:city -- --rest
```

## Überblick

| Kennzahl | Wert |
| --- | --- |
| Gemeinden im Register | 204 |
| geprüft | 204 (100 %) |
| davon mit Treffer | 202 |
| davon geprüft, nichts gefunden | 2 |
| noch nicht geprüft | 0 |
| mit Problem | 0 |
| importierte Standorte | 17998 |
| importierte Stellplätze | 30074 |

„Geprüft, nichts gefunden" ist etwas anderes als „noch nicht geprüft": Dort
lief die Abfrage sauber durch und war leer. Diese Gemeinden werden nicht
erneut abgefragt – bei tausenden Gemeinden wäre das ein Missbrauch von
Overpass. Ein erneuter Versuch geht gezielt über den Namen der Gemeinde.

## Städte in Bearbeitungsreihenfolge

| | Rang | Stadt | Einwohner | Quelle | Standorte | Stellplätze | Stand |
| --- | ---: | --- | ---: | --- | ---: | ---: | --- |
 | ✅ | 1 | Berlin | 3.685.265 | amtlich (WFS) | 923 | 1560 | fertig | 
 | ✅ | 2 | Hamburg | 1.862.565 | amtlich (WFS) | 936 | 1310 | fertig | 
 | ✅ | 3 | München | 1.505.005 | OpenStreetMap | 219 | 629 | fertig | 
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
 | ✅ | 18 | Bielefeld | 331.605 | OpenStreetMap | 125 | 229 | amtliche Quelle nicht nutzbar, OSM verwendet | 
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
 | ⚪ | 56 | Regensburg | 151.389 | OpenStreetMap | 0 | 0 | OSM kennt hier keine Behindertenparkplätze | 
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
 | ⚪ | 172 | Bad Kreuznach | 54.168 | OpenStreetMap | 0 | 0 | geprüft – OSM kennt hier keine Behindertenparkplätze | 
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
 | ✅ | 196 | Landau in der Pfalz | 48.209 | amtlich (regional: trk) | 89 | 143 | fertig | 
 | ✅ | 197 | Bruchsal | 47.784 | amtlich (regional: trk) | 36 | 57 | fertig | 
 | ✅ | 198 | Ettlingen | 38.578 | amtlich (regional: trk) | 27 | 54 | fertig | 
 | ✅ | 199 | Bretten | 30.274 | amtlich (regional: trk) | 16 | 27 | fertig | 
 | ✅ | 200 | Gaggenau | 29.529 | amtlich (regional: trk) | 5 | 8 | fertig | 
 | ✅ | 201 | Stutensee | 25.259 | amtlich (regional: trk) | 32 | 49 | fertig | 
 | ✅ | 202 | Waghäusel | 22.466 | amtlich (regional: trk) | 3 | 6 | fertig | 
 | ✅ | 203 | Germersheim | 21.715 | amtlich (regional: trk) | 6 | 14 | fertig | 
 | ✅ | 204 | Rheinstetten | 21.267 | amtlich (regional: trk) | 17 | 100 | fertig | 

## Genaue Herkunft je Stadt

- **Berlin** (amtlich (WFS)): `https://gdi.berlin.de/services/wfs/behindertenparkplaetze?request=GetFeature&service=WFS&version=2.0.0&typeNames=behindertenparkplaetze%3Abpark&outputFormat=application%2Fjson&srsName=EPSG%3A4326`
- **Hamburg** (amtlich (WFS)): `https://geodienste.hamburg.de/wfs_behindertenstellplaetze?service=WFS&version=2.0.0&request=GetFeature&typeNames=de.hh.up%3Abehindertenstellplaetze`
- **München** (OpenStreetMap): `Overpass, OSM relation/62428 (München, Bayern, Deutschland)`
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
- **Bielefeld** (OpenStreetMap): `Overpass, OSM relation/62646 (Bielefeld, Nordrhein-Westfalen, Deutschland)`
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
- **Regensburg** (OpenStreetMap): `Overpass, OSM relation/62411 (Regensburg, Bayern, Deutschland)`
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
- **Bad Kreuznach** (OpenStreetMap): `Overpass, OSM relation/611092 (Bad Kreuznach, Landkreis Bad Kreuznach, Rheinland-Pfalz, Deutschland)`
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
- **Landau in der Pfalz** (amtlich (regional: trk)): `https://mobil.trk.de/geoserver/TBA/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=TBA%3Abehinderten_parkplaetze&outputFormat=application%2Fjson`
- **Bruchsal** (amtlich (regional: trk)): `https://mobil.trk.de/geoserver/TBA/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=TBA%3Abehinderten_parkplaetze&outputFormat=application%2Fjson`
- **Ettlingen** (amtlich (regional: trk)): `https://mobil.trk.de/geoserver/TBA/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=TBA%3Abehinderten_parkplaetze&outputFormat=application%2Fjson`
- **Bretten** (amtlich (regional: trk)): `https://mobil.trk.de/geoserver/TBA/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=TBA%3Abehinderten_parkplaetze&outputFormat=application%2Fjson`
- **Gaggenau** (amtlich (regional: trk)): `https://mobil.trk.de/geoserver/TBA/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=TBA%3Abehinderten_parkplaetze&outputFormat=application%2Fjson`
- **Stutensee** (amtlich (regional: trk)): `https://mobil.trk.de/geoserver/TBA/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=TBA%3Abehinderten_parkplaetze&outputFormat=application%2Fjson`
- **Waghäusel** (amtlich (regional: trk)): `https://mobil.trk.de/geoserver/TBA/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=TBA%3Abehinderten_parkplaetze&outputFormat=application%2Fjson`
- **Germersheim** (amtlich (regional: trk)): `https://mobil.trk.de/geoserver/TBA/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=TBA%3Abehinderten_parkplaetze&outputFormat=application%2Fjson`
- **Rheinstetten** (amtlich (regional: trk)): `https://mobil.trk.de/geoserver/TBA/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=TBA%3Abehinderten_parkplaetze&outputFormat=application%2Fjson`
