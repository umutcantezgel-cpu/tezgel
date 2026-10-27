"use client";

import React, { Suspense, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import Icon from '@/components/icons/Icon';
import { hauptziel, navigationLinks, ohneLeiste, primaryCta } from '@/config/navigation';
import { COMPANY_DATA } from '@/config/company';
import { knopfKlassen, seitenKlassen } from '@/components/kern/stile';
import { zusammen } from '@/components/kern/zusammen';
import FloatingWhatsAppWidget from '@/components/common/FloatingWhatsAppWidget';

const isActivePath = (pathname, path) =>
    path === '/' ? pathname === '/' : pathname === path || pathname.startsWith(`${path}/`);

const isSectionActive = (pathname, link) =>
    isActivePath(pathname, link.path) || (link.items || []).some((item) => isActivePath(pathname, item.path));

// Logo unverändert (UNANTASTBAR); Unterzeile im Textschnitt (K-006: Mono nur für Zahlen). Bei großer Systemschrift
// (Kopf schmaler als 20 rem) eine kleinere Höhenstufe, damit Breite und Höhe gemeinsam schrumpfen und der Menü-Schalter
// im Bild bleibt (Runde 4: sonst wurde nur die Breite gestaucht).
export function BrandMark({ compact = false, sublineClassName = 'hidden lg:block xl:hidden 2xl:block' }) {
    return (
        <span className="flex min-w-0 items-center gap-3">
            {/* Maße im Seitenverhältnis der Datei (3,2 : 1); max-w-full + object-contain: bei großer Systemschrift wird das
                Logo kleiner statt den Menü-Schalter aus dem Bild zu schieben (Form und Proportion bleiben, G8) */}
            <Image
                src="/images/logo/tezgel-logo.webp"
                alt="Fliesenverlegung Tezgel"
                width={160}
                height={50}
                className="h-12 w-auto max-w-full shrink object-contain @7xl:h-11 @max-xs:h-6"
                data-erstes-bild="logo"
                priority
            />
            {!compact && (
                <span className={`${sublineClassName} border-l border-fuge pl-3 font-text text-fs-1 text-tinte-2`}>
                    Fachbetrieb<br />Aßlar &middot; Wetzlar
                </span>
            )}
        </span>
    );
}

// Kopf (KERN v3 K-009): fest, Kalk mit Fuge, Logo links, fünf Hauptpunkte ab xl mit je einem schmalen Aufklappblatt
// (eine Ebene, echte Links; darunter ist das Menüblatt der Zugang), Laserlinie unter dem aktuellen Bereich, rechts Telefon
// und der Hauptknopf „Termin vor Ort anfragen“ (data-hauptknopf, K-004). Unterzeile nur, wo die Zeile Platz hat;
// Telefon in Mono, ab lg der WhatsApp-Knopf (E3-NACH-06), Hauptknopf; der Menü-Schalter öffnet das Popover-Menü – auch vor
// der Hydrierung.
// Vergrößerung (R-02a): Ob die Navigation in die Zeile passt, entscheidet die Breite des Kopfs selbst (Container-Abfrage
// @7xl = 80rem = xl, Nummer @5xl = 64rem = lg), nicht die Breite des Fensters. Bei CSS-Zoom 200 % meldet das Fenster
// weiter 1280 px, der Kopf hat aber nur 640 px – vorher stand die Navigation dann voll da und schob Telefon, WhatsApp,
// Hauptknopf und zwei Menüpunkte rechts aus dem Bild, der Menü-Schalter fehlte (a11y-zusatz zoom: 7 „nie im Bild“).
// Jetzt zeigt der Kopf dort den Menü-Schalter (Menüblatt mit allen Einträgen, Anruf, WhatsApp und Anfrage) und alle
// übrigen Bedienelemente bleiben im Bild. Auch die Unterzeile folgt der Kopfbreite (nur zwischen @5xl und @7xl), und
// unter @xl (36rem, nur bei starkem Zoom – ohne Zoom ist er dort ohnehin verborgen) weicht der Hauptknopf
// dem Menü-Schalter, der denselben Weg trägt. Ohne Zoom sind Kopf- und Fensterbreite gleich (bis auf eine Scrollleiste).
export default function Header({ isMobileMenuOpen }) {
    const pathname = usePathname() || '/';
    const leisteAus = ohneLeiste(pathname);
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

    // Nur ein echter Seitenwechsel schließt das Blatt. Der Effekt läuft auch einmal direkt nach dem Hydrieren; ohne den
    // Vergleich schloss er ein Blatt, das in diesem Augenblick per Klick oder Enter geöffnet wurde (Befund Tor l1/l2-e039).
    const letzterPfadRef = useRef(pathname);
    useEffect(() => {
        if (letzterPfadRef.current === pathname) return;
        letzterPfadRef.current = pathname;
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
            className="kopf-anker @container fixed inset-x-0 top-0 z-40 border-b border-fuge bg-kalk"
            data-feste-ebene
        >
            {/* Kopfhöhe 64 px, im Querformat am Handy 48 px (Kopf und Leisten höchstens ein Viertel der Höhe, K-013) */}
            <div className={clsx(seitenKlassen, 'kopf-zeile flex h-16 items-center justify-between gap-6 @7xl:gap-3')}>
                {/* Logo darf nur unter @7xl schrumpfen (große Systemschrift, Menü-Schalter bleibt im Bild); mit voller Navigation
                    behält es seine Größe, die Navigation hat ab 2xl keine Zuschläge mehr (Runde 3: auf d1920 nur 74 px breit) */}
                {/* Name aus Logo-Alternativtext und sichtbarer Zeile, ohne aria-label: Der sichtbare Text muss im Namen stehen (WCAG 2.5.3, axe 4.14) */}
                <Link href="/" className="min-w-0 shrink @7xl:shrink-0">
                    <BrandMark sublineClassName="hidden @5xl:@max-7xl:block" />
                    <span className="sr-only">, zur Startseite</span>
                </Link>

                {/* Navigation mit Aufklappblättern als eigene Hydrierungseinheit (E-033): unter 80 rem verborgen, ein früher Tipp auf
                    Logo, Telefon oder Hauptknopf wartet nicht auf sie */}
                <Suspense>
                    <nav ref={navRef} aria-label="Hauptnavigation" className="hidden h-full items-stretch @7xl:flex">
                        {navigationLinks.map((link, index) => {
                            const active = isSectionActive(pathname, link);
                            const hatBlatt = link.items.length > 0;
                            const isOpen = openMenu === link.name;
                            const panelId = `kopf-blatt-${index}`;

                            return (
                                <div
                                    key={link.name}
                                    className="relative flex items-stretch"
                                    onMouseEnter={() => (hatBlatt ? openPanel(link.name) : scheduleClose())}
                                    onMouseLeave={scheduleClose}
                                >
                                    {/* Laserlinie: aktueller Bereich (Rot, K-003 Nr. 5); geöffnetes Blatt: Tinte */}
                                    <div className={clsx('flex items-stretch border-b-2', active ? 'border-laser' : isOpen ? 'border-tinte' : 'border-transparent')}>
                                        <Link
                                            href={link.path}
                                            onClick={() => setOpenMenu(null)}
                                            aria-current={active ? 'page' : undefined}
                                            className={clsx(
                                                'flex items-center whitespace-nowrap pl-2 text-fs-2 font-semibold text-tinte transition-colors dauer-1 ease-setzen hover:text-tinte-2',
                                                hatBlatt ? 'pr-1' : 'pr-2'
                                            )}
                                            data-motion="zustand"
                                        >
                                            {link.name}
                                        </Link>
                                        {hatBlatt && (
                                            <button
                                                type="button"
                                                aria-expanded={isOpen}
                                                aria-controls={panelId}
                                                aria-label={`Unterpunkte zu ${link.name} ${isOpen ? 'schließen' : 'öffnen'}`}
                                                onClick={() => setOpenMenu(isOpen ? null : link.name)}
                                                className="flex w-6 items-center justify-center text-tinte-2 transition-colors dauer-1 ease-setzen hover:text-tinte"
                                                data-motion="zustand"
                                            >
                                                <Icon
                                                    name="winkel-unten"
                                                    groesse={4}
                                                    className={clsx('motion-safe:transition-transform motion-safe:dauer-2 motion-safe:ease-setzen motion-reduce:transition-none', isOpen && 'rotate-180')}
                                                />
                                            </button>
                                        )}
                                    </div>

                                    {hatBlatt && (
                                        <div
                                            id={panelId}
                                            hidden={!isOpen}
                                            className="mega-blatt absolute left-0 top-full w-max min-w-full max-w-mass border border-t-0 border-fuge bg-fliese shadow-gesetzt"
                                            data-motion="aufklappen"
                                        >
                                            <p className="border-b border-fuge px-6 py-4 text-fs-2 text-tinte-2">{link.kurz}</p>
                                            <ul>
                                                {link.items.map((item) => {
                                                    const itemActive = pathname === item.path;
                                                    return (
                                                        <li key={item.path + item.name} className="border-b border-fuge last:border-b-0">
                                                            <Link
                                                                href={item.path}
                                                                prefetch={false}
                                                                onClick={() => setOpenMenu(null)}
                                                                aria-current={itemActive ? 'page' : undefined}
                                                                className="group flex items-center justify-between gap-6 px-6 py-3 transition-colors dauer-1 ease-setzen hover:bg-kalk"
                                                                data-motion="zustand"
                                                            >
                                                                <span className="flex flex-col gap-1">
                                                                    <span className="text-fs-3 font-semibold text-tinte group-aria-[current=page]:text-laser-tief">{item.name}</span>
                                                                    <span className="text-fs-2 text-tinte-2">{item.desc}</span>
                                                                </span>
                                                                <Icon name="pfeil-rechts" groesse={4} className="shrink-0 text-tinte-2" />
                                                            </Link>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </nav>
                </Suspense>

                {/* unter lg tragen die untere Leiste Anruf und Hauptknopf; der Kopf zeigt dort nur Logo und Menü-Schalter
                    (Sichtprüfung E2 Runde 2: doppelte Bedienflächen, Hauptknopf quer am Rand angeschnitten). Auf den
                    Abläufen ohne Leiste bleiben beide im Kopf. */}
                <div className="flex shrink-0 items-center gap-2">
                    <a
                        href={`tel:${COMPANY_DATA.contact.phoneLink}`}
                        data-erstes-bild="kontakt"
                        // mit voller Navigation (@7xl) ein Feld wie WhatsApp und Menü: Nummer, WhatsApp und Hauptknopf passen dort nicht
                        // nebeneinander (Zeile ragte bei 1280 px schon 24 px in den Rand). Die Nummer steht im Namen, im Hinweis und im
                        // ersten Bildschirm jeder Seite (Einstieg „Anrufen: …“, K-009).
                        className={clsx(
                            'hidden min-h-11 items-center gap-2 px-1 font-mono text-fs-2 text-tinte underline decoration-transparent underline-offset-4 transition-colors dauer-1 ease-setzen hover:decoration-tinte',
                            '@7xl:size-11 @7xl:justify-center @7xl:border @7xl:border-strich @7xl:bg-fliese @7xl:px-0 @7xl:hover:border-tinte',
                            leisteAus ? 'sm:inline-flex' : 'lg:inline-flex',
                        )}
                        aria-label={`Fliesenverlegung Tezgel telefonisch anrufen: ${COMPANY_DATA.contact.phone}`}
                        title={`Anrufen: ${COMPANY_DATA.contact.phone}`}
                        data-motion="zustand"
                    >
                        <Icon name="telefon" groesse={5} />
                        <span className="hidden @5xl:inline @7xl:hidden">{COMPANY_DATA.contact.phone}</span>
                    </a>
                    {/* WhatsApp am Desktop auf allen Breiten ab lg (F-10 „gleich“, E-015 im Archiv: flacher Knopf mit seitenbezogener
                        Nachricht, Entprellung und Ereignis whatsapp_click); mobil trägt die untere Leiste WhatsApp */}
                    <FloatingWhatsAppWidget />
                    <Link
                        href={hauptziel(pathname)}
                        className={knopfKlassen('haupt', clsx('px-4 @max-xl:hidden @7xl:px-3', leisteAus ? 'max-sm:hidden' : 'max-lg:hidden'))}
                        data-motion="druck"
                        data-hauptknopf=""
                        data-erstes-bild="hauptknopf"
                    >
                        {zusammen(primaryCta.name)}
                    </Link>
                    <button
                        type="button"
                        popoverTarget="mobile-menu"
                        onClick={ohnePopover}
                        className="inline-flex size-11 items-center justify-center border border-strich bg-fliese text-tinte transition-colors dauer-1 ease-setzen hover:border-tinte @7xl:hidden"
                        aria-label={isMobileMenuOpen ? 'Menü schließen' : 'Menü öffnen'}
                        aria-expanded={isMobileMenuOpen}
                        aria-controls="mobile-menu"
                        title="Menü"
                        data-motion="zustand"
                    >
                        <Icon name={isMobileMenuOpen ? 'schliessen' : 'menue'} groesse={5} />
                    </button>
                </div>
            </div>
        </header>
    );
}
