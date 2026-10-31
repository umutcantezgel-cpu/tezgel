'use client';
// Galerie „Unsere Arbeiten“ · Auswahl (KERN v3.4 K-007 `galerie-filter`, E3-GRAF-08): Insel mit Zustand. Knöpfe mit
// aria-pressed wie der Themenfilter der Bewertungen (wahlKlassen; genau ein Zeichen: gedrückt das Fugenkreuz, sonst das
// Raumzeichen), darunter die Statuszeile (role="status") und die Fotos als verlegte Fläche. Die Fotos kommen fertig vom
// Server (Bildfeld als Knoten); die Insel setzt nur hidden und die Marke data-galerie-neu mit der Staffelstufe. Neue Fotos
// blenden in dauer-2 ein, Stück für Stück (CSS in bewegung.css), wegfallende gehen sofort. Ohne JavaScript stehen alle
// Fotos; Satz, Knöpfe und Statuszeile sind dann verborgen (noscript:hidden), im Druck ebenso (print:hidden: auf Papier
// gibt es nichts zu wählen, gedruckt werden die gezeigten Fotos). Eine Auswahl in der Adresse (`?raum=`) gilt,
// bis man selbst wählt. Rand je Foto statt Fugen-Hintergrund: Nach dem
// Filtern stehen keine grauen Restfelder, die Fläche endet wie ein Boden mitten im Verlegen.
// Eingeklappt (UM-E4-SICHT-FIX M-C3 Nr. 2, Sicht E4: mobil 24 Fotos einspaltig, die Seite 21.000 px lang): Bei „Alle Fotos“
// stehen zuerst drei Reihen (schmal 6, im Dreierraster 9 Fotos, ZUERST), darunter „Alle {n} Fotos zeigen“ (aria-expanded,
// danach der Fokus auf dem ersten neuen Foto, die neuen blenden gestaffelt ein wie beim Filtern). Der eingeklappte Zustand steht
// schon im Server-HTML (data-eingeklappt an der Liste, data-galerie-mehr an den Fotos, globals.css „Galerie eingeklappt“):
// Die Hydrierung verschiebt nichts, verborgene Fotos laden nicht sofort; ohne JavaScript und im Druck stehen alle. Ein Raum
// zeigt immer alle Fotos seiner Gruppe. Im Dreierraster bei „Alle Fotos“ im Verband: die mittlere Spalte steht um ein Drittel
// einer Kachel tiefer (data-verband). Die Knöpfe stehen unter md in zwei gleich breiten Spalten (drei Reihen zu zwei; vorher
// 3, 1, 2 mit einem Knopf allein, Nacharbeit SF-C1), bei großer Schrift untereinander, ab md in drei gleich breiten
// Spalten, ab xl in einer Zeile. Ohne Maus steht der Name auf dem Verlauf in höchstens zwei Zeilen (globals.css).
import { useId, useRef, useState, useSyncExternalStore, type CSSProperties, type ReactNode } from 'react';
import clsx from 'clsx';
import Icon from '@/components/icons/Icon';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import { knopfKlassen, wahlKlassen } from '@/components/kern/stile';
import type { ArbeitId } from '@/config/arbeiten';
import { GRUPPEN, ansage, anzahl, istSichtbar, mehrMarke, stufen, stufenNachzeigen, type GruppeId, type Wahl } from './daten';

export interface GalerieWahlFoto {
  bild: ArbeitId;
  gruppe: GruppeId;
  /** fertiges Bildfeld vom Server */
  knoten: ReactNode;
}

interface Stand {
  wahl: Wahl;
  /** Auswahl vor dem letzten Wechsel; null bis zum ersten Wechsel (beim Laden blendet nichts ein) */
  vorher: Wahl | null;
  /** aufgeklappt: ab diesem Foto blenden die nachgezeigten ein (null: noch eingeklappt bzw. nach einem Wechsel ruhig) */
  nach?: number | null;
}

const ohneAbo = () => () => {};
/** Auswahl aus der Adresse (`?raum=dusche`), z. B. vom Link „Alle Arbeiten ansehen“ einer Leistungsseite (E3-BAU) */
function raumAusAdresse(): Wahl | null {
  const raum = new URLSearchParams(window.location.search).get('raum');
  return GRUPPEN.find((g) => g.id === raum)?.id ?? null;
}

