// Über uns · Unser Betrieb (P4-08e, KERN v1.2 K-001, K-002, K-003 Nr. 3, K-008 Schriftfeld): Text des Betriebs links, die
// Kennzahlen des Bestands rechts als Schriftfeld – das Stempelfeld eines Plans mit Gründungsjahr, Kammer, Team und Bewertung.
// Das Schriftfeld steht auf Erzählseiten einmal (K-008); hier ist es die Kennzahlenliste des Bestands selbst (kein neuer Text,
// keine doppelte Bewertung). Es hängt ab lg an der Achse des Einstiegs (obere Kante auf der Waage, Kreuzpunkt an der Ecke).
// Lesefolge im DOM wie im Bestand: Etikett · H2 · drei Absätze · Motto · Kennzahlen (dl). Darstellung:
// - ab lg: Kopf und Text Sp. 1–7, Schriftfeld Sp. 9–12 über beide Zeilen;
// - unter lg: Kopf, dann das Schriftfeld, dann der Text (Rasterzeilen, DOM unverändert). Grund K-002: Bewertung und Kammer im
//   zweiten Bildschirm statt im dritten; das Schriftfeld hat keine Bedienelemente, die Tab-Folge bleibt die Lesefolge (Lehre 7).
// Schriftfeld: Beschreibungsliste mit Fugen (`gap-px` auf Fuge), Feldkopf (dt) in Mono Tinte-2 über dem Wert (dd) in Mono –
// Maß statt Behauptung, kein Hochzählen, kein Hover-Heben. Spalten nach Behälterbreite: 1 · ab 20rem 2 · ab 42rem 4
// („(Handwerkskammer“ passt in Mono k-1 erst ab 2 × 145 px Innenbreite; Lehre 6). Sterne dekorativ, der Wert steht als Text.
// Motto als Unterschriftzeile unter dem Text (Fuge oben, Name in Mono). Kein Auftritt (der erste Abschnitt nach dem Einstieg
// steht, K-009 S-02). Wortlaut wörtlich aus `src/app/(bestand)/ueber-uns/page.jsx`, Daten aus `@/config/company`, `@/config/reviews`.
import { Etikett, verbinde } from '@/components/kern/basis';
import Sterne from '@/components/kern/start/vertrauen/Sterne';
import { kopfStufe } from '@/components/kern/vorlagen/teile/Abschnitt';
import { UMBRUCH } from '@/components/kern/vorlagen/teile/typen';
import { COMPANY_DATA } from '@/config/company';
import { RATING_SUMMARY } from '@/config/reviews';

const TITEL_ID = 'unser-betrieb-heading';

type Kennzahl = { value: string; label: string; stars?: boolean };

export default function Betrieb() {
  const { legalName, owner, authority, headquarters, business, motto } = COMPANY_DATA;
  const google = RATING_SUMMARY.google;
  const titel = `Handwerkliche Präzision aus ${headquarters.city}`;

  // Reihenfolge und Wortlaut wie `stats` im Bestand
  const stats: readonly Kennzahl[] = [
    { value: String(business.establishmentYear), label: `Betriebsgründung in ${headquarters.city}` },
    { value: 'HWK', label: `Eingetragener Fachbetrieb (${authority.name})` },
    { value: 'Bis zu 12', label: 'Fachkräfte im Einsatz vor Ort' },
    { value: google.displayRating, label: `${google.count} ${google.label}`, stars: true },
  ];

  return (
    <section aria-labelledby={TITEL_ID} className="bg-k-kalk">
      <div className="mx-auto max-w-(--k-seite) px-(--k-rand) pt-k-7 pb-k-9 lg:pt-0 lg:pb-k-10">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Kopf */}
          <header className="row-start-1 min-w-0 lg:col-span-7 lg:pt-k-8 lg:pr-k-7">
            <Etikett kreuz>Unser Betrieb</Etikett>
            <h2 id={TITEL_ID} className={verbinde('mt-k-4 k-anzeige text-k-tinte', kopfStufe(titel), UMBRUCH)}>
              Handwerkliche Präzision aus {headquarters.city}
            </h2>
          </header>

          {/* Text und Motto (mobil nach dem Schriftfeld) */}
          <div className="row-start-3 mt-k-7 min-w-0 lg:col-span-7 lg:row-start-2 lg:mt-k-6 lg:pr-k-7">
            <div className="flex max-w-(--k-mass) flex-col gap-k-4 k-text text-k-3 text-k-tinte-2">
              <p>
                Seit der Gründung im Jahr {business.establishmentYear} steht <strong className="font-semibold text-k-tinte">{legalName}</strong> für handwerkliche Präzision in Mittelhessen – als {authority.certification}.
              </p>
              <p>
                Unter der Führung von Inhaber <strong className="font-semibold text-k-tinte">{owner.fullName}</strong> und mit unserem Team von bis zu 12 Fachkräften liegt unser Schwerpunkt auf Badsanierungen und barrierefreien Walk-In-Duschen, fugenarmen XXL-Großformaten, Wohnbereichen, Balkonen und Terrassen sowie der normgerechten Verbundabdichtung nach <span className="k-mono">DIN 18534</span>.
              </p>
              <p>
                Von unserem Firmensitz in der {headquarters.street}, {headquarters.postalCode} {headquarters.city} aus betreuen wir Großprojekte ebenso wie private Sanierungsvorhaben – persönlich, transparent und mit verbindlichem Festpreisangebot.
              </p>
            </div>

            {/* Motto als Unterschriftzeile */}
            <figure className="mt-k-7 max-w-(--k-mass) border-t border-k-strich pt-k-4">
              <blockquote className="k-text text-k-4 text-k-tinte">&bdquo;{motto}&ldquo;</blockquote>
              <figcaption className={verbinde('mt-k-2 k-mono text-k-1 text-k-tinte-2', UMBRUCH)}>
                — {owner.fullName}, {owner.title}
              </figcaption>
            </figure>
          </div>

          {/* Schriftfeld: Kennzahlen des Bestands; ab lg Oberkante auf der Waage des Einstiegs */}
          <div className="row-start-2 mt-k-6 min-w-0 lg:col-span-4 lg:col-start-9 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:self-start">
            <div className="@container border border-k-strich bg-k-fliese">
              <dl className="grid grid-cols-1 gap-px bg-k-fuge @xs:grid-cols-2 @2xl:grid-cols-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="flex min-w-0 flex-col gap-k-2 bg-k-fliese p-k-3 lg:p-k-4">
                    <dt className={verbinde('k-mono text-k-1 text-k-tinte-2', UMBRUCH)}>{stat.label}</dt>
                    <dd className="mt-auto flex flex-wrap items-center gap-x-k-3 gap-y-k-1 k-mono text-k-4 text-k-tinte">
                      <span>{stat.value}</span>
                      {stat.stars ? <Sterne wert={google.rating} max={google.maxRating} /> : null}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
