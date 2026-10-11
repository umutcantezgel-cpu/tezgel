import React from 'react';
import Link from 'next/link';
import KernIcon from '@/components/icons/Icon';
import { Maximize2, Thermometer, Trees, Layers, ChefHat, DoorOpen, LayoutGrid, Hammer, Wrench, Building2, Sliders, ClipboardCheck, FileText, Ruler } from '@/components/icons/ersatz';
import { COMPANY_DATA } from '@/config/company';
import { RATING_SUMMARY } from '@/config/reviews';
import { TOPIC_HUBS } from '@/config/topics';
import { createMetadata } from '@/lib/metadata';
import FliesenKonfigurator from '@/components/funnels/FliesenKonfigurator';
import QualityPromise from '@/components/sections/QualityPromise';
import { FinalCTA } from '@/components/ui/FinalCTA';

export const metadata = createMetadata({
    title: 'Fliesenverlegung & Ratgeber | Fliesenleger Tezgel',
    description:
        'Ratgeber & Fachwissen zur Fliesenverlegung: Großformate, Feinsteinzeug, Holzoptik & Verlegetechniken vom Fliesenleger-Fachbetrieb Tezgel in Hessen.',
    path: '/fliesen'
});

const FLIESEN_HUB = TOPIC_HUBS.find((hub) => hub.id === 'fliesen');
const HUB_PAGES = FLIESEN_HUB ? FLIESEN_HUB.pages.filter((page) => page.path !== FLIESEN_HUB.path) : [];
const OTHER_HUBS = TOPIC_HUBS.filter((hub) => hub.id !== 'fliesen');

// Icons for the subpages of this hub (fallback: LayoutGrid for pages added later).
const PAGE_ICONS = {
    '/fliesen/grossformat': Maximize2,
    '/fliesen/auf-fussbodenheizung': Thermometer,
    '/fliesen/holzoptik': Trees,
    '/fliesen/fliesenarten': Layers,
    '/fliesen/kueche': ChefHat,
    '/fliesen/flur-diele': DoorOpen,
    '/fliesen/verlegemuster': LayoutGrid,
    '/fliesen/verlegetechnik': Hammer,
    '/fliesen/renovierung': Wrench,
    '/fliesen/neubau': Building2,
    '/fliesen/fugensanierung': Sliders,
    '/fliesen/abnahme': ClipboardCheck,
    '/fliesen/festpreisangebot': FileText,
    '/fliesen/konfigurator': Ruler
};

