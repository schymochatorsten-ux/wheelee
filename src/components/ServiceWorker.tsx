"use client";

import { useEffect, useState } from "react";
import { useT } from "@/i18n/context";

/**
 * Meldet den Service Worker an und sagt, wenn das Netz weg ist.
 *
 * Beides gehört zusammen: Der Service Worker sorgt dafür, dass im Funkloch
 * **etwas** da ist, und der Hinweis dafür, dass niemand veraltete Angaben für
 * frische hält. Eine App, die offline stillschweigend alte Daten zeigt, ist
 * gefährlicher als eine, die ehrlich sagt, dass sie gerade nichts Neues weiß.
 *
 * Nur im Produktionsbetrieb: Im Entwicklungsbetrieb würde ein Service Worker
 * die eigenen Änderungen zwischenspeichern und das Nachladen verwirren.
 */
export function ServiceWorker() {
  const t = useT();
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;

    navigator.serviceWorker.register("/sw.js").catch(() => {
      // Ohne Service Worker funktioniert die App weiterhin, nur eben nicht
      // im Funkloch. Kein Grund, jemanden mit einer Fehlermeldung zu behelligen.
    });
  }, []);

  useEffect(() => {
    const update = () => setOffline(!navigator.onLine);
    update();
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);

  if (!offline) return null;

  return (
    <p
      role="status"
      className="shrink-0 bg-amber-200 px-4 py-2 text-center text-sm font-medium text-amber-950"
    >
      {t("offline.notice")}
    </p>
  );
}
