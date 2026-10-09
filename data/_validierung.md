# Validierung der Parkplatzdaten

Stand: 2026-10-09

Erzeugt von `npm run validate`. Das Skript ändert keine Daten – es benennt,
was ein Mensch ansehen sollte. Vorgehen siehe [Datenpflege.md](../Datenpflege.md).

## Überblick

| Kennzahl                   | Wert   |
| -------------------------- | ------ |
| geprüfte Städte            | 84     |
| Standorte                  | 13.463 |
| Stellplätze                | 22.237 |
| Städte mit Fehlern         | 9      |
| Städte mit Verdachtsfällen | 40     |

Bewertung: 🔴 Fehler – muss angesehen werden · 🟡 Verdacht – sollte angesehen werden · ⬜ Hinweis

## Städte mit Befund

### Nürnberg

487 Standorte, 640 Stellplätze · Quelle: OpenStreetMap-Mitwirkende (ODbL)

- 🟡 **Mögliche Dubletten:** 409 Paare liegen unter 10 m auseinander.
  - Weltenburger Straße ↔ Weltenburger Straße (3 m)
  - Glogauer Straße ↔ Glogauer Straße (4 m)
  - Glogauer Straße 15 ↔ Glogauer Straße 15 (6 m)
  - Glogauer Straße 30-38 ↔ Glogauer Straße 30-38 (6 m)
  - Glogauer Straße 30-38 ↔ Glogauer Straße 30-38 (6 m)
- ⬜ **Kein Stadtteil:** Bei allen Standorten steht der Stadtname als Stadtteil – die Quelle nennt keinen.

### Göttingen

424 Standorte, 709 Stellplätze · Quelle: OpenStreetMap-Mitwirkende (ODbL)

- 🟡 **Mögliche Dubletten:** 317 Paare liegen unter 10 m auseinander.
  - Benzstraße ↔ Benzstraße (4 m)
  - Reinhäuser Landstraße 177 ↔ Reinhäuser Landstraße 177 (6 m)
  - Groner Siekanger ↔ Groner Siekanger (7 m)
  - Groner Siekanger ↔ Groner Siekanger (9 m)
  - Groner Siekanger ↔ Groner Siekanger (6 m)
- 🔴 **Namen nicht unterscheidbar:** Nur 146 verschiedene Bezeichnungen bei 424 Standorten – das Adressfeld der Quelle wurde vermutlich nicht erkannt.
- ⬜ **Kein Stadtteil:** Bei allen Standorten steht der Stadtname als Stadtteil – die Quelle nennt keinen.

### Bonn

406 Standorte, 608 Stellplätze · Quelle: OpenStreetMap-Mitwirkende (ODbL)

- 🟡 **Mögliche Dubletten:** 240 Paare liegen unter 10 m auseinander.
  - Weißdornweg ↔ Weißdornweg (7 m)
  - Seufertstraße ↔ Seufertstraße (4 m)
  - Am Schwimmbad ↔ Am Schwimmbad (3 m)
  - Ria-Maternus-Platz ↔ Ria-Maternus-Platz (4 m)
  - Reichsstraße ↔ Reichsstraße (3 m)
- 🔴 **Namen nicht unterscheidbar:** Nur 192 verschiedene Bezeichnungen bei 406 Standorten – das Adressfeld der Quelle wurde vermutlich nicht erkannt.
- ⬜ **Kein Stadtteil:** Bei allen Standorten steht der Stadtname als Stadtteil – die Quelle nennt keinen.

### Augsburg

400 Standorte, 639 Stellplätze · Quelle: OpenStreetMap-Mitwirkende (ODbL)

- 🟡 **Mögliche Dubletten:** 264 Paare liegen unter 10 m auseinander.
  - Brahmsstraße ↔ Brahmsstraße (3 m)
  - Brahmsstraße ↔ Brahmsstraße (7 m)
  - Brahmsstraße ↔ Brahmsstraße (4 m)
  - Brahmsstraße ↔ Brahmsstraße (7 m)
  - Brahmsstraße ↔ Brahmsstraße (4 m)
- 🔴 **Namen nicht unterscheidbar:** Nur 167 verschiedene Bezeichnungen bei 400 Standorten – das Adressfeld der Quelle wurde vermutlich nicht erkannt.
- ⬜ **Kein Stadtteil:** Bei allen Standorten steht der Stadtname als Stadtteil – die Quelle nennt keinen.

### Freiburg im Breisgau

330 Standorte, 334 Stellplätze · Quelle: Behindertenparkplätze in Freiburg i. Br. – Freiburg im Breisgau (nicht angegeben)

- 🟡 **Mögliche Dubletten:** 140 Paare liegen unter 10 m auseinander.
  - Schauinslandstrasse ↔ Schauinslandstrasse (0 m)
  - Weierweg ↔ Weierweg (6 m)
  - Vaubanallee ↔ Vaubanallee (5 m)
  - Im Maierbruehl ↔ Im Maierbruehl (3 m)
  - Im Maierbruehl ↔ Im Maierbruehl (7 m)

### Karlsruhe

330 Standorte, 532 Stellplätze · Quelle: OpenStreetMap-Mitwirkende (ODbL)

- 🟡 **Mögliche Dubletten:** 128 Paare liegen unter 10 m auseinander.
  - Birkenwäldle ↔ Birkenwäldle (5 m)
  - Birkenwäldle ↔ Birkenwäldle (10 m)
  - Birkenwäldle ↔ Birkenwäldle (5 m)
  - Birkenwäldle ↔ Birkenwäldle (10 m)
  - Birkenwäldle ↔ Birkenwäldle (5 m)
- ⬜ **Kein Stadtteil:** Bei allen Standorten steht der Stadtname als Stadtteil – die Quelle nennt keinen.

### Stuttgart

