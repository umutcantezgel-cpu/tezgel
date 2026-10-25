// Verlegetechnik (E4-BAU-10, KERN v2): Erzählansicht nach dem Muster der Fliesen-Ratgeber-Seite und der Badseite.
// Einstieg mit Laserachse, H1 links, Vorspann und zwei Knöpfe; rechts das Planblatt mit dem Plan „fugen“ (der Verlegeplan
// trägt die rote Achse des Blatts). Danach die Leitachse über die Abschnitte: Verfahren und Kleber als Feldraster mit
// Verformbarkeit, Grundierung und Hohlstellen als Felder, Fugenmörtel als Tabelle, Bewegungsfugen als Merkliste,
// Weiterführende Ratgeber als Merkliste. Danach QualityPromise und der Konfigurator (nachgeladen) mit Rückfrage daneben.
// Wortlaut, Überschriften, Links und IDs wie im Bestand. Kein großer Moment und keine Bewegung außer dem Plan (interaktiv).
import Link from 'next/link';
import dynamic from 'next/dynamic';
import FormularPlatzhalter from '@/components/funnels/TezgelAnfrageFunnel/Platzhalter';
import { COMPANY_DATA } from '@/config/company';
import { createMetadata } from '@/lib/metadata';
import SeitenDaten from '@/components/seo/SeitenDaten';
import QualityPromise from '@/components/sections/QualityPromise';
import Abschnitt from '@/components/kern/Abschnitt';
import Einstieg from '@/components/kern/Einstieg';
import Planblatt, { planfelder } from '@/components/kern/Planblatt';
import { Feld, Feldraster } from '@/components/kern/Feldraster';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import Knopf from '@/components/kern/Knopf';
import Leitachse from '@/components/kern/Leitachse';
import Merkliste from '@/components/kern/Merkliste';
import Rueckfrage from '@/components/kern/Rueckfrage';
import Tabelle from '@/components/kern/Tabelle';
import Verlegeplan from '@/components/kern/Verlegeplan';
import { etikettKlassen, linkKlassen } from '@/components/kern/stile';

// Konfigurator nachladen (Tempo, wie auf der Startseite und den Leistungsseiten)
const FliesenKonfigurator = dynamic(() => import('@/components/funnels/FliesenKonfigurator'), {
    loading: () => <FormularPlatzhalter />,
});

export const metadata = createMetadata({
    title: 'Verlegetechnik Fliesen: Dünnbett & Kleber | Tezgel',
    description:
        'Verlegetechniken für Fliesen nach DIN 18157: Dünnbett, Mittelbett, Buttering-Floating & Kleberklassen erklärt vom Fachbetrieb Tezgel aus Aßlar & Wetzlar.',
    path: '/fliesen/verlegetechnik'
});

const METHODS = [
    {
        title: 'Dünnbettverfahren',
        norm: 'DIN 18157',
        desc: 'Der Standard für ebene Untergründe: Der Kleber wird mit der Zahnkelle aufgekämmt, die Fliese eingeschoben und angedrückt. Das Kleberbett ist nur wenige Millimeter dick – deshalb muss der Untergrund vorher eben genug sein.'
    },
    {
        title: 'Mittelbettverfahren',
        norm: 'Mittelbettmörtel',
        desc: 'Ein dickeres, standfestes Kleberbett gleicht Maßtoleranzen der Fliesenrückseite und kleinere Unebenheiten aus. Typisch für großformatige Platten, profilierte Rückseiten und nicht kalibrierten Naturstein.'
    },
    {
        title: 'Dickbettverfahren',
        norm: 'Mörtelbett',
        desc: 'Die traditionelle Verlegung in einem mehrere Zentimeter starken Mörtelbett. Heute nur noch für Sonderfälle, etwa Blockstufen auf einem Fundament im Außenbereich oder das Setzen von Werkstücken auf stark unebenem Untergrund.'
    }
];

const ADHESIVE_CLASSES = [
    { code: 'C1', label: 'Zementärer Kleber, normale Haftung', desc: 'Mindesthaftzugfestigkeit nach DIN EN 12004-1 von 0,5 N/mm². Für einfache Anwendungen im Innenbereich.' },
    { code: 'C2', label: 'Zementärer Kleber, erhöhte Haftung', desc: 'Mindesthaftzugfestigkeit von 1,0 N/mm². Standard für Feinsteinzeug, dichte Fliesen, Großformate und Außenbereiche.' },
    { code: 'F', label: 'Schnell erhärtend', desc: 'Früh belastbar und verfugbar – sinnvoll bei knappen Zeitfenstern, verlangt aber zügiges Arbeiten.' },
    { code: 'T', label: 'Reduziertes Abrutschen', desc: 'Standfester Kleber: Wandfliesen rutschen beim Ansetzen nicht ab, auch bei schweren Formaten.' },
    { code: 'E', label: 'Verlängerte offene Zeit', desc: 'Der aufgekämmte Kleber bleibt länger klebefähig – hilfreich bei großen Platten und größeren Flächen.' }
];

