// Küchenfliesen (E4-BAU-09, KERN v2): Erzählansicht nach dem Muster der Familie Fliesen (fliesen/page.jsx). Einstieg mit
// Laserachse, H1 links bündig, Vorspann, zwei Knöpfe; rechts das Planblatt mit dem Plan „wohnen“. Danach die Leitachse über
// die Abschnitte: Anforderungen als Merkliste, Planung als Feldraster, Rutschhemmung, Kundenstimme, Weiterführende Ratgeber
// als Merkliste, Konfigurator mit Rückfrage. Abschluss auf Tinte. Der Konfigurator wird nachgeladen (Tempo).
// Wortlaut, Überschriften, Links, IDs und Lesefolge wie im Bestand.
import Link from 'next/link';
import dynamic from 'next/dynamic';
import FormularPlatzhalter from '@/components/funnels/TezgelAnfrageFunnel/Platzhalter';
import { COMPANY_DATA } from '@/config/company';
import { REVIEWS } from '@/config/reviews';
import { createMetadata } from '@/lib/metadata';
import SeitenDaten from '@/components/seo/SeitenDaten';
import QualityPromise from '@/components/sections/QualityPromise';
import WhatsAppLogo from '@/components/ui/WhatsAppLogo';
import Abschnitt from '@/components/kern/Abschnitt';
import Einstieg from '@/components/kern/Einstieg';
import Planblatt, { planfelder } from '@/components/kern/Planblatt';
import { Feld, Feldraster } from '@/components/kern/Feldraster';
import Knopf from '@/components/kern/Knopf';
import Leitachse from '@/components/kern/Leitachse';
import Merkliste from '@/components/kern/Merkliste';
import Rueckfrage from '@/components/kern/Rueckfrage';
import Verlegeplan from '@/components/kern/Verlegeplan';
import { linkKlassen } from '@/components/kern/stile';

// Konfigurator nachladen (Tempo, wie auf der Startseite und in der Familie); die ID #konfigurator liegt am Abschnitt
const FliesenKonfigurator = dynamic(() => import('@/components/funnels/FliesenKonfigurator'), {
    loading: () => <FormularPlatzhalter />,
});

export const metadata = createMetadata({
    title: 'Küchenfliesen verlegen Wetzlar | Fliesenleger Tezgel',
    description:
        'Küchenfliesen & Fliesenspiegel verlegen in Wetzlar & Aßlar: strapazierfähige Böden, Großformate & pflegeleichte Fugen. Jetzt unverbindlich beraten lassen!',
    path: '/fliesen/kueche'
});

const REQUIREMENTS = [
    {
        title: 'Fett- und fleckbeständig',
        desc: 'Dichtes Feinsteinzeug nimmt Öl, Rotwein oder Kaffee kaum auf. Hochglanzpolierte Oberflächen sind empfindlicher – hier lohnt ein Blick auf die Herstellerangabe zur Fleckbeständigkeit.'
    },
    {
        title: 'Stoßfest',
        desc: 'Ein heruntergefallener Topf ist in der Küche Alltag. Eine vollflächige Bettung ohne Hohlstellen macht den Belag belastbar; Reservefliesen erleichtern eine spätere Reparatur.'
    },
    {
        title: 'Pflegeleicht',
        desc: 'Matte bis seidenmatte Oberflächen, gut abgestimmte Fugenfarben und wenig Relief lassen sich im Alltag schnell feucht reinigen.'
    },
    {
        title: 'Wenig Fugen',
        desc: 'Großformate am Boden und an der Rückwand reduzieren die Zahl der Fugen – und damit die Stellen, an denen sich Schmutz festsetzen kann.'
    },
    {
        title: 'Trittsicher',
        desc: 'Wasser, Öl und Mehl machen glatte Oberflächen rutschig. Eine leicht rutschhemmende Oberfläche ist in der Küche eine sinnvolle Empfehlung.'
    }
];

const WEITERLESEN = [
    { label: 'Fugenmörtel: zementär oder Reaktionsharz', href: '/fliesen/verlegetechnik' },
    { label: 'XXL-Großformate für Boden und Rückwand', href: '/fliesen/grossformat' },
    { label: 'Übergänge zu Parkett, Vinyl und Teppich', href: '/fliesen/flur-diele' },
    { label: 'Referenzen ansehen', href: '/referenzen' }
];

