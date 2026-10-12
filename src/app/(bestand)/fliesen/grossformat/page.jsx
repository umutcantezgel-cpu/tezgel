// Großformat (E4-BAU-08, KERN v2): Seitenkörper der Produktseite nach dem Muster des Fliesen-Ratgebers (E3-BAU-06) und der
// Leistungsseiten. Einstieg mit Achse, H1 links, Vorspann und zwei Knöpfe; rechts der Verlegeplan „grossformat“ im Planblatt
// (ohne Bemaßung, interaktiv). Danach die Leitachse über die Abschnitte: Vorteile, Formatklassen als Feldraster, Technik,
// Grenzen als Merkliste, Fragen, Ratgeber, Konfigurator mit Rückfrage. Der Konfigurator wird nachgeladen (Tempo). Wortlaut,
// Überschriften, Links, IDs und Lesefolge wie im Bestand. Kein großer Moment und keine neue Bewegung.
import Link from 'next/link';
import dynamic from 'next/dynamic';
import FormularPlatzhalter from '@/components/funnels/TezgelAnfrageFunnel/Platzhalter';
import { COMPANY_DATA } from '@/config/company';
import { createMetadata } from '@/lib/metadata';
import Icon from '@/components/icons/Icon';
import QualityPromise from '@/components/sections/QualityPromise';
import Abschnitt from '@/components/kern/Abschnitt';
import Einstieg from '@/components/kern/Einstieg';
import Leitachse from '@/components/kern/Leitachse';
import Merkliste from '@/components/kern/Merkliste';
import Knopf from '@/components/kern/Knopf';
import Rueckfrage from '@/components/kern/Rueckfrage';
import Verlegeplan from '@/components/kern/Verlegeplan';
import Planblatt, { planfelder } from '@/components/kern/Planblatt';
import { Feld, Feldraster } from '@/components/kern/Feldraster';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import WhatsAppLogo from '@/components/ui/WhatsAppLogo';
import { etikettKlassen, linkKlassen } from '@/components/kern/stile';

// Konfigurator nachladen (Tempo, wie auf der Startseite und den Fliesen-Seiten); ID #konfigurator liegt am Abschnitt
const FliesenKonfigurator = dynamic(() => import('@/components/funnels/FliesenKonfigurator'), {
    loading: () => <FormularPlatzhalter />,
});

export const metadata = createMetadata({
    title: 'Großformatfliesen verlegen lassen | Fliesen Tezgel',
    description:
        'XXL-Großformatfliesen & fugenlose Platten fachgerecht verlegen lassen: perfekte Untergrundvorbereitung & Handling. Fachbetrieb Tezgel in Wetzlar & Aßlar!',
    path: '/fliesen/grossformat'
});

const BENEFITS = [
    {
        title: 'Weniger Fugen',
        desc: 'Große Kantenlängen reduzieren die Zahl der Fugen deutlich. Die Fläche wirkt ruhig und zusammenhängend, und es gibt weniger Fugenmeter, die gereinigt werden müssen.'
    },
    {
        title: 'Großzügige Raumwirkung',
        desc: 'Durchgehende Flächen lassen Räume größer und offener wirken – besonders dort, wo Wohnen, Essen und Kochen ineinander übergehen.'
    },
    {
        title: 'Wand und Boden aus einem Guss',
        desc: 'Großformate eignen sich auch für Wandflächen, etwa als Küchenrückwand oder raumhohe Wandverkleidung mit wenigen, sauber geplanten Stößen.'
    }
];

const FORMAT_CLASSES = [
    {
        name: '60 × 120 cm',
        label: 'Großformat',
        use: 'Wohn- und Essbereiche, Küche, Flur, Wandflächen. Das vielseitigste Großformat, auch in kleineren Räumen gut planbar.',
        substrate: 'Ebener, tragfähiger Untergrund; bei langen Kanten häufig Ebenheit nach erhöhten Anforderungen sinnvoll.',
        handling: 'Mit zwei Personen gut zu tragen; Buttering-Floating und Nivelliersystem sind Standard.'
    },
    {
        name: '120 × 120 cm',
        label: 'Großformat quadratisch',
        use: 'Große, offene Wohnflächen mit wenigen Einbauten und klaren Raumkanten.',
        substrate: 'Hohe Ebenheit auf der gesamten Fläche; Unebenheiten wirken sich auf beide Kantenrichtungen aus.',
        handling: 'Plattengewicht und Fläche verlangen Vakuumheber und eine sorgfältige Bettung ohne Hohlräume.'
    },
    {
        name: 'bis 120 × 278 cm',
        label: 'XXL-Platten',
        use: 'Raumhohe Wandflächen, Küchenrückwände und besonders große Böden mit bewusst gesetzten Stößen.',
        substrate: 'Sehr hohe Ebenheit, oft ein vorheriger Ausgleich; Zuschnitt und Transportweg müssen vorab geplant werden.',
        handling: 'Transport auf Gestellen, Zuschnitt mit Schneidsystem, Verlegung mit Vakuumheber durch ein eingespieltes Team.'
    }
];

