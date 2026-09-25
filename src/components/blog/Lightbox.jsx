"use client";
import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const Lightbox = ({ src, alt, onClose }) => {
    // Close on escape key
    useEffect(() => {
        if (!src) return;
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [src, onClose]);

    if (!src) return null;

    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md transition-opacity duration-300"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-label={alt || 'Bildansicht'}
        >
            <button
                type="button"
                onClick={onClose}
                className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
                aria-label="Schließen"
            >
                <X className="w-8 h-8" />
            </button>

            <div
                className="relative max-w-[90vw] max-h-[90vh] overflow-hidden rounded-tile-md shadow-2xl"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={src}
                    alt={alt}
                    className="w-full h-full object-contain max-h-[90vh]"
                />
            </div>
        </div>
    );
};

export default Lightbox;
