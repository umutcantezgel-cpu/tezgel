import React from 'react';
import Link from 'next/link';
import {
    AlertTriangle,
    ArrowRight,
    CheckCircle2,
    Layers,
    Maximize2,
    MessageCircle,
    Move,
    Phone,
    Ruler,
    Scissors,
    Sparkles
} from 'lucide-react';
import { COMPANY_DATA } from '@/config/company';
import { createMetadata } from '@/lib/metadata';
import FliesenKonfigurator from '@/components/funnels/FliesenKonfigurator';
import QualityPromise from '@/components/sections/QualityPromise';

export const metadata = createMetadata({
    title: 'Großformatfliesen & XXL-Fliesen fugenarm verlegen',
    description:
        'XXL-Fliesen fugenarm verlegt: Formatklassen im Vergleich, Anforderungen an den Untergrund, vollflächige Bettung und sicheres Handling vom Fachbetrieb.',
    path: '/fliesen/grossformat'
});

const BENEFITS = [
    {
        title: 'Weniger Fugen',
        desc: 'Große Kantenlängen reduzieren die Zahl der Fugen deutlich. Die Fläche wirkt ruhig und zusammenhängend, und es gibt weniger Fugenmeter, die gereinigt werden müssen.',
        icon: Maximize2
    },
    {
        title: 'Großzügige Raumwirkung',
        desc: 'Durchgehende Flächen lassen Räume größer und offener wirken – besonders dort, wo Wohnen, Essen und Kochen ineinander übergehen.',
        icon: Sparkles
    },
    {
        title: 'Wand und Boden aus einem Guss',
        desc: 'Großformate eignen sich auch für Wandflächen, etwa als Küchenrückwand oder raumhohe Wandverkleidung mit wenigen, sauber geplanten Stößen.',
        icon: Layers
    }
];

const FORMAT_CLASSES = [
    {
        name: '60 × 120 cm',
        label: 'Großformat',
        use: 'Wohn- und Essbereiche, Küche, Flur, Wandflächen. Das vielseitigste Großformat, auch in kleineren Räumen gut planbar.',
        substrate: 'Ebener, tragfähiger Untergrund; bei langen Kanten häufig Ebenheit nach erhöhten Anforderungen sinnvoll.',
        handling: 'Mit zwei Personen gut zu tragen; Buttering-Floating und Nivelliersystem sind Standard.'
    },
    {
        name: '120 × 120 cm',
        label: 'Großformat quadratisch',
        use: 'Große, offene Wohnflächen mit wenigen Einbauten und klaren Raumkanten.',
        substrate: 'Hohe Ebenheit auf der gesamten Fläche; Unebenheiten wirken sich auf beide Kantenrichtungen aus.',
        handling: 'Plattengewicht und Fläche verlangen Vakuumheber und eine sorgfältige Bettung ohne Hohlräume.'
    },
    {
        name: 'bis 120 × 278 cm',
        label: 'XXL-Platten',
        use: 'Raumhohe Wandflächen, Küchenrückwände und besonders große Böden mit bewusst gesetzten Stößen.',
        substrate: 'Sehr hohe Ebenheit, oft ein vorheriger Ausgleich; Zuschnitt und Transportweg müssen vorab geplant werden.',
        handling: 'Transport auf Gestellen, Zuschnitt mit Schneidsystem, Verlegung mit Vakuumheber durch ein eingespieltes Team.'
    }
];

const LIMITS = [
    {
        title: 'Raumzuschnitt',
        desc: 'In kleinen, verwinkelten Räumen mit vielen Vorsprüngen entstehen viele Schnitte und schmale Reststreifen. Dann ist ein kleineres Großformat oft die ruhigere Lösung.'
    },
    {
        title: 'Zugänge und Transportweg',
        desc: 'Eine XXL-Platte muss unzerbrochen durch Treppenhaus, Türen und Flure an ihren Platz gelangen. Enge Wendeltreppen oder niedrige Durchgänge schließen manche Formate aus.'
    },
    {
        title: 'Gefälleflächen',
        desc: 'Große, steife Platten lassen sich nicht in mehrere Richtungen gleichzeitig neigen. Auf Flächen mit Gefälle zu einem Punktablauf sind kleinere Formate oder eine Rinne mit Gefälle in eine Richtung die bessere Wahl.'
    },
    {
        title: 'Bewegungsfugen bleiben',
        desc: 'Fugenarm heißt nicht fugenlos: Rand-, Bewegungs- und Anschlussfugen sind auch bei Großformaten nötig und werden in das Fugenbild eingeplant.'
    }
];

