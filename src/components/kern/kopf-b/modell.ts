// Kopf Variante B „Achse“ (P3-06, KERN v1.2): Datenmodell, Mikrotexte und Pfadlogik – rein, ohne Importe aus `@/config`,
// damit die Client-Teile die Konfiguration nicht ins Bündel ziehen. Die Daten liest `daten.ts` auf dem Server.

export type Unterpunkt = {
  name: string;
  pfad: string;
  beschreibung?: string;
  /** Laufende Nummer im Blatt, zweistellig in Mono („01“ …); rein darstellend (aria-hidden). */
  nummer: string;
};

export type Kategorie = { titel: string; punkte: Unterpunkt[] };

export type Hervorhebung = {
  etikett: string;
  titel: string;
  text: string;
  ziel: { name: string; pfad: string };
};

export type Eintrag = {
  name: string;
  pfad: string;
  beschreibung: string;
  kategorien: Kategorie[];
  hervorhebung?: Hervorhebung;
};

export type Kontakt = {
  telefon: string;
  telefonLink: string;
  whatsapp: string;
  whatsappNummer: string;
  whatsappLink: string;
  zeiten: string;
};

export type Ziel = { name: string; pfad: string };

// Zugängliche Namen und Beschriftungen – wörtlich aus dem Bestand (Header.jsx, MobileMenu.jsx), außer dem Hauptknopf
// (K-012 freigegeben). Der Menü-Schalter trägt den Bestandsnamen; Vorschlag „Menü öffnen/schließen“ steht in der Rückgabe.
export const TEXT = {
  nav: 'Hauptnavigation',
  navMobil: 'Hauptnavigation Kategorien',
  dialog: 'Hauptnavigation',
  logoLink: 'Fliesenverlegung Tezgel – Fachbetrieb Aßlar · Wetzlar – Startseite',
  logoAlt: 'Fliesenverlegung Tezgel – Fachbetrieb Aßlar & Wetzlar',
  ortZeile1: 'Fachbetrieb',
  ortZeile2: 'Aßlar · Wetzlar',
  hauptknopf: 'Aufmaß anfragen',
  mobilEtikett: 'Fachbereiche & Leistungen',
  mobilAnfrage: 'Kostenfreies Vor-Ort-Aufmaß anfragen',
  anrufen: 'Anrufen',
  whatsapp: 'WhatsApp',
  impressum: 'Impressum',
  datenschutz: 'Datenschutz',
} as const;

export const untermenueName = (name: string, offen: boolean) => `Untermenü ${name} ${offen ? 'schließen' : 'öffnen'}`;
export const menueName = (offen: boolean) => (offen ? 'Architektur-Menü schließen' : 'Architektur-Menü öffnen');
export const telefonName = (nummer: string) => `Fliesenverlegung Tezgel telefonisch anrufen: ${nummer}`;
export const whatsappName = (nummer: string) => `WhatsApp-Chat mit Deniz Tezgel starten: ${nummer}`;
export const alleZu = (name: string) => `Alle Leistungen zu ${name} ansehen`;

/** Liegt `pfad` auf `ziel` oder darunter? Die Startseite zählt nur exakt. */
export function liegtUnter(pfad: string, ziel: string): boolean {
  if (ziel === '/') return pfad === '/';
  return pfad === ziel || pfad.startsWith(`${ziel}/`);
}

/** Index des aktiven Bereichs (erster Treffer über Hauptpfad oder Unterpunkte), sonst null. Höchstens ein Bereich ist aktiv. */
export function aktiverBereich(pfad: string, eintraege: readonly Eintrag[]): number | null {
  const i = eintraege.findIndex(
    (e) => liegtUnter(pfad, e.pfad) || e.kategorien.some((k) => k.punkte.some((p) => liegtUnter(pfad, p.pfad))),
  );
  return i < 0 ? null : i;
}

/** Ein offenes Popover? (Ohne Popover-API: nie offen.) */
export function istOffen(el: Element | null | undefined): boolean {
  if (!el) return false;
  try {
    return el.matches(':popover-open');
  } catch {
    return false;
  }
}

/** Öffnen per Script: erst zu (0fr) festschreiben, dann offen (1fr) – das Register `aufklappen` lässt die Höhe laufen. */
export function aufklappenAb(el: Element | null | undefined): void {
  if (!el) return;
  el.removeAttribute('data-offen');
}
export function aufklappenAuf(el: Element | null | undefined): void {
  if (!el) return;
  void getComputedStyle(el).gridTemplateRows;
  el.setAttribute('data-offen', '');
}

/** Breite ab der die Hauptnavigation steht (Tailwind `lg` = 64rem). */
export const AB_LG = '(min-width: 64rem)';
