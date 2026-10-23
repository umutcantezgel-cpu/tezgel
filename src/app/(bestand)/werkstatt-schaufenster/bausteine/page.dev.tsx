// Dev-Schaufenster (nur next dev): Referenzbausteine in ihren Zuständen.
import Einstieg from '@/components/kern/Einstieg';
import Abschnitt from '@/components/kern/Abschnitt';
import { Feldraster, Feld } from '@/components/kern/Feldraster';
import Knopf from '@/components/kern/Knopf';
import Verlegeplan from '@/components/kern/Verlegeplan';
import Icon from '@/components/icons/Icon';
import { labelKlassen, feldKlassen, hilfeKlassen, fehlerKlassen, wahlKlassen, pflichtKlassen } from '@/components/kern/stile';
import ReviewCarousel from '@/components/reviews/ReviewCarousel';
import FAQAccordion from '@/components/ui/FAQAccordion';
import FinalCTA from '@/components/ui/FinalCTA';
import Fachwort from '@/components/kern/Fachwort';
import Hauptknopf from '@/components/kern/Hauptknopf';
import Brotkrumen from '@/components/kern/Brotkrumen';
import Fliesenkomposition from '@/components/kern/Fliesenkomposition';
import Seitenformel from '@/components/kern/Seitenformel';

export const metadata = { title: 'Schaufenster · Bausteine', robots: { index: false, follow: false } };

export default function Bausteine() {
  return (
    <>
      {/* KERN v3 (E2-ORCH-02): neue Bausteine in der Seitenformel */}
      <Seitenformel>
        <Abschnitt id="v3-worum" formel="worum" etikett="KERN v3" titel="Wir verlegen Fliesen in Bad, Küche, Flur und auf dem Balkon.">
          <Brotkrumen wege={[{ name: 'Start', href: '/' }, { name: 'Bad', href: '/bad' }, { name: 'Dusche statt Wanne' }]} />
          <p className="mt-6 max-w-mass text-fs-4">
            Unter die Fliesen kommt eine <Fachwort id="abdichtung">Abdichtung</Fachwort> nach <Fachwort id="din-18534" />. So bleibt das Wasser in der Dusche.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Hauptknopf erstesBild />
            <Knopf href="tel:+4964414483567" variante="neben" iconLinks="telefon">Anrufen: 06441 / 44 83 567</Knopf>
          </div>
        </Abschnitt>
        <Abschnitt id="v3-komposition" formel="beleg" titel="Fliesenkompositionen für Plätze ohne Foto" flaeche="fliese">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-5">
            {(['drittelverband', 'halbverband', 'kreuzfuge', 'riss', 'fischgraet'] as const).map((m) => (
              <figure key={m}>
                <Fliesenkomposition motiv={m} format="4:5" />
                <figcaption className="mt-2 font-mono text-fs-1 text-tinte-2">{m}</figcaption>
              </figure>
            ))}
          </div>
        </Abschnitt>
      </Seitenformel>
      <Einstieg
        etikett="Handwerkskammer-eingetragener Fachbetrieb · seit 2008"
        titel={<>Perfektion auf jedem Quadratmeter.</>}
        unterzeile="Fliesenverlegung & Badsanierung aus Aßlar"
        vorspann={<p>Fugenarme XXL-Großformatfliesen, barrierefreie Walk-in-Duschen, repräsentative Wohnbereiche und frostsichere Terrassen.</p>}
        aktionen={<><Knopf href="/kontakt" icon="pfeil-rechts">Aufmaß vor Ort anfragen</Knopf><Knopf href="tel:+4964414483567" variante="neben" iconLinks="telefon">06441 / 44 83 567</Knopf></>}
        rand={<div className="border border-fuge bg-fliese p-6"><Verlegeplan plan="bad" interaktiv beschriftet /></div>}
      />
      <Abschnitt id="sf-feld" nummer="01" etikett="Fachgewerke" titel="Feldraster an der Fuge" einleitung={<p>Felder ohne Zwischenraum, getrennt durch 1-px-Fugen.</p>}>
        <Feldraster spalten={3}>
          {(['bad', 'grossformat', 'balkon'] as const).map((p) => (
            <Feld key={p}>
              <Verlegeplan plan={p} bemassung={false} />
              <h3 className="mt-6 text-fs-5">{p}</h3>
              <p className="mt-2 text-fs-3 text-tinte-2">Kurzer Text zum Gewerk.</p>
            </Feld>
          ))}
        </Feldraster>
      </Abschnitt>
      <Abschnitt id="sf-knopf" nummer="02" etikett="Zustände" titel="Knöpfe und Felder" flaeche="fliese" kopf="seitlich">
        <div className="flex flex-wrap gap-3">
          <Knopf>Hauptknopf</Knopf>
          <Knopf variante="neben">Nebenknopf</Knopf>
          <Knopf deaktiviert>Deaktiviert</Knopf>
          <Knopf laedt>Absenden</Knopf>
          <Knopf href="/kontakt" variante="text" icon="pfeil-rechts">Textlink</Knopf>
        </div>
        <div className="mt-12 grid max-w-mass gap-6">
          <div>
            <label htmlFor="sf-name" className={labelKlassen}>Ihr Name<span className={pflichtKlassen} aria-hidden="true">*</span></label>
            <input id="sf-name" className={feldKlassen} placeholder="Vor- und Nachname" />
            <p className={hilfeKlassen}>Damit Herr Tezgel Sie ansprechen kann.</p>
          </div>
          <div>
            <label htmlFor="sf-tel" className={labelKlassen}>Telefonnummer</label>
            <input id="sf-tel" className={feldKlassen} aria-invalid="true" defaultValue="0644" />
            <p className={fehlerKlassen} role="alert"><Icon name="aufmass" groesse={4} className="mt-1" />Bitte geben Sie eine vollständige Telefonnummer an.</p>
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Vorhaben">
            <button type="button" className={wahlKlassen} aria-pressed="true">Badsanierung</button>
            <button type="button" className={wahlKlassen} aria-pressed="false">Fliesenverlegung</button>
          </div>
        </div>
      </Abschnitt>
      <Abschnitt id="sf-stimmen" nummer="03" etikett="Echte Kundenstimmen" titel="Kundenstimmen mit Anriss">
        <ReviewCarousel />
      </Abschnitt>
      <Abschnitt id="sf-faq" nummer="04" etikett="Antworten" titel="FAQ" breite="mass">
        <FAQAccordion question="Was kostet eine professionelle Fliesenverlegung?" answer="Die Kosten richten sich nach Format, Material und Untergrund." />
        <FAQAccordion question="Wie schnell erhalten wir einen Termin?" answer="In der Regel binnen 24 bis 48 Stunden." />
      </Abschnitt>
      <FinalCTA />
    </>
  );
}
