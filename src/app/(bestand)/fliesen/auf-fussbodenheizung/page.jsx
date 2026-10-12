// Fliesen auf Fußbodenheizung (E4-BAU-05, KERN v2): Erzählansicht nach dem Muster der Familie Fliesen (/fliesen) und der
// Leistungsseiten. Einstieg mit Laserachse, H1 links, Vorspann und zwei Knöpfe; rechts das Planblatt mit dem Heizungsplan
// („fussbodenheizung“, interaktiv). Danach die Leitachse über die Abschnitte: fünf Punkte als Feldraster, Schnittstellen
// als Tabelle, weiterführende Ratgeber als Merkliste, der Konfigurator mit Rückfrage in der Spalte daneben. Anschließend
// QualityPromise und der Abschluss mit Anfrageknöpfen. Der Konfigurator wird nachgeladen (Tempo). Wortlaut, Überschriften,
// Links, IDs und Lesefolge wie im Bestand. Kein großer Moment, kein Auftritt. Metadaten unverändert.
import Link from 'next/link';
import dynamic from 'next/dynamic';
import FormularPlatzhalter from '@/components/funnels/TezgelAnfrageFunnel/Platzhalter';
import { COMPANY_DATA } from '@/config/company';
import { createMetadata } from '@/lib/metadata';
import QualityPromise from '@/components/sections/QualityPromise';
import WhatsAppLogo from '@/components/ui/WhatsAppLogo';
import Abschnitt from '@/components/kern/Abschnitt';
import Einstieg from '@/components/kern/Einstieg';
import Leitachse from '@/components/kern/Leitachse';
import { Feld, Feldraster } from '@/components/kern/Feldraster';
import Knopf from '@/components/kern/Knopf';
import Merkliste from '@/components/kern/Merkliste';
import Planblatt, { planfelder } from '@/components/kern/Planblatt';
import Rueckfrage from '@/components/kern/Rueckfrage';
import Tabelle from '@/components/kern/Tabelle';
import Verlegeplan from '@/components/kern/Verlegeplan';
import { linkKlassen } from '@/components/kern/stile';

// Konfigurator nachladen (Tempo, wie auf der Startseite und den Leistungsseiten); ID #konfigurator liegt am Abschnitt
const FliesenKonfigurator = dynamic(() => import('@/components/funnels/FliesenKonfigurator'), {
    loading: () => <FormularPlatzhalter />,
});

export const metadata = createMetadata({
    title: 'Fliesen auf Fußbodenheizung verlegen | Ratgeber Tezgel',
    description:
        'Fliesen auf Fußbodenheizung fachgerecht verlegen: Belegreife des Heizestrichs, verformbare Kleber & normgerechte Dehnungsfugen. Ratgeber vom Fachbetrieb Tezgel.',
    path: '/fliesen/auf-fussbodenheizung'
});

