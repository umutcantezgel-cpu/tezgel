// Schadensanalyse (S-19 nach E5-BAU-11, KERN v2): Seitenkörper der Themenseite als Erzählansicht nach dem Muster der
// Familienreferenz (leistungen/[id], fliesen) und der Schwesterseiten /treppen und /balkon-terrasse. Einstieg mit
// Laserachse, H1 links, Vorspann, zwei Knöpfe und – als Merkmale in der Textspalte – das bisherige Band
// „Leistungsmerkmale“ (Region bleibt); rechts das Planblatt „Fliesenschäden analysieren“ mit dem Plan „reparatur“
// (interaktiv, die rote Achse trägt das Blatt). Danach die Leitachse über die Abschnitte, Flächen im Wechsel Kalk/Fliese:
// 2. Schadensbilder als Feldraster 3 × 2 (Kalk) · 3. Ablauf als Schrittfolge (Fliese) · 4. Prüfung vor Ort als Merkliste im
// Halbverband (Kalk) · 5. Schwerpunkte: drei Listen an der Fuge nebeneinander (Fliese) · 6. Lösungen als Feldraster, je Feld
// ein Link (Kalk) · 7. Andere Fachleute, Kopf seitlich, Liste an der Fuge (Fliese) · 8. Fragen als Aufklapper (Kalk) ·
// 9. Ratgeber als Register (Fliese) · 10. Abschluss mit drei Wegen (Kalk). Kein Auftritt, kein großer Moment.
// Wortlaut, Überschriften, Links, IDs und Lesefolge wie im Bestand; Metadaten, Daten und JSON-LD unverändert.
// Serverkomponente; `spaet` auf den Abschnitten unter dem ersten Bildschirm (keine Sprungziele, keine Formulare) außer
// „Schwerpunkte“: Zwischen dem Link im Abschnitt „Schadensbilder“ und dem ersten Link der Lösungen liegen drei Abschnitte
// ohne Bedienelement; mit `spaet` auf allen dreien landete der Tastaturfokus beim ersten Tab (m375) unter dem Bildrand,
// weil der Platzhalter direkt über dem Ziel erst nach dem Sprung seine echte Höhe bekam (a11y-zusatz, fokus_verdeckt).
import Link from 'next/link';
import clsx from 'clsx';
import { COMPANY_DATA } from '@/config/company';
import { buildGraph, buildServiceNode, buildFaqNode, buildBreadcrumbNode, buildWebPageNode, SITE_URL } from '@/lib/schema';
import JsonLd from '@/components/seo/JsonLd';
import Icon from '@/components/icons/Icon';
import WhatsAppLogo from '@/components/ui/WhatsAppLogo';
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

const PAGE_PATH = '/schadensanalyse';
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

const HIGHLIGHTS = [
    { title: 'Kostenfrei', desc: 'Teil des Vor-Ort-Aufmaßes' },
    { title: 'Festpreisangebot', desc: 'für die vorgeschlagene Lösung' },
    { title: 'Staubschutz', desc: 'bei der späteren Ausführung' }
];

const DAMAGE_PATTERNS = [
    { title: 'Gerissene Fliesen', desc: 'Einzelne Sprünge nach einem Stoß oder durchlaufende Risse über mehrere Fliesen – letztere deuten fast immer auf Bewegungen im Untergrund oder fehlende Bewegungsfugen hin.' },
    { title: 'Hohlstellen und lose Fliesen', desc: 'Hohl klingende Fliesen haben keinen vollflächigen Verbund. Unter Last oder bei Temperaturwechsel brechen Kanten, später lösen sich ganze Fliesen.' },
    { title: 'Bröselnde oder dunkle Fugen', desc: 'Ausgewaschene Zementfugen, dauerhaft dunkle oder feuchte Fugen und abgelöste Silikonfugen sind Einfallstore für Wasser.' },
    { title: 'Ausblühungen und Verfärbungen', desc: 'Weiße Kalkschleier oder Ränder zeigen, dass Wasser durch Fugen, Mörtelbett oder Untergrund wandert – typisch auf Balkonen, Terrassen und Außentreppen.' },
    { title: 'Feuchte Wände neben der Dusche', desc: 'Abplatzender Putz, Flecken oder muffiger Geruch in angrenzenden Räumen können auf eine undichte Abdichtung oder undichte Anschlüsse hinweisen.' },
    { title: 'Abgeplatzte Kanten', desc: 'Beschädigte Stufen- und Außenkanten, oft an Treppen oder an Übergängen ohne Profil, wo die Fliesenkante ungeschützt belastet wird.' }
];

