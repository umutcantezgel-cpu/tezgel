// Vorschau P3-06 Variante B „Achse“ (ruhender Entwurf, wird nie freigeschaltet). Den Live-Kopf rendert das Kern-Layout
// (E-022), ebenso das Icon-Sprite. Erster Bildschirm: Hinweise und eine markierte „Vorschau-Fläche“ (min-h-dvh), damit
// die Tafel im zweiten Bildschirm beginnt. Die Tafel zeigt zuerst das statisch geöffnete Mega-Blatt „Badsanierung“ unter
// einem statischen Kopf, dann das statisch geöffnete Mobilblatt, dann die übrigen Mega-Blätter.
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Etikett } from '@/components/kern/basis';
import Icon from '@/components/kern/icons/Icon';
import { KopfRahmen } from '@/components/kern/kopf-b/Kopf';
import Marke from '@/components/kern/kopf-b/Marke';
import MegaBlatt from '@/components/kern/kopf-b/MegaBlatt';
import MobilBlatt from '@/components/kern/kopf-b/MobilBlatt';
import { kopfAnfrage, kopfEintraege, kopfKontakt } from '@/components/kern/kopf-b/daten';

export const metadata: Metadata = {
  title: 'Vorschau P3-06 · Kopf Variante B „Achse“',
  robots: { index: false, follow: false },
};

const AKTIV = '/bad/badsanierung';
/** Rahmen des Mega-Blatts wie am Popover in Hauptnavigation.tsx (Waage oben, Strich unten). */
const BLATT = 'border-t-2 border-b border-t-k-laser border-b-k-strich bg-k-fliese text-k-tinte';

function Tafelkopf({ titel, children }: { titel: string; children?: ReactNode }) {
  return (
    <div className="mx-auto max-w-(--k-seite) px-(--k-rand) pb-k-4 pt-k-7">
      <h3 className="k-anzeige text-k-4">{titel}</h3>
      {children ? <p className="mt-k-2 max-w-(--k-mass) k-text text-k-2 text-k-tinte-2">{children}</p> : null}
    </div>
  );
}

export default function VorschauKopfB() {
  const eintraege = kopfEintraege();
  const kontakt = kopfKontakt();
  const anfrage = kopfAnfrage();
  const badIndex = Math.max(
    0,
    eintraege.findIndex((e) => e.pfad === '/bad'),
  );
  const bad = eintraege[badIndex];
  return (
    <>
      {/* Erster Bildschirm */}
      <div className="flex min-h-dvh flex-col">
        <div className="mx-auto w-full max-w-(--k-seite) px-(--k-rand) py-k-7 k-text">
          <h1 className="k-anzeige text-k-6">Vorschau P3‑06 · Kopf Variante B „Achse“</h1>
          <p className="mt-k-3 max-w-(--k-mass) text-k-2 text-k-tinte-2">
            Live-Kopf oben aus dem Kern-Layout (sticky, 64 px). Felder: Marke | Hauptnavigation (ab xl) | Telefon + Aufmaß anfragen
            (ab md) | Menü (unter xl). Prüfen: Hover auf einen Hauptpunkt öffnet sofort, Verlassen schließt verzögert · Tab auf den
            Winkel-Schalter, Enter öffnet, Escape schließt und lässt den Fokus am Schalter · unter xl öffnet der Menü-Schalter das
            Blatt (auch vor der Hydrierung), Escape schließt.
          </p>
          <p className="mt-k-3 k-text text-k-2">
            <a href="#tafel" className="underline decoration-k-strich underline-offset-4">
              Zur Tafel (Sprungziel prüft scroll-padding-top)
            </a>
          </p>
        </div>
        <div className="k-muster-kreuzfuge flex flex-1 flex-col gap-k-3 border-y border-k-fuge bg-k-fliese p-k-5">
          <Etikett rahmen kreuz>
            Vorschau-Fläche
          </Etikett>
          <p className="k-mono text-k-1 text-k-tinte-2">Fließfläche zum Scrollen: Kopf bleibt stehen, schrumpft nicht, wechselt keine Farbe.</p>
        </div>
      </div>

      {/* Tafel – beginnt im zweiten Bildschirm */}
      <section aria-labelledby="tafel-titel" id="tafel" className="pb-k-9">
        <div className="mx-auto max-w-(--k-seite) px-(--k-rand) pb-k-4 pt-k-5">
          <h2 id="tafel-titel" className="k-anzeige text-k-5">
            Tafel · Mega-Blatt „{bad.name}“ statisch geöffnet (ab xl), Pfad {AKTIV}
          </h2>
        </div>
        <KopfRahmen vorschauPfad={AKTIV} vorschauOffen={badIndex} />
        <div className={BLATT}>
          <MegaBlatt eintrag={bad} pfad={AKTIV} />
        </div>

        <Tafelkopf titel="Mobilblatt · statisch geöffnet (unter xl)">
          Links mit aufgeklapptem aktivem Bereich (Pfad {AKTIV}), rechts alle Bereiche zu (Pfad /). Rand wie mobil (16 px).
        </Tafelkopf>
        <div className="mx-auto grid max-w-(--k-seite) gap-k-6 px-(--k-rand) md:grid-cols-2 lg:grid-cols-3">
          {[
            { pfad: AKTIV, offen: badIndex, id: 'vorschau-mobil-a' },
            { pfad: '/', offen: null, id: 'vorschau-mobil-b' },
          ].map((m) => (
            <div key={m.id} className="border border-k-strich bg-k-kalk [--k-rand:var(--spacing-k-4)]">
              <div className="flex h-(--k-kopf-hoehe) px-(--k-rand) shadow-k-1">
                <div className="flex min-w-0 flex-1 items-center pr-k-4">
                  <Marke etikett={false} />
                </div>
                <span className="flex shrink-0 items-center border-l border-k-fuge pl-k-2" aria-hidden="true">
                  <span className="flex size-k-7 items-center justify-center text-k-tinte">
                    <Icon name="schliessen" groesse={24} />
                  </span>
                </span>
              </div>
              <MobilBlatt eintraege={eintraege} kontakt={kontakt} anfrage={anfrage} pfad={m.pfad} offen={m.offen} idPraefix={m.id} />
            </div>
          ))}
        </div>

        <Tafelkopf titel={`Kopf · Ruhe mit aktivem Bereich (Pfad ${AKTIV})`}>
          Linie und Laser-tief-Text am Bereich „{bad.name}“, aria-current am exakten Ziel. Ohne Verhalten (Bild).
        </Tafelkopf>
        <KopfRahmen vorschauPfad={AKTIV} />

        {eintraege
          .filter((e) => e !== bad)
          .map((e) => (
            <div key={e.pfad}>
              <Tafelkopf titel={`Mega-Blatt · ${e.name} · statisch geöffnet (ab xl)`}>
                {e.hervorhebung ? 'Mit Hervorhebung (Feld rechts).' : 'Ohne Hervorhebung: Kategorien über neun Spalten.'}
              </Tafelkopf>
              <div className={BLATT}>
                <MegaBlatt eintrag={e} pfad={AKTIV} />
              </div>
            </div>
          ))}
      </section>
    </>
  );
}
