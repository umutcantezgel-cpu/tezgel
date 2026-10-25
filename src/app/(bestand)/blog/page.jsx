// Ratgeber-Liste /blog (E3-BAU-11, KERN v3.6, Zusatz E3-BAU-K016): Wissensseite auf der Vorlage WissensSeite. Inhalt, Metadaten
// und Texte kommen aus `src/inhalte/blog.ts` (Textdatei `_werkstatt/texte/blog.md`). Die Artikelliste mit Suche und
// Themenfilter (BlogFilter, Client-Insel, F-16) steht im Wissensblock „Wir erklären jedes Thema einzeln.“ (Schlitz
// `zeichnungen.artikel`, Abschnitt #wissen-1), in einer Spalte in der Lesebreite, mit den Anrissen der Textdatei (ANRISSE). Strukturierte Daten (JsonLd) setzt die Seite selbst (SeitenDaten).
import WissensSeite from '@/components/vorlagen/WissensSeite';
import BlogFilter from '@/components/blog/BlogFilter';
import { ANRISSE, BLOG } from '@/inhalte/blog';
import { createMetadata } from '@/lib/metadata';
import SeitenDaten from '@/components/seo/SeitenDaten';
import { ORG_ID, SITE_URL } from '@/lib/schema';

export const metadata = createMetadata({
  title: BLOG.meta.titel,
  description: BLOG.meta.beschreibung,
  path: '/blog',
});

export default function BlogPage() {
  return (
    <>
      <SeitenDaten
          pfad="/blog"
          titel={BLOG.meta.titel}
          beschreibung={BLOG.meta.beschreibung}
          brotkrumen={BLOG.worum.brotkrumen}
          weitere={[
              {
                  '@type': 'Blog',
                  '@id': `${SITE_URL}/blog#blog`,
                  name: 'Fliesenverlegung Tezgel Ratgeber',
                  description: 'Fachwissen und Ratgeber rund um Badsanierung, Fliesen und barrierefreie Bäder.',
                  publisher: { '@id': ORG_ID },
                  url: `${SITE_URL}/blog`,
              },
          ]}
      />
      <WissensSeite
        inhalt={BLOG}
        zeichnungen={{ artikel: <BlogFilter anrisse={ANRISSE} /> }}
      />
    </>
  );
}
