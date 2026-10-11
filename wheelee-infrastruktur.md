# wheelee.de auf nfnas – Infrastruktur-Briefing für Torsten

> Zweck: Torsten (und seine KI) sollen verstehen, **wie VPS und NAS hier
> zusammenspielen**, bevor Deploy und Webhook geplant werden.
> Stand: 2026-10-11. Quellen: [../NAS.md](../NAS.md), [../TOOL_HINZUFUEGEN.md](../TOOL_HINZUFUEGEN.md).

---

## 1. Zwei Maschinen, klare Rollenteilung

|                | **Strato-VPS**                                                                                                    | **nfnas** (UGREEN DXP2800, Debian 13)                                                                    |
| -------------- | ----------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Öffentliche IP | `212.227.160.5`                                                                                                   | **keine** – hängt hinter einer FritzBox                                                                  |
| Tailscale-IP   | `100.95.158.12` (`strato-vps`)                                                                                    | `100.71.71.105` (`nfnas`)                                                                                |
| LAN            | –                                                                                                                 | `192.168.178.158`                                                                                        |
| Rolle          | **Eingangstür**: Nginx Proxy Manager (Ports 80/81/443), Let's-Encrypt-Zertifikate, Authelia (SSO), Beszel, nfntfy | **Rechenzentrum**: alle Anwendungen laufen hier, je Tool ein eigenes Compose-Projekt unter `/opt/<tool>` |
| Ressourcen     | knapp (RAM ~330 MB frei)                                                                                          | Intel N100, 32 GB RAM, 3,6 TiB btrfs-RAID1 auf `/srv/pool`                                               |

**Merksatz:** Alles Neue läuft auf dem NAS. Der VPS terminiert nur TLS und
proxyt weiter. Auf dem VPS wird nichts mehr deployt.

---

## 2. Der Weg eines Requests

```
Browser → DNS (wheelee.de → 212.227.160.5)
        → VPS: Nginx Proxy Manager, TLS-Terminierung
        → Tailscale-Tunnel (WireGuard, direkt über IPv6, kein Relay)
        → NAS: 100.71.71.105:<port> → Container
```

Der Tunnel wird **vom NAS ausgehend** aufgebaut. **Es gibt keine Portfreigabe im
Router und keinen offenen Port am Heimanschluss** – das ist bewusst so und bleibt so.

---

## 3. Harte Konventionen auf dem NAS

1. **Port wird an die Tailscale-Adresse gebunden, nie an `0.0.0.0`:**
   ```yaml
   ports:
     - "100.71.71.105:3015:3000" # links Tailscale+Hostport, rechts Containerport
   ```
   Gegenprobe muss **fehlschlagen**: `curl http://192.168.178.158:3015`
   Damit ist die App ausschließlich durch den Tunnel erreichbar – nicht aus dem
   Heimnetz, nicht aus dem Internet.
2. **Keine `networks: [npm]`-Blöcke.** Das NPM-Docker-Netz existiert nur auf dem
   VPS. Forward-Ziel ist deshalb immer `100.71.71.105:<port>`, **nie ein
   Container-Name**.
3. **Portvergabe fortlaufend**, Liste in [../NAS.md](../NAS.md) Abschnitt 9.
   Belegt: 3000–3011, 3014. Reserviert: 3012/3013 (nfcode).
   → **wheelee bekommt Port `3015`.**
4. Verzeichnis: `/opt/wheelee`, Container-Name `nfhub-wheelee` oder `wheelee`.
   Daten in einem **Docker-Volume**, nicht im Bind-Mount – wegen Backup-Schema.

---

## 4. wheelee.de ist eine _eigene_ Domain, nicht `*.nfhub.de`

Das ist der wichtigste Unterschied zu allen bisherigen Tools:

- **Authelia greift nicht.** Die SSO-Regel lautet `*.nfhub.de → one_factor`.
  `wheelee.de` fällt nicht darunter. Wheelee braucht also **seinen eigenen Login**
  (so wie nfcloud, nfmail und nftravel es auch machen) – im NPM bleibt der
  _Advanced_-Tab leer („öffentlich", Variante 3b in
  [../TOOL_HINZUFUEGEN.md](../TOOL_HINZUFUEGEN.md)).
- **Eigenes Zertifikat.** NPM holt pro Proxy Host ein Let's-Encrypt-Zertifikat;
  für `wheelee.de` **und** `www.wheelee.de` beide Namen in denselben Host eintragen.
- **DNS muss vor dem Zertifikat stehen.** A-Record `@` und `www` auf
  `212.227.160.5`. Kein CNAME auf die Root, **keinen Parkeintrag / keine
  Weiterleitung des Registrars stehen lassen** – das blockiert die ACME-Challenge
  zuverlässig. Bei Fehlversuchen greift ein Let's-Encrypt-Rate-Limit (1 h warten).
