import React from 'react';
import Link from 'next/link';
import {
    Phone,
    ArrowRight,
    Award,
    Star,
    Quote
} from 'lucide-react';
import { COMPANY_DATA } from '@/config/company';
import { REVIEWS } from '@/config/reviews';
import BadanfrageFunnel from '@/components/funnels/BadanfrageFunnel';
import QualityPromise from '@/components/sections/QualityPromise';

export const metadata = {
    title: 'Badsanierung Aßlar & Wetzlar | Komplettbäder aus Meisterhand',
    description: 'Badsanierung in Aßlar, Wetzlar & Lahn-Dill: Komplettbad aus einer Hand mit Festpreisgarantie, persönlicher Badplanung und staubarmer Sanierung. Jetzt unverbindlich anfragen!',
    alternates: { canonical: '/bad/badsanierung' }
};

const WORKFLOW_STEPS = [
    { step: '01', title: 'Vor-Ort-Beratung & Aufmaß', desc: 'Wir messen Ihr bestehendes Bad millimetergenau aus und erfassen Ihre Wünsche, Lebensgewohnheiten und Ihr Budget.' },
    { step: '02', title: 'Badplanung & Materialauswahl', desc: 'Gemeinsame Planung von Aufteilung, Fliesenformat und Fugenbild sowie Auswahl von Keramik, Armaturen, Fliesen und Beleuchtung.' },
    { step: '03', title: 'Verbindliches Festpreisangebot', desc: 'Sie erhalten ein detailliertes Angebot mit Festpreisgarantie und einem verbindlichen Bauzeitplan ohne versteckte Kosten.' },
    { step: '04', title: 'Staubarme Demontage', desc: 'Luftreiniger, Staubschutzwände und Schutzvliese verhindern die Staubausbreitung in Ihren Wohnräumen beim Rückbau der alten Installationen.' },
    { step: '05', title: 'Abdichtung & Meisterverlegung', desc: 'Normgerechte Verbundabdichtung nach DIN 18534 und millimetergenaue Fliesenverlegung – Sanitär-, Trockenbau- und Elektroarbeiten werden im Bauablauf eng abgestimmt.' },
    { step: '06', title: 'Endreinigung & Abnahme', desc: 'Besenreine Endreinigung, Funktionsprüfung aller Elemente, Hinweise zur Pflege und gemeinsame Abnahme Ihres neuen Bades.' }
];

export default function BadsanierungPage() {
    const review = REVIEWS.find((r) => r.id === 'c-wolf');

    return (
        <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
            {/* Ambient Glow */}
            <div className="ambient-glow-mint -top-32 -left-32 opacity-70" />
            <div className="ambient-glow-sky top-96 -right-24 opacity-60" />

            {/* Hero */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10" aria-labelledby="badsanierung-heading">
                <div className="ceramic-hero rounded-[3rem] p-8 sm:p-12 text-center space-y-4 relative overflow-hidden">
                    <span className="eyebrow">
                        <Award className="w-3.5 h-3.5" />
                        Meisterbetrieb &middot; {COMPANY_DATA.authority.shortName}
                    </span>
                    <h1 id="badsanierung-heading" className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                        Badsanierung in Aßlar &amp; Wetzlar: <br />
                        <span className="text-ceramic-gradient">Ihr neues Traumbad ohne Stress &amp; zum Festpreis</span>
                    </h1>
                    <p className="text-sm sm:text-base text-slate-700 max-w-3xl mx-auto leading-relaxed">
                        Wir verwandeln alte, unpraktische Bäder in moderne Wohlfühloasen. Schlüsselfertige Ausführung, persönliche
                        Betreuung durch {COMPANY_DATA.owner.fullName} und saubere Baustellenführung mit Staubschutz.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
                        <Link href="/bad/projekt-check" className="btn-primary px-7 py-3.5 text-xs group">
                            Bad-Projektcheck starten
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                        <a href={`tel:${COMPANY_DATA.contact.phoneLink}`} className="btn-ghost px-7 py-3.5 text-xs">
                            <Phone className="w-4 h-4 text-emerald-700" />
                            {COMPANY_DATA.contact.phone}
                        </a>
                    </div>
                </div>
            </section>

            {/* 6-Step Workflow Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10" aria-labelledby="workflow-heading">
                <div className="text-center max-w-3xl mx-auto mb-14">
                    <span className="eyebrow eyebrow-sky mb-4">Der Weg zum neuen Bad</span>
                    <h2 id="workflow-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                        In 6 Schritten zu Ihrem{' '}
                        <span className="text-ceramic-gradient">schlüsselfertigen Wohlfühlbad</span>
                    </h2>
                    <p className="mt-3 text-base text-slate-700 leading-relaxed">
                        Abgestimmte Gewerke und persönliche Betreuung durch {COMPANY_DATA.owner.fullName}. Sie lehnen sich entspannt zurück.
                    </p>
                </div>

                <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {WORKFLOW_STEPS.map((st) => (
                        <li
                            key={st.step}
                            className="group glass-surface p-7 rounded-[2rem] relative overflow-hidden hover:-translate-y-0.5 hover:border-emerald-500/80 hover:shadow-[0_20px_40px_-12px_rgba(15,23,42,0.14)] transition-all duration-300"
                        >
                            <span className="font-display block text-4xl sm:text-5xl font-black tabular-nums text-emerald-600/25 group-hover:text-emerald-600/40 transition-colors mb-3" aria-hidden="true">
                                {st.step}
                            </span>
                            <h3 className="text-base font-black text-slate-900 mb-2 group-hover:text-emerald-800 transition-colors">
                                <span className="sr-only">Schritt {st.step}: </span>
                                {st.title}
                            </h3>
                            <p className="text-sm text-slate-700 leading-relaxed">{st.desc}</p>
                        </li>
                    ))}
                </ol>

                {review && (
                    <figure className="mt-12 ceramic-hero rounded-[2rem] p-7 sm:p-10 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                        <div className="md:col-span-8">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="flex items-center gap-0.5 text-amber-500" aria-label={`${review.rating} von 5 Sternen`}>
                                    {Array.from({ length: review.rating }, (_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-current" aria-hidden="true" />
                                    ))}
                                </span>
                                <Quote className="w-6 h-6 text-emerald-600/40" aria-hidden="true" />
                            </div>
                            <blockquote className="text-base sm:text-lg text-slate-800 leading-relaxed">„{review.text}“</blockquote>
                            <figcaption className="mt-4 text-sm">
                                <span className="font-bold text-slate-900">{review.author}</span>
                                <span className="text-slate-600"> &middot; {review.source}-Rezension &middot; {review.topic}</span>
                            </figcaption>
                        </div>
                        <div className="md:col-span-4 flex flex-col gap-3">
                            <Link href="/referenzen" className="btn-ghost text-xs">
                                Alle Bewertungen
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link href="/kontakt" className="btn-primary text-xs">
                                Aufmaß anfragen
                            </Link>
                        </div>
                    </figure>
                )}
            </section>

            {/* Quality Promise */}
            <QualityPromise />

            {/* Funnel */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10 scroll-mt-28" id="anfrage" aria-label="Badanfrage">
                <BadanfrageFunnel />
            </section>
        </div>
    );
}
