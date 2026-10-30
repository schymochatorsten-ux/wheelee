# Abdeckung

Stand: 2026-10-30

Erzeugt von `npm run report:abdeckung`. Nicht von Hand bearbeiten.

## Wie weit ist das Endziel

Das Ziel ist jeder öffentliche Behindertenparkplatz in Deutschland, der
sich aus einer öffentlichen Quelle importieren lässt. Gemessen wird
zweifach, weil beide Zahlen Verschiedenes sagen.

| Maß | Erfasst | Insgesamt | Anteil |
| --- | ---: | ---: | ---: |
| Gemeinden | 1.488 | 10.754 | 13,8 % |
| Einwohner in erfassten Gemeinden | 60.812.678 | 83.577.140 | 72,8 % |

**Die erste Zahl ist die ehrliche Antwort auf „sind wir fertig" – die
zweite auf „wie vielen Menschen nützt es schon".**

## Woraus sich das zusammensetzt

| | Gemeinden |
| --- | ---: |
| geprüft, mit Treffer | 1.488 |
| geprüft, nichts gefunden | 0 |
| noch nicht geprüft | 9.266 |
| Importversuch fehlgeschlagen | 0 |

Davon aus amtlicher Quelle: **25**, der Rest aus OpenStreetMap.
Erfasst sind **32.109 Standorte** mit **53.514 Stellplätzen**.

## Nach Bundesland

| Land | geprüft | Gemeinden | Anteil | Einwohner erfasst |
| --- | ---: | ---: | ---: | ---: |
| Berlin | 1 | 1 | 100,0 % | 100,0 % |
| Hamburg | 1 | 1 | 100,0 % | 100,0 % |
| Bremen | 2 | 2 | 100,0 % | 100,0 % |
| Nordrhein-Westfalen | 326 | 396 | 82,3 % | 96,0 % |
| Saarland | 31 | 52 | 59,6 % | 76,8 % |
| Hessen | 157 | 421 | 37,3 % | 76,0 % |
| Niedersachsen | 180 | 941 | 19,1 % | 70,2 % |
| Sachsen-Anhalt | 49 | 218 | 22,5 % | 70,2 % |
| Baden-Württemberg | 250 | 1.101 | 22,7 % | 68,6 % |
| Sachsen | 63 | 418 | 15,1 % | 66,8 % |
| Brandenburg | 68 | 413 | 16,5 % | 66,1 % |
| Schleswig-Holstein | 50 | 1.104 | 4,5 % | 55,5 % |
| Thüringen | 32 | 605 | 5,3 % | 54,9 % |
| Bayern | 214 | 2.056 | 10,4 % | 54,7 % |
| Mecklenburg-Vorpommern | 19 | 724 | 2,6 % | 45,4 % |
| Rheinland-Pfalz | 45 | 2.301 | 2,0 % | 41,5 % |

## Was als Nächstes am meisten bringt

Die Stufen beziehen sich auf die Einwohnergrenze in
`scripts/import/german-cities.mts`:

| Grenze | Gemeinden | davon neu | Einwohner gesamt | Anteil |
| ---: | ---: | ---: | ---: | ---: |
| ab 100.000 | 80 | 0 | 26.771.320 | 32,0 % |
| ab 50.000 | 195 | 0 | 34.567.987 | 41,4 % |
| ab 20.000 | 706 | 0 | 50.043.101 | 59,9 % |
| ab 10.000 | 1.598 | 110 | 62.517.873 | 74,8 % |
| ab 5.000 | 2.943 | 1.455 | 72.062.426 | 86,2 % |
| ab 0 | 10.754 | 9.266 | 83.577.140 | 100,0 % |

Die letzte Zeile zeigt, warum die Stufen sinnvoll sind: Die ersten
Tausend Gemeinden decken den weitaus größten Teil der Bevölkerung ab,
der lange Rest dagegen viele kleine Orte – in denen die Parkplatzsuche
ohne Karte besonders mühsam ist, weil es dort wenige gibt und niemand
sie auflistet.
