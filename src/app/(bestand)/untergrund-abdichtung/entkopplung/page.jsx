// Entkopplung & Holzuntergründe (E5-BAU-03 / S-12, KERN v2): Erzählansicht nach dem Muster der Familie Untergrund
// (/leistungen/[id], /fliesen; Geschwister din-18534, estrich-belegreife). Einstieg mit Laserachse, H1 links, Vorspann und
// zwei Knöpfe; rechts das Planblatt mit dem Plan „untergrund“ (interaktiv, ohne Achse). Danach die Leitachse über die
// Abschnitte, Flächen im Wechsel Fliese/Kalk: Prinzip seitlich mit Schnittzeichnung des Aufbaus · Einsatzfälle als Halbverband ·
// Holz, Mischuntergründe und Risse als Feldraster (#rissverharzung, darum ohne `spaet`) · Grenzen und Planung in zwei Spalten ·
// Fragen als Aufklapper · Abschluss mit drei Wegen · Ratgeber als Navigation. Wortlaut, Überschriften, Links, IDs, ARIA und
// Lesefolge wie im Bestand. Kein großer Moment, kein Auftritt, keine Icon-Kacheln (eine Icon-Familie). Metadaten unverändert.
import Link from 'next/link';
import { COMPANY_DATA } from '@/config/company';
import { createMetadata } from '@/lib/metadata';
import QualityPromise from '@/components/sections/QualityPromise';
import WhatsAppLogo from '@/components/ui/WhatsAppLogo';
import Icon from '@/components/icons/Icon';
import Abschnitt from '@/components/kern/Abschnitt';
import Einstieg from '@/components/kern/Einstieg';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import { Feldraster } from '@/components/kern/Feldraster';
import Knopf from '@/components/kern/Knopf';
import Leitachse from '@/components/kern/Leitachse';
import Merkliste from '@/components/kern/Merkliste';
import Planblatt, { planfelder } from '@/components/kern/Planblatt';
import Verlegeplan from '@/components/kern/Verlegeplan';
import { etikettKlassen, linkKlassen } from '@/components/kern/stile';
import SeitenDaten from '@/components/seo/SeitenDaten';

export const metadata = createMetadata({
    title: 'Fliesen auf Holzboden verlegen mit Entkopplung | Tezgel',
    description:
        'Fliesen auf Holzdielen, Mischuntergründen & gerissenem Estrich sicher verlegen: Entkopplungsmatten & Rissverharzung erklärt vom Fachbetrieb Tezgel.',
    path: '/untergrund-abdichtung/entkopplung'
});

// Schichten der Schnittzeichnung (von oben nach unten): Höhe auf der Abstandsskala, Füllung aus den Tokens; die Matte als
// einzige dunkle Schicht (vormals Orange), die Fliese mit Fugen als Raster
const LAYERS = [
    { label: 'Fliese', note: 'starrer, keramischer Belag', className: 'h-12', fliese: true },
    { label: 'Fliesenkleber', note: 'verformungsfähig, im Dünnbett', className: 'h-4 bg-fuge' },
    { label: 'Entkopplungsmatte', note: 'baut Spannungen zwischen den Schichten ab', className: 'h-6 bg-tinte' },
    { label: 'Kleber zur Mattenverlegung', note: 'laut Systemvorgabe', className: 'h-3 bg-fuge' },
    { label: 'Untergrund', note: 'Estrich, Holzwerkstoff oder Mischuntergrund', className: 'h-24 bg-kalk' }
];

