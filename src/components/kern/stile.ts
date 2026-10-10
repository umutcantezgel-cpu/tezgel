// Gemeinsame Klassenbausteine des KERN (K-005, K-009) – für neue Bausteine und für bestehendes Markup,
// das seine IDs, Labels und Rollen behalten muss (Funnels, Formulare). Nur Tokens, keine freien Werte.
import clsx from 'clsx';

export type KnopfVariante = 'haupt' | 'neben' | 'text' | 'hell';

const KNOPF_BASIS =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-none px-6 py-3 font-text text-fs-2 font-semibold no-underline transition-colors dauer-1 ease-setzen motion-safe:active:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50';

const KNOPF: Record<KnopfVariante, string> = {
  haupt: 'border border-tinte bg-tinte text-kalk hover:border-tinte-2 hover:bg-tinte-2',
  neben: 'border border-strich bg-fliese text-tinte hover:border-tinte',
  hell: 'border border-kalk bg-kalk text-tinte hover:border-fliese hover:bg-fliese',
  text: 'min-h-11 px-0 text-tinte underline decoration-strich underline-offset-4 hover:decoration-tinte',
};

export function knopfKlassen(variante: KnopfVariante = 'haupt', className?: string) {
  return clsx(variante === 'text' ? 'inline-flex items-center gap-2 font-semibold transition-colors dauer-1 ease-setzen' : KNOPF_BASIS, KNOPF[variante], className);
}

/** Beschriftung über dem Feld */
export const labelKlassen = 'block font-text text-fs-2 font-semibold text-tinte';
/** Pflichtmarke hinter dem Label (Text „Pflichtfeld“ für Screenreader ergänzen) */
export const pflichtKlassen = 'ml-1 font-mono text-fs-1 text-laser-tief';
/** Eingabe, Auswahl, Textbereich */
export const feldKlassen =
  'mt-2 block w-full min-h-11 rounded-r1 border border-strich bg-fliese px-4 py-3 font-text text-fs-3 text-tinte placeholder:text-tinte-2 transition-colors dauer-1 ease-setzen hover:border-tinte focus-visible:border-tinte aria-[invalid=true]:border-laser-tief disabled:opacity-50';
/** Hilfetext unter dem Feld */
export const hilfeKlassen = 'mt-2 font-text text-fs-2 text-tinte-2';
/** Fehlertext (mit Fehler-Icon und role="alert") */
export const fehlerKlassen = 'mt-2 flex items-start gap-2 font-text text-fs-2 text-laser-tief';
/** Auswahlknopf in Gruppen (aria-pressed bzw. Radio) */
export const wahlKlassen =
  'inline-flex min-h-11 items-center justify-center rounded-none border border-strich bg-fliese px-4 py-3 text-center font-text text-fs-2 text-tinte transition-colors dauer-1 ease-setzen hover:border-tinte aria-pressed:border-tinte aria-pressed:bg-tinte aria-pressed:text-kalk aria-checked:border-tinte aria-checked:bg-tinte aria-checked:text-kalk';
/** Kontrollkästchen */
export const kontrollKlassen = 'mt-1 size-5 shrink-0 rounded-r1 border border-strich accent-tinte';
/** Mono-Etikett (vormals Badge) */
export const etikettKlassen = 'inline-flex items-center gap-2 font-mono text-fs-1 text-tinte-2';
/** Textlink im Fließtext */
export const linkKlassen = 'text-tinte underline decoration-strich underline-offset-4 transition-colors dauer-1 ease-setzen hover:decoration-tinte';
/** Seitenrand und Satzspiegel */
export const seitenKlassen = 'mx-auto w-full max-w-seite px-4 md:px-8 lg:px-12';
