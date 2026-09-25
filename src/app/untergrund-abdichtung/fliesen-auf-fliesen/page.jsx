import React from 'react';
import Link from 'next/link';
import {
    Hammer,
    Layers,
    DoorOpen,
    ShieldCheck,
    Sparkles,
    Search,
    Ruler,
    CircleCheck,
    TriangleAlert,
    ArrowRight,
    Phone,
    MessageCircle,
    ChevronDown
} from 'lucide-react';
import { COMPANY_DATA } from '@/config/company';
import { createMetadata } from '@/lib/metadata';
import QualityPromise from '@/components/sections/QualityPromise';

export const metadata = createMetadata({
    title: 'Fliesen auf Fliesen verlegen: Wann Überfliesen geht',
    description:
        'Überfliesen spart Rückbau und Staub – wenn der Altbelag fest haftet. Prüfkriterien, Haftbrücke, Aufbauhöhen an Türen und wann der Rückbau besser ist.',
    path: '/untergrund-abdichtung/fliesen-auf-fliesen'
});

const PRO_CONTRA = [
    {
        title: 'Überfliesen',
        pros: [
            'Kein Abbruch der Altfliesen, deutlich weniger Lärm, Schutt und Staub',
            'Der vorhandene, feste Belag dient als tragfähiger Untergrund',
            'Oft kürzere Vorbereitungszeit, vor allem in bewohnten Räumen'
        ],
        cons: [
            'Aufbauhöhe wächst um neue Fliese plus Kleberbett',
            'Verborgene Mängel des Altbelags bleiben unter dem neuen Belag',
            'Im Nassbereich muss trotzdem eine neue Abdichtung hergestellt werden'
        ]
    },
    {
        title: 'Rückbau',
        pros: [
            'Untergrund wird sichtbar und kann vollständig geprüft werden',
            'Keine zusätzliche Aufbauhöhe an Türen, Übergängen und Anschlüssen',
            'Abdichtung und Abläufe lassen sich von Grund auf neu aufbauen'
        ],
        cons: [
            'Mehr Aufwand, Lärm und Schutt, Entsorgung notwendig',
            'Der freigelegte Untergrund braucht meist Ausgleich oder Reparatur',
            'Staubschutz im bewohnten Haus ist unverzichtbar'
        ]
    }
];

const PREREQS = [
    {
        title: 'Haftung',
        desc: 'Der Altbelag muss vollflächig und fest am Untergrund haften. Einzelne lose Fliesen werden entfernt und die Stelle ausgeglichen; lösen sich viele, ist der Belag als Untergrund ungeeignet.',
        icon: Layers
    },
    {
        title: 'Hohlstellen',
        desc: 'Mit der Klopfprobe wird die Fläche abgeklopft. Hohl klingende Bereiche zeigen fehlenden Verbund – sie sind eine Schwachstelle, die sich in den neuen Belag überträgt.',
        icon: Search
    },
    {
        title: 'Ebenheit',
        desc: 'Der Altbelag wird wie jeder Untergrund nach DIN 18202 gemessen. Für Großformate ist eine besonders ebene Fläche nötig; Versätze und Mulden werden vorher gespachtelt.',
        icon: Ruler
    }
];

const CHECKLIST = [
    'Altbelag haftet fest, keine größeren Hohlstellen, keine Risse durch den Untergrund',
    'Ebenheit reicht für das gewünschte Format oder lässt sich mit vertretbarem Aufwand herstellen',
    'Türen lassen sich kürzen, Übergänge zu Nachbarräumen sind lösbar',
    'Bodenablauf, Duschtasse, WC und Waschtisch lassen sich an die neue Höhe anpassen',
    'Kein Verdacht auf schadstoffhaltige Altkleber oder -beläge',
    'Die Raumhöhe verträgt den zusätzlichen Aufbau'
];

const FAQ = [
    {
        q: 'Kann man auf alte Wandfliesen im Bad einfach neue kleben?',
        a: 'Technisch ist das auf fest haftenden Wandfliesen mit geeigneter Vorbehandlung möglich. Im Dusch- und Wannenbereich ersetzt der alte Belag aber keine Abdichtung – dort wird eine neue Verbundabdichtung nach DIN 18534 aufgebracht, und alle Anschlüsse werden neu gedichtet.'
    },
    {
        q: 'Wie viel höher wird der Boden?',
        a: 'Der Boden wächst um die Dicke der neuen Fliese plus Kleberbett, dazu kommen eventuell Ausgleichsschichten. Die genaue Höhe hängt von Fliese und Untergrund ab und wird beim Aufmaß an Türen und Übergängen nachgemessen.'
    },
    {
        q: 'Was ist, wenn der alte Kleber Asbest enthalten könnte?',
        a: 'Bei älteren Belägen und Klebern ist das nicht auszuschließen. Besteht ein Verdacht, wird nicht geschliffen, gestemmt oder gebohrt: Untersuchung und gegebenenfalls Entfernung gehören in die Hand einer dafür zugelassenen Fachfirma.'
    }
];

