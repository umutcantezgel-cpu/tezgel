// Bewegungsschalter und Zeigerart (KERN v4, UM-E3-MOD, E-080): die eine Stelle, die reduzierte Bewegung, die Wahl
// „Bewegung: an/ruhig“ und die Zeigerart liest. Ist „ruhig“ gewählt, setzt das Kopfskript vor dem ersten Rendern
// html[data-bewegung="ruhig"] und keine Startklasse html.k-bewegung. Damit gilt „ruhig“ wie prefers-reduced-motion: reduce:
// Startzustände, Karussell-Selbstlauf und der ruhige Weg von B-01 (Überblendung 150 ms, E-078) hängen ohnehin an
// html.k-bewegung; die Regeln, die nur an der Medienabfrage hängen, spiegelt bewegung.css (Block „Bewegungsschalter“).
// Die Wahl gilt je Gerät (localStorage). Wünscht das Gerät reduzierte Bewegung, geht das vor, und „an“ ist nicht wählbar:
// Die CSS-Regeln der Bewegung hängen an der Medienabfrage, ein „an“ bliebe halb wirkungslos (E-080).
// Beim Laden greift das Modul nicht auf window zu: kopfskript.ts liest die Namen auf dem Server.

export const BEWEGUNG_SPEICHER = 'tezgel-bewegung';
export const BEWEGUNG_ATTRIBUT = 'data-bewegung';
/** Ereignis am window nach jeder Wahl; der Schalter und Bausteine mit Selbstlauf (Karussell) hören darauf. */
export const BEWEGUNG_WECHSEL = 'k-bewegung-wechsel';

const MEDIUM_REDUZIERT = '(prefers-reduced-motion: reduce)';
const MEDIUM_FEIN = '(hover: hover) and (pointer: fine)';
const MEDIUM_GROB = '(hover: none), (pointer: coarse)';

export type Bewegungswahl = 'an' | 'ruhig';

/** Ruhig, wenn das Gerät reduzierte Bewegung wünscht (geht vor) oder „ruhig“ gewählt ist; jeder andere Eintrag zählt nicht. */
export function ruhigNach(gespeichert: string | null, systemReduziert: boolean): boolean {
  return systemReduziert || gespeichert === 'ruhig';
}

function medium(abfrage: string): boolean {
  return typeof window !== 'undefined' && typeof window.matchMedia === 'function' && window.matchMedia(abfrage).matches;
}

/** Das Gerät wünscht reduzierte Bewegung. */
export function systemRuhig(): boolean {
  return medium(MEDIUM_REDUZIERT);
}

/** Feiner Zeiger mit Hover (Maus, Trackpad): Cursor und Hover-Momente. */
export function zeigerFein(): boolean {
  return medium(MEDIUM_FEIN);
}

/** Grober Zeiger oder kein Hover (Finger, Stift): Momente, die sonst der Zeiger auslöst, starten über die Sichtbarkeit. */
export function zeigerGrob(): boolean {
  return medium(MEDIUM_GROB);
}

export function leseWahl(): Bewegungswahl | null {
  try {
    const wahl = window.localStorage.getItem(BEWEGUNG_SPEICHER);
    return wahl === 'an' || wahl === 'ruhig' ? wahl : null;
  } catch {
    return null;
  }
}

export function speichereWahl(wahl: Bewegungswahl): void {
  try {
    window.localStorage.setItem(BEWEGUNG_SPEICHER, wahl);
  } catch {
    // ohne Speicher gilt die Wahl bis zum nächsten Laden
  }
}

/** Gilt gerade die ruhige Fassung (Gerät oder Wahl)? */
export function bewegungRuhig(): boolean {
  return ruhigNach(document.documentElement.getAttribute(BEWEGUNG_ATTRIBUT), systemRuhig());
}

export function meldeWechsel(): void {
  window.dispatchEvent(new Event(BEWEGUNG_WECHSEL));
}

/** Meldet jede Wahl und jede Änderung der Systemeinstellung; gibt die Abmeldung zurück. */
export function abonniereBewegung(melden: () => void): () => void {
  window.addEventListener(BEWEGUNG_WECHSEL, melden);
  const reduziert = typeof window.matchMedia === 'function' ? window.matchMedia(MEDIUM_REDUZIERT) : null;
  reduziert?.addEventListener?.('change', melden);
  return () => {
    window.removeEventListener(BEWEGUNG_WECHSEL, melden);
    reduziert?.removeEventListener?.('change', melden);
  };
}
