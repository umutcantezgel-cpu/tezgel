// Eigene Meta-Beschreibungen je Adresse (E3-SEO-META, E-050): für Seiten, deren Beschreibung aus Daten (Anriss, Projekt-
// oder Leistungstext) über 155 Zeichen lang ist und in `generatePageMetadata` mit „...“ abgeschnitten würde. Der Eintrag
// zur Adresse geht vor die übergebene Beschreibung; sichtbare Texte (Anrisse, Vorspann) bleiben, wie sie sind.
import { META_BEISPIELE } from './beispiele';
import { META_BLOG } from './blog';
import { META_LEISTUNGEN } from './leistungen';

export const META_BESCHREIBUNGEN: Readonly<Record<string, string>> = { ...META_BLOG, ...META_BEISPIELE, ...META_LEISTUNGEN };
