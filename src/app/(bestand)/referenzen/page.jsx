// /referenzen (E3-BAU-07, Zusatz E3-BAU-K016, E-025, E-047): Erzählseite auf der Vorlage ErzaehlSeite. Der Inhalt steht als
// Daten in `src/inhalte/referenzen.ts`; die Metadaten kommen aus dem Inhalt. Die Galerie mit Filter steht im Platz
// `momente.beleg`, der Vorher-Nachher-Regler als eigener Abschnitt in `momente.belegZwei` (wie im Schaufenster). Die
// Bewertungen mit Themenfilter (ReviewsSection, Anker #bewertungen, Bestand) stehen nach der Vorlage in der Leitachse; sie
// bringen ihren Kopf selbst mit, darum nicht im Platz `werkzeug` (dort käme sie in einen zweiten Abschnitt mit doppeltem
// Anker und doppeltem Rand). Strukturierte Daten (JSON-LD) bleiben in `layout.tsx` der Route.
import ErzaehlSeite from '@/components/vorlagen/ErzaehlSeite';
import GalerieFilter from '@/components/momente/galerie-filter/GalerieFilter';
import VorherNachher from '@/components/momente/vorher-nachher/VorherNachher';
import Leitachse from '@/components/kern/Leitachse';
import ReviewsSection from '@/components/sections/ReviewsSection';
import { REFERENZEN } from '@/inhalte/referenzen';
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
    title: REFERENZEN.meta.titel,
    description: REFERENZEN.meta.beschreibung,
    path: '/referenzen',
});

export default function ReferenzenPage() {
    return (
        <>
            <ErzaehlSeite
                inhalt={REFERENZEN}
                momente={{
                    beleg: <GalerieFilter />,
                    belegZwei: {
                        id: 'vorher-nachher',
                        titel: 'Eine Außentreppe, vorher und nachher.',
                        moment: (
                            <VorherNachher
                                vorher="kontakt-eingang"
                                nachher="start-galerie-5"
                                titelId="vorher-nachher-titel"
                                unterschrift="Schieben Sie den Regler hin und her. So sehen Sie den Unterschied."
                            />
                        ),
                    },
                }}
            />
            <Leitachse>
                <ReviewsSection leitachse />
            </Leitachse>
        </>
    );
}
