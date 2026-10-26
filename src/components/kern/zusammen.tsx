// Wortgruppen, die nicht umbrechen sollen (Sichtprüfung E2 Runden 2 bis 4: „Termin vor / Ort anfragen“, „25 / km“,
// „27 / Bewertungen“): als Span mit white-space: nowrap. Der Wortlaut bleibt für Vorleser, Suche und Prüfungen
// unverändert (kein geschütztes Leerzeichen). Das Ergebnis ist immer genau ein Element (ein äußerer Span), damit es in Flex-Knöpfen ein einziges
// Flex-Kind bleibt: Sonst würden Textstücke und Gruppe einzelne Flex-Kinder mit dem Abstand des Knopfs dazwischen
// (doppelte Wortabstände, Überlauf bei großer Schrift; Runde 3).
import type { ReactNode } from 'react';

// Runde 2 der Browserprüfung E4-W1: Normnummer („DIN / 18534“), Zahl mit Einheit („24 / Stunden“) und Maße („120 × 260 cm“) ebenso
const GRUPPEN = [/vor Ort/, /\d+ km/, /\d+ Bewertungen/, /\d+ Sternen/, /DIN \d+/, /\d+ Stunden/, /\d+ × \d+ cm/];

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

// Zitate im Wortlaut (G8) setzen nach einem Satzzeichen manchmal kein Leerzeichen („empfehlen.Handwerklich“). Damit die
// Zeile dort umbrechen darf statt mitten im Wort, steht nach Satzzeichen vor einem Großbuchstaben eine Umbruchstelle
// (<wbr>). Der Text selbst bleibt Zeichen für Zeichen gleich (Browserprüfung E4-W1, Runde 2).
export function umbruchNachSatzzeichen(text: string): ReactNode {
  const teile = text.split(/(?<=[.!?,;:])(?=[A-ZÄÖÜ])/);
  if (teile.length < 2) return text;
  return teile.flatMap((teil, i) => (i === 0 ? [teil] : [<wbr key={i} />, teil]));
}

// Kachel- und Kartentitel bei großer Schrift: „&“ steht als „und“ da (wie anzeige() in den übrigen Formularen; ein an das
// Wort gebundenes „&“ ergab in Runde 3 zu lange Einheiten, die mitten im Wort brachen), und lange Zusammensetzungen trennen
// an ihrer Fuge („Einfamilien-haus“ statt „Einfamili-enhaus“). Nur Anzeige; der Wert in Nutzlast und Mail bleibt unverändert
// (Browserprüfung E4-W1, Runden 2 und 3).
const FUGEN: Record<string, string> = {
  Einfamilienhaus: 'Einfamilien­haus',
  Mehrfamilienhaus: 'Mehrfamilien­haus',
};

const FUGEN_MUSTER = new RegExp(`(${Object.keys(FUGEN).join('|')})`);

/** Fließtext mit Wörtern aus FUGEN (etwa im Weiter-Link „… im ganzen Einfamilienhaus gehört“): diese trennen nur an ihrer
 *  Fuge, der übrige Text wie gewohnt (Browserprüfung E4-W1, Runde 3) */
export function mitFugen(text: string): ReactNode {
  const teile = text.split(FUGEN_MUSTER);
  if (teile.length === 1) return text;
  return teile.map((t, i) => (i % 2 ? <span key={i} className="hyphens-manual">{FUGEN[t]}</span> : t));
}

export function kachelTitel(text: string): ReactNode {
  const fuge = FUGEN[text];
  if (fuge) return <span className="hyphens-manual">{fuge}</span>;
  return text.replace(/ & /g, ' und ');
}
