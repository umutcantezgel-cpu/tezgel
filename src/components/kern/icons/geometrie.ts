// Icon-Familie des Formsystems (K-010) · Grundsatz P3-04, Vollsatz P4-04 · Kern v1.2
// Reine Daten ohne Importe: Sprite, Komponente, Abbildung und die Prüfdateien lesen dieselbe Geometrie.
//
// Regeln (K-010): 24er-Raster · Strich 1,5 · Enden square · Ecken miter · Farbe currentColor.
// Koordinaten liegen im Halbpixel-Raster (Vielfache von 0,5); die äußersten Mittellinien liegen bei 3,5 und 20,5,
// damit die Tinte samt Strichhälfte, square-Enden und miter-Spitzen im Lebensbereich 2,75–21,25 bleibt.
// Richtungen fast nur 0° und 90°; 45° bei Pfeilspitzen und Tropfen. Zeichen, die ohne Schräge nicht lesbar sind,
// tragen `schraege` mit Grund (Abweichung, in der Rückgabe P3-04 aufgeführt).
// Pfad-Daten stehen in der Form, die SVGO (Konfiguration statisch) selbst ausgibt, damit jede Datei ein Fixpunkt ist.

export const RICHTUNGEN = { rechts: 0, unten: 90, links: 180, oben: 270 } as const;
export type Richtung = keyof typeof RICHTUNGEN;

/** Kontur: erbt Strich 1,5 · square · miter vom Symbol. */
type Kontur = { readonly d: string };
/** Fläche: gefüllt in currentColor, behält die Kontur (gleiche Außenkante wie die Konturform). */
type Flaeche = { readonly d: string; readonly voll: true };
/** Kreis als Kontur: Mittelpunkt x, y und Radius. */
type Kreis = { readonly kreis: readonly [number, number, number] };
export type IconTeil = Kontur | Flaeche | Kreis;

export type IconZeichnung = {
  readonly teile: readonly IconTeil[];
  /** Dreht über `richtung` (Grundrichtung rechts). */
  readonly drehbar?: true;
  /** Grund für Schrägen außerhalb von Pfeilspitze und Tropfen. */
  readonly schraege?: string;
};

