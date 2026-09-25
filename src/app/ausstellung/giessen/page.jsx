import React from 'react';
import Link from 'next/link';
import {
    MapPin,
    Phone,
    Mail,
    Clock,
    MessageCircle,
    ArrowRight,
    CalendarCheck,
    Droplets,
    Sparkles,
    Sun,
    ShieldCheck,
    Info
} from 'lucide-react';
import { COMPANY_DATA, processSteps } from '@/config/company';
import { SERVICES } from '@/config/services';
import { CITIES } from '@/config/cities';
import QualityPromise from '@/components/sections/QualityPromise';

export const metadata = {
    title: 'Fliesenberatung & Materialauswahl in Gießen',
    description: 'Persönliche Fliesenberatung für Gießen: Formate, Oberflächen & Fugenbild gemeinsam mit Fachbetriebsleiter Deniz Tezgel abstimmen.',
    alternates: { canonical: 'https://tezgel.de/ausstellung/giessen' }
};

const CITY_SLUG = 'giessen';

const SERVICE_ICONS = {
    bad: Droplets,
    wohnen: Sparkles,
    aussen: Sun,
    untergrund: ShieldCheck
};

export default function AusstellungGiessenPage() {
    const { headquarters, contact, hours, owner } = COMPANY_DATA;
    const city = CITIES.find((c) => c.slug === CITY_SLUG);
    const cityName = city?.name || 'Gießen';
    const locationNote = city && city.distanceKm > 0
        ? `ca. ${city.distanceKm} km ab Wetzlar`
        : `direkt neben unserem Firmensitz in ${headquarters.city}`;

    return (
        <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
            {/* Ambient Glow */}
            <div className="ambient-glow-orange -top-20 -left-20 opacity-70" />
            <div className="ambient-glow-warm top-96 -right-20 opacity-60" />

            {/* Hero */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10">
                <div className="ceramic-hero rounded-tile-2xl p-8 sm:p-12 text-center space-y-4 relative overflow-hidden">
                    <span className="eyebrow eyebrow-orange">
                        <CalendarCheck className="w-3.5 h-3.5 text-orange-600" />
                        Nach Terminvereinbarung
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                        Fliesenberatung &amp; Materialauswahl in{' '}
                        <span className="text-ceramic-gradient">{cityName}</span>
                    </h1>
                    <p className="text-sm sm:text-base text-slate-700 max-w-3xl mx-auto leading-relaxed">
                        Neues Bad, großformatige Bodenfliesen oder eine frostsichere Terrasse? In einem persönlichen
                        Beratungstermin klärt Inhaber {owner.fullName} mit Ihnen Formate, Oberflächen, Fugenbild und
                        Rutschhemmung – für {cityName} und Umgebung ({locationNote}), betreut von unserem Firmensitz in{' '}
                        {headquarters.city}.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
                        <Link href="/kontakt" className="btn-primary px-7 py-3.5 text-xs">
                            Beratungstermin vereinbaren
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <a
                            href={contact.whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="glass-button-whatsapp px-7 py-3.5 text-xs"
                        >
                            <MessageCircle className="w-4 h-4" />
                            WhatsApp
                        </a>
                        <a href={`tel:${contact.phoneLink}`} className="btn-ghost px-7 py-3.5 text-xs">
                            <Phone className="w-4 h-4 text-orange-600" />
                            {contact.phone}
                        </a>
                    </div>
                </div>
            </div>

            {/* Process + Contact */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    <section className="lg:col-span-2 space-y-6" aria-labelledby="ablauf-heading">
                        <div>
                            <span className="eyebrow eyebrow-orange mb-4">Ihr Beratungstermin</span>
                            <h2 id="ablauf-heading" className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                                So läuft die Beratung ab
                            </h2>
                        </div>

                        <ol className="space-y-4">
                            {processSteps.map((step) => (
                                <li
                                    key={step.step}
                                    className="group glass-surface rounded-tile-xl p-6 sm:p-7 flex gap-5 hover:-translate-y-0.5 hover:border-orange-500/80 transition-all duration-300"
                                >
                                    <span className="font-display text-3xl font-black text-orange-600 tabular-nums shrink-0" aria-hidden="true">
                                        {step.step}
                                    </span>
                                    <div>
                                        <span className="text-[11px] font-black uppercase tracking-widest text-orange-700 block mb-1">
                                            {step.subtitle}
                                        </span>
                                        <h3 className="text-lg font-black text-slate-900 mb-2">{step.title}</h3>
                                        <p className="text-sm text-slate-700 leading-relaxed">{step.description}</p>
                                    </div>
                                </li>
                            ))}
                        </ol>

                        <div className="flex items-start gap-3 p-5 rounded-tile-lg bg-orange-50/60 border border-orange-200/80 text-sm text-slate-700 leading-relaxed">
                            <Info className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" aria-hidden="true" />
                            <p>
                                Beratungstermine vergeben wir individuell nach Absprache – telefonisch, per WhatsApp oder
                                über unser{' '}
                                <Link href="/kontakt" className="font-bold text-orange-700 hover:text-orange-600 hover:underline underline-offset-2">
                                    Kontaktformular
                                </Link>
                                .
                            </p>
                        </div>
                    </section>

                    {/* Contact Card */}
                    <aside className="glass-surface border-orange-200/80 rounded-tile-2xl p-8 space-y-6 lg:sticky lg:top-28" aria-labelledby="kontakt-heading">
                        <span className="eyebrow eyebrow-orange">Direktkontakt</span>
                        <div>
                            <h2 id="kontakt-heading" className="text-xl font-black text-slate-900 mb-1">
                                {COMPANY_DATA.legalName}
                            </h2>
                            <p className="text-sm text-slate-700 flex items-start gap-2">
                                <MapPin className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                                <span>
                                    Firmensitz: {headquarters.street}, {headquarters.postalCode} {headquarters.city}
                                </span>
                            </p>
                        </div>

                        <ul className="space-y-3 text-sm">
                            <li>
                                <a
                                    href={`tel:${contact.phoneLink}`}
                                    className="flex items-center gap-3 p-3.5 rounded-tile-lg bg-slate-50 border border-slate-200 font-bold text-slate-900 hover:bg-white hover:border-orange-500/80 transition-all"
                                >
                                    <Phone className="w-4 h-4 text-orange-600" />
                                    {contact.phone}
                                </a>
                            </li>
                            <li>
                                <a
                                    href={contact.whatsappLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="glass-button-whatsapp flex items-center gap-3 p-3.5 rounded-tile-lg font-bold transition-all text-xs"
                                >
                                    <MessageCircle className="w-4 h-4" />
                                    WhatsApp: {contact.mobile}
                                </a>
                            </li>
                            <li>
                                <a
                                    href={`mailto:${contact.email}`}
                                    className="flex items-center gap-3 p-3.5 rounded-tile-lg bg-slate-50 border border-slate-200 font-bold text-slate-900 hover:bg-white hover:border-orange-500/80 transition-all"
                                >
                                    <Mail className="w-4 h-4 text-orange-600" />
                                    {contact.email}
                                </a>
                            </li>
                        </ul>

                        <div className="pt-4 border-t border-slate-200 text-sm text-slate-700 space-y-1">
                            <p className="flex items-center gap-2 font-bold text-slate-900">
                                <Clock className="w-4 h-4 text-orange-600" />
                                Geschäftszeiten
                            </p>
                            <p>{hours.formattedWeekdays}</p>
                            <p>{hours.formattedSaturday}</p>
                        </div>

                        <Link href="/kontakt" className="btn-primary w-full text-xs">
                            Termin anfragen
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </aside>
                </div>
            </div>

            {/* Consultation topics */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10" aria-labelledby="themen-heading">
                <div className="text-center max-w-3xl mx-auto mb-10">
                    <span className="eyebrow eyebrow-orange mb-4">Beratungsthemen</span>
                    <h2 id="themen-heading" className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                        Wobei wir Sie in {cityName} beraten
                    </h2>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {SERVICES.map((srv) => {
                        const Icon = SERVICE_ICONS[srv.id] || Sparkles;
                        return (
                            <li key={srv.id}>
                                <Link
                                    href={`/leistungen/${srv.id}/${CITY_SLUG}`}
                                    className="group glass-surface rounded-tile-xl p-6 h-full flex flex-col justify-between hover:-translate-y-0.5 hover:border-orange-500/80 hover:shadow-[0_20px_40px_-12px_rgba(15,23,42,0.14)] transition-all duration-300"
                                >
                                    <div>
                                        <span className="icon-chip w-11 h-11 mb-4 text-orange-600">
                                            <Icon className="w-5 h-5" />
                                        </span>
                                        <h3 className="text-base font-black text-slate-900 mb-2 group-hover:text-orange-700 transition-colors">
                                            {srv.name}
                                        </h3>
                                        <p className="text-sm text-slate-700 leading-relaxed">{srv.shortDescription}</p>
                                    </div>
                                    <span className="mt-5 pt-4 border-t border-slate-200 text-sm font-bold text-orange-700 flex items-center gap-1.5">
                                        Mehr erfahren
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
                <p className="mt-8 text-center text-sm text-slate-700">
                    Mehr zu unserem Einsatzgebiet:{' '}
                    <Link
                        href={`/standorte/${CITY_SLUG}`}
                        className="font-bold text-orange-700 hover:text-orange-600 hover:underline underline-offset-2"
                    >
                        Fliesenverlegung in {cityName}
                    </Link>
                </p>
            </section>

            <QualityPromise />
        </div>
    );
}
