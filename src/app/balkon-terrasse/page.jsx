import React from 'react';
import Link from 'next/link';
import {
    ArrowRight,
    Phone,
    MessageCircle,
    Snowflake,
    Footprints,
    Droplets,
    Sparkles,
    Layers,
    Wrench,
    LayoutGrid,
    Building2,
    House,
    Trees,
    ThermometerSun,
    CloudRain,
    Info,
    BookOpen
} from 'lucide-react';
import { COMPANY_DATA } from '@/config/company';
import { TOPIC_HUBS } from '@/config/topics';
import { createMetadata } from '@/lib/metadata';
import QualityPromise from '@/components/sections/QualityPromise';

export const metadata = createMetadata({
    title: 'Balkon & Terrasse: Belagsaufbauten im Vergleich',
    description:
        'Stelzlager, Splittbett oder gebundene Verlegung? Aufbauten für Balkon, Dachterrasse und Terrasse auf Erdreich im Vergleich – mit Entscheidungshilfe.',
    path: '/balkon-terrasse'
});

const HUB = TOPIC_HUBS.find((hub) => hub.id === 'balkon-terrasse');
const SUBPAGES = HUB ? HUB.pages.filter((page) => page.path !== HUB.path) : [];

const SUBPAGE_ICONS = {
    '/balkon-terrasse/stelzlager': Layers,
    '/balkon-terrasse/balkonsanierung': Wrench,
    '/balkon-terrasse/terrassenplatten': LayoutGrid
};

const OUTDOOR_RULES = [
    {
        title: 'Frost',
        desc: 'Wasser dehnt sich beim Gefrieren um rund 9 % aus. Dringt es in Poren, Hohlstellen oder Mörtelfugen ein, sprengt jeder Frost-Tau-Wechsel das Gefüge ein Stück weiter auf.',
        icon: Snowflake
    },
    {
        title: 'Wasser',
        desc: 'Regen, Schnee und Tauwasser müssen die Fläche zügig verlassen. Stehendes Wasser im oder unter dem Belag ist die häufigste Ursache für Ausblühungen, Frostschäden und lose Platten.',
        icon: CloudRain
    },
    {
        title: 'Temperaturwechsel',
        desc: 'Eine besonnte Fläche heizt sich im Sommer stark auf und kühlt bei einem Gewitterschauer schlagartig ab. Belag, Bettung und Untergrund bewegen sich dabei unterschiedlich – das Aufbausystem muss das aufnehmen.',
        icon: ThermometerSun
    }
];

const CONSTRUCTIONS = [
    {
        name: 'Stelzlager',
        height: 'Mittel bis hoch, über die Lager stufenlos einstellbar',
        drainage: 'Wasser läuft durch offene Fugen auf die Abdichtungsebene und dort im Gefälle ab',
        slabs: '2-cm-Platten (Feinsteinzeug oder geeigneter Naturstein)',
        suitability: 'Balkon, Loggia, Dachterrasse auf tragfähiger, abgedichteter Fläche',
        access: 'Platten einzeln abnehmbar, Abdichtung und Abläufe bleiben zugänglich'
    },
    {
        name: 'Splittbett (ungebunden)',
        height: 'Mittel, abhängig von Bettungsdicke und Unterbau',
        drainage: 'Wasser versickert über Fugen und Bettung in einen wasserdurchlässigen Unterbau',
        slabs: '2-cm-Platten oder dickere Terrassenplatten',
        suitability: 'Vor allem Terrassen auf Erdreich mit tragfähigem, frostsicherem Unterbau',
        access: 'Platten aufnehmbar, Bettung lässt sich nachrichten'
    },
    {
        name: 'Gebundene Verlegung',
        height: 'Gering, Belag im Kleber- bzw. Mörtelbett auf der Abdichtung',
        drainage: 'Wasser fließt auf der Belagsoberfläche im Gefälle ab, Fugen sind geschlossen',
        slabs: 'Frostbeständiges Feinsteinzeug in üblicher Stärke möglich',
        suitability: 'Flächen mit knapper Aufbauhöhe, wenn Gefälle und Abdichtung darunter stimmen',
        access: 'Kein zerstörungsfreier Zugang zur Abdichtung'
    }
];

