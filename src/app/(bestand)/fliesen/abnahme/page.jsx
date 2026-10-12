// Abnahme (E4-BAU-05, KERN v2): Erzählansicht nach dem Muster der Familie Fliesen (/fliesen) und der Leistungsseiten.
// Einstieg mit Laserachse, H1 links, Vorspann und zwei Knöpfe; rechts das Planblatt mit dem Fugenbild (Verlegeplan „fugen“,
// interaktiv). Danach die Leitachse über die Abschnitte: Warum gemeinsam, fünf Prüfpunkte als Feldraster, Toleranzen als
// Tabelle, vier Erläuterungen als Feldraster, Checkliste als Merkliste (Anker #checkliste), Konfigurator-Hinweis mit
// Knöpfen und die weiterführenden Ratgeber als Merkliste. Wortlaut, Überschriften, Links, IDs und Lesefolge wie im Bestand.
// Kein großer Moment, kein Auftritt. Metadaten unverändert.
import Link from 'next/link';
import { COMPANY_DATA } from '@/config/company';
import { createMetadata } from '@/lib/metadata';
import QualityPromise from '@/components/sections/QualityPromise';
import Abschnitt from '@/components/kern/Abschnitt';
import Einstieg from '@/components/kern/Einstieg';
import Leitachse from '@/components/kern/Leitachse';
import { Feld, Feldraster } from '@/components/kern/Feldraster';
import Knopf from '@/components/kern/Knopf';
import Merkliste from '@/components/kern/Merkliste';
import Planblatt, { planfelder } from '@/components/kern/Planblatt';
import Tabelle from '@/components/kern/Tabelle';
import Verlegeplan from '@/components/kern/Verlegeplan';
import { linkKlassen } from '@/components/kern/stile';

export const metadata = createMetadata({
    title: 'Fliesenarbeiten abnehmen: Checkliste & Normen | Tezgel',
    description:
        'Checkliste für die Abnahme von Fliesenarbeiten: Ebenheit nach DIN 18202, Fugenbild, Hohlstellen & Toleranzen erklärt vom Fachbetrieb Tezgel aus Aßlar.',
    path: '/fliesen/abnahme'
});

const CHECKPOINTS = [
    {
        title: 'Ebenheit & Winkel',
        desc: 'Mit Richtscheit und Messkeil wird geprüft, ob Boden und Wand innerhalb der vereinbarten Toleranzen liegen. Maßstab ist in der Regel DIN 18202.'
    },
    {
        title: 'Überzähne & Fugenbild',
        desc: 'Stehen benachbarte Fliesenkanten spürbar über? Sind Fugen gleichmäßig breit, geradlinig und vollständig gefüllt? Laufen die Achsen wie geplant?'
    },
    {
        title: 'Hohlstellen',
        desc: 'Die Klopfprobe gibt Hinweise auf nicht vollflächig gebettete Fliesen. Ein hohler Klang allein ist aber noch kein Urteil – es kommt auf Lage, Größe und Beanspruchung an.'
    },
    {
        title: 'Anschlüsse & Silikon',
        desc: 'Elastische Fugen an Wanne, Dusche, Wandanschlüssen und Übergängen müssen an beiden Flanken haften, glatt abgezogen und frei von Fehlstellen sein.'
    },
    {
        title: 'Unterlagen & Restmaterial',
        desc: 'Pflegehinweise, Angaben zu verwendetem Kleber, Fugenmörtel und Silikon sowie einige Restfliesen für spätere Reparaturen gehören zur Übergabe.'
    }
];

const TOLERANCES = [
    { row: 'Zeile 3', area: 'Flächenfertige Böden, z. B. Fliesenbeläge', v01: '2', v1: '4', v4: '10' },
    { row: 'Zeile 4', area: 'wie Zeile 3, mit erhöhten Anforderungen', v01: '1', v1: '3', v4: '9' },
    { row: 'Zeile 6', area: 'Flächenfertige Wände, z. B. Wandbekleidungen', v01: '3', v1: '5', v4: '10' },
    { row: 'Zeile 7', area: 'wie Zeile 6, mit erhöhten Anforderungen', v01: '2', v1: '3', v4: '8' }
];

