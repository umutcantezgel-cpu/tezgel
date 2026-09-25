'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, MessageCircle, Ruler } from 'lucide-react';
import { COMPANY_DATA } from '@/config/company';

export default function FloatingDock() {
  const pathname = usePathname() || '';

  // Hide on dedicated funnel, calculation and contact pages to never block form controls or steps
  const isInteractiveFormPage =
    pathname.includes('/badanfrage') ||
    pathname.includes('/projekt-check') ||
    pathname.includes('/badplaner') ||
    pathname.includes('/konfigurator') ||
    pathname === '/kontakt';

  if (isInteractiveFormPage) {
    return null;
  }

  return (
    <aside aria-label="Schnellkontakt" className="fixed bottom-3 left-3 right-3 z-40 md:hidden pb-[env(safe-area-inset-bottom,0px)]">
      <div className="p-1.5 flex items-center justify-between gap-1.5 max-w-md mx-auto rounded-full bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-[0_8px_30px_rgba(15,23,42,0.12)]">
        <a
          href={`tel:${COMPANY_DATA.contact.phoneLink}`}
          className="flex-1 min-h-[44px] flex items-center justify-center gap-1.5 px-3 rounded-full bg-slate-50 text-slate-900 text-xs font-bold border border-slate-200/80 hover:bg-white active:scale-95 transition-all shadow-xs"
          aria-label={`Fliesenverlegung Tezgel anrufen: ${COMPANY_DATA.contact.phone}`}
        >
          <Phone className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>Anrufen</span>
        </a>

        <a
          href={COMPANY_DATA.contact.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 min-h-[44px] flex items-center justify-center gap-1.5 px-3 rounded-full bg-emerald-50 text-emerald-900 text-xs font-bold border border-emerald-200 hover:bg-emerald-100 active:scale-95 transition-all shadow-xs"
          aria-label="WhatsApp-Chat starten"
        >
          <MessageCircle className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>WhatsApp</span>
        </a>

        <Link
          href="/kontakt#express-anfrage"
          className="btn-primary flex-1 min-h-[44px] px-3 py-0 text-xs active:scale-95 shadow-md shadow-emerald-900/15"
        >
          <Ruler className="w-4 h-4 shrink-0" />
          <span>Aufmaß</span>
        </Link>
      </div>
    </aside>
  );
}
