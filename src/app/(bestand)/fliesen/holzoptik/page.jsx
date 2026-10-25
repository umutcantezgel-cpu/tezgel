// Holzoptik (E4-BAU-08, KERN v2): Seitenkörper der Produktseite nach dem Muster des Fliesen-Ratgebers (E3-BAU-06) und der
// Leistungsseiten. Einstieg mit Achse, H1 links, Vorspann und zwei Knöpfe; rechts der Verlegeplan „wohnen“ im Planblatt
// (ohne Bemaßung, interaktiv). Danach die Leitachse über die Abschnitte: Eigenschaften als Feldraster, Material und Format
// als Feldraster auf Fliese, Pflege als Tabelle, Ratgeber als Merkliste, Konfigurator mit Rückfrage. Der Konfigurator wird
// nachgeladen (Tempo). Wortlaut, Überschriften, Links, IDs und Lesefolge wie im Bestand. Kein großer Moment und keine neue
// Bewegung.
import Link from 'next/link';
import dynamic from 'next/dynamic';
import FormularPlatzhalter from '@/components/funnels/TezgelAnfrageFunnel/Platzhalter';
import { COMPANY_DATA } from '@/config/company';
import { createMetadata } from '@/lib/metadata';
import SeitenDaten from '@/components/seo/SeitenDaten';
import QualityPromise from '@/components/sections/QualityPromise';
import Abschnitt from '@/components/kern/Abschnitt';
import Einstieg from '@/components/kern/Einstieg';
import Leitachse from '@/components/kern/Leitachse';
import Merkliste from '@/components/kern/Merkliste';
import Knopf from '@/components/kern/Knopf';
import Rueckfrage from '@/components/kern/Rueckfrage';
import Tabelle from '@/components/kern/Tabelle';
import Verlegeplan from '@/components/kern/Verlegeplan';
import Planblatt, { planfelder } from '@/components/kern/Planblatt';
import { Feld, Feldraster } from '@/components/kern/Feldraster';
import WhatsAppLogo from '@/components/ui/WhatsAppLogo';
import { linkKlassen } from '@/components/kern/stile';

// Konfigurator nachladen (Tempo, wie auf der Startseite und den Fliesen-Seiten); ID #konfigurator liegt am Abschnitt
const FliesenKonfigurator = dynamic(() => import('@/components/funnels/FliesenKonfigurator'), {
    loading: () => <FormularPlatzhalter />,
});

export const metadata = createMetadata({
    title: 'Fliesen in Holzoptik verlegen | Fliesenleger Tezgel',
    description:
        'Holzoptik-Fliesen aus Feinsteinzeug verlegen lassen: warme Holzoptik, feuchteresistent & ideal für Fußbodenheizung. Fachbetrieb Tezgel – Jetzt anfragen!',
    path: '/fliesen/holzoptik'
});

const ADVANTAGES = [
    {
        title: 'Unempfindlich gegen Wasser',
        desc: 'Feinsteinzeug nimmt kaum Wasser auf. Holzoptik-Dielen können deshalb auch in Küche, Flur oder Bad liegen, wo Echtholz bei Nässe quellen würde.'
    },
    {
        title: 'Kratz- und abriebfest',
        desc: 'Stuhlbeine, Straßenschuhe und Haustierkrallen hinterlassen auf einer keramischen Oberfläche deutlich weniger Spuren als auf Parkett oder Dielen.'
    },
    {
        title: 'Geeignet für Fußbodenheizung',
        desc: 'Keramik leitet Wärme gut und arbeitet bei Temperaturwechseln nicht wie Holz. Voraussetzung sind ein belegreifer Estrich und ein verformbarer Kleber.'
    },
    {
        title: 'Auch draußen möglich',
        desc: 'In frostbeständiger Qualität lässt sich der Dielenlook bis auf Balkon oder Terrasse fortsetzen – mit der passenden Verlegeart für den jeweiligen Aufbau.'
    },
    {
        title: 'Pflegeleicht',
        desc: 'Kein Schleifen, Ölen oder Versiegeln: Feucht wischen genügt im Alltag. Gepflegt werden vor allem die Fugen.'
    }
];

