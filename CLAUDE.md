# Arbeitsweise in diesem Projekt

Diese Datei wird zu Beginn jeder Sitzung gelesen. Sie enthält, was sonst
verloren geht – Regeln, die sich aus der Arbeit ergeben haben, nicht aus dem
Code ablesbar sind und sonst in jeder Sitzung neu gelernt werden müssten.

## Im Zweifel fragen

**Immer nachfragen, wenn etwas unklar ist – nicht raten.** Die Begründung
steht in der [README](README.md#im-zweifel-fragen); sie ist dort ausdrücklich
festgehalten worden (2026-10-10). Kurz: In diesem Projekt sieht Falsches oft
richtig aus, und die Daten betreffen Menschen, die auf den Parkplatz
angewiesen sind.

Praktisch heißt das: erst alles erledigen, was nicht an der Antwort hängt,
dann gezielt fragen. Nicht alles anhalten, aber auch nicht weiterraten.

## Aufgabenliste pflegen

**Erledigte Punkte gehören nach [Erledigt.md](Erledigt.md), nicht in
[ToDos.md](ToDos.md).** In `ToDos.md` steht nur, was offen ist.

**Das geschieht sofort, als Teil der Aufgabe – nicht am Ende der Sitzung und
nicht auf Nachfrage.** Eine Aufgabe gilt erst als fertig, wenn sie
verschoben ist. Wird es aufgeschoben, steht Erledigtes in der offenen Liste,
und die Liste beantwortet ihre einzige Frage nicht mehr: Was ist noch zu tun?

So geht es:

1. Punkt in `Erledigt.md` eintragen, unter derselben Nummer wie in `ToDos.md`
   und im passenden Abschnitt. Mit Datum und – das ist der eigentliche Zweck –
   **mit der Begründung, warum es so gelöst wurde.**
2. Den Punkt in `ToDos.md` löschen.
3. Ist ein Punkt nur teilweise erledigt, bleibt er in `ToDos.md` auf `[~]`,
   und nur der fertige Teil wandert hinüber. **In `ToDos.md` bleibt dann
   kein „Fertig: …" stehen**, sondern höchstens ein Verweis auf
   `Erledigt.md`. Sonst steht dieselbe Sache in beiden Dateien, und bei einer
   späteren Änderung wird nur eine davon nachgeführt.
4. Zählstände oben in beiden Dateien nachführen.

**Vor dem Eintragen prüfen, ob der Punkt schon in `Erledigt.md` steht.** Ein
doppelter Eintrag ist schlimmer als keiner: Er lässt dieselbe Arbeit zweimal
getan erscheinen und widerspricht sich, sobald einer der beiden ergänzt wird.

`Erledigt.md` ist kein Änderungsprotokoll, sondern eine
Begründungssammlung. Mehrere Einträge beschreiben Fehler, die wirklich
passiert sind; sie stehen dort, damit niemand dieselbe Entscheidung noch
einmal anders trifft.

Nach jeder abgeschlossenen Aufgabe außerdem den **Arbeitsstand** oben in
`ToDos.md` nachführen – er ist der Einstieg nach einer Unterbrechung.

## Eine plausible Ursache ist keine gemessene

**Wenn etwas kaputtgeht, während du etwas geändert hast, ist deine Änderung
ein Verdacht und kein Befund.** Die Gegenprobe gehört dazu, bevor die
Begründung in den Code wandert.

Am 2026-10-17 scheiterte die Anmeldung des Service Workers, kurz nachdem eine
Inhaltsrichtlinie (CSP) eingeführt worden war. Die Erklärung lag auf der Hand,
war schon als Kommentar geschrieben – und war falsch: Ohne jede Kopfzeile
scheiterte sie genauso. Es lag am eingebetteten Browser.

Der Schaden einer solchen Notiz ist größer als der eines Fehlers, denn sie
sieht aus wie Wissen. Die nächste Person baut darauf auf. Dasselbe Muster
steckt hinter den Fehlern in [Erledigt.md](Erledigt.md): plausible Koordinaten
450 km daneben, eine leere Antwort als Ergebnis.

Praktisch: Einmal ohne die Änderung laufen lassen. Kostet eine Minute.

## Zählstände nachzählen, nicht fortschreiben

In `ToDos.md` und `Erledigt.md` stehen Zahlen („51 offen", „118 Einträge").
**Die werden ermittelt, nicht aus der vorigen Zahl weitergerechnet.** Am
2026-10-17 stand kurzzeitig „52 offen", weil addiert statt gezählt wurde; in
`Erledigt.md` war unklar geblieben, ob die sechs Entscheidungen mitzählen.
Beide Dateien nennen oben den Einzeiler, der die Zahl liefert.

## Reihenfolge: erst Inhalt, dann Datenimport

**Vorgabe vom 2026-10-17.** Kein weiterer Datenimport, solange inhaltliche
Punkte offen sind – auch nicht nebenbei. Der Import lässt sich beliebig lange
fortsetzen (10.550 Gemeinden stehen offen) und ist nie „fertig"; die
inhaltlichen Punkte sind endlich und halten die Veröffentlichung auf. Die
Reihenfolge im Einzelnen steht unter „Hier weitermachen" in
[ToDos.md](ToDos.md).

## Was nicht ohne Freigabe gebaut wird

Abschnitt 13 (Finanzierung), 15 (Mehrsprachigkeit) und 16 (Offline-Download)
in `ToDos.md`. Auch dann nicht, wenn gerade nichts anderes zu tun ist.

## Dateien nie mit PowerShell umschreiben

`Get-Content | Set-Content` und `-replace` lesen UTF-8 als Windows-1252: Aus
„Nächster" wird „NÃ¤chster". Das ist hier schon passiert und hat zwei
Komponenten an 39 bzw. 42 Stellen beschädigt – `typecheck`, `lint` und 148
Unit-Tests liefen trotzdem grün durch, weil beschädigte Umlaute in
Zeichenketten syntaktisch gültig sind. Gefunden hat es erst ein E2E-Test.

Für Massenänderungen das Edit-Werkzeug oder ein Node-Skript nehmen.
Dasselbe gilt für `Out-File -Append -Encoding utf8` (setzt eine BOM mitten in
die Datei) und für deutsche Anführungszeichen in TypeScript-Zeichenketten:
`„Text"` beendet die Zeichenkette am ASCII-Anführungszeichen – entweder
`'…'` als äußere Begrenzung oder `“` schreiben.

## Daten nur aufnehmen, wenn sie belegbar stimmen

Der Grundsatz aus [Datenpflege.md](Datenpflege.md) gilt auch gegen die eigene
Arbeit: **Lieber kein Import als ein falscher.** Eine Stadt, die fehlt, ist
ein sichtbarer Mangel. Eine Stadt mit falschen Koordinaten ist eine
vergebliche Fahrt für jemanden, der auf den Parkplatz angewiesen ist.

Am 2026-10-10 wurden deshalb 473 bereits geschriebene Gemeinden wieder
entfernt – siehe 2e.7 in `ToDos.md`.

Zwei Kennzahlen finden solche Fehler zuverlässiger als Hinsehen:

- **Streuung je Gemeinde.** Liegen die Parkplätze einer Gemeinde mehr als
  15 km auseinander, stimmt die Zuordnung nicht.
- **Stellplätze je 10.000 Einwohner.** Der Median liegt bei rund 7. Das
  Dreifache davon ist verdächtig, ein Zwanzigstel auch.

  **Verdächtig heißt nicht falsch.** Im mittleren Ruhrgebiet liegen mehrere
  Nachbarstädte bei 27 bis 40 – Witten, Hattingen, Herdecke, Bergisch
  Gladbach –, und für Witten bestätigen zwei unabhängige Importwege dieselbe
  Zahl. Dort ist OpenStreetMap einfach dichter erfasst. Die Kennzahl findet
  Zuordnungsfehler, aber sie weiß nicht, wo fleißig kartiert wird: Sie
  verlangt ein Nachsehen, kein Verwerfen.

## Entwicklungsserver

`npm run build` **nicht** starten, während `npm run dev` läuft – beide
schreiben nach `.next`. Danach meldet der Entwicklungsserver Fehler wie
`ENOENT … _document.js` oder `Cannot find module './897.js'`. Abhilfe:
Server beenden, `npm run clean`, neu starten.

Nie `Stop-Process node` ohne Filter: Das beendet auch laufende Importe.

## Overpass schonend benutzen

Der Dienst wird von Freiwilligen bezahlt und antwortet unter Last mit
HTTP 504 oder 500. Zwischen größeren Läufen Pausen lassen, Abfragen bündeln
statt je Gemeinde zu fragen, und bei leerem Ergebnis misstrauisch sein –
Überlast kommt dort auch als HTTP 200 mit leerer Liste zurück.
