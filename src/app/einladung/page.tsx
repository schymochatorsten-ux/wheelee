import type { Metadata } from "next";
import { InvitationForm } from "@/components/InvitationForm";

/**
 * Einladung annehmen (ToDo 18.2). Das Token kommt im Fragment des Links und
 * wird nur im Browser gelesen – siehe `InvitationForm`.
 */

export const metadata: Metadata = {
  title: "Einladung – wheelee",
  // Eine Einladungsseite gehört in keinen Suchindex.
  robots: { index: false, follow: false },
  // Kein Referer beim Verlassen der Seite.
  referrer: "no-referrer",
};

export default function Einladung() {
  return <InvitationForm />;
}
