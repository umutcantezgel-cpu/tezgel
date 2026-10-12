// Naturstein & Granit (E5-BAU-06 · S-15, KERN v2): Seitenkörper der Themenseite als Erzählansicht nach dem Muster der
// Familienreferenz (leistungen/[id], fliesen) und der Schwesterseiten (untergrund-abdichtung). Einstieg mit Laserachse,
// H1 links, Vorspann und zwei Knöpfe; rechts das Planblatt „naturstein“ (Drittelverband), interaktiv. Danach die Leitachse
// über die Abschnitte, Flächen Kalk und Fliese im Wechsel:
// 2. Unikat (Kalk): Text an der Fuge, daneben das Feld „Was wir verlegen“ · 3. Silikatisch oder kalkhaltig (Fliese):
// Tabelle, Hinweis zur Härte, die beiden Unterseiten als Feldraster · 4. Einsatzbereiche (Kalk): Halbverband ·
// 5. Verlegung (Fliese): Schrittfolge, ab lg als Reihe · 6. Imprägnierung und Pflege (Kalk): Kopf seitlich mit Warnhinweis,
// Pflegeregeln als Liste an der Fuge · 7. Beratung und Aufmaß (Fliese): drei Wege, darunter die weiterführenden Ratgeber.
// Wortlaut, Überschriften, Links, IDs und Lesefolge wie im Bestand. Kein Auftritt und kein großer Moment.
// Metadaten und Daten unverändert; JSON-LD im layout.tsx der Route.
import Link from 'next/link';
import clsx from 'clsx';
import { COMPANY_DATA } from '@/config/company';
import { TOPIC_HUBS } from '@/config/topics';
import { createMetadata } from '@/lib/metadata';
import Icon from '@/components/icons/Icon';
import QualityPromise from '@/components/sections/QualityPromise';
import { FinalCTA } from '@/components/ui/FinalCTA';
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
import Tabelle from '@/components/kern/Tabelle';
import Verlegeplan from '@/components/kern/Verlegeplan';
import { etikettKlassen, linkKlassen } from '@/components/kern/stile';

export const metadata = createMetadata({
    title: 'Naturstein verlegen Wetzlar & Aßlar | Granit · Tezgel',
    description:
        'Naturstein fachgerecht verlegen in Wetzlar & Aßlar: Granit, Marmor, Kalkstein, Travertin & Schiefer. Verfärbungsfreie Verklebung. Aufmaß vor Ort kostenfrei!',
    path: '/naturstein'
});

const HUB = TOPIC_HUBS.find((hub) => hub.id === 'naturstein');
const SUBPAGES = HUB ? HUB.pages.filter((page) => page.path !== HUB.path) : [];

const SUBPAGE_DETAILS = {
    '/naturstein/granit': {
        group: 'Silikatisch',
        points: ['Granit, Gneis, Quarzit, Schiefer', 'Deutlich unempfindlicher gegen Säure', 'Viele Sorten auch für außen geeignet']
    },
    '/naturstein/marmor-kalkstein': {
        group: 'Kalkhaltig',
        points: ['Marmor, Travertin, Kalkstein', 'Säureempfindlich durch Kalkgehalt', 'Edel im Wohnbereich und an der Wand']
    }
};

const GROUPS = [
    {
        name: 'Silikatische Gesteine',
        examples: 'Granit und granitähnliche Tiefengesteine, Gneis, Quarzit, Schiefer, viele Sandsteine',
        mineral: 'Überwiegend Quarz, Feldspat, Glimmer und andere Silikate',
        acid: 'Deutlich unempfindlicher gegen Säure als kalkhaltige Steine. Ausnahmen: Sandsteine mit kalkhaltigem Bindemittel, Schiefer mit Kalk- oder Pyritanteilen.',
        care: 'Robust im Alltag, dennoch steingerecht und pH-neutral pflegen'
    },
    {
        name: 'Kalkhaltige Gesteine',
        examples: 'Marmor, Travertin, Kalkstein, Dolomit und andere Karbonatgesteine',
        mineral: 'Überwiegend Calcit oder Dolomit (Karbonate)',
        acid: 'Säure – Essig, Zitronensaft, Wein, Kalk- und WC-Reiniger – löst den Kalk an und hinterlässt matte Stellen.',
        care: 'Konsequent säurefrei, pH-neutral pflegen; Imprägnierung empfehlenswert'
    }
];

