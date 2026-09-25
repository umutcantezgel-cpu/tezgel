import React from 'react';
import Link from 'next/link';
import { Award, CheckCircle2, ArrowRight } from 'lucide-react';
import { COMPANY_DATA, historyTimeline } from '@/config/company';
import { createMetadata } from '@/lib/metadata';
import QualityPromise from '@/components/sections/QualityPromise';

export const metadata = createMetadata({
    title: 'Unternehmen & Qualitätsversprechen',
    description: `${COMPANY_DATA.legalName} aus ${COMPANY_DATA.headquarters.city}: gegründet ${COMPANY_DATA.business.establishmentYear}, ${COMPANY_DATA.authority.certification}. Unsere Geschichte, Inhaber ${COMPANY_DATA.owner.fullName} und unser 8-Punkte-Qualitätsversprechen.`,
    path: '/unternehmen'
});

export default function UnternehmenPage() {
    const { legalName, owner, business, authority, headquarters, motto } = COMPANY_DATA;

    return (
        <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
            {/* Ambient Glow */}
            <div className="ambient-glow-orange -top-20 -left-20 opacity-70" />
            <div className="ambient-glow-red top-96 -right-20 opacity-60" />

            {/* Hero */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10">
                <div className="ceramic-hero rounded-tile-xl p-8 sm:p-12 text-center space-y-4 relative overflow-hidden">
                    <span className="eyebrow eyebrow-amber">
                        <Award className="w-3.5 h-3.5" />
                        Gegründet {business.establishmentYear} &middot; {authority.shortName}
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                        {legalName}:{' '}
                        <span className="text-ceramic-gradient">Unternehmen &amp; Qualität</span>
                    </h1>
                    <p className="text-sm sm:text-base text-slate-700 max-w-2xl mx-auto leading-relaxed">
                        Verlässlichkeit, handwerkliche Perfektion und saubere Baustellen: Seit {business.establishmentYear} steht unser Fachbetrieb aus {headquarters.city} mit einem Team von bis zu 12 Handwerkern für Fliesen-, Platten- und Mosaikarbeiten in Wetzlar, Gießen und ganz Mittelhessen.
                    </p>
                </div>
            </div>

            {/* History Timeline */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="eyebrow mb-4">Unsere Geschichte</span>
                    <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                        Unsere Unternehmensgeschichte seit {business.establishmentYear}
                    </h2>
                    <p className="mt-3 text-sm sm:text-base text-slate-700">
                        Von der Betriebsgründung in {headquarters.city} zum Fliesen-Fachbetrieb für ganz Mittelhessen.
                    </p>
                </div>

                <ol className="space-y-8 relative before:absolute before:inset-y-0 before:left-8 md:before:left-1/2 before:-translate-x-px before:w-0.5 before:bg-orange-200">
                    {historyTimeline.map((item) => (
                        <li key={item.year} className="relative flex flex-col md:flex-row items-start md:items-center gap-6 group pl-16 md:pl-0">
                            <div className="flex items-center justify-start md:justify-end w-full md:w-1/2 md:pr-10">
                                <div className="glass-surface p-6 rounded-tile-lg hover:-translate-y-0.5 hover:border-orange-500/80 hover:shadow-[0_20px_40px_-12px_rgba(15,23,42,0.14)] transition-all duration-300 w-full">
                                    <span className="text-xs font-black tabular-nums px-3 py-1 rounded-tile-pill bg-orange-50 text-orange-800 inline-block mb-2 border border-orange-200">
                                        {item.year}
                                    </span>
                                    <h3 className="font-black text-base text-slate-900 mb-1 group-hover:text-orange-700 transition-colors">{item.title}</h3>
                                    <p className="text-sm text-slate-700 leading-relaxed">{item.description}</p>
                                </div>
                            </div>

                            {/* Node Center Marker */}
                            <div className="absolute left-8 md:left-1/2 top-8 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 w-5 h-5 rounded-tile-pill bg-orange-600 border-4 border-white shadow-md z-10" />

                            <div className="hidden md:block md:w-1/2 md:pl-10" />
                        </li>
                    ))}
                </ol>
            </div>

            {/* Leadership & Values - Double Bezel */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
                <div className="glass-bezel-outer shadow-2xl">
                    <div className="glass-bezel-inner p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        <div className="lg:col-span-8 space-y-4">
                            <span className="eyebrow">Inhaber</span>
                            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                                {owner.fullName} &amp; das Fachverlegeteam
                            </h2>
                            <figure>
                                <blockquote className="text-sm sm:text-base text-slate-700 leading-relaxed italic">
                                    &bdquo;{motto}&ldquo;
                                </blockquote>
                                <figcaption className="mt-1 text-xs font-bold text-orange-700">
                                    — {owner.fullName}, {owner.title}
                                </figcaption>
                            </figure>
                            <ul className="pt-2 flex flex-wrap gap-x-5 gap-y-2 text-sm font-bold text-slate-800">
                                {[
                                    `Gegründet ${business.establishmentYear}`,
                                    'DIN 18534 Verbundabdichtung',
                                    `${authority.shortName} Mitglied`,
                                    'Bis zu 12 Fachkräfte'
                                ].map((badge) => (
                                    <li key={badge} className="flex items-center gap-1.5">
                                        <CheckCircle2 className="w-4 h-4 text-orange-600" />
                                        {badge}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="lg:col-span-4 text-center lg:text-right">
                            <Link href="/kontakt" className="btn-primary px-7 py-4 text-xs">
                                <span>Lernen Sie uns persönlich kennen</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <QualityPromise />
        </div>
    );
}
