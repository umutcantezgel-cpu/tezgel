// Ratgeber-Übersicht `/blog` (S-03, KERN v2 Arbeitsansicht nach `/kontakt`): kompakter Einstieg und Qualitätsversprechen
// auf dem Server; Suche, Themen, Hervorhebung, Beitragsraster, Leerzustand und Seitenleiste als eine Client-Insel
// (`BlogListe`, Logik aus `useBlogListe`). Metadaten und JSON-LD stehen unverändert in `layout.tsx` (mit ContentProvider).
// Wortlaut, Link-Ziele und Test-Selektoren wie im Bestand; kein großer Moment, keine Laserachse (Arbeitsansicht).
// Die Norm im Vorspann steht in Mono wie auf der Startseite (K-006: Normen in Mono), der Text bleibt gleich.
import Einstieg from '@/components/kern/Einstieg';
import Knopf from '@/components/kern/Knopf';
import BlogListe from '@/components/blog/BlogListe';
import QualityPromise from '@/components/sections/QualityPromise';
import { COMPANY_DATA } from '@/config/company';

export default function BlogPage() {
  return (
    <>
      <Einstieg
        art="arbeit"
        etikett={<>Ratgeber &amp; Fachwissen</>}
        titel={<>Fliesen-Ratgeber &amp; Badsanierung Tipps</>}
        vorspann={
          <p>
            Praxisnaher Fliesen-Ratgeber mit wertvollen Tipps rund um Badsanierung, Fliesenverlegung und <span className="whitespace-nowrap font-mono text-fs-3">DIN 18534</span> Verbundabdichtung – von Ihrem Fachbetrieb {COMPANY_DATA.legalName} aus {COMPANY_DATA.headquarters.city}.
          </p>
        }
        aktionen={
          <>
            <Knopf href="/kontakt" icon="pfeil-rechts">Projekt unverbindlich anfragen</Knopf>
            <Knopf href="/faq" variante="neben">Häufige Fragen</Knopf>
          </>
        }
      />

      <BlogListe />

      <QualityPromise />
    </>
  );
}
