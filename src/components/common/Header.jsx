"use client";

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import Icon from '@/components/icons/Icon';
import { navigationLinks, primaryCta } from '@/config/navigation';
import { COMPANY_DATA } from '@/config/company';
import { etikettKlassen, knopfKlassen, seitenKlassen } from '@/components/kern/stile';

const isActivePath = (pathname, path) =>
    path === '/' ? pathname === '/' : pathname === path || pathname.startsWith(`${path}/`);

const isSectionActive = (pathname, link) =>
    isActivePath(pathname, link.path) ||
    (link.submenu || []).some((cat) => cat.items.some((item) => isActivePath(pathname, item.path)));

// Logo unverändert (UNANTASTBAR); Unterzeile als Mono-Etikett.
export function BrandMark({ compact = false, sublineClassName = 'hidden lg:block xl:hidden 2xl:block' }) {
    return (
        <span className="flex items-center gap-3">
            <Image
                src="/images/logo/tezgel-logo.webp"
                alt="Fliesenverlegung Tezgel – Fachbetrieb Aßlar & Wetzlar"
                width={140}
                height={44}
                className="h-9 w-auto shrink-0 object-contain sm:h-10"
                priority
            />
            {!compact && (
                <span className={`${sublineClassName} border-l border-fuge pl-3 font-mono text-fs-1 text-tinte-2`}>
                    Fachbetrieb<br />Aßlar &middot; Wetzlar
                </span>
            )}
        </span>
    );
}

