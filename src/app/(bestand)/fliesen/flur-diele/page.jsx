// Flur & Diele (E4-BAU-07, KERN v2): Erzählansicht nach dem Muster der Familienreferenz (/fliesen, /leistungen/[id]).
// Einstieg mit Laserachse, H1 links, Vorspann und zwei Knöpfe; rechts das Planblatt „wohnen“ mit dem Verlegeplan
// (interaktiv). Danach die Leitachse über die Abschnitte: Anforderungen als Feldraster, Format und Sauberlaufzone als
// Band, Übergänge als Merkliste, Rutschhemmung und offener Wohnbereich als Feldpaar, Weiterführende Ratgeber als
// Merkliste; nach dem Qualitätsversprechen der Konfigurator mit Rückfrage in der Spalte daneben. Wortlaut, Überschriften,
// Links, IDs und Lesefolge wie im Bestand. Kein großer Moment, kein Auftritt. Metadaten unverändert.
import Link from 'next/link';
import dynamic from 'next/dynamic';
import FormularPlatzhalter from '@/components/funnels/TezgelAnfrageFunnel/Platzhalter';
import clsx from 'clsx';
import { COMPANY_DATA } from '@/config/company';
import { createMetadata } from '@/lib/metadata';
import Icon from '@/components/icons/Icon';
import QualityPromise from '@/components/sections/QualityPromise';
import Abschnitt from '@/components/kern/Abschnitt';
import Einstieg from '@/components/kern/Einstieg';
import Planblatt, { planfelder } from '@/components/kern/Planblatt';
import Leitachse from '@/components/kern/Leitachse';
import { Feld, Feldraster } from '@/components/kern/Feldraster';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import Knopf from '@/components/kern/Knopf';
import Merkliste from '@/components/kern/Merkliste';
import Rueckfrage from '@/components/kern/Rueckfrage';
import Verlegeplan from '@/components/kern/Verlegeplan';
import { etikettKlassen, linkKlassen } from '@/components/kern/stile';

// Konfigurator nachladen (Tempo, wie auf der Startseite und den Leistungsseiten)
const FliesenKonfigurator = dynamic(() => import('@/components/funnels/FliesenKonfigurator'), {
    loading: () => <FormularPlatzhalter />,
});

export const metadata = createMetadata({
    title: 'Flur & Diele fliesen lassen | Fliesenleger Tezgel',
    description:
        'Flur & Eingangsbereich fliesen lassen: strapazierfähige Formate, Verlegerichtung, Rutschhemmung & Schmutzfangzonen. Fachbetrieb Tezgel – Jetzt anfragen!',
    path: '/fliesen/flur-diele'
});

const SOLUTIONS = [
    {
        title: 'Belag mit Reserven',
        desc: 'Im Eingang treffen Straßenschmutz, Sand und Nässe auf den Boden. Durchgefärbtes oder glasiertes Feinsteinzeug ist dicht und kratzfest; bei glasierten Fliesen empfehlen wir für Flur und Eingang eine hohe Abriebklasse (Prüfung nach DIN EN ISO 10545-7).'
    },
    {
        title: 'Verlegerichtung mit Wirkung',
        desc: 'Längs verlegte Rechteckformate führen den Blick in die Tiefe, quer verlegte lassen einen schmalen Flur breiter wirken. Bei Rechteckformaten ab etwa 60 cm Kantenlänge begrenzen wir den Versatz meist auf ein Drittel, weil große Fliesen produktionsbedingt leicht gewölbt sein können.'
    },
    {
        title: 'Schmutzfangzone einplanen',
        desc: 'Eine eingelassene Sauberlaufzone direkt hinter der Tür hält einen Großteil des Schmutzes vom übrigen Boden fern. Die Aussparung für Mattenrahmen und Matte muss vor dem Verlegen feststehen – Maße und Aufbauhöhe stimmen wir mit Ihnen ab.'
    },
    {
        title: 'Saubere Übergänge',
        desc: 'Zu Parkett, Vinyl oder Teppich braucht es ein passendes Profil und eine Fuge, die unterschiedliche Bewegungen der Beläge aufnimmt. Idealerweise sind die Aufbauhöhen so geplant, dass beide Beläge ohne Stufe aneinanderstoßen.'
    },
    {
        title: 'Trittsicher bei Nässe',
        desc: 'Nasse Schuhsohlen machen glatte Oberflächen rutschig. Eine leicht rutschhemmende Oberfläche ist im Eingangsbereich sinnvoll – im Privathaus als Empfehlung, nicht als gesetzliche Pflicht.'
    }
];

