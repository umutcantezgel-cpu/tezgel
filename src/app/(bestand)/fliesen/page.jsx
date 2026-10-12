// Fliesen-Ratgeber (E3-BAU-06, KERN v2): Erzählansicht nach dem Muster der Startseite und der Leistungen. Einstieg mit
// Laserachse, H1 links, Vorspann und zwei Knöpfe; rechts der Verband-Umschalter (E3-ORCH-04). Danach die Leitachse über
// die Abschnitte: Themen und Nachbarthemen als Register, Wissen als Feldraster mit gezeichnetem Verlegeplan, Etikett,
// Überschrift, Text und Links (unter md als Aufklapper), Projekt seitlich mit Merkmalen, Bewertung und drei Wegen,
// Weiterführende Ratgeber als Merkliste, Konfigurator mit Rückfrage in der Spalte daneben. Anfragewege und der Konfigurator
// werden nachgeladen (Tempo). Wortlaut, Überschriften, Links und IDs wie im Bestand. Kein Auftritt und kein großer Moment;
// den Verband-Umschalter setzt der Orchestrator.
import Link from 'next/link';
import dynamic from 'next/dynamic';
import FormularPlatzhalter from '@/components/funnels/TezgelAnfrageFunnel/Platzhalter';
import clsx from 'clsx';
import { COMPANY_DATA } from '@/config/company';
import { RATING_SUMMARY } from '@/config/reviews';
import { TOPIC_HUBS } from '@/config/topics';
import { createMetadata } from '@/lib/metadata';
import Icon from '@/components/icons/Icon';
import QualityPromise from '@/components/sections/QualityPromise';
import { FinalCTA } from '@/components/ui/FinalCTA';
import WhatsAppLogo from '@/components/ui/WhatsAppLogo';
import Abschnitt from '@/components/kern/Abschnitt';
import Einstieg from '@/components/kern/Einstieg';
import Planblatt, { planfelder } from '@/components/kern/Planblatt';
import { Feld, Feldraster } from '@/components/kern/Feldraster';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import Knopf from '@/components/kern/Knopf';
import Leitachse from '@/components/kern/Leitachse';
import Merkliste from '@/components/kern/Merkliste';
import Rueckfrage from '@/components/kern/Rueckfrage';
import Verlegeplan from '@/components/kern/Verlegeplan';
import VerbandUmschalter from '@/components/kern/VerbandUmschalter';
import { etikettKlassen, linkKlassen } from '@/components/kern/stile';

// Konfigurator nachladen (Tempo, wie auf der Startseite und den Leistungsseiten); ID #konfigurator liegt am Abschnitt
const FliesenKonfigurator = dynamic(() => import('@/components/funnels/FliesenKonfigurator'), {
    loading: () => <FormularPlatzhalter />,
});

export const metadata = createMetadata({
    title: 'Fliesenverlegung & Ratgeber | Fliesenleger Tezgel',
    description:
        'Ratgeber & Fachwissen zur Fliesenverlegung: Großformate, Feinsteinzeug, Holzoptik & Verlegetechniken vom Fliesenleger-Fachbetrieb Tezgel in Hessen.',
    path: '/fliesen'
});

const FLIESEN_HUB = TOPIC_HUBS.find((hub) => hub.id === 'fliesen');
const HUB_PAGES = FLIESEN_HUB ? FLIESEN_HUB.pages.filter((page) => page.path !== FLIESEN_HUB.path) : [];
const OTHER_HUBS = TOPIC_HUBS.filter((hub) => hub.id !== 'fliesen');

// Zeile des Registers: Name links, Beschreibung daneben, Pfeil am Rand; Trefferfläche 48 px
const ZEILE = 'group flex min-h-12 items-center gap-4 px-3 py-4 pointer-fine:hover:bg-fliese active:bg-fliese';
// Name in der Zeile: Unterstrich erscheint beim Überfahren
const NAME = 'font-text text-fs-3 font-semibold text-tinte md:w-1/3 md:shrink-0 decoration-1 underline-offset-4 decoration-tinte pointer-fine:group-hover:underline group-active:underline';
// Verlegeplan im Feldkopf: kleine Zeichnung, halbe Feldbreite mobil, ein Drittel ab lg; feste Höhe h-32 (Flucht der
// Etiketten und Überschriften in der Zeile, auch bei verschiedenen Plan-Seitenverhältnissen); dekorativ, ohne Achse
const PLAN_BREITE = 'h-32 w-1/2 lg:w-1/3';

