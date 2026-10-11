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
   * Datei aus `data/` gelesen und kein Volume gebraucht.
   */
  output: "standalone",
};

export default nextConfig;
