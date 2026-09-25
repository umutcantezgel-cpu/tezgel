"use client";

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Phone,
    MessageCircle,
    ChevronDown,
    X,
    ArrowRight,
    Bath,
    Sparkles,
    MapPin,
    BookOpen,
    ShieldCheck,
    Clock
} from 'lucide-react';
import { navigationLinks, primaryCta } from '@/config/navigation';
import { COMPANY_DATA } from '@/config/company';
import { BrandMark } from '@/components/common/Header';

function getCategoryIcon(name) {
    switch (name) {
        case 'Badsanierung':
            return <Bath className="w-5 h-5 text-orange-600" />;
        case 'Fachgewerke':
            return <Sparkles className="w-5 h-5 text-orange-600" />;
        case 'Standorte':
            return <MapPin className="w-5 h-5 text-orange-600" />;
        case 'Ratgeber':
            return <BookOpen className="w-5 h-5 text-orange-600" />;
        case 'Über uns':
            return <ShieldCheck className="w-5 h-5 text-orange-600" />;
        default:
            return <Sparkles className="w-5 h-5 text-orange-600" />;
    }
}

export default function MobileMenu({ isOpen, onClose }) {
    const pathname = usePathname() || '/';
    // Automatically match the current active section or keep all collapsed initially for clean readability
    const [expandedMenu, setExpandedMenu] = useState(null);
    const closeButtonRef = useRef(null);

    // Escape key & scroll lock
    useEffect(() => {
        if (!isOpen) return undefined;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        closeButtonRef.current?.focus();

        const onKeyDown = (event) => {
            if (event.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', onKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [isOpen, onClose]);

    // Set initial expanded section according to active route when opened
    useEffect(() => {
        if (isOpen) {
            const activeLink = navigationLinks.find((link) =>
                pathname === link.path ||
                pathname.startsWith(`${link.path}/`) ||
                link.submenu?.some((cat) => cat.items.some((item) => pathname === item.path))
            );
            if (activeLink) {
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setExpandedMenu(activeLink.name);
            }
        }
    }, [isOpen, pathname]);

    return (
        <div
            className={`fixed inset-0 z-[70] transition-opacity duration-300 ${
                isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            aria-hidden={!isOpen}
            inert={!isOpen}
        >
            {/* Backdrop: Dark blur with smooth opacity */}
            <button
                type="button"
                tabIndex={-1}
                aria-label="Navigation schließen"
                onClick={onClose}
                className="absolute inset-0 w-full h-full bg-neutral-950/60 backdrop-blur-md cursor-default transition-all"
            />

            {/* Clean, opaque, ceramic-style drawer */}
            <div
                id="mobile-menu"
                role="dialog"
                aria-modal="true"
                aria-label="Hauptnavigation"
                className={`absolute right-0 top-0 h-full w-full max-w-md bg-[#FAFAFA] shadow-[0_0_50px_rgba(0,0,0,0.25)] border-l border-neutral-200 flex flex-col transition-transform duration-300 ease-out ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                {/* 1. Header Bar: Logo & Close Button */}
                <header className="px-5 py-4 bg-white border-b border-neutral-200 flex items-center justify-between gap-3 shrink-0">
                    <Link href="/" onClick={onClose} className="group focus-visible:outline-none" aria-label="Zur Startseite">
                        <BrandMark sublineClassName="block" />
                    </Link>

                    <button
                        ref={closeButtonRef}
                        type="button"
                        onClick={onClose}
                        className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 transition-colors focus-visible:outline-none"
                        aria-label="Menü schließen"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </header>

                {/* 2. Scrollable Navigation Area */}
                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2.5 pb-40">
                    <p className="px-1 text-[11px] font-black uppercase tracking-wider text-neutral-600">
                        Fachbereiche & Leistungen
                    </p>

                    <nav aria-label="Hauptnavigation Kategorien" className="space-y-2.5">
                        {navigationLinks.map((link, index) => {
                            const isExpanded = expandedMenu === link.name;
                            const panelId = `mobile-nav-panel-${index}`;
                            let runningItemIndex = 0;

                            return (
                                <div
                                    key={link.name}
                                    className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                                        isExpanded
                                            ? 'bg-white border-orange-300 shadow-md ring-1 ring-orange-200/50'
                                            : 'bg-white border-neutral-200/90 shadow-xs hover:border-neutral-300'
                                    }`}
                                >
                                    {/* Main Category Accordion Trigger */}
                                    <button
                                        type="button"
                                        onClick={() => setExpandedMenu(isExpanded ? null : link.name)}
                                        aria-expanded={isExpanded}
                                        aria-controls={panelId}
                                        className="w-full min-h-[58px] flex items-center justify-between gap-3 px-4 py-3 text-left focus-visible:outline-none group"
                                    >
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-colors ${
                                                isExpanded
                                                    ? 'bg-orange-50 border-orange-200 text-orange-700'
                                                    : 'bg-neutral-100 border-neutral-200 text-neutral-700 group-hover:border-orange-300'
                                            }`}>
                                                {getCategoryIcon(link.name)}
                                            </div>

                                            <div className="min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-display text-sm font-extrabold text-neutral-900">
                                                        {link.name}
                                                    </span>
                                                    {link.featured?.eyebrow && (
                                                        <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-orange-50 text-orange-800 border border-orange-200">
                                                            {link.featured.eyebrow}
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-xs text-neutral-600 mt-0.5 leading-snug">
                                                    {link.description}
                                                </p>
                                            </div>
                                        </div>

                                        <ChevronDown className={`w-5 h-5 shrink-0 text-neutral-600 transition-transform duration-300 ${
                                            isExpanded ? 'rotate-180 text-orange-600' : 'group-hover:text-neutral-900'
                                        }`} />
                                    </button>

                                    {/* Expanded Category: Staggered Ceramic Platten sliding in from right to left */}
                                    {isExpanded && (
                                        <div id={panelId} className="border-t border-neutral-100 bg-neutral-50/80 p-3 space-y-3">
                                            {link.submenu?.map((cat) => (
                                                <div key={cat.category} className="space-y-1.5">
                                                    <p className="px-2 text-[10px] font-black uppercase tracking-wider text-neutral-600 flex items-center gap-1.5">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-orange-600" />
                                                        {cat.category}
                                                    </p>

                                                    <ul className="space-y-1.5">
                                                        {cat.items.map((item) => {
                                                            const active = pathname === item.path;
                                                            const itemDelay = runningItemIndex * 40;
                                                            runningItemIndex += 1;

                                                            return (
                                                                <li
                                                                    key={item.path + item.name}
                                                                    className="plate-enter"
                                                                    style={{ animationDelay: `${itemDelay}ms` }}
                                                                >
                                                                    <Link
                                                                        href={item.path}
                                                                        onClick={onClose}
                                                                        aria-current={active ? 'page' : undefined}
                                                                        className={`group flex items-center justify-between gap-3 p-3 rounded-xl border transition-all duration-200 ${
                                                                            active
                                                                                ? 'bg-orange-500 text-white border-orange-600 shadow-sm'
                                                                                : 'bg-white text-neutral-900 border-neutral-200/90 shadow-xs hover:border-orange-300 hover:bg-orange-50/40'
                                                                        }`}
                                                                    >
                                                                        <div className="min-w-0 flex-1">
                                                                            <span className={`block text-xs font-bold ${
                                                                                active ? 'text-white' : 'text-neutral-900 group-hover:text-orange-800'
                                                                            }`}>
                                                                                {item.name}
                                                                            </span>
                                                                            {item.desc && (
                                                                                <span className={`block text-[11px] leading-snug mt-0.5 ${
                                                                                    active ? 'text-orange-100' : 'text-neutral-600'
                                                                                }`}>
                                                                                    {item.desc}
                                                                                </span>
                                                                            )}
                                                                        </div>
                                                                        <ArrowRight className={`w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1 ${
                                                                            active ? 'text-white' : 'text-orange-600'
                                                                        }`} />
                                                                    </Link>
                                                                </li>
                                                            );
                                                        })}
                                                    </ul>
                                                </div>
                                            ))}

                                            {/* Category Overview Hub Link */}
                                            <div className="pt-1 flex justify-end">
                                                <Link
                                                    href={link.path}
                                                    onClick={onClose}
                                                    className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-700 hover:text-orange-800 py-1 px-2 rounded-lg hover:bg-orange-100/50 transition-colors"
                                                >
                                                    <span>Alle Leistungen zu {link.name} ansehen</span>
                                                    <ArrowRight className="w-3.5 h-3.5" />
                                                </Link>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </nav>
                </div>

                {/* 3. Compact & Non-Obtrusive Bottom Footer */}
                <footer className="absolute bottom-0 left-0 right-0 bg-white border-t border-neutral-200 p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] space-y-2">
                    <Link
                        href={primaryCta.path}
                        onClick={onClose}
                        className="btn-primary w-full py-2.5 text-xs justify-center font-bold"
                    >
                        <span>Kostenfreies Vor-Ort-Aufmaß anfragen</span>
                        <ArrowRight className="w-4 h-4" />
                    </Link>

                    <div className="grid grid-cols-2 gap-2">
                        <a
                            href={`tel:${COMPANY_DATA.contact.phoneLink}`}
                            className="btn-ghost py-2 px-3 text-xs justify-center font-bold"
                        >
                            <Phone className="w-4 h-4 text-orange-600 shrink-0" />
                            <span>Anrufen</span>
                        </a>
                        <a
                            href={COMPANY_DATA.contact.whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="glass-button-whatsapp py-2 px-3 text-xs justify-center font-bold"
                        >
                            <MessageCircle className="w-4 h-4 shrink-0" />
                            <span>WhatsApp</span>
                        </a>
                    </div>

                    <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-600">
                        <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-orange-600 shrink-0" />
                            <span>{COMPANY_DATA.hours.formattedWeekdays}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Link href="/impressum" onClick={onClose} className="hover:text-neutral-900 underline-offset-2 hover:underline">
                                Impressum
                            </Link>
                            <span>&middot;</span>
                            <Link href="/datenschutz" onClick={onClose} className="hover:text-neutral-900 underline-offset-2 hover:underline">
                                Datenschutz
                            </Link>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}
