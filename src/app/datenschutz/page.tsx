import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, MissingOperator } from "@/components/LegalPage";
import { operator } from "@/lib/legal/operator";

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
 * | IP nur für die Drosselung   | `lib/rate-limit.ts`                        |
 * | Kartenkacheln von OSM       | `components/map/ParkingMap.tsx`            |
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

  return (
    <LegalPage title="Datenschutzerklärung" updated="2026-10-19">
      <section>
        <p className="rounded-xl border border-neutral-200 bg-neutral-50 p-3 dark:border-neutral-800 dark:bg-neutral-900">
          <strong>Das Wichtigste zuerst:</strong> Dein Standort verlässt dein Gerät nicht. Er wird
          im Browser berechnet, nirgends übertragen und nirgends gespeichert – auch nicht mit Konto
          und auch nicht in einer Rückmeldung. Ohne Anmeldung setzt die App kein einziges Cookie.
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
          nicht dein Browser. Deine IP-Adresse erreicht diesen Dienst dadurch nicht.
        </p>
      </section>

      <section>
        <h2>4. Was im Browser gespeichert wird</h2>
        <p>
          Die folgenden Angaben liegen im lokalen Speicher deines Browsers. Sie werden{" "}
          <strong>nicht übertragen</strong> und verschwinden, wenn du die Browserdaten löschst:
        </p>
        <ul className="mt-2">
          <li>
            <code>wheelee-theme</code> – helle oder dunkle Darstellung
          </li>
          <li>
            <code>wheelee-maps-app</code> – welche Karten-App die Navigation öffnet
          </li>
          <li>
            <code>wheelee-ziele</code> – die zuletzt gesuchten Ziele, damit wiederkehrende Fahrten
            schneller gehen
          </li>
          <li>
            <code>wheelee-geraet</code> – eine Zufallszahl ohne Bezug zu dir oder deinem Gerät. Sie
            dient allein dazu, massenhaft abgeschickte Rückmeldungen zu bremsen.
          </li>
        </ul>
        <p className="mt-2">
          Nichts davon dient der Wiedererkennung über verschiedene Seiten hinweg. Es gibt{" "}
          <strong>keine Analyse-Werkzeuge, keine Werbung und keine Tracker.</strong>
        </p>
      </section>

      <section>
        <h2>5. Cookies</h2>
        <p>
          Die App setzt <strong>genau ein</strong> Cookie, und erst, wenn du dich anmeldest:{" "}
          <code>wheelee-session</code>. Es enthält ein zufälliges Sitzungstoken, ist für JavaScript
          nicht lesbar (<code>HttpOnly</code>), wird bei Aufrufen von fremden Seiten nicht
          mitgeschickt (<code>SameSite=Lax</code>) und läuft nach 30 Tagen ab. Beim Abmelden wird
          die Sitzung auch auf dem Server gelöscht, nicht nur das Cookie entfernt.
        </p>
        <p>
          Wer die App nur benutzt, bekommt kein Cookie. Ein Einwilligungsbanner ist deshalb nicht
          nötig: Das Sitzungscookie ist für den von dir gewünschten Dienst unbedingt erforderlich (§
          25 Abs. 2 Nr. 2 TDDDG).
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
          im Klartext), der Zeitpunkt der Anmeldung und der letzten Nutzung. Rechtsgrundlage ist
          Art. 6 Abs. 1 lit. b DSGVO.
        </p>
      </section>

      <section>
        <h2>7. Bewertungen</h2>
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
        <h2>9. IP-Adresse</h2>
        <p>
          Beim Anmelden, Registrieren und Abschicken einer Rückmeldung wird deine IP-Adresse
          gelesen, um zu verhindern, dass jemand Passwörter durchprobiert oder die Datenbank mit
          Meldungen flutet. Sie wird dafür nur im Arbeitsspeicher gezählt und{" "}
          <strong>in keine Tabelle und in kein Protokoll geschrieben.</strong> Nach wenigen Minuten
          ist der Zähler verfallen.
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
            hieße, einen Hinweis auf einen falschen Parkplatz zu verlieren.
          </li>
          <li>
            <strong>Bewertungen:</strong> bis du sie zurücknimmst oder dein Konto löschst. Eine
            Frist gibt es bewusst nicht – eine Bestätigung, die nach einem Jahr verschwände, würde
            den Parkplatz wieder als ungeprüft dastehen lassen. Wie alt eine Angabe ist, steht
            stattdessen daneben.
          </li>
          <li>
            <strong>Sitzungen:</strong> mit dem Ablauf, spätestens 30 Tage nach der Anmeldung.
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
        <p className="rounded-xl border border-amber-300 bg-amber-50 p-3 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-100">
          <strong>Offen und darum hier genannt:</strong> Konto und Daten lassen sich derzeit noch
          nicht in der App selbst löschen. Bis diese Funktion gebaut ist, genügt eine formlose
          Nachricht an die oben genannte Adresse; die Löschung erfolgt dann von Hand.
        </p>
      </section>

      <section>
        <h2>12. Keine Weitergabe, keine automatische Entscheidung</h2>
        <p>
          Deine Daten werden nicht verkauft, nicht für Werbung genutzt und nicht an Dritte
          weitergegeben. Sie liegen auf einem Server in Deutschland; es findet keine Übermittlung in
          ein Drittland statt. Eine automatisierte Entscheidungsfindung oder ein Profiling nach Art.
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
