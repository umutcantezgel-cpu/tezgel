// Treppen (S-17 nach E5-BAU-08, KERN v2): Seitenkörper der Themenseite als Erzählansicht nach dem Muster der Familienreferenz
// (leistungen/[id], fliesen) und der Schwesterseite /untergrund-abdichtung. Einstieg mit Laserachse, H1 links, Vorspann und
// zwei Knöpfe; rechts das Planblatt „Treppe fliesen & sanieren“ mit dem Plan „treppe“ (interaktiv, die rote Achse trägt das
// Blatt). Danach die Leitachse über die Abschnitte, Flächen im Wechsel Kalk/Fliese:
// 2. Treppentypen als Feldraster (je Feld ein Link, Kalk) · 3. Voraussetzung: zwei Listen an der Fuge nebeneinander
// (Fliese) · 4. Belagsarten als Feldraster mit zwei Spalten (Kalk) · 5. Steigungen: Text an der Fuge neben einem
// Prüffeld (Fliese) · 6. Renovierung als Schrittfolge mit zwei Wegen (Kalk) · 7. Ratgeber als Register, Kopf seitlich (Fliese) ·
// Qualitätsversprechen und Abschluss (geteilte Bausteine). Kein Auftritt, kein großer Moment.
// Wortlaut, Überschriften, Links, IDs und Lesefolge wie im Bestand; Metadaten und Daten unverändert. Serverkomponente.
import Link from 'next/link';
import clsx from 'clsx';
import { COMPANY_DATA } from '@/config/company';
import { TOPIC_HUBS } from '@/config/topics';
import { createMetadata } from '@/lib/metadata';
import Icon from '@/components/icons/Icon';
import QualityPromise from '@/components/sections/QualityPromise';
import { FinalCTA } from '@/components/ui/FinalCTA';
import Abschnitt from '@/components/kern/Abschnitt';
import Einstieg from '@/components/kern/Einstieg';
import { Feld, Feldraster } from '@/components/kern/Feldraster';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import Knopf from '@/components/kern/Knopf';
import Leitachse from '@/components/kern/Leitachse';
import Planblatt, { planfelder } from '@/components/kern/Planblatt';
import Schrittfolge from '@/components/kern/Schrittfolge';
import Verlegeplan from '@/components/kern/Verlegeplan';
import { etikettKlassen, linkKlassen } from '@/components/kern/stile';

export const metadata = createMetadata({
    title: 'Treppe fliesen & sanieren Wetzlar | Fachbetrieb Tezgel',
    description:
        'Treppe fliesen & sanieren in Wetzlar & Aßlar: Innentreppen, Außentreppen & Treppenhäuser mit Fliesen oder Naturstein belegen. Jetzt Angebot anfragen!',
    path: '/treppen'
});

const TREPPEN_HUB = TOPIC_HUBS.find((hub) => hub.id === 'treppen');
const SUBPAGES = (TREPPEN_HUB?.pages ?? []).filter((page) => page.path !== '/treppen');

const SUBPAGE_TEXT = {
    '/treppen/innentreppe':
        'Die Betontreppe im Einfamilienhaus: Tritt- und Setzstufen passend zum Wohnbereich, Kantenlösungen im Vergleich, gestufte Sockel und Podeste.',
    '/treppen/treppenhaus':
        'Gemeinschaftstreppen im Mehrfamilienhaus: strapazierfähige Beläge, Planung mit Hausverwaltung oder Eigentümern und abschnittsweises Arbeiten.',
    '/treppen/aussentreppe':
        'Hauseingang, Kellerabgang, Gartentreppe: frostbeständige Beläge, Gefälle und Entwässerung, Blockstufen und die Sanierung typischer Frostschäden.'
};

const SUITABLE = [
    'Treppen aus Stahlbeton, auch Fertigteiltreppen',
    'gemauerte bzw. massiv unterbaute Treppen',
    'bestehende, fest haftende Fliesen- oder Natursteinbeläge (nach Prüfung)',
    'Außentreppen auf tragfähigem, frostsicherem Unterbau'
];

