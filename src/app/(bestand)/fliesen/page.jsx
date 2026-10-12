// Fliesen-Ratgeber (E3-BAU-06, KERN v2): Erzählansicht nach dem Muster der Startseite und der Leistungen. Einstieg mit
// Laserachse, H1 links, Vorspann und zwei Knöpfe; rechts der Verband-Umschalter (E3-ORCH-04). Danach die Leitachse über
// die Abschnitte: Themen und Nachbarthemen als Register, Wissen als Feldraster mit Etikett, Überschrift, Text und Links,
// Projekt seitlich mit Merkmalen, Bewertung und drei Wegen, Weiterführende Ratgeber als Merkliste, Konfigurator in
// Lesebreite. Wortlaut, Überschriften, Links und IDs wie im Bestand. Kein Auftritt und kein großer Moment; den
// Verband-Umschalter setzt der Orchestrator.
import Link from 'next/link';
import { COMPANY_DATA } from '@/config/company';
import { RATING_SUMMARY } from '@/config/reviews';
import { TOPIC_HUBS } from '@/config/topics';
import { createMetadata } from '@/lib/metadata';
import Icon from '@/components/icons/Icon';
import FliesenKonfigurator from '@/components/funnels/FliesenKonfigurator';
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
import VerbandUmschalter from '@/components/kern/VerbandUmschalter';
import { etikettKlassen, linkKlassen } from '@/components/kern/stile';

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
                    // Drittelverband zum Umschalten; der Verband steht deshalb nicht im Schriftfeld
                    <Planblatt felder={planfelder('Fliesen & Verlegung')}>
                        <VerbandUmschalter />
                    </Planblatt>
                }
            />

            <Leitachse>
                {/* 2. ALLE THEMEN: Register der Seiten des Hubs, je Seite Name, Beschreibung und Link */}
                <Abschnitt
                    titelId="fliesen-themen-heading"
                    leitachse
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

                {/* 3. WISSEN KOMPAKT: Feldraster mit fünf Ratgeber-Feldern und dem Bad-Feld; je Feld Etikett, Überschrift, Text, Links */}
                <Abschnitt
                    titelId="fliesen-wissen-heading"
                    leitachse
                    etikett="Wissen kompakt"
                    titel="Vom Raum bis zur Abnahme: die wichtigsten Weichen"
                >
                    <Feldraster spalten={2}>
                        {GUIDE_SECTIONS.map((section) => (
                            <Feld key={section.id}>
                                <article aria-labelledby={`guide-${section.id}`} className="flex flex-1 flex-col">
                                    <p className={etikettKlassen}>{section.eyebrow}</p>
                                    <h3 id={`guide-${section.id}`} className="mt-3 font-anzeige text-fs-4 text-tinte">
                                        {section.title}
                                    </h3>
                                    <p className="mt-3 max-w-mass font-text text-fs-3 text-tinte-2">{section.text}</p>
                                    <ul className="mt-auto grid gap-1 pt-6">
                                        {section.links.map((link) => (
                                            <li key={link.href}>
                                                <Knopf href={link.href} variante="text" icon="pfeil-rechts">
                                                    {link.label}
                                                </Knopf>
                                            </li>
                                        ))}
                                    </ul>
                                </article>
                            </Feld>
                        ))}

                        {/* Bad */}
                        <Feld>
                            <article aria-labelledby="guide-bad" className="flex flex-1 flex-col">
                                <p className={etikettKlassen}>Bad, Dusche &amp; Gäste-WC</p>
                                <h3 id="guide-bad" className="mt-3 font-anzeige text-fs-4 text-tinte">
                                    Badsanierung hat einen eigenen Bereich
                                </h3>
                                <p className="mt-3 max-w-mass font-text text-fs-3 text-tinte-2">
                                    Rund ums Bad – Walk-In-Dusche, Abdichtung nach DIN 18534, Fliesen im Nassbereich, Gäste-WC – finden
                                    Sie alles gesammelt im Bad-Bereich. Dieser Ratgeber konzentriert sich auf die übrigen Räume und die
                                    Verlegetechnik.
                                </p>
                                <ul className="mt-auto grid gap-1 pt-6">
                                    {[
                                        { label: 'Zum Bad-Bereich', href: '/bad' },
                                        { label: 'Fliesen im Bad', href: '/bad/fliesen' },
                                        { label: 'Gäste-WC fliesen', href: '/blog/gaeste-wc-fliesen' }
                                    ].map((link) => (
                                        <li key={link.href}>
                                            <Knopf href={link.href} variante="text" icon="pfeil-rechts">
                                                {link.label}
                                            </Knopf>
                                        </li>
                                    ))}
                                </ul>
                            </article>
                        </Feld>
                    </Feldraster>
                </Abschnitt>

                {/* 4. WEITERE FACHTHEMEN: Register der Nachbarthemen; je Thema Name, Beschreibung, Seitenzahl */}
                <Abschnitt
                    titelId="fliesen-weitere-heading"
                    leitachse
                    etikett="Weitere Fachthemen"
                    titel="Unter der Fliese und über das Wohnen hinaus"
                    einleitung={<p>Ein Fliesenbelag ist nur so gut wie sein Untergrund. Diese Ratgeber-Bereiche vertiefen die angrenzenden Themen.</p>}
                >
                    <ul className="border-t border-tinte">
                        {OTHER_HUBS.map((hub) => (
                            <li key={hub.id} className="border-b border-fuge">
                                <Link href={hub.path} data-motion="zustand" className={ZEILE}>
                                    <span className="flex min-w-0 flex-1 flex-col gap-1 md:flex-row md:items-baseline md:gap-6">
                                        <span className={NAME}>{hub.name}</span>
                                        <span className="font-text text-fs-2 text-tinte-2">{hub.description}</span>
                                        <span className="font-mono text-fs-1 text-tinte-2">
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
                                <Icon key={i} name="stern" groesse={5} />
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
                <Abschnitt titelId="fliesen-ratgeber-heading" leitachse titel="Weiterführende Ratgeber zur Fliesenverlegung">
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

                {/* 7. KONFIGURATOR: Funnel in Lesebreite (seitlich mit 8 Spalten, ohne Kopf); Anker #konfigurator und ARIA-Name bleiben */}
                <Abschnitt id="konfigurator" aria-label="Fliesen-Konfigurator" kopf="seitlich" leitachse>
                    <FliesenKonfigurator />
                </Abschnitt>
            </Leitachse>

            {/* 8. ABSCHLUSS */}
            <QualityPromise />
            <FinalCTA />
        </>
    );
}
