import React from 'react';
import Link from 'next/link';
import { BadgePercent, ArrowRight, Phone, HelpCircle, Accessibility } from 'lucide-react';
import { COMPANY_DATA } from '@/config/company';
import TezgelAnfrageFunnel from '@/components/funnels/TezgelAnfrageFunnel';
import QualityPromise from '@/components/sections/QualityPromise';

const GRANT_ITEMS = [
    { rate: '§ 40 SGB XI', title: 'Pflegekassen-Zuschuss', desc: 'Bis zu 4.180 € pro pflegebedürftiger Person für Maßnahmen zur Wohnumfeldverbesserung, z. B. die bodengleiche Dusche statt Badewanne.' },
    { rate: 'Pflegegrad 1–5', title: 'Voraussetzung', desc: 'Den Zuschuss der Pflegekasse erhalten Pflegebedürftige mit anerkanntem Pflegegrad.' },
    { rate: 'KfW 159', title: 'Altersgerecht Umbauen', desc: 'Über das KfW-Programm 159 („Altersgerecht Umbauen“) können barrierefreie Bäder gefördert werden.' },
    { rate: 'Antrag', title: 'Prüffähiger Kostenvoranschlag', desc: 'Wir erstellen den prüffähigen Kostenvoranschlag und begleiten Ihren Antrag von Anfang an.' }
];

// Keep in sync with the FAQPage JSON-LD in ./layout.tsx (same questions & answers).
const foerderFaqs = [
    {
        q: 'Wie läuft der Antrag auf den Pflegekassen-Zuschuss ab?',
        a: 'Wir erstellen für Ihr barrierefreies Bad den prüffähigen Kostenvoranschlag, den Sie bei Ihrer Pflegekasse einreichen. Stellen Sie den Antrag möglichst vor Beginn der Arbeiten – wir begleiten Sie von Anfang an.'
    },
    {
        q: 'Welche Voraussetzungen gelten für den Zuschuss der Pflegekasse?',
        a: 'Voraussetzung ist ein Pflegegrad (1–5). Die Pflegekasse bezuschusst dann Maßnahmen zur Wohnumfeldverbesserung – z. B. eine bodengleiche Dusche statt Badewanne oder schwellenlose Zugänge – mit bis zu 4.180 € pro pflegebedürftiger Person.'
    },
    {
        q: 'Gibt es auch Fördermittel für die Badsanierung?',
        a: 'Ja, über das KfW-Programm 159 („Altersgerecht Umbauen“) können barrierefreie Bäder gefördert werden. Zudem bezuschusst die Pflegekasse Maßnahmen zur Wohnumfeldverbesserung nach § 40 SGB XI mit bis zu 4.180 Euro pro pflegebedürftiger Person.'
    },
    {
        q: `Unterstützt ${COMPANY_DATA.legalName} mich bei den Formalitäten?`,
        a: 'Selbstverständlich! Wir erstellen den prüffähigen Kostenvoranschlag für Ihren Antrag und begleiten Sie Schritt für Schritt – vom kostenfreien Vor-Ort-Aufmaß bis zur Abnahme.'
    }
];