const NOT_SUITABLE = [
    'Holztreppen: Holz arbeitet, ein starrer Fliesenbelag reißt oder löst sich',
    'Stahl- und Wangentreppen mit frei tragenden Stufen',
    'Treppen mit Rissen im Tragwerk oder lockeren Stufen – hier zuerst ein Tragwerksplaner bzw. Rohbaubetrieb',
    'Stufen, bei denen sich durch den Belag die Laufbreite oder Kopfhöhe unzulässig verändern würde'
];

const COVERINGS = [
    {
        title: 'Fliesen auf Tritt- und Setzstufen',
        desc: 'Bodenfliesen werden für jede Stufe zugeschnitten; die Kante entsteht per Gehrung oder mit einem Stufenprofil. Das Format kann zum angrenzenden Boden passen, damit Flur und Treppe wie aus einem Guss wirken.'
    },
    {
        title: 'Feinsteinzeug-Stufenplatten',
        desc: 'Stufenplatten mit werkseitig ausgebildeter Kante („Stufenfliese“) bringen eine fertige, abgerundete oder gefaste Vorderkante mit. Sie sind robust, aber an Laufbreite und Stufentiefe gebunden, die das Sortiment vorgibt.'
    },
    {
        title: 'Naturstein-Stufenbeläge',
        desc: 'Tritt- und Setzstufen aus Granit, Schiefer, Quarzit oder Kalkstein – meist vom Steinlieferanten nach Aufmaß zugeschnitten und an der Vorderkante bearbeitet. Welche Sorte sich für Ihre Treppe eignet, hängt von Nutzung und Standort ab.'
    },
    {
        title: 'Blockstufen (Außenbereich)',
        desc: 'Blockstufen sind keine Belagsart, sondern eine eigene massive Stufenkonstruktion aus Naturstein oder Beton, die auf Fundament bzw. Mörtelbett gesetzt wird – typisch für Hauseingang und Garten. Mehr dazu auf der Seite zur Außentreppe.'
    }
];

const AUFMASS_PUNKTE = [
    'Höhe jeder einzelnen Steigung und Tiefe jedes Auftritts',
    'Aufbauhöhe des neuen Belags unten und oben: Bekommen Flur und Obergeschoss denselben Aufbau, verschieben sich alle Stufen gleichmäßig',
    'Wird nur die Treppe belegt, wird die unterste Steigung höher und die oberste niedriger – das gleichen wir über das Kleber- bzw. Mörtelbett und passende Belagdicken aus',
    'Ungleichmäßige Rohbaustufen lassen sich nur begrenzt korrigieren; die Maße des Rohbaus bleiben maßgebend'
];

const RENOVIERUNG = [
    { t: 'Altbelag prüfen', d: 'Fest haftende Fliesen können unter Umständen bleiben; Teppich, PVC und Kleberreste werden entfernt.' },
    { t: 'Untergrund vorbereiten', d: 'Stufen reinigen, grundieren, Ausbrüche und Unebenheiten mit geeignetem Mörtel ausgleichen.' },
    { t: 'Stufen einzeln aufmessen', d: 'Keine Stufe ist exakt gleich – jede Tritt- und Setzstufe wird individuell zugeschnitten.' },
    { t: 'Vollflächig verlegen', d: 'Hohlraumarm verlegt mit flexiblem Fliesenkleber, damit Kanten unter Last nicht abbrechen.' }
];

const WEITERLESEN = [
    { title: 'Wohnbereiche fliesen', path: '/leistungen/wohnen', desc: 'Flur, Wohnraum und Treppe in einem Belagskonzept' },
    { title: 'Außenbereiche', path: '/leistungen/aussen', desc: 'Balkon, Terrasse und Eingang dauerhaft belegt' },
    { title: 'Rutschhemmung verstehen', path: '/blog/rutschfeste-fliesen-r-klassen', desc: 'R-Klassen und Bewertungsgruppen nach DIN EN 16165' },
    { title: 'Referenzen', path: '/referenzen', desc: 'Ausgeführte Projekte und Kundenstimmen' }
];

