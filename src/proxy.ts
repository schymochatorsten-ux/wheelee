import { NextResponse, type NextRequest } from "next/server";
import { contentSecurityPolicy } from "@/lib/csp";
import { judgeWritingRequest } from "@/lib/request-origin";

/**
 * Inhaltsrichtlinie mit Nonce je Anfrage (ToDo 10.7).
 *
 * Die Richtlinie steht **nicht mehr in `next.config.ts`**, weil sie dort für
 * alle Anfragen gleich wäre – eine Nonce, die sich nicht ändert, schützt vor
 * nichts. Hier entsteht je Anfrage eine neue.
 *
 * Die Nonce geht an zwei Stellen weiter:
 *
 * - **Nexts eigene Skripte:** Next liest die Nonce aus der
 *   `Content-Security-Policy` der *Anfrage* und setzt sie auf die
 *   Hydrationsskripte. Deshalb wird die Richtlinie auch auf die Anfrage
 *   geschrieben und nicht nur auf die Antwort.
 * - **Das Theme-Skript** in `layout.tsx`: Es liest sie aus `x-nonce`.
 *
 * Folge: Jede Seite, die die Nonce braucht, wird je Anfrage gerendert und nicht
 * vorab erzeugt. Das betrifft hier alle Seiten.
 *
 * **Bis zum 2026-10-30 hieß die Datei `src/middleware.ts`** (ToDo 1.8): Next 16
 * nennt die Konvention `proxy` und meldet die alte als veraltet. Inhalt und
 * Verhalten sind unverändert; die Funktion läuft jetzt in der Node-Laufzeit
 * statt in der Edge-Laufzeit.
 */
export function proxy(request: NextRequest) {
  /*
   * Schreibende Aufrufe der Schnittstelle (ToDo 10.13). Die Antwort nennt nur
   * den Grund in einem Wort – keine Hosts, keine Kopfzeilenwerte.
   */
  if (request.nextUrl.pathname.startsWith("/api/")) {
    const verdict = judgeWritingRequest(request.method, request.headers);
    if (verdict === "foreign-origin") {
      return NextResponse.json({ error: "forbidden" }, { status: 403 });
    }
    if (verdict === "payload-too-large") {
      return NextResponse.json({ error: "payload_too_large" }, { status: 413 });
    }
    if (verdict === "unsupported-media-type") {
      return NextResponse.json({ error: "unsupported_media_type" }, { status: 415 });
    }
  }

  const nonce = btoa(crypto.randomUUID());
  const policy = contentSecurityPolicy(nonce, process.env.NODE_ENV === "development");

  const headers = new Headers(request.headers);
  headers.set("x-nonce", nonce);
  headers.set("Content-Security-Policy", policy);

  const response = NextResponse.next({ request: { headers } });
  response.headers.set("Content-Security-Policy", policy);
  return response;
}

export const config = {
  /*
   * Ohne statische Dateien und ohne den Service Worker. Dessen Skript bekommt
   * keine Richtlinie (Begründung in `next.config.ts`); Bilder und Bündel haben
   * keine Seite, die eine Nonce bräuchte.
   */
  matcher: ["/((?!_next/static|_next/image|sw\\.js$|.*\\.(?:png|svg|jpg|ico|webmanifest)$).*)"],
};
