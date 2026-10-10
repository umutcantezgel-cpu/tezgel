// Vertrauenszeile (KERN K-009, Schriftfeld): die sieben Zusagen als Felder an der Fuge – ruhig, ohne Laufband.
// Wortlaut unverändert; Serverkomponente ohne JavaScript.
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

export default function TrustStrip() {
  return (
    <section aria-label="Vertrauenssignale und Fachbetriebs-Garantien">
      <p className="sr-only">Vertrauenssignale und Fachbetriebs-Garantien</p>
      <ul className="flex flex-wrap border-t border-l border-fuge">
        {trustItems.map((text) => (
          <li key={text} className="flex grow items-center gap-3 border-r border-b border-fuge bg-fliese px-4 py-3 text-fs-2 text-tinte">
            <Fugenkreuz className="size-3 text-tinte" />
            {text}
          </li>
        ))}
      </ul>
    </section>
  );
}