const PFLEGE = [
    ['Tägliche Reinigung', 'Feucht wischen mit mildem Reiniger', 'Nebelfeucht wischen, stehendes Wasser vermeiden'],
    ['Oberflächenschutz', 'Kein Ölen oder Versiegeln der Fliese nötig', 'Regelmäßiges Ölen bzw. Auffrischen der Versiegelung'],
    ['Abnutzung', 'Keramische Oberfläche, sehr abriebfest', 'Kann abgeschliffen und neu behandelt werden'],
    ['Schwachstelle', 'Fugen: gelegentlich gründlich reinigen', 'Kratzer, Druckstellen, Feuchtigkeit']
];

const WEITERLESEN = [
    { label: 'Verlegemuster: Verband, Fischgrät & Co.', href: '/fliesen/verlegemuster' },
    { label: 'Leistung: Balkon, Terrasse & Außenbereiche', href: '/leistungen/aussen' },
    { label: 'Fliesen richtig reinigen und pflegen', href: '/blog/fliesen-reinigen-pflegen' },
    { label: 'Musterbäder ansehen', href: '/bad/musterbaeder' }
];

export default function HolzoptikPage() {
    return (
        <>
            <SeitenDaten
                pfad="/fliesen/holzoptik"
                titel="Fliesen in Holzoptik verlegen | Fliesenleger Tezgel"
                beschreibung="Holzoptik-Fliesen aus Feinsteinzeug verlegen lassen: warme Holzoptik, feuchteresistent & ideal für Fußbodenheizung. Fachbetrieb Tezgel – Jetzt anfragen!"
                brotkrumen={[
                    { name: 'Start', href: '/' },
                    { name: 'Fliesen und Verlegung', href: '/fliesen' },
                    { name: 'Fliesen in Holzoptik: Dielenlook mit keramischer Robustheit' },
                ]}
            />
            {/* 1. EINSTIEG: Etikett, H1 an der Laserachse, Vorspann, zwei Knöpfe; rechts der Plan „wohnen“ im Planblatt */}
            <section aria-labelledby="holzoptik-heading">
                <Einstieg
                    art="erzaehl"
                    etikett="Material & Gestaltung"
                    titel={
                        <span id="holzoptik-heading">
                            Fliesen in Holzoptik:{' '}
                            <span>Dielenlook mit keramischer Robustheit</span>
                        </span>
                    }
                    vorspann={
                        <p>
                            Fliesen in Holzoptik verbinden eleganten Dielenlook mit keramischer Robustheit: Feinsteinzeug bringt die natürliche Holzmaserung in Wohnraum, Küche, Bad und Flur – unempfindlich gegenüber Feuchtigkeit, kratzfest und ideal für Fußbodenheizungen.
                        </p>
                    }
                    aktionen={
                        <>
                            <Knopf href="/kontakt" icon="pfeil-rechts">Beratung &amp; Aufmaß anfragen</Knopf>
                            <Knopf href="/leistungen/wohnen" variante="neben">Leistung: Wohnbereiche</Knopf>
                        </>
                    }
                    rand={
                        <Planblatt felder={planfelder('Fliesen in Holzoptik verlegen', 'wohnen')}>
                            <Verlegeplan plan="wohnen" ohneAchse bemassung={false} interaktiv />
                        </Planblatt>
                    }
                />
            </section>

            <Leitachse>
                {/* 2. EIGENSCHAFTEN als Feldraster: je Eigenschaft ein Feld; das fünfte Feld füllt die letzte Zeile */}
                <Abschnitt
                    titelId="ho-vorteile-heading"
                    leitachse
                    spaet
                    etikett="Eigenschaften"
                    titel={
                        <>
                            Holzcharakter, <span>keramische Eigenschaften</span>
                        </>
                    }
                >
                    <Feldraster spalten={3}>
                        {ADVANTAGES.map((item, i) => (
                            <Feld
                                key={item.title}
                                className={i === ADVANTAGES.length - 1 ? 'md:col-span-2 lg:col-span-2' : undefined}
                            >
                                <h3 className="font-anzeige text-fs-4 text-tinte">{item.title}</h3>
                                <p className="mt-3 font-text text-fs-2 text-tinte-2">{item.desc}</p>
                            </Feld>
                        ))}
                    </Feldraster>
                </Abschnitt>

                {/* 3. MATERIAL & FORMAT als Feldraster auf Fliese: vier Felder, je Thema Überschrift und Text mit Verweisen */}
                <Abschnitt
                    titelId="ho-material-heading"
                    leitachse
                    spaet
                    flaeche="fliese"
                    etikett="Material & Format"
                    titel="Was eine gute Holzoptik ausmacht"
                >
                    <Feldraster spalten={2}>
                        <Feld>
                            <article aria-labelledby="ho-oberflaeche" className="flex flex-1 flex-col gap-6">
                                <h3 id="ho-oberflaeche" className="font-anzeige text-fs-4 text-tinte">
                                    Oberfläche, Struktur und Farbvariation
                                </h3>
                                <p className="font-text text-fs-2 text-tinte-2">
                                    Die Holzzeichnung wird digital auf das Feinsteinzeug gedruckt; eine fühlbare Struktur aus Maserung
                                    und Astbild macht den Eindruck glaubwürdig. Je mehr unterschiedliche Motive eine Serie hat, desto
                                    seltener wiederholt sich das Bild auf der Fläche. Viele Hersteller geben außerdem an, wie stark die
                                    Farbe von Diele zu Diele variiert – eine lebhafte Variation wirkt natürlicher, verlangt beim
                                    Verlegen aber das Mischen aus mehreren Kartons.
                                </p>
                                <p className="font-text text-fs-2 text-tinte-2">
                                    Für Böden empfehlen sich matte oder leicht strukturierte Oberflächen. Die Rutschhemmung wird nach
                                    DIN EN 16165 ermittelt und als R-Klasse angegeben.{' '}
                                    <Link href="/blog/rutschfeste-fliesen-r-klassen" className={linkKlassen}>
                                        R-Klassen erklärt
                                    </Link>
                                </p>
                            </article>
                        </Feld>
                        <Feld>
                            <article aria-labelledby="ho-formate" className="flex flex-1 flex-col gap-6">
                                <h3 id="ho-formate" className="font-anzeige text-fs-4 text-tinte">Dielenformate und Untergrund</h3>
                                <p className="font-text text-fs-2 text-tinte-2">
                                    Holzoptik gibt es als schmale Riemen bis hin zu langen, breiten Dielen, zum Beispiel 20 × 120 cm.
                                    Lange Formate wirken am natürlichsten, stellen aber höhere Anforderungen: Keramische Dielen sind
                                    herstellungsbedingt nie ganz plan, und auf einem unebenen Untergrund entstehen schnell Überzähne an
                                    den Stirnseiten. Deshalb prüfen wir die Ebenheit vorab, gleichen bei Bedarf aus und verlegen mit
                                    Nivelliersystem.
                                </p>
                                <p className="font-text text-fs-2 text-tinte-2">
                                    Zum Verband: Die meisten Dielen werden im wilden Verband oder mit begrenztem Versatz verlegt, damit
                                    keine Überzähne entstehen. Fischgrät und Chevron sind mit passenden Formaten ebenfalls möglich.
                                    Details dazu, zu Fugenbreite und Fugenfarbe finden Sie unter{' '}
                                    <Link href="/fliesen/verlegemuster" className={linkKlassen}>
                                        Verlegemuster &amp; Abschlüsse
                                    </Link>
                                    .
                                </p>
                            </article>
                        </Feld>
                        <Feld>
                            <article aria-labelledby="ho-fbh" className="flex flex-1 flex-col gap-6">
                                <h3 id="ho-fbh" className="font-anzeige text-fs-4 text-tinte">Holzoptik auf Fußbodenheizung</h3>
                                <p className="font-text text-fs-2 text-tinte-2">
                                    Anders als Parkett quillt oder schwindet eine keramische Diele bei Temperaturwechseln nicht, und sie
                                    gibt Wärme gut an den Raum ab. Wichtig sind ein belegreifer Estrich, ein verformbarer Kleber,
                                    vollflächige Bettung und übernommene Bewegungsfugen.{' '}
                                    <Link href="/fliesen/auf-fussbodenheizung" className={linkKlassen}>
                                        Fliesen auf Fußbodenheizung
                                    </Link>
                                </p>
                            </article>
                        </Feld>
                        <Feld>
                            <article aria-labelledby="ho-aussen" className="flex flex-1 flex-col gap-6">
                                <h3 id="ho-aussen" className="font-anzeige text-fs-4 text-tinte">
                                    Holzoptik draußen: frostbeständig und passend verlegt
                                </h3>
                                <p className="font-text text-fs-2 text-tinte-2">
                                    Im Außenbereich muss das Material frostbeständig sein – bei Feinsteinzeug in der Regel gegeben, aber
                                    immer anhand der Herstellerangabe zu prüfen. Welche Plattenstärke nötig ist, hängt von der
                                    Verlegeart ab: Auf Stelzlagern oder im Splittbett braucht es 2 cm starke Terrassenplatten. Im
                                    Verbund auf einem geeigneten, abgedichteten Untergrund mit Gefälle lässt sich frostbeständiges
                                    Feinsteinzeug in normaler Stärke verlegen.
                                </p>
                                <p className="font-text text-fs-2 text-tinte-2">
                                    Welcher Aufbau zu Ihrem Balkon oder Ihrer Terrasse passt, lesen Sie unter{' '}
                                    <Link href="/balkon-terrasse" className={linkKlassen}>
                                        Balkon &amp; Terrasse
                                    </Link>{' '}
                                    und{' '}
                                    <Link href="/balkon-terrasse/terrassenplatten" className={linkKlassen}>
                                        Terrassenplatten
                                    </Link>
                                    .
                                </p>
                            </article>
                        </Feld>
                    </Feldraster>
                </Abschnitt>

                {/* 4. PFLEGE als Tabelle im Bereich mit Namen; darunter der Verweis auf den Beitrag zur Reinigung */}
                <Abschnitt titelId="ho-pflege-heading" leitachse spaet etikett="Pflege" titel="Pflege im Vergleich zu Echtholz">
                    <Tabelle
                        name="Pflege im Vergleich zu Echtholz"
                        kopf={['Thema', 'Holzoptik-Fliese', 'Echtholz (Parkett, Dielen)']}
                        zeilen={PFLEGE}
                    />
                    <p className="mt-8 max-w-mass font-text text-fs-2 text-tinte-2">
                        Ausführliche Reinigungstipps finden Sie im Beitrag{' '}
                        <Link href="/blog/fliesen-reinigen-pflegen" className={linkKlassen}>
                            Fliesen richtig reinigen und pflegen
                        </Link>
                        .
                    </p>
                </Abschnitt>

                {/* 5. WEITERFÜHRENDE RATGEBER als Merkliste im Zweier-Raster, darunter der Hinweis auf das Bad */}
                <Abschnitt titelId="ho-ratgeber-heading" leitachse spaet titel="Weiterführende Ratgeber zu Holzoptikfliesen">
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
                    <p className="mt-8 font-text text-fs-2 text-tinte-2">
                        Holzoptik im Bad?{' '}
                        <Link href="/bad/fliesen" className={linkKlassen}>
                            Fliesen im Bad
                        </Link>
                    </p>
                </Abschnitt>

                {/* 6. KONFIGURATOR: der Funnel (nachgeladen) im Raster mit 8 Spalten, rechts die Rückfrage in 4 Spalten (ab lg) */}
                <Abschnitt id="konfigurator" aria-label="Fliesen-Konfigurator" leitachse spaet>
                    <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-12">
                        <div className="min-w-0 lg:col-span-8">
                            <FliesenKonfigurator material="holzoptik" />
                        </div>
                        <div className="lg:col-span-4">
                            <Rueckfrage />
                        </div>
                    </div>
                </Abschnitt>
            </Leitachse>

            {/* 7. QUALITÄT und ABSCHLUSS */}
            <QualityPromise />

            <Abschnitt
                titelId="ho-cta-heading"
                flaeche="fliese"
                spaet
                etikett="Kostenfreies Vor-Ort-Aufmaß"
                titel="Dielenlook für Ihren Boden planen"
                einleitung={
                    <p>
                        Wir prüfen Untergrund und Ebenheit, besprechen Format und Verband und erstellen danach ein verbindliches
                        Festpreisangebot.
                    </p>
                }
            >
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <Knopf href="/kontakt">Aufmaß anfragen</Knopf>
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
