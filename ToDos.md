# ToDos – wheelee

**Hier steht nur, was offen ist.** Alles Fertige steht mit seiner Begründung in
[Erledigt.md](Erledigt.md); wie gepflegt wird, steht in
[CLAUDE.md](CLAUDE.md#aufgabenliste-pflegen). Fachliche Grundlage:
[Konzept.md](Konzept.md). Datenarbeit: [Datenpflege.md](Datenpflege.md).

**Legende:** `[ ]` offen · `[~]` teils gebaut, Rest hier · `[!]` braucht eine
Entscheidung oder Angabe von dir · `[-]` gesperrt bis zur Freigabe

**Letzte Aktualisierung:** 2026-11-09

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
(Geschwindigkeit) und 12.18 (npm audit) sind am 2026-11-09 erledigt._

**Neue Knöpfe und Meldungen kommen gleich in `src/i18n/de.ts`, nicht in die
Komponente** (Aufbau in [Erledigt.md](Erledigt.md) unter 15.2) – und in die
Dateien aller anderen Sprachen (en, es, fr, it, pl, nl, pt, ru): Ein fehlender
Schlüssel ist ein Typfehler, und neue Sätze gehen wie in 15.6 durch die
maschinelle Mehrfachprüfung.

---

## 2. Datenquellen und Import

- [~] 2d.8a **Städte mit ungenutzter amtlicher Quelle.** München und Bielefeld sind umgestellt (Befund in [Erledigt.md](Erledigt.md)). **Offen: Bochum.** Am 2026-11-01 erneut mit einfachem Abruf versucht, auch über GovData und die Datastore-Schnittstelle: Der Datensatz `bochum-behindertenparkplaetze` ist über `opendata.ruhr` auffindbar (GeoJSON, CSV, ZIP), der Download antwortet aber weiter mit 403, der ArcGIS-Dienst mit 404, die Datastore-Schnittstelle ebenfalls; ich umgehe die Sperre nicht. **Ohne die Datei im Browser geht es nicht:** CSV oder GeoJSON „Bochum – Behindertenparkplätze“ (CC0) von `bochum.opendata.ruhr` laden und in den Arbeitsordner legen. **Köln** (neu am 2026-11-01): Der ArcGIS-Server der Stadt (`geoportal.stadt-koeln.de/arcgis`) antwortet auf jeden Pfad mit der Startseite der Stadt; deren Geoportal-Seite sagt „Einige unserer interaktiven Karten stehen derzeit nicht zur Verfügung“ (Stand 2026-11-01). Auch offenedaten-koeln.de und GovData verweisen nur auf diese Adressen, einen anderen Weg gibt es dort nicht. Der Kölner Bestand bleibt amtlich vom 2026-10-08; der Datenlauf (19.10) versucht es wöchentlich von selbst. **Heidelberg** (neu am 2026-11-01): Die Quelle (CKAN-Datenplattform) liefert nichts Brauchbares mehr, der Lauf hat den Import verworfen, der Bestand vom 2026-10-08 bleibt; neuen Bezugsweg suchen. Köln: ob der Dienst zurückkommt, sonst das gebündelte NRW-Angebot der Mobilithek (Zugang unbekannt, Anmeldung nötig).

## 12. Qualität und Deployment

- [~] 12.17 **Gesamttest: Durchgang von Hand auf dem Telefon.** Offen ist nur noch dieser – Karte, Suche, Navigation, Rückmeldung mit Mail, An- und Abmelden, Verwaltung. **Braucht Torsten** (Gerät und laufender Betrieb). Der maschinelle Teil ist am 2026-11-09 gelaufen, Zahlen in [Erledigt.md](Erledigt.md). Was auffällt, wird als eigener Punkt aufgenommen und nicht nebenbei geändert. **Läuft danach noch etwas am Code, gehört der maschinelle Teil wiederholt.**

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
