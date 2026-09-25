import React from 'react';
import Link from 'next/link';
import {
    Home,
    ArrowRight,
    Phone,
    Ruler,
    Scale,
    Package,
    Hammer,
    CalendarCheck,
    Boxes,
    AlertTriangle,
    CheckCircle2
} from 'lucide-react';
import { COMPANY_DATA } from '@/config/company';
import { createMetadata } from '@/lib/metadata';
import QualityPromise from '@/components/sections/QualityPromise';
import FliesenKonfigurator from '@/components/funnels/FliesenKonfigurator';

export const metadata = createMetadata({
    title: 'Fliesenboden im Bestand erneuern: Ablauf & Planung',
    description:
        'Wohnraum, Küche oder Flur im bewohnten Haus neu fliesen: wann es sich lohnt, der Ablauf in vier Schritten und wie Etappen, Räumung und Zugänge geplant werden.',
    path: '/fliesen/renovierung'
});

const REASONS = [
    'Der alte Belag hat Risse, lose oder hohl klingende Fliesen.',
    'Fugen sind dauerhaft verfärbt oder ausgewaschen.',
    'Format, Farbe und Oberfläche passen nicht mehr zum Wohnkonzept.',
    'Mehrere Räume sollen einen einheitlichen, durchgehenden Boden bekommen.',
    'Eine Renovierung von Küche oder Flur steht ohnehin an.'
];

const STEPS = [
    {
        step: '01',
        icon: Ruler,
        title: 'Aufmaß & Untergrundprüfung',
        desc: 'Vor Ort messen wir die Flächen, prüfen den vorhandenen Belag und Untergrund auf Tragfähigkeit, Haftung und Ebenheit und schauen uns Türen, Übergänge und Anschlüsse an.'
    },
    {
        step: '02',
        icon: Scale,
        title: 'Entscheidung',
        desc: 'Gemeinsam legen Sie mit uns fest: überfliesen oder zurückbauen, welches Format, welche Verlegerichtung, welche Übergänge. Danach erhalten Sie das verbindliche Festpreisangebot.'
    },
    {
        step: '03',
        icon: Package,
        title: 'Vorbereitung',
        desc: 'Material wird bestellt, Termine und Etappen werden abgestimmt. Sie räumen die betroffenen Räume, wir schützen angrenzende Bereiche und Laufwege.'
    },
    {
        step: '04',
        icon: Hammer,
        title: 'Verlegung & Endreinigung',
        desc: 'Untergrund vorbereiten, verlegen, verfugen, Sockel und Anschlüsse ausbilden. Zum Schluss Reinigung und gemeinsame Abnahme mit Deniz Tezgel.'
    }
];

const PREPARATION = [
    'Räume vollständig leeren – Möbel, Teppiche und Deko; alte Sockelleisten entfernen wir nach Absprache.',
    'Einen freien Weg vom Eingang zu den Arbeitsräumen und einen Platz für Material und Schneidtisch einplanen.',
    'Klären, welches Bad, welche Küche und welcher Zugang während der Arbeiten genutzt werden kann.',
    'Haustiere und Kinder von frisch verlegten Flächen fernhalten, bis diese begehbar sind.',
    'Türen, die gekürzt werden müssen, frühzeitig einplanen – das übernimmt der Tischler oder Schreiner.'
];

const TECH_LINKS = [
    { title: 'Überfliesen oder Rückbau?', desc: 'Ob der alte Belag bleiben kann, hängt von Haftung, Ebenheit und Aufbauhöhe ab. Die Entscheidung fällt nach Prüfung vor Ort.', href: '/untergrund-abdichtung/fliesen-auf-fliesen', label: 'Fliesen auf Fliesen' },
    { title: 'Aufbauhöhen an Türen und Übergängen', desc: 'Jeder zusätzliche Millimeter zeigt sich an Türen, Schwellen und Übergängen zu anderen Belägen. Wir planen die Höhen vor der Verlegung.', href: '/untergrund-abdichtung/fliesen-auf-fliesen', label: 'Aufbauhöhen planen' },
    { title: 'Unebenheiten ausgleichen', desc: 'Ältere Estriche und Böden sind selten plan. Ausgleichsmassen schaffen die ebene Fläche, die moderne Formate brauchen.', href: '/untergrund-abdichtung/ausgleich-gefaelle', label: 'Ausgleich & Gefälle' }
];

const CROSS_LINKS = [
    { href: '/leistungen/untergrund', label: 'Untergrundvorbereitung', desc: 'Tragfähig, eben und trocken' },
    { href: '/leistungen/wohnen', label: 'Fliesen im Wohnbereich', desc: 'Wohnen, Küche und Flur' },
    { href: '/bad/badsanierung', label: 'Badsanierung', desc: 'Wenn auch das Bad erneuert werden soll' },
    { href: '/beratung', label: 'Beratung', desc: 'Ihr Projekt persönlich besprechen' }
];

