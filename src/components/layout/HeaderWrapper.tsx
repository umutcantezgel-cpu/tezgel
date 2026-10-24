"use client";

import React, { Suspense, useState } from 'react';
import Header from '@/components/common/Header';
import MobileMenu from '@/components/common/MobileMenu';

// Kopf und Menü teilen nur den Offen-Zustand; Öffnen und Schließen übernimmt das Popover selbst
// (Schalter mit popovertarget, Escape, Klick daneben), das Blatt meldet jeden Wechsel per toggle-Ereignis.
export function HeaderWrapper() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <>
            <Header isMobileMenuOpen={isMobileMenuOpen} />
            {/* eigene Hydrierungseinheit (E-033): das Blatt ist zu und wird erst nach einem Tipp gebraucht */}
            <Suspense>
                <MobileMenu isOpen={isMobileMenuOpen} onToggle={setIsMobileMenuOpen} />
            </Suspense>
        </>
    );
}