const STEPS = [
    { title: 'Bestandsaufnahme', desc: 'Wir sehen uns das Schadensbild an, fragen nach Alter des Belags, früheren Reparaturen und wann der Schaden aufgefallen ist.' },
    { title: 'Ursachenanalyse', desc: 'Klopfprobe, Rissverlauf, Fugen, Anschlüsse und Untergrund werden geprüft; bei Bedarf messen wir die Restfeuchte.' },
    { title: 'Sanierungsvorschlag', desc: 'Sie erfahren, was die Ursache ist, welche Lösung sinnvoll ist – und wo eine Reparatur an ihre Grenzen kommt. Danach erhalten Sie ein Festpreisangebot.' },
    { title: 'Umsetzung', desc: 'Reparatur, Fugenerneuerung oder Neuverlegung durch unseren HWK-Fachbetrieb – mit Staubschutz und sauber abgegrenztem Arbeitsbereich.' }
];

const CHECKS = [
    { title: 'Klopfprobe', desc: 'Mit einem Prüfhammer oder Metallstab abgeklopft, verraten hohle Fliesen sich durch ihren Klang. So lässt sich die Fläche der Hohlstellen eingrenzen.' },
    { title: 'Restfeuchte', desc: 'Wo es auf die Feuchte im Untergrund ankommt, etwa bei Estrich vor einer Neuverlegung, messen wir die Restfeuchte und vergleichen sie mit den Richtwerten aus Merkblättern und Herstellerangaben.' },
    { title: 'Untergrund und Risse', desc: 'Verlauf und Breite von Rissen, Lage von Bewegungs- und Randfugen, Ebenheit und Gefälle geben Hinweise darauf, ob der Schaden aus dem Untergrund kommt.' },
    { title: 'Abdichtung und Anschlüsse', desc: 'Im Nassbereich prüfen wir Silikonfugen, Übergänge an Wanne, Duschtasse und Durchdringungen. Ob unter den Fliesen eine intakte Verbundabdichtung liegt, lässt sich oft erst nach dem Öffnen einer Stelle sicher sagen.' }
];

const TOPICS = [
    {
        title: 'Fliesen & Fugen',
        items: ['Einzelne gesprungene oder lose Fliesen', 'Hohlstellen in Boden und Wand', 'Ausgewaschene Zementfugen', 'Gerissene oder verfärbte Silikonfugen']
    },
    {
        title: 'Feuchte & Abdichtung',
        items: ['Feuchte Fugen im Duschbereich', 'Feuchteflecken an angrenzenden Wänden', 'Anschlüsse an Wanne, Duschtasse und Ablauf', 'Abdichtung nach DIN 18534 bei Erneuerung']
    },
    {
        title: 'Balkon & Außenbereich',
        items: ['Frostabplatzungen und lose Platten', 'Ausblühungen an Belag und Stirnseite', 'Stehendes Wasser durch fehlendes Gefälle', 'Schäden an Außentreppen und Eingangspodesten']
    }
];

const OPTIONS = [
    { title: 'Reparieren', desc: 'Sinnvoll, wenn der Schaden örtlich begrenzt ist und die Ursache feststeht – etwa eine Fliese nach einem Stoß oder eine lose Sockelfliese.', link: { href: '/fliesenreparatur', label: 'Zur Fliesenreparatur' } },
    { title: 'Fugen erneuern', desc: 'Sinnvoll, wenn Fliesen fest sitzen, Zement- oder Silikonfugen aber ausgewaschen, rissig oder verfärbt sind.', link: { href: '/fliesen/fugensanierung', label: 'Zur Fugensanierung' } },
    { title: 'Neu verlegen', desc: 'Nötig, wenn Hohlstellen großflächig sind, der Untergrund sich bewegt oder die Abdichtung darunter versagt hat. Dann wird der Aufbau von Grund auf erneuert.', link: { href: '/bad/badsanierung', label: 'Zur Komplettbadsanierung' } }
];

