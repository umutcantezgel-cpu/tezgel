// Treppenhaus (S-18 nach E5-BAU-09, KERN v2): Seitenkörper der Unterseite als Erzählansicht nach dem Muster der
// Familienreferenz (leistungen/[id], fliesen) und der Schwesterseiten /treppen und /treppen/innentreppe (S-17). Einstieg mit
// Laserachse, H1 links, Vorspann, Knopf und Telefon; rechts das Planblatt „Treppenhaus sanieren“ mit dem Plan „treppe“
// (interaktiv, die rote Achse trägt das Blatt). Danach die Leitachse über die Abschnitte, Flächen im Wechsel Fliese/Kalk, damit
// der Ratgeber auf Fliese vor dem Qualitätsversprechen (Kalk) steht:
// 2. Anforderungen als Feldraster mit zwei Spalten (Fliese) · 3. Planung und Ablauf als Schrittfolge an der Fuge (Kalk) ·
// 4. Beläge als Feldraster mit drei Feldern (Fliese) · 5. Podeste und Staubschutz als zwei Texte an der Fuge (Kalk) ·
// 6. Ratgeber als Register mit dem Weg zur Beratung (Fliese) · Qualitätsversprechen (geteilter Baustein).
// Kein Auftritt, kein großer Moment.
// Wortlaut, Überschriften, Links, IDs und Lesefolge wie im Bestand; Metadaten und Daten unverändert. Serverkomponente.
import Link from 'next/link';
import clsx from 'clsx';
import { COMPANY_DATA } from '@/config/company';
import { createMetadata } from '@/lib/metadata';
import Icon from '@/components/icons/Icon';
import QualityPromise from '@/components/sections/QualityPromise';
import Abschnitt from '@/components/kern/Abschnitt';
import Einstieg from '@/components/kern/Einstieg';
import { Feld, Feldraster } from '@/components/kern/Feldraster';
import Knopf from '@/components/kern/Knopf';
import Leitachse from '@/components/kern/Leitachse';
import Planblatt, { planfelder } from '@/components/kern/Planblatt';
import Schrittfolge from '@/components/kern/Schrittfolge';
import Verlegeplan from '@/components/kern/Verlegeplan';
import { linkKlassen } from '@/components/kern/stile';
import SeitenDaten from '@/components/seo/SeitenDaten';

export const metadata = createMetadata({
    title: 'Treppenhaus sanieren: Fliesen & Naturstein | Tezgel',
    description:
        'Treppenhaus im MFH neu fliesen & sanieren: trittsichere Beläge, abschnittsweises Arbeiten im bewohnten Haus & Hausverwaltungs-Service. Tezgel Fachbetrieb.',
    path: '/treppen/treppenhaus'
});

const REQUIREMENTS = [
    {
        title: 'Hohe Belastung',
        desc: 'Im Treppenhaus laufen alle Bewohner, Besucher und Lieferdienste über dieselben Stufen – oft mit Straßenschmutz und Splitt an den Sohlen. Gefragt sind abriebfeste, durchgefärbte Materialien.'
    },
    {
        title: 'Trittsicherheit',
        desc: 'Matte, rutschhemmende Oberflächen und gut erkennbare Stufenkanten sind im Gemeinschaftsbereich besonders wichtig. Die Rutschhemmung wird nach DIN EN 16165 geprüft und in R-Klassen angegeben.'
    },
    {
        title: 'Reinigung',
        desc: 'Treppenhäuser werden häufig und oft von Reinigungsdiensten gepflegt. Dichte Oberflächen, gut gefüllte Fugen und ein Sockel, der das Wischwasser von der Wand fernhält, erleichtern die Pflege.'
    },
    {
        title: 'Baustoffanforderungen',
        desc: 'Für Treppenräume können bauordnungsrechtliche Anforderungen an die Baustoffe gelten. Keramik und Naturstein sind nicht brennbar. Ob im konkreten Gebäude weitere Vorgaben bestehen, klären Eigentümer bzw. Verwaltung mit ihrem Planer.'
    }
];

