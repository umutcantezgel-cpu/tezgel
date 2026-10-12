// Fliesen-Renovierung (E4-BAU-10, KERN v2): Erzählansicht nach dem Muster der Fliesen-Ratgeber-Seite und der Badseite.
// Einstieg mit Laserachse, H1 links, Vorspann und zwei Knöpfe; rechts das Planblatt mit dem Plan „reparatur“ (der Verlegeplan
// trägt die rote Achse des Blatts). Danach die Leitachse über die Abschnitte: Ausgangslage mit Merkmalen, Ablauf als Schrittfolge,
// Etappen und Räumung als Feldraster, Mehrere Räume mit Textlinks, Technik als Feldraster mit Hinweis, Weiterführende Ratgeber
// als Merkliste. Danach QualityPromise und der Konfigurator (nachgeladen) mit Rückfrage in der Spalte daneben.
// Wortlaut, Überschriften, Links und IDs wie im Bestand. Kein großer Moment und keine Bewegung außer dem Plan (interaktiv).
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { COMPANY_DATA } from '@/config/company';
import { createMetadata } from '@/lib/metadata';
import QualityPromise from '@/components/sections/QualityPromise';
import Icon from '@/components/icons/Icon';
import Abschnitt from '@/components/kern/Abschnitt';
import Einstieg from '@/components/kern/Einstieg';
import Planblatt, { planfelder } from '@/components/kern/Planblatt';
import { Feld, Feldraster } from '@/components/kern/Feldraster';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import Knopf from '@/components/kern/Knopf';
import Leitachse from '@/components/kern/Leitachse';
import Merkliste from '@/components/kern/Merkliste';
import Rueckfrage from '@/components/kern/Rueckfrage';
import Schrittfolge from '@/components/kern/Schrittfolge';
import Verlegeplan from '@/components/kern/Verlegeplan';
import { linkKlassen } from '@/components/kern/stile';

// Konfigurator nachladen (Tempo, wie auf der Startseite und den Leistungsseiten)
const FliesenKonfigurator = dynamic(() => import('@/components/funnels/FliesenKonfigurator'), {
    loading: () => <p className="py-12 font-mono text-fs-1 text-tinte-2">Anfrageformular wird geladen...</p>,
});

export const metadata = createMetadata({
    title: 'Fliesen Renovierung: Alte Fliesen erneuern | Tezgel',
    description:
        'Fliesenboden im bewohnten Bestand fachgerecht renovieren & erneuern: Ablauf, Staubschutz & Etappenplanung vom Fliesenleger-Fachbetrieb Tezgel in Hessen.',
    path: '/fliesen/renovierung'
});

const REASONS = [
    'Der alte Belag hat Risse, lose oder hohl klingende Fliesen.',
    'Fugen sind dauerhaft verfärbt oder ausgewaschen.',
    'Format, Farbe und Oberfläche passen nicht mehr zum Wohnkonzept.',
    'Mehrere Räume sollen einen einheitlichen, durchgehenden Boden bekommen.',
    'Eine Renovierung von Küche oder Flur steht ohnehin an.'
];

const STEPS = [
    {
        step: '01',
        title: 'Aufmaß & Untergrundprüfung',
        desc: 'Vor Ort messen wir die Flächen, prüfen den vorhandenen Belag und Untergrund auf Tragfähigkeit, Haftung und Ebenheit und schauen uns Türen, Übergänge und Anschlüsse an.'
    },
    {
        step: '02',
        title: 'Entscheidung',
        desc: 'Gemeinsam legen Sie mit uns fest: überfliesen oder zurückbauen, welches Format, welche Verlegerichtung, welche Übergänge. Danach erhalten Sie das verbindliche Festpreisangebot.'
    },
    {
        step: '03',
        title: 'Vorbereitung',
        desc: 'Material wird bestellt, Termine und Etappen werden abgestimmt. Sie räumen die betroffenen Räume, wir schützen angrenzende Bereiche und Laufwege.'
    },
    {
        step: '04',
        title: 'Verlegung & Endreinigung',
        desc: 'Untergrund vorbereiten, verlegen, verfugen, Sockel und Anschlüsse ausbilden. Zum Schluss Reinigung und gemeinsame Abnahme mit Deniz Tezgel.'
    }
];

