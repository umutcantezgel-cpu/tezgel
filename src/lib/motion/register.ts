// Bewegungsregister (KERN v3 K-007) – Maschinenfassung für Auslöser und Schwellen.
// Jedes animierte Element trägt data-motion="<Kennung>"; Startzustände hängen nur an html.k-bewegung.
// Die SVG-Bewegungen aus v2 (Kreuzlinie, Flucht, Plan, Einzugsband, Szene Ablauf, Fugenband) sind seit E-037 fester Teil des
// Systems (Entscheidung des Auftraggebers; vorher als entfallend markiert, E-009). `entfaellt` bleibt als Feld für künftige
// Abbauten. B-01 „verlegen“ (seit E-043 Fliese für Fliese) steuert seine Schicht selbst (WAAPI), B-02 „intro“ läuft als CSS
// ab dem ersten Bild; beide ohne data-motion im Inhalt. Das Startbild legt sich seit E-037 beim Eintritt frei (Sicht 0,4).

export type Ausloeser = 'laden' | 'sicht' | 'scroll' | 'interaktion';

export interface Registereintrag {
  ausloeser: Ausloeser;
  /** Sichtbarkeitsschwelle (0–1) für Auslöser „sicht“ */
  schwelle?: number;
  /** nur auf groben Zeigegeräten über Sichtbarkeit auslösen (sonst Hover/Fokus) */
  nurGrob?: boolean;
  /** v2-Eintrag, der in KERN v3 entfällt; bleibt registriert, bis keine Seite ihn mehr nutzt */
  entfaellt?: boolean;
}

export const REGISTER: Record<string, Registereintrag> = {
  // v3 (K-007): Seitenwechsel, Intro, Startbild; Plan-Morph zurück nach E-037 (View Transition beim Klick, Typ plan-vor)
  verlegen: { ausloeser: 'interaktion' },
  seitenwechsel: { ausloeser: 'interaktion' },
  intro: { ausloeser: 'laden' },
  startbild: { ausloeser: 'sicht', schwelle: 0.4 },
  // aus v2, bleiben
  verband: { ausloeser: 'interaktion' },
  leitachse: { ausloeser: 'scroll' },
  anriss: { ausloeser: 'sicht', schwelle: 0.5 },
  auftritt: { ausloeser: 'sicht', schwelle: 0.2 },
  aufklappen: { ausloeser: 'interaktion' },
  druck: { ausloeser: 'interaktion' },
  zustand: { ausloeser: 'interaktion' },
  notiert: { ausloeser: 'interaktion' },
  laden: { ausloeser: 'interaktion' },
  // aus v2, fester Teil des Systems seit E-037 (vorher E-009 entfallend)
  'sig-kreuzlinie': { ausloeser: 'laden' },
  'sig-flucht': { ausloeser: 'laden' },
  'szene-ablauf': { ausloeser: 'scroll' },
  'sig-plan': { ausloeser: 'sicht', schwelle: 0.4, nurGrob: true },
  // E4-NACH-02: legt sich beim Laden per CSS frei (Planblatt des Einstiegs), kein Beobachter
  einzugsband: { ausloeser: 'laden' },
  fugenband: { ausloeser: 'scroll' },
  // große Momente (KERN v3.4 K-007, E3-ORCH-02a; E3-GRAF-01 bis 09): Szenen scroll-gebunden per CSS, Sicht 0,4 über das
  // Modul (data-motion-stand), Regler und Auswahl ohne Beobachter; verband steht oben
  schichten: { ausloeser: 'scroll' },
  weg: { ausloeser: 'scroll' },
  'gefaelle-dusche': { ausloeser: 'sicht', schwelle: 0.4 },
  'gefaelle-balkon': { ausloeser: 'sicht', schwelle: 0.4 },
  formatregler: { ausloeser: 'interaktion' },
  'vorher-nachher': { ausloeser: 'interaktion' },
  karte: { ausloeser: 'sicht', schwelle: 0.4 },
  'galerie-filter': { ausloeser: 'interaktion' },
};

export const KENNUNGEN = Object.keys(REGISTER);

/** Kennungen, die das Modul per IntersectionObserver auslöst (abhängig vom Zeigegerät). */
export function beobachteteKennungen(grobesZeigegeraet: boolean): string[] {
  return KENNUNGEN.filter((k) => {
    const e = REGISTER[k];
    if (e.ausloeser !== 'sicht') return false;
    return e.nurGrob ? grobesZeigegeraet : true;
  });
}

/** Kennungen, die beim Laden sofort in den Endzustand wechseln (data-motion im Inhalt; verlegen und intro steuern sich selbst). */
export function ladeKennungen(): string[] {
  return KENNUNGEN.filter((k) => REGISTER[k].ausloeser === 'laden' && !SELBST.includes(k));
}

/** Kennungen mit eigener Steuerung (Komponente mit WAAPI bzw. CSS ab dem ersten Bild), nicht über data-motion und Beobachter. */
export const SELBST = ['verlegen', 'intro', 'seitenwechsel'];

/** v2-Einträge, die in KERN v3 entfallen (E-009). */
export function entfallendeKennungen(): string[] {
  return KENNUNGEN.filter((k) => REGISTER[k].entfaellt === true);
}

export function schwelleFuer(kennung: string): number {
  return REGISTER[kennung]?.schwelle ?? 0.2;
}

export function istRegistriert(kennung: string): boolean {
  return Object.prototype.hasOwnProperty.call(REGISTER, kennung);
}
