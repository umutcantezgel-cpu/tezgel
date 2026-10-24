// Dev-Schaufenster (nur next dev, pageExtensions „dev.tsx“): großer Moment „gefaelle-dusche“ (E3-GRAF-03) im Schlitz momente.tun wie auf /bad/barrierefreies-bad, bevor
// die Seite umgestellt ist; Vorlage ErzaehlSeite mit dem Inhalt von /bad/barrierefreies-bad als Rahmen (Prüfstufe A, E-045).
import ErzaehlSeite from '@/components/vorlagen/ErzaehlSeite';
import GefaelleDusche from '@/components/momente/gefaelle-dusche/GefaelleDusche';
import { BARRIEREFREIES_BAD } from '@/inhalte/barrierefreies-bad';

export const metadata = { title: 'Schaufenster · gefaelle-dusche', robots: { index: false, follow: false } };

export default function SchaufensterGefaelleDusche() {
  return <ErzaehlSeite inhalt={BARRIEREFREIES_BAD} momente={{ tun: <GefaelleDusche /> }} />;
}