266 Standorte, 646 Stellplätze · Quelle: OpenStreetMap-Mitwirkende (ODbL)

- 🟡 **Mögliche Dubletten:** 31 Paare liegen unter 10 m auseinander.
  - Bahnhof Vaihingen ↔ Bahnhof Vaihingen (4 m)
  - Freibadstraße ↔ Freibadstraße (9 m)
  - Sigmaringer Straße ↔ Sigmaringer Straße (3 m)
  - Hauptstraße 14 ↔ Hauptstraße 16 (2 m)
  - Holdermannstraße 36 ↔ Holdermannstraße 36 (2 m)

### Essen

244 Standorte, 549 Stellplätze · Quelle: OpenStreetMap-Mitwirkende (ODbL)

- 🟡 **Mögliche Dubletten:** 38 Paare liegen unter 10 m auseinander.
  - Montebruchstraße ↔ Montebruchstraße (4 m)
  - Montebruchstraße ↔ Montebruchstraße (4 m)
  - Messeplatz ↔ Messeplatz (3 m)
  - Messeplatz ↔ Norbertstraße (6 m)
  - Messeplatz ↔ Norbertstraße (10 m)
- ⬜ **Kein Stadtteil:** Bei allen Standorten steht der Stadtname als Stadtteil – die Quelle nennt keinen.

### Leipzig

237 Standorte, 358 Stellplätze · Quelle: OpenStreetMap-Mitwirkende (ODbL)

- 🟡 **Mögliche Dubletten:** 108 Paare liegen unter 10 m auseinander.
  - Hans-Marchwitza-Straße ↔ Hans-Marchwitza-Straße (6 m)
  - Hans-Marchwitza-Straße ↔ Hans-Marchwitza-Straße (6 m)
  - Hans-Marchwitza-Straße ↔ Hans-Marchwitza-Straße (0 m)
  - Hans-Marchwitza-Straße ↔ Hans-Marchwitza-Straße (6 m)
  - Hans-Marchwitza-Straße ↔ Hans-Marchwitza-Straße (6 m)
- ⬜ **Kein Stadtteil:** Bei allen Standorten steht der Stadtname als Stadtteil – die Quelle nennt keinen.

### Witten

234 Standorte, 353 Stellplätze · Quelle: OpenStreetMap-Mitwirkende (ODbL)

- 🟡 **Mögliche Dubletten:** 57 Paare liegen unter 10 m auseinander.
  - Westerweide ↔ Westerweide (3 m)
  - Herbeder Straße ↔ Herbeder Straße (3 m)
  - Wittener Straße ↔ Wittener Straße (3 m)
  - Nachtigallstraße ↔ Nachtigallstraße (4 m)
  - Nachtigallstraße ↔ Nachtigallstraße (7 m)
- ⬜ **Kein Stadtteil:** Bei allen Standorten steht der Stadtname als Stadtteil – die Quelle nennt keinen.

### Gelsenkirchen

219 Standorte, 219 Stellplätze · Quelle: Behindertenparkplätze der Stadt Gelsenkirchen – Gelsenkirchen (nicht angegeben)

- 🟡 **Mögliche Dubletten:** 87 Paare liegen unter 10 m auseinander.
  - Behindertenparkplatz Virchowstraße (Marienhospital) ↔ Behindertenparkplatz Virchowstraße (Marienhospital) (4 m)
  - Behindertenparkplatz Virchowstraße (Marienhospital) ↔ Behindertenparkplatz Virchowstraße (Marienhospital) (9 m)
  - Behindertenparkplatz Virchowstraße (Marienhospital) ↔ Behindertenparkplatz Virchowstraße (Marienhospital) (5 m)
  - Behindertenparkplatz Virchowstraße (Marienhospital) ↔ Behindertenparkplatz Virchowstraße (Marienhospital) (3 m)
  - Behindertenparkplatz Virchowstraße (Marienhospital) ↔ Behindertenparkplatz Virchowstraße (Marienhospital) (6 m)

### München

219 Standorte, 629 Stellplätze · Quelle: OpenStreetMap-Mitwirkende (ODbL)

- 🟡 **Mögliche Dubletten:** 23 Paare liegen unter 10 m auseinander.
  - Lorettoplatz ↔ Lorettoplatz 3 (3 m)
  - Werner-Schlierf-Straße 9 ↔ Werner-Schlierf-Straße 9 (1 m)
  - Arnulfstraße 2 ↔ Arnulfstraße 2 (8 m)
  - Prannerstraße ↔ Prannerstraße (2 m)
  - Prannerstraße ↔ Prannerstraße (3 m)
- ⬜ **Kein Stadtteil:** Bei allen Standorten steht der Stadtname als Stadtteil – die Quelle nennt keinen.

### Heidelberg

214 Standorte, 214 Stellplätze · Quelle: Behindertenparkplätze in Heidelberg – Heidelberg (nicht angegeben)

- 🟡 **Mögliche Dubletten:** 171 Paare liegen unter 10 m auseinander.
  - Im Emmertsgrund ↔ Im Emmertsgrund (7 m)
  - Im Emmertsgrund ↔ Im Emmertsgrund (7 m)
  - Otto-Hahn-Straße 17 ↔ Otto-Hahn-Straße 17 (5 m)
  - Im Emmertsgrund ↔ Im Emmertsgrund (5 m)
  - Im Emmertsgrund ↔ Im Emmertsgrund (10 m)
- ⬜ **Kein Stadtteil:** Bei allen Standorten steht der Stadtname als Stadtteil – die Quelle nennt keinen.

### Magdeburg

208 Standorte, 345 Stellplätze · Quelle: OpenStreetMap-Mitwirkende (ODbL)

