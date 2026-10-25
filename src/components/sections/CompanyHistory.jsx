// Über uns · Unternehmensgeschichte (KERN v2, S-02; Kopf mittig nach K-016): Serverkomponente ohne Bewegungsbibliothek und ohne Fremd-Icons;
// nur auf /ueber-uns eingebunden. Kopf wie `Abschnitt` (Mono-Etikett mit Fugenkreuz, H2 `company-history-heading`, Einleitung).
// Zeitleiste als ruhige Fuge: eine durchgehende Linie in Strich (`fugenband-linie`), mobil links, ab md bei einem Viertel
// der Breite; je Eintrag eine Jahresmarke mit Fugenkreuz auf der Linie (`fugenband-marke`), das Jahr in Mono links der
// Linie, Titel (H3) und Text rechts. Kein Wechsel links/rechts – einspaltig an der Linie bleibt es ruhig.
// Die scroll-gebundene Bewegung „Fugenband“ (Register `fugenband`, S-11) setzt später an Linie und Marken an; bis dahin
// trägt der Container genau einen `auftritt` (ohne JS und bei reduzierter Bewegung sofort sichtbar).
// Abschluss: das Motto als großes Zitat im Anzeigeschnitt auf einem Feld in Fliese (ohne Anführungs-Icon, nicht kursiv),
// die Quelle in Mono in Satzschreibung. Wortlaut wörtlich aus dem Bestand, Daten aus `@/config/company`.
import { COMPANY_DATA, historyTimeline } from '@/config/company';
import Abschnitt from '@/components/kern/Abschnitt';
import Fugenkreuz from '@/components/kern/Fugenkreuz';

export default function CompanyHistory() {
  const { business, headquarters, authority, owner, legalName, motto } = COMPANY_DATA;

  return (
    <Abschnitt
      titelId="company-history-heading"
      etikett={<>Gegründet {business.establishmentYear} in {headquarters.city} &middot; {authority.shortName}</>}
      titel="So sind wir gewachsen."
      mitte
      einleitung={
        <p>
          Von der Betriebsgründung in {headquarters.city} bis zum Fliesenfachbetrieb für ganz Mittelhessen: So hat sich {legalName} unter {owner.fullName} entwickelt.
        </p>
      }
      auftritt
      className="wrap-break-word"
    >
      <div className="relative">
        {/* Die Fuge: eine Linie über alle Einträge (mobil links, ab md an der Grenze Jahr | Text bei 1/4) */}
        <span aria-hidden="true" className="fugenband-linie pointer-events-none absolute inset-y-0 left-2 border-l border-strich md:left-1/4" />

        <ol className="relative">
          {historyTimeline.map((eintrag) => (
            <li key={eintrag.year} className="relative pb-12 pl-8 last:pb-0 md:grid md:grid-cols-12 md:pb-16 md:pl-0">
              {/* Jahr: mobil über dem Titel, ab md links der Linie (rechtsbündig); die Marke sitzt mittig auf der Linie */}
              <p className="relative font-mono text-fs-4 text-tinte md:col-span-3 md:self-start md:pr-8 md:text-right md:text-fs-5 lg:pr-12">
                <span
                  aria-hidden="true"
                  className="fugenband-marke absolute top-1/2 -left-6 flex -translate-x-1/2 -translate-y-1/2 text-tinte md:right-0 md:left-auto md:translate-x-1/2"
                >
                  <Fugenkreuz className="size-4" />
                </span>
                {eintrag.year}
              </p>
              <div className="mt-2 md:col-span-9 md:mt-0 md:pl-8 lg:col-span-7 lg:pl-12">
                <h3 className="text-fs-5 text-tinte">{eintrag.title}</h3>
                <p className="mt-4 max-w-mass text-fs-3 text-tinte-2">{eintrag.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Leitsatz zum Schluss: Motto mit Unterschrift (Bestand: „Final Vision Banner“) */}
      <figure className="mt-16 border border-fuge bg-fliese p-6 md:p-12 lg:mt-24">
        <blockquote className="max-w-mass font-anzeige text-fs-5 font-extrabold text-tinte lg:text-fs-6">
          &bdquo;{motto}&ldquo;
        </blockquote>
        <figcaption className="mt-6 font-mono text-fs-1 text-tinte-2">
          {owner.fullName} &middot; {owner.title}, {legalName}
        </figcaption>
      </figure>
    </Abschnitt>
  );
}
