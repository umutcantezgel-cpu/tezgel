import React from 'react';
import Link from 'next/link';
import KernIcon from '@/components/icons/Icon';
import { Droplets, Grid, ShieldCheck, Sparkles, Layers, Ruler } from '@/components/icons/ersatz';
import { COMPANY_DATA } from '@/config/company';
import { QUALITY_TIERS } from '@/config/musterbaeder';
import { RATING_SUMMARY } from '@/config/reviews';
import BadProjektCheck from '@/components/funnels/BadProjektCheck';
import BadanfrageFunnel from '@/components/funnels/BadanfrageFunnel';
import { FinalCTA } from '@/components/ui/FinalCTA';
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
    title: 'Badsanierung Wetzlar & Aßlar | Fachbetrieb Tezgel',
    description: 'Schlüsselfertige Badsanierung in Wetzlar & Aßlar: barrierefreie Walk-In Duschen, XXL-Fliesen & DIN 18534 Abdichtung. Jetzt Festpreisangebot anfragen!',
    path: '/bad'
});

const BATH_SERVICES = [
    { title: 'Badsanierung komplett', desc: 'Komplettbad schlüsselfertig zum Festpreis', path: '/bad/badsanierung', icon: Droplets },
    { title: 'Fliesen & XXL-Großformate', desc: 'Fugenarm verlegt, abgedichtet nach DIN 18534', path: '/bad/fliesen', icon: Grid },
    { title: 'Barrierefreies Bad', desc: 'DIN 18040-2 & bis zu 4.180 € Zuschuss', path: '/bad/barrierefreies-bad', icon: ShieldCheck },
    { title: 'Bad aus einer Hand', desc: 'Ein Ansprechpartner, abgestimmte Gewerke', path: '/bad/bad-aus-einer-hand', icon: Sparkles },
    { title: 'Musterbad-Konzepte', desc: 'Basic, Premium & Luxus (4,6 bis 15,9 m²)', path: '/bad/musterbaeder', icon: Layers },
    { title: 'Badplaner', desc: 'Ihr neues Bad Schritt für Schritt planen', path: '/bad/badplaner', icon: Ruler }
];

