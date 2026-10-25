// Untergrund ausgleichen & Gefälle (E5-BAU-02, KERN v2): Erzählansicht nach dem Muster der Familie Untergrund
// (/leistungen/[id], /fliesen/auf-fussbodenheizung). Einstieg mit Laserachse, H1 links, Vorspann und zwei Knöpfe; rechts das
// Planblatt mit dem Plan „abdichtung“ (interaktiv, ohne Achse). Danach die Leitachse über die Abschnitte: Tabelle der
// Stichmaße, Verfahren als Feldraster, Wand und Gefälle, Grundierung als Fugenliste, FAQ, Anfrage-Knöpfe und Ratgeber als
// Merkliste. Wortlaut, Überschriften, Links, IDs und Lesefolge wie im Bestand. Kein großer Moment, kein Auftritt, keine
// Icon-Kacheln (eine Icon-Familie). Metadaten unverändert.
import Link from 'next/link';
import { COMPANY_DATA } from '@/config/company';
import { createMetadata } from '@/lib/metadata';
import QualityPromise from '@/components/sections/QualityPromise';
import FAQAccordion from '@/components/ui/FAQAccordion';
import WhatsAppLogo from '@/components/ui/WhatsAppLogo';
import Icon from '@/components/icons/Icon';
import Abschnitt from '@/components/kern/Abschnitt';
import Einstieg from '@/components/kern/Einstieg';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import { Feld, Feldraster } from '@/components/kern/Feldraster';
import Knopf from '@/components/kern/Knopf';
import Leitachse from '@/components/kern/Leitachse';
import Merkliste from '@/components/kern/Merkliste';
import Planblatt, { planfelder } from '@/components/kern/Planblatt';
import Tabelle from '@/components/kern/Tabelle';
import Verlegeplan from '@/components/kern/Verlegeplan';
import { linkKlassen } from '@/components/kern/stile';
import SeitenDaten from '@/components/seo/SeitenDaten';

export const metadata = createMetadata({
    title: 'Untergrund ausgleichen & Gefälle herstellen | Tezgel',
    description:
        'Unebene Böden & Wände vor dem Fliesen ausgleichen: Ebenheit nach DIN 18202, Spachtelung & Gefälleausbildung zu Abläufen. Fachbetrieb Tezgel in Hessen.',
    path: '/untergrund-abdichtung/ausgleich-gefaelle'
});

const TOLERANCES = [
    { row: '3', area: 'Flächenfertige Böden, z. B. Estriche zur Aufnahme von Bodenbelägen, Fliesenbeläge', v01: '2', v1: '4', v4: '10' },
    { row: '4', area: 'wie Zeile 3, jedoch mit erhöhten Anforderungen', v01: '1', v1: '3', v4: '9' },
    { row: '6', area: 'Flächenfertige Wände, z. B. geputzte Wände, Wandbekleidungen', v01: '3', v1: '5', v4: '10' },
    { row: '7', area: 'wie Zeile 6, jedoch mit erhöhten Anforderungen', v01: '2', v1: '3', v4: '8' }
];

const METHODS = [
    {
        title: 'Spachteln',
        desc: 'Für kleinere Mulden, Versätze und Kanten. Spachtelmasse wird mit der Traufel abgezogen, auch örtlich begrenzt. Klassisch vor dem Dünnbett.'
    },
    {
        title: 'Nivellieren',
        desc: 'Selbstverlaufende Nivelliermasse wird großflächig gegossen und verteilt. Sie ergibt eine sehr ebene Fläche – ideal vor Großformaten. Auf Holz und Mischuntergründen kommen faserverstärkte Massen zum Einsatz.'
    },
    {
        title: 'Ausgleichsschicht',
        desc: 'Für größere Höhenunterschiede reichen dünne Spachtelungen nicht. Dann werden Ausgleichsmörtel in größerer Schichtdicke oder mehrere Lagen eingesetzt – jeweils innerhalb der Herstellergrenzen.'
    },
    {
        title: 'Gefälleschicht',
        desc: 'Gefällemörtel, Gefällespachtel oder vorgefertigte Gefälleelemente bilden die Neigung zum Ablauf. Die Abdichtung liegt darauf, der Belag folgt dem Gefälle.'
    },
    {
        title: 'Wandbegradigung',
        desc: 'Unebene Wände werden mit Putzausgleich oder Spachtel begradigt. Bei moderaten Abweichungen hilft das Mittelbettverfahren, bei stark schiefen Wänden eine Bekleidung mit Bauplatten.'
    }
];

