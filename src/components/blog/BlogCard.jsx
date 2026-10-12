"use client";
// Ratgeber-Beitrag als Feld im Fugenraster (S-03, KERN v2 K-005/K-009): Bild im festen Rahmen 16:9 oben an der Fuge,
// darunter Kennzeile in Mono (Kategorie · Lesezeit · Datum), Titel als H3 mit Link, Auszug und „Artikel lesen“.
// Statt Karte mit Schatten, Heben und Zoom beim Hover, Verlauf über dem Foto und Pillen auf dem Bild: kein Text auf dem
// Bild, Hover wechselt nur die Fläche (Fliese → Kalk, Register `zustand`). Der Titel-Link dehnt sich über das ganze Feld
// (::after), der Fokus-Ring sitzt am Link selbst. Wortlaut, Link-Ziel und Alt-Text wie im Bestand.
// Das Feld selbst (Fuge rechts/unten) setzt die Liste (`BlogListe`), damit Raster und Hervorhebung dieselben Fugen haben.
import Link from 'next/link';
import Image from 'next/image';
import Icon from '@/components/icons/Icon';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import { useContent } from '@/contexts/ContentContext';

// Bilder mit sichtbarem Zeichen eines Bildgenerators unten rechts (Befund P4-08d, `kern/seiten/blog/bilder.ts`):
// Zuschnitt nur oben und links (`object-right-bottom`), damit die Kennzeichnung im Bild bleibt. Alle übrigen mittig.
export const BILDER_MIT_ZEICHEN = new Set([
    '/images/bad/bad-beleuchtete-nischen.webp',
    '/images/bad/bad-freistehende-wanne.webp',
    '/images/bad/bad-tageslicht.webp',
    '/images/bad/walk-in-dusche.webp',
]);

/** Zuschnitt auf den Rahmen; Bilder mit Kennzeichnung behalten die untere rechte Ecke */
export const bildZuschnitt = (src) => (BILDER_MIT_ZEICHEN.has(src) ? 'object-cover object-right-bottom' : 'object-cover');

// Bildbreite je Ansicht: mobil volle Breite, ab md zwei Spalten, ab lg zwei Spalten in 8 von 12 Spalten
// (Satzbreite 1216 px ab 1312 px Ansicht), Seitenleiste daneben.
export const BEITRAG_BILD_SIZES = '(min-width: 1312px) 400px, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw';

const BlogCard = ({ post }) => {
    const { blogCategories = [] } = useContent();
    const categoryData = (blogCategories || []).find(c => c.id === post.category);

    return (
        <article
            data-motion="zustand"
            className="group relative flex h-full flex-col bg-fliese pointer-fine:hover:bg-kalk"
        >
            {post.image ? (
                <div className="relative aspect-video border-b border-fuge bg-kalk">
                    <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes={BEITRAG_BILD_SIZES}
                        className={bildZuschnitt(post.image)}
                    />
                </div>
            ) : null}

            <div className="flex flex-1 flex-col p-6 lg:p-8">
                {/* Kennzeile: Kategorie (vormals Badge auf dem Bild), Lesezeit, Datum */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-fs-1 text-tinte-2">
                    <span className="inline-flex items-center gap-2 text-tinte">
                        <Fugenkreuz className="size-3 text-strich" />
                        {categoryData?.name || post.category}
                    </span>
                    {post.readTime && (
                        <span className="inline-flex items-center gap-2">
                            <Icon name="uhr" groesse={4} />
                            {post.readTime}
                        </span>
                    )}
                    {post.date && (
                        <span className="inline-flex items-center gap-2">
                            <Icon name="kalender" groesse={4} />
                            {post.date}
                        </span>
                    )}
                </div>

                {/* Titel mit gedehntem Link: das ganze Feld ist anklickbar, Ankertext bleibt der Titel */}
                <h3 className="mt-4 text-fs-4 text-tinte">
                    <Link
                        href={`/blog/${post.slug}`}
                        data-motion="zustand"
                        className="underline decoration-transparent decoration-1 underline-offset-4 after:absolute after:inset-0 pointer-fine:group-hover:decoration-tinte"
                    >
                        {post.title}
                    </Link>
                </h3>

                <p className="mt-3 max-w-mass flex-1 text-fs-2 text-tinte-2">
                    {post.excerpt}
                </p>

                {/* Wegtext: Teil der Fläche des Titel-Links, kein zweiter Link */}
                <div className="mt-6 flex items-center gap-2 border-t border-fuge pt-4 text-fs-2 font-semibold text-tinte">
                    <span>Artikel lesen</span>
                    <Icon name="pfeil-rechts" groesse={5} />
                </div>
            </div>
        </article>
    );
};

export default BlogCard;
