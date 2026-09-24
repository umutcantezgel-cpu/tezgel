import React from 'react';
import Link from 'next/link';
import {
    ShieldCheck,
    Droplets,
    Layers,
    Ruler,
    ArrowRight,
    Phone,
    MessageCircle,
    CircleCheck,
    Info,
    ChevronDown,
    Wrench,
    SquareStack,
    PaintRoller
} from 'lucide-react';
import { COMPANY_DATA } from '@/config/company';
import { createMetadata } from '@/lib/metadata';
import QualityPromise from '@/components/sections/QualityPromise';

export const metadata = createMetadata({
    title: 'Verbundabdichtung nach DIN 18534 für Bad & Dusche',
    description:
        'DIN 18534 verständlich erklärt: Wassereinwirkungsklassen W0-I bis W3-I, Dichtbänder, Manschetten an Rohrdurchführungen und Abläufen – so bleibt Ihr Bad dicht.',
    path: '/untergrund-abdichtung/din-18534'
});

const NORM_PARTS = [
    { part: 'Teil 1', text: 'Anforderungen, Planungs- und Ausführungsgrundsätze, Wassereinwirkungsklassen' },
    { part: 'Teil 2', text: 'Abdichtung mit bahnenförmigen Abdichtungsstoffen (ohne Fliesenverbund)' },
    { part: 'Teil 3', text: 'Flüssig zu verarbeitende Abdichtungsstoffe im Verbund mit Fliesen und Platten (AIV-F)' },
    { part: 'Teil 4', text: 'Abdichtung mit Gussasphalt oder Asphaltmastix' },
    { part: 'Teil 5', text: 'Bahnenförmige Abdichtungsstoffe im Verbund mit Fliesen und Platten (AIV-B)' },
    { part: 'Teil 6', text: 'Plattenförmige Abdichtungsstoffe im Verbund mit Fliesen und Platten (AIV-P)' }
];

const WATER_CLASSES = [
    {
        cls: 'W0-I',
        level: 'gering',
        definition: 'Flächen mit nicht häufiger Einwirkung aus Spritzwasser',
        examples: 'Wandflächen über Waschbecken in Bädern und über Spülbecken in häuslichen Küchen; Bodenflächen im häuslichen Bereich ohne Ablauf, z. B. in Küchen, Hauswirtschaftsräumen oder Gäste-WCs'
    },
    {
        cls: 'W1-I',
        level: 'mäßig',
        definition: 'Flächen mit häufiger Einwirkung aus Spritzwasser oder nicht häufiger Einwirkung aus Brauchwasser, ohne Intensivierung durch anstauendes Wasser',
        examples: 'Wandflächen über Badewannen und in Duschen in häuslichen Bädern; Bodenflächen im häuslichen Bereich mit Ablauf; Bodenflächen in Bädern mit oder ohne Ablauf, sofern keine hohe Wassereinwirkung aus dem Duschbereich besteht'
    },
    {
        cls: 'W2-I',
        level: 'hoch',
        definition: 'Flächen mit häufiger Einwirkung aus Spritz- und/oder Brauchwasser, vor allem auf dem Boden zeitweise durch anstauendes Wasser intensiviert',
        examples: 'Bodenflächen in Räumen mit bodengleicher Dusche; Wandflächen von Duschen in Sport- und Gewerbestätten'
    },
    {
        cls: 'W3-I',
        level: 'sehr hoch',
        definition: 'Flächen mit sehr häufiger oder lang anhaltender Einwirkung aus Spritz- und/oder Brauchwasser und/oder Wasser aus intensiven Reinigungsverfahren, durch anstauendes Wasser intensiviert',
        examples: 'Vor allem Flächen im Bereich von Schwimmbeckenumgängen sowie Duschanlagen in Sport- und Gewerbestätten und Flächen in gewerblichen Küchen oder Wäschereien'
    }
];