const USE_CASES = [
    {
        title: 'Holzdielen und Holzwerkstoffplatten',
        desc: 'Holz quillt und schwindet mit der Luftfeuchte. Auf einer steifen, fest verschraubten Konstruktion kann eine Entkopplung diese Bewegungen vom Belag fernhalten.'
    },
    {
        title: 'Mischuntergründe',
        desc: 'Wo Estrich auf Holz, alte Fliesen auf neue Spachtelflächen oder geschlossene Durchbrüche treffen, verhalten sich die Materialien unterschiedlich. Die Matte überbrückt diese Übergänge.'
    },
    {
        title: 'Risse im Estrich',
        desc: 'Ruhende Schwindrisse werden kraftschlüssig verharzt. Die Entkopplung darüber reduziert das Risiko, dass sich feine Bewegungen bis in die Fliese durchzeichnen.'
    },
    {
        title: 'Junge Estriche',
        desc: 'Einzelne Systeme sind laut Hersteller für eine frühere Belegung von Zementestrich freigegeben. Das gilt nur innerhalb dieser Herstellerangaben – die Belegreife wird trotzdem geprüft.'
    },
    {
        title: 'Nassraum',
        desc: 'Manche Entkopplungsbahnen sind zugleich als Verbundabdichtung nach DIN 18534 geprüft. Dann müssen Stöße, Ecken und Durchdringungen mit den zugehörigen Systemteilen gedichtet werden.'
    }
];

const WOOD_CHECKS = [
    'Federt der Boden beim Begehen spürbar, ist er für Fliesen ungeeignet – daran ändert keine Matte etwas.',
    'Lose oder knarrende Dielen werden nachgeschraubt, schadhafte Bereiche ersetzt.',
    'Holzfeuchte, Schädlingsbefall und Luftzirkulation unter den Dielen werden vorab geklärt.',
    'Ob die Decke die zusätzliche Last trägt, beurteilt ein Tragwerksplaner.'
];

const LIMITS = [
    'Fehlende Tragfähigkeit oder zu große Durchbiegung einer Holzbalkendecke',
    'Setzungen, arbeitende Risse und konstruktive Bewegungen des Bauwerks',
    'Größere Unebenheiten – die Matte folgt dem Untergrund und wird vorher ausgeglichen',
    'Feuchteschäden im Untergrund, deren Ursache nicht behoben ist'
];

const FAQ = [
    {
        q: 'Kann ich auf meinen alten Holzdielenboden Fliesen legen lassen?',
        a: 'Manchmal ja. Voraussetzung ist eine ausreichend steife Unterkonstruktion ohne spürbares Federn, fest verschraubte Dielen und ein trockener, gesunder Holzzustand. Ob die Decke das Gewicht und die Belastung trägt, ist eine statische Frage, die ein Tragwerksplaner beantwortet.'
    },
    {
        q: 'Verhindert eine Entkopplungsmatte Risse im Belag sicher?',
        a: 'Nein, eine Garantie gegen Risse gibt es nicht. Die Matte baut Spannungen aus kleinen Bewegungen ab. Große Bewegungen, Setzungen oder Durchbiegungen gleicht sie nicht aus.'
    },
    {
        q: 'Ist eine Entkopplung auch eine Trittschalldämmung?',
        a: 'Nicht automatisch. Entkopplung und Trittschalldämmung sind unterschiedliche Funktionen. Einige Produkte verbessern den Trittschall etwas; wer gezielt Schallschutz braucht, muss das bei der Planung des gesamten Bodenaufbaus berücksichtigen.'
    }
];

const READ_MORE = [
    { label: 'Leistung: Untergrund & DIN 18534 Abdichtung', href: '/leistungen/untergrund' },
    { label: 'Fliesen im Wohnbereich', href: '/leistungen/wohnen' },
    { label: 'Badsanierung vom Fachbetrieb', href: '/bad/badsanierung' },
    { label: 'Estrich & Belegreife', href: '/untergrund-abdichtung/estrich-belegreife' }
];

// Feld im Raster auf Fliese-Fläche: Kalk, damit sich die Felder von der Fläche abheben (Fuge statt Karte)
const FELD_KALK = 'flex flex-col bg-kalk p-6 lg:p-8';
// Fließtext in Feldern
const FELD_TEXT = 'font-text text-fs-2 text-tinte-2';

