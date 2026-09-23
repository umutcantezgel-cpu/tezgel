import React from 'react';
import Link from 'next/link';
import { Users, Award, ArrowRight, Phone } from 'lucide-react';
import { COMPANY_DATA, team } from '@/config/company';
import { createMetadata } from '@/lib/metadata';
import QualityPromise from '@/components/sections/QualityPromise';

export const metadata = createMetadata({
    title: 'Unser Team – Fliesen-Meisterbetrieb aus Aßlar',
    description: `Das Team von ${COMPANY_DATA.legalName}: Inhaber & Handwerksmeister ${COMPANY_DATA.owner.fullName} und das Fachverlegeteam für Fliesen-, Platten- & Mosaikarbeiten in Aßlar, Wetzlar & Mittelhessen.`,
    path: '/team'
});

export default function TeamPage() {
    const { owner, contact, authority } = COMPANY_DATA;

    return (
        <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
            {/* Ambient Glow */}
            <div className="ambient-glow-mint -top-20 -left-20 opacity-70" />
            <div className="ambient-glow-sky top-96 -right-20 opacity-60" />

            {/* Hero */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10">
                <div className="ceramic-hero rounded-[3rem] p-8 sm:p-12 text-center space-y-4 relative overflow-hidden">
                    <span className="eyebrow">
                        <Users className="w-3.5 h-3.5" />
                        Kompetenz &amp; Leidenschaft
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                        Unser Team –{' '}
                        <span className="text-ceramic-gradient">Handwerk aus Überzeugung</span>
                    </h1>
                    <p className="text-sm sm:text-base text-slate-700 max-w-2xl mx-auto leading-relaxed">
                        Hinter jedem Bad, jeder Terrasse und jeder großformatigen Fläche steht ein eingespieltes Team aus Aßlar – geführt von Inhaber &amp; Handwerksmeister {owner.fullName}.
                    </p>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {team.map((member) => (
                        <li
                            key={member.name}
                            className="group glass-surface p-8 rounded-[2rem] flex flex-col justify-between hover:-translate-y-0.5 hover:border-emerald-500/80 hover:shadow-[0_20px_40px_-12px_rgba(15,23,42,0.14)] transition-all duration-300"
                        >
                            <div>
                                <span className="icon-chip w-16 h-16 font-display font-black text-xl mb-5" aria-hidden="true">
                                    {member.name.charAt(0)}
                                </span>
                                <h2 className="font-black text-xl text-slate-900 mb-1 group-hover:text-emerald-800 transition-colors">{member.name}</h2>
                                <p className="text-xs font-black text-emerald-800 uppercase tracking-wider mb-3">{member.role}</p>
                                <p className="text-sm text-slate-700 leading-relaxed">{member.experience}</p>
                            </div>
                        </li>
                    ))}
                </ul>

                <div className="mt-12 ceramic-hero rounded-[2rem] p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="space-y-2 text-center md:text-left">
                        <span className="eyebrow">
                            <Award className="w-3.5 h-3.5" />
                            {authority.certification}
                        </span>
                        <p className="font-display text-xl sm:text-2xl font-black text-slate-900">
                            Lernen Sie uns persönlich kennen
                        </p>
                        <p className="text-sm text-slate-700">
                            Beim kostenfreien Vor-Ort-Aufmaß berät Sie {owner.fullName} persönlich.
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        <a href={`tel:${contact.phoneLink}`} className="btn-ghost">
                            <Phone className="w-4 h-4 text-emerald-700" />
                            {contact.phone}
                        </a>
                        <Link href="/kontakt" className="btn-primary">
                            Aufmaß anfragen
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>

                <p className="mt-8 text-center text-sm text-slate-700">
                    Sie möchten unser Team verstärken?{' '}
                    <Link href="/karriere" className="font-bold text-emerald-800 hover:text-emerald-700 hover:underline underline-offset-2">
                        Zu Karriere &amp; Jobs
                    </Link>
                </p>
            </div>

            <QualityPromise />
        </div>
    );
}
