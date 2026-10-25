'use client';
// Galerie „Unsere Arbeiten“ · Auswahl (KERN v3.4 K-007 `galerie-filter`, E3-GRAF-08): Insel mit Zustand. Knöpfe mit
// aria-pressed wie der Themenfilter der Bewertungen (wahlKlassen; genau ein Zeichen: gedrückt das Fugenkreuz, sonst das
// Raumzeichen), darunter die Statuszeile (role="status") und die Fotos als verlegte Fläche. Die Fotos kommen fertig vom
// Server (Bildfeld als Knoten); die Insel setzt nur hidden und die Marke data-galerie-neu mit der Staffelstufe. Neue Fotos
// blenden in dauer-2 ein, Stück für Stück (CSS in bewegung.css), wegfallende gehen sofort. Ohne JavaScript stehen alle
// Fotos; Satz, Knöpfe und Statuszeile sind dann verborgen (noscript:hidden). Rand je Foto statt Fugen-Hintergrund: Nach dem
// Filtern stehen keine grauen Restfelder, die Fläche endet wie ein Boden mitten im Verlegen.
import { useId, useState, type CSSProperties, type ReactNode } from 'react';
import clsx from 'clsx';
import Icon from '@/components/icons/Icon';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import { wahlKlassen } from '@/components/kern/stile';
import type { ArbeitId } from '@/config/arbeiten';
import { GRUPPEN, ansage, anzahl, istSichtbar, stufen, type GruppeId, type Wahl } from './daten';

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
}

export default function GalerieWahl({ fotos, satz }: { fotos: GalerieWahlFoto[]; satz: string }) {
  const satzId = useId();
  const [stand, setStand] = useState<Stand>({ wahl: 'alle', vorher: null });
  const waehlen = (wahl: Wahl) => setStand((s) => (s.wahl === wahl ? s : { wahl, vorher: s.wahl }));
  const gruppen = GRUPPEN.filter((g) => anzahl(g.id, fotos) > 0);
  const stufe = stufen(fotos, stand.wahl, stand.vorher);

  return (
    <div>
      {/* Bedienung: ohne JavaScript verborgen (die Knöpfe täten nichts), dann stehen alle Fotos */}
      <div className="noscript:hidden">
        {/* mittig unter dem mittigen Kopf des Belegs (K-016, E-047) */}
        <p id={satzId} className="mx-auto max-w-mass text-center font-text text-fs-3 text-pretty text-tinte">
          {satz}
        </p>
        <div role="group" aria-labelledby={satzId} className="mt-6 flex flex-wrap justify-center gap-2">
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
        <p role="status" className="mt-6 font-text text-fs-2 text-tinte-2">
          {ansage(stand.wahl, anzahl(stand.wahl, fotos))}
        </p>
      </div>
      {/* 1 Spalte, ab 20 rem 2, ab 64 rem 3 (wie teile/Fotos; große Systemschrift: eine Spalte) */}
      <div className="@container mt-6">
        <ul className="grid grid-cols-1 border-t border-l border-fuge @xs:grid-cols-2 @5xl:grid-cols-3">
          {fotos.map((f, i) => {
            const s = stufe[i];
            const neu = typeof s === 'number';
            return (
              <li
                key={f.bild}
                hidden={!istSichtbar(f.gruppe, stand.wahl)}
                data-motion="galerie-filter"
                data-galerie-gruppe={f.gruppe}
                data-galerie-neu={neu ? '' : undefined}
                style={neu ? ({ '--galerie-stufe': s } as CSSProperties) : undefined}
                className="border-r border-b border-fuge bg-kalk"
              >
                {f.knoten}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
