// Fliesen-Ratgeber (E3-BAU-05, KERN v3.6, E-025, K-016 „Ruhe“, E-047): Wissensseite auf der Vorlage WissensSeite. Inhalt,
// Metadaten und Texte aus `src/inhalte/fliesen.ts` (Textdatei `_werkstatt/texte/fliesen.md`). Schlitz `zeichnungen.verband`:
// der große Moment der Verlegemuster (E3-GRAF-06). Werkzeug nach dem Schritt: der Fliesen-Konfigurator mit der Kennung
// `konfigurator` wie im Bestand; er wird nachgeladen (Tempo). Strukturierte Daten stehen in `layout.tsx`.
import dynamic from 'next/dynamic';
import FormularPlatzhalter from '@/components/funnels/TezgelAnfrageFunnel/Platzhalter';
import VerbandProbe from '@/components/momente/verband/VerbandProbe';
import WissensSeite from '@/components/vorlagen/WissensSeite';
import { createMetadata } from '@/lib/metadata';
import { FLIESEN } from '@/inhalte/fliesen';

// Konfigurator nachladen (Tempo, wie auf der Startseite und den Leistungsseiten); ID #konfigurator liegt am Werkzeug
const FliesenKonfigurator = dynamic(() => import('@/components/funnels/FliesenKonfigurator'), {
    loading: () => <FormularPlatzhalter />,
});

export const metadata = createMetadata({
    title: FLIESEN.meta.titel,
    description: FLIESEN.meta.beschreibung,
    path: '/fliesen',
});

export default function FliesenRatgeberPage() {
    return (
        <WissensSeite
            inhalt={FLIESEN}
            zeichnungen={{ verband: <VerbandProbe /> }}
            werkzeug={{
                id: 'konfigurator',
                titel: '',
                inhalt: (
                    <div className="mx-auto max-w-mass">
                        <FliesenKonfigurator />
                    </div>
                ),
            }}
        />
    );
}
