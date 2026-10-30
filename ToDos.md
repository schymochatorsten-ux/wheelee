# ToDos – wheelee

**Hier steht nur, was offen ist.** Alles Fertige steht mit seiner Begründung in
[Erledigt.md](Erledigt.md); wie gepflegt wird, steht in
[CLAUDE.md](CLAUDE.md#aufgabenliste-pflegen). Fachliche Grundlage:
[Konzept.md](Konzept.md). Datenarbeit: [Datenpflege.md](Datenpflege.md).

**Legende:** `[ ]` offen · `[~]` teils gebaut, Rest hier · `[!]` braucht eine
Entscheidung oder Angabe von dir · `[-]` gesperrt bis zur Freigabe

**Letzte Aktualisierung:** 2026-10-30

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
[Erledigt.md](Erledigt.md)); alle Stufen sind eingespielt. Offen ist, in dieser
Reihenfolge: **2d.8a** (Bochum, braucht die Datei von Torsten), **15.1**
(weitere Prüfrunden der Übersetzungen), **19.2 und 19.3** (Timer auf dem NAS
einschalten), **19.5 und 19.6** (von Hand).

**Neue Knöpfe und Meldungen kommen gleich in `src/i18n/de.ts`, nicht in die
Komponente** (Aufbau in [Erledigt.md](Erledigt.md) unter 15.2) – und in die
Dateien aller anderen Sprachen (en, es, fr, it, pl, nl, pt, ru): Ein fehlender
Schlüssel ist ein Typfehler, und neue Sätze gehen wie in 15.6 durch die
maschinelle Mehrfachprüfung.

---

## 2. Datenquellen und Import

- [~] 2d.8a **Städte mit ungenutzter amtlicher Quelle.** München und Bielefeld sind umgestellt (Befund in [Erledigt.md](Erledigt.md)). **Offen: Bochum.** Am 2026-10-30 erneut mit einfachem Abruf versucht: Der Datensatz `bochum-behindertenparkplaetze` ist über die CKAN-Schnittstelle von `opendata.ruhr` auffindbar (GeoJSON, CSV, ZIP), der Download antwortet aber weiter mit 403, der ArcGIS-Dienst mit 404; ich lade die Datei nicht selbst. **Braucht Torsten:** die CSV oder das GeoJSON „Bochum – Behindertenparkplätze“ (CC0) von `bochum.opendata.ruhr` im Browser laden und in den Arbeitsordner legen; vorher prüfen, ob sie Koordinaten enthält.

## 10. Sicherheit und Recht

- [!] 10.20 **Admin-Konto auf dem NAS prüfen und die neue Reihenfolge einhalten** (zu 10.19, [Erledigt.md](Erledigt.md)). **Braucht Torsten:** Nach dem Einspielen den Container neu starten und prüfen, dass das eigene Konto `role = 'admin'` trägt (`docker exec wheelee node -e "const {DatabaseSync}=require('node:sqlite');console.log(new DatabaseSync(process.env.WHEELEE_DB_PATH).prepare('SELECT email,role FROM account').all())"`). Stehen Adressen in `ADMIN_EMAILS`, zu denen es *kein eigenes* Konto gibt, die Adresse entfernen.

## 15. Mehrsprachigkeit

- [!] 15.1 **Prüfung der Übersetzungen durch Menschen** (D-08) für Italienisch, Polnisch, Niederländisch, Portugiesisch und Russisch; Englisch und Spanisch ebenso. Die drei maschinellen Prüfrunden sind gelaufen (Befund in [Erledigt.md](Erledigt.md), 15.1) und finden nichts mehr. **Braucht Torsten:** je Sprache eine Muttersprachler:in, die `src/i18n/<code>.ts` gegenliest; besonders das niederländische „parkeervak“ für Stellplatz und das portugiesische „comunicação“. Alle Sprachen sind gebaut; eine weitere Sprache braucht je `src/i18n/<code>.ts`, Eintrag in `index.ts`, Zeile in `opening-hours.test.ts` und einen E2E-Test in `sprache.spec.ts`.

## 19. Betrieb und Pflege

Was von 19 baubar war, ist gebaut (19.1, 19.4, 19.7, 19.8; Begründung in [Erledigt.md](Erledigt.md)). Offen ist, was auf dem NAS oder von Hand geschieht:

- [~] 19.2 **Monatlicher Aktualitätslauf auf dem NAS.** Skript und Timer liegen in `deploy/wheelee-aktualitaet.*`, auf dem NAS nicht erprobt. **Braucht Torsten:** einschalten (Befehle in `deploy/README.md`, „Zeitgesteuerte Läufe“) und nach dem ersten Lauf `data/_aktualitaet.md` ansehen.
- [~] 19.3 **Zeitgesteuerte Sicherung.** Skript und Timer liegen in `deploy/wheelee-sicherung.*` (täglich, 14 Sicherungen), auf dem NAS nicht erprobt. **Braucht Torsten:** einschalten wie 19.2 und einmal mit `systemctl start wheelee-sicherung.service` prüfen.
- [!] 19.5 **„Nur OSM“ und „aufgehoben gemeldet“ als OpenStreetMap-Hinweise zurückgeben.** Geschieht von Hand in OSM-Notizen mit eigenem Konto; die Liste der Kandidaten steht in `data/_validierung.md`.
- [!] 19.6 **Laufender Betriebsmonitor** (Eintrag in nfuptime, siehe Checkliste in `wheelee-infrastruktur.md`). Braucht Zugang zu nfuptime.

---

## Gesperrt bis zu deiner Freigabe

**Nichts hiervon wird gebaut, bevor du es freigibst.** Die Erwägungen stehen in
[Erledigt.md](Erledigt.md) unter „Erwägungen zu 13, 15 und 16".

**Abschnitt 13 – Finanzierung.** Wer trägt die Kosten, und zu welchem Preis?

- [-] 13.1 Spenden-Knopf · [-] 13.2 Werbebanner (widerspricht 10.4 „keine Tracker") · [-] 13.3 Einwilligungsbanner, falls Werbung kommt
