// Schwelle der langen Einleitung (UM-E4-SICHT-FIX M-B1 Nr. 3): Über EINLEITUNG_LANG Zeichen Klartext steht die Einleitung eines
// Abschnitts linksbündig statt mittig (`einleitungLang` in kern/Abschnitt). Eigenes Modul, damit Abschnitt die Textmarken und
// das Glossar nicht importiert: Abschnitt liegt auch in Client-Bündeln (Seiten mit "use client", z. B. /termin, /faq), die
// Schwelle rechnen nur die Bausteine der Vorlagen (Serverkomponenten) aus (Prüfung SF-B2).
import { klartext } from '@/lib/textmarken';

/** Ab dieser Zeichenzahl (Klartext) steht eine Einleitung linksbündig (M-B1 Nr. 3), dieselbe Schwelle wie der Vorspann im
 *  Einstieg (VORSPANN_LANG, M-A3 Nr. 4: mobil rund drei Zeilen) */
export const EINLEITUNG_LANG = 90;

/** Trägt der Text (mit Textmarken) mehr als EINLEITUNG_LANG Zeichen Klartext? */
export const langeEinleitung = (text?: string) => Boolean(text && klartext(text).length > EINLEITUNG_LANG);
