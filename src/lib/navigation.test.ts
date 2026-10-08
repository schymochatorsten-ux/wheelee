import { describe, expect, it } from "vitest";
import { detectMapsTarget, mapsLabel, mapsUrl } from "./navigation";

const spot = { lat: 50.1138, lng: 8.6794, label: "Zeil 15 / Nähe Zentralbibliothek" };

describe("detectMapsTarget", () => {
  it("erkennt Apple-Geräte", () => {
    expect(detectMapsTarget("Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)")).toBe("apple");
    expect(detectMapsTarget("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)")).toBe("apple");
  });

  it("nimmt sonst Google Maps", () => {
    expect(detectMapsTarget("Mozilla/5.0 (Linux; Android 14; Pixel 8)")).toBe("google");
    expect(detectMapsTarget("Mozilla/5.0 (Windows NT 10.0; Win64; x64)")).toBe("google");
  });
});

describe("mapsLabel", () => {
  it("benennt die Karten-App des Geräts", () => {
    expect(mapsLabel("apple")).toBe("In Apple Karten öffnen");
    expect(mapsLabel("google")).toBe("In Google Maps öffnen");
  });
});

describe("mapsUrl", () => {
  it("baut einen Apple-Karten-Link mit Koordinate", () => {
    const url = mapsUrl(spot, "apple");
    expect(url).toContain("maps.apple.com");
    expect(url).toContain("daddr=50.1138,8.6794");
  });

  it("baut einen Google-Maps-Link mit Koordinate", () => {
    const url = mapsUrl(spot, "google");
    expect(url).toContain("google.com/maps/dir/");
    expect(url).toContain("destination=50.1138,8.6794");
  });

  it("gibt ohne Koordinate null zurück", () => {
    expect(mapsUrl({ lat: null, lng: null, label: "irgendwo" }, "google")).toBeNull();
  });
});
