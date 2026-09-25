"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/components/common/Header';
import MobileMenu from '@/components/common/MobileMenu';

export function HeaderWrapper() {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [lastPathname, setLastPathname] = useState(pathname);

    // Close the drawer on every navigation (including back/forward).
    if (pathname !== lastPathname) {
        setLastPathname(pathname);
        setIsMobileMenuOpen(false);
    }

    const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);

    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrolled = window.scrollY > 20;
                    setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
                    ticking = false;
                });
                ticking = true;
            }
        };
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <Header
                isScrolled={isScrolled}
                isMobileMenuOpen={isMobileMenuOpen}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
            />
            <MobileMenu
                isOpen={isMobileMenuOpen}
                onClose={closeMobileMenu}
            />
        </>
    );
}