export const ICONS = {
  telefon: { teile: [{ d: 'M3.5 3.5h6v5a12.5 12.5 0 0 0 6 6h5v6a17 17 0 0 1-17-17Z' }] },
  mail: {
    teile: [{ d: 'M3.5 5.5h17v13h-17Zm1 1L12 14l7.5-7.5' }],
    schraege: 'Umschlagklappe als 45°-Winkel (Form der Pfeilspitze)',
  },
  sprechblase: { teile: [{ d: 'M7.5 15.5h-4v-11h17v11H11L7.5 19Z' }] },
  ort: {
    teile: [{ d: 'M7.404 15.096a6.5 6.5 0 1 1 9.192 0L12 19.692Z' }, { kreis: [12, 10.5, 2.5] }],
  },
  uhr: { teile: [{ kreis: [12, 12, 8.5] }, { d: 'M12 6.5V12h3.5' }] },
  kalender: { teile: [{ d: 'M3.5 5.5h17v15h-17Zm0 4.5h17M8 3.5V7m8-3.5V7' }] },
  pfeil: { teile: [{ d: 'M3.5 12H19m-5-6 6 6-6 6' }], drehbar: true },
  winkel: { teile: [{ d: 'M8.5 5.5 15 12l-6.5 6.5' }], drehbar: true },
  schliessen: {
    teile: [{ d: 'm5 5 14 14m0-14L5 19' }],
    schraege: 'Kreuz aus zwei 45°-Linien (Zeichen ist nur so lesbar)',
  },
  menue: { teile: [{ d: 'M3.5 6.5h17M3.5 12h17m-17 5.5h17' }] },
  haken: {
    teile: [{ d: 'm4.5 12 5 5 10-10' }],
    schraege: 'Haken aus zwei 45°-Linien (Prüfhaken)',
  },
  hinweis: { teile: [{ d: 'M3.5 3.5h17v17h-17Zm8.5 4V8m0 3v5.5' }] },
  fehler: { teile: [{ d: 'M3.5 3.5h15V12h2v8.5h-15V12h-2Zm8.5 4V13m0 3v.5' }] },
  plus: { teile: [{ d: 'M4.5 12h15M12 4.5v15' }] },
  minus: { teile: [{ d: 'M4.5 12h15' }] },
  stern: {
    teile: [{ d: 'm12 5 2.351 4.764 5.257.764-3.804 3.708.898 5.236L12 17l-4.702 2.472.898-5.236-3.804-3.708 5.257-.764Z' }],
    schraege: 'Fünfstrahliger Stern (Bewertungszeichen, Winkel 36°/72°)',
  },
  'stern-voll': {
    teile: [{ d: 'm12 5 2.351 4.764 5.257.764-3.804 3.708.898 5.236L12 17l-4.702 2.472.898-5.236-3.804-3.708 5.257-.764Z', voll: true }],
    schraege: 'Fünfstrahliger Stern (Bewertungszeichen, Winkel 36°/72°)',
  },
  download: { teile: [{ d: 'M12 3.5V14m-5-4 5 5 5-5M3.5 15.5v5h17v-5' }] },
  suche: {
    teile: [{ kreis: [10.5, 10.5, 6.5] }, { d: 'M15.5 15.5 20 20' }],
    schraege: 'Griff der Lupe unter 45°',
  },
  teilen: { teile: [{ d: 'M8 10.5H5.5v10h13v-10H16m-4 5V5M9 7l3-3 3 3' }] },
  bad: { teile: [{ d: 'M3.5 12h17m-15 0v5h13v-5m-11 5v2.5m9-2.5v2.5m-9-7.5V5h4v2' }] },
  grossformat: { teile: [{ d: 'M3.5 11.5h17v9h-17Zm0-8v4m17-4v4m-17-2h17' }] },
  abdichtung: { teile: [{ d: 'M3.5 12.5v8h17v-8M9.525 6.975 12 4.5l2.475 2.475a3.5 3.5 0 1 1-4.95 0Z' }] },

  // ---- Vollsatz (P4-04): nur angehängt, damit Reihenfolge und Ausgabe der Zeichen oben byte-gleich bleiben (Startseite live). ----
  // Fachzeichen (K-010)
  /** Dusche/Rinne: Wandarm mit Brausekopf, Wasser, Boden mit eingelassener Rinne. */
  dusche: { teile: [{ d: 'M3.5 3.5H12v3m-4.5 0h9M9 10v3m3-3v3m3-3v3M3.5 17.5H9v3h6v-3h5.5' }] },
  /** Untergrund: Schnitt durch den Bodenaufbau (Fliesenlage mit Fugen, Estrich, Rohdecke). */
  untergrund: { teile: [{ d: 'M3.5 6.5h17v11h-17Zm0 3h17m-17 5h17M9 6.5v3m6-3v3' }] },
  /** Treppe: Treppenkörper im Schnitt, vier gleiche Stufen. */
  treppe: { teile: [{ d: 'M4 20v-4h4v-4h4V8h4V4h4v16Z' }] },
  /** Balkon: Wand, auskragende Platte, Geländer mit Stäben (Ansicht von der Seite). */
  balkon: { teile: [{ d: 'M3.5 3.5v17m0-6h17v3h-17m17-3v-6h-17m4 0v6m4.5-6v6m4.5-6v6' }] },
  /** Naturstein: Platte mit Maserung. */
  naturstein: {
    teile: [{ d: 'M3.5 3.5h17v17h-17Z' }, { d: 'M3.5 15.5c5 0 6-6 10-6 3 0 4 2 7 2' }, { d: 'M10.5 12.5c1 2.5 3 4.5 6 5' }],
    schraege: 'Maserung als freie Kurve (nur so von Fliese und Feld unterscheidbar)',
  },
  /** Reparatur: Fliesenfeld 2 × 2, eine Fliese zum Tausch herausgehoben. */
  reparatur: { teile: [{ d: 'M3.5 6.5h7v7h7v7h-14Zm0 7h7v7' }, { d: 'M13.5 3.5h7v7h-7Z' }] },
  /** Fußbodenheizung: Belag oben, Heizrohr als Schlange mit Bögen darunter. */
  fussbodenheizung: { teile: [{ d: 'M3.5 4.5h17m-17 5H18a2.5 2.5 0 0 1 0 5H6a2.5 2.5 0 0 0 0 5h14.5' }] },
  /** Aufmaß: Maßstab mit Teilung (offene Frage 2 aus P3-04). */
  aufmass: { teile: [{ d: 'M3.5 8.5h17v7h-17Zm2.5 0v3m3-3v2m3-2v3m3-3v2m3-2v3' }] },
  // Grundzeichen, die der Bestand mit Aufgabe nutzt
  /** Externer Link: Rahmen mit offener Ecke, Pfeil nach außen. */
  extern: {
    teile: [{ d: 'M10 3.5H3.5v17h17V14M14 3.5h6.5V10m-1-5.5-8 8' }],
    schraege: 'Pfeil nach außen unter 45° (Spitze als rechter Winkel)',
  },
  /** Dokument: Blatt mit Zeilen (Downloads, Protokolle, Angebote). */
  dokument: { teile: [{ d: 'M5.5 3.5h13v17h-13Zm3 4.5h7m-7 4h7m-7 4h4' }] },
  /** Schloss: Anmeldung und geschützte Bereiche. */
  schloss: { teile: [{ d: 'M5.5 10h13v10h-13ZM8 10V8a4 4 0 0 1 8 0v2m-4 3.5v3' }] },
} as const satisfies Record<string, IconZeichnung>;