const TRANSITIONS = [
    { title: 'Fliese an Parkett', desc: 'Parkett arbeitet mit der Luftfeuchte. Zwischen den Belägen bleibt deshalb eine Bewegungsfuge, abgedeckt durch ein Übergangsprofil oder elastisch geschlossen.' },
    { title: 'Fliese an Vinyl oder Designbelag', desc: 'Vinyl ist deutlich dünner als ein Fliesenaufbau. Den Höhenunterschied gleichen wir vorab im Untergrund aus oder planen ein Anpassungsprofil ein.' },
    { title: 'Fliese an Teppich', desc: 'Ein Abschlussprofil schützt die Fliesenkante und gibt dem Teppich einen festen Anschlag. Die Lage des Profils legen wir meist mittig unter das geschlossene Türblatt.' }
];

const CROSS_LINKS = [
    { href: '/leistungen/wohnen', label: 'Fliesen im Wohnbereich', desc: 'Wohnen, Essen, Küche und Flur' },
    { href: '/fliesen/verlegemuster', label: 'Verlegemuster & Abschlüsse', desc: 'Fugenachsen, Verband und Sockel' },
    { href: '/blog/rutschfeste-fliesen-r-klassen', label: 'Rutschfeste Fliesen', desc: 'Welche R-Klasse wo sinnvoll ist' },
    { href: '/beratung', label: 'Beratung', desc: 'Formate und Materialien persönlich besprechen' }
];

