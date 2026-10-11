// Unternehmensgeschichte als Fugenband (KERN K-007 fugenband, E3-ORCH-05): die Jahre stehen an einer Fuge, ein Lot
// läuft links an den Jahren entlang, sein rotes Stück wächst mit dem Scrollen durch das Band (view-timeline, CSS in
// bewegung.css). Ohne animation-timeline, ohne JavaScript oder bei reduzierter Bewegung steht das Lot fertig.
// Serverkomponente – framer-motion, Leuchtflächen, Glasflächen und Hover-Versatz entfallen (E-005, E-010).
// Wortlaut und Lesefolge wie im Bestand; Daten aus `@/config/company` (historyTimeline, Motto, Inhaber).
import { COMPANY_DATA, historyTimeline } from '@/config/company';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import { etikettKlassen, seitenKlassen } from '@/components/kern/stile';

export default function CompanyHistory() {
    const { business, headquarters, authority, owner, legalName, motto } = COMPANY_DATA;

    return (
        <section className="py-16 lg:py-24" aria-labelledby="company-history-heading">
            <div className={seitenKlassen}>
                <div className="max-w-mass">
                    <span className={etikettKlassen}>
                        <Fugenkreuz className="size-3 shrink-0 text-strich" />
                        Gegründet {business.establishmentYear} in {headquarters.city} &middot; {authority.shortName}
                    </span>
                    <h2 id="company-history-heading" className="mt-4 text-fs-6 text-tinte">
                        Unsere Unternehmensgeschichte
                    </h2>
                    <p className="mt-6 text-fs-4 text-tinte-2">
                        Von der Betriebsgründung in {headquarters.city} bis zum Fliesen-Fachbetrieb für ganz Mittelhessen: So hat sich {legalName} unter {owner.fullName} entwickelt.
                    </p>
                </div>

                {/* Fugenband: Lot links (Grundschicht Fuge, rotes Stück folgt dem Scrollen), je Jahr eine Zeile an der Fuge */}
                <div className="fugenband relative mt-16" data-motion="fugenband">
                    <div aria-hidden="true" className="fugenband-linie">
                        <span className="fugenband-rot" />
                    </div>
                    <ol className="border-t border-fuge">
                        {historyTimeline.map((item) => (
                            <li key={item.year} className="relative grid grid-cols-4 gap-x-6 gap-y-2 border-b border-fuge py-8 pl-8 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-8 lg:py-12 lg:pl-12">
                                <Fugenkreuz className="absolute left-0 top-8 size-3 -translate-x-1/2 text-tinte lg:top-12" />
                                <p className="col-span-4 font-mono text-fs-5 text-tinte tabular-nums md:col-span-2 lg:col-span-2">{item.year}</p>
                                <div className="col-span-4 md:col-span-6 lg:col-span-7">
                                    <h3 className="font-anzeige text-fs-5 text-tinte">{item.title}</h3>
                                    <p className="mt-2 max-w-mass text-fs-3 text-tinte-2">{item.description}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>

                {/* Leitsatz des Inhabers wie im Einstieg der Startseite: Linie in Tinte, Zitat, Herkunft in Mono */}
                <figure className="mt-16 max-w-mass border-l-2 border-tinte pl-6">
                    <blockquote className="text-fs-5 text-tinte">&bdquo;{motto}&ldquo;</blockquote>
                    <figcaption className="mt-3 font-mono text-fs-1 text-tinte-2">
                        {owner.fullName} &middot; {owner.title}, {legalName}
                    </figcaption>
                </figure>
            </div>
        </section>
    );
}
