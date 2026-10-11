// Plan-Vignetten der Fachgewerke (P3-10): je Leistung (`SERVICES[].id`) eine gezeichnete Draufsicht bzw. ein Schnitt.
import type { ComponentType } from 'react';
import VignetteBad from '@/components/start/vignetten/Bad';
import VignetteWohnen from '@/components/start/vignetten/Wohnen';
import VignetteAussen from '@/components/start/vignetten/Aussen';
import VignetteUntergrund from '@/components/start/vignetten/Untergrund';
import type { VignetteProps } from '@/components/start/vignetten/zeichnen';

export type VignettenName = 'bad' | 'wohnen' | 'aussen' | 'untergrund';

export const VIGNETTEN: Record<VignettenName, ComponentType<VignetteProps>> = {
  bad: VignetteBad,
  wohnen: VignetteWohnen,
  aussen: VignetteAussen,
  untergrund: VignetteUntergrund,
};

export const istVignette = (id: string): id is VignettenName => id in VIGNETTEN;
