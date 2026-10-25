// Dev-Schaufenster (nur next dev, pageExtensions „dev.tsx“): großer Moment „vorher-nachher“ (E3-GRAF-07) als eigener Abschnitt
// mit H2 nach der Galerie, wie auf /referenzen (momente.belegZwei, E-045; Texte aus _werkstatt/texte/referenzen.md). Bis
// E3-BILD-01 die Bildplätze ref-vorher und ref-nachher liefert, stehen zwei vorhandene Fotos als Platzhalter. Vorlage
// ErzaehlSeite mit dem Inhalt von /bad/barrierefreies-bad als Rahmen (Prüfstufe A).
import ErzaehlSeite from '@/components/vorlagen/ErzaehlSeite';
import GalerieFilter from '@/components/momente/galerie-filter/GalerieFilter';
import VorherNachher from '@/components/momente/vorher-nachher/VorherNachher';
import { BARRIEREFREIES_BAD } from '@/inhalte/barrierefreies-bad';

export const metadata = { title: 'Schaufenster · vorher-nachher', robots: { index: false, follow: false } };

const INHALT = {
  ...BARRIEREFREIES_BAD,
  beleg: { ...BARRIEREFREIES_BAD.beleg, titel: 'Unsere Arbeiten in Bildern.', fotos: [], satz: undefined, zweierbild: undefined },
};

export default function SchaufensterVorherNachher() {
  return (
    <ErzaehlSeite
      inhalt={INHALT}
      momente={{
        beleg: <GalerieFilter />,
        belegZwei: {
          id: 'vorher-nachher',
          titel: 'Eine Außentreppe, vorher und nachher.',
          moment: (
            <VorherNachher
              vorher="ref-vorher"
              nachher="ref-nachher"
              titelId="vorher-nachher-titel"
              unterschrift="Schieben Sie den Regler hin und her. So sehen Sie den Unterschied."
            />
          ),
        },
      }}
    />
  );
}