const SITUATIONS = [
    {
        title: 'Balkon & Loggia',
        icon: Building2,
        text: 'Im Bestand entscheidet meist die Höhe bis zur Türschwelle. Reicht sie aus, sind Stelzlager auf einer intakten, im Gefälle liegenden Abdichtung die robusteste Lösung. Vorher prüfen wir, ob Abdichtung und Untergrund das zulassen; die Tragfähigkeit der Balkonplatte beurteilt bei Zweifeln ein Tragwerksplaner.'
    },
    {
        title: 'Dachterrasse über Wohnraum',
        icon: House,
        text: 'Hier ist die Abdichtung Teil der Dachabdichtung und häufig Aufgabe des Dachdeckers. Ein Plattenbelag auf Stelzlagern belastet diese Abdichtung nur punktuell über Schutzpads und bleibt für Kontrollen abnehmbar. Wir stimmen den Belag auf die vorhandene oder neu hergestellte Abdichtung ab.'
    },
    {
        title: 'Terrasse auf Erdreich',
        icon: Trees,
        text: 'Voraussetzung ist ein tragfähiger, frostsicherer und wasserdurchlässiger Unterbau mit Gefälle vom Haus weg. Darauf eignen sich Splittbett oder Stelzlager. Wie der Unterbau aufgebaut sein muss, klären wir vor Ort, bevor ein Belag geplant wird.'
    }
];

const BENEFITS = [
    { title: 'Frostbeständig', desc: 'Nur Platten mit geprüfter Frostbeständigkeit kommen ins Freie.', icon: Snowflake },
    { title: 'Rutschhemmend', desc: 'Oberflächen mit einer für außen sinnvollen Rutschhemmung, auch bei Nässe.', icon: Footprints },
    { title: 'Schnell entwässernd', desc: 'Gefälle und Aufbau führen Wasser gezielt von Belag und Gebäude weg.', icon: Droplets },
    { title: 'Pflegeleicht', desc: 'Dichtes Feinsteinzeug nimmt kaum Schmutz auf und lässt sich einfach reinigen.', icon: Sparkles }
];

const FURTHER_READING = [
    { label: 'Leistung: Außenbereiche & Balkone', href: '/leistungen/aussen' },
    { label: 'Leistung: Untergrund & Abdichtung', href: '/leistungen/untergrund' },
    { label: 'Barrierefreier Balkonaustritt', href: '/blog/barrierefreier-balkonaustritt' },
    { label: 'Häufige Fragen', href: '/faq' }
];

