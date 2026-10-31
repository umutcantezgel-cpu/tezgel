"use client";
import Link from 'next/link';
import { useContent } from '@/contexts/ContentContext';
import Icon from '@/components/icons/Icon';
import Kennzeile, { Angabe, Datum } from '@/components/blog/liste/Kennzeile';
import Textmarken from '@/components/kern/Textmarken';
import { zeichenFuer } from '@/lib/blog/motive';

// Themenmotive aus einer Quelle (src/lib/blog/motive.js); zeichenFuer bleibt hier erreichbar (Filter, Seitenleiste)
export { zeichenFuer };

/**
 * Ratgeber-Beitrag als Zeile an der Fuge (F-03 Fusion E-039): <article> mit genau einem Link, dem Titel in der Überschrift,
 * per ::after über die ganze Zeile gestreckt; „Artikel lesen“ ist Teil dieser Fläche, kein zweiter Link. Fokus: Ring am Titel
 * (global :focus-visible), dazu hebt focus-within die Zeile (Fliese, Unterkante Strich).
 * Breite kompakte Zeile (UM-E4-SICHT-FIX M-C8 Nr. 3 bis 5): Die Zeichnung ist die Plan-Vignette des Beitrags (fertiger Knoten
 * vom Server, `zeichnung`, dekorativ, steht ab dem ersten Bild), im Feld 4 : 3.
 * - Telefon: Zeichnung (64 px) links, daneben Kennzeile, Titel, Anriss und Weg in einer Spalte; bei großer Schrift die
 *   Zeichnung über der Spalte.
 * - ab md: Zeichnung (128 px) links, Kennzeile, Titel, Anriss und Weg in der Spalte daneben.
 * - ab lg (t1024): eine Zeile über die volle Inhaltsbreite im Sechserraster: die Zeichnung ein Sechstel breit, Titel und
 *   Anriss über vier Sechstel, rechts die Kennzeile (Thema und Lesezeit in Mono) und darunter der Weg.
 * Nacharbeit SF-C1 (Übersicht zu lang: d1440 Zeile rund 222 px, mobil unverändert lang): ab lg steht der Weg in der rechten
 * Spalte und die Zeichnung ist ein Sechstel statt ein Fünftel breit (Zeile rund 175 px statt 222 px), mobil steht die Zeichnung neben der
 * Spalte statt in einer eigenen Reihe.
 * Der Anriss steht auf zwei Zeilen (line-clamp, der ganze Text bleibt im DOM und für den Vorleser), ein Anriss mit Fachwort
 * ganz (seine Erklärung in Klammern bliebe sonst halb stehen); der Titel trägt die Zeilenhöhe der Anzeigestufe und dieselbe
 * Breite wie der Anriss (Satzmaß, ohne frühe Umbrüche). Überschrift der Zeile in jedem Zustand H3 (Gruppenköpfe H2).
 * `anriss`: Anriss aus dem Seitentext (mit Textmarken, /blog); sonst der Auszug aus den Beitragsdaten.
 */
const BlogCard = ({ post, lesezeit, anriss, zeichnung }) => {
    const { blogCategories = [] } = useContent();
    const categoryData = (blogCategories || []).find(c => c.id === post.category);

    return (
        <article
            data-motion="zustand"
            className="@container wrap-break-word relative flex items-start gap-4 border-b border-fuge py-6 transition-colors dauer-1 ease-setzen hover:border-strich focus-within:border-strich @max-xs:flex-wrap md:gap-6 md:px-6 md:py-8 md:hover:bg-fliese md:focus-within:bg-fliese lg:grid lg:grid-cols-6 lg:items-center lg:gap-x-8 lg:gap-y-2 lg:px-8 lg:py-6"
        >
            {zeichnung && (
                <div aria-hidden="true" className="flex aspect-4/3 w-16 shrink-0 items-center justify-center border border-fuge bg-fliese p-1 text-tinte md:w-32 md:p-2 lg:row-span-2 lg:w-full lg:p-3">
                    {zeichnung}
                </div>
            )}

            {/* Telefon und ab md eine Spalte neben der Zeichnung; ab lg stehen ihre Teile im Raster der Zeile (contents):
                Titel und Anriss in der Mitte, Kennzeile und Weg rechts */}
            <div className="min-w-0 flex-1 @max-xs:basis-full lg:contents">
                <Kennzeile className="lg:col-start-6 lg:row-start-1 lg:flex-col lg:items-end lg:gap-y-2 lg:self-end lg:text-right">
                    <Angabe zeichen={zeichenFuer(post.category)} className="text-tinte">
                        {categoryData?.name || post.category}
                    </Angabe>
                    {lesezeit && <Angabe zeichen="uhr">{lesezeit}</Angabe>}
                    <Datum post={post} />
                </Kennzeile>

                <div className="mt-2 min-w-0 lg:col-span-4 lg:row-span-2 lg:mt-0">
                    <h3 className="max-w-mass text-fs-4 leading-tight text-pretty text-tinte hyphens-auto">
                        <Link
                            href={`/blog/${post.slug}`}
                            data-motion="zustand"
                            className="text-tinte no-underline decoration-strich underline-offset-4 hover:underline focus-visible:underline after:absolute after:inset-0"
                        >
                            {post.title}
                        </Link>
                    </h3>

                    {/* zwei Zeilen; ein Anriss mit Fachwort (erstes Vorkommen mit Erklärung, K-011) steht ganz, sonst schnitte die
                        Klammer mitten in der Erklärung ab */}
                    <p className={`mt-2 max-w-mass font-text text-fs-3 text-tinte-2 ${anriss?.includes('[[') ? '' : 'line-clamp-2'}`}>
                        {anriss ? <Textmarken text={anriss} /> : post.excerpt}
                    </p>
                </div>

                <span className="mt-3 flex items-center gap-2 font-text text-fs-2 font-semibold text-tinte lg:col-start-6 lg:row-start-2 lg:mt-0 lg:self-start lg:justify-end">
                    <span className="underline decoration-strich underline-offset-4">Artikel lesen</span>
                    <Icon name="pfeil-rechts" groesse={5} />
                </span>
            </div>
        </article>
    );
};

export default BlogCard;
