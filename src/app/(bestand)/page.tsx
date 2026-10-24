// Startseite (KERN v3 K-009, Seitenformel; Text _werkstatt/texte/REF-start.md, E2-ORCH-06): die Erzählseite, an der
// sich alle anderen messen. Sechs Abschnitte in fester Folge an einer Laserlinie (Leitachse): 1 Worum es geht (H1, Ort,
// Hauptknopf, Anruf, WhatsApp, Startbild), 2 Ihre Lage (sechs Fliesen), 3 Was wir tun, 4 So läuft es ab, 5 Beleg
// (Fotos, Stimmen, Orte), 6 Nächster Schritt (das eine Formular, #termin). Preisrechner und Express-Anfrage stehen nicht
// mehr hier, sondern auf ihren übrigen Seiten (E-012, LAGEBILD F-02, F-03); alle Hauptknöpfe dieser Seite führen zu #termin.
// Jeder Abschnitt nach dem Einstieg ist eine eigene Suspense-Grenze, also eine eigene Hydrierungseinheit: Ein früher Tipp im
// ersten Bildschirm erzwingt nur den Rahmen und den Einstieg, nicht die ganze Seite in einem Zug (Reaktion, E-033; Next-Doku
// „Streaming“, Abschnitt INP). Die Inhalte warten auf nichts, die Grenzen zeigen nie einen Ersatz.
import { Suspense } from 'react';
import type { Metadata } from 'next';
import Leitachse from '@/components/kern/Leitachse';
import Seitenformel from '@/components/kern/Seitenformel';
import StartEinstieg from '@/components/start/StartEinstieg';
import Lagefliesen from '@/components/start/Lagefliesen';
import WasWirTun from '@/components/start/WasWirTun';
import StartAblauf from '@/components/start/StartAblauf';
import { Arbeiten, Einsatzorte, Kundenstimmen } from '@/components/start/StartBeleg';
import TerminAnfrage from '@/components/start/TerminAnfrage';
import { createMetadata } from '@/lib/metadata';

export const metadata: Metadata = createMetadata({
    title: 'Fliesenleger Aßlar und Wetzlar | Fliesenverlegung Tezgel',
    description: 'Fliesenverlegung Tezgel aus Aßlar: Badsanierung, Böden, Balkon und Terrasse für Wetzlar und Umgebung. Der Termin bei Ihnen vor Ort ist kostenfrei.',
    path: '/',
});

export default function HomePage() {
    return (
        <Seitenformel>
            <Leitachse>
                <StartEinstieg />
                <Suspense><Lagefliesen /></Suspense>
                <Suspense><WasWirTun /></Suspense>
                <Suspense><StartAblauf /></Suspense>
                <Suspense><Arbeiten /></Suspense>
                <Suspense><Kundenstimmen /></Suspense>
                <Suspense><Einsatzorte /></Suspense>
                <Suspense><TerminAnfrage /></Suspense>
            </Leitachse>
        </Seitenformel>
    );
}
