// Außentreppe (S-18 nach E5-BAU-09, KERN v2): Seitenkörper der Unterseite als Erzählansicht nach dem Muster der
// Familienreferenz (leistungen/[id], fliesen) und der Schwesterseiten /treppen und /treppen/innentreppe (S-17). Einstieg mit
// Laserachse, H1 links, Vorspann und zwei Knöpfe; rechts das Planblatt „Außentreppe fliesen“ mit dem Plan „treppe“
// (interaktiv, die rote Achse trägt das Blatt). Danach die Leitachse über die Abschnitte, Flächen im Wechsel Kalk/Fliese:
// 2. Beanspruchung als Feldraster mit vier Feldern (Kalk) · 3. Typische Schäden als Merkliste im Halbverband (Fliese) ·
// 4. Aufbau: Kopf seitlich, Liste an der Fuge (Kalk) · 5. Material als Feldraster mit drei Feldern (Fliese) · 6. Sanierung als
// Schrittfolge waagrecht mit zwei Wegen (Kalk) · 7. Ratgeber als Register (Fliese, trennt vom Qualitätsversprechen) ·
// Qualitätsversprechen (geteilter Baustein). Kein Auftritt, kein großer Moment.
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
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import Knopf from '@/components/kern/Knopf';
import Leitachse from '@/components/kern/Leitachse';
import Merkliste from '@/components/kern/Merkliste';
import Planblatt, { planfelder } from '@/components/kern/Planblatt';
import Schrittfolge from '@/components/kern/Schrittfolge';
import Verlegeplan from '@/components/kern/Verlegeplan';
import { linkKlassen } from '@/components/kern/stile';
import SeitenDaten from '@/components/seo/SeitenDaten';

export const metadata = createMetadata({
    title: 'Außentreppe fliesen: frostsicher & rutschfest | Tezgel',
    description:
        'Außentreppe frostsicher fliesen & sanieren: rutschhemmende Platten, Gefälleausbildung & Abdichtung. Fliesenleger-Fachbetrieb Tezgel in Wetzlar & Aßlar.',
    path: '/treppen/aussentreppe'
});

const STRESS = [
    {
        title: 'Wasser',
        desc: 'Regen, Schnee und Tauwasser treffen jede Stufe direkt. Dringt Wasser über Fugen oder Hohlstellen unter den Belag, fehlt ihm oft der Weg nach draußen.'
    },
    {
        title: 'Frost-Tau-Wechsel',
        desc: 'Gefriert eingedrungenes Wasser, dehnt es sich aus und sprengt Platten, Kanten und Mörtelbett. Gerade Winter mit häufigem Wechsel von Frost und Tauwetter setzen Außentreppen zu.'
    },
    {
        title: 'Temperatur und Sonne',
        desc: 'Belag und Untergrund dehnen sich bei Sonneneinstrahlung unterschiedlich stark. Ohne flexiblen Kleber und fachgerechte Fugen entstehen Spannungen und Ablösungen.'
    },
    {
        title: 'Nässe und Schmutz',
        desc: 'Nasses Laub, Moos und Eis machen Stufen rutschig. Die Oberfläche muss auch nass griffig sein und die Stufenkante gut erkennbar bleiben.'
    }
];

const DAMAGE = [
    { title: 'Frostabplatzungen', desc: 'Abgesprengte Kanten und Oberflächen – meist über Hohlstellen, in die Wasser eindringen konnte, oder bei nicht frostbeständigem Material.' },
    { title: 'Lose Platten', desc: 'Hohl klingende oder wackelnde Platten zeigen, dass der Verbund zum Untergrund verloren ist. Unter ihnen steht oft Wasser.' },
    { title: 'Ausblühungen', desc: 'Weiße Kalkschleier an Fugen und Setzstufen entstehen, wenn Wasser durch Mörtelbett oder Beton wandert und Kalk an die Oberfläche transportiert.' },
    { title: 'Ausgewaschene Fugen', desc: 'Offene oder bröselnde Fugen lassen noch mehr Wasser unter den Belag – der Schaden beschleunigt sich von Winter zu Winter.' }
];