const GUIDE_SECTIONS = [
    {
        id: 'raeume',
        plan: 'wohnen',
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
        plan: 'untergrund',
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
        plan: 'grossformat',
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
        plan: 'fussbodenheizung',
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
        plan: 'fugen',
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

// Bad-Feld: Text und Etikett als JSX wie im Bestand; Verweis auf den eigenen Bereich
const BAD_FELD = {
    id: 'bad',
    plan: 'bad',
    eyebrow: <>Bad, Dusche &amp; Gäste-WC</>,
    title: <>Badsanierung hat einen eigenen Bereich</>,
    text: (
        <>
            Rund ums Bad – Walk-In-Dusche, Abdichtung nach DIN 18534, Fliesen im Nassbereich, Gäste-WC – finden Sie alles gesammelt im
            Bad-Bereich. Dieser Ratgeber konzentriert sich auf die übrigen Räume und die Verlegetechnik.
        </>
    ),
    links: [
        { label: 'Zum Bad-Bereich', href: '/bad' },
        { label: 'Fliesen im Bad', href: '/bad/fliesen' },
        { label: 'Gäste-WC fliesen', href: '/blog/gaeste-wc-fliesen' }
    ]
};

const WISSEN_FELDER = [...GUIDE_SECTIONS, BAD_FELD];

const WEITERLESEN = [
    { label: 'Feinsteinzeug oder Naturstein?', href: '/blog/feinsteinzeug-oder-naturstein-vergleich' },
    { label: 'Rutschfeste Fliesen: R-Klassen erklärt', href: '/blog/rutschfeste-fliesen-r-klassen' },
    { label: 'Fliesen richtig reinigen und pflegen', href: '/blog/fliesen-reinigen-pflegen' },
    { label: 'Referenzen ansehen', href: '/referenzen' }
];

// Text und Links eines Wissensfelds; im Aufklapper (unter md) mit Abstand nach der Zusammenfassung
function FeldText({ text, links, aufklappe = false }) {
    return (
        <>
            <p className="mt-3 max-w-mass font-text text-fs-3 text-tinte-2">{text}</p>
            <ul className={clsx('mt-auto grid gap-1', aufklappe ? 'pb-4' : 'pt-6')}>
                {links.map((link) => (
                    <li key={link.href}>
                        <Knopf href={link.href} variante="text" icon="pfeil-rechts">
                            {link.label}
                        </Knopf>
                    </li>
                ))}
            </ul>
        </>
    );
}

// Ein Wissensfeld: Verlegeplan oben, Etikett, Überschrift. Unter md ist die Überschrift die Zusammenfassung eines
// Aufklappers (Text und Links darin, zu); ab md stehen Überschrift, Text und Links offen (Muster Fachgewerke, Register aufklappen).
// Die Überschrift mit der ID trägt die Kennung für aria-labelledby und ist nur ab md sichtbar; die Zusammenfassung trägt keine ID.
function WissensFeld({ feld }) {
    const titelId = `guide-${feld.id}`;
    return (
        <Feld>
            <article aria-labelledby={titelId} className="flex flex-1 flex-col">
                <div className={PLAN_BREITE}>
                    <Verlegeplan plan={feld.plan} ohneAchse bemassung={false} className="min-h-full" />
                </div>
                <p className={clsx(etikettKlassen, 'mt-6')}>{feld.eyebrow}</p>
                <details className="group mt-3 border-t border-fuge md:hidden">
                    <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-6 py-3 text-tinte [&::-webkit-details-marker]:hidden">
                        <h3 className="min-w-0 font-anzeige text-fs-4 text-tinte">{feld.title}</h3>
                        <span className="flex shrink-0 items-center text-tinte" aria-hidden="true">
                            <span className="group-open:hidden">
                                <Icon name="plus" groesse={6} />
                            </span>
                            <span className="hidden group-open:block">
                                <Icon name="minus" groesse={6} />
                            </span>
                        </span>
                    </summary>
                    <FeldText text={feld.text} links={feld.links} aufklappe />
                </details>
                <h3 id={titelId} className="mt-3 hidden font-anzeige text-fs-4 text-tinte md:block">
                    {feld.title}
                </h3>
                <div className="hidden md:flex md:flex-1 md:flex-col">
                    <FeldText text={feld.text} links={feld.links} />
                </div>
            </article>
        </Feld>
    );
}

export default function FliesenRatgeberPage() {
    const google = RATING_SUMMARY.google;

    return (
        <>
            {/* 1. EINSTIEG: Etikett, H1 an der Laserachse, Vorspann, zwei Knöpfe; rechts der Verband-Umschalter */}
            <Einstieg
                art="erzaehl"
                etikett={
                    <>
                        Fliesen-Ratgeber &middot; Gegründet {COMPANY_DATA.business.establishmentYear} &middot; Fachbetrieb ({COMPANY_DATA.authority.shortName})
                    </>
                }
                titel={<span id="fliesen-hub-heading">Fliesen-Ratgeber: Formate, Räume und Verlegetechnik verständlich erklärt</span>}
                vorspann={
                    <p>
                        In unserem Fliesen-Ratgeber erklären wir Formate, Räume, Material und Verlegetechnik verständlich aus der Praxis. Welche Fliese passt in welchen Raum, was verlangen Großformate vom Untergrund und woran erkennen Sie eine saubere Verlegung? Hier bündeln wir das Fachwissen aus unserem Alltag als Fachbetrieb Fliesen Tezgel – damit Sie Ihre Möglichkeiten kennen, bevor Sie anfragen.
                    </p>
                }
                aktionen={
                    <>
                        <Knopf href="/fliesen/konfigurator" icon="pfeil-rechts">
                            Projekt im Konfigurator vorbereiten
                        </Knopf>
                        <Knopf href="/leistungen/wohnen" variante="neben">
                            Leistung: Wohnbereiche &amp; Neubau
                        </Knopf>
                    </>
                }
                rand={
                    // Großer Moment (E3-ORCH-04) im Planblatt (E4-NACH-01): derselbe Raum im Kreuzfugen-, Halb- und
                    // Drittelverband zum Umschalten; der Verband steht deshalb nicht im Schriftfeld. Unter lg rückt das
                    // Blatt 24 px näher an den Vorspann (E4-N2-09, ERZ 24): der Umschalter bleibt an seiner Stelle.
                    <Planblatt className="max-lg:-mt-6" felder={planfelder('Fliesen & Verlegung')}>
                        <VerbandUmschalter />
                    </Planblatt>
                }
            />

            <Leitachse>
                {/* 2. ALLE THEMEN: Register der Seiten des Hubs, je Seite Name, Beschreibung und Link */}
                <Abschnitt
                    titelId="fliesen-themen-heading"
                    leitachse
                    spaet
                    etikett="Alle Themen"
                    titel={<>{FLIESEN_HUB ? FLIESEN_HUB.name : 'Fliesen & Verlegung'} im Überblick</>}
                    einleitung={FLIESEN_HUB ? <p>{FLIESEN_HUB.description}.</p> : undefined}
                >
                    <ul className="border-t border-tinte">
                        {HUB_PAGES.map((page) => (
                            <li key={page.path} className="border-b border-fuge">
                                <Link href={page.path} data-motion="zustand" className={ZEILE}>
                                    <span className="flex min-w-0 flex-1 flex-col gap-1 md:flex-row md:items-baseline md:gap-6">
                                        <span className={NAME}>{page.name}</span>
                                        <span className="font-text text-fs-2 text-tinte-2">{page.desc}</span>
                                    </span>
                                    <span aria-hidden="true" className="flex shrink-0 text-strich">
                                        <Icon name="pfeil-rechts" groesse={5} />
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </Abschnitt>

                {/* 3. WISSEN KOMPAKT: Feldraster mit fünf Ratgeber-Feldern und dem Bad-Feld; je Feld Plan, Etikett, Überschrift, Text, Links */}
                <Abschnitt
                    titelId="fliesen-wissen-heading"
                    leitachse
                    spaet
                    etikett="Wissen kompakt"
                    titel="Vom Raum bis zur Abnahme: die wichtigsten Weichen"
                >
                    <Feldraster spalten={2}>
                        {WISSEN_FELDER.map((feld) => (
                            <WissensFeld key={feld.id} feld={feld} />
                        ))}
                    </Feldraster>
                </Abschnitt>

                {/* 4. WEITERE FACHTHEMEN: Register der Nachbarthemen; Kopfspalte mit Einleitung und Verlegeplan im Schnitt */}
                <Abschnitt
                    titelId="fliesen-weitere-heading"
                    leitachse
                    spaet
                    kopf="seitlich"
                    etikett="Weitere Fachthemen"
                    titel="Unter der Fliese und über das Wohnen hinaus"
                    einleitung={
                        <>
                            <p>Ein Fliesenbelag ist nur so gut wie sein Untergrund. Diese Ratgeber-Bereiche vertiefen die angrenzenden Themen.</p>
                            {/* Plan ganz statt an der Achse geschnitten (E4-N2-09, ERZ 23); Höhe nach Inhalt, halbe Spaltenbreite wie die Feldpläne */}
                            <div className="mt-8 w-1/2">
                                <Verlegeplan plan="abdichtung" ohneAchse bemassung={false} />
                            </div>
                        </>
                    }
                >
                    <ul className="border-t border-tinte">
                        {OTHER_HUBS.map((hub) => (
                            <li key={hub.id} className="border-b border-fuge">
                                <Link href={hub.path} data-motion="zustand" className={ZEILE}>
                                    <span className="flex min-w-0 flex-1 flex-col gap-1 md:flex-row md:items-baseline md:gap-6">
                                        <span className={NAME}>{hub.name}</span>
                                        <span className="font-text text-fs-2 text-tinte-2 md:flex-1">{hub.description}</span>
                                        {/* Zahlenspalte: ab md feste Breite, rechtsbündig in Mono (E4-N2-09, ERZ 23) */}
                                        <span className="whitespace-nowrap font-mono text-fs-1 tabular-nums text-tinte-2 md:w-24 md:shrink-0 md:text-right">
                                            {hub.pages.length} {hub.pages.length === 1 ? 'Seite' : 'Seiten'}
                                        </span>
                                    </span>
                                    <span aria-hidden="true" className="flex shrink-0 text-strich">
                                        <Icon name="pfeil-rechts" groesse={5} />
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </Abschnitt>

                {/* 5. VOM RATGEBER ZUM PROJEKT: Kopf links, Text, Merkmale, Bewertung und drei Wege rechts */}
                <Abschnitt
                    titelId="fliesen-projekt-heading"
                    leitachse
                    spaet
                    kopf="seitlich"
                    flaeche="fliese"
                    etikett="Vom Ratgeber zum Projekt"
                    titel="Wohnbereiche, Küche, Flur und Neubau – ausgeführt vom Fachbetrieb"
                    einleitung={
                        <p>
                            Seit {COMPANY_DATA.business.establishmentYear} verlegt {COMPANY_DATA.legalName} Fliesen, Platten und
                            Naturstein. Der Betrieb ist eingetragener Fachbetrieb der {COMPANY_DATA.authority.name}. Sie erhalten ein
                            kostenfreies Vor-Ort-Aufmaß, danach ein verbindliches Festpreisangebot, und bei Arbeiten im bewohnten
                            Bestand gilt unsere Staubschutz-Garantie. Kundinnen und Kunden haben bei uns vom einzelnen Raum bis zum
                            kompletten Haus fliesen lassen.
                        </p>
                    }
                >
                    <ul className="grid gap-3">
                        {[
                            'Kostenfreies Vor-Ort-Aufmaß mit Prüfung des Untergrunds',
                            'Verbindliche Festpreis-Kalkulation ohne versteckte Zusatzkosten',
                            `Persönliche Betreuung durch ${COMPANY_DATA.owner.fullName}`
                        ].map((item) => (
                            <li key={item} className="flex gap-3 font-text text-fs-2 text-tinte">
                                <span aria-hidden="true" className="flex h-6 shrink-0 items-center text-strich">
                                    <Fugenkreuz className="size-3" />
                                </span>
                                <span className="min-w-0">{item}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-12 border border-fuge bg-kalk p-6 lg:p-8">
                        <span className="flex gap-1 text-tinte" aria-hidden="true">
                            {Array.from({ length: 5 }, (_, i) => (
                                <Icon key={i} name="stern-voll" groesse={5} />
                            ))}
                        </span>
                        <p className="mt-4 font-anzeige text-fs-6 text-tinte tabular-nums">{google.displayRating}</p>
                        <p className="mt-2 font-mono text-fs-1 text-tinte-2">
                            aus {google.count} {google.label} (Stand {RATING_SUMMARY.asOf})
                        </p>
                    </div>

                    <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                        <Knopf href="/leistungen/wohnen" icon="pfeil-rechts">
                            Zur Leistungsseite Wohnbereiche &amp; Neubau
                        </Knopf>
                        <Knopf href={`tel:${COMPANY_DATA.contact.phoneLink}`} variante="neben" iconLinks="telefon">
                            <span className="font-mono font-normal">{COMPANY_DATA.contact.phone}</span>
                        </Knopf>
                        <Knopf
                            href={COMPANY_DATA.contact.whatsappLink}
                            extern
                            variante="neben"
                            vorne={<WhatsAppLogo className="size-5 shrink-0" />}
                        >
                            Fotos per WhatsApp senden
                        </Knopf>
                    </div>
                </Abschnitt>

                {/* 6. WEITERFÜHRENDE RATGEBER: vier Verweise als Merkliste, darunter der Hinweis auf Beratung und Blog */}
                <Abschnitt titelId="fliesen-ratgeber-heading" leitachse spaet titel="Weiterführende Ratgeber zur Fliesenverlegung">
                    <Merkliste
                        spalten={2}
                        eintraege={WEITERLESEN.map((link) => ({
                            titel: (
                                <Link href={link.href} className={linkKlassen}>
                                    {link.label}
                                </Link>
                            )
                        }))}
                    />
                    <p className="mt-8 max-w-mass font-text text-fs-3 text-tinte-2">
                        Persönliche Beratung vor Ihrer Entscheidung?{' '}
                        <Link href="/beratung" className={linkKlassen}>
                            Fachberatung anfragen
                        </Link>{' '}
                        oder unseren{' '}
                        <Link href="/blog" className={linkKlassen}>
                            Fliesen-Ratgeber-Blog
                        </Link>{' '}
                        durchstöbern.
                    </p>
                </Abschnitt>

                {/* 7. KONFIGURATOR: der Kopf (Etikett „Fliesen-Konfigurator“, H2 „Fliesenprojekt vorbereiten“) steht im Werkzeug –
                    kein zweites Etikett, kein zweiter H2; der ARIA-Name bleibt über aria-label. Funnel (nachgeladen) im Raster mit 8 Spalten,
                    rechts die Rückfrage in 4 Spalten (ab lg); Anker #konfigurator bleibt */}
                <Abschnitt id="konfigurator" aria-label="Fliesen-Konfigurator" leitachse spaet>
                    <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-12">
                        <div className="min-w-0 lg:col-span-8">
                            <FliesenKonfigurator />
                        </div>
                        <div className="lg:col-span-4">
                            <Rueckfrage />
                        </div>
                    </div>
                </Abschnitt>
            </Leitachse>

            {/* 8. ABSCHLUSS */}
            <QualityPromise />
            <FinalCTA />
        </>
    );
}
