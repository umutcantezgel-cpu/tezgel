import React from 'react';
import Link from 'next/link';
import {
    SquareStack,
    Layers,
    TriangleAlert,
    Timer,
    Droplets,
    Grid3x3,
    CircleCheck,
    Info,
    ArrowRight,
    Phone,
    MessageCircle,
    ChevronDown,
    Scale
} from 'lucide-react';
import { COMPANY_DATA } from '@/config/company';
import { createMetadata } from '@/lib/metadata';
import QualityPromise from '@/components/sections/QualityPromise';

export const metadata = createMetadata({
    title: 'Fliesen auf Holzboden & Rissen: Entkopplung erklärt',
    description:
        'Fliesen auf Holzdielen, Mischuntergründen oder gerissenem Estrich: wie Entkopplung und Rissverharzung helfen, wo ihre Grenzen liegen und was vorab geprüft wird.',
    path: '/untergrund-abdichtung/entkopplung'
});

const LAYERS = [
    { label: 'Fliese', note: 'starrer, keramischer Belag', className: 'bg-white border-slate-300 h-10' },
    { label: 'Fliesenkleber', note: 'verformungsfähig, im Dünnbett', className: 'bg-slate-100 border-slate-200 h-6' },
    { label: 'Entkopplungsmatte', note: 'baut Spannungen zwischen den Schichten ab', className: 'bg-emerald-50 border-emerald-300 h-8' },
    { label: 'Kleber zur Mattenverlegung', note: 'laut Systemvorgabe', className: 'bg-slate-100 border-slate-200 h-5' },
    { label: 'Untergrund', note: 'Estrich, Holzwerkstoff oder Mischuntergrund', className: 'bg-sky-50 border-sky-200 h-14' }
];

const USE_CASES = [
    {
        title: 'Holzdielen und Holzwerkstoffplatten',
        desc: 'Holz quillt und schwindet mit der Luftfeuchte. Auf einer steifen, fest verschraubten Konstruktion kann eine Entkopplung diese Bewegungen vom Belag fernhalten.',
        icon: Layers
    },
    {
        title: 'Mischuntergründe',
        desc: 'Wo Estrich auf Holz, alte Fliesen auf neue Spachtelflächen oder geschlossene Durchbrüche treffen, verhalten sich die Materialien unterschiedlich. Die Matte überbrückt diese Übergänge.',
        icon: Grid3x3
    },
    {
        title: 'Risse im Estrich',
        desc: 'Ruhende Schwindrisse werden kraftschlüssig verharzt. Die Entkopplung darüber reduziert das Risiko, dass sich feine Bewegungen bis in die Fliese durchzeichnen.',
        icon: TriangleAlert
    },
    {
        title: 'Junge Estriche',
        desc: 'Einzelne Systeme sind laut Hersteller für eine frühere Belegung von Zementestrich freigegeben. Das gilt nur innerhalb dieser Herstellerangaben – die Belegreife wird trotzdem geprüft.',
        icon: Timer
    },
    {
        title: 'Nassraum',
        desc: 'Manche Entkopplungsbahnen sind zugleich als Verbundabdichtung nach DIN 18534 geprüft. Dann müssen Stöße, Ecken und Durchdringungen mit den zugehörigen Systemteilen gedichtet werden.',
        icon: Droplets
    }
];

const FAQ = [
    {
        q: 'Kann ich auf meinen alten Holzdielenboden Fliesen legen lassen?',
        a: 'Manchmal ja. Voraussetzung ist eine ausreichend steife Unterkonstruktion ohne spürbares Federn, fest verschraubte Dielen und ein trockener, gesunder Holzzustand. Ob die Decke das Gewicht und die Belastung trägt, ist eine statische Frage, die ein Tragwerksplaner beantwortet.'
    },
    {
        q: 'Verhindert eine Entkopplungsmatte Risse im Belag sicher?',
        a: 'Nein, eine Garantie gegen Risse gibt es nicht. Die Matte baut Spannungen aus kleinen Bewegungen ab. Große Bewegungen, Setzungen oder Durchbiegungen gleicht sie nicht aus.'
    },
    {
        q: 'Ist eine Entkopplung auch eine Trittschalldämmung?',
        a: 'Nicht automatisch. Entkopplung und Trittschalldämmung sind unterschiedliche Funktionen. Einige Produkte verbessern den Trittschall etwas; wer gezielt Schallschutz braucht, muss das bei der Planung des gesamten Bodenaufbaus berücksichtigen.'
    }
];

