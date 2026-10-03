"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, MessageCircle, Ruler } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { openWhatsApp } from "@/lib/whatsapp";
import { triggerHaptic } from "@/lib/haptics";

export default function MobileBottomBar() {
  const pathname = usePathname() || "";

  // Hide on dedicated interactive funnel pages to not block steps
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
      className="fixed bottom-3 left-3 right-3 z-40 md:hidden pb-[env(safe-area-inset-bottom,0px)]"
    >
      <div className="p-1.5 flex items-center justify-between gap-1.5 max-w-md mx-auto rounded-2xl bg-white/98 backdrop-blur-md border border-neutral-200/90 shadow-[0_8px_30px_rgba(23,23,23,0.14)]">
        <a
          href={siteConfig.contact.phone.link}
          onClick={() => triggerHaptic("medium")}
          className="flex-1 min-h-[46px] flex items-center justify-center gap-1.5 px-3 rounded-xl bg-orange-700 text-white text-xs font-bold hover:bg-orange-600 active:scale-95 transition-all shadow-xs"
          aria-label={`Fliesenverlegung Tezgel anrufen: ${siteConfig.contact.phone.formatted}`}
        >
          <Phone className="w-4 h-4 shrink-0" />
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
          className="flex-1 min-h-[46px] flex items-center justify-center gap-1.5 px-3 rounded-xl bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-600 active:scale-95 transition-all shadow-xs"
          aria-label="WhatsApp-Chat starten"
        >
          <MessageCircle className="w-4 h-4 shrink-0" />
          <span>WhatsApp</span>
        </a>

        <Link
          href="/kontakt#express-anfrage"
          onClick={() => triggerHaptic("light")}
          className="flex-1 min-h-[46px] flex items-center justify-center gap-1.5 px-3 rounded-xl bg-neutral-900 text-white text-xs font-bold hover:bg-neutral-800 active:scale-95 transition-all shadow-xs"
        >
          <Ruler className="w-4 h-4 text-orange-400 shrink-0" />
          <span>Aufmaß</span>
        </Link>
      </div>
    </aside>
  );
}
