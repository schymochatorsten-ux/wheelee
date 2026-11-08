# Termin mit Niklas – Ablauf

Alles, wofür der Zugang zum NAS gebraucht wird, in der Reihenfolge, in der es
laufen muss. **Zweck dieser Datei: dass Niklas so kurz wie möglich gebunden
ist.** Was ohne ihn geht, steht unten unter „Danach allein".

Stand: 2026-11-08. Ausführliche Begründungen und Fehlerbilder stehen in
[Datenlauf.md](Datenlauf.md) und [README.md](README.md); hier steht nur der
Ablauf.

---

## Warum diese Reihenfolge

Zwei Abhängigkeiten bestimmen alles Weitere, und beide fallen erst auf, wenn
man in der falschen Reihenfolge anfängt:

1. **Das Admin-Konto braucht den Klon des Datenlaufs.** `admin:create` läuft in
   einem Wegwerf-Container gegen `/var/lib/wheelee-update/repo`; diesen Ordner
   samt `node_modules` legt der erste Datenlauf an (einige Minuten `npm
   install`). Deshalb Datenlauf zuerst **starten** – und während er läuft, das
   Übrige erledigen.
2. **Ohne Admin-Konto gibt es keinen Mailversand, und ohne Mailversand kein
   Admin-Konto auf dem bequemen Weg.** `ADMIN_EMAILS` hebt nur Konten mit
   **bestätigter** Adresse (10.19, Test `auth-hardening.test.ts`), bestätigt
   wird per Mail – die es noch nicht gibt. `admin:create` umgeht das, weil es
   die Adresse beim Anlegen als bestätigt einträgt. **Also: `admin:create`, nicht
   registrieren und hochstufen.**

---

## Vorher, allein (5 Minuten, vor dem Call)

- [ ] **Neuen Stand deployen.** Der Mailversand aus der Verwaltung (10.22) muss
      auf dem NAS sein, sonst gibt es die Seite dort nicht. Ein Push auf `main`
      genügt, der Webhook baut von selbst. Danach im Browser prüfen, dass
      `https://wheelee.de` wieder antwortet.
- [ ] **<https://wheelee.de/impressum> und <https://wheelee.de/datenschutz>
      aufrufen.** Steht dort irgendwo ein roter „Angabe fehlt"-Hinweis, fehlt
      eine `WHEELEE_OPERATOR_*`-Variable in der `.env` – **das ist dann ein
      Punkt für Niklas** und gehört in die Liste unten.
- [ ] **Eigene E-Mail-Adresse** für das Admin-Konto festlegen.
- [ ] **Startpasswort** ausdenken (Wegwerfwert, wird sofort geändert).
- [ ] **GitHub:** Repository → Settings → Deploy keys ansehen. Hat der
      vorhandene Schlüssel **kein** „Allow write access", muss er gelöscht und
      derselbe öffentliche Schlüssel neu eingetragen werden – GitHub lässt das
      nicht nachträglich ändern. Den öffentlichen Schlüssel hat Niklas; falls
      du Zugriff auf die Repository-Einstellungen hast, **kannst du das Löschen
      schon vorbereiten**, das Neueintragen geht dann im Call in 30 Sekunden.
- [ ] **Ist `main` geschützt** (Pull-Request-Pflicht)? Dann wird der Push des
      Datenlaufs abgewiesen. Entweder die Regel lockern oder bei
      `WHEELEE_AUTO_PUSH=0` bleiben (siehe Schritt 3).

---

## Mit Niklas

### 0. Voraussetzungen zeigen lassen (1 Minute)

```bash
git -C /opt/wheelee remote -v
docker ps
systemctl status wheelee-webhook --no-pager
```

Notieren, ob die Adresse `git@github.com:…` (SSH) oder `https://…` ist – davon
hängt Schritt 2 ab.

### 1. Arbeitsverzeichnis und Trockenlauf **starten** (läuft im Hintergrund)

```bash
sudo mkdir -p /var/lib/wheelee-update
sudo chown niklas:niklas /var/lib/wheelee-update
```

```bash
sudo -u niklas env WHEELEE_TROCKEN=1 sh /opt/wheelee/deploy/wheelee-aktualitaet.sh
```

Das dauert beim ersten Mal einige Minuten (`npm install`, rund 600 MB).
**Währenddessen Schritt 2 und 4 erledigen.** Erwartet am Ende: eine Zeile
`N amtliche Stadt/Städte fällig: …` und `Trockenlauf: nichts geändert, nichts
gepusht.`

### 2. Schreibrecht für das Repository

- **SSH:** öffentlichen Schlüssel ausgeben lassen und in GitHub unter Deploy
  keys **mit** „Allow write access" eintragen:
  ```bash
  cat ~/.ssh/*.pub
  ```
