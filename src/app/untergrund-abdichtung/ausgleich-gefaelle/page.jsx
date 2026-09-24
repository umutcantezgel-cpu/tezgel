import React from 'react';
import Link from 'next/link';
import {
    Ruler,
    PaintRoller,
    Layers,
    ArrowDownRight,
    Droplets,
    Maximize2,
    Timer,
    Info,
    CircleCheck,
    ArrowRight,
    Phone,
    MessageCircle,
    ChevronDown
} from 'lucide-react';
import { COMPANY_DATA } from '@/config/company';
import { createMetadata } from '@/lib/metadata';
import QualityPromise from '@/components/sections/QualityPromise';

export const metadata = createMetadata({
    title: 'Untergrund ausgleichen & Gefälle vor dem Fliesen',
    description:
        'Unebene Böden und Wände vorbereiten: Ebenheit nach DIN 18202 messen, spachteln und nivellieren, erhöhte Ebenheit für XXL und Gefälle zu Ablauf oder Duschrinne.',
    path: '/untergrund-abdichtung/ausgleich-gefaelle'
});

const TOLERANCES = [
    { row: '3', area: 'Flächenfertige Böden, z. B. Estriche zur Aufnahme von Bodenbelägen, Fliesenbeläge', v01: '2', v1: '4', v4: '10' },
    { row: '4', area: 'wie Zeile 3, jedoch mit erhöhten Anforderungen', v01: '1', v1: '3', v4: '9' },
    { row: '6', area: 'Flächenfertige Wände, z. B. geputzte Wände, Wandbekleidungen', v01: '3', v1: '5', v4: '10' },
    { row: '7', area: 'wie Zeile 6, jedoch mit erhöhten Anforderungen', v01: '2', v1: '3', v4: '8' }
];

const METHODS = [
    {
        title: 'Spachteln',
        desc: 'Für kleinere Mulden, Versätze und Kanten. Spachtelmasse wird mit der Traufel abgezogen, auch örtlich begrenzt. Klassisch vor dem Dünnbett.',
        icon: PaintRoller
    },
    {
        title: 'Nivellieren',
        desc: 'Selbstverlaufende Nivelliermasse wird großflächig gegossen und verteilt. Sie ergibt eine sehr ebene Fläche – ideal vor Großformaten. Auf Holz und Mischuntergründen kommen faserverstärkte Massen zum Einsatz.',
        icon: Ruler
    },
    {
        title: 'Ausgleichsschicht',
        desc: 'Für größere Höhenunterschiede reichen dünne Spachtelungen nicht. Dann werden Ausgleichsmörtel in größerer Schichtdicke oder mehrere Lagen eingesetzt – jeweils innerhalb der Herstellergrenzen.',
        icon: Layers
    },
    {
        title: 'Gefälleschicht',
        desc: 'Gefällemörtel, Gefällespachtel oder vorgefertigte Gefälleelemente bilden die Neigung zum Ablauf. Die Abdichtung liegt darauf, der Belag folgt dem Gefälle.',
        icon: ArrowDownRight
    },
    {
        title: 'Wandbegradigung',
        desc: 'Unebene Wände werden mit Putzausgleich oder Spachtel begradigt. Bei moderaten Abweichungen hilft das Mittelbettverfahren, bei stark schiefen Wänden eine Bekleidung mit Bauplatten.',
        icon: Maximize2
    }
];

const FAQ = [
    {
        q: 'Ist ein Untergrund im Rahmen der Norm automatisch gut genug für Großformate?',
        a: 'Nicht unbedingt. Die üblichen Ebenheitstoleranzen nach DIN 18202 können für großformatige Fliesen zu grob sein, weil sich Unebenheiten auf langen Kanten als Überzähne zeigen. Erhöhte Anforderungen müssen deshalb ausdrücklich vereinbart und der Untergrund entsprechend vorbereitet werden.'
    },
    {
        q: 'Kann das Gefälle nachträglich im Fliesenkleber hergestellt werden?',
        a: 'Nein. Der Kleber ist für eine gleichmäßige, dünne Schicht gedacht. Ein Gefälle wird in der Schicht darunter angelegt – im Estrich, mit Gefällemörtel oder mit Gefälleelementen –, damit auch die Abdichtung dem Gefälle folgt.'
    },
    {
        q: 'Wer schließt den Bodenablauf an?',
        a: 'Einbau und Anschluss des Ablaufs an das Abwassernetz übernimmt der Sanitärinstallateur. Wir stimmen Einbauhöhe und Lage vorher mit ihm ab, bilden das Gefälle aus und binden die Abdichtung an den Ablauf an.'
    }
];

