// Kopf Variante A: Navigationsmodell, gelesen aus `@/config/navigation` (eingefroren). Nur Server-Teile importieren
// diese Datei; Client-Teile bekommen kleine, fertige Werte als Props (Pfadlisten), nie die ganze Konfiguration.
// Kein Eintrag fällt weg, keiner kommt hinzu: Reihenfolge, Namen, Pfade, Kategorien, Beschreibungen und „featured“ wörtlich.
import { navigationLinks, primaryCta } from '@/config/navigation';

export type Punkt = { name: string; path: string; desc?: string };
export type Kategorie = { category: string; items: Punkt[] };
export type Hervorgehoben = { eyebrow: string; title: string; text: string; cta: { label: string; path: string } };
export type Bereich = {
  name: string;
  path: string;
  description: string;
  kategorien: Kategorie[];
  featured?: Hervorgehoben;
  /** Pfade, unter denen der Bereich als aktiv gilt (Hauptpfad und alle Unterpunkte). */
  pfade: string[];
};

type Roh = {
  name: string;
  path: string;
  description: string;
  submenu?: Kategorie[];
  featured?: Hervorgehoben;
};

export const BEREICHE: readonly Bereich[] = (navigationLinks as Roh[]).map((link) => {
  const kategorien = link.submenu ?? [];
  const pfade = [...new Set([link.path, ...kategorien.flatMap((k) => k.items.map((p) => p.path))])];
  return { name: link.name, path: link.path, description: link.description, kategorien, featured: link.featured, pfade };
});

/** Ziel des Hauptknopfs (Wortlaut im Kern: TEXTE.hauptknopf). */
export const HAUPTZIEL: string = primaryCta.path;
