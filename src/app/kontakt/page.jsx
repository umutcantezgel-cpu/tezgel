import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, Printer, ShieldCheck, MessageSquare, Award, Sparkles, ArrowRight } from 'lucide-react';
import { COMPANY_DATA } from '@/config/company';
import TezgelAnfrageFunnel from '@/components/funnels/TezgelAnfrageFunnel';

const { headquarters: HQ, contact: CONTACT } = COMPANY_DATA;

export const metadata = {
    title: 'Kontakt & Vor-Ort-Aufmaß in Aßlar',
    description: `Kontaktieren Sie Fliesenverlegung Tezgel: ${HQ.street}, ${HQ.postalCode} ${HQ.city}, Tel. ${CONTACT.phone}, WhatsApp ${CONTACT.mobile}, E-Mail: ${CONTACT.email}.`,
    alternates: { canonical: '/kontakt' }
};

export default function KontaktPage() {
    return (
        <div className="pt-36 pb-24 min-h-screen relative overflow-hidden">
            {/* Ambient Lighting Orbs */}
            <div className="ambient-glow-mint -top-20 -left-20 opacity-70" />
            <div className="ambient-glow-sky top-96 -right-20 opacity-60" />

            {/* Hero */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10">
                <div className="ceramic-hero rounded-[3rem] p-8 sm:p-12 text-center space-y-4 relative overflow-hidden">
                    <span className="eyebrow">
                        Meisterbetrieb Aßlar &middot; Wetzlar &middot; Hessen
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                        Kontakt &amp; <span className="text-ceramic-gradient">Vor-Ort-Termin</span>
                    </h1>
                    <p className="text-sm sm:text-base text-slate-700 max-w-2xl mx-auto leading-relaxed">
                        Wir freuen uns auf Ihr Vorhaben. Rufen Sie uns direkt an, schreiben Sie uns per WhatsApp oder fordern Sie über unsere Express-Anfrage Ihr kostenfreies Vor-Ort-Aufmaß an.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
                        <a href="#express-anfrage" className="btn-primary px-7 py-3.5 text-xs">
                            Zur Express-Anfrage
                            <ArrowRight className="w-4 h-4" />
                        </a>
                        <a href={`tel:${COMPANY_DATA.contact.phoneLink}`} className="btn-ghost px-7 py-3.5 text-xs">
                            <Phone className="w-4 h-4 text-emerald-700" />
                            {COMPANY_DATA.contact.phone}
                        </a>
                    </div>
                </div>
            </div>

            {/* Contact Information & Details */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">

                    {/* Headquarters Card */}
                    <div className="glass-surface rounded-3xl p-8 flex flex-col justify-between">
                        <div className="space-y-6">
                            <div className="flex items-center justify-between gap-3">
                                <span className="eyebrow">
                                    Betriebssitz {COMPANY_DATA.headquarters.city}
                                </span>
                                <span className="text-xs font-bold text-slate-600">Handwerksmeister</span>
                            </div>

                            <div>
                                <h2 className="text-2xl font-black text-slate-900 mb-1">
                                    {COMPANY_DATA.legalName}
                                </h2>
                                <p className="text-sm text-slate-700 font-medium flex items-center gap-1.5">
                                    <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                                    {COMPANY_DATA.headquarters.street}, {COMPANY_DATA.headquarters.postalCode} {COMPANY_DATA.headquarters.city}
                                </p>
                                <a
                                    href={COMPANY_DATA.headquarters.mapsUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-1 ml-5.5 inline-block text-xs font-bold text-emerald-800 hover:text-emerald-700 hover:underline underline-offset-2"
                                >
                                    Route in Google Maps öffnen
                                </a>
                            </div>

                            <ul className="space-y-3 pt-2 text-sm">
                                <li className="flex items-center gap-3">
                                    <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                                    <a href={`tel:${COMPANY_DATA.contact.phoneLink}`} className="font-bold text-slate-900 hover:text-emerald-800 transition-colors">
                                        Telefon: {COMPANY_DATA.contact.phone}
                                    </a>
                                </li>
                                <li className="flex items-center gap-3">
                                    <MessageSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                                    <a
                                        href={COMPANY_DATA.contact.whatsappLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-bold text-emerald-800 hover:text-emerald-700 hover:underline underline-offset-2"
                                    >
                                        Mobil / WhatsApp: {COMPANY_DATA.contact.mobile}
                                    </a>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Printer className="w-4 h-4 text-slate-600 shrink-0" />
                                    <span className="text-slate-700">Telefax: {COMPANY_DATA.headquarters.fax}</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Mail className="w-4 h-4 text-emerald-600 shrink-0" />
                                    <a href={`mailto:${COMPANY_DATA.headquarters.email}`} className="text-slate-800 hover:text-emerald-800 transition-colors">
                                        E-Mail: {COMPANY_DATA.headquarters.email}
                                    </a>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Clock className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                                    <span className="text-slate-700">{COMPANY_DATA.hours.formattedWeekdays} | {COMPANY_DATA.hours.formattedSaturday}</span>
                                </li>
                            </ul>
                        </div>

                        <div className="pt-6 border-t border-slate-200 mt-6 flex flex-col sm:flex-row gap-3">
                            <a
                                href={COMPANY_DATA.contact.whatsappLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 glass-button-whatsapp text-sm"
                            >
                                <MessageSquare className="w-4 h-4 fill-current" />
                                <span>WhatsApp Nachricht</span>
                            </a>
                            <a
                                href={`tel:${COMPANY_DATA.contact.phoneLink}`}
                                className="flex-1 btn-ghost"
                            >
                                <Phone className="w-4 h-4 text-emerald-700" />
                                <span>Jetzt anrufen</span>
                            </a>
                        </div>
                    </div>

                    {/* Quality & Regional Promise Card */}
                    <div className="glass-surface rounded-3xl p-8 flex flex-col justify-between">
                        <div className="space-y-6">
                            <div className="flex items-center justify-between gap-3">
                                <span className="eyebrow eyebrow-sky">
                                    Qualitätsversprechen
                                </span>
                                <span className="text-xs font-bold text-slate-600">{COMPANY_DATA.authority.shortName}</span>
                            </div>

                            <div>
                                <h2 className="text-xl font-black text-slate-900 mb-2">
                                    Persönliche Meisterberatung
                                </h2>
                                <p className="text-sm text-slate-700 leading-relaxed">
                                    Inhaber {COMPANY_DATA.owner.fullName} betreut jedes Projekt von der Vor-Ort-Begutachtung bis zur sauberen Endübergabe persönlich.
                                </p>
                            </div>

                            <figure className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-sm">
                                <blockquote className="italic text-slate-800">„{COMPANY_DATA.motto}“</blockquote>
                                <figcaption className="block mt-1 font-bold text-emerald-800">
                                    — {COMPANY_DATA.owner.fullName}, Inhaber
                                </figcaption>
                            </figure>

                            <ul className="space-y-2 text-sm text-slate-700">
                                <li className="flex items-center gap-2">
                                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                                    <span>Zertifizierte Verbundabdichtung nach DIN 18534</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                                    <span>Garantierter Staubschutz bei Renovierungen</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Award className="w-4 h-4 text-emerald-600 shrink-0" />
                                    <span>Eingetragen bei der {COMPANY_DATA.authority.name}</span>
                                </li>
                            </ul>
                        </div>

                        <div className="pt-6 border-t border-slate-200 mt-6">
                            <span className="text-xs text-slate-600 block">Einsatzgebiet:</span>
                            <span className="text-sm text-slate-900 font-medium">Aßlar, Wetzlar, Gießen, Herborn, Dillenburg &amp; ganz Hessen</span>
                            <Link
                                href="/standorte"
                                className="mt-2 text-xs font-bold text-emerald-800 hover:text-emerald-700 hover:underline underline-offset-2 flex items-center gap-1"
                            >
                                Alle Standorte ansehen
                                <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>
                    </div>

                </div>

                {/* Embedded Express Funnel on Contact Page */}
                <section className="pt-4 scroll-mt-28" id="express-anfrage" aria-labelledby="express-anfrage-heading">
                    <div className="text-center max-w-2xl mx-auto mb-10">
                        <span className="eyebrow mb-4">
                            Direkt online anfragen
                        </span>
                        <h2 id="express-anfrage-heading" className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                            Ihr Vor-Ort-Aufmaß anfordern
                        </h2>
                    </div>
                    <TezgelAnfrageFunnel />
                </section>

            </div>
        </div>
    );
}
