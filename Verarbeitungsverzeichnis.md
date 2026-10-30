# Verzeichnis von Verarbeitungstätigkeiten – wheelee

Nach Art. 30 DSGVO. **Entwurf vom 2026-10-29, aus dem Code abgeleitet** (nicht
von jemandem geprüft, der das beurteilen darf). Die Ausnahme für kleine Betriebe
(Art. 30 Abs. 5) greift voraussichtlich nicht, weil die Verarbeitung nicht nur
gelegentlich stattfindet; ein Verzeichnis ist daher zu führen. Die Angaben zum
Verantwortlichen stehen im Impressum der Seite (kommen aus der Umgebung, nicht
aus dem Repository).

Die Datenschutzerklärung (`src/app/datenschutz/page.tsx`) richtet sich an die
Betroffenen; dieses Verzeichnis ist die interne Fassung. Weicht eines vom
anderen ab, stimmt eines nicht.

## Verarbeitungstätigkeiten

| # | Tätigkeit | Zweck | Betroffene | Daten | Rechtsgrundlage | Speicherdauer | Empfänger |
| - | --------- | ----- | ---------- | ----- | --------------- | ------------- | --------- |
| 1 | Bereitstellung der App (Karte, Liste, Suche) | Parkplätze anzeigen | Besucher:innen | IP-Adresse beim Aufruf (nur flüchtig, siehe 6), gerundeter Bezugspunkt der Zielsuche (nicht gespeichert) | Art. 6 (1) f | nicht gespeichert | – |
| 2 | Kartenkacheln | Karte darstellen | Besucher:innen | IP-Adresse und Kartenausschnitt, **vom Browser direkt an die OpenStreetMap Foundation** | Art. 6 (1) f | beim Anbieter | OpenStreetMap Foundation (Vereinigtes Königreich) und deren Auslieferungspartner |
| 3 | Konto | Anmeldung, zurechenbare Funktionen | Kontoinhaber:innen | E-Mail-Adresse, Passwort als scrypt-Hash, Anlage- und Anmeldezeit, Karten-App, Sprache, Rolle, Sperre | Art. 6 (1) b | bis zur Löschung durch die Person | – |
| 4 | Bewertungen, gespeicherte Parkplätze | Datenqualität, Komfort | Kontoinhaber:innen | Parkplatz-ID, Stimme, Zeitpunkt | Art. 6 (1) b | bis Rücknahme oder Kontolöschung | – |
| 5 | Rückmeldungen | Fehler und Vorschläge | Einsender:innen | Text, Parkplatz, freiwillig Antwortadresse, Browserkennung, gekürzter Hash einer Zufallszahl | Art. 6 (1) f; Adresse: Art. 6 (1) a (freiwillig) | erledigt: 12 Monate nach Erledigung; offen: bis Bearbeitung, Adresse höchstens 2 Jahre | Administrator:innen |
| 6 | Betriebsprotokoll und Drosselung | Fehler finden, Missbrauch bremsen | Besucher:innen | JSON-Zeile je Vorfall **ohne IP, Standort, Parameterwerte, Adressen, Texte**; IP nur im Arbeitsspeicher für die Drosselung | Art. 6 (1) f | Container-Protokoll, rotiert bei 10 MB über 3 Dateien; Arbeitsspeicher nur im Fenster der Drosselung | – |
| 7 | Verwaltung und Einladungen | Konten verwalten | Admin-Konten, eingeladene Personen | E-Mail-Adresse, Rolle, Token als Hash | Art. 6 (1) f | Einladung 7 Tage gültig, 30 Tage sichtbar, dann gelöscht | – |
| 8 | Mail-Links (nur bei eingeschaltetem Versand) | Adresse bestätigen (nach der Registrierung), „Passwort vergessen“, „E-Mail ändern“ | Kontoinhaber:innen | E-Mail-Adresse (bei Wechsel auch die neue), Token als Hash | Art. 6 (1) b | Token 1 Stunde, danach gelöscht | Mailanbieter (Art. 28, **Vertrag und Anbieter vom Betreiber einzutragen**) |
| 10 | Besucherzählung (ToDo 20.1) | Nutzung einschätzen | Besucher:innen | IP-Adresse und Browserkennung nur als **Tages-Hash im Arbeitsspeicher** (Salz je Tag, nie gespeichert); in der Datenbank nur Summen je Tag (`visit_day`) | Art. 6 (1) f | Hashes bis Tagesende bzw. Neustart; Summen unbegrenzt (keine Personenbeziehbarkeit) | Administrator:innen sehen die Summen |
| 9 | Sicherung | Datenverlust vermeiden | Kontoinhaber:innen, Einsender:innen | Kopie der Datenbank (`VACUUM INTO`) | Art. 6 (1) f | bis zur Rotation der Sicherungen auf dem NAS | – |