const FAQ = [
    {
        q: 'Kann man Großformate auf einen alten Fliesenbelag verlegen?',
        a: 'Das ist möglich, wenn der alte Belag fest haftet, tragfähig und ausreichend eben ist. Oft muss vorher ausgeglichen werden. Ob Überfliesen oder Rückbau sinnvoller ist, klären wir beim Aufmaß vor Ort.'
    },
    {
        q: 'Wie breit ist die Fuge bei Großformaten?',
        a: 'Großformate werden meist rektifiziert geliefert und mit schmalen Fugen von wenigen Millimetern verlegt. Die genaue Breite hängt von Format, Kantenqualität und Herstellerangaben ab – eine Fuge braucht es immer.'
    },
    {
        q: 'Eignen sich Großformate für Fußbodenheizung?',
        a: 'Ja. Keramik leitet Wärme gut. Wichtig sind ein belegreifer Estrich, ein verformbarer Kleber, eine vollflächige Bettung und ein abgestimmter Fugenplan.'
    }
];

const WEITERLESEN = [
    { label: 'Fliesen im Bad: Großformate an Wand und Boden', href: '/bad/fliesen' },
    { label: 'Ausgleich & Gefälle: Ebenheit herstellen', href: '/untergrund-abdichtung/ausgleich-gefaelle' },
    { label: 'Verlegetechnik & Werkstoffe', href: '/fliesen/verlegetechnik' },
    { label: 'Musterbäder ansehen', href: '/bad/musterbaeder' }
];

