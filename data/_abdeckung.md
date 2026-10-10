# Abdeckung

Stand: 2026-10-10

Erzeugt von `npm run report:abdeckung`. Nicht von Hand bearbeiten.

## Wie weit ist das Endziel

Das Ziel ist jeder öffentliche Behindertenparkplatz in Deutschland, der
sich aus einer öffentlichen Quelle importieren lässt. Gemessen wird
zweifach, weil beide Zahlen Verschiedenes sagen.

| Maß | Erfasst | Insgesamt | Anteil |
| --- | ---: | ---: | ---: |
| Gemeinden | 204 | 10.754 | 1,9 % |
| Einwohner in erfassten Gemeinden | 34.853.068 | 83.577.140 | 41,7 % |

**Die erste Zahl ist die ehrliche Antwort auf „sind wir fertig" – die
zweite auf „wie vielen Menschen nützt es schon".**

## Woraus sich das zusammensetzt

| | Gemeinden |
| --- | ---: |
| geprüft, mit Treffer | 202 |
| geprüft, nichts gefunden | 2 |
| noch nicht geprüft | 10.550 |
| Importversuch fehlgeschlagen | 0 |

Davon aus amtlicher Quelle: **23**, der Rest aus OpenStreetMap.
Erfasst sind **17.998 Standorte** mit **30.074 Stellplätzen**.

## Nach Bundesland

| Land | geprüft | Gemeinden | Anteil | Einwohner erfasst |
| --- | ---: | ---: | ---: | ---: |
| Berlin | 1 | 1 | 100,0 % | 100,0 % |
| Hamburg | 1 | 1 | 100,0 % | 100,0 % |
| Bremen | 2 | 2 | 100,0 % | 100,0 % |
| Nordrhein-Westfalen | 77 | 396 | 19,4 % | 63,7 % |
| Sachsen | 6 | 418 | 1,4 % | 40,3 % |
| Hessen | 12 | 421 | 2,9 % | 32,6 % |
| Baden-Württemberg | 35 | 1.101 | 3,2 % | 32,2 % |
| Mecklenburg-Vorpommern | 5 | 724 | 0,7 % | 30,1 % |
| Niedersachsen | 19 | 941 | 2,0 % | 28,3 % |
| Bayern | 17 | 2.056 | 0,8 % | 27,2 % |
| Schleswig-Holstein | 6 | 1.104 | 0,5 % | 26,4 % |
| Sachsen-Anhalt | 3 | 218 | 1,4 % | 25,6 % |
| Rheinland-Pfalz | 11 | 2.301 | 0,5 % | 25,4 % |
| Thüringen | 4 | 605 | 0,7 % | 23,3 % |
| Saarland | 1 | 52 | 1,9 % | 18,1 % |
| Brandenburg | 4 | 413 | 1,0 % | 16,1 % |

## Was als Nächstes am meisten bringt

Die Stufen beziehen sich auf die Einwohnergrenze in
`scripts/import/german-cities.mts`:

| Grenze | Gemeinden | davon neu | Einwohner gesamt | Anteil |
| ---: | ---: | ---: | ---: | ---: |
| ab 100.000 | 80 | 0 | 26.771.320 | 32,0 % |
| ab 50.000 | 195 | 0 | 34.567.987 | 41,4 % |
| ab 20.000 | 706 | 502 | 50.043.101 | 59,9 % |
| ab 10.000 | 1.598 | 1.394 | 62.517.873 | 74,8 % |
| ab 5.000 | 2.943 | 2.739 | 72.062.426 | 86,2 % |
| ab 0 | 10.754 | 10.550 | 83.577.140 | 100,0 % |

Die letzte Zeile zeigt, warum die Stufen sinnvoll sind: Die ersten
Tausend Gemeinden decken den weitaus größten Teil der Bevölkerung ab,
der lange Rest dagegen viele kleine Orte – in denen die Parkplatzsuche
ohne Karte besonders mühsam ist, weil es dort wenige gibt und niemand
sie auflistet.
