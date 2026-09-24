import React from 'react';
import Link from 'next/link';
import {
    ArrowRight,
    ClipboardList,
    Layers,
    MessageCircle,
    Ruler,
    Send,
    Sparkles,
    CalendarCheck,
    FileText
} from 'lucide-react';
import FliesenKonfigurator from '@/components/funnels/FliesenKonfigurator';
import QualityPromise from '@/components/sections/QualityPromise';
import { COMPANY_DATA } from '@/config/company';
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
    title: 'Fliesen-Konfigurator & Bedarfsrechner',
    description:
        'Raum, Untergrund, Format und Fläche wählen: Der Konfigurator ermittelt den Materialbedarf inkl. Verschnitt als Richtwert und sendet Ihre Anfrage per WhatsApp.',
    path: '/fliesen/konfigurator'
});

const STEP_CARDS = [
    {
        icon: Layers,
        title: 'Schritt 1: Raum und Einsatzbereich',
        text: 'Wohn- und Essbereich, Küche, Flur, Treppe, Balkon/Terrasse oder ein reines Untergrundprojekt – auch mehrere Bereiche gleichzeitig. Für Bäder verweisen wir auf Badplaner und Budgetkalkulator.'
    },
    {
        icon: ClipboardList,
        title: 'Schritt 2: Untergrund und Bestand',
        text: 'Neuer Estrich, Heizestrich, alte Fliesen, Holz oder Betonplatte? Dazu Fußbodenheizung, Rückbau und Nassbereich. Wer es nicht weiß, wählt „unbekannt“.'
    },
    {
        icon: Ruler,
        title: 'Schritt 3: Format, Material, Muster und Menge',
        text: 'Vom Standardformat bis XXL, Holzoptik oder Naturstein, Kreuzfuge bis Fischgrät. Flächen geben Sie in m² an, Treppen über Stufenanzahl und Stufenmaße.'
    },
    {
        icon: Send,
        title: 'Schritt 4: Kontakt und Versand',
        text: 'Sie sehen eine Zusammenfassung mit Materialbedarf und Vorab-Checkliste und senden sie per WhatsApp oder E-Mail – ohne Speicherung auf dieser Website.'
    }
];

const WASTE_ROWS = [
    { pattern: 'Kreuzfuge', value: 'ca. 5–10 %', note: 'Einfache Schnitte an Wänden und Türen' },
    { pattern: 'Halb- / Drittelverband', value: 'ca. 5–10 %', note: 'Reststücke lassen sich oft am Reihenende weiterverwenden' },
    { pattern: 'Wilder Verband', value: 'ca. 5–10 %', note: 'Abhängig von Dielenlängen und Raumform' },
    { pattern: 'Diagonal', value: 'ca. 10–15 %', note: 'Viele Dreiecksschnitte an allen Rändern' },
    { pattern: 'Fischgrät', value: 'ca. 10–15 %', note: 'Schräge Randschnitte über die ganze Fläche' }
];

const FAQS = [
    {
        q: 'Wie genau ist der berechnete Materialbedarf?',
        a: 'Es ist ein Richtwert zur Orientierung: Nettofläche plus ein typischer Verschnittzuschlag für das gewählte Verlegemuster. Raumform, Anzahl der Ecken, Türen und Vorsprünge, das Fliesenformat und die Fugenplanung verändern den tatsächlichen Bedarf. Die verbindliche Menge wird beim Vor-Ort-Aufmaß ermittelt.'
    },
    {
        q: 'Warum nennt der Konfigurator keinen Preis?',
        a: 'Der Aufwand hängt vor allem vom Untergrund, vom Format und von den Details wie Sockeln, Kanten oder Abdichtung ab. Das lässt sich seriös erst vor Ort beurteilen. Deshalb erhalten Sie nach dem kostenfreien Aufmaß eine verbindliche Festpreis-Kalkulation statt einer Schätzung aus dem Internet.'
    },
    {
        q: 'Wie zähle ich Setzstufen und Trittstufen richtig?',
        a: 'Zählen Sie die Steigungen, also die Höhensprünge von unten nach oben. Eine Treppe mit n Steigungen hat n Setzstufen und in der Regel n − 1 Trittstufen, weil der oberste Auftritt meist schon der Boden des oberen Geschosses ist. Die Auftrittstiefe messen Sie einschließlich Überstand der Stufenvorderkante.'
    },
    {
        q: 'Was ist mit Blockstufen?',
        a: 'Blockstufen sind keine Belagsart, sondern eine eigene Bauweise: massive Stufen, meist aus Naturstein oder Betonwerkstein, die vor allem außen auf Fundament bzw. Mörtelbett versetzt werden. Sie werden stückweise nach Maß geplant, deshalb zeigt der Konfigurator dafür keine Quadratmeter an.'
    },
    {
        q: 'Werden meine Daten gespeichert?',
        a: 'Nein, nicht auf dieser Website. Der Konfigurator öffnet lediglich WhatsApp oder Ihr E-Mail-Programm mit einer vorbereiteten Nachricht. Erst wenn Sie diese dort absenden, erreicht uns Ihre Anfrage.'
    },
    {
        q: 'Ich plane ein Bad – kann ich den Konfigurator trotzdem nutzen?',
        a: 'Für Bad, Dusche und Gäste-WC sind der Badplaner und der Budgetkalkulator die passenderen Werkzeuge. Ist das Bad Teil eines größeren Projekts, können Sie es im Konfigurator zusätzlich angeben.'
    }
];

