"use client";

import { usePathname } from "next/navigation";
import { companyInfo } from "@/lib/data/company";
import { useWhatsAppKanal } from "@/lib/formulare/useWhatsAppKanal";
import WhatsAppLogo from "@/components/ui/WhatsAppLogo";

/* ═══════════════════════════════════════════════════════════════════════════
 * WhatsApp-Knopf - Fliesenverlegung Tezgel (KERN K-009, E-008)
 *
 * Flacher Knopf rechts unten, nur ab lg; darunter trägt die untere Leiste WhatsApp.
 * Verhalten wie im Bestand: seitenbezogene Nachricht, Entprellung (450 ms),
 * Analyse-Ereignis nur, wenn gtag nach Einwilligung geladen ist,
 * mobil direkte Navigation, Desktop neuer Tab – alles im gemeinsamen Hook
 * useWhatsAppKanal (src/lib/formulare, P3-00p), dieselbe Logik wie die Kern-Ansicht.
 * Kein Benachrichtigungs-Abzeichen ohne echte Nachricht (E-012).
 * ═══════════════════════════════════════════════════════════════════════════ */

export default function FloatingWhatsAppWidget() {
  const pathname = usePathname() || "/";

  // Analytics-Ereignis whatsapp_click und WhatsApp-Start (450-ms-Sperre, Weg mobil/Desktop) im Hook
  const { triggerWhatsAppAction } = useWhatsAppKanal(pathname);

  const whatsappNumber = companyInfo.socialMedia.whatsapp;
  if (!whatsappNumber) return null;

  return (
    <button
      type="button"
      id="whatsapp-floating-btn"
      aria-label="WhatsApp-Nachricht an Fliesenverlegung Tezgel senden"
      onClick={triggerWhatsAppAction}
      className="fixed bottom-6 right-6 z-30 hidden size-11 items-center justify-center border border-strich bg-fliese text-tinte transition-colors dauer-1 ease-setzen hover:border-tinte lg:inline-flex"
      data-feste-ebene
      data-motion="druck"
    >
      <WhatsAppLogo className="size-5" />
      <span className="sr-only">WhatsApp</span>
    </button>
  );
}
