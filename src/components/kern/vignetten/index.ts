// Plan-Vignetten der Fachgewerke (P3-10): je Leistung (`SERVICES[].id`) eine gezeichnete Draufsicht bzw. ein Schnitt;
// dazu „reparatur“ (E-037, neu in derselben Zeichensprache) für den Bereich Reparatur der Startseite und „treppe“ (UM-E4-START,
// ebenso neu) für die Lage „Treppe“ der Startseite.
import type { ComponentType } from 'react';
import VignetteBad from '@/components/kern/vignetten/Bad';
import VignetteWohnen from '@/components/kern/vignetten/Wohnen';
import VignetteAussen from '@/components/kern/vignetten/Aussen';
import VignetteUntergrund from '@/components/kern/vignetten/Untergrund';
import VignetteReparatur from '@/components/kern/vignetten/Reparatur';
import VignetteTreppe from '@/components/kern/vignetten/Treppe';
import type { VignetteProps } from '@/components/kern/vignetten/zeichnen';

export type VignettenName = 'bad' | 'wohnen' | 'aussen' | 'untergrund' | 'reparatur' | 'treppe';

export const VIGNETTEN: Record<VignettenName, ComponentType<VignetteProps>> = {
  bad: VignetteBad,
  wohnen: VignetteWohnen,
  aussen: VignetteAussen,
  untergrund: VignetteUntergrund,
  reparatur: VignetteReparatur,
  treppe: VignetteTreppe,
};

export const istVignette = (id: string): id is VignettenName => id in VIGNETTEN;
