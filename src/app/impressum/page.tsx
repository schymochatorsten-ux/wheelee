import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, MissingOperator } from "@/components/LegalPage";
import { operator } from "@/lib/legal/operator";

/**
 * Impressum (ToDo 10.2).
 *
 * **Pflicht, seit die Seite erreichbar ist.** § 5 DDG verlangt von jedem
 * geschäftsmäßigen Telemedienangebot Name, Anschrift und eine Möglichkeit zur
 * schnellen elektronischen Kontaktaufnahme – „geschäftsmäßig" heißt dabei
 * nicht „gewinnorientiert", sondern „auf Dauer angelegt". Ein unentgeltliches
 * Privatprojekt, das dauerhaft unter einer eigenen Domain läuft, fällt
 * darunter.
 *
 * Die Angaben kommen aus der Umgebung – warum, steht in `lib/legal/operator.ts`.
 */

export const metadata: Metadata = {
  title: "Impressum – wheelee",
  description: "Angaben nach § 5 DDG zum Betreiber von wheelee.",
};

/**
 * Nicht vorab erzeugen, sondern bei jedem Aufruf.
 *
 * Die Angaben stehen in der Umgebung des Servers. Würde die Seite beim Bauen
 * erzeugt, trüge sie die Werte des **Bauzeitpunkts** – im Container also die
 * aus dem Dockerfile, nicht die aus der `.env`. Das Ergebnis wäre ein
 * Impressum, das nach jedem Neubau leer ist, ohne dass jemand etwas geändert
 * hat.
 */
export const dynamic = "force-dynamic";

export default function Impressum() {
  const betreiber = operator();

  return (
    <LegalPage title="Impressum" updated="2026-10-19">
      <section>
        <h2>Angaben gemäß § 5 DDG</h2>
        {betreiber ? (
          <address className="mt-2 not-italic">
            {betreiber.name}
            {betreiber.address.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
        ) : (
          <div className="mt-2">
            <MissingOperator />
          </div>
        )}
      </section>

      {betreiber && (
        <section>
          <h2>Kontakt</h2>
          <ul className="mt-2">
            <li>
              E-Mail: <a href={`mailto:${betreiber.email}`}>{betreiber.email}</a>
            </li>
            {betreiber.phone && <li>Telefon: {betreiber.phone}</li>}
          </ul>
          {betreiber.vatId && (
            <p className="mt-2">Umsatzsteuer-Identifikationsnummer: {betreiber.vatId}</p>
          )}
        </section>
      )}

      <section>
        <h2>Verantwortlich für den Inhalt</h2>
        {/* Der Name als eigener Satz – sonst läuft er ohne Punkt in den
            folgenden: „Erika Mustermann wheelee ist ein …". */}
        <p>{betreiber ? `${betreiber.name}, Anschrift wie oben.` : "Siehe oben."}</p>
        <p>
          wheelee ist ein unentgeltliches Privatprojekt. Es verfolgt keine wirtschaftlichen Zwecke,
          enthält keine Werbung und verkauft keine Daten.
        </p>
      </section>

      <section>
        <h2>Haftung für Inhalte</h2>
        <p>
          Die angezeigten Parkplätze stammen aus amtlichen Listen der Städte und aus OpenStreetMap.
          Sie sind eine Momentaufnahme fremder Quellen und können veraltet sein: Ein Parkplatz kann
          aufgehoben, verlegt oder gerade belegt sein, und eine Zeitbeschränkung kann sich geändert
          haben.
        </p>
        <p>
          <strong>Vor Ort gilt die Beschilderung, nicht diese App.</strong> Für die Richtigkeit,
          Vollständigkeit und Aktualität der Angaben wird keine Gewähr übernommen. Wer einen Fehler
          bemerkt, hilft am meisten mit einer Rückmeldung – sie ist die einzige Quelle, die solche
          Änderungen überhaupt bemerkt.
        </p>
      </section>

      <section>
        <h2>Haftung für Links</h2>
        <p>
          Diese Seite verweist auf externe Angebote – insbesondere auf Google Maps oder Apple Karten
          zum Starten der Navigation und auf OpenStreetMap. Auf deren Inhalte besteht kein Einfluss;
          für sie ist der jeweilige Anbieter verantwortlich.
        </p>
      </section>

      <section>
        <h2>Urheberrecht und Lizenzen der Daten</h2>
        <ul className="mt-2">
          <li>
            Kartendarstellung und ein Teil der Parkplatzdaten: © OpenStreetMap-Mitwirkende, Open
            Database License (ODbL).
          </li>
          <li>
            Parkplatzdaten der Städte: jeweils unter der Lizenz der herausgebenden Stadt. Die Quelle
            steht in der App an jedem einzelnen Parkplatz.
          </li>
          <li>
            Gemeindeverzeichnis: © Bundesamt für Kartographie und Geodäsie (2026),{" "}
            <a href="https://www.govdata.de/dl-de/by-2-0" target="_blank" rel="noopener noreferrer">
              dl-de/by-2-0
            </a>
            .
          </li>
        </ul>
      </section>

      <section>
        <h2>Datenschutz</h2>
        <p>
          Welche Daten verarbeitet werden – und welche ausdrücklich nicht – steht in der{" "}
          <Link href="/datenschutz">Datenschutzerklärung</Link>.
        </p>
      </section>
    </LegalPage>
  );
}