const DEFORMABILITY = [
    { code: 'S1', label: 'verformbar', desc: 'Querverformung ab 2,5 mm, geprüft nach DIN EN 12002. Nimmt Spannungen aus Temperaturwechseln und Restschwinden des Estrichs besser auf.' },
    { code: 'S2', label: 'hochverformbar', desc: 'Querverformung ab 5 mm. Für stärker beanspruchte Konstruktionen, zum Beispiel Balkone und Terrassen oder sehr große Formate.' }
];

const GROUT_ROWS = [
    { label: 'Norm & Klasse', cement: 'DIN EN 13888, CG2 WA (erhöhte Anforderungen, reduzierte Wasseraufnahme, hohe Abriebbeständigkeit)', resin: 'DIN EN 13888, RG (Reaktionsharz-Fugenmörtel)' },
    { label: 'Einsatz', cement: 'Wohnräume, Flur, Küche, Bad, Balkon und Terrasse', resin: 'Stark beanspruchte Flächen, Bereiche mit Säure- oder Reinigungsmittelkontakt, Küchenarbeitsbereiche' },
    { label: 'Wasser & Schmutz', cement: 'Wasserabweisend, aber offenporiger; dunkelt bei Dauerfeuchte eher nach', resin: 'Nahezu dicht, sehr fleckunempfindlich' },
    { label: 'Chemikalien', cement: 'Säureempfindlich – saure Reiniger greifen den Zementstein an', resin: 'Hohe Beständigkeit gegen viele Reinigungs- und Lebensmittelsäuren' },
    { label: 'Verarbeitung', cement: 'Bewährt und gut nacharbeitbar', resin: 'Kurze Verarbeitungszeit, Rückstände müssen sofort entfernt werden; bei offenporigen Oberflächen vorher Probefläche anlegen' }
];

const JOINTS = [
    { title: 'Randfugen', desc: 'Trennen den Belag von aufgehenden Wänden, Stützen und Einbauteilen. Beim schwimmenden Estrich bleibt der Randdämmstreifen dafür bis nach dem Verfugen stehen.' },
    { title: 'Bewegungsfugen', desc: 'Fugen im Estrich werden deckungsgleich in den Fliesenbelag übernommen. Große Flächen erhalten zusätzlich Feldbegrenzungsfugen nach Planung.' },
    { title: 'Anschlussfugen', desc: 'Übergänge zu Badewanne, Duschtasse, Türzarge oder anderen Belägen werden elastisch geschlossen – als Wartungsfuge, die regelmäßig kontrolliert wird.' }
];

const CROSS_LINKS = [
    { href: '/leistungen/untergrund', label: 'Untergrundvorbereitung', desc: 'Tragfähig, eben und trocken – die Basis für jeden Kleber' },
    { href: '/fliesen/verlegemuster', label: 'Verlegemuster & Abschlüsse', desc: 'Fugenbild, Verband, Kanten und Sockel' },
    { href: '/bad/fliesen', label: 'Fliesen im Bad', desc: 'Formate, Abdichtung und Details im Nassraum' },
    { href: '/faq', label: 'Häufige Fragen', desc: 'Antworten rund um Fliesenarbeiten' }
];

