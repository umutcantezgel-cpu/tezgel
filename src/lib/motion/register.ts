// Bewegungsregister (KERN v3 K-007) – Maschinenfassung für Auslöser und Schwellen.
// Jedes animierte Element trägt data-motion="<Kennung>"; Startzustände hängen nur an html.k-bewegung.
// Einträge mit `entfaellt` stammen aus v2 und verschwinden mit dem Neubau ihrer Seiten (E-009, Abbau in E5-ORCH-03b).
// B-01 „verlegen“ steuert seine Schicht selbst (WAAPI), B-02 „intro“ läuft als CSS ab dem ersten Bild; beide ohne data-motion im Inhalt.

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
  // v3 (K-007): Seitenwechsel, Intro, Startbild
  verlegen: { ausloeser: 'interaktion' },
  intro: { ausloeser: 'laden' },
  startbild: { ausloeser: 'laden' },
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
  // aus v2, entfallen in v3 (E-009)
  'sig-kreuzlinie': { ausloeser: 'laden', entfaellt: true },
  'sig-flucht': { ausloeser: 'laden', entfaellt: true },
  'szene-ablauf': { ausloeser: 'scroll', entfaellt: true },
  'sig-plan': { ausloeser: 'sicht', schwelle: 0.4, nurGrob: true, entfaellt: true },
  // E4-NACH-02: legt sich beim Laden per CSS frei (Planblatt des Einstiegs), kein Beobachter
  einzugsband: { ausloeser: 'laden', entfaellt: true },
  fugenband: { ausloeser: 'scroll', entfaellt: true },
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

/** Kennungen, die beim Laden sofort in den Endzustand wechseln (data-motion im Inhalt; intro und startbild steuern sich selbst). */
export function ladeKennungen(): string[] {
  return KENNUNGEN.filter((k) => REGISTER[k].ausloeser === 'laden' && !SELBST.includes(k));
}

/** Kennungen mit eigener Steuerung (Komponente mit WAAPI), nicht über data-motion und Beobachter. */
export const SELBST = ['verlegen', 'intro', 'startbild'];

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
