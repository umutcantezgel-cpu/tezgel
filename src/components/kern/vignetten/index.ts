// Plan-Vignetten der Fachgewerke (P3-10): je Leistung (`SERVICES[].id`) eine gezeichnete Draufsicht bzw. ein Schnitt;
// dazu „reparatur“ (E-037, neu in derselben Zeichensprache) für den Bereich Reparatur der Startseite und „treppe“ (UM-E4-START,
// ebenso neu) für die Lage „Treppe“ der Startseite. Dazu Schnittzeichnungen eines Seitenthemas in derselben Zeichensprache:
// „wanne-dusche“ (UM-E4-SICHT-FIX M-C9, „Wanne raus, Dusche ohne Stufe“) unter dem Kopf von „Was wir tun“ auf /bad/badsanierung.
import type { ComponentType } from 'react';
import VignetteBad from '@/components/kern/vignetten/Bad';
import VignetteWohnen from '@/components/kern/vignetten/Wohnen';
import VignetteAussen from '@/components/kern/vignetten/Aussen';
import VignetteUntergrund from '@/components/kern/vignetten/Untergrund';
import VignetteReparatur from '@/components/kern/vignetten/Reparatur';
import VignetteTreppe from '@/components/kern/vignetten/Treppe';
import VignetteWanneDusche from '@/components/kern/vignetten/WanneDusche';
import type { VignetteProps } from '@/components/kern/vignetten/zeichnen';

/** Plan-Vignetten der Fachgewerke und Lagen */
export type VignettenName = 'bad' | 'wohnen' | 'aussen' | 'untergrund' | 'reparatur' | 'treppe';
/** alle Zeichnungen: die Plan-Vignetten und die Schnittzeichnungen eines Seitenthemas (z. B. unter dem Kopf von „Was wir tun“,
 *  TunInhalt.unterKopf, M-C9) */
export type ZeichnungName = VignettenName | 'wanne-dusche';

export const VIGNETTEN: Record<ZeichnungName, ComponentType<VignetteProps>> = {
  bad: VignetteBad,
  wohnen: VignetteWohnen,
  aussen: VignetteAussen,
  untergrund: VignetteUntergrund,
  reparatur: VignetteReparatur,
  treppe: VignetteTreppe,
  'wanne-dusche': VignetteWanneDusche,
};

export const istVignette = (id: string): id is ZeichnungName => id in VIGNETTEN;
