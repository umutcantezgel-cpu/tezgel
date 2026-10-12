// Klassen des Bad-Projektchecks (E-011, E3-Vorlauf; KERN v2 nach Q-02/E-038): aus kern/stile.ts abgeleitet, keine freien Werte.
import { feldKlassen, wahlKlassen } from '@/components/kern/stile';

export const inputClass = feldKlassen;

/** Schrittnummer im Kopf jeder Angabe (Mono auf Tinte, wie die Phasen des Preisrechners); steht im Label bzw. in der Legende */
export const nummerClass = 'mr-1 inline-flex size-6 items-center justify-center bg-tinte align-middle font-mono text-fs-1 font-normal text-kalk';

/** Einfachauswahl der Schritte 2 und 3 (aria-pressed): wahlKlassen; min-w-0, damit lange Wörter bei 200 % Zoom in der Spalte
 *  umbrechen, statt über die Knopfkante zu ragen (F-05, Gutachten u5 Stolperstein Zoom) */
export const einfachClass = `${wahlKlassen} min-w-0`;

/** Mehrfachauswahl der Extras (aria-pressed): Ankreuzmarke wie „Rahmenbedingungen“ im Preisrechner, gewählt = Rahmen Tinte */
export const extraClass =
    'flex min-h-11 w-full min-w-0 items-center gap-3 border border-strich bg-fliese px-4 py-3 text-left font-text text-fs-2 font-semibold text-tinte hover:border-tinte aria-pressed:border-tinte';

/** Ankreuzmarke einer Extra-Auswahl: gewählt Tinte-Fläche mit Haken, sonst Strich-Rahmen */
export const markeClass = (gewaehlt) =>
    `inline-flex size-5 shrink-0 items-center justify-center border ${gewaehlt ? 'border-tinte bg-tinte text-kalk' : 'border-strich bg-fliese'}`;

/** Sichtbare Pflichtmarke hinter dem Label (aria-hidden; der zugängliche Name bleibt das Label): Tinte-2 wie im Vorbild,
 *  nicht Laser – je Bildschirm höchstens ein rotes Element (F-05, Gutachten u5 Rezept 2) */
export const pflichtClass = 'ml-1 font-mono text-fs-1 text-tinte-2';

/** Geschütztes Leerzeichen (vor „m²“ und in „DIN 18040-2“): Zahl und Einheit brechen nie auseinander */
export const NBSP = ' ';
