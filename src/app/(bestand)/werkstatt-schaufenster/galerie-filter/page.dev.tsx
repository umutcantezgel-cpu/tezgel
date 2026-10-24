// Dev-Schaufenster (nur next dev, pageExtensions „dev.tsx“): großer Moment „galerie-filter“ (E3-GRAF-08) im Schlitz
// momente.beleg wie auf /referenzen (ohne Fotos und Satz davor, H2 aus _werkstatt/texte/referenzen.md); Vorlage ErzaehlSeite
// mit dem Inhalt von /bad/barrierefreies-bad als Rahmen (Prüfstufe A, E-045).
import ErzaehlSeite from '@/components/vorlagen/ErzaehlSeite';
import GalerieFilter from '@/components/momente/galerie-filter/GalerieFilter';
import { BARRIEREFREIES_BAD } from '@/inhalte/barrierefreies-bad';

export const metadata = { title: 'Schaufenster · galerie-filter', robots: { index: false, follow: false } };

const INHALT = {
  ...BARRIEREFREIES_BAD,
  beleg: { ...BARRIEREFREIES_BAD.beleg, titel: 'Unsere Arbeiten in Bildern.', fotos: [], satz: undefined, zweierbild: undefined },
};

export default function SchaufensterGalerieFilter() {
  return <ErzaehlSeite inhalt={INHALT} momente={{ beleg: <GalerieFilter /> }} />;
}
