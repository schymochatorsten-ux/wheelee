import { NextResponse, type NextRequest } from "next/server";
import { contentSecurityPolicy } from "@/lib/csp";

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
 */
export function middleware(request: NextRequest) {
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
