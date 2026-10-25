// Fliesen auf Fliesen / Überfliesen (E5-BAU-03 / S-12, KERN v2): Erzählansicht nach dem Muster der Familie Untergrund
// (/leistungen/[id], /fliesen; Geschwister din-18534, estrich-belegreife). Einstieg mit Laserachse, H1 links, Vorspann und
// zwei Knöpfe; rechts das Planblatt mit dem Plan „reparatur“ (interaktiv, ohne Achse). Danach die Leitachse über die
// Abschnitte, Flächen im Wechsel Kalk/Fliese: Voraussetzungen seitlich als Merkliste · Abwägung als Feldraster (dafür / zu
// bedenken) · Technik und Aufbauhöhen als zwei Spalten an der Fuge · Rückbau seitlich mit Checkliste · Staubschutz und
// Nassraum als Feldraster (#nassraum, darum ohne `spaet`) · Fragen als Aufklapper · Abschluss mit drei Wegen · Ratgeber als
// Navigation. Wortlaut, Überschriften, Links, IDs, ARIA und Lesefolge wie im Bestand. Kein großer Moment, kein Auftritt,
// keine Icon-Kacheln (eine Icon-Familie). Metadaten unverändert.
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
    title: 'Altfliesen überkleben, wann es fachgerecht geht | Tezgel',
    description:
        'Altfliesen überkleben (Überfliesen): Prüfkriterien, Haftbrücke, Aufbauhöhen & wann Rückbau besser ist. Fachbetrieb Tezgel in Aßlar & Wetzlar.',
    path: '/untergrund-abdichtung/fliesen-auf-fliesen'
});

const PRO_CONTRA = [
    {
        title: 'Überfliesen',
        pros: [
            'Kein Abbruch der Altfliesen, deutlich weniger Lärm, Schutt und Staub',
            'Der vorhandene, feste Belag dient als tragfähiger Untergrund',
            'Oft kürzere Vorbereitungszeit, vor allem in bewohnten Räumen'
        ],
        cons: [
            'Aufbauhöhe wächst um neue Fliese plus Kleberbett',
            'Verborgene Mängel des Altbelags bleiben unter dem neuen Belag',
            'Im Nassbereich muss trotzdem eine neue Abdichtung hergestellt werden'
        ]
    },
    {
        title: 'Rückbau',
        pros: [
            'Untergrund wird sichtbar und kann vollständig geprüft werden',
            'Keine zusätzliche Aufbauhöhe an Türen, Übergängen und Anschlüssen',
            'Abdichtung und Abläufe lassen sich von Grund auf neu aufbauen'
        ],
        cons: [
            'Mehr Aufwand, Lärm und Schutt, Entsorgung notwendig',
            'Der freigelegte Untergrund braucht meist Ausgleich oder Reparatur',
            'Staubschutz im bewohnten Haus ist unverzichtbar'
        ]
    }
];

const PREREQS = [
    {
        title: 'Haftung',
        desc: 'Der Altbelag muss vollflächig und fest am Untergrund haften. Einzelne lose Fliesen werden entfernt und die Stelle ausgeglichen; lösen sich viele, ist der Belag als Untergrund ungeeignet.'
    },
    {
        title: 'Hohlstellen',
        desc: 'Mit der Klopfprobe wird die Fläche abgeklopft. Hohl klingende Bereiche zeigen fehlenden Verbund – sie sind eine Schwachstelle, die sich in den neuen Belag überträgt.'
    },
    {
        title: 'Ebenheit',
        desc: 'Der Altbelag wird wie jeder Untergrund nach DIN 18202 gemessen. Für Großformate ist eine besonders ebene Fläche nötig; Versätze und Mulden werden vorher gespachtelt.'
    }
];

const HEIGHTS = [
    'Türblätter müssen meist gekürzt werden; bei Zargen und Schwellen prüfen wir, ob genug Luft bleibt.',
    'Zu angrenzenden Räumen entsteht eine Kante, die mit einem Übergangsprofil oder einer Rampe gelöst wird.',
    'Bodenablauf und Duschtasse brauchen passende Aufsatzstücke bzw. eine neue Einbauhöhe.',
    'An der Wand verschieben sich Armaturen, Unterputz-Rosetten und Anschlüsse von WC und Waschtisch nach vorn.'
];

