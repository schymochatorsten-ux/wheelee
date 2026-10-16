import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Für den Betrieb im Container: `standalone` legt unter
   * `.next/standalone` einen eigenständigen Server mit genau den
   * `node_modules` ab, die er wirklich braucht.
   *
   * Der Unterschied ist nicht kosmetisch: Ohne diese Einstellung müsste das
   * Abbild den vollständigen `node_modules`-Baum mitschleppen – mehrere
   * hundert Megabyte, von denen das Meiste Bauwerkzeug ist (TypeScript,
   * Vitest, Playwright, die Importskripte). Die Parkplatzdaten selbst sind
   * statisch importiert und liegen damit im Bundle; zur Laufzeit wird keine
   * Datei aus `data/` gelesen.
   *
   * **Ein Volume braucht der Container seit dem 2026-10-11 doch** – nicht für
   * die Parkplatzdaten, sondern für die Konten und Rückmeldungen in SQLite.
   * Sie liegen unter `/app/var`, und das ist der einzige Pfad, der einen
   * Neubau des Abbilds überlebt (siehe docker-compose.yml).
   */
  output: "standalone",
};

export default nextConfig;
