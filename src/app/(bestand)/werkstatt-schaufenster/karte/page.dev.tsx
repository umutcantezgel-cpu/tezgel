// Dev-Schaufenster (nur next dev, pageExtensions „dev.tsx“): großer Moment „karte“ (E3-GRAF-09) im Schlitz momente.beleg wie
// auf /ueber-uns (nach den Fotos, vor dem Verweis); Vorlage ErzaehlSeite mit dem Inhalt von /bad/barrierefreies-bad als Rahmen
// (Prüfstufe A, E-045).
import ErzaehlSeite from '@/components/vorlagen/ErzaehlSeite';
import Einsatzkarte from '@/components/momente/karte/Einsatzkarte';
import { BARRIEREFREIES_BAD } from '@/inhalte/barrierefreies-bad';

export const metadata = { title: 'Schaufenster · karte', robots: { index: false, follow: false } };

export default function SchaufensterKarte() {
  return (
    <ErzaehlSeite
      inhalt={BARRIEREFREIES_BAD}
      momente={{ beleg: <Einsatzkarte unterschrift="Von Aßlar aus arbeiten wir in Wetzlar, Gießen und Herborn." verweis={{ name: 'Alle Orte ansehen', href: '/standorte' }} /> }}
    />
  );
}
