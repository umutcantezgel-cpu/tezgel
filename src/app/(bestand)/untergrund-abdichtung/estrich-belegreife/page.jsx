// Estrich-Belegreife (E5-BAU-02, KERN v2): Erzählansicht nach dem Muster der Familie Untergrund
// (/leistungen/[id], /fliesen/auf-fussbodenheizung). Einstieg mit Laserachse, H1 links, Vorspann und zwei Knöpfe; rechts das
// Planblatt mit dem Plan „untergrund“ (interaktiv, ohne Achse). Danach die Leitachse über die Abschnitte: Estricharten mit
// Richtwerten als Tabelle, Messverfahren im Feldraster, Heizestrich, weitere Prüfungen, Schrittfolge bei zu feuchtem Estrich,
// FAQ, Anfrage-Knöpfe und Ratgeber als Merkliste. Wortlaut, Überschriften, Links, IDs und Lesefolge wie im Bestand.
// Kein großer Moment, kein Auftritt, keine Icon-Kacheln (eine Icon-Familie). Metadaten unverändert.
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
import Schrittfolge from '@/components/kern/Schrittfolge';
import Tabelle from '@/components/kern/Tabelle';
import Verlegeplan from '@/components/kern/Verlegeplan';
import { linkKlassen } from '@/components/kern/stile';
import SeitenDaten from '@/components/seo/SeitenDaten';

export const metadata = createMetadata({
    title: 'Estrich auf Belegreife prüfen vor dem Fliesen | Tezgel',
    description:
        'Estrich-Belegreife zuverlässig prüfen: CM-Messung, Richtwerte je Estrichart & Feuchtigkeitsmessung vor dem Fliesen verlegen. Fachbetrieb Tezgel in Hessen.',
    path: '/untergrund-abdichtung/estrich-belegreife'
});

const SCREED_TYPES = [
    {
        title: 'Zementestrich (CT)',
        points: [
            'Bindet mit Wasser ab und schwindet beim Austrocknen – daher Schein- und Bewegungsfugen.',
            'Kann sich an den Rändern aufwölben („schüsseln“), solange er ungleichmäßig trocknet.',
            'Nach dem Erhärten unempfindlich gegen Feuchte, deshalb auch in Nassräumen üblich.',
            'Trocknet vergleichsweise langsam; die zulässige Restfeuchte ist höher als bei Calciumsulfat.'
        ]
    },
    {
        title: 'Calciumsulfatestrich (CA / CAF)',
        points: [
            'Schwindet kaum, dadurch große Felder ohne Scheinfugen möglich; oft als Fließestrich eingebaut.',
            'Feuchteempfindlich: Durchfeuchtung mindert die Festigkeit, im Nassbereich ist eine Abdichtung zwingend.',
            'Bildet an der Oberfläche eine Sinterschicht, die vor dem Belegen abgeschliffen und abgesaugt wird.',
            'Verlangt eine deutlich niedrigere Restfeuchte und eine passende Grundierung.'
        ]
    }
];

const RICHTWERTE = [
    ['Zementestrich (CT)', '≤ 2,0 CM-%', '≤ 2,0 CM-%'],
    ['Calciumsulfatestrich (CA / CAF)', '≤ 0,5 CM-%', '≤ 0,3 CM-%']
];

const METHODS = [
    {
        title: 'CM-Methode',
        how: 'Eine Probe wird aus dem Estrichquerschnitt entnommen, zerkleinert, gewogen und in einer Druckflasche mit Calciumcarbid geschüttelt. Der entstehende Gasdruck ergibt den Feuchtegehalt in CM-%.',
        pro: 'Direkt auf der Baustelle, in Deutschland das etablierte Verfahren; die gängigen Richtwerte beziehen sich darauf.',
        contra: 'Zerstörend (kleine Entnahmestelle), das Ergebnis hängt stark von fachgerechter Probenahme und Einwaage ab.'
    },
    {
        title: 'Darr-Methode',
        how: 'Die Probe wird gewogen, in einem Trockenofen bei festgelegter Temperatur bis zur Massekonstanz getrocknet und erneut gewogen. Der Gewichtsverlust ergibt den Feuchtegehalt.',
        pro: 'Sehr genaues, gravimetrisches Referenzverfahren, etwa zur Klärung strittiger Fälle.',
        contra: 'Laborverfahren mit Zeitverzug; die Werte sind nicht direkt mit CM-Richtwerten vergleichbar.'
    },
    {
        title: 'KRL-Messung',
        how: 'Gemessen wird die korrespondierende relative Luftfeuchte: ein Sensor ermittelt im Bohrloch oder unter einer Messhaube die Luftfeuchte, die sich im Gleichgewicht mit dem Estrich einstellt.',
        pro: 'Wenig oder nicht zerstörend, international verbreitet, gut für Verlaufsmessungen.',
        contra: 'Braucht Zeit bis zum Feuchtegleichgewicht und ist temperaturabhängig; eigene Bewertungsmaßstäbe statt CM-Werte.'
    }
];