const GUIDE_SECTIONS = [
    {
        id: 'raeume',
        eyebrow: 'Räume',
        title: 'Wohnbereich, Küche, Flur und Diele – worauf es jeweils ankommt',
        text: 'Jeder Raum stellt andere Anforderungen an den Belag. Im Wohnbereich zählen ruhige Flächen und saubere Übergänge, in der Küche Fleck- und Fettbeständigkeit sowie belastbare Fugen, im Flur Abriebfestigkeit, Schmutzfang und Trittsicherheit bei nassen Schuhen. Wer mehrere Räume in einem Zug belegt, plant Fugenachsen und Verlegerichtung über die Türen hinweg.',
        links: [
            { label: 'Küche fliesen', href: '/fliesen/kueche' },
            { label: 'Flur & Diele fliesen', href: '/fliesen/flur-diele' },
            { label: 'Fugenachsen über mehrere Räume', href: '/fliesen/verlegemuster' }
        ]
    },
    {
        id: 'neubau-bestand',
        eyebrow: 'Neubau oder Bestand',
        title: 'Zwei Ausgangslagen, zwei Abläufe',
        text: 'Im Neubau ist der Fliesenleger ein Glied im Bauablauf: Estrich, Putz und Installation müssen fertig sein, der Estrich belegreif. Im bewohnten Bestand geht es um Etappen, Räumung, Staubschutz und die Frage, ob alte Fliesen bleiben können oder zurückgebaut werden. Beide Wege beginnen mit einem Aufmaß und einer Prüfung des Untergrunds.',
        links: [
            { label: 'Fliesen im Neubau', href: '/fliesen/neubau' },
            { label: 'Renovierung im Bestand', href: '/fliesen/renovierung' },
            { label: 'Estrich & Belegreife', href: '/untergrund-abdichtung/estrich-belegreife' }
        ]
    },
    {
        id: 'formate',
        eyebrow: 'Formate & Materialien',
        title: 'Feinsteinzeug, Holzoptik, XXL-Großformate',
        text: 'Feinsteinzeug ist dicht, frostbeständig und für fast alle Bereiche geeignet – vom Wohnzimmer bis zur Terrasse. Holzoptik-Dielen verbinden Dielencharakter mit keramischer Pflegeleichtigkeit, Großformate schaffen fugenarme, ruhige Flächen. Je größer und länger das Format, desto höher die Anforderungen an Ebenheit, Bettung und Handling.',
        links: [
            { label: 'Fliesenarten im Vergleich', href: '/fliesen/fliesenarten' },
            { label: 'Fliesen in Holzoptik', href: '/fliesen/holzoptik' },
            { label: 'XXL-Großformate', href: '/fliesen/grossformat' }
        ]
    },
    {
        id: 'technik',
        eyebrow: 'Verlegetechnik',
        title: 'Verlegetechnik, Verlegemuster und saubere Abschlüsse',
        text: 'Ein dauerhafter Belag entsteht aus dem Zusammenspiel von Untergrund, Kleber, Bettung und Fugen. Das Verlegemuster bestimmt Raumwirkung und Verschnitt, Sockel, Gehrungskanten und Profile entscheiden über den fertigen Eindruck. Auf Fußbodenheizung kommen verformbare Kleber und ein durchdachter Fugenplan hinzu.',
        links: [
            { label: 'Verlegetechnik & Werkstoffe', href: '/fliesen/verlegetechnik' },
            { label: 'Verlegemuster & Abschlüsse', href: '/fliesen/verlegemuster' },
            { label: 'Fliesen auf Fußbodenheizung', href: '/fliesen/auf-fussbodenheizung' }
        ]
    },
    {
        id: 'planung',
        eyebrow: 'Planung & Qualität',
        title: 'Konfigurator, Angebot verstehen, Abnahme',
        text: 'Mit dem Fliesen-Konfigurator bereiten Sie Ihr Projekt strukturiert vor und erhalten einen Richtwert für den Materialbedarf. Das verbindliche Festpreisangebot entsteht erst nach dem kostenfreien Vor-Ort-Aufmaß. Bei der Abnahme prüfen wir gemeinsam Ebenheit, Fugenbild und Anschlüsse – und bei älteren Flächen hilft oft schon eine Fugensanierung.',
        links: [
            { label: 'Fliesen-Konfigurator', href: '/fliesen/konfigurator' },
            { label: 'Festpreisangebot verstehen', href: '/fliesen/festpreisangebot' },
            { label: 'Abnahme & Qualität', href: '/fliesen/abnahme' },
            { label: 'Fugensanierung', href: '/fliesen/fugensanierung' }
        ]
    }
];

const WEITERLESEN = [
    { label: 'Feinsteinzeug oder Naturstein?', href: '/blog/feinsteinzeug-oder-naturstein-vergleich' },
    { label: 'Rutschfeste Fliesen: R-Klassen erklärt', href: '/blog/rutschfeste-fliesen-r-klassen' },
    { label: 'Fliesen richtig reinigen und pflegen', href: '/blog/fliesen-reinigen-pflegen' },
    { label: 'Referenzen ansehen', href: '/referenzen' }
];