- 🟡 **Mögliche Dubletten:** 131 Paare liegen unter 10 m auseinander.
  - Gustav-Ricker-Straße ↔ Gustav-Ricker-Straße (2 m)
  - Gustav-Ricker-Straße ↔ Gustav-Ricker-Straße (4 m)
  - Gustav-Ricker-Straße ↔ Gustav-Ricker-Straße (6 m)
  - Gustav-Ricker-Straße ↔ Gustav-Ricker-Straße (8 m)
  - Gustav-Ricker-Straße ↔ Gustav-Ricker-Straße (2 m)
- 🔴 **Namen nicht unterscheidbar:** Nur 78 verschiedene Bezeichnungen bei 208 Standorten – das Adressfeld der Quelle wurde vermutlich nicht erkannt.
- ⬜ **Kein Stadtteil:** Bei allen Standorten steht der Stadtname als Stadtteil – die Quelle nennt keinen.

### Potsdam

202 Standorte, 399 Stellplätze · Quelle: OpenStreetMap-Mitwirkende (ODbL)

- 🟡 **Mögliche Dubletten:** 87 Paare liegen unter 10 m auseinander.
  - Asta-Nielsen-Straße 2 ↔ Asta-Nielsen-Straße 2 (4 m)
  - Zum Bahnhof Pirschheide ↔ Zum Bahnhof Pirschheide (6 m)
  - Zum Bahnhof Pirschheide ↔ Zum Bahnhof Pirschheide (9 m)
  - Zum Bahnhof Pirschheide ↔ Zum Bahnhof Pirschheide (3 m)
  - Zum Bahnhof Pirschheide ↔ Zum Bahnhof Pirschheide (7 m)
- ⬜ **Kein Stadtteil:** Bei allen Standorten steht der Stadtname als Stadtteil – die Quelle nennt keinen.

### Hamm

198 Standorte, 300 Stellplätze · Quelle: OpenStreetMap-Mitwirkende (ODbL)

- 🟡 **Mögliche Dubletten:** 111 Paare liegen unter 10 m auseinander.
  - Raststätte Rhynern-Süd ↔ Raststätte Rhynern-Süd (5 m)
  - Raststätte Rhynern-Süd ↔ Raststätte Rhynern-Süd (5 m)
  - Raststätte Rhynern-Süd ↔ Raststätte Rhynern-Süd (10 m)
  - Raststätte Rhynern-Süd ↔ Raststätte Rhynern-Süd (5 m)
  - Raststätte Rhynern-Süd ↔ Raststätte Rhynern-Süd (9 m)
- 🔴 **Namen nicht unterscheidbar:** Nur 98 verschiedene Bezeichnungen bei 198 Standorten – das Adressfeld der Quelle wurde vermutlich nicht erkannt.
- ⬜ **Kein Stadtteil:** Bei allen Standorten steht der Stadtname als Stadtteil – die Quelle nennt keinen.

### Solingen

196 Standorte, 233 Stellplätze · Quelle: OpenStreetMap-Mitwirkende (ODbL)

- 🟡 **Mögliche Dubletten:** 25 Paare liegen unter 10 m auseinander.
  - Sperlingsweg ↔ Sperlingsweg (4 m)
  - Friedenstraße 96 ↔ Friedenstraße 96 (6 m)
  - Friedenstraße 96 ↔ Friedenstraße (6 m)
  - Friedenstraße 94a ↔ Friedenstraße 94a (4 m)
  - Grünstraße 2 ↔ Grünstraße 3 (5 m)
- ⬜ **Kein Stadtteil:** Bei allen Standorten steht der Stadtname als Stadtteil – die Quelle nennt keinen.

### Bergisch Gladbach

189 Standorte, 309 Stellplätze · Quelle: OpenStreetMap-Mitwirkende (ODbL)

- 🟡 **Mögliche Dubletten:** 39 Paare liegen unter 10 m auseinander.
  - Ernst-Reuter-Straße ↔ Ernst-Reuter-Straße (3 m)
  - Siebenmorgen ↔ Siebenmorgen 22 (6 m)
  - Siebenmorgen 22 ↔ Siebenmorgen 22 (6 m)
  - Siebenmorgen 22 ↔ Siebenmorgen 22 (6 m)
  - Siebenmorgen 22 ↔ Siebenmorgen 22 (1 m)
- ⬜ **Kein Stadtteil:** Bei allen Standorten steht der Stadtname als Stadtteil – die Quelle nennt keinen.

### Hannover

173 Standorte, 335 Stellplätze · Quelle: OpenStreetMap-Mitwirkende (ODbL)

- 🟡 **Mögliche Dubletten:** 55 Paare liegen unter 10 m auseinander.
  - Hannover-Wülferode Ost ↔ Hannover-Wülferode Ost (5 m)
  - Hannover-Wülferode Ost ↔ Hannover-Wülferode Ost (5 m)
  - Siemensstraße ↔ Siemensstraße (6 m)
  - Geibelstraße ↔ Geibelstraße (7 m)
  - Janusz-Korczak-Allee ↔ Janusz-Korczak-Allee (3 m)
- ⬜ **Kein Stadtteil:** Bei allen Standorten steht der Stadtname als Stadtteil – die Quelle nennt keinen.

### Mainz

171 Standorte, 295 Stellplätze · Quelle: OpenStreetMap-Mitwirkende (ODbL)

- 🟡 **Mögliche Dubletten:** 62 Paare liegen unter 10 m auseinander.
  - Barcelona-Allee ↔ Barcelona-Allee (4 m)
  - Barcelona-Allee ↔ Barcelona-Allee (4 m)
  - Robert-Bosch-Straße ↔ Robert-Bosch-Straße (3 m)
  - Robert-Bosch-Straße ↔ Robert-Bosch-Straße (5 m)
  - Robert-Bosch-Straße ↔ Robert-Bosch-Straße (7 m)
- ⬜ **Kein Stadtteil:** Bei allen Standorten steht der Stadtname als Stadtteil – die Quelle nennt keinen.

### Münster

