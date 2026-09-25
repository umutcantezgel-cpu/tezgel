"use client";

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
    Phone,
    MessageCircle,
    Menu,
    X,
    ChevronDown,
    ArrowRight,
    ShieldCheck
} from 'lucide-react';
import { navigationLinks, primaryCta } from '@/config/navigation';
import { COMPANY_DATA } from '@/config/company';

const isActivePath = (pathname, path) =>
    path === '/' ? pathname === '/' : pathname === path || pathname.startsWith(`${path}/`);

const isSectionActive = (pathname, link) =>
    isActivePath(pathname, link.path) ||
    (link.submenu || []).some((cat) => cat.items.some((item) => isActivePath(pathname, item.path)));

export function BrandMark({ compact = false, sublineClassName = 'hidden sm:block' }) {
    return (
        <span className="flex items-center gap-2 sm:gap-2.5">
            <Image
                src="/images/logo/tezgel-logo.webp"
                alt="Fliesenverlegung Tezgel – Fachbetrieb Aßlar & Wetzlar"
                width={140}
                height={44}
                className="h-9 sm:h-10 w-auto object-contain shrink-0 group-hover:scale-[1.02] transition-transform duration-200"
                priority
            />
            {!compact && (
                <span className={`${sublineClassName} border-l border-neutral-200/80 pl-2.5 my-auto text-[10px] sm:text-[11px] font-semibold text-neutral-500 leading-tight tracking-tight`}>
                    Fachbetrieb<br />Aßlar &middot; Wetzlar
                </span>
            )}
        </span>
    );
}

