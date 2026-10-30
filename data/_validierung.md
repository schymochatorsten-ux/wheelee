# Validierung der Parkplatzdaten

Stand: 2026-10-29

Erzeugt von `npm run validate`. Das Skript ändert keine Daten – es benennt,
was ein Mensch ansehen sollte. Vorgehen siehe [Datenpflege.md](../Datenpflege.md).

## Überblick

| Kennzahl | Wert |
| --- | --- |
| geprüfte Städte | 1 |
| Standorte | 935 |
| Stellplätze | 1.309 |
| Städte mit Fehlern | 0 |
| Städte mit Verdachtsfällen | 0 |

Bewertung: 🔴 Fehler – muss angesehen werden · 🟡 Verdacht – sollte angesehen werden · ⬜ Hinweis

## Abgleich mit OpenStreetMap

Stand der Datei `data/_bestaetigt.json`: 2026-10-29, Toleranz 30 m.

**Drei Gruppen, und sie bedeuten Verschiedenes:**

- **bestätigt** – beide Quellen kennen den Standort. Die verlässlichste Angabe im Bestand.
- **nur amtlich** – in OpenStreetMap nicht erfasst. Kein Fehler, nur ungeprüft.
- **nur OSM** – fehlt in der amtlichen Liste. **Das ist die interessante Gruppe:** entweder neu hinzugekommen oder dort vergessen. Eine amtliche Liste gilt als vollständig, und genau deshalb sucht niemand in ihr nach Fehlendem.

| Stadt | bestätigt | nur amtlich | nur OSM | OSM gesamt | geprüft am |
| --- | ---: | ---: | ---: | ---: | --- |
| bottrop | 9 | 125 | 28 | 37 | 2026-10-29 |
| bretten | 9 | 7 | 15 | 24 | 2026-10-29 |
| bruchsal | 6 | 30 | 22 | 28 | 2026-10-29 |
| dortmund | 32 | 336 | 164 | 196 | 2026-10-29 |
| dresden | 79 | 398 | 225 | 304 | 2026-10-29 |
| duesseldorf | 16 | 323 | 152 | 168 | 2026-10-29 |
| ettlingen | 6 | 21 | 17 | 23 | 2026-10-29 |
| frankfurt | 36 | 422 | 155 | 191 | 2026-10-29 |
| freiburg | 36 | 289 | 46 | 82 | 2026-10-29 |
| gaggenau | 1 | 4 | 13 | 14 | 2026-10-29 |
| gelsenkirchen | 14 | 205 | 22 | 36 | 2026-10-29 |
| germersheim | 1 | 5 | 11 | 12 | 2026-10-29 |
| hamburg | 0 | 935 | 10 | 10 | 2026-10-29 |
| heidelberg | 30 | 184 | 83 | 113 | 2026-10-29 |
| koeln | 103 | 342 | 752 | 855 | 2026-10-29 |
| landau | 6 | 83 | 14 | 20 | 2026-10-29 |
| neuss | 36 | 2 | 78 | 114 | 2026-10-29 |
| rastatt | 7 | 28 | 12 | 19 | 2026-10-29 |
| rheinstetten | 0 | 17 | 6 | 6 | 2026-10-29 |
| stutensee | 4 | 28 | 9 | 13 | 2026-10-29 |
| ulm | 39 | 9 | 32 | 71 | 2026-10-29 |
| waghaeusel | 3 | 0 | 50 | 53 | 2026-10-29 |

### Nur in OpenStreetMap: 1916 Standorte

Für jeden gilt die Frage: neu entstanden oder in der amtlichen Liste
vergessen? Das unterscheidet nur der Blick vor Ort oder eine Anfrage bei
der Stadt – und beides lohnt sich, weil hier ein Stellplatz steht, den die
App aus der amtlichen Quelle nicht kennt.