const MATERIALS = [
    {
        title: 'Flüssig verarbeitet (AIV-F)',
        desc: 'Polymerdispersionen, rissüberbrückende mineralische Dichtschlämmen oder Reaktionsharze werden gestrichen, gerollt oder gespachtelt. Sie passen sich jeder Geometrie an und sind im privaten Bad der häufigste Fall.',
        icon: PaintRoller
    },
    {
        title: 'Bahnen (AIV-B)',
        desc: 'Werkseitig gefertigte Dichtbahnen mit gleichmäßiger Dicke werden im Kleberbett verlegt und an den Stößen überlappend verklebt. Sie eignen sich gut für große, ebene Flächen und enge Zeitpläne.',
        icon: Layers
    },
    {
        title: 'Platten (AIV-P)',
        desc: 'Abgedichtete Bauplatten dienen zugleich als Wandbekleidung oder Unterkonstruktion, etwa an Vorwänden oder Wannenschürzen. Stöße und Anschlüsse werden mit den zugehörigen Systemkomponenten gedichtet.',
        icon: SquareStack
    }
];

const DETAILS = [
    {
        title: 'Dichtband an Wand-Boden-Anschlüssen',
        desc: 'Wo Wand und Boden oder zwei Wände aufeinandertreffen, entstehen Bewegungen. Ein Dichtband mit Dehnzone wird in die erste Abdichtungslage eingebettet und überbrückt diese Fuge, statt sie starr zu überspachteln.',
        icon: Ruler
    },
    {
        title: 'Innen- und Außenecken',
        desc: 'Vorgeformte Ecken aus demselben System schließen die Dichtbänder in den Raumecken lückenlos an. Eingeschnittene oder überlappend gefaltete Bänder sind hier die klassische Schwachstelle.',
        icon: SquareStack
    },
    {
        title: 'Dichtmanschetten an Rohrdurchführungen',
        desc: 'Jede Durchdringung – Armaturenanschluss, Wanddurchführung, Unterputz-Körper – erhält eine elastische Manschette, die in die Abdichtung eingebunden wird. So bleibt die Fläche auch an diesen Punkten geschlossen.',
        icon: Wrench
    },
    {
        title: 'Bodenabläufe und Duschrinnen',
        desc: 'Ablauf oder Rinne brauchen einen Anschlussflansch oder eine werkseitige Dichtmanschette, an die die Flächenabdichtung angebunden wird. Einbau und Anschluss ans Abwassernetz übernimmt der Installateur – wir stimmen die Höhen vorher ab.',
        icon: Droplets
    },
    {
        title: 'Schichtdicke und Deckung',
        desc: 'Flüssige Abdichtungen werden in mindestens zwei Arbeitsgängen aufgetragen, bis die vorgeschriebene Mindesttrockenschichtdicke erreicht ist. Sie ist je Stoffgruppe unterschiedlich und in den Produktunterlagen angegeben.',
        icon: Layers
    }
];

const FAQ = [
    {
        q: 'Reichen gut verfugte Fliesen nicht als Schutz aus?',
        a: 'Nein. Fliesen und Zementfugen sind nicht wasserdicht, und Silikonfugen sind Wartungsfugen, die altern. Die eigentliche Dichtebene liegt bei der Verbundabdichtung unter dem Kleberbett.'
    },
    {
        q: 'Brauche ich auch im Gäste-WC ohne Dusche eine Abdichtung?',
        a: 'Bodenflächen im häuslichen Bereich ohne Ablauf fallen in der Regel in die Klasse W0-I. Ob dort abgedichtet werden muss, hängt vor allem vom Untergrund ab: Feuchteempfindliche Untergründe wie Gipsbauplatten oder Holzwerkstoffe brauchen im Spritzwasserbereich einen Schutz, mineralische Untergründe oft nicht.'
    },
    {
        q: 'Welche Klasse gilt für die bodengleiche Dusche im Einfamilienhaus?',
        a: 'Die Bodenfläche in einem Raum mit bodengleicher Dusche ordnet DIN 18534-1 der Klasse W2-I zu, die Wandflächen der Dusche im häuslichen Bad der Klasse W1-I. Welche Abdichtungsstoffe in welcher Klasse zulässig sind, regeln Norm und Verwendbarkeitsnachweis des Produkts.'
    },
    {
        q: 'Kann man die fertige Abdichtung prüfen?',
        a: 'Vor dem Fliesen lässt sich die Abdichtung noch vollständig einsehen: Deckung, Schichtdicke, eingebettete Bänder und Manschetten. Wir empfehlen, diesen Zustand fotografisch festzuhalten – später ist er unter Fliese und Kleber nicht mehr sichtbar.'
    }
];

