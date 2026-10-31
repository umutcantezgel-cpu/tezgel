// Ratgeber-Liste /blog (E3-BAU-11, KERN v3.6, Zusatz E3-BAU-K016): Wissensseite auf der Vorlage WissensSeite. Inhalt, Metadaten
// und Texte kommen aus `src/inhalte/blog.ts` (Textdatei `_werkstatt/texte/blog.md`). Die Artikelliste mit Suche und
// Themenfilter (BlogFilter, Client-Insel, F-16) steht im Wissensblock „Alle Artikel auf einen Blick.“ (Schlitz
// `zeichnungen.artikel`, Abschnitt #wissen-1), mit den Anrissen der Textdatei (ANRISSE): Suche und Themen in der Lesebreite,
// darunter der Leitartikel und die Liste nach Thema in breiten kompakten Zeilen (UM-E4-SICHT-FIX M-C8). Strukturierte Daten
// (JsonLd) setzt die Seite selbst (SeitenDaten).
import WissensSeite from '@/components/vorlagen/WissensSeite';
import BlogFilter from '@/components/blog/BlogFilter';
import { ContentProvider } from '@/contexts/ContentContext';
import { categories } from '@/config/blog';
import { posts } from '@/config/posts';
import { ANRISSE, BLOG, nachThema, zeichnungFuer } from '@/inhalte/blog';
import Verlegeplan from '@/components/kern/Verlegeplan';
import { VIGNETTEN } from '@/components/kern/vignetten';
import { planFuer } from '@/lib/blog/motive';
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
// Liste nach Thema (UM-E4-SICHT-FIX M-C8): die Beiträge vorsortiert nach der Folge der Kategorien, die Stellenanzeige zuletzt
// (nachThema); die Insel gruppiert nur noch nach Thema, ohne eigene Sortierung.
const VORGABEN = {
  blogCategories: categories,
  blogPosts: nachThema(posts, categories).map((beitrag) => Object.fromEntries(Object.entries(beitrag).filter(([feld]) => feld !== 'content'))),
};

// Zeichnungen der Liste auf dem Server (M-C8 Nr. 4): je Beitrag die Plan-Vignette seines Gegenstands (zeichnungFuer, Nacharbeit
// SF-C1), für den Leitartikel der Verlegeplan seines Themas groß, ohne rote Achse; die Insel bekommt jede benutzte Vignette
// einmal als fertigen Knoten (`zeichnungen`, nach Name) und je Beitrag nur den Namen (`motive`), sie trägt selbst keinen
// Zeichencode. Der Leitartikel rückt sein Fugenbild beim Zeigen in die Flucht (sig-plan am Kasten, Leitfaden.jsx).
const MOTIVE = Object.fromEntries(posts.map((beitrag) => [beitrag.slug, zeichnungFuer(beitrag.slug, beitrag.category)]));
const ZEICHNUNGEN = Object.fromEntries(
  [...new Set(Object.values(MOTIVE).filter(Boolean))].map((name) => {
    const Vignette = VIGNETTEN[name];
    return [name, <Vignette key={name} fuellen />];
  }),
);
const LEITARTIKEL = posts.find((beitrag) => beitrag.featured);
const LEITZEICHNUNG = LEITARTIKEL ? <Verlegeplan plan={planFuer(LEITARTIKEL)} ohneAchse bemassung={false} /> : null;

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
              <BlogFilter anrisse={ANRISSE} zeichnungen={ZEICHNUNGEN} motive={MOTIVE} leitzeichnung={LEITZEICHNUNG} />
            </ContentProvider>
          ),
        }}
      />
    </>
  );
}
