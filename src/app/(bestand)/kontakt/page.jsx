// Kontakt (E3-BAU-09, KERN v3.6, Zusatz E3-BAU-K016): Arbeitsseite auf der Vorlage ArbeitsSeite. Inhalt und Metadaten stehen
// als Daten in `src/inhalte/kontakt.ts`; die Seite setzt je Abschnitt die Funktionen des Bestands (Formular, Karte, Kalender,
// Anfrage, Kontaktkarte, regionaler Kontakt) mit ihren Kennungen und Ankern. Strukturierte Daten (JsonLd) stehen im Layout
// `src/app/(bestand)/kontakt/layout.tsx` und bleiben dort.
import dynamic from 'next/dynamic';
import ArbeitsSeite from '@/components/vorlagen/ArbeitsSeite';
import { Oeffnungszeiten } from '@/components/vorlagen/teile/Schritt';
import { Bereichszeilen } from '@/components/vorlagen/teile/Tun';
import { Schritte } from '@/components/vorlagen/teile/Ablauf';
import TezgelAnfrageFunnel from '@/components/funnels/TezgelAnfrageFunnel';
import HeroContactForm from '@/components/forms/HeroContactForm';
import DirectContactCard from '@/components/contact/DirectContactCard';
import LocationContact from '@/components/locations/LocationContact';
import Bildfeld from '@/components/kern/Bildfeld';
import Knopf from '@/components/kern/Knopf';
import Rufnummer from '@/components/kern/Rufnummer';
import Textmarken from '@/components/kern/Textmarken';
import WhatsAppLogo from '@/components/ui/WhatsAppLogo';
import { COMPANY_DATA } from '@/config/company';
import { buildWhatsAppUrl, kontextNachricht } from '@/lib/whatsapp';
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

// Inhalte der Abschnitte: die Funktionen des Bestands, je Kennung des Abschnitts
const INHALT = {
  // Formular (Kennung `termin`, Überschrift des Abschnitts; Pflichtfelder und Empfänger unverändert, G8). Darunter Anruf,
  // WhatsApp und Zeiten wie im Termin-Abschnitt der Startseite, untereinander (K-016).
  termin: (
    <>
      <div className="mx-auto w-full max-w-mass">
        <HeroContactForm titel={false} />
      </div>
      <div className="mx-auto mt-12 max-w-mass">
        <Knopf href={`tel:${COMPANY_DATA.contact.phoneLink}`} variante="neben" iconLinks="telefon">
          Anrufen: <Rufnummer nummer={COMPANY_DATA.contact.phone} />
        </Knopf>
        <Knopf
          href={buildWhatsAppUrl(COMPANY_DATA.contact.whatsappNumber, kontextNachricht(KONTAKT.pfad))}
          extern
          variante="neben"
          vorne={<WhatsAppLogo className="size-5 shrink-0" />}
        >
          Nachricht per WhatsApp
        </Knopf>
        <Oeffnungszeiten />
      </div>
    </>
  ),
  // Kontaktwege mit Firmendaten (Bestand: DirectContactCard), Satz zur Handwerkskammer, Einsatzgebiet und Bild
  'andere-wege': (
    <>
      <DirectContactCard />
      <div className="mx-auto mt-12 max-w-mass text-fs-3 text-tinte-2">
        <p>
          <Textmarken text={KONTAKT.handwerkskammer} />
        </p>
        <p>{KONTAKT.einsatzgebiet}</p>
      </div>
      <div className="mx-auto mt-12 max-w-mass">
        <Bildfeld arbeit={KONTAKT.bild} spalten="halb" />
      </div>
    </>
  ),
  // Karte hinter der Einwilligung (Bestand: ContactPremiumMap, Kennung `standort-anfahrt`) und regionaler Kontakt
  'standort-anfahrt': (
    <>
      <div className="mx-auto max-w-mass text-fs-3 text-tinte-2">
        <p>{KONTAKT.anfahrt}</p>
      </div>
      <ContactPremiumMap />
      <LocationContact eingebettet cityName="Aßlar, Wetzlar & Mittelhessen" />
    </>
  ),
  // Hilfen nach dem Hauptweg: Links zu den beiden Werkzeugen unten
  hilfen: <Bereichszeilen bereiche={KONTAKT.hilfen} />,
  // Anfrage (Bestand: TezgelAnfrageFunnel, Kennung `express-anfrage`)
  'express-anfrage': <TezgelAnfrageFunnel />,
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
