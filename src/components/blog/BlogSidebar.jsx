"use client";
import React from 'react';
import { useContent } from '@/contexts/ContentContext';
import Icon from '@/components/icons/Icon';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import Knopf from '@/components/kern/Knopf';
import { zeichenFuer } from '@/components/blog/BlogCard';
import { etikettKlassen, feldKlassen } from '@/components/kern/stile';
import { COMPANY_DATA } from '@/config/company';

// Kategorie-Zeile über die volle Breite des Feldes, durch 1-px-Fugen getrennt (Gruppen-Auswahl mit aria-pressed;
// gedrückt: Tinte, Kalk-Text, Pfeil). Keine Karten mit Zwischenraum: die Zeilen stehen aneinander.
const KATEGORIE =
    'flex min-h-11 w-full items-center justify-between gap-4 border-b border-fuge bg-fliese px-4 py-2 text-left font-text text-fs-2 text-tinte hover:border-strich aria-pressed:border-tinte aria-pressed:bg-tinte aria-pressed:text-kalk';

/**
 * Blog Sidebar Component
 * Features: Suche (fließt oben), darunter Kategorien und Beratung als ein Feld mit Fugen (keine Zwischenräume).
 * Ab xl klebt nur dieser untere Block unter dem Kopf, solange die Liste läuft; er ist kürzer als der Bildschirm
 * (1280 × 800 und 1440 × 900 vollständig sichtbar). Die Suche bleibt in der Fließrichtung.
 * (View counts and Popular Posts removed)
 */
const BlogSidebar = ({
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery
}) => {
    const { blogCategories = [], blogPosts = [] } = useContent();

    // Only list categories that actually contain articles ("all" always stays).
    const categories = (blogCategories || []).filter(category =>
        category.id === 'all' || (blogPosts || []).some(post => post.category === category.id)
    );

    return (
        <>
            {/* Suche (fließt) */}
            <div className="border border-fuge bg-fliese px-4 py-3">
                <p className={etikettKlassen}>
                    <Fugenkreuz className="size-3 shrink-0 text-strich" />
                    Suche
                </p>
                <input
                    type="text"
                    aria-label="Artikel suchen"
                    placeholder="Artikel suchen..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={feldKlassen}
                />
            </div>

            {/* Kategorien und Beratung (ab xl klebend) */}
            <div className="divide-y divide-fuge border border-t-0 border-fuge bg-fliese xl:sticky xl:top-24">
                {/* Kategorien */}
                {categories.length > 1 && (
                    <div className="px-4 py-3">
                        <p className={etikettKlassen}>
                            <Fugenkreuz className="size-3 shrink-0 text-strich" />
                            Kategorien
                        </p>
                        <div className="-mx-4 mt-2 flex flex-col border-t border-fuge">
                            {categories.map(category => {
                                const zeichen = zeichenFuer(category.id);
                                return (
                                    <button
                                        type="button"
                                        key={category.id}
                                        onClick={() => setActiveCategory(category.id)}
                                        aria-pressed={activeCategory === category.id}
                                        className={KATEGORIE}
                                    >
                                        <span className="flex min-w-0 items-center gap-2">
                                            {zeichen && <Icon name={zeichen} groesse={5} />}
                                            <span className="font-semibold">{category.name}</span>
                                        </span>
                                        {activeCategory === category.id && (
                                            <Icon name="pfeil-rechts" groesse={5} />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Beratung */}
                <div className="px-4 py-3">
                    <p className="font-anzeige text-fs-4 font-bold text-tinte">Beratung gewünscht?</p>
                    <p className="mt-2 font-text text-fs-2 text-tinte-2">
                        Fragen zu Badsanierung, Fliesen oder Abdichtung? {COMPANY_DATA.owner.fullName} berät Sie
                        persönlich – inklusive kostenfreiem Vor-Ort-Aufmaß.
                    </p>
                    <div className="mt-3 flex flex-col gap-3">
                        <Knopf href="/kontakt" icon="pfeil-rechts" className="w-full">
                            Kontakt aufnehmen
                        </Knopf>
                        <Knopf href={`tel:${COMPANY_DATA.contact.phoneLink}`} variante="neben" iconLinks="telefon" className="w-full tabular-nums">
                            {COMPANY_DATA.contact.phone}
                        </Knopf>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BlogSidebar;
