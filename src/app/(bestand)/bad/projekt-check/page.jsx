// Bad-Projektcheck (E4-BAU-03, KERN v2): Arbeitsansicht nach dem Muster von (bestand)/kontakt. Kompakter Einstieg mit H1,
// danach der Projektcheck, dann die Qualitätszusagen.
// Texte, Überschriften, Links, IDs und Lesefolge wie im Bestand; keine Auftritte, keine Dekorflächen.
// F-05 (Fusion II, E-039, Gutachten u5 Rezept 1): Der Projektcheck wird auf dem Server gezeichnet (kein Nachladen mit
// Platzhalter, ohne JavaScript sichtbar) und nimmt die volle Inhaltsbreite in section#projekt-check (aria-label bleibt).
// Die Rückfrage „Ansprechpartner“ steht nicht mehr klebend daneben (bei 795 px Bausteinbreite kehrten Überstände zurück),
// sondern als Schriftfeld in voller Breite darunter (als letztes Element ohne Raum zum Kleben). Der Abschnitt liegt im ersten
// Bildschirm, darum ohne spätes Zeichnen.
import Einstieg from '@/components/kern/Einstieg';
import Abschnitt from '@/components/kern/Abschnitt';
import Rueckfrage from '@/components/kern/Rueckfrage';
import BadProjektCheck from '@/components/funnels/BadProjektCheck';
import QualityPromise from '@/components/sections/QualityPromise';
import { createMetadata } from '@/lib/metadata';
import SeitenDaten from '@/components/seo/SeitenDaten';

const TITEL = 'Projektcheck fürs Bad online prüfen | Tezgel Wetzlar';
const BESCHREIBUNG = 'Bad-Projektcheck in 2 Minuten: Kostenfreie Machbarkeitsprüfung & Festpreisangebot für Ihre Badsanierung in Wetzlar & Aßlar. Jetzt online starten!';

const METADATEN = createMetadata({
    title: TITEL,
    description: BESCHREIBUNG,
    path: '/bad/projekt-check'
});

export const metadata = METADATEN;

export default function BadProjektCheckPage() {
    return (
        <>
            <SeitenDaten
                pfad="/bad/projekt-check"
                titel={METADATEN.title.absolute}
                beschreibung={METADATEN.description}
                brotkrumen={[
                    { name: 'Start', href: '/' },
                    { name: 'Bad', href: '/bad' },
                    { name: 'Bad-Projektcheck: Badsanierung online prüfen bei Tezgel Wetzlar' },
                ]}
            />

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

            {/* 2. PROJEKTCHECK: Baustein in voller Breite, darunter die Rückfrage als Schriftfeld in voller Breite (ab lg die
                fünf Felder in einer Zeile: lg:*: setzt das Raster des Schriftfelds, Rueckfrage selbst bleibt unverändert) */}
            <Abschnitt id="projekt-check" aria-label="Bad-Projektcheck" art="arbeit" flaeche="fliese">
                <BadProjektCheck />
                <Rueckfrage className="mt-12 lg:*:grid-cols-5" />
            </Abschnitt>

            {/* 3. ABSCHLUSS: Qualitätsversprechen unverändert eingebunden */}
            <QualityPromise art="arbeit" />
        </>
    );
}