165 Standorte, 324 Stellplätze · Quelle: OpenStreetMap-Mitwirkende (ODbL)

- 🟡 **Mögliche Dubletten:** 42 Paare liegen unter 10 m auseinander.
  - Glasuritstraße ↔ Glasuritstraße (1 m)
  - Glasuritstraße ↔ Glasuritstraße (5 m)
  - Glasuritstraße ↔ Glasuritstraße (8 m)
  - Glasuritstraße ↔ Glasuritstraße (4 m)
  - Glasuritstraße ↔ Glasuritstraße (8 m)

### Würzburg

127 Standorte, 196 Stellplätze · Quelle: OpenStreetMap-Mitwirkende (ODbL)

- 🟡 **Mögliche Dubletten:** 35 Paare liegen unter 10 m auseinander.
  - Spittelbergweg ↔ Spittelbergweg 12 (5 m)
  - Greisingstraße 10a ↔ Greisingstraße 10a (4 m)
  - Balthasar-Neumann-Promenade ↔ Balthasar-Neumann-Promenade (3 m)
  - Balthasar-Neumann-Promenade ↔ Balthasar-Neumann-Promenade (7 m)
  - Balthasar-Neumann-Promenade ↔ Balthasar-Neumann-Promenade (3 m)

### Leverkusen

122 Standorte, 144 Stellplätze · Quelle: OpenStreetMap-Mitwirkende (ODbL)

- 🟡 **Mögliche Dubletten:** 47 Paare liegen unter 10 m auseinander.
  - CHEMPARK Kasino ↔ CHEMPARK Kasino (4 m)
  - Philipp-Ott-Straße 3 ↔ Philipp-Ott-Straße 3 (6 m)
  - Dünnwalder Grenzweg ↔ Dünnwalder Grenzweg (4 m)
  - Am Scherfenbrand ↔ Am Scherfenbrand (4 m)
  - Am Scherfenbrand ↔ Am Scherfenbrand (8 m)
- ⬜ **Kein Stadtteil:** Bei allen Standorten steht der Stadtname als Stadtteil – die Quelle nennt keinen.

### Duisburg

116 Standorte, 213 Stellplätze · Quelle: OpenStreetMap-Mitwirkende (ODbL)

- 🟡 **Mögliche Dubletten:** 39 Paare liegen unter 10 m auseinander.
  - Wilhelmine-Bertling-Straße ↔ Wilhelmine-Bertling-Straße (10 m)
  - Marktstraße ↔ Marktstraße (5 m)
  - Am Markt ↔ Am Markt (3 m)
  - Kruppstraße ↔ Kruppstraße (3 m)
  - Dorfstraße 65 ↔ Dorfstraße 62d (10 m)
- ⬜ **Kein Stadtteil:** Bei allen Standorten steht der Stadtname als Stadtteil – die Quelle nennt keinen.

### Bremen

112 Standorte, 187 Stellplätze · Quelle: OpenStreetMap-Mitwirkende (ODbL)

- 🟡 **Mögliche Dubletten:** 23 Paare liegen unter 10 m auseinander.
  - Volkmannstraße 4 ↔ Volkmannstraße 4 (4 m)
  - Johann-Jacobs-Straße 34 ↔ Johann-Jacobs-Straße 36 (6 m)
  - Konsul-Smidt-Straße ↔ Konsul-Smidt-Straße (10 m)
  - Konsul-Smidt-Straße ↔ Konsul-Smidt-Straße (10 m)
  - Konsul-Smidt-Straße ↔ Konsul-Smidt-Straße (5 m)
- ⬜ **Kein Stadtteil:** Bei allen Standorten steht der Stadtname als Stadtteil – die Quelle nennt keinen.

### Aachen

111 Standorte, 191 Stellplätze · Quelle: OpenStreetMap-Mitwirkende (ODbL)

- 🟡 **Mögliche Dubletten:** 52 Paare liegen unter 10 m auseinander.
  - Eupener Straße ↔ Eupener Straße (2 m)
  - Eupener Straße ↔ Eupener Straße (3 m)
  - Eupener Straße ↔ Eupener Straße (2 m)
  - Am Chorusberg ↔ Am Chorusberg (3 m)
  - Am Chorusberg ↔ Am Chorusberg (7 m)
- ⬜ **Kein Stadtteil:** Bei allen Standorten steht der Stadtname als Stadtteil – die Quelle nennt keinen.

### Erlangen

108 Standorte, 230 Stellplätze · Quelle: OpenStreetMap-Mitwirkende (ODbL)

- 🟡 **Mögliche Dubletten:** 59 Paare liegen unter 10 m auseinander.
  - Stoke-on-Trent-Straße ↔ Stoke-on-Trent-Straße (4 m)
  - Stoke-on-Trent-Straße ↔ Stoke-on-Trent-Straße (8 m)
  - Stoke-on-Trent-Straße ↔ Stoke-on-Trent-Straße (4 m)
  - Raststätte Aurach Süd ↔ Raststätte Aurach Süd (5 m)
  - Raststätte Aurach Süd ↔ Raststätte Aurach Süd (9 m)
- 🔴 **Namen nicht unterscheidbar:** Nur 51 verschiedene Bezeichnungen bei 108 Standorten – das Adressfeld der Quelle wurde vermutlich nicht erkannt.
- ⬜ **Kein Stadtteil:** Bei allen Standorten steht der Stadtname als Stadtteil – die Quelle nennt keinen.

### Koblenz

96 Standorte, 203 Stellplätze · Quelle: OpenStreetMap-Mitwirkende (ODbL)

