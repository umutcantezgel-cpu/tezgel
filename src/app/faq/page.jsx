"use client";
import React, { useState, useMemo } from 'react';
import { Search, HelpCircle, ArrowRight, ChevronDown, ChevronUp, Droplets, ClipboardCheck, Phone, Layers, Sun } from 'lucide-react';
import Link from 'next/link';
import QualityPromise from '@/components/sections/QualityPromise';
import { COMPANY_DATA } from '@/config/company';

// Keep in sync with the FAQPage JSON-LD in ./layout.tsx (same questions & answers).
const faqData = {
    fliesen: {
        icon: Layers,
        title: 'Fliesen & Großformate',
        questions: [
            { q: 'Welche Fliesenkleber und Fugenmassen verwenden Sie?', a: 'Wir verwenden ausschließlich flexible C2-TE-S1/S2 Fliesenkleber und verfärbungsfreie Premium-Fugenmassen – für einen dauerhaft festen Verbund und ein sauberes Fugenbild.' },
            { q: 'Wann lohnen sich großformatige Fliesen (XXL)?', a: 'Großformate sorgen für fugenarme, planebene Flächen mit ruhigem, monolithischem Raumgefühl – im Bad ebenso wie im Wohnbereich. Mit Nivelliersystem und Vakuumhebetechnik verlegen wir sie millimetergenau und ohne Überzähne.' },
            { q: 'Was kostet die Fliesenverlegung pro Quadratmeter?', a: 'Das hängt von Format, Material und Zustand des Untergrunds ab. Nach dem kostenfreien Vor-Ort-Aufmaß erhalten Sie eine transparente Kostenaufstellung nach Quadratmetern und Arbeitsaufwand – als verbindliches Festpreisangebot.' },
            { q: 'Können neue Fliesen auf einen vorhandenen Belag verlegt werden?', a: 'Das hängt vom Zustand des Altbelags ab. Beim Vor-Ort-Aufmaß prüfen wir Ebenheit, Restfeuchte und Tragfähigkeit des Untergrunds und empfehlen Ihnen die fachgerechte Lösung.' }
        ]
    },
    bad: {
        icon: Droplets,
        title: 'Bad & Walk-In-Dusche',
        questions: [
            { q: 'Was kostet eine Komplettbadsanierung aus einer Hand?', a: 'Die Kosten hängen von Raumgröße, Ausstattung und Zustand des Untergrunds ab. Wir erstellen Ihnen nach einem kostenlosen Aufmaß vor Ort ein verbindliches Festpreisangebot.' },
            { q: 'Wie lange dauert ein kompletter Badumbau?', a: 'Die Dauer hängt vom Umfang der Arbeiten ab. Vor Baustart erhalten Sie einen verbindlichen Bauzeitenplan mit festen Zusagen für Baustart und Fertigstellung – damit Ihr Alltag planbar bleibt.' },
            { q: 'Gibt es Zuschüsse für barrierefreie Bäder?', a: 'Ja! Bei Vorliegen eines Pflegegrads (Pflegegrad 1–5) bezuschusst die Pflegekasse den altersgerechten Badumbau mit bis zu 4.000 € pro Person.' },
            { q: 'Wie wird eine bodengleiche Dusche dauerhaft dicht?', a: 'Durch eine normgerechte Verbundabdichtung nach DIN 18534: Lückenlose Abdichtungsbahnen und Dichtmanschetten in Nassräumen sorgen für dauerhafte Dichtigkeit und Schimmelschutz.' }
        ]
    },
    aussen: {
        icon: Sun,
        title: 'Balkon, Terrasse & Wohnen',
        questions: [
            { q: 'Welche Beläge eignen sich für Balkon und Terrasse?', a: 'Wir verlegen frostsichere 2-cm-Keramikplatten auf Stelzlagern – mit durchdachter Entwässerung für Balkon und Terrasse.' },
            { q: 'Welche Rutschhemmung brauche ich?', a: 'Das hängt vom Einsatzbereich ab. Bei der Material- und Fugenbildplanung beraten wir Sie zu normgerechter Rutschhemmung (R10/R11) – passend zu Ihrem Raum und Belag.' }
        ]
    },
    ablauf: {
        icon: ClipboardCheck,
        title: 'Angebot & Einsatzgebiet',
        questions: [
            { q: 'Unterstützen Sie bei der Beantragung von Zuschüssen?', a: 'Ja. Für den Zuschuss der Pflegekasse zum barrierefreien Bad erstellen wir den prüffähigen Kostenvoranschlag und begleiten Ihren Antrag von Anfang an.' },
            { q: 'Gibt es bei Ihnen eine Festpreisgarantie?', a: 'Ja! Nach dem kostenfreien Vor-Ort-Aufmaß erhalten Sie ein verbindliches Festpreisangebot ohne versteckte Zusatzkosten.' },
            { q: 'In welchem Gebiet sind Sie tätig?', a: `Vom Firmensitz in ${COMPANY_DATA.headquarters.city} aus sind wir in ${COMPANY_DATA.business.serviceArea.slice(0, -1).join(', ')} sowie für Großprojekte in ganz Hessen für Sie im Einsatz.` }
        ]
    }
};