export default function Header({ isScrolled, isMobileMenuOpen, setIsMobileMenuOpen }) {
    const pathname = usePathname() || '/';
    const [openMenu, setOpenMenu] = useState(null);
    const navRef = useRef(null);
    const closeTimerRef = useRef(null);

    // Hover intent: open immediately, close with a short delay so the pointer can
    // travel from the menu item into the (centred) panel without it closing.
    const openPanel = (name) => {
        clearTimeout(closeTimerRef.current);
        setOpenMenu(name);
    };
    const scheduleClose = () => {
        clearTimeout(closeTimerRef.current);
        closeTimerRef.current = setTimeout(() => setOpenMenu(null), 180);
    };

    useEffect(() => () => clearTimeout(closeTimerRef.current), []);

    // Close any open panel on navigation – moved to useEffect to avoid
    // setState during render (which caused flickering).
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setOpenMenu(null);
    }, [pathname]);

    // Escape closes the panel; clicks outside the navigation close it as well.
    useEffect(() => {
        if (!openMenu) return undefined;
        const onKeyDown = (event) => {
            if (event.key === 'Escape') setOpenMenu(null);
        };
        const onPointerDown = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) setOpenMenu(null);
        };
        document.addEventListener('keydown', onKeyDown);
        document.addEventListener('pointerdown', onPointerDown);
        return () => {
            document.removeEventListener('keydown', onKeyDown);
            document.removeEventListener('pointerdown', onPointerDown);
        };
    }, [openMenu]);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 lg:px-8 pt-2.5 sm:pt-4">
            <div className="max-w-7xl mx-auto">
                <div
                    className={`relative px-3 sm:px-5 transition-[background-color,border-color,box-shadow] duration-200 rounded-2xl border flex items-center justify-between gap-3 backdrop-blur-sm ${
                        isScrolled
                            ? 'py-2 sm:py-2.5 bg-white/98 border-neutral-200/90 shadow-[0_8px_30px_rgba(23,23,23,0.08)]'
                            : 'py-2 sm:py-2.5 bg-white/90 border-neutral-200/80 shadow-[0_4px_20px_rgba(23,23,23,0.04)]'
                    }`}
                >
                    {/* Brand */}
                    <Link href="/" className="group shrink-0 rounded-xl" aria-label="Fliesenverlegung Tezgel – Startseite">
                        <BrandMark />
                    </Link>

                    {/* Desktop mega navigation */}
                    <nav ref={navRef} aria-label="Hauptnavigation" className="hidden lg:flex items-center gap-0.5 xl:gap-1">
                        {navigationLinks.map((link, index) => {
                            const active = isSectionActive(pathname, link);
                            const isOpen = openMenu === link.name;
                            const panelId = `mega-${index}`;
                            const columns = link.submenu?.length || 0;
                            const panelWidth = columns > 1
                                ? (link.featured ? 'w-[760px]' : 'w-[560px]')
                                : (link.featured ? 'w-[600px]' : 'w-80');

                            return (
                                <div
                                    key={link.name}
                                    onMouseEnter={() => (link.submenu ? openPanel(link.name) : scheduleClose())}
                                    onMouseLeave={scheduleClose}
                                >
                                    <div className={`flex items-center rounded-xl transition-colors duration-200 ${active || isOpen ? 'bg-orange-50' : 'hover:bg-neutral-100'}`}>
                                        <Link
                                            href={link.path}
                                            onClick={() => setOpenMenu(null)}
                                            aria-current={pathname === link.path ? 'page' : undefined}
                                            className={`pl-3 ${link.submenu ? 'pr-1' : 'pr-3'} py-2 text-[13px] font-bold whitespace-nowrap transition-colors ${
                                                active ? 'text-orange-800' : 'text-neutral-700 hover:text-orange-800'
                                            }`}
                                        >
                                            {link.name}
                                        </Link>
                                        {link.submenu && (
                                            <button
                                                type="button"
                                                aria-expanded={isOpen}
                                                aria-controls={panelId}
                                                aria-label={`Untermenü ${link.name} ${isOpen ? 'schließen' : 'öffnen'}`}
                                                onClick={() => setOpenMenu(isOpen ? null : link.name)}
                                                className="pr-2.5 pl-0.5 py-2 text-neutral-600 hover:text-orange-800 rounded-xl"
                                            >
                                                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                                            </button>
                                        )}
                                    </div>

                                    {link.submenu && (
                                        <div
                                            id={panelId}
                                            className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50 ${
                                                isOpen ? 'visible opacity-100 translate-y-0' : 'invisible opacity-0 -translate-y-1'
                                            } transition-all duration-200`}
                                        >
                                            <div className={`${panelWidth} max-w-[calc(100vw-4rem)] rounded-2xl bg-white border border-neutral-200/80 shadow-[0_24px_60px_-12px_rgba(23,23,23,0.18)] p-3 flex gap-3`}>
                                                <div className={`flex-1 grid gap-3 ${columns > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                                                    {link.submenu.map((cat) => (
                                                        <div key={cat.category} className="p-2">
                                                            <p className="px-2.5 pb-2 text-[10px] font-black uppercase tracking-widest text-neutral-600">
                                                                {cat.category}
                                                            </p>
                                                            <ul className="space-y-0.5">
                                                                {cat.items.map((item) => {
                                                                    const itemActive = pathname === item.path;
                                                                    return (
                                                                        <li key={item.path + item.name}>
                                                                            <Link
                                                                                href={item.path}
                                                                                prefetch={false}
                                                                                onClick={() => setOpenMenu(null)}
                                                                                aria-current={itemActive ? 'page' : undefined}
                                                                                className={`group/item flex flex-col px-2.5 py-2 rounded-xl border transition-all duration-200 ${
                                                                                    itemActive
                                                                                        ? 'bg-orange-50 border-orange-200'
                                                                                        : 'border-transparent hover:bg-neutral-50 hover:border-neutral-200'
                                                                                }`}
                                                                            >
                                                                                <span className="text-[13px] font-bold text-neutral-900 group-hover/item:text-orange-800 flex items-center justify-between gap-2">
                                                                                    {item.name}
                                                                                    <ArrowRight className="w-3.5 h-3.5 text-orange-600 opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-200" />
                                                                                </span>
                                                                                {item.desc && (
                                                                                    <span className="text-xs text-neutral-600 leading-snug mt-0.5">{item.desc}</span>
                                                                                )}
                                                                            </Link>
                                                                        </li>
                                                                    );
                                                                })}
                                                            </ul>
                                                        </div>
                                                    ))}
                                                </div>

                                                {link.featured && (
                                                    <div className="ceramic-hero w-56 shrink-0 rounded-xl p-5 flex flex-col justify-between">
                                                        <div className="space-y-2.5">
                                                            <span className="eyebrow">
                                                                <ShieldCheck className="w-3.5 h-3.5" />
                                                                {link.featured.eyebrow}
                                                            </span>
                                                            <p className="font-display text-lg font-black text-neutral-900 leading-snug">
                                                                {link.featured.title}
                                                            </p>
                                                            <p className="text-xs text-neutral-700 leading-relaxed">{link.featured.text}</p>
                                                        </div>
                                                        <Link href={link.featured.cta.path} onClick={() => setOpenMenu(null)} className="btn-primary mt-4 px-4 py-2.5 text-xs">
                                                            {link.featured.cta.label}
                                                            <ArrowRight className="w-3.5 h-3.5" />
                                                        </Link>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                        <a
                            href={`tel:${COMPANY_DATA.contact.phoneLink}`}
                            className="inline-flex items-center justify-center gap-2 h-10 min-w-10 px-2.5 xl:px-3.5 rounded-xl bg-white hover:bg-neutral-50 text-neutral-900 font-bold text-xs border border-neutral-200 hover:border-orange-500/80 transition-all duration-200"
                            aria-label={`Anrufen: ${COMPANY_DATA.contact.phone}`}
                        >
                            <Phone className="w-4 h-4 text-orange-700" />
                            <span className="hidden xl:inline">{COMPANY_DATA.contact.phone}</span>
                        </a>
                        <a
                            href={COMPANY_DATA.contact.whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden sm:inline-flex items-center justify-center gap-1.5 h-10 min-w-10 px-2.5 rounded-xl bg-green-50 hover:bg-green-100 text-green-800 font-bold text-xs border border-green-200 hover:border-green-500/80 transition-all duration-200"
                            aria-label="WhatsApp-Chat starten"
                        >
                            <MessageCircle className="w-4 h-4" />
                        </a>
                        <Link
                            href={primaryCta.path}
                            className="btn-primary hidden sm:inline-flex h-10 px-4 py-0 text-xs"
                        >
                            {primaryCta.name}
                        </Link>

                        <button
                            type="button"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-xl bg-neutral-900 text-white hover:bg-neutral-800 transition-colors"
                            aria-label={isMobileMenuOpen ? 'Menü schließen' : 'Menü öffnen'}
                            aria-expanded={isMobileMenuOpen}
                            aria-controls="mobile-menu"
                        >
                            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
