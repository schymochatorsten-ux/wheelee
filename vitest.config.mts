import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

export default defineConfig({
  // tsconfig steht auf `jsx: preserve` (Next übernimmt das Übersetzen); für
  // Tests, die Seiten rendern, muss Vite es selbst tun.
  oxc: { jsx: { runtime: "automatic" } },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    environment: "node",
    // Die Importskripte liegen als .mts vor, damit tsx sie als ESM lädt.
    include: ["src/**/*.test.ts", "scripts/**/*.test.{ts,mts}"],
  },
});