const READ_MORE = [
    { label: 'Leistung: Untergrund & DIN 18534 Abdichtung', href: '/leistungen/untergrund' },
    { label: 'Fliesen im Wohnbereich', href: '/leistungen/wohnen' },
    { label: 'Badsanierung vom Meisterbetrieb', href: '/bad/badsanierung' },
    { label: 'Estrich & Belegreife', href: '/untergrund-abdichtung/estrich-belegreife' }
];

export default function EntkopplungPage() {
    return (
        <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
            <div className="ambient-glow-mint -top-32 -left-32 opacity-70" />
            <div className="ambient-glow-sky top-96 -right-24 opacity-60" />

            {/* Hero */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10" aria-labelledby="entkopplung-heading">
                <div className="ceramic-hero rounded-[3rem] p-8 sm:p-12 text-center space-y-4 relative overflow-hidden">
                    <span className="eyebrow">
                        <SquareStack className="w-3.5 h-3.5" />
                        Entkopplung &middot; Holz &middot; Rissverharzung
                    </span>
                    <h1 id="entkopplung-heading" className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                        Entkopplung, Holzdielen und Risse:{' '}
                        <span className="text-ceramic-gradient">kritische Untergründe sicher belegen</span>
                    </h1>
                    <p className="text-sm sm:text-base text-slate-700 max-w-3xl mx-auto leading-relaxed">
                        Alte Dielenböden, gerissener Estrich, Übergänge zwischen verschiedenen Materialien: Nicht jeder Untergrund ist
                        auf Anhieb für Fliesen geeignet. Mit Rissverharzung und einer Entkopplungsschicht lässt sich vieles lösen –
                        wenn die Grundvoraussetzungen stimmen. Wo diese fehlen, sagen wir es ehrlich.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
                        <Link href="/kontakt" className="btn-primary px-7 py-3.5 text-xs group">
                            Untergrund beurteilen lassen
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                        <Link href="/leistungen/wohnen" className="btn-ghost px-7 py-3.5 text-xs">
                            Fliesen im Wohnbereich
                        </Link>
                    </div>
                </div>
            </section>

            {/* How it works + schematic */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10" aria-labelledby="funktion-heading">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                    <div className="space-y-4">
                        <span className="eyebrow eyebrow-sky">Prinzip</span>
                        <h2 id="funktion-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            Wie Entkopplung funktioniert
                        </h2>
                        <p className="text-base text-slate-700 leading-relaxed">
                            Keramik ist hart und kaum dehnbar. Bewegt sich der Untergrund – durch Schwinden, Temperatur oder Feuchte –,
                            entstehen in der Klebefuge Scherspannungen. Übersteigen sie die Festigkeit von Kleber oder Fliese, reißt
                            der Belag oder löst sich.
                        </p>
                        <p className="text-base text-slate-700 leading-relaxed">
                            Eine Entkopplungsmatte liegt als Zwischenschicht zwischen Untergrund und Fliese. Sie ist so aufgebaut,
                            dass sie kleine horizontale Bewegungen in sich aufnimmt, statt sie weiterzugeben. Die Fliese bleibt
                            vollflächig verklebt, ist aber von den Bewegungen des Untergrunds weitgehend getrennt.
                        </p>
                    </div>
                    <figure className="glass-surface rounded-[2rem] p-6 sm:p-8">
                        <div className="space-y-1.5" aria-hidden="true">
                            {LAYERS.map((layer) => (
                                <div key={layer.label} className={`rounded-lg border ${layer.className}`} />
                            ))}
                        </div>
                        <figcaption className="mt-6">
                            <p className="text-sm font-black text-slate-900 mb-3">Schematischer Aufbau (von oben nach unten)</p>
                            <ol className="space-y-2">
                                {LAYERS.map((layer, idx) => (
                                    <li key={layer.label} className="flex gap-3 text-sm text-slate-700">
                                        <span className="font-black tabular-nums text-emerald-800 w-5 shrink-0">{idx + 1}</span>
                                        <span>
                                            <strong className="text-slate-900">{layer.label}</strong> – {layer.note}
                                        </span>
                                    </li>
                                ))}
                            </ol>
                        </figcaption>
                    </figure>
                </div>
            </section>

            {/* Use cases */}
            <section className="py-20 bg-white border-y border-slate-200 relative z-10" aria-labelledby="einsatz-heading">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <span className="eyebrow mb-4">Einsatzfälle</span>
                        <h2 id="einsatz-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            Wo eine Entkopplung sinnvoll ist
                        </h2>
                    </div>
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {USE_CASES.map((item) => {
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

            {/* Wood, mixed, cracks */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10" aria-label="Holz, Mischuntergründe und Risse">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <article className="glass-surface rounded-[2rem] p-7">
                        <h2 className="text-xl font-black text-slate-900 mb-3">Fliesen auf Holzdielen: Tragfähigkeit und Durchbiegung prüfen</h2>
                        <ul className="space-y-3">
                            {[
                                'Federt der Boden beim Begehen spürbar, ist er für Fliesen ungeeignet – daran ändert keine Matte etwas.',
                                'Lose oder knarrende Dielen werden nachgeschraubt, schadhafte Bereiche ersetzt.',
                                'Holzfeuchte, Schädlingsbefall und Luftzirkulation unter den Dielen werden vorab geklärt.',
                                'Ob die Decke die zusätzliche Last trägt, beurteilt ein Tragwerksplaner.'
                            ].map((text) => (
                                <li key={text} className="flex gap-3 text-sm text-slate-700 leading-relaxed">
                                    <CircleCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                                    <span>{text}</span>
                                </li>
                            ))}
                        </ul>
                    </article>
                    <article className="glass-surface rounded-[2rem] p-7">
                        <h2 className="text-xl font-black text-slate-900 mb-3">Mischuntergründe und junge Estriche</h2>
                        <p className="text-sm text-slate-700 leading-relaxed mb-3">
                            Unterschiedliche Materialien dehnen sich unterschiedlich aus. An solchen Übergängen treten Risse
                            bevorzugt auf. Wir prüfen Festigkeit und Haftung jedes Teilbereichs und gleichen Höhenunterschiede aus,
                            bevor die Entkopplung vollflächig darüber verlegt wird.
                        </p>
                        <p className="text-sm text-slate-700 leading-relaxed">
                            Bei jungem Estrich gilt: Die Matte ersetzt die Belegreife nicht grundsätzlich. Ausnahmen regeln allein die
                            Herstellerangaben des jeweiligen Systems.{' '}
                            <Link href="/untergrund-abdichtung/estrich-belegreife" className="font-bold text-emerald-800 hover:text-emerald-700 hover:underline underline-offset-2">
                                Mehr zur Belegreife
                            </Link>
                        </p>
                    </article>
                    <article id="rissverharzung" className="glass-surface rounded-[2rem] p-7 scroll-mt-28">
                        <h2 className="text-xl font-black text-slate-900 mb-3">Risse im Estrich: verharzen, entkoppeln oder beides</h2>
                        <p className="text-sm text-slate-700 leading-relaxed mb-3">
                            Ruhende Risse – etwa Schwindrisse im Zementestrich – werden aufgeweitet, quer zum Riss mit Klammern
                            gesichert und mit Gießharz kraftschlüssig verfüllt. Der Estrich wirkt danach wieder als geschlossene Platte.
                        </p>
                        <p className="text-sm text-slate-700 leading-relaxed">
                            Bewegungsfugen werden dagegen nie verharzt, sondern im Belag an gleicher Stelle übernommen. Arbeitet ein
                            Riss noch, muss zuerst seine Ursache geklärt werden.
                        </p>
                    </article>
                </div>
            </section>

            {/* Limits + build-up */}
            <section className="py-20 bg-white border-y border-slate-200 relative z-10" aria-labelledby="grenzen-heading">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    <div className="glass-bezel-outer">
                        <div className="glass-bezel-inner p-7 sm:p-9">
                            <span className="eyebrow eyebrow-amber mb-4">
                                <Scale className="w-3.5 h-3.5" />
                                Ehrlich betrachtet
                            </span>
                            <h2 id="grenzen-heading" className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-4">
                                Grenzen: was eine Matte nicht ausgleicht
                            </h2>
                            <ul className="space-y-3">
                                {[
                                    'Fehlende Tragfähigkeit oder zu große Durchbiegung einer Holzbalkendecke',
                                    'Setzungen, arbeitende Risse und konstruktive Bewegungen des Bauwerks',
                                    'Größere Unebenheiten – die Matte folgt dem Untergrund und wird vorher ausgeglichen',
                                    'Feuchteschäden im Untergrund, deren Ursache nicht behoben ist'
                                ].map((text) => (
                                    <li key={text} className="flex gap-3 text-sm text-slate-700 leading-relaxed">
                                        <TriangleAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                                        <span>{text}</span>
                                    </li>
                                ))}
                            </ul>
                            <p className="mt-5 text-sm text-slate-600 leading-relaxed">
                                Statische Fragen gehören zu einem Tragwerksplaner. Wir beurteilen, ob der Untergrund für einen
                                Fliesenbelag vorbereitet werden kann – und sagen es, wenn nicht.
                            </p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <span className="eyebrow eyebrow-sky">Planung</span>
                        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                            Aufbauhöhe, Trittschall und Nassraum
                        </h2>
                        <p className="text-base text-slate-700 leading-relaxed">
                            Eine Entkopplungsmatte trägt nur wenige Millimeter auf, zusammen mit zwei Kleberlagen und der Fliese
                            summiert sich das aber. An Türen und Übergängen wird die Höhe deshalb vorab eingeplant.
                        </p>
                        <p className="text-base text-slate-700 leading-relaxed">
                            Im Bad wird die Entkopplung mit der Abdichtung kombiniert: entweder mit einer eigenen Verbundabdichtung
                            darüber oder mit einer Bahn, die für beide Funktionen geprüft ist.
                        </p>
                        <p className="text-sm text-slate-600 leading-relaxed flex gap-2">
                            <Info className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                            <span>
                                Details zur Abdichtung finden Sie unter{' '}
                                <Link href="/untergrund-abdichtung/din-18534" className="font-bold text-emerald-800 hover:text-emerald-700 hover:underline underline-offset-2">
                                    Verbundabdichtung nach DIN 18534
                                </Link>
                                .
                            </span>
                        </p>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10" aria-labelledby="faq-heading">
                <h2 id="faq-heading" className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-6 text-center">
                    Häufige Fragen zur Entkopplung
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
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" aria-labelledby="cta-heading">
                <div className="ceramic-hero rounded-[2.5rem] p-8 sm:p-12 text-center space-y-4">
                    <h2 id="cta-heading" className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                        Schwieriger Untergrund? Lassen Sie ihn prüfen.
                    </h2>
                    <p className="text-sm sm:text-base text-slate-700 max-w-2xl mx-auto leading-relaxed">
                        Beim Vor-Ort-Termin beurteilt {COMPANY_DATA.owner.fullName} Dielen, Risse und Übergänge und erklärt Ihnen,
                        welche Vorbereitung sinnvoll ist.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
                        <Link href="/kontakt" className="btn-primary px-7 py-3.5 text-xs">
                            Termin anfragen
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