const READ_MORE = [
    { label: 'Leistung: Untergrund & DIN 18534 Abdichtung', href: '/leistungen/untergrund' },
    { label: 'Fliesen im Bad', href: '/bad/fliesen' },
    { label: 'Barrierefreies Bad mit bodengleicher Dusche', href: '/bad/barrierefreies-bad' },
    { label: 'Duschrinne oder Punktablauf?', href: '/blog/duschrinne-oder-punktablauf' }
];

export default function AusgleichGefaellePage() {
    return (
        <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
            <div className="ambient-glow-mint -top-32 -left-32 opacity-70" />
            <div className="ambient-glow-sky top-96 -right-24 opacity-60" />

            {/* Hero */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10" aria-labelledby="ausgleich-heading">
                <div className="ceramic-hero rounded-[3rem] p-8 sm:p-12 text-center space-y-4 relative overflow-hidden">
                    <span className="eyebrow">
                        <Ruler className="w-3.5 h-3.5" />
                        Ebenheit &middot; Nivellierung &middot; Gefälle
                    </span>
                    <h1 id="ausgleich-heading" className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                        Untergrund ausgleichen und Gefälle herstellen:{' '}
                        <span className="text-ceramic-gradient">eben verlegen, Wasser gezielt ableiten</span>
                    </h1>
                    <p className="text-sm sm:text-base text-slate-700 max-w-3xl mx-auto leading-relaxed">
                        Ein planebener Belag beginnt beim Untergrund. Wir messen die Ebenheit, gleichen Böden und Wände aus und legen
                        vor Bodenablauf oder Duschrinne ein Gefälle an, das Wasser zuverlässig dorthin führt, wo es hin soll.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
                        <Link href="/kontakt" className="btn-primary px-7 py-3.5 text-xs group">
                            Untergrund vermessen lassen
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                        <Link href="/bad/barrierefreies-bad" className="btn-ghost px-7 py-3.5 text-xs">
                            Bodengleiche Dusche planen
                        </Link>
                    </div>
                </div>
            </section>

            {/* Measuring */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10" aria-labelledby="messen-heading">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
                    <div className="lg:col-span-2 space-y-4">
                        <span className="eyebrow eyebrow-sky">DIN 18202</span>
                        <h2 id="messen-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            Ebenheit messen: Stichmaße nach DIN 18202
                        </h2>
                        <p className="text-base text-slate-700 leading-relaxed">
                            Gemessen wird mit Richtlatte und Messkeil: Die Latte liegt an den Hochpunkten auf, das Stichmaß ist der
                            größte Abstand zwischen Latte und Fläche. Wie groß es sein darf, hängt vom Abstand der Messpunkte ab –
                            auf kurzen Strecken ist die Toleranz kleiner als auf langen.
                        </p>
                        <p className="text-base text-slate-700 leading-relaxed">
                            Die Norm unterscheidet normale und erhöhte Anforderungen. Erhöhte Anforderungen gelten nur, wenn sie
                            ausdrücklich vereinbart sind.
                        </p>
                    </div>
                    <div className="lg:col-span-3">
                        <div className="overflow-x-auto rounded-3xl border border-slate-200">
                            <table className="w-full text-left text-sm min-w-[600px]">
                                <caption className="sr-only">Ebenheitstoleranzen nach DIN 18202, Tabelle 3 (Auszug)</caption>
                                <thead className="bg-slate-100 text-slate-900">
                                    <tr>
                                        <th scope="col" className="px-4 py-4 font-black border-b border-slate-200">Zeile</th>
                                        <th scope="col" className="px-4 py-4 font-black border-b border-slate-200">Bauteil</th>
                                        <th scope="col" className="px-4 py-4 font-black border-b border-slate-200 text-right">0,1 m</th>
                                        <th scope="col" className="px-4 py-4 font-black border-b border-slate-200 text-right">1 m</th>
                                        <th scope="col" className="px-4 py-4 font-black border-b border-slate-200 text-right">4 m</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 bg-white">
                                    {TOLERANCES.map((t) => (
                                        <tr key={t.row}>
                                            <th scope="row" className="px-4 py-4 font-black text-slate-900 tabular-nums">{t.row}</th>
                                            <td className="px-4 py-4 text-slate-700 leading-relaxed">{t.area}</td>
                                            <td className="px-4 py-4 text-slate-700 tabular-nums text-right">{t.v01} mm</td>
                                            <td className="px-4 py-4 text-slate-700 tabular-nums text-right">{t.v1} mm</td>
                                            <td className="px-4 py-4 text-slate-700 tabular-nums text-right">{t.v4} mm</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p className="mt-4 text-sm text-slate-600 leading-relaxed flex gap-2">
                            <Info className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                            <span>
                                Auszug aus DIN 18202, Tabelle 3: zulässige Stichmaße als Grenzwerte bei Messpunktabständen von 0,1 m,
                                1 m und 4 m. Die Norm nennt weitere Messpunktabstände; maßgeblich ist ihre geltende Fassung.
                            </span>
                        </p>
                    </div>
                </div>
            </section>

            {/* Increased flatness for large formats */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10" aria-labelledby="xxl-heading">
                <div className="glass-bezel-outer">
                    <div className="glass-bezel-inner p-7 sm:p-10">
                        <span className="eyebrow mb-4">
                            <Maximize2 className="w-3.5 h-3.5" />
                            Großformate
                        </span>
                        <h2 id="xxl-heading" className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-4">
                            Erhöhte Ebenheit für Großformate vereinbaren
                        </h2>
                        <div className="space-y-3 text-base text-slate-700 leading-relaxed">
                            <p>
                                Je länger die Fliesenkante, desto deutlicher zeichnet sich jede Welle im Untergrund ab. Großformatige
                                Fliesen im Dünnbett brauchen deshalb in der Regel einen Untergrund, der über die üblichen Toleranzen
                                hinaus eben ist – ein Nivelliersystem beim Verlegen gleicht keine Untergrundmängel aus.
                            </p>
                            <p>
                                Wir empfehlen, die erhöhten Anforderungen (Zeile 4 bzw. 7) bei Großformaten ausdrücklich zu
                                vereinbaren und den nötigen Ausgleich von Anfang an im Angebot vorzusehen.{' '}
                                <Link href="/fliesen/grossformat" className="font-bold text-emerald-800 hover:text-emerald-700 hover:underline underline-offset-2">
                                    Mehr zu XXL-Großformaten
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Methods */}
            <section className="py-20 bg-white border-y border-slate-200 relative z-10" aria-labelledby="verfahren-heading">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <span className="eyebrow mb-4">Verfahren</span>
                        <h2 id="verfahren-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            Spachteln, Nivellieren, Ausgleichsschicht: was wann passt
                        </h2>
                        <p className="mt-3 text-base text-slate-700 leading-relaxed">
                            Welche Methode richtig ist, hängt von der Größe der Abweichung, vom Untergrund und vom geplanten Format ab.
                        </p>
                    </div>
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {METHODS.map((item) => {
                            const Icon = item.icon;
                            return (
                                <li key={item.title} className="group p-7 rounded-3xl bg-slate-50 border border-slate-200 hover:bg-white hover:-translate-y-0.5 hover:border-emerald-500/80 transition-all duration-300">
                                    <span className="icon-chip w-11 h-11 mb-4">
                                        <Icon className="w-5 h-5" />
                                    </span>
                                    <h3 className="font-black text-base text-slate-900 mb-2 group-hover:text-emerald-800 transition-colors">{item.title}</h3>
                                    <p className="text-sm text-slate-700 leading-relaxed">{item.desc}</p>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </section>

            {/* Walls */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10" aria-labelledby="waende-heading">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    <div className="space-y-4">
                        <span className="eyebrow eyebrow-sky">Wand</span>
                        <h2 id="waende-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            Wände begradigen
                        </h2>
                        <p className="text-base text-slate-700 leading-relaxed">
                            Auch Wände werden mit der Richtlatte geprüft, dazu kommen Lot und Winkligkeit der Ecken. Gerade in
                            Altbauten sind Wände oft gewölbt oder aus dem Lot – bei großen Wandfliesen und durchgehenden Fugenbildern
                            fällt das sofort auf.
                        </p>
                        <p className="text-base text-slate-700 leading-relaxed">
                            Ob gespachtelt, im Mittelbett verlegt oder mit Bauplatten bekleidet wird, entscheiden Abweichung,
                            Putzzustand und Raumsituation. Hohl liegender oder sandender Putz wird vorher entfernt.
                        </p>
                    </div>
                    <div className="glass-surface rounded-[2rem] p-7 sm:p-8">
                        <h3 className="text-lg font-black text-slate-900 mb-4">Worauf wir an der Wand achten</h3>
                        <ul className="space-y-3">
                            {[
                                'Ebenheit mit Richtlatte, Lot mit Wasserwaage oder Laser',
                                'Festigkeit und Haftung des Putzes, Hohlstellen durch Abklopfen',
                                'Saugverhalten und passende Grundierung',
                                'Rechtwinklige Ecken für saubere Anschlüsse und Gehrungskanten',
                                'Ausreichend Platz für Armaturen, Vorwände und Nischen'
                            ].map((text) => (
                                <li key={text} className="flex gap-3 text-sm text-slate-700 leading-relaxed">
                                    <CircleCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                                    <span>{text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Falls */}
            <section className="py-20 bg-white border-y border-slate-200 relative z-10" aria-labelledby="gefaelle-heading">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <span className="eyebrow mb-4">
                            <Droplets className="w-3.5 h-3.5" />
                            Entwässerung
                        </span>
                        <h2 id="gefaelle-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            Gefälle in Innenräumen herstellen:{' '}
                            <span className="text-ceramic-gradient">zu Bodenablauf oder Duschrinne</span>
                        </h2>
                        <p className="mt-3 text-base text-slate-700 leading-relaxed">
                            Wasser soll ablaufen, ohne Pfützen zu bilden – und der Boden soll trotzdem sicher begehbar bleiben. In der
                            Praxis üblich sind Gefälle von etwa 1 bis 2 %. Im barrierefreien Duschplatz lässt DIN 18040-2 höchstens
                            2 % zu.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <article className="rounded-[2rem] bg-slate-50 border border-slate-200 p-7 sm:p-8">
                            <h3 className="text-xl font-black text-slate-900 mb-3">Duschrinne</h3>
                            <p className="text-sm text-slate-700 leading-relaxed">
                                Bei einer Rinne an der Wand oder im Boden fällt die Fläche nur in eine Richtung. Das ergibt eine einzige
                                geneigte Ebene – gut geeignet für großformatige Fliesen, die ohne Kehlschnitte durchlaufen können.
                            </p>
                        </article>
                        <article className="rounded-[2rem] bg-slate-50 border border-slate-200 p-7 sm:p-8">
                            <h3 className="text-xl font-black text-slate-900 mb-3">Punktablauf</h3>
                            <p className="text-sm text-slate-700 leading-relaxed">
                                Beim mittigen Ablauf fällt die Fläche aus mehreren Richtungen zum Punkt. Die Fliesen werden an den Graten
                                diagonal geschnitten; kleinere Formate oder Mosaik folgen den Neigungen leichter.
                            </p>
                        </article>
                    </div>
                    <p className="mt-6 text-sm text-slate-700 text-center leading-relaxed max-w-3xl mx-auto">
                        Das Gefälle entsteht in der Schicht unter der Abdichtung. Einbau und Anschluss des Ablaufs an das
                        Abwassernetz übernimmt der Sanitärinstallateur. Gefälle auf Balkonen und Terrassen behandeln wir unter{' '}
                        <Link href="/balkon-terrasse/balkonsanierung" className="font-bold text-emerald-800 hover:text-emerald-700 hover:underline underline-offset-2">
                            Balkonsanierung
                        </Link>
                        .
                    </p>
                </div>
            </section>

            {/* Primer & drying */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10" aria-labelledby="grundierung-heading">
                <div className="glass-surface rounded-[2rem] p-7 sm:p-10">
                    <span className="eyebrow eyebrow-neutral mb-4">
                        <Timer className="w-3.5 h-3.5" />
                        Vorbereitung
                    </span>
                    <h2 id="grundierung-heading" className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-5">
                        Grundierung und Trocknungszeiten
                    </h2>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            'Die Grundierung bindet Reststaub, reguliert das Saugverhalten und verhindert, dass die Ausgleichsmasse zu schnell Wasser verliert oder Luftblasen bildet.',
                            'Calciumsulfatestriche und nicht saugende Untergründe brauchen jeweils eine dafür freigegebene Grundierung.',
                            'Wartezeiten zwischen Grundierung, Ausgleich und Verlegung richten sich nach Herstellerangaben, Schichtdicke, Temperatur und Luftfeuchte.',
                            'Dicke Ausgleichsschichten trocknen deutlich länger als dünne Spachtelungen – das planen wir in den Ablauf ein.'
                        ].map((text) => (
                            <li key={text} className="flex gap-3 text-sm text-slate-700 leading-relaxed">
                                <CircleCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                                <span>{text}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* FAQ */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 relative z-10" aria-labelledby="faq-heading">
                <h2 id="faq-heading" className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-6 text-center">
                    Häufige Fragen zu Ausgleich und Gefälle
                </h2>
                <div className="space-y-3">
                    {FAQ.map((item) => (
                        <details key={item.q} className="group glass-surface rounded-2xl px-6 py-4">
                            <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-bold text-slate-900">
                                {item.q}
                                <ChevronDown className="w-5 h-5 text-emerald-600 shrink-0 transition-transform group-open:rotate-180" />
                            </summary>
                            <p className="mt-3 text-sm text-slate-700 leading-relaxed">{item.a}</p>
                        </details>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 relative z-10" aria-labelledby="cta-heading">
                <div className="ceramic-hero rounded-[2.5rem] p-8 sm:p-12 text-center space-y-4">
                    <h2 id="cta-heading" className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                        Unebener Boden, schiefe Wand, bodengleiche Dusche?
                    </h2>
                    <p className="text-sm sm:text-base text-slate-700 max-w-2xl mx-auto leading-relaxed">
                        Beim Vor-Ort-Aufmaß misst {COMPANY_DATA.owner.fullName} Ebenheit und Höhen und zeigt Ihnen, welcher Ausgleich
                        für Ihr Format und Ihre Dusche nötig ist.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
                        <Link href="/kontakt" className="btn-primary px-7 py-3.5 text-xs">
                            Aufmaß anfragen
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <a href={`tel:${COMPANY_DATA.contact.phoneLink}`} className="btn-ghost px-7 py-3.5 text-xs">
                            <Phone className="w-4 h-4 text-emerald-700" />
                            {COMPANY_DATA.contact.phone}
                        </a>
                        <a href={COMPANY_DATA.contact.whatsappLink} target="_blank" rel="noopener noreferrer" className="btn-ghost px-7 py-3.5 text-xs">
                            <MessageCircle className="w-4 h-4 text-emerald-700" />
                            WhatsApp
                        </a>
                    </div>
                </div>
            </section>

            {/* Weiterlesen */}
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 relative z-10" aria-labelledby="weiterlesen-heading">
                <h2 id="weiterlesen-heading" className="text-xl font-black text-slate-900 mb-4">Weiterlesen</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {READ_MORE.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className="group flex items-center justify-between gap-3 h-full rounded-2xl bg-white border border-slate-200 px-5 py-4 text-sm font-bold text-slate-800 hover:border-emerald-500/80 hover:text-emerald-800 transition-all duration-300"
                            >
                                {link.label}
                                <ArrowRight className="w-4 h-4 text-emerald-600 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <QualityPromise />
        </div>
    );
}
