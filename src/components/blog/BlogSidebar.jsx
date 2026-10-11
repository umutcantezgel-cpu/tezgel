"use client";
import React from 'react';
import { useContent } from '@/contexts/ContentContext';
import Icon from '@/components/icons/Icon';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import Knopf from '@/components/kern/Knopf';
import { etikettKlassen, feldKlassen } from '@/components/kern/stile';
import { COMPANY_DATA } from '@/config/company';

// Kategorie-Knopf als Zeile über die volle Breite (Gruppen-Auswahl mit aria-pressed; gedrückt: Tinte, Kalk-Text, Pfeil).
const KATEGORIE =
    'flex min-h-11 w-full items-center justify-between gap-4 border border-strich bg-fliese px-4 py-3 text-left font-text text-fs-2 text-tinte hover:border-tinte aria-pressed:border-tinte aria-pressed:bg-tinte aria-pressed:text-kalk';

/**
 * Blog Sidebar Component
 * Features: Sticky behavior, search, category filter, consultation CTA
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
        <div className="sticky top-24 space-y-6">
            {/* Suche */}
            <div className="border border-fuge bg-fliese p-6">
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

            {/* Kategorien */}
            {categories.length > 1 && (
                <div className="border border-fuge bg-fliese p-6">
                    <p className={etikettKlassen}>
                        <Fugenkreuz className="size-3 shrink-0 text-strich" />
                        Kategorien
                    </p>
                    <div className="mt-4 flex flex-col gap-2">
                        {categories.map(category => (
                            <button
                                type="button"
                                key={category.id}
                                onClick={() => setActiveCategory(category.id)}
                                aria-pressed={activeCategory === category.id}
                                className={KATEGORIE}
                            >
                                <span className="font-semibold">{category.name}</span>
                                {activeCategory === category.id && (
                                    <Icon name="pfeil-rechts" groesse={5} />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Beratung */}
            <div className="border border-fuge bg-fliese p-6">
                <p className="font-anzeige text-fs-4 text-tinte">Beratung gewünscht?</p>
                <p className="mt-2 font-text text-fs-2 text-tinte-2">
                    Fragen zu Badsanierung, Fliesen oder Abdichtung? {COMPANY_DATA.owner.fullName} berät Sie
                    persönlich – inklusive kostenfreiem Vor-Ort-Aufmaß.
                </p>
                <div className="mt-6 flex flex-col gap-3">
                    <Knopf href="/kontakt" icon="pfeil-rechts" className="w-full">
                        Kontakt aufnehmen
                    </Knopf>
                    <Knopf href={`tel:${COMPANY_DATA.contact.phoneLink}`} variante="neben" iconLinks="telefon" className="w-full tabular-nums">
                        {COMPANY_DATA.contact.phone}
                    </Knopf>
                </div>
            </div>
        </div>
    );
};

export default BlogSidebar;
