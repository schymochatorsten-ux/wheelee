# Bekanntmachen – Anschreiben und Adressen

Arbeitsmaterial zu Abschnitt 21 in [ToDos.md](ToDos.md). **Geschrieben wird
von Torsten**, von `wheelee@gmx.net`; hier stehen nur Entwurf und Adressen.
Was beantwortet wurde, gehört nach [Erledigt.md](Erledigt.md).

---

## Was überhaupt verschickt wird

Drei Dinge, die nicht durcheinandergeraten sollten:

1. **Das einmalige Anschreiben** (unten). Eine Mail je Verband, von Hand,
   keine Serie und kein Newsletter. Es gibt nichts zu abonnieren, und wir
   melden uns danach nur, wenn jemand antwortet.
2. **Antworten auf Rückmeldungen.** Wer im Rückmeldefenster freiwillig eine
   Adresse hinterlässt, kann eine Antwort bekommen – **von Hand**, aus dem
   Postfach. Die Adresse steht in der Benachrichtigung, die die App an
   `wheelee@gmx.net` schickt („Antwort an: …“). Ohne Adresse gibt es keine
   Antwort, und das Formular sagt das auch so.
3. **Was die App selbst verschickt**, ohne Zutun: Bestätigungsmail bei der
   Registrierung, Link zum Zurücksetzen des Passworts, Bestätigung beim
   Ändern der E-Mail-Adresse – und die Benachrichtigung an dich, wenn eine
   neue Rückmeldung eingeht. Mehr nicht.

**Eine Mail „dein Fehler ist behoben“ gibt es nicht**, auch nicht
automatisch. Wer eine Adresse hinterlassen hat, bekommt eine Antwort von
Hand; alle anderen sehen die Berichtigung nur in der App. Das ist eine
bewusste Lücke, keine vergessene: Ein automatischer Versand bräuchte eine
Adresse zu jeder Meldung, und die wollten wir nicht verlangen.

---

## Entwurf: Anschreiben an einen Verband

> **Betreff:** wheelee – eine kostenlose Karte der Behindertenparkplätze in Deutschland
>
> Sehr geehrte Damen und Herren,
>
> ich habe eine Website gebaut, die öffentliche Behindertenparkplätze auf
> einer Karte zeigt: **wheelee.de**. Sie ist kostenlos, werbefrei und ohne
> Anmeldung nutzbar; der Standort wird im Browser berechnet und nicht
> übertragen. Wer die Seite öffnet, sieht den nächstgelegenen Parkplatz mit
> Entfernung und kann die Route in Google Maps oder Apple Karten starten.
>
> Die Daten stammen aus amtlichen Listen der Städte und aus OpenStreetMap –
> derzeit rund 38.000 Standorte in etwa 3.760 Gemeinden. Was davon woher
> kommt und wie vollständig es ist, steht offen auf wheelee.de/abdeckung.
>
> Zwei Bitten:
>
> 1. Wenn Sie die Seite für nützlich halten, würde ich mich über einen
>    Hinweis in Ihrer Mitgliederzeitschrift, im Newsletter oder auf Ihrer
>    Website freuen.
> 2. Wichtiger noch: **Rückmeldungen zu falschen Daten.** Ihre Mitglieder
>    merken sofort, wenn ein Parkplatz nicht mehr existiert oder einer fehlt.
>    In der App lässt sich das mit zwei Tipps melden, ohne Konto und ohne
>    E-Mail-Adresse. Jede Meldung wird gelesen.
>
> Das Projekt ist unentgeltlich und privat. Es verkauft keine Daten, zeigt
> keine Werbung und wird auch nichts kosten – weder für Ihre Mitglieder noch
> für Sie.
>
> Über eine Rückmeldung freue ich mich.
>
> Mit freundlichen Grüßen
> Torsten Schymocha
> wheelee@gmx.net · wheelee.de

