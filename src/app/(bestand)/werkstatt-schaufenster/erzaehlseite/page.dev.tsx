// Schaufenster (nur Entwicklung, pageExtensions „dev.tsx“): Vorlage ErzaehlSeite mit dem Inhalt der Referenzseite
// `/bad/barrierefreies-bad` und ihrem großen Moment gefaelle-dusche, bevor die echte Seite umgestellt wird (E3-ORCH-01a, E-025,
// E3-GRAF-03).
import ErzaehlSeite from '@/components/vorlagen/ErzaehlSeite';
import GefaelleDusche from '@/components/momente/gefaelle-dusche/GefaelleDusche';
import { BARRIEREFREIES_BAD } from '@/inhalte/barrierefreies-bad';

export const metadata = { title: 'Schaufenster Erzählseite', robots: { index: false, follow: false } };

export default function SchaufensterErzaehlseite() {
  return <ErzaehlSeite inhalt={BARRIEREFREIES_BAD} momente={{ tun: <GefaelleDusche /> }} />;
}
