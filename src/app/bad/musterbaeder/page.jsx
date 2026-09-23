import React from 'react';
import Link from 'next/link';
import {
    Layers,
    Check,
    ArrowRight,
    Eye,
    Calculator,
    Info
} from 'lucide-react';
import { MUSTERBAEDER } from '@/config/musterbaeder';
import { COMPANY_DATA } from '@/config/company';

export const metadata = {
    title: 'Musterbäder & Badinspiration',
    description: 'Entdecken Sie unsere vorkalkulierten Musterbäder von 4,6 bis 15,9 m² mit Festpreis-Orientierung und hochwertigen Markenkomponenten – für Aßlar, Wetzlar & Umgebung.',
    alternates: { canonical: '/bad/musterbaeder' }
};

export default function MusterbaederPage() {
    return (
        <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
            {/* Ambient Glow */}
            <div className="ambient-glow-mint -top-32 -left-32 opacity-70" />
            <div className="ambient-glow-sky top-96 -right-24 opacity-60" />

            {/* Hero */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10" aria-labelledby="musterbaeder-heading">
                <div className="ceramic-hero rounded-[3rem] p-8 sm:p-12 text-center space-y-4 relative overflow-hidden">
                    <span className="eyebrow">
                        <Layers className="w-3.5 h-3.5" />
                        Transparente Raumkonzepte
                    </span>
                    <h1 id="musterbaeder-heading" className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                        Musterbad-Katalog &amp;{' '}
                        <span className="text-ceramic-gradient">Badinspiration</span>
                    </h1>
                    <p className="text-sm sm:text-base text-slate-700 max-w-3xl mx-auto leading-relaxed">
                        Finden Sie die passende Inspiration für Ihr neues Bad. Alle Musterbäder enthalten detaillierte
                        Ausstattungslisten und transparente Festpreis-Orientierungen mit hochwertigen Markenprodukten.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
                        <Link href="/bad/budgetkalkulator" className="btn-primary px-7 py-3.5 text-xs">
                            <Calculator className="w-4 h-4" />
                            Individuelles Bad online kalkulieren
                        </Link>
                        <Link href="/bad/badanfrage" className="btn-ghost px-7 py-3.5 text-xs">
                            Badanfrage stellen
                        </Link>
                    </div>
                </div>
            </section>

            {/* Musterbad Double-Bezel Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10" aria-label="Musterbäder">
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {MUSTERBAEDER.map((bath) => (
                        <li
                            key={bath.id}
                            className="glass-bezel-outer group transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-500/80 hover:shadow-[0_24px_48px_-16px_rgba(15,23,42,0.18)]"
                        >
                            <article className="glass-bezel-inner p-7 sm:p-8 flex flex-col justify-between h-full">
                                <div>
                                    <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-black px-3.5 py-1 rounded-full bg-emerald-700 text-white tabular-nums">
                                                {bath.size}
                                            </span>
                                            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                                                {bath.tier}
                                            </span>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 block">Festpreis-Orientierung</span>
                                            <span className="font-display text-2xl font-black text-emerald-800 tabular-nums">
                                                {bath.priceFormatted}
                                            </span>
                                        </div>
                                    </div>

                                    <h2 className="text-2xl font-black text-slate-900 mb-1 group-hover:text-emerald-800 transition-colors">
                                        {bath.title}
                                    </h2>
                                    <p className="text-sm text-slate-700 mb-6">
                                        {bath.headline}
                                    </p>

                                    <div className="space-y-2.5 mb-6">
                                        <h3 className="text-[11px] font-black uppercase tracking-widest text-emerald-800">Ausstattungs-Highlights</h3>
                                        <ul className="space-y-2">
                                            {bath.highlights.map((h) => (
                                                <li key={h} className="flex items-start gap-2 text-sm text-slate-700">
                                                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                                    <span>{h}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="pt-5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                                    <Link
                                        href={`/bad/musterbaeder/${bath.slug}`}
                                        className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-800 hover:text-emerald-700 hover:underline underline-offset-2"
                                    >
                                        <Eye className="w-4 h-4" />
                                        Ausstattungsliste &amp; Details
                                    </Link>

                                    <Link href="/bad/badanfrage" className="btn-primary px-5 py-2.5 text-xs">
                                        Anfragen
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </article>
                        </li>
                    ))}
                </ul>

                <p className="mt-10 max-w-3xl mx-auto flex items-start justify-center gap-2 text-sm text-slate-700 text-center">
                    <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                        Alle Preise sind Richtwerte zur Orientierung. Den verbindlichen Festpreis erhalten Sie nach dem kostenfreien
                        Vor-Ort-Aufmaß – Fragen beantwortet {COMPANY_DATA.owner.fullName} gerne unter{' '}
                        <a
                            href={`tel:${COMPANY_DATA.contact.phoneLink}`}
                            className="font-bold text-emerald-800 hover:text-emerald-700 hover:underline underline-offset-2 whitespace-nowrap"
                        >
                            {COMPANY_DATA.contact.phone}
                        </a>
                        .
                    </span>
                </p>
            </section>
        </div>
    );
}
