import { describe, expect, it } from "vitest";
import { detectMapsTarget, MAPS_APPS, mapsLabel, mapsShortLabel, mapsUrl } from "./navigation";

const spot = { lat: 50.1138, lng: 8.6794, label: "Zeil 15 / Nähe Zentralbibliothek" };

describe("detectMapsTarget", () => {
  it("erkennt Apple-Geräte", () => {
    expect(detectMapsTarget("Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)")).toBe(
      "apple",
    );
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

  it("unterstützt die weiteren Karten-Apps", () => {
    expect(mapsUrl(spot, "osm")).toContain("openstreetmap.org/directions");
    expect(mapsUrl(spot, "waze")).toContain("waze.com/ul?ll=50.1138,8.6794");
    expect(mapsUrl(spot, "here")).toContain("share.here.com");
    // Der geo:-Link überlässt dem Betriebssystem die Wahl der App.
    expect(mapsUrl(spot, "geo")).toBe("geo:50.1138,8.6794?q=50.1138,8.6794");
  });

  it("führt immer über die Koordinate, nie über die Adresse", () => {
    // Bei vielen Parkplätzen ist der Straßenname nur die nächstgelegene
    // Straße – die Koordinate stimmt dagegen.
    for (const app of MAPS_APPS) {
      const url = mapsUrl(spot, app.id);
      expect(url, app.id).toContain("50.1138");
      expect(url, app.id).toContain("8.6794");
    }
  });
});

describe("MAPS_APPS", () => {
  it("hat eindeutige Kennungen und Beschriftungen", () => {
    const ids = MAPS_APPS.map((app) => app.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const app of MAPS_APPS) {
      expect(app.label.length).toBeGreaterThan(0);
      expect(app.shortLabel.length).toBeGreaterThan(0);
    }
  });

  it("liefert für jede App einen Kurznamen", () => {
    expect(mapsShortLabel("waze")).toBe("Waze");
    expect(mapsShortLabel("apple")).toBe("Apple Karten");
  });
});
