# Mailversand über GMX einrichten

Für Torsten, ohne Zugang zum NAS. Dauert fünf Minuten, davon vier bei GMX.

Gebraucht wird das für „Passwort vergessen“, das Ändern der E-Mail-Adresse,
die Bestätigung neuer Konten – und für die **Benachrichtigung bei neuer
Rückmeldung** (ToDo 17.9).

---

## 1. Bei GMX den Versand freischalten

GMX lässt Programme nur senden, wenn der Zugriff ausdrücklich erlaubt ist.
**Einmalig im Browser bei <https://www.gmx.net>:**

1. **Einstellungen → POP3/IMAP Abruf** öffnen.
2. **„POP3 und IMAP Zugriff erlauben“** einschalten und speichern.

Das ist auch dann nötig, wenn nur gesendet werden soll – der Schalter gibt bei
GMX beides zusammen frei. Eingehende Mails holt wheelee nicht ab; das Postfach
bleibt also unberührt.

**Falls das Konto Zwei-Faktor-Schutz hat:** Dann funktioniert das normale
Passwort hier nicht, und es braucht unter **Sicherheit → Anwendungsspezifische
Passwörter** ein eigenes Passwort für wheelee. Das ist ohnehin die bessere
Wahl, weil es sich einzeln zurückziehen lässt, ohne das Hauptpasswort zu
ändern.

---

## 2. In wheelee eintragen

Anmelden → Reiter **Rückmeldungen** → ganz unten **Mailversand**:

| Feld | Wert |
| --- | --- |
| SMTP-Server | `mail.gmx.net` |
| Port | `587` |
| TLS von Anfang an | **aus** (Port 587 verschlüsselt per STARTTLS) |
| Benutzer | die vollständige GMX-Adresse, z. B. `name@gmx.de` |
| Passwort | das GMX-Passwort (oder das anwendungsspezifische aus Schritt 1) |
| Absenderadresse | **dieselbe** GMX-Adresse |
| Adresse der App | `https://wheelee.de` |
| Benachrichtigung bei neuer Rückmeldung an | leer lassen – dann geht sie an **alle Admin-Konten**. Eine Adresse hier schickt sie stattdessen nur dorthin |
| Versanddienstleister | `1&1 Mail & Media GmbH, Montabaur, Deutschland` – und dahinter der Stand des Auftragsverarbeitungsvertrags |
| Versand einschalten | **an** |

Dann **Speichern** und **Testmail an mich**. Sie geht immer an die Adresse des
angemeldeten Kontos.

**Alternative zu Port 587:** `465` mit „TLS von Anfang an“ **an**. Beides geht;
587 ist das heute übliche.

---

## 3. Die Absenderadresse muss die GMX-Adresse sein

GMX nimmt keine Mail an, deren Absender ein anderes Postfach nennt
(„Absenderadresse nicht erlaubt“, Fehler 550). Wer `noreply@wheelee.de` als
Absender einträgt, bekommt deshalb keinen Versand – auch wenn die Domain ihm
gehört. Ein sprechender Name davor ist erlaubt:

```
wheelee <name@gmx.de>
```

---

## 4. Was die Benachrichtigung tut

Sobald jemand einen Fehler oder einen Vorschlag einträgt, geht sofort eine Mail
an die eingetragene Adresse:

| Art der Meldung | Betreff |
| --- | --- |
| Fehler | `Wheelee Fehler` |
| Verbesserungsvorschlag | `Wheelee Verbesserungsvorschlag` |

Im Text stehen die Meldung selbst, Stadt und Parkplatz (falls angegeben) und
die freiwillige Antwortadresse – oder ausdrücklich, dass keine angegeben wurde.
Die Betreffzeilen sind fest und deutsch, damit sich im Postfach eine Regel
darauf bauen lässt; sie ändern sich nicht mit der eingestellten Sprache.

**Leeres Feld = an alle Admin-Konten** (seit 17.11). Vorher hieß leer „keine
Benachrichtigung", und genau das ist am 2026-11-08 passiert: Der Versand war
eingerichtet, die Testmail kam an – die geht nämlich an das **angemeldete
Konto** – und bei echten Meldungen ging trotzdem nichts hinaus. Wer die
Benachrichtigung auf eine einzige Adresse lenken will, trägt sie hier ein.

**Ob eine Mail hinausging, steht im Protokoll:**

```bash
docker logs wheelee --since 10m | findstr feedback_notify
```

**Der Versand scheitert nie nach außen:** Die Meldung ist gespeichert, bevor
die Mail losgeht. Ein kaputtes Postfach darf keine Rückmeldung verhindern – wer
gerade vor einem aufgehobenen Parkplatz steht, soll nicht an unserem
Mailserver scheitern. Umgekehrt heißt das: Kommt keine Mail, ist die Meldung
trotzdem da und steht im Reiter „Rückmeldungen“.

---

## 5. Grenzen von GMX

- **Versandgrenze.** GMX begrenzt die Zahl der Mails je Tag (Größenordnung
  einige Hundert bei einem Freimail-Konto). Für wheelee reicht das bei Weitem;
  es sei denn, die Rückmeldungen gehen in die Hunderte – dann ist die Grenze
  ein Luxusproblem.
- **Der Absender ist sichtbar.** Jede Mail nennt die GMX-Adresse; wer
  antwortet, schreibt dorthin. Da keine Mails abgeholt werden, sollte in das
  Postfach trotzdem gelegentlich jemand hineinsehen – oder es leitet auf die
  Hauptadresse weiter.
- **Datenschutz:** 1&1 Mail & Media ist damit Auftragsverarbeiter nach Art. 28
  DSGVO. Deshalb das Feld „Versanddienstleister“: Was dort steht, nennt die
  Datenschutzerklärung. Bleibt es leer, steht dort bei eingeschaltetem Versand
  ein sichtbarer Mangel statt eines erfundenen Namens.

---

## Wenn es nicht geht

Die Testmail zeigt den Fehler des Servers im Klartext.

| Meldung | Bedeutung |
| --- | --- |
| `535 Authentication failed` | Benutzer oder Passwort falsch – oder POP3/IMAP (Schritt 1) nicht freigeschaltet |
| `550 … sender address` | Absenderadresse ist nicht die GMX-Adresse (Schritt 3) |
| `Timeout` / `ECONNREFUSED` | Port oder Server falsch, oder der Container kommt nicht ins Netz |
| `self signed certificate` | „TLS von Anfang an“ passt nicht zum Port: 587 aus, 465 an |
