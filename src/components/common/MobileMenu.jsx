"use client";

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '@/components/icons/Icon';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import { navigationLinks, primaryCta } from '@/config/navigation';
import { COMPANY_DATA } from '@/config/company';
import { openWhatsApp } from '@/lib/whatsapp';
import { etikettKlassen, knopfKlassen } from '@/components/kern/stile';
import { BrandMark } from '@/components/common/Header';

const istOffen = (el) => {
    try {
        return Boolean(el?.matches(':popover-open'));
    } catch {
        return false;
    }
};

// Menü als Popover-Blatt (KERN K-009, E-009): öffnet nativ über popovertarget, auch bevor React hydriert ist;
// Escape und Klick daneben schließen es. React hält nur aria-expanded, das Aufklappen der Bereiche und den Fokus.
export default function MobileMenu({ isOpen, onToggle }) {
    const pathname = usePathname() || '/';
    const [expandedMenu, setExpandedMenu] = useState(null);
    const blattRef = useRef(null);
    const closeButtonRef = useRef(null);

    useEffect(() => {
        const el = blattRef.current;
        if (!el) return undefined;
        const onToggleEvent = (event) => onToggle(event.newState === 'open');
        el.addEventListener('toggle', onToggleEvent);
        // Vor der Hydrierung geöffnet: Zustand übernehmen.
        if (istOffen(el)) onToggle(true);
        return () => el.removeEventListener('toggle', onToggleEvent);
    }, [onToggle]);

    // Jede Navigation schließt das Blatt (auch Zurück/Vor).
    useEffect(() => {
        const el = blattRef.current;
        if (istOffen(el)) el.hidePopover();
    }, [pathname]);

    // Beim Öffnen: aktiven Bereich aufklappen, Fokus auf „Schließen“.
    useEffect(() => {
        if (!isOpen) return;
        const activeLink = navigationLinks.find((link) =>
            pathname === link.path ||
            pathname.startsWith(`${link.path}/`) ||
            link.submenu?.some((cat) => cat.items.some((item) => pathname === item.path))
        );
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (activeLink) setExpandedMenu(activeLink.name);
        closeButtonRef.current?.focus({ preventScroll: true });
    }, [isOpen, pathname]);

    const schliessen = () => {
        const el = blattRef.current;
        if (istOffen(el)) el.hidePopover();
    };

    return (
        <div
            ref={blattRef}
            id="mobile-menu"
            popover="auto"
            role="dialog"
            aria-label="Hauptnavigation"
            className="menue-blatt fixed inset-y-0 right-0 left-auto m-0 h-dvh max-h-none w-full max-w-md overflow-hidden border-0 bg-kalk p-0 text-tinte"
            data-motion="aufklappen"
        >
            <div className="flex h-full flex-col border-l border-fuge">
                <div className="flex h-16 shrink-0 items-center justify-between gap-3 border-b border-fuge px-4">
                    <Link href="/" onClick={schliessen} aria-label="Fliesenverlegung Tezgel – Fachbetrieb Aßlar · Wetzlar – Startseite">
                        <BrandMark sublineClassName="block" />
                    </Link>
                    <button
                        ref={closeButtonRef}
                        type="button"
                        popoverTarget="mobile-menu"
                        popoverTargetAction="hide"
                        className="inline-flex size-11 items-center justify-center border border-strich bg-fliese text-tinte transition-colors dauer-1 ease-setzen hover:border-tinte"
                        aria-label="Menü schließen"
                        data-motion="zustand"
                    >
                        <Icon name="schliessen" groesse={5} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-4 py-6">
                    <p className={etikettKlassen}>Fachbereiche & Leistungen</p>

                    <nav aria-label="Hauptnavigation Kategorien" className="mt-3">
                        <ul className="border-t border-fuge">
                            {navigationLinks.map((link, index) => {
                                const isExpanded = expandedMenu === link.name;
                                const panelId = `mobile-nav-panel-${index}`;

                                return (
                                    <li key={link.name} className="border-b border-fuge">
                                        <div className="flex items-stretch gap-2">
                                            <Link
                                                href={link.path}
                                                onClick={schliessen}
                                                aria-current={pathname === link.path ? 'page' : undefined}
                                                className="flex min-w-0 flex-1 flex-col gap-1 py-4"
                                            >
                                                <span className="flex flex-wrap items-center gap-3">
                                                    <span className="text-fs-4 font-semibold text-tinte">{link.name}</span>
                                                    {link.featured?.eyebrow && <span className={etikettKlassen}>{link.featured.eyebrow}</span>}
                                                </span>
                                                <span className="text-fs-2 text-tinte-2">{link.description}</span>
                                            </Link>
                                            {link.submenu && (
                                                <button
                                                    type="button"
                                                    onClick={() => setExpandedMenu(isExpanded ? null : link.name)}
                                                    aria-expanded={isExpanded}
                                                    aria-controls={panelId}
                                                    aria-label={`${link.name} – Unterseiten ${isExpanded ? 'schließen' : 'öffnen'}`}
                                                    className="flex w-11 shrink-0 items-center justify-center text-tinte"
                                                    data-motion="aufklappen"
                                                >
                                                    <Fugenkreuz className={`size-4 transition-transform dauer-2 ease-setzen ${isExpanded ? 'rotate-45' : 'rotate-0'}`} />
                                                </button>
                                            )}
                                        </div>

                                        {link.submenu && (
                                            <div
                                                id={panelId}
                                                className="aufklappen"
                                                data-offen={isExpanded ? 'true' : 'false'}
                                                inert={!isExpanded}
                                            >
                                                <div>
                                                    <div className="flex flex-col gap-6 pb-6">
                                                        {link.submenu.map((cat) => (
                                                            <div key={cat.category}>
                                                                <p className={etikettKlassen}>{cat.category}</p>
                                                                <ul className="mt-2 border-t border-fuge">
                                                                    {cat.items.map((item) => (
                                                                        <li key={item.path + item.name} className="border-b border-fuge">
                                                                            <Link
                                                                                href={item.path}
                                                                                onClick={schliessen}
                                                                                aria-current={pathname === item.path ? 'page' : undefined}
                                                                                className="group flex items-center justify-between gap-3 py-3"
                                                                            >
                                                                                <span className="min-w-0">
                                                                                    <span className="block text-fs-3 font-semibold text-tinte group-aria-[current=page]:text-laser-tief">{item.name}</span>
                                                                                    {item.desc && <span className="block text-fs-2 text-tinte-2">{item.desc}</span>}
                                                                                </span>
                                                                                <Icon name="pfeil-rechts" groesse={4} className="text-tinte-2" />
                                                                            </Link>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        ))}
                                                        <Link href={link.path} onClick={schliessen} className={knopfKlassen('text', 'self-start')}>
                                                            Alle Leistungen zu {link.name} ansehen
                                                            <Icon name="pfeil-rechts" groesse={4} />
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                </div>

                <div className="shrink-0 border-t border-fuge bg-fliese p-4">
                    <Link href={primaryCta.path} onClick={schliessen} className={knopfKlassen('haupt', 'w-full')} data-motion="druck">
                        Kostenfreies Vor-Ort-Aufmaß anfragen
                        <Icon name="pfeil-rechts" groesse={4} />
                    </Link>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                        <a
                            href={`tel:${COMPANY_DATA.contact.phoneLink}`}
                            className={knopfKlassen('neben', 'px-3')}
                            aria-label={`Fliesenverlegung Tezgel telefonisch anrufen: ${COMPANY_DATA.contact.phone}`}
                            data-motion="druck"
                        >
                            <Icon name="telefon" groesse={4} />
                            <span>Anrufen</span>
                        </a>
                        <a
                            href={COMPANY_DATA.contact.whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => {
                                e.preventDefault();
                                openWhatsApp({ phone: COMPANY_DATA.contact.whatsappNumber });
                            }}
                            className={knopfKlassen('neben', 'px-3')}
                            aria-label={`WhatsApp-Chat mit Deniz Tezgel starten: ${COMPANY_DATA.contact.whatsapp}`}
                            data-motion="druck"
                        >
                            <Icon name="sprechblase" groesse={4} />
                            <span>WhatsApp</span>
                        </a>
                    </div>
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-2 font-mono text-fs-1 text-tinte-2">
                        <span>{COMPANY_DATA.hours.formattedWeekdays}</span>
                        <span className="flex items-center gap-2">
                            <Link href="/impressum" onClick={schliessen} className="underline decoration-strich underline-offset-4 hover:decoration-tinte">
                                Impressum
                            </Link>
                            <span aria-hidden="true">&middot;</span>
                            <Link href="/datenschutz" onClick={schliessen} className="underline decoration-strich underline-offset-4 hover:decoration-tinte">
                                Datenschutz
                            </Link>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
