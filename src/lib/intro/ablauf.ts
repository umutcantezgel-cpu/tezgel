// Eingang ohne Vorhang (E-067-4, KERN K-007 „An der Schnur“, UM-E3-EIN): ersetzt das Intro B-02 „Der erste Boden“
// (Kalkblatt) und den Belag des Startbilds. Nichts deckt den ersten Bildschirm ab; das Foto (LCP) ist ab dem ersten Bild
// sichtbar. Der Ablauf ist reines CSS ab dem ersten Bild (bewegung.css, Abschnitt „eingang“, Takt nur aus Tokens); das
// Kopfskript (lib/motion/kopfskript.ts) setzt nur Klassen an html und nimmt sie bei jeder Eingabe und spätestens an der
// Grenze wieder weg. Hier stehen die Namen und Grenzen, die Kopfskript, CSS und Tests teilen. Reine Werte ohne DOM.

/** Merker „Eingang in diesem Besuch schon gesehen“ (sessionStorage, gilt je Tab-Sitzung). */
export const SPEICHER_EINGANG = 'tezgel-eingang';
/** v3-Name (Intro B-02, damals localStorage `tezgel-intro`): seit E-067-4 derselbe Merker, bleibt für ältere Verweise. */
export const SPEICHER_INTRO = SPEICHER_EINGANG;

/** Zeitlimit in ms ab dem Kopfskript: danach gilt sofort der Endzustand (E-067-4). */
export const EINGANG_GRENZE = 2000;
/** Obergrenze des ganzen Ablaufs in ms (Logo, Zeilen, Ort, Knopfzeile, Fugenriss; K-007). test/intro.test.mjs rechnet den
 *  Takt aus bewegung.css und globals.css dagegen. */
export const EINGANG_HOECHSTENS = 1500;

/** Klassen an html: der Eingang läuft (nur zusammen mit k-bewegung) · Wiederkehr im selben Besuch (nur Zeilenmasken). */
export const KLASSE_EINGANG = 'k-eingang';
export const KLASSE_WIEDERKEHR = 'k-wiederkehr';

/** Eingaben, die den Eingang sofort beenden (Lauscher passiv, once, capture). */
export const EINGANG_ABBRUCH = ['pointerdown', 'keydown', 'wheel', 'touchstart', 'scroll'] as const;

/** Logo-Datei (UNANTASTBAR, dieselbe wie im Kopf). */
const LOGO_DATEI = '/images/logo/tezgel-logo.webp';
/** Das Logo über den Bildoptimierer in 640 px, feste Adresse (640 und 75 sind in Next Standard). B-01 legt es auf die Wand
 *  (Verlegen.tsx, eingefroren nach E-078, lädt es selbst im Leerlauf); bis E-067-4 holte das Kopfskript dieselbe Adresse
 *  für das Intro vorab. Name und Wert bleiben, weil B-01 sie von hier liest. */
export const INTRO_LOGO = `/_next/image?url=${encodeURIComponent(LOGO_DATEI)}&w=640&q=75`;
