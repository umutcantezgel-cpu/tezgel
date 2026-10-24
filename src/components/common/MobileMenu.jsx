"use client";

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '@/components/icons/Icon';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import { hauptziel, navigationLinks, primaryCta } from '@/config/navigation';
import { COMPANY_DATA } from '@/config/company';
import { openWhatsApp } from '@/lib/whatsapp';
import WhatsAppLogo from '@/components/ui/WhatsAppLogo';
import { knopfKlassen } from '@/components/kern/stile';
import { zusammen } from '@/components/kern/zusammen';
import { BrandMark } from '@/components/common/Header';

const istOffen = (el) => {
    try {
        return Boolean(el?.matches(':popover-open'));
    } catch {
        return false;
    }
};

// Menü als Popover-Blatt (KERN v3 K-009): fünf Bereiche mit je einer Ebene, passt auf 360 × 740 ohne Scrollen; öffnet nativ über popovertarget, auch bevor React hydriert ist;
// Escape und Klick daneben schließen es. React hält nur aria-expanded, das Aufklappen der Bereiche und den Fokus.
// Fuß des Blatts: Hauptknopf, Anrufen und WhatsApp; Öffnungszeiten und Rechtliches stehen im Fuß der Seite (Platz auf 360 × 740, Sichtprüfung E2).
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

    // Beim Öffnen: Fokus auf „Schließen“. Bereiche bleiben zu, damit das Blatt auf 360 × 740 ohne Scrollen passt
    // (K-009); der aktuelle Bereich trägt die Laserlinie.
    useEffect(() => {
        if (!isOpen) return;
        closeButtonRef.current?.focus({ preventScroll: true });
    }, [isOpen]);

    const istAktiv = (link) =>
        pathname === link.path || pathname.startsWith(`${link.path}/`) || link.items.some((item) => pathname === item.path);

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
                    <Link href="/" onClick={schliessen} aria-label="Zur Startseite von Fliesenverlegung Tezgel">
                        <BrandMark sublineClassName="hidden sm:block" />
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
                    <nav aria-label="Bereiche">
                        <ul className="border-t border-fuge">
                            {navigationLinks.map((link, index) => {
                                const isExpanded = expandedMenu === link.name;
                                const panelId = `mobile-nav-panel-${index}`;

                                return (
                                    <li key={link.name} className={`border-b border-fuge ${istAktiv(link) ? 'border-l-2 border-l-laser pl-3' : ''}`}>
                                        <div className="flex items-stretch gap-2">
                                            <Link
                                                href={link.path}
                                                onClick={schliessen}
                                                aria-current={istAktiv(link) ? 'page' : undefined}
                                                className="flex min-w-0 flex-1 flex-col py-2"
                                            >
                                                <span className="text-fs-4 font-semibold text-tinte">{link.name}</span>
                                                <span className="text-fs-2 text-tinte-2">{link.kurz}</span>
                                            </Link>
                                            {link.items.length > 0 && (
                                                <button
                                                    type="button"
                                                    onClick={() => setExpandedMenu(isExpanded ? null : link.name)}
                                                    aria-expanded={isExpanded}
                                                    aria-controls={panelId}
                                                    aria-label={`Unterpunkte zu ${link.name} ${isExpanded ? 'schließen' : 'öffnen'}`}
                                                    className="flex w-11 shrink-0 items-center justify-center text-tinte"
                                                    data-motion="aufklappen"
                                                >
                                                    <Fugenkreuz className={`size-4 motion-safe:transition-transform motion-safe:dauer-2 motion-safe:ease-setzen motion-reduce:transition-none ${isExpanded ? 'rotate-45' : 'rotate-0'}`} />
                                                </button>
                                            )}
                                        </div>

                                        {link.items.length > 0 && (
                                            <div
                                                id={panelId}
                                                className="aufklappen"
                                                data-offen={isExpanded ? 'true' : 'false'}
                                                inert={!isExpanded}
                                            >
                                                <div>
                                                    <div className="flex flex-col gap-4 pb-6">
                                                        <div>
                                                                <ul className="border-t border-fuge">
                                                                    {link.items.map((item) => (
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
                                                        <Link href={link.path} onClick={schliessen} className={knopfKlassen('text', 'self-start')} data-motion="druck">
                                                            {link.name} im Überblick
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
                    <Link href={hauptziel(pathname)} onClick={schliessen} className={knopfKlassen('haupt', 'w-full')} data-motion="druck" data-hauptknopf="">
                        {zusammen(primaryCta.name)}
                        <Icon name="pfeil-rechts" groesse={4} />
                    </Link>
                    {/* nebeneinander nur, wenn beide Knöpfe ihre Wörter fassen (Container-Abfrage in rem, große Systemschrift) */}
                    <div className="@container mt-2">
                    <div className="grid grid-cols-1 gap-2 @3xs:grid-cols-2">
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
                            aria-label={`Nachricht per WhatsApp an Deniz Tezgel: ${COMPANY_DATA.contact.whatsapp}`}
                            data-motion="druck"
                        >
                            <WhatsAppLogo className="size-4 shrink-0" />
                            <span>WhatsApp</span>
                        </a>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