export default function FoerderungPage() {
    return (
        <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
            {/* Ambient Glow */}
            <div className="ambient-glow-mint -top-20 -right-20 opacity-70" />
            <div className="ambient-glow-sky top-96 -left-20 opacity-60" />

            {/* Hero */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10">
                <div className="ceramic-hero rounded-[3rem] p-8 sm:p-12 text-center space-y-4 relative overflow-hidden">
                    <span className="eyebrow eyebrow-amber">
                        <BadgePercent className="w-3.5 h-3.5" />
                        Pflegekasse (§ 40 SGB XI) &middot; KfW 159
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                        Förderung &amp; Zuschüsse für Ihr{' '}
                        <span className="text-ceramic-gradient">barrierefreies Bad</span>
                    </h1>
                    <p className="text-sm sm:text-base text-slate-700 max-w-2xl mx-auto leading-relaxed">
                        Verschenken Sie kein Geld: Für barrierefreie Bäder gibt es bis zu 4.180 € von der Pflegekasse. Wir begleiten Ihren Antrag von Anfang an.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
                        <Link href="/bad/budgetkalkulator" className="btn-primary px-7 py-3.5 text-xs">
                            Badbudget online berechnen
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link href="/kontakt" className="btn-ghost px-7 py-3.5 text-xs">
                            Beratung vereinbaren
                        </Link>
                    </div>
                </div>
            </div>

            {/* Grant Details Matrix */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-14">
                    <span className="eyebrow eyebrow-sky mb-4">Zuschüsse im Überblick</span>
                    <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                        Diese Förderung gibt es für Ihr barrierefreies Bad
                    </h2>
                    <p className="mt-3 text-sm sm:text-base text-slate-700">
                        Welche Zuschüsse in Ihrem Fall infrage kommen, besprechen wir gemeinsam beim kostenfreien Vor-Ort-Aufmaß.
                    </p>
                </div>

                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {GRANT_ITEMS.map((item) => (
                        <li
                            key={item.title}
                            className="group glass-surface p-6 rounded-[2rem] hover:-translate-y-0.5 hover:border-emerald-500/80 hover:shadow-[0_20px_40px_-12px_rgba(15,23,42,0.14)] transition-all duration-300 flex flex-col justify-between"
                        >
                            <div>
                                <span className="font-display text-2xl sm:text-3xl font-black text-emerald-800 mb-2 block">{item.rate}</span>
                                <h3 className="font-black text-base text-slate-900 mb-2 group-hover:text-emerald-800 transition-colors">{item.title}</h3>
                                <p className="text-sm text-slate-700 leading-relaxed">{item.desc}</p>
                            </div>
                        </li>
                    ))}
                </ul>

                {/* Bathroom Grant - Double Bezel */}
                <div className="glass-bezel-outer shadow-2xl">
                    <div className="glass-bezel-inner p-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                        <div className="md:col-span-2 space-y-3">
                            <span className="eyebrow">
                                <Accessibility className="w-3.5 h-3.5" />
                                Barrierefreie Bäder (§ 40 SGB XI)
                            </span>
                            <h3 className="text-2xl font-black text-slate-900">
                                Bis zu 4.180 € Zuschuss für Ihr barrierefreies Bad
                            </h3>
                            <p className="text-sm text-slate-700 leading-relaxed">
                                Für Pflegebedürftige (Pflegegrad 1–5) übernimmt die Pflegekasse bis zu 4.180 € für Maßnahmen zur Wohnumfeldverbesserung (z. B. bodengleiche Dusche statt Badewanne, schwellenlose Zugänge). Wir erstellen den prüffähigen Kostenvoranschlag.
                            </p>
                        </div>
                        <div className="text-center md:text-right">
                            <Link href="/kontakt" className="btn-primary px-6 py-3.5 text-xs">
                                Beratung vereinbaren
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* FAQ */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-10">
                    <span className="eyebrow mb-4">Häufige Fragen</span>
                    <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                        Förderung für Ihr Bad – kurz erklärt
                    </h2>
                </div>
                <div className="space-y-4">
                    {foerderFaqs.map((faq) => (
                        <div key={faq.q} className="glass-surface rounded-2xl p-6">
                            <h3 className="font-black text-base text-slate-900 mb-2 flex items-start gap-2">
                                <HelpCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                                {faq.q}
                            </h3>
                            <p className="text-sm text-slate-700 leading-relaxed pl-7">{faq.a}</p>
                        </div>
                    ))}
                </div>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                    <a href={`tel:${COMPANY_DATA.contact.phoneLink}`} className="btn-ghost px-6 py-3 text-xs">
                        <Phone className="w-4 h-4 text-emerald-700" />
                        {COMPANY_DATA.contact.phone}
                    </a>
                    <Link href="/faq" className="text-sm font-bold text-emerald-800 hover:text-emerald-700 hover:underline underline-offset-2 inline-flex items-center gap-1">
                        Weitere Fragen &amp; Antworten
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>

            <QualityPromise />

            {/* Anfrage */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10 scroll-mt-28" id="anfrage">
                <TezgelAnfrageFunnel />
            </div>
        </div>
    );
}
