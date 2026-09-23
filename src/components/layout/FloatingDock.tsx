'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, MessageCircle, Ruler } from 'lucide-react';
import { COMPANY_DATA } from '@/config/company';

export default function FloatingDock() {
  return (
    <aside aria-label="Schnellkontakt" className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
      <div className="glass-pill p-1.5 flex items-center justify-between gap-1.5 max-w-md mx-auto">
        <a
          href={`tel:${COMPANY_DATA.contact.phoneLink}`}
          className="flex-1 min-h-[44px] flex items-center justify-center gap-1.5 px-3 rounded-full bg-white text-slate-900 text-xs font-bold border border-slate-200 hover:border-emerald-500/80 transition-all duration-300 active:scale-95"
          aria-label={`Fliesenverlegung Tezgel anrufen: ${COMPANY_DATA.contact.phone}`}
        >
          <Phone className="w-4 h-4 text-emerald-700" />
          <span>Anrufen</span>
        </a>

        <a
          href={COMPANY_DATA.contact.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 min-h-[44px] flex items-center justify-center gap-1.5 px-3 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 hover:border-emerald-500/80 transition-all duration-300 active:scale-95"
          aria-label="WhatsApp-Chat starten"
        >
          <MessageCircle className="w-4 h-4" />
          <span>WhatsApp</span>
        </a>

        <Link
          href="/kontakt#express-anfrage"
          className="btn-primary flex-1 min-h-[44px] px-3 py-0 text-xs active:scale-95"
        >
          <Ruler className="w-4 h-4" />
          <span>Aufmaß</span>
        </Link>
      </div>
    </aside>
  );
}
