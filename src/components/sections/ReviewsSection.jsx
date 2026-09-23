"use client";
import React, { useMemo, useState } from 'react';
import { Star, Quote } from 'lucide-react';
import { REVIEWS, RATING_SUMMARY } from '@/config/reviews';

// Topic groups derived from the `topic` values in config/reviews.js
// (keyword match, so new reviews are sorted in automatically).
const TOPIC_FILTERS = [
    { id: 'all', label: 'Alle Bewertungen', match: () => true },
    { id: 'bad', label: 'Bad & Badsanierung', match: (topic) => /Bad|Bäder/.test(topic) },
    { id: 'haus', label: 'Haus, Treppen & Balkon', match: (topic) => /Haus|Treppe|Boden|Küche|Balkon/.test(topic) },
    { id: 'beratung', label: 'Beratung & Service', match: (topic) => /Beratung|Service|Organisation/.test(topic) },
    { id: 'qualitaet', label: 'Qualität & Sauberkeit', match: (topic) => /Qualität|Sauberkeit|Preis/.test(topic) }
];

function Stars({ count = 5, className = 'w-4 h-4' }) {
    return (
        <span className="flex items-center gap-0.5 text-amber-500" aria-hidden="true">
            {Array.from({ length: count }, (_, i) => (
                <Star key={i} className={`${className} fill-current`} />
            ))}
        </span>
    );
}

export default function ReviewsSection() {
    const [selectedTopic, setSelectedTopic] = useState('all');
    const { google, trustlocal, asOf } = RATING_SUMMARY;

    const filters = useMemo(
        () =>
            TOPIC_FILTERS.map((filter) => ({
                ...filter,
                count: REVIEWS.filter((review) => filter.match(review.topic)).length
            })).filter((filter) => filter.count > 0),
        []
    );

    const activeFilter = filters.find((filter) => filter.id === selectedTopic) || filters[0];
    const filteredReviews = REVIEWS.filter((review) => activeFilter.match(review.topic));

    return (
        <section className="py-20 sm:py-24 relative overflow-hidden scroll-mt-20" id="bewertungen" aria-labelledby="reviews-heading">
            <div className="ambient-glow-mint -top-24 right-0 opacity-60" />
            <div className="ambient-glow-sky bottom-0 -left-24 opacity-50" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-10">
                    <span className="eyebrow eyebrow-amber mb-4">
                        <Star className="w-3.5 h-3.5 fill-current text-amber-500" />
                        Echte Kundenstimmen
                    </span>
                    <h2 id="reviews-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                        Was unsere Kunden in Mittelhessen sagen
                    </h2>
                    <p className="mt-3 text-base text-slate-700 leading-relaxed">
                        Wörtliche Auszüge aus öffentlichen Rezensionen – zu Badsanierungen, Balkonen, Treppen und
                        kompletten Häusern.
                    </p>
                </div>

                {/* Rating Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
                    <div className="glass-surface rounded-3xl p-6 flex items-center gap-5">
                        <span className="font-display text-4xl font-black text-slate-900 tabular-nums">
                            {google.displayRating}
                        </span>
                        <div className="space-y-1">
                            <Stars count={Math.round(google.rating)} />
                            <p className="text-sm font-bold text-slate-900">
                                {google.source}: {google.displayRating} von {google.maxRating}
                            </p>
                            <p className="text-xs text-slate-600">
                                aus {google.count} {google.label}
                            </p>
                        </div>
                    </div>
                    <div className="glass-surface rounded-3xl p-6 flex items-center gap-5">
                        <span className="font-display text-4xl font-black text-slate-900 tabular-nums">
                            {trustlocal.displayRating.split('/')[0]}
                        </span>
                        <div className="space-y-1">
                            <p className="text-sm font-bold text-slate-900">
                                {trustlocal.source}: {trustlocal.displayRating}
                            </p>
                            <p className="text-xs text-slate-600">
                                aus {trustlocal.count} {trustlocal.label}
                            </p>
                        </div>
                    </div>
                </div>
                <p className="mt-3 text-center text-xs text-slate-600">Stand: {asOf}</p>

                {/* Topic Filter */}
                <div className="flex flex-wrap items-center justify-center gap-2 mt-10 mb-10" role="group" aria-label="Bewertungen nach Thema filtern">
                    {filters.map((filter) => {
                        const isActive = filter.id === activeFilter.id;
                        return (
                            <button
                                key={filter.id}
                                type="button"
                                onClick={() => setSelectedTopic(filter.id)}
                                aria-pressed={isActive}
                                className={`px-4 py-2 rounded-full text-xs font-extrabold border transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 ${
                                    isActive
                                        ? 'bg-emerald-700 border-emerald-700 text-white'
                                        : 'bg-white border-slate-200 text-slate-700 hover:border-emerald-500/80 hover:text-emerald-800'
                                }`}
                            >
                                {filter.label}
                                <span className="ml-1.5 tabular-nums opacity-80">({filter.count})</span>
                            </button>
                        );
                    })}
                </div>

                {/* Reviews Grid */}
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredReviews.map((review) => (
                        <li
                            key={review.id}
                            className="glass-surface rounded-3xl p-7 flex flex-col justify-between hover:-translate-y-0.5 hover:border-emerald-500/80 hover:shadow-[0_20px_40px_-12px_rgba(15,23,42,0.14)] transition-all duration-300"
                        >
                            <figure className="h-full flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <Stars count={review.rating} />
                                        <Quote className="w-6 h-6 text-emerald-600/40" aria-hidden="true" />
                                    </div>
                                    <span className="sr-only">{review.rating} von 5 Sternen</span>
                                    <blockquote className="text-sm text-slate-800 leading-relaxed">
                                        „{review.text}“
                                    </blockquote>
                                </div>
                                <figcaption className="mt-5 pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
                                    <span className="text-sm font-bold text-slate-900">{review.author}</span>
                                    <span className="text-xs font-semibold text-slate-600">
                                        {review.source}-Rezension &middot; {review.topic}
                                    </span>
                                </figcaption>
                            </figure>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
