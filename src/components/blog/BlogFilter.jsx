"use client";
import Link from 'next/link';
import { useBlogListe } from '@/lib/formulare/useBlogListe';
import BlogCard, { Themenmotiv, zeichenFuer } from '@/components/blog/BlogCard';
import BlogSidebar from '@/components/blog/BlogSidebar';
import Icon from '@/components/icons/Icon';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import Knopf from '@/components/kern/Knopf';
import { etikettKlassen, feldKlassen, labelKlassen, wahlKlassen } from '@/components/kern/stile';

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

        {/* Suche (sichtbar beschriftet) und Kategorien als querlaufende Zeile (mobil und Tablett); die Zeile reicht bis
            an den Bildrand, die erste Schaltfläche steht auf dem Seitenrand (16 px) */}
        <div className="mb-6 flex flex-col gap-4 border-b border-fuge pb-6 lg:hidden">
          <div>
            <label htmlFor="blog-suche-mobil" className={labelKlassen}>Ratgeber durchsuchen</label>
            <input
              id="blog-suche-mobil"
              type="text"
              placeholder="Ratgeber durchsuchen..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={feldKlassen}
            />
          </div>

          {visibleCategories.length > 0 && (
            <div className="-mx-4 flex snap-x scroll-px-4 gap-2 overflow-x-auto px-4 py-1">
              <button
                type="button"
                onClick={() => setActiveCategory('all')}
                aria-pressed={activeCategory === 'all'}
                className={`${wahlKlassen} shrink-0 snap-start gap-2`}
              >
                {activeCategory === 'all' && <Fugenkreuz className="size-3 shrink-0" />}
                Alle Themen
              </button>
              {visibleCategories.map(category => {
                const zeichen = zeichenFuer(category.id);
                return (
                  <button
                    type="button"
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    aria-pressed={activeCategory === category.id}
                    className={`${wahlKlassen} shrink-0 snap-start gap-2`}
                  >
                    {activeCategory === category.id && <Fugenkreuz className="size-3 shrink-0" />}
                    {zeichen && <Icon name={zeichen} groesse={4} />}
                    {category.name}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Hervorgehobener Beitrag (nur ohne Filter): auf dem Telefon die Zeichnung klein neben dem Text */}
        {showFeatured && (
          <div className="mb-8 md:mb-12">
            <Link
              href={`/blog/${featuredPost.slug}`}
              data-motion="zustand"
              className="group flex flex-wrap items-start border border-fuge bg-fliese transition-colors dauer-1 ease-setzen hover:border-strich md:grid md:grid-cols-2 md:items-stretch"
            >
              <Themenmotiv
                post={featuredPost}
                className="m-4 size-24 shrink-0 border border-fuge bg-fliese md:m-0 md:size-auto md:border-0 md:border-r"
              />

              {/* Telefon: Kopf neben der Zeichnung, Auszug und Abschluss über die volle Breite (zwei Zeilen im Fluss);
                  ab md eine Spalte rechts */}
              <div className="contents md:flex md:min-w-0 md:flex-col md:gap-4">
                <div className="flex min-w-0 flex-1 flex-col gap-3 pr-4 pt-4 md:flex-none md:gap-4 md:p-8 md:pb-0">
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
                </div>

                <div className="basis-full px-4 pb-4 md:px-8 md:pb-8">
                  <p className="font-text text-fs-3 text-tinte-2 line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                  <span className="mt-4 flex items-center gap-2 border-t border-fuge pt-4 font-text text-fs-2 font-semibold text-tinte">
                    Vollständigen Leitfaden lesen
                    <Icon name="pfeil-rechts" groesse={5} />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Beiträge als Zeilen an der Fuge */}
        {gridPosts.length > 0 && (
          <ul className="border-t border-fuge">
            {gridPosts.map((post) => (
              <li key={post.id}>
                <BlogCard post={post} lesezeit={getReadTime(post)} />
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

      {/* Seitenleiste (ab lg): volle Zeilenhöhe, damit der klebende Block darin ab xl unter dem Kopf mitläuft */}
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
