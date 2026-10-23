import { describe, expect, it } from "vitest";
import { MIN_ZOOM_FOR_MARKERS, truncationHint } from "./map-hint";

describe("truncationHint", () => {
  it("schweigt, wenn alles geladen ist – auch bei niedriger Stufe", () => {
    expect(truncationHint(false, 4)).toBe("none");
    expect(truncationHint(false, 14)).toBe("none");
    expect(truncationHint(false, null)).toBe("none");
  });

  it("fordert ab der Schwelle zum Heranzoomen auf", () => {
    expect(truncationHint(true, MIN_ZOOM_FOR_MARKERS)).toBe("zoom-in");
    expect(truncationHint(true, 13)).toBe("zoom-in");
  });

  it("verweist darunter auf Stadtgröße", () => {
    expect(truncationHint(true, MIN_ZOOM_FOR_MARKERS - 1)).toBe("city-level");
    expect(truncationHint(true, 5)).toBe("city-level");
  });

  it("nimmt ohne bekannte Stufe den milderen Hinweis", () => {
    expect(truncationHint(true, null)).toBe("zoom-in");
  });
});
