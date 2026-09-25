import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { IconWrapper } from '@/utils/iconMapper';

/**
 * Related Posts Component
 * Shows related blog posts based on category or tags
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
        <div className="glass-surface rounded-3xl p-8">
            <h2 className="text-2xl font-black text-slate-900 mb-6">
                Das könnte Sie auch interessieren
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map(post => {
                    const categoryData = categoryList.find(c => c.id === post.category);
                    const image = post.image || post.image_url;

                    return (
                        <div
                            key={post.id}
                            className="group relative h-full rounded-tile-md border border-slate-200 bg-white p-5 hover:-translate-y-0.5 hover:border-orange-500 hover:shadow-[0_20px_40px_-12px_rgba(15,23,42,0.14)] transition-all duration-300"
                        >
                            {/* Image */}
                            {image ? (
                                <div className="h-32 rounded-tile-sm overflow-hidden mb-4">
                                    <img
                                        src={image}
                                        alt={post.title}
                                        width={300}
                                        height={128}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        loading="lazy"
                                    />
                                </div>
                            ) : (
                                <div className="h-32 rounded-tile-sm overflow-hidden mb-4 bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
                                    <IconWrapper name={categoryData?.icon} className="w-8 h-8 text-orange-600" />
                                </div>
                            )}

                            {/* Category */}
                            {categoryData && (
                                <span className="inline-flex items-center px-3 py-1 text-xs font-bold rounded-tile-pill bg-orange-50 border border-orange-200 text-orange-950 mb-3 pointer-events-none">
                                    <IconWrapper name={categoryData.icon} className="w-3 h-3 mr-1" />
                                    {categoryData.name}
                                </span>
                            )}

                            {/* Title with Stretched Link */}
                            <h3 className="font-black text-slate-900 group-hover:text-orange-600 transition-colors mb-2 line-clamp-2">
                                <Link
                                    href={`/blog/${post.slug}`}
                                    className="hover:underline underline-offset-2 focus-visible:outline-none after:absolute after:inset-0 after:rounded-2xl focus-visible:after:ring-2 focus-visible:after:ring-orange-600"
                                >
                                    {post.title}
                                </Link>
                            </h3>

                            {/* Excerpt */}
                            <p className="text-sm text-slate-700 line-clamp-2 mb-3">
                                {post.excerpt}
                            </p>

                            {/* Read More */}
                            <div className="flex items-center text-orange-600 text-sm font-bold pointer-events-none">
                                Weiterlesen
                                <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RelatedPosts;
