// DIN 18534 Verbundabdichtung (E5-BAU-01, KERN v2): Seitenkörper der Unterseite als Erzählansicht nach dem Muster der
// Referenz (leistungen/[id], fliesen). Einstieg mit Laserachse, H1 links, Vorspann und zwei Knöpfe; rechts das Planblatt
// „abdichtung“ ohne Achse, interaktiv. Danach die Leitachse über die Abschnitte: Geltungsbereich mit Halbverband,
// Wassereinwirkungsklassen als Tabelle mit Hinweis, Abdichtungsstoffe als Feldraster, Kritische Punkte als Merkliste,
// Schichtdicken als Schrittfolge, Fragen als Aufklapper, Abschluss mit Knöpfen, Ratgeber als Merkliste. Wortlaut,
// Überschriften, Links, IDs und Lesefolge wie im Bestand. Kein Auftritt und kein großer Moment (setzt der Orchestrator).
// Metadaten und Daten unverändert.
import Link from 'next/link';
import { COMPANY_DATA } from '@/config/company';
import { createMetadata } from '@/lib/metadata';
import Icon from '@/components/icons/Icon';
import QualityPromise from '@/components/sections/QualityPromise';
import WhatsAppLogo from '@/components/ui/WhatsAppLogo';
import Abschnitt from '@/components/kern/Abschnitt';
import Einstieg from '@/components/kern/Einstieg';
import { Feld, Feldraster } from '@/components/kern/Feldraster';
import Hinweis from '@/components/kern/Hinweis';
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
    title: 'DIN 18534 Verbundabdichtung: Bad & Dusche | Tezgel',
    description:
        'DIN 18534 Verbundabdichtung für Bad & Dusche: Wassereinwirkungsklassen W0-I bis W3-I, Dichtbänder & Rohrmanschetten. Normgerecht ausgeführt von Tezgel.',
    path: '/untergrund-abdichtung/din-18534'
});

const NORM_PARTS = [
    { part: 'Teil 1', text: 'Anforderungen, Planungs- und Ausführungsgrundsätze, Wassereinwirkungsklassen' },
    { part: 'Teil 2', text: 'Abdichtung mit bahnenförmigen Abdichtungsstoffen (ohne Fliesenverbund)' },
    { part: 'Teil 3', text: 'Flüssig zu verarbeitende Abdichtungsstoffe im Verbund mit Fliesen und Platten (AIV-F)' },
    { part: 'Teil 4', text: 'Abdichtung mit Gussasphalt oder Asphaltmastix' },
    { part: 'Teil 5', text: 'Bahnenförmige Abdichtungsstoffe im Verbund mit Fliesen und Platten (AIV-B)' },
    { part: 'Teil 6', text: 'Plattenförmige Abdichtungsstoffe im Verbund mit Fliesen und Platten (AIV-P)' }
];

const WATER_CLASSES = [
    {
        cls: 'W0-I',
        level: 'gering',
        definition: 'Flächen mit nicht häufiger Einwirkung aus Spritzwasser',
        examples: 'Wandflächen über Waschbecken in Bädern und über Spülbecken in häuslichen Küchen; Bodenflächen im häuslichen Bereich ohne Ablauf, z. B. in Küchen, Hauswirtschaftsräumen oder Gäste-WCs'
    },
    {
        cls: 'W1-I',
        level: 'mäßig',
        definition: 'Flächen mit häufiger Einwirkung aus Spritzwasser oder nicht häufiger Einwirkung aus Brauchwasser, ohne Intensivierung durch anstauendes Wasser',
        examples: 'Wandflächen über Badewannen und in Duschen in häuslichen Bädern; Bodenflächen im häuslichen Bereich mit Ablauf; Bodenflächen in Bädern mit oder ohne Ablauf, sofern keine hohe Wassereinwirkung aus dem Duschbereich besteht'
    },
    {
        cls: 'W2-I',
        level: 'hoch',
        definition: 'Flächen mit häufiger Einwirkung aus Spritz- und/oder Brauchwasser, vor allem auf dem Boden zeitweise durch anstauendes Wasser intensiviert',
        examples: 'Bodenflächen in Räumen mit bodengleicher Dusche; Wandflächen von Duschen in Sport- und Gewerbestätten'
    },
    {
        cls: 'W3-I',
        level: 'sehr hoch',
        definition: 'Flächen mit sehr häufiger oder lang anhaltender Einwirkung aus Spritz- und/oder Brauchwasser und/oder Wasser aus intensiven Reinigungsverfahren, durch anstauendes Wasser intensiviert',
        examples: 'Vor allem Flächen im Bereich von Schwimmbeckenumgängen sowie Duschanlagen in Sport- und Gewerbestätten und Flächen in gewerblichen Küchen oder Wäschereien'
    }
];