- 🟡 **Mögliche Dubletten:** 47 Paare liegen unter 10 m auseinander.
  - Jupp-Gauchel-Straße ↔ Jupp-Gauchel-Straße (6 m)
  - Jupp-Gauchel-Straße ↔ Jupp-Gauchel-Straße (3 m)
  - Jupp-Gauchel-Straße ↔ Jupp-Gauchel-Straße (8 m)
  - Jupp-Gauchel-Straße ↔ Jupp-Gauchel-Straße (5 m)
  - Jupp-Gauchel-Straße ↔ Jupp-Gauchel-Straße (3 m)
- ⬜ **Kein Stadtteil:** Bei allen Standorten steht der Stadtname als Stadtteil – die Quelle nennt keinen.

### Kassel

93 Standorte, 123 Stellplätze · Quelle: OpenStreetMap-Mitwirkende (ODbL)

- 🟡 **Mögliche Dubletten:** 33 Paare liegen unter 10 m auseinander.
  - Heinrich-Hertz-Straße 25 ↔ Heinrich-Hertz-Straße 25 (4 m)
  - Heinrich-Hertz-Straße 25 ↔ Heinrich-Hertz-Straße 25 (7 m)
  - Heinrich-Hertz-Straße 25 ↔ Heinrich-Hertz-Straße 25 (4 m)
  - Heinrich-Hertz-Straße 25 ↔ Heinrich-Hertz-Straße 25 (7 m)
  - Heinrich-Hertz-Straße 25 ↔ Heinrich-Hertz-Straße 25 (4 m)
- ⬜ **Kein Stadtteil:** Bei allen Standorten steht der Stadtname als Stadtteil – die Quelle nennt keinen.

### Oldenburg

92 Standorte, 230 Stellplätze · Quelle: OpenStreetMap-Mitwirkende (ODbL)

- 🟡 **Mögliche Dubletten:** 10 Paare liegen unter 10 m auseinander.
  - Eichenstraße 46-48 ↔ Eichenstraße 46-48 (3 m)
  - Rummelweg 5 ↔ Rummelweg 5 (2 m)
  - Rummelweg 5 ↔ Rummelweg 5 (5 m)
  - Rummelweg 5 ↔ Rummelweg 5 (2 m)
  - Bloherfelder Straße 196 ↔ Bloherfelder Straße 196 (3 m)
- ⬜ **Kein Stadtteil:** Bei allen Standorten steht der Stadtname als Stadtteil – die Quelle nennt keinen.

### Erfurt

88 Standorte, 127 Stellplätze · Quelle: OpenStreetMap-Mitwirkende (ODbL)

- 🟡 **Mögliche Dubletten:** 18 Paare liegen unter 10 m auseinander.
  - K 16 ↔ K 16 (6 m)
  - K 16 ↔ K 16 (6 m)
  - Rudolstädter Straße ↔ Rudolstädter Straße (5 m)
  - Rudolstädter Straße ↔ Rudolstädter Straße (5 m)
  - Rudolstädter Straße ↔ Rudolstädter Straße (5 m)
- ⬜ **Kein Stadtteil:** Bei allen Standorten steht der Stadtname als Stadtteil – die Quelle nennt keinen.

### Braunschweig

85 Standorte, 226 Stellplätze · Quelle: OpenStreetMap-Mitwirkende (ODbL)

- 🟡 **Mögliche Dubletten:** 18 Paare liegen unter 10 m auseinander.
  - Ruhfäutchenplatz 5 ↔ Ruhfäutchenplatz 5 (5 m)
  - Hamburger Straße ↔ Hamburger Straße (4 m)
  - Hamburger Straße ↔ Hamburger Straße (7 m)
  - Hamburger Straße ↔ Hamburger Straße (4 m)
  - Hamburger Straße ↔ Hamburger Straße (7 m)
- ⬜ **Kein Stadtteil:** Bei allen Standorten steht der Stadtname als Stadtteil – die Quelle nennt keinen.

### Jena

84 Standorte, 119 Stellplätze · Quelle: OpenStreetMap-Mitwirkende (ODbL)

- 🟡 **Mögliche Dubletten:** 46 Paare liegen unter 10 m auseinander.
  - Brüsseler Straße ↔ Brüsseler Straße (3 m)
  - Brüsseler Straße ↔ Brüsseler Straße (7 m)
  - Brüsseler Straße ↔ Brüsseler Straße (3 m)
  - Brüsseler Straße ↔ Brüsseler Straße (7 m)
  - Brüsseler Straße ↔ Brüsseler Straße (3 m)
- 🔴 **Namen nicht unterscheidbar:** Nur 37 verschiedene Bezeichnungen bei 84 Standorten – das Adressfeld der Quelle wurde vermutlich nicht erkannt.
- ⬜ **Kein Stadtteil:** Bei allen Standorten steht der Stadtname als Stadtteil – die Quelle nennt keinen.

### Wolfsburg

82 Standorte, 141 Stellplätze · Quelle: OpenStreetMap-Mitwirkende (ODbL)

- 🟡 **Mögliche Dubletten:** 21 Paare liegen unter 10 m auseinander.
  - Antonius-Holling-Weg ↔ Antonius-Holling-Weg (5 m)
  - Maximilian-Kolbe-Weg ↔ Maximilian-Kolbe-Weg (5 m)
  - Maximilian-Kolbe-Weg ↔ Maximilian-Kolbe-Weg (5 m)
  - An der Vorburg ↔ An der Vorburg (4 m)
  - An der Vorburg ↔ An der Vorburg (8 m)

### Trier

79 Standorte, 109 Stellplätze · Quelle: OpenStreetMap-Mitwirkende (ODbL)

- 🟡 **Mögliche Dubletten:** 26 Paare liegen unter 10 m auseinander.
  - Castelnauplatz ↔ Castelnauplatz (6 m)
  - Castelnauplatz ↔ Castelnauplatz (6 m)
  - Castelnauplatz ↔ Castelnauplatz (6 m)
  - Medardstraße ↔ Medardstraße (3 m)
  - Kohlenstraße ↔ Kohlenstraße (3 m)