export default function BalkonTerrassePage() {
    return (
        <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
            <div className="ambient-glow-orange -top-32 -left-32 opacity-70" />
            <div className="ambient-glow-red top-96 -right-24 opacity-60" />

            {/* Hero */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10" aria-labelledby="balkon-heading">
                <div className="ceramic-hero rounded-tile-2xl p-8 sm:p-12 text-center space-y-4 relative overflow-hidden">
                    <span className="eyebrow">
                        <Layers className="w-3.5 h-3.5" />
                        Ratgeber Außenbeläge
                    </span>
                    <h1 id="balkon-heading" className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                        Balkon und Terrasse:{' '}
                        <span className="text-ceramic-gradient">Beläge, die Frost und Regen standhalten</span>
                    </h1>
                    <p className="text-sm sm:text-base text-slate-700 max-w-3xl mx-auto leading-relaxed">
                        Draußen entscheidet nicht die Fliese allein, sondern der gesamte Aufbau darunter. Hier vergleichen wir
                        Stelzlager, Splittbett und gebundene Verlegung und zeigen, welche Lösung zu Balkon, Dachterrasse oder
                        Terrasse auf Erdreich passt.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
                        <Link href="/kontakt" className="btn-primary px-7 py-3.5 text-xs group">
                            Aufmaß für Balkon oder Terrasse anfragen
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                        <Link href="/leistungen/aussen" className="btn-ghost px-7 py-3.5 text-xs">
                            Leistung Außenbereiche
                        </Link>
                    </div>
                </div>
            </section>

            {/* Why outdoor rules differ */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10" aria-labelledby="balkon-regeln-heading">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <span className="eyebrow mb-4">Grundlagen</span>
                    <h2 id="balkon-regeln-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                        Warum Außenbeläge eigene Regeln brauchen
                    </h2>
                    <p className="mt-3 text-base text-slate-700 leading-relaxed">
                        Ein Belag im Freien ist Belastungen ausgesetzt, die im Wohnraum keine Rolle spielen. Drei Faktoren bestimmen,
                        ob er über viele Winter hält.
                    </p>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {OUTDOOR_RULES.map((item) => {
                        const Icon = item.icon;
                        return (
                            <li key={item.title} className="group glass-surface p-7 rounded-tile-lg hover:-translate-y-0.5 hover:border-orange-500/80 transition-all duration-300">
                                <span className="icon-chip w-12 h-12 mb-5">
                                    <Icon className="w-6 h-6" />
                                </span>
                                <h3 className="font-black text-base text-slate-900 mb-2">{item.title}</h3>
                                <p className="text-sm text-slate-700 leading-relaxed">{item.desc}</p>
                            </li>
                        );
                    })}
                </ul>
                <p className="mt-8 max-w-3xl mx-auto text-sm text-slate-700 leading-relaxed text-center">
                    Typische Schadensbilder, Gefälle und Entwässerung, Abdichtungsanschlüsse und Tropfkanten behandeln wir ausführlich
                    auf der Seite{' '}
                    <Link href="/balkon-terrasse/balkonsanierung" className="font-bold text-orange-800 hover:text-orange-700 hover:underline underline-offset-2">
                        Balkonsanierung
                    </Link>
                    .
                </p>
            </section>

            {/* Comparison table */}
            <section className="py-20 bg-white border-y border-slate-200 relative z-10" aria-labelledby="balkon-vergleich-heading">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <span className="eyebrow mb-4">Vergleich</span>
                        <h2 id="balkon-vergleich-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            Aufbauten im Vergleich:{' '}
                            <span className="text-ceramic-gradient">Stelzlager, Splittbett, gebunden</span>
                        </h2>
                        <p className="mt-3 text-base text-slate-700 leading-relaxed">
                            Alle drei Bauweisen funktionieren – wenn sie zur Fläche passen. Entscheidend sind verfügbare Aufbauhöhe,
                            Untergrund und der Weg, den das Wasser nehmen soll.
                        </p>
                    </div>

                    <div className="overflow-x-auto rounded-tile-lg border border-slate-200">
                        <table className="w-full min-w-[720px] text-left text-sm">
                            <caption className="sr-only">Vergleich der Aufbauten für Balkon und Terrasse</caption>
                            <thead className="bg-slate-100 text-slate-900">
                                <tr>
                                    <th scope="col" className="px-5 py-4 font-black border-b border-slate-200">Kriterium</th>
                                    {CONSTRUCTIONS.map((c) => (
                                        <th key={c.name} scope="col" className="px-5 py-4 font-black border-b border-slate-200">
                                            {c.name}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="text-slate-700">
                                {[
                                    { key: 'height', label: 'Aufbauhöhe' },
                                    { key: 'drainage', label: 'Entwässerung' },
                                    { key: 'slabs', label: 'Platten' },
                                    { key: 'suitability', label: 'Geeignet für' },
                                    { key: 'access', label: 'Revision' }
                                ].map((row) => (
                                    <tr key={row.key} className="border-b border-slate-200 last:border-b-0 even:bg-slate-50">
                                        <th scope="row" className="px-5 py-4 font-bold text-slate-900 align-top">{row.label}</th>
                                        {CONSTRUCTIONS.map((c) => (
                                            <td key={c.name} className="px-5 py-4 align-top leading-relaxed">{c[row.key]}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-6 flex gap-3 rounded-tile-md bg-orange-50 border border-orange-200 p-5 text-sm text-slate-700 leading-relaxed">
                        <Info className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" aria-hidden="true" />
                        <p>
                            <strong className="text-slate-900">Plattenstärke:</strong> 2-cm-Platten sind für Stelzlager und Splittbett
                            nötig, weil sie dort frei spannen bzw. punktuell aufliegen. Bei gebundener Verlegung trägt das Bett die
                            Platte vollflächig – dann genügt frostbeständiges Feinsteinzeug in üblicher Stärke.
                        </p>
                    </div>
                </div>
            </section>

            {/* Situations */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10" aria-labelledby="balkon-situation-heading">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <span className="eyebrow mb-4">Entscheidungshilfe</span>
                    <h2 id="balkon-situation-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                        Welche Lösung passt zu Ihrer Fläche?
                    </h2>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {SITUATIONS.map((item) => {
                        const Icon = item.icon;
                        return (
                            <li key={item.title} className="glass-surface p-7 rounded-tile-lg">
                                <span className="icon-chip w-12 h-12 mb-5">
                                    <Icon className="w-6 h-6" />
                                </span>
                                <h3 className="font-black text-lg text-slate-900 mb-3">{item.title}</h3>
                                <p className="text-sm text-slate-700 leading-relaxed">{item.text}</p>
                            </li>
                        );
                    })}
                </ul>

                <ul className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {BENEFITS.map((item) => {
                        const Icon = item.icon;
                        return (
                            <li key={item.title} className="flex gap-4 rounded-tile-md bg-white border border-slate-200 p-5">
                                <Icon className="w-6 h-6 text-orange-600 shrink-0" aria-hidden="true" />
                                <div>
                                    <h3 className="font-black text-sm text-slate-900">{item.title}</h3>
                                    <p className="mt-1 text-sm text-slate-700 leading-relaxed">{item.desc}</p>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </section>

            {/* Subpages */}
            <section className="py-20 bg-white border-y border-slate-200 relative z-10" aria-labelledby="balkon-themen-heading">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <span className="eyebrow mb-4">Vertiefen</span>
                        <h2 id="balkon-themen-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            System, Sanierung, Material: die Detailseiten
                        </h2>
                    </div>
                    <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {SUBPAGES.map((page) => {
                            const Icon = SUBPAGE_ICONS[page.path] || Layers;
                            return (
                                <li key={page.path}>
                                    <Link
                                        href={page.path}
                                        className="group glass-surface p-7 rounded-tile-lg h-full flex flex-col hover:-translate-y-0.5 hover:border-orange-500/80 hover:shadow-[0_20px_40px_-12px_rgba(15,23,42,0.14)] transition-all duration-300"
                                    >
                                        <span className="icon-chip w-12 h-12 mb-5">
                                            <Icon className="w-6 h-6" />
                                        </span>
                                        <h3 className="font-black text-lg text-slate-900 mb-2 group-hover:text-orange-950 transition-colors">
                                            {page.name}
                                        </h3>
                                        <p className="text-sm text-slate-700 leading-relaxed mb-5">{page.desc}</p>
                                        <span className="mt-auto inline-flex items-center gap-1 text-sm font-bold text-orange-800">
                                            Weiterlesen
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                        </span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </section>

            {/* From guide to offer */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 relative z-10" aria-labelledby="balkon-angebot-heading">
                <div className="ceramic-hero rounded-tile-2xl p-8 sm:p-12 text-center space-y-4 relative overflow-hidden">
                    <span className="eyebrow">Vom Ratgeber zum Angebot</span>
                    <h2 id="balkon-angebot-heading" className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 leading-tight">
                        Wir sehen uns Ihre Fläche vor Ort an
                    </h2>
                    <p className="text-sm sm:text-base text-slate-700 max-w-3xl mx-auto leading-relaxed">
                        Beim kostenfreien Aufmaß prüft {COMPANY_DATA.owner.fullName} Gefälle, Abdichtung, Anschlusshöhen und
                        Untergrund und empfiehlt den passenden Aufbau. Was wir im Außenbereich ausführen, finden Sie auf unserer
                        Leistungsseite.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
                        <Link href="/kontakt" className="btn-primary px-7 py-3.5 text-xs group">
                            Kostenfreies Aufmaß anfragen
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                        <a href={`tel:${COMPANY_DATA.contact.phoneLink}`} className="btn-ghost px-7 py-3.5 text-xs">
                            <Phone className="w-4 h-4 text-orange-700" />
                            {COMPANY_DATA.contact.phone}
                        </a>
                        <a
                            href={COMPANY_DATA.contact.whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="glass-button-whatsapp px-7 py-3.5 text-xs"
                        >
                            <MessageCircle className="w-4 h-4" />
                            Fotos per WhatsApp senden
                        </a>
                    </div>
                </div>

                <nav className="mt-10 glass-surface rounded-tile-xl p-7" aria-labelledby="balkon-weiterlesen-heading">
                    <h2 id="balkon-weiterlesen-heading" className="flex items-center gap-2 font-black text-base text-slate-900 mb-4">
                        <BookOpen className="w-5 h-5 text-orange-600" aria-hidden="true" />
                        Weiterlesen
                    </h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {FURTHER_READING.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className="inline-flex items-center gap-1.5 text-sm font-bold text-orange-800 hover:text-orange-700 hover:underline underline-offset-2"
                                >
                                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </section>

            <QualityPromise />
        </div>
    );
}