const GROUP_ROWS = [
    { key: 'examples', label: 'Beispiele' },
    { key: 'mineral', label: 'Hauptbestandteile' },
    { key: 'acid', label: 'Säure' },
    { key: 'care', label: 'Pflege' }
];

const AREAS = [
    {
        title: 'Böden im Wohnbereich',
        text: 'Wohnzimmer, Flur und Diele profitieren von der Wertigkeit und Wärmespeicherung des Steins – auch auf Fußbodenheizung, wenn Kleber und Aufbau darauf abgestimmt sind.'
    },
    {
        title: 'Bad und Dusche',
        text: 'Naturstein ist im Bad möglich, wenn die Abdichtung darunter nach DIN 18534 ausgeführt ist und die Oberfläche im Duschbereich ausreichend rutschhemmend ist.'
    },
    {
        title: 'Treppen',
        text: 'Stufen aus Naturstein sind langlebig und repräsentativ. Welche Lösung zu Ihrer Treppe passt, zeigt unser Treppen-Ratgeber.',
        href: '/treppen',
        linkLabel: 'Zum Treppen-Ratgeber'
    },
    {
        title: 'Außenbereiche',
        text: 'Draußen kommen nur frostbeständige Sorten mit geeigneter Oberfläche infrage. Welche Platte zu Balkon und Terrasse passt, erklären wir bei den Terrassenplatten.',
        href: '/balkon-terrasse/terrassenplatten',
        linkLabel: 'Zu den Terrassenplatten'
    }
];

const LAYING = [
    {
        title: 'Kalibriert oder unkalibriert',
        text: 'Kalibrierte Platten haben eine gleichmäßige Stärke und werden im Dünnbett nach DIN 18157 verlegt. Unkalibrierte Platten mit Stärkeschwankungen brauchen ein Mittelbett, das diese Unterschiede ausgleicht.'
    },
    {
        title: 'Verfärbungsfreie Kleber',
        text: 'Viele Natursteine – besonders helle – können sich durch Feuchtigkeit aus dem Mörtelbett dauerhaft verfärben. Wir verwenden weiße, für Naturstein geeignete Kleber, die das Anmachwasser schnell binden.'
    },
    {
        title: 'Hohlraumarme Bettung',
        text: 'Die Platte wird vollflächig eingebettet. Hohlstellen würden unter Last zu Brüchen führen und im Außenbereich Wasser sammeln.'
    },
    {
        title: 'Sortieren vor dem Verlegen',
        text: 'Weil jede Platte anders gezeichnet ist, legen wir größere Flächen vorab aus und verteilen Farbe und Maserung so, dass ein ruhiges Gesamtbild entsteht.'
    }
];

const CARE = [
    {
        title: 'Imprägnieren statt versiegeln',
        text: 'Eine Imprägnierung dringt in die Poren ein, verzögert das Eindringen von Wasser, Öl und Schmutz und lässt den Stein diffusionsoffen. Sie bildet keinen Film und macht kalkhaltige Steine nicht säurefest.'
    },
    {
        title: 'Der richtige Zeitpunkt',
        text: 'Imprägniert wird erst, wenn Belag, Kleber und Fugen ausgetrocknet sind und die Fläche gründlich gereinigt ist – nach den Angaben des Herstellers des Imprägniermittels.'
    },
    {
        title: 'Vorher testen',
        text: 'Jede Imprägnierung wird an einem Reststück oder einer unauffälligen Stelle erprobt, denn manche Mittel vertiefen den Farbton.'
    },
    {
        title: 'Wirkung prüfen',
        text: 'Perlt ein Wassertropfen nicht mehr ab, sondern zieht schnell ein, ist eine Auffrischung fällig. Wie oft das nötig ist, hängt von Stein und Beanspruchung ab.'
    },
    {
        title: 'Regelmäßig pflegen',
        text: 'Mit klarem Wasser und einem pH-neutralen Steinpflegemittel wischen. Säurehaltige Reiniger, Scheuermittel und aggressive Mittel vermeiden.'
    },
    {
        title: 'Flecken sofort aufnehmen',
        text: 'Verschüttetes Öl, Wein oder Kaffee möglichst sofort abtupfen, nicht verreiben.'
    }
];

const FURTHER_READING = [
    { label: 'Leistung: Wohnbereiche & Böden', href: '/leistungen/wohnen' },
    { label: 'Feinsteinzeug oder Naturstein? Der Vergleich', href: '/blog/feinsteinzeug-oder-naturstein-vergleich' },
    { label: 'Fliesen im Bad', href: '/bad/fliesen' },
    { label: 'Ausstellung Wetzlar', href: '/ausstellung/wetzlar' }
];

