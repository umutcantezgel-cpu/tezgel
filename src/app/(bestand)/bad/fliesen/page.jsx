// Badfliesen (E4-BAU-02, KERN v2): Erzählansicht nach dem Muster der Familienreferenz /bad. Einstieg mit Achse, H1 links
// bündig, Vorspann und Knöpfe; rechts das Planblatt „grossformat“ mit dem Verlegeplan (interaktiv, ohne eigene Achse – das Blatt
// zeigt die rote Achse). Danach die Leitachse über die Abschnitte: Merkmale als Feldraster, Ablauf als Schrittfolge, die
// Kundenstimme, Badanfrage im Raster aus Funnel (8 Spalten) und Rückfrage (4 Spalten, ab lg klebend).
// Der Anfragebereich wird nachgeladen (TEMPO). Wortlaut, Überschriften, Links, IDs und Lesefolge wie im Bestand.
import dynamic from 'next/dynamic';
import FormularPlatzhalter from '@/components/funnels/TezgelAnfrageFunnel/Platzhalter';
import { COMPANY_DATA, processSteps } from '@/config/company';
import { REVIEWS } from '@/config/reviews';
import { createMetadata } from '@/lib/metadata';
import Icon from '@/components/icons/Icon';
import Einstieg from '@/components/kern/Einstieg';
import Abschnitt from '@/components/kern/Abschnitt';
import Leitachse from '@/components/kern/Leitachse';
import { Feld, Feldraster } from '@/components/kern/Feldraster';
import Knopf from '@/components/kern/Knopf';
import Rueckfrage from '@/components/kern/Rueckfrage';
import Schrittfolge from '@/components/kern/Schrittfolge';
import Verlegeplan from '@/components/kern/Verlegeplan';
import Planblatt, { planfelder } from '@/components/kern/Planblatt';

// Badanfrage nachladen wie auf der Referenzseite (TEMPO, Z-08 / E-025)
const BadanfrageFunnel = dynamic(() => import('@/components/funnels/BadanfrageFunnel'), {
    loading: () => <FormularPlatzhalter />,
});

export const metadata = createMetadata({
    title: 'Badfliesen & XXL-Großformate | Fliesenleger Tezgel',
    description: 'Badfliesen & XXL-Großformate fugenarm verlegen in Wetzlar & Aßlar: Feinsteinzeug, Mosaik & DIN 18534 Abdichtung. Jetzt unverbindlich beraten lassen!',
    path: '/bad/fliesen'
});

const TILE_FEATURES = [
    { title: 'XXL-Großformatfliesen', desc: 'Fliesen bis 120 x 278 cm für moderne, fugenarme Wandflächen mit minimalem Pflegeaufwand und großzügiger Raumwirkung.' },
    { title: 'Verbundabdichtung nach DIN 18534', desc: 'Normgerechte Abdichtung im Dusch- und Wannenbereich schützt Mauerwerk und Bausubstanz dauerhaft vor Durchfeuchtung.' },
    { title: 'Rutschhemmung R10 / R11', desc: 'Sichere Bodenfliesen im Nassbereich für barrierefreie Bäder nach DIN 18040-2 zur Vermeidung von Ausrutschunfällen.' },
    { title: 'Feinsteinzeug & Naturstein', desc: 'Robuste, kratzfeste und pflegeleichte Materialien in edler Beton-, Holz-, Marmor- oder Schieferoptik.' },
    { title: 'Filigrane Mosaike & Nischen', desc: 'Individuell beleuchtete Shampoonischen, Wandablagen und akzentuierte Duschbereiche mit Mosaikfliesen.' },
    { title: 'Abgestimmte Gewerke', desc: 'Keine Fugenabrisse oder Schnittstellenprobleme: Fliesenarbeiten und Sanitärinstallation werden eng aufeinander abgestimmt.' }
];