export default function FliesenRatgeberPage() {
    const google = RATING_SUMMARY.google;

    return (
        <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">

            {/* Hero */}
            <section className="max-w-seite mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10" aria-labelledby="fliesen-hub-heading">
                <div className="border border-fuge bg-fliese p-8 sm:p-12 text-center space-y-4 relative overflow-hidden">
                    <span className="inline-flex items-center gap-2 font-mono text-fs-1 text-tinte-2">
                        <KernIcon name="dokument" groesse={4} />
                        Fliesen-Ratgeber &middot; Gegründet {COMPANY_DATA.business.establishmentYear} &middot; Fachbetrieb ({COMPANY_DATA.authority.shortName})
                    </span>
                    <h1 id="fliesen-hub-heading" className="text-fs-7 text-tinte">
                        Fliesen-Ratgeber:{' '}
                        <span>Formate, Räume und Verlegetechnik</span>{' '}
                        verständlich erklärt
                    </h1>
                    <p className="text-fs-3 text-tinte-2 max-w-mass mx-auto">
                        In unserem Fliesen-Ratgeber erklären wir Formate, Räume, Material und Verlegetechnik verständlich aus der Praxis. Welche Fliese passt in welchen Raum, was verlangen Großformate vom Untergrund und woran erkennen Sie eine saubere Verlegung? Hier bündeln wir das Fachwissen aus unserem Alltag als Fachbetrieb Fliesen Tezgel – damit Sie Ihre Möglichkeiten kennen, bevor Sie anfragen.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                        <Link href="/fliesen/konfigurator" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-none px-6 py-3 font-text text-fs-2 font-semibold no-underline transition-colors dauer-1 ease-setzen motion-safe:active:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 border border-tinte bg-tinte text-kalk hover:border-tinte-2 hover:bg-tinte-2 group">
                            Projekt im Konfigurator vorbereiten
                            <KernIcon name="pfeil-rechts" groesse={4} />
                        </Link>
                        <Link href="/leistungen/wohnen" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-none px-6 py-3 font-text text-fs-2 font-semibold no-underline transition-colors dauer-1 ease-setzen motion-safe:active:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 border border-strich bg-fliese text-tinte hover:border-tinte">
                            Leistung: Wohnbereiche &amp; Neubau
                        </Link>
                    </div>
                </div>
            </section>

            {/* All subpages */}
            <section className="max-w-seite mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10" aria-labelledby="fliesen-themen-heading">
                <div className="text-center max-w-mass mx-auto mb-12">
                    <span className="inline-flex items-center gap-2 font-mono text-fs-1 text-tinte-2 mb-4">Alle Themen</span>
                    <h2 id="fliesen-themen-heading" className="text-fs-6 text-tinte">
                        {FLIESEN_HUB ? FLIESEN_HUB.name : 'Fliesen & Verlegung'}{' '}
                        <span>im Überblick</span>
                    </h2>
                    {FLIESEN_HUB && (
                        <p className="mt-3 text-fs-3 text-tinte-2">{FLIESEN_HUB.description}.</p>
                    )}
                </div>

                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {HUB_PAGES.map((page) => {
                        const Icon = PAGE_ICONS[page.path] || LayoutGrid;
                        return (
                            <li key={page.path}>
                                <Link
                                    href={page.path}
                                    className="group border border-fuge bg-fliese h-full p-6 flex items-start gap-4 hover:border-strich transition-colors dauer-2"
                                >
                                    <span className="flex-1">
                                        <span className="block font-semibold text-fs-3 text-tinte group-hover:text-laser-tief transition-colors">
                                            {page.name}
                                        </span>
                                        <span className="block mt-1 text-fs-2 text-tinte-2">{page.desc}</span>
                                    </span>
                                    <KernIcon name="pfeil-rechts" groesse={4} className="mt-1 text-laser-tief" />
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </section>

            {/* Guide sections */}
            <section className="py-24 bg-fliese border-y border-fuge relative z-10" aria-labelledby="fliesen-wissen-heading">
                <div className="max-w-seite mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-mass mx-auto mb-16">
                        <span className="inline-flex items-center gap-2 font-mono text-fs-1 text-tinte-2 mb-4">Wissen kompakt</span>
                        <h2 id="fliesen-wissen-heading" className="text-fs-6 text-tinte">
                            Vom Raum bis zur Abnahme:{' '}
                            <span>die wichtigsten Weichen</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {GUIDE_SECTIONS.map((section) => (
                            <article
                                key={section.id}
                                aria-labelledby={`guide-${section.id}`}
                                className="p-8 sm:p-8 bg-kalk border border-fuge hover:bg-fliese hover:border-strich transition-colors dauer-2"
                            >
                                <span className="block text-fs-1 font-semibold text-laser-tief mb-2">
                                    {section.eyebrow}
                                </span>
                                <h3 id={`guide-${section.id}`} className="text-fs-4 text-tinte mb-3">
                                    {section.title}
                                </h3>
                                <p className="text-fs-2 text-tinte-2">{section.text}</p>
                                <ul className="mt-6 flex flex-wrap gap-2">
                                    {section.links.map((link) => (
                                        <li key={link.href}>
                                            <Link
                                                href={link.href}
                                                className="inline-flex items-center gap-1 bg-kalk border border-strich text-laser-tief hover:text-laser-tief hover:border-strich px-4 py-2 text-fs-1 font-semibold transition-colors"
                                            >
                                                {link.label}
                                                <KernIcon name="pfeil-rechts" groesse={4} />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </article>
                        ))}

                        {/* Bad */}
                        <article
                            aria-labelledby="guide-bad"
                            className="p-8 sm:p-8 bg-kalk border border-fuge text-tinte-2"
                        >
                            <span className="block text-fs-1 font-semibold text-laser-tief mb-2">
                                Bad, Dusche &amp; Gäste-WC
                            </span>
                            <h3 id="guide-bad" className="text-fs-4 text-tinte mb-3">
                                Badsanierung hat einen eigenen Bereich
                            </h3>
                            <p className="text-fs-2">
                                Rund ums Bad – Walk-In-Dusche, Abdichtung nach DIN 18534, Fliesen im Nassbereich, Gäste-WC – finden
                                Sie alles gesammelt im Bad-Bereich. Dieser Ratgeber konzentriert sich auf die übrigen Räume und die
                                Verlegetechnik.
                            </p>
                            <ul className="mt-6 flex flex-wrap gap-2">
                                {[
                                    { label: 'Zum Bad-Bereich', href: '/bad' },
                                    { label: 'Fliesen im Bad', href: '/bad/fliesen' },
                                    { label: 'Gäste-WC fliesen', href: '/blog/gaeste-wc-fliesen' }
                                ].map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="inline-flex items-center gap-1 bg-fliese border border-fuge text-tinte hover:border-strich px-4 py-2 text-fs-1 font-semibold transition-colors"
                                        >
                                            {link.label}
                                            <KernIcon name="pfeil-rechts" groesse={4} />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </article>
                    </div>
                </div>
            </section>

            {/* Other topic hubs */}
            <section className="max-w-seite mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10" aria-labelledby="fliesen-weitere-heading">
                <div className="text-center max-w-mass mx-auto mb-12">
                    <span className="inline-flex items-center gap-2 font-mono text-fs-1 text-tinte-2 mb-4">Weitere Fachthemen</span>
                    <h2 id="fliesen-weitere-heading" className="text-fs-6 text-tinte">
                        Unter der Fliese und über das Wohnen hinaus
                    </h2>
                    <p className="mt-3 text-fs-3 text-tinte-2">
                        Ein Fliesenbelag ist nur so gut wie sein Untergrund. Diese Ratgeber-Bereiche vertiefen die angrenzenden Themen.
                    </p>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {OTHER_HUBS.map((hub) => (
                        <li key={hub.id}>
                            <Link
                                href={hub.path}
                                className="group border border-fuge bg-fliese h-full p-6 block hover:border-strich transition-colors dauer-2"
                            >
                                <span className="block font-semibold text-fs-3 text-tinte group-hover:text-laser-tief transition-colors">
                                    {hub.name}
                                </span>
                                <span className="block mt-1 text-fs-2 text-tinte-2">{hub.description}</span>
                                <span className="mt-3 inline-flex items-center gap-1 text-fs-1 font-semibold text-laser-tief">
                                    {hub.pages.length} {hub.pages.length === 1 ? 'Seite' : 'Seiten'}
                                    <KernIcon name="pfeil-rechts" groesse={4} />
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>

            {/* Link band to /leistungen/wohnen */}
            <section className="max-w-seite mx-auto px-4 sm:px-6 lg:px-8 pb-8 relative z-10" aria-labelledby="fliesen-projekt-heading">
                <div className="border border-fuge bg-fliese p-8 sm:p-12 relative overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
                        <div className="lg:col-span-3 space-y-4">
                            <span className="inline-flex items-center gap-2 font-mono text-fs-1 text-tinte-2">
                                Vom Ratgeber zum Projekt
                            </span>
                            <h2 id="fliesen-projekt-heading" className="text-fs-6 text-tinte">
                                Wohnbereiche, Küche, Flur und Neubau – ausgeführt vom Fachbetrieb
                            </h2>
                            <p className="text-fs-3 text-tinte-2">
                                Seit {COMPANY_DATA.business.establishmentYear} verlegt {COMPANY_DATA.legalName} Fliesen,
                                Platten und Naturstein. Der Betrieb ist eingetragener Fachbetrieb der {COMPANY_DATA.authority.name}. Sie
                                erhalten ein kostenfreies Vor-Ort-Aufmaß, danach ein verbindliches Festpreisangebot, und bei
                                Arbeiten im bewohnten Bestand gilt unsere Staubschutz-Garantie. Kundinnen und Kunden haben bei uns
                                vom einzelnen Raum bis zum kompletten Haus fliesen lassen.
                            </p>
                            <ul className="space-y-2 text-fs-2 text-tinte-2">
                                {[
                                    'Kostenfreies Vor-Ort-Aufmaß mit Prüfung des Untergrunds',
                                    'Verbindliche Festpreis-Kalkulation ohne versteckte Zusatzkosten',
                                    `Persönliche Betreuung durch ${COMPANY_DATA.owner.fullName}`
                                ].map((item) => (
                                    <li key={item} className="flex items-start gap-2">
                                        <KernIcon name="haken" groesse={4} className="mt-px text-laser-tief shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="lg:col-span-2 space-y-4">
                            <div className="border border-fuge bg-fliese p-6 text-center">
                                <span className="flex items-center justify-center gap-px text-laser-tief" aria-hidden="true">
                                    {Array.from({ length: 5 }, (_, i) => (
                                        <KernIcon name="stern" groesse={5} />
                                    ))}
                                </span>
                                <p className="mt-2 text-fs-6 font-semibold text-tinte tabular-nums">{google.displayRating}</p>
                                <p className="text-fs-2 text-tinte-2">
                                    aus {google.count} {google.label} (Stand {RATING_SUMMARY.asOf})
                                </p>
                            </div>
                            <div className="flex flex-col gap-3">
                                <Link href="/leistungen/wohnen" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-none px-6 py-3 font-text text-fs-2 font-semibold no-underline transition-colors dauer-1 ease-setzen motion-safe:active:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 border border-tinte bg-tinte text-kalk hover:border-tinte-2 hover:bg-tinte-2 w-full group">
                                    Zur Leistungsseite Wohnbereiche &amp; Neubau
                                    <KernIcon name="pfeil-rechts" groesse={4} />
                                </Link>
                                <a href={`tel:${COMPANY_DATA.contact.phoneLink}`} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-none px-6 py-3 font-text text-fs-2 font-semibold no-underline transition-colors dauer-1 ease-setzen motion-safe:active:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 border border-strich bg-fliese text-tinte hover:border-tinte w-full">
                                    <KernIcon name="telefon" groesse={4} className="text-tinte-2" />
                                    {COMPANY_DATA.contact.phone}
                                </a>
                                <a
                                    href={COMPANY_DATA.contact.whatsappLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full px-8 py-4 text-fs-1"
                                >
                                    <KernIcon name="sprechblase" groesse={4} />
                                    Fotos per WhatsApp senden
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Weiterführende Ratgeber */}
            <section className="max-w-seite mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10" aria-labelledby="fliesen-ratgeber-heading">
                <div className="p-6 sm:p-8">
                    <h2 id="fliesen-ratgeber-heading" className="text-fs-6 text-tinte mb-4">Weiterführende Ratgeber zur Fliesenverlegung</h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {WEITERLESEN.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className="inline-flex items-center gap-2 text-fs-2 font-semibold text-laser-tief hover:text-laser-tief hover:underline underline-offset-2"
                                >
                                    <KernIcon name="pfeil-rechts" groesse={4} />
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <p className="mt-4 text-fs-2 text-tinte-2">
                        Persönliche Beratung vor Ihrer Entscheidung?{' '}
                        <Link href="/beratung" className="font-semibold text-laser-tief hover:text-laser-tief hover:underline underline-offset-2">
                            Fachberatung anfragen
                        </Link>{' '}
                        oder unseren{' '}
                        <Link href="/blog" className="font-semibold text-laser-tief hover:text-laser-tief hover:underline underline-offset-2">
                            Fliesen-Ratgeber-Blog
                        </Link>{' '}
                        durchstöbern.
                    </p>
                </div>
            </section>

            {/* Konfigurator */}
            <section className="max-w-seite mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10 scroll-mt-28" id="konfigurator" aria-label="Fliesen-Konfigurator">
                <FliesenKonfigurator />
            </section>

            <QualityPromise />
            <FinalCTA />
        </div>
    );
}
