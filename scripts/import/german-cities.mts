/**
 * Die deutschen Städte ab 50.000 Einwohnern, nach Einwohnerzahl absteigend –
 * die Reihenfolge, in der importiert wird.
 *
 * Zahlen: Bevölkerungsfortschreibung der Statistischen Ämter zum 31.12.2023
 * (Verwaltungsgebiet, nicht Ballungsraum). Im vorderen Feld sind die Ränge
 * eindeutig; im hinteren Feld liegen viele Städte nur wenige tausend
 * Einwohner auseinander, dort ist die Reihenfolge nicht auf den Rang genau.
 * Für den Importablauf genügt das – entscheidend ist, dass die größten Städte
 * zuerst kommen.
 *
 * Die Liste ist von Hand gepflegt und damit eine Übergangslösung: ToDo 2e.4
 * sieht vor, sie durch das amtliche Gemeindeverzeichnis des Statistischen
 * Bundesamts zu ersetzen. Spätestens für die Stufe „ab 20.000" ist das nötig –
 * abtippen skaliert nicht, und eine vergessene Stadt fällt niemandem auf.
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

  // Ab hier die Stufe „50.000 bis 100.000 Einwohner" (ToDo 2e.5).
  // Hanau stand als Großstadt bisher nicht im Register – es hat die Grenze von
  // 100.000 erst vor wenigen Jahren überschritten und war eine echte Lücke.
  ["Hanau", "hanau", 100_800, "Hessen"],
  ["Schwerin", "schwerin", 96_000, "Mecklenburg-Vorpommern"],
  ["Ludwigsburg", "ludwigsburg", 94_000, "Baden-Württemberg"],
  ["Esslingen am Neckar", "esslingen", 93_500, "Baden-Württemberg"],
  ["Gießen", "giessen", 92_900, "Hessen"],
  ["Iserlohn", "iserlohn", 92_400, "Nordrhein-Westfalen"],
  ["Düren", "dueren", 92_200, "Nordrhein-Westfalen"],
  ["Flensburg", "flensburg", 92_000, "Schleswig-Holstein"],
  ["Gera", "gera", 91_800, "Thüringen"],
  ["Tübingen", "tuebingen", 91_000, "Baden-Württemberg"],
  ["Zwickau", "zwickau", 87_200, "Sachsen"],
  ["Ratingen", "ratingen", 87_000, "Nordrhein-Westfalen"],
  ["Villingen-Schwenningen", "villingen-schwenningen", 86_300, "Baden-Württemberg"],
  ["Lünen", "luenen", 86_000, "Nordrhein-Westfalen"],
  ["Konstanz", "konstanz", 85_000, "Baden-Württemberg"],
  ["Worms", "worms", 84_000, "Rheinland-Pfalz"],
  ["Marl", "marl", 83_500, "Nordrhein-Westfalen"],
  ["Minden", "minden", 82_000, "Nordrhein-Westfalen"],
  ["Velbert", "velbert", 81_000, "Nordrhein-Westfalen"],
  ["Neumünster", "neumuenster", 80_500, "Schleswig-Holstein"],
  ["Norderstedt", "norderstedt", 80_000, "Schleswig-Holstein"],
  ["Dessau-Roßlau", "dessau-rosslau", 78_500, "Sachsen-Anhalt"],
  ["Lüneburg", "lueneburg", 78_000, "Niedersachsen"],
  ["Delmenhorst", "delmenhorst", 77_500, "Niedersachsen"],
  ["Bamberg", "bamberg", 77_200, "Bayern"],
  ["Marburg", "marburg", 77_000, "Hessen"],
  ["Viersen", "viersen", 76_800, "Nordrhein-Westfalen"],
  ["Rheine", "rheine", 76_000, "Nordrhein-Westfalen"],
  ["Gladbeck", "gladbeck", 75_500, "Nordrhein-Westfalen"],
  ["Troisdorf", "troisdorf", 75_000, "Nordrhein-Westfalen"],
  ["Bayreuth", "bayreuth", 74_800, "Bayern"],
  ["Dorsten", "dorsten", 74_500, "Nordrhein-Westfalen"],
  ["Detmold", "detmold", 74_000, "Nordrhein-Westfalen"],
  ["Landshut", "landshut", 73_500, "Bayern"],
  ["Castrop-Rauxel", "castrop-rauxel", 73_000, "Nordrhein-Westfalen"],
  ["Lüdenscheid", "luedenscheid", 72_500, "Nordrhein-Westfalen"],
  ["Arnsberg", "arnsberg", 72_200, "Nordrhein-Westfalen"],
  ["Brandenburg an der Havel", "brandenburg-havel", 72_000, "Brandenburg"],
  ["Aschaffenburg", "aschaffenburg", 71_500, "Bayern"],
  ["Bocholt", "bocholt", 71_000, "Nordrhein-Westfalen"],
  ["Celle", "celle", 70_000, "Niedersachsen"],
  ["Fulda", "fulda", 69_000, "Hessen"],
  ["Kempten (Allgäu)", "kempten", 68_900, "Bayern"],
  ["Aalen", "aalen", 68_500, "Baden-Württemberg"],
  ["Lippstadt", "lippstadt", 68_000, "Nordrhein-Westfalen"],
  ["Dinslaken", "dinslaken", 67_500, "Nordrhein-Westfalen"],
  ["Herford", "herford", 67_000, "Nordrhein-Westfalen"],
  ["Kerpen", "kerpen", 66_500, "Nordrhein-Westfalen"],
  ["Rüsselsheim am Main", "ruesselsheim", 66_000, "Hessen"],
  ["Neuwied", "neuwied", 65_500, "Rheinland-Pfalz"],
  ["Weimar", "weimar", 65_200, "Thüringen"],
  ["Sindelfingen", "sindelfingen", 65_000, "Baden-Württemberg"],
  ["Rosenheim", "rosenheim", 64_500, "Bayern"],
  ["Plauen", "plauen", 64_000, "Sachsen"],
  ["Grevenbroich", "grevenbroich", 63_500, "Nordrhein-Westfalen"],
  ["Neubrandenburg", "neubrandenburg", 63_000, "Mecklenburg-Vorpommern"],
  ["Friedrichshafen", "friedrichshafen", 62_500, "Baden-Württemberg"],
  ["Garbsen", "garbsen", 62_200, "Niedersachsen"],
  ["Bergheim", "bergheim", 62_000, "Nordrhein-Westfalen"],
  ["Hürth", "huerth", 61_500, "Nordrhein-Westfalen"],
  ["Schwäbisch Gmünd", "schwaebisch-gmuend", 61_000, "Baden-Württemberg"],
  ["Offenburg", "offenburg", 60_500, "Baden-Württemberg"],
  ["Greifswald", "greifswald", 60_000, "Mecklenburg-Vorpommern"],
  ["Wesel", "wesel", 59_800, "Nordrhein-Westfalen"],
  ["Göppingen", "goeppingen", 59_500, "Baden-Württemberg"],
  ["Neu-Ulm", "neu-ulm", 59_200, "Bayern"],
  ["Stralsund", "stralsund", 59_000, "Mecklenburg-Vorpommern"],
  ["Langenfeld (Rheinland)", "langenfeld", 58_800, "Nordrhein-Westfalen"],
  ["Unna", "unna", 58_500, "Nordrhein-Westfalen"],
  ["Lingen (Ems)", "lingen", 58_200, "Niedersachsen"],
  ["Euskirchen", "euskirchen", 58_000, "Nordrhein-Westfalen"],
  ["Hameln", "hameln", 57_500, "Niedersachsen"],
  ["Frankfurt (Oder)", "frankfurt-oder", 57_000, "Brandenburg"],
  ["Görlitz", "goerlitz", 56_500, "Sachsen"],
  ["Waiblingen", "waiblingen", 56_300, "Baden-Württemberg"],
  ["Sankt Augustin", "sankt-augustin", 56_200, "Nordrhein-Westfalen"],
  ["Hilden", "hilden", 56_100, "Nordrhein-Westfalen"],
  ["Eschweiler", "eschweiler", 56_000, "Nordrhein-Westfalen"],
  ["Stolberg (Rhld.)", "stolberg", 55_900, "Nordrhein-Westfalen"],
  ["Meerbusch", "meerbusch", 55_800, "Nordrhein-Westfalen"],
  ["Baden-Baden", "baden-baden", 55_200, "Baden-Württemberg"],
  ["Bad Homburg vor der Höhe", "bad-homburg", 55_000, "Hessen"],
  ["Langenhagen", "langenhagen", 54_800, "Niedersachsen"],
  ["Pulheim", "pulheim", 54_600, "Nordrhein-Westfalen"],
  ["Wetzlar", "wetzlar", 54_000, "Hessen"],
  ["Nordhorn", "nordhorn", 53_900, "Niedersachsen"],
  ["Schweinfurt", "schweinfurt", 53_800, "Bayern"],
  ["Hattingen", "hattingen", 53_500, "Nordrhein-Westfalen"],
  ["Willich", "willich", 52_800, "Nordrhein-Westfalen"],
  ["Ibbenbüren", "ibbenbueren", 52_000, "Nordrhein-Westfalen"],
  ["Passau", "passau", 51_900, "Bayern"],
  ["Wolfenbüttel", "wolfenbuettel", 51_800, "Niedersachsen"],
  ["Elmshorn", "elmshorn", 51_500, "Schleswig-Holstein"],
  ["Speyer", "speyer", 51_200, "Rheinland-Pfalz"],
  ["Bad Kreuznach", "bad-kreuznach", 51_000, "Rheinland-Pfalz"],
  ["Ravensburg", "ravensburg", 50_900, "Baden-Württemberg"],
  ["Böblingen", "boeblingen", 50_800, "Baden-Württemberg"],
  ["Gummersbach", "gummersbach", 50_700, "Nordrhein-Westfalen"],
  ["Goslar", "goslar", 50_500, "Niedersachsen"],
  ["Rastatt", "rastatt", 50_400, "Baden-Württemberg"],
  ["Peine", "peine", 50_300, "Niedersachsen"],
  ["Emden", "emden", 50_200, "Niedersachsen"],
  ["Lörrach", "loerrach", 50_100, "Baden-Württemberg"],
  ["Freising", "freising", 50_000, "Bayern"],
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
