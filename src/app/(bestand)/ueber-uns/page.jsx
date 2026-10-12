// Über uns · Erzählansicht (E3-BAU-07, KERN v2; E4-NACH-11): Einstieg mit Achse und H1, danach eine durchgehende
// Leitachse über alle Abschnitte bis vor den Abschluss. „Unser Betrieb“ seitlich (Text, Motto und Kennwerte, Sterne
// gefüllt), „Unsere Werte im Handwerk“ als Merkliste im Halbverband statt Plus-Karten, darunter die drei Wege.
// CompanyHistory (Fugenband) und QualityPromise bleiben unverändert eingebunden; AchsenAbschnitt setzt ihre
// Abschnittsmarke (Fugenkreuz an der Oberkante) und die Tempo-Hülle. Überschriften, Fließtexte, Links und Lesefolge
// wie im Bestand.
import clsx from 'clsx';
import { values, COMPANY_DATA } from '@/config/company';
import { RATING_SUMMARY } from '@/config/reviews';
import CompanyHistory from '@/components/sections/CompanyHistory';
import QualityPromise from '@/components/sections/QualityPromise';
import FinalCTA from '@/components/ui/FinalCTA';
import Icon from '@/components/icons/Icon';
import Abschnitt from '@/components/kern/Abschnitt';
import Einstieg from '@/components/kern/Einstieg';
import Leitachse, { ACHSE_LAGE } from '@/components/kern/Leitachse';
import Merkliste from '@/components/kern/Merkliste';
import Planblatt, { planfelder } from '@/components/kern/Planblatt';
import Zeitband from '@/components/kern/Zeitband';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import Kennwerte from '@/components/kern/Kennwerte';
import Knopf from '@/components/kern/Knopf';
import { seitenKlassen } from '@/components/kern/stile';

/**
 * Abschnitt aus einer fremden Sektion (CompanyHistory, QualityPromise): dieselbe Marke wie Abschnitt mit `leitachse`
 * (Fugenkreuz an der Oberkante auf dem Lot) und dieselbe Tempo-Hülle wie `spaet`. Die Marke liegt außerhalb der Hülle,
 * damit das überstehende Fugenkreuz nicht abgeschnitten wird.
 */
function AchsenAbschnitt({ children }) {
  return (
    <div className="relative">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-20">
        <div className={clsx(seitenKlassen, 'relative')}>
          <Fugenkreuz className={clsx('absolute top-0 size-3 -translate-x-1/2 -translate-y-1/2 text-tinte', ACHSE_LAGE)} />
        </div>
      </div>
      <div className="spaet-zeichnen">{children}</div>
    </div>
  );
}

