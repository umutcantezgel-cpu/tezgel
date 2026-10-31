"use client";
import { useRef, useState } from 'react';
import { useBlogListe } from '@/lib/formulare/useBlogListe';
import BlogCard, { zeichenFuer } from '@/components/blog/BlogCard';
import Leitfaden from '@/components/blog/liste/Leitfaden';
import Suchfeld, { SUCHBEREICH_NAME } from '@/components/blog/liste/Suchfeld';
import Icon from '@/components/icons/Icon';
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
// Liste nach Thema (UM-E4-SICHT-FIX M-C8, Sicht E4: 16 gleiche Einträge in einer 600-px-Säule über sechs Bildschirme): Suche
// und Themen stehen zuerst in der Lesebreite, die Themenknöpfe brechen an der Kante des Suchfelds um (vorher mobil eine
// querlaufende Zeile); gedrückt trägt ein Knopf den Haken (vorher das Fugenkreuz, las sich wie „hinzufügen“). Bei „Alle
// Artikel“ ohne Suche folgen der Leitartikel als ruhiger Wissensmoment (Verlegeplan groß, sig-plan) und die Beiträge nach
// Thema: je Gruppe ein mittiger Kopf mit Anzahl, ab lg abwechselnd um ein Sechstel versetzt; die Folge kommt vorsortiert vom
// Server (nachThema: Folge der Kategorien, „Ratgeber und Neuigkeiten“ zuletzt, die Stellenanzeige als letzter Eintrag), die
// Insel ordnet nur zu. Mit Filter oder Suche eine Liste wie bisher. Die Zeilen stehen ab lg über die volle Inhaltsbreite
// (BlogCard). `zeichnungen` (je Vignette, nach Name) und `leitzeichnung` sind fertige Knoten vom Server, `motive` nennt je
// Beitrag (slug) seine Vignette: Die Insel trägt keinen Zeichencode.
// Überschriften (Nacharbeit SF-C1): Jede Zeile trägt in jedem Zustand eine H3, die Gruppenköpfe sind H2 wie der Titel des
// Leitartikels darüber (vorher H3-Köpfe mit H4-Zeilen; die Funktionsprüfung F-16 sucht die Beiträge als H3). Die Themenknöpfe
// stehen unter sm in zwei gleich breiten Spalten, „Alle Artikel“ über beide (vorher eine Treppe aus 2, 1, 1, 1 Knöpfen), bei
// großer Schrift untereinander.

/** Sichtbares Element aus einer Liste von Refs (das Suchfeld der aktuellen Breite) */
const sichtbar = (refs) => refs.map((r) => r.current).find((el) => el && el.getClientRects().length > 0);

export default function BlogFilter({ anrisse = {}, zeichnungen = {}, motive = {}, leitzeichnung = null }) {
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
  // nach Thema nur ohne Filter und Suche; die Folge innerhalb der Gruppe kommt vom Server
  const gruppen = gefiltert
    ? null
    : visibleCategories.map((kategorie) => ({ kategorie, beitraege: gridPosts.filter((post) => post.category === kategorie.id) })).filter((g) => g.beitraege.length > 0);

  return (
    <div data-kopf-pause="ganz" className="w-full">
      <div className="@container min-w-0">

        {/* Suche (sichtbar beschriftet) und Kategorien in der Lesebreite; die Knöpfe brechen an der Kante des Suchfelds um */}
        <div className="mx-auto mb-6 flex max-w-mass flex-col gap-4 border-b border-fuge pb-6">
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
            <div role="group" aria-label="Kategorien" className="grid grid-cols-2 gap-2 @max-xs:grid-cols-1 sm:flex sm:flex-wrap">
              {[{ id: 'all', name: 'Alle Artikel' }, ...visibleCategories].map((category, i) => {
                const gedrueckt = activeCategory === category.id;
                const zeichen = zeichenFuer(category.id);
                return (
                  <button
                    type="button"
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    aria-pressed={gedrueckt}
                    className={`${wahlKlassen} gap-2 @max-xs:w-full @max-xs:justify-start @max-xs:text-left ${i === 0 ? 'col-span-2 @max-xs:col-span-1' : ''}`}
                  >
                    {/* genau ein Zeichen: gedrückt der Haken, sonst das Kategoriesymbol */}
                    {gedrueckt ? <Icon name="haken" groesse={4} /> : zeichen && <Icon name={zeichen} groesse={4} />}
                    {category.name}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Statusregion: Trefferzahl bzw. Leerzustand werden angesagt */}
        <div role="status" className="mx-auto max-w-mass">
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
          <div className="mb-12 lg:mb-16">
            <Leitfaden post={featuredPost} lesezeit={getReadTime(featuredPost)} anriss={anrisse[featuredPost.slug]} zeichnung={leitzeichnung} />
          </div>
        )}

        {/* Beiträge nach Thema: mittiger Kopf mit Anzahl, ab lg abwechselnd versetzt; darunter die Zeilen an der Fuge */}
        {gruppen && gruppen.map(({ kategorie, beitraege }, i) => (
          <div key={kategorie.id} className={i > 0 ? 'mt-12 lg:mt-16' : undefined}>
            <div className={`mx-auto flex flex-col items-center gap-1 text-center lg:w-2/3 ${i % 2 === 0 ? 'lg:mr-auto lg:ml-0' : 'lg:mr-0 lg:ml-auto'}`}>
              <h2 className="text-fs-5 text-tinte">{kategorie.name}</h2>
              <p className="font-mono text-fs-1 text-tinte-2">{beitraege.length === 1 ? '1 Artikel' : `${beitraege.length} Artikel`}</p>
            </div>
            <ul className="mt-6 border-t border-fuge">
              {beitraege.map((post) => (
                <li key={post.id}>
                  <BlogCard post={post} lesezeit={getReadTime(post)} anriss={anrisse[post.slug]} zeichnung={zeichnungen[motive[post.slug]]} />
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* mit Filter oder Suche: eine Liste wie bisher */}
        {!gruppen && gridPosts.length > 0 && (
          <ul className="border-t border-fuge">
            {gridPosts.map((post) => (
              <li key={post.id}>
                <BlogCard post={post} lesezeit={getReadTime(post)} anriss={anrisse[post.slug]} zeichnung={zeichnungen[motive[post.slug]]} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
