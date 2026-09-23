"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    Phone, 
    MessageSquare, 
    Sparkles, 
    ShieldCheck, 
    Menu, 
    X,
    ChevronDown,
    ChevronRight,
    ArrowRight
} from 'lucide-react';
import { navigationLinks } from '@/config/navigation';
import { COMPANY_DATA } from '@/config/company';

export default function Header({ 
    isScrolled,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    setIsHelpSidebarOpen
}) {
    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-3 sm:px-6 lg:px-8 pt-2.5 sm:pt-4">
            {/* Centered Floating Glass Pill */}
            <div className="max-w-7xl mx-auto">
                <div className={`px-4 sm:px-6 py-2.5 sm:py-3 transition-all duration-300 rounded-full border flex items-center justify-between gap-4 ${
                    isScrolled 
                        ? 'bg-white/95 backdrop-blur-2xl py-2 border-slate-200 shadow-[0_12px_35px_rgba(15,23,42,0.08)]' 
                        : 'bg-white/90 backdrop-blur-xl border-slate-200/80 shadow-[0_8px_30px_rgba(15,23,42,0.05)]'
                }`}>
                    
                    {/* Brand Identity */}
                    <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 p-0.5 shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                            <div className="w-full h-full rounded-[14px] bg-white flex items-center justify-center border border-emerald-100">
                                <span className="font-black text-xs sm:text-sm tracking-wider text-emerald-600">FT</span>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm sm:text-base font-black tracking-tight text-slate-900 leading-tight group-hover:text-emerald-600 transition-colors">
                                Fliesenverlegung <span className="text-emerald-600">Tezgel</span>
                            </span>
                            <span className="text-[9px] sm:text-[10px] font-bold text-slate-500 tracking-wider uppercase">
                                Meisterbetrieb &middot; Aßlar / Wetzlar
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation Links with Dropdown */}
                    <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
                        {navigationLinks.map((link) => (
                            <div 
                                key={link.name} 
                                className="relative group"
                                onMouseEnter={() => link.submenu && setActiveDropdown(link.name)}
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                <Link
                                    href={link.path}
                                    className="px-3 py-1.5 rounded-full text-xs font-bold text-slate-700 hover:text-emerald-700 hover:bg-slate-100 transition-all flex items-center gap-1"
                                >
                                    <span>{link.name}</span>
                                    {link.badge && (
                                        <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                                            {link.badge}
                                        </span>
                                    )}
                                    {link.submenu && (
                                        <ChevronDown className="w-3 h-3 text-slate-400 group-hover:rotate-180 transition-transform duration-200" />
                                    )}
                                </Link>

                                {/* Dropdown Menu */}
                                {link.submenu && (
                                    <div className={`absolute top-full left-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white/98 backdrop-blur-2xl p-4 border border-slate-200 shadow-2xl shadow-slate-900/15 z-50 transition-all duration-200 ${
                                        activeDropdown === link.name 
                                            ? 'block opacity-100 pointer-events-auto' 
                                            : 'hidden group-hover:block group-hover:opacity-100 group-hover:pointer-events-auto'
                                    }`}>
                                        <div className="space-y-4">
                                            {link.submenu.map((cat, idx) => (
                                                <div key={idx} className="space-y-1.5">
                                                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-2.5">
                                                        {cat.category}
                                                    </span>
                                                    <div className="space-y-0.5">
                                                        {cat.items.map((subitem) => (
                                                            <Link
                                                                key={subitem.name}
                                                                href={subitem.path}
                                                                className="flex flex-col p-2.5 rounded-xl hover:bg-slate-50 transition-colors group/item"
                                                            >
                                                                <span className="text-xs font-bold text-slate-800 group-hover/item:text-emerald-600 flex items-center justify-between">
                                                                    {subitem.name}
                                                                    <ArrowRight className="w-3 h-3 opacity-0 group-hover/item:opacity-100 text-emerald-600 transition-all transform group-hover/item:translate-x-0.5" />
                                                                </span>
                                                                <span className="text-[11px] text-slate-500 font-normal leading-tight mt-0.5">
                                                                    {subitem.desc}
                                                                </span>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* Quick Dial Action Cluster */}
                    <div className="hidden sm:flex items-center gap-2 shrink-0">
                        {/* Phone Quick Dial */}
                        <a
                            href={`tel:${COMPANY_DATA.contact.phoneLink}`}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-200 transition-all"
                            title="Direkt anrufen"
                        >
                            <Phone className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="hidden md:inline">{COMPANY_DATA.contact.phone}</span>
                        </a>

                        {/* WhatsApp Button */}
                        <a
                            href={COMPANY_DATA.contact.whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs border border-emerald-200 transition-all shadow-xs"
                            title="WhatsApp Chat starten"
                        >
                            <MessageSquare className="w-3.5 h-3.5 fill-current text-emerald-600" />
                            <span className="hidden xl:inline">WhatsApp</span>
                        </a>

                        {/* Primary Offer Button */}
                        <Link
                            href="/kontakt"
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md shadow-emerald-600/20 hover:shadow-emerald-600/30 transition-all transform hover:-translate-y-0.5 active:scale-95"
                        >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Aufmaß buchen</span>
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle Button */}
                    <div className="lg:hidden flex items-center gap-2">
                        <a
                            href={`tel:${COMPANY_DATA.contact.phoneLink}`}
                            className="p-2 rounded-full bg-slate-100 text-emerald-600 sm:hidden border border-slate-200"
                            title="Anrufen"
                        >
                            <Phone className="w-4 h-4" />
                        </a>
                        <button
                            type="button"
                            onClick={() => setMobileNavOpen(!mobileNavOpen)}
                            className="p-2 rounded-full bg-slate-100 text-slate-800 hover:bg-slate-200 transition-colors border border-slate-200"
                            aria-label="Menü öffnen"
                        >
                            {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>

                </div>

                {/* Mobile Dropdown Menu */}
                {mobileNavOpen && (
                    <div className="mt-2 bg-white/98 backdrop-blur-2xl rounded-3xl p-5 border border-slate-200 shadow-2xl lg:hidden max-h-[80vh] overflow-y-auto animate-in fade-in duration-200">
                        <div className="flex flex-col space-y-3 mb-4">
                            {navigationLinks.map((link) => (
                                <div key={link.name} className="space-y-1">
                                    <Link
                                        href={link.path}
                                        onClick={() => setMobileNavOpen(false)}
                                        className="px-3.5 py-2 rounded-xl text-sm font-bold text-slate-900 hover:bg-slate-100 transition-colors flex items-center justify-between"
                                    >
                                        <span className="flex items-center gap-2">
                                            {link.name}
                                            {link.badge && (
                                                <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                                                    {link.badge}
                                                </span>
                                            )}
                                        </span>
                                        <ChevronRight className="w-4 h-4 text-slate-400" />
                                    </Link>
                                    {link.submenu && (
                                        <div className="pl-4 pr-2 space-y-1">
                                            {link.submenu.map((cat) => (
                                                <div key={cat.category} className="space-y-1 pt-1">
                                                    <span className="text-[10px] font-black uppercase text-slate-400">
                                                        {cat.category}
                                                    </span>
                                                    {cat.items.map((sub) => (
                                                        <Link
                                                            key={sub.name}
                                                            href={sub.path}
                                                            onClick={() => setMobileNavOpen(false)}
                                                            className="block py-1 px-2 text-xs font-semibold text-slate-600 hover:text-emerald-600"
                                                        >
                                                            &bull; {sub.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="pt-3 border-t border-slate-200 space-y-2">
                            <a
                                href={`tel:${COMPANY_DATA.contact.phoneLink}`}
                                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full bg-slate-100 text-slate-900 font-bold text-xs border border-slate-200"
                            >
                                <Phone className="w-4 h-4 text-emerald-600" />
                                <span>{COMPANY_DATA.contact.phone}</span>
                            </a>
                            <a
                                href={COMPANY_DATA.contact.whatsappLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-200"
                            >
                                <MessageSquare className="w-4 h-4 fill-current text-emerald-600" />
                                <span>WhatsApp Direktnachricht</span>
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
