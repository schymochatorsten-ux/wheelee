# Importstand der deutschen Großstädte

Zuletzt aktualisiert: 2026-10-09T06:37:22.577Z

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

| Kennzahl                | Wert  |
| ----------------------- | ----- |
| Städte gesamt           | 83    |
| fertig                  | 83    |
| offen                   | 0     |
| mit Problem             | 0     |
| importierte Standorte   | 13453 |
| importierte Stellplätze | 22221 |

## Städte in Bearbeitungsreihenfolge

|     | Rang | Stadt                 | Einwohner | Quelle            | Standorte | Stellplätze | Stand                                        |
| --- | ---: | --------------------- | --------: | ----------------- | --------: | ----------: | -------------------------------------------- |
| ✅  |    1 | Berlin                | 3.782.202 | amtlich (WFS)     |       923 |        1560 | fertig                                       |
| ✅  |    2 | Hamburg               | 1.910.160 | amtlich (WFS)     |       936 |        1310 | fertig                                       |
| ✅  |    3 | München               | 1.510.378 | OpenStreetMap     |       219 |         629 | fertig                                       |
| ✅  |    4 | Köln                  | 1.087.353 | amtlich (WFS)     |       445 |         605 | fertig                                       |
| ✅  |    5 | Frankfurt am Main     |   775.790 | amtlich (WFS)     |       458 |         615 | fertig                                       |
| ✅  |    6 | Stuttgart             |   633.484 | OpenStreetMap     |       266 |         646 | fertig                                       |
| ✅  |    7 | Düsseldorf            |   631.217 | amtlich (JSON)    |       340 |         523 | fertig                                       |
| ✅  |    8 | Leipzig               |   619.879 | OpenStreetMap     |       237 |         358 | fertig                                       |
| ✅  |    9 | Dortmund              |   595.471 | amtlich (GEOJSON) |       368 |         368 | fertig                                       |
| ✅  |   10 | Essen                 |   586.608 | OpenStreetMap     |       244 |         549 | fertig                                       |
| ✅  |   11 | Bremen                |   577.026 | OpenStreetMap     |       112 |         187 | fertig                                       |
| ✅  |   12 | Dresden               |   566.222 | amtlich (WFS)     |       481 |         680 | fertig                                       |
| ✅  |   13 | Hannover              |   548.186 | OpenStreetMap     |       173 |         335 | fertig                                       |
| ✅  |   14 | Nürnberg              |   523.026 | OpenStreetMap     |       487 |         640 | fertig                                       |
| ✅  |   15 | Duisburg              |   500.319 | OpenStreetMap     |       116 |         213 | fertig                                       |
| ✅  |   16 | Bochum                |   365.587 | OpenStreetMap     |       165 |         411 | amtliche Quelle nicht nutzbar, OSM verwendet |
| ✅  |   17 | Wuppertal             |   358.876 | OpenStreetMap     |        66 |         136 | fertig                                       |
| ✅  |   18 | Bielefeld             |   341.755 | OpenStreetMap     |       125 |         229 | amtliche Quelle nicht nutzbar, OSM verwendet |
| ✅  |   19 | Bonn                  |   336.465 | OpenStreetMap     |       406 |         608 | fertig                                       |
| ✅  |   20 | Münster               |   320.979 | OpenStreetMap     |       165 |         324 | fertig                                       |
| ✅  |   21 | Mannheim              |   319.953 | OpenStreetMap     |        86 |         139 | fertig                                       |
| ✅  |   22 | Karlsruhe             |   309.999 | OpenStreetMap     |       330 |         532 | amtliche Quelle nicht nutzbar, OSM verwendet |
| ✅  |   23 | Augsburg              |   302.103 | OpenStreetMap     |       400 |         639 | fertig                                       |
| ✅  |   24 | Wiesbaden             |   283.083 | OpenStreetMap     |        51 |         181 | fertig                                       |
| ✅  |   25 | Mönchengladbach       |   262.374 | OpenStreetMap     |        93 |         213 | fertig                                       |
| ✅  |   26 | Gelsenkirchen         |   259.105 | amtlich (JSON)    |       219 |         219 | fertig                                       |
| ✅  |   27 | Braunschweig          |   252.811 | OpenStreetMap     |        85 |         226 | fertig                                       |
| ✅  |   28 | Kiel                  |   250.917 | OpenStreetMap     |        85 |         241 | amtliche Quelle nicht nutzbar, OSM verwendet |
| ✅  |   29 | Chemnitz              |   249.237 | amtlich (ARCGIS)  |        13 |          56 | fertig                                       |
| ✅  |   30 | Aachen                |   249.070 | OpenStreetMap     |       111 |         191 | amtliche Quelle nicht nutzbar, OSM verwendet |
| ✅  |   31 | Halle (Saale)         |   242.083 | OpenStreetMap     |        62 |         178 | fertig                                       |
| ✅  |   32 | Magdeburg             |   239.364 | OpenStreetMap     |       208 |         345 | fertig                                       |
| ✅  |   33 | Freiburg im Breisgau  |   236.140 | amtlich (WFS)     |       330 |         334 | fertig                                       |
| ✅  |   34 | Krefeld               |   230.103 | OpenStreetMap     |        40 |          71 | amtliche Quelle nicht nutzbar, OSM verwendet |
| ✅  |   35 | Mainz                 |   220.085 | OpenStreetMap     |       171 |         295 | fertig                                       |
| ✅  |   36 | Lübeck                |   218.095 | OpenStreetMap     |       281 |         357 | fertig                                       |
| ✅  |   37 | Erfurt                |   214.969 | OpenStreetMap     |        88 |         127 | fertig                                       |
| ✅  |   38 | Oberhausen            |   210.829 | OpenStreetMap     |        78 |         141 | fertig                                       |
| ✅  |   39 | Rostock               |   209.920 | amtlich (GEOJSON) |         5 |           5 | fertig                                       |
| ✅  |   40 | Kassel                |   204.202 | OpenStreetMap     |        93 |         123 | fertig                                       |
| ✅  |   41 | Hagen                 |   188.814 | OpenStreetMap     |        64 |         140 | fertig                                       |
| ✅  |   42 | Potsdam               |   187.119 | OpenStreetMap     |       202 |         399 | fertig                                       |
| ✅  |   43 | Saarbrücken           |   181.959 | OpenStreetMap     |       157 |         346 | fertig                                       |
| ✅  |   44 | Hamm                  |   179.916 | OpenStreetMap     |       198 |         300 | fertig                                       |
| ✅  |   45 | Oldenburg             |   177.055 | OpenStreetMap     |        92 |         230 | fertig                                       |
| ✅  |   46 | Ludwigshafen am Rhein |   173.353 | OpenStreetMap     |        36 |          60 | fertig                                       |
| ✅  |   47 | Mülheim an der Ruhr   |   172.124 | OpenStreetMap     |        56 |         121 | fertig                                       |
| ✅  |   48 | Osnabrück             |   168.145 | OpenStreetMap     |        13 |          29 | fertig                                       |
| ✅  |   49 | Leverkusen            |   167.256 | OpenStreetMap     |       122 |         144 | fertig                                       |
| ✅  |   50 | Heidelberg            |   162.273 | amtlich (GEOJSON) |       214 |         214 | fertig                                       |
| ✅  |   51 | Darmstadt             |   162.243 | OpenStreetMap     |        90 |         165 | fertig                                       |
| ✅  |   52 | Solingen              |   160.824 | OpenStreetMap     |       196 |         233 | fertig                                       |
| ✅  |   53 | Herne                 |   156.449 | OpenStreetMap     |        35 |          64 | fertig                                       |
| ✅  |   54 | Regensburg            |   156.200 | OpenStreetMap     |         0 |           0 | OSM kennt hier keine Behindertenparkplätze   |
| ✅  |   55 | Paderborn             |   155.300 | OpenStreetMap     |       107 |         185 | fertig                                       |
| ✅  |   56 | Neuss                 |   154.955 | amtlich (GEOJSON) |        38 |          57 | fertig                                       |
| ✅  |   57 | Ingolstadt            |   143.100 | OpenStreetMap     |        31 |          54 | fertig                                       |
| ✅  |   58 | Offenbach am Main     |   142.000 | OpenStreetMap     |        23 |          38 | fertig                                       |
| ✅  |   59 | Fürth                 |   131.000 | OpenStreetMap     |        42 |          84 | fertig                                       |
| ✅  |   60 | Ulm                   |   129.000 | amtlich (GEOJSON) |        48 |         107 | fertig                                       |
| ✅  |   61 | Heilbronn             |   128.600 | OpenStreetMap     |        26 |          49 | fertig                                       |
| ✅  |   62 | Pforzheim             |   128.200 | OpenStreetMap     |        51 |         116 | fertig                                       |
| ✅  |   63 | Wolfsburg             |   128.000 | OpenStreetMap     |        82 |         141 | fertig                                       |
| ✅  |   64 | Würzburg              |   127.900 | OpenStreetMap     |       127 |         196 | fertig                                       |
| ✅  |   65 | Göttingen             |   121.000 | OpenStreetMap     |       424 |         709 | fertig                                       |
| ✅  |   66 | Reutlingen            |   118.000 | OpenStreetMap     |        47 |          61 | fertig                                       |
| ✅  |   67 | Bottrop               |   117.400 | amtlich (WFS)     |       134 |         134 | fertig                                       |
| ✅  |   68 | Erlangen              |   116.300 | OpenStreetMap     |       108 |         230 | fertig                                       |
| ✅  |   69 | Remscheid             |   116.000 | OpenStreetMap     |        24 |          94 | fertig                                       |
| ✅  |   70 | Koblenz               |   115.000 | OpenStreetMap     |        96 |         203 | fertig                                       |
| ✅  |   71 | Bremerhaven           |   113.600 | OpenStreetMap     |        25 |          47 | fertig                                       |
| ✅  |   72 | Recklinghausen        |   112.600 | OpenStreetMap     |        57 |         111 | fertig                                       |
| ✅  |   73 | Bergisch Gladbach     |   112.000 | OpenStreetMap     |       189 |         309 | fertig                                       |
| ✅  |   74 | Trier                 |   111.500 | OpenStreetMap     |        79 |         109 | fertig                                       |
| ✅  |   75 | Jena                  |   111.300 | OpenStreetMap     |        84 |         119 | fertig                                       |
| ✅  |   76 | Salzgitter            |   105.500 | OpenStreetMap     |        10 |          19 | fertig                                       |
| ✅  |   77 | Moers                 |   104.500 | OpenStreetMap     |        66 |         134 | fertig                                       |
| ✅  |   78 | Siegen                |   103.000 | OpenStreetMap     |        42 |          84 | fertig                                       |
| ✅  |   79 | Gütersloh             |   102.000 | OpenStreetMap     |        33 |          70 | fertig                                       |
| ✅  |   80 | Hildesheim            |   101.000 | OpenStreetMap     |        37 |          97 | fertig                                       |
| ✅  |   81 | Kaiserslautern        |   100.600 | OpenStreetMap     |        58 |         137 | fertig                                       |
| ✅  |   82 | Cottbus               |    98.000 | OpenStreetMap     |        95 |         190 | fertig                                       |
| ✅  |   83 | Witten                |    96.000 | OpenStreetMap     |       234 |         353 | fertig                                       |

