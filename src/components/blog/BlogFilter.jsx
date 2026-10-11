"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useBlogListe } from '@/lib/formulare/useBlogListe';
import BlogCard from '@/components/blog/BlogCard';
import BlogSidebar from '@/components/blog/BlogSidebar';
import Icon from '@/components/icons/Icon';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import Knopf from '@/components/kern/Knopf';
import { etikettKlassen, feldKlassen, wahlKlassen } from '@/components/kern/stile';

// Filter-Insel der Ratgeber-Liste /blog: Hook und das davon abhängige Markup (Suche und Kategorien mobil, Hervorhebung,
// Liste, Leerzustand, Seitenleiste). Reihenfolge und Texte wie im Bestand; Zeilen an der Fuge statt Karten.
export default function BlogFilter() {
  const {
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    visibleCategories,
    filteredPosts,
    featuredPost,
    showFeatured,
    gridPosts,
    getReadTime,
    resetFilters,
  } = useBlogListe();

  return (
    <div className="grid grid-cols-4 gap-y-12 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-12">
      <div className="col-span-4 min-w-0 md:col-span-8 lg:col-span-8">

        {/* Suche und Kategorien (mobil und Tablett) */}
        <div className="mb-8 flex flex-col gap-4 border-b border-fuge pb-6 lg:hidden">
          <input
            type="text"
            aria-label="Ratgeber durchsuchen"
            placeholder="Ratgeber durchsuchen..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={feldKlassen}
          />

          {visibleCategories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setActiveCategory('all')}
                aria-pressed={activeCategory === 'all'}
                className={wahlKlassen}
              >
                {activeCategory === 'all' && <Fugenkreuz className="size-3 shrink-0" />}
                Alle Themen
              </button>
              {visibleCategories.map(category => (
                <button
                  type="button"
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  aria-pressed={activeCategory === category.id}
                  className={wahlKlassen}
                >
                  {activeCategory === category.id && <Fugenkreuz className="size-3 shrink-0" />}
                  {category.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Hervorgehobener Beitrag (nur ohne Filter) */}
        {showFeatured && (
          <div className="mb-12">
            <Link
              href={`/blog/${featuredPost.slug}`}
              data-motion="zustand"
              className="group grid border border-fuge bg-fliese transition-colors dauer-1 ease-setzen hover:border-strich md:grid-cols-2"
            >
              <div className="relative h-32 border-b border-fuge md:h-auto md:border-b-0 md:border-r">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              </div>

              <div className="flex min-w-0 flex-col gap-4 p-6 sm:p-8">
                <p className={etikettKlassen}>
                  <Fugenkreuz className="size-3 shrink-0 text-strich" />
                  Empfohlener Leitfaden
                </p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-fs-1 text-tinte-2">
                  {featuredPost.date && <span>{featuredPost.date}</span>}
                  <span className="flex items-center gap-2">
                    <Icon name="uhr" groesse={4} />
                    {getReadTime(featuredPost)} Lesezeit
                  </span>
                </div>
                <h2 className="text-fs-4 text-tinte group-hover:underline underline-offset-4">
                  {featuredPost.title}
                </h2>
                <p className="font-text text-fs-3 text-tinte-2 line-clamp-3">
                  {featuredPost.excerpt}
                </p>
                <span className="mt-4 flex items-center gap-2 border-t border-fuge pt-4 font-text text-fs-2 font-semibold text-tinte">
                  Vollständigen Leitfaden lesen
                  <Icon name="pfeil-rechts" groesse={5} />
                </span>
              </div>
            </Link>
          </div>
        )}

        {/* Beiträge als Zeilen an der Fuge */}
        {gridPosts.length > 0 && (
          <ul className="border-t border-fuge">
            {gridPosts.map((post) => (
              <li key={post.id}>
                <BlogCard post={post} />
              </li>
            ))}
          </ul>
        )}

        {/* Leerzustand */}
        {filteredPosts.length === 0 && (
          <div className="flex flex-col items-start gap-4 border border-fuge bg-fliese p-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-3">
              <Icon name="suche" groesse={6} />
              <p className="font-text text-fs-3 font-semibold text-tinte">Keine Artikel zur Suchanfrage gefunden.</p>
            </div>
            <Knopf type="button" onClick={resetFilters}>
              Filter zurücksetzen
            </Knopf>
          </div>
        )}
      </div>

      {/* Seitenleiste (ab lg) */}
      <div className="hidden lg:col-span-4 lg:block">
        <BlogSidebar
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>
    </div>
  );
}