const CHECKLIST = [
    'Altbelag haftet fest, keine größeren Hohlstellen, keine Risse durch den Untergrund',
    'Ebenheit reicht für das gewünschte Format oder lässt sich mit vertretbarem Aufwand herstellen',
    'Türen lassen sich kürzen, Übergänge zu Nachbarräumen sind lösbar',
    'Bodenablauf, Duschtasse, WC und Waschtisch lassen sich an die neue Höhe anpassen',
    'Kein Verdacht auf schadstoffhaltige Altkleber oder -beläge',
    'Die Raumhöhe verträgt den zusätzlichen Aufbau'
];

const FAQ = [
    {
        q: 'Kann man auf alte Wandfliesen im Bad einfach neue kleben?',
        a: 'Technisch ist das auf fest haftenden Wandfliesen mit geeigneter Vorbehandlung möglich. Im Dusch- und Wannenbereich ersetzt der alte Belag aber keine Abdichtung – dort wird eine neue Verbundabdichtung nach DIN 18534 aufgebracht, und alle Anschlüsse werden neu gedichtet.'
    },
    {
        q: 'Wie viel höher wird der Boden?',
        a: 'Der Boden wächst um die Dicke der neuen Fliese plus Kleberbett, dazu kommen eventuell Ausgleichsschichten. Die genaue Höhe hängt von Fliese und Untergrund ab und wird beim Aufmaß an Türen und Übergängen nachgemessen.'
    },
    {
        q: 'Was ist, wenn der alte Kleber Asbest enthalten könnte?',
        a: 'Bei älteren Belägen und Klebern ist das nicht auszuschließen. Besteht ein Verdacht, wird nicht geschliffen, gestemmt oder gebohrt: Untersuchung und gegebenenfalls Entfernung gehören in die Hand einer dafür zugelassenen Fachfirma.'
    }
];

const READ_MORE = [
    { label: 'Leistung: Untergrund & DIN 18534 Abdichtung', href: '/leistungen/untergrund' },
    { label: 'Badsanierung vom Fachbetrieb', href: '/bad/badsanierung' },
    { label: 'Renovierung im Bestand', href: '/fliesen/renovierung' },
    { label: 'Über unseren Betrieb', href: '/unternehmen' }
];

// Felder im Raster: auf Fliese-Fläche Kalk, auf Kalk-Fläche Fliese (Fuge statt Karte, kein Abheben)
const FELD = 'flex flex-col p-6 lg:p-8';
// Fließtext in Feldern und Spalten
const TEXT = 'font-text text-fs-2 text-tinte-2';

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