export default function BadPage() {
    const google = RATING_SUMMARY.google;

    return (
        <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
            {/* Ambient Glow */}

            {/* Hero */}
            <section className="max-w-seite mx-auto px-4 sm:px-6 lg:px-8 mb-16 relative z-10" aria-labelledby="bad-hero-heading">
                <div className="border border-fuge bg-fliese p-8 sm:p-12 text-center space-y-4 relative overflow-hidden">
                    <div className="flex flex-wrap items-center justify-center gap-2">
                        <span className="inline-flex items-center gap-2 font-mono text-fs-1 text-tinte-2">
                            HWK Fachbetrieb für Badsanierung &middot; Aßlar &amp; Wetzlar
                        </span>
                        <span className="inline-flex items-center gap-2 font-mono text-fs-1 text-tinte-2">
                            <KernIcon name="stern" groesse={4} className="text-laser-tief" />
                            {google.displayRating} &middot; {google.count} {google.label}
                        </span>
                    </div>
                    <h1 id="bad-hero-heading" className="text-fs-7 text-tinte">
                        Ihr Traumbad schlüsselfertig{' '}
                        <span>in Fachqualität</span>
                    </h1>
                    <p className="text-fs-3 text-tinte-2 max-w-mass mx-auto">
                        Ihr Fachbetrieb Tezgel realisiert Ihre schlüsselfertige Badsanierung in Aßlar, Wetzlar und ganz Mittelhessen. Von der ersten Planungsskizze bis zur schlüsselfertigen Übergabe Ihres Traumbads in Fachqualität koordinieren wir alle Gewerke, garantieren transparente Festpreise und verbauen normgerechte Verbundabdichtungen nach DIN 18534.
                    </p>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 pt-4 w-full sm:w-auto">
                        <Link href="/bad/projekt-check" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-none px-6 py-3 font-text text-fs-2 font-semibold no-underline transition-colors dauer-1 ease-setzen motion-safe:active:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 border border-tinte bg-tinte text-kalk hover:border-tinte-2 hover:bg-tinte-2 w-full sm:w-auto group">
                            Bad-Projektcheck starten
                            <KernIcon name="pfeil-rechts" groesse={4} />
                        </Link>
                        <Link href="/bad/musterbaeder" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-none px-6 py-3 font-text text-fs-2 font-semibold no-underline transition-colors dauer-1 ease-setzen motion-safe:active:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 border border-strich bg-fliese text-tinte hover:border-tinte w-full sm:w-auto">
                            Musterbäder entdecken
                        </Link>
                    </div>

                    <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-2 text-fs-2 font-semibold text-tinte-2">
                        {['Kostenfreies Vor-Ort-Aufmaß', 'Staubschutz-Garantie', 'Verbindlicher Festpreis'].map((item) => (
                            <li key={item} className="flex items-center gap-2">
                                <KernIcon name="haken" groesse={4} className="text-laser-tief" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* Sub-Services Navigation Grid */}
            <section className="max-w-seite mx-auto px-4 sm:px-6 lg:px-8 mb-16 relative z-10" aria-labelledby="bad-services-heading">
                <div className="text-center max-w-mass mx-auto mb-12">
                    <span className="inline-flex items-center gap-2 font-mono text-fs-1 text-tinte-2 mb-4">Bad-Leistungen im Überblick</span>
                    <h2 id="bad-services-heading" className="text-fs-6 text-tinte">
                        Alles für Ihr neues Bad{' '}
                        <span>aus einer Hand</span>
                    </h2>
                </div>

                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {BATH_SERVICES.map((item) => {
                        return (
                            <li key={item.path}>
                                <Link
                                    href={item.path}
                                    className="group border border-fuge bg-fliese p-6 flex items-start gap-4 h-full hover:border-strich transition-colors dauer-2"
                                >
                                    <span className="flex-1">
                                        <span className="block font-semibold text-fs-3 text-tinte group-hover:text-laser-tief transition-colors mb-1">
                                            {item.title}
                                        </span>
                                        <span className="block text-fs-1 text-tinte-2 font-medium">{item.desc}</span>
                                    </span>
                                    <KernIcon name="pfeil-rechts" groesse={4} className="mt-1 text-tinte-2 group-hover:text-laser-tief transition-colors" />
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </section>

            {/* Quality Tiers */}
            <section className="py-24 bg-fliese border-y border-fuge relative z-10" aria-labelledby="bad-tiers-heading">
                <div className="max-w-seite mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-mass mx-auto mb-16">
                        <span className="inline-flex items-center gap-2 font-mono text-fs-1 text-tinte-2 mb-4">Transparente Standards</span>
                        <h2 id="bad-tiers-heading" className="text-fs-6 text-tinte">
                            Unsere Qualitäts-Kategorien im Überblick
                        </h2>
                        <p className="mt-3 text-fs-3 text-tinte-2">
                            Wählen Sie das passende Konzept für Ihre Ansprüche –
                            den verbindlichen Festpreis erhalten Sie nach dem kostenfreien Vor-Ort-Aufmaß.
                        </p>
                    </div>

                    <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {QUALITY_TIERS.map((tier) => (
                            <li
                                key={tier.name}
                                className="group p-8 bg-kalk border border-fuge flex flex-col justify-between hover:bg-fliese hover:border-strich transition-colors dauer-2"
                            >
                                <div className="space-y-3">
                                    <span className="text-fs-1 font-semibold px-4 py-1 bg-kalk text-laser-tief inline-block border border-strich">
                                        {tier.name}
                                    </span>
                                    <h3 className="text-fs-4 text-tinte group-hover:text-laser-tief transition-colors">
                                        {tier.subtitle}
                                    </h3>
                                    <p className="text-fs-2 text-tinte-2">{tier.description}</p>
                                </div>
                                <div className="pt-6 mt-6 border-t border-fuge">
                                    <Link
                                        href="/bad/musterbaeder"
                                        className="text-fs-2 font-semibold text-laser-tief hover:text-laser-tief inline-flex items-center gap-1"
                                    >
                                        Musterbäder ansehen
                                        <KernIcon name="pfeil-rechts" groesse={4} />
                                    </Link>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <p className="mt-8 text-center text-fs-2 text-tinte-2">
                        Fragen zu Ihrem Bad? Rufen Sie {COMPANY_DATA.owner.fullName} direkt an:{' '}
                        <a
                            href={`tel:${COMPANY_DATA.contact.phoneLink}`}
                            className="font-semibold text-laser-tief hover:text-laser-tief hover:underline underline-offset-2"
                        >
                            {COMPANY_DATA.contact.phone}
                        </a>
                    </p>
                </div>
            </section>

            {/* Interactive Calculator Component */}
            <section className="max-w-seite mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 relative z-10 scroll-mt-28" id="projekt-check" aria-label="Bad-Projektcheck">
                <BadProjektCheck />
            </section>

            {/* Badanfrage Funnel */}
            <section className="max-w-seite mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10 scroll-mt-28" id="anfrage" aria-label="Badanfrage">
                <BadanfrageFunnel />
            </section>

            {/* Final Conversion CTA */}
            <FinalCTA />
        </div>
    );
}
