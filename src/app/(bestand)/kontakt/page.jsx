// Kontakt (E3-BAU-09, KERN v3.6, Zusatz E3-BAU-K016): Arbeitsseite auf der Vorlage ArbeitsSeite. Inhalt und Metadaten stehen
// als Daten in `src/inhalte/kontakt.ts`; die Seite setzt je Abschnitt die Funktionen des Bestands (Formular, Kontaktkarte) und
// die gezeichnete Einsatzkarte mit ihren Kennungen und Ankern (E4-W0-KONTAKT, E-062: drei Gedanken und der Ablauf; Kalender nur
// noch auf `/termin`, Google-Karte mit Ortsliste nur noch auf `/standorte`). Hauptweg ist die Anfrage des Bestands (#express-anfrage, Abnahme E3-BAU-09). Strukturierte Daten (JsonLd) stehen im Layout
// `src/app/(bestand)/kontakt/layout.tsx` und bleiben dort.
// Formular im ersten Bildschirm (UM-E4-SICHT-FIX M-C5): H1 in zwei Satzzeilen, das Formular folgt direkt auf Hauptknopf und Anruf
// (Abschnitt dicht und ohne sichtbaren Kopf, die H2 bleibt für Hilfsmittel); Einleitung des Abschnitts und Vorspann stehen
// darunter in der kleinen Stufe (Texte gleich, Nacharbeit SF-C2); die Einsatzkarte füllt den Kasten
// (Namen außerhalb der Ringe, Ringmaße am Rand); der Absatz unter der Treppe steht an der Flucht der Schritttexte (ab lg unter
// Stufe 02 wie der Hinweis der Vorlagen-Treppe).
import ArbeitsSeite from '@/components/vorlagen/ArbeitsSeite';
import { Schritte } from '@/components/vorlagen/teile/Ablauf';
import TezgelAnfrageFunnel from '@/components/funnels/TezgelAnfrageFunnel';
import DirectContactCard from '@/components/contact/DirectContactCard';
import Knopf from '@/components/kern/Knopf';
import WeiterLink from '@/components/kern/WeiterLink';
import Einsatzkarte from '@/components/momente/karte/Einsatzkarte';
import { COMPANY_DATA } from '@/config/company';
import Textmarken from '@/components/kern/Textmarken';
import { createMetadata } from '@/lib/metadata';
import { KONTAKT } from '@/inhalte/kontakt';

export const metadata = createMetadata({
  title: KONTAKT.meta.titel,
  description: KONTAKT.meta.beschreibung,
  path: '/kontakt',
});

// Inhalte der Abschnitte: die Funktionen des Bestands, je Kennung des Abschnitts. Werkzeuge allein und mittig in der
// Lesebreite, alles untereinander (K-016).
// Einleitung des Formularabschnitts (Daten in kontakt.ts): Der Abschnitt zeigt keinen Kopf, die Seite setzt sie unter das Formular
const EXPRESS_EINLEITUNG = KONTAKT.abschnitte.find((a) => a.id === 'express-anfrage')?.einleitung;

const INHALT = {
  // Hauptweg: die Anfrage des Bestands (TezgelAnfrageFunnel, Kennung `express-anfrage`; Pflichtfelder und Empfänger
  // unverändert, G8). Abnahme: kein zweites Formular daneben oder davor (HeroContactForm gab es hier im Bestand nicht).
  'express-anfrage': (
    <div className="mx-auto max-w-mass">
      <TezgelAnfrageFunnel />
      {/* unter dem Formular in der kleinen Stufe (M-C5 Nr. 1 und 2, Texte gleich): zuerst die Einleitung des Abschnitts (was nach dem
          Absenden passiert), dann der Vorspann der Seite als Hinweis auf Anruf und Termin; oben steht das Formular direkt nach
          Hauptknopf und Telefon. In fs-2, damit keiner der beiden Absätze als zweite Einleitung mit dem Formular konkurriert */}
      {EXPRESS_EINLEITUNG && (
        <p className="mt-6 font-text text-fs-2 text-pretty text-tinte-2">
          <Textmarken text={EXPRESS_EINLEITUNG} />
        </p>
      )}
      <p className="mt-4 font-text text-fs-2 text-pretty text-tinte-2">
        <Textmarken text={KONTAKT.vorspann} fugen />
      </p>
      {/* Der Kalender des Bestands steht seit E4-W0-KONTAKT nur auf /termin; wer lieber selbst einen Tag wählt, kommt von hier hin */}
      <p className="mt-8">
        <WeiterLink href="/termin">Freien Termin im Kalender wählen</WeiterLink>
      </p>
    </div>
  ),
  // Kontaktwege mit Firmendaten (Bestand: DirectContactCard, Öffnungszeiten aus den Tageswerten, M-03); ohne Foto (das
  // Treppenfoto hatte keinen Bezug, E3-SICHT)
  'andere-wege': (
    <div className="mx-auto max-w-mass">
      <DirectContactCard />
    </div>
  ),
  // Einsatzkarte (großer Moment `karte`) als Zeichnung ohne Ortsliste: Ringe 10 und 25 km ab Aßlar, beschriftet Wetzlar, Gießen
  // und Herborn; alle Orte stehen auf /standorte. Der Weg zum Betrieb über den Kartenlink des Bestands (wie auf /standorte),
  // ohne eingebettete Karte und ohne Einwilligung.
  'standort-anfahrt': (
    <div className="mx-auto max-w-mass">
      <Einsatzkarte liste={false} />
      {/* Container: bei großer Schrift greift der schmale Innenabstand der Knöpfe (kern/stile), „Route planen“ bleibt einzeilig (E-065) */}
      <div className="@container mt-8 flex flex-col items-start gap-6">
        <Knopf href={COMPANY_DATA.headquarters.mapsUrl} extern variante="neben" icon="pfeil-rechts">
          Route planen
        </Knopf>
        <WeiterLink href="/standorte">Alle Orte ansehen</WeiterLink>
      </div>
    </div>
  ),
  // So läuft es ab: drei Schritte und der Absatz zu Staub und Ansprechpartner
  'was-nach-anfrage': (
    <>
      <Schritte schritte={KONTAKT.ablauf.schritte} />
      {/* an der Flucht der Schritttexte (M-C5 Nr. 6): mobil auf der Textkante der Schritte (Lot plus Einzug), ab lg unter Stufe 02 */}
      <div className="mt-12 pl-6 text-fs-3 text-tinte-2 md:pl-4 lg:mt-24 lg:grid lg:grid-cols-3 lg:pl-0">
        <p className="max-w-mass lg:col-span-2 lg:col-start-2">
          <Textmarken text={KONTAKT.ablauf.absatz} />
        </p>
      </div>
    </>
  ),
};

export default function KontaktPage() {
  return (
    <ArbeitsSeite
      pfad={KONTAKT.pfad}
      brotkrumen={KONTAKT.brotkrumen}
      titel={KONTAKT.titel}
      titelZeilen={KONTAKT.titelZeilen}
      ort={KONTAKT.ort}
      hauptziel={KONTAKT.hauptziel}
      abschnitte={KONTAKT.abschnitte.map((a) => ({ ...a, inhalt: INHALT[a.id] }))}
    />
  );
}
