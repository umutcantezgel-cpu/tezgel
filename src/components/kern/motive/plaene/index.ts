// Verlegepläne je Leistung (P4-03, K-010 Motiv „Verlegeplan“, K-009 SIG-3). Ein Plan je Leistung bzw. Fachthema.
// Nutzung: <Plan /> in einem Feld mit der Klasse SIG_PLAN_AUSLOESER (SIG-3 auf /leistungen und /leistungen/[id]);
// auf übrigen Fachseiten <Plan ruhend />. Farbe kommt von der Hülle (text-k-tinte auf Kalk/Fliese, text-k-kalk auf Tinte).
// `beschreibung` ist ein Vorschlag für `titel` (Alt-Text, K-012 Klasse 2), falls eine Seite den Plan bedeutungstragend
// braucht; vor der Verwendung als Zeile in MIKROTEXTE.md eintragen. Standard ist dekorativ (aria-hidden).
import type { ComponentType } from 'react';
import type { PlanProps } from '@/components/kern/motive/plaene/Planblatt';
import PlanBad from '@/components/kern/motive/plaene/Bad';
import PlanDusche from '@/components/kern/motive/plaene/Dusche';
import PlanWandnische from '@/components/kern/motive/plaene/Wandnische';
import PlanWohnen from '@/components/kern/motive/plaene/Wohnen';
import PlanGrossformat from '@/components/kern/motive/plaene/Grossformat';
import PlanKreuzfuge from '@/components/kern/motive/plaene/Kreuzfuge';
import PlanVerlegemuster from '@/components/kern/motive/plaene/Verlegemuster';
import PlanHolzoptik from '@/components/kern/motive/plaene/Holzoptik';
import PlanFlur from '@/components/kern/motive/plaene/Flur';
import PlanFussbodenheizung from '@/components/kern/motive/plaene/Fussbodenheizung';
import PlanNaturstein from '@/components/kern/motive/plaene/Naturstein';
import PlanAbdichtung from '@/components/kern/motive/plaene/Abdichtung';
import PlanStelzlager from '@/components/kern/motive/plaene/Stelzlager';
import PlanBalkon from '@/components/kern/motive/plaene/Balkon';
import PlanTreppe from '@/components/kern/motive/plaene/Treppe';
import PlanReparatur from '@/components/kern/motive/plaene/Reparatur';

export { SIG_PLAN_AUSLOESER, type PlanProps } from '@/components/kern/motive/plaene/Planblatt';

export type PlanName =
  | 'bad' | 'dusche' | 'wandnische' | 'wohnen' | 'grossformat' | 'kreuzfuge' | 'verlegemuster' | 'holzoptik'
  | 'flur' | 'fussbodenheizung' | 'naturstein' | 'abdichtung' | 'stelzlager' | 'balkon' | 'treppe' | 'reparatur';

export const PLAENE: Record<PlanName, { Plan: ComponentType<PlanProps>; beschreibung: string }> = {
  bad: { Plan: PlanBad, beschreibung: 'Verlegeplan Bad: Draufsicht mit Duschrinne und Tür, Fliesen in Kreuzfuge, Achse mittig, Passstücke an beiden Seiten gleich breit' },
  dusche: { Plan: PlanDusche, beschreibung: 'Verlegeplan bodengleiche Dusche: Rinne am Wandanschluss, Gefälle zur Rinne, Achse mittig, Passstücke an beiden Seiten gleich breit' },
  wandnische: { Plan: PlanWandnische, beschreibung: 'Verlegeplan Wandnische: Wandansicht, Nischenkanten auf den Fugen, Achse durch die Nischenmitte' },
  wohnen: { Plan: PlanWohnen, beschreibung: 'Verlegeplan Wohnbereich: zwei Räume, die Fugenachse läuft durch die Türmitte, Randstücke oben und unten gleich breit' },
  grossformat: { Plan: PlanGrossformat, beschreibung: 'Verlegeplan Großformat: Platten im Drittelverband, Achse auf der mittleren Fuge, Randreihen oben und unten gleich breit' },
  kreuzfuge: { Plan: PlanKreuzfuge, beschreibung: 'Verlegeplan Kreuzfuge: Achsenkreuz in Raummitte, Passstücke an allen Rändern paarweise gleich breit' },
  verlegemuster: { Plan: PlanVerlegemuster, beschreibung: 'Verlegeplan Halbverband: Reihen um eine halbe Platte versetzt, Achse mittig, Reihenenden links und rechts gleich' },
  holzoptik: { Plan: PlanHolzoptik, beschreibung: 'Verlegeplan Holzoptik: Dielen im wilden Verband, Achse längs in Raummitte, Randdielen oben und unten gleich breit' },
  flur: { Plan: PlanFlur, beschreibung: 'Verlegeplan Flur: Achse längs durch die Flurmitte und die Stirntür, Randstreifen an beiden Wänden gleich breit' },
  fussbodenheizung: { Plan: PlanFussbodenheizung, beschreibung: 'Verlegeplan Fußbodenheizung: zwei Heizfelder, die Belagsfuge liegt auf der Bewegungsfuge, Passstücke gleich breit' },
  naturstein: { Plan: PlanNaturstein, beschreibung: 'Verlegeplan Naturstein: große Platten in Kreuzfuge, Achse durch die Plattenmitte, Passstücke paarweise gleich breit' },
  abdichtung: { Plan: PlanAbdichtung, beschreibung: 'Verlegeplan Nassraum: Dichtband an den Wandanschlüssen, Manschetten an Rohren und Ablauf, Ablauf im Fugenkreuz der Achsen' },
  stelzlager: { Plan: PlanStelzlager, beschreibung: 'Verlegeplan Terrasse: Platten auf Stelzlagern unter jedem Fugenkreuz, Gefälle vom Haus weg, Passstücke gleich breit' },
  balkon: { Plan: PlanBalkon, beschreibung: 'Verlegeplan Balkon: Gefälle zur Rinne an der freien Kante, Tropfkante, Manschetten an den Geländerpfosten' },
  treppe: { Plan: PlanTreppe, beschreibung: 'Verlegeplan Treppe: Draufsicht auf fünf Stufen, Fugen fluchten über alle Stufen, Passstücke je Stufe gleich breit' },
  reparatur: { Plan: PlanReparatur, beschreibung: 'Verlegeplan Reparatur: Wandansicht mit einer ausgetauschten Fliese und zwei verschlossenen Bohrlöchern' },
};

