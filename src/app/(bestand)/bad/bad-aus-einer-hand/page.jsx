// Bad aus einer Hand (E4-BAU-01, KERN v2): Erzählansicht nach dem Muster der Familienreferenz (bestand/bad/page.jsx).
// Einstieg mit Achse, H1 links bündig, Vorspann, Knöpfe; rechts das Planblatt „bad“ mit dem Verlegeplan (interaktiv,
// ohne Bemaßung). Danach die Leitachse über die Abschnitte: die Vorteile als Feldraster mit der Kundenstimme, das
// Qualitätsversprechen, die Badanfrage mit Rückfrage in EINEM Abschnitt auf Fliese.
// Die Anfrage wird nachgeladen (TEMPO). Wortlaut, Überschriften, Links, IDs und Lesefolge wie im Bestand.
import dynamic from 'next/dynamic';
import FormularPlatzhalter from '@/components/funnels/TezgelAnfrageFunnel/Platzhalter';
import { COMPANY_DATA } from '@/config/company';
import { RATING_SUMMARY, REVIEWS } from '@/config/reviews';
import Icon from '@/components/icons/Icon';
import QualityPromise from '@/components/sections/QualityPromise';
import { createMetadata } from '@/lib/metadata';
import Einstieg from '@/components/kern/Einstieg';
import Abschnitt from '@/components/kern/Abschnitt';
import Leitachse from '@/components/kern/Leitachse';
import { Feld, Feldraster } from '@/components/kern/Feldraster';
import Knopf from '@/components/kern/Knopf';
import Rueckfrage from '@/components/kern/Rueckfrage';
import Verlegeplan from '@/components/kern/Verlegeplan';
import Planblatt, { planfelder } from '@/components/kern/Planblatt';

// Anfrageformular nachladen wie auf der Startseite und in der Familienreferenz (TEMPO, Z-08 / E-025)
const BadanfrageFunnel = dynamic(() => import('@/components/funnels/BadanfrageFunnel'), {
    loading: () => <FormularPlatzhalter />,
});

export const metadata = createMetadata({
    title: 'Bad aus einer Hand Wetzlar & Aßlar | Tezgel Badsanierung',
    description: 'Bad aus einer Hand in Wetzlar & Aßlar: Alle Gewerke koordiniert, ein Ansprechpartner & garantierter Festpreis. Jetzt kostenfreies Vor-Ort-Aufmaß sichern!',
    path: '/bad/bad-aus-einer-hand'
});

export default function BadAusEinerHandPage() {
    const google = RATING_SUMMARY.google;
    const review = REVIEWS.find((r) => r.id === 'thorsten-a');

    const benefits = [
        { title: 'Ein fester Fach-Ansprechpartner', desc: `Sie müssen nicht mit fünf verschiedenen Firmen telefonieren. ${COMPANY_DATA.owner.fullName} betreut Sie persönlich von A bis Z.` },
        { title: 'Verbindlicher Festpreis', desc: 'Transparente Gesamtkalkulation aller Gewerke ohne versteckte Kosten oder böse Überraschungen.' },
        { title: 'Verlässlicher Bauzeitplan', desc: 'Feste Zusagen für Baustart und Fertigstellung – damit Ihr Alltag planbar bleibt.' },
        { title: 'Staubarme Ausführung', desc: 'Einsatz von Staubschutzwänden, Luftreinigern und Schonabdeckungen für saubere Wohnräume.' }
    ];

    return (
        <>
            {/* 1. EINSTIEG: Kennzeile, H1 auf der Achse, Vorspann, Knöpfe; rechts der Plan ohne Bemaßung */}
            <section aria-labelledby="einer-hand-heading">
                <Einstieg
                    art="erzaehl"
                    etikett={<>Rundum-Sorglos-Service &middot; Aßlar &amp; Wetzlar</>}
                    titel={
                        <span id="einer-hand-heading">
                            Bad aus einer Hand:{' '}
                            <span className="block">Ein Ansprechpartner. Ein Festpreis. Null Stress.</span>
                        </span>
                    }
                    vorspann={
                        <p>
                            Ihr schlüsselfertiges Bad aus einer Hand in Aßlar &amp; Wetzlar: Als spezialisierter Fachbetrieb Tezgel garantieren wir Ihnen einen Ansprechpartner, einen Festpreis und termingerechte Fertigstellung mit null Stress. Kein Ärger mit Gewerken – wir koordinieren Sanitär, Fliesen, Elektrik und Trockenbau bis zur schlüsselfertigen Übergabe.
                        </p>
                    }
                    aktionen={
                        <>
                            <Knopf href="/bad/projekt-check" icon="pfeil-rechts">Bad-Projektcheck starten</Knopf>
                            <Knopf href="/kontakt" variante="neben">Beratungstermin anfragen</Knopf>
                        </>
                    }
                    rand={
                        <Planblatt felder={planfelder('Bad aus einer Hand Wetzlar & Aßlar', 'bad')}>
                            <Verlegeplan plan="bad" ohneAchse bemassung={false} interaktiv />
                        </Planblatt>
                    }
                />
            </section>

            {/* LEITACHSE: das Lot setzt die Achse des Einstiegs über die Abschnitte fort */}
            <Leitachse>
                {/* 2. VORTEILE als Feldraster (vier Felder), darunter die Kundenstimme */}
                <Abschnitt
                    titelId="vorteile-heading"
                    flaeche="fliese"
                    leitachse
                    spaet
                    etikett={<>{google.displayRating} &middot; {google.count} {google.label}</>}
                    titel={
                        <>
                            Ihre Vorteile mit unserem{' '}
                            <span>Komplettbad-Service</span>
                        </>
                    }
                    einleitung={
                        <p>
                            Persönlich, termintreu und sauber – so arbeitet unser Fachbetrieb aus Aßlar in Wetzlar, Gießen und ganz Mittelhessen.
                        </p>
                    }
                >
                    <Feldraster spalten={4}>
                        {benefits.map((b) => (
                            <Feld key={b.title}>
                                <h3 className="font-anzeige text-fs-4 font-semibold text-tinte">{b.title}</h3>
                                <p className="mt-3 font-text text-fs-2 text-tinte-2">{b.desc}</p>
                            </Feld>
                        ))}
                    </Feldraster>

                    {review && (
                        <figure className="mt-16 max-w-mass border-t border-fuge pt-12">
                            <span role="img" className="flex items-center gap-px text-tinte" aria-label={`${review.rating} von 5 Sternen`}>
                                {Array.from({ length: review.rating }, (_, i) => (
                                    <Icon key={i} name="stern-voll" groesse={4} />
                                ))}
                            </span>
                            <blockquote className="mt-6 font-anzeige text-fs-4 text-tinte">„{review.text}“</blockquote>
                            <figcaption className="mt-4 font-text text-fs-2 text-tinte">
                                <span className="font-semibold">{review.author}</span>
                                <span className="font-mono text-fs-1 text-tinte-2"> &middot; {review.source}-Rezension &middot; {review.topic}</span>
                            </figcaption>
                            <div className="mt-8">
                                <Knopf href="/referenzen" variante="text" icon="pfeil-rechts">Alle Kundenbewertungen ansehen</Knopf>
                            </div>
                        </figure>
                    )}
                </Abschnitt>

                {/* 3. QUALITÄTSVERSPRECHEN (bestehende Komponente, unverändert eingebunden) */}
                <QualityPromise />

                {/* 4. ANFRAGE: Badanfrage (8 Spalten) und Rückfrage (4 Spalten, ab lg klebend) */}
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
