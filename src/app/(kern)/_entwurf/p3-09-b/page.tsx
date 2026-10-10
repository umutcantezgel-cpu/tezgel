import type { Metadata } from 'next';
import Kopf from '@/components/kern/kopf-b/Kopf';
import HeroKontakt from '@/components/kern/formulare/HeroKontakt';
import Einstieg from '@/components/kern/start/einstieg-b/Einstieg';
import { Folgeflaeche } from '@/components/kern/start/einstieg-b/Vorschau';

// Vorschau P3-09 Variante B „Planblatt“ (wird nie freigeschaltet), Stand P3-09c.
// Oben der abgenommene Kopf B (64 px, sticky im Fluss) als Bezug für den ersten Bildschirm, darunter der Einstieg mit dem
// echten Hero-Formular (HeroKontakt, P3-13a – sendet nur, wenn jemand absendet) und eine markierte Folgefläche.
// Kein eigenes IconSprite (das Kern-Layout rendert es). SIG-1 sehen: neu laden; reduziert: Bewegung im System abschalten.
export const metadata: Metadata = { title: 'Entwurf P3-09 · Einstieg B', robots: { index: false, follow: false } };

export default function VorschauEinstiegB() {
  return (
    <>
      <Kopf />
      <Einstieg formular={<HeroKontakt />} />
      <Folgeflaeche />
    </>
  );
}
