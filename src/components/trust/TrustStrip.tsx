// Vertrauenszeile (KERN K-009, Schriftfeld): die sieben Zusagen als Felder an der Fuge in einem festen Raster –
// die Fugen laufen über alle Zeilen durch. Optional ein achtes Feld (`ende`, z. B. der Google-Kennwert), das das
// Raster schließt. Wortlaut unverändert; Serverkomponente ohne JavaScript.
import type { ReactNode } from 'react';
import Fugenkreuz from '@/components/kern/Fugenkreuz';

const trustItems = [
  'Aßlar & Wetzlar regional vor Ort',
  'Eingetragener HWK Wiesbaden Fachbetrieb',
  'DIN 18534 Verbundabdichtung',
  'XXL-Großformat Nivelliertechnik',
  'Staubschutz & Sauberkeits-Garantie',
  'Verbindliche Festpreis-Kalkulation',
  '5,0 Google-Bewertungen (27 Rezensionen)',
];

export default function TrustStrip({ ende }: { ende?: ReactNode }) {
  return (
    <section aria-label="Vertrauenssignale und Fachbetriebs-Garantien">
      <p className="sr-only">Vertrauenssignale und Fachbetriebs-Garantien</p>
      <ul className="grid grid-cols-1 gap-px border border-fuge bg-fuge sm:grid-cols-2 lg:grid-cols-4">
        {trustItems.map((text) => (
          <li key={text} className="flex items-center gap-3 bg-fliese px-4 py-4 text-fs-2 text-tinte">
            <Fugenkreuz className="size-3 shrink-0 text-strich" />
            {text}
          </li>
        ))}
        {ende && <li className="flex bg-fliese">{ende}</li>}
      </ul>
    </section>
  );
}
