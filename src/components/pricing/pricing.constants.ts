// ============================================================
// PREIS-KALKULATION KONSTANTEN – FLIESENVERLEGUNG TEZGEL
// ============================================================
// Realistische Richtwerte für Vorabkalkulation in Aßlar & Wetzlar
// Verbindliches Festpreisangebot immer nach kostenfreiem Vor-Ort-Aufmaß
// ============================================================

export type CraftServiceType = 'bad' | 'grossformat' | 'wohnbereich' | 'balkon' | 'abdichtung';
export type RoomSizeType = 'small' | 'medium' | 'large' | 'xlarge';

export interface CraftServiceOption {
  id: CraftServiceType;
  title: string;
  subtitle: string;
  basePricePerSqm: number;
  fixedBase: number;
}

export interface RoomSizeOption {
  id: RoomSizeType;
  label: string;
  areaText: string;
  approxSqm: number;
}

export const CRAFT_SERVICES: Record<CraftServiceType, CraftServiceOption> = {
  bad: {
    id: 'bad',
    title: 'Badsanierung & Walk-In',
    subtitle: 'Wand & Boden, Gefälle & Dichtigkeit',
    basePricePerSqm: 85,
    fixedBase: 1200,
  },
  grossformat: {
    id: 'grossformat',
    title: 'XXL-Großformat (ab 120cm)',
    subtitle: 'Nivelliersystem, Vakuumheber & Kalibrierung',
    basePricePerSqm: 95,
    fixedBase: 800,
  },
  wohnbereich: {
    id: 'wohnbereich',
    title: 'Wohnraum, Flur & Küche',
    subtitle: 'Feinsteinzeug, Holzoptik & Fugenachsen',
    basePricePerSqm: 55,
    fixedBase: 450,
  },
  balkon: {
    id: 'balkon',
    title: 'Balkon & Terrasse',
    subtitle: 'Stelzlager, Gefälleestrich & Frostsicherheit',
    basePricePerSqm: 75,
    fixedBase: 650,
  },
  abdichtung: {
    id: 'abdichtung',
    title: 'DIN 18534 Abdichtung & Estrich',
    subtitle: 'Verbundabdichtung, Dichtbänder & Nivellierung',
    basePricePerSqm: 40,
    fixedBase: 350,
  },
};

export const ROOM_SIZES: Record<RoomSizeType, RoomSizeOption> = {
  small: {
    id: 'small',
    label: 'Kompakt / Gäste-WC',
    areaText: 'ca. 5 - 10 m²',
    approxSqm: 8,
  },
  medium: {
    id: 'medium',
    label: 'Standard-Raum / Bad',
    areaText: 'ca. 10 - 25 m²',
    approxSqm: 18,
  },
  large: {
    id: 'large',
    label: 'Großraum / Wohnfläche',
    areaText: 'ca. 25 - 50 m²',
    approxSqm: 35,
  },
  xlarge: {
    id: 'xlarge',
    label: 'Gesamtes Objekt / Etage',
    areaText: 'ab 50 m²',
    approxSqm: 65,
  },
};

export const ADDON_OPTIONS = [
  { id: 'staubschutz', label: 'Staubschutz-Paket (Luftreiniger & Staubtür)', cost: 180 },
  { id: 'altbelag', label: 'Altfliesen-Demontage & Fachgerechte Entsorgung', cost: 420 },
  { id: 'fussbodenheizung', label: 'Verlegung auf Fußbodenheizung (Flexmörtel S1/S2)', cost: 250 },
];
