// Satzstufe nach dem längsten Wort (P4-10a, KERN v1.2 K-005, Z-13): Kein Wort bricht mitten im Wort.
// Chromium unter Linux trennt nicht nach Silben (`hyphens: auto` ohne Wörterbuch). Darum wählt die Vorlage die Schriftstufe
// einer Überschrift so, dass ihr längstes Wort in die schmalste Spalte passt, die dieser Ort zwischen 320 und 1920 px hat.
// Reine Funktion beim Rendern auf dem Server: Text rein, Tailwind-Klasse raus – keine Messung im Browser, kein Skript.
//
// Breite eines Worts: Summe der Vorschubbreiten seiner Zeichen in em (Archivo 760, Breite 74 %, Laufweite −0,015 em, wie
// `.k-anzeige`). Die Tabelle ist im Browser gemessen (Zeichen je 20-mal hintereinander); die Summe weicht für die Komposita
// der Seiten höchstens 1 % nach oben vom gemessenen Wort ab. Text 600 (Archivo, Breite 100 %) ist 1,25-mal so breit,
// Plex Mono hat für jedes Zeichen 0,6 em. Unbekannte Zeichen zählen 0,8 em (sicher zu breit).
// Wortgrenzen: Leerzeichen sowie nach Bindestrich und weichem Trennzeichen (dort darf der Browser umbrechen). Geschütztes
// Leerzeichen und geschützter Bindestrich verbinden. Element-Kinder werden ohne Zwischenraum verbunden (sicher zu lang).
//
// Schwellen je Ort (em = größtes Wort, das in der Stufe noch passt): kleinstes Verhältnis Spaltenbreite ÷ Schriftgröße über
// alle Breiten von 320 bis 1920 px (Schriftgröße aus der clamp()-Skala in `kern.css`, Spalte aus dem Raster des Orts),
// davon 97 % als Reserve für Kerning und Rundung. Rechnung und Belege in der Rückgabe P4-10a, Abschnitt „Wortbruch“.
import { isValidElement, type ReactNode } from 'react';

export type Stufe = 'text-k-7' | 'text-k-6' | 'text-k-5' | 'text-k-4' | 'text-k-3';
export type Lage = 'anzeige' | 'text' | 'mono';

/** Orte, an denen eine Überschrift steht; jeder mit seiner schmalsten Spalte (Rückgabe P4-10a). */
export type Ort =
  /** H1 im Einstieg (Waage: Sp. 1–7 − 32 px; Lot: Sp. 1–8 − 48 px; mobil volle Breite − 16 px Einzug) – eng bei 320 px */
  | 'einstieg'
  /** H2 im Abschnittskopf oben oder geteilt (Maß 66ch bzw. Sp. 1–7; mobil volle Breite) – eng bei 320 px */
  | 'abschnitt'
  /** H2 im Abschnittskopf seitlich (ab lg Sp. 1–5 − 48 px) – eng bei 1024 px */
  | 'seitlich'
  /** Titel im Handlungsfeld (Abschluss, Merkfeld, Projektband: ab lg Sp. 1–7 − 2 × 48 px; mobil − 2 × 24 px) */
  | 'handlung'
  /** Titel und Werte im Fugenraster (Zelle ≥ 288 px durch Container-Abfragen, innen − 2 × 32 px) – eng bei 1248 px */
  | 'feld'
  /** Titel im Randfeld neben der Hauptspalte (ab lg Sp. 9–12 − 32 − 2 × 32 px) – eng bei 1024 px */
  | 'rand'
  /** Schritttitel im Ablauf (Lot mobil − 64 px; Waage 2/3/4 je Reihe über Container-Abfragen) – eng bei 1455 px */
  | 'ablauf'
  /** Titel einer Zeile in Feldern als Zeilen (ab Behälter 48rem Sp. 1–5 − 48 px) – eng bei 1184 px */
  | 'zeile'
  /** Titel der Hervorhebung einer Beitragsliste (ab Behälter 42rem halbe Breite − 2 × 32 px) – eng bei 1176 px */
  | 'hervorhebung';

type Leiter = readonly (readonly [number, Stufe])[];

/** Schwellen in em: Stufe gilt, solange das längste Wort höchstens so breit ist. Darunter folgt die nächste Stufe. */
export const SCHWELLEN: Record<Ort, Leiter> = {
  einstieg: [[6.0, 'text-k-7'], [8.24, 'text-k-6'], [10.99, 'text-k-5'], [13.19, 'text-k-4']],
  abschnitt: [[6.35, 'text-k-7'], [8.73, 'text-k-6'], [11.64, 'text-k-5'], [13.97, 'text-k-4']],
  seitlich: [[4.28, 'text-k-7'], [7.06, 'text-k-6'], [10.51, 'text-k-5'], [13.97, 'text-k-4']],
  handlung: [[5.25, 'text-k-7'], [7.21, 'text-k-6'], [9.62, 'text-k-5'], [11.54, 'text-k-4']],
  feld: [[2.23, 'text-k-7'], [4.14, 'text-k-6'], [6.41, 'text-k-5'], [9.01, 'text-k-4']],
  rand: [[2.79, 'text-k-7'], [4.41, 'text-k-6'], [6.56, 'text-k-5'], [8.91, 'text-k-4']],
  ablauf: [[2.61, 'text-k-7'], [4.85, 'text-k-6'], [7.54, 'text-k-5'], [10.67, 'text-k-4']],
  zeile: [[2.91, 'text-k-7'], [5.27, 'text-k-6'], [7.99, 'text-k-5'], [11.12, 'text-k-4']],
  hervorhebung: [[2.95, 'text-k-7'], [5.27, 'text-k-6'], [7.98, 'text-k-5'], [11.1, 'text-k-4']],
};

