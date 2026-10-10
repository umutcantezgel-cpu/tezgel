import { useId } from 'react';
import IconTeile from '@/components/kern/icons/IconTeile';
import { RICHTUNGEN, istDrehbar, istMarke, symbolId, type IconName, type Richtung } from '@/components/kern/icons/geometrie';

// Komponente Icon (K-010, P3-04): eine Instanz aus dem Sprite (IconSprite muss auf der Seite stehen).
// - dekorativ (Standard): aria-hidden, neben sichtbarem Text, der die Bedeutung trägt;
// - mit `titel`: role="img" + title-Element über aria-labelledby, ID je Instanz eindeutig (useId).
// - mit `inline`: Geometrie direkt im Element statt über das Sprite (Pfade mit pathLength=1), z. B. für den Erfolgshaken
//   unter einem Elternelement mit data-motion="notiert" (K-009) – CSS erreicht Pfade hinter use nicht.
// Größe als Attribut in Pixeln (16/20/24/32) – feste Maße ohne CSS, kein Layoutsprung. Farbe über currentColor.
// Server- und Client-tauglich (useId ist in beiden erlaubt), keine Interaktion, kein 'use client'.

export const ICON_GROESSEN = [16, 20, 24, 32] as const;
export type IconGroesse = (typeof ICON_GROESSEN)[number];

export type IconProps = {
  name: IconName;
  groesse?: IconGroesse;
  /** Nur pfeil und winkel (Grundrichtung rechts, Drehung um die Mitte); bei anderen Zeichen ohne Wirkung. */
  richtung?: Richtung;
  /** Bedeutungstragend: kurzer Text für Screenreader. Ohne Titel ist das Icon dekorativ. */
  titel?: string;
  /** Ohne Sprite zeichnen (für Linienzeichnen über das Register, z. B. `notiert`). */
  inline?: boolean;
  className?: string;
};

export default function Icon({ name, groesse = 24, titel, inline = false, className, richtung }: IconProps) {
  const titelId = `k-icon-titel${useId()}`;
  const grad = richtung && istDrehbar(name) ? RICHTUNGEN[richtung] : 0;
  const drehung = grad ? `rotate(${grad} 12 12)` : undefined;
  const marke = istMarke(name);
  // Inline trägt die Strichregeln selbst (im Sprite stehen sie am symbol-Element).
  const strich = !inline
    ? {}
    : marke
      ? { fill: 'currentColor' }
      : { fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'square' as const, strokeLinejoin: 'miter' as const };
  return (
    <svg
      viewBox="0 0 24 24"
      width={groesse}
      height={groesse}
      focusable="false"
      className={className ? `shrink-0 ${className}` : 'shrink-0'}
      data-icon={name}
      data-marke={marke ? name : undefined}
      role={titel ? 'img' : undefined}
      aria-labelledby={titel ? titelId : undefined}
      aria-hidden={titel ? undefined : true}
      {...strich}
    >
      {titel ? <title id={titelId}>{titel}</title> : null}
      {inline ? (
        <g transform={drehung}>
          <IconTeile name={name} pfadLaenge />
        </g>
      ) : (
        <use href={`#${symbolId(name)}`} transform={drehung} />
      )}
    </svg>
  );
}
