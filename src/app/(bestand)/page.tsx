// Startseite (KERN v3 K-009, Seitenformel; Text _werkstatt/texte/REF-start.md, E2-ORCH-06): die Erzählseite, an der
// sich alle anderen messen. Sechs Abschnitte in fester Folge an einer Laserlinie (Leitachse): 1 Worum es geht (H1, Ort,
// Hauptknopf, Anruf, WhatsApp, Startbild), 2 Ihre Lage (sechs Fliesen), 3 Was wir tun, 4 So läuft es ab, 5 Beleg
// (Fotos, Stimmen, Orte), 6 Nächster Schritt (das eine Formular, #termin). Preisrechner und Express-Anfrage stehen nicht
// mehr hier, sondern auf ihren übrigen Seiten (E-012, LAGEBILD F-02, F-03); alle Hauptknöpfe dieser Seite führen zu #termin.
import type { Metadata } from 'next';
import Abschnitt from '@/components/kern/Abschnitt';
import Leitachse from '@/components/kern/Leitachse';
import Schrittfolge from '@/components/kern/Schrittfolge';
import Seitenformel from '@/components/kern/Seitenformel';
import StartEinstieg from '@/components/start/StartEinstieg';
import Lagefliesen from '@/components/start/Lagefliesen';
import WasWirTun from '@/components/start/WasWirTun';
import { Arbeiten, Einsatzorte, Kundenstimmen } from '@/components/start/StartBeleg';
import TerminAnfrage from '@/components/start/TerminAnfrage';
import { createMetadata } from '@/lib/metadata';

export const metadata: Metadata = createMetadata({
    title: 'Fliesenleger Aßlar und Wetzlar | Fliesenverlegung Tezgel',
    description: 'Fliesenverlegung Tezgel aus Aßlar: Badsanierung, Böden, Balkon und Terrasse für Wetzlar und Umgebung. Der Termin bei Ihnen vor Ort ist kostenfrei.',
    path: '/',
});

const SCHRITTE = [
    {
        titel: 'Termin bei Ihnen vor Ort',
        text: 'Deniz Tezgel kommt zu Ihnen. Er schaut sich den Raum genau an und prüft den Untergrund. Dieser Termin ist für Sie kostenfrei.',
    },
    {
        titel: 'Planen und auswählen',
        text: 'Sie suchen mit uns Fliesen, ihre Größe und die Farbe der Fugen aus. Danach bekommen Sie ein Angebot mit festem Preis.',
    },
    {
        titel: 'Verlegen und übergeben',
        text: 'Wir verlegen sauber und übergeben den Raum besenrein. Zum Schluss gehen wir alles gemeinsam durch.',
    },
];

export default function HomePage() {
    return (
        <Seitenformel>
            <Leitachse>
                <StartEinstieg />
                <Lagefliesen />
                <WasWirTun />
                <Abschnitt id="ablauf" formel="ablauf" leitachse flaeche="fliese" titel="So kommen Sie zu Ihrem neuen Boden.">
                    <Schrittfolge schritte={SCHRITTE} ausrichtung="waagrecht" />
                </Abschnitt>
                <Arbeiten />
                <Kundenstimmen />
                <Einsatzorte />
                <TerminAnfrage />
            </Leitachse>
        </Seitenformel>
    );
}
