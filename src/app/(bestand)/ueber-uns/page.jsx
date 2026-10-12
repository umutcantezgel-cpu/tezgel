// Über uns · Erzählansicht (E3-BAU-07, KERN v2; E4-NACH-11; E4-N2-10): Einstieg mit Achse und H1, danach die Leitachse
// über „Unser Betrieb“ und „Unsere Werte im Handwerk“. „Unser Betrieb“ seitlich (Text, Motto und Kennwerte in Mono, Sterne
// gefüllt), „Unsere Werte im Handwerk“ als Merkliste im Halbverband statt Plus-Karten, darunter die drei Wege.
// Die Firmengeschichte (Fugenband) trägt ihr eigenes Lot und deckt die Leitachse ab (ein rotes Lot je Bildschirm), mit
// einer Formatskizze je Jahresmarke (wie das Zeitband des Einstiegs). Danach QualityPromise mit Abschnittsmarke
// (AchsenAbschnitt: Fugenkreuz an der Oberkante, Tempo-Hülle). Überschriften, Fließtexte, Links und Lesefolge
// wie im Bestand.
import clsx from 'clsx';
import { values, COMPANY_DATA, historyTimeline } from '@/config/company';
import { RATING_SUMMARY } from '@/config/reviews';
import QualityPromise from '@/components/sections/QualityPromise';
import FinalCTA from '@/components/ui/FinalCTA';
import Icon from '@/components/icons/Icon';
import Abschnitt from '@/components/kern/Abschnitt';
import Einstieg from '@/components/kern/Einstieg';
import Leitachse, { ACHSE_LAGE } from '@/components/kern/Leitachse';
import Merkliste from '@/components/kern/Merkliste';
import Planblatt, { planfelder } from '@/components/kern/Planblatt';
import Zeitband from '@/components/kern/Zeitband';
import Verlegeplan from '@/components/kern/Verlegeplan';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import Kennwerte from '@/components/kern/Kennwerte';
import Knopf from '@/components/kern/Knopf';
import { etikettKlassen, seitenKlassen } from '@/components/kern/stile';

/**
 * Abschnitt aus einer fremden Sektion (QualityPromise): dieselbe Marke wie Abschnitt mit `leitachse`
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

// Formatskizzen der Jahresmarken (ERZ 29, wie das Zeitband des Einstiegs; eigene Planvorgaben dieser Seite): bis 2014 kleines
// Format im Kreuzverband, ab 2014 Großformat im Halbverband, ab 2019 mit umlaufendem Dichtband. Nur Jahre aus
// `historyTimeline`; „Heute“ hat keine Skizze. Dekorativ.
const KLEINFORMAT = { name: 'kleinformat', beschreibung: 'Kleinformatige Fliesen im Kreuzverband.', raum: { b: 30, h: 20 }, platte: { b: 4, h: 4 }, verband: 'kreuz', achse: 'kreuz' };
const GROSSFORMAT = { name: 'grossformat', beschreibung: 'Großformat-Platten im Halbverband, mit wenigen Fugen.', raum: { b: 36, h: 18 }, platte: { b: 12, h: 6 }, verband: 'halb', achse: 'lot' };
const DICHTBAND = { ...GROSSFORMAT, name: 'dichtband', beschreibung: 'Großformat über umlaufendem Dichtband.', elemente: [{ art: 'dichtband' }] };

function formatskizze(etikett) {
  if (!/^\d{4}$/.test(etikett)) return null;
  const jahr = Number(etikett);
  if (jahr < 2014) return KLEINFORMAT;
  return jahr < 2019 ? GROSSFORMAT : DICHTBAND;
}

/**
 * Firmengeschichte (Fugenband) mit Formatskizzen an den Jahren. Wortlaut, Überschrift, ID und Lesefolge wie
 * CompanyHistory (src/components/sections/CompanyHistory.jsx), dort unverändert; hier nur um die Skizzen erweitert.
 */
