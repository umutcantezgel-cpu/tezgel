import React from 'react';
import Link from 'next/link';
import {
    Wrench,
    Phone,
    MessageCircle,
    ArrowRight,
    CheckCircle2,
    Droplets,
    Grid,
    Palette,
    AlertTriangle,
    ScanSearch,
    Camera,
    Clock,
    Star,
    Quote
} from 'lucide-react';
import { COMPANY_DATA } from '@/config/company';
import { REVIEWS } from '@/config/reviews';
import { createMetadata } from '@/lib/metadata';
import QualityPromise from '@/components/sections/QualityPromise';

export const metadata = createMetadata({
    title: 'Fliesenreparatur: einzelne Fliesen & Fugen ausbessern',
    description:
        'Gesprungene Fliese, lose Sockelfliese, bröselnde Fuge? Der Meisterbetrieb aus Aßlar übernimmt auch kleinere Reparaturen – sauber ausgeführt, nach Termin.',
    path: '/fliesenreparatur'
});

const REPAIRS = [
    'Einzelne gesprungene, abgeplatzte oder hohl liegende Boden- und Wandfliesen',
    'Lose oder beschädigte Sockelfliesen',
    'Ausgebrochene Zementfugen und gerissene Silikonfugen',
    'Beschädigte Stufenkanten und lose Stufenplatten',
    'Bohrlöcher nach einem Umbau oder Fliesen hinter entfernten Einbauten'
];

const REPLACE_STEPS = [
    { t: 'Fugen öffnen', d: 'Die Fugen rund um die Fliese werden vorsichtig ausgefräst bzw. ausgekratzt, damit Spannungen nicht auf die Nachbarfliesen übergehen.' },
    { t: 'Fliese kontrolliert entfernen', d: 'Die beschädigte Fliese wird von der Mitte aus zerlegt – nicht von der Kante, wo die Nachbarfliesen anliegen.' },
    { t: 'Untergrund prüfen', d: 'Kleberreste werden entfernt. In Dusche und Bad liegt direkt unter der Fliese oft die Verbundabdichtung: Sie bleibt unversehrt oder wird mit einem verträglichen System örtlich ergänzt.' },
    { t: 'Neu setzen und verfugen', d: 'Die Ersatzfliese wird vollflächig in flexiblem Kleber gesetzt, bündig ausgerichtet und nach dem Abbinden verfugt; Anschlussfugen werden elastisch geschlossen.' }
];

const NO_LONGER_AVAILABLE = [
    { t: 'Restfliesen', d: 'Oft liegen im Keller oder in der Garage noch Fliesen aus der Bauzeit. Bewahren Sie diese auf – sie passen am besten.' },
    { t: 'Fliese an unauffälliger Stelle entnehmen', d: 'Eine Fliese unter der Waschmaschine, hinter einem Schrank oder in einer Abstellkammer kann ausgebaut und an der sichtbaren Stelle eingesetzt werden; die unsichtbare Stelle erhält eine ähnliche Fliese.' },
    { t: 'Bewusster Akzent', d: 'Passt nichts mehr, kann ein gezielt gesetzter Kontrast – etwa ein Dekorband oder eine Reihe in anderer Farbe – besser aussehen als eine fast passende Fliese.' }
];

const NOT_WORTH_IT = [
    'Viele Fliesen klingen hohl oder lösen sich auf größerer Fläche',
    'Risse laufen über mehrere Fliesen hinweg – ein Hinweis auf Bewegungen im Untergrund',
    'Hinter den Fliesen ist es dauerhaft feucht, die Abdichtung ist vermutlich defekt',
    'Es sind so viele Ersatzfliesen nötig, dass keine passenden mehr zu bekommen sind'
];