// Zeile des Registers (Ratgeber auf Fliese): die ganze Zeile ist der Link; Hover färbt die Fläche auf Kalk
const ZEILE = 'group flex min-h-12 items-center gap-4 px-3 py-4 pointer-fine:hover:bg-kalk active:bg-kalk';
// Name in der Zeile: Unterstrich beim Überfahren
const NAME =
    'font-text text-fs-3 font-semibold text-tinte md:w-1/3 md:shrink-0 decoration-1 underline-offset-4 decoration-tinte pointer-fine:group-hover:underline group-active:underline';

// Hochkant-Plan im Planblatt: mittig, schmaler als das Blatt
const PLAN_HOCHKANT = 'mx-auto max-w-1/2 md:max-w-1/3 lg:max-w-1/2';

// Eintrag einer Liste an der Fuge: Fugenkreuz als Marke, Text in Textschrift
function FugenListe({ eintraege, className }) {
    return (
        <ul className={clsx('border-t border-fuge', className)}>
            {eintraege.map((item) => (
                <li key={item} className="flex gap-3 border-b border-fuge py-4 font-text text-fs-2 text-tinte">
                    <span aria-hidden="true" className="flex h-6 shrink-0 items-center text-strich">
                        <Fugenkreuz className="size-3" />
                    </span>
                    <span className="min-w-0">{item}</span>
                </li>
            ))}
        </ul>
    );
}

