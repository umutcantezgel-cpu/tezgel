"use client";
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { COMPANY_DATA } from '@/config/company';

// Desktop/tablet only: on phones the FloatingDock already offers WhatsApp.
const WhatsAppButton = () => {
    const message = "Hallo Herr Tezgel, ich habe eine Frage zu Ihren Fliesen- und Badleistungen.";
    const whatsappUrl = `${COMPANY_DATA.contact.whatsappLink}?text=${encodeURIComponent(message)}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex fixed bottom-6 right-6 z-40 w-14 h-14 items-center justify-center rounded-full bg-gradient-to-br from-[#128C7E] to-[#075E54] text-white shadow-[0_12px_30px_-8px_rgba(18,140,126,0.6)] hover:-translate-y-0.5 transition-all duration-300 group"
            aria-label="WhatsApp-Chat mit Fliesenverlegung Tezgel starten"
        >
            <MessageCircle className="w-7 h-7" />
            <span className="absolute right-full mr-3 bg-white text-slate-900 border border-slate-200 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_8px_30px_rgba(15,23,42,0.08)] pointer-events-none">
                WhatsApp: {COMPANY_DATA.contact.mobile}
            </span>
        </a>
    );
};

export default WhatsAppButton;
