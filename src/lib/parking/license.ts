/**
 * Quellenangabe und Lizenz je Stadt.
 *
 * Für eine veröffentlichte Karte ist die Lizenz keine Formsache: OpenStreetMap
 * steht unter ODbL und verlangt die Namensnennung, und jede amtliche Quelle
 * bringt eigene Bedingungen mit. Wer die Daten weitergibt, ohne sie zu nennen,
 * verletzt die Lizenz – deshalb muss die Oberfläche sie zeigen können.
 *
 * Der Importer schreibt die Lizenz seit 2026-10-10 als eigenes Feld. Ältere
 * Seed-Dateien führen sie nur eingebettet in der Quellenangabe
 * („Titel – Stadt (Lizenz)"); für die zerlegt `splitSource` den Text. Lieber
 * hier an einer Stelle zerlegen als 187 Dateien umschreiben – und wenn eine
 * Stadt neu importiert wird, kommt das Feld ohnehin sauber aus der Quelle.
 */

export interface SourceInfo {
  /** Titel des Datensatzes, ohne angehängte Lizenz. */
  title: string;
  /**
   * Lizenz im Klartext, oder `null`, wenn die Quelle keine nennt.
   *
   * `null` ist ein echtes Ergebnis und kein Fehler: GovData führt bei vielen
   * Datensätzen keine Lizenz. Das zu verschweigen wäre schlechter, als es
   * offen „nicht angegeben" zu nennen.
   */
  license: string | null;
}

/** Formulierungen, mit denen Portale „keine Lizenz hinterlegt" ausdrücken. */
const UNKNOWN = /^(nicht angegeben|unbekannt|keine angabe|none|null)$/iu;

/**
 * Quellenangabe in Titel und Lizenz zerlegen.
 *
 * Erwartet wird die Form, die der Importer schreibt: `Titel – Stadt (Lizenz)`.
 * Alles andere bleibt unverändert als Titel stehen – im Zweifel lieber die
 * Rohangabe zeigen als einen falsch zerlegten Text.
 */
export function splitSource(source: string): SourceInfo {
  const text = source.trim();

  // OpenStreetMap trägt die Lizenz im selben Format, ist aber immer ODbL.
  const match = /^(?<title>.*?)\s*\((?<license>[^()]*)\)\s*$/u.exec(text);
  if (!match?.groups) return { title: text, license: null };

  const license = match.groups.license.trim();
  return {
    title: match.groups.title.trim(),
    license: license.length === 0 || UNKNOWN.test(license) ? null : license,
  };
}

/**
 * Lizenz einer Stadt bestimmen – aus dem eigenen Feld, sonst aus der
 * Quellenangabe.
 */
export function licenseOf(seed: { source: string; license?: string | null }): string | null {
  if (seed.license && !UNKNOWN.test(seed.license.trim())) return seed.license.trim();
  return splitSource(seed.source).license;
}

/**
 * Attributionszeile für eine Stadt: Titel und Lizenz, so wie sie unter der
 * Karte und in der Quellenliste stehen soll.
 */
export function attributionOf(seed: { source: string; license?: string | null }): string {
  const { title } = splitSource(seed.source);
  const license = licenseOf(seed);
  return license ? `${title} (${license})` : title;
}
