// Anfrage (P4-01, K-011 „ein Formular je Bildschirm“, Lehre 9): Platz für das Formular der Seite – Bestand:
// `<section id="anfrage" aria-label="Badanfrage"><BadanfrageFunnel /></section>`, `#konfigurator` mit FliesenKonfigurator,
// `#anfrage` mit TezgelAnfrageFunnel. Die Vorlage baut kein Formular: Die Kern-Ansichten kommen aus `kern/formulare`
// (P4-05a ff.) und stehen als `children` hier. Anker und Name wörtlich aus dem Bestand; Sprungziele landen unter dem Kopf
// (scroll-padding-top in kern-global.css). `data-hauptaktion`: der WhatsApp-Kanal verdeckt das Formular nie.
import type { ReactNode } from 'react';
import Abschnitt, { type AbschnittProps } from '@/components/kern/vorlagen/fachseite/Abschnitt';

export type AnfrageProps = Omit<AbschnittProps, 'hauptaktion'> & { children: ReactNode };

export default function Anfrage({ children, dichte = 'eng', ...abschnitt }: AnfrageProps) {
  return (
    <Abschnitt dichte={dichte} hauptaktion {...abschnitt}>
      {children}
    </Abschnitt>
  );
}