const WEITERLESEN = [
    { title: 'Fugensanierung', path: '/fliesen/fugensanierung', desc: 'Silikon- und Zementfugen erneuern' },
    { title: 'Schadensanalyse', path: '/schadensanalyse', desc: 'Ursachen vor Ort klären' },
    { title: 'Badsanierung', path: '/bad/badsanierung', desc: 'Wenn eine Reparatur nicht mehr reicht' },
    { title: 'Häufige Fragen', path: '/faq', desc: 'Antworten rund um Fliesen und Ablauf' }
];

export default function FliesenreparaturPage() {
    const review = REVIEWS.find((r) => r.id === 'christian-d');

    return (
        <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
            <div className="ambient-glow-mint -top-32 -left-32 opacity-70" />
            <div className="ambient-glow-sky top-96 -right-24 opacity-60" />

            {/* Hero */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10" aria-labelledby="reparatur-heading">
                <div className="ceramic-hero rounded-[3rem] p-8 sm:p-12 text-center space-y-4 relative overflow-hidden">
                    <span className="eyebrow">
                        <Wrench className="w-3.5 h-3.5" />
                        Service &middot; Reparaturen &amp; kleinere Arbeiten
                    </span>
                    <h1 id="reparatur-heading" className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                        Fliesenreparatur und kleine Arbeiten:{' '}
                        <span className="text-ceramic-gradient">einzelne Fliesen, Fugen, Sockel</span>
                    </h1>
                    <p className="text-sm sm:text-base text-slate-700 max-w-3xl mx-auto leading-relaxed">
                        Nicht jeder Schaden erfordert einen neuen Boden. Eine gesprungene Fliese, eine lose Sockelfliese
                        oder eine bröselnde Fuge lassen sich oft gezielt ausbessern. Als Meisterbetrieb aus{' '}
                        {COMPANY_DATA.headquarters.city} übernehmen wir auch kleinere Arbeiten – sorgfältig ausgeführt,
                        nach vereinbartem Termin.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
                        <a
                            href={COMPANY_DATA.contact.whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary px-7 py-3.5 text-xs"
                        >
                            <MessageCircle className="w-4 h-4" />
                            Fotos per WhatsApp senden
                        </a>
                        <a href={`tel:${COMPANY_DATA.contact.phoneLink}`} className="btn-ghost px-7 py-3.5 text-xs">
                            <Phone className="w-4 h-4 text-emerald-700" />
                            {COMPANY_DATA.contact.phone}
                        </a>
                    </div>
                </div>
            </section>

            {/* Was repariert wird + Wasseraustritt */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10" aria-label="Leistungen und Erstmaßnahmen">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="glass-surface p-8 rounded-[2rem] space-y-4">
                        <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
                            <span className="icon-chip w-11 h-11">
                                <Grid className="w-5 h-5" />
                            </span>
                            Was repariert wird
                        </h2>
                        <ul className="space-y-3">
                            {REPAIRS.map((item) => (
                                <li key={item} className="flex items-start gap-2 text-sm text-slate-700 leading-relaxed">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="glass-surface p-8 rounded-[2rem] space-y-4">
                        <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
                            <span className="icon-chip w-11 h-11">
                                <Droplets className="w-5 h-5" />
                            </span>
                            Wasser tritt aus? Erst absperren, dann Installateur
                        </h2>
                        <ol className="space-y-2 text-sm text-slate-700 leading-relaxed list-decimal list-inside marker:text-emerald-600 marker:font-bold">
                            <li>Absperrventil bzw. Hauptabsperrhahn hinter dem Wasserzähler schließen</li>
                            <li>Elektrische Geräte im betroffenen Bereich nur stromlos schalten, wenn das gefahrlos möglich ist</li>
                            <li>Wasser aufnehmen und den Schaden für die Versicherung fotografieren</li>
                            <li>Einen Installateur mit der Behebung der Leckage beauftragen</li>
                        </ol>
                        <p className="text-sm text-slate-700 leading-relaxed">
                            Leitungsarbeiten gehören nicht zu unserem Handwerk. Sobald die Leitung repariert und der
                            Untergrund trocken ist, erneuern wir Fliesen und Abdichtung – nach vereinbartem Termin.
                        </p>
                    </div>
                </div>
            </section>

            {/* Einzelne Fliesen austauschen */}
            <section className="py-20 bg-white border-y border-slate-200 relative z-10" aria-labelledby="austausch-heading">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <span className="eyebrow mb-4">Einzelne Fliesen austauschen</span>
                        <h2 id="austausch-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            So bleiben Abdichtung und Nachbarfliesen geschützt
                        </h2>
                    </div>
                    <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {REPLACE_STEPS.map((step, idx) => (
                            <li
                                key={step.t}
                                className="group p-7 rounded-3xl bg-slate-50 border border-slate-200 hover:bg-white hover:-translate-y-0.5 hover:border-emerald-500/80 transition-all duration-300"
                            >
                                <span className="font-display block text-4xl font-black tabular-nums text-emerald-600/25 group-hover:text-emerald-600/40 transition-colors mb-3" aria-hidden="true">
                                    {String(idx + 1).padStart(2, '0')}
                                </span>
                                <h3 className="text-base font-black text-slate-900 mb-2">{step.t}</h3>
                                <p className="text-sm text-slate-700 leading-relaxed">{step.d}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* Kein Ersatz mehr lieferbar */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10" aria-labelledby="ersatz-heading">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <span className="eyebrow eyebrow-sky mb-4">
                        <Palette className="w-3.5 h-3.5" />
                        Ersatzfliesen
                    </span>
                    <h2 id="ersatz-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                        Kein Ersatz mehr lieferbar?
                    </h2>
                    <p className="mt-3 text-base text-slate-700 leading-relaxed">
                        Fliesen werden in Chargen produziert; selbst dieselbe Serie kann nach Jahren in Farbton und Maß
                        leicht abweichen. Eine exakt passende Ersatzfliese lässt sich deshalb nicht immer beschaffen. Diese
                        Wege haben sich bewährt:
                    </p>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {NO_LONGER_AVAILABLE.map((item) => (
                        <li key={item.t} className="glass-surface p-7 rounded-[2rem]">
                            <h3 className="font-black text-base text-slate-900 mb-2">{item.t}</h3>
                            <p className="text-sm text-slate-700 leading-relaxed">{item.d}</p>
                        </li>
                    ))}
                </ul>
            </section>

            {/* Grenzen + Fugen/Schadensanalyse */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 relative z-10" aria-label="Grenzen der Reparatur">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    <div className="lg:col-span-3 p-8 rounded-[2rem] bg-slate-50 border border-slate-200">
                        <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5 text-amber-500" />
                            Wann eine Reparatur nicht mehr sinnvoll ist
                        </h2>
                        <ul className="space-y-3">
                            {NOT_WORTH_IT.map((item) => (
                                <li key={item} className="flex items-start gap-2 text-sm text-slate-700 leading-relaxed">
                                    <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="mt-4 text-sm text-slate-700 leading-relaxed">
                            Dann würde eine Reparatur nur das Symptom beheben. Sinnvoller ist eine Teil- oder
                            Komplettsanierung – wir sagen Ihnen offen, was sich lohnt.
                        </p>
                    </div>
                    <div className="lg:col-span-2 space-y-6">
                        <div className="p-7 rounded-[2rem] bg-sky-50 border border-sky-200 space-y-2">
                            <h2 className="text-lg font-black text-slate-900">Fugen und Silikon erneuern</h2>
                            <p className="text-sm text-slate-700 leading-relaxed">
                                Sitzen die Fliesen fest und nur die Fugen sind verschlissen, genügt oft eine Fugensanierung.
                            </p>
                            <Link href="/fliesen/fugensanierung" className="inline-flex items-center gap-1 text-sm font-bold text-emerald-800 hover:text-emerald-700">
                                Zur Fugensanierung
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                        <div className="p-7 rounded-[2rem] bg-sky-50 border border-sky-200 space-y-2">
                            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                                <ScanSearch className="w-5 h-5 text-emerald-600" />
                                Ursache unklar?
                            </h2>
                            <p className="text-sm text-slate-700 leading-relaxed">
                                Wenn Risse wiederkehren oder Feuchtigkeit im Spiel ist, klären wir zuerst die Ursache.
                            </p>
                            <Link href="/schadensanalyse" className="inline-flex items-center gap-1 text-sm font-bold text-emerald-800 hover:text-emerald-700">
                                Zur Schadensanalyse
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Review */}
            {review && (
                <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 relative z-10" aria-label="Kundenstimme">
                    <figure className="glass-surface rounded-[2rem] p-7 sm:p-10 text-center">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <span className="flex items-center gap-0.5 text-amber-500" aria-label={`${review.rating} von 5 Sternen`}>
                                {Array.from({ length: review.rating }, (_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-current" aria-hidden="true" />
                                ))}
                            </span>
                            <Quote className="w-6 h-6 text-emerald-600/40" aria-hidden="true" />
                        </div>
                        <blockquote className="text-base sm:text-lg text-slate-800 leading-relaxed">„{review.text}“</blockquote>
                        <figcaption className="mt-4 text-sm">
                            <span className="font-bold text-slate-900">{review.author}</span>
                            <span className="text-slate-600"> &middot; {review.source}-Rezension &middot; {review.topic}</span>
                        </figcaption>
                    </figure>
                </section>
            )}

            {/* Reparatur anfragen */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 relative z-10" aria-labelledby="anfragen-heading">
                <div className="ceramic-hero rounded-[3rem] p-8 sm:p-12 space-y-5">
                    <span className="eyebrow">
                        <Camera className="w-3.5 h-3.5" />
                        Reparatur anfragen
                    </span>
                    <h2 id="anfragen-heading" className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                        Fotos per WhatsApp senden
                    </h2>
                    <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                        Mit ein paar Fotos können wir den Aufwand besser einschätzen. Hilfreich sind:
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                            'eine Nahaufnahme des Schadens',
                            'ein Übersichtsfoto des Raums bzw. der Fläche',
                            'Format der Fliese (z. B. mit Zollstock im Bild)',
                            'ob noch Restfliesen vorhanden sind'
                        ].map((item) => (
                            <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="text-sm text-slate-700 flex items-start gap-2">
                        <Clock className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>
                            Erreichbar {COMPANY_DATA.hours.formattedWeekdays} und {COMPANY_DATA.hours.formattedSaturday}.
                            Den Termin stimmen wir persönlich mit Ihnen ab.
                        </span>
                    </p>
                    <div className="flex flex-wrap gap-3.5 pt-2">
                        <a
                            href={COMPANY_DATA.contact.whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="glass-button-whatsapp px-7 py-3.5 text-xs"
                        >
                            <MessageCircle className="w-4 h-4" />
                            WhatsApp: {COMPANY_DATA.contact.whatsapp}
                        </a>
                        <Link href="/kontakt" className="btn-ghost px-7 py-3.5 text-xs">
                            Kontaktformular
                        </Link>
                    </div>
                </div>
            </section>

            {/* Weiterlesen */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 relative z-10" aria-labelledby="reparatur-weiterlesen-heading">
                <h2 id="reparatur-weiterlesen-heading" className="text-2xl font-black text-slate-900 tracking-tight mb-6">
                    Weiterlesen
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {WEITERLESEN.map((link) => (
                        <li key={link.path}>
                            <Link
                                href={link.path}
                                className="group glass-surface rounded-2xl p-5 h-full block hover:-translate-y-0.5 hover:border-emerald-500/80 transition-all duration-300"
                            >
                                <span className="font-black text-slate-900 group-hover:text-emerald-800 transition-colors flex items-center gap-1">
                                    {link.title}
                                    <ArrowRight className="w-4 h-4" />
                                </span>
                                <span className="block mt-1 text-sm text-slate-700">{link.desc}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>

            <QualityPromise />
        </div>
    );
}