// Fünf Punkte: Überschrift, Text, optional ein Verweis im Feld (nur der Verweis mit Pfeil, je Feld eine Aktion)
const TOPICS = [
    {
        id: 'waerme',
        title: 'Keramik und Naturstein leiten Wärme gut',
        text: 'Fliesen und Naturstein sind dicht und haben einen geringen Wärmedurchlasswiderstand. Die Wärme aus dem Estrich gelangt deshalb zügig an die Oberfläche, und der Belag reagiert auf Temperaturänderungen weder mit Quellen noch mit Schwinden. Deshalb gelten keramische Beläge als besonders gut geeignet für Flächenheizungen.'
    },
    {
        id: 'aufheizen',
        title: 'Vor dem Verlegen: Funktions- und Belegreifheizen',
        text: 'Ein Heizestrich wird vor dem Belegen aufgeheizt. Das Funktionsheizen prüft die Anlage und ist im Normenwerk der Flächenheizung (DIN EN 1264-4) beschrieben. Das Belegreifheizen dient dazu, die Restfeuchte auf den für Fliesen zulässigen Wert zu senken. Beides übernimmt der Heizungsbauer bzw. die Bauherrschaft und dokumentiert es in einem Aufheizprotokoll. Vor dem Verlegen prüfen wir die Belegreife.',
        link: { label: 'Estrich & Belegreife', href: '/untergrund-abdichtung/estrich-belegreife' }
    },
    {
        id: 'kleber',
        title: 'Verformbarer Kleber und vollflächige Bettung',
        text: 'Ein beheizter Estrich dehnt sich beim Aufheizen aus und zieht sich beim Abkühlen zusammen. Der Kleber muss diese Bewegungen aufnehmen können. Wir verlegen auf Heizestrich mit flexiblen C2-Klebern der Verformbarkeitsklasse S1 bzw. S2 und achten auf eine vollflächige, hohlraumarme Bettung – Hohlstellen würden Wärmeübertragung und Belastbarkeit verschlechtern.',
        link: { label: 'Kleberklassen C2, S1, S2 erklärt', href: '/fliesen/verlegetechnik' }
    },
    {
        id: 'fugen',
        title: 'Rand-, Bewegungs- und Feldbegrenzungsfugen',
        text: 'Randfugen trennen den Belag von Wänden, Stützen und Einbauten. Bewegungsfugen im Estrich werden deckungsgleich im Fliesenbelag übernommen, ebenso Fugen zwischen getrennt geregelten Heizkreisen. Die Lage der Fugen ergibt sich aus dem Fugenplan der Estrich- bzw. Heizungsplanung. Diese Fugen werden elastisch geschlossen und nicht überfliest.'
    },
    {
        id: 'duennbett',
        title: 'Elektrische Dünnbett-Heizsysteme im Bestand',
        text: 'Bei Renovierungen kommen oft elektrische Heizmatten oder -kabel zum Einsatz, die mit geringer Aufbauhöhe direkt unter dem Belag liegen – eingebettet in Ausgleichsmasse oder Kleberschicht. Wir bereiten den Untergrund vor, betten das System nach Herstellerangabe ein und verlegen die Fliesen darauf. Den elektrischen Anschluss und die Regelung übernimmt ein Elektrofachbetrieb.'
    }
];

const ROLES = [
    { trade: 'Heizungsbauer', task: 'Plant und installiert die Flächenheizung, führt Funktions- und ggf. Belegreifheizen durch und protokolliert es.' },
    { trade: 'Estrichleger', task: 'Stellt den Heizestrich her und legt Bewegungsfugen nach Fugenplan an.' },
    { trade: 'Elektriker', task: 'Schließt elektrische Heizsysteme an, setzt Fühler und Regelung und prüft die Anlage.' },
    { trade: 'Fliesenleger', task: 'Prüft Belegreife und Untergrund, übernimmt Fugenplan und Randfugen und verlegt den Belag mit verformbarem Kleber.' }
];

const WEITERLESEN = [
    { label: 'Estrich & Belegreife prüfen', href: '/untergrund-abdichtung/estrich-belegreife' },
    { label: 'Leistung: Untergrund & Abdichtung', href: '/leistungen/untergrund' },
    { label: 'Fliesen im Bad', href: '/bad/fliesen' },
    { label: 'Persönliche Beratung', href: '/beratung' }
];