**Was an dem Entwurf Absicht ist:** Die Zahlen stehen drin, aber mit dem
Verweis auf `/abdeckung` – wer nachsehen will, kann es. Die zweite Bitte
steht hinter der ersten und ist als die wichtigere benannt; sie ist das, was
dem Bestand wirklich hilft. Kein Dank im Voraus, keine Superlative, keine
Bitte um ein Treffen: Eine Mail, die nur eine einzige Entscheidung verlangt,
wird eher beantwortet.

**Vor dem Abschicken prüfen:** Stimmen die Zahlen noch
(`npm run report:abdeckung`, dann `data/_abdeckung.md`)? Steht die
Kontaktadresse auf der Seite (ToDo 21.0)?

### Abwandlung für Verwaltungen und Politik (21.2)

Dasselbe Anschreiben, aber **ein Anliegen weniger und ein anderes dazu**:
Statt der Bitte um einen Hinweis in der Mitgliederzeitschrift die Bitte um
die **amtliche Liste der Behindertenparkplätze als offene Daten** (Datei,
WFS oder Download-Link, mit Lizenzangabe). Die beiden Anliegen gehören nicht
in dieselbe Mail: Das eine ist Öffentlichkeitsarbeit, das andere eine
Datenanfrage, und die Zuständigen dafür sind verschiedene Leute. Die
Fassung für Straßenverkehrsbehörden steht schon – sie ist am 2026-11-11 an
Heidelberg gegangen, Wortlaut in [Erledigt.md](Erledigt.md) unter 2d.8a.

---

## Adressen (Bundesebene)

Alle am 2026-11-12 im Impressum bzw. auf der Kontaktseite der jeweiligen
Organisation gelesen – **nicht** aus einer Suchzusammenfassung übernommen
(Lehre aus 2a.5).

| Organisation                                                                    | E-Mail                           | Anschrift                               | Quelle                                     |
| ------------------------------------------------------------------------------- | -------------------------------- | --------------------------------------- | ------------------------------------------ |
| Sozialverband VdK Deutschland e. V.                                             | kontakt@vdk.de                   | Linienstraße 131, 10115 Berlin          | vdk.de/impressum/                          |
| Sozialverband Deutschland e. V. (SoVD)                                          | kontakt@sovd.de                  | Stralauer Straße 63, 10179 Berlin       | sovd.de/impressum                          |
| Bundesverband Selbsthilfe Körperbehinderter                                     | info@bsk-ev.org                  | Altkrautheimer Str. 20, 74238 Krautheim | bsk-ev.org/impressum-datenschutz/impressum |
| Bundesvereinigung Lebenshilfe e. V.                                             | bundesvereinigung@lebenshilfe.de | Raiffeisenstraße 18, 35043 Marburg      | lebenshilfe.de/impressum                   |
| Beauftragter der Bundesregierung für die Belange von Menschen mit Behinderungen | buero@behindertenbeauftragter.de | Mauerstraße 53, 10117 Berlin            | behindertenbeauftragter.de, Kontakt        |

**Die SoVD-Adresse steht dort als `kontakt(at)sovd.de`** – die Schreibweise
ist Spamschutz, gemeint ist `kontakt@sovd.de`.

**Landes- und Kreisverbände kommen später.** VdK und SoVD haben je ein
Dutzend Landesverbände und Hunderte Kreisverbände; die sind näher an den
Mitgliedern und damit an den Rückmeldungen, aber sie anzuschreiben lohnt erst,
wenn der Text sich bewährt hat. Dasselbe gilt für die örtlichen
Behindertenbeiräte.

---

## Reihenfolge (21.4)

Erst **einen** Verband anschreiben, Antwort abwarten, den Text danach ändern.
Eine Rundmail an fünfzig Adressen, die niemand beantworten kann, verbrennt
genau die Kontakte, auf die es ankommt. Mein Vorschlag für den ersten: **VdK**
– größter Verband, eigene Mitgliederzeitschrift, und Barrierefreiheit im
Verkehr ist dort gerade Thema.
