// Vertrauensschicht (KERN K-001): je Kundenstimme genau ein Anriss-Wort (wörtlich im Zitat enthalten)
// und eine Randnotiz, die auf Tezgels echten Ablauf oder die passende Leistung verweist.
// Die Zitate selbst bleiben unverändert in src/config/reviews.js.
export interface Stimmenzusatz {
  anriss: string;
  verweis: { text: string; href: string };
}

export const STIMMEN: Record<string, Stimmenzusatz> = {
  'elke-s': { anriss: 'präzise', verweis: { text: 'Ablauf 02 · Material & Fugenbild', href: '/#ablauf' } },
  'c-wolf': { anriss: 'pünktlich', verweis: { text: 'Ablauf 03 · Ausführung & Abnahme', href: '/#ablauf' } },
  'rabia-oe': { anriss: 'zufrieden', verweis: { text: 'Leistung · Wohnbereiche', href: '/leistungen/wohnen' } },
  'hasan-oe': { anriss: 'zufrieden', verweis: { text: 'Leistung · Balkon & Terrasse', href: '/leistungen/aussen' } },
  'ute-t': { anriss: 'barrierefrei', verweis: { text: 'Barrierefreies Bad', href: '/bad/barrierefreies-bad' } },
  'peter-p': { anriss: 'professionell', verweis: { text: 'Badsanierung', href: '/bad' } },
  'christian-d': { anriss: 'Kommunikation', verweis: { text: 'Ablauf 01 · Planung & Aufmaß vor Ort', href: '/#ablauf' } },
  'sara-j': { anriss: 'Treppen', verweis: { text: 'Treppen', href: '/treppen' } },
  'k-d': { anriss: 'zuverlässig', verweis: { text: 'Ablauf 03 · Ausführung & Abnahme', href: '/#ablauf' } },
  'christian-s': { anriss: 'kurzfristig', verweis: { text: 'Ablauf 01 · Planung & Aufmaß vor Ort', href: '/#ablauf' } },
  'thorsten-a': { anriss: 'Organisation', verweis: { text: 'Ablauf 01–03', href: '/#ablauf' } },
  'erik-s': { anriss: 'Treppe', verweis: { text: 'Treppen', href: '/treppen' } },
  'kathrin-w': { anriss: 'hochwertige', verweis: { text: 'Leistungen', href: '/leistungen' } },
  'janet-t': { anriss: 'saubere', verweis: { text: 'Ablauf 03 · Staubgeschützt', href: '/#ablauf' } },
  'ortwin-l': { anriss: 'saubere', verweis: { text: 'Ablauf 03 · Staubgeschützt', href: '/#ablauf' } },
  'jan-g': { anriss: 'fairen Preis', verweis: { text: 'Festpreisangebot', href: '/fliesen/festpreisangebot' } },
};

/** Teilt ein Zitat an der ersten Fundstelle des Anriss-Worts (ohne den Wortlaut zu verändern). */
export function teileAnriss(text: string, wort?: string): [string, string, string] | null {
  if (!wort) return null;
  const i = text.indexOf(wort);
  if (i < 0) return null;
  return [text.slice(0, i), wort, text.slice(i + wort.length)];
}
