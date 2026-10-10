// Dev-Schaufenster (nur next dev): Merkliste in allen Varianten, Schriftfeld, Kennwerte sowie QualityPromise
// und GoogleReviewsBadge. Alle Inhalte stammen aus COMPANY_DATA und RATING_SUMMARY.
import Einstieg from '@/components/kern/Einstieg';
import Abschnitt from '@/components/kern/Abschnitt';
import Merkliste from '@/components/kern/Merkliste';
import Schriftfeld, { SchriftfeldBetrieb } from '@/components/kern/Schriftfeld';
import Kennwerte from '@/components/kern/Kennwerte';
import QualityPromise from '@/components/sections/QualityPromise';
import GoogleReviewsBadge from '@/components/reviews/GoogleReviewsBadge';
import { COMPANY_DATA } from '@/config/company';
import { RATING_SUMMARY } from '@/config/reviews';

export const metadata = { title: 'Schaufenster · Merkliste', robots: { index: false, follow: false } };

const { qualityPromises, trustPillars, business, contact, headquarters, hours, authority } = COMPANY_DATA;

export default function Merklistenschaufenster() {
  return (
    <>
      <Einstieg
        etikett="Dev-Schaufenster · Bausteine"
        titel="Merkliste, Schriftfeld, Kennwerte"
        vorspann={<p>Die Bausteine in ihren Varianten. Nur in der Entwicklung sichtbar.</p>}
      />
      <Abschnitt id="sf-merk-1" nummer="01" etikett="Merkliste · 1 Spalte" titel="Liste an der Fuge" art="arbeit">
        <Merkliste spalten={1} nummeriert eintraege={trustPillars.map((p) => ({ titel: p.title, text: p.description }))} />
      </Abschnitt>
      <Abschnitt id="sf-merk-2" nummer="02" etikett="Merkliste · 2 Spalten" titel="Felder mit Nummer" art="arbeit">
        <Merkliste spalten={2} nummeriert eintraege={qualityPromises.slice(0, 4).map((p) => ({ titel: p.title, text: p.description }))} />
      </Abschnitt>
      <Abschnitt id="sf-merk-4" nummer="03" etikett="Merkliste · 4 Spalten" titel="Felder mit Fuß" art="arbeit">
        <Merkliste
          spalten={4}
          nummeriert
          eintraege={qualityPromises.map((p) => ({
            titel: p.title,
            text: p.description,
            fuss: <span className="font-mono text-fs-1 text-tinte-2">Garantierter Standard</span>,
          }))}
        />
      </Abschnitt>
      <Abschnitt id="sf-merk-tinte" nummer="04" etikett="Merkliste · Fläche tinte" titel="Auf Tinte" flaeche="tinte" art="arbeit">
        <Merkliste flaeche="tinte" spalten={2} nummeriert eintraege={business.primaryServices.slice(0, 4).map((s) => ({ titel: s }))} />
      </Abschnitt>
      <Abschnitt id="sf-schrift" nummer="05" etikett="Schriftfeld" titel="Stempelfeld an der Fuge" art="arbeit">
        <Schriftfeld
          felder={[
            { etikett: 'Anschrift', wert: headquarters.fullAddress, breit: true },
            { etikett: 'Telefon', wert: <span className="font-mono">{contact.phone}</span> },
            { etikett: 'E-Mail', wert: contact.email },
            { etikett: 'Zeiten', wert: hours.formattedWeekdays, breit: true },
          ]}
        />
        <div className="mt-12">
          <SchriftfeldBetrieb />
        </div>
      </Abschnitt>
      <Abschnitt id="sf-kennwerte" nummer="06" etikett="Kennwerte" titel="Drei Zahlen mit Quelle" art="arbeit">
        <Kennwerte
          werte={[
            { wert: RATING_SUMMARY.google.displayRating, etikett: 'Google-Bewertung', quelle: `${RATING_SUMMARY.google.count} Google-Rezensionen` },
            { wert: RATING_SUMMARY.trustlocal.displayRating, etikett: 'Trustlocal-Bewertung', quelle: `${RATING_SUMMARY.trustlocal.count} Trustlocal-Bewertungen` },
            { wert: business.establishmentYear, etikett: 'Betrieb seit', quelle: authority.shortName },
          ]}
        />
      </Abschnitt>
      <QualityPromise />
      <Abschnitt id="sf-badge" nummer="07" etikett="Kennwert-Link" titel="Google-Bewertung" flaeche="fliese" art="arbeit">
        <div className="flex justify-center">
          <GoogleReviewsBadge />
        </div>
      </Abschnitt>
    </>
  );
}
