import React from 'react';
import Link from 'next/link';
import {
    ArrowRight,
    Phone,
    MessageCircle,
    Mountain,
    Gem,
    Fingerprint,
    Home,
    ShowerHead,
    Footprints,
    Trees,
    Layers,
    Droplets,
    SprayCan,
    CheckCircle2,
    TriangleAlert,
    Info,
    BookOpen
} from 'lucide-react';
import { COMPANY_DATA } from '@/config/company';
import { TOPIC_HUBS } from '@/config/topics';
import { createMetadata } from '@/lib/metadata';
import QualityPromise from '@/components/sections/QualityPromise';

export const metadata = createMetadata({
    title: 'Naturstein & Granit verlegen lassen in Mittelhessen',
    description:
        'Granit, Marmor, Travertin oder Schiefer: Natursteinböden und Wandbeläge fachgerecht verlegt – mit passendem Kleber, Imprägnierung und ehrlicher Beratung.',
    path: '/naturstein'
});

const HUB = TOPIC_HUBS.find((hub) => hub.id === 'naturstein');
const SUBPAGES = HUB ? HUB.pages.filter((page) => page.path !== HUB.path) : [];

const SUBPAGE_DETAILS = {
    '/naturstein/granit': {
        icon: Mountain,
        group: 'Silikatisch',
        points: ['Granit, Gneis, Quarzit, Schiefer', 'Deutlich unempfindlicher gegen Säure', 'Viele Sorten auch für außen geeignet']
    },
    '/naturstein/marmor-kalkstein': {
        icon: Gem,
        group: 'Kalkhaltig',
        points: ['Marmor, Travertin, Kalkstein', 'Säureempfindlich durch Kalkgehalt', 'Edel im Wohnbereich und an der Wand']
    }
};

const GROUPS = [
    {
        name: 'Silikatische Gesteine',
        examples: 'Granit und granitähnliche Tiefengesteine, Gneis, Quarzit, Schiefer, viele Sandsteine',
        mineral: 'Überwiegend Quarz, Feldspat, Glimmer und andere Silikate',
        acid: 'Deutlich unempfindlicher gegen Säure als kalkhaltige Steine. Ausnahmen: Sandsteine mit kalkhaltigem Bindemittel, Schiefer mit Kalk- oder Pyritanteilen.',
        care: 'Robust im Alltag, dennoch steingerecht und pH-neutral pflegen'
    },
    {
        name: 'Kalkhaltige Gesteine',
        examples: 'Marmor, Travertin, Kalkstein, Dolomit und andere Karbonatgesteine',
        mineral: 'Überwiegend Calcit oder Dolomit (Karbonate)',
        acid: 'Säure – Essig, Zitronensaft, Wein, Kalk- und WC-Reiniger – löst den Kalk an und hinterlässt matte Stellen.',
        care: 'Konsequent säurefrei, pH-neutral pflegen; Imprägnierung empfehlenswert'
    }
];

const AREAS = [
    {
        title: 'Böden im Wohnbereich',
        text: 'Wohnzimmer, Flur und Diele profitieren von der Wertigkeit und Wärmespeicherung des Steins – auch auf Fußbodenheizung, wenn Kleber und Aufbau darauf abgestimmt sind.',
        icon: Home
    },
    {
        title: 'Bad und Dusche',
        text: 'Naturstein ist im Bad möglich, wenn die Abdichtung darunter nach DIN 18534 ausgeführt ist und die Oberfläche im Duschbereich ausreichend rutschhemmend ist.',
        icon: ShowerHead
    },
    {
        title: 'Treppen',
        text: 'Stufen aus Naturstein sind langlebig und repräsentativ. Welche Lösung zu Ihrer Treppe passt, zeigt unser Treppen-Ratgeber.',
        icon: Footprints,
        href: '/treppen',
        linkLabel: 'Zum Treppen-Ratgeber'
    },
    {
        title: 'Außenbereiche',
        text: 'Draußen kommen nur frostbeständige Sorten mit geeigneter Oberfläche infrage. Welche Platte zu Balkon und Terrasse passt, erklären wir bei den Terrassenplatten.',
        icon: Trees,
        href: '/balkon-terrasse/terrassenplatten',
        linkLabel: 'Zu den Terrassenplatten'
    }
];

