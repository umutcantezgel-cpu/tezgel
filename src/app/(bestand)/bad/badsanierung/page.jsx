// Badsanierung (E4-BAU-01, KERN v2): Erzählansicht nach dem Muster der Familienreferenz (bestand/bad/page.jsx).
// Einstieg mit Achse, H1 links bündig, Vorspann, Knöpfe; rechts das Planblatt „badsanierung“ mit dem Verlegeplan
// (interaktiv, ohne Bemaßung). Danach die Leitachse über die Abschnitte: der Ablauf in sechs Schritten als Schrittfolge
// mit der Kundenstimme, das Qualitätsversprechen, die Badanfrage mit Rückfrage in EINEM Abschnitt auf Fliese.
// Die Anfrage wird nachgeladen (TEMPO). Wortlaut, Überschriften, Links, IDs und Lesefolge wie im Bestand.
import dynamic from 'next/dynamic';
import { COMPANY_DATA } from '@/config/company';
import { REVIEWS } from '@/config/reviews';
import Icon from '@/components/icons/Icon';
import QualityPromise from '@/components/sections/QualityPromise';
import { createMetadata } from '@/lib/metadata';
import Einstieg from '@/components/kern/Einstieg';
import Abschnitt from '@/components/kern/Abschnitt';
import Leitachse from '@/components/kern/Leitachse';
import Schrittfolge from '@/components/kern/Schrittfolge';
import Knopf from '@/components/kern/Knopf';
import Rueckfrage from '@/components/kern/Rueckfrage';
import Verlegeplan from '@/components/kern/Verlegeplan';
import Planblatt, { planfelder } from '@/components/kern/Planblatt';

// Anfrageformular nachladen wie auf der Startseite und in der Familienreferenz (TEMPO, Z-08 / E-025)
const BadanfrageFunnel = dynamic(() => import('@/components/funnels/BadanfrageFunnel'), {
    loading: () => <p className="py-12 font-mono text-fs-1 text-tinte-2">Anfrageformular wird geladen...</p>,
});

export const metadata = createMetadata({
    title: 'Badsanierung Wetzlar & Aßlar | Komplettbäder Tezgel',
    description: 'Komplette Badsanierung in Wetzlar & Aßlar: Demontage bis Fuge, Walk-In Dusche, Großformate & Verbundabdichtung. Festpreisangebot vom Fachbetrieb Tezgel!',
    path: '/bad/badsanierung'
});

const WORKFLOW_STEPS = [
    { step: '01', title: 'Vor-Ort-Beratung & Aufmaß', desc: 'Wir messen Ihr bestehendes Bad millimetergenau aus und erfassen Ihre Wünsche, Lebensgewohnheiten und Ihr Budget.' },
    { step: '02', title: 'Badplanung & Materialauswahl', desc: 'Gemeinsame Planung von Aufteilung, Fliesenformat und Fugenbild sowie Auswahl von Keramik, Armaturen, Fliesen und Beleuchtung.' },
    { step: '03', title: 'Verbindliches Festpreisangebot', desc: 'Sie erhalten ein detailliertes Angebot mit Festpreisgarantie und einem verbindlichen Bauzeitplan ohne versteckte Kosten.' },
    { step: '04', title: 'Staubarme Demontage', desc: 'Luftreiniger, Staubschutzwände und Schutzvliese verhindern die Staubausbreitung in Ihren Wohnräumen beim Rückbau der alten Installationen.' },
    { step: '05', title: 'Abdichtung & Fachverlegung', desc: 'Normgerechte Verbundabdichtung nach DIN 18534 und millimetergenaue Fliesenverlegung – Sanitär-, Trockenbau- und Elektroarbeiten werden im Bauablauf eng abgestimmt.' },
    { step: '06', title: 'Endreinigung & Abnahme', desc: 'Besenreine Endreinigung, Funktionsprüfung aller Elemente, Hinweise zur Pflege und gemeinsame Abnahme Ihres neuen Bades.' }
];

