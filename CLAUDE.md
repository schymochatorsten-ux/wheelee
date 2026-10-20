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

### In `ToDos.md` steht nur, was zu tun ist – sonst nichts

**Vorgabe vom 2026-10-20.** Die Datei war auf 845 Zeilen gewachsen, von denen
nur etwa ein Viertel offene Aufgaben waren. Der Rest war Tagebuch, Rückblick
auf behobene Zählfehler, leere Abschnittsüberschriften („Nichts offen") und
Begründungen, die anderswo schon vollständig standen. **Eine Liste, in der man
den offenen Punkt zwischen Rückblicken suchen muss, beantwortet ihre einzige
Frage nicht mehr.** Deshalb gilt dauerhaft:

**Was in `ToDos.md` gehört** – und zwar in möglichst wenigen Zeilen je Punkt:

- der offene Punkt selbst: was zu tun ist, der **eine** Satz, warum es wichtig
  ist, und wo im Code es ansetzt;
- die Reihenfolge der Abarbeitung;
- was eine Entscheidung oder eine Angabe von Torsten braucht;
- die Befehle, mit denen vor dem Anfangen die Ausgangslage geprüft wird.

**Was dort nicht hingehört** (und beim Antreffen sofort verschoben oder
gestrichen wird):

- **Rückblicke jeder Art** – „Arbeitsstand", „zuletzt geschah", „davor am …".
  Was fertig ist, steht in `Erledigt.md`; ein zweiter, kürzerer Abriss
  derselben Sache wird beim nächsten Mal nicht nachgeführt.
- **Erledigte Teile eines offenen Punktes.** Beim `[~]`-Punkt bleibt nur der
  offene Rest stehen, mit einem Verweis – kein „Fertig: …".
- **Abschnitte ohne offenen Punkt.** Eine Überschrift mit „Nichts offen"
  darunter wird gelöscht; die Nummerierung ist kein Grund, sie zu behalten,
  denn nachgeschlagen wird in `Erledigt.md`.
- **Ausgearbeitete Begründungen und Erwägungen**, auch zu noch offener Arbeit.
  Sie gehören nach `Erledigt.md` (für Befunde und abgeschlossene Überlegungen)
  oder nach `Datenpflege.md` (für den Weg der Daten). In `ToDos.md` bleibt der
  Verweis.
- **Gesperrte Vorhaben in ganzer Länge.** Eine Zeile je Punkt genügt; die
  Erwägungen stehen unter „Zurückgestellte Vorhaben" in `Erledigt.md`.
- **Dieselbe Arbeit in zwei Kästchen.** Eine Aufgabe, zwei Haken heißt: beim
  Erledigen wird nur einer nachgeführt. Ein Punkt wird an **einer** Stelle
  geführt, die andere verweist (so aufgelöst: 10.3 → 2a.5, 2e.7a → 2e.11).
- **Zahlen über den Bestand.** Sie veralten still und werden trotzdem
  geglaubt. Stattdessen auf `data/_abdeckung.md`, `data/_import-status.md` oder
  `data/_validierung.md` verweisen – oder den Einzeiler nennen, der sie zählt.

**Das geschieht laufend, nicht als Aufräumaktion.** Wer einen Punkt anfasst,
kürzt ihn dabei auf das, was offen ist. Der Rückschnitt am 2026-10-20 war der
zweite innerhalb von zwei Tagen – am 2026-10-19 fielen sieben Posten weg, die
keine offenen Aufgaben waren. **Eine Liste, die zweimal in zwei Tagen
aufgeräumt werden muss, hat kein Zählproblem, sondern ein Regelproblem;**
diese Regel ist die Antwort darauf.

**Umgekehrt gilt genauso: `Erledigt.md` darf nichts verlieren.** Was aus
`ToDos.md` verschwindet, verschwindet nur mit Begründung – auch ein verworfener
Plan, ein überholter Punkt und eine abgeschlossene Messung zu einer noch
offenen Aufgabe. Sonst nimmt der Nächste die Sache wieder auf, und die
Streichung sieht aus wie ein Versehen.

### Eine Nummer bedeutet genau eine Sache

**Vorgabe vom 2026-10-20.** Abschnitt 10 trug zwei Nummern doppelt belegt:
10.3 war die Lizenz- und Attributionsfrage **und** die Sicherheits-Kopfzeilen,
10.5 der Haftungshinweis **und** die Datenschutz- und Sicherheitsprüfung. Beide
Male hatte eine spätere Sitzung eine Nummer weiterverwendet, die längst besetzt
war.

**Das trifft nicht die Ordnung, sondern die Verweise.** Diese Nummern sind das
einzige Band zwischen Code, Tests und den beiden Listen: `next.config.ts` sagte
„ToDo 10.3", `e2e/sicherheit.spec.ts` ebenso – und gemeint war beides Mal etwas
anderes als das 10.3 in der offenen Liste. Wer „10.5" nachschlug, fand den
Haftungshinweis und hielt die Sicherheitsprüfung für erledigt. **Ein Verweis,
der auf zwei Dinge zeigt, ist schlechter als keiner** – dieselbe Begründung wie
beim doppelten Eintrag.

Deshalb:

- **Ein neuer Punkt bekommt die nächste freie Nummer seines Abschnitts** – auch
  wenn er thematisch zu einem bestehenden passt. Nachsehen, was belegt ist,
  heißt: in **beiden** Dateien nachsehen, denn Erledigtes behält seine Nummer.
- **Wer umbenennt, lässt die alte Nummer stehen**, als „bis zum <Datum> als
  10.x geführt" – in `Erledigt.md` und an jeder Stelle im Code, die darauf
  verwies. Sonst wird eine ältere Notiz oder ein Commit unauflösbar.
- **Dieselbe Nummer in beiden Dateien ist nur bei `[~]` richtig:** gebauter
  Teil hier, offener Rest dort. Zweimal `[x]` zur selben Nummer ist ein Fehler
  – mit einer Ausnahme, die in `Erledigt.md` benannt ist (7.7, zwei Durchgänge
  derselben Arbeit).

Die Kollision fand kein Hinsehen, sondern ein Abgleich der beiden Dateien. Er
kostet eine Sekunde und gehört zum Aufräumen:

```bash
node -e "const fs=require('fs');const n=z=>{const m=/^- \[[x~ !-]\] \*{0,2}([0-9]+[a-z]?\.[0-9]+[a-z]?|D-[0-9]+)/.exec(z);return m?m[1]:null};const e=fs.readFileSync('Erledigt.md','utf8').split('\n').filter(x=>/^- \[(x|~)\]/.test(x)).map(n).filter(Boolean);const t=fs.readFileSync('ToDos.md','utf8').split('\n').filter(x=>/^- \[(.)\]/.test(x)).map(n).filter(Boolean);console.log('doppelt in Erledigt:',[...new Set(e.filter((x,i)=>e.indexOf(x)!==i))].join(' ')||'keine');console.log('in beiden Dateien:',t.filter(x=>e.includes(x)).join(' ')||'keine');"
```

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

**Abschnitt 13 (Finanzierung)** in `ToDos.md`. Auch dann nicht, wenn gerade
nichts anderes zu tun ist.

**15 (Mehrsprachigkeit) und 16 (Vorab-Download) sind am 2026-10-20
freigegeben** und stehen seitdem in der Reihenfolge. Zwei Vorgaben daraus
gelten weiter, weil sie keine Sperre sind, sondern eine Festlegung:

- **Englisch und Spanisch zuerst**, danach die häufigsten europäischen
  Sprachen.
- **Übersetzt wird nach D-08** (siehe `Erledigt.md`): Dateien je Sprache,
  maschinell vorübersetzt, von Menschen geprüft – **kein Übersetzer zur
  Laufzeit**, denn der wäre ein dritter Dienst, der Inhalte sieht, bräuchte
  Netz und formulierte jedes Mal anders. Haftungshinweis, Impressum,
  Datenschutzerklärung und die Daten selbst stehen auf der Ausnahmeliste.
- **Von 16 ist nur 16.1 baubar** (Parkplatzdaten). Das Vorabladen der
  **Kacheln** (16.2) wartet auf die Lizenzfrage und wird nicht nebenbei
  angefangen.

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
