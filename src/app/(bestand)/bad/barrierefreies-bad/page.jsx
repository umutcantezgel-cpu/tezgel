// Barrierefreies Bad (E4-BAU-02, KERN v2): Erzählansicht nach dem Muster der Familienreferenz /bad. Einstieg mit Achse, H1 links
// bündig, Vorspann und Knöpfe; rechts das Planblatt „abdichtung“ mit dem Verlegeplan (interaktiv, ohne eigene Achse – das Blatt
// zeigt die rote Achse). Danach die Leitachse über die Abschnitte: Zuschuss (seitlich, auf Fliese), Lösungen als Feldraster mit
// der Kundenstimme, Badanfrage im Raster aus Funnel (8 Spalten) und Rückfrage (4 Spalten, ab lg klebend).
// Der Anfragebereich wird nachgeladen (TEMPO). Wortlaut, Überschriften, Links, IDs und Lesefolge wie im Bestand.
import dynamic from 'next/dynamic';
import FormularPlatzhalter from '@/components/funnels/TezgelAnfrageFunnel/Platzhalter';
import { COMPANY_DATA } from '@/config/company';
import { REVIEWS } from '@/config/reviews';
import { createMetadata } from '@/lib/metadata';
import Icon from '@/components/icons/Icon';
import Einstieg from '@/components/kern/Einstieg';
import Abschnitt from '@/components/kern/Abschnitt';
import Leitachse from '@/components/kern/Leitachse';
import { Feld, Feldraster } from '@/components/kern/Feldraster';
import Knopf from '@/components/kern/Knopf';
import Rueckfrage from '@/components/kern/Rueckfrage';
import Verlegeplan from '@/components/kern/Verlegeplan';
import Planblatt, { planfelder } from '@/components/kern/Planblatt';

// Badanfrage nachladen wie auf der Referenzseite (TEMPO, Z-08 / E-025)
const BadanfrageFunnel = dynamic(() => import('@/components/funnels/BadanfrageFunnel'), {
    loading: () => <FormularPlatzhalter />,
});

export const metadata = createMetadata({
    title: 'Barrierefreies Bad Wetzlar & Aßlar | DIN 18040 Tezgel',
    description: 'Barrierefreie Badsanierung nach DIN 18040-2 in Wetzlar & Aßlar: Bodengleiche Duschen, rutschfeste Fliesen & Pflegekassen-Zuschuss. Jetzt anfragen!',
    path: '/bad/barrierefreies-bad'
});

const SOLUTIONS = [
    { title: 'Bodengleiche Walk-In-Duschen', desc: 'Schwellenloser Einstieg ohne Stolperfallen. Integrierte Duschrinne, rutschhemmende Fliesen (R10B) und breite Glaszugänge.' },
    { title: 'Wanne-zur-Dusche-Umbau', desc: 'Wir tauschen Ihre alte, hohe Badewanne gegen eine moderne, begehbare Duschzone – normgerecht abgedichtet nach DIN 18534.' },
    { title: 'Unterfahrbare Waschtische', desc: 'Ergonomische Waschtischanlagen mit Beinfreiheit für Rollstuhlfahrer und komfortable Einhebel- oder Sensorarmaturen.' },
    { title: 'Komfort- & Dusch-WCs', desc: 'Höhenverstellbare oder erhöhte WCs für bequemes Aufstehen sowie moderne Dusch-WCs für optimale Intimhygiene auf Knopfdruck.' },
    { title: 'Design-Haltegriffsysteme', desc: 'Stabile, geprüfte Stützklappgriffe und Duschhandläufe, die sich harmonisch in modernes Baddesign einfügen.' },
    { title: 'Rutschhemmung & Beleuchtung', desc: 'Sichere Bodenbeläge, blendfreie LED-Beleuchtung mit Orientierungslicht und schwellenlose Bewegungsflächen.' }
];

