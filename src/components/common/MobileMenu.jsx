"use client";

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, MessageCircle, ChevronDown, Mail, MapPin, Clock, X, ArrowRight } from 'lucide-react';
import { navigationLinks, primaryCta } from '@/config/navigation';
import { COMPANY_DATA } from '@/config/company';
import { BrandMark } from '@/components/common/Header';

export default function MobileMenu({ isOpen, onClose }) {
    const pathname = usePathname() || '/';
    const [expandedMenu, setExpandedMenu] = useState(null);
    const closeButtonRef = useRef(null);

    // Scroll lock, Escape to close and initial focus while open.
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

    return (
        <div
            className={`lg:hidden fixed inset-0 z-[60] transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            aria-hidden={!isOpen}
            inert={!isOpen}
        >
            {/* Backdrop */}
            <button
                type="button"
                tabIndex={-1}
                aria-label="Menü schließen"
                onClick={onClose}
                className="absolute inset-0 w-full h-full bg-neutral-900/40 backdrop-blur-sm cursor-default"
            />

            {/* Drawer */}
            <div
                id="mobile-menu"
                role="dialog"
                aria-modal="true"
                aria-label="Navigation"
                className={`absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-[0_0_60px_rgba(23,23,23,0.18)] border-l border-neutral-200 flex flex-col transition-transform duration-200 ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-neutral-200">
                    <Link href="/" onClick={onClose} className="group">
                        <BrandMark sublineClassName="block" />
                    </Link>
                    <button
                        ref={closeButtonRef}
                        type="button"
                        onClick={onClose}
                        className="inline-flex items-center justify-center h-11 w-11 rounded-xl bg-neutral-100 text-neutral-900 hover:bg-neutral-200 transition-colors"
                        aria-label="Menü schließen"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <nav aria-label="Mobile Navigation" className="flex-1 overflow-y-auto px-4 py-4">
                    <ul className="space-y-2">
                        {navigationLinks.map((link, index) => {
                            const isExpanded = expandedMenu === link.name;
                            const panelId = `mobile-submenu-${index}`;
                            return (
                                <li key={link.name} className={`rounded-xl border transition-colors duration-200 ${isExpanded ? 'border-orange-200 bg-orange-50/50' : 'border-neutral-200 bg-white'}`}>
                                    <button
                                        type="button"
                                        onClick={() => setExpandedMenu(isExpanded ? null : link.name)}
                                        aria-expanded={isExpanded}
                                        aria-controls={panelId}
                                        className="w-full min-h-[52px] flex items-center justify-between gap-3 px-4 text-left"
                                    >
                                        <span>
                                            <span className="block font-display text-[15px] font-black text-neutral-900">{link.name}</span>
                                            <span className="block text-xs text-neutral-600">{link.description}</span>
                                        </span>
                                        <ChevronDown className={`w-5 h-5 shrink-0 transition-transform duration-200 ${isExpanded ? 'rotate-180 text-orange-700' : 'text-neutral-600'}`} />
                                    </button>
                                    <div id={panelId} hidden={!isExpanded} className="px-2 pb-3">
                                        {link.submenu?.map((cat) => (
                                            <div key={cat.category} className="pt-1">
                                                <p className="px-2 py-1.5 text-[10px] font-black uppercase tracking-widest text-neutral-600">{cat.category}</p>
                                                <ul>
                                                    {cat.items.map((item) => {
                                                        const active = pathname === item.path;
                                                        return (
                                                            <li key={item.path + item.name}>
                                                                <Link
                                                                    href={item.path}
                                                                    onClick={onClose}
                                                                    aria-current={active ? 'page' : undefined}
                                                                    className={`min-h-[44px] flex items-center justify-between gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                                                                        active ? 'bg-white text-orange-800 border border-orange-200' : 'text-neutral-800 hover:bg-white hover:text-orange-800'
                                                                    }`}
                                                                >
                                                                    {item.name}
                                                                    <ArrowRight className="w-4 h-4 text-orange-600 shrink-0" />
                                                                </Link>
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                <div className="border-t border-neutral-200 px-5 py-4 space-y-2.5 bg-neutral-50">
                    <Link href={primaryCta.path} onClick={onClose} className="btn-primary w-full">
                        Kostenfreies Aufmaß anfragen
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                    <div className="grid grid-cols-2 gap-2.5">
                        <a href={`tel:${COMPANY_DATA.contact.phoneLink}`} className="btn-ghost px-3 py-3 text-xs">
                            <Phone className="w-4 h-4 text-orange-700" />
                            Anrufen
                        </a>
                        <a
                            href={COMPANY_DATA.contact.whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="glass-button-whatsapp px-3 py-3 text-xs"
                        >
                            <MessageCircle className="w-4 h-4" />
                            WhatsApp
                        </a>
                    </div>
                    <ul className="pt-1 space-y-1.5 text-xs text-neutral-700">
                        <li className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 text-orange-700 shrink-0" />
                            <span>{COMPANY_DATA.headquarters.street}, {COMPANY_DATA.headquarters.postalCode} {COMPANY_DATA.headquarters.city}</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <Phone className="w-4 h-4 text-orange-700 shrink-0" />
                            <span>{COMPANY_DATA.contact.phone} &middot; Mobil {COMPANY_DATA.contact.mobile}</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <Mail className="w-4 h-4 text-orange-700 shrink-0" />
                            <a href={`mailto:${COMPANY_DATA.contact.email}`} className="hover:text-orange-800 underline-offset-2 hover:underline">{COMPANY_DATA.contact.email}</a>
                        </li>
                        <li className="flex items-start gap-2">
                            <Clock className="w-4 h-4 text-orange-700 shrink-0" />
                            <span>{COMPANY_DATA.hours.formattedWeekdays}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
