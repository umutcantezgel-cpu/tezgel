"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ShieldCheck, FileText, Phone, Mail, HelpCircle, MessageCircle } from 'lucide-react';
import CalendlySection from '@/components/common/CalendlySection';
import { COMPANY_DATA } from '@/config/company';

// Keep in sync with the FAQPage JSON-LD in ./layout.tsx (same questions & answers).
const consultationFaqs = [
  {
    q: 'Ist das Erstgespräch wirklich 100% kostenlos und unverbindlich?',
    a: 'Ja. Sowohl die telefonische Erstberatung als auch das Vor-Ort-Aufmaß bei Ihnen in Aßlar, Wetzlar und Umgebung sind für Sie vollkommen kostenfrei und ohne jede Verpflichtung.'
  },
  {
    q: 'Wie lange dauert ein typischer Beratungstermin?',
    a: 'Für eine fundierte Ersteinschätzung planen wir in der Regel 30 bis 45 Minuten ein. Bei komplexen Sanierungsprojekten nehmen wir uns gerne auch 60 Minuten Zeit.'
  },
  {
    q: 'Welche Unterlagen sollte ich für den Termin bereitlegen?',
    a: 'Hilfreich sind Informationen zum Baujahr des Gebäudes, vorhandene Grundrisse oder Skizzen, Fotos des Badezimmers bzw. der zu belegenden Flächen sowie – falls vorhanden – Ideen zu Fliesenformat und Farbe.'
  },
  {
    q: 'Beraten Sie auch zu Zuschüssen für das barrierefreie Bad?',
    a: 'Ja. Für den Zuschuss der Pflegekasse zum barrierefreien Bad erstellen wir den prüffähigen Kostenvoranschlag und unterstützen Sie bei der Antragsstellung.'
  }
];

const beratungSteps = [
  {
    step: '01',
    title: 'Bedarfsanalyse',
    desc: 'Wir erfassen Ihre Wünsche, Raumgegebenheiten, gestalterischen Ziele und Ihr Budget.'
  },
  {
    step: '02',
    title: 'Technische Prüfung',
    desc: 'Prüfung von Ebenheit, Restfeuchte und Tragfähigkeit des Untergrunds sowie der Abdichtung in Nassbereichen.'
  },
  {
    step: '03',
    title: 'Material & Zuschuss-Check',
    desc: 'Beratung zu Formaten, Fugenbild und Rutschhemmung – und Prüfung möglicher Zuschüsse, z. B. der Pflegekasse für barrierefreie Bäder.'
  },
  {
    step: '04',
    title: 'Transparenter Kostenvoranschlag',
    desc: 'Detailliertes Festpreis-Angebot ohne versteckte Kosten mit verlässlichem Zeitplan.'
  }
];

const checklist = [
  { title: 'Maße & Fotos', text: 'Ungefähre Raummaße und Fotos der Flächen, die neu belegt werden sollen.' },
  { title: 'Gebäudedaten', text: 'Ungefähres Baujahr, Wohnfläche und Informationen zum vorhandenen Belag bzw. Untergrund.' },
  { title: 'Grundriss oder Skizzen', text: 'Skizzen vom Badezimmer oder den Wohnräumen erleichtern die Vorplanung enorm.' },
  { title: 'Wunschtermin & Budget', text: 'Ein grober Zeitrahmen für die geplante Umsetzung Ihrer Maßnahme.' }
];

