// Dev-Schaufenster (nur next dev): Schrittfolge senkrecht und waagrecht, RatgeberListe und Hinweis in allen Arten.
import Einstieg from '@/components/kern/Einstieg';
import Abschnitt from '@/components/kern/Abschnitt';
import Schrittfolge from '@/components/kern/Schrittfolge';
import RatgeberListe from '@/components/kern/RatgeberListe';
import Hinweis from '@/components/kern/Hinweis';
import { processSteps } from '@/config/company';
import { posts } from '@/config/posts';
import { categories } from '@/config/blog';

export const metadata = { title: 'Schaufenster · Schritte', robots: { index: false, follow: false } };

const schritte = processSteps.map((s) => ({ nummer: s.step, titel: s.title, untertitel: s.subtitle, text: s.description }));

const artikel = posts.slice(0, 5).map((p) => ({
  href: `/blog/${p.slug}`,
  titel: p.title,
  anriss: p.excerpt,
  kategorie: categories.find((c) => c.id === p.category)?.name,
  datum: p.date,
  lesezeit: p.readTime,
}));

export default function Schritte() {
  return (
    <>
      <Einstieg art="arbeit" etikett="Schaufenster · nur Entwicklung" titel="Schritte, Ratgeber, Hinweise" />
      <Abschnitt
        id="sf-schritte"
        nummer="01"
        etikett="Ablauf"
        titel="Schrittfolge senkrecht"
        einleitung={<p>Lot aus 1-px-Fuge mit einem Fugenkreuz je Schritt.</p>}
      >
        <Schrittfolge schritte={schritte} />
      </Abschnitt>
      <Abschnitt
        id="sf-schritte-waagrecht"
        nummer="02"
        etikett="Ablauf"
        titel="Schrittfolge waagrecht"
        einleitung={<p>Ab lg Felder an der Fuge in einer Reihe. Mobil fällt die Folge auf senkrecht zurück.</p>}
      >
        <Schrittfolge schritte={schritte} ausrichtung="waagrecht" />
      </Abschnitt>
      <Abschnitt
        id="sf-ratgeber"
        nummer="03"
        etikett="Ratgeber"
        titel="Artikelliste an der Fuge"
        einleitung={<p>Die ersten fünf Artikel, als Zeilen statt Karten.</p>}
      >
        <RatgeberListe artikel={artikel} />
      </Abschnitt>
      <Abschnitt
        id="sf-hinweise"
        nummer="04"
        etikett="Hinweise"
        titel="Hinweis in vier Arten"
        einleitung={<p>Je Art einmal mit Titel und einmal ohne.</p>}
      >
        <div className="grid gap-6 md:grid-cols-2">
          <Hinweis art="merk" titel="Beispiel: Merkhinweis">Beispiel: Die Ebenheit wird vor dem Aufmaß geprüft.</Hinweis>
          <Hinweis art="merk">Beispiel: Bei bodengleichen Duschen wird das Gefälle vorab festgelegt.</Hinweis>
          <Hinweis art="warn" titel="Beispiel: Warnhinweis">Beispiel: Ein feuchter Untergrund wird nicht belegt.</Hinweis>
          <Hinweis art="warn">Beispiel: Ohne Abdichtung kann Feuchte hinter die Fliesen gelangen.</Hinweis>
          <Hinweis art="fehler" titel="Beispiel: Fehlerhinweis">Beispiel: Die Telefonnummer ist unvollständig.</Hinweis>
          <Hinweis art="fehler">Beispiel: Die Plattenkante liegt außerhalb der Toleranz.</Hinweis>
          <Hinweis art="erfolg" titel="Beispiel: Erfolgshinweis">Beispiel: Die Abnahme ist erfolgt.</Hinweis>
          <Hinweis art="erfolg">Beispiel: Der Termin ist eingetragen.</Hinweis>
        </div>
      </Abschnitt>
    </>
  );
}
