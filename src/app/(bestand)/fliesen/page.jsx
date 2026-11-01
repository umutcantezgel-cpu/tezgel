// Fliesen-Ratgeber (E3-BAU-05, KERN v3.6, E-025, K-016 „Ruhe“, E-047): Wissensseite auf der Vorlage WissensSeite. Inhalt,
// Metadaten und Texte aus `src/inhalte/fliesen.ts` (Textdatei `_werkstatt/texte/fliesen.md`). Schlitz `zeichnungen.verband`:
// der große Moment der Verlegemuster (E3-GRAF-06). Werkzeug nach dem Schritt: der Fliesen-Konfigurator mit der Kennung
// `konfigurator` wie im Bestand; er wird nachgeladen (Tempo). Strukturierte Daten (E3-SEO-JSONLD): SeitenDaten in dieser Datei.
// UM-E4-SICHT-FIX M-C7: Der Verband-Wähler startet im Halbverband (erster Zustand mit Zeichnung und Foto, Nr. 2). Konfigurator im
// Abschluss geschlossen (Nr. 4, seit M-B3).
// UM-E4-SICHT-FIX-2 M2-C4 Nr. 2 (Sicht E4 Anlauf 2: Musterkasten mischte Muster, Foto und Schichtschnitt; Schnitt rechts offen
// und ohne Beschriftung, sein Satz wiederholte die Wegzeile „Fliesen im Neubau“): Die statische Vignette `untergrund`
// (Schichtaufbau am Wandanschluss, ohne Registereintrag: sie bewegt sich nicht) steht als eigenes Feld vor dem Wähler, nach dem
// Absatz „Zuerst prüfen wir den Untergrund …“, rechts mit einer Bruchkante geschlossen. Darunter eine Bildunterschrift (Mikrotext,
// fs-3), die in Zeichnungsfolge nur gezeichnete Schichten nennt; Fachwörter, die die Seite davor noch nicht erklärt, mit
// Glossarmarke (Abdichtung, Randfuge; Estrich ist in der Lage erklärt). Statt Beschriftungen im SVG (mobil rund 9,6 px, für
// Vorleser stumm) zeigen Ziffernmarken 1 bis 4 in der Zeichnung, welche Schicht gemeint ist; dieselben Ziffern stehen in der
// Unterschrift vor den Begriffen (Nacharbeit). Der Musterkasten trägt danach nur Muster und das Foto zum gewählten Muster.
import { Fragment } from 'react';
import dynamic from 'next/dynamic';
import FormularPlatzhalter from '@/components/funnels/TezgelAnfrageFunnel/Platzhalter';
import VerbandProbe from '@/components/momente/verband/VerbandProbe';
import VignetteUntergrund from '@/components/kern/vignetten/Untergrund';
import Textmarken from '@/components/kern/Textmarken';
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

// Unterschrift der Schichtzeichnung (Mikrotext, M2-C4 Nr. 2): von oben nach unten, was gezeichnet ist (Fliesen, Abdichtung,
// Estrich, an der Wand die Randfuge); je Satz mit Erklärung höchstens 25 Wörter (K-011). Abdichtung und Randfuge stehen hier zum
// ersten Mal auf der Seite und tragen ihre Erklärung, das Qualitätsversprechen nennt sie darum in `erklaert` (fliesen.ts).
// Nacharbeit: vor jedem Begriff die Ziffer seiner Marke in der Zeichnung (Untergrund `marken`), Wortlaut unverändert. Die Ziffern
// sind für Vorleser stumm wie die Zeichnung. Die Marke ist ein gewöhnliches Inline-Element (kein inline-flex: um ein atomares
// Element darf die Zeile umbrechen), ein Wortverbinder hält sie beim Umbruch an ihrem Begriff.
const SCHICHT_SATZ = [
    [1, 'Oben die ', 'Fliesen, darunter die '],
    [2, '', '[[abdichtung|Abdichtung]]. Dann folgt der '],
    [3, '', 'Estrich, an der Wand mit einer '],
    [4, '', '[[randfuge|Randfuge]].'],
];

// Ziffer einer Marke wie in der Zeichnung: Kasten in Strich, Ziffer in Mono
function Marke({ n }) {
    return (
        <span aria-hidden="true" className="mr-1 border border-strich px-1 font-mono text-fs-1 text-tinte">
            {n}
        </span>
    );
}

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
                        <div className="flex flex-col gap-12">
                            {/* Erklärzeichnung (K-003 Nr. 3: Zeichnungen erklären den Schichtaufbau), statisch, als eigenes Feld vor dem
                                Wähler (M2-C4 Nr. 2): das Feld im Lesemaß (schmaler als der Wähler darunter, ein Breitenwechsel), die
                                Zeichnung mittig auf Fliese, rechts mit Bruchkante geschlossen und mit Ziffernmarken, der Satz direkt darunter,
                                auf allen Breiten einspaltig (Ruhe-Regel „Fläche“: nie zwei Stränge nebeneinander). Das Feld mittig wie
                                bisher; neben ihm steht kein Kopf der Achse (die Pause „ganz“ des Abschnitts trägt der Wähler) */}
                            <figure className="mx-auto w-full max-w-mass border border-fuge bg-fliese p-4 text-tinte lg:p-8">
                                <div className="mx-auto w-full max-w-md">
                                    <VignetteUntergrund bruchkante marken />
                                </div>
                                {/* linksbündig auf allen Breiten (Nacharbeit: ab lg stand sie als vierzeiliger Zentrierblock) */}
                                <figcaption className="mt-6 font-text text-fs-3 text-pretty text-tinte-2">
                                    {SCHICHT_SATZ.map(([n, vor, rest]) => (
                                        <Fragment key={n}>
                                            {vor}
                                            <Marke n={n} />
                                            {'\u2060'}
                                            <Textmarken text={rest} />
                                        </Fragment>
                                    ))}
                                </figcaption>
                            </figure>
                            <VerbandProbe start="halb" />
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
