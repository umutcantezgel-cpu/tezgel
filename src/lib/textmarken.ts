// Textmarken (KERN v3 K-011; Format der Seitentexte in _werkstatt/texte/*.md): Die Texte der Vorlagen tragen dieselben
// Auszeichnungen wie die Textdateien, damit der Bau sie wörtlich übernimmt: `[[id|Wort]]` ist ein Fachwort mit
// Glossarerklärung. Diese Datei zerlegt einen Text in Stücke; den Baustein setzt `Textmarken.tsx`. Unbekannte Kennungen
// brechen den Bau ab, statt still ein Wort ohne Erklärung zu zeigen.
import { istGlossarId, type GlossarId } from '@/config/glossar';

export type Textstueck = { art: 'text'; text: string } | { art: 'fachwort'; id: GlossarId; wort: string };

const MARKE = /\[\[([^|\]]+)\|([^\]]+)\]\]/g;

export function zerlege(text: string): Textstueck[] {
  const stuecke: Textstueck[] = [];
  let letzte = 0;
  for (const m of text.matchAll(MARKE)) {
    const id = m[1].trim();
    if (!istGlossarId(id)) throw new Error(`Textmarke mit unbekannter Glossarkennung „${id}“ in: ${text}`);
    if (m.index > letzte) stuecke.push({ art: 'text', text: text.slice(letzte, m.index) });
    stuecke.push({ art: 'fachwort', id, wort: m[2] });
    letzte = m.index + m[0].length;
  }
  if (letzte < text.length) stuecke.push({ art: 'text', text: text.slice(letzte) });
  if (/\[\[|\]\]/.test(stuecke.filter((s) => s.art === 'text').map((s) => (s as { text: string }).text).join(''))) {
    throw new Error(`Unvollständige Textmarke in: ${text}`);
  }
  return stuecke;
}

/** Klartext ohne Auszeichnung (für Alt-Texte, Metadaten und Prüfungen). */
export function klartext(text: string): string {
  return zerlege(text)
    .map((s) => (s.art === 'text' ? s.text : s.wort))
    .join('');
}
