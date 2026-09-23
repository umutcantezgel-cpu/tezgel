"use client";
import React from 'react';
import { Search, ArrowRight, Phone } from 'lucide-react';
import Link from 'next/link';
import { useContent } from '@/contexts/ContentContext';
import { IconWrapper } from '@/utils/iconMapper';
import { COMPANY_DATA } from '@/config/company';

/**
 * Blog Sidebar Component
 * Features: Sticky behavior, search, category filter, consultation CTA
 * (View counts and Popular Posts removed)
 */
const BlogSidebar = ({
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery
}) => {
    const { blogCategories = [], blogPosts = [] } = useContent();

    // Only list categories that actually contain articles ("all" always stays).
    const categories = (blogCategories || []).filter(category =>
        category.id === 'all' || (blogPosts || []).some(post => post.category === category.id)
    );

    return (
        <div className="sticky top-24 space-y-6">
            {/* ═══════════════════════════════════════════════════════════════
                SEARCH WIDGET
            ═══════════════════════════════════════════════════════════════ */}
            <div className="glass-surface rounded-3xl p-6">
                <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
                    <Search className="w-5 h-5 text-emerald-600" />
                    Suche
                </h3>
                <div className="relative">
                    <input
                        type="text"
                        aria-label="Artikel suchen"
                        placeholder="Artikel suchen..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-4 pr-12 py-4 rounded-2xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition-all"
                    />
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center pointer-events-none" aria-hidden="true">
                        <Search className="w-5 h-5" />
                    </span>
                </div>
            </div>

            {/* ═══════════════════════════════════════════════════════════════
                CATEGORIES WIDGET
            ═══════════════════════════════════════════════════════════════ */}
            {categories.length > 1 && (
                <div className="glass-surface rounded-3xl p-6">
                    <h3 className="text-lg font-black text-slate-900 mb-4">Kategorien</h3>
                    <div className="space-y-2">
                        {categories.map(category => (
                            <button
                                type="button"
                                key={category.id}
                                onClick={() => setActiveCategory(category.id)}
                                aria-pressed={activeCategory === category.id}
                                className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 ${activeCategory === category.id
                                    ? 'bg-emerald-700 border-emerald-700 text-white shadow-md'
                                    : 'bg-white border-slate-200 text-slate-800 hover:border-emerald-500/80 hover:bg-slate-50'
                                    }`}
                            >
                                <div className="flex items-center space-x-3">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${activeCategory === category.id
                                        ? 'bg-emerald-800'
                                        : 'bg-emerald-50 border border-emerald-200'
                                        }`}>
                                        <IconWrapper
                                            name={category.icon}
                                            className={`w-5 h-5 ${activeCategory === category.id ? 'text-white' : 'text-emerald-600'}`}
                                        />
                                    </div>
                                    <span className="font-bold text-sm">{category.name}</span>
                                </div>
                                {activeCategory === category.id && (
                                    <ArrowRight className="w-5 h-5" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* ═══════════════════════════════════════════════════════════════
                CTA WIDGET
            ═══════════════════════════════════════════════════════════════ */}
            <div className="ceramic-hero rounded-3xl p-6 group">
                <div className="icon-chip w-14 h-14 mb-4">
                    <Phone className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-2">Beratung gewünscht?</h3>
                <p className="text-slate-700 text-sm mb-5 leading-relaxed">
                    Fragen zu Badsanierung, Fliesen oder Abdichtung? {COMPANY_DATA.owner.fullName} berät Sie
                    persönlich – inklusive kostenfreiem Vor-Ort-Aufmaß.
                </p>
                <div className="flex flex-col gap-3">
                    <Link href="/kontakt" className="btn-primary w-full px-5 py-3 text-xs">
                        Kontakt aufnehmen
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                    <a href={`tel:${COMPANY_DATA.contact.phoneLink}`} className="btn-ghost w-full px-5 py-3 text-xs tabular-nums">
                        <Phone className="w-4 h-4 text-emerald-700" />
                        {COMPANY_DATA.contact.phone}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default BlogSidebar;