## Besondere Kategorien (Art. 9)

Die App fragt **nicht** nach einer Behinderung oder einem Parkausweis. Dass
jemand Behindertenparkplätze als Favoriten speichert oder bewertet, kann
trotzdem Rückschlüsse auf die Gesundheit zulassen. **Offene Rechtsfrage, nicht
beantwortet**: ob das so zu behandeln ist und ob eine ausdrückliche Einwilligung
bei der Registrierung nötig wird. ToDo 10.17 wurde am 2026-10-30 auf Anweisung
als erledigt geführt, **ohne dass eine rechtliche Prüfung stattfand** (Eintrag
in `Erledigt.md`).

## Technische und organisatorische Maßnahmen (Art. 32)

- **Zugriff:** Verwaltung nur mit Administratorrolle in der Datenbank; `ADMIN_EMAILS` hebt beim Start einmalig vorhandene Konten dorthin (ToDo 10.19). Ohne Admin-Konto hat niemand Zugriff auf Rückmeldungen. Das letzte aktive Admin-Konto lässt sich nicht entziehen oder löschen.
- **Passwörter:** scrypt, Kosten im Hash; Mindestlänge und Obergrenze (`password-rules.ts`); Anmeldedrosselung je Herkunft und je Herkunft+Adresse sowie Wartezeit nach Fehlversuchen je Adresse (auch bei falschem Passwort in „Passwort ändern“/„Konto löschen“); scrypt bei der Anmeldung asynchron, höchstens zwei gleichzeitig. Offene Mail-Links verfallen bei Passwort- und Adresswechsel; beim Löschen eines Kontos entfallen auch dessen Einladungszeilen.
- **Sitzungen und Links:** 256-Bit-Zufall, in der Datenbank nur der SHA-256; Sitzungen 30 Tage, Mail-Links 1 Stunde, einmal einlösbar; Cookie `HttpOnly`, `SameSite=Lax`, `Secure` in Produktion.
- **Transport:** TLS am vorgeschalteten Proxy; die App selbst ist nur über Tailscale erreichbar, kein offener Port am Heimanschluss.
- **Browserschutz:** CSP mit Nonce je Anfrage, Sicherheits-Kopfzeilen (`next.config.ts`, `e2e/sicherheit.spec.ts`); Prüfung von Herkunft und Inhaltstyp bei schreibenden Anfragen.
- **Datensparsamkeit:** Standort bleibt im Browser; IP nicht gespeichert und nicht protokolliert; Protokolle ohne Parameterwerte.
- **Löschen:** automatisch (`cleanup.ts`), und auf Anforderung (Konto löschen, Auskunft als JSON).
- **Verfügbarkeit:** Datenbank im WAL-Modus, konsistente Sicherung bei laufender App.

## Meldung von Verletzungen (Art. 33, 34)

Bei einer Verletzung des Schutzes personenbezogener Daten (Datenbank
abgeflossen, Konto-Übernahme in größerem Umfang, Fehlkonfiguration, die
Rückmeldungen offenlegt) meldet der Verantwortliche **binnen 72 Stunden** nach
Bekanntwerden an die zuständige Aufsichtsbehörde (Art. 33), es sei denn, ein
Risiko für die Betroffenen ist unwahrscheinlich. Besteht ein hohes Risiko,
werden die Betroffenen unverzüglich benachrichtigt (Art. 34). Ablauf:

1. Zeitpunkt des Bekanntwerdens festhalten.
2. Eindämmen: betroffene Sitzungen beenden (`DELETE FROM session`), Passwörter zurücksetzen lassen, Zugänge sperren.
3. Umfang klären: Welche Tabellen, welche Zeiträume (Sicherungen, `docker logs`).
4. Bewerten und melden, Entscheidung und Begründung schriftlich festhalten (auch wenn nicht gemeldet wird).
5. Ursache beheben, in `Erledigt.md` festhalten.

## Datenschutz-Folgenabschätzung (Art. 35)

Eine Folgenabschätzung ist voraussichtlich nicht nötig (kein Profiling, keine
umfangreiche Verarbeitung besonderer Kategorien, keine systematische
Überwachung). Das hängt an der Antwort auf die Frage zu Art. 9 oben und gehört
mit ihr zusammen beurteilt.
