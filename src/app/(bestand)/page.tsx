// Startseite (KERN v3 K-009, Seitenformel; Text _werkstatt/texte/REF-start.md, E2-ORCH-06): die Erzählseite, an der
// sich alle anderen messen. Sechs Abschnitte in fester Folge, ab dem zweiten an einer Laserlinie (Leitachse): 1 Worum es geht (H1, Ort,
// Hauptknopf, Anruf, WhatsApp, Startbild), 2 Ihre Lage (sechs Fliesen), 3 Was wir tun, 4 So läuft es ab, 5 Beleg
// (Fotos, Stimmen, Orte), 6 Nächster Schritt (das eine Formular, #termin). Preisrechner und Express-Anfrage stehen nicht
// mehr hier, sondern auf ihren übrigen Seiten (E-012, LAGEBILD F-02, F-03); alle Hauptknöpfe dieser Seite führen zu #termin.
// Alles nach dem Einstieg ist eine Suspense-Grenze, also eine eigene Hydrierungseinheit: Ein früher Tipp im ersten Bildschirm
// erzwingt nur den Rahmen und den Einstieg, nicht die ganze Seite in einem Zug (Reaktion, E-033; Next-Doku „Streaming“,
// Abschnitt INP). Eine Grenze statt sieben: React lagert jede große Grenze aus und setzt sie per Skript an ihren Platz, jede
// davon kostet eine Verschiebung mit Layout (Blockierzeit, E-034). Die Inhalte warten auf nichts; bis React die ausgelagerte
// Grenze eingesetzt hat, hält ein Platzhalter von einer Bildschirmhöhe den Fuß unter dem ersten Bildschirm (sonst stand er
// dort kurz und sprang dann weg: CLS 0,07 am Desktop, E-036).
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
            {/* der Einstieg trägt sein eigenes Rot (Waage und Lot, sig-kreuzlinie); die Leitachse beginnt an seinem Fuß, wo das
                Lot des Einstiegs endet, und ihr rotes Stück wächst erst ab dort (vorher stand ab lg bei scrollY 0 ein roter
                Stummel unter dem Kopf neben Waage und Lot, E2-SICHT-2 Befund 3, E3-START-02) */}
            <StartEinstieg />
            <Leitachse>
                <Suspense fallback={<div aria-hidden="true" className="min-h-dvh" />}>
                    <Lagefliesen />
                    <WasWirTun />
                    <StartAblauf />
                    <Arbeiten />
                    <Kundenstimmen />
                    <Einsatzorte />
                    <TerminAnfrage />
                </Suspense>
            </Leitachse>
        </Seitenformel>
    );
}
