// Ratgeber-Liste /blog (E3-BAU-11, KERN v3.6, Zusatz E3-BAU-K016): Wissensseite auf der Vorlage WissensSeite. Inhalt, Metadaten
// und Texte kommen aus `src/inhalte/blog.ts` (Textdatei `_werkstatt/texte/blog.md`). Die Artikelliste mit Suche und
// Themenfilter (BlogFilter, Client-Insel, F-16) steht im Wissensblock „Wir erklären jedes Thema einzeln.“ (Schlitz
// `zeichnungen.artikel`, Abschnitt #wissen-1), in einer Spalte in der Lesebreite, mit den Anrissen der Textdatei (ANRISSE). Strukturierte Daten (JsonLd) stehen im Layout `src/app/(bestand)/blog/layout.tsx` und bleiben dort.
import WissensSeite from '@/components/vorlagen/WissensSeite';
import BlogFilter from '@/components/blog/BlogFilter';
import { ANRISSE, BLOG } from '@/inhalte/blog';
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: BLOG.meta.titel,
  description: BLOG.meta.beschreibung,
  path: '/blog',
});

export default function BlogPage() {
  return (
    <WissensSeite
      inhalt={BLOG}
      zeichnungen={{ artikel: <BlogFilter anrisse={ANRISSE} /> }}
    />
  );
}
