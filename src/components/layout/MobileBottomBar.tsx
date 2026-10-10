"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "@/components/icons/Icon";
import { siteConfig } from "@/lib/config";
import { openWhatsApp } from "@/lib/whatsapp";
import { triggerHaptic } from "@/lib/haptics";

// Untere Leiste (KERN K-009): einzige feste Ebene neben dem Kopf, nur mobil; drei Wege an der Fuge,
// die Anfrage als Hauptaktion auf Tinte.
const feld =
  "flex min-h-12 flex-col items-center justify-center gap-1 px-2 py-2 font-text text-fs-1 font-semibold transition-colors dauer-1 ease-setzen";

export default function MobileBottomBar() {
  const pathname = usePathname() || "";

  // Auf den Abläufen selbst ausgeblendet, damit die Leiste keine Schritte verdeckt
  const isInteractiveFormPage =
    pathname.includes("/badanfrage") ||
    pathname.includes("/projekt-check") ||
    pathname.includes("/badplaner") ||
    pathname.includes("/konfigurator");

  if (isInteractiveFormPage) {
    return null;
  }

  return (
    <aside
      aria-label="Schnellkontakt Daumenleiste"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-fuge bg-fuge md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      data-feste-ebene
    >
      <div className="grid grid-cols-3 gap-px">
        <a
          href={siteConfig.contact.phone.link}
          onClick={() => triggerHaptic("medium")}
          className={`${feld} bg-kalk text-tinte hover:bg-fliese`}
          aria-label={`Fliesenverlegung Tezgel anrufen: ${siteConfig.contact.phone.formatted}`}
          data-motion="druck"
        >
          <Icon name="telefon" groesse={5} />
          <span>Anrufen</span>
        </a>

        <a
          href={siteConfig.contact.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            e.preventDefault();
            triggerHaptic("light");
            openWhatsApp({ phone: siteConfig.contact.whatsapp });
          }}
          className={`${feld} bg-kalk text-tinte hover:bg-fliese`}
          aria-label="WhatsApp-Chat starten"
          data-motion="druck"
        >
          <Icon name="sprechblase" groesse={5} />
          <span>WhatsApp</span>
        </a>

        <Link
          href="/kontakt#express-anfrage"
          onClick={() => triggerHaptic("light")}
          className={`${feld} bg-tinte text-kalk hover:bg-tinte-2`}
          data-motion="druck"
        >
          <Icon name="aufmass" groesse={5} />
          <span>Aufmaß</span>
        </Link>
      </div>
    </aside>
  );
}
