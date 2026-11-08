import { expect, test } from "@playwright/test";
import { herkunft } from "./herkunft";

/**
 * Es gibt genau **einen** Scrollbalken, und man scrollt nicht ins Leere
 * (ToDo 9.22).
 *
 * **Warum dafür ein E2E-Test und kein Unit-Test:** Der Fehler war keiner im
 * Verhalten, sondern im Zusammenspiel von zwei CSS-Eigenschaften. `sr-only`
 * ist in Tailwind `position: absolute`; fehlt dem scrollenden Kasten
 * `position: relative`, ist der Bezugsrahmen solcher Überschriften das
 * umgebende `main` – sie werden vom `overflow` nicht erfasst, stehen an ihrer
 * statischen Stelle weit unten und ziehen die ganze Seite auf. Gemessen bei
 * 1280 × 860 mit angemeldetem Konto: `body.scrollHeight` 1876 statt 860, also
 * über tausend Pixel Leere unter dem Inhalt, plus ein zweiter Scrollbalken.
 *
 * Kein Unit-Test findet das, und beim Draufschauen fällt es nur auf, wenn der
 * Inhalt lang genug ist – also **angemeldet**, denn erst dann reicht der
 * Einstellungsreiter über den Bildschirm hinaus. Genau deshalb ist es lange
 * niemandem aufgefallen.
 */

const PASSWORT = "ein gutes langes Passwort";

test.describe("Kein zweiter Scrollbalken", () => {
  test.use({ viewport: { width: 1280, height: 860 } });

  test("der Einstellungsreiter scrollt nur in sich, auch angemeldet", async ({ page, request }) => {
    const adresse = `e2e-scroll-${Date.now()}-${Math.floor(Math.random() * 1e6)}@example.org`;
    const angelegt = await request.post("/api/auth/register", {
      data: { email: adresse, password: PASSWORT },
      headers: herkunft(),
    });
    expect(angelegt.status()).toBe(200);

    await page.goto("/");
    await page.getByRole("tab", { name: "Einstellungen" }).click();
    await expect(page.getByRole("heading", { name: "Darstellung" })).toBeVisible();

    // Das Fenster selbst darf nicht scrollen: Die Bildschirmhöhe hält das
    // Layout, gescrollt wird nur im Inhaltskasten.
    const fenster = await page.evaluate(() => {
      window.scrollTo(0, 5000);
      return {
        scrollY: window.scrollY,
        bodyScrollHeight: document.body.scrollHeight,
        innerHeight: window.innerHeight,
      };
    });

    expect(fenster.scrollY).toBe(0);
    // Ein Pixel Toleranz für gebrochene Zoomstufen.
    expect(fenster.bodyScrollHeight).toBeLessThanOrEqual(fenster.innerHeight + 1);

    // Und es gibt genau einen scrollenden Kasten, nicht zwei.
    const scrollende = await page.evaluate(
      () =>
        [...document.querySelectorAll("*")].filter((element) => {
          const style = getComputedStyle(element);
          return (
            element.scrollHeight - element.clientHeight > 4 &&
            /auto|scroll/.test(style.overflowY) &&
            element.clientHeight > 0
          );
        }).length,
    );
    expect(scrollende).toBe(1);
  });
});