// Markenzeichen: nicht Teil der Familie (AUFTRAG Abschnitt 7, K-010). Offizielle Form unverändert, einfarbig currentColor.
// Pfad wortgleich aus dem Bestand (`src/components/common/FloatingWhatsAppWidget.tsx`).
export const MARKEN = {
  whatsapp: {
    marke: 'WhatsApp',
    d: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z',
  },
} as const;

export type FamilienIconName = keyof typeof ICONS;
export type MarkenIconName = keyof typeof MARKEN;
export type IconName = FamilienIconName | MarkenIconName;
export type DrehbarerIconName = { [K in FamilienIconName]: (typeof ICONS)[K] extends { drehbar: true } ? K : never }[FamilienIconName];

export const FAMILIEN_NAMEN = Object.keys(ICONS) as FamilienIconName[];
export const MARKEN_NAMEN = Object.keys(MARKEN) as MarkenIconName[];
export const ICON_NAMEN: readonly IconName[] = [...FAMILIEN_NAMEN, ...MARKEN_NAMEN];

/** Mit dem Vollsatz P4-04 ergänzte Zeichen. Grundsatz P3-04 = die übrigen Familiennamen. Für statische Auswahl (`IconSprite namen`). */
export const VOLLSATZ_NAMEN = [
  'dusche', 'untergrund', 'treppe', 'balkon', 'naturstein', 'reparatur', 'fussbodenheizung', 'aufmass', 'extern', 'dokument', 'schloss',
] as const satisfies readonly FamilienIconName[];
export const GRUNDSATZ_NAMEN = FAMILIEN_NAMEN.filter((n) => !(VOLLSATZ_NAMEN as readonly string[]).includes(n));

/** Sprite-ID eines Symbols. Präfix k-icon- hält den Namensraum frei von anderen IDs. */
export const symbolId = (name: IconName) => `k-icon-${name}`;

export const istMarke = (name: IconName): name is MarkenIconName => name in MARKEN;

/** Nur pfeil und winkel drehen (Grundrichtung rechts). */
export const istDrehbar = (name: IconName): name is DrehbarerIconName =>
  !istMarke(name) && 'drehbar' in ICONS[name];
