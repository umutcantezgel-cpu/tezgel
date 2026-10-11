// Startseite · Fachbereiche (P3-10, KERN v1.2): „Alles für Ihr Vorhaben auf über 100 Fachseiten“, Anker #portal-netzwerk.
// Struktur: Planblatt-Verzeichnis statt vier gleicher Karten mit Icon-Kachel (K-003 Prinzip 5, S-04/S-11). Ein Blatt
// auf Fliese mit Blattkante in Tinte, vier Spalten (Tablett zwei, mobil untereinander), getrennt nur durch Fugen.
// Ab Tablett liegen die Spalten auf einem gemeinsamen Zeilenraster (subgrid): Feldkopf, Titel, Text, Verweis und
// Linkliste fluchten über alle vier Bereiche (K-001). Linklisten als dichte Textzeilen mit Fugen; lange Listen
// (Standorte) als umbrechende Mono-Etiketten im Verband (K-007: Halbverband für Listen), Trefferfläche je Zeile 48 px.
// Darunter das Register „Fachthemen im Detail“: Name, daneben Seitenzahl und Beschreibung in Mono.
// Lesereihenfolge = Quelltextreihenfolge auf allen Breiten (WCAG 2.4.3): der Verweis des Bereichs steht vor der Liste,
// mobil also vor bis zu 14 Orten (eigene Reihenfolge gegenüber dem Bestand, dort am Ende).
// Kein Rot, kein Auftritt (K-009: Scroll-Auftritte auf höchstens der Hälfte der Abschnitte), kein 'use client'.
// Inhalt: `PORTAL_HUBS` (Kopie, `@/lib/kern/start/daten`), `TOPIC_HUBS` aus `@/config/topics`; Überschriften wörtlich.
import Link from 'next/link';
import { TOPIC_HUBS } from '@/config/topics';
import Etikett from '@/components/kern/basis/Etikett';
import Icon from '@/components/kern/icons/Icon';
import { fokus, verbinde } from '@/components/kern/basis/klassen';
import { LANGE_LISTE_AB, PORTAL_HUBS, type PortalLink } from '@/lib/kern/start/daten';

// Zustände (K-011, Register `zustand`): Hover nur bei feinem Zeiger, :active für Touch, Fokus 2 px Tinte.
const ZEILE = verbinde(
  'group flex min-h-k-7 items-center justify-between gap-k-3 px-k-5 py-k-2 k-text text-k-2 text-k-tinte',
  'pointer-fine:hover:bg-k-kalk active:bg-k-kalk',
  fokus(),
);
const ZEILE_TEXT = 'decoration-1 underline-offset-4 decoration-k-tinte pointer-fine:group-hover:underline group-active:underline';
// Fokus über den Nachbar-Etiketten malen: Flex-Elemente malen atomar, sonst deckt das nächste `li` den Ring ab (P3-16a).
const ETIKETT_LINK = verbinde(
  'group flex min-h-k-7 items-center justify-center px-k-3 py-k-2 k-mono text-k-1 text-k-tinte',
  'pointer-fine:hover:bg-k-kalk active:bg-k-kalk',
  fokus(),
  'focus-visible:relative focus-visible:z-10',
);

