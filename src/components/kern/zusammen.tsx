// Wortgruppen, die nicht umbrechen sollen (Sichtprüfung E2 Runde 2: „Termin vor / Ort anfragen“): als Span mit
// white-space: nowrap. Der Wortlaut bleibt für Vorleser, Suche und Prüfungen unverändert (kein geschütztes Leerzeichen).
import type { ReactNode } from 'react';

const GRUPPEN = ['vor Ort'];

export function zusammen(text: string): ReactNode {
  for (const g of GRUPPEN) {
    const i = text.indexOf(g);
    if (i >= 0)
      return (
        <>
          {text.slice(0, i)}
          <span className="whitespace-nowrap">{g}</span>
          {zusammen(text.slice(i + g.length))}
        </>
      );
  }
  return text;
}
