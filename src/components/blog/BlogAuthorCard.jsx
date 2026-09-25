"use client";
import React from 'react';
import Link from 'next/link';
import { Mail, ArrowRight } from 'lucide-react';
import { LinkedinLogo as Linkedin, TwitterLogo as Twitter, FacebookLogo as Facebook } from '@phosphor-icons/react';
import { COMPANY_DATA } from '@/config/company';

/**
 * Blog Author Card Component
 * Displays author information with avatar, bio, and social links.
 * Posts by the company show Fliesenverlegung Tezgel (owner + chamber data);
 * editorial posts ("Ratgeber-Redaktion") stay neutral without company attribution.
 */
const BlogAuthorCard = ({ author }) => {
    if (!author) return null;

    const socialIcons = {
        twitter: Twitter,
        linkedin: Linkedin,
        facebook: Facebook,
        email: Mail
    };

    // Normalize author data if it's just a string name
    const rawAuthor = typeof author === 'string' ? { name: author } : author;
    const isCompanyAuthor = rawAuthor.name === COMPANY_DATA.legalName;

    const authorData = isCompanyAuthor
        ? {
            name: COMPANY_DATA.legalName,
            title: `${COMPANY_DATA.owner.fullName} · ${COMPANY_DATA.owner.title}`,
            bio: `${COMPANY_DATA.authority.certification} – ${COMPANY_DATA.authority.responsibility} mit Sitz in ${COMPANY_DATA.headquarters.city}.`
        }
        : rawAuthor;

    return (
        <div className="glass-surface rounded-3xl p-8">
            <div className="flex flex-col md:flex-row gap-6">
                {/* Avatar */}
                <div className="flex-shrink-0">
                    {authorData.avatar ? (
                        <img
                            src={authorData.avatar}
                            alt={authorData.name}
                            width={96}
                            height={96}
                            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                        />
                    ) : (
                        <div
                            className="w-24 h-24 rounded-full bg-orange-600 flex items-center justify-center text-white text-4xl font-black shadow-lg ring-4 ring-white"
                            aria-hidden="true"
                        >
                            {authorData.name?.charAt(0).toUpperCase()}
                        </div>
                    )}
                </div>

                {/* Info */}
                <div className="flex-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-600 mb-1">
                        Verfasst von
                    </p>
                    <h3 className="text-2xl font-black text-slate-900 mb-1">
                        {authorData.name}
                    </h3>

                    {authorData.title && (
                        <p className="text-orange-950 font-bold text-sm mb-3">
                            {authorData.title}
                        </p>
                    )}

                    {authorData.bio && (
                        <p className="text-slate-700 leading-relaxed mb-4">
                            {authorData.bio}
                        </p>
                    )}

                    {isCompanyAuthor && (
                        <Link
                            href="/ueber-uns"
                            className="inline-flex items-center gap-1.5 text-sm font-bold text-orange-600 hover:text-orange-700 hover:underline underline-offset-2"
                        >
                            Mehr über {COMPANY_DATA.owner.fullName}
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    )}

                    {/* Social Links */}
                    {authorData.social && Object.keys(authorData.social).length > 0 && (
                        <div className="flex gap-3">
                            {Object.entries(authorData.social).map(([platform, url]) => {
                                const Icon = socialIcons[platform] || Mail;
                                return (
                                    <a
                                        key={platform}
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="min-h-[44px] min-w-[44px] flex items-center justify-center bg-slate-100 hover:bg-orange-50 border border-slate-200 hover:border-orange-500 rounded-full transition-all duration-300 group"
                                        aria-label={platform}
                                    >
                                        <Icon className="w-5 h-5 text-slate-700 group-hover:text-orange-600 transition-colors" />
                                    </a>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BlogAuthorCard;