export default function FliesenPage() {
    const review = REVIEWS.find((r) => r.id === 'elke-s');

    return (
        <>
            {/* 1. EINSTIEG: Kennzeile, H1 auf der Achse, Vorspann, Knöpfe; rechts das Planblatt „grossformat“ */}
            <section aria-labelledby="fliesen-heading">
                <Einstieg
                    art="erzaehl"
                    etikett="Fliesen- & Natursteinhandwerk · Aßlar & Wetzlar"
                    titel={
                        <span id="fliesen-heading">
                            Perfekte Fliesenverlegung{' '}
                            <span>für Ihr neues Badezimmer</span>
                        </span>
                    }
                    vorspann={
                        <p>
                            Perfekte Fliesenverlegung für Ihr neues Badezimmer: Als Fachbetrieb für Badfliesen &amp; XXL-Großformate verlegt Fliesen Tezgel in Aßlar und Wetzlar großformatige Fliesen, fugenarme Wandkonzepte, edlen Naturstein und rutschhemmende Mosaike – millimetergenau verlegt und fachgerecht abgedichtet nach DIN 18534.
                        </p>
                    }
                    aktionen={
                        <>
                            <Knopf href="/kontakt" icon="pfeil-rechts">Beratung &amp; Aufmaß anfragen</Knopf>
                            <Knopf href={`tel:${COMPANY_DATA.contact.phoneLink}`} variante="neben" iconLinks="telefon">
                                {COMPANY_DATA.contact.phone}
                            </Knopf>
                        </>
                    }
                    rand={
                        <Planblatt felder={planfelder('Badfliesen & XXL-Großformate', 'grossformat')}>
                            <Verlegeplan plan="grossformat" ohneAchse bemassung={false} interaktiv />
                        </Planblatt>
                    }
                />
            </section>

            {/* LEITACHSE: das Lot setzt die Achse des Einstiegs über die Abschnitte fort */}
            <Leitachse>
                {/* 2. FORMATE, MATERIALIEN & DETAILS als Feldraster: je Merkmal ein Feld */}
                <Abschnitt
                    titelId="fliesen-features-heading"
                    leitachse
                    spaet
                    etikett="Fliesen im Bad"
                    titel={
                        <>
                            Formate, Materialien &amp; Details{' '}
                            <span>in Fachqualität</span>
                        </>
                    }
                >
                    <Feldraster spalten={3}>
                        {TILE_FEATURES.map((item) => (
                            <Feld key={item.title}>
                                <h3 className="font-text text-fs-4 font-semibold text-tinte">{item.title}</h3>
                                <p className="mt-3 font-text text-fs-2 text-tinte-2">{item.desc}</p>
                            </Feld>
                        ))}
                    </Feldraster>
                </Abschnitt>

                {/* 3. ABLAUF auf Fliese: Schrittfolge in drei Schritten (ab lg waagrecht) */}
                <Abschnitt
                    titelId="fliesen-ablauf-heading"
                    flaeche="fliese"
                    leitachse
                    spaet
                    etikett="Transparenter Ablauf"
                    titel="In 3 Schritten zum neuen Fliesenbelag"
                    einleitung={
                        <p>
                            Von der ersten Begutachtung bis zur sauberen Abnahme durch {COMPANY_DATA.owner.fullName} persönlich.
                        </p>
                    }
                >
                    <Schrittfolge
                        ausrichtung="waagrecht"
                        untertitelOben
                        schritte={processSteps.map((stepItem) => ({
                            nummer: stepItem.step,
                            untertitel: stepItem.subtitle,
                            titel: stepItem.title,
                            text: stepItem.description,
                        }))}
                    />
                </Abschnitt>

                {/* 4. KUNDENSTIMME: eine Bewertung, Quelle in Mono, Link zu allen Bewertungen */}
                {review && (
                    <Abschnitt aria-label="Kundenstimme" breite="mass" leitachse spaet>
                        <figure className="border-l-2 border-laser-tief pl-6 sm:pl-8">
                            <span role="img" className="flex items-center gap-1 text-tinte" aria-label={`${review.rating} von 5 Sternen`}>
                                {Array.from({ length: review.rating }, (_, i) => (
                                    <Icon key={i} name="stern-voll" groesse={4} />
                                ))}
                            </span>
                            <blockquote className="mt-4 font-text text-fs-4 text-tinte">„{review.text}“</blockquote>
                            <figcaption className="mt-4 font-text text-fs-2 text-tinte">
                                <span className="font-semibold">{review.author}</span>
                                <span className="font-mono text-fs-1 text-tinte-2"> &middot; {review.source}-Rezension &middot; {review.topic}</span>
                            </figcaption>
                            <div className="mt-8">
                                <Knopf href="/referenzen" variante="text" icon="pfeil-rechts">Alle Kundenbewertungen ansehen</Knopf>
                            </div>
                        </figure>
                    </Abschnitt>
                )}

                {/* 5. BADANFRAGE auf Fliese: Funnel und Rückfrage im selben Raster (Bereich „Badanfrage“, Anker #anfrage) */}
                <Abschnitt id="anfrage" aria-label="Badanfrage" flaeche="fliese" leitachse spaet>
                    <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-12">
                        <div className="min-w-0 lg:col-span-8">
                            <BadanfrageFunnel />
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
