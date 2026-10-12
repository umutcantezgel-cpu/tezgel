// Ratgeber-Liste /blog (E3-BAU-09, Arbeitsansicht; Fusion E-039 F-03): Server-Komponente. Kopf (Einstieg) und Abschnitt
// sind Bausteine der Kern-Schicht; Suche, Kategorien und Liste liegen in der Filter-Insel BlogFilter (Client). Texte
// wortgleich zum Bestand; die Norm im Vorspann steht in Mono (K-003 Nr. 3, aus B), der Wortlaut bleibt gleich.
import Einstieg from '@/components/kern/Einstieg';
import Abschnitt from '@/components/kern/Abschnitt';
import Knopf from '@/components/kern/Knopf';
import BlogFilter from '@/components/blog/BlogFilter';
import QualityPromise from '@/components/sections/QualityPromise';
import { COMPANY_DATA } from '@/config/company';

export default function BlogPage() {
  return (
    <>
      <Einstieg
        art="arbeit"
        etikett={<>Ratgeber &amp; Fachwissen</>}
        titel={<>Fliesen-Ratgeber &amp; <span>Badsanierung Tipps</span></>}
        vorspann={
          <p>
            Praxisnaher Fliesen-Ratgeber mit wertvollen Tipps rund um Badsanierung, Fliesenverlegung und <span className="whitespace-nowrap font-mono text-fs-2 sm:text-fs-3">DIN 18534</span> Verbundabdichtung – von Ihrem Fachbetrieb {COMPANY_DATA.legalName} aus {COMPANY_DATA.headquarters.city}.
          </p>
        }
        aktionen={
          <>
            <Knopf href="/kontakt" icon="pfeil-rechts">Projekt unverbindlich anfragen</Knopf>
            <Knopf href="/faq" variante="neben">Häufige Fragen</Knopf>
          </>
        }
      />

      <Abschnitt art="arbeit">
        <BlogFilter />
      </Abschnitt>

      <QualityPromise art="arbeit" />
    </>
  );
}