const WIR_VERLEGEN = [
    'Bodenbeläge in Wohnräumen, Flur und Küche',
    'Wand- und Bodenbeläge im Bad',
    'Treppenbeläge innen und außen',
    'Balkon- und Terrassenbeläge aus geeigneten Sorten'
];

// Hinweis von Hand (Gestalt wie kern/Hinweis): Der Merksatz beginnt mit seinem fetten Stichwort im selben Absatz wie im
// Bestand – ohne den vorgesetzten Artnamen des Bausteins, der den Wortlaut der Zeile ändern würde.
const HINWEIS = 'flex items-start gap-4 border border-l-2 bg-fliese p-6 font-text text-fs-2 text-tinte';

// Eintrag einer Liste an der Fuge: Fugenkreuz als Marke, Text daneben
function Punkt({ children }) {
    return (
        <li className="flex gap-3 font-text text-fs-2 text-tinte">
            <span aria-hidden="true" className="flex h-6 shrink-0 items-center text-strich">
                <Fugenkreuz className="size-3" />
            </span>
            <span className="min-w-0">{children}</span>
        </li>
    );
}

export default function NatursteinPage() {
    return (
        <>
            {/* 1. EINSTIEG: Etikett, H1 an der Laserachse, Vorspann, zwei Knöpfe; rechts das Planblatt „naturstein“ */}
            <section aria-labelledby="naturstein-heading">
                <Einstieg
                    art="erzaehl"
                    etikett={<>Naturstein- und Granitverlegung</>}
                    titel={
                        <span id="naturstein-heading">
                            Naturstein- und Granitverlegung{' '}
                            <span>vom Fachbetrieb</span>
                        </span>
                    }
                    vorspann={
                        <p>
                            Professionelle Naturstein- und Granitverlegung vom Fachbetrieb Tezgel in Mittelhessen: Hochwertigen Naturstein &amp; Granit fachgerecht verlegen lassen verlangt passenden Spezialkleber, hohlraumarme Bettung und typgerechte Pflege für Granit, Schiefer, Marmor oder Travertin. Hier erfahren Sie, worauf es in der Praxis ankommt.
                        </p>
                    }
                    aktionen={
                        <>
                            <Knopf href="/kontakt" icon="pfeil-rechts">
                                Natursteinprojekt besprechen
                            </Knopf>
                            <Knopf href="/leistungen/wohnen" variante="neben">
                                Leistung Wohnbereiche
                            </Knopf>
                        </>
                    }
                    rand={
                        <Planblatt felder={planfelder('Naturstein verlegen', 'naturstein')}>
                            <Verlegeplan plan="naturstein" ohneAchse bemassung={false} interaktiv />
                        </Planblatt>
                    }
                />
            </section>

            <Leitachse>
                {/* 2. UNIKAT: Text an der Fuge (7 Spalten), daneben das Feld „Was wir verlegen“ mit Liste und Abgrenzung (5 Spalten) */}
                <Abschnitt titelId="naturstein-unikat-heading" leitachse spaet etikett="Unikat" titel="Warum Naturstein: jede Platte ein Unikat">
                    <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-12">
                        <div className="max-w-mass space-y-4 font-text text-fs-3 text-tinte-2 lg:col-span-7">
                            <p>
                                Naturstein ist über lange Zeiträume in der Erde entstanden. Adern, Einschlüsse, Farbwechsel und
                                Maserung machen jeden Boden unverwechselbar – und sind kein Mangel, sondern Eigenschaft des Materials.
                            </p>
                            <p>
                                Das heißt auch: Eine Musterplatte zeigt nur einen Ausschnitt. Farbe und Zeichnung der gelieferten Ware
                                können abweichen. Wer ein sehr gleichmäßiges Bild wünscht, sollte Naturstein und Feinsteinzeug in
                                Steinoptik gegeneinander abwägen – der{' '}
                                <Link href="/blog/feinsteinzeug-oder-naturstein-vergleich" className={linkKlassen}>
                                    Vergleich Feinsteinzeug oder Naturstein
                                </Link>{' '}
                                hilft bei der Entscheidung.
                            </p>
                        </div>
                        <div className="border border-fuge bg-fliese p-6 lg:col-span-5 lg:p-8">
                            <h3 className="font-anzeige text-fs-4 text-tinte">Was wir verlegen</h3>
                            <ul className="mt-6 grid gap-3">
                                {WIR_VERLEGEN.map((item) => (
                                    <Punkt key={item}>{item}</Punkt>
                                ))}
                            </ul>
                            <p className="mt-6 border-t border-fuge pt-6 font-text text-fs-2 text-tinte-2">
                                Wir verlegen den Stein. Steinmetzarbeiten wie das Anfertigen von Massivstufen oder das Schleifen und
                                Polieren von Flächen übernimmt ein Steinmetzbetrieb.
                            </p>
                        </div>
                    </div>
                </Abschnitt>

                {/* 3. SILIKATISCH ODER KALKHALTIG: Vergleich als Tabelle (Name = bisherige Beschriftung), Hinweis zur Härte,
                    darunter die beiden Unterseiten als Feldraster – je Feld ein Link über das ganze Feld */}
                <Abschnitt
                    titelId="naturstein-gruppen-heading"
                    flaeche="fliese"
                    leitachse
                    spaet
                    etikett="Die wichtigste Unterscheidung"
                    titel="Silikatisch oder kalkhaltig: was für Säure, Pflege und Verlegung zählt"
                    einleitung={
                        <p>
                            Ob ein Stein empfindlich auf Säure reagiert, hängt von seinen Mineralen ab – nicht davon, ob er als hart oder
                            weich gilt.
                        </p>
                    }
                >
                    <Tabelle
                        name="Silikatische und kalkhaltige Natursteine im Vergleich"
                        kopf={['Merkmal', ...GROUPS.map((group) => group.name)]}
                        zeilen={GROUP_ROWS.map((row) => [row.label, ...GROUPS.map((group) => group[row.key])])}
                    />

                    <div className={clsx(HINWEIS, 'mt-6 border-strich')}>
                        <Icon name="info" groesse={5} className="mt-1 text-tinte" />
                        <p className="min-w-0">
                            <strong className="font-semibold">Härte ist etwas anderes:</strong> Die Härte sagt, wie kratzempfindlich ein
                            Stein ist. Schiefer und viele Sandsteine sind vergleichsweise weich, bestehen aber überwiegend aus Silikaten.
                            Marmor ist weicher als Granit und zugleich säureempfindlich – aus zwei verschiedenen Gründen.
                        </p>
                    </div>

                    <Feldraster spalten={2} className="mt-12">
                        {SUBPAGES.map((page) => {
                            const details = SUBPAGE_DETAILS[page.path];
                            return (
                                <Feld key={page.path} className="relative">
                                    <Link href={page.path} className="group flex flex-1 flex-col after:absolute after:inset-0">
                                        {details && <span className={etikettKlassen}>{details.group}</span>}
                                        <h3 className="mt-3 font-anzeige text-fs-5 text-tinte underline decoration-strich decoration-1 underline-offset-4 group-hover:decoration-tinte">
                                            {page.name}
                                        </h3>
                                        <p className="mt-3 font-text text-fs-3 text-tinte-2">{page.desc}</p>
                                        {details && (
                                            <ul className="mt-6 grid gap-3">
                                                {details.points.map((point) => (
                                                    <Punkt key={point}>{point}</Punkt>
                                                ))}
                                            </ul>
                                        )}
                                        <span className="mt-auto flex items-center gap-2 pt-6 font-text text-fs-2 font-semibold text-tinte">
                                            Details ansehen
                                            <Icon name="pfeil-rechts" groesse={5} />
                                        </span>
                                    </Link>
                                </Feld>
                            );
                        })}
                    </Feldraster>
                </Abschnitt>

                {/* 4. EINSATZBEREICHE: vier Bereiche im Halbverband an der Fuge; Treppen und Außenbereiche mit Weg zum Ratgeber */}
                <Abschnitt titelId="naturstein-bereiche-heading" leitachse spaet etikett="Einsatzbereiche" titel="Böden, Wände, Treppen, außen">
                    <Merkliste
                        spalten={2}
                        verband
                        titelAls="h3"
                        eintraege={AREAS.map((area) => ({
                            titel: area.title,
                            text: (
                                <>
                                    <p>{area.text}</p>
                                    {area.href && (
                                        <div className="mt-2">
                                            <Knopf href={area.href} variante="text" icon="pfeil-rechts">
                                                {area.linkLabel}
                                            </Knopf>
                                        </div>
                                    )}
                                </>
                            )
                        }))}
                    />
                </Abschnitt>

                {/* 5. VERLEGUNG: vier Punkte als Schrittfolge (ab lg in einer Reihe); die Nummern sind wie im Bestand stumm */}
                <Abschnitt
                    titelId="naturstein-verlegung-heading"
                    flaeche="fliese"
                    leitachse
                    spaet
                    etikett="Verlegung"
                    titel="Verfärbungsfreie Kleber und das passende Mörtelbett"
                >
                    <Schrittfolge ausrichtung="waagrecht" nummerStumm schritte={LAYING.map((item) => ({ titel: item.title, text: item.text }))} />
                </Abschnitt>

                {/* 6. IMPRÄGNIERUNG UND PFLEGE: Kopf links mit Einleitung und Warnhinweis, rechts sechs Regeln an der Fuge */}
                <Abschnitt
                    titelId="naturstein-pflege-heading"
                    leitachse
                    spaet
                    kopf="seitlich"
                    etikett={<>Schutz &amp; Pflege</>}
                    titel="Imprägnierung und Pflege im Überblick"
                    einleitung={
                        <>
                            <p>
                                Eine gute Pflege entscheidet darüber, wie ein Natursteinboden nach Jahren aussieht. Ob eine Imprägnierung für
                                Ihren Stein sinnvoll ist und welches Mittel passt, besprechen wir bei der Planung.
                            </p>
                            <div className={clsx(HINWEIS, 'mt-8 border-tinte')}>
                                <Icon name="hinweis" groesse={5} className="mt-1 text-tinte" />
                                <p className="min-w-0">
                                    <strong className="font-semibold">Bei Marmor, Travertin und Kalkstein</strong> gilt zusätzlich: keine
                                    Säure, auch keine Kalk- oder Essigreiniger. Mehr dazu auf der Seite{' '}
                                    <Link href="/naturstein/marmor-kalkstein" className={linkKlassen}>
                                        Marmor, Travertin &amp; Kalkstein
                                    </Link>
                                    .
                                </p>
                            </div>
                        </>
                    }
                >
                    <ul className="border-t border-tinte">
                        {CARE.map((item) => (
                            <li key={item.title} className="flex items-start gap-4 border-b border-fuge py-6 lg:gap-6">
                                <Fugenkreuz className="mt-2 size-3 shrink-0 text-strich" />
                                <p className="min-w-0 max-w-mass font-text text-fs-3 text-tinte-2">
                                    <strong className="font-semibold text-tinte">{item.title}:</strong> {item.text}
                                </p>
                            </li>
                        ))}
                    </ul>
                </Abschnitt>

                {/* 7. BERATUNG UND AUFMASS: Einleitung und drei Wege als Knöpfe; darunter die weiterführenden Ratgeber (Navigation) */}
                <Abschnitt
                    titelId="naturstein-cta-heading"
                    flaeche="fliese"
                    leitachse
                    spaet
                    etikett={<>Beratung &amp; Aufmaß</>}
                    titel="Beratung und Aufmaß für Ihren Naturstein"
                    einleitung={
                        <p>
                            {COMPANY_DATA.owner.fullName} prüft vor Ort Untergrund, Aufbauhöhen und Einsatzbereich und sagt Ihnen
                            ehrlich, ob Ihr Wunschstein dazu passt – oder ob eine Alternative die bessere Wahl ist.
                        </p>
                    }
                >
                    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                        <Knopf href="/kontakt" icon="pfeil-rechts">
                            Aufmaß anfragen
                        </Knopf>
                        <Knopf href={`tel:${COMPANY_DATA.contact.phoneLink}`} variante="neben" iconLinks="telefon">
                            <span className="font-mono font-normal">{COMPANY_DATA.contact.phone}</span>
                        </Knopf>
                        <Knopf href={COMPANY_DATA.contact.whatsappLink} extern variante="neben" vorne={<WhatsAppLogo className="size-5 shrink-0" />}>
                            WhatsApp
                        </Knopf>
                    </div>

                    <nav aria-labelledby="naturstein-ratgeber-heading" className="mt-16 border-t border-fuge pt-12">
                        <h2 id="naturstein-ratgeber-heading" className="font-anzeige text-fs-5 text-tinte">
                            Weiterführende Ratgeber zu Naturstein &amp; Granit
                        </h2>
                        <Merkliste
                            spalten={2}
                            className="mt-8"
                            eintraege={FURTHER_READING.map((link) => ({
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

            {/* 8. ABSCHLUSS */}
            <QualityPromise />
            <FinalCTA />
        </>
    );
}