const CHECKLIST = [
    {
        group: 'Fläche & Geometrie',
        items: [
            'Boden mit Richtscheit an mehreren Stellen geprüft, keine auffälligen Mulden oder Buckel',
            'Wandflächen lotrecht, Ecken und Kanten im Winkel',
            'Keine störenden Überzähne zwischen benachbarten Fliesen',
            'Zuschnitte an Rändern, Türen und Aussparungen sauber und wie besprochen verteilt'
        ]
    },
    {
        group: 'Fugen',
        items: [
            'Fugenbreite gleichmäßig, Fugen vollständig gefüllt und ohne Löcher',
            'Fugenfarbe entspricht der Bemusterung',
            'Bewegungs- und Randfugen an den geplanten Stellen ausgebildet',
            'Silikonfugen an beiden Flanken haftend, glatt, ohne Blasen'
        ]
    },
    {
        group: 'Details',
        items: [
            'Klopfprobe stichprobenartig durchgeführt, Auffälligkeiten gemeinsam bewertet',
            'Profile, Sockel und Gehrungskanten sauber gestoßen',
            'Abläufe, Rinnen und Rohrdurchführungen sauber eingefasst',
            'Keine Kleber- oder Fugenmörtelreste auf der Oberfläche'
        ]
    },
    {
        group: 'Übergabe',
        items: [
            'Pflegehinweise für Fliesen, Fugen und ggf. Naturstein erhalten',
            'Materialangaben notiert: Fliese (Serie, Farbe, Charge), Kleber, Fugenmörtel, Silikon',
            'Restfliesen für spätere Reparaturen übergeben',
            'Offene Punkte schriftlich festgehalten, Termin zur Erledigung vereinbart'
        ]
    }
];

const CROSS_LINKS = [
    { href: '/unternehmen', label: 'Über unseren Betrieb', desc: 'Fachbetrieb aus Aßlar' },
    { href: '/fliesen/verlegetechnik', label: 'Verlegetechnik & Werkstoffe', desc: 'Kleber, Bettung und Fugenmörtel' },
    { href: '/fliesen/fugensanierung', label: 'Fugensanierung', desc: 'Silikon- und Zementfugen erneuern' },
    { href: '/faq', label: 'Häufige Fragen', desc: 'Antworten rund um Fliesenarbeiten' }
];

