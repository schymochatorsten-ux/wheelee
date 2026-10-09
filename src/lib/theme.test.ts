import { beforeEach, describe, expect, it, vi } from "vitest";
import { DEFAULT_THEME, isTheme, readTheme, STORAGE_KEY, themeInitScript, THEMES } from "./theme";

describe("Theme-Grundlagen", () => {
  it("hat Dunkel als Vorgabe", () => {
    expect(DEFAULT_THEME).toBe("dark");
  });

  it("bietet Dunkel, Hell und System an", () => {
    expect(THEMES.map((option) => option.id)).toEqual(["dark", "light", "system"]);
  });

  it("erkennt gültige Werte", () => {
    expect(isTheme("dark")).toBe(true);
    expect(isTheme("system")).toBe(true);
    expect(isTheme("blau")).toBe(false);
    expect(isTheme(null)).toBe(false);
  });
});

describe("themeInitScript", () => {
  it("nennt den Speicherschlüssel und die Vorgabe", () => {
    expect(themeInitScript).toContain(JSON.stringify(STORAGE_KEY));
    expect(themeInitScript).toContain(JSON.stringify(DEFAULT_THEME));
  });

  it("fängt blockierten Speicher ab", () => {
    // Im privaten Modus wirft der Zugriff auf localStorage; ohne try/catch
    // bliebe die Seite ungestylt.
    expect(themeInitScript).toContain("try");
    expect(themeInitScript).toContain("catch");
  });

  it("setzt data-theme, worauf das CSS reagiert", () => {
    expect(themeInitScript).toContain("dataset.theme");
  });

  it("ist für sich allein lauffähig, ohne Importe", () => {
    expect(themeInitScript).not.toContain("import ");
    expect(() => new Function(themeInitScript)).not.toThrow();
  });
});

describe("readTheme", () => {
  beforeEach(() => {
    vi.unstubAllGlobals();
  });

  it("liefert die Vorgabe ohne gespeicherten Wert", () => {
    vi.stubGlobal("window", { localStorage: { getItem: () => null } });
    expect(readTheme()).toBe("dark");
  });

  it("liefert den gespeicherten Wert", () => {
    vi.stubGlobal("window", { localStorage: { getItem: () => "light" } });
    expect(readTheme()).toBe("light");
  });

  it("verwirft unsinnige Werte", () => {
    vi.stubGlobal("window", { localStorage: { getItem: () => "lila" } });
    expect(readTheme()).toBe("dark");
  });

  it("verträgt blockierten Speicher", () => {
    vi.stubGlobal("window", {
      localStorage: {
        getItem: () => {
          throw new Error("Zugriff verweigert");
        },
      },
    });
    expect(readTheme()).toBe("dark");
  });
});
