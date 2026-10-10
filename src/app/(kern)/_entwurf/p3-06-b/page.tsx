// Vorschau P3-06 Variante B „Achse“ (ruhender Entwurf, wird nie freigeschaltet): der Kern-Kopf live (sticky, darunter
// Fließfläche zum Scrollen) und eine beschriftete Tafel mit statisch geöffnetem Mega-Menü und Mobilmenü für Fotos.
// Hover, Fokus und Tastatur sind am Live-Kopf oben zu prüfen (beschriftet). Blindflächen sind als „Vorschau-Fläche“ markiert.
// Das Icon-Sprite rendert das Kern-Layout.
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Etikett } from '@/components/kern/basis';
import Icon from '@/components/kern/icons/Icon';
import Kopf, { KopfRahmen } from '@/components/kern/kopf-b/Kopf';
import Marke from '@/components/kern/kopf-b/Marke';
import MegaBlatt from '@/components/kern/kopf-b/MegaBlatt';
import MobilBlatt from '@/components/kern/kopf-b/MobilBlatt';
import { kopfAnfrage, kopfEintraege, kopfKontakt } from '@/components/kern/kopf-b/daten';

export const metadata: Metadata = {
  title: 'Vorschau P3-06 · Kopf Variante B „Achse“',
  robots: { index: false, follow: false },
};

const AKTIV = '/bad/badsanierung';

function Flaeche({ id, children }: { id?: string; children?: ReactNode }) {
  return (
    <div id={id} className="k-muster-kreuzfuge flex min-h-dvh flex-col gap-k-3 border-y border-k-fuge bg-k-fliese p-k-5">
      <Etikett rahmen kreuz>
        Vorschau-Fläche
      </Etikett>
      {children}
    </div>
  );
}

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
  return (
    <>
      <Kopf />

      <div className="mx-auto max-w-(--k-seite) px-(--k-rand) py-k-7 k-text">
        <h1 className="k-anzeige text-k-6">Vorschau P3‑06 · Kopf Variante B „Achse“</h1>
        <p className="mt-k-3 max-w-(--k-mass) text-k-2 text-k-tinte-2">
          Live-Kopf oben (sticky, Höhe --k-kopf-hoehe = 64 px). Prüfen: Hover auf einen Hauptpunkt öffnet sofort, Verlassen schließt
          verzögert · Tab auf den Winkel-Schalter, Enter öffnet, Escape schließt und lässt den Fokus am Schalter · unter lg: Menü-Schalter
          öffnet das Blatt (auch vor der Hydrierung), Escape schließt. Darunter die Tafel mit statisch geöffneten Zuständen.
        </p>
        <p className="mt-k-3 k-text text-k-2">
          <a href="#tafel" className="underline decoration-k-strich underline-offset-4">
            Zur Tafel (Sprungziel prüft scroll-padding-top)
          </a>
        </p>
      </div>

      <Flaeche>
        <p className="k-mono text-k-1 text-k-tinte-2">Fließfläche zum Scrollen: Kopf bleibt stehen, schrumpft nicht, wechselt keine Farbe.</p>
      </Flaeche>
      <Flaeche />

      <section aria-labelledby="tafel-titel" id="tafel" className="pb-k-9">
        <div className="mx-auto max-w-(--k-seite) px-(--k-rand) pt-k-8">
          <h2 id="tafel-titel" className="k-anzeige text-k-5">
            Tafel · statische Zustände
          </h2>
        </div>

        <Tafelkopf titel={`Kopf · Ruhe mit aktivem Bereich (Pfad ${AKTIV})`}>
          Ab lg: Linie und Laser-tief-Text am Bereich „Badsanierung“, aria-current am exakten Ziel. Ohne Verhalten (Bild).
        </Tafelkopf>
        <KopfRahmen vorschauPfad={AKTIV} />

        {eintraege.map((e) => (
          <div key={e.pfad}>
            <Tafelkopf titel={`Mega-Menü · ${e.name} · statisch geöffnet (ab lg)`}>
              {e.hervorhebung ? 'Mit Hervorhebung (Feld rechts).' : 'Ohne Hervorhebung: Kategorien über neun Spalten.'} Aktiver Punkt bei
              Pfad {AKTIV}.
            </Tafelkopf>
            <div className="overflow-x-auto border-t-2 border-b border-t-k-laser border-b-k-strich bg-k-fliese text-k-tinte">
              <MegaBlatt eintrag={e} pfad={AKTIV} />
            </div>
          </div>
        ))}

        <Tafelkopf titel="Mobilmenü · statisch geöffnet (unter lg)">
          Links mit aufgeklapptem aktivem Bereich (Pfad {AKTIV}), rechts alle Bereiche zu (Pfad /). Rand wie mobil (--k-rand = 16 px).
        </Tafelkopf>
        <div className="mx-auto grid max-w-(--k-seite) gap-k-6 px-(--k-rand) md:grid-cols-2 lg:grid-cols-3">
          {[
            { pfad: AKTIV, offen: 0, id: 'vorschau-mobil-a' },
            { pfad: '/', offen: null, id: 'vorschau-mobil-b' },
          ].map((m) => (
            <div key={m.id} className="border border-k-strich bg-k-kalk [--k-kopf-hoehe:var(--spacing-k-8)] [--k-rand:var(--spacing-k-4)]">
              <div className="flex h-(--k-kopf-hoehe) items-center gap-k-3 px-(--k-rand) shadow-k-1">
                <Marke etikett={false} />
                <span className="ml-auto flex size-k-7 items-center justify-center text-k-tinte" aria-hidden="true">
                  <Icon name="schliessen" groesse={24} />
                </span>
              </div>
              <MobilBlatt eintraege={eintraege} kontakt={kontakt} anfrage={anfrage} pfad={m.pfad} offen={m.offen} idPraefix={m.id} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