export default function AbnahmePage() {
    return (
        <>
            {/* 1. EINSTIEG: Etikett, H1 an der Laserachse, Vorspann, zwei Knöpfe; rechts das Planblatt mit dem Fugenbild */}
            <section aria-labelledby="abnahme-heading">
                <Einstieg
                    art="erzaehl"
                    etikett={<>Abnahme &middot; DIN 18202</>}
                    titel={
                        <span id="abnahme-heading">
                            Fliesenarbeiten abnehmen: Checkliste &amp; Normen bei{' '}
                            <span>Tezgel</span>
                        </span>
                    }
                    vorspann={
                        <p>
                            Fliesenarbeiten fachgerecht abnehmen nach DIN 18202 und anerkannten Regeln der Technik: Fachbetrieb Tezgel erklärt Checkliste, Ebenheitstoleranzen, Fugenbild und worauf Bauherren bei der Übergabe achten sollten.
                        </p>
                    }
                    aktionen={
                        <>
                            <Knopf href="/kontakt" icon="pfeil-rechts">
                                Projekt besprechen
                            </Knopf>
                            <Knopf href="#checkliste" variante="neben">
                                Zur Checkliste
                            </Knopf>
                        </>
                    }
                    rand={
                        <Planblatt felder={planfelder('Fliesenarbeiten abnehmen', 'fugen')}>
                            <Verlegeplan plan="fugen" ohneAchse bemassung={false} interaktiv />
                        </Planblatt>
                    }
                />
            </section>

            <Leitachse>
                {/* 2. WARUM GEMEINSAM: Überschrift links, Text rechts */}
                <Abschnitt titelId="gemeinsam-heading" kopf="seitlich" leitachse spaet titel="Warum eine gemeinsame Abnahme sinnvoll ist">
                    <p className="max-w-mass font-text text-fs-3 text-tinte">
                        Bei einer gemeinsamen Begehung sehen Sie die Flächen mit dem Handwerker zusammen an, klären Fragen direkt am
                        Objekt und halten offene Punkte fest. Das schafft Klarheit für beide Seiten. Bei Fliesenverlegung Tezgel
                        schließt {COMPANY_DATA.owner.fullName} Projekte persönlich mit einer gemeinsamen Abnahme ab. Rechtliche Fragen
                        zu Abnahme und Gewährleistung beantwortet im Zweifel eine fachkundige Rechtsberatung – diese Seite ist eine
                        technische Orientierung.
                    </p>
                </Abschnitt>

                {/* 3. PRÜFPUNKTE: fünf Felder im Feldraster; das letzte Feld füllt die Zeile */}
                <Abschnitt titelId="pruefpunkte-heading" etikett="Prüfpunkte" titel="Fünf Punkte, die bei jeder Abnahme dazugehören" leitachse spaet>
                    <Feldraster spalten={2}>
                        {CHECKPOINTS.map((item, i) => (
                            <Feld key={item.title} spanne={i === CHECKPOINTS.length - 1 ? 2 : undefined}>
                                <h3 className="font-anzeige text-fs-4 text-tinte">{item.title}</h3>
                                <p className="mt-3 max-w-mass font-text text-fs-3 text-tinte-2">{item.desc}</p>
                            </Feld>
                        ))}
                    </Feldraster>
                </Abschnitt>

                {/* 4. TOLERANZEN: Einleitung, Tabelle in der Region mit Name, Hinweis darunter */}
                <Abschnitt
                    titelId="toleranzen-heading"
                    etikett="Toleranzen"
                    titel="Ebenheit und Winkel: Toleranzen nach DIN 18202 für Boden und Wand"
                    einleitung={
                        <p>
                            DIN 18202 legt Grenzwerte für Ebenheitsabweichungen als sogenannte Stichmaße fest: Ein Richtscheit wird auf
                            zwei Hochpunkte gelegt, gemessen wird der Abstand zur Fläche dazwischen. Je größer der Abstand der
                            Auflagepunkte, desto größer die zulässige Abweichung. Winkeltoleranzen regelt Tabelle 2 der Norm.
                        </p>
                    }
                    leitachse
                    spaet
                >
                    <Tabelle
                        name="Grenzwerte für Ebenheitsabweichungen nach DIN 18202, Tabelle 3 (Auszug)"
                        kopf={['Tabelle 3', 'Bezug', '0,1 m', '1 m', '4 m']}
                        zeilen={TOLERANCES.map((row) => [row.row, row.area, `${row.v01} mm`, `${row.v1} mm`, `${row.v4} mm`])}
                        ausrichtung={['links', 'links', 'rechts', 'rechts', 'rechts']}
                    />
                    <p className="mt-6 max-w-mass font-text text-fs-2 text-tinte-2">
                        Stichmaße als Grenzwerte bei den genannten Messpunktabständen, Auszug nach DIN 18202:2019-07. Die Werte dienen
                        der Orientierung. Erhöhte Anforderungen (Zeilen 4 und 7) gelten nur, wenn sie ausdrücklich vereinbart wurden –
                        etwa bei Großformaten. Maßgeblich ist immer der konkrete Vertrag.
                    </p>
                </Abschnitt>

                {/* 5. ERLÄUTERUNGEN: vier Felder im Feldraster, je Feld eine Überschrift (Artikel) mit Text */}
                <Abschnitt leitachse spaet>
                    <Feldraster spalten={2}>
                        <Feld>
                            <article aria-labelledby="ueberzaehne-heading" className="flex flex-1 flex-col">
                                <h2 id="ueberzaehne-heading" className="font-anzeige text-fs-5 text-tinte">
                                    Überzähne, Fugenbreite und Fugenbild
                                </h2>
                                <p className="mt-3 max-w-mass font-text text-fs-3 text-tinte-2">
                                    Beurteilt wird aus der normalen Gebrauchsperspektive und bei üblicher Beleuchtung – nicht mit der
                                    Taschenlampe im Streiflicht, das jede Kante überzeichnet. Kalibrierte und rektifizierte Fliesen
                                    ermöglichen schmalere und gleichmäßigere Fugen als Fliesen mit größeren Maßtoleranzen. Wichtig ist,
                                    dass das Fugenbild dem entspricht, was vorher vereinbart wurde.
                                </p>
                            </article>
                        </Feld>
                        <Feld>
                            <article aria-labelledby="hohlstellen-heading" className="flex flex-1 flex-col">
                                <h2 id="hohlstellen-heading" className="font-anzeige text-fs-5 text-tinte">
                                    Hohlstellen: die Klopfprobe richtig einordnen
                                </h2>
                                <p className="mt-3 max-w-mass font-text text-fs-3 text-tinte-2">
                                    Ein Kugelkopf- oder Klopfhammer macht nicht vollflächig gebettete Bereiche hörbar. Einzelne,
                                    kleinflächige Hohlstellen – etwa an einer Fliesenecke – sind nicht automatisch ein Mangel. Kritischer
                                    sind größere Hohllagen an stark belasteten Stellen, in Nassbereichen und im Außenbereich. Die Bewertung
                                    hängt immer vom Einzelfall ab.
                                </p>
                            </article>
                        </Feld>
                        <Feld>
                            <article aria-labelledby="anschluesse-heading" className="flex flex-1 flex-col">
                                <h2 id="anschluesse-heading" className="font-anzeige text-fs-5 text-tinte">
                                    Anschlüsse, Silikonfugen und Abdichtungsdetails
                                </h2>
                                <p className="mt-3 max-w-mass font-text text-fs-3 text-tinte-2">
                                    Elastische Fugen sind Wartungsfugen: Sie müssen bei der Übergabe einwandfrei sein, werden später aber
                                    regelmäßig kontrolliert und bei Bedarf erneuert. Die Abdichtung nach DIN 18534 selbst ist nach dem
                                    Fliesen nicht mehr sichtbar – fragen Sie deshalb schon während der Ausführung nach, wie sie dokumentiert
                                    wird. Details zur Norm finden Sie unter{' '}
                                    <Link href="/untergrund-abdichtung/din-18534" className={linkKlassen}>
                                        Abdichtung nach DIN 18534
                                    </Link>
                                    .
                                </p>
                            </article>
                        </Feld>
                        <Feld>
                            <article aria-labelledby="unterlagen-heading" className="flex flex-1 flex-col">
                                <h2 id="unterlagen-heading" className="font-anzeige text-fs-5 text-tinte">
                                    Unterlagen: Pflegehinweise, Restfliesen, Materialliste
                                </h2>
                                <p className="mt-3 max-w-mass font-text text-fs-3 text-tinte-2">
                                    Notieren Sie sich Serie, Farbe und Chargennummer der Fliesen sowie die Bezeichnungen von Kleber,
                                    Fugenmörtel und Silikon. Mit einigen Restfliesen aus derselben Charge lassen sich spätere Schäden passend
                                    reparieren. Pflegehinweise helfen, Fugen und Oberflächen richtig zu behandeln – Grundlagen dazu im Ratgeber{' '}
                                    <Link href="/blog/fliesen-reinigen-pflegen" className={linkKlassen}>
                                        Fliesen reinigen und pflegen
                                    </Link>
                                    .
                                </p>
                            </article>
                        </Feld>
                    </Feldraster>
                </Abschnitt>

                {/* 6. CHECKLISTE: vier Gruppen als Merkliste an der Fuge; die Punkte mit Kästchen zum Ausdrucken */}
                <Abschnitt
                    id="checkliste"
                    titelId="checkliste-heading"
                    etikett="Zum Ausdrucken"
                    titel="Checkliste zum Ausdrucken"
                    einleitung={
                        <p>
                            Drucken Sie diese Seite über die Druckfunktion Ihres Browsers aus und nehmen Sie die Liste zur Abnahme mit.
                        </p>
                    }
                    leitachse
                    spaet
                >
                    <Merkliste
                        titelAls="h3"
                        eintraege={CHECKLIST.map((block) => ({
                            titel: block.group,
                            fuss: (
                                <ul className="grid gap-3">
                                    {block.items.map((item) => (
                                        <li key={item} className="flex gap-3 font-text text-fs-2 text-tinte">
                                            <span aria-hidden="true" className="mt-1 size-4 shrink-0 border border-strich" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            )
                        }))}
                    />
                </Abschnitt>

                {/* 7. KONFIGURATOR-HINWEIS: Überschrift links, zwei Knöpfe rechts; Fläche Fliese */}
                <Abschnitt
                    flaeche="fliese"
                    kopf="seitlich"
                    titel="Neues Fliesenprojekt geplant?"
                    einleitung={
                        <p>
                            Mit dem Fliesen-Konfigurator bereiten Sie Raum, Untergrund, Format und Fläche in vier Schritten vor. Das
                            verbindliche Festpreisangebot folgt nach dem kostenfreien Aufmaß vor Ort.
                        </p>
                    }
                    leitachse
                    spaet
                >
                    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                        <Knopf href="/fliesen/konfigurator" icon="pfeil-rechts">
                            Zum Konfigurator
                        </Knopf>
                        <Knopf href={`tel:${COMPANY_DATA.contact.phoneLink}`} variante="neben" iconLinks="telefon">
                            <span className="font-mono font-normal">{COMPANY_DATA.contact.phone}</span>
                        </Knopf>
                    </div>
                </Abschnitt>

                {/* 8. WEITERFÜHRENDE RATGEBER: vier Verweise als Merkliste im Feldraster mit Beschreibung */}
                <Abschnitt titelId="ratgeber-heading" titel="Weiterführende Ratgeber zur Fliesenverlegung & Bauabnahme" leitachse spaet>
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

            {/* 9. ABSCHLUSS */}
            <QualityPromise />
        </>
    );
}