const LIMITS = [
    {
        title: 'Raumzuschnitt',
        desc: 'In kleinen, verwinkelten Räumen mit vielen Vorsprüngen entstehen viele Schnitte und schmale Reststreifen. Dann ist ein kleineres Großformat oft die ruhigere Lösung.'
    },
    {
        title: 'Zugänge und Transportweg',
        desc: 'Eine XXL-Platte muss unzerbrochen durch Treppenhaus, Türen und Flure an ihren Platz gelangen. Enge Wendeltreppen oder niedrige Durchgänge schließen manche Formate aus.'
    },
    {
        title: 'Gefälleflächen',
        desc: 'Große, steife Platten lassen sich nicht in mehrere Richtungen gleichzeitig neigen. Auf Flächen mit Gefälle zu einem Punktablauf sind kleinere Formate oder eine Rinne mit Gefälle in eine Richtung die bessere Wahl.'
    },
    {
        title: 'Bewegungsfugen bleiben',
        desc: 'Fugenarm heißt nicht fugenlos: Rand-, Bewegungs- und Anschlussfugen sind auch bei Großformaten nötig und werden in das Fugenbild eingeplant.'
    }
];

const FAQ = [
    {
        q: 'Kann man Großformate auf einen alten Fliesenbelag verlegen?',
        a: 'Das ist möglich, wenn der alte Belag fest haftet, tragfähig und ausreichend eben ist. Oft muss vorher ausgeglichen werden. Ob Überfliesen oder Rückbau sinnvoller ist, klären wir beim Aufmaß vor Ort.'
    },
    {
        q: 'Wie breit ist die Fuge bei Großformaten?',
        a: 'Großformate werden meist rektifiziert geliefert und mit schmalen Fugen von wenigen Millimetern verlegt. Die genaue Breite hängt von Format, Kantenqualität und Herstellerangaben ab – eine Fuge braucht es immer.'
    },
    {
        q: 'Eignen sich Großformate für Fußbodenheizung?',
        a: 'Ja. Keramik leitet Wärme gut. Wichtig sind ein belegreifer Estrich, ein verformbarer Kleber, eine vollflächige Bettung und ein abgestimmter Fugenplan.'
    }
];

const WEITERLESEN = [
    { label: 'Fliesen im Bad: Großformate an Wand und Boden', href: '/bad/fliesen' },
    { label: 'Ausgleich & Gefälle: Ebenheit herstellen', href: '/untergrund-abdichtung/ausgleich-gefaelle' },
    { label: 'Verlegetechnik & Werkstoffe', href: '/fliesen/verlegetechnik' },
    { label: 'Musterbäder ansehen', href: '/bad/musterbaeder' }
];

