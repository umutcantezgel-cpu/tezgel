// Ansicht der Ratgeber-Liste `/blog` (P4-08d, KERN v1.2 K-011 Arbeitsseite): Suche und Kategorien, hervorgehobener Leitfaden,
// Raster der Beiträge, Leerzustand und ab lg das Randfeld „Beratung gewünscht?“. Ohne eigene Logik: Alles, was die Liste
// auswählt oder zurücksetzt, kommt aus `useBlogListe` (F-16), demselben Hook wie im Bestand `(bestand)/blog/page.jsx`.
// Zwei Ableitungen stehen hier, weil ihr Bestand in Komponenten liegt, die P4-08d nicht ändert:
// - Kategoriename je Beitrag wie `BlogCard.jsx` (`categoryData?.name || post.category`);
// - Kategorien der Seitenleiste wie `BlogSidebar.jsx` („all“ oder mit Beiträgen) – gebildet aus `visibleCategories` des
//   Hooks, Reihenfolge der Konfiguration: dieselbe Menge, weil `visibleCategories` genau die übrigen mit Beiträgen sind.
// Leerzustand: Die Vorlage zeigt ihn bei leerem Raster ohne Hervorhebung; das ist gleichwertig zu
// `filteredPosts.length === 0` des Bestands (die Hervorhebung steht nur ohne Filter, dann ist `filteredPosts` voll).
// Lesefolge wie im Bestand, mit zwei Ausnahmen der Form: die Desktop-Suche steht über der Liste (Lehre 7, siehe `Filter`),
// und in der Hervorhebung steht das Datum als gerahmtes Mono-Etikett vor der Lesezeit (Bestand: Pille, dieselbe Folge).
// Das Randfeld steht wie die Seitenleiste des Bestands nur ab lg (`hidden lg:block`); mobil trägt die untere Leiste die
// Anfrage, und das Qualitätsversprechen folgt direkt.
import { useId, type ReactNode } from 'react';
import type { BlogBeitrag, BlogListe } from '@/lib/formulare/useBlogListe';
import Abschnitt from '@/components/kern/vorlagen/teile/Abschnitt';
import Beitragsliste, { type Beitrag, type Hervorhebung } from '@/components/kern/vorlagen/liste/Beitragsliste';
import { FilterBreit, FilterSchmal } from '@/components/kern/seiten/blog/Filter';
import { bildVon } from '@/components/kern/seiten/blog/bilder';

export type ListeAnsichtProps = {
  liste: BlogListe;
  /** Randfeld „Beratung gewünscht?“ (Server-Komponente der Seite) */
  beratung?: ReactNode;
};

const LEER_TEXT = 'Keine Artikel zur Suchanfrage gefunden.';
const LEER_KNOPF = 'Filter zurücksetzen';

export default function ListeAnsicht({ liste, beratung }: ListeAnsichtProps) {
  const {
    blogCategories,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    visibleCategories,
    featuredPost,
    showFeatured,
    gridPosts,
    getReadTime,
    resetFilters,
  } = liste;
  const kategorienId = `k-blog-kategorien${useId()}`;
  const alleKategorien = blogCategories || [];

  const kategorieName = (post: BlogBeitrag) => alleKategorien.find((c) => c.id === post.category)?.name || post.category;
  const leiste = alleKategorien.filter((c) => c.id === 'all' || visibleCategories.includes(c));

  const beitrag = (post: BlogBeitrag): Beitrag => ({
    href: `/blog/${post.slug}`,
    titel: post.title,
    text: post.excerpt,
    kategorie: kategorieName(post),
    lesezeit: post.readTime,
    datum: post.date,
    bild: bildVon(post.image, post.title),
  });

  const hervorhebung: Hervorhebung | undefined =
    showFeatured && featuredPost
      ? {
          href: `/blog/${featuredPost.slug}`,
          titel: featuredPost.title,
          text: featuredPost.excerpt,
          marke: 'Empfohlener Leitfaden',
          // Datum als gerahmtes Etikett vor der Lesezeit (Folge des Bestands), Kategorie zeigt der Bestand hier nicht
          kategorie: featuredPost.date,
          lesezeit: `${getReadTime(featuredPost)} Lesezeit`,
          bild: bildVon(featuredPost.image, featuredPost.title),
          mehr: 'Vollständigen Leitfaden lesen',
        }
      : undefined;

  const filter = { suchwert: searchQuery, setSearchQuery, aktiv: activeCategory, setActiveCategory };

  return (
    <Abschnitt dichte="eng">
      <FilterSchmal {...filter} kategorien={visibleCategories.length > 0 ? [{ id: 'all', name: 'Alle Themen' }, ...visibleCategories] : undefined} />
      <FilterBreit {...filter} titelId={kategorienId} kategorien={leiste.length > 1 ? leiste : undefined} />

      <div className="mt-k-6 grid lg:grid-cols-12 lg:items-start">
        <div className="min-w-0 lg:col-span-8 lg:border-r lg:border-k-fuge lg:pr-k-7">
          <Beitragsliste
            hervorhebung={hervorhebung}
            beitraege={gridPosts.map(beitrag)}
            mehr="Artikel lesen"
            leer={{ text: LEER_TEXT, zuruecksetzen: LEER_KNOPF, onZuruecksetzen: resetFilters }}
            erstesBildVorladen
          />
        </div>
        {beratung ? <div className="hidden min-w-0 lg:col-span-4 lg:block lg:self-stretch lg:pl-k-6">{beratung}</div> : null}
      </div>
    </Abschnitt>
  );
}
