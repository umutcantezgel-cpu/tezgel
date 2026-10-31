// Fliesen-Ratgeber (E3-BAU-05, KERN v3.6, E-025, K-016 „Ruhe“, E-047): Wissensseite auf der Vorlage WissensSeite. Inhalt,
// Metadaten und Texte aus `src/inhalte/fliesen.ts` (Textdatei `_werkstatt/texte/fliesen.md`). Schlitz `zeichnungen.verband`:
// der große Moment der Verlegemuster (E3-GRAF-06). Werkzeug nach dem Schritt: der Fliesen-Konfigurator mit der Kennung
// `konfigurator` wie im Bestand; er wird nachgeladen (Tempo). Strukturierte Daten (E3-SEO-JSONLD): SeitenDaten in dieser Datei.
// UM-E4-SICHT-FIX M-C7: Der Verband-Wähler startet im Halbverband (erster Zustand mit Zeichnung und Foto, Nr. 2); im selben
// Wissensblock danach die vorhandene statische Vignette `untergrund` (Schichtaufbau am Wandanschluss) mit einem vorhandenen Satz
// der Seite als Unterschrift (Nr. 5, ohne Registereintrag: sie bewegt sich nicht). Konfigurator im Abschluss geschlossen (Nr. 4,
// seit M-B3).
import dynamic from 'next/dynamic';
import FormularPlatzhalter from '@/components/funnels/TezgelAnfrageFunnel/Platzhalter';
import VerbandProbe from '@/components/momente/verband/VerbandProbe';
import VignetteUntergrund from '@/components/kern/vignetten/Untergrund';
import { klartext } from '@/lib/textmarken';
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

// Unterschrift der Schichtzeichnung: der Satz der Wegzeile „Fliesen im Neubau“ aus der Lage (vorhandener Text der Seite; die
// Zeichnung zeigt den Estrich unter den Fliesen). Ohne Textmarke: Erklärt ist „Estrich“ dort, beim ersten Vorkommen
const SCHICHT_SATZ = klartext(FLIESEN.lage.wege?.find((w) => w.href === '/fliesen/neubau')?.satz ?? '');

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
                zeichnungen={{
                    verband: (
                        <div>
                            <VerbandProbe start="halb" />
                            {/* zweite Erklärzeichnung (K-003 Nr. 3: Zeichnungen erklären den Schichtaufbau), statisch. Ein Feld mit dem
                                Wähler: Sie schließt an der Fuge unter ihm an (-mt-px, eine Linie statt zweier Kästen mit Lücke), die
                                Zeichnung mittig, der Satz direkt darunter, auf allen Breiten einspaltig (Ruhe-Regel „Fläche“: nie zwei
                                Stränge nebeneinander; Nacharbeit 2, vorher ab lg Zeichnung links und Satz rechts mit rund 285 px Lücke) */}
                            <figure className="-mt-px border border-fuge bg-fliese p-4 text-tinte lg:p-6">
                                <div className="mx-auto w-full max-w-md">
                                    <VignetteUntergrund />
                                </div>
                                {SCHICHT_SATZ && <figcaption className="mx-auto mt-4 max-w-md text-center font-text text-fs-3 text-pretty text-tinte-2">{SCHICHT_SATZ}</figcaption>}
                            </figure>
                        </div>
                    ),
                }}
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
