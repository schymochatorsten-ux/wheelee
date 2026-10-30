import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, MissingOperator } from "@/components/LegalPage";
import { operator } from "@/lib/legal/operator";
import { mailConfigured } from "@/lib/mail";

/**
 * Datenschutzerklärung (ToDo 10.2).
 *
 * **Jede Aussage hier ist im Quelltext belegt**, und das ist der eigentliche
 * Anspruch dieser Seite. Eine Datenschutzerklärung aus einem Generator nennt
 * typischerweise Dinge, die es in dieser App nicht gibt (Analysedienste,
 * Server-Logfiles mit IP-Adresse, Kontaktformular per Mail) und verschweigt
 * das eine, was es wirklich gibt: den Abruf der Kartenkacheln.
 *
 * Wo etwas steht, falls es jemand nachprüfen will:
 *
 * | Aussage                     | Beleg                                      |
 * | --------------------------- | ------------------------------------------ |
 * | ein Cookie, erst nach Login | `lib/auth/session.ts`, `e2e/datenschutz`   |
 * | Standort bleibt im Browser  | `hooks/useGeolocation.ts`, `e2e/datenschutz` |
 * | gespeicherte Felder         | `lib/db/sqlite.ts` (`MIGRATIONS`)          |
 * | Löschfristen                | `lib/db/cleanup.ts`                        |
 * | Konto löschen, Auskunft     | `lib/db/accounts.ts` (`deleteAccount`, `exportAccountData`), `e2e/konto-loeschen` |
 * | IP nur für die Drosselung   | `lib/rate-limit.ts`                        |
 * | Kartenkacheln von OSM       | `components/map/ParkingMap.tsx`            |
 * | was im Protokoll steht      | `lib/log.ts`, `lib/log.test.ts`            |
 *
 * **Was diese Seite nicht ist: eine Rechtsberatung.** Sie beschreibt die
 * Verarbeitung wahrheitsgemäß und vollständig, soweit sie aus dem Code
 * hervorgeht. Ob die rechtliche Einordnung – etwa die genannten
 * Rechtsgrundlagen – für den Betrieb trägt, gehört vor der Veröffentlichung
 * einmal von jemandem angesehen, der das beurteilen darf.
 */

export const metadata: Metadata = {
  title: "Datenschutzerklärung – wheelee",
  description: "Welche Daten wheelee verarbeitet – und welche ausdrücklich nicht.",
};

/** Gleicher Grund wie beim Impressum: Die Angaben stehen in der Umgebung. */
export const dynamic = "force-dynamic";

