import type { Metadata } from 'next';
import Kopf from '@/components/kern/kopf-a/Kopf';
import Einstieg from '@/components/kern/start/einstieg-b/Einstieg';
import { Folgeflaeche, FormularPlatzhalter } from '@/components/kern/start/einstieg-b/Vorschau';

// Vorschau P3-09 Variante B „Planblatt“ (wird nie freigeschaltet).
// Oben ein abgenommener Kopf (kopf-a, 64 px, sticky im Fluss) nur als Bezug für den ersten Bildschirm – die Wahl des Kopfs
// trifft der Orchestrator. Darunter der Einstieg mit markiertem Formularplatz und eine markierte Folgefläche.
// Kein eigenes IconSprite (das Kern-Layout rendert es). SIG-1 sehen: neu laden; reduziert: Bewegung im System abschalten.
export const metadata: Metadata = { title: 'Entwurf P3-09 · Einstieg B', robots: { index: false, follow: false } };

export default function VorschauEinstiegB() {
  return (
    <>
      <Kopf />
      <Einstieg formular={<FormularPlatzhalter />} />
      <Folgeflaeche />
    </>
  );
}