// Aufzählung an der Fuge: Marke (Fugenkreuz bzw. Icon) auf Höhe der ersten Zeile, Text daneben
function Punkte({ eintraege, marke = 'kreuz', className }) {
    return (
        <ul className={className}>
            {eintraege.map((text) => (
                <li key={text} className="flex gap-3 font-text text-fs-2 text-tinte">
                    <span aria-hidden="true" className="flex h-6 shrink-0 items-center text-tinte">
                        {marke === 'kreuz' ? <Fugenkreuz className="size-3 text-strich" /> : <Icon name={marke} groesse={5} />}
                    </span>
                    <span className="min-w-0">{text}</span>
                </li>
            ))}
        </ul>
    );
}

export default function EntkopplungPage() {
    return (
        <>
            <SeitenDaten
                pfad="/untergrund-abdichtung/entkopplung"
                titel="Fliesen auf Holzboden verlegen mit Entkopplung | Tezgel"
                beschreibung="Fliesen auf Holzdielen, Mischuntergründen & gerissenem Estrich sicher verlegen: Entkopplungsmatten & Rissverharzung erklärt vom Fachbetrieb Tezgel."
                brotkrumen={[{ name: 'Start', href: '/' }, { name: 'Untergrund und Abdichtung', href: '/untergrund-abdichtung' }, { name: 'Fliesen auf Holzboden verlegen: Entkopplung bei Tezgel' }]}
            />
            {/* 1. EINSTIEG: Etikett, H1 an der Laserachse, Vorspann, zwei Knöpfe; rechts das Planblatt mit dem Plan „untergrund“ */}
            <section aria-labelledby="entkopplung-heading">
                <Einstieg
                    art="erzaehl"
                    etikett={<>Entkopplung &middot; Holz &middot; Rissverharzung</>}
                    titel={
                        <span id="entkopplung-heading">
                            Fliesen auf Holzboden verlegen: Entkopplung bei{' '}
                            <span>Tezgel</span>
                        </span>
                    }
                    vorspann={
                        <p>
                            Fliesen auf Holzboden verlegen mit professioneller Entkopplung: Fachbetrieb Tezgel belegt Holzdielen, Mischuntergründe und gerissenen Estrich sicher mit modernen Entkopplungsmatten und Rissverharzung.
                        </p>
                    }
                    aktionen={
                        <>
                            <Knopf href="/kontakt" icon="pfeil-rechts">
                                Untergrund beurteilen lassen
                            </Knopf>
                            <Knopf href="/leistungen/wohnen" variante="neben">
                                Fliesen im Wohnbereich
                            </Knopf>
                        </>
                    }
                    rand={
                        <Planblatt felder={planfelder('Fliesen auf Holzboden verlegen', 'untergrund')}>
                            <Verlegeplan plan="untergrund" ohneAchse bemassung={false} interaktiv />
                        </Planblatt>
                    }
                />
            </section>

            <Leitachse>
                {/* 2. PRINZIP: Fläche Fliese; zwei Absätze links, rechts die Schnittzeichnung mit Legende (Bestand: Abbildung + Bildunterschrift) */}
                <Abschnitt titelId="funktion-heading" flaeche="fliese" leitachse spaet etikett="Prinzip" titel="Wie Entkopplung funktioniert">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
                        <div className="flex max-w-mass flex-col gap-4 font-text text-fs-3 text-tinte-2 lg:col-span-5">
                            <p>
                                Keramik ist hart und kaum dehnbar. Bewegt sich der Untergrund – durch Schwinden, Temperatur oder Feuchte –,
                                entstehen in der Klebefuge Scherspannungen. Übersteigen sie die Festigkeit von Kleber oder Fliese, reißt
                                der Belag oder löst sich.
                            </p>
                            <p>
                                Eine Entkopplungsmatte liegt als Zwischenschicht zwischen Untergrund und Fliese. Sie ist so aufgebaut,
                                dass sie kleine horizontale Bewegungen in sich aufnimmt, statt sie weiterzugeben. Die Fliese bleibt
                                vollflächig verklebt, ist aber von den Bewegungen des Untergrunds weitgehend getrennt.
                            </p>
                        </div>
                        <figure className="grid grid-cols-1 border border-fuge bg-kalk md:grid-cols-5 lg:col-span-7">
                            {/* Schnitt: Schichten als Flächen an 1-px-Strichen, die Fliese mit Fugen; dekorativ, die Legende trägt den Inhalt */}
                            <div className="flex flex-col justify-center p-6 md:col-span-2 lg:p-8" aria-hidden="true">
                                <div className="flex flex-col border border-strich">
                                    {LAYERS.map((layer) =>
                                        layer.fliese ? (
                                            <div key={layer.label} className={`grid grid-cols-4 gap-px bg-strich ${layer.className}`}>
                                                <span className="bg-fliese" />
                                                <span className="bg-fliese" />
                                                <span className="bg-fliese" />
                                                <span className="bg-fliese" />
                                            </div>
                                        ) : (
                                            <div key={layer.label} className={`border-t border-strich ${layer.className}`} />
                                        )
                                    )}
                                </div>
                            </div>
                            <figcaption className="border-t border-fuge p-6 md:col-span-3 md:border-t-0 md:border-l lg:p-8">
                                <p className="font-text text-fs-3 font-semibold text-tinte">Schematischer Aufbau (von oben nach unten)</p>
                                <ol className="mt-6 grid gap-3">
                                    {LAYERS.map((layer, idx) => (
                                        <li key={layer.label} className="flex gap-3 font-text text-fs-2 text-tinte-2">
                                            <span className="w-6 shrink-0 font-mono text-tinte tabular-nums">{idx + 1}</span>
                                            <span>
                                                <strong className="font-semibold text-tinte">{layer.label}</strong> – {layer.note}
                                            </span>
                                        </li>
                                    ))}
                                </ol>
                            </figcaption>
                        </figure>
                    </div>
                </Abschnitt>

                {/* 3. EINSATZFÄLLE: fünf Fälle im Halbverband (Zeilen an der Fuge), Titel bleiben H3 */}
                <Abschnitt titelId="einsatz-heading" leitachse spaet etikett="Einsatzfälle" titel="Wo eine Entkopplung sinnvoll ist">
                    <Merkliste
                        verband
                        spalten={2}
                        titelAls="h3"
                        eintraege={USE_CASES.map((item) => ({ titel: item.title, text: item.desc }))}
                    />
                </Abschnitt>

                {/* 4. HOLZ, MISCHUNTERGRÜNDE, RISSE: Fläche Fliese, drei Felder mit eigener H2 (wie im Bestand); das dritte trägt den
                    Anker #rissverharzung – darum ohne `spaet`; in Md überspannt es die freie Breite */}
                <Abschnitt flaeche="fliese" leitachse aria-label="Holz, Mischuntergründe und Risse">
                    <Feldraster spalten={3} als="div">
                        <article className={FELD_KALK}>
                            <h2 className="font-anzeige text-fs-4 text-tinte">Fliesen auf Holzdielen: Tragfähigkeit und Durchbiegung prüfen</h2>
                            <Punkte eintraege={WOOD_CHECKS} className="mt-6 grid gap-3" />
                        </article>
                        <article className={FELD_KALK}>
                            <h2 className="font-anzeige text-fs-4 text-tinte">Mischuntergründe und junge Estriche</h2>
                            <p className={`mt-6 ${FELD_TEXT}`}>
                                Unterschiedliche Materialien dehnen sich unterschiedlich aus. An solchen Übergängen treten Risse
                                bevorzugt auf. Wir prüfen Festigkeit und Haftung jedes Teilbereichs und gleichen Höhenunterschiede aus,
                                bevor die Entkopplung vollflächig darüber verlegt wird.
                            </p>
                            <p className={`mt-4 ${FELD_TEXT}`}>
                                Bei jungem Estrich gilt: Die Matte ersetzt die Belegreife nicht grundsätzlich. Ausnahmen regeln allein die
                                Herstellerangaben des jeweiligen Systems.{' '}
                                <Link href="/untergrund-abdichtung/estrich-belegreife" className={`font-semibold ${linkKlassen}`}>
                                    Mehr zur Belegreife
                                </Link>
                            </p>
                        </article>
                        <article id="rissverharzung" className={`${FELD_KALK} md:col-span-2 lg:col-span-1`}>
                            <h2 className="font-anzeige text-fs-4 text-tinte">Risse im Estrich: verharzen, entkoppeln oder beides</h2>
                            <p className={`mt-6 ${FELD_TEXT}`}>
                                Ruhende Risse – etwa Schwindrisse im Zementestrich – werden aufgeweitet, quer zum Riss mit Klammern
                                gesichert und mit Gießharz kraftschlüssig verfüllt. Der Estrich wirkt danach wieder als geschlossene Platte.
                            </p>
                            <p className={`mt-4 ${FELD_TEXT}`}>
                                Bewegungsfugen werden dagegen nie verharzt, sondern im Belag an gleicher Stelle übernommen. Arbeitet ein
                                Riss noch, muss zuerst seine Ursache geklärt werden.
                            </p>
                        </article>
                    </Feldraster>
                </Abschnitt>

                {/* 5. GRENZEN UND PLANUNG: zwei Spalten wie im Bestand – links die Grenzen als Warnfeld (Kante Tinte, Hinweis-Zeichen),
                    rechts die Planung an der Fuge. Die Region heißt wie im Bestand nach #grenzen-heading (innere section) */}
                <Abschnitt leitachse spaet>
                    <section aria-labelledby="grenzen-heading" className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-x-12">
                        <div className="border border-l-2 border-strich border-l-tinte bg-fliese p-6 lg:p-8">
                            <p className={etikettKlassen}>
                                <Fugenkreuz className="size-3 text-strich" />
                                Ehrlich betrachtet
                            </p>
                            <h2 id="grenzen-heading" className="mt-4 font-anzeige text-fs-5 text-tinte">
                                Grenzen: was eine Matte nicht ausgleicht
                            </h2>
                            <Punkte eintraege={LIMITS} marke="hinweis" className="mt-6 grid gap-3" />
                            <p className="mt-6 border-t border-fuge pt-4 font-text text-fs-2 text-tinte-2">
                                Statische Fragen gehören zu einem Tragwerksplaner. Wir beurteilen, ob der Untergrund für einen
                                Fliesenbelag vorbereitet werden kann – und sagen es, wenn nicht.
                            </p>
                        </div>
                        <div className="flex flex-col gap-4 border-t border-tinte pt-6 lg:pt-8">
                            <p className={etikettKlassen}>
                                <Fugenkreuz className="size-3 text-strich" />
                                Planung
                            </p>
                            <h2 className="font-anzeige text-fs-5 text-tinte">Aufbauhöhe, Trittschall und Nassraum</h2>
                            <p className="max-w-mass font-text text-fs-3 text-tinte-2">
                                Eine Entkopplungsmatte trägt nur wenige Millimeter auf, zusammen mit zwei Kleberlagen und der Fliese
                                summiert sich das aber. An Türen und Übergängen wird die Höhe deshalb vorab eingeplant.
                            </p>
                            <p className="max-w-mass font-text text-fs-3 text-tinte-2">
                                Im Bad wird die Entkopplung mit der Abdichtung kombiniert: entweder mit einer eigenen Verbundabdichtung
                                darüber oder mit einer Bahn, die für beide Funktionen geprüft ist.
                            </p>
                            <p className="flex max-w-mass gap-3 font-text text-fs-2 text-tinte-2">
                                <span aria-hidden="true" className="flex h-6 shrink-0 items-center text-tinte">
                                    <Icon name="info" groesse={4} />
                                </span>
                                <span>
                                    Details zur Abdichtung finden Sie unter{' '}
                                    <Link href="/untergrund-abdichtung/din-18534" className={`font-semibold ${linkKlassen}`}>
                                        Verbundabdichtung nach DIN 18534
                                    </Link>
                                    .
                                </span>
                            </p>
                        </div>
                    </section>
                </Abschnitt>

                {/* 6. FRAGEN: Fläche Fliese, Kopf links, je Frage ein Aufklapper mit Fuge (Plus/Minus) */}
                <Abschnitt titelId="faq-heading" flaeche="fliese" leitachse spaet kopf="seitlich" titel="Häufige Fragen zur Entkopplung">
                    <div className="border-t border-tinte">
                        {FAQ.map((item) => (
                            <details key={item.q} className="group border-b border-fuge">
                                <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-6 py-4 font-text text-fs-3 font-semibold text-tinte [&::-webkit-details-marker]:hidden">
                                    {item.q}
                                    <span className="flex shrink-0 items-center text-tinte" aria-hidden="true">
                                        <span className="group-open:hidden">
                                            <Icon name="plus" groesse={6} />
                                        </span>
                                        <span className="hidden group-open:block">
                                            <Icon name="minus" groesse={6} />
                                        </span>
                                    </span>
                                </summary>
                                <p className="max-w-mass pb-6 font-text text-fs-2 text-tinte-2">{item.a}</p>
                            </details>
                        ))}
                    </div>
                </Abschnitt>

                {/* 7. ABSCHLUSS: Überschrift, Einleitung und drei Wege (Termin, Telefon, WhatsApp aus COMPANY_DATA) */}
                <Abschnitt
                    titelId="cta-heading"
                    leitachse
                    spaet
                    titel="Schwieriger Untergrund? Lassen Sie ihn prüfen."
                    einleitung={
                        <p>
                            Beim Vor-Ort-Termin beurteilt {COMPANY_DATA.owner.fullName} Dielen, Risse und Übergänge und erklärt Ihnen,
                            welche Vorbereitung sinnvoll ist.
                        </p>
                    }
                >
                    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                        <Knopf href="/kontakt" icon="pfeil-rechts">
                            Termin anfragen
                        </Knopf>
                        <Knopf href={`tel:${COMPANY_DATA.contact.phoneLink}`} variante="neben" iconLinks="telefon">
                            <span className="font-mono font-normal">{COMPANY_DATA.contact.phone}</span>
                        </Knopf>
                        <Knopf href={COMPANY_DATA.contact.whatsappLink} extern variante="neben" vorne={<WhatsAppLogo className="size-5 shrink-0" />}>
                            WhatsApp
                        </Knopf>
                    </div>
                </Abschnitt>

                {/* 8. WEITERFÜHRENDE RATGEBER: Fläche Fliese; Navigation mit eigener H2 wie im Bestand, vier Verweise als Merkliste */}
                <Abschnitt flaeche="fliese" leitachse spaet>
                    <nav aria-labelledby="ratgeber-heading">
                        <div className="max-w-mass">
                            <h2 id="ratgeber-heading" className="text-fs-6 text-tinte">
                                Weiterführende Ratgeber zu Entkopplungsmatten &amp; Untergrund
                            </h2>
                        </div>
                        <Merkliste
                            spalten={2}
                            className="mt-12"
                            eintraege={READ_MORE.map((link) => ({
                                titel: (
                                    <Link href={link.href} className={linkKlassen}>
                                        {link.label}
                                    </Link>
                                )
                            }))}
                        />
                    </nav>
                </Abschnitt>
            </Leitachse>

            <QualityPromise />
        </>
    );
}