- **HTTPS:** Token mit Schreibrecht in die Git-Zugangsdaten des Benutzers,
  nicht ins Repository und nicht in die `.service`.

### 3. Echter Lauf ohne Push, dann Push prüfen

```bash
sudo -u niklas env WHEELEE_AUTO_PUSH=0 sh /opt/wheelee/deploy/wheelee-aktualitaet.sh
```

```bash
cd /var/lib/wheelee-update/repo
git diff --stat origin/main daten-update
cat data/_auto-update.md
git push --dry-run origin HEAD:main
```

„Keine Änderung an den Standortdaten" ist ein gültiges Ergebnis. Dass Köln
verworfen wird, ist erwartet (der Dienst der Stadt ist kaputt) und ein guter
Test der Notbremse.

### 4. Admin-Konto anlegen

**Erst wenn Schritt 1 durch ist** (der Klon muss `node_modules` haben).

```bash
docker volume ls | grep wheelee-data
```

```bash
read -rs -p "Startpasswort: " WHEELEE_START_PASSWORD; echo; export WHEELEE_START_PASSWORD
```

```bash
docker run --rm --user 1001:1001 -e HOME=/tmp -e WHEELEE_DB_PATH=/app/var/wheelee.sqlite -e WHEELEE_START_PASSWORD -v <NAME-DES-VOLUMES>:/app/var -v /var/lib/wheelee-update/repo:/work -w /work node:24-alpine npx tsx scripts/create-admin.mts --username Torsten --email <ADRESSE>
```

```bash
unset WHEELEE_START_PASSWORD
```

**Sofort danach** auf <https://wheelee.de> mit `Torsten` und dem Startpasswort
anmelden und ein eigenes Passwort setzen – vorher gibt das Konto keine
Verwaltungsrechte (18.7). Gegenprobe:

```bash
docker exec wheelee node -e "const {DatabaseSync}=require('node:sqlite');console.log(new DatabaseSync(process.env.WHEELEE_DB_PATH).prepare('SELECT email,username,role FROM account').all())"
```

**Stehen in `ADMIN_EMAILS` Adressen ohne eigenes Konto, jetzt entfernen.**

### 5. Beide Timer einschalten

```bash
sudo cp /opt/wheelee/deploy/wheelee-aktualitaet.{service,timer} /etc/systemd/system/
sudo cp /opt/wheelee/deploy/wheelee-sicherung.{service,timer} /etc/systemd/system/
sudo systemctl daemon-reload
```

In beiden `.service`-Dateien `User=`/`Group=` prüfen (wie beim Webhook).

```bash
sudo systemctl enable --now wheelee-aktualitaet.timer wheelee-sicherung.timer
systemctl list-timers 'wheelee-*'
```

Beide einmal von Hand starten, solange ihr zusammen davorsitzt:

```bash
sudo systemctl start wheelee-sicherung.service
sudo systemctl start wheelee-aktualitaet.service
journalctl -u wheelee-aktualitaet -f
```

Prüfen, dass eine Sicherung entstanden ist:

```bash
docker run --rm -v <NAME-DES-VOLUMES>:/app/var alpine ls -l /app/var/sicherung
```

### 6. Nur falls in der Vorbereitung ein „Angabe fehlt" auftauchte

`WHEELEE_OPERATOR_NAME`, `WHEELEE_OPERATOR_ADDRESS`, `WHEELEE_OPERATOR_EMAIL`
in `/opt/wheelee/.env` ergänzen (Vorlage: `deploy/env.beispiel`), dann
`docker compose up -d`. **Die Anschrift gehört nicht ins Repository** – sie
bliebe in der Git-Historie stehen.

---

## Danach allein, ohne Niklas

- **SMTP einrichten**, wann du willst: anmelden → Reiter **Rückmeldungen** →
  ganz unten **Mailversand**. Server, Port, Benutzer, Passwort,
  Absenderadresse, Adresse der App (`https://wheelee.de`) und der
  Versanddienstleister für die Datenschutzerklärung. Dann **Testmail an mich** –
  sie geht immer an die eigene Adresse. Ein Fehler des Servers („535
  Authentifizierung fehlgeschlagen") steht im Klartext da.
  **Die `.env` wird dafür nicht mehr gebraucht** (10.22); stehen dort noch
  SMTP-Variablen, gewinnt trotzdem, was auf der Seite gespeichert ist, und die
  Seite sagt das an.
- **Google Search Console** (19.13): Eigentum bestätigen, Sitemap einreichen.
  Braucht nur dein Google-Konto und den Registrar.
- **OSM-Hinweise zurückmelden** (19.5), Liste in `data/_validierung.md`.

---

## Was offen bleibt und Niklas **nicht** braucht

Bochum und Köln (2d.8a) – dort fehlt ein Bezugsweg für die Daten, kein Zugang.
