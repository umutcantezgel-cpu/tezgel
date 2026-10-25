// Ratgeber-Liste /blog (E3-BAU-11, KERN v3.6, Zusatz E3-BAU-K016): Wissensseite auf der Vorlage WissensSeite. Inhalt, Metadaten
// und Texte kommen aus `src/inhalte/blog.ts` (Textdatei `_werkstatt/texte/blog.md`). Werkzeug nach dem nächsten Schritt: die
// Artikelliste mit Suche und Themenfilter (BlogFilter, Client-Insel, F-16) mit der Kennung `artikel`; sie ist breit und steht
// ohne den Rahmen max-w-mass. Strukturierte Daten (JsonLd) stehen im Layout `src/app/(bestand)/blog/layout.tsx` und bleiben dort.
import WissensSeite from '@/components/vorlagen/WissensSeite';
import BlogFilter from '@/components/blog/BlogFilter';
import { BLOG } from '@/inhalte/blog';
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
      werkzeug={{
        id: 'artikel',
        titel: '',
        inhalt: <BlogFilter />,
      }}
    />
  );
}