const OTHER_EXPERTS = [
    'Undichte Leitungen, Abläufe oder Armaturen: Installateur bzw. ein Fachbetrieb für Leckortung – danach übernehmen wir Fliesen und Abdichtung.',
    'Durchfeuchtete Wände oder Estriche: Trocknung durch einen Fachbetrieb für Bautrocknung, bevor neu belegt wird.',
    'Großflächiger Schimmelbefall: Fachbetrieb für Schimmelsanierung. Hinweise zur Vorbeugung finden Sie in unserem Ratgeber.',
    'Risse im Tragwerk oder Setzungen: Tragwerksplaner bzw. Statiker.',
    'Streitfälle, Gewährleistungs- oder Versicherungsfragen: ein öffentlich bestellter und vereidigter Sachverständiger. Wir erstellen keine Gutachten.'
];

const schadensFaqs = [
    {
        question: 'Was kostet die Schadensanalyse?',
        answer: 'Die Begutachtung von Schäden ist Teil unseres kostenfreien Vor-Ort-Aufmaßes. Sie erhalten danach eine Einschätzung der Ursache und – wenn Sie möchten – ein Festpreisangebot für die Lösung.'
    },
    {
        question: 'Erstellen Sie ein Gutachten für Versicherung oder Gericht?',
        answer: 'Nein. Wir sind ein eingetragener HWK-Fachbetrieb für Fliesen-, Platten- und Mosaikarbeiten, keine Sachverständigen. Wir beurteilen den Schaden aus handwerklicher Sicht und schlagen eine Lösung vor. Für Gutachten wenden Sie sich an einen öffentlich bestellten und vereidigten Sachverständigen.'
    },
    {
        question: 'Finden Sie auch ein Leck in der Wasserleitung?',
        answer: 'Die Ortung verdeckter Leitungsschäden übernehmen Installateure oder spezialisierte Leckortungsfirmen. Sobald die Ursache behoben und der Untergrund trocken ist, erneuern wir Fliesen und Abdichtung.'
    },
    {
        question: 'Muss bei einem Schaden immer die ganze Fläche erneuert werden?',
        answer: 'Nein. Ist der Schaden örtlich begrenzt und die Ursache geklärt, genügt oft eine Reparatur oder die Erneuerung der Fugen. Eine Neuverlegung empfehlen wir erst, wenn Untergrund, Verbund oder Abdichtung großflächig geschädigt sind.'
    },
    {
        question: 'Wie kann ich den Termin vorbereiten?',
        answer: 'Hilfreich sind Fotos vom Schaden, Angaben zum Alter des Belags, eventuell vorhandene Restfliesen und Informationen zu früheren Reparaturen. Fotos können Sie vorab per WhatsApp senden.'
    }
];

const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Schadensanalyse', path: PAGE_PATH }
];

const schadensGraph = buildGraph([
    buildWebPageNode({
        url: PAGE_URL,
        name: 'Fliesenschäden analysieren bei Rissen & Feuchte | Tezgel',
        description:
            'Gerissene Fliesen, Hohlstellen oder feuchte Fugen? Kostenfreie Schadensanalyse vor Ort in Wetzlar & Aßlar. Fliesenleger-Fachbetrieb Tezgel berät Sie!',
        breadcrumbItems: breadcrumbs
    }),
    buildBreadcrumbNode(breadcrumbs, PAGE_URL),
    buildServiceNode({
        name: 'Schadensanalyse Fliesen & Abdichtung',
        serviceType: 'Begutachtung von Fliesenschäden vor Ort',
        description:
            'Bestandsaufnahme, Klopfprobe, Restfeuchtemessung und Prüfung von Untergrund, Fugen und Anschlüssen mit anschließendem Sanierungsvorschlag.',
        url: PAGE_URL,
        offers: [
            { name: 'Bestandsaufnahme', description: 'Schadensbild und Vorgeschichte aufnehmen' },
            { name: 'Ursachenanalyse', description: 'Klopfprobe, Restfeuchte, Untergrund und Anschlüsse prüfen' },
            { name: 'Sanierungsvorschlag', description: 'Reparatur, Fugenerneuerung oder Neuverlegung' }
        ]
    }),
    buildFaqNode(schadensFaqs, PAGE_URL)
]);

