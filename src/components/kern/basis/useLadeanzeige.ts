// Hook für Client-Komponenten (ohne 'use client', damit die Konstanten auch auf dem Server Zahlen bleiben).
import { useEffect, useRef, useState } from 'react';

// AUFTRAG Mikrointeraktionen, K-009 Register `laden`: Ladeanzeige erst nach 300 ms, dann mindestens 500 ms sichtbar.
// Kurze Anfragen blitzen so nicht auf; lange zeigen ihren Zustand ohne Flackern am Ende.
export const LADE_VERZUG_MS = 300;
export const LADE_MINDEST_MS = 500;

/**
 * Liefert, ob die Ladeanzeige sichtbar sein soll.
 * @param aktiv true, solange gesendet wird (z. B. status === 'submitting')
 */
export function useLadeanzeige(aktiv: boolean, verzug: number = LADE_VERZUG_MS, mindest: number = LADE_MINDEST_MS): boolean {
  const [sichtbar, setSichtbar] = useState(false);
  const seit = useRef(0);

  useEffect(() => {
    if (aktiv) {
      if (sichtbar) return undefined;
      const t = window.setTimeout(() => {
        seit.current = Date.now();
        setSichtbar(true);
      }, verzug);
      return () => window.clearTimeout(t);
    }
    if (!sichtbar) return undefined;
    const rest = Math.max(0, mindest - (Date.now() - seit.current));
    const t = window.setTimeout(() => setSichtbar(false), rest);
    return () => window.clearTimeout(t);
  }, [aktiv, sichtbar, verzug, mindest]);

  return sichtbar;
}
