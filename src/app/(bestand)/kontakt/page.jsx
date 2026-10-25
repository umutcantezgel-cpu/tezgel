// Kontakt (E3-BAU-09, KERN v3.6, Zusatz E3-BAU-K016): Arbeitsseite auf der Vorlage ArbeitsSeite. Inhalt und Metadaten stehen
// als Daten in `src/inhalte/kontakt.ts`; die Seite setzt je Abschnitt die Funktionen des Bestands (Formular, Karte, Kalender,
// Kontaktkarte) mit ihren Kennungen und Ankern. Hauptweg ist die Anfrage des Bestands (#express-anfrage, Abnahme E3-BAU-09). Strukturierte Daten (JsonLd) stehen im Layout
// `src/app/(bestand)/kontakt/layout.tsx` und bleiben dort.
import dynamic from 'next/dynamic';
import ArbeitsSeite from '@/components/vorlagen/ArbeitsSeite';
import { Schritte } from '@/components/vorlagen/teile/Ablauf';
import TezgelAnfrageFunnel from '@/components/funnels/TezgelAnfrageFunnel';
import DirectContactCard from '@/components/contact/DirectContactCard';
import Bildfeld from '@/components/kern/Bildfeld';
import Textmarken from '@/components/kern/Textmarken';
import { createMetadata } from '@/lib/metadata';
import { KONTAKT } from '@/inhalte/kontakt';

// Karte mit Ortsliste und Terminwahl nachgeladen wie im Bestand (E4-NACH-17, E3-NACH-07); der Platzhalter vor der
// Einwilligung wird weiter auf dem Server gerendert
const ContactPremiumMap = dynamic(() => import('@/components/maps/ContactPremiumMap'));
const BookingCalendar = dynamic(() => import('@/components/contact/BookingCalendar'));

export const metadata = createMetadata({
  title: KONTAKT.meta.titel,
  description: KONTAKT.meta.beschreibung,
  path: '/kontakt',
});

// Inhalte der Abschnitte: die Funktionen des Bestands, je Kennung des Abschnitts. Werkzeuge allein und mittig in der
// Lesebreite, alles untereinander (K-016); Karte mit Ortsliste untereinander (ContactPremiumMap, ab jetzt auf jeder Breite).
const INHALT = {
  // Hauptweg: die Anfrage des Bestands (TezgelAnfrageFunnel, Kennung `express-anfrage`; Pflichtfelder und Empfänger
  // unverändert, G8). Abnahme: kein zweites Formular daneben oder davor (HeroContactForm gab es hier im Bestand nicht).
  'express-anfrage': (
    <div className="mx-auto max-w-mass">
      <TezgelAnfrageFunnel />
    </div>
  ),
  // Kontaktwege mit Firmendaten (Bestand: DirectContactCard, Öffnungszeiten aus den Tageswerten, M-03) und das Bild
  'andere-wege': (
    <div className="mx-auto max-w-mass">
      <DirectContactCard />
      <div className="mt-12">
        <Bildfeld arbeit={KONTAKT.bild} spalten="halb" />
      </div>
    </div>
  ),
  // Karte hinter der Einwilligung (Bestand: ContactPremiumMap, Kennung `standort-anfahrt`). Der regionale Kontakt
  // (LocationContact) entfällt hier: Anruf und WhatsApp stehen schon in den Kontaktwegen darüber (Zusatz 6.5).
  'standort-anfahrt': (
    <div className="mx-auto max-w-mass">
      <ContactPremiumMap />
    </div>
  ),
  // Terminwahl (Bestand: BookingCalendar, Kennung `termin-buchen`)
  'termin-buchen': <BookingCalendar initialServiceType="Kostenfreies Vor-Ort-Aufmaß & Schadensanalyse" />,
  // So läuft es ab: drei Schritte und der Absatz zu Staub und Ansprechpartner
  'was-nach-anfrage': (
    <>
      <Schritte schritte={KONTAKT.ablauf.schritte} />
      <div className="mx-auto mt-12 max-w-mass text-fs-3 text-tinte-2">
        <p>
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
      ort={KONTAKT.ort}
      vorspann={KONTAKT.vorspann}
      hauptziel={KONTAKT.hauptziel}
      abschnitte={KONTAKT.abschnitte.map((a) => ({ ...a, inhalt: INHALT[a.id] }))}
    />
  );
}
