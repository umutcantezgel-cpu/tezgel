// Kopf Variante A „Schriftfeld“ (P3-06a): Wortlaute, IDs und Kopfhöhe an einer Stelle.
// Ohne Importe, damit die Client-Teile sie laden können, ohne die Navigationsdaten mitzuschleppen.
// Zugängliche Namen wörtlich wie im Bestand (Header.jsx, MobileMenu.jsx); Abweichungen stehen als Vorschlag in
// `_relaunch/pakete/P3-06a.rueckgabe.md` (Format MIKROTEXTE.md): Hauptknopf (K-012) und Menü-Schalter.

/**
 * Kopfhöhe (K-007): 64 px (`--spacing-k-8`) in jeder Breite, fest, ohne Schrumpfen beim Scrollen (CLS 0).
 * Der Kopf setzt `--k-kopf-hoehe` an seinem eigenen Element (Mega-Menü und Mobilblatt erben sie, auch in der Top-Layer).
 * Für `scroll-padding-top` braucht `kern-global.css` denselben Wert global auf `:root` (OFFENE FRAGE an den Orchestrator):
 *   :root { --k-kopf-hoehe: var(--spacing-k-8); }  html { scroll-padding-top: calc(var(--k-kopf-hoehe) + var(--spacing-k-4)); }
 */
export const KOPF_HOEHE = 'var(--spacing-k-8)';

/** Höchsthöhe eines Planblatts (Mega-Menü): Rest der Ansicht unter dem Kopf; längere Blätter scrollen in sich. */
export const KOPF_REST = 'calc(100dvh - var(--k-kopf-hoehe))';

/** Popover-IDs (seitenweit eindeutig; der Kopf steht genau einmal je Seite). */
export const BLATT_ID = 'k-kopf-a-blatt';
export const megaId = (index: number) => `k-kopf-a-mega-${index}`;

/** Hover-Absicht: Schließen erst nach dieser Pause, damit der Zeiger vom Eintrag ins Planblatt wandern kann. */
export const SCHLIESS_VERZUG_MS = 180;

export const TEXTE = {
  nav: 'Hauptnavigation',
  navKategorien: 'Hauptnavigation Kategorien',
  dialog: 'Hauptnavigation',
  logoLink: 'Fliesenverlegung Tezgel – Fachbetrieb Aßlar · Wetzlar – Startseite',
  logoAlt: 'Fliesenverlegung Tezgel – Fachbetrieb Aßlar & Wetzlar',
  ortZeile1: 'Fachbetrieb',
  ortZeile2: 'Aßlar · Wetzlar',
  untermenue: (name: string, offen: boolean) => `Untermenü ${name} ${offen ? 'schließen' : 'öffnen'}`,
  telefon: (nummer: string) => `Fliesenverlegung Tezgel telefonisch anrufen: ${nummer}`,
  whatsapp: (nummer: string) => `WhatsApp-Chat mit Deniz Tezgel starten: ${nummer}`,
  // Vorschlag (Bestand: „Architektur-Menü öffnen/schließen“) – gleicher Wortstamm wie der Schließen-Knopf im Blatt.
  menue: (offen: boolean) => (offen ? 'Menü schließen' : 'Menü öffnen'),
  menueSchliessen: 'Menü schließen',
  // K-012 (Bestand `primaryCta.name`: „Aufmaß buchen“); Ziel bleibt `primaryCta.path`.
  hauptknopf: 'Aufmaß anfragen',
  blattKnopf: 'Kostenfreies Vor-Ort-Aufmaß anfragen',
  anrufen: 'Anrufen',
  whatsappKurz: 'WhatsApp',
  bereiche: 'Fachbereiche & Leistungen',
  alleZu: (name: string) => `Alle Leistungen zu ${name} ansehen`,
  impressum: 'Impressum',
  datenschutz: 'Datenschutz',
} as const;
