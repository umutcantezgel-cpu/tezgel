// Bad-Projektcheck (E4-BAU-03, KERN v2): Arbeitsansicht nach dem Muster von (bestand)/kontakt. Kompakter Einstieg mit H1,
// danach der nachgeladene Projektcheck mit der Rückfrage daneben (ab lg 8 + 4 Spalten), dann die Qualitätszusagen.
// Texte, Überschriften, Links, IDs und Lesefolge wie im Bestand; keine Auftritte, keine Dekorflächen.
import dynamic from 'next/dynamic';
import Einstieg from '@/components/kern/Einstieg';
import Abschnitt from '@/components/kern/Abschnitt';
import Rueckfrage from '@/components/kern/Rueckfrage';
import QualityPromise from '@/components/sections/QualityPromise';
import { createMetadata } from '@/lib/metadata';

// Projektcheck nachladen wie auf der Startseite (TEMPO, Z-08 / E-025)
const BadProjektCheck = dynamic(() => import('@/components/funnels/BadProjektCheck'), {
    loading: () => <p className="py-12 font-mono text-fs-1 text-tinte-2">Anfrageformular wird geladen...</p>,
});

export const metadata = createMetadata({
    title: 'Bad-Projektcheck: Badsanierung prüfen | Tezgel Wetzlar',
    description: 'Bad-Projektcheck in 2 Minuten: Kostenfreie Machbarkeitsprüfung & Festpreisangebot für Ihre Badsanierung in Wetzlar & Aßlar. Jetzt online starten!',
    path: '/bad/projekt-check'
});

export default function BadProjektCheckPage() {
    return (
        <>
            {/* 1. EINSTIEG: Kennzeile, H1, Vorspann */}
            <Einstieg
                art="arbeit"
                etikett={<>Bad-Projektcheck</>}
                titel={
                    <>
                        Bad-Projektcheck: Badsanierung online prüfen bei{' '}
                        <span>Tezgel Wetzlar</span>
                    </>
                }
                vorspann={
                    <p>
                        Nutzen Sie den Bad-Projektcheck von Tezgel Wetzlar: Badsanierung in 2 Minuten online prüfen, Größe, Umfang und
                        Ausstattung auswählen – den verbindlichen Festpreis erhalten Sie nach dem kostenfreien Vor-Ort-Aufmaß.
                    </p>
                }
            />

            {/* 2. PROJEKTCHECK: Funnel (nachgeladen) mit Rückfrage daneben; ab lg 8 + 4 Spalten */}
            <Abschnitt id="projekt-check" aria-label="Bad-Projektcheck" art="arbeit" flaeche="fliese" spaet>
                <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-12">
                    <div className="min-w-0 lg:col-span-8">
                        <BadProjektCheck />
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
