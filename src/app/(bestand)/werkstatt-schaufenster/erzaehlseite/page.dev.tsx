// Schaufenster (nur Entwicklung, pageExtensions „dev.tsx“): Vorlage ErzaehlSeite mit dem Inhalt der Referenzseite
// `/bad/barrierefreies-bad`, bevor die echte Seite umgestellt wird (E3-ORCH-01a, E-025).
import ErzaehlSeite from '@/components/vorlagen/ErzaehlSeite';
import { BARRIEREFREIES_BAD } from '@/inhalte/barrierefreies-bad';

export const metadata = { title: 'Schaufenster Erzählseite', robots: { index: false, follow: false } };

export default function SchaufensterErzaehlseite() {
  return <ErzaehlSeite inhalt={BARRIEREFREIES_BAD} />;
}
