'use client';

// Regler des großen Moments vorher-nachher (KERN v3 K-007, E3-GRAF-07): Zeiger und Tastatur, direkt. Schreibt --teilung
// (0 bis 100) an die Bühne .vn-buehne; React rendert dabei nichts neu. Tastatur und Screenreader nutzen ein natives
// Schiebefeld (unsichtbar, Fokusrahmen am Griff über bewegung.css). Maus setzt beim Drücken, Finger erst nach 8 px
// waagrecht oder beim Antippen, damit Scrollen über dem Bild das Lot nicht verschiebt (Scrollen und Zoomen bleiben
// erlaubt). Auf dem Server und vor dem Hydrieren rendert der Regler nichts: ohne JavaScript gibt es keinen toten Griff.
import { useRef, useSyncExternalStore, type PointerEvent as ZeigerEreignis } from 'react';
import Icon from '@/components/icons/Icon';
import { START, begrenze, schrittFuerTaste, wertAusZeiger, wertText } from './teilung';

const SCHWELLE_FINGER = 8;

const abonniereNichts = () => () => {};
function useImBrowser(): boolean {
  return useSyncExternalStore(abonniereNichts, () => true, () => false);
}

interface Zug {
  id: number;
  x: number;
  gezogen: boolean;
}

export default function Regler({ titelId, hinweisId }: { titelId: string; hinweisId: string }) {
  const imBrowser = useImBrowser();
  const feld = useRef<HTMLInputElement>(null);
  const zug = useRef<Zug | null>(null);
  if (!imBrowser) return null;

  const setze = (wert: number) => {
    const el = feld.current;
    if (!el) return;
    const v = begrenze(wert);
    el.value = String(v);
    el.setAttribute('aria-valuetext', wertText(v));
    el.closest<HTMLElement>('.vn-buehne')?.style.setProperty('--teilung', String(v));
  };
  const vonZeiger = (e: ZeigerEreignis<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setze(wertAusZeiger(e.clientX, r.left, r.width));
  };

  return (
    <>
      <div
        aria-hidden="true"
        className="vn-zone absolute inset-0 z-10 cursor-ew-resize touch-pan-y touch-pinch-zoom select-none"
        onPointerDown={(e) => {
          if (!e.isPrimary || e.button !== 0) return;
          e.currentTarget.setPointerCapture(e.pointerId);
          zug.current = { id: e.pointerId, x: e.clientX, gezogen: e.pointerType === 'mouse' };
          if (e.pointerType === 'mouse') vonZeiger(e);
        }}
        onPointerMove={(e) => {
          const z = zug.current;
          if (!z || z.id !== e.pointerId) return;
          if (!z.gezogen && Math.abs(e.clientX - z.x) >= SCHWELLE_FINGER) z.gezogen = true;
          if (z.gezogen) vonZeiger(e);
        }}
        onPointerUp={(e) => {
          if (zug.current?.id !== e.pointerId) return;
          vonZeiger(e);
          zug.current = null;
        }}
        onPointerCancel={() => {
          zug.current = null;
        }}
      />
      <div aria-hidden="true" className="vn-teiler pointer-events-none absolute inset-0 z-10">
        <span className="vn-griff absolute top-1/2 left-0 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-tinte bg-fliese text-tinte">
          <Icon name="pfeil-links" groesse={4} />
          <Icon name="pfeil-rechts" groesse={4} />
        </span>
      </div>
      <input
        ref={feld}
        type="range"
        min={0}
        max={100}
        step={1}
        defaultValue={START}
        aria-labelledby={titelId}
        aria-describedby={hinweisId}
        aria-valuetext={wertText(START)}
        className="vn-regler sr-only"
        onChange={(e) => setze(Number(e.currentTarget.value))}
        onKeyDown={(e) => {
          const schritt = schrittFuerTaste(e.key);
          if (schritt === 0) return;
          e.preventDefault();
          setze(Number(e.currentTarget.value) + schritt);
        }}
      />
    </>
  );
}
