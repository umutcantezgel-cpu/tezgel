// Badanfrage (E4-BAU-03, KERN v2): Arbeitsansicht nach dem Muster von (bestand)/kontakt. Kompakter Einstieg mit H1,
// danach der nachgeladene Anfrage-Funnel mit der Rückfrage daneben (ab lg 8 + 4 Spalten), dann die Qualitätszusagen.
// Texte, Überschriften, Links, IDs und Lesefolge wie im Bestand; keine Auftritte, keine Dekorflächen.
import dynamic from 'next/dynamic';
import FormularPlatzhalter from '@/components/funnels/TezgelAnfrageFunnel/Platzhalter';
import Einstieg from '@/components/kern/Einstieg';
import Abschnitt from '@/components/kern/Abschnitt';
import Rueckfrage from '@/components/kern/Rueckfrage';
import QualityPromise from '@/components/sections/QualityPromise';
import { createMetadata } from '@/lib/metadata';
import SeitenDaten from '@/components/seo/SeitenDaten';

// Anfrageweg nachladen wie auf der Startseite (TEMPO, Z-08 / E-025)
const BadanfrageFunnel = dynamic(() => import('@/components/funnels/BadanfrageFunnel'), {
    loading: () => <FormularPlatzhalter />,
});

const TITEL = 'Badsanierung Angebot anfordern | Tezgel Wetzlar';
const BESCHREIBUNG = 'Unverbindliche Badanfrage an Fliesenverlegung Tezgel: Beschreiben Sie Ihr Projekt für ein individuelles Festpreisangebot in Wetzlar & Aßlar. Jetzt anfragen!';

const METADATEN = createMetadata({
    title: TITEL,
    description: BESCHREIBUNG,
    path: '/bad/badanfrage'
});

export const metadata = METADATEN;

export default function BadanfragePage() {
    return (
        <>
            <SeitenDaten
                pfad="/bad/badanfrage"
                titel={METADATEN.title.absolute}
                beschreibung={METADATEN.description}
                brotkrumen={[
                    { name: 'Start', href: '/' },
                    { name: 'Bad', href: '/bad' },
                    { name: 'Badsanierung Angebot anfordern bei Tezgel Wetzlar' },
                ]}
            />

            {/* 1. EINSTIEG: Kennzeile, H1, Vorspann */}
            <Einstieg
                art="arbeit"
                etikett={<>Kostenfrei &amp; unverbindlich</>}
                titel={
                    <>
                        Badsanierung Angebot anfordern bei{' '}
                        <span>Tezgel Wetzlar</span>
                    </>
                }
                vorspann={
                    <p>
                        Jetzt unverbindlich Ihr Badsanierung Angebot anfordern: In 5 Schritten Raummaße und Wunschausstattung angeben – Tezgel Wetzlar erstellt Ihr maßgeschneidertes Festpreisangebot.
                    </p>
                }
            />

            {/* 2. ANFRAGE: Funnel (nachgeladen) mit Rückfrage daneben; ab lg 8 + 4 Spalten */}
            <Abschnitt id="anfrage" aria-label="Badanfrage" art="arbeit" flaeche="fliese" spaet>
                <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-12">
                    <div className="min-w-0 lg:col-span-8">
                        <BadanfrageFunnel />
                    </div>
                    <div className="lg:col-span-4">
                        <Rueckfrage />
                    </div>
                </div>
            </Abschnitt>

            {/* 3. ABSCHLUSS: Qualitätsversprechen unverändert eingebunden */}
            <QualityPromise art="arbeit" />
        </>
    );
}