export default function FlurDielePage() {
    return (
        <>
            {/* 1. EINSTIEG: Etikett, H1 an der Laserachse, Vorspann, zwei Knöpfe; rechts das Planblatt „wohnen“ ohne Achse */}
            <section aria-labelledby="flur-heading">
                <Einstieg
                    art="erzaehl"
                    etikett="Küchen, Dielen & Flure"
                    titel={
                        <span id="flur-heading">
                            Flur und Diele fliesen:{' '}
                            <span>robust vom Eingang bis in den Wohnbereich</span>
                        </span>
                    }
                    vorspann={
                        <p>
                            Flur und Diele fliesen: robust vom Eingang bis in den Wohnbereich mit strapazierfähigen, pflegeleichten Belägen. Der Flur ist die am stärksten beanspruchte Fläche im Haus: Straßenschuhe, Nässe, Schmutz und Übergänge in offene Räume erfordern abriebfeste Feinsteinzeugfliesen und eine durchdachte Verlegerichtung.
                        </p>
                    }
                    aktionen={
                        <>
                            <Knopf href="/kontakt" icon="pfeil-rechts">
                                Kostenfreies Aufmaß anfragen
                            </Knopf>
                            <Knopf href="/leistungen/wohnen" variante="neben">
                                Fliesen im Wohnbereich
                            </Knopf>
                        </>
                    }
                    rand={
                        <Planblatt felder={planfelder('Flur & Diele fliesen lassen', 'wohnen')}>
                            <Verlegeplan plan="wohnen" ohneAchse bemassung={false} interaktiv />
                        </Planblatt>
                    }
                />
            </section>

            <Leitachse>
                {/* 2. PLANUNG: Feldraster der fünf Punkte; der fünfte Punkt füllt die Zeile über alle Spalten (keine leere Zelle) */}
                <Abschnitt
                    titelId="anforderungen-heading"
                    leitachse
                    spaet
                    etikett="Planung"
                    titel="Anforderungen im Eingangsbereich: Abrieb, Schmutz, Nässe"
                    einleitung={<p>Fünf Punkte, die wir bei jedem Flur vor dem ersten Schnitt mit Ihnen klären.</p>}
                >
                    <Feldraster spalten={3}>
                        {SOLUTIONS.map((item, i) => (
                            <Feld key={item.title} spanne={i === SOLUTIONS.length - 1 ? 2 : undefined}>
                                <h3 className="font-anzeige text-fs-4 text-tinte">{item.title}</h3>
                                <p className="mt-3 max-w-mass font-text text-fs-2 text-tinte-2">{item.desc}</p>
                            </Feld>
                        ))}
                    </Feldraster>
                </Abschnitt>

                {/* 3. FORMAT UND SAUBERLAUFZONE: Kopf links, Text rechts; die Sauberlaufzone als Fugenliste darunter im selben Band */}
                <Abschnitt
                    titelId="format-heading"
                    leitachse
                    spaet
                    flaeche="fliese"
                    kopf="seitlich"
                    etikett="Format & Richtung"
                    titel="Format und Verlegerichtung im schmalen Flur"
                >
                    <div className="max-w-mass space-y-4 font-text text-fs-3 text-tinte">
                        <p>
                            In schmalen Fluren entscheiden die Randstreifen über das Gesamtbild. Wir teilen die Fläche so ein,
                            dass an beiden Längsseiten möglichst gleich breite Zuschnitte entstehen – schmale Reststreifen an
                            einer Wand wirken unruhig und brechen leichter.
                        </p>
                        <p>
                            Großformate reduzieren die Fugenanteile und lassen den Raum ruhiger wirken. Sie verlangen aber einen
                            besonders ebenen Untergrund und eine vollflächige Bettung. Wie Fugenachsen durch Türen weiterlaufen
                            und welcher Sockel passt, zeigen wir auf der Seite{' '}
                            <Link href="/fliesen/verlegemuster" className={linkKlassen}>
                                Verlegemuster &amp; Abschlüsse
                            </Link>
                            .
                        </p>
                    </div>

                    <div className="mt-16 border-t border-fuge pt-12">
                        <p className={etikettKlassen}>Sauberlaufzone</p>
                        <h2 className="mt-4 font-anzeige text-fs-5 text-tinte">Schmutzfangzone von Anfang an einplanen</h2>
                        <ul className="mt-6 grid max-w-mass gap-3">
                            <li className="flex gap-3 font-text text-fs-2 text-tinte">
                                <span aria-hidden="true" className="flex h-6 shrink-0 items-center text-strich">
                                    <Fugenkreuz className="size-3" />
                                </span>
                                <span className="min-w-0">Größe und Lage festlegen, bevor der Belag geplant wird – idealerweise über die volle Türbreite und mindestens eine Schrittlänge tief.</span>
                            </li>
                            <li className="flex gap-3 font-text text-fs-2 text-tinte">
                                <span aria-hidden="true" className="flex h-6 shrink-0 items-center text-strich">
                                    <Fugenkreuz className="size-3" />
                                </span>
                                <span className="min-w-0">Aufbauhöhe von Rahmen und Matte beachten, damit die Matte bündig mit den Fliesen abschließt.</span>
                            </li>
                            <li className="flex gap-3 font-text text-fs-2 text-tinte">
                                <span aria-hidden="true" className="flex h-6 shrink-0 items-center text-strich">
                                    <Fugenkreuz className="size-3" />
                                </span>
                                <span className="min-w-0">Rahmen und Matte besorgen Sie über den Fachhandel; wir planen die Aussparung und schließen den Fliesenbelag sauber an.</span>
                            </li>
                        </ul>
                    </div>
                </Abschnitt>

                {/* 4. ANSCHLÜSSE: die drei Übergänge als Merkliste an der Fuge */}
                <Abschnitt
                    titelId="uebergaenge-heading"
                    leitachse
                    spaet
                    etikett="Anschlüsse"
                    titel="Übergänge zu Parkett, Vinyl und Teppich"
                    einleitung={
                        <p>
                            Wo der Flur auf andere Beläge trifft, entstehen die meisten Stolperkanten. Entscheidend ist, die Aufbauhöhen aller Beläge schon bei der Estrich- oder Untergrundplanung zu berücksichtigen.
                        </p>
                    }
                >
                    <Merkliste titelAls="h3" eintraege={TRANSITIONS.map((item) => ({ titel: item.title, text: item.desc }))} />
                </Abschnitt>

                {/* 5. RUTSCHHEMMUNG UND OFFENER WOHNBEREICH: zwei Felder nebeneinander, je Überschrift, Text und ein Link */}
                <Abschnitt leitachse spaet>
                    <Feldraster spalten={2} als="div">
                        <article aria-labelledby="rutsch-heading" className="flex flex-col bg-fliese p-6 lg:p-8">
                            <h2 id="rutsch-heading" className="font-anzeige text-fs-5 text-tinte">Nasse Schuhe: Rutschhemmung im Eingangsbereich</h2>
                            <p className="mt-3 max-w-mass font-text text-fs-2 text-tinte">
                                Die Rutschhemmung von Bodenbelägen wird heute nach DIN EN 16165 ermittelt; die bekannten
                                Bewertungsgruppen R9 bis R13 bleiben erhalten. Für private Flure gibt es keine gesetzliche Vorgabe.
                                Im Eingangsbereich empfehlen wir dennoch eine Oberfläche mit leichter Rutschhemmung, zum Beispiel
                                R9 oder R10 – sie bleibt im Alltag gut zu reinigen und bietet bei Nässe mehr Halt als eine polierte
                                Fliese.
                            </p>
                            <Knopf href="/blog/rutschfeste-fliesen-r-klassen" variante="text" icon="pfeil-rechts" className="mt-6 self-start">
                                R-Klassen verständlich erklärt
                            </Knopf>
                        </article>
                        <article aria-labelledby="offen-heading" className="flex flex-col bg-fliese p-6 lg:p-8">
                            <h2 id="offen-heading" className="font-anzeige text-fs-5 text-tinte">Offen in den Wohnbereich: ein Belag über mehrere Räume</h2>
                            <p className="mt-3 max-w-mass font-text text-fs-2 text-tinte">
                                Läuft der Flur ohne Tür in Küche oder Wohnraum über, wirkt ein durchgehender Belag besonders
                                großzügig. Dafür müssen Fugenachsen über alle Räume geplant und Bewegungsfugen des Estrichs – etwa in
                                Türdurchgängen – deckungsgleich in den Belag übernommen werden. Liegt eine Flächentemperierung im
                                Boden, gelten zusätzliche Regeln.
                            </p>
                            <Knopf href="/fliesen/auf-fussbodenheizung" variante="text" icon="pfeil-rechts" className="mt-6 self-start">
                                Fliesen auf beheiztem Estrich
                            </Knopf>
                        </article>
                    </Feldraster>
                </Abschnitt>

                {/* 6. WEITERFÜHRENDE RATGEBER: vier Verweise als Merkliste, darunter Telefon und WhatsApp */}
                <Abschnitt titelId="ratgeber-heading" leitachse spaet titel="Weiterführende Ratgeber zu Flur- & Dielenfliesen">
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
                    <p className="mt-8 max-w-mass font-text text-fs-3 text-tinte-2">
                        Fragen zum Projekt? Rufen Sie an unter{' '}
                        <a href={`tel:${COMPANY_DATA.contact.phoneLink}`} className={clsx(linkKlassen, 'inline-flex items-center gap-1 whitespace-nowrap font-mono')}>
                            <Icon name="telefon" groesse={4} />
                            {COMPANY_DATA.contact.phone}
                        </a>{' '}
                        oder senden Sie Fotos per{' '}
                        <a href={COMPANY_DATA.contact.whatsappLink} target="_blank" rel="noopener noreferrer" className={linkKlassen}>
                            WhatsApp
                        </a>
                        .
                    </p>
                </Abschnitt>
            </Leitachse>

            {/* 7. QUALITÄT: Merkliste im Halbverband, wie im Bestand vor dem Konfigurator */}
            <QualityPromise />

            {/* 8. KONFIGURATOR: Funnel (nachgeladen) mit 8 Spalten, rechts die Rückfrage mit 4 Spalten (ab lg) */}
            <Leitachse>
                <Abschnitt aria-label="Fliesen-Konfigurator" leitachse spaet>
                    <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-12">
                        <div className="min-w-0 lg:col-span-8">
                            <FliesenKonfigurator area="flur" />
                        </div>
                        <div className="lg:col-span-4">
                            <Rueckfrage />
                        </div>
                    </div>
                </Abschnitt>
            </Leitachse>
        </>
    );
}