function Firmengeschichte() {
  const { business, headquarters, authority, owner, legalName, motto } = COMPANY_DATA;

  return (
    <section className="py-16 lg:py-24" aria-labelledby="company-history-heading">
      <div className={seitenKlassen}>
        <div className="max-w-mass">
          <span className={etikettKlassen}>
            <Fugenkreuz className="size-3 shrink-0 text-strich" />
            Gegründet {business.establishmentYear} in {headquarters.city} &middot; {authority.shortName}
          </span>
          <h2 id="company-history-heading" className="mt-4 text-fs-6 text-tinte">
            Unsere Unternehmensgeschichte
          </h2>
          <p className="mt-6 text-fs-4 text-tinte-2">
            Von der Betriebsgründung in {headquarters.city} bis zum Fliesen-Fachbetrieb für ganz Mittelhessen: So hat sich {legalName} unter {owner.fullName} entwickelt.
          </p>
        </div>

        {/* Fugenband: Lot links (Grundschicht Fuge, rotes Stück folgt dem Scrollen), je Jahr eine Zeile an der Fuge mit Formatskizze */}
        <div className="fugenband relative mt-16" data-motion="fugenband">
          <div aria-hidden="true" className="fugenband-linie">
            <span className="fugenband-rot" />
          </div>
          <ol className="border-t border-fuge">
            {historyTimeline.map((item) => {
              const skizze = formatskizze(item.year);
              return (
                <li key={item.year} className="relative grid grid-cols-4 gap-x-6 gap-y-2 border-b border-fuge py-8 pl-8 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-8 lg:py-12 lg:pl-12">
                  <Fugenkreuz className="absolute left-0 top-8 size-3 -translate-x-1/2 text-tinte lg:top-12" />
                  <div className="col-span-4 md:col-span-2 lg:col-span-2">
                    <p className="font-mono text-fs-5 text-tinte tabular-nums">{item.year}</p>
                    {skizze && (
                      <div className="mt-4 w-24 lg:w-32">
                        <Verlegeplan plan={skizze} ohneAchse bemassung={false} />
                      </div>
                    )}
                  </div>
                  <div className="col-span-4 md:col-span-6 lg:col-span-7">
                    <h3 className="font-anzeige text-fs-5 text-tinte">{item.title}</h3>
                    <p className="mt-2 max-w-mass text-fs-3 text-tinte-2">{item.description}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Leitsatz des Inhabers wie im Einstieg der Startseite: Linie in Tinte, Zitat, Herkunft in Mono */}
        <figure className="mt-16 max-w-mass border-l-2 border-tinte pl-6">
          <blockquote className="text-fs-5 text-tinte">&bdquo;{motto}&ldquo;</blockquote>
          <figcaption className="mt-3 font-mono text-fs-1 text-tinte-2">
            {owner.fullName} &middot; {owner.title}, {legalName}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

export default function AboutPage() {
  const { legalName, owner, authority, headquarters, business, contact, motto } = COMPANY_DATA;
  const google = RATING_SUMMARY.google;

  // Kennzahlen des Bestands in alter Reihenfolge. Werte in Mono und eine Zeile hoch (ERZ 27); die Etiketten halten ab sm
  // vier Zeilen Höhe, damit alle Werte einer Reihe auf einer Grundlinie stehen (Kennwerte-Baustein, Etikett ab sm)
  const wertMono = (inhalt) => <span className="block font-mono font-normal text-fs-4">{inhalt}</span>;
  const etikettHoehe = (inhalt) => <span className="block sm:min-h-24">{inhalt}</span>;
  const kennwerte = [
    { wert: wertMono(business.establishmentYear), etikett: etikettHoehe(`Betriebsgründung in ${headquarters.city}`) },
    { wert: wertMono('HWK'), etikett: etikettHoehe(`Eingetragener Fachbetrieb (${authority.name})`) },
    { wert: wertMono('Bis zu 12'), etikett: etikettHoehe('Fachkräfte im Einsatz vor Ort') },
    {
      wert: wertMono(google.displayRating),
      etikett: etikettHoehe(`${google.count} ${google.label}`),
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

      {/* LEITACHSE (K-007 leitachse): das Lot setzt die Achse des Einstiegs fort; unter der Firmengeschichte verdeckt (eigenes Lot) */}
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

        {/* Firmengeschichte: eigenes Lot (Fugenband). Die Leitachse läuft hier unter einem Kalk-Block weiter und ist verdeckt,
            damit je Bildschirm nur ein rotes Lot steht (ERZ 26). */}
        <div className="relative z-10 bg-kalk">
          <Firmengeschichte />
        </div>
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
