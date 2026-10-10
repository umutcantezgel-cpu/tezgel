// Plan-Vignetten der Fachgewerke (P3-10): je Leistung (`SERVICES[].id`) eine gezeichnete Draufsicht bzw. ein Schnitt.
import type { ComponentType } from 'react';
import VignetteBad from '@/components/kern/motive/vignetten/Bad';
import VignetteWohnen from '@/components/kern/motive/vignetten/Wohnen';
import VignetteAussen from '@/components/kern/motive/vignetten/Aussen';
import VignetteUntergrund from '@/components/kern/motive/vignetten/Untergrund';
import type { VignetteProps } from '@/components/kern/motive/vignetten/zeichnen';

export type VignettenName = 'bad' | 'wohnen' | 'aussen' | 'untergrund';

export const VIGNETTEN: Record<VignettenName, ComponentType<VignetteProps>> = {
  bad: VignetteBad,
  wohnen: VignetteWohnen,
  aussen: VignetteAussen,
  untergrund: VignetteUntergrund,
};

export const istVignette = (id: string): id is VignettenName => id in VIGNETTEN;
