// ============================================================
// PROJEKT-ANFRAGE KONSTANTEN – FLIESENVERLEGUNG TEZGEL
// ============================================================
// Strukturierte Daten für die umfassende Projekt- und Situationsabfrage.
// Keine öffentlichen Preise – Individuelle Festpreisangebote nach kostenfreiem Vor-Ort-Aufmaß.
// ============================================================

export type CraftServiceType =
  | 'bad'
  | 'grossformat'
  | 'wohnbereich'
  | 'balkon'
  | 'abdichtung'
  | 'reparatur';

export type RoomSizeType = 'small' | 'medium' | 'large' | 'xlarge';

export interface CraftServiceOption {
  id: CraftServiceType;
  title: string;
  subtitle: string;
  badge?: string;
  focusPoints?: string[];
}

export interface RoomSizeOption {
  id: RoomSizeType;
  label: string;
  areaText: string;
  approxSqm: number;
}

export interface SituationFeatureOption {
  id: string;
  label: string;
  description: string;
}

export const CRAFT_SERVICES: Record<CraftServiceType, CraftServiceOption> = {
  bad: {
    id: 'bad',
    title: 'Badsanierung & Walk-In Dusche',
    subtitle: 'Wand & Boden, Gefälle, Nischen & Komplettbad',
    badge: 'Sehr gefragt',
    focusPoints: ['Normgerechte Verbundabdichtung', 'Bodengleiche Walk-In-Dusche', 'Ablagenischen & Gehrungsschnitt']
  },
  grossformat: {
    id: 'grossformat',
    title: 'XXL-Großformat (ab 120 cm)',
    subtitle: 'Fugenarme Fliesen, Vakuumheber & Kalibrierung',
    badge: 'Spezialgebiet',
    focusPoints: ['Fliesenformate bis 120x260 cm', 'Exaktes Nivelliersystem', 'Millimetergenaue Verlegeachsen']
  },
  wohnbereich: {
    id: 'wohnbereich',
    title: 'Wohnraum, Flur & Küche',
    subtitle: 'Feinsteinzeug, Holzoptik & durchgehende Fugen',
    badge: 'Klassiker',
    focusPoints: ['Robuste Feinsteinzeug-Beläge', 'Moderne Großformate', 'Schwellenlose Übergänge']
  },
  balkon: {
    id: 'balkon',
    title: 'Balkon, Terrasse & Außen',
    subtitle: 'Frostsichere 2-cm-Keramik, Stelzlager & Gefälle',
    badge: 'Außenbereich',
    focusPoints: ['2-cm-Außenkeramik auf Stelzlagern', 'Hinterlüftet & frostsicher', 'Optimaler Wasserablauf']
  },
  abdichtung: {
    id: 'abdichtung',
    title: 'DIN 18534 Abdichtung & Estrich',
    subtitle: 'Verbundabdichtung, Dichtbänder & Nivellierung',
    badge: 'Zertifiziert',
    focusPoints: ['Normgerechte Nassraum-Abdichtung', 'Untergrundausgleich & Spachtelung', 'Dauerhafter Feuchteschutz']
  },
  reparatur: {
    id: 'reparatur',
    title: 'Reparatur & Schadensbeseitigung',
    subtitle: 'Fliesentausch, Silikonfugen & Ursachenprüfung',
    badge: 'Schnellhilfe',
    focusPoints: ['Gezielter Einzelfliesen-Austausch', 'Sanierung elastischer Fugen', 'Vor-Ort-Schadensanalyse']
  }
};

export const ROOM_SIZES: Record<RoomSizeType, RoomSizeOption> = {
  small: {
    id: 'small',
    label: 'Kompakt / Gäste-WC',
    areaText: 'bis ca. 10 m²',
    approxSqm: 8
  },
  medium: {
    id: 'medium',
    label: 'Standard-Raum / Bad',
    areaText: 'ca. 10 - 25 m²',
    approxSqm: 18
  },
  large: {
    id: 'large',
    label: 'Großraum / Wohnbereich',
    areaText: 'ca. 25 - 50 m²',
    approxSqm: 35
  },
  xlarge: {
    id: 'xlarge',
    label: 'Gesamtes Objekt / Etage',
    areaText: 'ab 50 m²',
    approxSqm: 65
  }
};

export const SITUATION_OPTIONS: SituationFeatureOption[] = [
  {
    id: 'altbelag',
    label: 'Altfliesen entfernen & entsorgen',
    description: 'Bestehende Fliesen müssen vorab fachgerecht abgetragen werden'
  },
  {
    id: 'untergrund',
    label: 'Untergrundausgleich / Estrich nötig',
    description: 'Unebene Böden oder Wände müssen vor der Verlegung gespachtelt werden'
  },
  {
    id: 'fussbodenheizung',
    label: 'Fußbodenheizung vorhanden / geplant',
    description: 'Verlegung erfordert hochflexible S1/S2 Mörtel für thermische Spannungen'
  },
  {
    id: 'barrierefrei',
    label: 'Barrierefreier / schwellenloser Zugang',
    description: 'Bodengleiche Dusche, flache Schwellen oder altersgerechte Planung'
  },
  {
    id: 'staubschutz',
    label: 'Staubschutz im bewohnten Wohnbereich',
    description: 'Einsatz von Staubschutztüren & HEPA-Luftreinigern während der Arbeiten'
  },
  {
    id: 'fliesenberatung',
    label: 'Material- & Fliesenberatung gewünscht',
    description: 'Unterstützung bei Fliesenauswahl, Rutschhemmung und Formatabstimmung'
  }
];

// Abwärtskompatibles Alias für eventuelle Altreferenzen
export const ADDON_OPTIONS = SITUATION_OPTIONS.map((item) => ({
  id: item.id,
  label: item.label,
  cost: 0
}));

export const PROPERTY_TYPES = [
  { id: 'bestand', label: 'Bestandsimmobilie / Sanierung' },
  { id: 'neubau', label: 'Neubau / Erstbezug' },
  { id: 'miete', label: 'Mietobjekt / Wohnanlage' },
  { id: 'gewerbe', label: 'Gewerbe / Praxis / Büro' }
];

export const TIMING_OPTIONS = [
  'Schnellstmöglich',
  'In den nächsten 1 - 3 Monaten',
  'In 3 - 6 Monaten',
  'Flexibel / In Planung'
];