const BUILDUP = [
    'Tragfähiger, frostsicher gegründeter Unterbau – Beton- oder Fundamentarbeiten sowie die Statik gehören nicht zu unseren Leistungen und werden bei Bedarf vorab von einem Fachbetrieb ausgeführt',
    'Leichtes Gefälle auf Podest und Trittstufen nach vorn bzw. zur Seite, damit Wasser nicht stehen bleibt',
    'Abdichtung im Verbund unter dem Belag, wo der Untergrund vor eindringendem Wasser geschützt werden muss – etwa bei Podesten über Kellerräumen',
    'Vollflächige, hohlraumarme Verlegung mit flexiblem, für außen geeignetem Kleber (z. B. C2 nach DIN EN 12004) und frostbeständigem Fugenmörtel',
    'Überstand der Trittstufe mit ausgebildeter Tropfkante oder passendem Profil, damit Wasser an der Vorderkante abtropft und nicht in die Setzstufe läuft'
];

// Material: drei Felder wie im Bestand (Text als JSX, Wortlaut unverändert)
const MATERIAL = [
    {
        title: 'Frostbeständiges Feinsteinzeug',
        text: (
            <>
                Feinsteinzeug nimmt kaum Wasser auf und ist deshalb in der Regel frostbeständig – maßgeblich ist die Herstellerangabe zur
                Frostbeständigkeit. Für Stufen im Freien empfiehlt sich als Richtwert eine Rutschhemmung von R11 (Prüfung nach DIN EN 16165).
            </>
        )
    },
    {
        title: 'Naturstein',
        text: (
            <>
                Ob ein Naturstein frostbeständig ist, hängt von der Sorte und ihrer Wasseraufnahme ab – Granit und viele Quarzite sind gut
                geeignet, manche Kalksteine nicht. Geflammte oder gestockte Oberflächen sind außen deutlich griffiger als polierte.
            </>
        )
    },
    {
        title: 'Blockstufen als Konstruktion',
        text: (
            <>
                Blockstufen sind massive Stufen aus Naturstein oder Beton, die als eigene Treppenkonstruktion auf ein Fundament bzw. in ein
                Mörtelbett gesetzt werden – kein Belag auf einer bestehenden Treppe. Sie eignen sich besonders für Hauseingänge und
                Gartentreppen.
            </>
        )
    }
];

const RENOVATION = [
    { t: 'Schadensbild aufnehmen', d: 'Klopfprobe, Zustand von Fugen, Kanten und Unterbau, Wasserwege und Anschlüsse an Haus und Tür.' },
    { t: 'Altbelag zurückbauen', d: 'Lose und hohle Platten sowie mürbes Mörtelbett werden entfernt, bis ein tragfähiger Untergrund vorliegt.' },
    { t: 'Untergrund vorbereiten', d: 'Ausbrüche schließen, Gefälle herstellen und – wo nötig – eine Verbundabdichtung aufbringen.' },
    { t: 'Neu belegen und verfugen', d: 'Stufen einzeln zuschneiden, vollflächig verlegen, frostbeständig verfugen und Anschlüsse elastisch schließen.' }
];

const WEITERLESEN = [
    { title: 'Außenbereiche', path: '/leistungen/aussen', desc: 'Balkon, Terrasse und Eingang' },
    { title: 'Untergrund & Abdichtung', path: '/leistungen/untergrund', desc: 'Das Fundament jedes dauerhaften Belags' },
    { title: 'Kantenlösungen im Vergleich', path: '/treppen/innentreppe', desc: 'Gehrung, Profil oder Stufenplatte' },
    { title: 'Häufige Fragen', path: '/faq', desc: 'Antworten rund um Fliesen und Ablauf' }
];

// Hochkant-Plan im Planblatt: mittig, schmaler als das Blatt (wie auf /treppen und /treppen/innentreppe)
const PLAN_HOCHKANT = 'mx-auto max-w-1/2 md:max-w-1/3 lg:max-w-1/2';

// Zeile des Registers (Ratgeber auf Fliese): die ganze Zeile ist der Link; Hover färbt die Fläche auf Kalk
const ZEILE = 'group flex min-h-12 items-center gap-4 px-3 py-4 pointer-fine:hover:bg-kalk active:bg-kalk';
// Name in der Zeile: Unterstrich beim Überfahren
const NAME =
    'font-text text-fs-3 font-semibold text-tinte md:w-1/3 md:shrink-0 decoration-1 underline-offset-4 decoration-tinte pointer-fine:group-hover:underline group-active:underline';

