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
        <span className="flex items-center gap-2.5 sm:gap-3">
            <Image
                src="/images/logo/tezgel-mark.svg"
                alt="Fliesenverlegung Tezgel Meisterbetrieb"
                width={40}
                height={40}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform duration-300 shrink-0"
                priority
            />
            <span className="flex flex-col">
                <span className="font-display text-sm sm:text-base font-black tracking-tight text-slate-900 leading-tight">
                    Fliesenverlegung <span className="text-emerald-700">Tezgel</span>
                </span>
                {!compact && (
                    <span className={`${sublineClassName} text-[10px] font-bold text-slate-600 tracking-widest uppercase`}>
                        Meisterbetrieb &middot; Aßlar / Wetzlar
                    </span>
                )}
            </span>
        </span>
    );
}

export default function Header({ isScrolled, isMobileMenuOpen, setIsMobileMenuOpen }) {
    const pathname = usePathname() || '/';
    const [openMenu, setOpenMenu] = useState(null);
    const [lastPathname, setLastPathname] = useState(pathname);
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

    // Close any open panel on navigation.
    if (pathname !== lastPathname) {
        setLastPathname(pathname);
        setOpenMenu(null);
    }

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
                    className={`relative px-3 sm:px-5 transition-all duration-300 rounded-full border flex items-center justify-between gap-3 backdrop-blur-xl ${
                        isScrolled
                            ? 'py-2 bg-white/95 border-slate-200 shadow-[0_12px_35px_rgba(15,23,42,0.08)]'
                            : 'py-2.5 sm:py-3 bg-white/85 border-slate-200/80 shadow-[0_8px_30px_rgba(15,23,42,0.06)]'
                    }`}
                >
                    {/* Brand */}
                    <Link href="/" className="group shrink-0 rounded-full" aria-label="Fliesenverlegung Tezgel – Startseite">
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
                                    <div className={`flex items-center rounded-full transition-colors duration-300 ${active || isOpen ? 'bg-emerald-50' : 'hover:bg-slate-100'}`}>
                                        <Link
                                            href={link.path}
                                            aria-current={pathname === link.path ? 'page' : undefined}
                                            className={`pl-3 ${link.submenu ? 'pr-1' : 'pr-3'} py-2 text-[13px] font-bold whitespace-nowrap transition-colors ${
                                                active ? 'text-emerald-800' : 'text-slate-700 hover:text-emerald-800'
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
                                                className="pr-2.5 pl-0.5 py-2 text-slate-600 hover:text-emerald-800 rounded-full"
                                            >
                                                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
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
                                            <div className={`${panelWidth} max-w-[calc(100vw-4rem)] rounded-3xl bg-white border border-slate-200/80 shadow-[0_24px_60px_-12px_rgba(15,23,42,0.18)] p-3 flex gap-3`}>
                                                <div className={`flex-1 grid gap-3 ${columns > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                                                    {link.submenu.map((cat) => (
                                                        <div key={cat.category} className="p-2">
                                                            <p className="px-2.5 pb-2 text-[10px] font-black uppercase tracking-widest text-slate-600">
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
                                                                                aria-current={itemActive ? 'page' : undefined}
                                                                                className={`group/item flex flex-col px-2.5 py-2 rounded-2xl border transition-all duration-300 ${
                                                                                    itemActive
                                                                                        ? 'bg-emerald-50 border-emerald-200'
                                                                                        : 'border-transparent hover:bg-slate-50 hover:border-slate-200'
                                                                                }`}
                                                                            >
                                                                                <span className="text-[13px] font-bold text-slate-900 group-hover/item:text-emerald-800 flex items-center justify-between gap-2">
                                                                                    {item.name}
                                                                                    <ArrowRight className="w-3.5 h-3.5 text-emerald-600 opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-300" />
                                                                                </span>
                                                                                {item.desc && (
                                                                                    <span className="text-xs text-slate-600 leading-snug mt-0.5">{item.desc}</span>
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
                                                    <div className="ceramic-hero w-56 shrink-0 rounded-2xl p-5 flex flex-col justify-between">
                                                        <div className="space-y-2.5">
                                                            <span className="eyebrow">
                                                                <ShieldCheck className="w-3.5 h-3.5" />
                                                                {link.featured.eyebrow}
                                                            </span>
                                                            <p className="font-display text-lg font-black text-slate-900 leading-snug">
                                                                {link.featured.title}
                                                            </p>
                                                            <p className="text-xs text-slate-700 leading-relaxed">{link.featured.text}</p>
                                                        </div>
                                                        <Link href={link.featured.cta.path} className="btn-primary mt-4 px-4 py-2.5 text-xs">
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
                            className="inline-flex items-center justify-center gap-2 h-10 min-w-10 px-2.5 xl:px-3.5 rounded-full bg-white hover:bg-slate-50 text-slate-900 font-bold text-xs border border-slate-200 hover:border-emerald-500/80 transition-all duration-300"
                            aria-label={`Anrufen: ${COMPANY_DATA.contact.phone}`}
                        >
                            <Phone className="w-4 h-4 text-emerald-700" />
                            <span className="hidden xl:inline">{COMPANY_DATA.contact.phone}</span>
                        </a>
                        <a
                            href={COMPANY_DATA.contact.whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden sm:inline-flex items-center justify-center gap-1.5 h-10 min-w-10 px-2.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs border border-emerald-200 hover:border-emerald-500/80 transition-all duration-300"
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
                            className="lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition-colors"
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
