import React from 'react';
import Link from 'next/link';
import {
    ScanSearch,
    ArrowRight,
    Phone,
    ClipboardList,
    Search,
    FileText,
    Hammer,
    CheckCircle2,
    Grid,
    Droplets,
    Trees,
    ShieldCheck,
    Sparkles,
    HelpCircle,
    Users,
    Gauge,
    Ruler
} from 'lucide-react';
import { COMPANY_DATA } from '@/config/company';
import { buildGraph, buildServiceNode, buildFaqNode, buildBreadcrumbNode, buildWebPageNode, SITE_URL } from '@/lib/schema';
import JsonLd from '@/components/seo/JsonLd';

const PAGE_PATH = '/schadensanalyse';
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

const HIGHLIGHTS = [
    { icon: Search, title: 'Kostenfrei', desc: 'Teil des Vor-Ort-Aufmaßes' },
    { icon: FileText, title: 'Festpreisangebot', desc: 'für die vorgeschlagene Lösung' },
    { icon: Sparkles, title: 'Staubschutz', desc: 'bei der späteren Ausführung' }
];

const DAMAGE_PATTERNS = [
    { title: 'Gerissene Fliesen', desc: 'Einzelne Sprünge nach einem Stoß oder durchlaufende Risse über mehrere Fliesen – letztere deuten fast immer auf Bewegungen im Untergrund oder fehlende Bewegungsfugen hin.' },
    { title: 'Hohlstellen und lose Fliesen', desc: 'Hohl klingende Fliesen haben keinen vollflächigen Verbund. Unter Last oder bei Temperaturwechsel brechen Kanten, später lösen sich ganze Fliesen.' },
    { title: 'Bröselnde oder dunkle Fugen', desc: 'Ausgewaschene Zementfugen, dauerhaft dunkle oder feuchte Fugen und abgelöste Silikonfugen sind Einfallstore für Wasser.' },
    { title: 'Ausblühungen und Verfärbungen', desc: 'Weiße Kalkschleier oder Ränder zeigen, dass Wasser durch Fugen, Mörtelbett oder Untergrund wandert – typisch auf Balkonen, Terrassen und Außentreppen.' },
    { title: 'Feuchte Wände neben der Dusche', desc: 'Abplatzender Putz, Flecken oder muffiger Geruch in angrenzenden Räumen können auf eine undichte Abdichtung oder undichte Anschlüsse hinweisen.' },
    { title: 'Abgeplatzte Kanten', desc: 'Beschädigte Stufen- und Außenkanten, oft an Treppen oder an Übergängen ohne Profil, wo die Fliesenkante ungeschützt belastet wird.' }
];

const STEPS = [
    { icon: ClipboardList, title: 'Bestandsaufnahme', desc: 'Wir sehen uns das Schadensbild an, fragen nach Alter des Belags, früheren Reparaturen und wann der Schaden aufgefallen ist.' },
    { icon: Search, title: 'Ursachenanalyse', desc: 'Klopfprobe, Rissverlauf, Fugen, Anschlüsse und Untergrund werden geprüft; bei Bedarf messen wir die Restfeuchte.' },
    { icon: FileText, title: 'Sanierungsvorschlag', desc: 'Sie erfahren, was die Ursache ist, welche Lösung sinnvoll ist – und wo eine Reparatur an ihre Grenzen kommt. Danach erhalten Sie ein Festpreisangebot.' },
    { icon: Hammer, title: 'Umsetzung', desc: 'Reparatur, Fugenerneuerung oder Neuverlegung durch unseren HWK-Fachbetrieb – mit Staubschutz und sauber abgegrenztem Arbeitsbereich.' }
];

