// Fliesen-Konfigurator (E3-BAU-08, Arbeitsansicht nach dem Muster /kontakt; E4-NACH-13 nach E3-SICHT-ARB Befunde 11–14,
// 17–19): kompakter Einstieg, danach direkt das Werkzeug (8 Spalten, rechts die Ergebnis-Spalte), anschließend Ablauf,
// Berechnung, Treppen, nächste Schritte, FAQ und Ratgeber in ruhigen Abschnitten. Texte, Links und IDs wie im Bestand;
// der Konfigurator selbst (src/components/funnels/FliesenKonfigurator) wird nur eingebunden und nachgeladen.
import dynamic from 'next/dynamic';
import FormularPlatzhalter from '@/components/funnels/TezgelAnfrageFunnel/Platzhalter';
import Link from 'next/link';
import Icon from '@/components/icons/Icon';
import QualityPromise from '@/components/sections/QualityPromise';
import { COMPANY_DATA } from '@/config/company';
import { createMetadata } from '@/lib/metadata';
import Einstieg from '@/components/kern/Einstieg';
import Abschnitt from '@/components/kern/Abschnitt';
import Knopf from '@/components/kern/Knopf';
import { Feld, Feldraster } from '@/components/kern/Feldraster';
import Schrittfolge from '@/components/kern/Schrittfolge';
import Tabelle from '@/components/kern/Tabelle';
import { linkKlassen } from '@/components/kern/stile';

const FliesenKonfigurator = dynamic(() => import('@/components/funnels/FliesenKonfigurator'), {
    loading: () => <FormularPlatzhalter />,
});

export const metadata = createMetadata({
    title: 'Fliesen-Konfigurator & Bedarfsrechner | Tezgel',
    description:
        'Fliesen online konfigurieren: Raum, Untergrund, Format & Fläche wählen und unverbindliche Preisschätzung erhalten. Fliesenverlegung Tezgel in Hessen.',
    path: '/fliesen/konfigurator'
});

const STEP_CARDS = [
    {
        title: 'Schritt 1: Raum und Einsatzbereich',
        text: 'Wohn- und Essbereich, Küche, Flur, Treppe, Balkon/Terrasse oder ein reines Untergrundprojekt – auch mehrere Bereiche gleichzeitig. Für Bäder verweisen wir auf Badplaner und Bad-Projektcheck.'
    },
    {
        title: 'Schritt 2: Untergrund und Bestand',
        text: 'Neuer Estrich, Heizestrich, alte Fliesen, Holz oder Betonplatte? Dazu Fußbodenheizung, Rückbau und Nassbereich. Wer es nicht weiß, wählt „unbekannt“.'
    },
    {
        title: 'Schritt 3: Format, Material, Muster und Menge',
        text: 'Vom Standardformat bis XXL, Holzoptik oder Naturstein, Kreuzfuge bis Fischgrät. Flächen geben Sie in m² an, Treppen über Stufenanzahl und Stufenmaße.'
    },
    {
        title: 'Schritt 4: Kontakt und Versand',
        text: 'Sie sehen eine Zusammenfassung mit Materialbedarf und Vorab-Checkliste und senden sie per WhatsApp oder E-Mail – ohne Speicherung auf dieser Website.'
    }
];

// Verschnitt je Verlegemuster; icon = Verbandszeichen aus der Icon-Familie (dekorativ, neben dem Namen)
const WASTE_ROWS = [
    { pattern: 'Kreuzfuge', icon: 'verband-kreuz', value: 'ca. 5–10 %', note: 'Einfache Schnitte an Wänden und Türen' },
    { pattern: 'Halb- / Drittelverband', icon: 'verband-halb', value: 'ca. 5–10 %', note: 'Reststücke lassen sich oft am Reihenende weiterverwenden' },
    { pattern: 'Wilder Verband', icon: 'verband-wild', value: 'ca. 5–10 %', note: 'Abhängig von Dielenlängen und Raumform' },
    { pattern: 'Diagonal', icon: 'verband-diagonal', value: 'ca. 10–15 %', note: 'Viele Dreiecksschnitte an allen Rändern' },
    { pattern: 'Fischgrät', icon: 'verband-fischgraet', value: 'ca. 10–15 %', note: 'Schräge Randschnitte über die ganze Fläche' }
];

