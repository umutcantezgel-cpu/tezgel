// Ladeschwelle (KERN K-010, UM-E3-ZUST-M): Die Ladeanzeige erscheint erst, wenn das Laden länger als 300 ms dauert, und
// bleibt dann mindestens 500 ms stehen. Kurze Antworten zeigen nichts, lange flackern nicht. Die Logik ist ohne React
// testbar (Uhr injizierbar, test/ladeschwelle.test.mjs); useLadeschwelle bindet sie an einen Zustand.
import { useEffect, useRef, useState } from 'react';

export const LADE_VERZOEGERUNG_MS = 300;
export const LADE_MINDESTDAUER_MS = 500;

export interface Uhr {
  setTimeout(fn: () => void, ms: number): unknown;
  clearTimeout(id: unknown): void;
  jetzt(): number;
}

const SYSTEMUHR: Uhr = {
  setTimeout: (fn, ms) => globalThis.setTimeout(fn, ms),
  clearTimeout: (id) => globalThis.clearTimeout(id as ReturnType<typeof setTimeout>),
  jetzt: () => performance.now(),
};

export interface Ladeschwelle {
  /** Neuer Ladezustand; gleiche Werte nacheinander ändern nichts */
  setze(laedt: boolean): void;
  /** Laufende Uhr anhalten (beim Abbau der Komponente) */
  beende(): void;
  readonly sichtbar: boolean;
}

/** `melde(sichtbar)` wird nur bei einem Wechsel der Anzeige gerufen. */
export function erzeugeLadeschwelle(melde: (sichtbar: boolean) => void, uhr: Uhr = SYSTEMUHR): Ladeschwelle {
  let laedt = false;
  let sichtbar = false;
  let seit = 0;
  let auftrag: unknown = null;

  const halteAn = () => {
    if (auftrag !== null) uhr.clearTimeout(auftrag);
    auftrag = null;
  };
  const zeige = (wert: boolean) => {
    if (sichtbar === wert) return;
    sichtbar = wert;
    if (wert) seit = uhr.jetzt();
    melde(wert);
  };
  const spaeter = (ms: number, wert: boolean) => {
    auftrag = uhr.setTimeout(() => {
      auftrag = null;
      zeige(wert);
    }, ms);
  };

  return {
    setze(neu) {
      if (neu === laedt) return;
      laedt = neu;
      halteAn();
      if (laedt) {
        // Steht die Anzeige noch aus der Haltezeit, bleibt sie einfach stehen (kein Flackern)
        if (!sichtbar) spaeter(LADE_VERZOEGERUNG_MS, true);
        return;
      }
      if (!sichtbar) return;
      const rest = LADE_MINDESTDAUER_MS - (uhr.jetzt() - seit);
      if (rest <= 0) zeige(false);
      else spaeter(rest, false);
    },
    beende: halteAn,
    get sichtbar() {
      return sichtbar;
    },
  };
}

/** Ob die Ladeanzeige gerade zu sehen sein soll (nach der Ladeschwelle). */
export function useLadeschwelle(laedt: boolean): boolean {
  const [sichtbar, setSichtbar] = useState(false);
  const schwelle = useRef<Ladeschwelle | null>(null);
  useEffect(() => {
    const s = erzeugeLadeschwelle(setSichtbar);
    schwelle.current = s;
    return () => {
      s.beende();
      schwelle.current = null;
    };
  }, []);
  useEffect(() => {
    schwelle.current?.setze(laedt);
  }, [laedt]);
  return sichtbar;
}
