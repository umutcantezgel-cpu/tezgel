import React from 'react';
import Link from 'next/link';
import {
    Droplets,
    CheckCircle2,
    ArrowRight,
    Sparkles,
    Layers,
    ShieldCheck,
    Ruler,
    Award,
    Star,
    Grid
} from 'lucide-react';
import { COMPANY_DATA } from '@/config/company';
import { QUALITY_TIERS } from '@/config/musterbaeder';
import { RATING_SUMMARY } from '@/config/reviews';
import BudgetKalkulator from '@/components/funnels/BudgetKalkulator';
import BadanfrageFunnel from '@/components/funnels/BadanfrageFunnel';

export const metadata = {
    title: 'Badsanierung & Badrenovierung in Aßlar & Wetzlar',
    description: 'Ihr Meisterbetrieb für schlüsselfertige Badsanierung, Musterbäder, barrierefreie Bäder nach DIN 18040-2 und persönliche Badplanung in Aßlar, Wetzlar und Umgebung.',
    alternates: { canonical: '/bad' }
};

const BATH_SERVICES = [
    { title: 'Badsanierung komplett', desc: 'Komplettbad schlüsselfertig zum Festpreis', path: '/bad/badsanierung', icon: Droplets },
    { title: 'Fliesen & XXL-Großformate', desc: 'Fugenarm verlegt, abgedichtet nach DIN 18534', path: '/bad/fliesen', icon: Grid },
    { title: 'Barrierefreies Bad', desc: 'DIN 18040-2 & bis zu 4.000 € Zuschuss', path: '/bad/barrierefreies-bad', icon: ShieldCheck },
    { title: 'Bad aus einer Hand', desc: 'Ein Ansprechpartner, abgestimmte Gewerke', path: '/bad/bad-aus-einer-hand', icon: Sparkles },
    { title: 'Musterbad-Konzepte', desc: 'Basic, Premium & Luxus (4,6 bis 15,9 m²)', path: '/bad/musterbaeder', icon: Layers },
    { title: 'Badplaner', desc: 'Ihr neues Bad Schritt für Schritt planen', path: '/bad/badplaner', icon: Ruler }
];