- ⬜ **Kein Stadtteil:** Bei allen Standorten steht der Stadtname als Stadtteil – die Quelle nennt keinen.

### Oberhausen

78 Standorte, 141 Stellplätze · Quelle: OpenStreetMap-Mitwirkende (ODbL)

- 🟡 **Mögliche Dubletten:** 14 Paare liegen unter 10 m auseinander.
  - Brammenring 30 ↔ Brammenring 30 (4 m)
  - Brammenring 30 ↔ Brammenring 30 (7 m)
  - Brammenring 30 ↔ Brammenring 30 (4 m)
  - Brammenring 30 ↔ Brammenring 30 (7 m)
  - Brammenring 30 ↔ Brammenring 30 (4 m)
- 🔴 **Namen nicht unterscheidbar:** Nur 36 verschiedene Bezeichnungen bei 78 Standorten – das Adressfeld der Quelle wurde vermutlich nicht erkannt.
- ⬜ **Kein Stadtteil:** Bei allen Standorten steht der Stadtname als Stadtteil – die Quelle nennt keinen.

### Moers

66 Standorte, 134 Stellplätze · Quelle: OpenStreetMap-Mitwirkende (ODbL)

- 🟡 **Mögliche Dubletten:** 44 Paare liegen unter 10 m auseinander.
  - Römerstraße ↔ Römerstraße (4 m)
  - Jan-Hus-Straße ↔ Kirchweg (3 m)
  - Düsseldorfer Straße 309 ↔ Düsseldorfer Straße 309 (4 m)
  - Kautzstraße 33 ↔ Kautzstraße 33 (7 m)
  - Kautzstraße 33 ↔ Kautzstraße 33 (3 m)
- ⬜ **Kein Stadtteil:** Bei allen Standorten steht der Stadtname als Stadtteil – die Quelle nennt keinen.

### Wuppertal

66 Standorte, 136 Stellplätze · Quelle: OpenStreetMap-Mitwirkende (ODbL)

- 🟡 **Mögliche Dubletten:** 13 Paare liegen unter 10 m auseinander.
  - Vohwinkel Bahnhof ↔ Vohwinkel Bahnhof (7 m)
  - Gaußstraße ↔ Gaußstraße (4 m)
  - Fuhlrottstraße 10 ↔ Fuhlrottstraße 10 (8 m)
  - Fuhlrottstraße 10 ↔ Fuhlrottstraße (3 m)
  - Gaußstraße ↔ Gaußstraße (7 m)
- ⬜ **Kein Stadtteil:** Bei allen Standorten steht der Stadtname als Stadtteil – die Quelle nennt keinen.

### Hagen

64 Standorte, 140 Stellplätze · Quelle: OpenStreetMap-Mitwirkende (ODbL)

- 🟡 **Mögliche Dubletten:** 11 Paare liegen unter 10 m auseinander.
  - Enneper Straße ↔ Enneper Straße (4 m)
  - Enneper Straße ↔ Enneper Straße (5 m)
  - Enneper Straße ↔ Enneper Straße (9 m)
  - Enneper Straße ↔ Enneper Straße (4 m)
  - Enneper Straße ↔ Enneper Straße (7 m)

### Kaiserslautern

58 Standorte, 137 Stellplätze · Quelle: OpenStreetMap-Mitwirkende (ODbL)

- 🟡 **Mögliche Dubletten:** 8 Paare liegen unter 10 m auseinander.
  - Kaiserslautern Army Depot ↔ Kaiserslautern Army Depot (2 m)
  - Kaiserslautern Army Depot ↔ Kaiserslautern Army Depot (6 m)
  - Kaiserslautern Army Depot ↔ Kaiserslautern Army Depot (9 m)
  - Kaiserslautern Army Depot ↔ Kaiserslautern Army Depot (4 m)
  - Kaiserslautern Army Depot ↔ Kaiserslautern Army Depot (6 m)
- ⬜ **Kein Stadtteil:** Bei allen Standorten steht der Stadtname als Stadtteil – die Quelle nennt keinen.

### Recklinghausen

57 Standorte, 111 Stellplätze · Quelle: OpenStreetMap-Mitwirkende (ODbL)

- 🟡 **Mögliche Dubletten:** 10 Paare liegen unter 10 m auseinander.
  - Erlbruch ↔ Erlbruch (2 m)
  - Erlbruch ↔ Erlbruch (4 m)
  - Erlbruch ↔ Erlbruch (2 m)
  - Dr.-Helene-Kuhlmann-Park ↔ Dr.-Helene-Kuhlmann-Park (5 m)
  - Erlbruch ↔ Erlbruch (3 m)
- ⬜ **Kein Stadtteil:** Bei allen Standorten steht der Stadtname als Stadtteil – die Quelle nennt keinen.

### Reutlingen

47 Standorte, 61 Stellplätze · Quelle: OpenStreetMap-Mitwirkende (ODbL)

- 🟡 **Mögliche Dubletten:** 40 Paare liegen unter 10 m auseinander.
  - Klosterstraße ↔ Klosterstraße (7 m)
  - Unter den Linden 23 ↔ Unter den Linden 27/1 (7 m)
  - Justus-von-Liebig-Straße ↔ Justus-von-Liebig-Straße (3 m)
  - Justus-von-Liebig-Straße ↔ Justus-von-Liebig-Straße (7 m)
  - Justus-von-Liebig-Straße ↔ Justus-von-Liebig-Straße (6 m)
- ⬜ **Kein Stadtteil:** Bei allen Standorten steht der Stadtname als Stadtteil – die Quelle nennt keinen.

### Krefeld

40 Standorte, 71 Stellplätze · Quelle: OpenStreetMap-Mitwirkende (ODbL)