function Linkliste({ links }: { links: PortalLink[] }) {
  if (links.length >= LANGE_LISTE_AB) {
    // Verband: Etiketten wachsen bis zum Zeilenende, die Fugen entstehen aus dem 1-px-Abstand auf Fugengrund.
    return (
      <ul className="flex flex-wrap gap-px border-t border-k-fuge bg-k-fuge">
        {links.map((link) => (
          <li key={link.href} className="grow bg-k-fliese">
            <Link href={link.href} data-motion="zustand" className={ETIKETT_LINK}>
              <span className={ZEILE_TEXT}>{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <ul className="divide-y divide-k-fuge border-t border-k-fuge">
      {links.map((link) => (
        <li key={link.href}>
          <Link href={link.href} data-motion="zustand" className={ZEILE}>
            <span className={ZEILE_TEXT}>{link.label}</span>
            <span aria-hidden="true" className="flex shrink-0 text-k-strich">
              <Icon name="winkel" groesse={16} />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function Fachbereiche() {
  return (
    <section id="portal-netzwerk" aria-labelledby="portal-heading" className="py-k-9 lg:py-k-10">
      <div className="mx-auto max-w-(--k-seite) px-(--k-rand)">
        <div className="grid gap-k-5 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Etikett kreuz>Fachbereiche &amp; Planungshilfen</Etikett>
            <h2 id="portal-heading" className="mt-k-4 k-anzeige text-k-6 text-k-tinte">
              Alles für Ihr Vorhaben auf über 100 Fachseiten
            </h2>
          </div>
          <p className="max-w-(--k-mass) k-text text-k-3 text-k-tinte-2 lg:col-span-5">
            Von der schlüsselfertigen Badsanierung über nützliche Planungshilfen bis zu den Standorten in Hessen – wählen Sie Ihren Themenbereich.
          </p>
        </div>

        {/* Planblatt: Blattkante oben in Tinte, Spalten durch Fugen getrennt */}
        <div className="mt-k-8 grid border-t border-k-fuge border-t-k-tinte bg-k-fliese md:grid-cols-2 md:border-l lg:grid-cols-4">
          {PORTAL_HUBS.map((hub, i) => (
            <article
              key={hub.eyebrow}
              aria-labelledby={`portal-bereich-${i}`}
              className="flex flex-col border-b border-k-fuge md:row-span-5 md:grid md:grid-rows-subgrid md:border-r"
            >
              <div className="border-b border-k-fuge px-k-5 py-k-3">
                <Etikett ton="tinte">{hub.eyebrow}</Etikett>
              </div>
              <h3 id={`portal-bereich-${i}`} className="px-k-5 pt-k-5 k-anzeige text-k-4 text-k-tinte">
                {hub.title}
              </h3>
              <p className="px-k-5 pt-k-3 k-text text-k-2 text-k-tinte-2">{hub.text}</p>
              <div className="px-k-5 pt-k-2 pb-k-4">
                <Link
                  href={hub.cta.href}
                  data-motion="zustand"
                  className={verbinde('group inline-flex min-h-k-7 items-center gap-k-2 rounded-k-1 k-text text-k-2 font-semibold text-k-tinte', fokus())}
                >
                  <span className="underline decoration-1 underline-offset-4 decoration-k-strich pointer-fine:group-hover:decoration-2 pointer-fine:group-hover:decoration-k-tinte group-active:decoration-2 group-active:decoration-k-tinte">
                    {hub.cta.label}
                  </span>
                  <span aria-hidden="true" className="flex shrink-0">
                    <Icon name="pfeil" groesse={20} />
                  </span>
                </Link>
              </div>
              <Linkliste links={hub.links} />
            </article>
          ))}
        </div>

        {/* Register: eine Zeile je Fachthema, Name links, Umfang in Mono daneben */}
        <div className="mt-k-8 grid gap-k-4 lg:grid-cols-12 lg:gap-0">
          <Etikett als="p" id="portal-fachthemen" kreuz className="lg:col-span-3 lg:pt-k-4">
            Fachthemen im Detail
          </Etikett>
          <ul aria-labelledby="portal-fachthemen" className="border-t border-k-tinte lg:col-span-9">
            {TOPIC_HUBS.map((hub) => (
              <li key={hub.id} className="border-b border-k-fuge">
                <Link
                  href={hub.path}
                  data-motion="zustand"
                  className={verbinde('group flex min-h-k-7 items-center gap-k-4 px-k-3 py-k-3 pointer-fine:hover:bg-k-fliese active:bg-k-fliese', fokus())}
                >
                  <span className="flex min-w-0 flex-1 flex-col gap-k-1 md:flex-row md:items-baseline md:gap-k-5">
                    <span className={verbinde('k-text text-k-3 font-semibold text-k-tinte md:w-1/3 md:shrink-0', ZEILE_TEXT)}>{hub.name}</span>
                    <span className="k-mono text-k-1 text-k-tinte-2">
                      {hub.pages.length} Seiten &middot; {hub.description}
                    </span>
                  </span>
                  <span aria-hidden="true" className="flex shrink-0 text-k-strich">
                    <Icon name="pfeil" groesse={20} />
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