## Genaue Herkunft je Stadt

- **Berlin** (amtlich (WFS)): `https://gdi.berlin.de/services/wfs/behindertenparkplaetze?request=GetFeature&service=WFS&version=2.0.0&typeNames=behindertenparkplaetze%3Abpark&outputFormat=application%2Fjson&srsName=EPSG%3A4326`
- **Hamburg** (amtlich (WFS)): `https://geodienste.hamburg.de/wfs_behindertenstellplaetze?service=WFS&version=2.0.0&request=GetFeature&typeNames=de.hh.up%3Abehindertenstellplaetze`
- **München** (OpenStreetMap): `Overpass, OSM relation/62428 (München, Bayern, Deutschland)`
- **Köln** (amtlich (WFS)): `https://geoportal.stadt-koeln.de/arcgis/services/verkehr/behindertenparkplaetze/MapServer/WFSServer?service=WFS&version=2.0.0&request=GetFeature&typeNames=behindertenparkplaetze%3ABehindertenparkplatz`
- **Frankfurt am Main** (amtlich (WFS)): `https://geowebdienste.frankfurt.de/Parken?service=WFS&version=2.0.0&request=GetFeature&typeNames=opendata%3ABehindertenparkplaetze&outputFormat=application%2Fjson&srsName=EPSG%3A4326`
- **Stuttgart** (OpenStreetMap): `Overpass, OSM relation/62375 (Stuttgart, Baden-Württemberg, Deutschland)`
- **Düsseldorf** (amtlich (JSON)): `https://maps.duesseldorf.de/services/verkehr/wfs?service=WFS&amp;version=2.0.0&amp;request=GetFeature&amp;typeName=verkehr:behindertenparkplatz&amp;outputFormat=application/json&amp;srsName=epsg:25832&amp;limit=1000`
- **Leipzig** (OpenStreetMap): `Overpass, OSM relation/62649 (Leipzig, Sachsen, Deutschland)`
- **Dortmund** (amtlich (GEOJSON)): `https://open-data.dortmund.de/api/v2/catalog/datasets/fb66-behindertenstellplaetze/exports/geojson`
- **Essen** (OpenStreetMap): `Overpass, OSM relation/62713 (Essen, Nordrhein-Westfalen, Deutschland)`
- **Bremen** (OpenStreetMap): `Overpass, OSM relation/62559 (Bremen, Deutschland)`
- **Dresden** (amtlich (WFS)): `https://kommisdd.dresden.de/net3/public/ogc.ashx?NodeId=1462&service=WFS&version=2.0.0&request=GetFeature&typeNames=cls%3AL1113`
- **Hannover** (OpenStreetMap): `Overpass, OSM relation/59418 (Hannover, Region Hannover, Niedersachsen, Deutschland)`
- **Nürnberg** (OpenStreetMap): `Overpass, OSM relation/62780 (Nürnberg, Bayern, Deutschland)`
- **Duisburg** (OpenStreetMap): `Overpass, OSM relation/62456 (Duisburg, Nordrhein-Westfalen, Deutschland)`
- **Bochum** (OpenStreetMap): `Overpass, OSM relation/62644 (Bochum, Nordrhein-Westfalen, Deutschland)`
- **Wuppertal** (OpenStreetMap): `Overpass, OSM relation/62478 (Wuppertal, Nordrhein-Westfalen, Deutschland)`
- **Bielefeld** (OpenStreetMap): `Overpass, OSM relation/62646 (Bielefeld, Nordrhein-Westfalen, Deutschland)`
- **Bonn** (OpenStreetMap): `Overpass, OSM relation/62508 (Bonn, Nordrhein-Westfalen, Deutschland)`
- **Münster** (OpenStreetMap): `Overpass, OSM relation/62591 (Münster, Nordrhein-Westfalen, Deutschland)`
- **Mannheim** (OpenStreetMap): `Overpass, OSM relation/62691 (Mannheim, Baden-Württemberg, Deutschland)`
- **Karlsruhe** (OpenStreetMap): `Overpass, OSM relation/62518 (Karlsruhe, Baden-Württemberg, Deutschland)`
- **Augsburg** (OpenStreetMap): `Overpass, OSM relation/62407 (Augsburg, Bayern, Deutschland)`
- **Wiesbaden** (OpenStreetMap): `Overpass, OSM relation/62496 (Wiesbaden, Hessen, Deutschland)`
- **Mönchengladbach** (OpenStreetMap): `Overpass, OSM relation/62410 (Mönchengladbach, Nordrhein-Westfalen, Deutschland)`
- **Gelsenkirchen** (amtlich (JSON)): `https://maps.gelsenkirchen.de/geoserver/infrastrukturdatenbank/ogc/features/v1/collections/behindertenparkplatz/items?f=json`
- **Braunschweig** (OpenStreetMap): `Overpass, OSM relation/62531 (Braunschweig, Niedersachsen, Deutschland)`
- **Kiel** (OpenStreetMap): `Overpass, OSM relation/27021 (Kiel, Altenholz, Schleswig-Holstein, Deutschland)`
- **Chemnitz** (amtlich (ARCGIS)): `https://services6.arcgis.com/jiszdsDupTUO3fSM/arcgis/rest/services/Parkpl%C3%A4tze_Wohnmobil/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=geojson&returnGeometry=true`
- **Aachen** (OpenStreetMap): `Overpass, OSM relation/62564 (Aachen, Städteregion Aachen, Nordrhein-Westfalen, Deutschland)`
- **Halle (Saale)** (OpenStreetMap): `Overpass, OSM relation/62638 (Halle (Saale), Sachsen-Anhalt, Deutschland)`
- **Magdeburg** (OpenStreetMap): `Overpass, OSM relation/62481 (Magdeburg, Sachsen-Anhalt, Deutschland)`
- **Freiburg im Breisgau** (amtlich (WFS)): `https://geoportal.freiburg.de/wfs/gut_parken/gut_parken?service=WFS&version=2.0.0&request=GetFeature&typeNames=ms%3Abehindertenparkplatz_detail`
- **Krefeld** (OpenStreetMap): `Overpass, OSM relation/62748 (Krefeld, Nordrhein-Westfalen, Deutschland)`
- **Mainz** (OpenStreetMap): `Overpass, OSM relation/62630 (Mainz, Rheinland-Pfalz, Deutschland)`
- **Lübeck** (OpenStreetMap): `Overpass, OSM relation/27027 (Lübeck, Schleswig-Holstein, Deutschland)`
- **Erfurt** (OpenStreetMap): `Overpass, OSM relation/62745 (Erfurt, Thüringen, Deutschland)`
- **Oberhausen** (OpenStreetMap): `Overpass, OSM relation/62734 (Oberhausen, Nordrhein-Westfalen, Deutschland)`
- **Rostock** (amtlich (GEOJSON)): `https://geo.sv.rostock.de/download/opendata/rostocker_heide/rostocker_heide_aussichtspunkte.json`
- **Kassel** (OpenStreetMap): `Overpass, OSM relation/62598 (Kassel, Hessen, Deutschland)`
- **Hagen** (OpenStreetMap): `Overpass, OSM relation/1800297 (Hagen, Nordrhein-Westfalen, Deutschland)`
- **Potsdam** (OpenStreetMap): `Overpass, OSM relation/62369 (Potsdam, Brandenburg, Deutschland)`
- **Saarbrücken** (OpenStreetMap): `Overpass, OSM relation/1187159 (Saarbrücken, Regionalverband Saarbrücken, Saarland, Deutschland)`
- **Hamm** (OpenStreetMap): `Overpass, OSM relation/62499 (Hamm, Nordrhein-Westfalen, Deutschland)`
- **Oldenburg** (OpenStreetMap): `Overpass, OSM relation/62409 (Oldenburg, Niedersachsen, Deutschland)`
- **Ludwigshafen am Rhein** (OpenStreetMap): `Overpass, OSM relation/62347 (Ludwigshafen am Rhein, Rheinland-Pfalz, Deutschland)`
- **Mülheim an der Ruhr** (OpenStreetMap): `Overpass, OSM relation/62385 (Mülheim an der Ruhr, Nordrhein-Westfalen, Deutschland)`
- **Osnabrück** (OpenStreetMap): `Overpass, OSM relation/62631 (Osnabrück, Niedersachsen, Deutschland)`
- **Leverkusen** (OpenStreetMap): `Overpass, OSM relation/62449 (Leverkusen, Nordrhein-Westfalen, Deutschland)`
- **Heidelberg** (amtlich (GEOJSON)): `https://ckan.datenplattform.heidelberg.de/dataset/708df8e2-d452-483e-9e57-f04027d52a17/resource/6dc64728-65ba-47ed-bbe2-9e59b5dbaa0c/download/features_new.geojson`
- **Darmstadt** (OpenStreetMap): `Overpass, OSM relation/62581 (Darmstadt, Hessen, Deutschland)`
- **Solingen** (OpenStreetMap): `Overpass, OSM relation/62699 (Solingen, Nordrhein-Westfalen, Deutschland)`
- **Herne** (OpenStreetMap): `Overpass, OSM relation/62396 (Herne, Nordrhein-Westfalen, Deutschland)`
- **Regensburg** (OpenStreetMap): `Overpass, OSM relation/62411 (Regensburg, Bayern, Deutschland)`
- **Paderborn** (OpenStreetMap): `Overpass, OSM relation/148074 (Paderborn, Kreis Paderborn, Nordrhein-Westfalen, Deutschland)`
- **Neuss** (amtlich (GEOJSON)): `https://opendata.rhein-kreis-neuss.de/api/v2/catalog/datasets/stadt-neuss-behindertenparkplaetze/exports/geojson`
- **Ingolstadt** (OpenStreetMap): `Overpass, OSM relation/62381 (Ingolstadt, Bayern, Deutschland)`
- **Offenbach am Main** (OpenStreetMap): `Overpass, OSM relation/62695 (Offenbach am Main, Hessen, Deutschland)`
- **Fürth** (OpenStreetMap): `Overpass, OSM relation/62374 (Fürth, Bayern, Deutschland)`
- **Ulm** (amtlich (GEOJSON)): `https://datenhub.ulm.de/ckan/dataset/694e940c-6255-472a-865b-2f36c726f13e/resource/546b9525-236a-4be8-8bca-74618a0e7118/download/blaue_parkplatze_web.geojson`
- **Heilbronn** (OpenStreetMap): `Overpass, OSM relation/62751 (Heilbronn, Baden-Württemberg, Deutschland)`
- **Pforzheim** (OpenStreetMap): `Overpass, OSM relation/62471 (Pforzheim, Baden-Württemberg, Deutschland)`
- **Wolfsburg** (OpenStreetMap): `Overpass, OSM relation/62418 (Wolfsburg, Niedersachsen, Deutschland)`
- **Würzburg** (OpenStreetMap): `Overpass, OSM relation/62464 (Würzburg, Bayern, Deutschland)`
- **Göttingen** (OpenStreetMap): `Overpass, OSM relation/191361 (Göttingen, Radolfshausen, Landkreis Göttingen, Niedersachsen, Deutschland)`
- **Reutlingen** (OpenStreetMap): `Overpass, OSM relation/2772661 (Reutlingen, Landkreis Reutlingen, Baden-Württemberg, Deutschland)`
- **Bottrop** (amtlich (WFS)): `https://gis.bottrop.de/arcgis/services/Themenkarten/Parkplaetze/MapServer/WFSServer?service=WFS&version=2.0.0&request=GetFeature&typeNames=Parkplaetze%3ABehinderten_Parkplaetze__Punkte_`
- **Erlangen** (OpenStreetMap): `Overpass, OSM relation/62403 (Erlangen, Bayern, Deutschland)`
- **Remscheid** (OpenStreetMap): `Overpass, OSM relation/62455 (Remscheid, Nordrhein-Westfalen, Deutschland)`
- **Koblenz** (OpenStreetMap): `Overpass, OSM relation/62512 (Koblenz, Rheinland-Pfalz, Deutschland)`
- **Bremerhaven** (OpenStreetMap): `Overpass, OSM relation/62658 (Bremerhaven, Bremen, Deutschland)`
- **Recklinghausen** (OpenStreetMap): `Overpass, OSM relation/56665 (Recklinghausen, Kreis Recklinghausen, Nordrhein-Westfalen, Deutschland)`
- **Bergisch Gladbach** (OpenStreetMap): `Overpass, OSM relation/173103 (Bergisch Gladbach, Rheinisch-Bergischer Kreis, Nordrhein-Westfalen, Deutschland)`
- **Trier** (OpenStreetMap): `Overpass, OSM relation/172679 (Trier, Trierweiler, Rheinland-Pfalz, Deutschland)`
- **Jena** (OpenStreetMap): `Overpass, OSM relation/62693 (Jena, Thüringen, Deutschland)`
- **Salzgitter** (OpenStreetMap): `Overpass, OSM relation/62659 (Salzgitter, Niedersachsen, Deutschland)`
- **Moers** (OpenStreetMap): `Overpass, OSM relation/58623 (Moers, Kreis Wesel, Nordrhein-Westfalen, Deutschland)`
- **Siegen** (OpenStreetMap): `Overpass, OSM relation/163256 (Siegen, Kreis Siegen-Wittgenstein, Nordrhein-Westfalen, Deutschland)`
- **Gütersloh** (OpenStreetMap): `Overpass, OSM relation/138119 (Gütersloh, Kreis Gütersloh, Nordrhein-Westfalen, Deutschland)`
- **Hildesheim** (OpenStreetMap): `Overpass, OSM relation/1176503 (Hildesheim, Landkreis Hildesheim, Niedersachsen, Deutschland)`
- **Kaiserslautern** (OpenStreetMap): `Overpass, OSM relation/62652 (Kaiserslautern, Rheinland-Pfalz, Deutschland)`
- **Cottbus** (OpenStreetMap): `Overpass, OSM relation/62430 (Cottbus, Brandenburg, Deutschland)`
- **Witten** (OpenStreetMap): `Overpass, OSM relation/162826 (Witten, Ennepe-Ruhr-Kreis, Nordrhein-Westfalen, Deutschland)`