const DRAINAGE = [
    {
        id: 'duschrinne',
        title: 'Duschrinne',
        text: 'Bei einer Rinne an der Wand oder im Boden fällt die Fläche nur in eine Richtung. Das ergibt eine einzige geneigte Ebene – gut geeignet für großformatige Fliesen, die ohne Kehlschnitte durchlaufen können.'
    },
    {
        id: 'punktablauf',
        title: 'Punktablauf',
        text: 'Beim mittigen Ablauf fällt die Fläche aus mehreren Richtungen zum Punkt. Die Fliesen werden an den Graten diagonal geschnitten; kleinere Formate oder Mosaik folgen den Neigungen leichter.'
    }
];

const WALL_CHECKS = [
    'Ebenheit mit Richtlatte, Lot mit Wasserwaage oder Laser',
    'Festigkeit und Haftung des Putzes, Hohlstellen durch Abklopfen',
    'Saugverhalten und passende Grundierung',
    'Rechtwinklige Ecken für saubere Anschlüsse und Gehrungskanten',
    'Ausreichend Platz für Armaturen, Vorwände und Nischen'
];

const PRIMER_NOTES = [
    'Die Grundierung bindet Reststaub, reguliert das Saugverhalten und verhindert, dass die Ausgleichsmasse zu schnell Wasser verliert oder Luftblasen bildet.',
    'Calciumsulfatestriche und nicht saugende Untergründe brauchen jeweils eine dafür freigegebene Grundierung.',
    'Wartezeiten zwischen Grundierung, Ausgleich und Verlegung richten sich nach Herstellerangaben, Schichtdicke, Temperatur und Luftfeuchte.',
    'Dicke Ausgleichsschichten trocknen deutlich länger als dünne Spachtelungen – das planen wir in den Ablauf ein.'
];

const FAQ = [
    {
        q: 'Ist ein Untergrund im Rahmen der Norm automatisch gut genug für Großformate?',
        a: 'Nicht unbedingt. Die üblichen Ebenheitstoleranzen nach DIN 18202 können für großformatige Fliesen zu grob sein, weil sich Unebenheiten auf langen Kanten als Überzähne zeigen. Erhöhte Anforderungen müssen deshalb ausdrücklich vereinbart und der Untergrund entsprechend vorbereitet werden.'
    },
    {
        q: 'Kann das Gefälle nachträglich im Fliesenkleber hergestellt werden?',
        a: 'Nein. Der Kleber ist für eine gleichmäßige, dünne Schicht gedacht. Ein Gefälle wird in der Schicht darunter angelegt – im Estrich, mit Gefällemörtel oder mit Gefälleelementen –, damit auch die Abdichtung dem Gefälle folgt.'
    },
    {
        q: 'Wer schließt den Bodenablauf an?',
        a: 'Einbau und Anschluss des Ablaufs an das Abwassernetz übernimmt der Sanitärinstallateur. Wir stimmen Einbauhöhe und Lage vorher mit ihm ab, bilden das Gefälle aus und binden die Abdichtung an den Ablauf an.'
    }
];

const READ_MORE = [
    { label: 'Leistung: Untergrund & DIN 18534 Abdichtung', href: '/leistungen/untergrund' },
    { label: 'Fliesen im Bad', href: '/bad/fliesen' },
    { label: 'Barrierefreies Bad mit bodengleicher Dusche', href: '/bad/barrierefreies-bad' },
    { label: 'Duschrinne oder Punktablauf?', href: '/blog/duschrinne-oder-punktablauf' }
];