- 🟡 **Mögliche Dubletten:** 6 Paare liegen unter 10 m auseinander.
  - Lange Straße ↔ Lange Straße 65 (3 m)
  - Lange Straße ↔ Lange Straße 65 (6 m)
  - Lange Straße ↔ Lange Straße 65 (9 m)
  - Lange Straße 65 ↔ Lange Straße 65 (3 m)
  - Lange Straße 65 ↔ Lange Straße 65 (6 m)
- ⬜ **Kein Stadtteil:** Bei allen Standorten steht der Stadtname als Stadtteil – die Quelle nennt keinen.

### Hildesheim

37 Standorte, 97 Stellplätze · Quelle: OpenStreetMap-Mitwirkende (ODbL)

- 🟡 **Mögliche Dubletten:** 5 Paare liegen unter 10 m auseinander.
  - Treibestraße ↔ Treibestraße (5 m)
  - Treibestraße ↔ Treibestraße (6 m)
  - Treibestraße ↔ Treibestraße (1 m)
  - Treibestraße ↔ Treibestraße 2 (6 m)
  - Treibestraße ↔ Treibestraße 2 (5 m)
- ⬜ **Kein Stadtteil:** Bei allen Standorten steht der Stadtname als Stadtteil – die Quelle nennt keinen.

### Gütersloh

33 Standorte, 70 Stellplätze · Quelle: OpenStreetMap-Mitwirkende (ODbL)

- 🟡 **Mögliche Dubletten:** 9 Paare liegen unter 10 m auseinander.
  - Gütersloh Süd ↔ Gütersloh Süd (5 m)
  - Gütersloh Süd ↔ Gütersloh Süd (5 m)
  - Gütersloh Süd ↔ Gütersloh Süd (5 m)
  - Gütersloh Nord ↔ Gütersloh Nord (5 m)
  - Gütersloh Nord ↔ Gütersloh Nord (10 m)
- ⬜ **Kein Stadtteil:** Bei allen Standorten steht der Stadtname als Stadtteil – die Quelle nennt keinen.

### Heilbronn

26 Standorte, 49 Stellplätze · Quelle: OpenStreetMap-Mitwirkende (ODbL)

- 🟡 **Mögliche Dubletten:** 4 Paare liegen unter 10 m auseinander.
  - Hünderstraße ↔ Hünderstraße (4 m)
  - Allee ↔ Allee (3 m)
  - Allee ↔ Allee (5 m)
  - Allee ↔ Allee (3 m)
- ⬜ **Kein Stadtteil:** Bei allen Standorten steht der Stadtname als Stadtteil – die Quelle nennt keinen.

### Osnabrück

13 Standorte, 29 Stellplätze · Quelle: OpenStreetMap-Mitwirkende (ODbL)

- 🟡 **Auffällig wenige Stellplätze:** 1.7 Stellplätze je 10.000 Einwohner, Mittelwert aller Städte 8.5. Vermutlich eine lückenhafte Quelle, keine lückenhafte Stadt.

### Salzgitter

10 Standorte, 19 Stellplätze · Quelle: OpenStreetMap-Mitwirkende (ODbL)

- 🟡 **Auffällig wenige Stellplätze:** 1.8 Stellplätze je 10.000 Einwohner, Mittelwert aller Städte 8.5. Vermutlich eine lückenhafte Quelle, keine lückenhafte Stadt.

### Rostock

5 Standorte, 5 Stellplätze · Quelle: Rostocker Heide – Rostock (nicht angegeben)

- 🔴 **Auffällig wenige Stellplätze:** 0.2 Stellplätze je 10.000 Einwohner, Mittelwert aller Städte 8.5. Vermutlich eine lückenhafte Quelle, keine lückenhafte Stadt.

## Alle Städte

