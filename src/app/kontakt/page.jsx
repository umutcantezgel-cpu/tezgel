import React from 'react';
import Link from 'next/link';
import { Phone, ShieldCheck, Award, Sparkles, ArrowRight } from 'lucide-react';
import { COMPANY_DATA } from '@/config/company';
import TezgelAnfrageFunnel from '@/components/funnels/TezgelAnfrageFunnel';
import ContactPremiumMap from '@/components/maps/ContactPremiumMap';
import LocationContact from '@/components/locations/LocationContact';
import FinalCTA from '@/components/ui/FinalCTA';

import DirectContactCard from '@/components/contact/DirectContactCard';
import BookingCalendar from '@/components/contact/BookingCalendar';
export default function KontaktPage() {
    return (
        <div className="pt-36 pb-24 min-h-screen relative overflow-hidden">
            {/* Ambient Lighting Orbs */}
            <div className="ambient-glow-orange -top-20 -left-20 opacity-70" />
            <div className="ambient-glow-red top-96 -right-20 opacity-60" />

            {/* Hero */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10">
                <div className="ceramic-hero rounded-2xl p-8 sm:p-12 text-center space-y-4 relative overflow-hidden">
                    <span className="eyebrow">
                        Fachbetrieb Aßlar &middot; Wetzlar &middot; Hessen
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-neutral-900 leading-tight">
                        Kontakt &amp; <span className="text-ceramic-gradient">Vor-Ort-Termin</span>
                    </h1>
                    <p className="text-sm sm:text-base text-neutral-700 max-w-2xl mx-auto leading-relaxed">
                        Wir freuen uns auf Ihr Vorhaben. Rufen Sie uns direkt an, schreiben Sie uns per WhatsApp oder fordern Sie über unsere Express-Anfrage Ihr kostenfreies Vor-Ort-Aufmaß an.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
                        <a href="#express-anfrage" className="btn-primary px-7 py-3.5 text-xs">
                            Zur Express-Anfrage
                            <ArrowRight className="w-4 h-4" />
                        </a>
                        <a href={`tel:${COMPANY_DATA.contact.phoneLink}`} className="btn-ghost px-7 py-3.5 text-xs">
                            <Phone className="w-4 h-4 text-orange-700" />
                            {COMPANY_DATA.contact.phone}
                        </a>
                    </div>
                </div>
            </div>

            {/* Contact Information & Details */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">

                    {/* Direct Contact Card */}
                    <DirectContactCard />

                    {/* Quality & Regional Promise Card */}
                    <div className="glass-surface rounded-2xl p-8 flex flex-col justify-between">
                        <div className="space-y-6">
                            <div className="flex items-center justify-between gap-3">
                                <span className="eyebrow eyebrow-red">
                                    Qualitätsversprechen
                                </span>
                                <span className="text-xs font-bold text-neutral-600">{COMPANY_DATA.authority.shortName}</span>
                            </div>

                            <div>
                                <h2 className="text-xl font-black text-neutral-900 mb-2">
                                    Persönliche Fachberatung
                                </h2>
                                <p className="text-sm text-neutral-700 leading-relaxed">
                                    Inhaber {COMPANY_DATA.owner.fullName} betreut jedes Projekt von der Vor-Ort-Begutachtung bis zur sauberen Endübergabe persönlich.
                                </p>
                            </div>

                            <figure className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 text-sm">
                                <blockquote className="italic text-neutral-800">&bdquo;{COMPANY_DATA.motto}&ldquo;</blockquote>
                                <figcaption className="block mt-1 font-bold text-orange-800">
                                    — {COMPANY_DATA.owner.fullName}, Inhaber
                                </figcaption>
                            </figure>

                            <ul className="space-y-2 text-sm text-neutral-700">
                                <li className="flex items-center gap-2">
                                    <ShieldCheck className="w-4 h-4 text-orange-600 shrink-0" />
                                    <span>Normgerechte Verbundabdichtung nach DIN 18534</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 text-orange-600 shrink-0" />
                                    <span>Garantierter Staubschutz bei Renovierungen</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Award className="w-4 h-4 text-orange-600 shrink-0" />
                                    <span>Eingetragen bei der {COMPANY_DATA.authority.name}</span>
                                </li>
                            </ul>
                        </div>

                        <div className="pt-6 border-t border-neutral-200 mt-6">
                            <span className="text-xs text-neutral-600 block">Einsatzgebiet:</span>
                            <span className="text-sm text-neutral-900 font-medium">Aßlar, Wetzlar, Gießen, Herborn, Dillenburg &amp; ganz Hessen</span>
                            <Link
                                href="/standorte"
                                className="mt-2 text-xs font-bold text-orange-800 hover:text-orange-700 hover:underline underline-offset-2 flex items-center gap-1"
                            >
                                Alle Standorte ansehen
                                <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>
                    </div>

                </div>

                {/* Standort & Google Maps Anfahrt mit ContactPremiumMap */}
                <section className="mb-16 scroll-mt-28" id="standort-anfahrt" aria-labelledby="standort-anfahrt-heading">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
                        <div>
                            <span className="eyebrow mb-2">Interaktive Karte &amp; Standorte</span>
                            <h2 id="standort-anfahrt-heading" className="text-2xl font-black text-neutral-900 tracking-tight">
                                Unser Fachbetrieb &amp; Einsatzgebiet Mittelhessen
                            </h2>
                            <p className="text-sm text-neutral-600 mt-1">
                                Zentrale in der Hohwardstraße 14, 35614 Aßlar – wählen Sie Ihre Stadt für Fahrtzeiten und Infos.
                            </p>
                        </div>
                    </div>
                    <ContactPremiumMap />
                </section>

                {/* Regional Quick Contact Box */}
                <LocationContact cityName="Aßlar, Wetzlar &amp; Mittelhessen" className="mb-16 rounded-3xl overflow-hidden border border-neutral-200" />

                {/* 2-Step Appointment Booking Calendar */}
                <section className="mb-16 scroll-mt-28" id="termin-buchen" aria-labelledby="termin-buchen-heading">
                    <div className="text-center max-w-2xl mx-auto mb-8">
                        <span className="eyebrow mb-3">
                            Verbindlicher Vor-Ort-Termin
                        </span>
                        <h2 id="termin-buchen-heading" className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
                            Wunschtermin in 2 Schritten reservieren
                        </h2>
                        <p className="text-sm text-neutral-600 mt-2">
                            Wählen Sie direkt einen freien Tag und eine Uhrzeit für Ihr kostenfreies Aufmaß vor Ort.
                        </p>
                    </div>
                    <div className="max-w-3xl mx-auto">
                        <BookingCalendar initialServiceType="Kostenfreies Vor-Ort-Aufmaß & Schadensanalyse" />
                    </div>
                </section>

                {/* Embedded Express Funnel on Contact Page */}
                <section className="pt-4 mb-16 scroll-mt-28" id="express-anfrage" aria-labelledby="express-anfrage-heading">
                    <div className="text-center max-w-2xl mx-auto mb-10">
                        <span className="eyebrow mb-4">
                            Oder detailliert konfigurieren
                        </span>
                        <h2 id="express-anfrage-heading" className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
                            Ihr Vor-Ort-Aufmaß anfordern
                        </h2>
                        <p className="text-sm text-neutral-600 mt-2">
                            Füllen Sie kurz die Projektdaten aus – Meister Deniz Tezgel meldet sich persönlich bei Ihnen.
                        </p>
                    </div>
                    <TezgelAnfrageFunnel />
                </section>
            </div>

            {/* Final CTA Banner */}
            <FinalCTA
                headline="Sie möchten Ihr Bad oder Ihre Fliesen erneuern? Jetzt unverbindlich beraten lassen."
                subtitle="Kostenfreies Vor-Ort-Aufmaß • Feste Terminabsprachen • HWK-Fachbetrieb"
                buttonText="Jetzt Deniz Tezgel anrufen"
            />
        </div>
    );
}
