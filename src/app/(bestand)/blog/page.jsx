// Ratgeber-Liste /blog (E3-BAU-11, KERN v3.6, Zusatz E3-BAU-K016): Wissensseite auf der Vorlage WissensSeite. Inhalt, Metadaten
// und Texte kommen aus `src/inhalte/blog.ts` (Textdatei `_werkstatt/texte/blog.md`). Die Artikelliste mit Suche und
// Themenfilter (BlogFilter, Client-Insel, F-16) steht im Wissensblock „Alle Artikel auf einen Blick.“ (Schlitz
// `zeichnungen.artikel`, Abschnitt #wissen-1), in einer Spalte in der Lesebreite, mit den Anrissen der Textdatei (ANRISSE). Strukturierte Daten (JsonLd) setzt die Seite selbst (SeitenDaten).
import WissensSeite from '@/components/vorlagen/WissensSeite';
import BlogFilter from '@/components/blog/BlogFilter';
import { ContentProvider } from '@/contexts/ContentContext';
import { categories } from '@/config/blog';
import { posts } from '@/config/posts';
import { ANRISSE, BLOG } from '@/inhalte/blog';
import { createMetadata } from '@/lib/metadata';
import SeitenDaten from '@/components/seo/SeitenDaten';
import { ORG_ID, SITE_URL } from '@/lib/schema';

export const metadata = createMetadata({
  title: BLOG.meta.titel,
  description: BLOG.meta.beschreibung,
  path: '/blog',
});

// Vorgaben des Inhaltsspeichers für die Liste (UM-E4-LEISTUNG, Maßnahme 3): Kategorien und Beiträge wie in dataService, die
// Beiträge ohne ihren Text (content; den liest erst die Beitragsseite, serverseitig aus @/config/posts). So kommen die
// Beitragstexte (rund 28 KB gzip) nicht ins Client-Bündel von /blog; Überschreibungen aus localStorage gelten wie vorher.
// Der Speicher umschließt nur die Liste (BlogFilter mit useBlogListe und BlogCard, die einzigen Leser von useContent), nicht
// das Layout: Sonst stünden die Vorgaben auch im Dokument jeder Beitragsseite.
const VORGABEN = {
  blogCategories: categories,
  blogPosts: posts.map((beitrag) => Object.fromEntries(Object.entries(beitrag).filter(([feld]) => feld !== 'content'))),
};

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
        zeichnungen={{
          artikel: (
            <ContentProvider vorgaben={VORGABEN}>
              <BlogFilter anrisse={ANRISSE} />
            </ContentProvider>
          ),
        }}
      />
    </>
  );
}