const PROCESS = [
    {
        title: 'Bestandsaufnahme und Angebot',
        desc: 'Beim Vor-Ort-Termin prüfen wir Stufen, Podeste und Altbelag, messen auf und klären, was erhalten werden kann. Das Angebot ist so gegliedert, dass es sich in der Eigentümerversammlung bzw. gegenüber der Verwaltung gut vorstellen lässt.'
    },
    {
        title: 'Abstimmung mit Eigentümern oder Hausverwaltung',
        desc: 'Ein fester Ansprechpartner stimmt Material, Ablauf und Termine mit der Person ab, die die Gemeinschaft vertritt. Musterplatten helfen bei der Entscheidung. Fragen des Wohnungseigentumsrechts klären Sie bitte mit Ihrer Verwaltung.'
    },
    {
        title: 'Abschnittsweise im bewohnten Haus',
        desc: 'Damit das Haus erreichbar bleibt, arbeiten wir nach Absprache abschnittsweise – etwa geschossweise oder Stufe um Stufe im Wechsel, sodass immer ein begehbarer Weg bleibt. Wann frisch verlegte Flächen wieder belastbar sind, hängt vom verwendeten Kleber und Fugenmörtel ab.'
    },
    {
        title: 'Gemeinsame Abnahme',
        desc: 'Am Ende gehen wir die Treppe gemeinsam mit Ihnen bzw. der Verwaltung ab. Sie erhalten Hinweise zur Pflege des gewählten Belags.'
    }
];

const MATERIALS = [
    {
        title: 'Feinsteinzeug',
        text: 'Dicht, frostunempfindlich und sehr abriebfest; in Stein- und Betonoptiken mit rutschhemmenden Oberflächen erhältlich. Durchgefärbte Qualitäten lassen Abnutzung an der Kante kaum sichtbar werden.'
    },
    {
        title: 'Granit',
        text: 'Hart, verschleißfest und im Treppenhaus seit Jahrzehnten bewährt. Geflammte oder gebürstete Oberflächen sind griffiger als polierte. Stufenplatten werden nach Aufmaß vom Steinlieferanten gefertigt.'
    },
    {
        title: 'Weitere Natursteine',
        text: 'Quarzit, Schiefer oder Kalkstein bieten eigene Farbwelten. Weichere und säureempfindliche Sorten verlangen mehr Pflege und eignen sich nicht für jede Belastung – wir beraten ehrlich, was zu Ihrem Haus passt.'
    }
];

const WEITERLESEN = [
    { title: 'Treppen im Überblick', path: '/treppen', desc: 'Voraussetzungen, Belagsarten und Steigungen' },
    { title: 'Naturstein & Granit', path: '/naturstein/granit', desc: 'Silikatische Natursteine im Porträt' },
    { title: 'Wohnbereiche fliesen', path: '/leistungen/wohnen', desc: 'Böden für Flur, Diele und Wohnen' },
    { title: 'Unser Betrieb', path: '/unternehmen', desc: 'Fachbetrieb aus Aßlar, HWK Wiesbaden' }
];

// Hochkant-Plan im Planblatt: mittig, schmaler als das Blatt (wie auf /treppen und /treppen/innentreppe)
const PLAN_HOCHKANT = 'mx-auto max-w-1/2 md:max-w-1/3 lg:max-w-1/2';

// Zeile des Registers (Ratgeber auf Fliese): die ganze Zeile ist der Link; Hover färbt die Fläche auf Kalk
const ZEILE = 'group flex min-h-12 items-center gap-4 px-3 py-4 pointer-fine:hover:bg-kalk active:bg-kalk';
// Name in der Zeile: Unterstrich beim Überfahren
const NAME =
    'font-text text-fs-3 font-semibold text-tinte md:w-1/3 md:shrink-0 decoration-1 underline-offset-4 decoration-tinte pointer-fine:group-hover:underline group-active:underline';

// Text an der Fuge (Podeste, Staubschutz): Oberkante als Tinte-Linie, Überschrift (h2 wie im Bestand) und Text im Lesemaß
const FUGENTEXT = 'border-t border-tinte pt-6';
const FUGENTEXT_TITEL = 'font-anzeige text-fs-5 text-tinte';
const FUGENTEXT_TEXT = 'mt-4 max-w-mass font-text text-fs-3 text-tinte-2';

