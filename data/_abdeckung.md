# Abdeckung

Stand: 2026-10-29

Erzeugt von `npm run report:abdeckung`. Nicht von Hand bearbeiten.

## Wie weit ist das Endziel

Das Ziel ist jeder öffentliche Behindertenparkplatz in Deutschland, der
sich aus einer öffentlichen Quelle importieren lässt. Gemessen wird
zweifach, weil beide Zahlen Verschiedenes sagen.

| Maß | Erfasst | Insgesamt | Anteil |
| --- | ---: | ---: | ---: |
| Gemeinden | 641 | 10.754 | 6,0 % |
| Einwohner in erfassten Gemeinden | 48.015.617 | 83.577.140 | 57,5 % |

**Die erste Zahl ist die ehrliche Antwort auf „sind wir fertig" – die
zweite auf „wie vielen Menschen nützt es schon".**

## Woraus sich das zusammensetzt

| | Gemeinden |
| --- | ---: |
| geprüft, mit Treffer | 641 |
| geprüft, nichts gefunden | 0 |
| noch nicht geprüft | 10.113 |
| Importversuch fehlgeschlagen | 0 |

Davon aus amtlicher Quelle: **24**, der Rest aus OpenStreetMap.
Erfasst sind **24.061 Standorte** mit **39.773 Stellplätzen**.

## Nach Bundesland

| Land | geprüft | Gemeinden | Anteil | Einwohner erfasst |
| --- | ---: | ---: | ---: | ---: |
| Berlin | 1 | 1 | 100,0 % | 100,0 % |
| Hamburg | 1 | 1 | 100,0 % | 100,0 % |
| Bremen | 2 | 2 | 100,0 % | 100,0 % |
| Nordrhein-Westfalen | 201 | 396 | 50,8 % | 85,1 % |
| Sachsen | 24 | 418 | 5,7 % | 53,1 % |
| Hessen | 53 | 421 | 12,6 % | 52,0 % |
| Niedersachsen | 79 | 941 | 8,4 % | 50,7 % |
| Sachsen-Anhalt | 21 | 218 | 9,6 % | 50,5 % |
| Baden-Württemberg | 99 | 1.101 | 9,0 % | 49,6 % |
| Thüringen | 17 | 605 | 2,8 % | 42,6 % |
| Schleswig-Holstein | 20 | 1.104 | 1,8 % | 40,1 % |
| Brandenburg | 24 | 413 | 5,8 % | 39,3 % |
| Bayern | 68 | 2.056 | 3,3 % | 38,3 % |
| Mecklenburg-Vorpommern | 9 | 724 | 1,2 % | 37,3 % |
| Rheinland-Pfalz | 21 | 2.301 | 0,9 % | 33,0 % |
| Saarland | 1 | 52 | 1,9 % | 18,1 % |

## Was als Nächstes am meisten bringt

Die Stufen beziehen sich auf die Einwohnergrenze in
`scripts/import/german-cities.mts`:

| Grenze | Gemeinden | davon neu | Einwohner gesamt | Anteil |
| ---: | ---: | ---: | ---: | ---: |
| ab 100.000 | 80 | 0 | 26.771.320 | 32,0 % |
| ab 50.000 | 195 | 0 | 34.567.987 | 41,4 % |
| ab 20.000 | 706 | 65 | 50.043.101 | 59,9 % |
| ab 10.000 | 1.598 | 957 | 62.517.873 | 74,8 % |
| ab 5.000 | 2.943 | 2.302 | 72.062.426 | 86,2 % |
| ab 0 | 10.754 | 10.113 | 83.577.140 | 100,0 % |

Die letzte Zeile zeigt, warum die Stufen sinnvoll sind: Die ersten
Tausend Gemeinden decken den weitaus größten Teil der Bevölkerung ab,
der lange Rest dagegen viele kleine Orte – in denen die Parkplatzsuche
ohne Karte besonders mühsam ist, weil es dort wenige gibt und niemand
sie auflistet.
