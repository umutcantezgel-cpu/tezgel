import React from 'react';
import Link from 'next/link';
import {
    ArrowRight,
    Boxes,
    CheckCircle2,
    Droplets,
    Gauge,
    Layers,
    MessageCircle,
    Phone,
    Ruler,
    Snowflake,
    Sparkles
} from 'lucide-react';
import { COMPANY_DATA } from '@/config/company';
import { createMetadata } from '@/lib/metadata';
import FliesenKonfigurator from '@/components/funnels/FliesenKonfigurator';
import QualityPromise from '@/components/sections/QualityPromise';

export const metadata = createMetadata({
    title: 'Fliesenarten: Feinsteinzeug, Steinzeug & Steingut',
    description:
        'Welche Fliese für welchen Raum? Feinsteinzeug, Steinzeug und Steingut im Vergleich: Wasseraufnahme, Frostsicherheit, Abriebklasse und Einsatzbereiche.',
    path: '/fliesen/fliesenarten'
});

const MATERIAL_CARDS = [
    {
        title: 'Gebrannte Keramik',
        desc: 'Alle keramischen Fliesen bestehen aus Ton, Feldspat, Quarz und weiteren Mineralien, die geformt und bei hoher Temperatur gebrannt werden. Brenntemperatur und Rohstoffe bestimmen, wie dicht der Scherben wird.',
        icon: Sparkles
    },
    {
        title: 'Wasseraufnahme als Schlüsselwert',
        desc: 'DIN EN 14411 ordnet Fliesen nach Formgebung (A = stranggepresst, B = trockengepresst) und nach ihrer Wasseraufnahme in Gruppen von I bis III ein. Je geringer die Wasseraufnahme, desto dichter und belastbarer die Fliese.',
        icon: Droplets
    },
    {
        title: 'Feinsteinzeug',
        desc: 'Gruppe BIa mit einer Wasseraufnahme von höchstens 0,5 %. Sehr dicht, frostbeständig, bruchfest und für Boden und Wand, innen wie außen geeignet – der heute gebräuchlichste Fliesenwerkstoff.',
        icon: Layers
    },
    {
        title: 'Steinzeug',
        desc: 'Dicht gebrannt, aber etwas offener als Feinsteinzeug (meist Gruppen BIb bis BIIa). Robust für Böden im Innenbereich; frostbeständig nur, wenn der Hersteller dies ausdrücklich angibt.',
        icon: Gauge
    },
    {
        title: 'Steingut',
        desc: 'Gruppe BIII mit einer Wasseraufnahme über 10 %. Poröser, glasierter Scherben, leicht zu schneiden, für Wandflächen im Innenbereich. Nicht frostbeständig und nicht für Böden geeignet.',
        icon: Boxes
    },
    {
        title: 'Frostbeständigkeit',
        desc: 'Draußen zählt, ob eine Fliese Frost-Tau-Wechsel ohne Schäden übersteht. Das wird nach DIN EN ISO 10545-12 geprüft und vom Hersteller deklariert. Für Balkon und Terrasse kommt praktisch nur Feinsteinzeug in Frage.',
        icon: Snowflake
    }
];

const COMPARISON = [
    ['Feinsteinzeug', 'BIa: ≤ 0,5 %', 'Ja', 'Boden und Wand, innen und außen, Großformate, Treppen, Balkon und Terrasse'],
    ['Steinzeug', 'meist BIb bis BIIa: > 0,5 bis 6 %', 'Nur wenn vom Hersteller angegeben', 'Böden und Wände im Innenbereich'],
    ['Steingut', 'BIII: > 10 %', 'Nein', 'Wandfliesen im Innenbereich, z. B. Bad- und Küchenwände']
];