const FAQS = [
    {
        q: 'Wie genau ist der berechnete Materialbedarf?',
        a: 'Es ist ein Richtwert zur Orientierung: Nettofläche plus ein typischer Verschnittzuschlag für das gewählte Verlegemuster. Raumform, Anzahl der Ecken, Türen und Vorsprünge, das Fliesenformat und die Fugenplanung verändern den tatsächlichen Bedarf. Die verbindliche Menge wird beim Vor-Ort-Aufmaß ermittelt.'
    },
    {
        q: 'Warum nennt der Konfigurator keinen Preis?',
        a: 'Der Aufwand hängt vor allem vom Untergrund, vom Format und von den Details wie Sockeln, Kanten oder Abdichtung ab. Das lässt sich seriös erst vor Ort beurteilen. Deshalb erhalten Sie nach dem kostenfreien Aufmaß eine verbindliche Festpreis-Kalkulation statt einer Schätzung aus dem Internet.'
    },
    {
        q: 'Wie zähle ich Setzstufen und Trittstufen richtig?',
        a: 'Zählen Sie die Steigungen, also die Höhensprünge von unten nach oben. Eine Treppe mit n Steigungen hat n Setzstufen und in der Regel n − 1 Trittstufen, weil der oberste Auftritt meist schon der Boden des oberen Geschosses ist. Die Auftrittstiefe messen Sie einschließlich Überstand der Stufenvorderkante.'
    },
    {
        q: 'Was ist mit Blockstufen?',
        a: 'Blockstufen sind keine Belagsart, sondern eine eigene Bauweise: massive Stufen, meist aus Naturstein oder Betonwerkstein, die vor allem außen auf Fundament bzw. Mörtelbett versetzt werden. Sie werden stückweise nach Maß geplant, deshalb zeigt der Konfigurator dafür keine Quadratmeter an.'
    },
    {
        q: 'Werden meine Daten gespeichert?',
        a: 'Nein, nicht auf dieser Website. Der Konfigurator öffnet lediglich WhatsApp oder Ihr E-Mail-Programm mit einer vorbereiteten Nachricht. Erst wenn Sie diese dort absenden, erreicht uns Ihre Anfrage.'
    },
    {
        q: 'Ich plane ein Bad – kann ich den Konfigurator trotzdem nutzen?',
        a: 'Für Bad, Dusche und Gäste-WC sind der Badplaner und der Bad-Projektcheck die passenderen Werkzeuge. Ist das Bad Teil eines größeren Projekts, können Sie es im Konfigurator zusätzlich angeben.'
    }
];

const NEXT_STEPS = [
    {
        title: 'Anfrage absenden',
        text: 'Sie schicken die vorbereitete Zusammenfassung per WhatsApp oder E-Mail ab – gern mit Fotos vom Raum, vom Untergrund oder von der Treppe.'
    },
    {
        title: 'Kostenfreies Vor-Ort-Aufmaß',
        text: `${COMPANY_DATA.owner.fullName} sieht sich die Flächen persönlich an, misst auf und prüft Untergrund, Ebenheit und Anschlüsse.`
    },
    {
        title: 'Verbindliches Festpreisangebot',
        text: 'Auf Basis des Aufmaßes erhalten Sie eine verbindliche Festpreis-Kalkulation mit den tatsächlich benötigten Mengen.'
    }
];

const RELATED_LINKS = [
    { href: '/bad/badplaner', title: 'Badplaner', desc: <>Bad, Dusche und <span className="whitespace-nowrap">Gäste-WC</span> planen</> },
    { href: '/bad/projekt-check', title: 'Bad-Projektcheck', desc: 'Ihr Badprojekt strukturiert beschreiben' },
    { href: '/fliesen/verlegemuster', title: 'Verlegemuster & Abschlüsse', desc: 'Fugenbild, Verband, Kanten und Sockel' },
    { href: '/beratung', title: 'Beratung', desc: 'Persönlich klären, was zu Ihrem Projekt passt' }
];

