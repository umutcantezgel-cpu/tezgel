// Vertrauenszeile (KERN K-009, Schriftfeld): die Zusagen als Felder an der Fuge in einem festen Raster – die Fugen
// laufen über alle Zeilen durch. Optional ein Kennwert-Feld (`ende`, z. B. Google), das das Raster über zwei Spalten
// schließt; dann entfällt die Textzeile mit derselben Bewertung. Wortlaut unverändert, die Bewertungszeile aus
// `RATING_SUMMARY` (eine Quelle). Serverkomponente ohne JavaScript.
import type { ReactNode } from 'react';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import { RATING_SUMMARY } from '@/config/reviews';

const { google } = RATING_SUMMARY;
const bewertungsZeile = `${google.displayRating} Google-Bewertungen (${google.count} Rezensionen)`;

const trustItems = [
  'Aßlar & Wetzlar regional vor Ort',
  'Eingetragener HWK Wiesbaden Fachbetrieb',
  'DIN 18534 Verbundabdichtung',
  'XXL-Großformat Nivelliertechnik',
  'Staubschutz & Sauberkeits-Garantie',
  'Verbindliche Festpreis-Kalkulation',
  bewertungsZeile,
];

export default function TrustStrip({ ende }: { ende?: ReactNode }) {
  // Mit Kennwert-Feld (`ende`) steht die Bewertung dort – die Textzeile mit derselben Angabe entfällt, das Feld
  // schließt das Raster über zwei Spalten (keine doppelte Bewertung, keine Leerzelle; Fusion E-020).
  const zeilen = ende ? trustItems.filter((text) => text !== bewertungsZeile) : trustItems;
  return (
    <section aria-label="Vertrauenssignale und Fachbetriebs-Garantien">
      <p className="sr-only">Vertrauenssignale und Fachbetriebs-Garantien</p>
      <ul className="grid grid-cols-1 gap-px border border-fuge bg-fuge sm:grid-cols-2 lg:grid-cols-4">
        {zeilen.map((text) => (
          <li key={text} className="flex items-center gap-3 bg-fliese px-4 py-4 text-fs-2 text-tinte">
            <Fugenkreuz className="size-3 shrink-0 text-strich" />
            {text}
          </li>
        ))}
        {ende && <li className="flex bg-fliese sm:col-span-2">{ende}</li>}
      </ul>
    </section>
  );
}