const MATERIALS = [
    {
        title: 'Flüssig verarbeitet (AIV-F)',
        desc: 'Polymerdispersionen, rissüberbrückende mineralische Dichtschlämmen oder Reaktionsharze werden gestrichen, gerollt oder gespachtelt. Sie passen sich jeder Geometrie an und sind im privaten Bad der häufigste Fall.'
    },
    {
        title: 'Bahnen (AIV-B)',
        desc: 'Werkseitig gefertigte Dichtbahnen mit gleichmäßiger Dicke werden im Kleberbett verlegt und an den Stößen überlappend verklebt. Sie eignen sich gut für große, ebene Flächen und enge Zeitpläne.'
    },
    {
        title: 'Platten (AIV-P)',
        desc: 'Abgedichtete Bauplatten dienen zugleich als Wandbekleidung oder Unterkonstruktion, etwa an Vorwänden oder Wannenschürzen. Stöße und Anschlüsse werden mit den zugehörigen Systemkomponenten gedichtet.'
    }
];

const DETAILS = [
    {
        title: 'Dichtband an Wand-Boden-Anschlüssen',
        desc: 'Wo Wand und Boden oder zwei Wände aufeinandertreffen, entstehen Bewegungen. Ein Dichtband mit Dehnzone wird in die erste Abdichtungslage eingebettet und überbrückt diese Fuge, statt sie starr zu überspachteln.'
    },
    {
        title: 'Innen- und Außenecken',
        desc: 'Vorgeformte Ecken aus demselben System schließen die Dichtbänder in den Raumecken lückenlos an. Eingeschnittene oder überlappend gefaltete Bänder sind hier die klassische Schwachstelle.'
    },
    {
        title: 'Dichtmanschetten an Rohrdurchführungen',
        desc: 'Jede Durchdringung – Armaturenanschluss, Wanddurchführung, Unterputz-Körper – erhält eine elastische Manschette, die in die Abdichtung eingebunden wird. So bleibt die Fläche auch an diesen Punkten geschlossen.'
    },
    {
        title: 'Bodenabläufe und Duschrinnen',
        desc: 'Ablauf oder Rinne brauchen einen Anschlussflansch oder eine werkseitige Dichtmanschette, an die die Flächenabdichtung angebunden wird. Einbau und Anschluss ans Abwassernetz übernimmt der Installateur – wir stimmen die Höhen vorher ab.'
    },
    {
        title: 'Schichtdicke und Deckung',
        desc: 'Flüssige Abdichtungen werden in mindestens zwei Arbeitsgängen aufgetragen, bis die vorgeschriebene Mindesttrockenschichtdicke erreicht ist. Sie ist je Stoffgruppe unterschiedlich und in den Produktunterlagen angegeben.'
    }
];

const LAYER_STEPS = [
    'Untergrund vorbereiten: tragfähig, sauber, eben und – je nach Produkt – grundiert. Auf einem ungeeigneten Untergrund haftet auch die beste Abdichtung nicht.',
    'Dichtbänder, Ecken und Manschetten in die erste Lage einbetten, danach die Fläche in mindestens zwei Arbeitsgängen vollflächig und ohne Fehlstellen beschichten.',
    'Die Mindesttrockenschichtdicke hängt von der Stoffgruppe ab und steht in den Produktunterlagen. Kontrolliert wird sie über die Verbrauchsmenge je Quadratmeter und stichprobenartig an der frischen Schicht.',
    'Jede Lage trocknen lassen, bevor die nächste folgt, und erst fliesen, wenn die Abdichtung laut Hersteller belegbar ist. Temperatur und Luftfeuchte im Raum beeinflussen diese Zeiten deutlich.',
    'Vor dem Fliesen alle Anschlüsse sichtprüfen. Wir empfehlen, den fertigen Zustand zu fotografieren, denn nach dem Verlegen ist er nicht mehr einsehbar.'
];