export default function AboutPage() {
  const { legalName, owner, authority, headquarters, business, contact, motto } = COMPANY_DATA;
  const google = RATING_SUMMARY.google;

  // Kennzahlen des Bestands in alter Reihenfolge
  const kennwerte = [
    { wert: String(business.establishmentYear), etikett: `Betriebsgründung in ${headquarters.city}` },
    { wert: 'HWK', etikett: `Eingetragener Fachbetrieb (${authority.name})` },
    { wert: 'Bis zu 12', etikett: 'Fachkräfte im Einsatz vor Ort' },
    {
      wert: google.displayRating,
      etikett: `${google.count} ${google.label}`,
      quelle: (
        <span className="flex gap-1 text-tinte" aria-hidden="true">
          {Array.from({ length: 5 }, (_, i) => (
            <Icon key={i} name="stern-voll" groesse={4} />
          ))}
        </span>
      ),
    },
  ];

  return (
    <>
      {/* Einstieg: Kennzeile, H1 auf der Achse, Vorspann; rechts das Planblatt mit Zeitband und Schriftfeld */}
      <Einstieg
        etikett={
          <>
            Gegründet {business.establishmentYear} &middot; {authority.shortName}
          </>
        }
        titel={<>Über uns – Fliesenleger-Fachbetrieb Tezgel in {headquarters.city}</>}
        vorspann={
          <p>
            Über uns und {legalName}: Ihr eingetragener Fliesenleger-Fachbetrieb Tezgel in {headquarters.city} für {business.industryType} – mit bis zu 12 qualifizierten Fachkräften, Firmensitz in {headquarters.city} und im Einsatz in Wetzlar, Gießen und ganz Mittelhessen.
          </p>
        }
        rand={
          // Planblatt (E4-NACH-01, E3-SICHT-ERZ Befund 35): die Jahre der Firmengeschichte als Fliesenstreifen und das
          // Schriftfeld des Betriebs statt einer leeren rechten Hälfte
          <Planblatt felder={planfelder('Betrieb')}>
            <Zeitband />
          </Planblatt>
        }
      />

      {/* LEITACHSE (K-007 leitachse): das Lot setzt die Achse des Einstiegs über alle Abschnitte bis vor den Abschluss fort */}
      <Leitachse>
        {/* Unser Betrieb: Kopf links, Text, Motto und Kennwerte rechts */}
        <Abschnitt
          id="betrieb"
          leitachse
          spaet
          flaeche="fliese"
          kopf="seitlich"
          etikett="Unser Betrieb"
          titel={<>Handwerkliche Präzision aus {headquarters.city}</>}
        >
          <div className="flex max-w-mass flex-col gap-4 text-fs-3 text-tinte">
            <p>
              Seit der Gründung im Jahr {business.establishmentYear} steht <strong className="font-semibold text-tinte">{legalName}</strong> für handwerkliche Präzision in Mittelhessen – als {authority.certification}.
            </p>
            <p>
              Unter der Führung von Inhaber <strong className="font-semibold text-tinte">{owner.fullName}</strong> und mit unserem Team von bis zu 12 Fachkräften liegt unser Schwerpunkt auf Badsanierungen und barrierefreien Walk-In-Duschen, fugenarmen XXL-Großformaten, Wohnbereichen, Balkonen und Terrassen sowie der normgerechten Verbundabdichtung nach DIN 18534.
            </p>
            <p>
              Von unserem Firmensitz in der {headquarters.street}, {headquarters.postalCode} {headquarters.city} aus betreuen wir Großprojekte ebenso wie private Sanierungsvorhaben – persönlich, transparent und mit verbindlichem Festpreisangebot.
            </p>
          </div>

          <figure className="mt-12 max-w-mass border-t border-fuge pt-6">
            <blockquote className="font-anzeige text-fs-4 text-tinte">&bdquo;{motto}&ldquo;</blockquote>
            <figcaption className="mt-3 font-mono text-fs-1 text-tinte-2">— {owner.fullName}, {owner.title}</figcaption>
          </figure>

          <div className="mt-12">
            <Kennwerte werte={kennwerte} />
          </div>
        </Abschnitt>

        {/* Unsere Werte im Handwerk: Merkliste im Halbverband (Titel und Text je Wert, ohne Nummern), darunter die drei Wege */}
        <Abschnitt id="werte" leitachse spaet etikett="Wofür wir stehen" titel="Unsere Werte im Handwerk">
          <Merkliste spalten={2} verband titelAls="h3" eintraege={values.map((wert) => ({ titel: wert.title, text: wert.description }))} />

          <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Knopf href="/kontakt" icon="pfeil-rechts" className="w-full sm:w-auto">
              Vor-Ort-Aufmaß vereinbaren
            </Knopf>
            <Knopf href={`tel:${contact.phoneLink}`} variante="neben" iconLinks="telefon" className="w-full sm:w-auto">
              <span className="font-mono font-normal">{contact.phone}</span>
            </Knopf>
            <Knopf href={headquarters.mapsUrl} extern variante="neben" iconLinks="ort" className="w-full sm:w-auto">
              {headquarters.street}, {headquarters.city}
            </Knopf>
          </div>
        </Abschnitt>

        <AchsenAbschnitt>
          <CompanyHistory />
        </AchsenAbschnitt>
        <AchsenAbschnitt>
          <QualityPromise />
        </AchsenAbschnitt>
      </Leitachse>

      {/* Abschluss */}
      <FinalCTA
        headline="Lernen Sie uns persönlich kennen: Kostenfreies Vor-Ort-Aufmaß mit Deniz Tezgel."
        subtitle="Über 15 Jahre Praxiserfahrung • Verbindlicher Festpreis • HWK-Fachbetrieb"
        buttonText="Jetzt persönlichen Termin anfragen"
      />
    </>
  );
}