const categories = Object.entries(faqData);

export default function FAQPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [openCategory, setOpenCategory] = useState('fliesen');
    const [openQuestions, setOpenQuestions] = useState({});

    const filteredCategories = useMemo(() => {
        if (!searchQuery.trim()) return categories;

        return categories.map(([key, category]) => {
            const filteredQuestions = category.questions.filter(
                q => q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    q.a.toLowerCase().includes(searchQuery.toLowerCase())
            );
            return [key, { ...category, questions: filteredQuestions }];
        }).filter(([, category]) => category.questions.length > 0);
    }, [searchQuery]);

    const toggleQuestion = (categoryKey, questionIndex) => {
        const key = `${categoryKey}-${questionIndex}`;
        setOpenQuestions(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
            {/* Ambient Glow */}
            <div className="ambient-glow-mint -top-20 -left-20 opacity-70" />
            <div className="ambient-glow-sky top-96 -right-20 opacity-60" />

            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10">
                <div className="ceramic-hero rounded-[3rem] p-8 sm:p-14 text-center space-y-5 relative overflow-hidden">
                    <span className="eyebrow">
                        <HelpCircle className="w-3.5 h-3.5" />
                        Schnelle Meister-Antworten
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                        Häufig gestellte Fragen zu{' '}
                        <span className="text-ceramic-gradient">Bad &amp; Fliesen</span>
                    </h1>
                    <p className="text-sm sm:text-base text-slate-700 max-w-3xl mx-auto leading-relaxed">
                        Hier beantwortet {COMPANY_DATA.owner.fullName} die wichtigsten Fragen rund um Fliesen &amp; Großformate, Badsanierung, DIN 18534 Abdichtung, Balkon &amp; Terrasse, Zuschüsse und Festpreisangebote.
                    </p>

                    {/* Search Bar */}
                    <div className="relative max-w-xl mx-auto pt-2">
                        <label htmlFor="faq-search" className="sr-only">Frage oder Stichwort suchen</label>
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 mt-1 w-4 h-4 text-slate-600" aria-hidden="true" />
                        <input
                            id="faq-search"
                            type="search"
                            placeholder="Frage oder Stichwort suchen..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-3.5 rounded-full bg-white border border-slate-300 text-slate-900 placeholder:text-slate-500 text-sm font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                        />
                    </div>
                </div>
            </div>

            {/* FAQ Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
                {!searchQuery && (
                    <div className="flex flex-wrap gap-2.5 justify-center mb-10">
                        {categories.map(([key, category]) => {
                            const Icon = category.icon;
                            const isActive = openCategory === key;
                            return (
                                <button
                                    key={key}
                                    type="button"
                                    onClick={() => setOpenCategory(key)}
                                    aria-pressed={isActive}
                                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-black border transition-all duration-300 ${
                                        isActive
                                            ? 'bg-emerald-700 text-white border-emerald-700 shadow-md shadow-emerald-700/20'
                                            : 'bg-white text-slate-800 border-slate-200 hover:border-emerald-500/80 hover:text-emerald-800 hover:-translate-y-0.5'
                                    }`}
                                >
                                    <Icon className="w-3.5 h-3.5" />
                                    {category.title}
                                </button>
                            );
                        })}
                    </div>
                )}

                {/* Questions Grid */}
                <div className="space-y-4">
                    {(searchQuery ? filteredCategories : categories.filter(([key]) => key === openCategory)).map(([key, category]) => {
                        const Icon = category.icon;
                        return (
                            <div key={key} className="space-y-3">
                                {searchQuery && (
                                    <div className="flex items-center gap-2.5 pt-4 pb-1">
                                        <span className="icon-chip w-8 h-8 rounded-xl">
                                            <Icon className="w-4 h-4" />
                                        </span>
                                        <h2 className="text-base font-black text-slate-900">{category.title}</h2>
                                    </div>
                                )}
                                {category.questions.map((faq, idx) => {
                                    const isOpen = openQuestions[`${key}-${idx}`];
                                    return (
                                        <div
                                            key={idx}
                                            className={`glass-surface rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'border-emerald-500/80' : 'hover:border-emerald-500/80'}`}
                                        >
                                            <button
                                                type="button"
                                                onClick={() => toggleQuestion(key, idx)}
                                                aria-expanded={Boolean(isOpen)}
                                                className="w-full text-left p-5 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                                            >
                                                <span className="font-black text-sm text-slate-900">{faq.q}</span>
                                                {isOpen ? (
                                                    <ChevronUp className="w-4 h-4 text-emerald-600 shrink-0" />
                                                ) : (
                                                    <ChevronDown className="w-4 h-4 text-slate-600 shrink-0" />
                                                )}
                                            </button>
                                            {isOpen && (
                                                <div className="px-5 pb-5 text-sm text-slate-700 border-t border-slate-200 pt-4 leading-relaxed">
                                                    {faq.a}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>

                {/* No Results */}
                {searchQuery && filteredCategories.length === 0 && (
                    <div className="glass-surface p-12 rounded-[2.5rem] text-center space-y-3">
                        <HelpCircle className="w-10 h-10 text-emerald-600 mx-auto" />
                        <h3 className="text-base font-black text-slate-900">Keine passenden Fragen gefunden</h3>
                        <p className="text-sm text-slate-700">
                            Für &bdquo;{searchQuery}&ldquo; konnten wir keinen Treffer finden. Kontaktieren Sie uns gerne direkt!
                        </p>
                    </div>
                )}

                {/* Question CTA Box */}
                <div className="mt-14 ceramic-hero rounded-[2rem] p-8 text-center space-y-4">
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900">Ihre Frage war nicht dabei?</h3>
                    <p className="text-sm text-slate-700 max-w-lg mx-auto leading-relaxed">
                        {COMPANY_DATA.owner.fullName} beantwortet Ihre individuellen Anliegen gerne persönlich – am Telefon, per WhatsApp oder beim kostenfreien Vor-Ort-Aufmaß.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                        <Link href="/kontakt" className="btn-primary px-7 py-3.5 text-xs">
                            Jetzt Kontakt aufnehmen
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <a href={`tel:${COMPANY_DATA.contact.phoneLink}`} className="btn-ghost px-7 py-3.5 text-xs">
                            <Phone className="w-4 h-4 text-emerald-700" />
                            {COMPANY_DATA.contact.phone}
                        </a>
                    </div>
                </div>
            </div>

            <QualityPromise />
        </div>
    );
}
