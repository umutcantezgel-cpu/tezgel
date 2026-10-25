// Barrierefreies Bad (E3-BAU-03, Vorlage ErzaehlSeite, E-025, K-016 „Ruhe“, E-047): die Seite setzt Vorlage, Inhalt und
// Metadaten aus `src/inhalte/barrierefreies-bad.ts`. Schlitz `momente.tun`: der große Moment `gefaelle-dusche`. Schlitz
// `werkzeug`: die Badanfrage (Kennung `anfrage` wie im Bestand) mittig, ohne Rückfrage daneben (K-016, Abnahme E3-BAU-03);
// der Funnel wird nachgeladen (TEMPO, Z-08 / E-025).
import dynamic from 'next/dynamic';
import FormularPlatzhalter from '@/components/funnels/TezgelAnfrageFunnel/Platzhalter';
import GefaelleDusche from '@/components/momente/gefaelle-dusche/GefaelleDusche';
import ErzaehlSeite from '@/components/vorlagen/ErzaehlSeite';
import { createMetadata } from '@/lib/metadata';
import { BARRIEREFREIES_BAD } from '@/inhalte/barrierefreies-bad';

// Badanfrage nachladen wie auf der Referenzseite (TEMPO, Z-08 / E-025)
const BadanfrageFunnel = dynamic(() => import('@/components/funnels/BadanfrageFunnel'), {
    loading: () => <FormularPlatzhalter />,
});

export const metadata = createMetadata({
    title: BARRIEREFREIES_BAD.meta.titel,
    description: BARRIEREFREIES_BAD.meta.beschreibung,
    path: '/bad/barrierefreies-bad',
});

export default function BarrierefreiesBadPage() {
    return (
        <ErzaehlSeite
            inhalt={BARRIEREFREIES_BAD}
            momente={{ tun: <GefaelleDusche /> }}
            werkzeug={{
                id: 'anfrage',
                titel: 'Badanfrage',
                flaeche: 'fliese',
                inhalt: (
                    <div className="mx-auto max-w-mass">
                        <BadanfrageFunnel />
                    </div>
                ),
            }}
        />
    );
}
