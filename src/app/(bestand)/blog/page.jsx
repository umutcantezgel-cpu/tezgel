// Ratgeber-Liste /blog (E3-BAU-09, Arbeitsansicht): Server-Komponente. Kopf (Einstieg) und Abschnitt sind Bausteine
// der Kern-Schicht; Suche, Kategorien und Liste liegen in der Filter-Insel BlogFilter (Client). Texte wortgleich zum Bestand.
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
            Praxisnaher Fliesen-Ratgeber mit wertvollen Tipps rund um Badsanierung, Fliesenverlegung und DIN 18534 Verbundabdichtung – von Ihrem Fachbetrieb {COMPANY_DATA.legalName} aus {COMPANY_DATA.headquarters.city}.
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

      <QualityPromise />
    </>
  );
}