export default function BadPage() {
    const google = RATING_SUMMARY.google;

    return (
        <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
            {/* Ambient Glow */}
            <div className="ambient-glow-mint -top-32 -left-32 opacity-70" />
            <div className="ambient-glow-sky top-96 -right-24 opacity-60" />

            {/* Hero */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 relative z-10" aria-labelledby="bad-hero-heading">
                <div className="ceramic-hero rounded-[3rem] p-8 sm:p-12 text-center space-y-4 relative overflow-hidden">
                    <div className="flex flex-wrap items-center justify-center gap-2">
                        <span className="eyebrow">
                            <Award className="w-3.5 h-3.5" />
                            Meisterbetrieb für Badsanierung &middot; Aßlar &amp; Wetzlar
                        </span>
                        <span className="eyebrow eyebrow-amber">
                            <Star className="w-3.5 h-3.5 fill-current text-amber-500" />
                            {google.displayRating} &middot; {google.count} {google.label}
                        </span>
                    </div>
                    <h1 id="bad-hero-heading" className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                        Ihr Traumbad schlüsselfertig{' '}
                        <span className="text-ceramic-gradient">aus Meisterhand</span>
                    </h1>
                    <p className="text-sm sm:text-base text-slate-700 max-w-3xl mx-auto leading-relaxed">
                        Von der ersten Planungsskizze bis zur schlüsselfertigen Übergabe: Wir koordinieren alle Gewerke, bieten
                        transparente Festpreise und verbauen hochwertige Markenprodukte – normgerecht abgedichtet nach DIN 18534.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
                        <Link href="/bad/budgetkalkulator" className="btn-primary px-7 py-3.5 text-xs group">
                            Bad-Budget sofort berechnen
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                        <Link href="/bad/musterbaeder" className="btn-ghost px-7 py-3.5 text-xs">
                            Musterbäder entdecken
                        </Link>
                    </div>

                    <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 pt-2 text-sm font-semibold text-slate-700">
                        {['Kostenfreies Vor-Ort-Aufmaß', 'Staubschutz-Garantie', 'Verbindlicher Festpreis'].map((item) => (
                            <li key={item} className="flex items-center gap-1.5">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* Sub-Services Navigation Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 relative z-10" aria-labelledby="bad-services-heading">
                <div className="text-center max-w-3xl mx-auto mb-10">
                    <span className="eyebrow eyebrow-sky mb-4">Bad-Leistungen im Überblick</span>
                    <h2 id="bad-services-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                        Alles für Ihr neues Bad{' '}
                        <span className="text-ceramic-gradient">aus einer Hand</span>
                    </h2>
                </div>

                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {BATH_SERVICES.map((item) => {
                        const Icon = item.icon;
                        return (
                            <li key={item.path}>
                                <Link
                                    href={item.path}
                                    className="group glass-surface p-6 rounded-[2rem] flex items-start gap-4 h-full hover:-translate-y-0.5 hover:border-emerald-500/80 hover:shadow-[0_20px_40px_-12px_rgba(15,23,42,0.14)] transition-all duration-300"
                                >
                                    <span className="icon-chip w-11 h-11">
                                        <Icon className="w-5 h-5" />
                                    </span>
                                    <span className="flex-1">
                                        <span className="block font-black text-sm sm:text-base text-slate-900 group-hover:text-emerald-800 transition-colors mb-1">
                                            {item.title}
                                        </span>
                                        <span className="block text-xs text-slate-600 font-medium">{item.desc}</span>
                                    </span>
                                    <ArrowRight className="w-4 h-4 mt-1 text-slate-600 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition-all" />
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </section>

            {/* Quality Tiers */}
            <section className="py-20 bg-white border-y border-slate-200 relative z-10" aria-labelledby="bad-tiers-heading">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-14">
                        <span className="eyebrow mb-4">Transparente Standards</span>
                        <h2 id="bad-tiers-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            Unsere Qualitäts-Kategorien im Überblick
                        </h2>
                        <p className="mt-3 text-base text-slate-700 leading-relaxed">
                            Wählen Sie das passende Konzept für Ihre Ansprüche und Ihr Budget. Die Preisspannen sind Richtwerte –
                            den verbindlichen Festpreis erhalten Sie nach dem kostenfreien Vor-Ort-Aufmaß.
                        </p>
                    </div>

                    <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {QUALITY_TIERS.map((tier) => (
                            <li
                                key={tier.name}
                                className="group p-8 rounded-[2rem] bg-slate-50 border border-slate-200 flex flex-col justify-between hover:bg-white hover:-translate-y-0.5 hover:border-emerald-500/80 hover:shadow-[0_20px_40px_-12px_rgba(15,23,42,0.14)] transition-all duration-300"
                            >
                                <div className="space-y-3">
                                    <span className="text-xs font-black px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-800 inline-block border border-emerald-200">
                                        {tier.name}
                                    </span>
                                    <h3 className="text-xl font-black text-slate-900 group-hover:text-emerald-800 transition-colors">
                                        {tier.subtitle}
                                    </h3>
                                    <p className="font-display text-2xl font-black text-emerald-800 tabular-nums">{tier.priceRange}</p>
                                    <p className="text-sm text-slate-700 leading-relaxed">{tier.description}</p>
                                </div>
                                <div className="pt-6 mt-6 border-t border-slate-200">
                                    <Link
                                        href="/bad/musterbaeder"
                                        className="text-sm font-bold text-emerald-800 hover:text-emerald-700 inline-flex items-center gap-1"
                                    >
                                        Musterbäder ansehen
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <p className="mt-8 text-center text-sm text-slate-700">
                        Fragen zu Ihrem Bad? Rufen Sie {COMPANY_DATA.owner.fullName} direkt an:{' '}
                        <a
                            href={`tel:${COMPANY_DATA.contact.phoneLink}`}
                            className="font-bold text-emerald-800 hover:text-emerald-700 hover:underline underline-offset-2"
                        >
                            {COMPANY_DATA.contact.phone}
                        </a>
                    </p>
                </div>
            </section>

            {/* Interactive Calculator Component */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10 relative z-10 scroll-mt-28" id="budget" aria-label="Bad-Budgetkalkulator">
                <BudgetKalkulator />
            </section>

            {/* Badanfrage Funnel */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10 scroll-mt-28" id="anfrage" aria-label="Badanfrage">
                <BadanfrageFunnel />
            </section>
        </div>
    );
}