| Stadt                 | Standorte | Stellplätze | je 10.000 Einw. | von OSM bestätigt | Befunde |
| --------------------- | --------: | ----------: | --------------: | ----------------: | ------- |
| Aachen                |       111 |         191 |             7.7 |     nicht geprüft | 🟡      |
| Augsburg              |       400 |         639 |            21.2 |     nicht geprüft | 🔴      |
| Bergisch Gladbach     |       189 |         309 |            27.6 |     nicht geprüft | 🟡      |
| Berlin                |       923 |        1560 |             4.1 |     nicht geprüft | –       |
| Bielefeld             |       125 |         229 |             6.7 |     nicht geprüft | –       |
| Bochum                |       165 |         411 |            11.2 |     nicht geprüft | –       |
| Bonn                  |       406 |         608 |            18.1 |     nicht geprüft | 🔴      |
| Bottrop               |       134 |         134 |            11.4 |     nicht geprüft | –       |
| Braunschweig          |        85 |         226 |             8.9 |     nicht geprüft | 🟡      |
| Bremen                |       112 |         187 |             3.2 |     nicht geprüft | 🟡      |
| Bremerhaven           |        25 |          47 |             4.1 |     nicht geprüft | –       |
| Chemnitz              |        13 |          56 |             2.2 |     nicht geprüft | –       |
| Cottbus               |        95 |         190 |            19.4 |     nicht geprüft | –       |
| Darmstadt             |        90 |         165 |            10.2 |     nicht geprüft | –       |
| Dortmund              |       368 |         368 |             6.2 |     nicht geprüft | –       |
| Dresden               |       481 |         680 |            12.0 |     nicht geprüft | –       |
| Duisburg              |       116 |         213 |             4.3 |     nicht geprüft | 🟡      |
| Düsseldorf            |       340 |         523 |             8.3 |     nicht geprüft | –       |
| Erfurt                |        88 |         127 |             5.9 |     nicht geprüft | 🟡      |
| Erlangen              |       108 |         230 |            19.8 |     nicht geprüft | 🔴      |
| Essen                 |       244 |         549 |             9.4 |     nicht geprüft | 🟡      |
| Frankfurt am Main     |       458 |         615 |             7.9 |     nicht geprüft | –       |
| Freiburg im Breisgau  |       330 |         334 |            14.1 |     nicht geprüft | 🟡      |
| Fürth                 |        42 |          84 |             6.4 |     nicht geprüft | –       |
| Gelsenkirchen         |       219 |         219 |             8.5 |     nicht geprüft | 🟡      |
| Göttingen             |       424 |         709 |            58.6 |     nicht geprüft | 🔴      |
| Gütersloh             |        33 |          70 |             6.9 |     nicht geprüft | 🟡      |
| Hagen                 |        64 |         140 |             7.4 |     nicht geprüft | 🟡      |
| Halle (Saale)         |        62 |         178 |             7.4 |     nicht geprüft | –       |
| Hamburg               |       936 |        1310 |             6.9 |     nicht geprüft | –       |
| Hamm                  |       198 |         300 |            16.7 |     nicht geprüft | 🔴      |
| Hannover              |       173 |         335 |             6.1 |     nicht geprüft | 🟡      |
| Heidelberg            |       214 |         214 |            13.2 |     nicht geprüft | 🟡      |
| Heilbronn             |        26 |          49 |             3.8 |     nicht geprüft | 🟡      |
| Herne                 |        35 |          64 |             4.1 |     nicht geprüft | –       |
| Hildesheim            |        37 |          97 |             9.6 |     nicht geprüft | 🟡      |
| Idstein               |         6 |           9 |               – |     nicht geprüft | –       |
| Ingolstadt            |        31 |          54 |             3.8 |     nicht geprüft | –       |
| Jena                  |        84 |         119 |            10.7 |     nicht geprüft | 🔴      |
| Kaiserslautern        |        58 |         137 |            13.6 |     nicht geprüft | 🟡      |
| Karlsruhe             |       330 |         532 |            17.2 |     nicht geprüft | 🟡      |
| Kassel                |        93 |         123 |             6.0 |     nicht geprüft | 🟡      |
| Kiel                  |        85 |         241 |             9.6 |     nicht geprüft | –       |
| Koblenz               |        96 |         203 |            17.7 |     nicht geprüft | 🟡      |
| Köln                  |       445 |         605 |             5.6 |     nicht geprüft | –       |
| Krefeld               |        40 |          71 |             3.1 |     nicht geprüft | 🟡      |
| Leipzig               |       237 |         358 |             5.8 |     nicht geprüft | 🟡      |
| Leverkusen            |       122 |         144 |             8.6 |     nicht geprüft | 🟡      |
| Lübeck                |       281 |         357 |            16.4 |     nicht geprüft | –       |
| Ludwigshafen am Rhein |        36 |          60 |             3.5 |     nicht geprüft | –       |
| Magdeburg             |       208 |         345 |            14.4 |     nicht geprüft | 🔴      |
| Mainz                 |       171 |         295 |            13.4 |     nicht geprüft | 🟡      |
| Mannheim              |        86 |         139 |             4.3 |     nicht geprüft | –       |
| Moers                 |        66 |         134 |            12.8 |     nicht geprüft | 🟡      |
| Mönchengladbach       |        93 |         213 |             8.1 |     nicht geprüft | –       |
| Mülheim an der Ruhr   |        56 |         121 |             7.0 |     nicht geprüft | –       |
| München               |       219 |         629 |             4.2 |     nicht geprüft | 🟡      |
| Münster               |       165 |         324 |            10.1 |     nicht geprüft | 🟡      |
| Neuss                 |        38 |          57 |             3.7 |     nicht geprüft | –       |
| Nürnberg              |       487 |         640 |            12.2 |     nicht geprüft | 🟡      |
| Oberhausen            |        78 |         141 |             6.7 |     nicht geprüft | 🔴      |
| Offenbach am Main     |        23 |          38 |             2.7 |     nicht geprüft | –       |
| Oldenburg             |        92 |         230 |            13.0 |     nicht geprüft | 🟡      |
| Osnabrück             |        13 |          29 |             1.7 |     nicht geprüft | 🟡      |
| Paderborn             |       107 |         185 |            11.9 |     nicht geprüft | –       |
| Pforzheim             |        51 |         116 |             9.0 |     nicht geprüft | –       |
| Potsdam               |       202 |         399 |            21.3 |     nicht geprüft | 🟡      |
| Recklinghausen        |        57 |         111 |             9.9 |     nicht geprüft | 🟡      |
| Remscheid             |        24 |          94 |             8.1 |     nicht geprüft | –       |
| Reutlingen            |        47 |          61 |             5.2 |     nicht geprüft | 🟡      |
| Rostock               |         5 |           5 |             0.2 |     nicht geprüft | 🔴      |
| Saarbrücken           |       157 |         346 |            19.0 |     nicht geprüft | –       |
| Salzgitter            |        10 |          19 |             1.8 |     nicht geprüft | 🟡      |
| Siegen                |        42 |          84 |             8.2 |     nicht geprüft | –       |
| Solingen              |       196 |         233 |            14.5 |     nicht geprüft | 🟡      |
| Stuttgart             |       266 |         646 |            10.2 |     nicht geprüft | 🟡      |
| Trier                 |        79 |         109 |             9.8 |     nicht geprüft | 🟡      |
| Ulm                   |        48 |         107 |             8.3 |     nicht geprüft | –       |
| Weißenhorn            |         4 |           7 |               – |     nicht geprüft | –       |
| Wiesbaden             |        51 |         181 |             6.4 |     nicht geprüft | –       |
| Witten                |       234 |         353 |            36.8 |     nicht geprüft | 🟡      |
| Wolfsburg             |        82 |         141 |            11.0 |     nicht geprüft | 🟡      |
| Wuppertal             |        66 |         136 |             3.8 |     nicht geprüft | 🟡      |
| Würzburg              |       127 |         196 |            15.3 |     nicht geprüft | 🟡      |