export default function TreppenPage() {
    return (
        <>
            {/* 1. EINSTIEG: Kennzeile, H1 an der Laserachse, Vorspann, zwei Knöpfe; rechts das Planblatt „treppe“ */}
            <section aria-labelledby="treppen-heading">
                <Einstieg
                    art="erzaehl"
                    etikett={<>Treppenanlagen &middot; Fachbetrieb aus {COMPANY_DATA.headquarters.city}</>}
                    titel={
                        <span id="treppen-heading">
                            Treppen neu belegen:{' '}
                            <span>Welche Lösung passt zu Ihrer Treppe?</span>
                        </span>
                    }
                    vorspann={
                        <p>
                            Treppe sanieren und Treppen neu belegen: Robuste Beläge für innen, außen &amp; Treppenhaus vom Fachbetrieb Tezgel. Eine
                            abgenutzte Massivtreppe muss nicht abgerissen werden: Solange der Rohbau trägt, bekommt sie mit Fliesen, Feinsteinzeug
                            oder Naturstein einen neuen, rutschfesten Belag – innen, im Treppenhaus und am Hauseingang. Hier finden Sie alle
                            Grundlagen und die passende Lösung für Ihre Treppe.
                        </p>
                    }
                    aktionen={
                        <>
                            <Knopf href="/kontakt" icon="pfeil-rechts">
                                Aufmaß vor Ort anfragen
                            </Knopf>
                            <Knopf href="/treppen/innentreppe" variante="neben">
                                Innentreppe fliesen
                            </Knopf>
                        </>
                    }
                    rand={
                        // Der Plan „treppe“ steht hochkant (16 × 24): mittig auf halber bzw. (md, Blatt über die volle Breite) einem
                        // Drittel der Blattbreite, damit das Blatt nicht weit über die Textspalte hinausragt
                        <Planblatt felder={planfelder('Treppe fliesen & sanieren', 'treppe')}>
                            <Verlegeplan plan="treppe" ohneAchse bemassung={false} interaktiv className={PLAN_HOCHKANT} />
                        </Planblatt>
                    }
                />
            </section>

            {/* LEITACHSE: das Lot setzt die Achse des Einstiegs über die Abschnitte fort */}
            <Leitachse>
                {/* 2. TREPPENTYPEN als Feldraster: je Unterseite ein Feld, das ganz als Link dient; das dritte Feld überspannt
                    in md die freie Breite (keine Restzelle) */}
                <Abschnitt
                    titelId="treppentypen-heading"
                    leitachse
                    spaet
                    etikett="Welche Treppe haben Sie?"
                    titel="Innentreppe, Treppenhaus oder Außentreppe"
                    einleitung={
                        <p>
                            Jeder Treppentyp stellt eigene Anforderungen – an Optik, Belastbarkeit, Trittsicherheit und Witterungsbeständigkeit.
                            Wählen Sie Ihre Situation:
                        </p>
                    }
                >
                    <Feldraster spalten={3}>
                        {SUBPAGES.map((page, i) => {
                            const letzter = i === SUBPAGES.length - 1;
                            return (
                                <Feld
                                    key={page.path}
                                    spanne={letzter ? 2 : undefined}
                                    className={clsx('relative', letzter && 'lg:col-span-1')}
                                >
                                    <Link href={page.path} className="group flex flex-1 flex-col after:absolute after:inset-0">
                                        <h3 className="font-anzeige text-fs-4 text-tinte underline decoration-strich underline-offset-4 group-hover:decoration-tinte">
                                            {page.name}
                                        </h3>
                                        <p className={clsx(etikettKlassen, 'mt-3')}>{page.desc}</p>
                                        <p className="mt-4 max-w-mass font-text text-fs-2 text-tinte-2">{SUBPAGE_TEXT[page.path]}</p>
                                        <span className="mt-auto inline-flex items-center gap-2 pt-6 font-text text-fs-2 font-semibold text-tinte">
                                            Zur Detailseite
                                            <Icon name="pfeil-rechts" groesse={5} />
                                        </span>
                                    </Link>
                                </Feld>
                            );
                        })}
                    </Feldraster>
                </Abschnitt>

                {/* 3. VORAUSSETZUNG auf Fliese: Kopf gestapelt, darunter die beiden Listen an der Fuge nebeneinander (Haken bzw.
                    Hinweis im Titel) */}
                <Abschnitt
                    titelId="voraussetzung-heading"
                    leitachse
                    spaet
                    flaeche="fliese"
                    etikett="Voraussetzung"
                    titel="Tragfähige Massivtreppe: was sich belegen lässt – und was nicht"
                    einleitung={
                        <p>
                            Fliesen und Naturstein sind starre Beläge. Sie halten dauerhaft nur auf einem Untergrund, der sich nicht bewegt. Rohbau,
                            Geländer und Statik der Treppe sind nicht Teil unserer Leistung – wir prüfen beim Vor-Ort-Termin aber, ob Ihre Treppe
                            als Untergrund geeignet ist.
                        </p>
                    }
                >
                    <div className="grid gap-12 md:grid-cols-2 md:gap-8 lg:gap-12">
                        <div>
                            <h3 className="flex items-center gap-3 font-anzeige text-fs-4 text-tinte">
                                <Icon name="haken" groesse={5} />
                                In der Regel gut belegbar
                            </h3>
                            <FugenListe eintraege={SUITABLE} className="mt-6" />
                        </div>
                        <div>
                            <h3 className="flex items-center gap-3 font-anzeige text-fs-4 text-tinte">
                                <Icon name="hinweis" groesse={5} />
                                Nicht oder nur nach Klärung
                            </h3>
                            <FugenListe eintraege={NOT_SUITABLE} className="mt-6" />
                        </div>
                    </div>
                </Abschnitt>

                {/* 4. BELAGSARTEN als Feldraster mit zwei Spalten, darunter der Verweis auf Kanten und Rutschhemmung */}
                <Abschnitt
                    titelId="belagsarten-heading"
                    leitachse
                    spaet
                    etikett="Belagsarten im Überblick"
                    titel="Fliese, Stufenplatte, Naturstein – oder Blockstufe"
                >
                    <Feldraster spalten={2}>
                        {COVERINGS.map((item) => (
                            <Feld key={item.title}>
                                <h3 className="font-anzeige text-fs-4 text-tinte">{item.title}</h3>
                                <p className="mt-3 max-w-mass font-text text-fs-2 text-tinte-2">{item.desc}</p>
                            </Feld>
                        ))}
                    </Feldraster>
                    <p className="mt-8 max-w-mass font-text text-fs-2 text-tinte-2">
                        Wie die Stufenkante ausgebildet wird – Gehrung, Profil oder Stufenplatte – vergleichen wir ausführlich auf der Seite{' '}
                        <Link href="/treppen/innentreppe" className={linkKlassen}>
                            Innentreppe fliesen
                        </Link>
                        . Welche Rutschhemmung auf Stufen sinnvoll ist, erklärt unser Beitrag zu den{' '}
                        <Link href="/blog/rutschfeste-fliesen-r-klassen" className={linkKlassen}>
                            R-Klassen nach DIN EN 16165
                        </Link>
                        .
                    </p>
                </Abschnitt>

                {/* 5. STEIGUNGEN auf Fliese: links der Text an der Fuge, rechts die Punkte des Aufmaßes als Prüffeld auf Kalk */}
                <Abschnitt
                    titelId="steigungen-heading"
                    leitachse
                    spaet
                    flaeche="fliese"
                    etikett="Gleichmäßige Steigungen"
                    titel="Belagdicken und Ausgleich vorher planen"
                >
                    <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-12">
                        <div className="border-t border-tinte pt-6 lg:col-span-7">
                            <h3 className="font-anzeige text-fs-4 text-tinte">Warum es auf Millimeter ankommt</h3>
                            <div className="mt-4 grid max-w-mass gap-4 font-text text-fs-3 text-tinte-2">
                                <p>
                                    Beim Gehen stellt sich der Körper auf eine gleichbleibende Stufenhöhe ein. Weicht eine einzelne Steigung spürbar ab –
                                    häufig die erste oder die letzte –, wird die Treppe zur Stolperfalle. Die DIN 18065 dient als Orientierung: Sie lässt
                                    innerhalb eines Treppenlaufs nur geringe Abweichungen zwischen den Steigungen zu.
                                </p>
                                <p>
                                    Eine Treppe mit n Steigungen hat n Setzstufen, aber in der Regel nur n−1 Trittstufen – die oberste „Stufe“ ist der
                                    Boden des Obergeschosses bzw. das Podest. Die Belagsfläche einer Trittstufe ist der Auftritt einschließlich Überstand
                                    an der Vorderkante.
                                </p>
                            </div>
                        </div>
                        <div className="border border-fuge bg-kalk p-6 lg:col-span-5 lg:p-8">
                            <h3 className="font-anzeige text-fs-4 text-tinte">Was wir beim Aufmaß klären</h3>
                            <FugenListe eintraege={AUFMASS_PUNKTE} className="mt-6" />
                        </div>
                    </div>
                </Abschnitt>

                {/* 6. RENOVIERUNG: vier Schritte als Schrittfolge (ab lg waagrecht), darunter die zwei Wege */}
                <Abschnitt
                    titelId="renovieren-heading"
                    leitachse
                    spaet
                    etikett="Alte Treppe renovieren"
                    titel="Neuer Belag statt Abriss"
                    einleitung={
                        <p>
                            Viele ältere Treppen tragen Teppich, PVC oder abgenutzte Fliesen, während der Rohbau darunter noch tragfähig ist. Die
                            Renovierung läuft deshalb in klaren Schritten:
                        </p>
                    }
                >
                    <Schrittfolge
                        ausrichtung="waagrecht"
                        nummerStumm
                        schritte={RENOVIERUNG.map((step) => ({ titel: step.t, text: step.d }))}
                    />
                    <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                        <Knopf href="/kontakt" icon="pfeil-rechts">
                            Treppe begutachten lassen
                        </Knopf>
                        <Knopf href={`tel:${COMPANY_DATA.contact.phoneLink}`} variante="neben" iconLinks="telefon">
                            <span className="font-mono font-normal">{COMPANY_DATA.contact.phone}</span>
                        </Knopf>
                    </div>
                </Abschnitt>

                {/* 7. RATGEBER auf Fliese: Kopf seitlich, rechts das Register, je Zeile Titel, Beschreibung und Pfeil; die ganze
                    Zeile ist der Link */}
                <Abschnitt
                    titelId="treppen-ratgeber-heading"
                    leitachse
                    spaet
                    flaeche="fliese"
                    kopf="seitlich"
                    titel="Weiterführende Ratgeber zu Treppen & Treppensanierung"
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
                </Abschnitt>
            </Leitachse>

            {/* 8. ABSCHLUSS (geteilte Bausteine) */}
            <QualityPromise />
            <FinalCTA />
        </>
    );
}