const PREPARATION = [
    'Räume vollständig leeren – Möbel, Teppiche und Deko; alte Sockelleisten entfernen wir nach Absprache.',
    'Einen freien Weg vom Eingang zu den Arbeitsräumen und einen Platz für Material und Schneidtisch einplanen.',
    'Klären, welches Bad, welche Küche und welcher Zugang während der Arbeiten genutzt werden kann.',
    'Haustiere und Kinder von frisch verlegten Flächen fernhalten, bis diese begehbar sind.',
    'Türen, die gekürzt werden müssen, frühzeitig einplanen – das übernimmt der Tischler oder Schreiner.'
];

const TECH_LINKS = [
    { title: 'Überfliesen oder Rückbau?', desc: 'Ob der alte Belag bleiben kann, hängt von Haftung, Ebenheit und Aufbauhöhe ab. Die Entscheidung fällt nach Prüfung vor Ort.', href: '/untergrund-abdichtung/fliesen-auf-fliesen', label: 'Fliesen auf Fliesen' },
    { title: 'Aufbauhöhen an Türen und Übergängen', desc: 'Jeder zusätzliche Millimeter zeigt sich an Türen, Schwellen und Übergängen zu anderen Belägen. Wir planen die Höhen vor der Verlegung.', href: '/untergrund-abdichtung/fliesen-auf-fliesen', label: 'Aufbauhöhen planen' },
    { title: 'Unebenheiten ausgleichen', desc: 'Ältere Estriche und Böden sind selten plan. Ausgleichsmassen schaffen die ebene Fläche, die moderne Formate brauchen.', href: '/untergrund-abdichtung/ausgleich-gefaelle', label: 'Ausgleich & Gefälle' }
];

const CROSS_LINKS = [
    { href: '/leistungen/untergrund', label: 'Untergrundvorbereitung', desc: 'Tragfähig, eben und trocken' },
    { href: '/leistungen/wohnen', label: 'Fliesen im Wohnbereich', desc: 'Wohnen, Küche und Flur' },
    { href: '/bad/badsanierung', label: 'Badsanierung', desc: 'Wenn auch das Bad erneuert werden soll' },
    { href: '/beratung', label: 'Beratung', desc: 'Ihr Projekt persönlich besprechen' }
];

