import IconTeile from '@/components/kern/icons/IconTeile';
import { ICONS, MARKEN, symbolId, type FamilienIconName, type IconName, type MarkenIconName } from '@/components/kern/icons/geometrie';

// Sprite des Icon-Grundsatzes (K-010, P3-04): jedes Zeichen einmal als symbol-Element, Instanzen über use (Komponente Icon).
// Je Seite genau einmal rendern (IDs k-icon-* sind seitenweit eindeutig), am besten im Kern-Layout direkt am Anfang von body.
// Server-Komponente, ohne JavaScript wirksam. Strich, Enden und Ecken stehen am symbol-Element; die Instanz trägt nur Größe und Farbe.
// Markenzeichen liegen in eigenen Behältern mit data-marke: sie zählen nicht zur Familie (AUFTRAG Abschnitt 7).

type SpriteProps = {
  /** Nur diese Zeichen aufnehmen (Seiten mit wenigen Icons). Ohne Angabe: der ganze Grundsatz. */
  namen?: readonly IconName[];
};

export default function IconSprite({ namen }: SpriteProps) {
  const gewaehlt = (name: IconName) => !namen || namen.includes(name);
  const familie = (Object.keys(ICONS) as FamilienIconName[]).filter(gewaehlt);
  const marken = (Object.keys(MARKEN) as MarkenIconName[]).filter(gewaehlt);
  return (
    // Unsichtbarer Behälter ohne Layoutwirkung; je Zeichen ein eigenes svg-Element mit genau einem symbol, damit das Budget
    // „je Icon ≤ 1,5 KB“ (K-013) am einzelnen Zeichen messbar bleibt (Rückgabe P3-04, Abweichung 3).
    <div className="absolute h-0 w-0 overflow-hidden" aria-hidden="true" data-sprite="kern-icons">
      {familie.map((name) => (
        <svg key={name} viewBox="0 0 24 24" focusable="false">
          <symbol
            id={symbolId(name)}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
            strokeLinejoin="miter"
          >
            <IconTeile name={name} />
          </symbol>
        </svg>
      ))}
      {marken.map((name) => (
        // Markenzeichen: offizielle Form unverändert, einfarbig currentColor, eigener Behälter mit data-marke.
        <svg key={name} viewBox="0 0 24 24" focusable="false" data-marke={name}>
          <symbol id={symbolId(name)} viewBox="0 0 24 24" fill="currentColor">
            <IconTeile name={name} />
          </symbol>
        </svg>
      ))}
    </div>
  );
}
