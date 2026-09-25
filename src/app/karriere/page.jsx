import React from 'react';
import Link from 'next/link';
import { Briefcase, Award, ArrowRight, Layers, Ruler, MapPin, Mail, Phone, MessageCircle, HelpCircle, GraduationCap } from 'lucide-react';
import { COMPANY_DATA } from '@/config/company';
import QualityPromise from '@/components/sections/QualityPromise';

const { contact, authority, headquarters, business } = COMPANY_DATA;

const HIGHLIGHTS = [
    { icon: Award, title: 'Eingetragener HWK-Fachbetrieb', desc: `Handwerk nach geprüften Standards – eingetragen bei der ${authority.name} als ${authority.responsibility}.` },
    { icon: Layers, title: 'Anspruchsvolle Projekte', desc: 'Badsanierungen, bodengleiche Walk-In-Duschen, XXL-Großformate, Treppen, Naturstein sowie Balkone und Terrassen.' },
    { icon: Ruler, title: 'Moderne Verlegetechnik', desc: 'Nivelliersystem, Vakuumhebetechnik und spezialisierte Schneidtechnik für millimetergenaue Großformate.' },
    { icon: MapPin, title: 'Regionale Baustellen', desc: `Unsere Projekte liegen in ${headquarters.city}, Wetzlar, Gießen und Mittelhessen – für Großprojekte auch in ganz Hessen.` }
];

// The first entry is mirrored as JobPosting JSON-LD in ./layout.tsx.
const JOBS = [
    {
        title: 'Fliesenleger (m/w/d) – Geselle oder erfahrene Fachkraft',
        loc: `${headquarters.city} & Mittelhessen`,
        desc: 'Verlegung von Fliesen, Platten und Naturstein in Bädern, Wohnbereichen sowie auf Balkonen und Terrassen – von der Untergrundvorbereitung über die DIN-18534-Verbundabdichtung bis zur fugenarmen XXL-Großformatverlegung.'
    },
    {
        title: 'Ausbildung zum Fliesen-, Platten- und Mosaikleger (m/w/d)',
        loc: `${headquarters.city} & Mittelhessen`,
        desc: `Lerne das Fliesenhandwerk von Grund auf in einem eingetragenen Fachbetrieb der ${authority.shortName}.`,
        moreHref: '/karriere/ausbildung'
    },
    {
        title: 'Initiativbewerbung (m/w/d)',
        loc: `${headquarters.city} & Mittelhessen`,
        desc: 'Sie möchten im Fliesenhandwerk mit anpacken, finden aber keine passende Ausschreibung? Wir freuen uns über Ihre Initiativbewerbung.'
    }
];

// Keep in sync with the FAQPage JSON-LD in ./layout.tsx (same questions & answers).
const KARRIERE_FAQS = [
    {
        q: 'Wie läuft der Bewerbungsprozess ab?',
        a: `Ganz unkompliziert: Rufen Sie uns an unter ${contact.phone}, schreiben Sie per WhatsApp an ${contact.whatsapp} oder senden Sie eine kurze E-Mail an ${contact.email}.`
    },
    {
        q: 'Welche Arbeiten erwarten mich?',
        a: 'Das gesamte Spektrum des Fliesenhandwerks: Badsanierungen und barrierefreie Walk-In-Duschen, fugenarme Großformate, Wohnbereiche, Küchen und Treppen, Balkone und Terrassen, Untergrundvorbereitung mit DIN 18534 Verbundabdichtung sowie Naturstein.'
    },
    {
        q: 'Wo liegen die Baustellen?',
        a: `Vom Firmensitz in ${headquarters.city} aus arbeiten wir in ${business.serviceArea.slice(0, -1).join(', ')} – für Großprojekte auch in ganz Hessen.`
    }
];

const applyHref = (title) => `mailto:${contact.email}?subject=${encodeURIComponent(`Bewerbung ${title}`)}`;

