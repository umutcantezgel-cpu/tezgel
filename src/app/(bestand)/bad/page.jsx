// Bad (E3-BAU-01, KERN v3.6, Zusatz E3-BAU-K016): Erzählseite auf der Vorlage ErzaehlSeite. Der Inhalt steht als Daten in
// `src/inhalte/bad.ts`; die Metadaten kommen aus dem Inhalt. Der große Moment „schichten“ steht im Platz `momente.tun`
// (E-048: die Zeichnung des alten Einstiegs entfällt). Die Anfragewege (Projektcheck, darunter Badanfrage) stehen mittig als
// Werkzeug nach dem nächsten Schritt; die Funnel werden nachgeladen (TEMPO, Z-08 / E-025) wie im Bestand.
// Strukturierte Daten (JsonLd) stehen im Layout `src/app/(bestand)/bad/layout.tsx` und bleiben dort.
import dynamic from 'next/dynamic';
import ErzaehlSeite from '@/components/vorlagen/ErzaehlSeite';
import FormularPlatzhalter from '@/components/funnels/TezgelAnfrageFunnel/Platzhalter';
import Schichten from '@/components/momente/schichten/Schichten';
import { BAD } from '@/inhalte/bad';
import { createMetadata } from '@/lib/metadata';

// Anfragewege nachladen wie im Bestand (TEMPO, Z-08 / E-025)
const BadProjektCheck = dynamic(() => import('@/components/funnels/BadProjektCheck'), {
    loading: () => <FormularPlatzhalter />,
});
const BadanfrageFunnel = dynamic(() => import('@/components/funnels/BadanfrageFunnel'), {
    loading: () => <FormularPlatzhalter />,
});

export const metadata = createMetadata({
    title: BAD.meta.titel,
    description: BAD.meta.beschreibung,
    path: '/bad',
});

export default function BadPage() {
    return (
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
    );
}
