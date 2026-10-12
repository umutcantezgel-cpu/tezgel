"use client";
// Seitenleiste der Ratgeber-Liste ab lg (S-03, KERN v2 K-009): Schriftfeld-Spalte aus drei Feldern an der Fuge –
// Suche, Kategorien, Beratung. Mono-Etikett über dem Inhalt wie im Schriftfeld; Wortlaut, Reihenfolge und Bedienung
// wie im Bestand (Suchfeld setzt die Suche, Kategorien als Knöpfe mit aria-pressed, Kontakt und Telefon).
// Geändert: Das Suchfeld trägt eine sichtbare Beschriftung statt aria-label (gleicher Wortlaut, MIKROTEXTE P4-08d);
// die Kategorien sind über „Kategorien“ als Gruppe benannt; gedrückt zeigt Tinte-Fläche und Fugenkreuz (nicht nur Farbe).
// Die Leiste klebt nicht mehr (Bestand: sticky top-24): Neben Kopf und unterer Leiste gibt es keine weitere feste Ebene
// (K-009). Damit Suche und Kategorien trotzdem vor den Beiträgen erreichbar sind, steht die Leiste im DOM vor der Liste
// (`BlogListe`).
// Die Kategorie-Icons der Konfiguration (lucide) entfallen: Icon-Kacheln ersatzlos, Fugenkreuz als Marke (Zuordnung K-008).
import { useId } from 'react';
import clsx from 'clsx';
import Icon from '@/components/icons/Icon';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import Knopf from '@/components/kern/Knopf';
import { etikettKlassen, feldKlassen, labelKlassen, wahlKlassen } from '@/components/kern/stile';
import { useContent } from '@/contexts/ContentContext';
import { COMPANY_DATA } from '@/config/company';

const BlogSidebar = ({
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery
}) => {
    const { blogCategories = [], blogPosts = [] } = useContent();
    const suchId = useId();
    const kategorienId = useId();

    // Only list categories that actually contain articles ("all" always stays).
    const categories = (blogCategories || []).filter(category =>
        category.id === 'all' || (blogPosts || []).some(post => post.category === category.id)
    );

    return (
        <div className="flex flex-col gap-px border border-fuge bg-fuge">
            {/* Suche */}
            <div role="search" className="bg-fliese p-6">
                <p className={etikettKlassen}>
                    <Fugenkreuz className="size-3 text-strich" />
                    Suche
                </p>
                <label htmlFor={suchId} className={clsx(labelKlassen, 'mt-4')}>
                    Artikel suchen
                </label>
                <div className="relative">
                    <input
                        id={suchId}
                        type="text"
                        placeholder="Artikel suchen..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        data-motion="zustand"
                        className={clsx(feldKlassen, 'pr-12')}
                    />
                    <span className="pointer-events-none absolute top-2 right-4 bottom-0 flex items-center text-tinte-2">
                        <Icon name="suche" groesse={5} />
                    </span>
                </div>
            </div>

            {/* Kategorien */}
            {categories.length > 1 && (
                <div className="bg-fliese p-6">
                    <p id={kategorienId} className={etikettKlassen}>
                        <Fugenkreuz className="size-3 text-strich" />
                        Kategorien
                    </p>
                    <div role="group" aria-labelledby={kategorienId} className="mt-4 flex flex-wrap gap-2">
                        {categories.map(category => {
                            const gedrueckt = activeCategory === category.id;
                            return (
                                <button
                                    type="button"
                                    key={category.id}
                                    onClick={() => setActiveCategory(category.id)}
                                    aria-pressed={gedrueckt}
                                    data-motion="zustand"
                                    className={clsx(wahlKlassen, 'gap-2 text-left')}
                                >
                                    {gedrueckt && <Fugenkreuz className="size-3" />}
                                    <span>{category.name}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Beratung */}
            <div className="bg-fliese p-6">
                <p className="font-anzeige text-fs-4 font-extrabold text-tinte">Beratung gewünscht?</p>
                <p className="mt-3 text-fs-2 text-tinte-2">
                    Fragen zu Badsanierung, Fliesen oder Abdichtung? {COMPANY_DATA.owner.fullName} berät Sie
                    persönlich – inklusive kostenfreiem Vor-Ort-Aufmaß.
                </p>
                <div className="mt-6 flex flex-col gap-3">
                    <Knopf href="/kontakt" variante="neben" icon="pfeil-rechts" className="w-full">
                        Kontakt aufnehmen
                    </Knopf>
                    <Knopf href={`tel:${COMPANY_DATA.contact.phoneLink}`} variante="neben" iconLinks="telefon" className="w-full">
                        <span className="font-mono">{COMPANY_DATA.contact.phone}</span>
                    </Knopf>
                </div>
            </div>
        </div>
    );
};

export default BlogSidebar;
