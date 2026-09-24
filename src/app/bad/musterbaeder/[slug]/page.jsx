import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
    Check,
    ArrowLeft,
    ArrowRight,
    Phone,
    CheckCircle2
} from 'lucide-react';
import { MUSTERBAEDER } from '@/config/musterbaeder';
import { COMPANY_DATA } from '@/config/company';
import BadanfrageFunnel from '@/components/funnels/BadanfrageFunnel';

export async function generateStaticParams() {
    return MUSTERBAEDER.map((b) => ({
        slug: b.slug
    }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const bath = MUSTERBAEDER.find((b) => b.slug === slug);
    if (!bath) return { title: 'Musterbad' };

    return {
        title: `${bath.title} – Ausstattung im Detail`,
        description: `${bath.headline}. Detaillierte Ausstattungsliste mit hochwertigen Markenkomponenten. Jetzt Festpreis anfragen!`,
        alternates: { canonical: `/bad/musterbaeder/${slug}` }
    };
}

export default async function MusterbadDetailPage({ params }) {
    const { slug } = await params;
    const bath = MUSTERBAEDER.find((b) => b.slug === slug);

    if (!bath) {
        notFound();
    }

    return (
        <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
            {/* Ambient Glow */}
            <div className="ambient-glow-mint -top-32 -left-32 opacity-70" />
            <div className="ambient-glow-sky top-96 -right-24 opacity-60" />

            {/* Header */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10" aria-labelledby="musterbad-heading">
                <div className="ceramic-hero rounded-[3rem] p-8 sm:p-12 space-y-4 relative overflow-hidden">
                    <Link
                        href="/bad/musterbaeder"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-700 bg-white px-3.5 py-1.5 rounded-full border border-slate-200 hover:border-emerald-500/80 transition-colors"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        Zurück zur Musterbad-Übersicht
                    </Link>

                    <div className="flex flex-wrap items-center gap-2 pt-2">
                        <span className="text-xs font-black bg-emerald-700 text-white px-3.5 py-1 rounded-full tabular-nums">
                            {bath.size}
                        </span>
                        <span className="text-xs font-bold bg-emerald-50 text-emerald-800 px-3.5 py-1 rounded-full border border-emerald-200">
                            {bath.tier}
                        </span>
                    </div>

                    <h1 id="musterbad-heading" className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                        {bath.title}
                    </h1>
                    <p className="text-sm sm:text-base text-slate-700 max-w-2xl leading-relaxed">
                        {bath.headline}
                    </p>

                    <div className="p-4 sm:px-6 rounded-2xl bg-white border border-slate-200 inline-flex flex-wrap items-center gap-x-6 gap-y-1">
                        <span className="text-sm text-slate-700 font-medium">
                            Verbindlicher Festpreis nach kostenfreiem Vor-Ort-Aufmaß – abgestimmt auf Ihren Grundriss.
                        </span>
                    </div>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10" aria-labelledby="komponenten-heading">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                    {/* Components Breakdown (Left 8 Cols) */}
                    <div className="lg:col-span-8 space-y-8">
                        <div>
                            <span className="eyebrow eyebrow-sky mb-3">Ausstattung</span>
                            <h2 id="komponenten-heading" className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
                                Detaillierte Ausstattungs- und Komponentenliste
                            </h2>
                            <p className="text-sm text-slate-700">
                                Transparente Auflistung der vorgesehenen Markenkomponenten je Bereich – Maße und Ausstattung passen wir
                                individuell an Ihren Grundriss an.
                            </p>
                        </div>

                        <ul className="space-y-6">
                            {bath.components.map((comp) => (
                                <li
                                    key={comp.category}
                                    className="group glass-surface rounded-[2rem] p-6 sm:p-8 hover:border-emerald-500/80 hover:shadow-[0_20px_40px_-12px_rgba(15,23,42,0.14)] transition-all duration-300"
                                >
                                    <div className="border-b border-slate-200 pb-3 mb-4">
                                        <h3 className="font-black text-base text-slate-900 group-hover:text-emerald-800 transition-colors">
                                            {comp.category}
                                        </h3>
                                    </div>

                                    <ul className="space-y-2.5">
                                        {comp.items.map((item) => (
                                            <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700 leading-relaxed">
                                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Sidebar / Actions (Right 4 Cols) - Double Bezel */}
                    <aside className="lg:col-span-4 space-y-6" aria-labelledby="musterbad-anfragen-heading">
                        <div className="glass-bezel-outer sticky top-28">
                            <div className="glass-bezel-inner p-6 sm:p-8 space-y-4">
                                <h2 id="musterbad-anfragen-heading" className="font-black text-lg text-slate-900">
                                    Dieses Musterbad anfragen
                                </h2>
                                <p className="text-sm text-slate-700 leading-relaxed">
                                    Gefällt Ihnen das Konzept {bath.title}? Wir passen die Maße und Ausstattung individuell an Ihren
                                    Grundriss an.
                                </p>

                                <div className="space-y-3 pt-2">
                                    <a href="#anfrage" className="btn-primary w-full text-xs">
                                        Konzept unverbindlich anfragen
                                        <ArrowRight className="w-4 h-4" />
                                    </a>

                                    <a href={`tel:${COMPANY_DATA.contact.phoneLink}`} className="btn-ghost w-full text-xs">
                                        <Phone className="w-4 h-4 text-emerald-700" />
                                        Direkt anrufen: {COMPANY_DATA.contact.phone}
                                    </a>
                                </div>

                                <div className="border-t border-slate-200 pt-4 space-y-2 text-sm text-slate-800 font-semibold">
                                    <p className="font-black text-slate-900">Ihre Sicherheiten bei {COMPANY_DATA.legalName}:</p>
                                    {['Festpreisgarantie', 'Verbindlicher Bauzeitplan', 'Staubarme Sanierung'].map((item) => (
                                        <p key={item} className="flex items-center gap-1.5">
                                            <Check className="w-4 h-4 text-emerald-600" />
                                            {item}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>

                </div>
            </section>

            {/* Funnel */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10 scroll-mt-28" id="anfrage" aria-label="Badanfrage">
                <BadanfrageFunnel />
            </section>
        </div>
    );
}