// Liste an der Fuge: Fugenkreuz als Marke, Text in Textschrift im Lesemaß (wie auf /treppen)
function FugenListe({ eintraege, className }) {
    return (
        <ul className={clsx('border-t border-fuge', className)}>
            {eintraege.map((item) => (
                <li key={item} className="flex gap-3 border-b border-fuge py-4 font-text text-fs-2 text-tinte">
                    <span aria-hidden="true" className="flex h-6 shrink-0 items-center text-strich">
                        <Fugenkreuz className="size-3" />
                    </span>
                    <span className="min-w-0 max-w-mass">{item}</span>
                </li>
            ))}
        </ul>
    );
}

export default function AussentreppePage() {
    return (
        <>
            <SeitenDaten
                pfad="/treppen/aussentreppe"
                titel="Außentreppe fliesen: frostsicher & rutschfest | Tezgel"
                beschreibung="Außentreppe frostsicher fliesen & sanieren: rutschhemmende Platten, Gefälleausbildung & Abdichtung. Fliesenleger-Fachbetrieb Tezgel in Wetzlar & Aßlar."
                brotkrumen={[{ name: 'Start', href: '/' }, { name: 'Treppen', href: '/treppen' }, { name: 'Außentreppe fliesen: frostsicher & rutschfest bei Tezgel' }]}
            />
            {/* 1. EINSTIEG: Kennzeile, H1 an der Laserachse, Vorspann, zwei Knöpfe; rechts das Planblatt „treppe“ */}
            <section aria-labelledby="aussentreppe-heading">
                <Einstieg
                    art="erzaehl"
                    etikett={<>Treppen &middot; Außenbereich</>}
                    titel={
                        <span id="aussentreppe-heading">
                            Außentreppe fliesen: frostsicher &amp; rutschfest bei{' '}
                            <span>Tezgel</span>
                        </span>
                    }
                    vorspann={
                        <p>
                            Außentreppe und Hauseingang frostsicher fliesen &amp; sanieren: Fliesenleger-Fachbetrieb Tezgel belegt Stufen und
                            Podeste mit rutschfesten Platten, normgerechtem Gefälle und dauerhafter Verbundabdichtung in Wetzlar &amp; Aßlar.
                        </p>
                    }
                    aktionen={
                        <>
                            <Knopf href="/kontakt" icon="pfeil-rechts">
                                Außentreppe begutachten lassen
                            </Knopf>
                            <Knopf href="/treppen" variante="neben">
                                Alle Treppentypen
                            </Knopf>
                        </>
                    }
                    rand={
                        // Der Plan „treppe“ steht hochkant (16 × 24): mittig auf halber bzw. (md) einem Drittel der Blattbreite
                        <Planblatt felder={planfelder('Außentreppe fliesen', 'treppe')}>
                            <Verlegeplan plan="treppe" ohneAchse bemassung={false} interaktiv className={PLAN_HOCHKANT} />
                        </Planblatt>
                    }
                />
            </section>

            {/* LEITACHSE: das Lot setzt die Achse des Einstiegs über die Abschnitte fort */}
            <Leitachse>
                {/* 2. BEANSPRUCHUNG: vier Felder (ab lg in einer Reihe, md zwei Spalten – keine Restzelle) */}
                <Abschnitt
                    titelId="beanspruchung-heading"
                    leitachse
                    spaet
                    etikett="Besondere Beanspruchung"
                    titel="Warum Außentreppen mehr aushalten müssen"
                >
                    <Feldraster spalten={4}>
                        {STRESS.map((item) => (
                            <Feld key={item.title}>
                                <h3 className="font-anzeige text-fs-4 text-tinte">{item.title}</h3>
                                <p className="mt-3 max-w-mass font-text text-fs-2 text-tinte-2">{item.desc}</p>
                            </Feld>
                        ))}
                    </Feldraster>
                </Abschnitt>

                {/* 3. TYPISCHE SCHÄDEN auf Fliese: Merkliste im Halbverband (Titel bleiben h3), darunter der Verweis auf die
                    Schadensanalyse */}
                <Abschnitt
                    titelId="schaeden-heading"
                    leitachse
                    spaet
                    flaeche="fliese"
                    etikett="Typische Schäden"
                    titel="Frostabplatzungen, lose Platten, Ausblühungen"
                >
                    <Merkliste spalten={2} verband titelAls="h3" eintraege={DAMAGE.map((item) => ({ titel: item.title, text: item.desc }))} />
                    <p className="mt-12 max-w-mass font-text text-fs-2 text-tinte-2">
                        Die Ursache eines Schadens klären wir vor Ort, bevor wir eine Lösung vorschlagen – mehr dazu unter{' '}
                        <Link href="/schadensanalyse" className={linkKlassen}>
                            Schadensanalyse
                        </Link>
                        .
                    </p>
                </Abschnitt>

                {/* 4. AUFBAU: Kopf seitlich, rechts die fünf Punkte als Liste an der Fuge und der Verweis auf den Überblick */}
                <Abschnitt titelId="aufbau-heading" leitachse spaet kopf="seitlich" etikett="Aufbau" titel="Gefälle, Abdichtung, Entwässerung">
                    <FugenListe eintraege={BUILDUP} />
                    <p className="mt-8 max-w-mass font-text text-fs-2 text-tinte-2">
                        Auch außen gilt: Die Steigungen sollen gleichmäßig bleiben. Wie Belagdicken und Ausgleich geplant werden, lesen Sie im{' '}
                        <Link href="/treppen" className={linkKlassen}>
                            Treppen-Überblick
                        </Link>
                        .
                    </p>
                </Abschnitt>

                {/* 5. MATERIAL auf Fliese: drei Felder; das dritte überspannt in md die freie Breite (keine Restzelle); darunter
                    der Verweis auf die Kantenlösungen */}
                <Abschnitt
                    titelId="material-heading"
                    leitachse
                    spaet
                    flaeche="fliese"
                    etikett={<>Material &amp; Trittsicherheit</>}
                    titel="Frostfeste Keramik, Naturstein oder Blockstufe"
                >
                    <Feldraster spalten={3}>
                        {MATERIAL.map((item, i) => {
                            const letzter = i === MATERIAL.length - 1;
                            return (
                                <Feld key={item.title} spanne={letzter ? 2 : undefined} className={clsx(letzter && 'lg:col-span-1')}>
                                    <h3 className="font-anzeige text-fs-4 text-tinte">{item.title}</h3>
                                    <p className="mt-3 max-w-mass font-text text-fs-2 text-tinte-2">{item.text}</p>
                                </Feld>
                            );
                        })}
                    </Feldraster>
                    <p className="mt-8 max-w-mass font-text text-fs-2 text-tinte-2">
                        Für die Stufenkante gelten außen zusätzlich Frost und Wasserablauf: Gehrungskanten brauchen besonders dichtes Material und
                        einen vollflächigen Verbund, Profile müssen für außen geeignet sein. Den allgemeinen Vergleich der Kantenlösungen finden Sie
                        unter{' '}
                        <Link href="/treppen/innentreppe" className={linkKlassen}>
                            Innentreppe fliesen
                        </Link>
                        .
                    </p>
                </Abschnitt>

                {/* 6. SANIERUNG: vier Schritte als Schrittfolge (ab lg waagrecht, Nummern nur sichtbar wie im Bestand), darunter
                    die zwei Wege */}
                <Abschnitt
                    titelId="sanierung-heading"
                    leitachse
                    spaet
                    etikett="Sanierung"
                    titel="Außentreppe sanieren – Schritt für Schritt"
                >
                    <Schrittfolge
                        ausrichtung="waagrecht"
                        nummerStumm
                        schritte={RENOVATION.map((step) => ({ titel: step.t, text: step.d }))}
                    />
                    <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                        <Knopf href="/kontakt" icon="pfeil-rechts">
                            Vor-Ort-Termin anfragen
                        </Knopf>
                        <Knopf href={`tel:${COMPANY_DATA.contact.phoneLink}`} variante="neben" iconLinks="telefon">
                            <span className="font-mono font-normal">{COMPANY_DATA.contact.phone}</span>
                        </Knopf>
                    </div>
                </Abschnitt>

                {/* 7. RATGEBER auf Fliese: Register, je Zeile Titel, Beschreibung und Pfeil; die ganze Zeile ist der Link. Die
                    Fläche trennt den Abschnitt vom folgenden Qualitätsversprechen (Kalk) */}
                <Abschnitt
                    titelId="aussentreppe-ratgeber-heading"
                    leitachse
                    spaet
                    flaeche="fliese"
                    titel={<>Weiterführende Ratgeber zu Außentreppen &amp; Eingangsbereichen</>}
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

            {/* 8. QUALITÄTSVERSPRECHEN (geteilter Baustein); einen Abschluss hat die Seite im Bestand nicht */}
            <QualityPromise />
        </>
    );
}
