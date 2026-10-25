"use client";
import Link from 'next/link';
import { useContent } from '@/contexts/ContentContext';
import Icon from '@/components/icons/Icon';
import Verlegeplan from '@/components/kern/Verlegeplan';
import Kennzeile, { Angabe, Datum } from '@/components/blog/liste/Kennzeile';
import Textmarken from '@/components/kern/Textmarken';
import { planFuer, zeichenFuer } from '@/lib/blog/motive';

// Themenmotive aus einer Quelle (src/lib/blog/motive.js); zeichenFuer bleibt hier erreichbar (Filter, Seitenleiste)
export { zeichenFuer };

/**
 * Gezeichnetes Themenmotiv statt Foto (dekorativ, aria-hidden über Verlegeplan): Plan des Beitrags ohne Achse und ohne
 * Bemaßung auf Fliese im Fugenrahmen. `className` setzt Größe und Rahmen des jeweiligen Ortes.
 */
export function Themenmotiv({ post, className }) {
    return (
        <div className={`flex items-center justify-center overflow-hidden p-3 ${className}`}>
            <Verlegeplan plan={planFuer(post)} ohneAchse bemassung={false} className="h-full w-full" />
        </div>
    );
}

/**
 * Ratgeber-Beitrag als Zeile an der Fuge (Halbverband wie RatgeberListe, F-03 Fusion E-039): Zeile aus A, Semantik aus B.
 * <article> mit genau einem Link: dem Titel in der H3, per ::after über die ganze Zeile gestreckt; „Artikel lesen“ ist
 * Teil dieser Fläche, kein zweiter Link. Fokus: Ring am Titel (global :focus-visible), dazu hebt focus-within die Zeile
 * (Fliese, Unterkante Strich).
 * Telefon: Zeichnung (96 px) und Kennzeile nebeneinander, Titel, Auszug und Weg darunter über die volle Breite;
 * ab md die Zeichnung (128 px) links, alles Übrige in der Spalte daneben. Der Auszug steht voll (kein line-clamp).
 * `anriss`: Anriss aus dem Seitentext (mit Textmarken, /blog); sonst der Auszug aus den Beitragsdaten.
 */
const BlogCard = ({ post, lesezeit, anriss }) => {
    const { blogCategories = [] } = useContent();
    const categoryData = (blogCategories || []).find(c => c.id === post.category);

    return (
        <article
            data-motion="zustand"
            className="relative flex flex-wrap items-center gap-4 border-b border-fuge py-6 transition-colors dauer-1 ease-setzen hover:border-strich focus-within:border-strich md:flex-nowrap md:items-start md:gap-6 md:px-6 md:py-8 md:hover:bg-fliese md:focus-within:bg-fliese lg:gap-8 lg:px-8"
        >
            <Themenmotiv
                post={post}
                className="size-24 shrink-0 border border-fuge bg-fliese md:size-32"
            />

            {/* Telefon: Kennzeile neben der Zeichnung, der Rest in einer eigenen Zeile; ab md eine Spalte rechts */}
            <div className="contents md:block md:min-w-0 md:flex-1">
                <Kennzeile className="flex-1">
                    <Angabe zeichen={zeichenFuer(post.category)} className="text-tinte">
                        {categoryData?.name || post.category}
                    </Angabe>
                    {lesezeit && <Angabe zeichen="uhr">{lesezeit}</Angabe>}
                    <Datum post={post} />
                </Kennzeile>

                <div className="min-w-0 basis-full md:mt-2">
                    <h3 className="text-fs-4 text-tinte">
                        <Link
                            href={`/blog/${post.slug}`}
                            data-motion="zustand"
                            className="text-tinte no-underline decoration-strich underline-offset-4 hover:underline focus-visible:underline after:absolute after:inset-0"
                        >
                            {post.title}
                        </Link>
                    </h3>

                    <p className="mt-2 max-w-mass font-text text-fs-3 text-tinte-2">
                        {anriss ? <Textmarken text={anriss} /> : post.excerpt}
                    </p>

                    <span className="mt-4 flex items-center gap-2 font-text text-fs-2 font-semibold text-tinte">
                        Artikel lesen
                        <Icon name="pfeil-rechts" groesse={5} />
                    </span>
                </div>
            </div>
        </article>
    );
};

export default BlogCard;
