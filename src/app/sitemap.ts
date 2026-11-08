import type { MetadataRoute } from "next";
import { getCities } from "@/lib/parking/spots";
import { cityGroups, letterPath } from "./parkplaetze/verzeichnis";

/**
 * Sitemap (ToDo 19.12): die festen Seiten und eine Seite je Stadt.
 *
 * Ohne sie müsste eine Suchmaschine die Städte über Links finden; die Karte
 * verlinkt sie nicht, weil sie ihre Standorte nachlädt. Mit dieser Datei
 * kennt Google alle `/parkplaetze/<stadt>`-Adressen. Die Grenze liegt bei
 * 50.000 Einträgen je Datei; derzeit sind es einige tausend.
 *
 * `lastModified` ist der Importtag der Stadt: Er ändert sich nur, wenn sich
 * die Daten ändern, und sagt Google, wann ein erneuter Besuch lohnt.
 */
const BASE = "https://wheelee.de";

export default function sitemap(): MetadataRoute.Sitemap {
  // `/parkplaetze` ist das Verzeichnis (19.17) – der Weg, auf dem eine
  // Suchmaschine die Stadtseiten über Links statt nur über diese Datei findet.
  const fixed = ["/", "/info", "/parkplaetze", "/quellen", "/abdeckung"].map((path) => ({
    url: `${BASE}${path === "/" ? "" : path}`,
    changeFrequency: "weekly" as const,
    priority: path === "/" ? 1 : path === "/parkplaetze" ? 0.7 : 0.5,
  }));

  // Je Anfangsbuchstabe eine Seite (19.17). Sie stehen hier, weil sie die
  // Verweise auf die Stadtseiten tragen: Findet eine Suchmaschine sie nicht,
  // sind die Stadtseiten wieder so verwaist wie vorher.
  const letters = cityGroups(getCities()).letters.map((letter) => ({
    url: `${BASE}${letterPath(letter)}`,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  const cities = getCities().map((city) => ({
    url: `${BASE}/parkplaetze/${city.slug}`,
    lastModified: city.importedAt,
    changeFrequency: "monthly" as const,
    // Städte mit amtlicher Liste zuerst: Sie sind vollständiger.
    priority: city.coverage === "official" ? 0.8 : 0.4,
  }));

  return [...fixed, ...letters, ...cities];
}