const ROOM_TABLE = [
    ['Wohn- und Essbereich', 'Feinsteinzeug, gern im Großformat oder als Holzoptik-Diele', 'Ruhige Fläche, auf Fußbodenheizung geeignet'],
    ['Küche', 'Feinsteinzeug am Boden; an der Wand auch Steingut oder Großformat', 'Fleckunempfindliche Oberfläche, belastbare Fugen'],
    ['Flur und Diele', 'Feinsteinzeug mit matter, strukturierter Oberfläche', 'Hohe Abriebfestigkeit, Rutschhemmung bei nassen Schuhen'],
    ['Bad – Wand', 'Steingut oder Feinsteinzeug', 'Im Spritzwasserbereich Abdichtung nach DIN 18534'],
    ['Bad – Boden und Dusche', 'Feinsteinzeug, in der Dusche rutschhemmend', 'Rutschhemmung für nassbelastete Barfußbereiche beachten'],
    ['Balkon und Terrasse', 'Frostbeständiges Feinsteinzeug, je nach Aufbau als 2-cm-Platte', 'Frostbeständigkeit, Gefälle, Entwässerung'],
    ['Treppe', 'Feinsteinzeug oder Naturstein', 'Trittsichere Oberfläche, saubere Stufenkanten']
];

const WEITERLESEN = [
    { label: 'Feinsteinzeug oder Naturstein?', href: '/blog/feinsteinzeug-oder-naturstein-vergleich' },
    { label: 'Rutschfeste Fliesen: R-Klassen erklärt', href: '/blog/rutschfeste-fliesen-r-klassen' },
    { label: 'Leistung: Balkon, Terrasse & Außenbereiche', href: '/leistungen/aussen' },
    { label: 'Häufige Fragen', href: '/faq' }
];

