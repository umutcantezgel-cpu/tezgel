// Plan-Vignetten der Fachgewerke (P3-10): je Leistung (`SERVICES[].id`) eine gezeichnete Draufsicht bzw. ein Schnitt;
// dazu „reparatur“ (E-037, neu in derselben Zeichensprache) für den Bereich Reparatur der Startseite.
import type { ComponentType } from 'react';
import VignetteBad from '@/components/kern/vignetten/Bad';
import VignetteWohnen from '@/components/kern/vignetten/Wohnen';
import VignetteAussen from '@/components/kern/vignetten/Aussen';
import VignetteUntergrund from '@/components/kern/vignetten/Untergrund';
import VignetteReparatur from '@/components/kern/vignetten/Reparatur';
import type { VignetteProps } from '@/components/kern/vignetten/zeichnen';

export type VignettenName = 'bad' | 'wohnen' | 'aussen' | 'untergrund' | 'reparatur';

export const VIGNETTEN: Record<VignettenName, ComponentType<VignetteProps>> = {
  bad: VignetteBad,
  wohnen: VignetteWohnen,
  aussen: VignetteAussen,
  untergrund: VignetteUntergrund,
  reparatur: VignetteReparatur,
};

export const istVignette = (id: string): id is VignettenName => id in VIGNETTEN;