const WEITERLESEN = [
    { title: 'Undichte Dusche erkennen', path: '/blog/undichte-dusche-warnzeichen', desc: 'Warnzeichen für Feuchte hinter Fliesen' },
    { title: 'Schimmel in Fugen vermeiden', path: '/blog/schimmel-fliesenfugen-vermeiden', desc: 'Lüften, Pflege und Silikonfugen' },
    { title: 'Untergrund & Abdichtung', path: '/leistungen/untergrund', desc: 'Tragfähig, eben, trocken, dicht' },
    { title: 'Außenbereiche', path: '/leistungen/aussen', desc: 'Balkon, Terrasse und Eingang' }
];

// Zeile des Registers (Ratgeber auf Fliese): die ganze Zeile ist der Link; Überfahren färbt die Fläche auf Kalk
const ZEILE = 'group flex min-h-12 items-center gap-4 px-3 py-4 pointer-fine:hover:bg-kalk active:bg-kalk';
// Name in der Zeile: Unterstrich beim Überfahren
const NAME =
    'font-text text-fs-3 font-semibold text-tinte md:w-1/3 md:shrink-0 decoration-1 underline-offset-4 decoration-tinte pointer-fine:group-hover:underline group-active:underline';

// Liste an der Fuge: Fugenkreuz als Marke, Text in Textschrift
function FugenListe({ eintraege, className }) {
    return (
        <ul className={clsx('border-t border-fuge', className)}>
            {eintraege.map((item) => (
                <li key={item} className="flex gap-3 border-b border-fuge py-4 font-text text-fs-2 text-tinte">
                    <span aria-hidden="true" className="flex h-6 shrink-0 items-center text-strich">
                        <Fugenkreuz className="size-3" />
                    </span>
                    <span className="min-w-0">{item}</span>
                </li>
            ))}
        </ul>
    );
}

