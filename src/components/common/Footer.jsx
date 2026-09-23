"use client";

import React from 'react';
import Link from 'next/link';
import { 
    Phone, 
    Mail, 
    MapPin, 
    Clock, 
    ShieldCheck, 
    ChevronRight, 
    Award, 
    Printer, 
    Sparkles,
    MessageSquare
} from 'lucide-react';
import { COMPANY_DATA } from '@/config/company';
import { footerServiceLinks, quickLinks } from '@/config/navigation';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-900 border-t border-slate-800 text-slate-300 relative overflow-hidden">
            
            {/* Ambient Lighting Orbs */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-10 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

            {/* Top Guarantee Banner */}
            <div className="border-b border-slate-800 bg-slate-950/40 py-5 px-4">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-slate-300">
                        <div className="flex items-center gap-2">
                            <Award className="w-4 h-4 text-emerald-400" />
                            <span className="font-bold text-white">Eingetragener Meisterbetrieb</span> · HWK Wiesbaden
                        </div>
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-sky-400" />
                            <span className="font-bold text-white">DIN 18534</span> Verbundabdichtung
                        </div>
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-emerald-400" />
                            <span>Garantierter Staubschutz bei Sanierungen</span>
                        </div>
                    </div>
                    <div>
                        <Link 
                            href="/kontakt" 
                            className="inline-flex items-center gap-2 text-xs font-black text-emerald-400 hover:text-white transition-colors bg-slate-800 hover:bg-slate-700 px-4 py-1.5 rounded-full border border-slate-700"
                        >
                            <span>Kostenfreies Vor-Ort-Aufmaß anfordern</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main 4-Column Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    
                    {/* Col 1: Company Profile & Narrative */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 p-0.5 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                                <div className="w-full h-full rounded-[14px] bg-[#060911] flex items-center justify-center text-emerald-400 font-black text-sm border border-white/20">
                                    FT
                                </div>
                            </div>
                            <div>
                                <span className="text-base font-black text-white block leading-tight">
                                    Fliesenverlegung Tezgel
                                </span>
                                <span className="text-[11px] text-emerald-400 font-bold tracking-wider uppercase">
                                    Inh. Deniz Tezgel
                                </span>
                            </div>
                        </div>

                        <p className="text-xs text-slate-400 leading-relaxed">
                            Ihr zuverlässiger Fachbetrieb für fugenarme Großformate, luxuriöse Badsanierungen, witterungsbeständige Außenbeläge und normgerechte Abdichtung in Aßlar, Wetzlar und ganz Hessen.
                        </p>

                        <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-xs italic text-slate-300">
                            „{COMPANY_DATA.motto}“
                        </div>

                        <div className="pt-2">
                            <span className="text-[11px] font-bold text-slate-500 block uppercase tracking-wider mb-1">
                                Aufsichtsbehörde:
                            </span>
                            <p className="text-xs text-slate-300">
                                Handwerkskammer Wiesbaden
                            </p>
                        </div>
                    </div>

                    {/* Col 2: Services & Trades */}
                    <div>
                        <h4 className="text-xs font-black uppercase tracking-wider text-white mb-4 border-l-2 border-emerald-400 pl-2">
                            Fachgewerke &amp; Leistungen
                        </h4>
                        <ul className="space-y-2 text-xs">
                            {footerServiceLinks.map((item, i) => (
                                <li key={i}>
                                    <Link 
                                        href={item.path} 
                                        className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                                    >
                                        <ChevronRight className="w-3 h-3 text-emerald-400 shrink-0" />
                                        <span>{item.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Col 3: Direct Contact */}
                    <div className="space-y-4">
                        <h4 className="text-xs font-black uppercase tracking-wider text-white mb-4 border-l-2 border-emerald-400 pl-2">
                            Kontakt &amp; Standort
                        </h4>
                        
                        <div className="space-y-3 text-xs">
                            <div className="flex items-start gap-2.5 text-slate-300">
                                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                <div>
                                    <span className="font-bold text-white block">Fliesenverlegung Tezgel</span>
                                    <span className="text-slate-400">{COMPANY_DATA.headquarters.street}</span>
                                    <span className="text-slate-400 block">{COMPANY_DATA.headquarters.postalCode} {COMPANY_DATA.headquarters.city}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2.5 text-slate-300">
                                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                                <a href={`tel:${COMPANY_DATA.contact.phoneLink}`} className="hover:text-white transition-colors">
                                    {COMPANY_DATA.contact.phone}
                                </a>
                            </div>

                            <div className="flex items-center gap-2.5 text-slate-300">
                                <MessageSquare className="w-4 h-4 text-[#25D366] shrink-0" />
                                <a 
                                    href={COMPANY_DATA.contact.whatsappLink} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="hover:text-[#25D366] transition-colors"
                                >
                                    WhatsApp: {COMPANY_DATA.contact.mobile}
                                </a>
                            </div>

                            <div className="flex items-center gap-2.5 text-slate-300">
                                <Printer className="w-4 h-4 text-slate-500 shrink-0" />
                                <span className="text-slate-400">{COMPANY_DATA.headquarters.fax}</span>
                            </div>

                            <div className="flex items-center gap-2.5 text-slate-300">
                                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                                <a href={`mailto:${COMPANY_DATA.headquarters.email}`} className="hover:text-white transition-colors">
                                    {COMPANY_DATA.headquarters.email}
                                </a>
                            </div>
                        </div>

                        <div className="pt-2">
                            <span className="text-[11px] font-bold text-slate-500 block uppercase tracking-wider mb-1">
                                Einsatzgebiet:
                            </span>
                            <p className="text-xs text-slate-400">
                                Aßlar, Wetzlar, Mittelhessen und das gesamte Bundesland Hessen.
                            </p>
                        </div>
                    </div>

                    {/* Col 4: Quick Links & Legal */}
                    <div>
                        <h4 className="text-xs font-black uppercase tracking-wider text-white mb-4 border-l-2 border-emerald-400 pl-2">
                            Rechtliches &amp; Navigation
                        </h4>
                        <ul className="space-y-2 text-xs mb-6">
                            {quickLinks.map((item, i) => (
                                <li key={i}>
                                    <Link 
                                        href={item.path} 
                                        className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
                                    >
                                        <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" />
                                        <span>{item.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-[11px] text-slate-400">
                            <span className="font-bold text-white block mb-0.5">USt-IdNr.:</span>
                            <span>{COMPANY_DATA.tax.ustId}</span>
                        </div>
                    </div>

                </div>
            </div>

            {/* Bottom Copyright Bar */}
            <div className="border-t border-white/10 bg-[#04060b] py-6 px-4 text-xs text-slate-500">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p>
                        &copy; {currentYear} Fliesenverlegung Tezgel · Inh. Deniz Tezgel. Alle Rechte vorbehalten.
                    </p>
                    <div className="flex items-center gap-4 text-slate-400">
                        <Link href="/impressum" className="hover:text-white transition-colors">Impressum</Link>
                        <span>&middot;</span>
                        <Link href="/datenschutz" className="hover:text-white transition-colors">Datenschutz</Link>
                    </div>
                </div>
            </div>

        </footer>
    );
}
