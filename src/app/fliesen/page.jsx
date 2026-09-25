import React from 'react';
import Link from 'next/link';
import {
    ArrowRight,
    Award,
    BookOpen,
    Building2,
    ChefHat,
    CheckCircle2,
    ClipboardCheck,
    DoorOpen,
    FileText,
    Hammer,
    Layers,
    LayoutGrid,
    Maximize2,
    MessageCircle,
    Phone,
    Ruler,
    Sliders,
    Star,
    Thermometer,
    Trees,
    Wrench
} from 'lucide-react';
import { COMPANY_DATA } from '@/config/company';
import { RATING_SUMMARY } from '@/config/reviews';
import { TOPIC_HUBS } from '@/config/topics';
import { createMetadata } from '@/lib/metadata';
import FliesenKonfigurator from '@/components/funnels/FliesenKonfigurator';
import QualityPromise from '@/components/sections/QualityPromise';

export const metadata = createMetadata({
    title: 'Fliesen-Ratgeber: Formate, Material & Verlegung',
    description:
        'Großformat, Holzoptik, Fliesenarten, Verlegemuster und Verlegetechnik: Der Ratgeber erklärt, worauf es bei Fliesen in Wohnraum, Küche, Flur und Neubau ankommt.',
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
            <div className="ambient-glow-orange -top-32 -left-32 opacity-70" />
            <div className="ambient-glow-warm top-96 -right-24 opacity-60" />

            {/* Hero */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10" aria-labelledby="fliesen-hub-heading">
                <div className="ceramic-hero rounded-tile-2xl p-8 sm:p-12 text-center space-y-4 relative overflow-hidden">
                    <span className="eyebrow">
                        <BookOpen className="w-3.5 h-3.5" />
                        Fliesen-Ratgeber &middot; Gegründet {COMPANY_DATA.business.establishmentYear} &middot; Fachbetrieb ({COMPANY_DATA.authority.shortName})
                    </span>
                    <h1 id="fliesen-hub-heading" className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                        Fliesen-Ratgeber:{' '}
                        <span className="text-ceramic-gradient">Formate, Räume und Verlegetechnik</span>{' '}
                        verständlich erklärt
                    </h1>
                    <p className="text-sm sm:text-base text-slate-700 max-w-3xl mx-auto leading-relaxed">
                        Welche Fliese passt in welchen Raum, was verlangen Großformate vom Untergrund, und woran erkennen Sie
                        eine saubere Verlegung? Hier bündeln wir das Fachwissen aus unserem Alltag als Fliesen-, Platten- und
                        Mosaikleger-Fachbetrieb – damit Sie Ihre Möglichkeiten kennen, bevor Sie anfragen.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
                        <Link href="/fliesen/konfigurator" className="btn-primary px-7 py-3.5 text-xs group">
                            Projekt im Konfigurator vorbereiten
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                        <Link href="/leistungen/wohnen" className="btn-ghost px-7 py-3.5 text-xs">
                            Leistung: Wohnbereiche &amp; Neubau
                        </Link>
                    </div>
                </div>
            </section>

            {/* All subpages */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10" aria-labelledby="fliesen-themen-heading">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <span className="eyebrow eyebrow-orange mb-4">Alle Themen</span>
                    <h2 id="fliesen-themen-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                        {FLIESEN_HUB ? FLIESEN_HUB.name : 'Fliesen & Verlegung'}{' '}
                        <span className="text-ceramic-gradient">im Überblick</span>
                    </h2>
                    {FLIESEN_HUB && (
                        <p className="mt-3 text-base text-slate-700 leading-relaxed">{FLIESEN_HUB.description}.</p>
                    )}
                </div>

                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {HUB_PAGES.map((page) => {
                        const Icon = PAGE_ICONS[page.path] || LayoutGrid;
                        return (
                            <li key={page.path}>
                                <Link
                                    href={page.path}
                                    className="group glass-surface h-full p-6 rounded-tile-lg flex items-start gap-4 hover:-translate-y-0.5 hover:border-orange-500/80 hover:shadow-[0_20px_40px_-12px_rgba(15,23,42,0.14)] transition-all duration-300"
                                >
                                    <span className="icon-chip w-11 h-11 shrink-0">
                                        <Icon className="w-5 h-5" />
                                    </span>
                                    <span className="flex-1">
                                        <span className="block font-black text-base text-slate-900 group-hover:text-orange-600 transition-colors">
                                            {page.name}
                                        </span>
                                        <span className="block mt-1 text-sm text-slate-700 leading-relaxed">{page.desc}</span>
                                    </span>
                                    <ArrowRight className="w-4 h-4 mt-1 text-orange-600 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </section>

            {/* Guide sections */}
            <section className="py-20 bg-white border-y border-slate-200 relative z-10" aria-labelledby="fliesen-wissen-heading">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-14">
                        <span className="eyebrow mb-4">Wissen kompakt</span>
                        <h2 id="fliesen-wissen-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            Vom Raum bis zur Abnahme:{' '}
                            <span className="text-ceramic-gradient">die wichtigsten Weichen</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {GUIDE_SECTIONS.map((section) => (
                            <article
                                key={section.id}
                                aria-labelledby={`guide-${section.id}`}
                                className="p-7 sm:p-8 rounded-tile-xl bg-slate-50 border border-slate-200 hover:bg-white hover:border-orange-500/80 transition-all duration-300"
                            >
                                <span className="block text-[11px] font-black uppercase tracking-widest text-orange-600 mb-2">
                                    {section.eyebrow}
                                </span>
                                <h3 id={`guide-${section.id}`} className="text-xl font-black text-slate-900 mb-3 leading-snug">
                                    {section.title}
                                </h3>
                                <p className="text-sm text-slate-700 leading-relaxed">{section.text}</p>
                                <ul className="mt-5 flex flex-wrap gap-2">
                                    {section.links.map((link) => (
                                        <li key={link.href}>
                                            <Link
                                                href={link.href}
                                                className="inline-flex items-center gap-1 rounded-tile-pill bg-orange-50 border border-orange-200 text-orange-700 hover:text-orange-800 hover:border-orange-500/80 px-3.5 py-1.5 text-xs font-bold transition-colors"
                                            >
                                                {link.label}
                                                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </article>
                        ))}

                        {/* Bad */}
                        <article
                            aria-labelledby="guide-bad"
                            className="p-7 sm:p-8 rounded-tile-xl bg-slate-50 border border-slate-200 text-slate-700"
                        >
                            <span className="block text-[11px] font-black uppercase tracking-widest text-orange-600 mb-2">
                                Bad, Dusche &amp; Gäste-WC
                            </span>
                            <h3 id="guide-bad" className="text-xl font-black text-slate-900 mb-3 leading-snug">
                                Badsanierung hat einen eigenen Bereich
                            </h3>
                            <p className="text-sm leading-relaxed">
                                Rund ums Bad – Walk-In-Dusche, Abdichtung nach DIN 18534, Fliesen im Nassbereich, Gäste-WC – finden
                                Sie alles gesammelt im Bad-Bereich. Dieser Ratgeber konzentriert sich auf die übrigen Räume und die
                                Verlegetechnik.
                            </p>
                            <ul className="mt-5 flex flex-wrap gap-2">
                                {[
                                    { label: 'Zum Bad-Bereich', href: '/bad' },
                                    { label: 'Fliesen im Bad', href: '/bad/fliesen' },
                                    { label: 'Gäste-WC fliesen', href: '/blog/gaeste-wc-fliesen' }
                                ].map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="inline-flex items-center gap-1 rounded-tile-pill bg-white border border-slate-200 text-slate-900 hover:border-orange-500 px-3.5 py-1.5 text-xs font-bold transition-colors"
                                        >
                                            {link.label}
                                            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </article>
                    </div>
                </div>
            </section>

            {/* Other topic hubs */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10" aria-labelledby="fliesen-weitere-heading">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <span className="eyebrow eyebrow-neutral mb-4">Weitere Fachthemen</span>
                    <h2 id="fliesen-weitere-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                        Unter der Fliese und über das Wohnen hinaus
                    </h2>
                    <p className="mt-3 text-base text-slate-700 leading-relaxed">
                        Ein Fliesenbelag ist nur so gut wie sein Untergrund. Diese Ratgeber-Bereiche vertiefen die angrenzenden Themen.
                    </p>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {OTHER_HUBS.map((hub) => (
                        <li key={hub.id}>
                            <Link
                                href={hub.path}
                                className="group glass-surface h-full p-6 rounded-tile-lg block hover:-translate-y-0.5 hover:border-orange-500/80 hover:shadow-[0_20px_40px_-12px_rgba(15,23,42,0.14)] transition-all duration-300"
                            >
                                <span className="block font-black text-base text-slate-900 group-hover:text-orange-600 transition-colors">
                                    {hub.name}
                                </span>
                                <span className="block mt-1 text-sm text-slate-700 leading-relaxed">{hub.description}</span>
                                <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-orange-600">
                                    {hub.pages.length} {hub.pages.length === 1 ? 'Seite' : 'Seiten'}
                                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>

            {/* Link band to /leistungen/wohnen */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 relative z-10" aria-labelledby="fliesen-projekt-heading">
                <div className="ceramic-hero rounded-tile-2xl p-8 sm:p-12 relative overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
                        <div className="lg:col-span-3 space-y-4">
                            <span className="eyebrow">
                                <Award className="w-3.5 h-3.5" />
                                Vom Ratgeber zum Projekt
                            </span>
                            <h2 id="fliesen-projekt-heading" className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                                Wohnbereiche, Küche, Flur und Neubau – ausgeführt vom Fachbetrieb
                            </h2>
                            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                                Seit {COMPANY_DATA.business.establishmentYear} verlegt {COMPANY_DATA.legalName} Fliesen,
                                Platten und Naturstein. Der Betrieb ist eingetragener Fachbetrieb der {COMPANY_DATA.authority.name}. Sie
                                erhalten ein kostenfreies Vor-Ort-Aufmaß, danach ein verbindliches Festpreisangebot, und bei
                                Arbeiten im bewohnten Bestand gilt unsere Staubschutz-Garantie. Kundinnen und Kunden haben bei uns
                                vom einzelnen Raum bis zum kompletten Haus fliesen lassen.
                            </p>
                            <ul className="space-y-2 text-sm text-slate-700">
                                {[
                                    'Kostenfreies Vor-Ort-Aufmaß mit Prüfung des Untergrunds',
                                    'Verbindliche Festpreis-Kalkulation ohne versteckte Zusatzkosten',
                                    `Persönliche Betreuung durch ${COMPANY_DATA.owner.fullName}`
                                ].map((item) => (
                                    <li key={item} className="flex items-start gap-2">
                                        <CheckCircle2 className="w-4 h-4 mt-0.5 text-orange-600 shrink-0" aria-hidden="true" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="lg:col-span-2 space-y-4">
                            <div className="glass-surface rounded-tile-xl p-6 text-center">
                                <span className="flex items-center justify-center gap-0.5 text-amber-500" aria-hidden="true">
                                    {Array.from({ length: 5 }, (_, i) => (
                                        <Star key={i} className="w-5 h-5 fill-current" />
                                    ))}
                                </span>
                                <p className="mt-2 text-3xl font-black text-slate-900 tabular-nums">{google.displayRating}</p>
                                <p className="text-sm text-slate-700">
                                    aus {google.count} {google.label} (Stand {RATING_SUMMARY.asOf})
                                </p>
                            </div>
                            <div className="flex flex-col gap-3">
                                <Link href="/leistungen/wohnen" className="btn-primary w-full px-7 py-3.5 text-xs group">
                                    Zur Leistungsseite Wohnbereiche &amp; Neubau
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                </Link>
                                <a href={`tel:${COMPANY_DATA.contact.phoneLink}`} className="btn-ghost w-full px-7 py-3.5 text-xs">
                                    <Phone className="w-4 h-4 text-slate-700" />
                                    {COMPANY_DATA.contact.phone}
                                </a>
                                <a
                                    href={COMPANY_DATA.contact.whatsappLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="glass-button-whatsapp w-full px-7 py-3.5 text-xs"
                                >
                                    <MessageCircle className="w-4 h-4" />
                                    Fotos per WhatsApp senden
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Weiterlesen */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10" aria-labelledby="fliesen-weiterlesen-heading">
                <div className="glass-surface-subtle rounded-tile-xl p-6 sm:p-8">
                    <h2 id="fliesen-weiterlesen-heading" className="text-lg font-black text-slate-900 mb-4">Weiterlesen</h2>
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
                        Persönliche Beratung vor Ihrer Entscheidung?{' '}
                        <Link href="/beratung" className="font-bold text-orange-600 hover:text-orange-700 hover:underline underline-offset-2">
                            Beratung anfragen
                        </Link>{' '}
                        oder den{' '}
                        <Link href="/blog" className="font-bold text-orange-600 hover:text-orange-700 hover:underline underline-offset-2">
                            Blog
                        </Link>{' '}
                        durchstöbern.
                    </p>
                </div>
            </section>

            {/* Konfigurator */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10 scroll-mt-28" id="konfigurator" aria-label="Fliesen-Konfigurator">
                <FliesenKonfigurator />
            </section>

            <QualityPromise />
        </div>
    );
}
