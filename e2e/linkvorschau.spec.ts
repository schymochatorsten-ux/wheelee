import { expect, test } from "@playwright/test";

/**
 * Die Vorschau geteilter Links (ToDo 12.10).
 *
 * **Warum das ein Test ist und keine Sichtprüfung:** Next liefert Titel,
 * Beschreibung und die OpenGraph-Angaben bei dynamischen Seiten **im Körper
 * aus, nicht im Kopf** – React hängt sie im Browser nachträglich um. Für
 * Messenger, die kein JavaScript ausführen, hält Next eine Ausnahme bereit:
 * Bei ihrer Browserkennung wartet es und schreibt die Angaben in den Kopf.
 *
 * Das ist eine Zusage, die von einer internen Liste in Next abhängt, auf einer
 * Seite steht, die aus einem anderen Grund dynamisch ist (`page.tsx` liest die
 * Sitzung), und **die niemand bemerkt, wenn sie wegfällt** – ein geteilter Link
 * zeigt dann einfach nichts mehr an. Gemessen am 2026-10-21: ohne diesen Weg
 * stünde die Beschreibung bei keinem einzigen Messenger im Kopf.
 */

/** Browserkennungen, mit denen Links tatsächlich geteilt werden. */
const MESSENGER = [
  "WhatsApp/2.23",
  "Twitterbot/1.0",
  "facebookexternalhit/1.1",
  "Slackbot-LinkExpanding 1.0",
];

for (const kennung of MESSENGER) {
  test(`Linkvorschau: ${kennung.split("/")[0]} bekommt Titel und Beschreibung im Kopf`, async ({
    request,
  }) => {
    const antwort = await request.get("/", { headers: { "User-Agent": kennung } });
    expect(antwort.status()).toBe(200);

    const html = await antwort.text();
    const kopf = html.slice(0, html.indexOf("</head>"));

    expect(kopf).toContain("<title>");
    expect(kopf).toContain('name="description"');
    expect(kopf).toContain('property="og:title"');
    // Ohne absolute Adresse zeigt ein Messenger die Vorschau nicht an.
    expect(kopf).toContain("https://wheelee.de");
  });
}
