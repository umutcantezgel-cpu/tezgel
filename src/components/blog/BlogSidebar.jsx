"use client";
import { useId } from 'react';
import { useContent } from '@/contexts/ContentContext';
import Icon from '@/components/icons/Icon';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import Knopf from '@/components/kern/Knopf';
import { zeichenFuer } from '@/components/blog/BlogCard';
import Suchfeld, { SUCHBEREICH_NAME } from '@/components/blog/liste/Suchfeld';
import { etikettKlassen } from '@/components/kern/stile';
import { COMPANY_DATA } from '@/config/company';

// Kategorie-Zeile über die volle Breite des Feldes, durch 1-px-Fugen getrennt (Gruppen-Auswahl mit aria-pressed;
// gedrückt: Tinte, Kalk-Text, Pfeil). Keine Karten mit Zwischenraum: die Zeilen stehen aneinander. Der Fokusring liegt
// innen (2 px Abstand zur Kante), damit ihn die Nachbarzeile nicht verdeckt und er auf der gedrückten Zeile hell steht.
const KATEGORIE =
    'flex min-h-11 w-full items-center justify-between gap-4 border-b border-fuge bg-fliese px-4 py-2 text-left font-text text-fs-2 text-tinte last:border-b-0 hover:border-strich focus-visible:-outline-offset-4 aria-pressed:border-tinte aria-pressed:bg-tinte aria-pressed:text-kalk aria-pressed:focus-visible:outline-kalk';

/**
 * Seitenleiste der Ratgeber-Liste ab lg (F-03, Fusion E-039): Grundgerüst A, Semantik aus B.
 * Steht im DOM vor der Liste (Tab- und Lesefolge: Filter vor den Beiträgen, die sie steuern) und im Raster rechts.
 * Suche (fließt oben): Such-Landmarke mit Namen, sichtbare Beschriftung „Artikel suchen“ und Lupe (B).
 * Darunter Kategorien und Beratung als ein Feld mit Fugen; ab xl klebt nur dieser Block unter dem Kopf (top-24 =
 * scroll-padding-top), solange die Liste läuft; er ist kürzer als der Bildschirm (1280 × 800 und 1440 × 900).
 * Kategorien als benannte Gruppe (role="group" → „Kategorien“, B). „Kontakt aufnehmen“ als Nebenknopf und Telefon in Mono
 * (B): die gedrückte Kategorie bleibt die einzige Tinte-Fläche der Leiste.
 */
const BlogSidebar = ({
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    suchfeldRef
}) => {
    const { blogCategories = [], blogPosts = [] } = useContent();
    const kategorienId = useId();

    // Only list categories that actually contain articles ("all" always stays).
    const categories = (blogCategories || []).filter(category =>
        category.id === 'all' || (blogPosts || []).some(post => post.category === category.id)
    );

    return (
        <>
            {/* Suche (fließt) */}
            <div role="search" aria-label={SUCHBEREICH_NAME} className="border border-fuge bg-fliese px-4 py-3">
                <p className={etikettKlassen}>
                    <Fugenkreuz className="size-3 shrink-0 text-strich" />
                    Suche
                </p>
                <Suchfeld
                    beschriftung="Artikel suchen"
                    platzhalter="Artikel suchen..."
                    wert={searchQuery}
                    setzen={setSearchQuery}
                    feldRef={suchfeldRef}
                    className="mt-3"
                />
            </div>

            {/* Kategorien und Beratung (ab xl klebend) */}
            <div className="divide-y divide-fuge border border-t-0 border-fuge bg-fliese xl:sticky xl:top-24">
                {/* Kategorien: Zeilen bis an die Fuge darunter, ohne Leerstreifen */}
                {categories.length > 1 && (
                    <div className="pt-3">
                        <p id={kategorienId} className={`${etikettKlassen} px-4`}>
                            <Fugenkreuz className="size-3 shrink-0 text-strich" />
                            Kategorien
                        </p>
                        <div role="group" aria-labelledby={kategorienId} className="mt-2 flex flex-col border-t border-fuge">
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
                        <Knopf href="/kontakt" variante="neben" icon="pfeil-rechts" className="w-full">
                            Kontakt aufnehmen
                        </Knopf>
                        <Knopf href={`tel:${COMPANY_DATA.contact.phoneLink}`} variante="neben" iconLinks="telefon" className="w-full">
                            <span className="font-mono">{COMPANY_DATA.contact.phone}</span>
                        </Knopf>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BlogSidebar;