export default function BarrierefreiesBadPage() {
    const review = REVIEWS.find((r) => r.id === 'ute-t');

    return (
        <>
            {/* 1. EINSTIEG: Kennzeile, H1 auf der Achse, Vorspann, Knöpfe; rechts das Planblatt „abdichtung“ */}
            <section aria-labelledby="barrierefrei-heading">
                <Einstieg
                    art="erzaehl"
                    etikett="DIN 18040-2 · Barrierefreies Wohnen"
                    titel={
                        <span id="barrierefrei-heading">
                            <span className="block">Barrierefreie Badmodernisierung in Aßlar &amp; Wetzlar:</span>{' '}
                            <span className="block">Sicherheit, Komfort &amp; bis zu 4.180 € Zuschuss</span>
                        </span>
                    }
                    vorspann={
                        <p>
                            Eine barrierefreie Badmodernisierung und Badsanierung nach DIN 18040-2 durch Fachbetrieb Tezgel in Aßlar &amp; Wetzlar schenkt Sicherheit, Komfort und Selbstbestimmung im eigenen Zuhause. Wir gestalten Ihr Badezimmer altersgerecht, rollstuhlgerecht oder barrierearm – mit bodengleichen Duschen, rutschfesten Böden und bis zu 4.180 € Zuschuss der Pflegekasse.
                        </p>
                    }
                    aktionen={
                        <>
                            <Knopf href="/kontakt" icon="pfeil-rechts">Pflegekassen-Beratung vereinbaren</Knopf>
                            <Knopf href={`tel:${COMPANY_DATA.contact.phoneLink}`} variante="neben" iconLinks="telefon">
                                {COMPANY_DATA.contact.phone}
                            </Knopf>
                        </>
                    }
                    rand={
                        <Planblatt felder={planfelder('Barrierefreies Bad', 'abdichtung')}>
                            <Verlegeplan plan="abdichtung" ohneAchse bemassung={false} interaktiv />
                        </Planblatt>
                    }
                />
            </section>

            {/* LEITACHSE: das Lot setzt die Achse des Einstiegs über die Abschnitte fort */}
            <Leitachse>
                {/* 2. ZUSCHUSS auf Fliese: Kennzeile und Überschrift links, Text und Knopf rechts */}
                <Abschnitt
                    titelId="zuschuss-heading"
                    flaeche="fliese"
                    kopf="seitlich"
                    leitachse
                    spaet
                    etikett="Zuschuss für wohnumfeldverbessernde Maßnahmen (§ 40 SGB XI)"
                    titel="Bis zu 4.180 € Zuschuss von der Pflegekasse"
                >
                    <p className="max-w-mass font-text text-fs-3 text-tinte-2">
                        Bereits ab Pflegegrad 1 bezuschusst die Pflegekasse den Umbau auf ein barrierefreies Bad mit bis zu 4.180 € pro Person (bei Ehepaaren mit Pflegegrad sogar bis zu 8.360 €). Wir erstellen für Sie den förderkonformen Kostenvoranschlag.
                    </p>
                    <div className="mt-8">
                        <Knopf href="/kontakt" icon="pfeil-rechts">Beratung anfordern</Knopf>
                    </div>
                </Abschnitt>

                {/* 3. BARRIEREFREIE LÖSUNGEN als Feldraster: je Lösung ein Feld; darunter die Kundenstimme */}
                <Abschnitt
                    titelId="loesungen-heading"
                    leitachse
                    spaet
                    etikett="Barrierefreie Lösungen"
                    titel={
                        <>
                            Unsere barrierefreien Bad-Lösungen{' '}
                            <span>im Detail</span>
                        </>
                    }
                    einleitung={<p>Ästhetik trifft auf maximale Sicherheit – ohne sterilen Krankenhaus-Charakter.</p>}
                >
                    <Feldraster spalten={3}>
                        {SOLUTIONS.map((item) => (
                            <Feld key={item.title}>
                                <h3 className="font-text text-fs-4 font-semibold text-tinte">{item.title}</h3>
                                <p className="mt-3 font-text text-fs-2 text-tinte-2">{item.desc}</p>
                            </Feld>
                        ))}
                    </Feldraster>

                    {review && (
                        <figure className="mt-12 max-w-mass border-l-2 border-laser-tief pl-6 sm:pl-8">
                            <span className="flex items-center gap-1 text-tinte" aria-label={`${review.rating} von 5 Sternen`}>
                                {Array.from({ length: review.rating }, (_, i) => (
                                    <Icon key={i} name="stern-voll" groesse={4} />
                                ))}
                            </span>
                            <blockquote className="mt-4 font-text text-fs-4 text-tinte">„{review.text}“</blockquote>
                            <figcaption className="mt-4 font-text text-fs-2 text-tinte">
                                <span className="font-semibold">{review.author}</span>
                                <span className="font-mono text-fs-1 text-tinte-2"> &middot; {review.source}-Rezension &middot; {review.topic}</span>
                            </figcaption>
                        </figure>
                    )}
                </Abschnitt>

                {/* 4. BADANFRAGE auf Fliese: Funnel und Rückfrage im selben Raster (Bereich „Badanfrage“, Anker #anfrage) */}
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
