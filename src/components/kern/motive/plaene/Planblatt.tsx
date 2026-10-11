// Planblatt (P4-03, K-010, K-009 SIG-3): gemeinsamer SVG-Rahmen aller Verlegepläne je Leistung.
// Formsystem: viewBox, currentColor, Strich 1,5 non-scaling (je Linie, die Eigenschaft erbt nicht), Enden square,
// Ecken miter, keine Füllung außer dem Fugenkreuz. Töne an Gruppen: Fugen und Schraffur in Strich, die Achse in Laser;
// Wände, Einbauten und Bemaßung erben die Textfarbe der Hülle (auf Kalk/Fliese Tinte, auf Tinte Kalk). Farbe nie fest.
// Ebenen:
//   belag  – Fugen und schraffierte Passstücke, vom Feld beschnitten (clipPath, ID je Instanz über useId), wandert;
//   achse  – Laserachse und die Maßstriche an den Fugen, unbeschnitten, wandert mit dem Belag;
//   bau    – Wände, Einbauten, Maßlinien, steht fest;
//   gleich – die Bemaßung „=“, steht fest und ist nur in der Flucht sichtbar (in Ruhe sind die Passstücke ungleich).
// SIG-3 (Register `sig-plan`, dauer-2 · setzen): In Ruhe steht der Belag um den Versatz des Plans verschoben (CSS-Variablen
// --k-plan-x/-y im style, Ausnahme K-004), Achse außermittig, Passstücke ungleich. Bei Hover (nur feiner Zeiger), Fokus
// im Auslöser oder :active (Touch) rückt er in die Flucht: Achse auf der Mitte, Passstücke gleich, „=“ erscheint.
// Auslöser ist das umgebende Feld mit der Klasse SIG_PLAN_AUSLOESER (z. B. die Leistungskarte mit ihren Links).
// Übergang zentral im Register: `[data-motion="sig-plan"]` in kern.css (translate und opacity, dauer-2 · setzen); hier stehen
// nur Ruhe- und Zielzustand (P4-10a, vorher eigene Übergangsklassen). Reduziert: kern.css setzt für [data-motion] die Dauer
// auf 0 – Sofortzustand. Nur transform (translate) und opacity.
// `ruhend` (Fachseiten, K-009): Endzustand ohne Register, ohne Versatz, ohne Übergang. Ohne JavaScript gleich.
// Zugänglichkeit: dekorativ (aria-hidden) als Standard; mit `titel` role="img" + title über aria-labelledby.
import { useId, type CSSProperties, type ReactNode } from 'react';
import { Linie } from '@/components/kern/motive/vignetten/zeichnen';
import type { Versatz } from '@/components/kern/motive/plaene/geometrie';

/** Klasse für das auslösende Feld (Karte, Link, Listeneintrag): Hover und Fokus darin richten den Plan aus. */
export const SIG_PLAN_AUSLOESER = 'group/plan';

export type PlanProps = {
  /** Fachseiten: Plan steht ruhend in der Flucht (kein SIG-3). */
  ruhend?: boolean;
  /** Bedeutungstragend: beschreibt, was zu sehen ist. Ohne Titel ist der Plan dekorativ. */
  titel?: string;
  className?: string;
};

type PlanblattProps = PlanProps & {
  viewBox: string;
  /** Feld des Belags als Pfad (Beschnitt, evenodd: innere Teilpfade sind Aussparungen für Einbauten) */
  feld: string;
  versatz: Versatz;
  belag: ReactNode;
  achse?: ReactNode;
  bau: ReactNode;
  /** Pfad der Bemaßung „=“ */
  gleich: string;
};

// Wörtliche Klassen, damit Tailwind sie findet (Ordner wird gescannt, `_entwurf` nicht). Kein Übergang hier: den setzt das
// Register (`data-motion="sig-plan"`).
const BEWEGT =
  'translate-x-(--k-plan-x) translate-y-(--k-plan-y) ' +
  'pointer-fine:group-hover/plan:translate-x-0 pointer-fine:group-hover/plan:translate-y-0 ' +
  'group-focus-within/plan:translate-x-0 group-focus-within/plan:translate-y-0 ' +
  'group-active/plan:translate-x-0 group-active/plan:translate-y-0';
const ERSCHEINT =
  'opacity-0 ' +
  'pointer-fine:group-hover/plan:opacity-100 group-focus-within/plan:opacity-100 group-active/plan:opacity-100';

const KLASSE = 'block h-auto w-full';

export default function Planblatt({ viewBox, feld, versatz, belag, achse, bau, gleich, ruhend = false, titel, className }: PlanblattProps) {
  const roh = useId().replace(/[^A-Za-z0-9_-]/g, '');
  const feldId = `k-plan-feld-${roh}`;
  const titelId = `k-plan-titel-${roh}`;
  const motion = ruhend ? undefined : 'sig-plan';
  const bewegt = ruhend ? undefined : BEWEGT;
  const versatzVar = ruhend ? undefined : ({ '--k-plan-x': `${versatz.x}px`, '--k-plan-y': `${versatz.y}px` } as CSSProperties);
  const klasse = className ? `${KLASSE} ${className}` : KLASSE;
  const inhalt = (
    <>
      <defs>
        <clipPath id={feldId}>
          <path d={feld} clipRule="evenodd" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${feldId})`}>
        <g data-motion={motion} className={bewegt}>
          {belag}
        </g>
      </g>
      {bau}
      {achse ? (
        <g data-motion={motion} className={bewegt}>
          {achse}
        </g>
      ) : null}
      <g data-motion={motion} className={ruhend ? undefined : ERSCHEINT}>
        <Linie d={gleich} />
      </g>
    </>
  );
  return titel ? (
    <svg
      viewBox={viewBox}
      role="img"
      aria-labelledby={titelId}
      focusable="false"
      className={klasse}
      style={versatzVar}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
      strokeLinejoin="miter"
    >
      <title id={titelId}>{titel}</title>
      {inhalt}
    </svg>
  ) : (
    <svg
      viewBox={viewBox}
      aria-hidden="true"
      focusable="false"
      className={klasse}
      style={versatzVar}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
      strokeLinejoin="miter"
    >
      {inhalt}
    </svg>
  );
}

/** Fugen und Schraffur in Strich (Gruppe trägt den Ton, die Linien erben ihn über currentColor). */
export function Fugen({ d }: { d: string }) {
  return (
    <g className="text-k-strich">
      <Linie d={d} />
    </g>
  );
}

/** Laserachse (das einzige Rot des Plans) mit optionalem Fugenkreuz im Kreuzpunkt. */
export function Laser({ d, kreuz }: { d: string; kreuz?: string }) {
  return (
    <g className="text-k-laser">
      <Linie d={d} />
      {kreuz ? <path d={kreuz} fill="currentColor" stroke="none" /> : null}
    </g>
  );
}

export { Linie };