export default function RenovierungPage() {
    return (
        <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
            <div className="ambient-glow-orange -top-32 -left-32 opacity-70" />
            <div className="ambient-glow-warm top-96 -right-24 opacity-60" />

            {/* Hero */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10" aria-labelledby="renovierung-heading">
                <div className="ceramic-hero rounded-tile-2xl p-8 sm:p-12 text-center space-y-4 relative overflow-hidden">
                    <span className="eyebrow">
                        <Home className="w-3.5 h-3.5" />
                        Renovierung im Bestand
                    </span>
                    <h1 id="renovierung-heading" className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                        Fliesenboden im Bestand erneuern:{' '}
                        <span className="text-ceramic-gradient">Ablauf im bewohnten Haus</span>
                    </h1>
                    <p className="text-sm sm:text-base text-slate-700 max-w-3xl mx-auto leading-relaxed">
                        Ein neuer Fliesenboden in Wohnraum, Küche oder Flur, während Sie im Haus wohnen, gelingt mit guter
                        Vorbereitung. Hier lesen Sie, wann sich die Erneuerung lohnt, wie der Ablauf aussieht und was Sie
                        selbst vorbereiten können.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
                        <Link href="/kontakt" className="btn-primary px-7 py-3.5 text-xs group">
                            Kostenfreies Aufmaß anfragen
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                        <Link href="/fliesen/konfigurator" className="btn-ghost px-7 py-3.5 text-xs">
                            Projekt im Konfigurator vorbereiten
                        </Link>
                    </div>
                </div>
            </section>

            {/* Wann lohnt es sich */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10" aria-labelledby="lohnt-heading">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                    <div>
                        <span className="eyebrow eyebrow-orange mb-4">Ausgangslage</span>
                        <h2 id="lohnt-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            Wann sich ein neuer Fliesenboden im Bestand lohnt
                        </h2>
                        <p className="mt-4 text-base text-slate-700 leading-relaxed">
                            Nicht jeder unschöne Boden muss komplett erneuert werden. Manchmal reicht es, Fugen zu sanieren oder
                            einzelne Fliesen zu tauschen. Einen neuen Belag empfehlen wir, wenn mehrere der folgenden Punkte
                            zutreffen:
                        </p>
                        <p className="mt-4 text-sm text-slate-600">
                            Kleinere Schäden?{' '}
                            <Link href="/fliesenreparatur" className="font-semibold text-orange-600 hover:text-orange-700 hover:underline underline-offset-2">
                                Fliesenreparatur
                            </Link>{' '}
                            oder{' '}
                            <Link href="/fliesen/fugensanierung" className="font-semibold text-orange-600 hover:text-orange-700 hover:underline underline-offset-2">
                                Fugensanierung
                            </Link>
                            .
                        </p>
                    </div>
                    <ul className="glass-surface rounded-tile-xl p-7 space-y-3.5">
                        {REASONS.map((reason) => (
                            <li key={reason} className="flex gap-3 text-base text-slate-700">
                                <CheckCircle2 className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                                {reason}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* 4 Schritte */}
            <section className="py-20 bg-white border-y border-slate-200 relative z-10" aria-labelledby="ablauf-heading">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <span className="eyebrow mb-4">Ablauf</span>
                        <h2 id="ablauf-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            Ablauf in 4 Schritten: Aufmaß, Entscheidung, Vorbereitung, Verlegung
                        </h2>
                    </div>
                    <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {STEPS.map((item) => {
                            const Icon = item.icon;
                            return (
                                <li
                                    key={item.step}
                                    className="group p-7 rounded-tile-xl bg-slate-50 border border-slate-200 hover:bg-white hover:-translate-y-0.5 hover:border-orange-500/80 transition-all duration-300"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="font-display text-4xl font-black tabular-nums text-orange-500/30 group-hover:text-orange-500/50 transition-colors" aria-hidden="true">
                                            {item.step}
                                        </span>
                                        <span className="icon-chip w-11 h-11">
                                            <Icon className="w-5 h-5" />
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-black text-slate-900 mb-2">{item.title}</h3>
                                    <p className="text-sm text-slate-700 leading-relaxed">{item.desc}</p>
                                </li>
                            );
                        })}
                    </ol>
                </div>
            </section>

            {/* Etappen & Räumung */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <article className="glass-surface rounded-tile-xl p-8" aria-labelledby="etappen-heading">
                        <span className="icon-chip w-12 h-12 mb-5">
                            <CalendarCheck className="w-6 h-6" />
                        </span>
                        <h2 id="etappen-heading" className="text-2xl font-black text-slate-900 mb-3">Raum für Raum oder alles auf einmal: Etappen planen</h2>
                        <div className="space-y-3 text-sm sm:text-base text-slate-700 leading-relaxed">
                            <p>
                                Alles in einem Zug ist meist die effizienteste Lösung: Fugenachsen und Übergänge lassen sich über
                                alle Räume durchplanen, und Vorbereitungsarbeiten fallen nur einmal an. Dafür muss der gesamte
                                Bereich für die Dauer der Arbeiten geräumt sein.
                            </p>
                            <p>
                                In Etappen zu arbeiten ist möglich, wenn einzelne Räume weiter genutzt werden sollen. Welche
                                Reihenfolge sinnvoll ist und welche Bereiche zwischendurch begehbar bleiben, legen wir nach
                                Absprache fest – abhängig von Grundriss, Trocknungszeiten und Zugängen.
                            </p>
                        </div>
                    </article>
                    <article className="glass-surface rounded-tile-xl p-8" aria-labelledby="raeumung-heading">
                        <span className="icon-chip w-12 h-12 mb-5">
                            <Boxes className="w-6 h-6" />
                        </span>
                        <h2 id="raeumung-heading" className="text-2xl font-black text-slate-900 mb-3">Räumung, Möbel, Zugänge: was Bewohner vorbereiten</h2>
                        <ul className="space-y-2.5 text-sm text-slate-700">
                            {PREPARATION.map((item) => (
                                <li key={item} className="flex gap-2.5">
                                    <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </article>
                </div>
            </section>

            {/* Mehrere Räume */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 relative z-10" aria-labelledby="mehrere-heading">
                <div className="text-center">
                    <span className="eyebrow eyebrow-orange mb-4">Durchgehend geplant</span>
                    <h2 id="mehrere-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                        Mehrere Räume in einem Zug: Küche, Flur und Wohnbereich abstimmen
                    </h2>
                    <p className="mt-4 text-base text-slate-700 leading-relaxed">
                        Wenn Küche, Flur und Wohnbereich gemeinsam erneuert werden, lohnt sich eine übergreifende Planung: ein
                        Format und eine Fugenachse über alle Räume, einheitliche Sockel, abgestimmte Höhen an Türen und
                        Übergängen. In der Küche klären wir zusätzlich, ob der Boden unter die Küchenzeile läuft oder die
                        Möbel bleiben.
                    </p>
                    <div className="mt-5 flex flex-wrap justify-center gap-4 text-sm font-bold">
                        <Link href="/fliesen/kueche" className="inline-flex items-center gap-1 text-orange-600 hover:text-orange-700">
                            Küche fliesen <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link href="/fliesen/flur-diele" className="inline-flex items-center gap-1 text-orange-600 hover:text-orange-700">
                            Flur &amp; Diele fliesen <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Technische Weichen */}
            <section className="py-20 bg-white border-y border-slate-200 relative z-10" aria-labelledby="weichen-heading">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <span className="eyebrow mb-4">Technik</span>
                        <h2 id="weichen-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            Die technischen Weichen im Kurzüberblick: Überfliesen, Rückbau, Aufbauhöhen
                        </h2>
                    </div>
                    <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {TECH_LINKS.map((item) => (
                            <li key={item.title} className="p-7 rounded-tile-xl bg-slate-50 border border-slate-200 flex flex-col">
                                <h3 className="font-black text-base text-slate-900 mb-2">{item.title}</h3>
                                <p className="text-sm text-slate-700 leading-relaxed flex-1">{item.desc}</p>
                                <Link href={item.href} className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-orange-600 hover:text-orange-700">
                                    {item.label}
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-8 flex gap-4 items-start rounded-tile-xl bg-orange-50/60 border border-orange-200/80 p-6">
                        <AlertTriangle className="w-6 h-6 text-orange-600 shrink-0" aria-hidden="true" />
                        <p className="text-sm text-slate-700 leading-relaxed">
                            <strong className="text-orange-900">Hinweis zu Schadstoffen:</strong> Alte Bodenbeläge und Kleber
                            aus früheren Jahrzehnten können Schadstoffe wie Asbest oder PAK enthalten. Besteht ein Verdacht, muss
                            vor dem Rückbau eine Untersuchung erfolgen; die Entfernung übernimmt ein dafür zugelassener
                            Fachbetrieb. Wir sprechen das beim Aufmaß an.
                        </p>
                    </div>
                </div>
            </section>

            {/* Weiterlesen */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-6 relative z-10" aria-labelledby="weiterlesen-heading">
                <h2 id="weiterlesen-heading" className="text-xl font-black text-slate-900 mb-5">Weiterlesen</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {CROSS_LINKS.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className="group block h-full glass-surface rounded-tile-md p-5 hover:-translate-y-0.5 hover:border-orange-500/80 transition-all duration-300"
                            >
                                <span className="flex items-center justify-between gap-2 font-black text-slate-900 group-hover:text-orange-600 transition-colors">
                                    {link.label}
                                    <ArrowRight className="w-4 h-4 shrink-0 text-orange-500" />
                                </span>
                                <span className="mt-1 block text-sm text-slate-600">{link.desc}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
                <p className="mt-6 text-sm text-slate-700">
                    Direkt sprechen:{' '}
                    <a href={`tel:${COMPANY_DATA.contact.phoneLink}`} className="inline-flex items-center gap-1 font-bold text-orange-600 hover:text-orange-700">
                        <Phone className="w-3.5 h-3.5" />
                        {COMPANY_DATA.contact.phone}
                    </a>
                </p>
            </section>

            <QualityPromise />

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10" aria-label="Fliesen-Konfigurator">
                <FliesenKonfigurator substrate="altfliesen" />
            </section>
        </div>
    );
}