export default function FliesenAufFussbodenheizungPage() {
    return (
        <>
            {/* 1. EINSTIEG: Etikett, H1 an der Laserachse, Vorspann, zwei Knöpfe; rechts das Planblatt mit dem Heizungsplan */}
            <section aria-labelledby="fbh-heading">
                <Einstieg
                    art="erzaehl"
                    etikett={<>Verlegetechnik &middot; Neubau &amp; Bestand</>}
                    titel={
                        <span id="fbh-heading">
                            Fliesen auf Fußbodenheizung:{' '}
                            <span>Aufbau, Fugen und Kleberwahl</span>
                        </span>
                    }
                    vorspann={
                        <p>
                            Fliesen auf Fußbodenheizung erfordern einen normgerechten Aufbau, spannungsarme Fugen und eine fundierte
                            Kleberwahl: Fliesen und Naturstein sind der ideale Belag für Flächenheizungen – vorausgesetzt, Estrich, Kleber
                            und Fugen sind exakt auf die Temperaturwechsel abgestimmt. Wir verlegen auf Warmwasser-Fußbodenheizung und auf
                            elektrischen Dünnbett-Systemen.
                        </p>
                    }
                    aktionen={
                        <>
                            <Knopf href="/kontakt" icon="pfeil-rechts">
                                Aufmaß anfragen
                            </Knopf>
                            <Knopf href="/untergrund-abdichtung/estrich-belegreife" variante="neben">
                                Estrich &amp; Belegreife
                            </Knopf>
                        </>
                    }
                    rand={
                        <Planblatt felder={planfelder('Fliesen auf Fußbodenheizung verlegen', 'fussbodenheizung')}>
                            <Verlegeplan plan="fussbodenheizung" ohneAchse bemassung={false} interaktiv />
                        </Planblatt>
                    }
                />
            </section>

            <Leitachse>
                {/* 2. WORAUF ES ANKOMMT: fünf Punkte im Feldraster; das letzte Feld füllt die Zeile; Schlussabsatz darunter */}
                <Abschnitt
                    titelId="fbh-themen-heading"
                    etikett="Worauf es ankommt"
                    titel={
                        <>
                            Fünf Punkte für einen <span>dauerhaften Belag</span>
                        </>
                    }
                    leitachse
                    spaet
                >
                    <Feldraster spalten={2}>
                        {TOPICS.map((item, i) => (
                            <Feld key={item.id} spanne={i === TOPICS.length - 1 ? 2 : undefined}>
                                <h3 className="font-anzeige text-fs-4 text-tinte">{item.title}</h3>
                                <p className="mt-3 max-w-mass font-text text-fs-3 text-tinte-2">{item.text}</p>
                                {item.link && (
                                    <div className="mt-auto pt-6">
                                        <Knopf href={item.link.href} variante="text" icon="pfeil-rechts">
                                            {item.link.label}
                                        </Knopf>
                                    </div>
                                )}
                            </Feld>
                        ))}
                    </Feldraster>
                    <p className="mt-8 max-w-mass font-text text-fs-3 text-tinte-2">
                        Während des Verlegens und in der Erhärtungsphase von Kleber und Fugenmörtel bleibt die Heizung nach Absprache
                        abgesenkt oder ausgeschaltet. Danach wird sie schrittweise wieder hochgefahren – maßgeblich sind die Angaben der
                        Werkstoffhersteller.
                    </p>
                </Abschnitt>

                {/* 3. WER MACHT WAS: Einleitung, Tabelle der Gewerke mit Aufgabe */}
                <Abschnitt
                    titelId="fbh-gewerke-heading"
                    etikett="Schnittstellen"
                    titel="Wer macht was?"
                    einleitung={
                        <p>
                            Eine Fußbodenheizung ist Teamarbeit mehrerer Gewerke. {COMPANY_DATA.legalName} ist Fliesenlegerbetrieb:
                            Heizung, Estrich und Elektroanschluss sind nicht unsere Leistungen – wir stimmen die Übergabe aber so ab, dass
                            der Belag passt.
                        </p>
                    }
                    leitachse
                    spaet
                >
                    <Tabelle
                        name="Wer macht was?"
                        kopf={['Gewerk', 'Aufgabe rund um den Fliesenbelag']}
                        zeilen={ROLES.map((row) => [row.trade, row.task])}
                    />
                </Abschnitt>

                {/* 4. WEITERFÜHRENDE RATGEBER: vier Verweise als Merkliste */}
                <Abschnitt titelId="fbh-ratgeber-heading" titel="Weiterführende Ratgeber zu Fliesen & Fußbodenheizung" leitachse spaet>
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
                </Abschnitt>

                {/* 5. KONFIGURATOR: Funnel (nachgeladen) im Raster mit 8 Spalten, rechts die Rückfrage in 4 Spalten (ab lg); Anker #konfigurator bleibt */}
                <Abschnitt id="konfigurator" aria-label="Fliesen-Konfigurator" leitachse spaet>
                    <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-12">
                        <div className="min-w-0 lg:col-span-8">
                            <FliesenKonfigurator floorHeating />
                        </div>
                        <div className="lg:col-span-4">
                            <Rueckfrage />
                        </div>
                    </div>
                </Abschnitt>
            </Leitachse>

            {/* 6. ABSCHLUSS: Belegreife und Anfrage; danach QualityPromise (Bestand: Reihenfolge wie im Bestand) */}
            <QualityPromise />

            <Abschnitt
                titelId="fbh-cta-heading"
                etikett="Belegreife prüfen, sauber verlegen"
                titel="Fliesen für Ihren Heizestrich planen"
                einleitung={
                    <p>
                        Beim kostenfreien Vor-Ort-Aufmaß prüfen wir Estrich, Fugenplan und Aufheizprotokoll und klären die Abstimmung
                        mit den anderen Gewerken.
                    </p>
                }
                spaet
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
        </>
    );
}