export default function KarrierePage() {
    return (
        <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
            {/* Ambient Glow */}
            <div className="ambient-glow-orange -top-20 -left-20 opacity-70" />
            <div className="ambient-glow-red top-96 -right-20 opacity-60" />

            {/* Hero */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10">
                <div className="ceramic-hero rounded-tile-xl p-8 sm:p-12 text-center space-y-4 relative overflow-hidden">
                    <span className="eyebrow">
                        <Briefcase className="w-3.5 h-3.5" />
                        Werde Teil unseres Teams
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                        Karriere bei{' '}
                        <span className="text-ceramic-gradient">{COMPANY_DATA.legalName}</span>
                    </h1>
                    <p className="text-sm sm:text-base text-slate-700 max-w-2xl mx-auto leading-relaxed">
                        Wir suchen Verstärkung im Fliesenhandwerk: Fliesenleger (m/w/d) als Geselle oder erfahrene Fachkraft. Bewerben Sie sich direkt bei Inhaber {COMPANY_DATA.owner.fullName} – ein starkes Team von bis zu 12 Handwerkern.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
                        <a href={applyHref(JOBS[0].title)} className="btn-primary px-7 py-3.5 text-xs">
                            <Mail className="w-4 h-4" />
                            Jetzt per E-Mail bewerben
                        </a>
                        <a href={`tel:${contact.phoneLink}`} className="btn-ghost px-7 py-3.5 text-xs">
                            <Phone className="w-4 h-4 text-orange-600" />
                            {contact.phone}
                        </a>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
                {/* Highlights */}
                <div className="text-center max-w-3xl mx-auto mb-10">
                    <span className="eyebrow mb-4">Arbeiten im Fachbetrieb</span>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Was Sie bei uns erwartet</h2>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                    {HIGHLIGHTS.map(({ icon: Icon, title, desc }) => (
                        <li
                            key={title}
                            className="group glass-surface p-6 rounded-tile-lg hover:-translate-y-0.5 hover:border-orange-500/80 hover:shadow-[0_20px_40px_-12px_rgba(15,23,42,0.14)] transition-all duration-300"
                        >
                            <span className="icon-chip w-11 h-11 mb-4">
                                <Icon className="w-5 h-5" />
                            </span>
                            <h3 className="font-black text-base text-slate-900 mb-2 group-hover:text-orange-700 transition-colors">{title}</h3>
                            <p className="text-sm text-slate-700 leading-relaxed">{desc}</p>
                        </li>
                    ))}
                </ul>

                {/* Job Openings */}
                <div className="space-y-6 max-w-4xl mx-auto">
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 text-center mb-8 tracking-tight">
                        Aktuelle Stellenangebote in {headquarters.city}
                    </h2>

                    {JOBS.map((job) => (
                        <article
                            key={job.title}
                            className="glass-surface p-8 rounded-tile-lg flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:-translate-y-0.5 hover:border-orange-500/80 hover:shadow-[0_20px_40px_-12px_rgba(15,23,42,0.14)] transition-all duration-300"
                        >
                            <div>
                                <span className="text-xs font-black text-orange-800 bg-orange-50 px-3.5 py-1 rounded-tile-pill inline-flex items-center gap-1.5 mb-2 border border-orange-200">
                                    <MapPin className="w-3.5 h-3.5 text-orange-600" />
                                    {job.loc}
                                </span>
                                <h3 className="text-lg font-black text-slate-900 mb-2">{job.title}</h3>
                                <p className="text-sm text-slate-700 leading-relaxed">{job.desc}</p>
                                {job.moreHref && (
                                    <Link
                                        href={job.moreHref}
                                        className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-orange-700 hover:text-orange-600 hover:underline underline-offset-2"
                                    >
                                        <GraduationCap className="w-4 h-4" />
                                        Mehr zur Ausbildung
                                    </Link>
                                )}
                            </div>
                            <div className="shrink-0">
                                <a href={applyHref(job.title)} className="btn-primary px-6 py-3 text-xs w-full sm:w-auto">
                                    Jetzt bewerben
                                    <ArrowRight className="w-4 h-4" />
                                </a>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Application FAQ */}
                <div className="max-w-4xl mx-auto mt-20">
                    <div className="text-center mb-10">
                        <span className="eyebrow mb-4">Bewerbung</span>
                        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Häufige Fragen zur Bewerbung</h2>
                    </div>
                    <div className="space-y-4">
                        {KARRIERE_FAQS.map((faq) => (
                            <div key={faq.q} className="glass-surface rounded-tile-md p-6">
                                <h3 className="font-black text-base text-slate-900 mb-2 flex items-start gap-2">
                                    <HelpCircle className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                                    {faq.q}
                                </h3>
                                <p className="text-sm text-slate-700 leading-relaxed pl-7">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                        <a href={`tel:${contact.phoneLink}`} className="btn-ghost w-full sm:w-auto">
                            <Phone className="w-4 h-4 text-orange-600" />
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
                        <a href={`mailto:${contact.email}`} className="btn-ghost w-full sm:w-auto">
                            <Mail className="w-4 h-4 text-orange-600" />
                            {contact.email}
                        </a>
                    </div>
                </div>
            </div>

            <QualityPromise />
        </div>
    );
}
