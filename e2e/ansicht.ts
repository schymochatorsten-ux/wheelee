import { expect, type Page } from "@playwright/test";

/**
 * Die Ansicht wechseln – auf dem Telefon über das Zahnrad, auf dem Rechner
 * direkt (ToDo 9.34).
 *
 * **Warum ein Helfer und nicht 43-mal derselbe Klick.** Seit dem 2026-11-11
 * liegen die Reiter auf schmalen Bildschirmen hinter einem Menü; die Tests
 * laufen im Telefonformat (`Pixel 7`). Jeder Test hätte sonst dieselben zwei
 * Zeilen – und beim nächsten Umbau der Kopfzeile wären es wieder 43 Stellen.
 *
 * Es sind **dieselben Reiter** wie auf dem Rechner (`role=tab` in einer
 * `tablist`), nur in einem Menü; deshalb genügt es, das Menü zu öffnen, wenn
 * der gesuchte Reiter nicht schon sichtbar ist.
 */
export async function ansicht(page: Page, name: string | RegExp): Promise<void> {
  const reiter = page.getByRole("tab", { name });

  if (!(await reiter.isVisible().catch(() => false))) {
    // Über `data-testid` und nicht über den Namen: Der Knopf heißt in jeder
    // Sprache anders, und `sprache.spec.ts` wechselt sie.
    await page.getByTestId("ansicht-menue").click();
    await expect(reiter).toBeVisible();
  }

  await reiter.click();
}