- IPv6: **kein AAAA-Record**, solange der VPS nicht nachweislich auf v6 Port 80/443
  annimmt. Ein AAAA, das nicht antwortet, bricht sowohl Zertifikat als auch Zugriff.

---

## 5. Wer macht was

| Aufgabe                                                                | Wer                                                     |
| ---------------------------------------------------------------------- | ------------------------------------------------------- |
| DNS bei Torstens Registrar setzen (`@`, `www` → `212.227.160.5`)       | **Torsten**                                             |
| Proxy Host im NPM (`http://212.227.160.5:81`) anlegen, SSL + Force SSL | **Niklas** (NPM-Zugang ist nicht geteilt)               |
| `/opt/wheelee` anlegen, Repo klonen, `docker compose up -d --build`    | **Niklas** am NAS, bis Torsten einen eigenen Zugang hat |
| Webhook-Endpunkt + Deploy-Skript                                       | gemeinsam, siehe unten                                  |
| Kachel auf `nfhub.de` (Homepage)                                       | **Niklas**, optional                                    |

Torsten hat **keinen** SSH-Zugang zum NAS und **keinen** NPM-Zugang. Wenn er selbst
deployen soll, ist der Webhook genau der richtige Weg – oder ein eigener
Benutzer auf dem NAS mit Rechten nur auf `/opt/wheelee`.

---

## 6. Push-to-Deploy: wo der Webhook hängen muss

Der GitHub-Webhook kommt **aus dem Internet** und muss daher am VPS landen – das
NAS ist von außen nicht erreichbar. Zwei brauchbare Varianten:

**A) Webhook-Empfänger auf dem NAS, über NPM veröffentlicht** _(empfohlen)_
`deploy.wheelee.de` oder ein Pfad wie `wheelee.de/_hook` → NPM → `100.71.71.105:3016`
→ kleiner Listener (z. B. `adnanh/webhook`), der bei validierter Signatur
`git pull && docker compose up -d --build` in `/opt/wheelee` ausführt.

- GitHub-Secret (`X-Hub-Signature-256`) **zwingend** prüfen.
- Nur `refs/heads/main` akzeptieren.
- Der Listener braucht Zugriff auf den Docker-Socket oder ruft per SSH-Key ein
  Skript auf dem Host – beides ist mächtig, also eng halten.

**B) Pull statt Push** – kein offener Endpunkt
Ein systemd-Timer auf dem NAS prüft minütlich `git ls-remote` auf eine neue
`main`-Commit-ID und baut nur bei Änderung neu.

- Deutlich kleinere Angriffsfläche, kein Secret, kein Port, keine Subdomain.
- Verzögerung bis ~1 min. Für unsere Zwecke meist völlig ausreichend.

Erst wenn die Variante entschieden ist, lohnt es, Schritte zu schreiben.

---

## 7. Was Torsten vorab klären sollte

1. **Repo**: GitHub, öffentlich oder privat? Privat → Deploy-Key auf dem NAS nötig.
2. **Stack**: Node/Python/…? Gibt es ein `Dockerfile` und ein `docker-compose.yml`?
   Beides erwarten wir – gebaut wird auf dem NAS (`--build`), kein Registry-Push.
3. **Interner Port** der App im Container (üblich hier: `3000`).
4. **Persistenz**: Datenbank? SQLite in einem Volume ist das Hausmuster.
   Postgres/MySQL als eigener Container im selben Compose-Projekt.
5. **Secrets**: `.env` liegt **nur auf dem NAS**, nie im Repo (`.gitignore`).
   Ein `git pull`-Deploy darf sie nicht überschreiben.
6. **Login**: eigener Benutzer-/Einladungsmechanismus, da Authelia nicht greift (s. 4).
7. **Mail** (Registrierung, Passwort-Reset)? Dann klären, ob der nfmail-Server
   genutzt werden darf.

---

## 8. Kurz-Checkliste des fertigen Zustands

- [ ] `wheelee.de` + `www` → `212.227.160.5`, kein Parkeintrag
- [ ] `/opt/wheelee` auf dem NAS, Container läuft, Port `100.71.71.105:3015`
- [ ] `curl http://192.168.178.158:3015` schlägt fehl (Bindung korrekt)
- [ ] NPM-Proxy-Host mit Zertifikat, Force SSL, Advanced leer
- [ ] `curl -s -o /dev/null -w '%{http_code}' http://wheelee.de` liefert `301`
- [ ] Webhook bzw. Timer deployt nachweislich einen Testcommit
- [ ] Eintrag in [../NAS.md](../NAS.md) Abschnitt 9 + [../TOOL_HINZUFUEGEN.md](../TOOL_HINZUFUEGEN.md) ergänzt,
      nächster freier Port dort auf `3016` (bzw. `3017`) hochgezogen
- [ ] Monitor in nfuptime (`status.nfhub.de`)
