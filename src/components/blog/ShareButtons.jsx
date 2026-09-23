"use client";
import React, { useState } from 'react';
import { Share2, Mail, Link as LinkIcon, MessageCircle, Check } from 'lucide-react';
import { FacebookLogo as Facebook, TwitterLogo as Twitter, LinkedinLogo as Linkedin } from '@phosphor-icons/react';
import { COMPANY_DATA } from '@/config/company';

/**
 * Share Buttons Component
 * Provides social media sharing options
 */
const ShareButtons = ({ url, title, description }) => {
    const [copied, setCopied] = useState(false);
    const [showShareMenu, setShowShareMenu] = useState(false);

    const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : COMPANY_DATA.contact.website);
    const shareTitle = title || (typeof document !== 'undefined' ? document.title : COMPANY_DATA.legalName);
    const shareDescription = description || '';

    const shareLinks = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
        whatsapp: `https://wa.me/?text=${encodeURIComponent(shareTitle + ' ' + shareUrl)}`,
        email: `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareDescription + '\n\n' + shareUrl)}`
    };

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handleNativeShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: shareTitle,
                    text: shareDescription,
                    url: shareUrl
                });
            } catch (err) {
                // User cancelled or share failed
                console.log('Share cancelled or failed:', err);
            }
        } else {
            setShowShareMenu(!showShareMenu);
        }
    };

    const itemClass = "flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100 transition-colors";

    return (
        <div className="relative">
            {/* Main Share Button */}
            <button
                type="button"
                onClick={handleNativeShare}
                aria-expanded={showShareMenu}
                className="btn-ghost min-h-[44px] px-5 py-2.5 text-xs group"
            >
                <Share2 className="w-4 h-4 text-emerald-700 group-hover:scale-110 transition-transform" />
                Teilen
            </button>

            {/* Share Menu (fallback for desktop) */}
            {showShareMenu && (
                <div className="absolute top-full mt-2 right-0 z-50">
                    <div className="glass-surface rounded-2xl shadow-2xl p-4 min-w-[250px]">
                        <h4 className="font-black text-slate-900 mb-4">Artikel teilen</h4>

                        <div className="space-y-2">
                            {/* Facebook */}
                            <a
                                href={shareLinks.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={itemClass}
                            >
                                <Facebook className="w-5 h-5 text-[#1877f2]" />
                                <span className="text-sm font-semibold text-slate-800">Facebook</span>
                            </a>

                            {/* Twitter/X */}
                            <a
                                href={shareLinks.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={itemClass}
                            >
                                <Twitter className="w-5 h-5 text-sky-600" />
                                <span className="text-sm font-semibold text-slate-800">Twitter/X</span>
                            </a>

                            {/* LinkedIn */}
                            <a
                                href={shareLinks.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={itemClass}
                            >
                                <Linkedin className="w-5 h-5 text-[#0a66c2]" />
                                <span className="text-sm font-semibold text-slate-800">LinkedIn</span>
                            </a>

                            {/* WhatsApp */}
                            <a
                                href={shareLinks.whatsapp}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={itemClass}
                            >
                                <MessageCircle className="w-5 h-5 text-emerald-600" />
                                <span className="text-sm font-semibold text-slate-800">WhatsApp</span>
                            </a>

                            {/* Email */}
                            <a
                                href={shareLinks.email}
                                className={itemClass}
                            >
                                <Mail className="w-5 h-5 text-slate-700" />
                                <span className="text-sm font-semibold text-slate-800">E-Mail</span>
                            </a>

                            {/* Copy Link */}
                            <button
                                type="button"
                                onClick={handleCopyLink}
                                className={`w-full ${itemClass}`}
                            >
                                {copied ? (
                                    <>
                                        <Check className="w-5 h-5 text-emerald-600" />
                                        <span className="text-sm font-semibold text-emerald-800">Link kopiert!</span>
                                    </>
                                ) : (
                                    <>
                                        <LinkIcon className="w-5 h-5 text-slate-700" />
                                        <span className="text-sm font-semibold text-slate-800">Link kopieren</span>
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Close button */}
                        <button
                            type="button"
                            onClick={() => setShowShareMenu(false)}
                            className="mt-4 w-full p-2 text-sm font-semibold text-slate-700 hover:text-emerald-800 transition-colors"
                        >
                            Schließen
                        </button>
                    </div>
                </div>
            )}

            {/* Backdrop */}
            {showShareMenu && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowShareMenu(false)}
                />
            )}
        </div>
    );
};

export default ShareButtons;