export default function RenovierungPage() {
    return (
        <>
            {/* 1. EINSTIEG: Kennzeile, H1 auf der Achse, Vorspann, Knöpfe; rechts das Planblatt mit dem Plan „reparatur“ */}
            <section aria-labelledby="renovierung-heading">
                <Einstieg
                    art="erzaehl"
                    etikett="Renovierung im Bestand"
                    titel={
                        <span id="renovierung-heading">
                            Fliesenboden im Bestand erneuern:{' '}
                            <span>Ablauf im bewohnten Haus</span>
                        </span>
                    }
                    vorspann={
                        <p>
                            Fliesenboden im Bestand erneuern: Ein sauberer, strukturierter Ablauf im bewohnten Haus gelingt mit vorausschauender Planung und staubarmen Verfahren. Erfahren Sie, wann sich die Erneuerung lohnt und wie wir Wohnräume zügig neu belegen.
                        </p>
                    }
                    aktionen={
                        <>
                            <Knopf href="/kontakt" icon="pfeil-rechts">Kostenfreies Aufmaß anfragen</Knopf>
                            <Knopf href="/fliesen/konfigurator" variante="neben">Projekt im Konfigurator vorbereiten</Knopf>
                        </>
                    }
                    rand={
                        <Planblatt felder={planfelder('Fliesen Renovierung', 'reparatur')}>
                            <Verlegeplan plan="reparatur" ohneAchse bemassung={false} interaktiv />
                        </Planblatt>
                    }
                />
            </section>

            <Leitachse>
                {/* 2. AUSGANGSLAGE: Kopf links mit Text und Verweisen, Merkmale rechts als Fugenkreuz-Liste */}
                <Abschnitt
                    titelId="lohnt-heading"
                    leitachse
                    spaet
                    kopf="seitlich"
                    etikett="Ausgangslage"
                    titel="Wann sich ein neuer Fliesenboden im Bestand lohnt"
                    einleitung={
                        <>
                            <p>
                                Nicht jeder unschöne Boden muss komplett erneuert werden. Manchmal reicht es, Fugen zu sanieren oder
                                einzelne Fliesen zu tauschen. Einen neuen Belag empfehlen wir, wenn mehrere der folgenden Punkte
                                zutreffen:
                            </p>
                            <p className="mt-4 text-fs-2 text-tinte-2">
                                Kleinere Schäden?{' '}
                                <Link href="/fliesenreparatur" className={linkKlassen}>
                                    Fliesenreparatur
                                </Link>{' '}
                                oder{' '}
                                <Link href="/fliesen/fugensanierung" className={linkKlassen}>
                                    Fugensanierung
                                </Link>
                                .
                            </p>
                        </>
                    }
                >
                    <ul className="grid gap-3">
                        {REASONS.map((reason) => (
                            <li key={reason} className="flex gap-3 font-text text-fs-2 text-tinte">
                                <span aria-hidden="true" className="flex h-6 shrink-0 items-center text-strich">
                                    <Fugenkreuz className="size-3" />
                                </span>
                                <span className="min-w-0">{reason}</span>
                            </li>
                        ))}
                    </ul>
                </Abschnitt>

                {/* 3. ABLAUF: vier Schritte als Schrittfolge, waagrecht ab lg */}
                <Abschnitt
                    titelId="ablauf-heading"
                    flaeche="fliese"
                    leitachse
                    spaet
                    etikett="Ablauf"
                    titel="Ablauf in 4 Schritten: Aufmaß, Entscheidung, Vorbereitung, Verlegung"
                >
                    <Schrittfolge
                        ausrichtung="waagrecht"
                        nummerStumm
                        schritte={STEPS.map((item) => ({ nummer: item.step, titel: item.title, text: item.desc }))}
                    />
                </Abschnitt>

                {/* 4. ETAPPEN UND RÄUMUNG: zwei Felder nebeneinander; Vorbereitung als Fugenkreuz-Liste */}
                <Abschnitt leitachse spaet>
                    <Feldraster spalten={2}>
                        <Feld>
                            <article aria-labelledby="etappen-heading" className="flex flex-1 flex-col">
                                <h2 id="etappen-heading" className="font-anzeige text-fs-5 text-tinte">Raum für Raum oder alles auf einmal: Etappen planen</h2>
                                <div className="mt-4 space-y-3 font-text text-fs-3 text-tinte-2">
                                    <p>
                                        Alles in einem Zug ist meist die effizienteste Lösung: Fugenachsen und Übergänge lassen sich über
                                        alle Räume durchplanen, und Vorbereitungsarbeiten fallen nur einmal an. Dafür muss der gesamte
                                        Bereich für die Dauer der Arbeiten geräumt sein.
                                    </p>
                                    <p>
                                        In Etappen zu arbeiten ist möglich, wenn einzelne Räume weiter genutzt werden sollen. Welche
                                        Reihenfolge sinnvoll ist und welche Bereiche zwischendurch begehbar bleiben, legen wir nach
                                        Absprache fest – abhängig von Grundriss, Trocknungszeiten und Zugängen.
                                    </p>
                                </div>
                            </article>
                        </Feld>
                        <Feld>
                            <article aria-labelledby="raeumung-heading" className="flex flex-1 flex-col">
                                <h2 id="raeumung-heading" className="font-anzeige text-fs-5 text-tinte">Räumung, Möbel, Zugänge: was Bewohner vorbereiten</h2>
                                <ul className="mt-4 grid gap-3 font-text text-fs-2 text-tinte-2">
                                    {PREPARATION.map((item) => (
                                        <li key={item} className="flex gap-3">
                                            <span aria-hidden="true" className="flex h-6 shrink-0 items-center text-strich">
                                                <Fugenkreuz className="size-3" />
                                            </span>
                                            <span className="min-w-0">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </article>
                        </Feld>
                    </Feldraster>
                </Abschnitt>

                {/* 5. MEHRERE RÄUME: Text und zwei Textlinks */}
                <Abschnitt
                    titelId="mehrere-heading"
                    flaeche="fliese"
                    leitachse
                    spaet
                    etikett="Durchgehend geplant"
                    titel="Mehrere Räume in einem Zug: Küche, Flur und Wohnbereich abstimmen"
                    einleitung={
                        <p>
                            Wenn Küche, Flur und Wohnbereich gemeinsam erneuert werden, lohnt sich eine übergreifende Planung: ein
                            Format und eine Fugenachse über alle Räume, einheitliche Sockel, abgestimmte Höhen an Türen und
                            Übergängen. In der Küche klären wir zusätzlich, ob der Boden unter die Küchenzeile läuft oder die
                            Möbel bleiben.
                        </p>
                    }
                >
                    <div className="flex flex-wrap gap-x-8 gap-y-3">
                        <Knopf href="/fliesen/kueche" variante="text" icon="pfeil-rechts">Küche fliesen</Knopf>
                        <Knopf href="/fliesen/flur-diele" variante="text" icon="pfeil-rechts">Flur &amp; Diele fliesen</Knopf>
                    </div>
                </Abschnitt>

                {/* 6. TECHNISCHE WEICHEN: drei Felder mit je einem Textlink, darunter der Hinweis zu Schadstoffen */}
                <Abschnitt
                    titelId="weichen-heading"
                    leitachse
                    spaet
                    etikett="Technik"
                    titel="Die technischen Weichen im Kurzüberblick: Überfliesen, Rückbau, Aufbauhöhen"
                >
                    <Feldraster spalten={3}>
                        {TECH_LINKS.map((item) => (
                            <Feld key={item.title}>
                                <h3 className="font-anzeige text-fs-4 text-tinte">{item.title}</h3>
                                <p className="mt-3 flex-1 font-text text-fs-2 text-tinte-2">{item.desc}</p>
                                <div className="mt-6">
                                    <Knopf href={item.href} variante="text" icon="pfeil-rechts">{item.label}</Knopf>
                                </div>
                            </Feld>
                        ))}
                    </Feldraster>
                    <div className="mt-8 flex items-start gap-4 border border-l-2 border-tinte bg-fliese p-6 font-text text-fs-2 text-tinte">
                        <Icon name="hinweis" groesse={5} className="mt-1 text-tinte" />
                        <p className="min-w-0">
                            <strong className="font-semibold">Hinweis zu Schadstoffen:</strong> Alte Bodenbeläge und Kleber
                            aus früheren Jahrzehnten können Schadstoffe wie Asbest oder PAK enthalten. Besteht ein Verdacht, muss
                            vor dem Rückbau eine Untersuchung erfolgen; die Entfernung übernimmt ein dafür zugelassener
                            Fachbetrieb. Wir sprechen das beim Aufmaß an.
                        </p>
                    </div>
                </Abschnitt>

                {/* 7. WEITERFÜHRENDE RATGEBER: vier Verweise als Merkliste, darunter die Direktnummer */}
                <Abschnitt titelId="ratgeber-heading" flaeche="fliese" leitachse spaet titel="Weiterführende Ratgeber zur Fliesenrenovierung & Altbausanierung">
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
                    <p className="mt-8 font-text text-fs-2 text-tinte-2">
                        Direkt sprechen:{' '}
                        <a href={`tel:${COMPANY_DATA.contact.phoneLink}`} className="inline-flex items-center gap-1 font-semibold text-tinte underline decoration-strich underline-offset-4 hover:decoration-tinte">
                            <Icon name="telefon" groesse={4} />
                            {COMPANY_DATA.contact.phone}
                        </a>
                    </p>
                </Abschnitt>
            </Leitachse>

            <QualityPromise />

            {/* 8. KONFIGURATOR: Funnel (nachgeladen) mit 8 Spalten, rechts die Rückfrage in 4 Spalten (ab lg) */}
            <Abschnitt aria-label="Fliesen-Konfigurator" spaet>
                <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-12">
                    <div className="min-w-0 lg:col-span-8">
                        <FliesenKonfigurator substrate="altfliesen" />
                    </div>
                    <div className="lg:col-span-4">
                        <Rueckfrage />
                    </div>
                </div>
            </Abschnitt>
        </>
    );
}
