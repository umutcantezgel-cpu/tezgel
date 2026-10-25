// Bad (E3-BAU-01, KERN v3.6, Zusatz E3-BAU-K016): Erzählseite auf der Vorlage ErzaehlSeite. Der Inhalt steht als Daten in
// `src/inhalte/bad.ts`; die Metadaten kommen aus dem Inhalt. Der große Moment „schichten“ steht im Platz `momente.tun`
// (E-048: die Zeichnung des alten Einstiegs entfällt). Die Anfragewege (Projektcheck, darunter Badanfrage) stehen mittig als
// Werkzeug nach dem nächsten Schritt; die Funnel werden nachgeladen (TEMPO, Z-08 / E-025) wie im Bestand.
// Strukturierte Daten (SeitenDaten) stehen auf dieser Seite; das Layout vererbt keine mehr.
import dynamic from 'next/dynamic';
import ErzaehlSeite from '@/components/vorlagen/ErzaehlSeite';
import FormularPlatzhalter from '@/components/funnels/TezgelAnfrageFunnel/Platzhalter';
import Schichten from '@/components/momente/schichten/Schichten';
import SeitenDaten from '@/components/seo/SeitenDaten';
import { BAD } from '@/inhalte/bad';
import { buildServiceNode, SITE_URL } from '@/lib/schema';
import { createMetadata } from '@/lib/metadata';

// Service der Ordnerseite (vorher im Layout, E3-SEO-JSONLD-1): unverändert übernommen
const badService = buildServiceNode({
    name: 'Badsanierung & Badmodernisierung',
    serviceType: 'Badsanierung, Walk-In Duschen & Barrierefreie Bäder',
    description:
        'Fachmännische Badsanierung aus einer Hand in Aßlar, Wetzlar und Mittelhessen: Barrierefreie Bäder, bodengleiche Duschen, Großformatfliesen und Verbundabdichtung.',
    url: `${SITE_URL}/bad`,
    areaServed: 'Aßlar, Wetzlar & Mittelhessen',
});

// Anfragewege nachladen wie im Bestand (TEMPO, Z-08 / E-025)
const BadProjektCheck = dynamic(() => import('@/components/funnels/BadProjektCheck'), {
    loading: () => <FormularPlatzhalter />,
});
const BadanfrageFunnel = dynamic(() => import('@/components/funnels/BadanfrageFunnel'), {
    loading: () => <FormularPlatzhalter />,
});

const METADATEN = createMetadata({
    title: BAD.meta.titel,
    description: BAD.meta.beschreibung,
    path: '/bad',
});

export const metadata = METADATEN;

export default function BadPage() {
    return (
        <>
            <SeitenDaten
                pfad="/bad"
                titel={METADATEN.title.absolute}
                beschreibung={METADATEN.description}
                brotkrumen={BAD.worum.brotkrumen}
                weitere={[badService]}
            />
            <ErzaehlSeite
                inhalt={BAD}
                momente={{ tun: <Schichten /> }}
                werkzeug={{
                    id: 'anfragewege',
                    titel: '',
                    flaeche: 'fliese',
                    kopf: 'gestapelt',
                    // K-016 (Abnahme E3-BAU-01): beide Werkzeuge mittig untereinander, ohne Rückfrage daneben (kein zweiter Strang,
                    // keine Firmendaten außerhalb von /kontakt und /ueber-uns)
                    inhalt: (
                        <div className="mx-auto max-w-mass">
                            <div id="projekt-check" role="region" aria-label="Projektcheck fürs Bad">
                                <BadProjektCheck />
                            </div>
                            <div id="anfrage" role="region" aria-label="Badanfrage" className="mt-12 border-t border-fuge pt-12">
                                <BadanfrageFunnel />
                            </div>
                        </div>
                    ),
                }}
            />
        </>
    );
}