export default function FliesenartenPage() {
    return (
        <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
            <div className="ambient-glow-orange -top-32 -left-32 opacity-70" />
            <div className="ambient-glow-warm top-96 -right-24 opacity-60" />

            {/* Hero */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10" aria-labelledby="fliesenarten-heading">
                <div className="ceramic-hero rounded-tile-2xl p-8 sm:p-12 text-center space-y-4 relative overflow-hidden">
                    <span className="eyebrow">
                        <Layers className="w-3.5 h-3.5" />
                        Materialkunde &middot; DIN EN 14411
                    </span>
                    <h1 id="fliesenarten-heading" className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                        Feinsteinzeug, Steinzeug, Steingut:{' '}
                        <span className="text-ceramic-gradient">Fliesenarten und ihre Eigenschaften</span>
                    </h1>
                    <p className="text-sm sm:text-base text-slate-700 max-w-3xl mx-auto leading-relaxed">
                        Fliese ist nicht gleich Fliese. Wasseraufnahme, Frostbeständigkeit, Oberfläche und Kantenbearbeitung
                        entscheiden, wo eine Fliese dauerhaft funktioniert. Diese Seite erklärt die Kennwerte – damit Sie beim
                        Aussuchen und beim Vergleichen von Angeboten wissen, worauf Sie achten müssen.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
                        <Link href="/kontakt" className="btn-primary px-7 py-3.5 text-xs group">
                            Beratung anfragen
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                        <Link href="/bad/fliesen" className="btn-ghost px-7 py-3.5 text-xs">
                            Fliesen im Bad
                        </Link>
                    </div>
                </div>
            </section>

            {/* Material cards */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10" aria-labelledby="fa-gruppen-heading">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <span className="eyebrow eyebrow-orange mb-4">Gruppen nach DIN EN 14411</span>
                    <h2 id="fa-gruppen-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                        Gebrannte Keramik: <span className="text-ceramic-gradient">drei Werkstoffe, viele Einsatzorte</span>
                    </h2>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {MATERIAL_CARDS.map((item) => {
                        const Icon = item.icon;
                        return (
                            <li
                                key={item.title}
                                className="group glass-surface p-7 rounded-tile-lg hover:-translate-y-0.5 hover:border-orange-500/80 hover:shadow-[0_20px_40px_-12px_rgba(15,23,42,0.14)] transition-all duration-300"
                            >
                                <span className="icon-chip w-12 h-12 mb-5">
                                    <Icon className="w-6 h-6" />
                                </span>
                                <h3 className="font-black text-base text-slate-900 mb-2 group-hover:text-orange-600 transition-colors">{item.title}</h3>
                                <p className="text-sm text-slate-700 leading-relaxed">{item.desc}</p>
                            </li>
                        );
                    })}
                </ul>

                <div className="mt-10 overflow-x-auto rounded-tile-xl border border-slate-200">
                    <table className="w-full text-left text-sm">
                        <caption className="sr-only">Vergleich der Fliesenarten nach Wasseraufnahme, Frostbeständigkeit und Einsatz</caption>
                        <thead className="bg-slate-100 text-slate-900">
                            <tr>
                                <th scope="col" className="px-5 py-3 font-black border-b border-slate-200">Fliesenart</th>
                                <th scope="col" className="px-5 py-3 font-black border-b border-slate-200">Wasseraufnahme (Gruppe)</th>
                                <th scope="col" className="px-5 py-3 font-black border-b border-slate-200">Frostbeständig</th>
                                <th scope="col" className="px-5 py-3 font-black border-b border-slate-200">Typischer Einsatz</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {COMPARISON.map(([type, water, frost, use]) => (
                                <tr key={type} className="border-b border-slate-200 last:border-b-0">
                                    <th scope="row" className="px-5 py-4 font-bold text-slate-900 align-top whitespace-nowrap">{type}</th>
                                    <td className="px-5 py-4 text-slate-700 align-top tabular-nums">{water}</td>
                                    <td className="px-5 py-4 text-slate-700 align-top">{frost}</td>
                                    <td className="px-5 py-4 text-slate-700 align-top">{use}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                    Stranggepresste Fliesen wie Spaltplatten oder Cotto gehören zur Gruppe A und werden nach demselben
                    Prinzip eingeordnet.
                </p>
            </section>

            {/* Glasur, Kante, Kennwerte */}
            <section className="py-20 bg-white border-y border-slate-200 relative z-10" aria-labelledby="fa-kennwerte-heading">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <span className="eyebrow mb-4">Kennwerte lesen</span>
                        <h2 id="fa-kennwerte-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            Was auf dem Karton steht – und was es bedeutet
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <article className="p-7 sm:p-8 rounded-tile-xl bg-slate-50 border border-slate-200" aria-labelledby="fa-glasur">
                            <h3 id="fa-glasur" className="text-xl font-black text-slate-900 mb-3">Glasiert oder unglasiert</h3>
                            <p className="text-sm text-slate-700 leading-relaxed">
                                Unglasiertes Feinsteinzeug ist durchgefärbt: Die Oberfläche entspricht dem Scherben, Abnutzung
                                fällt kaum auf. Glasierte Fliesen tragen Farbe und Dekor in einer eingebrannten Glasur – das
                                ermöglicht nahezu jede Optik, macht die Oberfläche aber zur entscheidenden Verschleißschicht.
                            </p>
                        </article>
                        <article className="p-7 sm:p-8 rounded-tile-xl bg-slate-50 border border-slate-200" aria-labelledby="fa-kante">
                            <h3 id="fa-kante" className="text-xl font-black text-slate-900 mb-3 flex items-center gap-2">
                                <Ruler className="w-5 h-5 text-orange-600" aria-hidden="true" />
                                Rektifiziert oder kalibriert
                            </h3>
                            <p className="text-sm text-slate-700 leading-relaxed">
                                Rektifizierte Fliesen werden nach dem Brand an den Kanten maßgenau geschliffen und erlauben
                                schmale Fugen. Kalibrierte Fliesen werden nach dem Brand in Größenklassen sortiert; das Kaliber
                                steht auf dem Karton. Innerhalb einer Fläche sollte nur ein Kaliber verlegt werden.
                            </p>
                        </article>
                        <article className="p-7 sm:p-8 rounded-tile-xl bg-slate-50 border border-slate-200" aria-labelledby="fa-abrieb">
                            <h3 id="fa-abrieb" className="text-xl font-black text-slate-900 mb-3">Abriebklasse</h3>
                            <p className="text-sm text-slate-700 leading-relaxed">
                                Die Abriebklassen 1 bis 5 (häufig PEI-Klassen genannt, geprüft nach DIN EN ISO 10545-7) gelten nur
                                für glasierte Bodenfliesen. Für Wohnräume genügen meist mittlere Klassen; stark begangene Flure und
                                Eingänge brauchen höhere. Unglasiertes Feinsteinzeug wird stattdessen auf Tiefenverschleiß geprüft.
                            </p>
                        </article>
                        <article className="p-7 sm:p-8 rounded-tile-xl bg-slate-50 border border-slate-200" aria-labelledby="fa-rklasse">
                            <h3 id="fa-rklasse" className="text-xl font-black text-slate-900 mb-3">Rutschhemmung (R-Klasse)</h3>
                            <p className="text-sm text-slate-700 leading-relaxed">
                                Die Rutschhemmung wird nach DIN EN 16165 ermittelt, die die früheren Prüfnormen DIN 51130 und
                                DIN 51097 ersetzt hat. Angegeben werden R9 bis R13 für Bereiche mit Schuhen und die Klassen A, B, C
                                für nassbelastete Barfußbereiche. Für Privathaushalte sind sie eine Empfehlung, keine Pflicht.{' '}
                                <Link href="/blog/rutschfeste-fliesen-r-klassen" className="font-bold text-orange-600 hover:text-orange-700 hover:underline underline-offset-2">
                                    Mehr zu R-Klassen
                                </Link>
                            </p>
                        </article>
                    </div>
                </div>
            </section>

            {/* Kauf */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10" aria-labelledby="fa-kauf-heading">
                <div className="rounded-tile-xl bg-slate-50 border border-slate-200 text-slate-700 p-7 sm:p-10">
                    <h2 id="fa-kauf-heading" className="text-2xl sm:text-3xl font-black text-slate-900 mb-6">
                        Beim Kauf: Farbcharge, Kaliber und Reservefliesen
                    </h2>
                    <ul className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {[
                            {
                                title: 'Eine Farbcharge',
                                text: 'Fliesen aus unterschiedlichen Produktionen können leicht im Farbton abweichen. Die Charge steht auf dem Karton – bestellen Sie die gesamte Menge aus einer Charge.'
                            },
                            {
                                title: 'Ein Kaliber',
                                text: 'Bei kalibrierten Fliesen gehört auch das Kaliber auf die Bestellung. Unterschiedliche Kaliber in einer Fläche führen zu verlaufenden Fugen.'
                            },
                            {
                                title: 'Reserve aufbewahren',
                                text: 'Heben Sie einige Fliesen für spätere Reparaturen auf. Nach Jahren ist dieselbe Serie oft nicht mehr lieferbar.'
                            }
                        ].map((item) => (
                            <li key={item.title} className="bg-white/80 border border-slate-200 rounded-tile-md p-5">
                                <h3 className="font-black text-slate-900 mb-1 flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-orange-600" aria-hidden="true" />
                                    {item.title}
                                </h3>
                                <p className="text-sm leading-relaxed">{item.text}</p>
                            </li>
                        ))}
                    </ul>
                    <p className="mt-6 text-sm leading-relaxed">
                        Wie viel Verschnitt Sie je nach Verlegemuster einplanen sollten, steht bei{' '}
                        <Link href="/fliesen/verlegemuster" className="font-bold text-orange-600 hover:text-orange-700 hover:underline underline-offset-2">
                            Verlegemuster &amp; Abschlüsse
                        </Link>
                        . Sie möchten Fliesen gemeinsam auswählen?{' '}
                        <Link href="/ausstellung/wetzlar" className="font-bold text-orange-600 hover:text-orange-700 hover:underline underline-offset-2">
                            Fliesenberatung nach Terminvereinbarung
                        </Link>
                        .
                    </p>
                </div>
            </section>

            {/* Room table */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 relative z-10" aria-labelledby="fa-raum-heading">
                <div className="text-center max-w-3xl mx-auto mb-10">
                    <span className="eyebrow eyebrow-orange mb-4">Übersicht</span>
                    <h2 id="fa-raum-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                        Welche Fliese für welchen Raum?
                    </h2>
                    <p className="mt-3 text-base text-slate-700 leading-relaxed">
                        Eine erste Orientierung. Welche Fliese im Einzelfall passt, hängt von Nutzung, Untergrund und Gestaltung ab.
                    </p>
                </div>
                <div className="overflow-x-auto rounded-tile-xl border border-slate-200">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-100 text-slate-900">
                            <tr>
                                <th scope="col" className="px-5 py-3 font-black border-b border-slate-200">Raum</th>
                                <th scope="col" className="px-5 py-3 font-black border-b border-slate-200">Geeignete Fliesenart</th>
                                <th scope="col" className="px-5 py-3 font-black border-b border-slate-200">Worauf achten</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {ROOM_TABLE.map(([room, tile, note]) => (
                                <tr key={room} className="border-b border-slate-200 last:border-b-0">
                                    <th scope="row" className="px-5 py-4 font-bold text-slate-900 align-top">{room}</th>
                                    <td className="px-5 py-4 text-slate-700 align-top">{tile}</td>
                                    <td className="px-5 py-4 text-slate-700 align-top">{note}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Weiterlesen */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10" aria-labelledby="fa-weiterlesen-heading">
                <div className="glass-surface-subtle rounded-tile-xl p-6 sm:p-8">
                    <h2 id="fa-weiterlesen-heading" className="text-lg font-black text-slate-900 mb-4">Weiterlesen</h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {WEITERLESEN.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className="inline-flex items-center gap-1.5 text-sm font-bold text-orange-600 hover:text-orange-700 hover:underline underline-offset-2"
                                >
                                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <p className="mt-4 text-sm text-slate-700">
                        Projekt im Wohnbereich geplant?{' '}
                        <Link href="/leistungen/wohnen" className="font-bold text-orange-600 hover:text-orange-700 hover:underline underline-offset-2">
                            Leistung: Wohnbereiche &amp; Neubau
                        </Link>
                    </p>
                </div>
            </section>

            {/* Konfigurator */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10 scroll-mt-28" id="konfigurator" aria-label="Fliesen-Konfigurator">
                <FliesenKonfigurator />
            </section>

            <QualityPromise />

            {/* Closing CTA */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 relative z-10" aria-labelledby="fa-cta-heading">
                <div className="ceramic-hero rounded-tile-2xl p-8 sm:p-12 text-center space-y-4 relative overflow-hidden">
                    <span className="eyebrow">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Materialberatung vom Fachbetrieb
                    </span>
                    <h2 id="fa-cta-heading" className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 leading-tight">
                        Unsicher, welche Fliese passt?
                    </h2>
                    <p className="text-sm sm:text-base text-slate-700 max-w-2xl mx-auto leading-relaxed">
                        Beim kostenfreien Vor-Ort-Aufmaß besprechen wir Nutzung, Untergrund und Wunschoptik und empfehlen die
                        passende Fliesenart.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
                        <Link href="/kontakt" className="btn-primary px-7 py-3.5 text-xs">Aufmaß anfragen</Link>
                        <a href={`tel:${COMPANY_DATA.contact.phoneLink}`} className="btn-ghost px-7 py-3.5 text-xs">
                            <Phone className="w-4 h-4 text-slate-700" />
                            {COMPANY_DATA.contact.phone}
                        </a>
                        <a href={COMPANY_DATA.contact.whatsappLink} target="_blank" rel="noopener noreferrer" className="glass-button-whatsapp px-7 py-3.5 text-xs">
                            <MessageCircle className="w-4 h-4" />
                            WhatsApp
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