const FAQ = [
    {
        q: 'Reichen gut verfugte Fliesen nicht als Schutz aus?',
        a: 'Nein. Fliesen und Zementfugen sind nicht wasserdicht, und Silikonfugen sind Wartungsfugen, die altern. Die eigentliche Dichtebene liegt bei der Verbundabdichtung unter dem Kleberbett.'
    },
    {
        q: 'Brauche ich auch im Gäste-WC ohne Dusche eine Abdichtung?',
        a: 'Bodenflächen im häuslichen Bereich ohne Ablauf fallen in der Regel in die Klasse W0-I. Ob dort abgedichtet werden muss, hängt vor allem vom Untergrund ab: Feuchteempfindliche Untergründe wie Gipsbauplatten oder Holzwerkstoffe brauchen im Spritzwasserbereich einen Schutz, mineralische Untergründe oft nicht.'
    },
    {
        q: 'Welche Klasse gilt für die bodengleiche Dusche im Einfamilienhaus?',
        a: 'Die Bodenfläche in einem Raum mit bodengleicher Dusche ordnet DIN 18534-1 der Klasse W2-I zu, die Wandflächen der Dusche im häuslichen Bad der Klasse W1-I. Welche Abdichtungsstoffe in welcher Klasse zulässig sind, regeln Norm und Verwendbarkeitsnachweis des Produkts.'
    },
    {
        q: 'Kann man die fertige Abdichtung prüfen?',
        a: 'Vor dem Fliesen lässt sich die Abdichtung noch vollständig einsehen: Deckung, Schichtdicke, eingebettete Bänder und Manschetten. Wir empfehlen, diesen Zustand fotografisch festzuhalten – später ist er unter Fliese und Kleber nicht mehr sichtbar.'
    }
];

const READ_MORE = [
    { label: 'Leistung: Untergrund & DIN 18534 Abdichtung', href: '/leistungen/untergrund' },
    { label: 'Barrierefreies Bad mit bodengleicher Dusche', href: '/bad/barrierefreies-bad' },
    { label: 'Bad aus einer Hand: Gewerke koordiniert', href: '/bad/bad-aus-einer-hand' },
    { label: 'Undichte Dusche: die Warnzeichen', href: '/blog/undichte-dusche-warnzeichen' }
];

