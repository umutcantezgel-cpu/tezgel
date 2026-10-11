"use client";
import React, { useState } from 'react';
import Icon from '@/components/icons/Icon';
import { knopfKlassen } from '@/components/kern/stile';
import { FacebookLogo, TwitterLogo, LinkedinLogo } from '@/components/ui/Markenlogos';
import WhatsAppLogo from '@/components/ui/WhatsAppLogo';
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

    const itemClass = "flex min-h-11 items-center gap-4 border-b border-fuge py-2 text-tinte hover:border-strich";

    return (
        <div className="relative">
            {/* Main Share Button (Nebenknopf) */}
            <button
                type="button"
                onClick={handleNativeShare}
                aria-expanded={showShareMenu}
                className={knopfKlassen('neben')}
                data-motion="druck"
            >
                <Icon name="teilen" groesse={5} />
                Teilen
            </button>

            {/* Share Menu (fallback for desktop) */}
            {showShareMenu && (
                <div className="absolute left-0 top-full z-50 mt-2 w-max max-w-md border border-fuge bg-fliese p-6 sm:left-auto sm:right-0">
                    <h4 className="text-fs-3 text-tinte">Artikel teilen</h4>

                    <div className="mt-4 border-t border-fuge">
                        {/* Facebook */}
                        <a
                            href={shareLinks.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={itemClass}
                            data-motion="zustand"
                        >
                            <FacebookLogo className="size-5 shrink-0" />
                            <span className="text-fs-2">Facebook</span>
                        </a>

                        {/* Twitter/X */}
                        <a
                            href={shareLinks.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={itemClass}
                            data-motion="zustand"
                        >
                            <TwitterLogo className="size-5 shrink-0" />
                            <span className="text-fs-2">Twitter/X</span>
                        </a>

                        {/* LinkedIn */}
                        <a
                            href={shareLinks.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={itemClass}
                            data-motion="zustand"
                        >
                            <LinkedinLogo className="size-5 shrink-0" />
                            <span className="text-fs-2">LinkedIn</span>
                        </a>

                        {/* WhatsApp - auf ausdrücklichen Wunsch bleibt die Markenfarbe im Logo */}
                        <a
                            href={shareLinks.whatsapp}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={itemClass}
                            data-motion="zustand"
                        >
                            <WhatsAppLogo className="size-5 shrink-0" />
                            <span className="text-fs-2">WhatsApp</span>
                        </a>

                        {/* Email */}
                        <a
                            href={shareLinks.email}
                            className={itemClass}
                            data-motion="zustand"
                        >
                            <Icon name="mail" groesse={5} />
                            <span className="text-fs-2">E-Mail</span>
                        </a>

                        {/* Copy Link */}
                        <button
                            type="button"
                            onClick={handleCopyLink}
                            className={`w-full text-left ${itemClass}`}
                            data-motion="zustand"
                        >
                            {copied ? (
                                <>
                                    <Icon name="haken" groesse={5} className="text-abnahme" />
                                    <span className="text-fs-2 text-abnahme">Link kopiert!</span>
                                </>
                            ) : (
                                <>
                                    <Icon name="link-extern" groesse={5} />
                                    <span className="text-fs-2">Link kopieren</span>
                                </>
                            )}
                        </button>
                    </div>

                    {/* Close button */}
                    <button
                        type="button"
                        onClick={() => setShowShareMenu(false)}
                        className={knopfKlassen('text', 'mt-4')}
                        data-motion="druck"
                    >
                        Schließen
                    </button>
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
