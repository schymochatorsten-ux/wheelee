/**
 * Die deutschen Großstädte (ab 100.000 Einwohnern), nach Einwohnerzahl
 * absteigend – die Reihenfolge, in der importiert wird.
 *
 * Zahlen: Bevölkerungsfortschreibung der Statistischen Ämter zum 31.12.2023
 * (Verwaltungsgebiet, nicht Ballungsraum). Im vorderen Feld sind die Ränge
 * eindeutig; im hinteren Feld liegen viele Städte nur wenige tausend
 * Einwohner auseinander, dort ist die Reihenfolge nicht auf den Rang genau.
 * Für den Importablauf genügt das – entscheidend ist, dass die größten Städte
 * zuerst kommen.
 */

export interface GermanCity {
  /** Rang nach Einwohnerzahl, 1 = größte Stadt. */
  rank: number;
  /** Amtlicher Name, zugleich Suchbegriff für Nominatim und GovData. */
  name: string;
  /** Slug für Dateinamen und IDs. */
  slug: string;
  /** Einwohner, gerundet. */
  population: number;
  /** Bundesland – hilft bei der Suche im richtigen Landesportal. */
  state: string;
}

const raw: [name: string, slug: string, population: number, state: string][] = [
  ["Berlin", "berlin", 3_782_202, "Berlin"],
  ["Hamburg", "hamburg", 1_910_160, "Hamburg"],
  ["München", "muenchen", 1_510_378, "Bayern"],
  ["Köln", "koeln", 1_087_353, "Nordrhein-Westfalen"],
  ["Frankfurt am Main", "frankfurt", 775_790, "Hessen"],
  ["Stuttgart", "stuttgart", 633_484, "Baden-Württemberg"],
  ["Düsseldorf", "duesseldorf", 631_217, "Nordrhein-Westfalen"],
  ["Leipzig", "leipzig", 619_879, "Sachsen"],
  ["Dortmund", "dortmund", 595_471, "Nordrhein-Westfalen"],
  ["Essen", "essen", 586_608, "Nordrhein-Westfalen"],
  ["Bremen", "bremen", 577_026, "Bremen"],
  ["Dresden", "dresden", 566_222, "Sachsen"],
  ["Hannover", "hannover", 548_186, "Niedersachsen"],
  ["Nürnberg", "nuernberg", 523_026, "Bayern"],
  ["Duisburg", "duisburg", 500_319, "Nordrhein-Westfalen"],
  ["Bochum", "bochum", 365_587, "Nordrhein-Westfalen"],
  ["Wuppertal", "wuppertal", 358_876, "Nordrhein-Westfalen"],
  ["Bielefeld", "bielefeld", 341_755, "Nordrhein-Westfalen"],
  ["Bonn", "bonn", 336_465, "Nordrhein-Westfalen"],
  ["Münster", "muenster", 320_979, "Nordrhein-Westfalen"],
  ["Mannheim", "mannheim", 319_953, "Baden-Württemberg"],
  ["Karlsruhe", "karlsruhe", 309_999, "Baden-Württemberg"],
  ["Augsburg", "augsburg", 302_103, "Bayern"],
  ["Wiesbaden", "wiesbaden", 283_083, "Hessen"],
  ["Mönchengladbach", "moenchengladbach", 262_374, "Nordrhein-Westfalen"],
  ["Gelsenkirchen", "gelsenkirchen", 259_105, "Nordrhein-Westfalen"],
  ["Braunschweig", "braunschweig", 252_811, "Niedersachsen"],
  ["Kiel", "kiel", 250_917, "Schleswig-Holstein"],
  ["Chemnitz", "chemnitz", 249_237, "Sachsen"],
  ["Aachen", "aachen", 249_070, "Nordrhein-Westfalen"],
  ["Halle (Saale)", "halle", 242_083, "Sachsen-Anhalt"],
  ["Magdeburg", "magdeburg", 239_364, "Sachsen-Anhalt"],
  ["Freiburg im Breisgau", "freiburg", 236_140, "Baden-Württemberg"],
  ["Krefeld", "krefeld", 230_103, "Nordrhein-Westfalen"],
  ["Mainz", "mainz", 220_085, "Rheinland-Pfalz"],
  ["Lübeck", "luebeck", 218_095, "Schleswig-Holstein"],
  ["Erfurt", "erfurt", 214_969, "Thüringen"],
  ["Oberhausen", "oberhausen", 210_829, "Nordrhein-Westfalen"],
  ["Rostock", "rostock", 209_920, "Mecklenburg-Vorpommern"],
  ["Kassel", "kassel", 204_202, "Hessen"],
  ["Hagen", "hagen", 188_814, "Nordrhein-Westfalen"],
  ["Potsdam", "potsdam", 187_119, "Brandenburg"],
  ["Saarbrücken", "saarbruecken", 181_959, "Saarland"],
  ["Hamm", "hamm", 179_916, "Nordrhein-Westfalen"],
  ["Oldenburg", "oldenburg", 177_055, "Niedersachsen"],
  ["Ludwigshafen am Rhein", "ludwigshafen", 173_353, "Rheinland-Pfalz"],
  ["Mülheim an der Ruhr", "muelheim", 172_124, "Nordrhein-Westfalen"],
  ["Osnabrück", "osnabrueck", 168_145, "Niedersachsen"],
  ["Leverkusen", "leverkusen", 167_256, "Nordrhein-Westfalen"],
  ["Heidelberg", "heidelberg", 162_273, "Baden-Württemberg"],
  ["Darmstadt", "darmstadt", 162_243, "Hessen"],
  ["Solingen", "solingen", 160_824, "Nordrhein-Westfalen"],
  ["Herne", "herne", 156_449, "Nordrhein-Westfalen"],
  ["Regensburg", "regensburg", 156_200, "Bayern"],
  ["Paderborn", "paderborn", 155_300, "Nordrhein-Westfalen"],
  ["Neuss", "neuss", 154_955, "Nordrhein-Westfalen"],
  ["Ingolstadt", "ingolstadt", 143_100, "Bayern"],
  ["Offenbach am Main", "offenbach", 142_000, "Hessen"],
  ["Fürth", "fuerth", 131_000, "Bayern"],
  ["Ulm", "ulm", 129_000, "Baden-Württemberg"],
  ["Heilbronn", "heilbronn", 128_600, "Baden-Württemberg"],
  ["Pforzheim", "pforzheim", 128_200, "Baden-Württemberg"],
  ["Wolfsburg", "wolfsburg", 128_000, "Niedersachsen"],
  ["Würzburg", "wuerzburg", 127_900, "Bayern"],
  ["Göttingen", "goettingen", 121_000, "Niedersachsen"],
  ["Reutlingen", "reutlingen", 118_000, "Baden-Württemberg"],
  ["Bottrop", "bottrop", 117_400, "Nordrhein-Westfalen"],
  ["Erlangen", "erlangen", 116_300, "Bayern"],
  ["Remscheid", "remscheid", 116_000, "Nordrhein-Westfalen"],
  ["Koblenz", "koblenz", 115_000, "Rheinland-Pfalz"],
  ["Bremerhaven", "bremerhaven", 113_600, "Bremen"],
  ["Recklinghausen", "recklinghausen", 112_600, "Nordrhein-Westfalen"],
  ["Bergisch Gladbach", "bergisch-gladbach", 112_000, "Nordrhein-Westfalen"],
  ["Trier", "trier", 111_500, "Rheinland-Pfalz"],
  ["Jena", "jena", 111_300, "Thüringen"],
  ["Salzgitter", "salzgitter", 105_500, "Niedersachsen"],
  ["Moers", "moers", 104_500, "Nordrhein-Westfalen"],
  ["Siegen", "siegen", 103_000, "Nordrhein-Westfalen"],
  ["Gütersloh", "guetersloh", 102_000, "Nordrhein-Westfalen"],
  ["Hildesheim", "hildesheim", 101_000, "Niedersachsen"],
  ["Kaiserslautern", "kaiserslautern", 100_600, "Rheinland-Pfalz"],
  ["Witten", "witten", 96_000, "Nordrhein-Westfalen"],
  ["Cottbus", "cottbus", 98_000, "Brandenburg"],
];

export const germanCities: readonly GermanCity[] = raw
  .map(([name, slug, population, state]) => ({ name, slug, population, state, rank: 0 }))
  .sort((a, b) => b.population - a.population)
  .map((city, index) => ({ ...city, rank: index + 1 }));

export function findCity(slugOrName: string): GermanCity | undefined {
  const needle = slugOrName.toLocaleLowerCase("de-DE");
  return germanCities.find(
    (city) => city.slug === needle || city.name.toLocaleLowerCase("de-DE") === needle,
  );
}