export default function Din18534Page() {
    return (
        <>
            <SeitenDaten
                pfad="/untergrund-abdichtung/din-18534"
                titel="DIN 18534 Verbundabdichtung: Bad & Dusche | Tezgel"
                beschreibung="DIN 18534 Verbundabdichtung für Bad & Dusche: Wassereinwirkungsklassen W0-I bis W3-I, Dichtbänder & Rohrmanschetten. Normgerecht ausgeführt von Tezgel."
                brotkrumen={[{ name: 'Start', href: '/' }, { name: 'Untergrund und Abdichtung', href: '/untergrund-abdichtung' }, { name: 'Verbundabdichtung nach DIN 18534: dicht unter der Fliese' }]}
            />
            {/* 1. EINSTIEG: Etikett, H1 an der Laserachse, Vorspann, zwei Knöpfe; rechts das Planblatt „abdichtung“ ohne Achse */}
            <section aria-labelledby="din-heading">
                <Einstieg
                    art="erzaehl"
                    etikett={<>Abdichtung im Verbund &middot; DIN 18534</>}
                    titel={
                        <span id="din-heading">
                            Verbundabdichtung nach DIN 18534:{' '}
                            <span>dicht unter der Fliese</span>
                        </span>
                    }
                    vorspann={
                        <p>
                            Die Fliese sieht man, die Abdichtung darunter nicht – und doch entscheidet sie, ob Dusche, Wanne und Boden auf Dauer
                            trocken bleiben. Wir erklären, wie DIN 18534 Flächen nach ihrer Wasserbelastung einteilt und welche Details in Bad,
                            Dusche, Gäste-WC und Hauswirtschaftsraum wirklich zählen.
                        </p>
                    }
                    aktionen={
                        <>
                            <Knopf href="/kontakt" icon="pfeil-rechts">
                                Abdichtung besprechen
                            </Knopf>
                            <Knopf href="/bad/badsanierung" variante="neben">
                                Details zur Badsanierung
                            </Knopf>
                        </>
                    }
                    rand={
                        <Planblatt felder={planfelder('DIN 18534 Verbundabdichtung', 'abdichtung')}>
                            <Verlegeplan plan="abdichtung" ohneAchse bemassung={false} interaktiv />
                        </Planblatt>
                    }
                />
            </section>

            <Leitachse>
                {/* 2. GELTUNGSBEREICH: Kopf links, Text; rechts die sechs Teile der Norm als Halbverband, darunter der Hinweis zu AIV */}
                <Abschnitt
                    titelId="regelt-heading"
                    leitachse
                    spaet
                    kopf="seitlich"
                    etikett="Geltungsbereich"
                    titel="Was DIN 18534 regelt – und was nicht"
                    einleitung={
                        <>
                            <p>
                                DIN 18534 ist die Norm für die Abdichtung von Innenräumen. Sie legt fest, wie Wand- und Bodenflächen gegen
                                Spritz- und Brauchwasser geschützt werden, und unterscheidet dafür Wassereinwirkungsklassen und
                                Abdichtungsbauarten.
                            </p>
                            <p className="mt-4">
                                Nicht erfasst sind etwa Balkone, Loggien und Terrassen, erdberührte Bauteile und Schwimmbecken selbst – dafür
                                gelten eigene Normen der Reihe DIN 18531 bis DIN 18535.
                            </p>
                        </>
                    }
                >
                    <h3 className="font-anzeige text-fs-4 text-tinte">Die sechs Teile der Norm</h3>
                    <Merkliste
                        verband
                        spalten={2}
                        className="mt-6"
                        eintraege={NORM_PARTS.map((item) => ({
                            titel: <span className="font-mono font-normal">{item.part}</span>,
                            text: item.text
                        }))}
                    />
                    <p className="mt-8 font-text text-fs-2 text-tinte-2">
                        Für Fliesenbeläge sind vor allem die Teile 1, 3, 5 und 6 maßgeblich: die Abdichtung im Verbund, kurz AIV.
                    </p>
                </Abschnitt>

                {/* 3. WASSEREINWIRKUNGSKLASSEN: Tabelle als benannte Region; der Hinweis zur Vereinfachung mit Info-Zeichen */}
                <Abschnitt
                    titelId="klassen-heading"
                    flaeche="fliese"
                    leitachse
                    spaet
                    etikett="DIN 18534-1"
                    titel="Wassereinwirkungsklassen W0-I bis W3-I mit Beispielen"
                    einleitung={
                        <p>
                            Das „I“ steht für Innenraum. Die Klasse wird für jede Fläche einzeln bestimmt – im selben Bad kann die Wand über dem
                            Waschtisch W0-I sein, der Boden mit bodengleicher Dusche W2-I.
                        </p>
                    }
                >
                    <Tabelle
                        name="Wassereinwirkungsklassen nach DIN 18534-1 mit Anwendungsbeispielen"
                        kopf={['Klasse', 'Wassereinwirkung', 'Anwendungsbeispiele']}
                        zeilen={WATER_CLASSES.map((row) => [
                            <>
                                <span className="block font-mono text-fs-2 text-tinte">{row.cls}</span>
                                <span className="mt-1 block font-mono text-fs-1 text-tinte-2">{row.level}</span>
                            </>,
                            row.definition,
                            row.examples
                        ])}
                    />
                    <div className="mt-6">
                        <Hinweis art="merk">
                            Vereinfachte Wiedergabe der Beispiele aus DIN 18534-1, Tabelle 1. Maßgeblich ist die Norm in ihrer geltenden Fassung;
                            die Zuordnung Ihrer Flächen klären wir bei der Planung.
                        </Hinweis>
                    </div>
                </Abschnitt>

                {/* 4. ABDICHTUNGSSTOFFE: drei Bauarten als Feldraster; das dritte Feld überspannt in Md die freie Breite */}
                <Abschnitt
                    titelId="stoffe-heading"
                    leitachse
                    spaet
                    etikett="Abdichtungsstoffe"
                    titel="Flüssige Abdichtung, Bahnen oder Platten?"
                    einleitung={
                        <p>
                            Alle drei Bauarten sind normgerecht, wenn das Produkt für die jeweilige Wassereinwirkungsklasse einen
                            Verwendbarkeitsnachweis hat – je nach Produkt ein allgemeines bauaufsichtliches Prüfzeugnis (abP) oder eine
                            Europäische Technische Bewertung mit CE-Kennzeichnung.
                        </p>
                    }
                >
                    <Feldraster spalten={3}>
                        {MATERIALS.map((item, i) => {
                            const letzter = i === MATERIALS.length - 1;
                            return (
                                <Feld key={item.title} spanne={letzter ? 2 : undefined} className={letzter ? 'lg:col-span-1' : undefined}>
                                    <h3 className="font-anzeige text-fs-4 text-tinte">{item.title}</h3>
                                    <p className="mt-3 font-text text-fs-2 text-tinte-2">{item.desc}</p>
                                </Feld>
                            );
                        })}
                    </Feldraster>
                    <p className="mt-8 max-w-mass font-text text-fs-2 text-tinte-2">
                        Wichtig ist das System: Abdichtung, Dichtbänder, Ecken, Manschetten und Fliesenkleber sollten aufeinander abgestimmt
                        sein und als Kombination vom Hersteller freigegeben werden.
                    </p>
                </Abschnitt>

                {/* 5. KRITISCHE PUNKTE: Kopf links, fünf Punkte als Merkliste mit Fuge, darunter der Hinweis zur Installation */}
                <Abschnitt
                    titelId="details-heading"
                    flaeche="fliese"
                    leitachse
                    spaet
                    kopf="seitlich"
                    etikett="Kritische Punkte"
                    titel="Dichtbänder, Manschetten, Abläufe: wo Abdichtungen versagen"
                    einleitung={
                        <p>
                            Auf der freien Fläche ist eine Abdichtung selten das Problem. Undicht wird es an Übergängen, Durchdringungen und
                            Abläufen – deshalb gehört dort die meiste Sorgfalt hin.
                        </p>
                    }
                >
                    <Merkliste spalten={1} titelAls="h3" eintraege={DETAILS.map((item) => ({ titel: item.title, text: item.desc }))} />
                    <div className="mt-12 border border-l-2 border-strich bg-fliese p-6 font-text text-fs-2 text-tinte">
                        <p>
                            <strong className="font-semibold">Zusammenspiel mit der Installation:</strong> Rohrleitungen, Vorwandelemente und
                            den Ablauf setzt der Sanitärinstallateur. Wir sind als Fliesenleger für die Abdichtung und den Belag zuständig und
                            stimmen Einbauhöhen, Flansche und Manschetten vorher mit ihm ab – bei Bedarf koordiniert im Rahmen von{' '}
                            <Link href="/bad/bad-aus-einer-hand" className={linkKlassen}>
                                Bad aus einer Hand
                            </Link>
                            .
                        </p>
                    </div>
                </Abschnitt>

                {/* 6. VOR DEM FLIESEN: die fünf Arbeitsschritte als Schrittfolge */}
                <Abschnitt titelId="schicht-heading" leitachse spaet etikett="Vor dem Fliesen" titel="Schichtdicken, Trocknung und Dokumentation vor dem Fliesen">
                    <Schrittfolge titelEbene="div" nummerStumm schritte={LAYER_STEPS.map((text) => ({ titel: text }))} />
                </Abschnitt>

                {/* 7. FRAGEN: je Frage ein Aufklapper mit Fuge; die Antwort öffnet sich beim Klick */}
                <Abschnitt titelId="faq-heading" leitachse spaet titel="Häufige Fragen zur Abdichtung">
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

                {/* 8. ABSCHLUSS: Überschrift, Einleitung und drei Wege als Knöpfe */}
                <Abschnitt
                    titelId="cta-heading"
                    flaeche="fliese"
                    leitachse
                    spaet
                    titel="Neues Bad oder neue Dusche geplant?"
                    einleitung={
                        <p>
                            Beim Vor-Ort-Termin ordnen wir Ihre Flächen den Wassereinwirkungsklassen zu und besprechen Abdichtung, Anschlüsse und
                            Ablaufsituation – normgerecht nach DIN 18534.
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

                {/* 9. RATGEBER: vier Verweise als Merkliste mit zwei Spalten */}
                <Abschnitt titelId="ratgeber-heading" leitachse spaet titel="Weiterführende Ratgeber zur DIN 18534 Verbundabdichtung">
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