export default function VerlegetechnikPage() {
    return (
        <>
            <SeitenDaten
                pfad="/fliesen/verlegetechnik"
                titel="Verlegetechnik Fliesen: Dünnbett & Kleber | Tezgel"
                beschreibung="Verlegetechniken für Fliesen nach DIN 18157: Dünnbett, Mittelbett, Buttering-Floating & Kleberklassen erklärt vom Fachbetrieb Tezgel aus Aßlar & Wetzlar."
                brotkrumen={[
                    { name: 'Start', href: '/' },
                    { name: 'Fliesen und Verlegung', href: '/fliesen' },
                    { name: 'Verlegetechnik und Werkstoffe: Kleber, Bettung und Fugenmörtel' },
                ]}
            />
            {/* 1. EINSTIEG: Kennzeile, H1 auf der Achse, Vorspann, Knöpfe; rechts das Planblatt mit dem Plan „fugen“ */}
            <section aria-labelledby="verlegetechnik-heading">
                <Einstieg
                    art="erzaehl"
                    etikett={<>DIN 18157 &middot; DIN EN 12004 &middot; DIN EN 13888</>}
                    titel={
                        <span id="verlegetechnik-heading">
                            Verlegetechnik und Werkstoffe:{' '}
                            <span>Kleber, Bettung und Fugenmörtel</span>
                        </span>
                    }
                    vorspann={
                        <p>
                            Was unter der Fliese passiert, sieht man nach der Verlegung nicht mehr – und doch entscheidet es über
                            Jahrzehnte Haltbarkeit. Hier erfahren Sie, welches Verlegeverfahren wann passt, was die Kürzel auf dem
                            Klebersack bedeuten und welcher Fugenmörtel zu welcher Fläche gehört. So können Sie Angebote
                            fachlich einordnen.
                        </p>
                    }
                    aktionen={
                        <>
                            <Knopf href="/kontakt" icon="pfeil-rechts">Aufmaß &amp; Beratung anfragen</Knopf>
                            <Knopf href={`tel:${COMPANY_DATA.contact.phoneLink}`} variante="neben" iconLinks="telefon">
                                <span className="font-mono font-normal">{COMPANY_DATA.contact.phone}</span>
                            </Knopf>
                        </>
                    }
                    rand={
                        <Planblatt felder={planfelder('Verlegetechnik Fliesen', 'fugen')}>
                            <Verlegeplan plan="fugen" ohneAchse bemassung={false} interaktiv />
                        </Planblatt>
                    }
                />
            </section>

            <Leitachse>
                {/* 2. VERFAHREN: drei Felder, je Verfahren Norm, Titel und Text */}
                <Abschnitt
                    titelId="verfahren-heading"
                    leitachse
                    spaet
                    etikett="Bettung"
                    titel="Dünnbett, Mittelbett, Dickbett: die Verfahren im Überblick"
                    einleitung={
                        <p>
                            Welches Verfahren passt, hängt vom Untergrund, vom Format und vom Material ab. Im Wohnungsbau ist das
                            Dünnbett heute die Regel – vorausgesetzt, der Untergrund wurde vorher tragfähig und eben vorbereitet.
                        </p>
                    }
                >
                    <Feldraster spalten={3}>
                        {METHODS.map((item) => (
                            <Feld key={item.title}>
                                <p className={etikettKlassen}>{item.norm}</p>
                                <h3 className="mt-6 font-anzeige text-fs-4 text-tinte">{item.title}</h3>
                                <p className="mt-3 font-text text-fs-2 text-tinte-2">{item.desc}</p>
                            </Feld>
                        ))}
                    </Feldraster>
                </Abschnitt>

                {/* 3. FLIESENKLEBER: fünf Klassen (letztes Feld über zwei Spalten), darunter Verformbarkeit S1 und S2 */}
                <Abschnitt
                    titelId="kleber-heading"
                    flaeche="fliese"
                    leitachse
                    spaet
                    etikett="Fliesenkleber"
                    titel="Fliesenkleber nach DIN EN 12004: C1, C2, F, T, E"
                    einleitung={
                        <p>
                            Die Norm teilt Kleber nach ihrer Basis ein – C für zementär, D für Dispersion, R für Reaktionsharz –
                            und ergänzt Leistungsmerkmale. Eine Bezeichnung wie „C2 TE S1“ lässt sich damit Buchstabe für
                            Buchstabe lesen.
                        </p>
                    }
                >
                    <Feldraster spalten={3}>
                        {ADHESIVE_CLASSES.map((item, i) => (
                            <Feld key={item.code} spanne={i === ADHESIVE_CLASSES.length - 1 ? 2 : undefined}>
                                <span className={etikettKlassen} aria-hidden="true">{item.code}</span>
                                <h3 className="mt-6 font-anzeige text-fs-4 text-tinte">
                                    <span className="sr-only">{item.code}: </span>
                                    {item.label}
                                </h3>
                                <p className="mt-3 font-text text-fs-2 text-tinte-2">{item.desc}</p>
                            </Feld>
                        ))}
                    </Feldraster>

                    <div className="mt-16 grid gap-8 lg:grid-cols-12 lg:gap-x-12">
                        <div className="lg:col-span-4">
                            <p className={etikettKlassen}>Verformbarkeit</p>
                            <h3 className="mt-3 font-anzeige text-fs-5 text-tinte">S1 und S2: wann flexibler Kleber nötig ist</h3>
                            <p className="mt-3 max-w-mass font-text text-fs-3 text-tinte-2">
                                Fliesen, Kleber und Untergrund dehnen sich bei Temperaturwechseln unterschiedlich. Ein verformbarer
                                Kleber baut diese Spannungen ab, bevor sie zu Rissen oder Hohlstellen führen. Wir setzen
                                grundsätzlich flexible Kleber der Klasse C2 TE S1 oder S2 ein und wählen die Stufe passend zu
                                Untergrund, Format und Beanspruchung.
                            </p>
                        </div>
                        <div className="lg:col-span-8">
                            <Feldraster spalten={2}>
                                {DEFORMABILITY.map((item) => (
                                    <Feld key={item.code}>
                                        <h4 className="font-anzeige text-fs-4 text-tinte">
                                            {item.code} <span className="font-normal text-tinte-2">– {item.label}</span>
                                        </h4>
                                        <p className="mt-3 font-text text-fs-2 text-tinte-2">{item.desc}</p>
                                    </Feld>
                                ))}
                            </Feldraster>
                        </div>
                    </div>
                </Abschnitt>

                {/* 4. GRUNDIERUNG UND HOHLSTELLEN: zwei Felder nebeneinander, je Text, Fugenkreuz-Liste und ein Textlink */}
                <Abschnitt leitachse spaet>
                    <Feldraster spalten={2}>
                        <Feld>
                            <article className="flex flex-1 flex-col">
                                <h2 id="grundierung-heading" className="font-anzeige text-fs-5 text-tinte">
                                    Grundierung und Haftbrücke: die unsichtbare Schicht
                                </h2>
                                <p className="mt-3 font-text text-fs-3 text-tinte-2">
                                    Die Grundierung wird oft unterschätzt. Sie reguliert die Saugfähigkeit des Untergrunds, bindet
                                    Reststaub und sorgt dafür, dass der Kleber nicht zu schnell Wasser verliert.
                                </p>
                                <ul className="mt-6 grid gap-3 font-text text-fs-2 text-tinte-2">
                                    <li className="flex gap-3">
                                        <span aria-hidden="true" className="flex h-6 shrink-0 items-center text-strich"><Fugenkreuz className="size-3" /></span>
                                        <span className="min-w-0">Saugende Untergründe wie Zementestrich, Putz oder Gipskarton: Tiefengrund bzw. Grundierung nach Herstellerangabe.</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span aria-hidden="true" className="flex h-6 shrink-0 items-center text-strich"><Fugenkreuz className="size-3" /></span>
                                        <span className="min-w-0">Calciumsulfatestrich: wird angeschliffen, abgesaugt und grundiert, damit der zementäre Kleber keine schädlichen Reaktionen mit dem Gips eingeht.</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span aria-hidden="true" className="flex h-6 shrink-0 items-center text-strich"><Fugenkreuz className="size-3" /></span>
                                        <span className="min-w-0">Dichte, glatte Flächen wie alte Fliesen: gereinigt und mit einer Haftbrücke vorbereitet.</span>
                                    </li>
                                </ul>
                                <div className="mt-auto pt-6">
                                    <Knopf href="/untergrund-abdichtung" variante="text" icon="pfeil-rechts">Mehr zu Untergrund &amp; Abdichtung</Knopf>
                                </div>
                            </article>
                        </Feld>
                        <Feld>
                            <article className="flex flex-1 flex-col">
                                <h2 className="font-anzeige text-fs-5 text-tinte">Hohlstellen vermeiden: vollflächige Bettung</h2>
                                <p className="mt-3 font-text text-fs-3 text-tinte-2">
                                    Bodenfliesen, Großformate, Nassbereiche und Außenflächen müssen möglichst hohlraumarm im Kleber
                                    liegen. Hohlräume unter der Fliese sind Schwachstellen: Bei Punktlast kann die Kante brechen, im
                                    Außenbereich sammelt sich Wasser und friert.
                                </p>
                                <ul className="mt-6 grid gap-3 font-text text-fs-2 text-tinte-2">
                                    <li className="flex gap-3">
                                        <span aria-hidden="true" className="flex h-6 shrink-0 items-center text-strich"><Fugenkreuz className="size-3" /></span>
                                        <span className="min-w-0">Zahnung der Kelle passend zu Format und Rückseite wählen.</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span aria-hidden="true" className="flex h-6 shrink-0 items-center text-strich"><Fugenkreuz className="size-3" /></span>
                                        <span className="min-w-0">Kombiniertes Verfahren (Buttering-Floating): Kleber auf Untergrund und Fliesenrückseite.</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span aria-hidden="true" className="flex h-6 shrink-0 items-center text-strich"><Fugenkreuz className="size-3" /></span>
                                        <span className="min-w-0">Fliese einschieben statt nur aufdrücken, damit die Kleberstege zusammenfließen.</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span aria-hidden="true" className="flex h-6 shrink-0 items-center text-strich"><Fugenkreuz className="size-3" /></span>
                                        <span className="min-w-0">Stichprobenartig eine frisch verlegte Fliese abheben und die Benetzung kontrollieren.</span>
                                    </li>
                                </ul>
                                <div className="mt-auto pt-6">
                                    <Knopf href="/fliesen/grossformat" variante="text" icon="pfeil-rechts">Großformate richtig verlegen</Knopf>
                                </div>
                            </article>
                        </Feld>
                    </Feldraster>
                </Abschnitt>

                {/* 5. FUGENMÖRTEL: Text mit Verweis, darunter die Vergleichstabelle als benannte Region */}
                <Abschnitt
                    titelId="fuge-heading"
                    flaeche="fliese"
                    leitachse
                    spaet
                    etikett="Fugenmörtel"
                    titel="Fugenmörtel nach DIN EN 13888: zementär oder Reaktionsharz"
                    einleitung={
                        <p>
                            Für die meisten Wohnflächen ist ein hochwertiger zementärer Fugenmörtel die richtige Wahl.
                            Reaktionsharz spielt seine Stärken dort aus, wo Säuren, Fett oder intensive Reinigung auf die Fuge
                            treffen. Farbe, Breite und Fugenbild behandeln wir auf der Seite{' '}
                            <Link href="/fliesen/verlegemuster" className={linkKlassen}>
                                Verlegemuster &amp; Abschlüsse
                            </Link>
                            .
                        </p>
                    }
                >
                    <Tabelle
                        name="Vergleich zementärer Fugenmörtel und Reaktionsharz-Fugenmörtel"
                        kopf={[<>Kriterium</>, <>Zementär (CG2)</>, <>Reaktionsharz (RG)</>]}
                        zeilen={GROUT_ROWS.map((row) => [row.label, row.cement, row.resin])}
                    />
                </Abschnitt>

                {/* 6. BEWEGUNGSFUGEN: drei Fugenarten als Merkliste, darunter der Verweis auf die Fugensanierung */}
                <Abschnitt
                    titelId="bewegungsfugen-heading"
                    leitachse
                    spaet
                    etikett="Fugenplanung"
                    titel="Bewegungs-, Rand- und Anschlussfugen"
                    einleitung={
                        <p>
                            Ein Fliesenbelag ist starr, das Gebäude arbeitet. Fugen an den richtigen Stellen verhindern, dass sich
                            diese Bewegungen als Risse oder abgelöste Fliesen zeigen.
                        </p>
                    }
                >
                    <Merkliste
                        titelAls="h3"
                        eintraege={JOINTS.map((item) => ({ titel: item.title, text: item.desc }))}
                    />
                    <p className="mt-8 max-w-mass font-text text-fs-3 text-tinte-2">
                        Wie elastische Fugen im Bestand erneuert werden, erklären wir auf der Seite{' '}
                        <Link href="/fliesen/fugensanierung" className={linkKlassen}>
                            Fugensanierung
                        </Link>
                        .
                    </p>
                </Abschnitt>

                {/* 7. WEITERFÜHRENDE RATGEBER: vier Verweise als Merkliste */}
                <Abschnitt titelId="ratgeber-heading" flaeche="fliese" leitachse spaet titel="Weiterführende Ratgeber zur Verlegetechnik">
                    <Merkliste
                        spalten={2}
                        eintraege={CROSS_LINKS.map((link) => ({
                            titel: (
                                <Link href={link.href} className={linkKlassen}>
                                    {link.label}
                                </Link>
                            ),
                            text: link.desc
                        }))}
                    />
                </Abschnitt>
            </Leitachse>

            <QualityPromise />

            {/* 8. KONFIGURATOR: Funnel (nachgeladen) mit 8 Spalten, rechts die Rückfrage in 4 Spalten (ab lg) */}
            <Abschnitt aria-label="Fliesen-Konfigurator" spaet>
                <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-12">
                    <div className="min-w-0 lg:col-span-8">
                        <FliesenKonfigurator />
                    </div>
                    <div className="lg:col-span-4">
                        <Rueckfrage />
                    </div>
                </div>
            </Abschnitt>
        </>
    );
}
