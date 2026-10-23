// Baustein „Fachwort“ (KERN v3 K-011, K-004): Ein Fachwort steht beim ersten Vorkommen je Seite mit seiner Alltagserklärung
// direkt dabei, in Klammern und ruhigerer Farbe. Nichts muss aufgeklappt oder gesucht werden (Prüfstein P1).
// Auszeichnung für die Prüfung: <dfn data-glossar="id"> und <span data-erklaert="id"> (werkzeuge/lesbarkeit.mjs).
// Bei späterem Vorkommen auf derselben Seite `erklaert={false}`: dann nur das Wort, ohne Auszeichnung als Definition.
import type { ReactNode } from 'react';
import { GLOSSAR, type GlossarId } from '@/config/glossar';

interface FachwortProps {
  id: GlossarId;
  /** angezeigtes Wort (Beugung im Satz); ohne Angabe der erste Begriff des Eintrags */
  children?: ReactNode;
  /** false: Wort ohne Erklärung (nicht das erste Vorkommen auf der Seite) */
  erklaert?: boolean;
}

export default function Fachwort({ id, children, erklaert = true }: FachwortProps) {
  const eintrag = GLOSSAR[id];
  const wort = children ?? eintrag.begriffe[0];
  if (!erklaert) return <>{wort}</>;
  return (
    <>
      <dfn data-glossar={id} className="font-semibold not-italic text-tinte underline decoration-fuge decoration-1 underline-offset-4">
        {wort}
      </dfn>{' '}
      <span data-erklaert={id} className="text-tinte-2">
        ({eintrag.klammer})
      </span>
    </>
  );
}