| Stadt | Bezeichnung | Lage |
| --- | --- | --- |
| bottrop | Parkhaus Finanzamt/Polizei | 51.52626, 6.93013 |
| bottrop | (ohne Namen in OSM) | 51.60258, 6.92196 |
| bottrop | (ohne Namen in OSM) | 51.53422, 6.98195 |
| bottrop | (ohne Namen in OSM) | 51.60654, 6.92093 |
| bottrop | (ohne Namen in OSM) | 51.60021, 6.92339 |
| bottrop | (ohne Namen in OSM) | 51.60405, 6.92024 |
| bottrop | (ohne Namen in OSM) | 51.53994, 6.88651 |
| bottrop | (ohne Namen in OSM) | 51.53993, 6.88644 |
| bottrop | (ohne Namen in OSM) | 51.53998, 6.88647 |
| bottrop | (ohne Namen in OSM) | 51.60394, 6.92038 |
| bottrop | (ohne Namen in OSM) | 51.60013, 6.92354 |
| bottrop | (ohne Namen in OSM) | 51.60016, 6.92353 |
| bottrop | (ohne Namen in OSM) | 51.53630, 6.93254 |
| bottrop | (ohne Namen in OSM) | 51.53633, 6.93255 |
| bottrop | (ohne Namen in OSM) | 51.53598, 6.93276 |
| bottrop | (ohne Namen in OSM) | 51.53630, 6.93235 |
| bottrop | (ohne Namen in OSM) | 51.60261, 6.92118 |
| bottrop | (ohne Namen in OSM) | 51.60669, 6.92086 |
| bottrop | (ohne Namen in OSM) | 51.60660, 6.92086 |
| bottrop | (ohne Namen in OSM) | 51.60868, 6.93337 |
| bottrop | (ohne Namen in OSM) | 51.60870, 6.93335 |
| bottrop | (ohne Namen in OSM) | 51.60809, 6.93418 |
| bottrop | (ohne Namen in OSM) | 51.60807, 6.93418 |
| bottrop | (ohne Namen in OSM) | 51.60804, 6.93418 |
| bottrop | (ohne Namen in OSM) | 51.60802, 6.93418 |
| bottrop | (ohne Namen in OSM) | 51.60799, 6.93418 |
| bottrop | (ohne Namen in OSM) | 51.60810, 6.93392 |
| bottrop | (ohne Namen in OSM) | 51.60809, 6.93388 |
| bretten | Wanderparkplatz Stadtbahnhaltestelle | 49.01020, 8.72195 |
| bretten | Berufsschulparkplatz | 49.03624, 8.70301 |
| bretten | (ohne Namen in OSM) | 49.03955, 8.70867 |
| bretten | (ohne Namen in OSM) | 49.03058, 8.71804 |
| bretten | (ohne Namen in OSM) | 49.03037, 8.70901 |
| bretten | (ohne Namen in OSM) | 49.03195, 8.71691 |
| bretten | H.-Beuttenmüller-Straße 2 | 49.03433, 8.70172 |
| bretten | (ohne Namen in OSM) | 49.03455, 8.70128 |
| bretten | (ohne Namen in OSM) | 49.03427, 8.70142 |
| bretten | (ohne Namen in OSM) | 49.03413, 8.70149 |
| bretten | (ohne Namen in OSM) | 49.03100, 8.71844 |
| bretten | (ohne Namen in OSM) | 49.03153, 8.71862 |

Weitere 1876 in `data/_bestaetigt.json`.

## Als aufgehoben gemeldet

Geprüft, nichts gefunden: Kein Parkplatz ist von 2 oder mehr Konten als „existiert nicht mehr" gemeldet.

## Alle Städte

| Stadt | Standorte | Stellplätze | je 10.000 Einw. | von OSM bestätigt | Befunde |
| --- | ---: | ---: | ---: | ---: | --- |
| Hamburg | 935 | 1309 | 7.0 | 0 (0 %) | – |