const LAYING = [
    {
        title: 'Kalibriert oder unkalibriert',
        text: 'Kalibrierte Platten haben eine gleichmäßige Stärke und werden im Dünnbett nach DIN 18157 verlegt. Unkalibrierte Platten mit Stärkeschwankungen brauchen ein Mittelbett, das diese Unterschiede ausgleicht.'
    },
    {
        title: 'Verfärbungsfreie Kleber',
        text: 'Viele Natursteine – besonders helle – können sich durch Feuchtigkeit aus dem Mörtelbett dauerhaft verfärben. Wir verwenden weiße, für Naturstein geeignete Kleber, die das Anmachwasser schnell binden.'
    },
    {
        title: 'Hohlraumarme Bettung',
        text: 'Die Platte wird vollflächig eingebettet. Hohlstellen würden unter Last zu Brüchen führen und im Außenbereich Wasser sammeln.'
    },
    {
        title: 'Sortieren vor dem Verlegen',
        text: 'Weil jede Platte anders gezeichnet ist, legen wir größere Flächen vorab aus und verteilen Farbe und Maserung so, dass ein ruhiges Gesamtbild entsteht.'
    }
];

const CARE = [
    {
        title: 'Imprägnieren statt versiegeln',
        text: 'Eine Imprägnierung dringt in die Poren ein, verzögert das Eindringen von Wasser, Öl und Schmutz und lässt den Stein diffusionsoffen. Sie bildet keinen Film und macht kalkhaltige Steine nicht säurefest.'
    },
    {
        title: 'Der richtige Zeitpunkt',
        text: 'Imprägniert wird erst, wenn Belag, Kleber und Fugen ausgetrocknet sind und die Fläche gründlich gereinigt ist – nach den Angaben des Herstellers des Imprägniermittels.'
    },
    {
        title: 'Vorher testen',
        text: 'Jede Imprägnierung wird an einem Reststück oder einer unauffälligen Stelle erprobt, denn manche Mittel vertiefen den Farbton.'
    },
    {
        title: 'Wirkung prüfen',
        text: 'Perlt ein Wassertropfen nicht mehr ab, sondern zieht schnell ein, ist eine Auffrischung fällig. Wie oft das nötig ist, hängt von Stein und Beanspruchung ab.'
    },
    {
        title: 'Regelmäßig pflegen',
        text: 'Mit klarem Wasser und einem pH-neutralen Steinpflegemittel wischen. Säurehaltige Reiniger, Scheuermittel und aggressive Mittel vermeiden.'
    },
    {
        title: 'Flecken sofort aufnehmen',
        text: 'Verschüttetes Öl, Wein oder Kaffee möglichst sofort abtupfen, nicht verreiben.'
    }
];

const FURTHER_READING = [
    { label: 'Leistung: Wohnbereiche & Böden', href: '/leistungen/wohnen' },
    { label: 'Feinsteinzeug oder Naturstein? Der Vergleich', href: '/blog/feinsteinzeug-oder-naturstein-vergleich' },
    { label: 'Fliesen im Bad', href: '/bad/fliesen' },
    { label: 'Ausstellung Wetzlar', href: '/ausstellung/wetzlar' }
];

