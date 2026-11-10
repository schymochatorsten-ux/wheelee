# ToDos – wheelee

**Hier steht nur, was offen ist.** Alles Fertige steht mit seiner Begründung in
[Erledigt.md](Erledigt.md); wie gepflegt wird, steht in
[CLAUDE.md](CLAUDE.md#aufgabenliste-pflegen). Fachliche Grundlage:
[Konzept.md](Konzept.md). Datenarbeit: [Datenpflege.md](Datenpflege.md).

**Legende:** `[ ]` offen · `[~]` teils gebaut, Rest hier · `[!]` braucht eine
Entscheidung oder Angabe von dir · `[-]` gesperrt bis zur Freigabe

**Letzte Aktualisierung:** 2026-11-10

**Stand:** wird nachgezählt, nicht fortgeschrieben:

```bash
node -e "const t=require('fs').readFileSync('ToDos.md','utf8').split('\n').filter(x=>/^- \[(.)\]/.test(x)); console.log('gesamt',t.length); for(const m of [' ','~','!','-']) console.log(m, t.filter(x=>x.startsWith('- ['+m+']')).length);"
```

**Zahlen zum Bestand nicht hier nachlesen, sondern in
[data/\_abdeckung.md](data/_abdeckung.md) und
[data/\_import-status.md](data/_import-status.md)** – hier veralten sie still
und werden trotzdem geglaubt.

---

## Vor dem Anfangen

Zwei Befehle, keine Netzabfrage, zusammen unter einer Minute. Weicht etwas ab,
**das zuerst klären** – besonders ein Slug, der nicht mehr passt: Er verwaist
eine Seed-Datei lautlos.

```bash
npm run test && npm run typecheck && npm run lint
npm run check:slugs
```

Erwartet: alle Unit-Tests grün; `check:slugs` meldet **keine verwaiste
Seed-Datei**. Die Gemeinden „im Register ohne Seed-Datei“ sind keine Abweichung
– für sie liegt kein Fund vor; ihr Stand je Gemeinde steht in
`data/_import-status.md`.

Vor dem ersten landesweiten Lauf einmal `npm run import:grenzen` (lädt 66 MB
vom BKG, die nicht im Repository liegen).

---

## Reihenfolge

Datenläufe laufen in Stufen, jede erst nach den Prüfungen (D-11 in
[Erledigt.md](Erledigt.md)); alle Stufen sind eingespielt.

**Nichts auf dieser Liste braucht noch den Zugang zum NAS.** Der Termin dafür
ist gelaufen: 10.20 (Admin-Konto), 19.2 (Datenlauf) und 19.3 (Sicherung) sind
am 2026-11-09 erledigt. **Läuft dort etwas nicht wie erwartet, wird es ein
eigener Punkt**; wo der Nachweis liegt und welche Fehlerbilder es gibt, steht
in [Erledigt.md](Erledigt.md) bei 19.3 und in [deploy/Datenlauf.md](deploy/Datenlauf.md).

**Zum Schluss steht 12.17** (abschließender Gesamttest), weil er sonst einen
Stand prüft, den es danach nicht mehr gibt. _10.23 (Sicherheit), 12.16
(Geschwindigkeit) und 12.18 (npm audit) sind am 2026-11-09 erledigt, 12.19
(wackelnder Smoke-Test) und Köln aus 2d.8a am 2026-11-10._

**Neue Knöpfe und Meldungen kommen gleich in `src/i18n/de.ts`, nicht in die
Komponente** (Aufbau in [Erledigt.md](Erledigt.md) unter 15.2) – und in die
Dateien aller anderen Sprachen (en, es, fr, it, pl, nl, pt, ru): Ein fehlender
Schlüssel ist ein Typfehler, und neue Sätze gehen wie in 15.6 durch die
maschinelle Mehrfachprüfung.

---

## 2. Datenquellen und Import

- [~] 2d.8a **Städte mit ungenutzter amtlicher Quelle.** München, Bielefeld und – seit dem 2026-11-10 – Köln sind erledigt; Befunde in [Erledigt.md](Erledigt.md). Offen sind zwei, und beide brauchen eine Handlung nach außen:
  - [!] **Bochum – im Browser nachgesehen, es geht ohne Zugangsdaten nicht** (2026-11-10, Befund in [Erledigt.md](Erledigt.md)). Der Download verlangt eine **Anmeldung** auf dem Portal der Stadt, der ArcGIS-Dienst ist abgeschaltet, und eine Lizenz nennt der Datensatz nicht mehr. **Nötig ist eine Entscheidung, nicht ein Abruf:** Zugang beim Portal erfragen, oder Bochum bleibt bei OpenStreetMap.
  - [!] **Heidelberg.** Die CKAN-Quelle ist samt Host weg, GovData verweist weiter auf sie, einen anderen Bezugsweg gibt es nicht (gesucht am 2026-11-10, Einzelheiten in [Erledigt.md](Erledigt.md)). **Nötig:** Anfrage beim Amt für Mobilität der Stadt, also Schritt 3 aus [Datenpflege.md](Datenpflege.md). Der Bestand vom 2026-10-08 bleibt bis dahin.

- [!] 2d.12 **Moers hat eine amtliche Quelle, die wir nicht nutzen.** Beim Nachsehen zu 2d.8a gefunden: „Behindertenparkplätze (Stadt Moers)“ auf `offenesdatenportal.de`, CSV, **Datenlizenz Deutschland Zero 2.0**, abrufbar. Im Bestand steht Moers mit 66 Standorten aus OpenStreetMap. **Braucht deine Entscheidung, weil es den Bestand ersetzt:** Wie bei München (2d.8a) ändern sich dabei alle Parkplatz-IDs, und Bewertungen und gespeicherte Parkplätze auf dem NAS zeigen danach ins Leere. Nicht importiert.

## 12. Qualität und Deployment

- [~] 12.17 **Gesamttest: Durchgang von Hand auf dem Telefon.** Offen ist nur noch dieser – Karte, Suche, Navigation, Rückmeldung mit Mail, An- und Abmelden, Verwaltung. **Braucht Torsten** (Gerät und laufender Betrieb). Der maschinelle Teil ist am 2026-11-10 erneut gelaufen (nach 12.19), Zahlen in [Erledigt.md](Erledigt.md). Was auffällt, wird als eigener Punkt aufgenommen und nicht nebenbei geändert. **Läuft danach noch etwas am Code, gehört der maschinelle Teil wiederholt.**

## 19. Betrieb und Pflege

Was von 19 baubar war, ist gebaut (19.1, 19.4, 19.7, 19.8; Begründung in [Erledigt.md](Erledigt.md)). Offen ist, was auf dem NAS oder von Hand geschieht:

- [!] 19.13 **Google Search Console einrichten.** Dort `wheelee.de` als Eigentum bestätigen (DNS-Eintrag oder Datei), `https://wheelee.de/sitemap.xml` einreichen und nach einigen Tagen unter „Seiten“ prüfen, ob die Stadtseiten aufgenommen sind (19.12). Braucht Torsten (Google-Konto, DNS beim Registrar).
- [!] 19.5 **„Nur OSM“ und „aufgehoben gemeldet“ als OpenStreetMap-Hinweise zurückgeben.** Geschieht von Hand in OSM-Notizen mit eigenem Konto; die Liste der Kandidaten steht in `data/_validierung.md`.

---

## Gesperrt bis zu deiner Freigabe

**Nichts hiervon wird gebaut, bevor du es freigibst.** Die Erwägungen stehen in
[Erledigt.md](Erledigt.md) unter „Erwägungen zu 13, 15 und 16".

**Abschnitt 13 – Finanzierung.** Wer trägt die Kosten, und zu welchem Preis?

- [-] 13.1 Spenden-Knopf · [-] 13.2 Werbebanner (widerspricht 10.4 „keine Tracker") · [-] 13.3 Einwilligungsbanner, falls Werbung kommt
