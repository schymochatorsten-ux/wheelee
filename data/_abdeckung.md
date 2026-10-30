# Abdeckung

Stand: 2026-10-30

Erzeugt von `npm run report:abdeckung`. Nicht von Hand bearbeiten.

## Wie weit ist das Endziel

Das Ziel ist jeder öffentliche Behindertenparkplatz in Deutschland, der
sich aus einer öffentlichen Quelle importieren lässt. Gemessen wird
zweifach, weil beide Zahlen Verschiedenes sagen.

| Maß | Erfasst | Insgesamt | Anteil |
| --- | ---: | ---: | ---: |
| Gemeinden | 3.758 | 10.754 | 34,9 % |
| Einwohner in erfassten Gemeinden | 71.085.741 | 83.577.140 | 85,1 % |

**Die erste Zahl ist die ehrliche Antwort auf „sind wir fertig" – die
zweite auf „wie vielen Menschen nützt es schon".**

## Woraus sich das zusammensetzt

| | Gemeinden |
| --- | ---: |
| geprüft, mit Treffer | 3.758 |
| geprüft, nichts gefunden | 0 |
| noch nicht geprüft | 6.996 |
| Importversuch fehlgeschlagen | 0 |

Davon aus amtlicher Quelle: **25**, der Rest aus OpenStreetMap.
Erfasst sind **38.414 Standorte** mit **64.341 Stellplätzen**.

## Nach Bundesland

| Land | geprüft | Gemeinden | Anteil | Einwohner erfasst |
| --- | ---: | ---: | ---: | ---: |
| Berlin | 1 | 1 | 100,0 % | 100,0 % |
| Hamburg | 1 | 1 | 100,0 % | 100,0 % |
| Bremen | 2 | 2 | 100,0 % | 100,0 % |
| Nordrhein-Westfalen | 359 | 396 | 90,7 % | 97,5 % |
| Hessen | 302 | 421 | 71,7 % | 90,3 % |
| Baden-Württemberg | 655 | 1.101 | 59,5 % | 86,9 % |
| Sachsen | 215 | 418 | 51,4 % | 84,8 % |
| Sachsen-Anhalt | 94 | 218 | 43,1 % | 83,6 % |
| Niedersachsen | 376 | 941 | 40,0 % | 81,8 % |
| Saarland | 37 | 52 | 71,2 % | 81,8 % |
| Brandenburg | 146 | 413 | 35,4 % | 81,3 % |
| Thüringen | 141 | 605 | 23,3 % | 76,0 % |
| Bayern | 782 | 2.056 | 38,0 % | 74,3 % |
| Schleswig-Holstein | 180 | 1.104 | 16,3 % | 69,6 % |
| Mecklenburg-Vorpommern | 142 | 724 | 19,6 % | 67,2 % |
| Rheinland-Pfalz | 325 | 2.301 | 14,1 % | 62,6 % |

## Was als Nächstes am meisten bringt

Die Stufen beziehen sich auf die Einwohnergrenze in
`scripts/import/german-cities.mts`:

| Grenze | Gemeinden | davon neu | Einwohner gesamt | Anteil |
| ---: | ---: | ---: | ---: | ---: |
| ab 100.000 | 80 | 0 | 26.771.320 | 32,0 % |
| ab 50.000 | 195 | 0 | 34.567.987 | 41,4 % |
| ab 20.000 | 706 | 0 | 50.043.101 | 59,9 % |
| ab 10.000 | 1.598 | 0 | 62.517.873 | 74,8 % |
| ab 5.000 | 2.943 | 0 | 72.062.426 | 86,2 % |
| ab 0 | 10.754 | 6.996 | 83.577.140 | 100,0 % |

Die letzte Zeile zeigt, warum die Stufen sinnvoll sind: Die ersten
Tausend Gemeinden decken den weitaus größten Teil der Bevölkerung ab,
der lange Rest dagegen viele kleine Orte – in denen die Parkplatzsuche
ohne Karte besonders mühsam ist, weil es dort wenige gibt und niemand
sie auflistet.