const CHECKS = [
    { icon: Hammer, title: 'Klopfprobe', desc: 'Mit einem Prüfhammer oder Metallstab abgeklopft, verraten hohle Fliesen sich durch ihren Klang. So lässt sich die Fläche der Hohlstellen eingrenzen.' },
    { icon: Gauge, title: 'Restfeuchte', desc: 'Wo es auf die Feuchte im Untergrund ankommt, etwa bei Estrich vor einer Neuverlegung, messen wir die Restfeuchte und vergleichen sie mit den Richtwerten aus Merkblättern und Herstellerangaben.' },
    { icon: Ruler, title: 'Untergrund und Risse', desc: 'Verlauf und Breite von Rissen, Lage von Bewegungs- und Randfugen, Ebenheit und Gefälle geben Hinweise darauf, ob der Schaden aus dem Untergrund kommt.' },
    { icon: ShieldCheck, title: 'Abdichtung und Anschlüsse', desc: 'Im Nassbereich prüfen wir Silikonfugen, Übergänge an Wanne, Duschtasse und Durchdringungen. Ob unter den Fliesen eine intakte Verbundabdichtung liegt, lässt sich oft erst nach dem Öffnen einer Stelle sicher sagen.' }
];

const TOPICS = [
    {
        icon: Grid,
        title: 'Fliesen & Fugen',
        items: ['Einzelne gesprungene oder lose Fliesen', 'Hohlstellen in Boden und Wand', 'Ausgewaschene Zementfugen', 'Gerissene oder verfärbte Silikonfugen']
    },
    {
        icon: Droplets,
        title: 'Feuchte & Abdichtung',
        items: ['Feuchte Fugen im Duschbereich', 'Feuchteflecken an angrenzenden Wänden', 'Anschlüsse an Wanne, Duschtasse und Ablauf', 'Abdichtung nach DIN 18534 bei Erneuerung']
    },
    {
        icon: Trees,
        title: 'Balkon & Außenbereich',
        items: ['Frostabplatzungen und lose Platten', 'Ausblühungen an Belag und Stirnseite', 'Stehendes Wasser durch fehlendes Gefälle', 'Schäden an Außentreppen und Eingangspodesten']
    }
];

const OPTIONS = [
    { title: 'Reparieren', desc: 'Sinnvoll, wenn der Schaden örtlich begrenzt ist und die Ursache feststeht – etwa eine Fliese nach einem Stoß oder eine lose Sockelfliese.', link: { href: '/fliesenreparatur', label: 'Zur Fliesenreparatur' } },
    { title: 'Fugen erneuern', desc: 'Sinnvoll, wenn Fliesen fest sitzen, Zement- oder Silikonfugen aber ausgewaschen, rissig oder verfärbt sind.', link: { href: '/fliesen/fugensanierung', label: 'Zur Fugensanierung' } },
    { title: 'Neu verlegen', desc: 'Nötig, wenn Hohlstellen großflächig sind, der Untergrund sich bewegt oder die Abdichtung darunter versagt hat. Dann wird der Aufbau von Grund auf erneuert.', link: { href: '/bad/badsanierung', label: 'Zur Badsanierung' } }
];

const OTHER_EXPERTS = [
    'Undichte Leitungen, Abläufe oder Armaturen: Installateur bzw. ein Fachbetrieb für Leckortung – danach übernehmen wir Fliesen und Abdichtung.',
    'Durchfeuchtete Wände oder Estriche: Trocknung durch einen Fachbetrieb für Bautrocknung, bevor neu belegt wird.',
    'Großflächiger Schimmelbefall: Fachbetrieb für Schimmelsanierung. Hinweise zur Vorbeugung finden Sie in unserem Ratgeber.',
    'Risse im Tragwerk oder Setzungen: Tragwerksplaner bzw. Statiker.',
    'Streitfälle, Gewährleistungs- oder Versicherungsfragen: ein öffentlich bestellter und vereidigter Sachverständiger. Wir erstellen keine Gutachten.'
];

