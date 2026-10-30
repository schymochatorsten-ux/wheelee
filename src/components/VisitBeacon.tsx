"use client";

import { useEffect } from "react";

/**
 * Meldet der App einmal je Seitenaufruf, dass jemand da ist (ToDo 20.1).
 *
 * **Kein Cookie, kein Speicher im Browser, keine Kennung im Aufruf** – der Ping
 * hat nicht einmal einen Rumpf. Was der Server daraus macht, steht in
 * `src/lib/visits.ts` und in der Datenschutzerklärung.
 *
 * Er geht erst, wenn die Seite **sichtbar** ist: Ein Tab, den der Browser vorab
 * lädt oder im Hintergrund öffnet, ist noch kein Besuch. Automatisierte
 * Browser (`navigator.webdriver`) melden sich gar nicht.
 */
/**
 * Einmal je Seitenaufruf, **nicht je Einbau der Komponente**: Im
 * Entwicklungsbetrieb baut React sie zweimal ein und wieder ab (Strict Mode),
 * und ein Zähler je Einbau schickte dann zwei Pings. Ein Wert auf Modulebene
 * lebt genau so lange wie die geladene Seite.
 */
let sentForThisPage = false;

export function VisitBeacon() {
  useEffect(() => {
    if (navigator.webdriver) return;

    const send = () => {
      if (sentForThisPage || document.visibilityState !== "visible") return;
      sentForThisPage = true;
      document.removeEventListener("visibilitychange", send);
      // Ein Fehler (kein Netz, Werbeblocker) ist kein Fehler der Seite.
      fetch("/api/visit", { method: "POST", keepalive: true }).catch(() => {});
    };

    send();
    document.addEventListener("visibilitychange", send);
    return () => document.removeEventListener("visibilitychange", send);
  }, []);

  return null;
}