export default function FliesenKonfiguratorPage() {
    return (
        <>
            {/* 1. Einstieg: kompakter Kopf (H1 text-fs-6), Aktionen und der Hinweis auf die Badseiten */}
            <Einstieg
                art="arbeit"
                etikett="Fliesen-Konfigurator"
                titel={
                    <>
                        Fliesen-Konfigurator &amp; Bedarfsrechner von <span>Tezgel</span>
                    </>
                }
                vorspann={
                    <p className="text-fs-3">
                        Mit dem Fliesen-Konfigurator und Bedarfsrechner von Fachbetrieb Tezgel berechnen Sie Materialbedarf und Verschnitt für Raum, Untergrund und Format vorab – unverbindlich und kostenfrei.
                    </p>
                }
                aktionen={
                    <>
                        <Knopf href="#konfigurator" icon="pfeil-rechts">Konfigurator starten</Knopf>
                        <Knopf href="/kontakt" variante="neben">Direkt Aufmaß anfragen</Knopf>
                    </>
                }
                rand={
                    <div className="mt-auto">
                        <p className="max-w-mass text-fs-2 text-tinte-2">
                            Sie planen ein Bad?{' '}
                            <Link href="/bad/badplaner" className={linkKlassen}>
                                Zum Badplaner
                            </Link>{' '}
                            oder zum{' '}
                            <Link href="/bad/projekt-check" className={linkKlassen}>
                                Bad-Projektcheck
                            </Link>
                            .
                        </p>
                    </div>
                }
            />

            {/* 2. Werkzeug direkt unter dem Kopf: Fortschritt und Formular links (8 Spalten), Bedarfsanzeige und Verlegeplan rechts (ab lg auf Höhe des Werkzeugs) */}
            <Abschnitt art="arbeit" id="konfigurator" aria-label="Fliesen-Konfigurator">
                <FliesenKonfigurator ergebnisSpalte />
            </Abschnitt>

            {/* 3. Ablauf in vier Schritten als Feldraster an der Fuge (nach dem Werkzeug) */}
            <Abschnitt
                art="arbeit"
                titelId="ablauf-heading"
                etikett="So funktioniert es"
                titel="Vier Schritte bis zur strukturierten Anfrage"
                spaet
                einleitung={
                    <p>
                        Der Konfigurator ist für Fliesenprojekte außerhalb der Badsanierung gedacht: Wohnräume, Küche, Flur, Treppen,
                        Balkon und Terrasse sowie Untergrundarbeiten.
                    </p>
                }
            >
                <Feldraster spalten={4} als="ol">
                    {STEP_CARDS.map((card) => (
                        <Feld key={card.title} als="li">
                            <h3 className="font-text text-fs-4 font-semibold text-tinte">{card.title}</h3>
                            <p className="mt-3 max-w-mass font-text text-fs-2 text-tinte-2">{card.text}</p>
                        </Feld>
                    ))}
                </Feldraster>
            </Abschnitt>

            {/* 4. Berechnung: Erläuterung links, Verschnitt-Richtwerte rechts (Tabelle ab sm, sonst Zeilenblöcke) */}
            <Abschnitt
                art="arbeit"
                titelId="rechnung-heading"
                kopf="seitlich"
                etikett="Berechnung"
                titel="So rechnet der Konfigurator: Fläche, Muster, Verschnitt"
                spaet
                einleitung={
                    <div className="space-y-4">
                        <p>
                            Grundlage ist die Nettofläche, die Sie in m² angeben. Darauf schlägt der Konfigurator einen typischen
                            Verschnitt für das gewählte Verlegemuster auf und zeigt das Ergebnis als Spanne. Sockel in laufenden Metern
                            werden getrennt ausgewiesen.
                        </p>
                        <p>
                            Die Werte sind Richtwerte zur Orientierung. Kleine oder verwinkelte Räume, große Formate und aufwendige
                            Fugenbilder können mehr Verschnitt erzeugen. Die tatsächlich benötigte Menge legen wir beim kostenfreien
                            Vor-Ort-Aufmaß fest.
                        </p>
                    </div>
                }
            >
                <div className="hidden sm:block">
                    <Tabelle
                        name="Verschnitt-Richtwerte je Verlegemuster"
                        kopf={[<>Verlegemuster</>, <>Verschnitt (Richtwert)</>, <>Warum</>]}
                        zeilen={WASTE_ROWS.map((row) => [
                            <span key="muster" className="inline-flex items-center gap-2">
                                <Icon name={row.icon} groesse={6} />
                                {row.pattern}
                            </span>,
                            row.value,
                            row.note
                        ])}
                        ausrichtung={['links', 'rechts', 'links']}
                    />
                </div>
                {/* mobil: Name wie die Beschriftung der Tabelle (caption, nur für Screenreader) – gleiche Textfolge in beiden Breiten */}
                <p id="verschnitt-liste-name" className="sr-only sm:hidden">Verschnitt-Richtwerte je Verlegemuster</p>
                <ul aria-labelledby="verschnitt-liste-name" className="border border-fuge bg-fliese sm:hidden">
                    {WASTE_ROWS.map((row) => (
                        <li key={row.pattern} className="border-b border-fuge p-4 last:border-b-0">
                            <div className="flex items-center justify-between gap-4">
                                <span className="flex min-w-0 items-center gap-2 font-text text-fs-2 font-semibold text-tinte">
                                    <Icon name={row.icon} groesse={6} />
                                    {row.pattern}
                                </span>
                                <span className="shrink-0 whitespace-nowrap font-mono text-fs-2 tabular-nums text-tinte">{row.value}</span>
                            </div>
                            <p className="mt-2 font-text text-fs-2 text-tinte-2">{row.note}</p>
                        </li>
                    ))}
                </ul>
            </Abschnitt>

            {/* 5. Treppen: die drei Regeln als Liste an der Fuge, je Regel ein Absatz mit fettem Einstieg */}
            <Abschnitt art="arbeit" titelId="treppen-heading" etikett="Treppen" titel="Bei Treppen nur die Nettofläche" spaet>
                <ul className="border-t border-fuge">
                    <li className="border-b border-fuge py-6">
                        <p className="max-w-mass font-text text-fs-3 text-tinte">
                            <strong className="font-semibold">Zählweise:</strong> Eine Treppe mit n Steigungen hat n Setzstufen und in der Regel n − 1 Trittstufen. Die Trittstufenfläche ergibt sich aus Laufbreite × Auftrittstiefe inklusive Überstand, die Setzstufenfläche aus Laufbreite × Steigungshöhe.
                        </p>
                    </li>
                    <li className="border-b border-fuge py-6">
                        <p className="max-w-mass font-text text-fs-3 text-tinte">
                            <strong className="font-semibold">Ohne Verschnittzuschlag:</strong> Bei Stufen hängt der Verschnitt stark vom Format und vom Stufenmaß ab. Ein pauschaler Prozentsatz wäre irreführend, deshalb zeigt der Konfigurator nur die Nettofläche.
                        </p>
                    </li>
                    <li className="border-b border-fuge py-6">
                        <p className="max-w-mass font-text text-fs-3 text-tinte">
                            <strong className="font-semibold">Keine Menge</strong> gibt es bei gewendelten Treppen, bei Blockstufen (eine massive Bauart, kein Belag) und bei unvollständigen Maßen. Treppensockel und Kantenausbildung werden beim Aufmaß festgelegt. Mehr dazu unter{' '}
                            <Link href="/treppen" className={linkKlassen}>
                                Treppen neu belegen
                            </Link>
                            .
                        </p>
                    </li>
                </ul>
            </Abschnitt>

            {/* 6. Nächste Schritte: Aufmaß und Festpreisangebot als Schrittfolge */}
            <Abschnitt
                art="arbeit"
                titelId="weiter-heading"
                etikett="Nach der Anfrage"
                titel="Wie es weitergeht: Aufmaß und Festpreisangebot"
                spaet
            >
                <Schrittfolge
                    ausrichtung="waagrecht"
                    schritte={NEXT_STEPS.map((item) => ({ titel: item.title, text: item.text }))}
                />
            </Abschnitt>

            {/* 7. FAQ: native Aufklapper (ohne Skript), Fuge statt Kasten; Plus geschlossen, Minus offen */}
            <Abschnitt art="arbeit" titelId="faq-heading" etikett="FAQ" titel="Häufige Fragen zum Konfigurator" spaet>
                <div className="border-t border-fuge">
                    {FAQS.map((faq) => (
                        <details key={faq.q} className="group border-b border-fuge">
                            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 py-4 font-text text-fs-3 font-semibold text-tinte hover:text-tinte-2 [&::-webkit-details-marker]:hidden">
                                <span className="min-w-0">{faq.q}</span>
                                <span className="flex shrink-0 items-center text-tinte" aria-hidden="true">
                                    <span className="group-open:hidden">
                                        <Icon name="plus" groesse={6} />
                                    </span>
                                    <span className="hidden group-open:block">
                                        <Icon name="minus" groesse={6} />
                                    </span>
                                </span>
                            </summary>
                            <p className="max-w-mass pb-6 font-text text-fs-2 text-tinte-2">{faq.a}</p>
                        </details>
                    ))}
                </div>
            </Abschnitt>

            {/* 8. Weiterführende Ratgeber als Feldraster mit Links (Titel wie im Bestand, Mono-Etikett „Ratgeber“), danach der direkte Kontaktweg */}
            <Abschnitt
                art="arbeit"
                titelId="ratgeber-heading"
                etikett="Ratgeber"
                titel="Weiterführende Ratgeber zur Fliesenplanung"
                spaet
            >
                <Feldraster spalten={4} als="ul">
                    {RELATED_LINKS.map((link) => (
                        <Feld key={link.href} als="li" className="relative">
                            <Link href={link.href} className={`${linkKlassen} font-anzeige text-fs-4 font-semibold after:absolute after:inset-0`}>
                                {link.title}
                            </Link>
                            <span className="mt-2 block font-text text-fs-2 text-tinte-2">{link.desc}</span>
                        </Feld>
                    ))}
                </Feldraster>
                <p className="mt-8 font-text text-fs-2 text-tinte-2">
                    Lieber direkt sprechen?{' '}
                    <Link href="/kontakt" className={linkKlassen}>
                        Zur Kontaktseite
                    </Link>{' '}
                    oder telefonisch unter{' '}
                    <a href={`tel:${COMPANY_DATA.contact.phoneLink}`} className={`${linkKlassen} font-mono`}>
                        {COMPANY_DATA.contact.phone}
                    </a>
                    .
                </p>
            </Abschnitt>

            <QualityPromise art="arbeit" />
        </>
    );
}