const TEXT = 'mt-3 font-text text-fs-3 text-tinte-2';

// Ein Feld des Feldrasters: Überschrift und Text in einem Artikel, benannt über die Überschrift
function Karte({ id, ebene: Ebene = 'h3', titel, children }) {
    return (
        <Feld>
            <article aria-labelledby={id} className="flex flex-1 flex-col">
                <Ebene id={id} className="font-anzeige text-fs-4 text-tinte">
                    {titel}
                </Ebene>
                {children}
            </article>
        </Feld>
    );
}

export default function KuechePage() {
    const review = REVIEWS.find((r) => r.id === 'k-d');

    return (
        <>
            <SeitenDaten
                pfad="/fliesen/kueche"
                titel="Küchenfliesen verlegen Wetzlar | Fliesenleger Tezgel"
                beschreibung="Küchenfliesen & Fliesenspiegel verlegen in Wetzlar & Aßlar: strapazierfähige Böden, Großformate & pflegeleichte Fugen. Jetzt unverbindlich beraten lassen!"
                brotkrumen={[
                    { name: 'Start', href: '/' },
                    { name: 'Fliesen und Verlegung', href: '/fliesen' },
                    { name: 'Küchenfliesen verlegen in Wetzlar mit Fliesenleger Tezgel' },
                ]}
            />
            {/* 1. EINSTIEG: Etikett, H1 an der Laserachse, Vorspann, zwei Knöpfe; rechts das Planblatt mit dem Plan „wohnen“ */}
            <Einstieg
                art="erzaehl"
                etikett={<>Räume &middot; Küche</>}
                titel={
                    <span id="kueche-heading">
                        Küchenfliesen verlegen in Wetzlar mit{' '}
                        <span>Fliesenleger Tezgel</span>
                    </span>
                }
                vorspann={
                    <p>
                        Fachgerechte Küchenfliesen und Fliesenspiegel verlegen in Wetzlar und Umgebung: Fliesenleger Tezgel sorgt für robuste
                        Böden, hygienische Rückwände und pflegeleichte Fugen in Ihrer Küche.
                    </p>
                }
                aktionen={
                    <>
                        <Knopf href="/kontakt" icon="pfeil-rechts">
                            Aufmaß anfragen
                        </Knopf>
                        <Knopf href="/leistungen/wohnen" variante="neben">
                            Leistung: Wohnbereiche &amp; Küchen
                        </Knopf>
                    </>
                }
                rand={
                    <Planblatt felder={planfelder('Küchenfliesen verlegen', 'wohnen')}>
                        <Verlegeplan plan="wohnen" ohneAchse bemassung={false} interaktiv />
                    </Planblatt>
                }
            />

            <Leitachse>
                {/* 2. ANFORDERUNGEN: Heading links, fünf Merkmale als Merkliste mit Fugenkreuz */}
                <Abschnitt
                    titelId="ku-anforderungen-heading"
                    leitachse
                    spaet
                    kopf="seitlich"
                    etikett="Anforderungen an den Küchenboden"
                    titel="Fett, Wasser, Stöße: was der Belag aushalten muss"
                >
                    <Merkliste titelAls="h3" eintraege={REQUIREMENTS.map((r) => ({ titel: r.title, text: r.desc }))} />
                </Abschnitt>

                {/* 3. PLANUNG: vier Ratgeber-Felder im Feldraster (2 Spalten, 2 Zeilen) */}
                <Abschnitt titelId="ku-planung-heading" leitachse spaet etikett="Planung" titel="Reihenfolge, Rückwand und Fugen">
                    <Feldraster spalten={2}>
                        <Karte id="ku-reihenfolge" titel="Vor oder nach der Küchenmontage fliesen?">
                            <p className={TEXT}>
                                <strong className="font-semibold text-tinte">Boden:</strong> Wird er vor der Montage durchgehend gefliest,
                                bleibt die Küche später frei umbaubar, und unter den Schränken gibt es keine Kanten. Wird nur bis zum
                                Sockel gefliest, spart das Material, legt aber den Grundriss fest. Die Höhe des fertigen Belags muss der
                                Küchenplanung bekannt sein.
                            </p>
                            <p className={TEXT}>
                                <strong className="font-semibold text-tinte">Rückwand:</strong> Sie wird meist nach dem Einbau von
                                Unterschränken und Arbeitsplatte gefliest, damit die Fliesen exakt an die Platte anschließen. Ausschnitte
                                für Steckdosen stimmen wir auf die Planung ab. Küchenmontage, Arbeitsplatten sowie Elektro- und
                                Wasseranschlüsse übernehmen Küchenlieferant und Fachbetriebe – wir koordinieren lediglich die Termine.
                            </p>
                        </Karte>
                        <Karte id="ku-rueckwand" titel="Küchenrückwand: Fliesenspiegel, Großformat oder Mosaik">
                            <ul className={`${TEXT} grid gap-3`}>
                                <li>
                                    <strong className="font-semibold text-tinte">Klassischer Fliesenspiegel:</strong> Wandfliesen im
                                    gewünschten Format zwischen Arbeitsplatte und Oberschränken – flexibel in Farbe und Muster.
                                </li>
                                <li>
                                    <strong className="font-semibold text-tinte">Großformat:</strong> Wenige große Platten mit nur einzelnen
                                    Stößen wirken ruhig und sind besonders leicht zu reinigen. Zuschnitt und Ausschnitte werden vorab
                                    geplant.
                                </li>
                                <li>
                                    <strong className="font-semibold text-tinte">Mosaik:</strong> Setzt Akzente, bringt aber viele Fugen mit –
                                    in Herdnähe spricht das für ein besonders widerstandsfähiges Fugenmaterial.
                                </li>
                            </ul>
                        </Karte>
                        <Karte id="ku-fugen" titel="Fugen, die Fett und Reinigern standhalten">
                            <p className={TEXT}>
                                Zementäre Fugenmörtel der Klasse CG2 mit reduzierter Wasseraufnahme sind für die meisten Küchenböden gut
                                geeignet. Wo Fett, Säuren oder intensive Reinigung dauerhaft einwirken, kann Reaktionsharz-Fugenmörtel (RG)
                                die bessere Wahl sein – er ist dicht und chemisch beständiger, aber aufwendiger zu verarbeiten.{' '}
                                <Link href="/fliesen/verlegetechnik" className={linkKlassen}>
                                    Fugenmörtel im Vergleich
                                </Link>
                            </p>
                            <p className={TEXT}>
                                Die Silikonfuge zwischen Arbeitsplatte und Rückwand ist eine Wartungsfuge und sollte bei Bedarf erneuert
                                werden.{' '}
                                <Link href="/fliesen/fugensanierung" className={linkKlassen}>
                                    Fugensanierung
                                </Link>
                            </p>
                        </Karte>
                        <Karte id="ku-uebergang" titel="Übergänge zu offenen Wohnbereichen">
                            <p className={TEXT}>
                                In offenen Grundrissen wirkt ein durchgehender Belag von der Küche bis ins Wohnzimmer besonders großzügig.
                                Dafür planen wir Fugenachsen und Verlegerichtung über beide Bereiche hinweg.{' '}
                                <Link href="/fliesen/verlegemuster" className={linkKlassen}>
                                    Verlegemuster &amp; Fugenachsen
                                </Link>
                            </p>
                            <p className={TEXT}>
                                Trifft die Fliese auf Parkett, Vinyl oder Teppich, entscheiden Aufbauhöhe und Profil über einen sauberen
                                Übergang.{' '}
                                <Link href="/fliesen/flur-diele" className={linkKlassen}>
                                    Übergänge zu anderen Belägen
                                </Link>
                            </p>
                        </Karte>
                    </Feldraster>
                </Abschnitt>

                {/* 4. RUTSCHHEMMUNG & PFLEGE: Heading links, Text rechts auf Fliese */}
                <Abschnitt titelId="ku-pflege-heading" leitachse spaet kopf="seitlich" flaeche="fliese" titel="Rutschhemmung und Pflege im Küchenalltag">
                    <div className="max-w-mass font-text text-fs-3 text-tinte-2">
                        <p>
                            Für private Küchen gibt es keine vorgeschriebene Rutschhemmungsklasse. Eine leicht rutschhemmende Oberfläche,
                            etwa R9 oder R10, ist eine sinnvolle Empfehlung, weil sie trittsicher und trotzdem gut zu reinigen ist.
                            Ermittelt wird die Rutschhemmung heute nach DIN EN 16165. Für gewerbliche Küchen gelten eigene Anforderungen
                            des Arbeitsschutzes.
                        </p>
                        <p className="mt-4">
                            Im Alltag reicht feuchtes Wischen mit einem milden Reiniger. Aggressive oder säurehaltige Mittel können
                            zementäre Fugen angreifen.{' '}
                            <Link href="/blog/rutschfeste-fliesen-r-klassen" className={linkKlassen}>
                                R-Klassen erklärt
                            </Link>{' '}
                            &middot;{' '}
                            <Link href="/blog/fliesen-reinigen-pflegen" className={linkKlassen}>
                                Fliesen reinigen und pflegen
                            </Link>
                        </p>
                    </div>
                </Abschnitt>

                {/* 5. KUNDENSTIMME: die Bewertung als Zitat mit Quelle in Mono */}
                {review && (
                    <Abschnitt aria-label="Kundenstimme" leitachse spaet>
                        <figure className="max-w-mass">
                            <blockquote className="font-anzeige text-fs-4 text-tinte">„{review.text}“</blockquote>
                            <figcaption className="mt-6 font-mono text-fs-1 text-tinte-2">
                                <span className="font-text text-fs-2 font-semibold text-tinte">{review.author}</span>
                                <span> &middot; {review.source}-Rezension &middot; {review.topic}</span>
                            </figcaption>
                        </figure>
                    </Abschnitt>
                )}

                {/* 6. WEITERFÜHRENDE RATGEBER: vier Verweise als Merkliste, darunter „Auch das Bad steht an?“ */}
                <Abschnitt titelId="ku-ratgeber-heading" leitachse spaet titel={<>Weiterführende Ratgeber zu Küchenfliesen &amp; Fliesenspiegeln</>}>
                    <Merkliste
                        spalten={2}
                        eintraege={WEITERLESEN.map((link) => ({
                            titel: (
                                <Link href={link.href} className={linkKlassen}>
                                    {link.label}
                                </Link>
                            ),
                        }))}
                    />
                    <p className="mt-8 max-w-mass font-text text-fs-3 text-tinte-2">
                        Auch das Bad steht an?{' '}
                        <Link href="/bad/fliesen" className={linkKlassen}>
                            Fliesen im Bad
                        </Link>{' '}
                        &middot;{' '}
                        <Link href="/beratung" className={linkKlassen}>
                            Küchenfliesen-Beratung anfragen
                        </Link>
                    </p>
                </Abschnitt>

                {/* 7. KONFIGURATOR: Funnel (nachgeladen) im Raster mit 8 Spalten, rechts die Rückfrage in 4 Spalten (ab lg) */}
                <Abschnitt id="konfigurator" aria-label="Fliesen-Konfigurator" leitachse spaet>
                    <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-12">
                        <div className="min-w-0 lg:col-span-8">
                            <FliesenKonfigurator area="kueche" />
                        </div>
                        <div className="lg:col-span-4">
                            <Rueckfrage />
                        </div>
                    </div>
                </Abschnitt>
            </Leitachse>

            <QualityPromise />

            {/* 8. ABSCHLUSS auf Tinte: Etikett, H2, Vorspann und drei Wege (Aufmaß, Telefon, WhatsApp) */}
            <Abschnitt
                titelId="ku-cta-heading"
                flaeche="tinte"
                spaet
                etikett="Kostenfreies Vor-Ort-Aufmaß"
                titel="Neue Küche geplant?"
                einleitung={
                    <p>
                        Sprechen Sie uns früh an – dann passen Belagshöhe, Rückwand und Termine zur Küchenmontage. Nach dem Aufmaß erhalten
                        Sie ein verbindliches Festpreisangebot.
                    </p>
                }
            >
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <Knopf href="/kontakt" variante="hell">
                        Aufmaß anfragen
                    </Knopf>
                    <Knopf href={`tel:${COMPANY_DATA.contact.phoneLink}`} variante="neben" iconLinks="telefon">
                        <span className="font-mono font-normal">{COMPANY_DATA.contact.phone}</span>
                    </Knopf>
                    <Knopf href={COMPANY_DATA.contact.whatsappLink} extern variante="neben" vorne={<WhatsAppLogo className="size-5 shrink-0" />}>
                        WhatsApp
                    </Knopf>
                </div>
            </Abschnitt>
        </>
    );
}