const NEXT_STEPS = [
    {
        icon: MessageCircle,
        title: 'Anfrage absenden',
        text: 'Sie schicken die vorbereitete Zusammenfassung per WhatsApp oder E-Mail ab – gern mit Fotos vom Raum, vom Untergrund oder von der Treppe.'
    },
    {
        icon: CalendarCheck,
        title: 'Kostenfreies Vor-Ort-Aufmaß',
        text: `${COMPANY_DATA.owner.fullName} sieht sich die Flächen persönlich an, misst auf und prüft Untergrund, Ebenheit und Anschlüsse.`
    },
    {
        icon: FileText,
        title: 'Verbindliches Festpreisangebot',
        text: 'Auf Basis des Aufmaßes erhalten Sie eine verbindliche Festpreis-Kalkulation mit den tatsächlich benötigten Mengen.'
    }
];

const RELATED_LINKS = [
    { href: '/bad/badplaner', title: 'Badplaner', desc: 'Bad, Dusche und Gäste-WC planen' },
    { href: '/bad/budgetkalkulator', title: 'Budgetkalkulator', desc: 'Orientierung für Ihr Badprojekt' },
    { href: '/fliesen/verlegemuster', title: 'Verlegemuster & Abschlüsse', desc: 'Fugenbild, Verband, Kanten und Sockel' },
    { href: '/beratung', title: 'Beratung', desc: 'Persönlich klären, was zu Ihrem Projekt passt' }
];