const HEATED_CHECKS = [
    'Aufheizprotokoll mit Datum, Vorlauftemperaturen und Dauer',
    'Markierte Messstellen für die CM-Probe',
    'Angabe der Estrichart und ggf. verwendeter Zusatzmittel',
    'Bewegungs- und Randfugen, abgestimmt auf die Heizkreise'
];

const FURTHER_CHECKS = [
    { title: 'Oberflächenfestigkeit', desc: 'Gitterritzprüfung und Klopfprobe zeigen, ob die Oberfläche fest genug für Kleber und Belag ist oder ob sie absandet.' },
    { title: 'Sinterschicht und Verunreinigungen', desc: 'Sinterschichten, Zementschlämme, Farbe oder Gips werden entfernt, damit Grundierung und Kleber haften.' },
    { title: 'Risse und Fugen', desc: 'Risse werden bewertet und ruhende Risse ggf. verharzt. Bewegungsfugen des Estrichs müssen im Fliesenbelag an gleicher Stelle übernommen werden.' },
    { title: 'Randdämmstreifen und Ebenheit', desc: 'Der Estrich darf keinen starren Kontakt zu Wänden haben; die Ebenheit wird nach DIN 18202 gemessen.' }
];

const STEPS = [
    { t: 'Ursache klären', d: 'Liegt es an der Jahreszeit, an zu seltenem Lüften, an zu früh geschlossenen Räumen oder an einem Feuchteeintrag von außen? Davon hängt ab, was hilft.' },
    { t: 'Trocknung verbessern', d: 'Regelmäßiges Stoßlüften und gleichmäßige Raumtemperatur beschleunigen die Trocknung. Technische Bautrocknung und Belegreifheizen übernehmen Fachfirmen bzw. der Heizungsbauer – gleichmäßig und nicht überstürzt, damit der Estrich keinen Schaden nimmt.' },
    { t: 'Erneut messen', d: 'Erst wenn eine neue CM-Messung den Richtwert einhält, geben wir den Untergrund für die Verlegung frei.' },
    { t: 'Alternativen prüfen', d: 'Einzelne Entkopplungs- oder Abdichtungssysteme erlauben laut Hersteller auf Zementestrich eine frühere Belegung. Das gilt nur im Rahmen der jeweiligen Herstellerangaben und nicht für Calciumsulfatestrich.' }
];

const FAQ = [
    {
        q: 'Gibt es eine Faustregel, wie lange Estrich trocknen muss?',
        a: 'Faustregeln nach Dicke und Wochen sind nur grobe Anhaltspunkte. Raumklima, Estrichart, Zusätze, Einbaudicke und Luftaustausch verändern die Trocknungszeit erheblich. Verlässlich ist nur die Messung.'
    },
    {
        q: 'Reicht ein elektronisches Feuchtemessgerät?',
        a: 'Elektronische Geräte eignen sich, um Unterschiede auf der Fläche zu finden und geeignete Messstellen zu wählen. Als Nachweis der Belegreife ersetzen sie die CM-Messung nicht.'
    },
    {
        q: 'Heizen Sie den Estrich auf?',
        a: 'Nein. Estricheinbau sowie Funktions- und Belegreifheizen gehören nicht zu unseren Leistungen, sondern zum Estrichleger bzw. Heizungsbauer. Wir prüfen das Aufheizprotokoll und messen vor Verlegebeginn die Restfeuchte.'
    }
];

const READ_MORE = [
    { label: 'Leistung: Untergrund & DIN 18534 Abdichtung', href: '/leistungen/untergrund' },
    { label: 'Fliesen auf Fußbodenheizung', href: '/fliesen/auf-fussbodenheizung' },
    { label: 'Fliesen im Wohnbereich', href: '/leistungen/wohnen' },
    { label: 'Fliesen im Neubau', href: '/fliesen/neubau' }
];

