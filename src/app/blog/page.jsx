"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Calendar, ArrowRight, Clock, BookOpen } from 'lucide-react';
import { useContent } from '@/contexts/ContentContext';
import BlogCard from '@/components/blog/BlogCard';
import BlogSidebar from '@/components/blog/BlogSidebar';
import QualityPromise from '@/components/sections/QualityPromise';
import { COMPANY_DATA } from '@/config/company';

export default function BlogPage() {
  const { blogCategories = [], blogPosts = [] } = useContent();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const allPosts = blogPosts || [];

  // Only offer category filters that actually contain articles (generic, data-driven).
  const visibleCategories = (blogCategories || []).filter(category =>
    category.id !== 'all' && allPosts.some(post => post.category === category.id)
  );

  // Filter posts based on category and search query
  const filteredPosts = allPosts.filter(post => {
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = allPosts.find(post => post.featured);

  return (
    <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
      {/* Ambient Glow */}
      <div className="ambient-glow-orange -top-20 -left-20" />
      <div className="ambient-glow-red top-96 -right-20" />

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10">
        <div className="ceramic-hero rounded-tile-xl p-8 sm:p-14 text-center space-y-4 relative overflow-hidden">
          <span className="eyebrow">
            <BookOpen className="w-3.5 h-3.5" />
            Ratgeber &amp; Fachwissen
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
            Ratgeber rund um <span className="text-ceramic-gradient">Bad &amp; Fliesen</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-700 max-w-3xl mx-auto leading-relaxed">
            Praxisnahe Leitfäden rund um Badsanierung, Fliesen und Abdichtung – von Ihrem
            Fachbetrieb {COMPANY_DATA.legalName} aus {COMPANY_DATA.headquarters.city}.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
            <Link href="/kontakt" className="btn-primary px-7 py-3.5 text-xs">
              Beratung anfragen
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/faq" className="btn-ghost px-7 py-3.5 text-xs">
              Häufige Fragen
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* MAIN CONTENT */}
          <div className="flex-1">

            {/* Search and Category Filter (Mobile & Tablet) */}
            <div className="lg:hidden mb-8 space-y-4">
              <div className="relative">
                <input
                  type="text"
                  aria-label="Ratgeber durchsuchen"
                  placeholder="Ratgeber durchsuchen..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 rounded-tile-md border border-slate-300 bg-white shadow-sm text-sm font-semibold text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-orange-600"
                />
                <Search className="absolute left-3.5 top-4 w-4 h-4 text-slate-600" aria-hidden="true" />
              </div>

              {visibleCategories.length > 0 && (
                <div className="overflow-x-auto pb-2 flex gap-2 scrollbar-hide">
                  <button
                    type="button"
                    onClick={() => setActiveCategory('all')}
                    aria-pressed={activeCategory === 'all'}
                    className={`px-4 py-2 rounded-tile-pill whitespace-nowrap text-xs font-black transition-all ${
                      activeCategory === 'all'
                        ? 'bg-orange-600 text-white shadow-md'
                        : 'bg-white text-slate-700 border border-slate-300 hover:border-orange-500/80'
                    }`}
                  >
                    Alle Themen
                  </button>
                  {visibleCategories.map(category => (
                    <button
                      type="button"
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      aria-pressed={activeCategory === category.id}
                      className={`px-4 py-2 rounded-tile-pill whitespace-nowrap text-xs font-black transition-all ${
                        activeCategory === category.id
                          ? 'bg-orange-600 text-white shadow-md'
                          : 'bg-white text-slate-700 border border-slate-300 hover:border-orange-500/80'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Featured Post Hero Card - Double Bezel */}
            {featuredPost && activeCategory === 'all' && !searchQuery && (
              <div className="mb-10">
                <div className="glass-bezel-outer">
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="glass-bezel-inner p-6 sm:p-8 block group"
                  >
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                      <div className="relative h-60 sm:h-72 rounded-tile-md overflow-hidden shadow-md">
                        <Image
                          src={featuredPost.image}
                          alt={featuredPost.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                          priority
                        />
                        <span className="absolute top-3 left-3 bg-orange-600 text-white text-[10px] font-black uppercase px-3 py-1 rounded-tile-pill shadow-md z-10">
                          Empfohlener Leitfaden
                        </span>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center gap-3 text-xs text-slate-600 font-bold">
                          {featuredPost.date && (
                            <span className="flex items-center gap-1.5 bg-orange-50 border border-orange-200 text-orange-800 px-3 py-1 rounded-tile-pill">
                              <Calendar className="w-3.5 h-3.5" />
                              {featuredPost.date}
                            </span>
                          )}
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-orange-600" />
                            {featuredPost.readTime || `${featuredPost.reading_time || '5'} Min.`} Lesezeit
                          </span>
                        </div>

                        <h2 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-orange-700 transition-colors leading-tight">
                          {featuredPost.title}
                        </h2>

                        <p className="text-sm text-slate-700 line-clamp-3 leading-relaxed">
                          {featuredPost.excerpt}
                        </p>

                        <div className="inline-flex items-center gap-1.5 text-orange-700 font-black text-xs group-hover:text-orange-600 transition-colors pt-2">
                          Vollständigen Leitfaden lesen
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            )}

            {/* Post Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {filteredPosts.map((post) => (
                <div key={post.id}>
                  <BlogCard post={post} />
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredPosts.length === 0 && (
              <div className="glass-surface p-12 rounded-tile-xl text-center space-y-4">
                <Search className="w-10 h-10 text-orange-600 mx-auto" aria-hidden="true" />
                <p className="text-slate-700 font-bold text-sm">Keine Artikel zur Suchanfrage gefunden.</p>
                <button
                  type="button"
                  onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
                  className="btn-primary px-6 py-2.5 text-xs"
                >
                  Filter zurücksetzen
                </button>
              </div>
            )}
          </div>

          {/* SIDEBAR (Desktop) */}
          <div className="hidden lg:block w-80 shrink-0">
            <BlogSidebar
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>

        </div>
      </div>

      <QualityPromise />
    </div>
  );
}