export default function FliesenKonfiguratorPage() {
    return (
        <div className="pt-32 pb-20 min-h-screen relative overflow-hidden">
            <div className="ambient-glow-mint -top-24 -left-32 opacity-60" aria-hidden="true" />
            <div className="ambient-glow-sky top-1/3 -right-40 opacity-50" aria-hidden="true" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 relative">
                {/* Hero */}
                <section className="ceramic-hero rounded-[3rem] p-8 sm:p-12 text-center space-y-4 relative overflow-hidden">
                    <span className="eyebrow">
                        <Sparkles className="w-3.5 h-3.5" />
                        Fliesen-Konfigurator
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                        Fliesen-Konfigurator: Ihr Fliesenprojekt in{' '}
                        <span className="text-ceramic-gradient">4 Schritten</span> vorbereiten
                    </h1>
                    <p className="text-sm sm:text-base text-slate-700 max-w-3xl mx-auto leading-relaxed">
                        Wählen Sie Raum, Untergrund, Format und Fläche. Der Konfigurator fasst Ihr Vorhaben zusammen, ermittelt den
                        Materialbedarf inklusive Verschnitt als Richtwert und nennt die Punkte, die wir vorab prüfen. Die Anfrage
                        senden Sie direkt per WhatsApp oder E-Mail – ohne Preise, ohne Verpflichtung.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
                        <a href="#konfigurator" className="btn-primary px-7 py-3.5 text-xs">
                            Konfigurator starten
                            <ArrowRight className="w-4 h-4" />
                        </a>
                        <Link href="/kontakt" className="btn-ghost px-7 py-3.5 text-xs">
                            Direkt Aufmaß anfragen
                        </Link>
                    </div>
                    <p className="text-xs text-slate-600 pt-2">
                        Sie planen ein Bad?{' '}
                        <Link href="/bad/badplaner" className="text-emerald-800 hover:text-emerald-700 hover:underline underline-offset-2 font-bold">
                            Zum Badplaner
                        </Link>{' '}
                        oder zum{' '}
                        <Link href="/bad/budgetkalkulator" className="text-emerald-800 hover:text-emerald-700 hover:underline underline-offset-2 font-bold">
                            Budgetkalkulator
                        </Link>
                        .
                    </p>
                </section>

                {/* Explanation */}
                <section aria-labelledby="ablauf-heading" className="space-y-8">
                    <div className="text-center max-w-3xl mx-auto space-y-3">
                        <span className="eyebrow eyebrow-sky">So funktioniert es</span>
                        <h2 id="ablauf-heading" className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            Vier Schritte bis zur strukturierten Anfrage
                        </h2>
                        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                            Der Konfigurator ist für Fliesenprojekte außerhalb der Badsanierung gedacht: Wohnräume, Küche, Flur, Treppen,
                            Balkon und Terrasse sowie Untergrundarbeiten.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {STEP_CARDS.map((card) => {
                            const Icon = card.icon;
                            return (
                                <div
                                    key={card.title}
                                    className="group glass-surface rounded-3xl p-6 space-y-3 border border-slate-200 hover:-translate-y-0.5 hover:border-emerald-500/80 transition-all duration-300"
                                >
                                    <span className="icon-chip w-11 h-11 rounded-2xl">
                                        <Icon className="w-5 h-5" />
                                    </span>
                                    <h3 className="text-base font-black text-slate-900">{card.title}</h3>
                                    <p className="text-sm text-slate-700 leading-relaxed">{card.text}</p>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Tool */}
                <section id="konfigurator" aria-label="Fliesen-Konfigurator" className="scroll-mt-32">
                    <FliesenKonfigurator />
                </section>

                {/* Calculation method */}
                <section aria-labelledby="rechnung-heading" className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    <div className="space-y-4">
                        <span className="eyebrow">Berechnung</span>
                        <h2 id="rechnung-heading" className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                            So rechnet der Konfigurator: Fläche, Muster, Verschnitt
                        </h2>
                        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                            Grundlage ist die Nettofläche, die Sie in m² angeben. Darauf schlägt der Konfigurator einen typischen
                            Verschnitt für das gewählte Verlegemuster auf und zeigt das Ergebnis als Spanne. Sockel in laufenden Metern
                            werden getrennt ausgewiesen.
                        </p>
                        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                            Die Werte sind Richtwerte zur Orientierung. Kleine oder verwinkelte Räume, große Formate und aufwendige
                            Fugenbilder können mehr Verschnitt erzeugen. Die tatsächlich benötigte Menge legen wir beim kostenfreien
                            Vor-Ort-Aufmaß fest.
                        </p>
                    </div>
                    <div className="glass-surface rounded-3xl border border-slate-200 overflow-hidden">
                        <table className="w-full text-sm text-left">
                            <caption className="sr-only">Verschnitt-Richtwerte je Verlegemuster</caption>
                            <thead className="bg-slate-100 text-slate-900">
                                <tr>
                                    <th scope="col" className="px-4 py-3 font-black border-b border-slate-200">Verlegemuster</th>
                                    <th scope="col" className="px-4 py-3 font-black border-b border-slate-200">Verschnitt (Richtwert)</th>
                                    <th scope="col" className="px-4 py-3 font-black border-b border-slate-200 hidden sm:table-cell">Warum</th>
                                </tr>
                            </thead>
                            <tbody>
                                {WASTE_ROWS.map((row) => (
                                    <tr key={row.pattern} className="border-b border-slate-200 last:border-b-0">
                                        <th scope="row" className="px-4 py-3 font-bold text-slate-900">{row.pattern}</th>
                                        <td className="px-4 py-3 text-slate-700 tabular-nums">{row.value}</td>
                                        <td className="px-4 py-3 text-slate-700 hidden sm:table-cell">{row.note}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Stairs */}
                <section aria-labelledby="treppen-heading" className="glass-surface rounded-[2rem] p-6 sm:p-10 border border-slate-200 space-y-4">
                    <h2 id="treppen-heading" className="text-xl sm:text-2xl font-black text-slate-900">
                        Bei Treppen nur die Nettofläche
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-sm text-slate-700 leading-relaxed">
                        <p>
                            <strong className="text-slate-900">Zählweise:</strong> Eine Treppe mit n Steigungen hat n Setzstufen und in
                            der Regel n − 1 Trittstufen. Die Trittstufenfläche ergibt sich aus Laufbreite × Auftrittstiefe inklusive
                            Überstand, die Setzstufenfläche aus Laufbreite × Steigungshöhe.
                        </p>
                        <p>
                            <strong className="text-slate-900">Ohne Verschnittzuschlag:</strong> Bei Stufen hängt der Verschnitt stark
                            vom Format und vom Stufenmaß ab. Ein pauschaler Prozentsatz wäre irreführend, deshalb zeigt der Konfigurator
                            nur die Nettofläche.
                        </p>
                        <p>
                            <strong className="text-slate-900">Keine Menge</strong> gibt es bei gewendelten Treppen, bei Blockstufen
                            (eine massive Bauart, kein Belag) und bei unvollständigen Maßen. Treppensockel und Kantenausbildung werden
                            beim Aufmaß festgelegt. Mehr dazu unter{' '}
                            <Link href="/treppen" className="text-emerald-800 hover:text-emerald-700 underline underline-offset-2 font-bold">
                                Treppen neu belegen
                            </Link>
                            .
                        </p>
                    </div>
                </section>

                {/* Next steps */}
                <section aria-labelledby="weiter-heading" className="space-y-8">
                    <div className="text-center max-w-3xl mx-auto space-y-3">
                        <span className="eyebrow">Nach der Anfrage</span>
                        <h2 id="weiter-heading" className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            Wie es weitergeht: Aufmaß und Festpreisangebot
                        </h2>
                    </div>
                    <ol className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {NEXT_STEPS.map((item, idx) => {
                            const Icon = item.icon;
                            return (
                                <li key={item.title} className="glass-surface rounded-3xl p-6 border border-slate-200 space-y-3">
                                    <div className="flex items-center gap-3">
                                        <span className="icon-chip w-11 h-11 rounded-2xl">
                                            <Icon className="w-5 h-5" />
                                        </span>
                                        <span className="text-xs font-black text-slate-600 tabular-nums">0{idx + 1}</span>
                                    </div>
                                    <h3 className="text-base font-black text-slate-900">{item.title}</h3>
                                    <p className="text-sm text-slate-700 leading-relaxed">{item.text}</p>
                                </li>
                            );
                        })}
                    </ol>
                </section>

                {/* FAQ */}
                <section aria-labelledby="faq-heading" className="max-w-4xl mx-auto space-y-6">
                    <div className="text-center space-y-3">
                        <span className="eyebrow eyebrow-neutral">FAQ</span>
                        <h2 id="faq-heading" className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                            Häufige Fragen zum Konfigurator
                        </h2>
                    </div>
                    <div className="space-y-3">
                        {FAQS.map((faq) => (
                            <details
                                key={faq.q}
                                className="group glass-surface rounded-2xl border border-slate-200 p-5 open:border-emerald-500/80 transition-all duration-300"
                            >
                                <summary className="cursor-pointer list-none flex items-center justify-between gap-4 font-bold text-slate-900">
                                    {faq.q}
                                    <ArrowRight className="w-4 h-4 text-emerald-600 shrink-0 transition-transform duration-300 group-open:rotate-90" aria-hidden="true" />
                                </summary>
                                <p className="mt-3 text-sm text-slate-700 leading-relaxed">{faq.a}</p>
                            </details>
                        ))}
                    </div>
                </section>

                {/* Weiterlesen */}
                <section aria-labelledby="weiterlesen-heading" className="space-y-6">
                    <h2 id="weiterlesen-heading" className="text-xl sm:text-2xl font-black text-slate-900">Weiterlesen</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {RELATED_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="group glass-surface rounded-2xl p-5 border border-slate-200 hover:-translate-y-0.5 hover:border-emerald-500/80 hover:shadow-[0_20px_40px_-12px_rgba(15,23,42,0.14)] transition-all duration-300"
                            >
                                <span className="flex items-center justify-between gap-2 font-black text-slate-900 group-hover:text-emerald-800 transition-colors">
                                    {link.title}
                                    <ArrowRight className="w-4 h-4 text-emerald-600" aria-hidden="true" />
                                </span>
                                <span className="block mt-1 text-sm text-slate-700">{link.desc}</span>
                            </Link>
                        ))}
                    </div>
                    <p className="text-sm text-slate-700">
                        Lieber direkt sprechen?{' '}
                        <Link href="/kontakt" className="text-emerald-800 hover:text-emerald-700 hover:underline underline-offset-2 font-bold">
                            Zur Kontaktseite
                        </Link>{' '}
                        oder telefonisch unter{' '}
                        <a
                            href={`tel:${COMPANY_DATA.contact.phoneLink}`}
                            className="text-emerald-800 hover:text-emerald-700 hover:underline underline-offset-2 font-bold tabular-nums"
                        >
                            {COMPANY_DATA.contact.phone}
                        </a>
                        .
                    </p>
                </section>
            </div>

            <QualityPromise />
        </div>
    );
}