const READ_MORE = [
    { label: 'Leistung: Untergrund & DIN 18534 Abdichtung', href: '/leistungen/untergrund' },
    { label: 'Badsanierung vom Fachbetrieb', href: '/bad/badsanierung' },
    { label: 'Renovierung im Bestand', href: '/fliesen/renovierung' },
    { label: 'Über unseren Betrieb', href: '/unternehmen' }
];

export default function FliesenAufFliesenPage() {
    return (
        <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
            <div className="ambient-glow-warm -top-32 -left-32 opacity-70" />
            <div className="ambient-glow-orange top-96 -right-24 opacity-60" />

            {/* Hero */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10" aria-labelledby="ueberfliesen-heading">
                <div className="ceramic-hero rounded-tile-2xl p-8 sm:p-12 text-center space-y-4 relative overflow-hidden">
                    <span className="eyebrow">
                        <Hammer className="w-3.5 h-3.5 text-orange-600" />
                        Altbelag &middot; Überfliesen &middot; Rückbau
                    </span>
                    <h1 id="ueberfliesen-heading" className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                        Fliesen auf Fliesen oder Rückbau?{' '}
                        <span className="text-ceramic-gradient">Den Altbelag richtig bewerten</span>
                    </h1>
                    <p className="text-sm sm:text-base text-slate-700 max-w-3xl mx-auto leading-relaxed">
                        Überfliesen klingt verlockend: kein Abbruch, weniger Schmutz. Ob es in Ihrem Fall funktioniert, hängt vom
                        Zustand des Altbelags, von den Aufbauhöhen und vom Raum ab. Die Entscheidung fällt erst nach der Prüfung vor
                        Ort – hier sehen Sie, worauf wir dabei achten.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
                        <Link href="/kontakt" className="btn-primary px-7 py-3.5 text-xs group">
                            Altbelag prüfen lassen
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                        <Link href="/bad/badsanierung" className="btn-ghost px-7 py-3.5 text-xs">
                            Zur Badsanierung
                        </Link>
                    </div>
                </div>
            </section>

            {/* Prerequisites */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10" aria-labelledby="voraussetzungen-heading">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <span className="eyebrow eyebrow-orange mb-4">Prüfung</span>
                    <h2 id="voraussetzungen-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                        Voraussetzungen: Haftung, Hohlstellen, Ebenheit
                    </h2>
                    <p className="mt-3 text-base text-slate-700 leading-relaxed">
                        Ein Altbelag ist nur dann ein guter Untergrund, wenn er selbst fest mit dem Bauteil verbunden ist.
                    </p>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {PREREQS.map((item) => {
                        const Icon = item.icon;
                        return (
                            <li key={item.title} className="group glass-surface p-7 rounded-tile-xl hover:-translate-y-0.5 hover:border-orange-500/80 transition-all duration-300">
                                <span className="icon-chip w-12 h-12 mb-5">
                                    <Icon className="w-6 h-6 text-orange-600" />
                                </span>
                                <h3 className="font-black text-base text-slate-900 mb-2">{item.title}</h3>
                                <p className="text-sm text-slate-700 leading-relaxed">{item.desc}</p>
                            </li>
                        );
                    })}
                </ul>
            </section>

            {/* Pro / Contra */}
            <section className="py-20 bg-white border-y border-slate-200 relative z-10" aria-labelledby="vergleich-heading">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <span className="eyebrow eyebrow-orange mb-4">Abwägung</span>
                        <h2 id="vergleich-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            Überfliesen oder Rückbau: Vor- und Nachteile
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {PRO_CONTRA.map((col) => (
                            <article key={col.title} className="rounded-tile-xl bg-slate-50 border border-slate-200 p-7 sm:p-8">
                                <h3 className="text-xl font-black text-slate-900 mb-5">{col.title}</h3>
                                <p className="text-xs font-black uppercase tracking-widest text-orange-800 mb-2">Spricht dafür</p>
                                <ul className="space-y-2 mb-6">
                                    {col.pros.map((text) => (
                                        <li key={text} className="flex gap-3 text-sm text-slate-700 leading-relaxed">
                                            <CircleCheck className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                                            <span>{text}</span>
                                        </li>
                                    ))}
                                </ul>
                                <p className="text-xs font-black uppercase tracking-widest text-amber-800 mb-2">Zu bedenken</p>
                                <ul className="space-y-2">
                                    {col.cons.map((text) => (
                                        <li key={text} className="flex gap-3 text-sm text-slate-700 leading-relaxed">
                                            <TriangleAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                                            <span>{text}</span>
                                        </li>
                                    ))}
                                </ul>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Technique */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10" aria-label="Technik und Aufbauhöhen">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <article className="glass-surface rounded-tile-xl p-7 sm:p-9">
                        <span className="icon-chip w-11 h-11 mb-4">
                            <Layers className="w-5 h-5 text-orange-600" />
                        </span>
                        <h2 className="text-2xl font-black text-slate-900 mb-3">Haftbrücke und Grundierung auf glasierten Altfliesen</h2>
                        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                            <p>
                                Glasierte Fliesen saugen nicht – normaler Kleber findet auf ihnen schlecht Halt. Deshalb wird der
                                Altbelag gründlich gereinigt und entfettet, Pflegefilme und Silikonreste werden entfernt.
                            </p>
                            <p>
                                Danach folgt eine Haftbrücke bzw. Grundierung, die für nicht saugende Untergründe freigegeben ist,
                                oder eine Kontaktschicht aus dem Kleber selbst. Verlegt wird mit einem verformungsfähigen Kleber, der
                                laut Hersteller für Fliesen auf Fliesen geeignet ist.
                            </p>
                        </div>
                    </article>
                    <article className="glass-surface rounded-tile-xl p-7 sm:p-9">
                        <span className="icon-chip w-11 h-11 mb-4">
                            <DoorOpen className="w-5 h-5 text-orange-600" />
                        </span>
                        <h2 className="text-2xl font-black text-slate-900 mb-3">Aufbauhöhen: Türen, Übergänge, Sanitärobjekte</h2>
                        <ul className="space-y-3">
                            {[
                                'Türblätter müssen meist gekürzt werden; bei Zargen und Schwellen prüfen wir, ob genug Luft bleibt.',
                                'Zu angrenzenden Räumen entsteht eine Kante, die mit einem Übergangsprofil oder einer Rampe gelöst wird.',
                                'Bodenablauf und Duschtasse brauchen passende Aufsatzstücke bzw. eine neue Einbauhöhe.',
                                'An der Wand verschieben sich Armaturen, Unterputz-Rosetten und Anschlüsse von WC und Waschtisch nach vorn.'
                            ].map((text) => (
                                <li key={text} className="flex gap-3 text-sm text-slate-700 leading-relaxed">
                                    <CircleCheck className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                                    <span>{text}</span>
                                </li>
                            ))}
                        </ul>
                    </article>
                </div>
            </section>

            {/* When removal is necessary + checklist */}
            <section className="py-20 bg-white border-y border-slate-200 relative z-10" aria-labelledby="rueckbau-heading">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                    <div className="space-y-4">
                        <span className="eyebrow eyebrow-orange">Grenzen</span>
                        <h2 id="rueckbau-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            Wann ein Rückbau unvermeidbar ist
                        </h2>
                        <p className="text-base text-slate-700 leading-relaxed">
                            Wenn der Altbelag in größeren Bereichen hohl liegt oder sich löst, wenn Feuchteschäden oder Schimmel
                            hinter den Fliesen vermutet werden, wenn der Untergrund selbst gerissen ist oder wenn die zusätzliche
                            Aufbauhöhe an Türen, Treppen oder bodengleichen Duschen nicht unterzubringen ist, führt am Rückbau kein
                            Weg vorbei.
                        </p>
                        <p className="text-base text-slate-700 leading-relaxed">
                            Auch bei mehreren übereinanderliegenden Altbelägen oder einem nicht ausreichend tragfähigen Untergrund
                            raten wir vom Überfliesen ab.
                        </p>
                    </div>
                    <div className="glass-surface rounded-tile-xl p-7 sm:p-8">
                        <h3 className="text-lg font-black text-slate-900 mb-4">Checkliste: Überfliesen kommt in Frage, wenn …</h3>
                        <ul className="space-y-3">
                            {CHECKLIST.map((text) => (
                                <li key={text} className="flex gap-3 text-sm text-slate-700 leading-relaxed">
                                    <CircleCheck className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                                    <span>{text}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="mt-5 text-sm text-slate-600 leading-relaxed">
                            Die Checkliste ersetzt nicht die Prüfung vor Ort – sie hilft Ihnen, die eigene Situation vorab einzuschätzen.
                        </p>
                    </div>
                </div>
            </section>

            {/* Dust-reduced removal + wet room */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10" aria-label="Rückbau im bewohnten Haus und Nassraum">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <article className="glass-surface rounded-tile-xl p-7 sm:p-9">
                        <span className="icon-chip w-11 h-11 mb-4">
                            <Sparkles className="w-5 h-5 text-orange-600" />
                        </span>
                        <h2 className="text-2xl font-black text-slate-900 mb-3">Staubarmer Rückbau im bewohnten Haus</h2>
                        <p className="text-sm text-slate-700 leading-relaxed">
                            Ein Rückbau ohne jeden Staub ist nicht möglich – aber er lässt sich stark eindämmen. Wir trennen den
                            Arbeitsbereich mit Staubschutzwänden und -türen ab, decken Laufwege und angrenzende Flächen ab und setzen
                            Luftreiniger ein. Schutt wird auf kurzem Weg aus dem Haus gebracht, am Ende wird besenrein übergeben.
                        </p>
                    </article>
                    <article id="nassraum" className="glass-surface rounded-tile-xl p-7 sm:p-9 scroll-mt-28">
                        <span className="icon-chip w-11 h-11 mb-4">
                            <ShieldCheck className="w-5 h-5 text-orange-600" />
                        </span>
                        <h2 className="text-2xl font-black text-slate-900 mb-3">Sonderfall Nassraum: Abdichtung neu herstellen</h2>
                        <p className="text-sm text-slate-700 leading-relaxed">
                            Alte Fliesen sind keine Abdichtung. Wird in Dusch- oder Wannenbereichen überfliest, bringen wir auf dem
                            vorbereiteten Altbelag eine neue Verbundabdichtung auf – mit Dichtbändern, Ecken und Manschetten. Passt der
                            vorhandene Ablauf nicht zu einer normgerechten Anbindung, ist ein Rückbau in diesem Bereich meist die
                            sauberere Lösung.
                        </p>
                        <Link href="/untergrund-abdichtung/din-18534" className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-orange-700 hover:text-orange-800">
                            Abdichtung nach DIN 18534
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </article>
                </div>
            </section>

            {/* FAQ */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 relative z-10" aria-labelledby="faq-heading">
                <h2 id="faq-heading" className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-6 text-center">
                    Häufige Fragen zum Überfliesen
                </h2>
                <div className="space-y-3">
                    {FAQ.map((item) => (
                        <details key={item.q} className="group glass-surface rounded-tile-lg px-6 py-4">
                            <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-bold text-slate-900">
                                {item.q}
                                <ChevronDown className="w-5 h-5 text-orange-600 shrink-0 transition-transform group-open:rotate-180" />
                            </summary>
                            <p className="mt-3 text-sm text-slate-700 leading-relaxed">{item.a}</p>
                        </details>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 relative z-10" aria-labelledby="cta-heading">
                <div className="ceramic-hero rounded-tile-2xl p-8 sm:p-12 text-center space-y-4">
                    <h2 id="cta-heading" className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                        Überfliesen oder Rückbau – wir klären es vor Ort
                    </h2>
                    <p className="text-sm sm:text-base text-slate-700 max-w-2xl mx-auto leading-relaxed">
                        {COMPANY_DATA.owner.fullName} prüft Haftung, Hohlstellen und Aufbauhöhen persönlich und empfiehlt den Weg, der
                        zu Ihrem Raum passt. Erste Fotos können Sie uns gern vorab per WhatsApp schicken.
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
                        <a href={COMPANY_DATA.contact.whatsappLink} target="_blank" rel="noopener noreferrer" className="glass-button-whatsapp px-7 py-3.5 text-xs">
                            <MessageCircle className="w-4 h-4" />
                            Fotos per WhatsApp
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
                                className="group flex items-center justify-between gap-3 h-full rounded-tile-lg bg-white border border-slate-200 px-5 py-4 text-sm font-bold text-slate-800 hover:border-orange-500/80 hover:text-orange-700 transition-all duration-300"
                            >
                                {link.label}
                                <ArrowRight className="w-4 h-4 text-orange-600 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <QualityPromise />
        </div>
    );
}