export default function GalerieWahl({ fotos, satz }: { fotos: GalerieWahlFoto[]; satz: string }) {
  const satzId = useId();
  // bis zur ersten eigenen Wahl gilt die Auswahl aus der Adresse (auf dem Server und beim Hydrieren „Alle Fotos“)
  const ausAdresse = useSyncExternalStore(ohneAbo, raumAusAdresse, () => null);
  const listeId = useId();
  const liste = useRef<HTMLUListElement>(null);
  const [gewaehlt, setGewaehlt] = useState<Stand | null>(null);
  const [aufgeklappt, setAufgeklappt] = useState(false);
  const stand: Stand = gewaehlt ?? { wahl: ausAdresse && anzahl(ausAdresse, fotos) > 0 ? ausAdresse : 'alle', vorher: null };
  const waehlen = (wahl: Wahl) => setGewaehlt(stand.wahl === wahl ? stand : { wahl, vorher: stand.wahl });
  const gruppen = GRUPPEN.filter((g) => anzahl(g.id, fotos) > 0);
  const eingeklappt = stand.wahl === 'alle' && !aufgeklappt;
  const stufe = typeof stand.nach === 'number' ? stufenNachzeigen(fotos.length, stand.nach) : stufen(fotos, stand.wahl, stand.vorher);
  // Alle zeigen: das erste verborgene Foto (je nach Raster das 7. oder 10.) ist das erste neue; es bekommt danach den Fokus
  const aufklappen = () => {
    const kacheln = [...(liste.current?.children ?? [])] as HTMLElement[];
    const ab = kacheln.findIndex((k) => getComputedStyle(k).display === 'none');
    setAufgeklappt(true);
    if (ab < 0) return;
    setGewaehlt({ wahl: 'alle', vorher: stand.vorher, nach: ab });
    requestAnimationFrame(() => {
      const erstes = liste.current?.children[ab] as HTMLElement | undefined;
      erstes?.querySelector<HTMLElement>('a')?.focus();
    });
  };

  return (
    <div>
      {/* Bedienung: ohne JavaScript verborgen (die Knöpfe täten nichts), dann stehen alle Fotos; im Druck verborgen. Neben Satz,
          Knöpfen und Statuszeile tritt der Kopf des Leitfadens auf ihrer ganzen Höhe zurück (data-kopf-pause="ganz", bewegung.css
          „Leitfaden mit Abschnittsmarke“, wie die Filter-Insel des Blogs; UM-E4-CHOR-FIX); neben den Fotos steht er wieder */}
      <div data-kopf-pause="ganz" className="@container noscript:hidden print:hidden">
        {/* mittig unter dem mittigen Kopf des Belegs (K-016, E-047) */}
        <p id={satzId} className="mx-auto max-w-mass text-center font-text text-fs-3 text-pretty text-tinte">
          {satz}
        </p>
        <div role="group" aria-labelledby={satzId} className="mt-6 grid grid-cols-2 gap-2 @max-xs:grid-cols-1 md:grid-cols-3 xl:flex xl:flex-wrap xl:justify-center">
          {gruppen.map((g) => {
            const gedrueckt = g.id === stand.wahl;
            return (
              <button
                key={g.id}
                type="button"
                aria-pressed={gedrueckt}
                data-galerie-wahl={g.id}
                onClick={() => waehlen(g.id)}
                className={clsx(wahlKlassen, 'gap-2')}
              >
                {gedrueckt ? <Fugenkreuz className="size-3 shrink-0" /> : <Icon name={g.icon} groesse={4} />}
                {g.name}
              </button>
            );
          })}
        </div>
        <p role="status" className="mt-6 text-center font-text text-fs-2 text-tinte-2">
          {ansage(stand.wahl, anzahl(stand.wahl, fotos))}
        </p>
      </div>
      {/* 1 Spalte, ab 42 rem 2, ab 64 rem 3: je Foto groß statt gequetscht (K-016, E-047; große Systemschrift: eine Spalte) */}
      <div className="@container mt-6">
        <ul
          ref={liste}
          id={listeId}
          data-eingeklappt={eingeklappt || undefined}
          data-verband={stand.wahl === 'alle' || undefined}
          className="galerie-liste grid grid-cols-1 border-t border-l border-fuge @2xl:grid-cols-2 @5xl:grid-cols-3"
        >
          {fotos.map((f, i) => {
            const s = stufe[i];
            const neu = typeof s === 'number';
            return (
              <li
                key={f.bild}
                hidden={!istSichtbar(f.gruppe, stand.wahl)}
                data-motion="galerie-filter"
                data-galerie-gruppe={f.gruppe}
                data-galerie-mehr={mehrMarke(i)}
                data-galerie-neu={neu ? '' : undefined}
                style={neu ? ({ '--galerie-stufe': s } as CSSProperties) : undefined}
                className="border-r border-b border-fuge bg-kalk"
              >
                {f.knoten}
              </li>
            );
          })}
        </ul>
        {/* ohne JavaScript und im Druck stehen alle Fotos (globals.css), der Knopf entfällt dort */}
        {eingeklappt && (
          <div className="galerie-mehr-knopf mt-6 flex justify-center noscript:hidden print:hidden">
            <button type="button" aria-expanded={false} aria-controls={listeId} onClick={aufklappen} data-motion="druck" className={knopfKlassen('neben', 'px-6')}>
              Alle {fotos.length} Fotos zeigen
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