export default function TreppenhausPage() {
    return (
        <>
            <SeitenDaten
                pfad="/treppen/treppenhaus"
                titel="Treppenhaus sanieren: Fliesen & Naturstein | Tezgel"
                beschreibung="Treppenhaus im MFH neu fliesen & sanieren: trittsichere Beläge, abschnittsweises Arbeiten im bewohnten Haus & Hausverwaltungs-Service. Tezgel Fachbetrieb."
                brotkrumen={[{ name: 'Start', href: '/' }, { name: 'Treppen', href: '/treppen' }, { name: 'Treppenhaus sanieren: neue Beläge im Mehrfamilienhaus' }]}
            />
            {/* 1. EINSTIEG: Kennzeile, H1 an der Laserachse, Vorspann, Knopf und Telefon; rechts das Planblatt „treppe“ */}
            <section aria-labelledby="treppenhaus-heading">
                <Einstieg
                    art="erzaehl"
                    etikett={<>Treppen &middot; Mehrfamilienhaus</>}
                    titel={
                        <span id="treppenhaus-heading">
                            Treppenhaus sanieren:{' '}
                            <span>neue Beläge im Mehrfamilienhaus</span>
                        </span>
                    }
                    vorspann={
                        <p>
                            Treppenhaus sanieren: neue Beläge im Mehrfamilienhaus für Trittsicherheit, Schallschutz und repräsentative Optik.
                            Ausgetretene Stufen, gesprungene Platten und unpassend geflickte Podeste erneuern wir für Eigentümer und
                            Hausverwaltungen termintreu und im bewohnten Bestand.
                        </p>
                    }
                    aktionen={
                        <>
                            <Knopf href="/kontakt" icon="pfeil-rechts">
                                Besichtigung anfragen
                            </Knopf>
                            <Knopf href={`tel:${COMPANY_DATA.contact.phoneLink}`} variante="neben" iconLinks="telefon">
                                <span className="font-mono font-normal">{COMPANY_DATA.contact.phone}</span>
                            </Knopf>
                        </>
                    }
                    rand={
                        // Der Plan „treppe“ steht hochkant (16 × 24): mittig auf halber bzw. (md) einem Drittel der Blattbreite
                        <Planblatt felder={planfelder('Treppenhaus sanieren', 'treppe')}>
                            <Verlegeplan plan="treppe" ohneAchse bemassung={false} interaktiv className={PLAN_HOCHKANT} />
                        </Planblatt>
                    }
                />
            </section>

            {/* LEITACHSE: das Lot setzt die Achse des Einstiegs über die Abschnitte fort */}
            <Leitachse>
                {/* 2. ANFORDERUNGEN auf Fliese: vier Felder in zwei Spalten (ohne Restzelle) */}
                <Abschnitt
                    titelId="anforderungen-heading"
                    leitachse
                    spaet
                    flaeche="fliese"
                    etikett="Anforderungen"
                    titel="Belastung, Sicherheit, Reinigung"
                >
                    <Feldraster spalten={2}>
                        {REQUIREMENTS.map((item) => (
                            <Feld key={item.title}>
                                <h3 className="font-anzeige text-fs-4 text-tinte">{item.title}</h3>
                                <p className="mt-3 max-w-mass font-text text-fs-2 text-tinte-2">{item.desc}</p>
                            </Feld>
                        ))}
                    </Feldraster>
                </Abschnitt>

                {/* 3. PLANUNG & ABLAUF: vier Schritte als Schrittfolge am Lot (Nummern nur sichtbar wie im Bestand); der lange
                    Text je Schritt bleibt im Lesemaß */}
                <Abschnitt
                    titelId="planung-heading"
                    leitachse
                    spaet
                    etikett={<>Planung &amp; Ablauf</>}
                    titel="Von der Eigentümerentscheidung bis zur Abnahme"
                >
                    <Schrittfolge nummerStumm schritte={PROCESS.map((step) => ({ titel: step.title, text: step.desc }))} />
                </Abschnitt>

                {/* 4. BELÄGE auf Fliese: drei Felder; das dritte überspannt in md die freie Breite (keine Restzelle); darunter der
                    Verweis auf die Kantenlösungen */}
                <Abschnitt
                    titelId="belaege-heading"
                    leitachse
                    spaet
                    flaeche="fliese"
                    etikett="Beläge"
                    titel="Feinsteinzeug, Granit und andere Natursteine"
                >
                    <Feldraster spalten={3}>
                        {MATERIALS.map((item, i) => {
                            const letzter = i === MATERIALS.length - 1;
                            return (
                                <Feld key={item.title} spanne={letzter ? 2 : undefined} className={clsx(letzter && 'lg:col-span-1')}>
                                    <h3 className="font-anzeige text-fs-4 text-tinte">{item.title}</h3>
                                    <p className="mt-3 max-w-mass font-text text-fs-2 text-tinte-2">{item.text}</p>
                                </Feld>
                            );
                        })}
                    </Feldraster>
                    <p className="mt-8 max-w-mass font-text text-fs-2 text-tinte-2">
                        Kantenlösungen wie Gehrung, Stufenprofil oder Stufenplatte vergleichen wir auf der Seite{' '}
                        <Link href="/treppen/innentreppe" className={linkKlassen}>
                            Innentreppe fliesen
                        </Link>
                        ; für stark frequentierte Treppenhäuser sind Profile oder robuste Stufenplatten oft die praktischere Wahl.
                    </p>
                </Abschnitt>

                {/* 5. PODESTE UND STAUBSCHUTZ: Abschnitt ohne eigenen Kopf (Name wie im Bestand), zwei Texte an der Fuge
                    nebeneinander, die Überschriften bleiben h2 */}
                <Abschnitt aria-label="Podeste und Staubschutz" leitachse spaet>
                    <div className="grid gap-12 md:grid-cols-2 md:gap-8 lg:gap-12">
                        <div className={FUGENTEXT}>
                            <h2 className={FUGENTEXT_TITEL}>Podeste, Sockel und Übergänge zu Wohnungstüren</h2>
                            <p className={FUGENTEXT_TEXT}>
                                Podeste erhalten dasselbe Fugenraster wie die Stufen. Sockel werden – gestuft an der Treppe, gerade am Podest –
                                umlaufend gesetzt. Vor Wohnungstüren achten wir auf die Aufbauhöhe: Die Tür muss weiterhin frei aufgehen, und der
                                Übergang zur Schwelle wird sauber mit einem Profil oder einer Anschlussfuge ausgebildet.
                            </p>
                        </div>
                        <div className={FUGENTEXT}>
                            <h2 className={FUGENTEXT_TITEL}>Staubschutz und Sauberkeit im Gemeinschaftsbereich</h2>
                            <p className={FUGENTEXT_TEXT}>
                                Das Entfernen alter Beläge und das Zuschneiden verursachen Staub. Wir schützen angrenzende Flächen und Türen mit
                                Abdeckungen und Staubschutzwänden, arbeiten mit Absaugung und hinterlassen den Arbeitsbereich besenrein – damit
                                Bewohner so wenig wie möglich beeinträchtigt werden.
                            </p>
                        </div>
                    </div>
                </Abschnitt>

                {/* 6. RATGEBER auf Fliese: Register, je Zeile Titel, Beschreibung und Pfeil; darunter der Weg zur Beratung als
                    Nebenknopf. Die Fläche trennt den Abschnitt vom folgenden Qualitätsversprechen (Kalk) */}
                <Abschnitt
                    titelId="treppenhaus-ratgeber-heading"
                    leitachse
                    spaet
                    flaeche="fliese"
                    titel="Weiterführende Ratgeber zur Treppenhaussanierung"
                >
                    <ul className="border-t border-tinte">
                        {WEITERLESEN.map((link) => (
                            <li key={link.path} className="border-b border-fuge">
                                <Link href={link.path} data-motion="zustand" className={ZEILE}>
                                    <span className="flex min-w-0 flex-1 flex-col gap-1 md:flex-row md:items-baseline md:gap-6">
                                        <span className={NAME}>{link.title}</span>
                                        <span className="font-text text-fs-2 text-tinte-2">{link.desc}</span>
                                    </span>
                                    <span aria-hidden="true" className="flex shrink-0 text-strich">
                                        <Icon name="pfeil-rechts" groesse={5} />
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                        <Knopf href="/beratung" variante="neben">
                            Persönliche Treppenberatung anfragen
                        </Knopf>
                    </div>
                </Abschnitt>
            </Leitachse>

            {/* 7. QUALITÄTSVERSPRECHEN (geteilter Baustein); einen Abschluss hat die Seite im Bestand nicht */}
            <QualityPromise />
        </>
    );
}