export default function EstrichBelegreifePage() {
    return (
        <>
            <SeitenDaten
                pfad="/untergrund-abdichtung/estrich-belegreife"
                titel="Estrich auf Belegreife prüfen vor dem Fliesen | Tezgel"
                beschreibung="Estrich-Belegreife zuverlässig prüfen: CM-Messung, Richtwerte je Estrichart & Feuchtigkeitsmessung vor dem Fliesen verlegen. Fachbetrieb Tezgel in Hessen."
                brotkrumen={[{ name: 'Start', href: '/' }, { name: 'Untergrund und Abdichtung', href: '/untergrund-abdichtung' }, { name: 'Estrich prüfen: Belegreife und Restfeuchte vor dem Fliesen' }]}
            />
            {/* 1. EINSTIEG: Etikett, H1 an der Laserachse, Vorspann, zwei Knöpfe; rechts das Planblatt mit dem Plan „untergrund“ */}
            <section aria-labelledby="estrich-heading">
                <Einstieg
                    art="erzaehl"
                    etikett={<>Estrich &middot; Restfeuchte &middot; CM-Messung</>}
                    titel={
                        <span id="estrich-heading">
                            Estrich prüfen:{' '}
                            <span>Belegreife und Restfeuchte</span> vor dem Fliesen
                        </span>
                    }
                    vorspann={
                        <p>
                            Der Bauzeitenplan drängt, der Estrich sieht trocken aus – und trotzdem kann er noch zu viel Wasser enthalten.
                            Bevor wir fliesen, messen wir die Restfeuchte. Hier erfahren Sie, wie das funktioniert und warum es sich lohnt,
                            auf das Ergebnis zu warten.
                        </p>
                    }
                    aktionen={
                        <>
                            <Knopf href="/kontakt" icon="pfeil-rechts">
                                Messtermin anfragen
                            </Knopf>
                            <Knopf href="/fliesen/auf-fussbodenheizung" variante="neben">
                                Fliesen auf Fußbodenheizung
                            </Knopf>
                        </>
                    }
                    rand={
                        <Planblatt felder={planfelder('Estrich-Belegreife & CM-Messung vor dem Fliesen', 'untergrund')}>
                            <Verlegeplan plan="untergrund" ohneAchse bemassung={false} interaktiv />
                        </Planblatt>
                    }
                />
            </section>

            <Leitachse>
                {/* 2. WARUM: Fläche Fliese, zwei Absätze zur Restfeuchte als Voraussetzung */}
                <Abschnitt
                    titelId="warum-heading"
                    flaeche="fliese"
                    leitachse
                    spaet
                    etikett="Belegreife ist Voraussetzung"
                    titel="Warum Restfeuchte über die Haltbarkeit entscheidet"
                >
                    <div className="flex max-w-mass flex-col gap-4 font-text text-fs-3 text-tinte-2">
                        <p>
                            Fliese und Kleber bremsen die Austrocknung nach oben stark. Ein zu feuchter Zementestrich schwindet unter
                            dem Belag weiter – die Spannungen führen zu Rissen, Hohlstellen und abgerissenen Randfugen. Ein zu
                            feuchter Calciumsulfatestrich verliert an der Oberfläche Festigkeit, der Kleber findet keinen Halt mehr.
                        </p>
                        <p>
                            Belegreife ist deshalb keine Formalie, sondern die Voraussetzung für einen dauerhaften Belag. Die
                            Restfeuchtemessung vor Beginn der Verlegung gehört bei uns zur Untergrundprüfung dazu.
                        </p>
                    </div>
                </Abschnitt>

                {/* 3. ESTRICHARTEN: zwei Arten im Feldraster mit Punkten als Fugenliste; darunter die Richtwerte als Tabelle (Name = Überschrift darüber) */}
                <Abschnitt
                    titelId="estricharten-heading"
                    leitachse
                    spaet
                    etikett="Estricharten"
                    titel="Zementestrich oder Calciumsulfatestrich: die Unterschiede"
                >
                    <Feldraster spalten={2}>
                        {SCREED_TYPES.map((type) => (
                            <Feld key={type.title}>
                                <h3 className="font-anzeige text-fs-4 text-tinte">{type.title}</h3>
                                <ul className="mt-6 grid gap-3">
                                    {type.points.map((point) => (
                                        <li key={point} className="flex gap-3 font-text text-fs-2 text-tinte">
                                            <span aria-hidden="true" className="flex h-6 shrink-0 items-center text-strich">
                                                <Fugenkreuz className="size-3" />
                                            </span>
                                            <span className="min-w-0">{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </Feld>
                        ))}
                    </Feldraster>

                    <h3 className="mt-16 font-anzeige text-fs-4 text-tinte">Häufig genannte Richtwerte für Fliesen und Platten</h3>
                    <div className="mt-6">
                        <Tabelle
                            name="Häufig genannte CM-Richtwerte für die Belegreife mit Fliesen"
                            kopf={['Estrichart', 'unbeheizt', 'beheizt']}
                            zeilen={RICHTWERTE}
                            ausrichtung={['links', 'rechts', 'rechts']}
                        />
                    </div>
                    <p className="mt-4 flex items-start gap-3 font-text text-fs-2 text-tinte-2">
                        <Icon name="info" groesse={4} className="mt-1 text-tinte" />
                        <span>
                            Orientierungswerte für die Verlegung im Dünnbett, wie sie in Fachmerkblättern und in der Schnittstellenkoordination
                            bei beheizten und unbeheizten Fußbodenkonstruktionen genannt werden. Maßgeblich sind die aktuelle Ausgabe dieser
                            Regelwerke und die Angaben der Estrich- und Kleberhersteller – bei Schnellestrichen oder Estrichen mit Zusatzmitteln
                            gelten häufig eigene Werte.
                        </span>
                    </p>
                </Abschnitt>

                {/* 4. MESSVERFAHREN: Fläche Fliese, drei Verfahren im Feldraster mit Stärke und Grenze */}
                <Abschnitt
                    titelId="methoden-heading"
                    flaeche="fliese"
                    leitachse
                    spaet
                    etikett="Messverfahren"
                    titel="Drei Prüfmethoden im Vergleich: CM, Darr, KRL"
                    einleitung={
                        <p>
                            Alle drei messen Feuchte, aber auf unterschiedliche Weise. Wichtig: Ihre Ergebnisse sind nicht
                            untereinander austauschbar – jeder Wert muss mit den Richtwerten seines eigenen Verfahrens verglichen werden.
                        </p>
                    }
                >
                    <Feldraster spalten={3}>
                        {METHODS.map((m) => (
                            <Feld key={m.title}>
                                <h3 className="font-anzeige text-fs-4 text-tinte">{m.title}</h3>
                                <p className="mt-3 max-w-mass font-text text-fs-2 text-tinte-2">{m.how}</p>
                                <dl className="mt-auto grid gap-4 pt-6">
                                    <div className="border-t border-fuge pt-4">
                                        <dt className="font-mono text-fs-1 text-tinte-2">Stärke</dt>
                                        <dd className="mt-1 font-text text-fs-2 text-tinte">{m.pro}</dd>
                                    </div>
                                    <div className="border-t border-fuge pt-4">
                                        <dt className="font-mono text-fs-1 text-tinte-2">Grenze</dt>
                                        <dd className="mt-1 font-text text-fs-2 text-tinte">{m.contra}</dd>
                                    </div>
                                </dl>
                            </Feld>
                        ))}
                    </Feldraster>
                </Abschnitt>

                {/* 5. HEIZESTRICH: zwei Absätze mit dem Unterschied der beiden Vorgänge, darunter die Prüfliste und der Verweis */}
                <Abschnitt
                    titelId="beheizt-heading"
                    leitachse
                    spaet
                    etikett="Fußbodenheizung"
                    titel="Beheizte Estriche: Funktions- und Belegreifheizen mit Protokoll"
                    einleitung={
                        <>
                            <p className="mt-4 first:mt-0">
                                Bei Heizestrichen werden zwei Vorgänge oft verwechselt. Das{' '}
                                <strong className="font-semibold text-tinte">Funktionsheizen</strong> weist nach, dass die Heizung
                                funktioniert – es trocknet den Estrich nicht automatisch belegreif. Das{' '}
                                <strong className="font-semibold text-tinte">Belegreifheizen</strong> dient gezielt der Trocknung und wird
                                separat vereinbart. Beides wird protokolliert.
                            </p>
                            <p className="mt-4 first:mt-0">
                                Für die CM-Messung sollten Messstellen im Estrich markiert sein, damit beim Entnehmen der Probe keine
                                Heizrohre getroffen werden.
                            </p>
                        </>
                    }
                >
                    <h3 className="font-anzeige text-fs-4 text-tinte">Was wir vor dem Verlegen sehen möchten</h3>
                    <ul className="mt-6 grid max-w-mass gap-3">
                        {HEATED_CHECKS.map((text) => (
                            <li key={text} className="flex gap-3 font-text text-fs-2 text-tinte">
                                <span aria-hidden="true" className="flex h-6 shrink-0 items-center text-strich">
                                    <Fugenkreuz className="size-3" />
                                </span>
                                <span className="min-w-0">{text}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="mt-8 max-w-mass font-text text-fs-2 text-tinte-2">
                        Estricheinbau und Aufheizen übernehmen Estrichleger und Heizungsbauer. Details zu Aufbau, Fugen und
                        Kleberwahl finden Sie unter{' '}
                        <Link href="/fliesen/auf-fussbodenheizung" className={linkKlassen}>
                            Fliesen auf Fußbodenheizung
                        </Link>
                        .
                    </p>
                </Abschnitt>

                {/* 6. WEITERE PRÜFUNGEN: Fläche Fliese, vier Prüfungen im Feldraster (eine Zeile auf dem Desktop), Querverweise darunter */}
                <Abschnitt
                    titelId="pruefungen-heading"
                    flaeche="fliese"
                    leitachse
                    spaet
                    etikett="Mehr als Feuchte"
                    titel="Weitere Prüfungen: Oberflächenfestigkeit, Sinterschicht, Risse"
                >
                    <Feldraster spalten={4}>
                        {FURTHER_CHECKS.map((item) => (
                            <Feld key={item.title}>
                                <p className="font-text text-fs-4 font-semibold text-tinte">{item.title}</p>
                                <p className="mt-3 font-text text-fs-2 text-tinte-2">{item.desc}</p>
                            </Feld>
                        ))}
                    </Feldraster>
                    <p className="mt-8 font-text text-fs-2 text-tinte-2">
                        Mehr zu Rissen und Entkopplung:{' '}
                        <Link href="/untergrund-abdichtung/entkopplung" className={linkKlassen}>
                            Entkopplung &amp; Holzuntergründe
                        </Link>{' '}
                        &middot; zur Ebenheit:{' '}
                        <Link href="/untergrund-abdichtung/ausgleich-gefaelle" className={linkKlassen}>
                            Ausgleich &amp; Gefälle
                        </Link>
                    </p>
                </Abschnitt>

                {/* 7. WENN ES NOCH NICHT PASST: die vier Schritte als Schrittfolge (Nummer für Screenreader verborgen, wie im Bestand) */}
                <Abschnitt
                    titelId="zufeucht-heading"
                    leitachse
                    spaet
                    etikett="Wenn es noch nicht passt"
                    titel="Was tun, wenn der Estrich noch zu feucht ist?"
                >
                    <Schrittfolge titelEbene="div" nummerStumm schritte={STEPS.map((s) => ({ titel: s.t, text: s.d }))} />
                </Abschnitt>

                {/* 8. FAQ: Fläche Fliese, Fragen mit Aufklappen */}
                <Abschnitt flaeche="fliese" titelId="faq-heading" leitachse spaet titel="Häufige Fragen zur Belegreife">
                    <div>
                        {FAQ.map((item) => (
                            <FAQAccordion key={item.q} question={item.q} answer={item.a} />
                        ))}
                    </div>
                </Abschnitt>

                {/* 9. ABSCHLUSS DER SEITE: Termin, Telefon und WhatsApp aus COMPANY_DATA */}
                <Abschnitt
                    titelId="cta-heading"
                    leitachse
                    spaet
                    titel="Estrich liegt, Fliesen sind ausgesucht?"
                    einleitung={
                        <p>
                            Beim Vor-Ort-Termin prüft {COMPANY_DATA.owner.fullName} den Untergrund und misst die Restfeuchte. So wissen Sie,
                            ob verlegt werden kann – oder wie lange es voraussichtlich noch dauert.
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

                {/* 10. WEITERFÜHRENDE RATGEBER: Fläche Fliese, vier Verweise als Merkliste (Abschluss vor QualityPromise) */}
                <Abschnitt
                    titelId="ratgeber-heading"
                    flaeche="fliese"
                    leitachse
                    spaet
                    titel="Weiterführende Ratgeber zur Estrich-Belegreife & CM-Messung"
                >
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