export default function GrossformatPage() {
    return (
        <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
            <div className="ambient-glow-orange -top-32 -left-32 opacity-70" />
            <div className="ambient-glow-warm top-96 -right-24 opacity-60" />

            {/* Hero */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10" aria-labelledby="grossformat-heading">
                <div className="ceramic-hero rounded-tile-2xl p-8 sm:p-12 text-center space-y-4 relative overflow-hidden">
                    <span className="eyebrow">
                        <Maximize2 className="w-3.5 h-3.5" />
                        Fugenarme Großformatverlegung
                    </span>
                    <h1 id="grossformat-heading" className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                        Großformatfliesen verlegen:{' '}
                        <span className="text-ceramic-gradient">fugenarm, planeben, präzise</span>
                    </h1>
                    <p className="text-sm sm:text-base text-slate-700 max-w-3xl mx-auto leading-relaxed">
                        Formate ab 60 × 120 cm bis hin zu XXL-Platten verändern die Wirkung eines Raums. Sie verlangen aber
                        einen sehr ebenen Untergrund, eine vollflächige Bettung und sicheres Handling. Hier erfahren Sie, was
                        technisch dahintersteckt und wann Großformate die richtige Wahl sind.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
                        <Link href="/kontakt" className="btn-primary px-7 py-3.5 text-xs group">
                            Aufmaß anfragen
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                        <Link href="/leistungen/wohnen" className="btn-ghost px-7 py-3.5 text-xs">
                            Leistung: Wohnbereiche &amp; Neubau
                        </Link>
                    </div>
                </div>
            </section>

            {/* Warum Großformat */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10" aria-labelledby="gf-warum-heading">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <span className="eyebrow eyebrow-orange mb-4">Warum Großformat</span>
                    <h2 id="gf-warum-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                        Weniger Fugen, <span className="text-ceramic-gradient">ruhigere Flächen</span>
                    </h2>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {BENEFITS.map((item) => {
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
            </section>

            {/* Formatklassen */}
            <section className="py-20 bg-white border-y border-slate-200 relative z-10" aria-labelledby="gf-formate-heading">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <span className="eyebrow mb-4">Formatklassen im Vergleich</span>
                        <h2 id="gf-formate-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            60 × 120, 120 × 120 und bis 120 × 278 cm
                        </h2>
                        <p className="mt-3 text-base text-slate-700 leading-relaxed">
                            Mit jeder Formatstufe steigen die Anforderungen an Untergrund, Bettung und Transport. Die Übersicht
                            hilft bei der ersten Einordnung – die Entscheidung fällt nach dem Aufmaß.
                        </p>
                    </div>
                    <ul className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {FORMAT_CLASSES.map((format) => (
                            <li key={format.name} className="p-7 rounded-tile-xl bg-slate-50 border border-slate-200 hover:bg-white hover:-translate-y-0.5 hover:border-orange-500/80 transition-all duration-300">
                                <span className="block text-[11px] font-black uppercase tracking-widest text-orange-600 mb-1">{format.label}</span>
                                <h3 className="text-2xl font-black text-slate-900 tabular-nums mb-5">{format.name}</h3>
                                <dl className="space-y-4 text-sm">
                                    <div>
                                        <dt className="font-bold text-slate-900">Einsatzbereich</dt>
                                        <dd className="text-slate-700 leading-relaxed">{format.use}</dd>
                                    </div>
                                    <div>
                                        <dt className="font-bold text-slate-900">Untergrund</dt>
                                        <dd className="text-slate-700 leading-relaxed">{format.substrate}</dd>
                                    </div>
                                    <div>
                                        <dt className="font-bold text-slate-900">Handling</dt>
                                        <dd className="text-slate-700 leading-relaxed">{format.handling}</dd>
                                    </div>
                                </dl>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* Technik */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10" aria-labelledby="gf-technik-heading">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <span className="eyebrow eyebrow-orange mb-4">Technik</span>
                    <h2 id="gf-technik-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                        Was ein XXL-Belag <span className="text-ceramic-gradient">wirklich braucht</span>
                    </h2>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <article className="glass-surface rounded-tile-lg p-7" aria-labelledby="gf-ebenheit">
                        <span className="icon-chip w-11 h-11 mb-5">
                            <Ruler className="w-5 h-5" />
                        </span>
                        <h3 id="gf-ebenheit" className="text-lg font-black text-slate-900 mb-3">Ebenheit als Voraussetzung</h3>
                        <p className="text-sm text-slate-700 leading-relaxed">
                            Große Platten überbrücken Unebenheiten nicht – sie liegen hohl oder bilden Überzähne. Die
                            Ebenheitstoleranzen nach DIN 18202 für normale Anforderungen reichen bei großen Kantenlängen oft
                            nicht aus. Dann wird erhöhte Ebenheit vereinbart oder der Untergrund vorab ausgeglichen.
                        </p>
                        <Link
                            href="/untergrund-abdichtung/ausgleich-gefaelle"
                            className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-orange-600 hover:text-orange-700 hover:underline underline-offset-2"
                        >
                            Mehr zu Ausgleich &amp; Gefälle
                            <ArrowRight className="w-4 h-4" aria-hidden="true" />
                        </Link>
                    </article>
                    <article className="glass-surface rounded-tile-lg p-7" aria-labelledby="gf-bettung">
                        <span className="icon-chip w-11 h-11 mb-5">
                            <Layers className="w-5 h-5" />
                        </span>
                        <h3 id="gf-bettung" className="text-lg font-black text-slate-900 mb-3">Vollflächige Bettung</h3>
                        <p className="text-sm text-slate-700 leading-relaxed">
                            Großformate werden im kombinierten Verfahren verlegt: Kleber auf den Untergrund (Floating) und
                            zusätzlich auf die Plattenrückseite (Buttering). So entsteht eine möglichst hohlraumarme Bettung,
                            wie sie die anerkannten Regeln des Fachs – etwa das ZDB-Merkblatt zu großformatigen Fliesen – vorsehen.
                            Wir verwenden dafür flexible C2-Kleber mit Verformbarkeit S1 bzw. S2.
                        </p>
                        <Link
                            href="/fliesen/verlegetechnik"
                            className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-orange-600 hover:text-orange-700 hover:underline underline-offset-2"
                        >
                            Kleberklassen erklärt
                            <ArrowRight className="w-4 h-4" aria-hidden="true" />
                        </Link>
                    </article>
                    <article className="glass-surface rounded-tile-lg p-7" aria-labelledby="gf-handling">
                        <span className="icon-chip w-11 h-11 mb-5">
                            <Move className="w-5 h-5" />
                        </span>
                        <h3 id="gf-handling" className="text-lg font-black text-slate-900 mb-3">Transport, Zuschnitt, Nivellierung</h3>
                        <p className="text-sm text-slate-700 leading-relaxed">
                            Große Platten werden auf Gestellen bewegt, mit Vakuumhebern angehoben und auf einem Schneidsystem
                            präzise zugeschnitten. Ein Nivelliersystem hält benachbarte Kanten während des Abbindens auf einer
                            Höhe – das Ziel ist eine planebene Fläche ohne Überzähne.
                        </p>
                        <p className="mt-3 text-sm text-slate-700 leading-relaxed flex items-start gap-2">
                            <Scissors className="w-4 h-4 mt-0.5 text-orange-600 shrink-0" aria-hidden="true" />
                            Ausschnitte für Steckdosen, Rohre oder Türzargen planen wir vor dem ersten Schnitt.
                        </p>
                    </article>
                </div>
            </section>

            {/* Grenzen */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 relative z-10" aria-labelledby="gf-grenzen-heading">
                <div className="rounded-tile-xl bg-slate-50 border border-slate-200 text-slate-700 p-7 sm:p-10">
                    <div className="flex items-center gap-3 mb-6">
                        <AlertTriangle className="w-6 h-6 text-orange-600" aria-hidden="true" />
                        <h2 id="gf-grenzen-heading" className="text-2xl font-black text-slate-900">Grenzen: wann ein kleineres Format besser passt</h2>
                    </div>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {LIMITS.map((item) => (
                            <li key={item.title} className="bg-white/80 border border-slate-200 rounded-tile-md p-5">
                                <h3 className="font-black text-slate-900 mb-1">{item.title}</h3>
                                <p className="text-sm leading-relaxed">{item.desc}</p>
                            </li>
                        ))}
                    </ul>
                    <p className="mt-6 text-sm leading-relaxed">
                        Welches Verlegemuster sich für lange Formate eignet und warum sie meist nur begrenzt versetzt werden,
                        lesen Sie unter{' '}
                        <Link href="/fliesen/verlegemuster" className="font-bold text-orange-600 hover:text-orange-700 hover:underline underline-offset-2">
                            Verlegemuster &amp; Abschlüsse
                        </Link>
                        .
                    </p>
                </div>
            </section>

            {/* FAQ */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10" aria-labelledby="gf-faq-heading">
                <h2 id="gf-faq-heading" className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight text-center mb-8">
                    Häufige Fragen zu Großformaten
                </h2>
                <div className="space-y-3">
                    {FAQ.map((item) => (
                        <details key={item.q} className="group glass-surface rounded-tile-md p-5 open:border-orange-500/80">
                            <summary className="cursor-pointer list-none flex items-center justify-between gap-4 font-bold text-slate-900">
                                {item.q}
                                <ArrowRight className="w-4 h-4 text-orange-600 shrink-0 transition-transform group-open:rotate-90" aria-hidden="true" />
                            </summary>
                            <p className="mt-3 text-sm text-slate-700 leading-relaxed">{item.a}</p>
                        </details>
                    ))}
                </div>
            </section>

            {/* Weiterlesen */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10" aria-labelledby="gf-weiterlesen-heading">
                <div className="glass-surface-subtle rounded-tile-xl p-6 sm:p-8">
                    <h2 id="gf-weiterlesen-heading" className="text-lg font-black text-slate-900 mb-4">Weiterlesen</h2>
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
                </div>
            </section>

            {/* Konfigurator */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10 scroll-mt-28" id="konfigurator" aria-label="Fliesen-Konfigurator">
                <FliesenKonfigurator format="xxl" />
            </section>

            <QualityPromise />

            {/* Closing CTA */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 relative z-10" aria-labelledby="gf-cta-heading">
                <div className="ceramic-hero rounded-tile-2xl p-8 sm:p-12 text-center space-y-4 relative overflow-hidden">
                    <span className="eyebrow">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Kostenfreies Vor-Ort-Aufmaß
                    </span>
                    <h2 id="gf-cta-heading" className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 leading-tight">
                        Passt ein Großformat zu Ihrem Raum?
                    </h2>
                    <p className="text-sm sm:text-base text-slate-700 max-w-2xl mx-auto leading-relaxed">
                        {COMPANY_DATA.owner.fullName} prüft Untergrund, Zugänge und Raumzuschnitt vor Ort und empfiehlt das
                        passende Format – danach erhalten Sie ein verbindliches Festpreisangebot.
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
