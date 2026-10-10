'use client';

// Akkordeon auf <details>/<summary>-Grundlage (K-011, Register `aufklappen`): ohne JavaScript klappt der Browser
// selbst auf und zu, der Inhalt ist im Server-HTML (auch für die Seitensuche). Mit JavaScript animiert die Höhe
// über grid-template-rows (kern.css: auf dauer-2 · setzen, zu dauer-1 · weg; reduziert sofort).
// Invariante: data-offen steht immer am Inhalt, außer während einer Animation – so zeigt ein vom Browser geöffnetes
// <details> (Seitensuche, name-Gruppe, ohne Skript) seinen Inhalt stets vollständig.
import { useEffect, useRef, type MouseEvent, type ReactNode } from 'react';
import { ZeichenAufZu } from '@/components/kern/basis/Zeichen';
import { fokus, verbinde } from '@/components/kern/basis/klassen';

export function Akkordeon({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={verbinde('border-t border-k-fuge', className)}>{children}</div>;
}

export type AkkordeonEintragProps = {
  /** Frage bzw. Titel (Wortlaut unverändert aus dem Bestand) */
  titel: ReactNode;
  children: ReactNode;
  /** beim Laden offen */
  offen?: boolean;
  /** gleicher name = höchstens ein Eintrag offen (natives exklusives Akkordeon) */
  name?: string;
  /** Überschrift im summary, falls der Bestand dort eine trägt */
  ebene?: 'h2' | 'h3' | 'h4';
  groesse?: 'normal' | 'gross';
  id?: string;
  className?: string;
};

// Übergangsdauer in ms aus dem berechneten Stil (Tokens bleiben in kern.css; reduziert = 0).
function uebergangMs(el: Element): number {
  const stil = getComputedStyle(el);
  const zeit = (wert: string) => {
    const n = Number.parseFloat(wert);
    if (!Number.isFinite(n)) return 0;
    return wert.trim().endsWith('ms') ? n : n * 1000;
  };
  const dauern = stil.transitionDuration.split(',');
  const verzug = stil.transitionDelay.split(',');
  return Math.max(0, ...dauern.map((d, i) => zeit(d) + zeit(verzug[i % verzug.length] ?? '0s')));
}

export function AkkordeonEintrag({ titel, children, offen = false, name, ebene, groesse = 'normal', id, className }: AkkordeonEintragProps) {
  const details = useRef<HTMLDetailsElement>(null);
  const inhalt = useRef<HTMLDivElement>(null);
  const zeitgeber = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(zeitgeber.current), []);

  const umschalten = (e: MouseEvent<HTMLElement>) => {
    const d = details.current;
    const w = inhalt.current;
    if (!d || !w) return;
    e.preventDefault();
    window.clearTimeout(zeitgeber.current);

    if (d.open && !w.hasAttribute('data-offen')) {
      // Schließen läuft noch → wieder öffnen (der Übergang kehrt um)
      w.setAttribute('data-offen', '');
      return;
    }
    if (d.open) {
      w.removeAttribute('data-offen');
      const ms = uebergangMs(w);
      const fertig = () => {
        d.open = false;
        w.setAttribute('data-offen', '');
      };
      if (ms === 0) fertig();
      else zeitgeber.current = window.setTimeout(fertig, ms);
      return;
    }
    // Öffnen: erst zu (0fr) rendern, Stil festschreiben, dann offen (1fr) → Übergang läuft
    w.removeAttribute('data-offen');
    d.open = true;
    void getComputedStyle(w).gridTemplateRows;
    w.setAttribute('data-offen', '');
  };

  const Titel = ebene ?? 'span';
  return (
    <details ref={details} id={id} name={name} open={offen} className={verbinde('group border-b border-k-fuge', className)}>
      <summary
        onClick={umschalten}
        data-motion="zustand"
        className={verbinde(
          'flex min-h-k-7 cursor-pointer list-none items-start justify-between gap-k-4 py-k-4 k-text font-semibold text-k-tinte [&::-webkit-details-marker]:hidden',
          'decoration-1 underline-offset-4 decoration-k-strich pointer-fine:hover:underline',
          groesse === 'gross' ? 'text-k-4' : 'text-k-3',
          fokus('hell'),
        )}
      >
        <Titel className="min-w-0">{titel}</Titel>
        <span className="flex h-lh shrink-0 items-center">
          <ZeichenAufZu className="size-k-5" />
        </span>
      </summary>
      <div ref={inhalt} data-motion="aufklappen" data-offen="">
        <div>
          <div className="max-w-(--k-mass) pb-k-5 k-text text-k-3 text-k-tinte">{children}</div>
        </div>
      </div>
    </details>
  );
}

export default Akkordeon;
