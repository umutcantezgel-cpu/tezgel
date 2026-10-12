// Über uns (S-02, KERN v2 · Erzählansicht nach dem Vorbild der Startseite): Einstieg mit Laserachse, Aktionen und den
// Kennzahlen des Betriebs in der Randspalte · Unser Betrieb als Text an der Fuge mit Zitat · Werte als Feldraster auf
// Fliese · Firmengeschichte als ruhige Zeitleiste an der Fuge · Qualitätsversprechen · Abschluss.
// Die drei Wege des Bestands (Aufmaß, Telefon, Firmensitz) stehen jetzt im Einstieg und nicht mehr unter den Werten.
// Serverkomponente; Metadaten und JSON-LD bleiben in `layout.tsx`. Wortlaut, Links und Anker wie im Bestand.
import { COMPANY_DATA } from '@/config/company';
import Einstieg from '@/components/kern/Einstieg';
import Knopf from '@/components/kern/Knopf';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import Kennzahlen from '@/components/ueber-uns/Kennzahlen';
import Betrieb from '@/components/ueber-uns/Betrieb';
import Werte from '@/components/ueber-uns/Werte';
import CompanyHistory from '@/components/sections/CompanyHistory';
import QualityPromise from '@/components/sections/QualityPromise';
import FinalCTA from '@/components/ui/FinalCTA';

export default function AboutPage() {
  const { legalName, authority, headquarters, business, contact } = COMPANY_DATA;

  return (
    <>
      <Einstieg
        etikett={
          <>
            <Fugenkreuz className="size-3 shrink-0 text-strich" />
            Gegründet {business.establishmentYear} &middot; {authority.shortName}
          </>
        }
        titel={<>Über uns – Fliesenleger-Fachbetrieb Tezgel in {headquarters.city}</>}
        vorspann={
          <p>
            Über uns und {legalName}: Ihr eingetragener Fliesenleger-Fachbetrieb Tezgel in {headquarters.city} für {business.industryType} – mit bis zu 12 qualifizierten Fachkräften, Firmensitz in {headquarters.city} und im Einsatz in Wetzlar, Gießen und ganz Mittelhessen.
          </p>
        }
        aktionen={
          <>
            <Knopf href="/kontakt" icon="pfeil-rechts">
              Vor-Ort-Aufmaß vereinbaren
            </Knopf>
            <Knopf href={`tel:${contact.phoneLink}`} variante="neben" iconLinks="telefon">
              <span className="font-mono font-normal">{contact.phone}</span>
            </Knopf>
            <Knopf href={headquarters.mapsUrl} extern variante="neben" iconLinks="ort">
              {headquarters.street}, {headquarters.city}
            </Knopf>
          </>
        }
        rand={<Kennzahlen />}
      />

      <Betrieb />
      <Werte />
      <CompanyHistory />
      <QualityPromise />

      {/* Abschluss */}
      <FinalCTA
        headline="Lernen Sie uns persönlich kennen: Kostenfreies Vor-Ort-Aufmaß mit Deniz Tezgel."
        subtitle="Über 15 Jahre Praxiserfahrung • Verbindlicher Festpreis • HWK-Fachbetrieb"
        buttonText="Jetzt persönlichen Termin anfragen"
      />
    </>
  );
}
