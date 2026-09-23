"use client";
import React from 'react';
import Link from 'next/link';
import { Clock, ArrowRight } from 'lucide-react';
import { useContent } from '@/contexts/ContentContext';
import { IconWrapper } from '@/utils/iconMapper';

/**
 * Blog Card Component
 * Ceramic light card with photo, category badge and stretched link.
 */
const BlogCard = ({ post }) => {
    const { blogCategories = [] } = useContent();
    const categoryData = (blogCategories || []).find(c => c.id === post.category);

    return (
        <div className="group relative block h-full">
            <div className="relative h-full flex flex-col glass-surface rounded-3xl overflow-hidden hover:-translate-y-0.5 hover:border-emerald-500/80 hover:shadow-[0_20px_40px_-12px_rgba(15,23,42,0.14)] transition-all duration-300">
                {/* Image Container */}
                <div className="relative h-52 overflow-hidden">
                    {post.image ? (
                        <>
                            <img
                                src={post.image}
                                alt={post.title}
                                width={400}
                                height={208}
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                                loading="lazy"
                            />
                            {/* Photo Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                        </>
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-emerald-50 to-sky-50 flex items-center justify-center">
                            <div className="w-20 h-20 rounded-2xl bg-emerald-700 flex items-center justify-center shadow-lg">
                                {categoryData && <IconWrapper name={categoryData.icon} className="w-10 h-10 text-white" />}
                            </div>
                        </div>
                    )}

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 border border-white/80 shadow-md pointer-events-none">
                        {categoryData && (
                            <IconWrapper
                                name={categoryData.icon}
                                className="w-4 h-4 text-emerald-600"
                            />
                        )}
                        <span className="text-xs font-black text-emerald-800 uppercase tracking-wide">
                            {categoryData?.name || post.category}
                        </span>
                    </div>

                    {/* Reading Time Badge */}
                    {post.readTime && (
                        <div className="absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/75 backdrop-blur-md text-white text-xs font-bold pointer-events-none">
                            <Clock className="w-3.5 h-3.5" />
                            {post.readTime}
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                    {/* Date */}
                    {post.date && (
                        <p className="text-sm text-slate-600 mb-2 font-semibold">
                            {post.date}
                        </p>
                    )}

                    {/* Title with Stretched Link for perfect SEO Anchor Text */}
                    <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-emerald-800 transition-colors line-clamp-2 leading-tight">
                        <Link
                            href={`/blog/${post.slug}`}
                            className="hover:underline underline-offset-2 focus-visible:outline-none after:absolute after:inset-0 after:rounded-3xl focus-visible:after:ring-2 focus-visible:after:ring-emerald-600"
                        >
                            {post.title}
                        </Link>
                    </h3>

                    {/* Excerpt */}
                    <p className="text-slate-700 mb-4 flex-grow line-clamp-3 leading-relaxed">
                        {post.excerpt}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                        {/* Read More Arrow */}
                        <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm pointer-events-none">
                            Artikel lesen
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
