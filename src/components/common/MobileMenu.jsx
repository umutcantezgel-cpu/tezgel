"use client";

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Phone,
    MessageCircle,
    ChevronDown,
    Mail,
    MapPin,
    Clock,
    ArrowRight,
    Sparkles,
    ShieldCheck,
    CheckCircle2,
    Sliders,
    Layers
} from 'lucide-react';
import { navigationLinks, primaryCta } from '@/config/navigation';
import { COMPANY_DATA } from '@/config/company';
import { BrandMark } from '@/components/common/Header';
import {
    FugenkreuzToggle,
    LaserLevelLine,
    TileCategoryIcon,
    GroutCrossMarker
} from '@/components/common/TileCraftIcons';

// Interactive Tile Material Sampler Presets
const MATERIAL_SAMPLES = [
    {
        id: 'schiefer',
        name: 'Anthrazit-Schiefer',
        type: 'Feinsteinzeug R10/B',
        spec: 'Fugenarm · Frostsicher · Trittsicher',
        colorClass: 'from-stone-900 via-stone-800 to-neutral-900 border-stone-700',
        badge: 'Bestseller Bad'
    },
    {
        id: 'carrara',
        name: 'Calacatta Marmor',
        type: 'Glanzkeramik rektifiziert',
        spec: 'Hauchdünne 1mm Fuge · Wand & Boden',
        colorClass: 'from-neutral-100 via-white to-stone-200 border-stone-300 text-neutral-900',
        badge: 'Luxus-Linie'
    },
    {
        id: 'eiche',
        name: 'Eiche Natur Holzoptik',
        type: 'Keramische Diele 120×20 cm',
        spec: 'Warme Holzmaserung · Fußbodenheizung',
        colorClass: 'from-amber-800 via-stone-700 to-amber-900 border-amber-700',
        badge: 'Wohnbereiche'
    },
    {
        id: 'beton',
        name: 'Beton Cotto Warm',
        type: 'Großformat 100×100 cm',
        spec: 'Industrieller Loft-Look · DIN 18534',
        colorClass: 'from-neutral-400 via-stone-500 to-neutral-600 border-stone-400',
        badge: 'Modern Minimal'
    }
];

