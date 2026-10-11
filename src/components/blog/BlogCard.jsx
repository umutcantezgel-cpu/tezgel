"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useContent } from '@/contexts/ContentContext';
import Icon from '@/components/icons/Icon';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import { linkKlassen } from '@/components/kern/stile';

/**
 * Blog Card (Zeile an der Fuge, Halbverband wie RatgeberListe): Bild als Quadrat im Fugenrahmen, Kennzeile in Mono
 * (Kategorie, Lesezeit, Datum), Titel als Link über die ganze Zeile, Auszug, „Artikel lesen“.
 */
const BlogCard = ({ post }) => {
    const { blogCategories = [] } = useContent();
    const categoryData = (blogCategories || []).find(c => c.id === post.category);

    return (
        <div className="group relative flex items-start gap-4 border-b border-fuge px-4 py-6 transition-colors dauer-1 ease-setzen hover:border-strich hover:bg-fliese focus-within:border-strich focus-within:bg-fliese md:gap-6 md:px-6 lg:gap-8 lg:px-8 lg:py-8" data-motion="zustand">
            {/* Bild */}
            <div className="relative size-24 shrink-0 overflow-hidden border border-fuge bg-fliese md:size-32">
                {post.image ? (
                    <Image
                        src={post.image}
                        alt={post.title}
                        width={400}
                        height={208}
                        className="h-full w-full object-cover"
                        loading="lazy"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center">
                        <Fugenkreuz className="size-6 text-strich" />
                    </div>
                )}
            </div>

            {/* Kennzeile, Titel, Auszug */}
            <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <span className="font-mono text-fs-1 text-tinte">
                        {categoryData?.name || post.category}
                    </span>
                    {post.readTime && (
                        <span className="flex items-center gap-2 font-mono text-fs-1 text-tinte-2">
                            <Icon name="uhr" groesse={4} />
                            {post.readTime}
                        </span>
                    )}
                    {post.date && (
                        <span className="font-mono text-fs-1 text-tinte-2">
                            {post.date}
                        </span>
                    )}
                </div>

                <h3 className="mt-2 text-fs-4 text-tinte">
                    <Link href={`/blog/${post.slug}`} className={`${linkKlassen} after:absolute after:inset-0`}>
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