const schadensFaqs = [
    {
        question: 'Was kostet die Schadensanalyse?',
        answer: 'Die Begutachtung von Schäden ist Teil unseres kostenfreien Vor-Ort-Aufmaßes. Sie erhalten danach eine Einschätzung der Ursache und – wenn Sie möchten – ein Festpreisangebot für die Lösung.'
    },
    {
        question: 'Erstellen Sie ein Gutachten für Versicherung oder Gericht?',
        answer: 'Nein. Wir sind ein eingetragener HWK-Fachbetrieb für Fliesen-, Platten- und Mosaikarbeiten, keine Sachverständigen. Wir beurteilen den Schaden aus handwerklicher Sicht und schlagen eine Lösung vor. Für Gutachten wenden Sie sich an einen öffentlich bestellten und vereidigten Sachverständigen.'
    },
    {
        question: 'Finden Sie auch ein Leck in der Wasserleitung?',
        answer: 'Die Ortung verdeckter Leitungsschäden übernehmen Installateure oder spezialisierte Leckortungsfirmen. Sobald die Ursache behoben und der Untergrund trocken ist, erneuern wir Fliesen und Abdichtung.'
    },
    {
        question: 'Muss bei einem Schaden immer die ganze Fläche erneuert werden?',
        answer: 'Nein. Ist der Schaden örtlich begrenzt und die Ursache geklärt, genügt oft eine Reparatur oder die Erneuerung der Fugen. Eine Neuverlegung empfehlen wir erst, wenn Untergrund, Verbund oder Abdichtung großflächig geschädigt sind.'
    },
    {
        question: 'Wie kann ich den Termin vorbereiten?',
        answer: 'Hilfreich sind Fotos vom Schaden, Angaben zum Alter des Belags, eventuell vorhandene Restfliesen und Informationen zu früheren Reparaturen. Fotos können Sie vorab per WhatsApp senden.'
    }
];

const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Schadensanalyse', path: PAGE_PATH }
];

const schadensGraph = buildGraph([
    buildWebPageNode({
        url: PAGE_URL,
        name: 'Schadensanalyse für Fliesen, Fugen und Abdichtung',
        description:
            'Ursachen von gerissenen Fliesen, Hohlstellen, feuchten Fugen und Ausblühungen vor Ort klären – als Teil des kostenfreien Vor-Ort-Aufmaßes.',
        breadcrumbItems: breadcrumbs
    }),
    buildBreadcrumbNode(breadcrumbs, PAGE_URL),
    buildServiceNode({
        name: 'Schadensanalyse Fliesen & Abdichtung',
        serviceType: 'Begutachtung von Fliesenschäden vor Ort',
        description:
            'Bestandsaufnahme, Klopfprobe, Restfeuchtemessung und Prüfung von Untergrund, Fugen und Anschlüssen mit anschließendem Sanierungsvorschlag.',
        url: PAGE_URL,
        offers: [
            { name: 'Bestandsaufnahme', description: 'Schadensbild und Vorgeschichte aufnehmen' },
            { name: 'Ursachenanalyse', description: 'Klopfprobe, Restfeuchte, Untergrund und Anschlüsse prüfen' },
            { name: 'Sanierungsvorschlag', description: 'Reparatur, Fugenerneuerung oder Neuverlegung' }
        ]
    }),
    buildFaqNode(schadensFaqs, PAGE_URL)
]);

const WEITERLESEN = [
    { title: 'Undichte Dusche erkennen', path: '/blog/undichte-dusche-warnzeichen', desc: 'Warnzeichen für Feuchte hinter Fliesen' },
    { title: 'Schimmel in Fugen vermeiden', path: '/blog/schimmel-fliesenfugen-vermeiden', desc: 'Lüften, Pflege und Silikonfugen' },
    { title: 'Untergrund & Abdichtung', path: '/leistungen/untergrund', desc: 'Tragfähig, eben, trocken, dicht' },
    { title: 'Außenbereiche', path: '/leistungen/aussen', desc: 'Balkon, Terrasse und Eingang' }
];