const READ_MORE = [
    { label: 'Leistung: Untergrund & DIN 18534 Abdichtung', href: '/leistungen/untergrund' },
    { label: 'Barrierefreies Bad mit bodengleicher Dusche', href: '/bad/barrierefreies-bad' },
    { label: 'Bad aus einer Hand: Gewerke koordiniert', href: '/bad/bad-aus-einer-hand' },
    { label: 'Undichte Dusche: die Warnzeichen', href: '/blog/undichte-dusche-warnzeichen' }
];

export default function Din18534Page() {
    return (
        <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
            <div className="ambient-glow-mint -top-32 -left-32 opacity-70" />
            <div className="ambient-glow-sky top-96 -right-24 opacity-60" />

            {/* Hero */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10" aria-labelledby="din-heading">
                <div className="ceramic-hero rounded-[3rem] p-8 sm:p-12 text-center space-y-4 relative overflow-hidden">
                    <span className="eyebrow">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Abdichtung im Verbund &middot; DIN 18534
                    </span>
                    <h1 id="din-heading" className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                        Verbundabdichtung nach DIN 18534:{' '}
                        <span className="text-ceramic-gradient">dicht unter der Fliese</span>
                    </h1>
                    <p className="text-sm sm:text-base text-slate-700 max-w-3xl mx-auto leading-relaxed">
                        Die Fliese sieht man, die Abdichtung darunter nicht – und doch entscheidet sie, ob Dusche, Wanne und Boden
                        auf Dauer trocken bleiben. Wir erklären, wie DIN 18534 Flächen nach ihrer Wasserbelastung einteilt und
                        welche Details in Bad, Dusche, Gäste-WC und Hauswirtschaftsraum wirklich zählen.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
                        <Link href="/kontakt" className="btn-primary px-7 py-3.5 text-xs group">
                            Abdichtung besprechen
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                        <Link href="/bad/badsanierung" className="btn-ghost px-7 py-3.5 text-xs">
                            Zur Badsanierung
                        </Link>
                    </div>
                </div>
            </section>

            {/* Scope */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10" aria-labelledby="regelt-heading">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
                    <div className="lg:col-span-2 space-y-4">
                        <span className="eyebrow eyebrow-sky">Geltungsbereich</span>
                        <h2 id="regelt-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            Was DIN 18534 regelt – und was nicht
                        </h2>
                        <p className="text-base text-slate-700 leading-relaxed">
                            DIN 18534 ist die Norm für die Abdichtung von Innenräumen. Sie legt fest, wie Wand- und Bodenflächen
                            gegen Spritz- und Brauchwasser geschützt werden, und unterscheidet dafür Wassereinwirkungsklassen und
                            Abdichtungsbauarten.
                        </p>
                        <p className="text-base text-slate-700 leading-relaxed">
                            Nicht erfasst sind etwa Balkone, Loggien und Terrassen, erdberührte Bauteile und Schwimmbecken selbst –
                            dafür gelten eigene Normen der Reihe DIN 18531 bis DIN 18535.
                        </p>
                    </div>
                    <div className="lg:col-span-3 glass-surface rounded-[2rem] p-6 sm:p-8">
                        <h3 className="text-lg font-black text-slate-900 mb-4">Die sechs Teile der Norm</h3>
                        <ul className="divide-y divide-slate-200">
                            {NORM_PARTS.map((item) => (
                                <li key={item.part} className="flex gap-4 py-3">
                                    <span className="shrink-0 w-16 text-sm font-black text-emerald-800 tabular-nums">{item.part}</span>
                                    <span className="text-sm text-slate-700 leading-relaxed">{item.text}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                            Für Fliesenbeläge sind vor allem die Teile 1, 3, 5 und 6 maßgeblich: die Abdichtung im Verbund, kurz AIV.
                        </p>
                    </div>
                </div>
            </section>

            {/* Water exposure classes */}
            <section className="py-20 bg-white border-y border-slate-200 relative z-10" aria-labelledby="klassen-heading">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <span className="eyebrow mb-4">
                            <Droplets className="w-3.5 h-3.5" />
                            DIN 18534-1
                        </span>
                        <h2 id="klassen-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            Wassereinwirkungsklassen W0-I bis W3-I mit Beispielen
                        </h2>
                        <p className="mt-3 text-base text-slate-700 leading-relaxed">
                            Das „I“ steht für Innenraum. Die Klasse wird für jede Fläche einzeln bestimmt – im selben Bad kann die
                            Wand über dem Waschtisch W0-I sein, der Boden mit bodengleicher Dusche W2-I.
                        </p>
                    </div>

                    <div className="overflow-x-auto rounded-3xl border border-slate-200">
                        <table className="w-full text-left text-sm min-w-[720px]">
                            <caption className="sr-only">Wassereinwirkungsklassen nach DIN 18534-1 mit Anwendungsbeispielen</caption>
                            <thead className="bg-slate-100 text-slate-900">
                                <tr>
                                    <th scope="col" className="px-5 py-4 font-black border-b border-slate-200">Klasse</th>
                                    <th scope="col" className="px-5 py-4 font-black border-b border-slate-200">Wassereinwirkung</th>
                                    <th scope="col" className="px-5 py-4 font-black border-b border-slate-200">Anwendungsbeispiele</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 bg-white">
                                {WATER_CLASSES.map((row) => (
                                    <tr key={row.cls} className="align-top">
                                        <th scope="row" className="px-5 py-4">
                                            <span className="block font-black text-slate-900 tabular-nums">{row.cls}</span>
                                            <span className="block text-xs font-bold text-emerald-800 uppercase tracking-wider mt-1">{row.level}</span>
                                        </th>
                                        <td className="px-5 py-4 text-slate-700 leading-relaxed">{row.definition}</td>
                                        <td className="px-5 py-4 text-slate-700 leading-relaxed">{row.examples}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p className="mt-4 text-sm text-slate-600 leading-relaxed flex gap-2">
                        <Info className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                        Vereinfachte Wiedergabe der Beispiele aus DIN 18534-1, Tabelle 1. Maßgeblich ist die Norm in ihrer geltenden
                        Fassung; die Zuordnung Ihrer Flächen klären wir bei der Planung.
                    </p>
                </div>
            </section>

            {/* Materials */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10" aria-labelledby="stoffe-heading">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <span className="eyebrow eyebrow-sky mb-4">Abdichtungsstoffe</span>
                    <h2 id="stoffe-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                        Flüssige Abdichtung, Bahnen oder Platten?
                    </h2>
                    <p className="mt-3 text-base text-slate-700 leading-relaxed">
                        Alle drei Bauarten sind normgerecht, wenn das Produkt für die jeweilige Wassereinwirkungsklasse einen
                        Verwendbarkeitsnachweis hat – je nach Produkt ein allgemeines bauaufsichtliches Prüfzeugnis (abP) oder eine
                        Europäische Technische Bewertung mit CE-Kennzeichnung.
                    </p>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {MATERIALS.map((item) => {
                        const Icon = item.icon;
                        return (
                            <li key={item.title} className="group glass-surface p-7 rounded-[2rem] hover:-translate-y-0.5 hover:border-emerald-500/80 transition-all duration-300">
                                <span className="icon-chip w-12 h-12 mb-5">
                                    <Icon className="w-6 h-6" />
                                </span>
                                <h3 className="font-black text-base text-slate-900 mb-2">{item.title}</h3>
                                <p className="text-sm text-slate-700 leading-relaxed">{item.desc}</p>
                            </li>
                        );
                    })}
                </ul>
                <p className="mt-6 text-sm text-slate-700 leading-relaxed max-w-4xl mx-auto text-center">
                    Wichtig ist das System: Abdichtung, Dichtbänder, Ecken, Manschetten und Fliesenkleber sollten aufeinander
                    abgestimmt sein und als Kombination vom Hersteller freigegeben werden.
                </p>
            </section>

            {/* Details */}
            <section className="py-20 bg-white border-y border-slate-200 relative z-10" aria-labelledby="details-heading">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <span className="eyebrow mb-4">Kritische Punkte</span>
                        <h2 id="details-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            Dichtbänder, Manschetten, Abläufe:{' '}
                            <span className="text-ceramic-gradient">wo Abdichtungen versagen</span>
                        </h2>
                        <p className="mt-3 text-base text-slate-700 leading-relaxed">
                            Auf der freien Fläche ist eine Abdichtung selten das Problem. Undicht wird es an Übergängen,
                            Durchdringungen und Abläufen – deshalb gehört dort die meiste Sorgfalt hin.
                        </p>
                    </div>
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {DETAILS.map((item) => {
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
                    <div className="mt-8 rounded-3xl bg-sky-50 border border-sky-200 text-slate-700 p-6 text-sm leading-relaxed">
                        <p>
                            <strong className="text-slate-900">Zusammenspiel mit der Installation:</strong> Rohrleitungen, Vorwandelemente und
                            den Ablauf setzt der Sanitärinstallateur. Wir sind als Fliesenleger für die Abdichtung und den Belag
                            zuständig und stimmen Einbauhöhen, Flansche und Manschetten vorher mit ihm ab – bei Bedarf koordiniert im
                            Rahmen von{' '}
                            <Link href="/bad/bad-aus-einer-hand" className="font-bold text-emerald-800 hover:text-emerald-700 hover:underline underline-offset-2">
                                Bad aus einer Hand
                            </Link>
                            .
                        </p>
                    </div>
                </div>
            </section>

            {/* Layer thickness, drying, documentation */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10" aria-labelledby="schicht-heading">
                <div className="glass-bezel-outer">
                    <div className="glass-bezel-inner p-7 sm:p-10">
                        <span className="eyebrow eyebrow-neutral mb-4">Vor dem Fliesen</span>
                        <h2 id="schicht-heading" className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-6">
                            Schichtdicken, Trocknung und Dokumentation vor dem Fliesen
                        </h2>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {[
                                'Untergrund vorbereiten: tragfähig, sauber, eben und – je nach Produkt – grundiert. Auf einem ungeeigneten Untergrund haftet auch die beste Abdichtung nicht.',
                                'Dichtbänder, Ecken und Manschetten in die erste Lage einbetten, danach die Fläche in mindestens zwei Arbeitsgängen vollflächig und ohne Fehlstellen beschichten.',
                                'Die Mindesttrockenschichtdicke hängt von der Stoffgruppe ab und steht in den Produktunterlagen. Kontrolliert wird sie über die Verbrauchsmenge je Quadratmeter und stichprobenartig an der frischen Schicht.',
                                'Jede Lage trocknen lassen, bevor die nächste folgt, und erst fliesen, wenn die Abdichtung laut Hersteller belegbar ist. Temperatur und Luftfeuchte im Raum beeinflussen diese Zeiten deutlich.',
                                'Vor dem Fliesen alle Anschlüsse sichtprüfen. Wir empfehlen, den fertigen Zustand zu fotografieren, denn nach dem Verlegen ist er nicht mehr einsehbar.'
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

            {/* FAQ */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 relative z-10" aria-labelledby="faq-heading">
                <h2 id="faq-heading" className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-6 text-center">
                    Häufige Fragen zur Abdichtung
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
                        Neues Bad oder neue Dusche geplant?
                    </h2>
                    <p className="text-sm sm:text-base text-slate-700 max-w-2xl mx-auto leading-relaxed">
                        Beim Vor-Ort-Termin ordnen wir Ihre Flächen den Wassereinwirkungsklassen zu und besprechen Abdichtung,
                        Anschlüsse und Ablaufsituation – normgerecht nach DIN 18534.
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
