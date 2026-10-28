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
import BewegungsSchalter from '@/components/kern/BewegungsSchalter';

const istOffen = (el) => {
    try {
        return Boolean(el?.matches(':popover-open'));
    } catch {
        return false;
    }
};

// Die Routenansage von Next bleibt erreichbar (aria-live), auch wenn ein Menüpunkt die Seite wechselt
const NIE_INERT = new Set(['SCRIPT', 'STYLE', 'TEMPLATE', 'LINK', 'META', 'NEXT-ROUTE-ANNOUNCER']);

/** Bei offenem Blatt ist der Rest der Seite inert (E-076): Tastatur und Bildschirmleser bleiben im Blatt wie bei einem
 *  modalen Dialog; auf schmalen Bildschirmen deckt das Blatt die Seite ohnehin ganz ab. Gesperrt werden die Geschwister
 *  entlang des Wegs vom Blatt bis body; gelöst werden nur Elemente, die das Menü selbst gesperrt hat. */
function sperreHintergrund(blatt, gesperrt) {
    for (const el of gesperrt.splice(0)) el.inert = false;
    if (!blatt) return;
    for (let e = blatt; e.parentElement && e !== document.body; e = e.parentElement) {
        for (const g of e.parentElement.children) {
            if (g === e || g.inert || NIE_INERT.has(g.tagName)) continue;
            g.inert = true;
            gesperrt.push(g);
        }
    }
}

// Menü als Popover-Blatt (KERN v3 K-009): fünf Bereiche mit je einer Ebene, passt auf 360 × 740 ohne Scrollen; öffnet nativ über popovertarget, auch bevor React hydriert ist;
// Escape und Klick daneben schließen es. React hält nur aria-expanded, das Aufklappen der Bereiche, den Fokus und die
// Sperre des Hintergrunds (inert, E-076).
// Fuß des Blatts: nur der Hauptknopf; Anrufen und WhatsApp am Ende der Liste; Öffnungszeiten und Rechtliches stehen im Fuß
// der Seite (Platz auf 360 × 740 und bei großer Systemschrift, Sichtprüfung E2 Runden 1 bis 3).
export default function MobileMenu({ isOpen, onToggle }) {
    const pathname = usePathname() || '/';
    const [expandedMenu, setExpandedMenu] = useState(null);
    const blattRef = useRef(null);
    const closeButtonRef = useRef(null);

    useEffect(() => {
        const el = blattRef.current;
        if (!el) return undefined;
        const gesperrt = [];
        // Lösen vor dem Schließen: Der Browser gibt den Fokus beim Schließen an den Öffner zurück, der nicht mehr inert sein darf.
        const onBeforeToggle = (event) => {
            if (event.newState === 'closed') sperreHintergrund(null, gesperrt);
        };
        const onToggleEvent = (event) => {
            if (event.newState === 'open') sperreHintergrund(el, gesperrt);
            onToggle(event.newState === 'open');
        };
        el.addEventListener('beforetoggle', onBeforeToggle);
        el.addEventListener('toggle', onToggleEvent);
        // Vor der Hydrierung geöffnet: Zustand übernehmen.
        if (istOffen(el)) {
            sperreHintergrund(el, gesperrt);
            onToggle(true);
        }
        return () => {
            el.removeEventListener('beforetoggle', onBeforeToggle);
            el.removeEventListener('toggle', onToggleEvent);
            sperreHintergrund(null, gesperrt);
        };
    }, [onToggle]);

    // Jede Navigation schließt das Blatt (auch Zurück/Vor) – nur ein Wechsel der Adresse, nicht das erste Einhängen: Das Blatt
    // öffnet nativ schon vor der Hydrierung, und ein Tipp kurz nach dem Laden ginge sonst sofort wieder zu (UM-E3-EIN, Stufe A).
    const letzterPfad = useRef(pathname);
    useEffect(() => {
        if (letzterPfad.current === pathname) return;
        letzterPfad.current = pathname;
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
            {/* Container-Abfrage in rem: Bei großer Systemschrift (Blatt schmaler als 20 rem) entfallen die Unterzeilen der
                Hauptpunkte, damit alle fünf Namen im ersten Bild stehen (Sichtprüfung E2 Runde 3) */}
            <div className="@container flex h-full flex-col border-l border-fuge">
                <div className="flex h-16 shrink-0 items-center justify-between gap-3 border-b border-fuge px-4">
                    {/* Name aus Logo-Alternativtext und sichtbarer Zeile wie im Kopf (E-074): ab sm steht die Unterzeile im Bild,
                        ein aria-label ohne sie verletzt WCAG 2.5.3 (axe 4.14, Menü bei t768, q844, t1024; E-076) */}
                    <Link href="/" onClick={schliessen}>
                        <BrandMark sublineClassName="hidden sm:block" />
                        <span className="sr-only">, zur Startseite</span>
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

                {/* unter 20 rem Blattbreite (große Systemschrift) weniger Raum, damit alle fünf Bereiche im ersten Bild stehen */}
                <div className="menue-liste flex-1 overflow-y-auto px-4 py-6 @max-xs:py-2">
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
                                                className="flex min-w-0 flex-1 flex-col py-2 @max-xs:py-1"
                                            >
                                                <span className="text-fs-4 font-semibold text-tinte @max-xs:text-fs-3">{link.name}</span>
                                                <span className="hidden text-fs-2 text-tinte-2 @xs:block">{link.kurz}</span>
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
                    {/* Anrufen und WhatsApp am Ende der Liste (sie scrollen mit, die untere Leiste trägt sie ohnehin); fest im Fuß bleibt
                        nur der Hauptknopf. Nebeneinander nur, wenn beide Knöpfe ihre Wörter fassen (Container-Abfrage in rem). */}
                    <div className="@container mt-6">
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
                    <BewegungsSchalter className="mt-6" />
                    {/* Zeigt an, dass die Liste weitergeht, solange darunter noch etwas kommt (große Systemschrift auf
                        schmalen Telefonen: dort passen nicht alle Bereiche ins erste Bild; Runde 4). Sichtbar nur per
                        CSS-Abfrage scroll-state in globals.css; ohne Unterstützung bleibt sie verborgen. */}
                    <p aria-hidden="true" className="menue-weiter sticky bottom-0 -mx-4 items-center gap-2 border-t border-fuge bg-kalk px-4 py-1 font-text text-fs-1 text-tinte-2">
                        <Icon name="winkel-unten" groesse={4} />
                        Mehr darunter
                    </p>
                </div>

                <div className="shrink-0 border-t border-fuge bg-fliese p-4 @max-xs:p-2">
                    <Link href={hauptziel(pathname)} onClick={schliessen} className={knopfKlassen('haupt', 'w-full @max-xs:px-4 @max-xs:py-2')} data-motion="druck" data-hauptknopf="">
                        {zusammen(primaryCta.name)}
                        <Icon name="pfeil-rechts" groesse={4} className="@max-xs:hidden" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