export default function FliesenAufFliesenPage() {
    return (
        <>
            <SeitenDaten
                pfad="/untergrund-abdichtung/fliesen-auf-fliesen"
                titel="Altfliesen überkleben, wann es fachgerecht geht | Tezgel"
                beschreibung="Altfliesen überkleben (Überfliesen): Prüfkriterien, Haftbrücke, Aufbauhöhen & wann Rückbau besser ist. Fachbetrieb Tezgel in Aßlar & Wetzlar."
                brotkrumen={[{ name: 'Start', href: '/' }, { name: 'Untergrund und Abdichtung', href: '/untergrund-abdichtung' }, { name: 'Altfliesen überkleben: Wann es fachgerecht geht bei Tezgel' }]}
            />
            {/* 1. EINSTIEG: Etikett, H1 an der Laserachse, Vorspann, zwei Knöpfe; rechts das Planblatt mit dem Plan „reparatur“ */}
            <section aria-labelledby="ueberfliesen-heading">
                <Einstieg
                    art="erzaehl"
                    etikett={<>Altbelag &middot; Überfliesen &middot; Rückbau</>}
                    titel={
                        <span id="ueberfliesen-heading">
                            Altfliesen überkleben:{' '}
                            <span>Wann es fachgerecht geht</span> bei Tezgel
                        </span>
                    }
                    vorspann={
                        <p>
                            Altfliesen überkleben oder Rückbau? Fachbetrieb Tezgel prüft Ihren Altbelag auf Tragfähigkeit, Haftung und Aufbauhöhen – damit Ihr neuer Fliesenbelag dauerhaft sicher und rissfrei liegt.
                        </p>
                    }
                    aktionen={
                        <>
                            <Knopf href="/kontakt" icon="pfeil-rechts">
                                Altbelag prüfen lassen
                            </Knopf>
                            <Knopf href="/bad/badsanierung" variante="neben">
                                Badsanierung ansehen
                            </Knopf>
                        </>
                    }
                    rand={
                        <Planblatt felder={planfelder('Altfliesen überkleben', 'reparatur')}>
                            <Verlegeplan plan="reparatur" ohneAchse bemassung={false} interaktiv />
                        </Planblatt>
                    }
                />
            </section>

            <Leitachse>
                {/* 2. VORAUSSETZUNGEN: Kopf links mit Einleitung, rechts die drei Prüfpunkte als Merkliste an der Fuge (Titel bleiben H3) */}
                <Abschnitt
                    titelId="voraussetzungen-heading"
                    leitachse
                    spaet
                    kopf="seitlich"
                    etikett="Prüfung"
                    titel="Voraussetzungen: Haftung, Hohlstellen, Ebenheit"
                    einleitung={
                        <p>
                            Ein Altbelag ist nur dann ein guter Untergrund, wenn er selbst fest mit dem Bauteil verbunden ist.
                        </p>
                    }
                >
                    <Merkliste spalten={1} titelAls="h3" eintraege={PREREQS.map((item) => ({ titel: item.title, text: item.desc }))} />
                </Abschnitt>

                {/* 3. ABWÄGUNG: Fläche Fliese, je Weg ein Feld (Kalk) mit „Spricht dafür“ (Haken) und „Zu bedenken“ (Hinweis) als Mono-Etiketten */}
                <Abschnitt
                    titelId="vergleich-heading"
                    flaeche="fliese"
                    leitachse
                    spaet
                    etikett="Abwägung"
                    titel="Überfliesen oder Rückbau: Vor- und Nachteile"
                >
                    <Feldraster spalten={2} als="div">
                        {PRO_CONTRA.map((col) => (
                            <article key={col.title} className={`${FELD} bg-kalk`}>
                                <h3 className="font-anzeige text-fs-5 text-tinte">{col.title}</h3>
                                <p className={`mt-6 ${etikettKlassen}`}>Spricht dafür</p>
                                <Punkte eintraege={col.pros} marke="haken" className="mt-3 grid gap-3" />
                                <p className={`mt-8 border-t border-fuge pt-6 ${etikettKlassen}`}>Zu bedenken</p>
                                <Punkte eintraege={col.cons} marke="hinweis" className="mt-3 grid gap-3" />
                            </article>
                        ))}
                    </Feldraster>
                </Abschnitt>

                {/* 4. TECHNIK UND AUFBAUHÖHEN: zwei Spalten an der Fuge, je mit eigener H2 wie im Bestand (ohne Icon-Kacheln) */}
                <Abschnitt leitachse spaet aria-label="Technik und Aufbauhöhen">
                    <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-x-12">
                        <article className="border-t border-tinte pt-8">
                            <h2 className="font-anzeige text-fs-5 text-tinte">Haftbrücke und Grundierung auf glasierten Altfliesen</h2>
                            <div className="mt-6 flex max-w-mass flex-col gap-4 font-text text-fs-3 text-tinte-2">
                                <p>
                                    Glasierte Fliesen saugen nicht – normaler Kleber findet auf ihnen schlecht Halt. Deshalb wird der
                                    Altbelag gründlich gereinigt und entfettet, Pflegefilme und Silikonreste werden entfernt.
                                </p>
                                <p>
                                    Danach folgt eine Haftbrücke bzw. Grundierung, die für nicht saugende Untergründe freigegeben ist,
                                    oder eine Kontaktschicht aus dem Kleber selbst. Verlegt wird mit einem verformungsfähigen Kleber, der
                                    laut Hersteller für Fliesen auf Fliesen geeignet ist.
                                </p>
                            </div>
                        </article>
                        <article className="border-t border-tinte pt-8">
                            <h2 className="font-anzeige text-fs-5 text-tinte">Aufbauhöhen: Türen, Übergänge, Sanitärobjekte</h2>
                            <Punkte eintraege={HEIGHTS} className="mt-6 grid max-w-mass gap-4" />
                        </article>
                    </div>
                </Abschnitt>

                {/* 5. RÜCKBAU: Fläche Fliese, Kopf links; rechts zwei Absätze und die Checkliste als Feld (Kalk) mit Haken */}
                <Abschnitt
                    titelId="rueckbau-heading"
                    flaeche="fliese"
                    leitachse
                    spaet
                    kopf="seitlich"
                    etikett="Grenzen"
                    titel="Wann ein Rückbau unvermeidbar ist"
                >
                    <div className="flex max-w-mass flex-col gap-4 font-text text-fs-3 text-tinte-2">
                        <p>
                            Wenn der Altbelag in größeren Bereichen hohl liegt oder sich löst, wenn Feuchteschäden oder Schimmel
                            hinter den Fliesen vermutet werden, wenn der Untergrund selbst gerissen ist oder wenn die zusätzliche
                            Aufbauhöhe an Türen, Treppen oder bodengleichen Duschen nicht unterzubringen ist, führt am Rückbau kein
                            Weg vorbei.
                        </p>
                        <p>
                            Auch bei mehreren übereinanderliegenden Altbelägen oder einem nicht ausreichend tragfähigen Untergrund
                            raten wir vom Überfliesen ab.
                        </p>
                    </div>
                    <div className="mt-12 border border-fuge bg-kalk p-6 lg:p-8">
                        <h3 className="font-anzeige text-fs-4 text-tinte">Checkliste: Überfliesen kommt in Frage, wenn …</h3>
                        <Punkte eintraege={CHECKLIST} marke="haken" className="mt-6 grid gap-3 md:grid-cols-2 md:gap-x-8" />
                        <p className={`mt-6 border-t border-fuge pt-4 ${TEXT}`}>
                            Die Checkliste ersetzt nicht die Prüfung vor Ort – sie hilft Ihnen, die eigene Situation vorab einzuschätzen.
                        </p>
                    </div>
                </Abschnitt>

                {/* 6. STAUBSCHUTZ UND NASSRAUM: zwei Felder mit eigener H2; das zweite trägt den Anker #nassraum – darum ohne `spaet` */}
                <Abschnitt leitachse aria-label="Rückbau im bewohnten Haus und Nassraum">
                    <Feldraster spalten={2} als="div">
                        <article className={`${FELD} bg-fliese`}>
                            <h2 className="font-anzeige text-fs-4 text-tinte">Staubarmer Rückbau im bewohnten Haus</h2>
                            <p className={`mt-6 ${TEXT}`}>
                                Ein Rückbau ohne jeden Staub ist nicht möglich – aber er lässt sich stark eindämmen. Wir trennen den
                                Arbeitsbereich mit Staubschutzwänden und -türen ab, decken Laufwege und angrenzende Flächen ab und setzen
                                Luftreiniger ein. Schutt wird auf kurzem Weg aus dem Haus gebracht, am Ende wird besenrein übergeben.
                            </p>
                        </article>
                        <article id="nassraum" className={`${FELD} bg-fliese`}>
                            <h2 className="font-anzeige text-fs-4 text-tinte">Sonderfall Nassraum: Abdichtung neu herstellen</h2>
                            <p className={`mt-6 ${TEXT}`}>
                                Alte Fliesen sind keine Abdichtung. Wird in Dusch- oder Wannenbereichen überfliest, bringen wir auf dem
                                vorbereiteten Altbelag eine neue Verbundabdichtung auf – mit Dichtbändern, Ecken und Manschetten. Passt der
                                vorhandene Ablauf nicht zu einer normgerechten Anbindung, ist ein Rückbau in diesem Bereich meist die
                                sauberere Lösung.
                            </p>
                            <div className="mt-auto pt-6">
                                <Knopf href="/untergrund-abdichtung/din-18534" variante="text" icon="pfeil-rechts">
                                    Abdichtung nach DIN 18534
                                </Knopf>
                            </div>
                        </article>
                    </Feldraster>
                </Abschnitt>

                {/* 7. FRAGEN: Fläche Fliese, Kopf links, je Frage ein Aufklapper mit Fuge (Plus/Minus) */}
                <Abschnitt titelId="faq-heading" flaeche="fliese" leitachse spaet kopf="seitlich" titel="Häufige Fragen zum Überfliesen">
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

                {/* 8. ABSCHLUSS: Überschrift, Einleitung und drei Wege (Termin, Telefon, Fotos per WhatsApp aus COMPANY_DATA) */}
                <Abschnitt
                    titelId="cta-heading"
                    leitachse
                    spaet
                    titel="Überfliesen oder Rückbau – wir klären es vor Ort"
                    einleitung={
                        <p>
                            {COMPANY_DATA.owner.fullName} prüft Haftung, Hohlstellen und Aufbauhöhen persönlich und empfiehlt den Weg, der
                            zu Ihrem Raum passt. Erste Fotos können Sie uns gern vorab per WhatsApp schicken.
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
                            Fotos per WhatsApp
                        </Knopf>
                    </div>
                </Abschnitt>

                {/* 9. WEITERFÜHRENDE RATGEBER: Fläche Fliese; Navigation mit eigener H2 wie im Bestand, vier Verweise als Merkliste */}
                <Abschnitt flaeche="fliese" leitachse spaet>
                    <nav aria-labelledby="ratgeber-heading">
                        <div className="max-w-mass">
                            <h2 id="ratgeber-heading" className="text-fs-6 text-tinte">
                                Weiterführende Ratgeber zu Fliese auf Fliese &amp; Sanierung
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