export default function AusgleichGefaellePage() {
    return (
        <>
            <SeitenDaten
                pfad="/untergrund-abdichtung/ausgleich-gefaelle"
                titel="Untergrund ausgleichen & Gefälle herstellen | Tezgel"
                beschreibung="Unebene Böden & Wände vor dem Fliesen ausgleichen: Ebenheit nach DIN 18202, Spachtelung & Gefälleausbildung zu Abläufen. Fachbetrieb Tezgel in Hessen."
                brotkrumen={[{ name: 'Start', href: '/' }, { name: 'Untergrund und Abdichtung', href: '/untergrund-abdichtung' }, { name: 'Untergrund ausgleichen und Gefälle herstellen: eben verlegen, Wasser gezielt ableiten' }]}
            />
            {/* 1. EINSTIEG: Etikett, H1 an der Laserachse, Vorspann, zwei Knöpfe; rechts das Planblatt mit dem Plan „abdichtung“ */}
            <section aria-labelledby="ausgleich-heading">
                <Einstieg
                    art="erzaehl"
                    etikett={<>Ebenheit &middot; Nivellierung &middot; Gefälle</>}
                    titel={
                        <span id="ausgleich-heading">
                            Untergrund ausgleichen und Gefälle herstellen:{' '}
                            <span>eben verlegen, Wasser gezielt ableiten</span>
                        </span>
                    }
                    vorspann={
                        <p>
                            Untergrund ausgleichen und Gefälle herstellen: eben verlegen, Wasser gezielt ableiten und Hohlstellen vermeiden. Wir messen die Ebenheit nach DIN 18202, gleichen Böden und Wände mit faserverstärkten Spachtelmassen aus und modellieren normgerechtes Gefälle zu Abläufen und Duschrinnen.
                        </p>
                    }
                    aktionen={
                        <>
                            <Knopf href="/kontakt" icon="pfeil-rechts">
                                Untergrund vermessen lassen
                            </Knopf>
                            <Knopf href="/bad/barrierefreies-bad" variante="neben">
                                Bodengleiche Dusche planen
                            </Knopf>
                        </>
                    }
                    rand={
                        <Planblatt felder={planfelder('Untergrund ausgleichen & Gefälle herstellen', 'abdichtung')}>
                            <Verlegeplan plan="abdichtung" ohneAchse bemassung={false} interaktiv />
                        </Planblatt>
                    }
                />
            </section>

            <Leitachse>
                {/* 2. MESSEN: zwei Absätze, darunter die Tabelle der Stichmaße (Name = Tabellenbeschriftung) und der Hinweis zur Norm */}
                <Abschnitt
                    titelId="messen-heading"
                    leitachse
                    spaet
                    etikett="DIN 18202"
                    titel="Ebenheit messen: Stichmaße nach DIN 18202"
                    einleitung={
                        <>
                            <p className="mt-4 first:mt-0">
                                Gemessen wird mit Richtlatte und Messkeil: Die Latte liegt an den Hochpunkten auf, das Stichmaß ist der größte Abstand zwischen Latte und Fläche. Wie groß es sein darf, hängt vom Abstand der Messpunkte ab – auf kurzen Strecken ist die Toleranz kleiner als auf langen.
                            </p>
                            <p className="mt-4 first:mt-0">
                                Die Norm unterscheidet normale und erhöhte Anforderungen. Erhöhte Anforderungen gelten nur, wenn sie ausdrücklich vereinbart sind.
                            </p>
                        </>
                    }
                >
                    <Tabelle
                        name="Ebenheitstoleranzen nach DIN 18202, Tabelle 3 (Auszug)"
                        kopf={['Zeile', 'Bauteil', '0,1 m', '1 m', '4 m']}
                        zeilen={TOLERANCES.map((t) => [t.row, t.area, `${t.v01} mm`, `${t.v1} mm`, `${t.v4} mm`])}
                        ausrichtung={['links', 'links', 'rechts', 'rechts', 'rechts']}
                    />
                    <p className="mt-4 flex items-start gap-3 font-text text-fs-2 text-tinte-2">
                        <Icon name="info" groesse={4} className="mt-1 text-tinte" />
                        <span>
                            Auszug aus DIN 18202, Tabelle 3: zulässige Stichmaße als Grenzwerte bei Messpunktabständen von 0,1 m,
                            1 m und 4 m. Die Norm nennt weitere Messpunktabstände; maßgeblich ist ihre geltende Fassung.
                        </span>
                    </p>
                </Abschnitt>

                {/* 3. GROSSFORMATE: Fläche Fliese, zwei Absätze, der zweite mit dem Link zu den XXL-Großformaten */}
                <Abschnitt
                    titelId="xxl-heading"
                    flaeche="fliese"
                    leitachse
                    spaet
                    etikett="Großformate"
                    titel="Erhöhte Ebenheit für Großformate vereinbaren"
                >
                    <div className="flex max-w-mass flex-col gap-4 font-text text-fs-3 text-tinte-2">
                        <p>
                            Je länger die Fliesenkante, desto deutlicher zeichnet sich jede Welle im Untergrund ab. Großformatige
                            Fliesen im Dünnbett brauchen deshalb in der Regel einen Untergrund, der über die üblichen Toleranzen
                            hinaus eben ist – ein Nivelliersystem beim Verlegen gleicht keine Untergrundmängel aus.
                        </p>
                        <p>
                            Wir empfehlen, die erhöhten Anforderungen (Zeile 4 bzw. 7) bei Großformaten ausdrücklich zu
                            vereinbaren und den nötigen Ausgleich von Anfang an im Angebot vorzusehen.{' '}
                            <Link href="/fliesen/grossformat" className={linkKlassen}>
                                Mehr zu XXL-Großformaten
                            </Link>
                        </p>
                    </div>
                </Abschnitt>

                {/* 4. VERFAHREN: fünf Methoden im Feldraster, die letzte Methode füllt die Zeile */}
                <Abschnitt
                    titelId="verfahren-heading"
                    leitachse
                    spaet
                    etikett="Verfahren"
                    titel="Spachteln, Nivellieren, Ausgleichsschicht: was wann passt"
                    einleitung={
                        <p>Welche Methode richtig ist, hängt von der Größe der Abweichung, vom Untergrund und vom geplanten Format ab.</p>
                    }
                >
                    <Feldraster spalten={3}>
                        {METHODS.map((item, i) => (
                            <Feld key={item.title} spanne={i === METHODS.length - 1 ? 2 : undefined}>
                                <h3 className="font-anzeige text-fs-4 text-tinte">{item.title}</h3>
                                <p className="mt-3 max-w-mass font-text text-fs-2 text-tinte-2">{item.desc}</p>
                            </Feld>
                        ))}
                    </Feldraster>
                </Abschnitt>

                {/* 5. WAND: Fläche Fliese, zwei Absätze und die Prüfpunkte an der Wand als Fugenliste */}
                <Abschnitt
                    titelId="waende-heading"
                    flaeche="fliese"
                    leitachse
                    spaet
                    etikett="Wand"
                    titel="Wände begradigen"
                    einleitung={
                        <>
                            <p className="mt-4 first:mt-0">
                                Auch Wände werden mit der Richtlatte geprüft, dazu kommen Lot und Winkligkeit der Ecken. Gerade in
                                Altbauten sind Wände oft gewölbt oder aus dem Lot – bei großen Wandfliesen und durchgehenden Fugenbildern
                                fällt das sofort auf.
                            </p>
                            <p className="mt-4 first:mt-0">
                                Ob gespachtelt, im Mittelbett verlegt oder mit Bauplatten bekleidet wird, entscheiden Abweichung,
                                Putzzustand und Raumsituation. Hohl liegender oder sandender Putz wird vorher entfernt.
                            </p>
                        </>
                    }
                >
                    <h3 className="font-anzeige text-fs-4 text-tinte">Worauf wir an der Wand achten</h3>
                    <ul className="mt-6 grid max-w-mass gap-3">
                        {WALL_CHECKS.map((text) => (
                            <li key={text} className="flex gap-3 font-text text-fs-2 text-tinte">
                                <span aria-hidden="true" className="flex h-6 shrink-0 items-center text-strich">
                                    <Fugenkreuz className="size-3" />
                                </span>
                                <span className="min-w-0">{text}</span>
                            </li>
                        ))}
                    </ul>
                </Abschnitt>

                {/* 6. GEFÄLLE: zwei Ablaufarten im Feldraster (je Feld ohne Aktion), darunter der Hinweis zur Schicht und zum Balkon */}
                <Abschnitt
                    titelId="gefaelle-heading"
                    leitachse
                    spaet
                    etikett="Entwässerung"
                    titel={
                        <>
                            Gefälle in Innenräumen herstellen:{' '}
                            <span>zu Bodenablauf oder Duschrinne</span>
                        </>
                    }
                    einleitung={
                        <p>
                            Wasser soll ablaufen, ohne Pfützen zu bilden – und der Boden soll trotzdem sicher begehbar bleiben. In der
                            Praxis üblich sind Gefälle von etwa 1 bis 2 %. Im barrierefreien Duschplatz lässt DIN 18040-2 höchstens
                            2 % zu.
                        </p>
                    }
                >
                    <Feldraster spalten={2}>
                        {DRAINAGE.map((item) => (
                            <Feld key={item.id}>
                                <h3 className="font-anzeige text-fs-4 text-tinte">{item.title}</h3>
                                <p className="mt-3 max-w-mass font-text text-fs-2 text-tinte-2">{item.text}</p>
                            </Feld>
                        ))}
                    </Feldraster>
                    <p className="mt-8 max-w-mass font-text text-fs-2 text-tinte-2">
                        Das Gefälle entsteht in der Schicht unter der Abdichtung. Einbau und Anschluss des Ablaufs an das
                        Abwassernetz übernimmt der Sanitärinstallateur. Gefälle auf Balkonen und Terrassen behandeln wir unter{' '}
                        <Link href="/balkon-terrasse/balkonsanierung" className={linkKlassen}>
                            Balkonsanierung
                        </Link>
                        .
                    </p>
                </Abschnitt>

                {/* 7. GRUNDIERUNG: Fläche Fliese, vier Hinweise als Fugenliste im Halbverband */}
                <Abschnitt
                    titelId="grundierung-heading"
                    flaeche="fliese"
                    leitachse
                    spaet
                    etikett="Vorbereitung"
                    titel="Grundierung und Trocknungszeiten"
                >
                    <ul className="grid gap-6 md:grid-cols-2 md:gap-x-12">
                        {PRIMER_NOTES.map((text) => (
                            <li key={text} className="flex gap-3 font-text text-fs-2 text-tinte">
                                <span aria-hidden="true" className="flex h-6 shrink-0 items-center text-strich">
                                    <Fugenkreuz className="size-3" />
                                </span>
                                <span className="min-w-0">{text}</span>
                            </li>
                        ))}
                    </ul>
                </Abschnitt>

                {/* 8. FAQ: Fragen mit Aufklappen, Antworten im Register „aufklappen“ */}
                <Abschnitt titelId="faq-heading" leitachse spaet titel="Häufige Fragen zu Ausgleich und Gefälle">
                    <div>
                        {FAQ.map((item) => (
                            <FAQAccordion key={item.q} question={item.q} answer={item.a} />
                        ))}
                    </div>
                </Abschnitt>

                {/* 9. ABSCHLUSS DER SEITE: Fläche Fliese, Aufmaß-Knöpfe mit Telefon und WhatsApp aus COMPANY_DATA */}
                <Abschnitt
                    titelId="cta-heading"
                    flaeche="fliese"
                    leitachse
                    spaet
                    titel="Unebener Boden, schiefe Wand, bodengleiche Dusche?"
                    einleitung={
                        <p>
                            Beim Vor-Ort-Aufmaß misst {COMPANY_DATA.owner.fullName} Ebenheit und Höhen und zeigt Ihnen, welcher Ausgleich
                            für Ihr Format und Ihre Dusche nötig ist.
                        </p>
                    }
                >
                    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                        <Knopf href="/kontakt" icon="pfeil-rechts">
                            Aufmaß anfragen
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
                            WhatsApp
                        </Knopf>
                    </div>
                </Abschnitt>

                {/* 10. WEITERFÜHRENDE RATGEBER: vier Verweise als Merkliste (Lesefolge wie im Bestand, Abschluss vor QualityPromise) */}
                <Abschnitt titelId="ratgeber-heading" leitachse spaet titel="Weiterführende Ratgeber zum Gefälleausgleich & Untergrund">
                    <Merkliste
                        spalten={2}
                        eintraege={READ_MORE.map((link) => ({
                            titel: (
                                <Link href={link.href} className={linkKlassen}>
                                    {link.label}
                                </Link>
                            )
                        }))}
                    />
                </Abschnitt>
            </Leitachse>

            <QualityPromise />
        </>
    );
}
