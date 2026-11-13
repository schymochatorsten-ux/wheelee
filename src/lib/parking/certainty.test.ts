import { describe, expect, it } from "vitest";
import type { ParkingSpot } from "../types";
import {
  confirmationThreshold,
  isUncertain,
  removalThreshold,
  uncertaintyReasons,
} from "./certainty";

/**
 * Sicher oder unsicher (ToDo 8.11).
 *
 * **Diese Regel entscheidet, wie leicht ein Parkplatz verschwindet** – sie ist
 * deshalb eine reine Funktion und wird hier auf jeden einzelnen Grund geprüft.
 * Ein Fehler hier wäre nicht sichtbar: Ein Platz würde entweder zu früh
 * verschwinden oder gar nicht, und beides fällt im Betrieb erst auf, wenn es
 * zu spät ist.
 */

const SICHER: ParkingSpot = {
  id: "frankfurt-0001",
  city: "frankfurt",
  label: "Musterstraße 1",
  street: "Musterstraße",
  houseNumber: "1",
  note: null,
  timeRestriction: null,
  district: "Innenstadt",
  spotCount: 2,
  lat: 50.11,
  lng: 8.68,
  geoAccuracy: "house",
  source: "Stadt Frankfurt am Main",
};

const POLICY = { schwelleUnsicher: 2, schwelleSicher: 5 };

describe("Unsicherheit", () => {
  it("hält einen amtlichen, hausgenauen Standort für gesichert", () => {
    expect(uncertaintyReasons(SICHER)).toEqual([]);
    expect(isUncertain(SICHER)).toBe(false);
    expect(removalThreshold(SICHER, POLICY)).toBe(5);
  });

  it("erkennt einen gemeldeten Standort", () => {
    const spot = { ...SICHER, origin: "gemeldet" as const };
    expect(uncertaintyReasons(spot)).toEqual(["gemeldet"]);
    expect(removalThreshold(spot, POLICY)).toBe(2);
  });

  it("erkennt einen Standort, den nur OpenStreetMap kennt", () => {
    const spot = { ...SICHER, confirmation: "nur_osm" as const };
    expect(uncertaintyReasons(spot)).toEqual(["nur_osm"]);
  });

  it("erkennt eine ungenaue Lage – auch bei bestätigter Existenz", () => {
    /*
     * Der Fall, der sich am leichtesten falsch bauen lässt: Zwei Quellen
     * kennen den Platz, aber die Koordinate ist ein Geländemittelpunkt.
     * Bestätigt ist dann seine **Existenz**, nicht seine Lage – und wer auf
     * die letzten Meter angewiesen ist, hat von der Existenz allein nichts.
     */
    const spot = {
      ...SICHER,
      geoAccuracy: "approximate" as const,
      confirmation: "bestaetigt" as const,
    };
    expect(uncertaintyReasons(spot)).toEqual(["lage"]);
    expect(isUncertain(spot)).toBe(true);
  });

  it("erkennt eine vom Import gekennzeichnete Zeile", () => {
    const spot = { ...SICHER, unsicher: true };
    expect(uncertaintyReasons(spot)).toEqual(["quelle"]);
  });

  it("nennt alle Gründe, nicht nur den ersten", () => {
    const spot = {
      ...SICHER,
      origin: "gemeldet" as const,
      geoAccuracy: "street" as const,
      unsicher: true,
    };
    expect(uncertaintyReasons(spot)).toEqual(["gemeldet", "lage", "quelle"]);
  });

  it("verlangt für einen gemeldeten Platz die Schwelle der gesicherten", () => {
    /*
     * **Die Asymmetrie ist Absicht** (Torsten, 2026-11-13): Aufnehmen muss
     * schwerer sein als loswerden. Ein zu Unrecht entfernter Platz ist ein
     * Verlust, ein zu Unrecht aufgenommener eine vergebliche Fahrt.
     */
    expect(confirmationThreshold(POLICY)).toBe(5);
    expect(confirmationThreshold(POLICY)).toBeGreaterThan(POLICY.schwelleUnsicher);
  });
});