export default function SchadensanalysePage() {
    return (
        <>
            <JsonLd schema={schadensGraph} />

            {/* 1. EINSTIEG: Kennzeile, H1 an der Laserachse, Vorspann, zwei Knöpfe, darunter die Leistungsmerkmale (bisher ein
                eigenes Band direkt unter dem Einstieg, Region bleibt); rechts das Planblatt mit dem Plan „reparatur“ */}
            <section aria-labelledby="schadensanalyse-heading">
                <Einstieg
                    art="erzaehl"
                    etikett={<>Service &middot; Ursachen vor Ort klären</>}
                    titel={
                        <span id="schadensanalyse-heading">
                            Schadensanalyse für{' '}
                            <span>Fliesen, Fugen und Abdichtung</span>
                        </span>
                    }
                    vorspann={
                        <p>
                            Fliesenschäden analysieren bei Rissen, Hohlstellen und Feuchte: Die fachgerechte Schadensanalyse für Fliesen, Fugen und Abdichtung von Fachbetrieb Tezgel. Eine gesprungene Fliese lässt sich tauschen – doch wenn die Ursache im Untergrund oder in der Abdichtung liegt, kehrt der Schaden zurück. Deshalb klärt Deniz Tezgel beim kostenfreien Vor-Ort-Termin die Schadensursache und schlägt die passende Sanierungslösung vor.
                        </p>
                    }
                    aktionen={
                        <>
                            <Knopf href="/kontakt" icon="pfeil-rechts">
                                Vor-Ort-Termin anfragen
                            </Knopf>
                            <Knopf
                                href={COMPANY_DATA.contact.whatsappLink}
                                extern
                                variante="neben"
                                vorne={<WhatsAppLogo className="size-5 shrink-0" />}
                            >
                                Fotos per WhatsApp senden
                            </Knopf>
                        </>
                    }
                    merkmale={
                        // Leistungsmerkmale an der Fuge: je Merkmal Fugenkreuz, Name und Zusatz; ab sm drei Spalten
                        <section aria-label="Leistungsmerkmale">
                            <ul className="grid gap-6 border-t border-fuge pt-6 sm:grid-cols-3 sm:gap-8">
                                {HIGHLIGHTS.map((item) => (
                                    <li key={item.title} className="flex gap-3 font-text text-fs-2">
                                        <span aria-hidden="true" className="flex h-6 shrink-0 items-center text-strich">
                                            <Fugenkreuz className="size-3" />
                                        </span>
                                        <span className="min-w-0">
                                            <span className="block font-semibold text-tinte">{item.title}</span>
                                            <span className="block text-tinte-2">{item.desc}</span>
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    }
                    rand={
                        <Planblatt felder={planfelder('Fliesenschäden analysieren', 'reparatur')}>
                            <Verlegeplan plan="reparatur" ohneAchse bemassung={false} interaktiv />
                        </Planblatt>
                    }
                />
            </section>

            {/* LEITACHSE: das Lot setzt die Achse des Einstiegs über die Abschnitte fort */}
            <Leitachse>
                {/* 2. SCHADENSBILDER als Feldraster: sechs Felder, drei bzw. zwei Spalten ohne Restzelle */}
                <Abschnitt
                    titelId="schadensbilder-heading"
                    leitachse
                    spaet
                    etikett="Schadensbilder"
                    titel="Typische Schäden an Fliesen und Fugen"
                    einleitung={
                        <p>
                            Welche Anzeichen im Bad auf Feuchtigkeit hinter den Fliesen hindeuten, beschreibt unser Beitrag{' '}
                            <Link href="/blog/undichte-dusche-warnzeichen" className={linkKlassen}>
                                Undichte Dusche: Warnzeichen
                            </Link>
                            . Hier geht es darum, was hinter dem jeweiligen Schadensbild stecken kann.
                        </p>
                    }
                >
                    <Feldraster spalten={3}>
                        {DAMAGE_PATTERNS.map((item) => (
                            <Feld key={item.title}>
                                <h3 className="font-anzeige text-fs-4 text-tinte">{item.title}</h3>
                                <p className="mt-3 max-w-mass font-text text-fs-2 text-tinte-2">{item.desc}</p>
                            </Feld>
                        ))}
                    </Feldraster>
                </Abschnitt>

                {/* 3. ABLAUF auf Fliese: vier Schritte als Schrittfolge (ab lg waagrecht); Titel wie im Bestand keine Überschriften,
                    die Nummer bleibt sichtbar und für Screenreader stumm */}
                <Abschnitt
                    titelId="ablauf-heading"
                    leitachse
                    spaet
                    flaeche="fliese"
                    etikett="Ablauf"
                    titel="In 4 Schritten von der Ursache zur Lösung"
                >
                    <Schrittfolge
                        ausrichtung="waagrecht"
                        titelEbene="div"
                        nummerStumm
                        schritte={STEPS.map((step) => ({ titel: step.title, text: step.desc }))}
                    />
                </Abschnitt>

                {/* 4. PRÜFUNG VOR ORT: vier Prüfungen als Merkliste im Halbverband (Zeilen an der Fuge, ab md versetzt) */}
                <Abschnitt
                    titelId="pruefung-heading"
                    leitachse
                    spaet
                    etikett="Prüfung vor Ort"
                    titel="Was vor Ort geprüft wird"
                >
                    <Merkliste spalten={2} verband eintraege={CHECKS.map((item) => ({ titel: item.title, text: item.desc }))} />
                </Abschnitt>

                {/* 5. SCHWERPUNKTE auf Fliese: drei Bereiche nebeneinander (ab md), je Bereich Überschrift und Liste an der Fuge;
                    ohne `spaet`, damit der Fokussprung auf den ersten Lösungs-Link im Bild landet (Kopfkommentar) */}
                <Abschnitt
                    titelId="themen-heading"
                    leitachse
                    flaeche="fliese"
                    etikett="Schwerpunkte"
                    titel="Wo wir Schäden begutachten"
                >
                    <div className="grid gap-y-12 md:grid-cols-3 md:gap-x-8 lg:gap-x-12">
                        {TOPICS.map((topic) => (
                            <div key={topic.title} className="border-t border-tinte pt-6">
                                <h3 className="font-anzeige text-fs-4 text-tinte">{topic.title}</h3>
                                <FugenListe eintraege={topic.items} className="mt-6" />
                            </div>
                        ))}
                    </div>
                </Abschnitt>

                {/* 6. DIE PASSENDE LÖSUNG als Feldraster: je Weg ein Feld mit einem Link unten; das dritte Feld überspannt in md
                    die freie Breite (keine Restzelle) */}
                <Abschnitt
                    titelId="loesung-heading"
                    leitachse
                    spaet
                    etikett="Die passende Lösung"
                    titel="Reparieren, Fugen erneuern oder neu verlegen?"
                >
                    <Feldraster spalten={3}>
                        {OPTIONS.map((option, i) => {
                            const letzter = i === OPTIONS.length - 1;
                            return (
                                <Feld key={option.title} spanne={letzter ? 2 : undefined} className={letzter ? 'lg:col-span-1' : undefined}>
                                    <p className="font-anzeige text-fs-4 text-tinte">{option.title}</p>
                                    <p className="mt-3 max-w-mass font-text text-fs-2 text-tinte-2">{option.desc}</p>
                                    <div className="mt-auto pt-6">
                                        <Knopf href={option.link.href} variante="text" icon="pfeil-rechts">
                                            {option.link.label}
                                        </Knopf>
                                    </div>
                                </Feld>
                            );
                        })}
                    </Feldraster>
                </Abschnitt>

                {/* 7. ANDERE FACHLEUTE auf Fliese: Kopf seitlich mit Einleitung, rechts die Ansprechpartner als Liste an der Fuge
                    und der Verweis zur Vorbeugung */}
                <Abschnitt
                    titelId="fachleute-heading"
                    leitachse
                    spaet
                    flaeche="fliese"
                    kopf="seitlich"
                    titel="Wann andere Fachleute gefragt sind"
                    einleitung={
                        <p>
                            Wir sagen offen, wenn eine Ursache außerhalb unseres Handwerks liegt, und nennen Ihnen den richtigen
                            Ansprechpartner:
                        </p>
                    }
                >
                    <FugenListe eintraege={OTHER_EXPERTS} className="max-w-mass" />
                    <p className="mt-8 max-w-mass font-text text-fs-2 text-tinte-2">
                        Tipps zur Vorbeugung:{' '}
                        <Link href="/blog/schimmel-fliesenfugen-vermeiden" className={linkKlassen}>
                            Schimmel in Fliesenfugen vermeiden
                        </Link>
                    </p>
                </Abschnitt>

                {/* 8. FRAGEN: je Frage ein Aufklapper an der Fuge; die Antwort öffnet sich beim Klick (ohne JavaScript bedienbar) */}
                <Abschnitt titelId="faq-heading" leitachse spaet etikett="FAQ" titel="Häufige Fragen zur Schadensanalyse">
                    <div className="border-t border-tinte">
                        {schadensFaqs.map((faq) => (
                            <details key={faq.question} className="group border-b border-fuge">
                                <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-6 py-4 font-text text-fs-3 font-semibold text-tinte [&::-webkit-details-marker]:hidden">
                                    <span className="min-w-0">{faq.question}</span>
                                    <span className="flex shrink-0 items-center text-tinte" aria-hidden="true">
                                        <span className="group-open:hidden">
                                            <Icon name="plus" groesse={6} />
                                        </span>
                                        <span className="hidden group-open:block">
                                            <Icon name="minus" groesse={6} />
                                        </span>
                                    </span>
                                </summary>
                                <p className="max-w-mass pb-6 font-text text-fs-2 text-tinte-2">{faq.answer}</p>
                            </details>
                        ))}
                    </div>
                </Abschnitt>

                {/* 9. RATGEBER auf Fliese: Register, je Zeile Titel, Beschreibung und Pfeil; die ganze Zeile ist der Link. Kopf
                    gestapelt, weil „Ursachenermittlung“ in der schmalen Kopfspalte nicht ohne Bruch steht */}
                <Abschnitt
                    titelId="schaden-ratgeber-heading"
                    leitachse
                    spaet
                    flaeche="fliese"
                    titel="Weiterführende Ratgeber zur Schadensanalyse & Ursachenermittlung"
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

                {/* 10. ABSCHLUSS: Überschrift, Einleitung mit Öffnungszeiten aus COMPANY_DATA und drei Wege als Knöpfe */}
                <Abschnitt
                    titelId="schaden-cta-heading"
                    leitachse
                    spaet
                    titel="Schaden entdeckt? Lassen Sie die Ursache klären."
                    einleitung={
                        <p>
                            Vereinbaren Sie einen Vor-Ort-Termin – {COMPANY_DATA.hours.formattedWeekdays},{' '}
                            {COMPANY_DATA.hours.formattedSaturday}. Die Schadensanalyse ist Teil des kostenfreien Aufmaßes.
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
                        <Knopf href="/beratung" variante="neben">
                            Beratung
                        </Knopf>
                    </div>
                </Abschnitt>
            </Leitachse>
        </>
    );
}
