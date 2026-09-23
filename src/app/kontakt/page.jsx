import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, Printer, ShieldCheck, MessageSquare, Award, Sparkles } from 'lucide-react';
import { COMPANY_DATA } from '@/config/company';
import TezgelAnfrageFunnel from '@/components/funnels/TezgelAnfrageFunnel';

export const metadata = {
    title: 'Kontakt & Vor-Ort-Aufmaß | Fliesenverlegung Tezgel Aßlar',
    description: 'Kontaktieren Sie Fliesenverlegung Tezgel: Hohwardstraße 14, 35614 Aßlar, Tel. 06441 / 44 83 567, WhatsApp 0172 / 67 28 504, E-Mail: info@tezgel.de.',
    alternates: { canonical: 'https://tezgel.de/kontakt' }
};

export default function KontaktPage() {
    return (
        <div className="pt-36 pb-24 min-h-screen relative overflow-hidden bg-[#060911] text-white">
            {/* Ambient Lighting Orbs */}
            <div className="ambient-glow-mint -top-20 -left-20 opacity-30" />
            <div className="ambient-glow-sky top-96 -right-20 opacity-25" />

            {/* Hero */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10">
                <div className="glass-surface-dark rounded-[3rem] p-8 sm:p-12 text-center space-y-4 relative overflow-hidden border border-white/15">
                    <span className="text-xs uppercase font-black tracking-wider text-emerald-400 bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/30 inline-block">
                        Meisterbetrieb Aßlar &middot; Wetzlar &middot; Hessen
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
                        Kontakt &amp; Vor-Ort-Termin
                    </h1>
                    <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
                        Wir freuen uns auf Ihr Vorhaben. Rufen Sie uns direkt an, schreiben Sie uns per WhatsApp oder fordern Sie über unseren Express-Funnel Ihr kostenfreies Vor-Ort-Aufmaß an.
                    </p>
                </div>
            </div>

            {/* Contact Information & Details */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    
                    {/* Headquarters Card */}
                    <div className="glass-surface rounded-3xl p-8 border border-white/15 flex flex-col justify-between">
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-black px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                                    Betriebssitz Aßlar
                                </span>
                                <span className="text-xs font-bold text-slate-400">Handwerksmeister</span>
                            </div>

                            <div>
                                <h2 className="text-2xl font-black text-white mb-1">
                                    Fliesenverlegung Tezgel
                                </h2>
                                <p className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
                                    <MapPin className="w-4 h-4 text-emerald-400" />
                                    {COMPANY_DATA.headquarters.street}, {COMPANY_DATA.headquarters.postalCode} {COMPANY_DATA.headquarters.city}
                                </p>
                            </div>

                            <div className="space-y-3 pt-2 text-xs">
                                <div className="flex items-center gap-3">
                                    <Phone className="w-4 h-4 text-emerald-400" />
                                    <a href={`tel:${COMPANY_DATA.contact.phoneLink}`} className="font-bold text-white hover:text-emerald-400 transition-colors">
                                        Telefon: {COMPANY_DATA.contact.phone}
                                    </a>
                                </div>
                                <div className="flex items-center gap-3">
                                    <MessageSquare className="w-4 h-4 text-[#25D366]" />
                                    <a 
                                        href={COMPANY_DATA.contact.whatsappLink} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="font-bold text-[#25D366] hover:underline"
                                    >
                                        Mobil / WhatsApp: {COMPANY_DATA.contact.mobile}
                                    </a>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Printer className="w-4 h-4 text-slate-500" />
                                    <span className="text-slate-400">Telefax: {COMPANY_DATA.headquarters.fax}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Mail className="w-4 h-4 text-emerald-400" />
                                    <a href={`mailto:${COMPANY_DATA.headquarters.email}`} className="text-slate-300 hover:text-white transition-colors">
                                        E-Mail: {COMPANY_DATA.headquarters.email}
                                    </a>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Clock className="w-4 h-4 text-sky-400" />
                                    <span className="text-slate-300">{COMPANY_DATA.hours.formattedWeekdays} | {COMPANY_DATA.hours.formattedSaturday}</span>
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-white/10 mt-6 flex flex-col sm:flex-row gap-3">
                            <a
                                href={COMPANY_DATA.contact.whatsappLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 glass-button-whatsapp text-center"
                            >
                                <MessageSquare className="w-4 h-4 fill-current" />
                                <span>WhatsApp Nachricht</span>
                            </a>
                            <a
                                href={`tel:${COMPANY_DATA.contact.phoneLink}`}
                                className="flex-1 glass-button-secondary text-center"
                            >
                                <Phone className="w-4 h-4 text-emerald-400" />
                                <span>Jetzt anrufen</span>
                            </a>
                        </div>
                    </div>

                    {/* Quality & Regional Promise Card */}
                    <div className="glass-surface rounded-3xl p-8 border border-white/15 flex flex-col justify-between">
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-black px-3.5 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/30">
                                    Qualitätsversprechen
                                </span>
                                <span className="text-xs font-bold text-slate-400">HWK Wiesbaden</span>
                            </div>

                            <div>
                                <h3 className="text-xl font-black text-white mb-2">
                                    Persönliche Meisterberatung
                                </h3>
                                <p className="text-xs text-slate-300 leading-relaxed">
                                    Inhaber Deniz Tezgel betreut jedes Projekt von der Vor-Ort-Begutachtung bis zur sauberen Endübergabe persönlich.
                                </p>
                            </div>

                            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-xs italic text-slate-300">
                                „{COMPANY_DATA.motto}“
                                <span className="block mt-1 font-bold not-italic text-emerald-400">
                                    — Deniz Tezgel, Inhaber
                                </span>
                            </div>

                            <div className="space-y-2 text-xs text-slate-300">
                                <div className="flex items-center gap-2">
                                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                                    <span>Zertifizierte Verbundabdichtung nach DIN 18534</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 text-emerald-400" />
                                    <span>Garantierter Staubschutz bei Renovierungen</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Award className="w-4 h-4 text-emerald-400" />
                                    <span>Eingetragen bei der Handwerkskammer Wiesbaden</span>
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-white/10 mt-6">
                            <span className="text-[11px] text-slate-400 block">Einsatzgebiet:</span>
                            <span className="text-xs text-white font-medium">Aßlar, Wetzlar, Gießen, Herborn, Dillenburg &amp; ganz Hessen</span>
                        </div>
                    </div>

                </div>

                {/* Embedded Express Funnel on Contact Page */}
                <div className="pt-4" id="express-anfrage">
                    <div className="text-center max-w-2xl mx-auto mb-10">
                        <span className="text-xs uppercase font-black tracking-wider text-emerald-400 bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/30 mb-3 inline-block">
                            Direkt online anfragen
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-black text-white">
                            Ihr Vor-Ort-Aufmaß anfordern
                        </h2>
                    </div>
                    <TezgelAnfrageFunnel />
                </div>

            </div>
        </div>
    );
}
