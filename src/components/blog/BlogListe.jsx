"use client";
// Ratgeber-Liste `/blog` (S-03, KERN v2 Arbeitsansicht nach `/kontakt`): einzige Client-Insel der Seite. Zustand und
// Filterlogik kommen unverändert aus `useBlogListe` (F-16); hier steht nur die Darstellung.
// Folge im DOM: Seitenleiste (ab lg sichtbar, rechts) · Suche und Themen (unter lg sichtbar, oben) · Raster mit
// Hervorhebung und Beiträgen · Leerzustand. So stehen Suche und Filter in jeder Breite vor den Beiträgen, die sie filtern
// (Tab-Folge, Lesefolge); das Raster stellt die Leiste ab lg trotzdem rechts neben die Liste.
// Je Breite steht genau ein Suchfeld und eine Knopfgruppe im Barrierebaum (die andere Fassung ist display:none), wie im
// Bestand: unter lg „Ratgeber durchsuchen“ und „Alle Themen“, ab lg „Artikel suchen“ und „Alle Artikel“ (Test F-16).
// Bewegung nur `zustand` (Farbwechsel) und `druck` (Knöpfe); Filterwechsel ohne Animation, kein `auftritt`.
import { useId } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
import Icon from '@/components/icons/Icon';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import Knopf from '@/components/kern/Knopf';
import { etikettForm, feldKlassen, labelKlassen, seitenKlassen, wahlKlassen } from '@/components/kern/stile';
import { useBlogListe } from '@/lib/formulare/useBlogListe';
import BlogCard, { BEITRAG_BILD_SIZES, bildZuschnitt } from '@/components/blog/BlogCard';
import BlogSidebar from '@/components/blog/BlogSidebar';

/**
 * Hervorgehobener Leitfaden: breites Feld über beide Spalten des Rasters, Bild links, Text rechts (ab md).
 * Das Bild ist gemessen das LCP-Element bei 1440 × 900 und 768 × 1024 (sonst der Vorspann); mobil liegt es knapp unter
 * dem ersten Bildschirm und würde auch verzögert sofort geladen – darum `preload` (Next 16 statt `priority`).
 */
function Leitfaden({ post, lesezeit }) {
    return (
        <article data-motion="zustand" className="group relative grid bg-fliese md:grid-cols-2 pointer-fine:hover:bg-kalk">
            {post.image ? (
                // Rahmen 4:3 (mobil) bzw. 3:4 (ab md) als Mindesthöhe; ist der Text daneben höher, füllt das Bild die Zeile
                <div className="relative aspect-4/3 self-stretch justify-self-stretch border-b border-fuge bg-kalk md:aspect-3/4 md:border-b-0">
                    <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes={BEITRAG_BILD_SIZES}
                        preload
                        className={bildZuschnitt(post.image)}
                    />
                </div>
            ) : null}

            <div className="flex min-w-0 flex-col p-6 md:border-l md:border-fuge lg:p-8">
                <p className={clsx(etikettForm, 'text-tinte')}>
                    <Fugenkreuz className="size-3 text-laser" />
                    Empfohlener Leitfaden
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-fs-1 text-tinte-2">
                    {post.date && (
                        <span className="inline-flex items-center gap-2">
                            <Icon name="kalender" groesse={4} />
                            {post.date}
                        </span>
                    )}
                    <span className="inline-flex items-center gap-2">
                        <Icon name="uhr" groesse={4} />
                        {lesezeit} Lesezeit
                    </span>
                </div>

                <h2 className="mt-4 text-fs-5 text-tinte">
                    <Link
                        href={`/blog/${post.slug}`}
                        data-motion="zustand"
                        className="underline decoration-transparent decoration-1 underline-offset-4 after:absolute after:inset-0 pointer-fine:group-hover:decoration-tinte"
                    >
                        {post.title}
                    </Link>
                </h2>

                <p className="mt-4 max-w-mass flex-1 text-fs-3 text-tinte-2">
                    {post.excerpt}
                </p>

                {/* Wegtext: Teil der Fläche des Titel-Links, kein zweiter Link */}
                <div className="mt-6 flex items-center gap-2 border-t border-fuge pt-4 text-fs-2 font-semibold text-tinte">
                    <span className="underline decoration-strich decoration-1 underline-offset-4">Vollständigen Leitfaden lesen</span>
                    <Icon name="pfeil-rechts" groesse={5} />
                </div>
            </div>
        </article>
    );
}

