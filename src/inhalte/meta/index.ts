// Eigene Meta-Beschreibungen je Adresse (E3-SEO-META, E-050): für Seiten, deren Beschreibung aus Daten (Anriss, Projekt-
// oder Leistungstext) über 155 Zeichen lang ist und in `generatePageMetadata` mit „...“ abgeschnitten würde, und (E3-SEO-META-2,
// E-053) für Seiten, deren Beschreibung K-010 verletzt. Der Eintrag zur Adresse geht vor die übergebene Beschreibung, in den
// Metadaten und in den Seitenknoten (lib/beschreibung.ts); sichtbare Texte (Anrisse, Vorspann) bleiben, wie sie sind.
import { META_BAUTEILE } from './bauteile';
import { META_BEISPIELE } from './beispiele';
import { META_BLOG } from './blog';
import { META_FLIESEN } from './fliesen';
import { META_LEISTUNGEN } from './leistungen';
import { META_SEITEN } from './seiten';

/** Teildateien je Gruppe (für die Prüfung auf doppelte Adressen in test/meta.test.mjs) */
export const META_TEILE = { META_BAUTEILE, META_BEISPIELE, META_BLOG, META_FLIESEN, META_LEISTUNGEN, META_SEITEN };

export const META_BESCHREIBUNGEN: Readonly<Record<string, string>> = {
  ...META_BLOG,
  ...META_BEISPIELE,
  ...META_LEISTUNGEN,
  ...META_SEITEN,
  ...META_FLIESEN,
  ...META_BAUTEILE,
};