export default function GrossformatPage() {
    return (
        <>
            {/* 1. EINSTIEG: Etikett, H1 an der Laserachse, Vorspann, zwei Knöpfe; rechts der Plan „grossformat“ im Planblatt */}
            <section aria-labelledby="grossformat-heading">
                <Einstieg
                    art="erzaehl"
                    etikett="Fugenarme Großformatverlegung"
                    titel={
                        <span id="grossformat-heading">
                            Großformatfliesen verlegen:{' '}
                            <span>fugenarm, planeben, präzise</span>
                        </span>
                    }
                    vorspann={
                        <p>
                            Formate ab 60 × 120 cm bis hin zu XXL-Platten verändern die Wirkung eines Raums. Sie verlangen aber
                            einen sehr ebenen Untergrund, eine vollflächige Bettung und sicheres Handling. Hier erfahren Sie, was
                            technisch dahintersteckt und wann Großformate die richtige Wahl sind.
                        </p>
                    }
                    aktionen={
                        <>
                            <Knopf href="/kontakt" icon="pfeil-rechts">Aufmaß anfragen</Knopf>
                            <Knopf href="/leistungen/wohnen" variante="neben">Leistung: Wohnbereiche &amp; Neubau</Knopf>
                        </>
                    }
                    rand={
                        <Planblatt felder={planfelder('Großformatfliesen verlegen lassen', 'grossformat')}>
                            <Verlegeplan plan="grossformat" ohneAchse bemassung={false} interaktiv />
                        </Planblatt>
                    }
                />
            </section>

            <Leitachse>
                {/* 2. VORTEILE als Feldraster: je Vorteil ein Feld; das dritte Feld füllt die Zeile ab md */}
                <Abschnitt
                    titelId="gf-warum-heading"
                    leitachse
                    spaet
                    etikett="Warum Großformat"
                    titel={
                        <>
                            Weniger Fugen, <span>ruhigere Flächen</span>
                        </>
                    }
                >
                    <Feldraster spalten={3}>
                        {BENEFITS.map((item, i) => (
                            <Feld key={item.title} className={i === BENEFITS.length - 1 ? 'md:col-span-2 lg:col-span-1' : undefined}>
                                <h3 className="font-anzeige text-fs-4 text-tinte">{item.title}</h3>
                                <p className="mt-3 font-text text-fs-2 text-tinte-2">{item.desc}</p>
                            </Feld>
                        ))}
                    </Feldraster>
                </Abschnitt>

                {/* 3. FORMATKLASSEN als Feldraster auf Fliese, Kopf seitlich: je Format Etikett, Überschrift und drei Angaben */}
                <Abschnitt
                    titelId="gf-formate-heading"
                    leitachse
                    spaet
                    kopf="seitlich"
                    flaeche="fliese"
                    etikett="Formatklassen im Vergleich"
                    titel="60 × 120, 120 × 120 und bis 120 × 278 cm"
                    einleitung={
                        <p>
                            Mit jeder Formatstufe steigen die Anforderungen an Untergrund, Bettung und Transport. Die Übersicht
                            hilft bei der ersten Einordnung – die Entscheidung fällt nach dem Aufmaß.
                        </p>
                    }
                >
                    <Feldraster spalten={3}>
                        {FORMAT_CLASSES.map((format, i) => (
                            <Feld
                                key={format.name}
                                className={`gap-6${i === FORMAT_CLASSES.length - 1 ? ' md:col-span-2 lg:col-span-1' : ''}`}
                            >
                                <p className={etikettKlassen}>{format.label}</p>
                                <h3 className="font-anzeige text-fs-5 text-tinte tabular-nums">{format.name}</h3>
                                <dl className="grid gap-4">
                                    <div>
                                        <dt className="font-text text-fs-2 font-semibold text-tinte">Einsatzbereich</dt>
                                        <dd className="mt-1 font-text text-fs-2 text-tinte-2">{format.use}</dd>
                                    </div>
                                    <div>
                                        <dt className="font-text text-fs-2 font-semibold text-tinte">Untergrund</dt>
                                        <dd className="mt-1 font-text text-fs-2 text-tinte-2">{format.substrate}</dd>
                                    </div>
                                    <div>
                                        <dt className="font-text text-fs-2 font-semibold text-tinte">Handling</dt>
                                        <dd className="mt-1 font-text text-fs-2 text-tinte-2">{format.handling}</dd>
                                    </div>
                                </dl>
                            </Feld>
                        ))}
                    </Feldraster>
                </Abschnitt>

                {/* 4. TECHNIK als Feldraster: je Thema Überschrift, Text und – wo der Bestand einen hat – ein Link */}
                <Abschnitt
                    titelId="gf-technik-heading"
                    leitachse
                    spaet
                    etikett="Technik"
                    titel={
                        <>
                            Was ein XXL-Belag <span>wirklich braucht</span>
                        </>
                    }
                >
                    <Feldraster spalten={3}>
                        <Feld className="gap-6">
                            <article aria-labelledby="gf-ebenheit" className="flex flex-1 flex-col gap-6">
                                <h3 id="gf-ebenheit" className="font-anzeige text-fs-4 text-tinte">Ebenheit als Voraussetzung</h3>
                                <p className="font-text text-fs-2 text-tinte-2">
                                    Große Platten überbrücken Unebenheiten nicht – sie liegen hohl oder bilden Überzähne. Die
                                    Ebenheitstoleranzen nach DIN 18202 für normale Anforderungen reichen bei großen Kantenlängen oft
                                    nicht aus. Dann wird erhöhte Ebenheit vereinbart oder der Untergrund vorab ausgeglichen.
                                </p>
                                <div className="mt-auto">
                                    <Knopf href="/untergrund-abdichtung/ausgleich-gefaelle" variante="text" icon="pfeil-rechts">
                                        Mehr zu Ausgleich &amp; Gefälle
                                    </Knopf>
                                </div>
                            </article>
                        </Feld>
                        <Feld className="gap-6">
                            <article aria-labelledby="gf-bettung" className="flex flex-1 flex-col gap-6">
                                <h3 id="gf-bettung" className="font-anzeige text-fs-4 text-tinte">Vollflächige Bettung</h3>
                                <p className="font-text text-fs-2 text-tinte-2">
                                    Großformate werden im kombinierten Verfahren verlegt: Kleber auf den Untergrund (Floating) und
                                    zusätzlich auf die Plattenrückseite (Buttering). So entsteht eine möglichst hohlraumarme Bettung,
                                    wie sie die anerkannten Regeln des Fachs – etwa das ZDB-Merkblatt zu großformatigen Fliesen – vorsehen.
                                    Wir verwenden dafür flexible C2-Kleber mit Verformbarkeit S1 bzw. S2.
                                </p>
                                <div className="mt-auto">
                                    <Knopf href="/fliesen/verlegetechnik" variante="text" icon="pfeil-rechts">
                                        Kleberklassen erklärt
                                    </Knopf>
                                </div>
                            </article>
                        </Feld>
                        <Feld className="gap-6 md:col-span-2 lg:col-span-1">
                            <article aria-labelledby="gf-handling" className="flex flex-1 flex-col gap-6">
                                <h3 id="gf-handling" className="font-anzeige text-fs-4 text-tinte">Transport, Zuschnitt, Nivellierung</h3>
                                <p className="font-text text-fs-2 text-tinte-2">
                                    Große Platten werden auf Gestellen bewegt, mit Vakuumhebern angehoben und auf einem Schneidsystem
                                    präzise zugeschnitten. Ein Nivelliersystem hält benachbarte Kanten während des Abbindens auf einer
                                    Höhe – das Ziel ist eine planebene Fläche ohne Überzähne.
                                </p>
                                <p className="flex items-start gap-3 font-text text-fs-2 text-tinte-2">
                                    <Fugenkreuz className="mt-1 size-3 text-strich" />
                                    Ausschnitte für Steckdosen, Rohre oder Türzargen planen wir vor dem ersten Schnitt.
                                </p>
                            </article>
                        </Feld>
                    </Feldraster>
                </Abschnitt>

                {/* 5. GRENZEN als Merkliste im Halbverband-Raster, darunter der Verweis auf das Verlegemuster */}
                <Abschnitt titelId="gf-grenzen-heading" leitachse spaet titel="Grenzen: wann ein kleineres Format besser passt">
                    <Merkliste
                        spalten={2}
                        titelAls="h3"
                        eintraege={LIMITS.map((item) => ({ titel: item.title, text: item.desc }))}
                    />
                    <p className="mt-8 max-w-mass font-text text-fs-2 text-tinte-2">
                        Welches Verlegemuster sich für lange Formate eignet und warum sie meist nur begrenzt versetzt werden,
                        lesen Sie unter{' '}
                        <Link href="/fliesen/verlegemuster" className={linkKlassen}>
                            Verlegemuster &amp; Abschlüsse
                        </Link>
                        .
                    </p>
                </Abschnitt>

                {/* 6. FRAGEN als Fugenliste: jede Frage ein Aufklapper, Antwort darunter */}
                <Abschnitt titelId="gf-faq-heading" leitachse spaet titel="Häufige Fragen zu Großformaten">
                    <div className="border-t border-fuge">
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

                {/* 7. WEITERFÜHRENDE RATGEBER als Merkliste im Zweier-Raster */}
                <Abschnitt titelId="gf-ratgeber-heading" leitachse spaet titel="Weiterführende Ratgeber zu Großformatfliesen & XXL-Fliesen">
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

                {/* 8. KONFIGURATOR: der Funnel (nachgeladen) im Raster mit 8 Spalten, rechts die Rückfrage in 4 Spalten (ab lg) */}
                <Abschnitt id="konfigurator" aria-label="Fliesen-Konfigurator" leitachse spaet>
                    <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-12">
                        <div className="min-w-0 lg:col-span-8">
                            <FliesenKonfigurator format="xxl" />
                        </div>
                        <div className="lg:col-span-4">
                            <Rueckfrage />
                        </div>
                    </div>
                </Abschnitt>
            </Leitachse>

            {/* 9. QUALITÄT und ABSCHLUSS */}
            <QualityPromise />

            <Abschnitt
                titelId="gf-cta-heading"
                flaeche="fliese"
                spaet
                etikett="Kostenfreies Vor-Ort-Aufmaß"
                titel="Passt ein Großformat zu Ihrem Raum?"
                einleitung={
                    <p>
                        {COMPANY_DATA.owner.fullName} prüft Untergrund, Zugänge und Raumzuschnitt vor Ort und empfiehlt das passende
                        Format – danach erhalten Sie ein verbindliches Festpreisangebot.
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
