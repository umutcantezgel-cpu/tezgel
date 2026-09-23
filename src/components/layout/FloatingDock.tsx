'use client';

import React from 'react';
import { Phone, MessageSquare, Sparkles } from 'lucide-react';
import { COMPANY_DATA } from '@/config/company';

export default function FloatingDock() {
  return (
    <aside aria-label="Schnellkontakt" className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
      <div className="glass-pill p-2 border border-white/20 shadow-[0_10px_35px_rgba(0,0,0,0.7)] flex items-center justify-between gap-2 max-w-md mx-auto">
        
        {/* Telephone Call Button */}
        <a
          href={`tel:${COMPANY_DATA.contact.phoneLink}`}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/10 active:scale-95"
          title="Fliesenverlegung Tezgel anrufen"
        >
          <Phone className="w-3.5 h-3.5 text-emerald-400" />
          <span>Anrufen</span>
        </a>

        {/* WhatsApp Direct Chat Button */}
        <a
          href={COMPANY_DATA.contact.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] text-xs font-black transition-all border border-[#25D366]/40 shadow-xs active:scale-95"
          title="WhatsApp Chat starten"
        >
          <MessageSquare className="w-3.5 h-3.5 fill-current" />
          <span>WhatsApp</span>
        </a>

        {/* Express-Anfrage Anchor */}
        <a
          href="#express-anfrage"
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-slate-950 text-xs font-black shadow-md transition-all active:scale-95"
          title="Express-Angebot anfordern"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Aufmaß</span>
        </a>

      </div>
    </aside>
  );
}
