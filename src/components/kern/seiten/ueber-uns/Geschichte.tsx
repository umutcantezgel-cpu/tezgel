// Über uns · Unternehmensgeschichte (P4-08e, KERN v1.2 K-003 Nr. 3, K-007, K-010): Kern-Fassung von
// `src/components/sections/CompanyHistory.jsx` (nur auf /ueber-uns eingebunden), Anker der H2 `company-history-heading`.
// Struktur: Zeitachse statt Zickzack aus Glas-Karten. Die Jahre stehen in Mono links (ab lg Sp. 1–3, rechtsbündig an der Linie),
// Titel und Text rechts (Sp. 4–9); dazwischen ein Lot in Strich – keine zweite rote Achse (K-003 Nr. 2: die Achse der Seite ist
// die Waage im Einstieg). An jedem Jahr ein Fugenkreuz auf dem Lot, beim letzten Eintrag („Heute“) in Tinte. Mobil: Lot am
// linken Rand der Liste, Jahr über dem Titel. Das Schild-Zeichen des Bestands (ShieldCheck) entfällt: Siegel nur bei Beleg
// (Lehre 1, E-026). Die scrollgebundene Linie (framer-motion, Feder) und die Seiten-Einflüge entfallen; die Liste trägt einen
// `auftritt` (IO 20 %, K-009). Motto als Leitsatz unter der Zeitachse, Unterschrift in Mono, Satzschreibung statt Versalien (K-005).
// Kopf geteilt: H2 Sp. 1–7, Vorspann Sp. 8–12 (anders gebaut als der seitliche Kopf der Werte davor).
// Wortlaut wörtlich aus CompanyHistory, Daten aus `@/config/company` (`historyTimeline`, Single Source).
import { Fugenkreuz, verbinde } from '@/components/kern/basis';
import Abschnitt from '@/components/kern/vorlagen/teile/Abschnitt';
import { Trenner } from '@/components/kern/vorlagen/teile/Mass';
import { stufeFuerAlle, stufeNachWort } from '@/components/kern/vorlagen/teile/satz';
import { UMBRUCH } from '@/components/kern/vorlagen/teile/typen';
import { COMPANY_DATA, historyTimeline } from '@/config/company';

type Station = { year: string; title: string; description: string };

// Marke auf dem Lot: mittig über der 1-px-Linie, Kalk dahinter, damit das Kreuz klar steht.
const MARKE = 'pointer-events-none absolute flex -translate-x-1/2 bg-k-kalk';

export default function Geschichte() {
  const { business, headquarters, authority, owner, legalName, motto } = COMPANY_DATA;
  const stationen: readonly Station[] = historyTimeline;
  const titelStufe = stufeFuerAlle(stationen.map((s) => s.title), 'ablauf', 'text-k-5');
  const leitsatz = `„${motto}“`;
  return (
    <Abschnitt
      titelId="company-history-heading"
      etikett={
        <>
          <span>
            Gegründet {business.establishmentYear} in {headquarters.city}
          </span>
          <Trenner />
          <span>{authority.shortName}</span>
        </>
      }
      titel="Unsere Unternehmensgeschichte"
      einleitung={`Von der Betriebsgründung in ${headquarters.city} bis zum Fliesen-Fachbetrieb für ganz Mittelhessen: So hat sich ${legalName} unter ${owner.fullName} entwickelt.`}
      kopfLage="geteilt"
      flaeche="kalk"
      dichte="weit"
      auftritt
    >
      <ol className="ml-k-4 border-l border-k-strich lg:ml-0 lg:border-l-0">
        {stationen.map((station, i) => {
          const letzte = i === stationen.length - 1;
          return (
            <li key={station.year} className="relative min-w-0 pb-k-7 pl-k-7 last:pb-0 lg:grid lg:grid-cols-12 lg:pb-0 lg:pl-0">
              {/* Fugenkreuz auf dem Lot (dekorativ, mittig zur ersten Zeile des Jahres): mobil am Lot der Liste … */}
              <span aria-hidden="true" className={verbinde(MARKE, 'left-0 top-k-2 lg:hidden', letzte ? 'text-k-tinte' : 'text-k-strich')}>
                <Fugenkreuz className="size-k-4" />
              </span>
              {/* Jahr: ab lg links an der Linie, rechtsbündig; mobil über dem Titel */}
              <p className="k-mono text-k-5 text-k-tinte lg:col-span-3 lg:pr-k-7 lg:text-right">{station.year}</p>
              <div className={verbinde('relative mt-k-3 min-w-0 lg:col-span-6 lg:mt-0 lg:border-l lg:border-k-strich lg:pl-k-7', letzte ? 'lg:pb-0' : 'lg:pb-k-9')}>
                {/* … ab lg am Lot dieser Spalte */}
                <span aria-hidden="true" className={verbinde(MARKE, 'top-k-3 left-0 hidden lg:flex', letzte ? 'text-k-tinte' : 'text-k-strich')}>
                  <Fugenkreuz className="size-k-4" />
                </span>
                <h3 className={verbinde('k-anzeige text-k-tinte', titelStufe, UMBRUCH)}>{station.title}</h3>
                <p className={verbinde('mt-k-3 max-w-(--k-mass) k-text text-k-3 text-k-tinte-2', UMBRUCH)}>{station.description}</p>
              </div>
            </li>
          );
        })}
      </ol>

      {/* Leitsatz: Motto mit Unterschrift (Bestand: „Final Vision Banner“) */}
      <figure className="mt-k-9 border-t border-k-strich pt-k-6 lg:grid lg:grid-cols-12">
        <blockquote className={verbinde('k-anzeige text-k-tinte lg:col-span-9', stufeNachWort(leitsatz, 'abschnitt', 'text-k-5'), UMBRUCH)}>
          &bdquo;{motto}&ldquo;
        </blockquote>
        <figcaption className={verbinde('mt-k-4 k-mono text-k-1 text-k-tinte-2 lg:col-span-9 lg:row-start-2', UMBRUCH)}>
          <span>{owner.fullName}</span>
          <Trenner />
          <span>
            {owner.title}, {legalName}
          </span>
        </figcaption>
      </figure>
    </Abschnitt>
  );
}
