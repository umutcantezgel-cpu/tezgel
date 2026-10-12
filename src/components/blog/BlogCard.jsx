"use client";
import Link from 'next/link';
import { useContent } from '@/contexts/ContentContext';
import Icon from '@/components/icons/Icon';
import Verlegeplan from '@/components/kern/Verlegeplan';

/**
 * Plan und Fachzeichen je Kategorie-ID (Befund 24/26). Der Plan kommt aus `src/lib/plaene/vorgaben.ts`, das Zeichen aus
 * der Icon-Familie; gleiche Schlüssel für Plan und Zeichen. Ohne passendes Zeichen kein Zeichen (kein eigenes Symbol).
 * Unbekannte Kategorien zeigen das Fugenbild ohne Zeichen.
 */
export const KATEGORIE_MOTIV = {
    bad: { plan: 'bad', zeichen: 'bad' },
    fliesen: { plan: 'naturstein', zeichen: 'naturstein' },
    untergrund: { plan: 'abdichtung', zeichen: 'abdichtung' },
    aussen: { plan: 'balkon', zeichen: 'balkon' },
    pflege: { plan: 'fugen' },
    ratgeber: { plan: 'grossformat', zeichen: 'grossformat' },
    news: { plan: 'grossformat', zeichen: 'grossformat' },
};

const STANDARD_MOTIV = { plan: 'fugen' };

const motivFuer = (kategorie) =>
    Object.prototype.hasOwnProperty.call(KATEGORIE_MOTIV, kategorie) ? KATEGORIE_MOTIV[kategorie] : STANDARD_MOTIV;

/** Fachzeichen der Kategorie, oder undefined (dann kein Zeichen) */
export const zeichenFuer = (kategorie) => motivFuer(kategorie).zeichen;

/**
 * Gezeichnetes Themenmotiv statt Foto (dekorativ, aria-hidden über Verlegeplan): Plan ohne Achse und ohne Bemaßung
 * auf Fliese im Fugenrahmen. `className` setzt Größe und Rahmen des jeweiligen Ortes.
 */
export function Themenmotiv({ kategorie, className }) {
    return (
        <div className={`flex items-center justify-center overflow-hidden p-3 ${className}`}>
            <Verlegeplan plan={motivFuer(kategorie).plan} ohneAchse bemassung={false} className="h-full w-full" />
        </div>
    );
}

/**
 * Blog Card (Zeile an der Fuge, Halbverband wie RatgeberListe): Themenmotiv im Fugenrahmen (unter sm über volle Breite
 * im Seitenverhältnis 3:2, ab sm links als Quadrat), Kennzeile als eine Mono-Zeile (Kategorie, Lesezeit, Datum),
 * Titel als Link über die ganze Zeile, Auszug, „Artikel lesen“.
 */
const BlogCard = ({ post }) => {
    const { blogCategories = [] } = useContent();
    const categoryData = (blogCategories || []).find(c => c.id === post.category);
    const zeichen = zeichenFuer(post.category);

    return (
        <div className="group relative flex flex-col gap-4 border-b border-fuge px-4 py-6 transition-colors dauer-1 ease-setzen hover:border-strich hover:bg-fliese focus-within:border-strich focus-within:bg-fliese sm:flex-row sm:items-start md:gap-6 md:px-6 lg:gap-8 lg:px-8 lg:py-8" data-motion="zustand">
            {/* Themenmotiv */}
            <Themenmotiv
                kategorie={post.category}
                className="aspect-3/2 w-full shrink-0 border border-fuge bg-fliese sm:aspect-auto sm:size-24 md:size-32"
            />

            {/* Kennzeile, Titel, Auszug */}
            <div className="min-w-0 flex-1">
                <p className="flex min-w-0 items-center gap-2 whitespace-nowrap font-mono text-fs-1 text-tinte-2">
                    <span className="flex shrink-0 items-center gap-2 text-tinte">
                        {zeichen && <Icon name={zeichen} groesse={4} />}
                        {categoryData?.name || post.category}
                    </span>
                    {post.readTime && (
                        <>
                            <span aria-hidden="true" className="shrink-0">·</span>
                            <span className="flex min-w-0 items-center gap-2">
                                <Icon name="uhr" groesse={4} />
                                <span className="truncate">{post.readTime}</span>
                            </span>
                        </>
                    )}
                    {post.date && (
                        <>
                            <span aria-hidden="true" className="shrink-0">·</span>
                            <span className="shrink-0">{post.date}</span>
                        </>
                    )}
                </p>

                <h3 className="mt-2 text-fs-4 text-tinte">
                    <Link href={`/blog/${post.slug}`} className="text-tinte no-underline decoration-strich underline-offset-4 hover:underline focus-visible:underline after:absolute after:inset-0">
                        {post.title}
                    </Link>
                </h3>

                <p className="mt-2 max-w-mass font-text text-fs-3 text-tinte-2 line-clamp-3">
                    {post.excerpt}
                </p>

                <span className="mt-4 flex items-center gap-2 font-text text-fs-2 font-semibold text-tinte">
                    Artikel lesen
                    <Icon name="pfeil-rechts" groesse={5} />
                </span>
            </div>
        </div>
    );
};

export default BlogCard;
