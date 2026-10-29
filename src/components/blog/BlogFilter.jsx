"use client";
import { useRef, useState } from 'react';
import { useBlogListe } from '@/lib/formulare/useBlogListe';
import BlogCard, { zeichenFuer } from '@/components/blog/BlogCard';
import Leitfaden from '@/components/blog/liste/Leitfaden';
import Suchfeld, { SUCHBEREICH_NAME } from '@/components/blog/liste/Suchfeld';
import Icon from '@/components/icons/Icon';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import Knopf from '@/components/kern/Knopf';
import { etikettKlassen, wahlKlassen } from '@/components/kern/stile';

// Filter-Insel der Ratgeber-Liste /blog (F-03, Fusion E-039; Grundgerüst A, Semantik und Robustheit aus B; Abnahme E3-BAU-11
// nach K-016): Hook und das davon abhängige Markup in einer Spalte in der Lesebreite, auf jeder Breite gleich: Suche und
// Kategorien · Statusregion · Leitfaden · Beiträge als Zeilen an der Fuge. Die Seitenleiste rechts neben der Liste (ein
// zweiter Strang, mit Firmendaten) entfällt. Suche und Filter stehen vor den Beiträgen, die sie steuern (Tab- und
// Lesefolge, kein tabindex). `anrisse`: Anrisse aus dem Seitentext je Beitrag (Schlüssel slug, mit Textmarken); ohne
// Eintrag zeigt die Zeile den Auszug aus den Beitragsdaten.
//
// Suche: Das Feld zeigt die Eingabe, gefiltert wird mit dem getrimmten Begriff (die Logik in useBlogListe bleibt gleich).
// Statusregion (role="status", immer vorhanden, im Ruhezustand leer): bei aktivem Filter die Trefferzahl in Mono, im
// Leerzustand die Meldung samt „Filter zurücksetzen“ (Hauptknopf, A; Strich-Rahmen, B). Nach dem Zurücksetzen steht der
// Fokus im sichtbaren Suchfeld statt auf <body>.
// Leitfaden (UM-E4-VORL): Die Liste steht im Wissensblock der Vorlage Wissensseite, also im Leitfaden wie auf /. Ihre Beiträge
// tragen Überschriften (H2 des Leitfadens, H3 je Zeile), davor stehen Suche und Kategorien: Neben der ganzen Insel tritt der
// Kopf der Leitachse zurück (data-kopf-pause="ganz", bewegung.css „Leitfaden mit Abschnittsmarke“, wie das Kartenraster der
// Leistungen und die Einsatzkarte), nie ein Kreuz neben einer Überschrift oder dem Suchfeld.

/** Sichtbares Element aus einer Liste von Refs (das Suchfeld der aktuellen Breite) */
const sichtbar = (refs) => refs.map((r) => r.current).find((el) => el && el.getClientRects().length > 0);

export default function BlogFilter({ anrisse = {} }) {
  const {
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    visibleCategories,
    filteredPosts,
    featuredPost,
    showFeatured,
    gridPosts,
    getReadTime,
    resetFilters,
  } = useBlogListe();

  // Eingabe wie getippt; der Filter erhält den Begriff ohne Leerzeichen am Rand
  const [eingabe, setEingabe] = useState(searchQuery);
  const suchen = (wert) => {
    setEingabe(wert);
    setSearchQuery(wert.trim());
  };

  const suche = useRef(null);
  const zuruecksetzen = () => {
    resetFilters();
    setEingabe('');
    sichtbar([suche])?.focus();
  };

  const gefiltert = activeCategory !== 'all' || searchQuery !== '';
  const anzahl = filteredPosts.length;

  // Fokussierter Chip ganz ins Bild der querlaufenden Zeile: ragt er heraus, rückt er an den Anfang (= Rastpunkt von
  // snap-start, sonst rastet die Zeile zurück); scroll-padding der Zeile gilt
  const insBild = (e) => {
    const chip = e.currentTarget.getBoundingClientRect();
    const zeile = e.currentTarget.parentElement.getBoundingClientRect();
    if (chip.left < zeile.left || chip.right > zeile.right) e.currentTarget.scrollIntoView({ block: 'nearest', inline: 'start' });
  };

  return (
    <div data-kopf-pause="ganz" className="mx-auto w-full max-w-mass">
      <div className="@container min-w-0">

        {/* Suche (sichtbar beschriftet) und Kategorien; mobil eine querlaufende Zeile bis an den Bildrand (die erste
            Schaltfläche steht auf dem Seitenrand, 16 px), ab sm umbrechend und mittig */}
        <div className="mb-6 flex flex-col gap-4 border-b border-fuge pb-6">
          <div role="search" aria-label={SUCHBEREICH_NAME}>
            <Suchfeld
              id="blog-suche"
              beschriftung="Ratgeber durchsuchen"
              platzhalter="Suchen"
              wert={eingabe}
              setzen={suchen}
              feldRef={suche}
            />
          </div>

          {/* schmal (große Schrift) stehen die Themen untereinander, alle gleich breit: vorher sprang „Alle Artikel“ als
              einziger kurzer Knopf aus der Flucht (Browserprüfung E4-W0, E-065) */}
          {visibleCategories.length > 0 && (
            <div role="group" aria-label="Kategorien" className="-mx-4 flex snap-x scroll-px-4 gap-2 overflow-x-auto px-4 py-1 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 @max-xs:mx-0 @max-xs:flex-wrap @max-xs:justify-center @max-xs:overflow-visible @max-xs:px-0">
              {[{ id: 'all', name: 'Alle Artikel' }, ...visibleCategories].map((category) => {
                const gedrueckt = activeCategory === category.id;
                const zeichen = zeichenFuer(category.id);
                return (
                  <button
                    type="button"
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    onFocus={insBild}
                    aria-pressed={gedrueckt}
                    className={`${wahlKlassen} shrink-0 @max-xs:w-full @max-xs:shrink @max-xs:justify-start @max-xs:text-left snap-start gap-2`}
                  >
                    {/* genau ein Zeichen: gedrückt das Fugenkreuz, sonst das Kategoriesymbol */}
                    {gedrueckt ? <Fugenkreuz className="size-3 shrink-0" /> : zeichen && <Icon name={zeichen} groesse={4} />}
                    {category.name}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Statusregion: Trefferzahl bzw. Leerzustand werden angesagt */}
        <div role="status">
          {gefiltert && anzahl > 0 && (
            <p className={`${etikettKlassen} mb-4`}>{anzahl} Artikel</p>
          )}
          {anzahl === 0 && (
            <div className="flex flex-col items-start gap-4 border border-l-2 border-strich bg-fliese p-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-3">
                <Icon name="suche" groesse={6} />
                <p className="font-text text-fs-3 font-semibold text-tinte">Keine Artikel zur Suchanfrage gefunden.</p>
              </div>
              <Knopf type="button" onClick={zuruecksetzen}>
                Filter zurücksetzen
              </Knopf>
            </div>
          )}
        </div>

        {/* Hervorgehobener Beitrag (nur ohne Filter und Suche) */}
        {showFeatured && (
          <div className="mb-8 md:mb-12">
            <Leitfaden post={featuredPost} lesezeit={getReadTime(featuredPost)} anriss={anrisse[featuredPost.slug]} />
          </div>
        )}

        {/* Beiträge als Zeilen an der Fuge */}
        {gridPosts.length > 0 && (
          <ul className="border-t border-fuge">
            {gridPosts.map((post) => (
              <li key={post.id}>
                <BlogCard post={post} lesezeit={getReadTime(post)} anriss={anrisse[post.slug]} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