export default function MobileMenu({ isOpen, onClose }) {
    const pathname = usePathname() || '/';
    const [expandedMenu, setExpandedMenu] = useState('Badsanierung');
    const [selectedMaterial, setSelectedMaterial] = useState(MATERIAL_SAMPLES[0]);
    const closeButtonRef = useRef(null);

    // Scroll lock and keyboard navigation
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
            className={`fixed inset-0 z-[70] transition-opacity duration-300 ${
                isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            aria-hidden={!isOpen}
            inert={!isOpen}
        >
            {/* Backdrop with architectural blueprint blur */}
            <button
                type="button"
                tabIndex={-1}
                aria-label="Architektur-Menü schließen"
                onClick={onClose}
                className="absolute inset-0 w-full h-full bg-neutral-950/65 backdrop-blur-md cursor-default transition-all"
            />

            {/* Hyperrealistic Tile-Craft Drawer */}
            <div
                id="mobile-menu"
                role="dialog"
                aria-modal="true"
                aria-label="Fliesen-Manufaktur Hauptnavigation"
                className={`absolute right-0 top-0 h-full w-full max-w-lg tile-grout-pattern shadow-[0_0_80px_rgba(0,0,0,0.45)] border-l-2 border-neutral-300 flex flex-col transition-transform duration-300 ease-out ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                {/* 1. TOP PLANK (Kopf-Slab) */}
                <header className="relative z-10 tile-slab mx-3 mt-3 px-4 py-3.5 flex items-center justify-between gap-3 shrink-0">
                    <Link href="/" onClick={onClose} className="group focus-visible:outline-none" aria-label="Zur Startseite">
                        <BrandMark sublineClassName="block" />
                    </Link>

                    <div className="flex items-center gap-2">
                        {/* Live Status indicator */}
                        <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-50 border border-orange-200 text-[11px] font-bold text-orange-900">
                            <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
                            <span>Vor-Ort-Aufmaß aktiv</span>
                        </div>

                        {/* Morphing Fugenkreuz Close Button */}
                        <button
                            ref={closeButtonRef}
                            type="button"
                            onClick={onClose}
                            className="inline-flex items-center justify-center h-11 w-11 rounded-xl bg-neutral-100 hover:bg-orange-100 border border-neutral-200 hover:border-orange-300 transition-colors focus-visible:outline-none"
                            aria-label="Menü schließen"
                        >
                            <FugenkreuzToggle isOpen={true} className="w-5 h-5" />
                        </button>
                    </div>
                </header>

                {/* 2. LASER DATUM LINE (Richtschnur) */}
                <div className="px-4 pt-1">
                    <LaserLevelLine active={isOpen} />
                </div>

                {/* Scrollable Architectural Content Area */}
                <div className="flex-1 overflow-y-auto px-3.5 py-2 space-y-3">
                    
                    {/* 3. MODULARE SCHNELL-KACHELN (Quick Tile Grid) */}
                    <section aria-label="Schnellzugriff Fliesen-Werkzeuge" className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        <Link
                            href="/bad/badplaner"
                            onClick={onClose}
                            className="tile-plank p-2.5 flex flex-col justify-between group hover:border-orange-500/80 transition-all"
                        >
                            <div className="flex items-center justify-between">
                                <span className="p-1.5 rounded-lg bg-orange-50 border border-orange-200 text-orange-700 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                                    <Sliders className="w-4 h-4" />
                                </span>
                                <span className="text-[9px] font-bold uppercase text-orange-700 bg-orange-100/70 px-1.5 py-0.5 rounded">3D</span>
                            </div>
                            <div className="mt-2">
                                <p className="text-xs font-bold text-neutral-900 leading-tight">Badplaner</p>
                                <p className="text-[10px] text-neutral-600">Online konfigurieren</p>
                            </div>
                        </Link>

                        <Link
                            href="/bad/projekt-check"
                            onClick={onClose}
                            className="tile-plank p-2.5 flex flex-col justify-between group hover:border-orange-500/80 transition-all"
                        >
                            <div className="flex items-center justify-between">
                                <span className="p-1.5 rounded-lg bg-stone-100 border border-stone-200 text-neutral-800 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                                    <Layers className="w-4 h-4" />
                                </span>
                                <span className="text-[9px] font-bold uppercase text-neutral-600 bg-neutral-200/70 px-1.5 py-0.5 rounded">2 Min.</span>
                            </div>
                            <div className="mt-2">
                                <p className="text-xs font-bold text-neutral-900 leading-tight">Projekt-Check</p>
                                <p className="text-[10px] text-neutral-600">Badbedarf ermitteln</p>
                            </div>
                        </Link>

                        <Link
                            href="/fliesen/grossformat"
                            onClick={onClose}
                            className="tile-plank p-2.5 flex flex-col justify-between group hover:border-orange-500/80 transition-all"
                        >
                            <div className="flex items-center justify-between">
                                <span className="p-1.5 rounded-lg bg-stone-100 border border-stone-200 text-neutral-800 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                                    <Sparkles className="w-4 h-4" />
                                </span>
                                <span className="text-[9px] font-bold uppercase text-orange-700 bg-orange-100/70 px-1.5 py-0.5 rounded">XXL</span>
                            </div>
                            <div className="mt-2">
                                <p className="text-xs font-bold text-neutral-900 leading-tight">Großformat</p>
                                <p className="text-[10px] text-neutral-600">Fugenlose Keramik</p>
                            </div>
                        </Link>

                        <a
                            href={COMPANY_DATA.contact.whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="tile-plank p-2.5 flex flex-col justify-between group hover:border-emerald-500 transition-all bg-emerald-50/40"
                        >
                            <div className="flex items-center justify-between">
                                <span className="p-1.5 rounded-lg bg-emerald-100 border border-emerald-300 text-emerald-800 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                    <MessageCircle className="w-4 h-4" />
                                </span>
                                <span className="text-[9px] font-bold uppercase text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded">Direkt</span>
                            </div>
                            <div className="mt-2">
                                <p className="text-xs font-bold text-emerald-950 leading-tight">WhatsApp</p>
                                <p className="text-[10px] text-emerald-800">Foto anfragen</p>
                            </div>
                        </a>
                    </section>

                    {/* 4. BALKEN-FÜR-BALKEN NAVIGATION (Staggered Ceramic Planks) */}
                    <nav aria-label="Fachkategorien Fliesenhandwerk" className="space-y-2">
                        {navigationLinks.map((link, index) => {
                            const isExpanded = expandedMenu === link.name;
                            const panelId = `tile-panel-${index}`;
                            const categorySlug = link.path.replace('/', '') || 'bad';

                            return (
                                <div
                                    key={link.name}
                                    className={`tile-plank overflow-hidden transition-all duration-200 ${
                                        isExpanded ? 'border-orange-300 shadow-md ring-1 ring-orange-200/60' : 'hover:border-neutral-300'
                                    }`}
                                >
                                    {/* Ceramic Plank Trigger */}
                                    <button
                                        type="button"
                                        onClick={() => setExpandedMenu(isExpanded ? null : link.name)}
                                        aria-expanded={isExpanded}
                                        aria-controls={panelId}
                                        className="w-full min-h-[58px] flex items-center justify-between gap-3 px-3.5 py-2.5 text-left bg-white group focus-visible:outline-none"
                                    >
                                        <div className="flex items-center gap-3 min-w-0">
                                            {/* Micro-engraved Ceramic Icon */}
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-colors ${
                                                isExpanded ? 'bg-orange-600 border-orange-600 text-white' : 'bg-neutral-50 border-neutral-200 text-neutral-800 group-hover:border-orange-300'
                                            }`}>
                                                <TileCategoryIcon id={categorySlug} className={`w-5 h-5 ${isExpanded ? 'text-white' : 'text-orange-600'}`} />
                                            </div>

                                            <div className="truncate">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-display text-[15px] font-black text-neutral-900 tracking-tight">
                                                        {link.name}
                                                    </span>
                                                    {link.featured?.eyebrow && (
                                                        <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-600 border border-neutral-200">
                                                            {link.featured.eyebrow}
                                                        </span>
                                                    )}
                                                </div>
                                                <span className="block text-xs text-neutral-600 truncate mt-0.5">
                                                    {link.description}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 shrink-0">
                                            <GroutCrossMarker className={`w-2.5 h-2.5 transition-opacity ${isExpanded ? 'text-orange-500 opacity-100' : 'opacity-20'}`} />
                                            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180 text-orange-600' : 'text-neutral-600'}`} />
                                        </div>
                                    </button>

                                    {/* Mosaik-Auffächerung (Sub-Links) */}
                                    <div id={panelId} hidden={!isExpanded} className="border-t border-neutral-200/80 bg-neutral-50/70 p-2.5 space-y-2">
                                        {link.submenu?.map((cat) => (
                                            <div key={cat.category} className="space-y-1">
                                                <div className="flex items-center gap-2 px-2 pt-1 pb-0.5">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-neutral-600">
                                                        {cat.category}
                                                    </p>
                                                </div>

                                                <ul className="grid grid-cols-1 gap-1">
                                                    {cat.items.map((item) => {
                                                        const active = pathname === item.path;
                                                        return (
                                                            <li key={item.path + item.name}>
                                                                <Link
                                                                    href={item.path}
                                                                    onClick={onClose}
                                                                    aria-current={active ? 'page' : undefined}
                                                                    className={`group/link flex items-center justify-between gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
                                                                        active
                                                                            ? 'bg-orange-500 text-white border-orange-600 shadow-sm'
                                                                            : 'bg-white text-neutral-800 border-neutral-200 hover:border-orange-300 hover:bg-orange-50/40'
                                                                    }`}
                                                                >
                                                                    <div className="min-w-0">
                                                                        <span className="block truncate">{item.name}</span>
                                                                        {item.desc && (
                                                                            <span className={`block text-[10px] font-normal truncate mt-0.5 ${active ? 'text-orange-100' : 'text-neutral-600'}`}>
                                                                                {item.desc}
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                    <ArrowRight className={`w-3.5 h-3.5 shrink-0 transition-transform group-hover/link:translate-x-0.5 ${
                                                                        active ? 'text-white' : 'text-orange-600'
                                                                    }`} />
                                                                </Link>
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
                                            </div>
                                        ))}

                                        {/* Direct Hub Link Footer */}
                                        <div className="pt-1.5 flex justify-end">
                                            <Link
                                                href={link.path}
                                                onClick={onClose}
                                                className="inline-flex items-center gap-1.5 text-xs font-black text-orange-700 hover:text-orange-800 px-2 py-1 rounded-lg hover:bg-orange-100/50 transition-colors"
                                            >
                                                <span>Alle Details zu {link.name} ansehen</span>
                                                <ArrowRight className="w-3.5 h-3.5" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </nav>

                    {/* 5. INTERAKTIVER FLIESEN-MUSTER-SAMPLER (Visual Factor 10 Highlight) */}
                    <section aria-label="Fliesen-Muster & Haptik-Vorschau" className="tile-slab p-3.5 space-y-2.5">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-orange-600" />
                                <h3 className="font-display text-xs font-black uppercase tracking-wider text-neutral-900">
                                    Fliesen-Muster & Haptik
                                </h3>
                            </div>
                            <span className="text-[10px] font-semibold text-neutral-600">Material-Vorschau</span>
                        </div>

                        {/* Interactive Texture Swatch Buttons */}
                        <div className="grid grid-cols-4 gap-1.5">
                            {MATERIAL_SAMPLES.map((sample) => {
                                const isSelected = selectedMaterial.id === sample.id;
                                return (
                                    <button
                                        key={sample.id}
                                        type="button"
                                        onClick={() => setSelectedMaterial(sample)}
                                        className={`group p-1.5 rounded-xl border text-center transition-all ${
                                            isSelected
                                                ? 'border-orange-500 bg-orange-50/80 shadow-sm ring-1 ring-orange-300'
                                                : 'border-neutral-200 bg-white hover:border-neutral-300'
                                        }`}
                                    >
                                        <div className={`h-8 rounded-lg bg-gradient-to-br ${sample.colorClass} shadow-inner mb-1`} />
                                        <p className="text-[10px] font-bold text-neutral-800 truncate leading-tight">
                                            {sample.name.split(' ')[0]}
                                        </p>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Dynamic Material Detail Card */}
                        <div className="p-2.5 rounded-xl bg-neutral-900 text-white flex items-center justify-between gap-3 shadow-inner">
                            <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-orange-400">{selectedMaterial.name}</span>
                                    <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300">
                                        {selectedMaterial.badge}
                                    </span>
                                </div>
                                <p className="text-[10px] text-neutral-400 mt-0.5 truncate">{selectedMaterial.spec}</p>
                            </div>
                            <Link
                                href="/fliesen/grossformat"
                                onClick={onClose}
                                className="shrink-0 text-[10px] font-bold px-2 py-1 rounded bg-orange-600 hover:bg-orange-500 text-white transition-colors"
                            >
                                Details
                            </Link>
                        </div>
                    </section>

                    {/* 6. QUALITÄTS- & GEWÄHRLEISTUNGS-SLAB */}
                    <section aria-label="Fachbetrieb-Garantie" className="tile-plank p-3 bg-gradient-to-br from-white to-orange-50/30 border-orange-200/80 space-y-2">
                        <div className="flex items-start gap-2.5">
                            <ShieldCheck className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                            <div>
                                <h4 className="text-xs font-black text-neutral-900">
                                    Fliesenverlegung Deniz Tezgel
                                </h4>
                                <p className="text-[11px] text-neutral-600 mt-0.5 leading-snug">
                                    Eingetragener Fachbetrieb der Handwerkskammer Wiesbaden. Bis zu 12 Handwerker für Ihr Projekt in Hessen.
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-1.5 pt-1 text-[10px] font-bold text-neutral-700">
                            <div className="flex items-center gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                                <span>DIN 18534 Verbundabdichtung</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                                <span>Staubfreies Arbeiten im Bestand</span>
                            </div>
                        </div>
                    </section>
                </div>

                {/* 7. FUNDAMENT-SLAB (Direct Contact & Showroom CTAs) */}
                <footer className="tile-slab mx-3 mb-3 p-3.5 space-y-2.5 shrink-0 bg-white">
                    <Link
                        href={primaryCta.path}
                        onClick={onClose}
                        className="btn-primary w-full py-3 text-xs justify-center shadow-lg"
                    >
                        <span>Kostenfreies Vor-Ort-Aufmaß anfragen</span>
                        <ArrowRight className="w-4 h-4" />
                    </Link>

                    <div className="grid grid-cols-2 gap-2">
                        <a
                            href={`tel:${COMPANY_DATA.contact.phoneLink}`}
                            className="btn-ghost py-2.5 px-3 text-xs justify-center font-bold"
                        >
                            <Phone className="w-4 h-4 text-orange-600 shrink-0" />
                            <span>Anrufen</span>
                        </a>
                        <a
                            href={COMPANY_DATA.contact.whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="glass-button-whatsapp py-2.5 px-3 text-xs justify-center font-bold"
                        >
                            <MessageCircle className="w-4 h-4 shrink-0" />
                            <span>WhatsApp</span>
                        </a>
                    </div>

                    <div className="pt-2 border-t border-neutral-200/80 space-y-1.5 text-[11px] text-neutral-600">
                        <div className="flex items-center justify-between">
                            <span className="flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                                {COMPANY_DATA.hours.formattedWeekdays}
                            </span>
                            <a
                                href={`mailto:${COMPANY_DATA.contact.email}`}
                                className="flex items-center gap-1 hover:text-orange-700 underline-offset-2 hover:underline"
                            >
                                <Mail className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                                <span>{COMPANY_DATA.contact.email}</span>
                            </a>
                        </div>
                        <div className="flex items-center justify-between pt-0.5">
                            <div className="flex items-center gap-1.5">
                                <MapPin className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                                <span>Aßlar &middot; Wetzlar &middot; Gießen</span>
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
                    </div>
                </footer>
            </div>
        </div>
    );
}