/** Suchfeld mit sichtbarer Beschriftung (vormals aria-label, gleicher Wortlaut) und Such-Icon im Feld. */
function Suchfeld({ beschriftung, platzhalter, wert, setzen }) {
    const id = useId();
    return (
        <div role="search">
            <label htmlFor={id} className={labelKlassen}>{beschriftung}</label>
            <div className="relative">
                <input
                    id={id}
                    type="text"
                    placeholder={platzhalter}
                    value={wert}
                    onChange={(e) => setzen(e.target.value)}
                    data-motion="zustand"
                    className={clsx(feldKlassen, 'pr-12')}
                />
                <span className="pointer-events-none absolute top-2 right-4 bottom-0 flex items-center text-tinte-2">
                    <Icon name="suche" groesse={5} />
                </span>
            </div>
        </div>
    );
}

export default function BlogListe() {
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

    const themen = [{ id: 'all', name: 'Alle Themen' }, ...visibleCategories];

    return (
        <div className={clsx(seitenKlassen, 'pt-8 pb-12 lg:py-16')}>
            <div className="grid grid-cols-4 gap-y-8 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-8">

                {/* SEITENLEISTE (ab lg): im DOM vor der Liste, im Raster rechts */}
                <div className="hidden lg:col-span-4 lg:col-start-9 lg:row-start-1 lg:block">
                    <BlogSidebar
                        activeCategory={activeCategory}
                        setActiveCategory={setActiveCategory}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                    />
                </div>

                <div className="col-span-4 min-w-0 md:col-span-8 lg:col-start-1 lg:row-start-1">

                    {/* SUCHE UND THEMEN (unter lg): Suche zuerst, Themen mobil waagrecht scrollbar */}
                    <div className="mb-8 flex flex-col gap-6 lg:hidden">
                        <Suchfeld
                            beschriftung="Ratgeber durchsuchen"
                            platzhalter="Ratgeber durchsuchen..."
                            wert={searchQuery}
                            setzen={setSearchQuery}
                        />

                        {visibleCategories.length > 0 && (
                            // Rand bis an die Bildschirmkante; py-1/px-4 lassen den Fokusring (2 px + 2 px Abstand) frei
                            <div className="-mx-4 overflow-x-auto px-4 py-1 ohne-scrollleiste md:mx-0 md:overflow-visible md:px-0">
                                <div className="flex w-max gap-2 md:w-auto md:flex-wrap">
                                    {themen.map(category => {
                                        const gedrueckt = activeCategory === category.id;
                                        return (
                                            <button
                                                type="button"
                                                key={category.id}
                                                onClick={() => setActiveCategory(category.id)}
                                                aria-pressed={gedrueckt}
                                                data-motion="zustand"
                                                className={clsx(wahlKlassen, 'gap-2 whitespace-nowrap')}
                                            >
                                                {gedrueckt && <Fugenkreuz className="size-3" />}
                                                <span>{category.name}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* RASTER: Hervorhebung über beide Spalten, Beiträge als Felder an der Fuge */}
                    {(showFeatured || gridPosts.length > 0) && (
                        <ul className="grid grid-cols-1 border-t border-l border-fuge md:grid-cols-2">
                            {showFeatured && (
                                <li className="border-r border-b border-fuge md:col-span-2">
                                    <Leitfaden post={featuredPost} lesezeit={getReadTime(featuredPost)} />
                                </li>
                            )}
                            {gridPosts.map((post) => (
                                <li key={post.id} className="border-r border-b border-fuge">
                                    <BlogCard post={post} />
                                </li>
                            ))}
                        </ul>
                    )}

                    {/* LEERZUSTAND in einer stets vorhandenen Statusregion: der Wechsel zu „keine Treffer“ wird angesagt */}
                    <div role="status">
                        {filteredPosts.length === 0 && (
                            <div className="flex flex-col items-start gap-6 border border-l-2 border-strich bg-fliese p-6 md:flex-row md:items-center md:justify-between lg:p-8">
                                <p className="flex items-start gap-3 text-fs-3 font-semibold text-tinte">
                                    <Icon name="suche" groesse={6} className="text-tinte-2" />
                                    <span>Keine Artikel zur Suchanfrage gefunden.</span>
                                </p>
                                <Knopf type="button" variante="neben" onClick={resetFilters}>
                                    Filter zurücksetzen
                                </Knopf>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