export const istPlan = (name: string): name is PlanName => name in PLAENE;

/** Leistung (`SERVICES[].id`) → Plan. */
export const PLAN_JE_LEISTUNG: Record<string, PlanName> = {
  bad: 'bad',
  wohnen: 'wohnen',
  aussen: 'stelzlager',
  untergrund: 'abdichtung',
};

/** Unterleistung (`SERVICES[].subcategories[].id`) → Plan; ohne Eintrag: Plan der Leistung. */
export const PLAN_JE_UNTERLEISTUNG: Record<string, PlanName> = {
  'walk-in-duschen': 'dusche',
  'grossformate-bad': 'grossformat',
  nischen: 'wandnische',
  feinsteinzeug: 'kreuzfuge',
  treppen: 'treppe',
  'kuechen-dielen': 'flur',
  naturstein: 'naturstein',
  stelzlager: 'stelzlager',
  gefaelle: 'balkon',
  'abdichtung-aussen': 'balkon',
  'din-18534': 'abdichtung',
};

/** Fachseite → Plan (ruhend). Seiten ohne Eintrag bekommen vorerst keinen Plan (siehe Rückgabe P4-03, offene Fragen). */
export const PLAN_JE_PFAD: Record<string, PlanName> = {
  '/bad/badsanierung': 'wandnische',
  '/bad/bad-aus-einer-hand': 'bad',
  '/bad/barrierefreies-bad': 'dusche',
  '/bad/fliesen': 'grossformat',
  '/fliesen': 'kreuzfuge',
  '/fliesen/fliesenarten': 'kreuzfuge',
  '/fliesen/grossformat': 'grossformat',
  '/fliesen/verlegemuster': 'verlegemuster',
  '/fliesen/holzoptik': 'holzoptik',
  '/fliesen/flur-diele': 'flur',
  '/fliesen/kueche': 'flur',
  '/fliesen/auf-fussbodenheizung': 'fussbodenheizung',
  '/fliesen/neubau': 'wohnen',
  '/fliesen/fugensanierung': 'reparatur',
  '/naturstein': 'naturstein',
  '/naturstein/granit': 'naturstein',
  '/naturstein/marmor-kalkstein': 'naturstein',
  '/treppen': 'treppe',
  '/treppen/innentreppe': 'treppe',
  '/treppen/aussentreppe': 'treppe',
  '/treppen/treppenhaus': 'treppe',
  '/balkon-terrasse': 'balkon',
  '/balkon-terrasse/balkonsanierung': 'balkon',
  '/balkon-terrasse/stelzlager': 'stelzlager',
  '/balkon-terrasse/terrassenplatten': 'stelzlager',
  '/untergrund-abdichtung': 'abdichtung',
  '/untergrund-abdichtung/din-18534': 'abdichtung',
  '/untergrund-abdichtung/ausgleich-gefaelle': 'balkon',
  '/fliesenreparatur': 'reparatur',
  '/schadensanalyse': 'reparatur',
};
