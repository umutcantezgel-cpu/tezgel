// Dev-Schaufenster (nur next dev, pageExtensions „dev.tsx“): großer Moment „schichten“ (E3-GRAF-01) im Schlitz momente.tun wie auf /bad, bevor
// die Seite umgestellt ist; Vorlage ErzaehlSeite mit dem Inhalt von /bad/barrierefreies-bad als Rahmen (Prüfstufe A, E-045).
import ErzaehlSeite from '@/components/vorlagen/ErzaehlSeite';
import Schichten from '@/components/momente/schichten/Schichten';
import { BARRIEREFREIES_BAD } from '@/inhalte/barrierefreies-bad';

export const metadata = { title: 'Schaufenster · schichten', robots: { index: false, follow: false } };

export default function SchaufensterSchichten() {
  return <ErzaehlSeite inhalt={BARRIEREFREIES_BAD} momente={{ tun: <Schichten /> }} />;
}
