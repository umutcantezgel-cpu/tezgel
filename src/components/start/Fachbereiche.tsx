// Startseite · Fachbereiche & Planungshilfen (E020-F-1, KERN v2): „Alles für Ihr Vorhaben auf über 100 Fachseiten“,
// Anker #portal-netzwerk. Nachbau des Vorbilds (src/components/kern/start/Fachbereiche.tsx) im KERN-v2-System.
// Aufbau: Kopf über volle Breite (Titel links, Einleitung rechts); ein Planblatt mit vier Spalten (Tablett zwei,
// mobil untereinander), getrennt nur durch Fugen; Zeilen mit Pfeil; darunter das Register „Fachthemen im Detail“
// mit Seitenzahl und Beschreibung in Mono.
// Abweichung zum Vorbild: Die Städte stehen als fließende Verweisliste (Mono, umbrechend, je Stadt 44 px Tippziel),
// nicht als Raster ungleich breiter Felder.
// Fläche: Fliese mit Fugenrahmen, damit sich der Abschnitt vom Kalk der Garantien absetzt; die Felder sind Kalk.
// Kein Rot, kein Auftritt, kein 'use client'. Zustände (Register `zustand`) nur bei Links mit Farbwechsel.
// Inhalt: `PORTAL_HUBS`, `LANGE_LISTE_AB`, `PortalLink` aus `@/lib/start/daten` (wortgleich mit der Bestandsfassung
// in `src/app/(bestand)/page.tsx`), `TOPIC_HUBS` aus `@/config/topics`. Überschriften und Texte wörtlich wie heute.
import Link from 'next/link';
import clsx from 'clsx';
import { TOPIC_HUBS } from '@/config/topics';
import Icon from '@/components/icons/Icon';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import Knopf from '@/components/kern/Knopf';
import { etikettForm, etikettKlassen, seitenKlassen } from '@/components/kern/stile';
import { LANGE_LISTE_AB, PORTAL_HUBS, type PortalLink } from '@/lib/start/daten';

// Unterstrich am Namen: erscheint bei feinem Zeiger beim Überfahren und beim Antippen
const UNTERSTRICH = 'decoration-1 underline-offset-4 decoration-tinte pointer-fine:group-hover:underline group-active:underline';
// Zeile mit Pfeil (min. 48 px Trefferfläche); auf Kalk hebt sich der Zustand als Fliese ab
const ZEILE = 'group flex min-h-12 items-center justify-between gap-3 px-6 py-2 font-text text-fs-2 text-tinte pointer-fine:hover:bg-fliese active:bg-fliese';
// Stadt in der fließenden Verweisliste (44 px Trefferfläche, Mono, Unterstrich in Strich)
const STADT =
  'group inline-flex min-h-11 items-center px-2 py-2 font-mono text-fs-1 text-tinte underline decoration-strich underline-offset-4 pointer-fine:hover:decoration-tinte pointer-fine:hover:bg-fliese active:bg-fliese';

function Linkliste({ links }: { links: PortalLink[] }) {
  if (links.length >= LANGE_LISTE_AB) {
    // Lange Listen (Standorte): umbrechend, Mono, Abstände in Zeile und Spalte ohne Raster
    return (
      <ul className="flex flex-wrap gap-x-1 border-t border-fuge px-4 py-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} data-motion="zustand" className={STADT}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <ul className="divide-y divide-fuge border-t border-fuge">
      {links.map((link) => (
        <li key={link.href}>
          <Link href={link.href} data-motion="zustand" className={ZEILE}>
            <span className={UNTERSTRICH}>{link.label}</span>
            <span aria-hidden="true" className="flex shrink-0 text-strich">
              <Icon name="winkel-rechts" groesse={4} />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function Fachbereiche() {
  // Anker ohne eigenes scroll-margin: allein scroll-padding-top (globals.css) setzt ihn auf 96 px (R-01a, R-02b)
  return (
    <section
      id="portal-netzwerk"
      aria-labelledby="portal-heading"
      className="spaet-zeichnen relative border-y border-fuge bg-fliese py-16 lg:py-24"
    >
      <div className={seitenKlassen}>
        {/* Kopf über volle Breite: Titel links, Einleitung rechts */}
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <span className={etikettKlassen}>
              <Fugenkreuz className="size-3 text-strich" />
              Fachbereiche &amp; Planungshilfen
            </span>
            <h2 id="portal-heading" className="mt-4 text-fs-6 text-tinte">
              Alles für Ihr Vorhaben auf über 100 Fachseiten
            </h2>
          </div>
          <p className="max-w-mass text-fs-3 text-tinte-2 lg:col-span-5">
            Von der schlüsselfertigen Badsanierung über nützliche Planungshilfen bis zu den Standorten in Hessen – wählen Sie
            Ihren Themenbereich.
          </p>
        </div>

        {/* Planblatt: Blattkante oben in Tinte, Spalten durch Fugen getrennt; Zeilen fluchten über alle Spalten (subgrid) */}
        <div className="mt-16 grid border-t border-tinte md:grid-cols-2 lg:grid-cols-4">
          {PORTAL_HUBS.map((hub, i) => (
            <article
              key={hub.eyebrow}
              aria-labelledby={`portal-bereich-${i}`}
              className="flex flex-col border-b border-fuge bg-kalk md:row-span-5 md:grid md:grid-rows-subgrid md:border-r"
            >
              <div className="border-b border-fuge px-6 py-3">
                <span className={clsx(etikettForm, 'text-tinte')}>{hub.eyebrow}</span>
              </div>
              <h3 id={`portal-bereich-${i}`} className="px-6 pt-6 text-fs-4 text-tinte">
                {hub.title}
              </h3>
              <p className="px-6 pt-3 font-text text-fs-2 text-tinte-2">{hub.text}</p>
              <div className="px-6 pt-2 pb-4">
                <Knopf href={hub.cta.href} variante="text" icon="pfeil-rechts">
                  {hub.cta.label}
                </Knopf>
              </div>
              <Linkliste links={hub.links} />
            </article>
          ))}
        </div>

        {/* Register: eine Zeile je Fachthema, Name links, Umfang in Mono daneben */}
        <div className="mt-16 grid gap-4 lg:grid-cols-12">
          <p id="portal-fachthemen" className={clsx(etikettKlassen, 'lg:col-span-3 lg:self-start lg:pt-4')}>
            <Fugenkreuz className="size-3 text-strich" />
            Fachthemen im Detail
          </p>
          <ul aria-labelledby="portal-fachthemen" className="border-t border-tinte lg:col-span-9">
            {TOPIC_HUBS.map((hub) => (
              <li key={hub.id} className="border-b border-fuge">
                <Link
                  href={hub.path}
                  data-motion="zustand"
                  className="group flex min-h-12 items-center gap-4 px-3 py-3 pointer-fine:hover:bg-kalk active:bg-kalk"
                >
                  <span className="flex min-w-0 flex-1 flex-col gap-1 md:flex-row md:items-baseline md:gap-6">
                    <span className={clsx('font-text text-fs-3 font-semibold text-tinte md:w-1/3 md:shrink-0', UNTERSTRICH)}>
                      {hub.name}
                    </span>
                    <span className="font-mono text-fs-1 text-tinte-2">
                      {hub.pages.length} Seiten &middot; {hub.description}
                    </span>
                  </span>
                  <span aria-hidden="true" className="flex shrink-0 text-strich">
                    <Icon name="pfeil-rechts" groesse={5} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
