// Dev-Schaufenster (nur next dev, pageExtensions „dev.tsx“): großer Moment „gefaelle-balkon“ (E3-GRAF-04) im Schlitz momente.tun wie auf /balkon-terrasse, bevor
// die Seite umgestellt ist; Vorlage ErzaehlSeite mit dem Inhalt von /bad/barrierefreies-bad als Rahmen (Prüfstufe A, E-045).
import ErzaehlSeite from '@/components/vorlagen/ErzaehlSeite';
import GefaelleBalkon from '@/components/momente/gefaelle-balkon/GefaelleBalkon';
import { BARRIEREFREIES_BAD } from '@/inhalte/barrierefreies-bad';

export const metadata = { title: 'Schaufenster · gefaelle-balkon', robots: { index: false, follow: false } };

export default function SchaufensterGefaelleBalkon() {
  return <ErzaehlSeite inhalt={BARRIEREFREIES_BAD} momente={{ tun: <GefaelleBalkon /> }} />;
}
