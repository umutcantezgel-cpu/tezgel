// Fliesen-Ratgeber (E3-BAU-05, KERN v3.6, E-025, K-016 „Ruhe“, E-047): Wissensseite auf der Vorlage WissensSeite. Inhalt,
// Metadaten und Texte aus `src/inhalte/fliesen.ts` (Textdatei `_werkstatt/texte/fliesen.md`). Schlitz `zeichnungen.verband`:
// der große Moment der Verlegemuster (E3-GRAF-06). Werkzeug nach dem Schritt: der Fliesen-Konfigurator mit der Kennung
// `konfigurator` wie im Bestand; er wird nachgeladen (Tempo). Strukturierte Daten (E3-SEO-JSONLD): SeitenDaten in dieser Datei.
import dynamic from 'next/dynamic';
import FormularPlatzhalter from '@/components/funnels/TezgelAnfrageFunnel/Platzhalter';
import VerbandProbe from '@/components/momente/verband/VerbandProbe';
import WissensSeite from '@/components/vorlagen/WissensSeite';
import SeitenDaten from '@/components/seo/SeitenDaten';
import { createMetadata } from '@/lib/metadata';
import { buildServiceNode, SITE_URL } from '@/lib/schema';
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
        <>
            <SeitenDaten
                pfad="/fliesen"
                titel={FLIESEN.meta.titel}
                beschreibung={FLIESEN.meta.beschreibung}
                brotkrumen={FLIESEN.worum.brotkrumen}
                weitere={[
                    buildServiceNode({
                        name: 'Fliesenverlegung & Großformate',
                        serviceType: 'Fliesen-, Platten- und Mosaikverlegung',
                        description:
                            'Fachgerechte Fliesenverlegung im Innen- und Außenbereich in Aßlar, Wetzlar und Hessen: XXL-Großformate, Feinsteinzeug, Fugenbilder und Renovierung.',
                        url: `${SITE_URL}/fliesen`,
                        areaServed: 'Aßlar, Wetzlar & Mittelhessen',
                    }),
                ]}
            />
            <WissensSeite
                inhalt={FLIESEN}
                zeichnungen={{ verband: <VerbandProbe /> }}
                // ein Abschluss (UM-E4-SICHT-FIX M-B3): Konfigurator im nächsten Schritt unter dem Hauptknopf, geschlossen; der
                // Hilfen-Link auf /fliesen/konfigurator entfällt dann (gleiches Werkzeug im Block). Kennung #konfigurator wie bisher
                werkzeug={{
                    id: 'konfigurator',
                    titel: '',
                    imSchritt: true,
                    zu: 'Projekt im Konfigurator vorbereiten',
                    seite: '/fliesen/konfigurator',
                    inhalt: <FliesenKonfigurator />,
                }}
            />
        </>
    );
}
