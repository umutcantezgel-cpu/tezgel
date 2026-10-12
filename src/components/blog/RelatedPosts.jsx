import React from 'react';
import Link from 'next/link';
import Icon from '@/components/icons/Icon';
import Verlegeplan from '@/components/kern/Verlegeplan';
import { linkKlassen } from '@/components/kern/stile';

// Themenmotiv je Kategorie (IDs aus src/config/blog.js): Bad → bad, Pflege → fugen, Abdichtung → abdichtung,
// Balkon → balkon, Naturstein → naturstein, sonst grossformat (wie in der Liste)
const MOTIV_JE_KATEGORIE = { bad: 'bad', pflege: 'fugen', untergrund: 'abdichtung', aussen: 'balkon', naturstein: 'naturstein' };
const motivFuer = (kategorie) => MOTIV_JE_KATEGORIE[kategorie] ?? 'grossformat';

/**
 * Related Posts Component
 * Shows related blog posts based on category or tags, als Liste an der Fuge.
 * Ohne Foto: gezeichnetes Themenmotiv (dekorativ, ohne Laserachse) und als Anreißer der eigene Auszug.
 */
const RelatedPosts = ({ currentPost, allPosts = [], categories = [], limit = 3 }) => {
    const posts = allPosts || [];
    const categoryList = categories || [];

    // 1. Find directly related posts (same category or shared tags)
    let candidates = posts
        .filter(post => post.id !== currentPost.id)
        .map(post => {
            let score = 0;
            if (post.category === currentPost.category) score += 5;
            const currentTags = currentPost.tags || [];
            const postTags = post.tags || [];
            const sharedTags = currentTags.filter(tag => postTags.includes(tag));
            score += sharedTags.length * 2;
            return { ...post, score };
        })
        .filter(post => post.score > 0)
        .sort((a, b) => b.score - a.score);

    // 2. Fallback: If not enough related posts, add recent posts
    if (candidates.length < limit) {
        const existingIds = new Set(candidates.map(p => p.id));
        const recentPosts = posts
            .filter(post => post.id !== currentPost.id && !existingIds.has(post.id))
            .sort((a, b) => new Date(b.created_date) - new Date(a.created_date)) // Newest first
            .slice(0, limit - candidates.length);

        candidates = [...candidates, ...recentPosts];
    }

    const relatedPosts = candidates.slice(0, limit);

    if (relatedPosts.length === 0) return null;

    return (
        <div>
            <h2 className="text-fs-5 text-tinte">
                Das könnte Sie auch interessieren
            </h2>

            <ul className="mt-8 border-t border-fuge">
                {relatedPosts.map(post => {
                    const categoryData = categoryList.find(c => c.id === post.category);

                    return (
                        <li
                            key={post.id}
                            data-motion="zustand"
                            className="relative flex items-start gap-6 border-b border-fuge py-6 hover:bg-fliese focus-within:bg-fliese"
                        >
                            {/* Themenmotiv statt Foto: gezeichneter Verlegeplan, dekorativ */}
                            <div
                                className="flex size-24 shrink-0 items-center justify-center border border-fuge bg-kalk p-2"
                                aria-hidden="true"
                            >
                                <Verlegeplan plan={motivFuer(post.category)} ohneAchse bemassung={false} />
                            </div>

                            <div className="min-w-0 flex-1">
                                {/* Category */}
                                {categoryData && (
                                    <p className="font-mono text-fs-1 text-tinte-2">
                                        {categoryData.name}
                                    </p>
                                )}

                                {/* Title with Stretched Link (kein neues Überschriftenelement: Gliederung wie bisher) */}
                                <p className="mt-2 font-anzeige text-fs-4 font-semibold text-tinte">
                                    <Link
                                        href={`/blog/${post.slug}`}
                                        className={`${linkKlassen} after:absolute after:inset-0`}
                                    >
                                        {post.title}
                                    </Link>
                                </p>

                                {/* Teaser: der eigene Auszug des Beitrags; Bestandstext nur, wenn kein Auszug im Datensatz steht */}
                                <p className="mt-2 max-w-mass text-fs-3 text-tinte-2">
                                    {post.excerpt?.trim() || 'Fachbeitrag von Fliesenverlegung Tezgel – praxisnahe Hinweise zu Planung, Material und Ausführung.'}
                                </p>

                                {/* Read More */}
                                <p className="mt-4 inline-flex items-center gap-2 font-text text-fs-2 font-semibold text-tinte">
                                    Artikel lesen
                                    <Icon name="pfeil-rechts" groesse={4} />
                                </p>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default RelatedPosts;
