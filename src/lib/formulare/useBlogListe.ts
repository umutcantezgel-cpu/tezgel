// Logik der Ratgeber-Liste `/blog` (F-16 Suche, Kategorien, Filter, Leerzustand) – wörtlich aus `(bestand)/blog/page.jsx`
// verschoben (P4-08d, Vorbild P4-05a/P3-00l). Ohne Markup; Bestand und Kern-Ansicht nutzen denselben Hook.
// Keine Logikänderung (G9): Die Suche prüft Titel und Auszug ohne `trim`, die Seitenleiste des Bestands (`BlogSidebar.jsx`)
// filtert ihre Kategorien weiter selbst (BEFUNDE der Rückgabe P4-08d).
// Neu sind nur die Typangaben und die Namen der vier Ausdrücke, die vorher inline im Markup standen
// (`showFeatured`, `gridPosts`, `getReadTime`, `resetFilters`); ihr Wortlaut ist unverändert.
import { useState } from 'react';
import { useContent } from '@/contexts/ContentContext';

/** Kategorie aus `@/config/blog` (bzw. aus dem Inhaltsspeicher); `icon` ist eine lucide-Komponente (nur Bestand). */
export type BlogKategorie = { id: string; name: string; icon?: unknown };

/** Beitrag aus `@/config/posts` (bzw. aus dem Inhaltsspeicher), soweit die Liste ihn liest. */
export type BlogBeitrag = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date?: string;
  readTime?: string;
  reading_time?: string | number;
  image?: string;
  featured?: boolean;
};

type BlogInhalt = { blogCategories?: BlogKategorie[] | null; blogPosts?: BlogBeitrag[] | null };

export function useBlogListe() {
  const { blogCategories = [], blogPosts = [] } = useContent() as BlogInhalt;
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const allPosts = blogPosts || [];

  // Only offer category filters that actually contain articles (generic, data-driven).
  const visibleCategories = (blogCategories || []).filter(category =>
    category.id !== 'all' && allPosts.some(post => post.category === category.id)
  );

  // Filter posts based on category and search query
  const filteredPosts = allPosts.filter(post => {
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = allPosts.find(post => post.featured);

  // vorher inline im Markup: Bedingung der Hervorhebung
  const showFeatured = featuredPost && activeCategory === 'all' && !searchQuery;

  // vorher inline im Markup: Beiträge im Raster (ohne den hervorgehobenen, solange er oben steht)
  const gridPosts = filteredPosts
    .filter(post => !(featuredPost && activeCategory === 'all' && !searchQuery && post.id === featuredPost.id));

  // vorher inline im Markup: Lesezeit der Hervorhebung
  const getReadTime = (post: BlogBeitrag) => post.readTime || `${post.reading_time || '5'} Min.`;

  // vorher inline im Markup: „Filter zurücksetzen“ im Leerzustand
  const resetFilters = () => { setActiveCategory('all'); setSearchQuery(''); };

  return {
    blogCategories,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    allPosts,
    visibleCategories,
    filteredPosts,
    featuredPost,
    showFeatured,
    gridPosts,
    getReadTime,
    resetFilters,
  };
}

export type BlogListe = ReturnType<typeof useBlogListe>;
