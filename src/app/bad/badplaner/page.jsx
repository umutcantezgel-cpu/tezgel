import React from 'react';
import Link from 'next/link';
import {
    Ruler,
    ClipboardList,
    Calculator,
    Layers,
    Send,
    ArrowRight
} from 'lucide-react';
import { COMPANY_DATA } from '@/config/company';
import BadanfrageFunnel from '@/components/funnels/BadanfrageFunnel';

export const metadata = {
    title: 'Badplaner | Ihr neues Bad Schritt für Schritt planen',
    description: 'Badplanung leicht gemacht: Schritt-für-Schritt-Anleitung mit Tipps zu Raummaßen, Ausstattung, Fliesen und Licht – und persönliche Beratung beim kostenfreien Vor-Ort-Aufmaß in Aßlar, Wetzlar & Umgebung.',
    alternates: { canonical: '/bad/badplaner' }
};

const PLANNING_STEPS = [
    { num: '01', title: 'Raummaße & Anschlüsse erfassen', desc: 'Messen Sie Länge, Breite und Raumhöhe aus und notieren Sie die Positionen von Türen, Fenstern, Heizkörpern und Rohrleitungsanschlüssen.' },
    { num: '02', title: 'Ausstattung & Aufteilung festlegen', desc: 'Legen Sie Ihre Wunschausstattung fest – Walk-In-Dusche, Badewanne, Waschtischmöbel, Spiegelschrank und WC – und skizzieren Sie eine sinnvolle Anordnung.' },
    { num: '03', title: 'Farben, Fliesen & Licht abstimmen', desc: 'Kombinieren Sie Fliesenoberflächen, Wandfarben und moderne LED-Beleuchtung für eine harmonische Wohlfühlatmosphäre.' }
];

const NEXT_STEPS = [
    { title: 'Projektcheck', desc: 'Größe, Umfang und Wünsche vorab erfassen', href: '/bad/projekt-check', icon: Calculator },
    { title: 'Musterbäder vergleichen', desc: 'Raumkonzepte von 4,6 bis 15,9 m² als Inspiration', href: '/bad/musterbaeder', icon: Layers },
    { title: 'Badanfrage stellen', desc: 'Ihre Planung direkt an den Meisterbetrieb senden', href: '/bad/badanfrage', icon: Send }
];

export default function BadplanerPage() {
    return (
        <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
            {/* Ambient Glow */}
            <div className="ambient-glow-mint -top-32 -left-32 opacity-70" />
            <div className="ambient-glow-sky top-96 -right-24 opacity-60" />

            {/* Hero */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10" aria-labelledby="badplaner-heading">
                <div className="ceramic-hero rounded-[3rem] p-8 sm:p-12 text-center space-y-4 relative overflow-hidden">
                    <span className="eyebrow">
                        <Ruler className="w-3.5 h-3.5" />
                        Badplanung Schritt für Schritt
                    </span>
                    <h1 id="badplaner-heading" className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                        Ihr Badplaner:{' '}
                        <span className="text-ceramic-gradient">in 3 Schritten zum Badkonzept</span>
                    </h1>
                    <p className="text-sm sm:text-base text-slate-700 max-w-3xl mx-auto leading-relaxed">
                        Planen Sie Ihr neues Badezimmer schon vor dem ersten Hammerschlag: Raummaße erfassen, Ausstattung festlegen,
                        Fliesen, Farben und Licht abstimmen – den Feinschliff übernehmen wir beim Vor-Ort-Termin.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
                        <a href="#planung" className="btn-primary px-7 py-3.5 text-xs group">
                            Zur Schritt-für-Schritt-Anleitung
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </a>
                        <Link href="/bad/projekt-check" className="btn-ghost px-7 py-3.5 text-xs">
                            Projektcheck starten
                        </Link>
                    </div>
                </div>
            </section>

            {/* Preparation Tip Box - Double Bezel */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 relative z-10" aria-labelledby="badplaner-tipp-heading">
                <div className="glass-bezel-outer">
                    <div className="glass-bezel-inner p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6">
                        <span className="icon-chip w-14 h-14">
                            <ClipboardList className="w-7 h-7" />
                        </span>
                        <div className="space-y-1 text-center md:text-left">
                            <h2 id="badplaner-tipp-heading" className="font-black text-base text-slate-900">
                                Tipp: Skizze, Maße &amp; Fotos genügen für den Start
                            </h2>
                            <p className="text-sm text-slate-700 leading-relaxed">
                                Eine einfache Grundriss-Skizze mit Maßen, Fenstern, Dachschrägen und Anschlüssen sowie ein paar Fotos
                                reichen für die erste Planung. Beim kostenfreien Vor-Ort-Aufmaß prüft {COMPANY_DATA.owner.fullName} alle
                                Details gemeinsam mit Ihnen.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3-Step Guide */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10 scroll-mt-28" id="planung" aria-labelledby="planung-heading">
                <div className="text-center max-w-3xl mx-auto mb-14">
                    <span className="eyebrow eyebrow-sky mb-4">Anleitung</span>
                    <h2 id="planung-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                        So funktioniert die Badplanung
                    </h2>
                    <p className="mt-3 text-base text-slate-700 leading-relaxed">
                        In drei einfachen Schritten von Ihrer Idee zum durchdachten Badkonzept.
                    </p>
                </div>

                <ol className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {PLANNING_STEPS.map((step) => (
                        <li
                            key={step.num}
                            className="group glass-surface p-8 rounded-[2rem] relative overflow-hidden hover:-translate-y-0.5 hover:border-emerald-500/80 hover:shadow-[0_20px_40px_-12px_rgba(15,23,42,0.14)] transition-all duration-300"
                        >
                            <span className="font-display block text-5xl font-black tabular-nums text-emerald-600/25 group-hover:text-emerald-600/40 transition-colors mb-4" aria-hidden="true">
                                {step.num}
                            </span>
                            <h3 className="text-lg font-black text-slate-900 mb-2 group-hover:text-emerald-800 transition-colors">
                                <span className="sr-only">Schritt {step.num}: </span>
                                {step.title}
                            </h3>
                            <p className="text-sm text-slate-700 leading-relaxed">{step.desc}</p>
                        </li>
                    ))}
                </ol>

                {/* Next steps */}
                <div className="mt-14">
                    <h2 className="text-center text-xl sm:text-2xl font-black text-slate-900 mb-6">Und danach?</h2>
                    <ul className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {NEXT_STEPS.map(({ title, desc, href, icon: Icon }) => (
                            <li key={href}>
                                <Link
                                    href={href}
                                    className="group flex items-center justify-between gap-3 p-4 rounded-2xl bg-white border border-slate-200 h-full hover:border-emerald-500/80 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-10px_rgba(15,23,42,0.18)] transition-all duration-300"
                                >
                                    <span className="flex items-center gap-3">
                                        <span className="icon-chip w-11 h-11">
                                            <Icon className="w-5 h-5" />
                                        </span>
                                        <span>
                                            <span className="block text-sm font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">{title}</span>
                                            <span className="block text-xs text-slate-600">{desc}</span>
                                        </span>
                                    </span>
                                    <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition-all" />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* Funnel */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10 scroll-mt-28" id="anfrage" aria-label="Badanfrage">
                <BadanfrageFunnel />
            </section>
        </div>
    );
}
