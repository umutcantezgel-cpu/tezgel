// Wortgruppen, die nicht umbrechen sollen (Sichtprüfung E2 Runden 2 bis 4: „Termin vor / Ort anfragen“, „25 / km“,
// „27 / Bewertungen“): als Span mit white-space: nowrap. Der Wortlaut bleibt für Vorleser, Suche und Prüfungen
// unverändert (kein geschütztes Leerzeichen). Das Ergebnis ist immer genau ein Element (ein äußerer Span), damit es in Flex-Knöpfen ein einziges
// Flex-Kind bleibt: Sonst würden Textstücke und Gruppe einzelne Flex-Kinder mit dem Abstand des Knopfs dazwischen
// (doppelte Wortabstände, Überlauf bei großer Schrift; Runde 3).
import type { ReactNode } from 'react';

const GRUPPEN = [/vor Ort/, /\d+ km/, /\d+ Bewertungen/, /\d+ Sternen/];

function teile(text: string): ReactNode[] {
  let erster: RegExpExecArray | null = null;
  for (const g of GRUPPEN) {
    const m = g.exec(text);
    if (m && (!erster || m.index < erster.index)) erster = m;
  }
  if (!erster) return text ? [text] : [];
  const ende = erster.index + erster[0].length;
  return [
    text.slice(0, erster.index),
    <span key={erster.index} className="whitespace-nowrap">
      {erster[0]}
    </span>,
    ...teile(text.slice(ende)),
  ];
}

export function zusammen(text: string): ReactNode {
  return <span>{teile(text)}</span>;
}
