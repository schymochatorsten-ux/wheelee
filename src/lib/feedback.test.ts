import { describe, expect, it } from "vitest";
import { FEEDBACK_SUBJECT, feedbackBody, feedbackMailto, hasFeedbackAddress } from "./feedback";
import type { ParkingSpot } from "./types";

const spot: ParkingSpot = {
  id: "frankfurt-abc123",
  city: "frankfurt",
  label: "Berger Straße 106",
  street: "Berger Straße",
  houseNumber: "106",
  note: null,
  timeRestriction: null,
  district: "Nordend-Ost",
  spotCount: 1,
  lat: 50.1281,
  lng: 8.6997,
  geoAccuracy: "house",
  source: "Stadt Frankfurt am Main, Open Data (WFS Parken)",
};

describe("Betreff", () => {
  it("lautet genau wie festgelegt", () => {
    expect(FEEDBACK_SUBJECT).toBe("Wheelee Fehlermeldung");
  });
});

describe("feedbackBody", () => {
  it("nennt Parkplatz, Stadt und Kennung", () => {
    const body = feedbackBody({ spot });
    expect(body).toContain("Berger Straße 106");
    expect(body).toContain("Nordend-Ost");
    // Die Kennung erspart jede Rückfrage, welcher Parkplatz gemeint ist.
    expect(body).toContain("frankfurt-abc123");
  });

  it("funktioniert auch ohne Parkplatz", () => {
    const body = feedbackBody({ url: "https://example.org/" });
    expect(body).toContain("Bitte beschreibe hier");
    expect(body).not.toContain("Kennung");
  });

  it("schickt den Standort der Nutzer:in nicht mit", () => {
    // Der Standort verlässt das Gerät nirgends – auch nicht über diesen Weg.
    const body = feedbackBody({ spot, userAgent: "Testbrowser" });
    expect(body).not.toMatch(/eigener Standort|meine Position/iu);
  });

  it("lässt leere Angaben weg statt leere Zeilen zu erzeugen", () => {
    const body = feedbackBody({});
    expect(body).not.toContain("Browser:");
    expect(body).not.toContain("Seite:");
  });
});

describe("feedbackMailto", () => {
  it("baut einen mailto-Link mit kodiertem Betreff", () => {
    const url = feedbackMailto({ spot });
    expect(url.startsWith("mailto:")).toBe(true);
    expect(url).toContain(`subject=${encodeURIComponent(FEEDBACK_SUBJECT)}`);
    expect(url).toContain("body=");
  });
});

describe("hasFeedbackAddress", () => {
  it("meldet, solange keine echte Adresse hinterlegt ist", () => {
    // Schlägt absichtlich um, sobald D-06 entschieden und eingetragen ist –
    // dann ist dieser Test anzupassen.
    expect(hasFeedbackAddress).toBe(false);
  });
});
