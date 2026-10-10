// Bewegungsregister (KERN K-007) – Maschinenfassung für Auslöser und Schwellen.
// Jedes animierte Element trägt data-motion="<Kennung>"; Startzustände hängen nur an html.k-bewegung.

export type Ausloeser = 'laden' | 'sicht' | 'scroll' | 'interaktion';

export interface Registereintrag {
  ausloeser: Ausloeser;
  /** Sichtbarkeitsschwelle (0–1) für Auslöser „sicht“ */
  schwelle?: number;
  /** nur auf groben Zeigegeräten über Sichtbarkeit auslösen (sonst Hover/Fokus) */
  nurGrob?: boolean;
}

export const REGISTER: Record<string, Registereintrag> = {
  'sig-kreuzlinie': { ausloeser: 'laden' },
  'sig-flucht': { ausloeser: 'laden' },
  'szene-ablauf': { ausloeser: 'scroll' },
  'sig-plan': { ausloeser: 'sicht', schwelle: 0.4, nurGrob: true },
  einzugsband: { ausloeser: 'sicht', schwelle: 0.3 },
  verband: { ausloeser: 'interaktion' },
  fugenband: { ausloeser: 'scroll' },
  leitachse: { ausloeser: 'scroll' },
  anriss: { ausloeser: 'sicht', schwelle: 0.5 },
  auftritt: { ausloeser: 'sicht', schwelle: 0.2 },
  aufklappen: { ausloeser: 'interaktion' },
  druck: { ausloeser: 'interaktion' },
  zustand: { ausloeser: 'interaktion' },
  notiert: { ausloeser: 'interaktion' },
  laden: { ausloeser: 'interaktion' },
  seitenwechsel: { ausloeser: 'interaktion' },
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

/** Kennungen, die beim Laden sofort in den Endzustand wechseln. */
export function ladeKennungen(): string[] {
  return KENNUNGEN.filter((k) => REGISTER[k].ausloeser === 'laden');
}

export function schwelleFuer(kennung: string): number {
  return REGISTER[kennung]?.schwelle ?? 0.2;
}

export function istRegistriert(kennung: string): boolean {
  return Object.prototype.hasOwnProperty.call(REGISTER, kennung);
}