export default function BadsanierungPage() {
    const review = REVIEWS.find((r) => r.id === 'c-wolf');

    return (
        <>
            {/* 1. EINSTIEG: Kennzeile, H1 auf der Achse, Vorspann, Knöpfe; rechts der Plan ohne Bemaßung */}
            <section aria-labelledby="badsanierung-heading">
                <Einstieg
                    art="erzaehl"
                    etikett={<>HWK Fachbetrieb &middot; {COMPANY_DATA.authority.shortName}</>}
                    titel={
                        <span id="badsanierung-heading">
                            Badsanierung in Aßlar &amp; Wetzlar:{' '}
                            <span className="block">Ihr neues Traumbad ohne Stress &amp; zum Festpreis</span>
                        </span>
                    }
                    vorspann={
                        <p>
                            Ihre professionelle Badsanierung in Aßlar &amp; Wetzlar: Als spezialisierter Fachbetrieb Tezgel realisieren wir schlüsselfertige Komplettbäder und Ihr neues Traumbad ohne Stress zum verbindlichen Festpreis. Wir verwandeln alte Bäder in moderne Wohlfühloasen – mit persönlicher Betreuung durch {COMPANY_DATA.owner.fullName} und konsequentem Staubschutz.
                        </p>
                    }
                    aktionen={
                        <>
                            <Knopf href="/bad/projekt-check" icon="pfeil-rechts">Bad-Projektcheck starten</Knopf>
                            <Knopf href={`tel:${COMPANY_DATA.contact.phoneLink}`} variante="neben" iconLinks="telefon">
                                {COMPANY_DATA.contact.phone}
                            </Knopf>
                        </>
                    }
                    rand={
                        <Planblatt felder={planfelder('Badsanierung Wetzlar & Aßlar', 'badsanierung')}>
                            <Verlegeplan plan="badsanierung" ohneAchse bemassung={false} interaktiv />
                        </Planblatt>
                    }
                />
            </section>

            {/* LEITACHSE: das Lot setzt die Achse des Einstiegs über die Abschnitte fort */}
            <Leitachse>
                {/* 2. ABLAUF in sechs Schritten (Schrittfolge), darunter die Kundenstimme */}
                <Abschnitt
                    titelId="workflow-heading"
                    flaeche="fliese"
                    kopf="seitlich"
                    leitachse
                    spaet
                    etikett="Der Weg zum neuen Bad"
                    titel={
                        <>
                            In 6 Schritten zu Ihrem{' '}
                            <span>schlüsselfertigen Wohlfühlbad</span>
                        </>
                    }
                    einleitung={
                        <p>
                            Abgestimmte Gewerke und persönliche Betreuung durch {COMPANY_DATA.owner.fullName}. Sie lehnen sich entspannt zurück.
                        </p>
                    }
                >
                    <Schrittfolge
                        schritte={WORKFLOW_STEPS.map((st) => ({
                            nummer: st.step,
                            titel: (
                                <>
                                    <span className="sr-only">Schritt {st.step}: </span>
                                    {st.title}
                                </>
                            ),
                            text: st.desc,
                        }))}
                    />

                    {review && (
                        <figure className="mt-16 max-w-mass border-t border-fuge pt-12">
                            <span className="flex items-center gap-px text-tinte" aria-label={`${review.rating} von 5 Sternen`}>
                                {Array.from({ length: review.rating }, (_, i) => (
                                    <Icon key={i} name="stern-voll" groesse={4} />
                                ))}
                            </span>
                            <blockquote className="mt-6 font-anzeige text-fs-4 text-tinte">„{review.text}“</blockquote>
                            <figcaption className="mt-4 font-text text-fs-2 text-tinte">
                                <span className="font-semibold">{review.author}</span>
                                <span className="font-mono text-fs-1 text-tinte-2"> &middot; {review.source}-Rezension &middot; {review.topic}</span>
                            </figcaption>
                            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                                <Knopf href="/referenzen" variante="neben" icon="pfeil-rechts">Alle Bewertungen</Knopf>
                                <Knopf href="/kontakt">Aufmaß anfragen</Knopf>
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