const Beratung = () => {
    const { contact } = COMPANY_DATA;

    return (
        <div className="min-h-screen">
            {/* ── Hero Section ─────────────────────────────────────────── */}
            <section className="ceramic-band relative pt-32 pb-20 overflow-hidden">
                <div className="ambient-glow-mint -top-24 -left-24 opacity-70" />
                <div className="ambient-glow-sky -bottom-24 -right-24 opacity-60" />
                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="eyebrow mb-6">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            Kostenlose Erstberatung vom Handwerksmeister
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
                            Kostenlose{' '}
                            <span className="text-ceramic-gradient">Fachberatung</span>{' '}
                            vereinbaren
                        </h1>
                        <p className="text-lg md:text-xl text-slate-700 max-w-2xl mx-auto leading-relaxed">
                            Ob Badsanierung, XXL-Großformate, Wohnbereich oder Terrasse in Aßlar, Wetzlar und Umgebung – {COMPANY_DATA.owner.fullName} nimmt sich Zeit für Ihre Fragen und findet mit Ihnen die passende Lösung.
                        </p>
                        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                            <a href="#booking" className="btn-primary w-full sm:w-auto">
                                Termin vereinbaren
                            </a>
                            <a href={`tel:${contact.phoneLink}`} className="btn-ghost w-full sm:w-auto">
                                <Phone className="w-4 h-4 text-emerald-700" />
                                {contact.phone}
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── Process & Value ──────────────────────────────────────── */}
            <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-14">
                        <span className="eyebrow eyebrow-sky mb-4">Transparenter Ablauf</span>
                        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4 tracking-tight">
                            Unser 4-Stufen-Beratungsablauf
                        </h2>
                        <p className="text-slate-700">
                            Vom ersten Gespräch bis zum transparenten Angebot – strukturiert, kompetent und partnerschaftlich.
                        </p>
                    </div>

                    <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {beratungSteps.map((step) => (
                            <li
                                key={step.step}
                                className="group bg-slate-50 p-6 rounded-3xl border border-slate-200 relative hover:bg-white hover:-translate-y-0.5 hover:border-emerald-500/80 hover:shadow-[0_20px_40px_-12px_rgba(15,23,42,0.14)] transition-all duration-300"
                            >
                                <div className="font-display text-4xl font-black tabular-nums text-emerald-600/25 group-hover:text-emerald-600/40 transition-colors mb-3" aria-hidden="true">
                                    {step.step}
                                </div>
                                <h3 className="text-lg font-black text-slate-900 mb-2">{step.title}</h3>
                                <p className="text-sm text-slate-700 leading-relaxed">{step.desc}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* ── Checklist Preparation ────────────────────────────────── */}
            <section className="py-16 sm:py-20">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="glass-surface rounded-[2rem] p-8 md:p-12">
                        <div className="flex items-center gap-4 mb-8">
                            <span className="icon-chip w-12 h-12">
                                <FileText className="w-6 h-6" />
                            </span>
                            <div>
                                <h2 className="text-2xl font-black text-slate-900">Checkliste: So bereiten Sie Ihren Termin optimal vor</h2>
                                <p className="text-sm text-slate-600">Bringen Sie gerne folgende Unterlagen mit (falls zur Hand)</p>
                            </div>
                        </div>

                        <ul className="grid sm:grid-cols-2 gap-4 text-slate-700 text-sm">
                            {checklist.map((item) => (
                                <li key={item.title} className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                                    <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                                    <span><strong className="text-slate-900">{item.title}:</strong> {item.text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* ── Terminvereinbarung ───────────────────────────────────── */}
            <CalendlySection />

            {/* ── Consultation FAQs ────────────────────────────────────── */}
            <section className="py-16 sm:py-20 bg-white border-y border-slate-200">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <span className="eyebrow mb-4">Häufige Fragen</span>
                        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4 tracking-tight">
                            Häufige Fragen zur Beratung
                        </h2>
                        <p className="text-slate-700">
                            Alles Wichtige rund um Ablauf, Kosten und Zuschüsse.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {consultationFaqs.map((faq) => (
                            <div key={faq.q} className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                                <h3 className="font-black text-lg text-slate-900 mb-2 flex items-start gap-2">
                                    <HelpCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-1" />
                                    {faq.q}
                                </h3>
                                <p className="text-slate-700 text-sm leading-relaxed pl-7">
                                    {faq.a}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Direct Contact Section ───────────────────────────────── */}
            <section className="py-16 sm:py-20">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="ceramic-hero rounded-[2.5rem] p-8 sm:p-12 text-center">
                        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4">
                            Sie möchten lieber direkt mit uns sprechen?
                        </h2>
                        <p className="text-slate-700 mb-8 max-w-xl mx-auto text-sm sm:text-base">
                            Rufen Sie uns während unserer Geschäftszeiten an oder schreiben Sie uns eine kurze Nachricht.
                        </p>
                        <div className="flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-3">
                            <a href={`tel:${contact.phoneLink}`} className="btn-primary w-full sm:w-auto">
                                <Phone className="w-4 h-4" />
                                <span>{contact.phone}</span>
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
                                <Mail className="w-4 h-4 text-emerald-700" />
                                <span>{contact.email}</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Beratung;