export default function NatursteinPage() {
    return (
        <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
            <div className="ambient-glow-orange -top-32 -left-32 opacity-70" />
            <div className="ambient-glow-warm top-96 -right-24 opacity-60" />

            {/* Hero */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10" aria-labelledby="naturstein-heading">
                <div className="ceramic-hero rounded-tile-2xl p-8 sm:p-12 text-center space-y-4 relative overflow-hidden">
                    <span className="eyebrow eyebrow-orange">
                        <Mountain className="w-3.5 h-3.5 text-orange-600" />
                        Naturstein- und Granitverlegung
                    </span>
                    <h1 id="naturstein-heading" className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                        Naturstein- und Granitverlegung{' '}
                        <span className="text-ceramic-gradient">vom Fachbetrieb</span>
                    </h1>
                    <p className="text-sm sm:text-base text-slate-700 max-w-3xl mx-auto leading-relaxed">
                        Granit, Schiefer, Marmor oder Travertin verlangen mehr als eine gute Fliesenverlegung: den passenden Kleber,
                        das richtige Mörtelbett und eine Pflege, die zum Gestein passt. Hier erfahren Sie, worauf es ankommt.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
                        <Link href="/kontakt" className="btn-primary px-7 py-3.5 text-xs group">
                            Natursteinprojekt besprechen
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                        <Link href="/leistungen/wohnen" className="btn-ghost px-7 py-3.5 text-xs">
                            Leistung Wohnbereiche
                        </Link>
                    </div>
                </div>
            </section>

            {/* Unique */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10" aria-labelledby="naturstein-unikat-heading">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
                    <div className="lg:col-span-3">
                        <span className="eyebrow eyebrow-orange mb-4">
                            <Fingerprint className="w-3.5 h-3.5 text-orange-600" />
                            Unikat
                        </span>
                        <h2 id="naturstein-unikat-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            Warum Naturstein: jede Platte ein Unikat
                        </h2>
                        <div className="mt-5 space-y-4 text-base text-slate-700 leading-relaxed">
                            <p>
                                Naturstein ist über lange Zeiträume in der Erde entstanden. Adern, Einschlüsse, Farbwechsel und
                                Maserung machen jeden Boden unverwechselbar – und sind kein Mangel, sondern Eigenschaft des Materials.
                            </p>
                            <p>
                                Das heißt auch: Eine Musterplatte zeigt nur einen Ausschnitt. Farbe und Zeichnung der gelieferten Ware
                                können abweichen. Wer ein sehr gleichmäßiges Bild wünscht, sollte Naturstein und Feinsteinzeug in
                                Steinoptik gegeneinander abwägen – der{' '}
                                <Link href="/blog/feinsteinzeug-oder-naturstein-vergleich" className="font-bold text-orange-700 hover:text-orange-600 hover:underline underline-offset-2">
                                    Vergleich Feinsteinzeug oder Naturstein
                                </Link>{' '}
                                hilft bei der Entscheidung.
                            </p>
                        </div>
                    </div>
                    <div className="lg:col-span-2 glass-surface rounded-tile-2xl p-7">
                        <h3 className="font-black text-base text-slate-900 mb-4">Was wir verlegen</h3>
                        <ul className="space-y-3 text-sm text-slate-700">
                            {['Bodenbeläge in Wohnräumen, Flur und Küche', 'Wand- und Bodenbeläge im Bad', 'Treppenbeläge innen und außen', 'Balkon- und Terrassenbeläge aus geeigneten Sorten'].map((item) => (
                                <li key={item} className="flex gap-2.5">
                                    <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" aria-hidden="true" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                            Wir verlegen den Stein. Steinmetzarbeiten wie das Anfertigen von Massivstufen oder das Schleifen und
                            Polieren von Flächen übernimmt ein Steinmetzbetrieb.
                        </p>
                    </div>
                </div>
            </section>

            {/* Silicate vs calcareous */}
            <section className="py-20 bg-white border-y border-slate-200 relative z-10" aria-labelledby="naturstein-gruppen-heading">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <span className="eyebrow eyebrow-orange mb-4">Die wichtigste Unterscheidung</span>
                        <h2 id="naturstein-gruppen-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            Silikatisch oder kalkhaltig:{' '}
                            <span className="text-ceramic-gradient">was für Säure, Pflege und Verlegung zählt</span>
                        </h2>
                        <p className="mt-3 text-base text-slate-700 leading-relaxed">
                            Ob ein Stein empfindlich auf Säure reagiert, hängt von seinen Mineralen ab – nicht davon, ob er als hart oder
                            weich gilt.
                        </p>
                    </div>

                    <div className="overflow-x-auto rounded-tile-xl border border-slate-200">
                        <table className="w-full min-w-[640px] text-left text-sm">
                            <caption className="sr-only">Silikatische und kalkhaltige Natursteine im Vergleich</caption>
                            <thead className="bg-slate-100 text-slate-900">
                                <tr>
                                    <th scope="col" className="px-5 py-4 font-black border-b border-slate-200">Merkmal</th>
                                    {GROUPS.map((group) => (
                                        <th key={group.name} scope="col" className="px-5 py-4 font-black border-b border-slate-200">
                                            {group.name}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="text-slate-700">
                                {[
                                    { key: 'examples', label: 'Beispiele' },
                                    { key: 'mineral', label: 'Hauptbestandteile' },
                                    { key: 'acid', label: 'Säure' },
                                    { key: 'care', label: 'Pflege' }
                                ].map((row) => (
                                    <tr key={row.key} className="border-b border-slate-200 last:border-b-0 even:bg-slate-50">
                                        <th scope="row" className="px-5 py-4 font-bold text-slate-900 align-top">{row.label}</th>
                                        {GROUPS.map((group) => (
                                            <td key={group.name} className="px-5 py-4 align-top leading-relaxed">{group[row.key]}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-6 flex gap-3 rounded-tile-lg bg-orange-50/60 border border-orange-200/80 p-5 text-sm text-slate-700 leading-relaxed">
                        <Info className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" aria-hidden="true" />
                        <p>
                            <strong className="text-slate-900">Härte ist etwas anderes:</strong> Die Härte sagt, wie kratzempfindlich ein
                            Stein ist. Schiefer und viele Sandsteine sind vergleichsweise weich, bestehen aber überwiegend aus Silikaten.
                            Marmor ist weicher als Granit und zugleich säureempfindlich – aus zwei verschiedenen Gründen.
                        </p>
                    </div>

                    <ul className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {SUBPAGES.map((page) => {
                            const details = SUBPAGE_DETAILS[page.path];
                            const Icon = details ? details.icon : Layers;
                            return (
                                <li key={page.path}>
                                    <Link
                                        href={page.path}
                                        className="group glass-surface p-8 rounded-tile-2xl h-full flex flex-col hover:-translate-y-0.5 hover:border-orange-500/80 hover:shadow-[0_20px_40px_-12px_rgba(15,23,42,0.14)] transition-all duration-300"
                                    >
                                        <div className="flex items-center gap-3 mb-5">
                                            <span className="icon-chip w-12 h-12 text-orange-600">
                                                <Icon className="w-6 h-6" />
                                            </span>
                                            {details && <span className="eyebrow eyebrow-neutral">{details.group}</span>}
                                        </div>
                                        <h3 className="font-black text-xl text-slate-900 mb-2 group-hover:text-orange-700 transition-colors">
                                            {page.name}
                                        </h3>
                                        <p className="text-sm text-slate-700 leading-relaxed mb-4">{page.desc}</p>
                                        {details && (
                                            <ul className="space-y-2 mb-6">
                                                {details.points.map((point) => (
                                                    <li key={point} className="flex gap-2 text-sm text-slate-700">
                                                        <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" aria-hidden="true" />
                                                        {point}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                        <span className="mt-auto inline-flex items-center gap-1 text-sm font-bold text-orange-700">
                                            Details ansehen
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                        </span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </section>

            {/* Areas */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10" aria-labelledby="naturstein-bereiche-heading">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <span className="eyebrow eyebrow-orange mb-4">Einsatzbereiche</span>
                    <h2 id="naturstein-bereiche-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                        Böden, Wände, Treppen, außen
                    </h2>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {AREAS.map((area) => {
                        const Icon = area.icon;
                        return (
                            <li key={area.title} className="glass-surface p-7 rounded-tile-2xl flex flex-col">
                                <span className="icon-chip w-11 h-11 mb-4 text-orange-600">
                                    <Icon className="w-5 h-5" />
                                </span>
                                <h3 className="font-black text-base text-slate-900 mb-2">{area.title}</h3>
                                <p className="text-sm text-slate-700 leading-relaxed">{area.text}</p>
                                {area.href && (
                                    <Link
                                        href={area.href}
                                        className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-orange-700 hover:text-orange-600 hover:underline underline-offset-2"
                                    >
                                        {area.linkLabel}
                                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                                    </Link>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </section>

            {/* Laying */}
            <section className="py-20 bg-white border-y border-slate-200 relative z-10" aria-labelledby="naturstein-verlegung-heading">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <span className="eyebrow eyebrow-orange mb-4">
                            <Layers className="w-3.5 h-3.5 text-orange-600" />
                            Verlegung
                        </span>
                        <h2 id="naturstein-verlegung-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            Verfärbungsfreie Kleber und das passende Mörtelbett
                        </h2>
                    </div>
                    <ol className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {LAYING.map((item, index) => (
                            <li key={item.title} className="flex gap-5 p-7 rounded-tile-xl bg-slate-50 border border-slate-200">
                                <span className="font-display text-4xl font-black tabular-nums text-orange-500/30 leading-none" aria-hidden="true">
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                                <div>
                                    <h3 className="font-black text-base text-slate-900 mb-2">{item.title}</h3>
                                    <p className="text-sm text-slate-700 leading-relaxed">{item.text}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* Impregnation & care */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10" aria-labelledby="naturstein-pflege-heading">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                    <div className="lg:col-span-2">
                        <span className="eyebrow eyebrow-orange mb-4">
                            <SprayCan className="w-3.5 h-3.5 text-orange-600" />
                            Schutz &amp; Pflege
                        </span>
                        <h2 id="naturstein-pflege-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            Imprägnierung und Pflege im Überblick
                        </h2>
                        <p className="mt-4 text-base text-slate-700 leading-relaxed">
                            Eine gute Pflege entscheidet darüber, wie ein Natursteinboden nach Jahren aussieht. Ob eine Imprägnierung für
                            Ihren Stein sinnvoll ist und welches Mittel passt, besprechen wir bei der Planung.
                        </p>
                        <div className="mt-6 flex gap-3 rounded-tile-lg bg-amber-50 border border-amber-200 p-5 text-sm text-slate-700 leading-relaxed">
                            <TriangleAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" aria-hidden="true" />
                            <p>
                                <strong className="text-amber-800">Bei Marmor, Travertin und Kalkstein</strong> gilt zusätzlich: keine
                                Säure, auch keine Kalk- oder Essigreiniger. Mehr dazu auf der Seite{' '}
                                <Link href="/naturstein/marmor-kalkstein" className="font-bold text-orange-700 hover:text-orange-600 hover:underline underline-offset-2">
                                    Marmor, Travertin &amp; Kalkstein
                                </Link>
                                .
                            </p>
                        </div>
                    </div>
                    <ul className="lg:col-span-3 space-y-4">
                        {CARE.map((item) => (
                            <li key={item.title} className="flex gap-4 rounded-tile-lg bg-white border border-slate-200 p-5">
                                <Droplets className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" aria-hidden="true" />
                                <p className="text-sm text-slate-700 leading-relaxed">
                                    <strong className="text-slate-900">{item.title}:</strong> {item.text}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* CTA + further reading */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" aria-labelledby="naturstein-cta-heading">
                <div className="ceramic-hero rounded-tile-2xl p-8 sm:p-12 text-center space-y-4 relative overflow-hidden">
                    <span className="eyebrow eyebrow-orange">Beratung &amp; Aufmaß</span>
                    <h2 id="naturstein-cta-heading" className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 leading-tight">
                        Beratung und Aufmaß für Ihren Naturstein
                    </h2>
                    <p className="text-sm sm:text-base text-slate-700 max-w-3xl mx-auto leading-relaxed">
                        {COMPANY_DATA.owner.fullName} prüft vor Ort Untergrund, Aufbauhöhen und Einsatzbereich und sagt Ihnen
                        ehrlich, ob Ihr Wunschstein dazu passt – oder ob eine Alternative die bessere Wahl ist.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
                        <Link href="/kontakt" className="btn-primary px-7 py-3.5 text-xs group">
                            Aufmaß anfragen
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                        <a href={`tel:${COMPANY_DATA.contact.phoneLink}`} className="btn-ghost px-7 py-3.5 text-xs">
                            <Phone className="w-4 h-4 text-orange-600" />
                            {COMPANY_DATA.contact.phone}
                        </a>
                        <a
                            href={COMPANY_DATA.contact.whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="glass-button-whatsapp px-7 py-3.5 text-xs"
                        >
                            <MessageCircle className="w-4 h-4" />
                            WhatsApp
                        </a>
                    </div>
                </div>

                <nav className="mt-10 glass-surface rounded-tile-2xl p-7" aria-labelledby="naturstein-ratgeber-heading">
                    <h2 id="naturstein-ratgeber-heading" className="flex items-center gap-2 font-black text-base text-slate-900 mb-4">
                        <BookOpen className="w-5 h-5 text-orange-600" aria-hidden="true" />
                        Weiterführende Ratgeber zu Naturstein &amp; Granit
                    </h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {FURTHER_READING.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className="inline-flex items-center gap-1.5 text-sm font-bold text-orange-700 hover:text-orange-600 hover:underline underline-offset-2"
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