// Kopf (KERN K-009): fest, Kalk mit Fuge, Logo links, Hauptnavigation ab xl mit Mega-Menü als echte Links
// (darunter ist das Menüblatt der Zugang; Unterzeile und Nummer nur, wo die Zeile Platz hat),
// Telefon in Mono, Hauptknopf; der Menü-Schalter öffnet das Popover-Menü – auch vor der Hydrierung.
export default function Header({ isMobileMenuOpen }) {
    const pathname = usePathname() || '/';
    const [openMenu, setOpenMenu] = useState(null);
    const navRef = useRef(null);
    const closeTimerRef = useRef(null);

    // Hover-Absicht: sofort öffnen, mit kurzer Verzögerung schließen, damit der Zeiger ins Blatt wechseln kann.
    const openPanel = (name) => {
        clearTimeout(closeTimerRef.current);
        setOpenMenu(name);
    };
    const scheduleClose = () => {
        clearTimeout(closeTimerRef.current);
        closeTimerRef.current = setTimeout(() => setOpenMenu(null), 180);
    };

    useEffect(() => () => clearTimeout(closeTimerRef.current), []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setOpenMenu(null);
    }, [pathname]);

    // Escape schließt das Blatt, Klick außerhalb der Navigation ebenso.
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

    // Ohne Popover-Unterstützung (Safari < 17) führt der Schalter zum Seitenindex im Fuß.
    const ohnePopover = (event) => {
        if (typeof HTMLElement !== 'undefined' && !Object.prototype.hasOwnProperty.call(HTMLElement.prototype, 'popover')) {
            event.preventDefault();
            window.location.hash = 'seitenindex';
        }
    };

    return (
        <header
            className="fixed inset-x-0 top-0 z-40 border-b border-fuge bg-kalk"
            style={{ viewTransitionName: 'kopf' }}
            data-feste-ebene
        >
            <div className={clsx(seitenKlassen, 'flex h-16 items-center justify-between gap-6')}>
                <Link href="/" className="shrink-0" aria-label="Fliesenverlegung Tezgel – Fachbetrieb Aßlar · Wetzlar – Startseite">
                    <BrandMark />
                </Link>

                <nav ref={navRef} aria-label="Hauptnavigation" className="hidden h-full items-stretch xl:flex">
                    {navigationLinks.map((link, index) => {
                        const active = isSectionActive(pathname, link);
                        const isOpen = openMenu === link.name;
                        const panelId = `mega-${index}`;
                        const columns = link.submenu?.length || 0;

                        return (
                            <div
                                key={link.name}
                                className="flex items-stretch"
                                onMouseEnter={() => (link.submenu ? openPanel(link.name) : scheduleClose())}
                                onMouseLeave={scheduleClose}
                            >
                                <div className={clsx('flex items-stretch border-b-2', active || isOpen ? 'border-laser' : 'border-transparent')}>
                                    <Link
                                        href={link.path}
                                        onClick={() => setOpenMenu(null)}
                                        aria-current={pathname === link.path ? 'page' : undefined}
                                        className={clsx(
                                            'flex items-center whitespace-nowrap pl-3 text-fs-2 font-semibold text-tinte transition-colors dauer-1 ease-setzen hover:text-tinte-2',
                                            link.submenu ? 'pr-1' : 'pr-3'
                                        )}
                                        data-motion="zustand"
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
                                            className="flex w-8 items-center justify-center text-tinte-2 transition-colors dauer-1 ease-setzen hover:text-tinte"
                                            data-motion="zustand"
                                        >
                                            <Icon
                                                name="winkel-unten"
                                                groesse={4}
                                                className={clsx('transition-transform dauer-2 ease-setzen', isOpen && 'rotate-180')}
                                            />
                                        </button>
                                    )}
                                </div>

                                {link.submenu && (
                                    <div
                                        id={panelId}
                                        hidden={!isOpen}
                                        className="mega-blatt absolute inset-x-0 top-full border-b border-fuge bg-fliese"
                                        data-motion="aufklappen"
                                    >
                                        <div className={clsx(seitenKlassen, 'grid grid-cols-12 gap-8 py-8')}>
                                            {link.submenu.map((cat) => (
                                                <div key={cat.category} className={columns > 1 ? 'col-span-4' : 'col-span-6'}>
                                                    <p className={etikettKlassen}>{cat.category}</p>
                                                    <ul className="mt-3 border-t border-fuge">
                                                        {cat.items.map((item) => {
                                                            const itemActive = pathname === item.path;
                                                            return (
                                                                <li key={item.path + item.name} className="border-b border-fuge">
                                                                    <Link
                                                                        href={item.path}
                                                                        prefetch={false}
                                                                        onClick={() => setOpenMenu(null)}
                                                                        aria-current={itemActive ? 'page' : undefined}
                                                                        className="group flex flex-col gap-1 py-3 transition-colors dauer-1 ease-setzen hover:bg-kalk"
                                                                        data-motion="zustand"
                                                                    >
                                                                        <span className="flex items-center justify-between gap-2 text-fs-3 font-semibold text-tinte group-aria-[current=page]:text-laser-tief">
                                                                            {item.name}
                                                                            <Icon name="pfeil-rechts" groesse={4} className="text-tinte-2" />
                                                                        </span>
                                                                        {item.desc && <span className="text-fs-2 text-tinte-2">{item.desc}</span>}
                                                                    </Link>
                                                                </li>
                                                            );
                                                        })}
                                                    </ul>
                                                </div>
                                            ))}

                                            {link.featured && (
                                                <div className="flaeche-tinte col-span-4 flex flex-col justify-between gap-6 bg-tinte p-6 text-kalk">
                                                    <div className="flex flex-col gap-3">
                                                        <span className="inline-flex items-center gap-2 font-mono text-fs-1 text-nacht-2">{link.featured.eyebrow}</span>
                                                        <p className="font-display text-fs-5 font-semibold text-kalk">{link.featured.title}</p>
                                                        <p className="text-fs-2 text-nacht-2">{link.featured.text}</p>
                                                    </div>
                                                    <Link
                                                        href={link.featured.cta.path}
                                                        onClick={() => setOpenMenu(null)}
                                                        className={knopfKlassen('hell', 'self-start')}
                                                        data-motion="druck"
                                                    >
                                                        {link.featured.cta.label}
                                                        <Icon name="pfeil-rechts" groesse={4} />
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

                <div className="flex shrink-0 items-center gap-2">
                    <a
                        href={`tel:${COMPANY_DATA.contact.phoneLink}`}
                        className="hidden min-h-11 items-center gap-2 px-2 font-mono text-fs-2 text-tinte underline decoration-transparent underline-offset-4 transition-colors dauer-1 ease-setzen hover:decoration-tinte sm:inline-flex"
                        aria-label={`Fliesenverlegung Tezgel telefonisch anrufen: ${COMPANY_DATA.contact.phone}`}
                        data-motion="zustand"
                    >
                        <Icon name="telefon" groesse={5} />
                        <span className="hidden lg:inline xl:hidden">{COMPANY_DATA.contact.phone}</span>
                    </a>
                    <Link href={primaryCta.path} className={knopfKlassen('haupt', 'hidden px-4 sm:inline-flex')} data-motion="druck">
                        {primaryCta.name}
                    </Link>
                    <button
                        type="button"
                        popoverTarget="mobile-menu"
                        onClick={ohnePopover}
                        className="inline-flex size-11 items-center justify-center border border-strich bg-fliese text-tinte transition-colors dauer-1 ease-setzen hover:border-tinte"
                        aria-label={isMobileMenuOpen ? 'Architektur-Menü schließen' : 'Architektur-Menü öffnen'}
                        aria-expanded={isMobileMenuOpen}
                        aria-controls="mobile-menu"
                        title="Fliesen-Katalog & Gewerke"
                        data-motion="zustand"
                    >
                        <Icon name={isMobileMenuOpen ? 'schliessen' : 'menue'} groesse={5} />
                    </button>
                </div>
            </div>
        </header>
    );
}
