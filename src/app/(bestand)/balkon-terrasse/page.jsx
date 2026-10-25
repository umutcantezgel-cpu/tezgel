// Balkon und Terrasse (E3-BAU-06, KERN v3.6, K-016 „Ruhe“, E-047): Erzählseite auf der Vorlage ErzaehlSeite. Inhalt in
// `src/inhalte/balkon-terrasse.ts`, Metadaten aus dem Inhalt, der große Moment `gefaelle-balkon` an seinem Platz
// (momente.tun). Strukturierte Daten (WebPage, Brotkrumen, Service) setzt die Seite selbst (SeitenDaten).
import ErzaehlSeite from '@/components/vorlagen/ErzaehlSeite';
import GefaelleBalkon from '@/components/momente/gefaelle-balkon/GefaelleBalkon';
import { BALKON_TERRASSE } from '@/inhalte/balkon-terrasse';
import { createMetadata } from '@/lib/metadata';
import SeitenDaten from '@/components/seo/SeitenDaten';
import { buildServiceNode, SITE_URL } from '@/lib/schema';

export const metadata = createMetadata({
    title: BALKON_TERRASSE.meta.titel,
    description: BALKON_TERRASSE.meta.beschreibung,
    path: '/balkon-terrasse'
});

export default function BalkonTerrassePage() {
    return (
        <>
            <SeitenDaten
                pfad="/balkon-terrasse"
                titel={BALKON_TERRASSE.meta.titel}
                beschreibung={BALKON_TERRASSE.meta.beschreibung}
                brotkrumen={BALKON_TERRASSE.worum.brotkrumen}
                weitere={[
                    buildServiceNode({
                        name: 'Balkon- & Terrassensanierung',
                        serviceType: 'Balkonsanierung, Stelzlager & Terrassenplatten',
                        description:
                            'Fachgerechte Sanierung von Außenflächen in Aßlar, Wetzlar und Hessen: Verlegung von Feinsteinzeugplatten auf Stelzlagern, Entwässerung und Abdichtung.',
                        url: `${SITE_URL}/balkon-terrasse`,
                        areaServed: 'Aßlar, Wetzlar & Mittelhessen',
                    }),
                ]}
            />
            <ErzaehlSeite inhalt={BALKON_TERRASSE} momente={{ tun: <GefaelleBalkon /> }} />
        </>
    );
}
