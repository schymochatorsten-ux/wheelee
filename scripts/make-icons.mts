/**
 * Erzeugt die PNG-Symbole der App aus `public/icon.svg`.
 *
 *     npm run icons
 *
 * Nötig, weil Android und iOS für den Startbildschirm PNG erwarten; SVG
 * allein genügt nicht. Das Maskable-Symbol bekommt zusätzlichen Rand, damit
 * Android es beschneiden kann, ohne das Motiv anzuschneiden.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.join(projectRoot, "public", "icon.svg");

/** Android beschneidet maskable Symbole auf etwa 80 % – deshalb Luft lassen. */
const MASKABLE_SCALE = 0.72;

async function main() {
  const svg = await fs.readFile(source);

  for (const size of [192, 512]) {
    await sharp(svg, { density: 384 })
      .resize(size, size)
      .png()
      .toFile(path.join(projectRoot, "public", `icon-${size}.png`));
    console.log(`icon-${size}.png`);
  }

  const inner = Math.round(512 * MASKABLE_SCALE);
  const padding = Math.round((512 - inner) / 2);

  await sharp(svg, { density: 384 })
    .resize(inner, inner)
    .extend({
      top: padding,
      bottom: padding,
      left: padding,
      right: padding,
      background: "#1d4ed8",
    })
    // Die abgerundeten Ecken des Quellsymbols sind durchsichtig und blieben im
    // Maskable-Symbol als weiße Zacken stehen; Android beschneidet es ohnehin selbst.
    .flatten({ background: "#1d4ed8" })
    .png()
    .toFile(path.join(projectRoot, "public", "icon-maskable.png"));
  console.log("icon-maskable.png");

  // Favicon in der Größe, die Browser in der Tableiste nutzen.
  await sharp(svg, { density: 384 })
    .resize(32, 32)
    .png()
    .toFile(path.join(projectRoot, "public", "favicon.png"));
  console.log("favicon.png");
}

await main();
