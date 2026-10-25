// Balkon und Terrasse (E3-BAU-06, KERN v3.6, K-016 „Ruhe“, E-047): Erzählseite auf der Vorlage ErzaehlSeite. Inhalt in
// `src/inhalte/balkon-terrasse.ts`, Metadaten aus dem Inhalt, der große Moment `gefaelle-balkon` an seinem Platz
// (momente.tun). Strukturierte Daten (WebPage, Brotkrumen, Service) stehen im layout.tsx dieses Ordners.
import ErzaehlSeite from '@/components/vorlagen/ErzaehlSeite';
import GefaelleBalkon from '@/components/momente/gefaelle-balkon/GefaelleBalkon';
import { BALKON_TERRASSE } from '@/inhalte/balkon-terrasse';
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
    title: BALKON_TERRASSE.meta.titel,
    description: BALKON_TERRASSE.meta.beschreibung,
    path: '/balkon-terrasse'
});

export default function BalkonTerrassePage() {
    return <ErzaehlSeite inhalt={BALKON_TERRASSE} momente={{ tun: <GefaelleBalkon /> }} />;
}