export default function SchadensanalysePage() {
    return (
        <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
            <JsonLd schema={schadensGraph} />
            <div className="ambient-glow-orange -top-32 -left-32 opacity-70" />
            <div className="ambient-glow-warm top-96 -right-24 opacity-60" />

            {/* Hero */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 relative z-10" aria-labelledby="schadensanalyse-heading">
                <div className="ceramic-hero rounded-tile-2xl p-8 sm:p-12 text-center space-y-4 relative overflow-hidden">
                    <span className="eyebrow eyebrow-orange">
                        <ScanSearch className="w-3.5 h-3.5 text-orange-600" />
                        Service &middot; Ursachen vor Ort klären
                    </span>
                    <h1 id="schadensanalyse-heading" className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                        Schadensanalyse für{' '}
                        <span className="text-ceramic-gradient">Fliesen, Fugen und Abdichtung</span>
                    </h1>
                    <p className="text-sm sm:text-base text-slate-700 max-w-3xl mx-auto leading-relaxed">
                        Eine gesprungene Fliese lässt sich tauschen – doch wenn die Ursache im Untergrund oder in der
                        Abdichtung liegt, kehrt der Schaden zurück. Deshalb klärt {COMPANY_DATA.owner.fullName},
                        Fachbetriebsinhaber, beim Vor-Ort-Termin zuerst, woher ein Schaden kommt, und schlägt dann die
                        passende Lösung vor.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
                        <Link href="/kontakt" className="btn-primary px-7 py-3.5 text-xs group">
                            Vor-Ort-Termin anfragen
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                        <a
                            href={COMPANY_DATA.contact.whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="glass-button-whatsapp px-7 py-3.5 text-xs"
                        >
                            Fotos per WhatsApp senden
                        </a>
                    </div>
                </div>
            </section>

            {/* Highlight band */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10" aria-label="Leistungsmerkmale">
                <ul className="glass-surface rounded-tile-2xl p-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {HIGHLIGHTS.map((item) => {
                        const Icon = item.icon;
                        return (
                            <li key={item.title} className="flex items-center gap-4">
                                <span className="icon-chip w-11 h-11 shrink-0 text-orange-600">
                                    <Icon className="w-5 h-5" />
                                </span>
                                <span>
                                    <span className="block font-black text-slate-900">{item.title}</span>
                                    <span className="block text-sm text-slate-600">{item.desc}</span>
                                </span>
                            </li>
                        );
                    })}
                </ul>
            </section>

            {/* Schadensbilder */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10" aria-labelledby="schadensbilder-heading">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <span className="eyebrow eyebrow-orange mb-4">Schadensbilder</span>
                    <h2 id="schadensbilder-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                        Typische Schäden an Fliesen und Fugen
                    </h2>
                    <p className="mt-3 text-base text-slate-700 leading-relaxed">
                        Welche Anzeichen im Bad auf Feuchtigkeit hinter den Fliesen hindeuten, beschreibt unser Beitrag{' '}
                        <Link href="/blog/undichte-dusche-warnzeichen" className="font-bold text-orange-700 hover:text-orange-600 hover:underline underline-offset-2">
                            Undichte Dusche: Warnzeichen
                        </Link>
                        . Hier geht es darum, was hinter dem jeweiligen Schadensbild stecken kann.
                    </p>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {DAMAGE_PATTERNS.map((item) => (
                        <li
                            key={item.title}
                            className="group glass-surface p-7 rounded-tile-xl hover:-translate-y-0.5 hover:border-orange-500/80 hover:shadow-[0_20px_40px_-12px_rgba(15,23,42,0.14)] transition-all duration-300"
                        >
                            <h3 className="font-black text-base text-slate-900 mb-2 group-hover:text-orange-700 transition-colors">{item.title}</h3>
                            <p className="text-sm text-slate-700 leading-relaxed">{item.desc}</p>
                        </li>
                    ))}
                </ul>
            </section>

            {/* Ablauf */}
            <section className="py-20 bg-white border-y border-slate-200 relative z-10" aria-labelledby="ablauf-heading">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <span className="eyebrow eyebrow-orange mb-4">Ablauf</span>
                        <h2 id="ablauf-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            In 4 Schritten von der Ursache zur Lösung
                        </h2>
                    </div>
                    <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {STEPS.map((step, idx) => {
                            const Icon = step.icon;
                            return (
                                <li
                                    key={step.title}
                                    className="group p-7 rounded-tile-xl bg-slate-50 border border-slate-200 hover:bg-white hover:-translate-y-0.5 hover:border-orange-500/80 transition-all duration-300"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="icon-chip w-11 h-11 text-orange-600">
                                            <Icon className="w-5 h-5" />
                                        </span>
                                        <span className="font-display text-4xl font-black tabular-nums text-orange-500/30" aria-hidden="true">
                                            {String(idx + 1).padStart(2, '0')}
                                        </span>
                                    </div>
                                    <h3 className="text-base font-black text-slate-900 mb-2">{step.title}</h3>
                                    <p className="text-sm text-slate-700 leading-relaxed">{step.desc}</p>
                                </li>
                            );
                        })}
                    </ol>
                </div>
            </section>

            {/* Was vor Ort geprüft wird */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10" aria-labelledby="pruefung-heading">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <span className="eyebrow eyebrow-orange mb-4">Prüfung vor Ort</span>
                    <h2 id="pruefung-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                        Was vor Ort geprüft wird
                    </h2>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {CHECKS.map((item) => {
                        const Icon = item.icon;
                        return (
                            <li key={item.title} className="glass-surface p-7 rounded-tile-2xl">
                                <span className="icon-chip w-11 h-11 mb-4 text-orange-600">
                                    <Icon className="w-5 h-5" />
                                </span>
                                <h3 className="font-black text-base text-slate-900 mb-2">{item.title}</h3>
                                <p className="text-sm text-slate-700 leading-relaxed">{item.desc}</p>
                            </li>
                        );
                    })}
                </ul>
            </section>

            {/* Themen */}
            <section className="py-20 bg-white border-y border-slate-200 relative z-10" aria-labelledby="themen-heading">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <span className="eyebrow eyebrow-orange mb-4">Schwerpunkte</span>
                        <h2 id="themen-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            Wo wir Schäden begutachten
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {TOPICS.map((topic) => {
                            const Icon = topic.icon;
                            return (
                                <div key={topic.title} className="p-7 rounded-tile-xl bg-slate-50 border border-slate-200">
                                    <span className="icon-chip w-12 h-12 mb-5 text-orange-600">
                                        <Icon className="w-6 h-6" />
                                    </span>
                                    <h3 className="text-lg font-black text-slate-900 mb-4">{topic.title}</h3>
                                    <ul className="space-y-3">
                                        {topic.items.map((item) => (
                                            <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
                                                <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Reparieren, Fugen oder neu */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10" aria-labelledby="loesung-heading">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <span className="eyebrow eyebrow-orange mb-4">Die passende Lösung</span>
                    <h2 id="loesung-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                        Reparieren, Fugen erneuern oder neu verlegen?
                    </h2>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {OPTIONS.map((option) => (
                        <li key={option.title} className="glass-surface p-7 rounded-tile-2xl flex flex-col">
                            <h3 className="font-black text-lg text-slate-900 mb-2">{option.title}</h3>
                            <p className="text-sm text-slate-700 leading-relaxed flex-1">{option.desc}</p>
                            <Link
                                href={option.link.href}
                                className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-orange-700 hover:text-orange-600"
                            >
                                {option.link.label}
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>

            {/* Andere Fachleute */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 relative z-10" aria-labelledby="fachleute-heading">
                <div className="rounded-tile-2xl bg-orange-50/50 border border-orange-200/80 p-7 sm:p-10">
                    <h2 id="fachleute-heading" className="text-2xl font-black text-slate-900 mb-2 flex items-center gap-2">
                        <Users className="w-6 h-6 text-orange-600" />
                        Wann andere Fachleute gefragt sind
                    </h2>
                    <p className="text-sm text-slate-700 leading-relaxed mb-5">
                        Wir sagen offen, wenn eine Ursache außerhalb unseres Handwerks liegt, und nennen Ihnen den richtigen
                        Ansprechpartner:
                    </p>
                    <ul className="space-y-3">
                        {OTHER_EXPERTS.map((item) => (
                            <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700 leading-relaxed">
                                <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="mt-5 text-sm text-slate-700">
                        Tipps zur Vorbeugung:{' '}
                        <Link href="/blog/schimmel-fliesenfugen-vermeiden" className="font-bold text-orange-700 hover:text-orange-600 hover:underline underline-offset-2">
                            Schimmel in Fliesenfugen vermeiden
                        </Link>
                    </p>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-20 bg-white border-y border-slate-200 relative z-10" aria-labelledby="faq-heading">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <span className="eyebrow eyebrow-orange mb-4">
                            <HelpCircle className="w-3.5 h-3.5 text-orange-600" />
                            FAQ
                        </span>
                        <h2 id="faq-heading" className="text-3xl font-black text-slate-900 tracking-tight">
                            Häufige Fragen zur Schadensanalyse
                        </h2>
                    </div>
                    <div className="space-y-4">
                        {schadensFaqs.map((faq) => (
                            <details key={faq.question} className="group p-6 rounded-tile-lg bg-slate-50 border border-slate-200 open:bg-white open:border-orange-500/60 transition-colors">
                                <summary className="cursor-pointer list-none font-black text-base text-slate-900 flex items-start justify-between gap-4">
                                    <span>{faq.question}</span>
                                    <ArrowRight className="w-4 h-4 text-orange-600 shrink-0 mt-1 transition-transform group-open:rotate-90" aria-hidden="true" />
                                </summary>
                                <p className="mt-3 text-sm text-slate-700 leading-relaxed">{faq.answer}</p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* Weiterführende Ratgeber */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10" aria-labelledby="schaden-ratgeber-heading">
                <h2 id="schaden-ratgeber-heading" className="text-2xl font-black text-slate-900 tracking-tight mb-6">
                    Weiterführende Ratgeber zur Schadensanalyse &amp; Ursachenermittlung
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {WEITERLESEN.map((link) => (
                        <li key={link.path}>
                            <Link
                                href={link.path}
                                className="group glass-surface rounded-tile-lg p-5 h-full block hover:-translate-y-0.5 hover:border-orange-500/80 transition-all duration-300"
                            >
                                <span className="font-black text-slate-900 group-hover:text-orange-700 transition-colors flex items-center gap-1">
                                    {link.title}
                                    <ArrowRight className="w-4 h-4" />
                                </span>
                                <span className="block mt-1 text-sm text-slate-700">{link.desc}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>

            {/* Closing CTA */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" aria-labelledby="schaden-cta-heading">
                <div className="ceramic-hero rounded-tile-2xl p-8 sm:p-12 text-center space-y-4">
                    <h2 id="schaden-cta-heading" className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                        Schaden entdeckt? Lassen Sie die Ursache klären.
                    </h2>
                    <p className="text-sm sm:text-base text-slate-700 max-w-2xl mx-auto leading-relaxed">
                        Vereinbaren Sie einen Vor-Ort-Termin – {COMPANY_DATA.hours.formattedWeekdays},{' '}
                        {COMPANY_DATA.hours.formattedSaturday}. Die Schadensanalyse ist Teil des kostenfreien Aufmaßes.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
                        <Link href="/kontakt" className="btn-primary px-7 py-3.5 text-xs">
                            Termin anfragen
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <a href={`tel:${COMPANY_DATA.contact.phoneLink}`} className="btn-ghost px-7 py-3.5 text-xs">
                            <Phone className="w-4 h-4 text-orange-600" />
                            {COMPANY_DATA.contact.phone}
                        </a>
                        <Link href="/beratung" className="btn-ghost px-7 py-3.5 text-xs">
                            Beratung
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
