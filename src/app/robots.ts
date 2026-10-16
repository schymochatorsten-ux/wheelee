import type { MetadataRoute } from "next";

/**
 * Was Suchmaschinen anfassen dürfen (ToDo 17.4).
 *
 * Die Karte selbst soll gefunden werden – darum geht es bei der App. Die
 * Endpunkte unter `/api/` nicht: Dort liegen die Rückmeldungen samt der
 * freiwillig angegebenen E-Mail-Adressen und die Anmeldung.
 *
 * **Das ist eine Bitte, kein Schutz.** `robots.txt` hält keinen ab, der nicht
 * will; der Zugang zu den Rückmeldungen hängt an der serverseitigen Prüfung in
 * `/api/admin/feedback`. Der Eintrag steht hier, damit die Adressen nicht über
 * einen Suchindex auffindbar werden, falls doch einmal etwas durchrutscht –
 * zwei Schlösser an einer Tür, von denen nur eines tragen muss.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    // Keine `sitemap`-Angabe: Die App ist eine einzige Seite, und ein Verweis
    // auf eine Datei, die es nicht gibt, ist schlechter als keiner.
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    host: "https://wheelee.de",
  };
}
