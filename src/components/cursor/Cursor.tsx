'use client';

// Fugenkreuz-Cursor (KERN K-007 „Cursor-Charakter“, Regeln v4; UM-E3-CURSOR): Diese Insel lädt das Modul
// src/lib/motion/cursor.ts erst bei der ersten Mausbewegung nach der Hydrierung und nur bei feinem Zeiger mit Hover
// (Z-10: kein Cursor-Skript im ersten Laden; Finger, Stift und reine Tastatur laden nichts). Sie rendert nichts; das Schild
// legt das Modul selbst am Ende von body an. Ein Seitenwechsel blendet es aus, bis sich der Zeiger wieder bewegt. Schlägt
// das Nachladen fehl, bleibt es beim Systemzeiger.
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { zeigerFein } from '@/lib/motion/schalter';
import type { CursorSteuerung } from '@/lib/motion/cursor';

export default function Cursor() {
  const pfad = usePathname();
  const steuerung = useRef<CursorSteuerung | null>(null);

  useEffect(() => {
    // Finger und Stift als Hauptzeiger (kein feiner Zeiger mit Hover): kein Lauscher, kein Modul
    if (!zeigerFein()) return;
    let vorbei = false;
    let laufend: CursorSteuerung | null = null;
    const los = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      window.removeEventListener('pointermove', los);
      const start = { x: e.clientX, y: e.clientY, ziel: e.target };
      import('@/lib/motion/cursor').then(
        ({ starteCursor }) => {
          if (vorbei) return;
          laufend = starteCursor(start);
          steuerung.current = laufend;
        },
        () => {},
      );
    };
    window.addEventListener('pointermove', los, { passive: true });
    return () => {
      vorbei = true;
      window.removeEventListener('pointermove', los);
      laufend?.stopp();
      steuerung.current = null;
    };
  }, []);

  useEffect(() => {
    steuerung.current?.seite();
  }, [pfad]);

  return null;
}
