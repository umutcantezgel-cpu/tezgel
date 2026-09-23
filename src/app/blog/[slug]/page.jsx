"use client";
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  Clock,
  ThumbsUp,
  Download,
  ArrowLeft,
  Calendar,
  Tag
} from 'lucide-react';
import SEO from '@/components/SEO';
import ReadingProgress from '@/components/blog/ReadingProgress';
import BlogAuthorCard from '@/components/blog/BlogAuthorCard';
import RelatedPosts from '@/components/blog/RelatedPosts';
import ShareButtons from '@/components/blog/ShareButtons';
import TableOfContents from '@/components/blog/TableOfContents';
import Lightbox from '@/components/blog/Lightbox';
import { useContent } from '@/contexts/ContentContext';
import QualityPromise from '@/components/sections/QualityPromise';

export default function BlogPostPage() {
  const { slug } = useParams();
  const [hasVoted, setHasVoted] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);
  const { blogPosts, blogCategories } = useContent();

  const post = (blogPosts || []).find(p => p.slug === slug);

  // Helper to extract text from React children
  const extractText = (children) => {
    if (typeof children === 'string') return children;
    if (typeof children === 'number') return children.toString();
    if (Array.isArray(children)) return children.map(extractText).join('');
    if (children?.props?.children) return extractText(children.props.children);
    return '';
  };

  // Helper to generate IDs for headings
  const generateSlug = (children) => {
    const text = extractText(children);
    return text
      .toString()
      .toLowerCase()
      .replace(/[^a-z0-9äöüß]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };

  const handleVote = () => {
    setHasVoted(true);
  };

  if (!post) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-black text-slate-900 mb-4">Artikel nicht gefunden</h2>
          <Link href="/blog" className="btn-primary px-6 py-3 text-xs">
            Zurück zum Ratgeber-Blog
          </Link>
        </div>
      </div>
    );
  }

  const categoryData = (blogCategories || []).find(c => c.id === post.category);

  // Prefer the article's own date; never fall back to "today".
  const displayDate = post.date || (post.created_date
    ? new Date(post.created_date).toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' })
    : null);
  const readingTime = post.readTime || `${post.reading_time || '5'} Min.`;

  return (
    <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
      <SEO
        title={post.title}
        description={post.excerpt}
        image={post.image || post.image_url}
        article={true}
      />
      <ReadingProgress />

      {/* Lightbox */}
      {lightboxImage && (
        <Lightbox
          src={lightboxImage.src}
          alt={lightboxImage.alt}
          onClose={() => setLightboxImage(null)}
        />
      )}

      {/* Ambient Glow */}
      <div className="ambient-glow-sky -top-20 -left-20" />
      <div className="ambient-glow-mint top-96 -right-20" />

      {/* HERO SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10">
        <div className="ceramic-hero rounded-[3rem] p-8 sm:p-14 text-center space-y-5 relative overflow-hidden">
          <Link
            href="/blog"
            className="inline-flex items-center text-xs font-bold text-emerald-800 hover:text-emerald-700 transition-colors group mb-2"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5 group-hover:-translate-x-1 transition-transform" />
            Zurück zur Ratgeber-Übersicht
          </Link>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {categoryData && (
              <span className="eyebrow">
                {categoryData.name}
              </span>
            )}
            {post.featured && (
              <span className="eyebrow eyebrow-amber">
                Empfehlung
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight max-w-4xl mx-auto">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-700 text-xs font-bold pt-2">
            {displayDate && (
              <>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-emerald-600" />
                  {displayDate}
                </div>
                <div className="w-1 h-1 rounded-full bg-slate-300" aria-hidden="true" />
              </>
            )}
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-emerald-600" />
              {readingTime} Lesezeit
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 items-start">

          {/* TABLE OF CONTENTS (Left - Desktop) */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-28">
            <div className="glass-surface p-6 rounded-[2rem]">
              <TableOfContents content={post.content} />
            </div>
          </aside>

          {/* MAIN ARTICLE (Center) */}
          <main className="lg:col-span-9">
            <div className="glass-bezel-outer mb-12">
              <div className="glass-bezel-inner p-8 sm:p-12 space-y-8">

                {/* Excerpt */}
                <p className="text-base sm:text-lg text-slate-800 font-bold leading-relaxed border-l-4 border-emerald-600 pl-6 bg-emerald-50/60 py-3 rounded-r-2xl">
                  {post.excerpt}
                </p>

                {/* Markdown Body */}
                <div className="prose-ceramic max-w-none">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h1: ({ node, ...props }) => <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-0 mb-4" {...props} />,
                      h2: ({ node, ...props }) => <h2 id={generateSlug(props.children)} className="text-2xl font-black text-slate-900 mt-10 mb-4 pb-2 border-b border-slate-200" {...props} />,
                      h3: ({ node, ...props }) => <h3 id={generateSlug(props.children)} className="text-lg font-black text-slate-900 mt-8 mb-3" {...props} />,
                      ul: ({ node, ...props }) => <ul className="list-disc pl-6 mb-6 space-y-1.5 marker:text-emerald-600" {...props} />,
                      ol: ({ node, ...props }) => <ol className="list-decimal pl-6 mb-6 space-y-1.5 marker:text-emerald-600 marker:font-black" {...props} />,
                      blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-emerald-600 bg-emerald-50 pl-6 py-4 my-6 rounded-r-2xl italic text-slate-700 text-sm font-medium" {...props} />,
                      table: ({ node, ...props }) => (
                        <div className="my-8 overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
                          <table className="w-full border-collapse text-left text-sm" {...props} />
                        </div>
                      ),
                      thead: ({ node, ...props }) => (
                        <thead className="bg-slate-100 text-slate-900" {...props} />
                      ),
                      th: ({ node, ...props }) => (
                        <th className="px-5 py-3.5 font-black uppercase tracking-wider text-xs border-b border-slate-200" {...props} />
                      ),
                      td: ({ node, ...props }) => (
                        <td className="px-5 py-3 text-slate-700 border-b border-slate-100 bg-white" {...props} />
                      ),
                      tr: ({ node, ...props }) => (
                        <tr className="hover:bg-slate-50 transition-colors" {...props} />
                      ),
                    }}
                  >
                    {post.content}
                  </ReactMarkdown>
                </div>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="pt-6 border-t border-slate-200 flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <span key={index} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5">
                        <Tag className="w-3 h-3 text-emerald-600" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Helpful Voting */}
                <div className="p-6 rounded-2xl bg-sky-50 border border-sky-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-black text-slate-900">War dieser Leitfaden hilfreich?</span>
                    <button
                      type="button"
                      onClick={handleVote}
                      disabled={hasVoted}
                      className={`px-4 py-1.5 rounded-full text-xs font-black flex items-center gap-1.5 transition-all ${
                        hasVoted
                          ? 'bg-emerald-700 text-white shadow-xs'
                          : 'bg-white border border-slate-300 text-slate-700 hover:border-emerald-600 hover:text-emerald-800'
                      }`}
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{hasVoted ? 'Danke für Ihr Feedback!' : 'Ja, sehr hilfreich'}</span>
                    </button>
                  </div>

                  <ShareButtons title={post.title} description={post.excerpt} />
                </div>

                {/* PDF Download Checklist if available */}
                {post.download_url && (
                  <div className="p-6 rounded-2xl bg-sky-50 border border-sky-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="icon-chip w-12 h-12">
                        <Download className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-black text-slate-900 text-sm">Kostenlose Checkliste (PDF)</h4>
                        <p className="text-xs text-slate-600">Zum Ausdrucken &amp; Vorbereiten Ihres Projekts</p>
                      </div>
                    </div>
                    <a
                      href={post.download_url}
                      className="btn-primary px-6 py-3 text-xs"
                      download
                    >
                      PDF jetzt herunterladen
                    </a>
                  </div>
                )}

              </div>
            </div>

            {/* Author */}
            <div className="mb-12">
              <BlogAuthorCard author={post.author} />
            </div>

            {/* Related Posts */}
            <div className="mb-12">
              <RelatedPosts
                currentPost={post}
                allPosts={blogPosts}
                categories={blogCategories}
              />
            </div>

          </main>
        </div>
      </div>

      <QualityPromise />
    </div>
  );
}
