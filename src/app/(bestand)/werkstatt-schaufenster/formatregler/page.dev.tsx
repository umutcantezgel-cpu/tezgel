// Dev-Schaufenster (nur next dev, pageExtensions „dev.tsx“): großer Moment „formatregler“ (E3-GRAF-05) im Schlitz momente.tun wie auf /leistungen, bevor
// die Seite umgestellt ist; Vorlage ErzaehlSeite mit dem Inhalt von /bad/barrierefreies-bad als Rahmen (Prüfstufe A, E-045).
import ErzaehlSeite from '@/components/vorlagen/ErzaehlSeite';
import Formatregler from '@/components/momente/formatregler/Formatregler';
import { BARRIEREFREIES_BAD } from '@/inhalte/barrierefreies-bad';

export const metadata = { title: 'Schaufenster · formatregler', robots: { index: false, follow: false } };

export default function SchaufensterFormatregler() {
  return <ErzaehlSeite inhalt={BARRIEREFREIES_BAD} momente={{ tun: <Formatregler /> }} />;
}
