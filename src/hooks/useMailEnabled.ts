"use client";

import { useEffect, useState } from "react";

/**
 * Ob der Mailversand eingerichtet ist (D-10). Bis die Antwort da ist – und bei
 * jedem Fehler – gilt „nein": Lieber fehlt kurz ein Knopf, als dass ein Knopf
 * angeboten wird, der nichts verschickt.
 */
export function useMailEnabled(): boolean {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    let active = true;
    fetch("/api/mail")
      .then((response) => (response.ok ? response.json() : { enabled: false }))
      .then((data: { enabled?: boolean }) => {
        if (active) setEnabled(data.enabled === true);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  return enabled;
}