export default function Datenschutz() {
  const betreiber = operator();
  // Der Abschnitt zum Mailversand erscheint nur, wenn es ihn gibt (D-10, 10.16).
  const mailEnabled = mailConfigured();
  const mailProvider = process.env.WHEELEE_MAIL_PROVIDER?.trim() || null;

  return (
    <LegalPage title="Datenschutzerklärung" updated="2026-10-30">
      <section>
        <p className="rounded-xl border border-neutral-200 bg-neutral-50 p-3 dark:border-neutral-800 dark:bg-neutral-900">
          <strong>Das Wichtigste zuerst:</strong> Dein Standort verlässt dein Gerät nicht. Er wird
          im Browser berechnet, nirgends übertragen und nirgends gespeichert – auch nicht mit Konto
          und auch nicht in einer Rückmeldung. Ohne Anmeldung und ohne eigene Sprachwahl setzt die App kein einziges Cookie.
        </p>
      </section>

      <section>
        <h2>1. Verantwortlicher</h2>
        {betreiber ? (
          <>
            <address className="mt-2 not-italic">
              {betreiber.name}
              {betreiber.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <p className="mt-2">
              E-Mail: <a href={`mailto:${betreiber.email}`}>{betreiber.email}</a>
            </p>
          </>
        ) : (
          <div className="mt-2">
            <MissingOperator />
          </div>
        )}
        <p className="mt-2">
          Ein Datenschutzbeauftragter ist nicht bestellt; die Voraussetzungen des § 38 BDSG liegen
          bei diesem Projekt nicht vor.
        </p>
      </section>

      <section>
        <h2>2. Dein Standort</h2>
        <p>
          Die App fragt den Browser nach deinem Standort, um den nächstgelegenen Parkplatz zu
          bestimmen und die Entfernung anzuzeigen. Dein Browser fragt dich vorher um Erlaubnis; ohne
          sie funktioniert die App weiter, nur ohne Entfernungsangaben.
        </p>
        <p>
          <strong>Der Standort wird ausschließlich in deinem Gerät verarbeitet.</strong> Er wird
          nicht an den Server übertragen, nicht protokolliert und nicht gespeichert. Die
          Parkplatzdaten holt die App über den Kartenausschnitt, nicht über deinen Standort.
        </p>
        <p>
          Eine Ausnahme, die ausdrücklich genannt sein soll: Bei der <em>Zielsuche</em> wird der
          Bezugspunkt an unseren Server mitgeschickt, damit die Treffer nach Nähe sortiert werden
          können. Er wird vorher auf zwei Nachkommastellen <strong>gerundet</strong> – das
          entspricht etwa einem Kilometer – und nicht gespeichert.
        </p>
      </section>

      <section>
        <h2>3. Kartenkacheln von OpenStreetMap</h2>
        <p>
          Die Karte besteht aus Bildkacheln, die dein Browser direkt von{" "}
          <code>tile.openstreetmap.org</code> lädt. Dabei erfährt die OpenStreetMap Foundation
          technisch bedingt deine IP-Adresse und welchen Kartenausschnitt du betrachtest. Das ist
          der <strong>einzige</strong> Abruf von einem fremden Server, den diese App auslöst – dass
          es dabei bleibt, prüft ein automatischer Test bei jeder Änderung.
        </p>
        <p>
          Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO: Ohne Kartenkacheln gibt es keine Karte,
          und eine Karte ist der Zweck dieser App. Die Datenschutzerklärung der Foundation steht
          unter{" "}
          <a
            href="https://wiki.osmfoundation.org/wiki/Privacy_Policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            wiki.osmfoundation.org
          </a>
          .
        </p>
        <p>
          Die <em>Ortssuche</em> (Nominatim) fragt dagegen <strong>unser Server</strong> für dich,
          nicht dein Browser. Deine IP-Adresse erreicht diesen Dienst dadurch nicht; dorthin gehen
          allerdings der <strong>Suchbegriff</strong>, den du eingibst, und der oben genannte
          gerundete Bezugspunkt. Unser Server schreibt beides weder in die Datenbank noch ins
          Protokoll.
        </p>
      </section>

      <section>
        <h2>4. Was im Browser gespeichert wird</h2>
        <p>
          Die folgenden Angaben liegen im lokalen Speicher deines Browsers. Sie werden{" "}
          <strong>nicht von selbst übertragen</strong> (zwei Ausnahmen stehen jeweils dabei) und
          verschwinden, wenn du die Browserdaten löschst:
        </p>
        <ul className="mt-2">
          <li>
            <code>wheelee-theme</code> – helle oder dunkle Darstellung
          </li>
          <li>
            <code>wheelee-maps-app</code> – welche Karten-App die Navigation öffnet
          </li>
          <li>
            <code>wheelee-language</code> – in welcher Sprache die Oberfläche erscheint, falls du
            eine gewählt hast
          </li>
          <li>
            <code>wheelee-ziele</code> – die zuletzt gesuchten Ziele, damit wiederkehrende Fahrten
            schneller gehen
          </li>
          <li>
            <code>wheelee-geraet</code> – eine Zufallszahl ohne Bezug zu dir oder deinem Gerät. Sie
            dient allein dazu, massenhaft abgeschickte Rückmeldungen zu bremsen. <strong>Beim
            Abschicken einer Rückmeldung wird sie mitgesendet</strong> und dort nur als gekürzter
            Hash bei der Meldung gespeichert (siehe Abschnitt 8).
          </li>
          <li>
            <code>wheelee-language</code> und <code>wheelee-maps-app</code> werden mit deinem Konto
            abgeglichen, <strong>wenn du angemeldet bist</strong> (siehe Abschnitt 6).
          </li>
        </ul>
        <p className="mt-2">
          Außerdem legt die App im Zwischenspeicher deines Browsers Kopien ab, damit sie ohne Netz
          nicht leer bleibt: die zuletzt geladene Seite, die zuletzt angesehenen Parkplätze und
          Kartenbilder – und die Parkplatzdaten der Städte, die du in den Einstellungen unter „Ohne
          Netz“ ausdrücklich vorab lädst. Das sind allgemeine Daten ohne Bezug zu dir. Dort siehst
          du, wie viel Platz sie belegen, und kannst sie jederzeit löschen.
        </p>
        <p className="mt-2">
          Nichts davon dient der Wiedererkennung über verschiedene Seiten hinweg. Es gibt{" "}
          <strong>keine Analyse-Werkzeuge von Dritten, keine Werbung und keine Tracker.</strong>{" "}
          Eine eigene, anonyme Tageszählung gibt es; sie steht in Abschnitt 9.
        </p>
      </section>

      <section>
        <h2>5. Cookies</h2>
        <p>
          Die App setzt <strong>höchstens zwei</strong> Cookies, und beide erst auf deine Handlung
          hin. <strong>Beim Anmelden:</strong> <code>wheelee-session</code>. Es enthält ein zufälliges Sitzungstoken, ist für JavaScript
          nicht lesbar (<code>HttpOnly</code>), wird bei Aufrufen von fremden Seiten nicht
          mitgeschickt (<code>SameSite=Lax</code>) und läuft nach 30 Tagen ab. Beim Abmelden wird
          die Sitzung auch auf dem Server gelöscht, nicht nur das Cookie entfernt.
        </p>
        <p>
          <strong>Beim Wählen einer Sprache</strong> in den Einstellungen – oder nach dem Anmelden,
          wenn an deinem Konto eine früher gewählte Sprache steht, die von der angezeigten
          abweicht: <code>wheelee-lang</code>.
          Es enthält nur den Sprachcode (zum Beispiel <code>de</code>), läuft nach einem Jahr ab und
          wird gebraucht, weil der Server die Sprache schon beim ersten Aufbau der Seite kennen muss
          – der lokale Speicher ist für ihn unsichtbar. Es dient nicht der Wiedererkennung. Ohne
          eine solche Wahl wird es nicht gesetzt; die Sprache richtet sich dann nach der Spracheinstellung
          deines Browsers, die dieser bei jedem Seitenaufruf ohnehin mitschickt.
        </p>
        <p>
          Wer die App nur benutzt, bekommt kein Cookie. Ein Einwilligungsbanner ist deshalb nicht
          nötig: Beide Cookies sind für den von dir gewünschten Dienst unbedingt erforderlich (§ 25
          Abs. 2 Nr. 2 TDDDG).
        </p>
        <p>
          Dieselbe Vorschrift betrifft auch den lokalen Speicher aus Abschnitt 4. Dort wird{" "}
          <strong>nichts angelegt, bevor du etwas tust</strong>: Darstellung oder Karten-App
          wählen, ein Ziel suchen, eine Sprache wählen, eine Rückmeldung abschicken. Die
          Offline-Kopien im Zwischenspeicher dagegen legt die App beim Aufruf an, damit sie ohne
          Netz nicht leer bleibt.
        </p>
      </section>

      <section>
        <h2>6. Konto</h2>
        <p>
          Ein Konto ist <strong>freiwillig</strong>. Die App funktioniert vollständig ohne – Karte,
          Standort, Zielsuche, Detailansicht und das Melden eines Fehlers. Gebraucht wird es nur für
          Funktionen, die zurechenbar sein müssen.
        </p>
        <p>
          Gespeichert werden deine E-Mail-Adresse, dein Passwort als <em>scrypt</em>-Hash (niemals
          im Klartext), der Zeitpunkt der Anmeldung und der letzten Nutzung. Dazu, falls du eine
          wählst, <strong>die bevorzugte Karten-App</strong> und{" "}
          <strong>die gewählte Sprache</strong> – damit sie auch auf einem zweiten Gerät gelten. Ohne
          Konto bleiben diese Wahlen allein im Browser. Rechtsgrundlage ist Art. 6
          Abs. 1 lit. b DSGVO.
        </p>
        <p>
          <strong>Verwaltung und Einladungen:</strong> Konten mit der Rolle Administrator:in sehen
          in der Verwaltung die Liste aller Konten (E-Mail-Adresse, Rolle, Anlage, letzte
          Anmeldung, ob gesperrt) sowie alle Rückmeldungen samt freiwilliger Antwortadresse. Sie
          können Konten sperren oder löschen und Einladungen erzeugen. Eine Einladung speichert die
          E-Mail-Adresse der eingeladenen Person, die vorgesehene Rolle, den Ablauf (sieben Tage)
          und das Einladungstoken nur als Hash. Den Link sieht die einladende Person einmal und
          gibt ihn selbst weiter; <strong>Einladungen versendet die App nicht per E-Mail.</strong>{" "}
          Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO – der Schutz der Seite davor, dass sich
          Unbefugte Verwaltungsrechte verschaffen.
        </p>
        {mailEnabled ? (
          <>
            <p>
              <strong>E-Mails der App:</strong> Nur auf deine Anforderung hin verschickt die App
              eine E-Mail – für „Passwort vergessen“ an die Adresse deines Kontos und für „E-Mail-Adresse
              ändern“ an die <em>neue</em> Adresse. Die E-Mail enthält einen Link, der eine Stunde
              gilt und einmal einlösbar ist; in der Datenbank steht nur ein Hash davon (bei einem
              Adresswechsel zusätzlich die neue Adresse bis zum Ablauf, danach wird sie gelöscht).
              Es gibt keine Werbe-, Rundschreiben- oder Erinnerungsmails. Rechtsgrundlage ist Art. 6
              Abs. 1 lit. b DSGVO (Vertragserfüllung: Zugang zum Konto) beziehungsweise bei der
              neuen Adresse die von dir ausgelöste Anforderung.
            </p>
            <p>
              <strong>Versanddienstleister:</strong>{" "}
              {mailProvider ? (
                <>
                  {mailProvider}. Dieser sieht beim Versand die Empfängeradresse und den Inhalt der
                  Mail (den Link) und verarbeitet sie in unserem Auftrag nach Art. 28 DSGVO.
                </>
              ) : (
                <strong className="text-red-700 dark:text-red-400">
                  [Angabe fehlt: Der Betreiber hat den Versanddienstleister (Variable
                  WHEELEE_MAIL_PROVIDER) nicht eingetragen. Dieser Abschnitt ist erst vollständig,
                  wenn Name, Sitz und der Stand des Auftragsverarbeitungsvertrags dort stehen.]
                </strong>
              )}
            </p>
          </>
        ) : null}
      </section>

      <section>
        <h2>7. Bewertungen und gespeicherte Parkplätze</h2>
        <p>
          Zu jedem Parkplatz kannst du angeben, ob es ihn noch gibt. Dafür ist ein Konto nötig –
          ohne Anmeldung siehst du die Zählerstände, kannst aber nicht bewerten.
        </p>
        <p>
          Gespeichert werden der Parkplatz, die Richtung deiner Bewertung, dein Konto und der
          Zeitpunkt. <strong>Mehr nicht</strong> – insbesondere kein Standort und keine
          Gerätekennung. Je Parkplatz und Konto gibt es höchstens einen Eintrag; änderst du deine
          Bewertung, wird er überschrieben, nicht ergänzt. Nimmst du sie zurück, wird er gelöscht.
        </p>
        <p>
          Anderen Nutzer:innen werden nur die <strong>Summen</strong> angezeigt, nie, wer wie
          bewertet hat. Löschst du dein Konto, verschwinden deine Bewertungen mit. Rechtsgrundlage
          ist Art. 6 Abs. 1 lit. f DSGVO – das Interesse, falsche Parkplatzangaben zu erkennen.
          Unter Einstellungen → Konto siehst du alle deine Bewertungen und kannst jede einzelne
          zurückziehen.
        </p>
        <p>
          <strong>Gespeicherte Parkplätze:</strong> Mit Konto kannst du dir Parkplätze merken, die
          du häufig ansteuerst. Gespeichert werden der Parkplatz, dein Konto und der Zeitpunkt –
          kein Standort und keine Gerätekennung. Die Liste sehen nur du und, als Teil der Daten
          deines Kontos, die Betreiber:innen der Datenbank; sie wird nirgends ausgewertet.
          Entfernst du einen Parkplatz, wird der Eintrag gelöscht; löschst du dein Konto,
          verschwindet die ganze Liste mit. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO – die
          Funktion, die du mit deinem Konto nutzt.
        </p>
      </section>

      <section>
        <h2>8. Rückmeldungen</h2>
        <p>Wenn du einen Fehler meldest oder einen Vorschlag schickst, wird gespeichert:</p>
        <ul className="mt-2">
          <li>der von dir geschriebene Text und die Art der Meldung,</li>
          <li>der betroffene Parkplatz und die Stadt, falls die Meldung von dort ausging,</li>
          <li>die aufgerufene Adresse und die Kennung deines Browsers (für die Fehlersuche),</li>
          <li>
            ein gekürzter Hash der Zufallszahl <code>wheelee-geraet</code> (siehe Abschnitt 4),
            damit sich massenhafte Meldungen vom selben Gerät erkennen lassen,
          </li>
          <li>
            <strong>freiwillig</strong> eine E-Mail-Adresse für die Antwort – ohne sie ist keine
            Rückfrage möglich, die Meldung hilft aber trotzdem,
          </li>
          <li>dein Konto, falls du angemeldet warst.</li>
        </ul>
        <p className="mt-2">
          Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO – das Interesse, falsche Parkplatzangaben
          zu berichtigen –, bei der freiwilligen Adresse deine Einwilligung nach Art. 6 Abs. 1 lit.
          a DSGVO.
        </p>
      </section>

      <section>
        <h2>9. IP-Adresse und Serverprotokoll</h2>
        <p>
          Beim Anmelden, Registrieren und Abschicken einer Rückmeldung wird deine IP-Adresse
          gelesen, um zu verhindern, dass jemand Passwörter durchprobiert oder die Datenbank mit
          Meldungen flutet. Sie wird dafür nur im Arbeitsspeicher gezählt und{" "}
          <strong>in keine Tabelle und in kein Protokoll geschrieben.</strong> Nach wenigen Minuten
          ist der Zähler verfallen.
        </p>
        <p className="mt-2">
          Der Server schreibt ein knappes Betriebsprotokoll, damit Störungen überhaupt auffallen.
          Darin stehen Zeitpunkt, Art der Anfrage, der aufgerufene Pfad, die Antwortnummer, die
          Dauer und bei einem Absturz dessen Art und Stelle im Programm.{" "}
          <strong>Nicht darin:</strong> deine IP-Adresse, dein Standort, die Werte deiner Anfrage –
          also auch nicht der Kartenausschnitt, den du ansiehst –, deine E-Mail-Adresse und der Text
          deiner Meldungen. Das Protokoll bleibt auf dem Server, geht an keinen anderen Dienst und
          wird fortlaufend überschrieben (höchstens 30 MB, danach fällt das Älteste weg).
        </p>
        <p className="mt-2">
          <strong>Besucherzählung.</strong> Damit der Betreiber weiß, ob die App benutzt wird,
          zählt sie, wie viele Menschen sie pro Tag öffnen. Dafür schickt deine Seite nach dem
          Laden einmal einen leeren Hinweis an unseren Server – ohne Cookie, ohne Eintrag im
          Browser-Speicher und ohne Inhalt. Der Server bildet aus IP-Adresse und Browserkennung
          einen Hash, gesalzen mit einem Zufallswert, der <strong>nur im Arbeitsspeicher</strong>{" "}
          liegt und jeden Tag neu gewürfelt wird, und merkt sich damit bis Mitternacht (Mitteleuropa),
          ob er dich heute schon gezählt hat. <strong>In die Datenbank kommt nur die Summe je
          Tag</strong> (Besucher und Seitenaufrufe), keine Adresse, keine Kennung, auch nicht
          gehasht; ein Neustart des Servers vergisst die Hashes. Zugriffe von Suchmaschinen,
          Messdiensten, Linkvorschauen und Programmen werden nicht gezählt, ebenso nicht,
          wenn dein Browser „Do Not Track“ oder „Global Privacy Control“ sendet. Rechtsgrundlage
          ist Art. 6 Abs. 1 lit. f DSGVO (Interesse, den Betrieb einzuschätzen); durch die
          sofortige Verdichtung auf Tagessummen ist der Eingriff gering. Die Summen sieht nur der
          Administrator. Sie lassen sich keiner Person zuordnen.
        </p>
        <p className="mt-2">
          Das gilt für die App selbst. Zwischen deinem Gerät und der App steht ein
          Weiterleitungsserver bei der Strato GmbH, der die verschlüsselte Verbindung entgegennimmt
          und weiterreicht. Technisch bedingt sieht er deine IP-Adresse und den aufgerufenen Pfad.
        </p>
      </section>

      <section>
        <h2>10. Wie lange gespeichert wird</h2>
        <ul className="mt-2">
          <li>
            <strong>Erledigte und verworfene Rückmeldungen:</strong> zwölf Monate nach der
            Erledigung, dann werden sie samt der freiwilligen Antwortadresse gelöscht.
          </li>
          <li>
            <strong>Offene Rückmeldungen:</strong> bis sie bearbeitet sind. Eine Meldung, die
            niemand angesehen hat, ist nicht erledigt, sondern liegen geblieben – sie zu löschen
            hieße, einen Hinweis auf einen falschen Parkplatz zu verlieren.{" "}
            <strong>Die Antwortadresse daran wird nach zwei Jahren entfernt</strong>, auch wenn die
            Meldung noch offen ist: Der Hinweis bleibt dann lesbar, antworten lässt sich darauf
            nicht mehr.
          </li>
          <li>
            <strong>Bewertungen:</strong> bis du sie zurücknimmst oder dein Konto löschst. Eine
            Frist gibt es bewusst nicht – eine Bestätigung, die nach einem Jahr verschwände, würde
            den Parkplatz wieder als ungeprüft dastehen lassen. Wie alt eine Angabe ist, steht
            stattdessen daneben.
          </li>
          <li>
            <strong>Gespeicherte Parkplätze:</strong> bis du sie entfernst oder dein Konto
            löschst.
          </li>
          <li>
            <strong>Sitzungen:</strong> mit dem Ablauf, spätestens 30 Tage nach der Anmeldung.
          </li>
          <li>
            <strong>Einladungen:</strong> sieben Tage gültig; nach Einlösung, Rückzug oder Ablauf
            noch 30 Tage in der Verwaltung sichtbar, dann samt E-Mail-Adresse gelöscht.
          </li>
          <li>
            <strong>Konten:</strong> bis zur Löschung durch dich (siehe nächster Abschnitt).
          </li>
        </ul>
      </section>

      <section>
        <h2>11. Deine Rechte</h2>
        <p>
          Dir stehen nach der DSGVO zu: Auskunft (Art. 15), Berichtigung (Art. 16), Löschung (Art.
          17), Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) und
          Widerspruch gegen Verarbeitungen auf Grundlage berechtigter Interessen (Art. 21). Eine
          erteilte Einwilligung kannst du jederzeit mit Wirkung für die Zukunft widerrufen.
        </p>
        <p>
          Wende dich dafür formlos an die oben genannte Adresse. Außerdem steht dir ein
          Beschwerderecht bei einer Datenschutz-Aufsichtsbehörde zu (Art. 77 DSGVO).
        </p>
        <p>
          <strong>Mit Konto geht beides in der App selbst</strong>, unter Einstellungen → Konto:
          <em> Meine Daten herunterladen</em> liefert eine JSON-Datei mit E-Mail-Adresse,
          Anlagedatum, letzter Anmeldung, Bewertungen, gespeicherten Parkplätzen, eigenen
          Rückmeldungen, der gewählten Karten-App und Sprache (Art. 15 und 20). <em>Konto löschen</em>{" "}
          entfernt das Konto, alle Sitzungen, deine Bewertungen und gespeicherten Parkplätze sofort und endgültig; dazu wird dein Passwort abgefragt. Deine
          Rückmeldungen bleiben als Hinweise erhalten, verlieren aber den Bezug zu dir, und eine
          dort freiwillig angegebene Antwortadresse wird entfernt (Art. 17).
        </p>
        <p>
          Daten, die sich keinem Konto zuordnen lassen – etwa eine Rückmeldung ohne Anmeldung –,
          kannst du über eine formlose Nachricht an die oben genannte Adresse erfragen oder löschen
          lassen; dort geschieht das von Hand.
        </p>
      </section>

      <section>
        <h2>12. Keine Weitergabe, keine automatische Entscheidung</h2>
        <p>
          Deine Daten werden nicht verkauft, nicht für Werbung genutzt und nicht an Dritte
          weitergegeben{mailEnabled ? " – mit Ausnahme des in Abschnitt 6 genannten Versanddienstleisters für die E-Mails, die du selbst anforderst" : ""}.
          Die Daten, die die App selbst speichert (Konten, Bewertungen, Rückmeldungen), liegen auf
          einem Server in Deutschland und werden von uns nicht in ein Drittland übermittelt
          {mailEnabled ? "; beim Versanddienstleister gilt die Angabe in Abschnitt 6" : ""}.{" "}
          <strong>Eine Ausnahme liegt außerhalb unseres Servers:</strong> Die Kartenkacheln
          (Abschnitt 3) lädt dein Browser direkt von der OpenStreetMap Foundation, die ihren Sitz
          im Vereinigten Königreich hat und für die Auslieferung weitere Dienstleister einsetzen
          kann, auch außerhalb der EU. Welche, steht in deren Datenschutzerklärung; wir haben darauf
          keinen Einfluss. Eine automatisierte Entscheidungsfindung oder ein Profiling nach Art.
          22 DSGVO findet nicht statt.
        </p>
      </section>

      <section>
        <h2>13. Änderungen</h2>
        <p>
          Ändert sich an der Verarbeitung etwas, ändert sich diese Seite mit. Das oben genannte
          Datum sagt, wann das zuletzt geschehen ist.
        </p>
        <p>
          Die Angaben zum Betreiber stehen im <Link href="/impressum">Impressum</Link>.
        </p>
      </section>
    </LegalPage>
  );
}
