import type { Metadata } from "next";
import { ConfirmEmailForm } from "@/components/ConfirmEmailForm";

/**
 * Adresswechsel bestätigen (ToDo 11.8). Das Token kommt im Fragment des Links –
 * siehe `ConfirmEmailForm`.
 */

export const metadata: Metadata = {
  title: "E-Mail-Adresse bestätigen – wheelee",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

export default function EmailBestaetigen() {
  return <ConfirmEmailForm />;
}
