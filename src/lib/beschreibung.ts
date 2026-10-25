// Meta-Beschreibung einer Seite an einer Stelle (E3-SEO-META, E-053): dieselbe Beschreibung steht in den Metadaten
// (`generatePageMetadata`) und in den Seitenknoten der strukturierten Daten (`buildWebPageNode`, `buildAboutPageNode`,
// `buildContactPageNode` in schema.ts). Ein eigener Eintrag zur Adresse (`META_BESCHREIBUNGEN`, src/inhalte/meta) geht vor
// die übergebene Beschreibung; danach bringt `sanitizeDescription` sie auf 120 bis 155 Zeichen. Ohne Import aus schema.ts
// (schema.ts nutzt diese Datei).
import { META_BESCHREIBUNGEN } from '@/inhalte/meta';

export function sanitizeDescription(raw: string): string {
  let desc = raw.trim().replace(/\s+/g, ' ');

  // If too short (< 120 chars), append standard trust CTA to reach 120-155 chars
  if (desc.length < 120) {
    // Alltagssprache nach K-010 („Termin bei Ihnen vor Ort“ statt „Vor-Ort-Aufmaß“, ohne Ausrufezeichen; E-049)
    const pad = ' Der Termin bei Ihnen vor Ort ist kostenfrei. Rufen Sie uns an oder schreiben Sie uns.';
    if (desc.length + pad.length <= 155) {
      desc = `${desc}${pad}`;
    } else {
      const shortPad = ' Der Termin bei Ihnen vor Ort ist kostenfrei.';
      if (desc.length + shortPad.length <= 155) {
        desc = `${desc}${shortPad}`;
      }
    }
  }

  // If too long (> 155 chars), trim cleanly at word boundary
  if (desc.length > 155) {
    const cut = desc.slice(0, 151);
    const lastSpace = cut.lastIndexOf(' ');
    desc = `${(lastSpace > 110 ? cut.slice(0, lastSpace) : cut).trim()}...`;
  }

  return desc;
}

/** Pfad einer absoluten oder relativen Adresse ohne Schrägstrich am Ende und ohne #…; Startseite „/“ */
export function pfadAus(adresse: string): string {
  const pfad = /^https?:\/\//.test(adresse) ? new URL(adresse).pathname : adresse.split('#')[0];
  return pfad.length > 1 ? pfad.replace(/\/+$/, '') : '/';
}

/** Beschreibung der Seite unter `pfad`: eigener Eintrag vor der übergebenen, gekürzt oder ergänzt auf 120 bis 155 Zeichen */
export function seitenBeschreibung(pfad: string, beschreibung: string): string {
  return sanitizeDescription(META_BESCHREIBUNGEN[pfadAus(pfad)] ?? beschreibung);
}
