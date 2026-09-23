import React from 'react';
import Link from 'next/link';
import { CheckCircle2, GraduationCap, Mail, Phone, MessageCircle, ArrowRight } from 'lucide-react';
import { COMPANY_DATA } from '@/config/company';
import { createMetadata } from '@/lib/metadata';
import QualityPromise from '@/components/sections/QualityPromise';

const APPRENTICESHIP_TITLE = 'Fliesen-, Platten- und Mosaikleger (m/w/d)';

export const metadata = createMetadata({
    title: 'Ausbildung Fliesen-, Platten- und Mosaikleger (m/w/d)',
    description: `Ausbildung zum Fliesen-, Platten- und Mosaikleger (m/w/d) bei ${COMPANY_DATA.legalName} in ${COMPANY_DATA.headquarters.city} – eingetragener Meisterbetrieb der ${COMPANY_DATA.authority.shortName}. Jetzt per E-Mail, Telefon oder WhatsApp bewerben.`,
    path: '/karriere/ausbildung'
});

export default function AusbildungPage() {
    const { contact, owner, authority, headquarters } = COMPANY_DATA;

    const cards = [
        { title: 'Was du lernst', desc: 'Das Fliesenhandwerk in der Praxis: Untergrundvorbereitung, Abdichtung nach DIN 18534 sowie die Verlegung von Fliesen, Großformaten und Naturstein – im Bad, im Wohnbereich und auf Balkon und Terrasse.' },
        { title: 'Wo du lernst', desc: `In einem eingetragenen Meisterbetrieb der ${authority.name} mit Firmensitz in ${headquarters.city} – unter Inhaber & Handwerksmeister ${owner.fullName}.` },
        { title: 'Was du mitbringst', desc: 'Handwerkliches Geschick, Sorgfalt und Freude an präziser Arbeit, Teamgeist und Zuverlässigkeit.' }
    ];

    return (
        <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
            {/* Ambient Glow */}
            <div className="ambient-glow-mint -top-20 -left-20 opacity-70" />
            <div className="ambient-glow-sky top-96 -right-20 opacity-60" />

            {/* Hero */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10">
                <div className="ceramic-hero rounded-[3rem] p-8 sm:p-12 text-center space-y-4 relative overflow-hidden">
                    <span className="eyebrow eyebrow-sky">
                        <GraduationCap className="w-3.5 h-3.5" />
                        Ausbildung im Meisterbetrieb
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                        <span className="text-ceramic-gradient">Ausbildung</span> zum {APPRENTICESHIP_TITLE}
                    </h1>
                    <p className="text-sm sm:text-base text-slate-700 max-w-2xl mx-auto leading-relaxed">
                        Du möchtest ein Handwerk lernen, bei dem du am Ende des Tages siehst, was du geschaffen hast? Bewirb dich bei {COMPANY_DATA.legalName} in {headquarters.city} – ganz unkompliziert per E-Mail, Telefon oder WhatsApp.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {cards.map((card) => (
                        <li
                            key={card.title}
                            className="group glass-surface p-8 rounded-[2rem] hover:-translate-y-0.5 hover:border-emerald-500/80 hover:shadow-[0_20px_40px_-12px_rgba(15,23,42,0.14)] transition-all duration-300"
                        >
                            <CheckCircle2 className="w-6 h-6 text-emerald-600 mb-3" />
                            <h2 className="font-black text-lg text-slate-900 mb-2 group-hover:text-emerald-800 transition-colors">{card.title}</h2>
                            <p className="text-sm text-slate-700 leading-relaxed">{card.desc}</p>
                        </li>
                    ))}
                </ul>

                <div className="ceramic-hero rounded-[2rem] max-w-3xl mx-auto p-8 sm:p-10 text-center space-y-4">
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900">Bereit für deine Zukunft?</h3>
                    <p className="text-sm text-slate-700 max-w-xl mx-auto leading-relaxed">
                        Bewirb dich unkompliziert per E-Mail oder ruf uns direkt an für ein erstes Kennenlernen.
                    </p>
                    <div className="flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-3 pt-2">
                        <a
                            href={`mailto:${contact.email}?subject=${encodeURIComponent(`Bewerbung Ausbildung ${APPRENTICESHIP_TITLE}`)}`}
                            className="btn-primary w-full sm:w-auto"
                        >
                            <Mail className="w-4 h-4" />
                            Jetzt per E-Mail bewerben
                        </a>
                        <a href={`tel:${contact.phoneLink}`} className="btn-ghost w-full sm:w-auto">
                            <Phone className="w-4 h-4 text-emerald-700" />
                            {contact.phone}
                        </a>
                        <a
                            href={contact.whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="glass-button-whatsapp w-full sm:w-auto text-sm"
                        >
                            <MessageCircle className="w-4 h-4" />
                            WhatsApp
                        </a>
                    </div>
                    <p className="pt-2 text-sm text-slate-700">
                        <Link href="/karriere" className="inline-flex items-center gap-1 font-bold text-emerald-800 hover:text-emerald-700 hover:underline underline-offset-2">
                            Alle Stellenangebote ansehen
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </p>
                </div>
            </div>

            <QualityPromise />
        </div>
    );
}