// Vorschubbreiten Archivo-Anzeige in Hundertstel em (aufgerundet), nach Breite gruppiert.
const GRUPPEN: Record<number, string> = {
  22: 'ijl', 23: ',.', 25: 'I:;', 26: '!-', 27: 'f/', 28: 't', 30: 'r', 35: '()', 36: '–', 38: '„“"', 41: 'z', 42: 'svy',
  43: '17', 45: 'cg', 46: '48ekxFL?', 47: '023569abdhnopquäöüJ§', 48: '€', 50: 'ß', 51: 'ST', 52: 'EZ', 53: 'P', 54: 'VY+',
  55: 'BX', 56: 'ARÄ', 57: 'CDKUÜ', 58: 'HN', 60: '&', 61: 'GOQÖ', 65: 'w', 70: 'm', 73: 'M', 77: 'W%',
};
const ANZEIGE = new Map<string, number>();
for (const [breite, zeichen] of Object.entries(GRUPPEN)) for (const z of zeichen) ANZEIGE.set(z, Number(breite) / 100);
const UNBEKANNT = 0.8;

/** Sichtbarer Text eines Knotens (Zeichenketten, Zahlen, Kinder von Elementen). */
export function textVon(knoten: ReactNode): string {
  if (knoten === null || knoten === undefined || typeof knoten === 'boolean') return '';
  if (typeof knoten === 'string' || typeof knoten === 'number') return String(knoten);
  if (Array.isArray(knoten)) return knoten.map(textVon).join('');
  if (isValidElement<{ children?: ReactNode }>(knoten)) return textVon(knoten.props.children);
  return '';
}

/** Wörter, an deren Grenzen der Browser umbrechen darf (Leerraum, nach Bindestrich und weichem Trennzeichen). */
export function woerter(text: string): string[] {
  return text
    .split(/[ \t\n\r ​]+/)
    .flatMap((wort) => wort.split(/(?<=[-­‐])/))
    .map((wort) => wort.replace(/­/g, '-'))
    .filter(Boolean);
}

/** Breite eines Worts in em für die Lage. */
export function wortbreite(wort: string, lage: Lage = 'anzeige'): number {
  if (lage === 'mono') return [...wort].length * 0.6;
  const anzeige = [...wort].reduce((summe, z) => summe + (ANZEIGE.get(z) ?? UNBEKANNT), 0);
  return lage === 'text' ? anzeige * 1.25 : anzeige;
}

/** Breite des längsten Worts in em. */
export function laengstesWort(text: string, lage: Lage = 'anzeige'): number {
  return woerter(text).reduce((max, wort) => Math.max(max, wortbreite(wort, lage)), 0);
}

const REIHE: readonly Stufe[] = ['text-k-7', 'text-k-6', 'text-k-5', 'text-k-4', 'text-k-3'];

/**
 * Schriftstufe einer Überschrift nach ihrem längsten Wort.
 * @param text Wortlaut (Zeichenkette oder Knoten; nur der sichtbare Text zählt)
 * @param ort Ort der Überschrift, bestimmt die schmalste Spalte (Standard: H1 im Einstieg)
 * @param groesste größte erlaubte Stufe (z. B. `text-k-6` für H2, `text-k-4` für kleine Feldtitel)
 * @param lage Schriftlage (Anzeige, Text 600, Mono)
 */
export function stufeNachWort(text: ReactNode, ort: Ort = 'einstieg', groesste: Stufe = 'text-k-7', lage: Lage = 'anzeige'): Stufe {
  const breite = laengstesWort(textVon(text), lage);
  const ab = REIHE.indexOf(groesste);
  for (const [bis, stufe] of SCHWELLEN[ort]) {
    if (REIHE.indexOf(stufe) < ab) continue;
    if (breite <= bis) return stufe;
  }
  return 'text-k-3';
}

/**
 * Eine Stufe für alle Titel einer Liste (Felder, Schritte, Verweisfelder): die kleinste, die jeder einzelne Titel braucht.
 * So stehen die Titel einer Reihe in derselben Größe, auch wenn nur einer ein langes Wort trägt.
 */
export function stufeFuerAlle(texte: readonly ReactNode[], ort: Ort, groesste: Stufe = 'text-k-7', lage: Lage = 'anzeige'): Stufe {
  return texte.reduce<Stufe>((klein, text) => {
    const stufe = stufeNachWort(text, ort, groesste, lage);
    return REIHE.indexOf(stufe) > REIHE.indexOf(klein) ? stufe : klein;
  }, groesste);
}
