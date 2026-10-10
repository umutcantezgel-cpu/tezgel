// Abschluss-Abschnitt (P3-13a): Kern-Fassung von `src/components/ui/FinalCTA.tsx` (KERN v1.2, K-008 Fläche Tinte, K-011).
// Vierter Anfrage-Einstieg auf `/`: Anruf, WhatsApp und Aufmaß-Link auf Tinte-Fläche, als Feldraster mit Fugen in
// Nacht-Fuge (Stil des Fußes, P3-07). Kein zweites Formular auf `/` (`showQuickForm` aus, wie im Bestand); auf späteren
// Seiten steht das Kurzformular (`Schnellanfrage`, Client-Insel) darunter.
// Props und Standardwerte wörtlich wie FinalCTA. Server-Komponente: kein 'use client', keine Hooks.
// Telefon aus COMPANY_DATA, WhatsApp-Ziel wie FinalCTA aus siteConfig (wa.me) – Linkziele wörtlich gleich (Z-06).
// Entfällt: HeartbeatCTA (Pulsieren, kein Registereintrag), Haptik beim Klick (wie P3-07), Glow und Punktmuster.
import type { ReactNode } from 'react';
import { COMPANY_DATA } from '@/config/company';
import { siteConfig } from '@/lib/config';
import { Etikett, Feldraster, Knopf, Rasterfeld, verbinde } from '@/components/kern/basis';
import Icon from '@/components/kern/icons/Icon';
import Schnellanfrage from '@/components/kern/formulare/Schnellanfrage';

export interface AbschlussProps {
  className?: string;
  headline?: string;
  benefits?: string[];
  buttonText?: string;
  socialProof?: string;
  subtitle?: string;
  serviceContext?: string;
  showQuickForm?: boolean;
  quickFormSource?: string;
}

const defaultBenefits = [
  'Kostenfreies Vor-Ort-Aufmaß in Aßlar, Wetzlar & Hessen',
  'Verbindlicher Festpreis ohne versteckte Kosten',
  'Saubere Baustelle mit Staubschutz-Garantie',
];

// Wortlaut des Kurzformular-Kopfs im Abschluss, wörtlich aus FinalCTA
const KURZFORMULAR_TITEL = 'Kostenfreies Vor-Ort-Aufmaß anfordern';
const KURZFORMULAR_TEXT =
  'Tragen Sie Ihre Kontaktdaten ein – Fachbetriebsleiter Deniz Tezgel meldet sich innerhalb von 24 Stunden persönlich.';

// Link im Satz auf Tinte (wie Fuß P3-07): unterstrichen, Kalk, Fokus 2 px Kalk.
const TELEFONLINK = verbinde(
  'inline-flex min-h-k-7 w-fit items-center rounded-k-1 k-mono text-k-5 text-k-kalk',
  'underline decoration-1 underline-offset-4 decoration-k-nacht-2',
  'pointer-fine:hover:decoration-k-kalk pointer-fine:hover:decoration-2 active:decoration-k-kalk active:decoration-2',
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-k-kalk',
);

type AnsichtProps = Omit<AbschlussProps, 'showQuickForm' | 'quickFormSource'> & {
  /** Inhalt unter dem Raster (Kurzformular); leer = kein Formular */
  kurzformular?: ReactNode;
};

/** Darstellung mit den Standardwerten von FinalCTA; die Vorschau setzt als Kurzformular eine Hülle ein, die nie sendet. */
export function AbschlussAnsicht({
  className,
  headline = 'Planen Sie ein Fliesen- oder Badprojekt? Sprechen Sie direkt mit Fachbetriebsleiter Deniz Tezgel.',
  benefits = defaultBenefits,
  buttonText = 'Jetzt kostenfrei anrufen',
  socialProof = '5,0 Google-Bewertung bei 27 echten Kundenstimmen',
  subtitle = 'Schnelle Reaktionszeit • Persönliche Betreuung vor Ort • HWK-Fachbetrieb',
  serviceContext,
  kurzformular,
}: AnsichtProps) {
  const { contact } = COMPANY_DATA;
  return (
    <section aria-labelledby="final-cta-heading" className={verbinde('bg-k-tinte text-k-nacht-2', className)}>
      <div className="mx-auto max-w-(--k-seite) px-(--k-rand) py-k-9 lg:py-k-10">
        <Feldraster auf="tinte">
          {/* Feld 1 · Anliegen: Kontext, Überschrift, Zusagen */}
          <Rasterfeld flaeche="tinte" innen="keiner" breite={{ mobil: 4, tablett: 8, desktop: 7 }} className="flex flex-col gap-k-6 p-k-5 lg:p-k-7">
            {serviceContext && (
              <Etikett auf="tinte" rahmen>
                {serviceContext}
              </Etikett>
            )}
            <h2 id="final-cta-heading" className="k-anzeige text-k-6 text-k-kalk">
              {headline}
            </h2>
            <ul className="flex flex-col border-t border-k-nacht-fuge">
              {benefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-k-3 border-b border-k-nacht-fuge py-k-3 k-text text-k-3 text-k-kalk">
                  <span className="flex h-lh shrink-0 items-center text-k-nacht-2">
                    <Icon name="haken" groesse={20} />
                  </span>
                  <span className="min-w-0">{benefit}</span>
                </li>
              ))}
            </ul>
          </Rasterfeld>

          {/* Feld 2 · Wege: Anruf (Nummer und Hauptknopf), WhatsApp, Aufmaß */}
          <Rasterfeld flaeche="tinte" innen="keiner" breite={{ mobil: 4, tablett: 8, desktop: 5 }} className="flex flex-col justify-center gap-k-4 p-k-5 lg:p-k-7">
            <a href={`tel:${contact.phoneLink}`} aria-label={`Fliesenverlegung Tezgel telefonisch anrufen: ${contact.phone}`} data-motion="zustand" className={TELEFONLINK}>
              {contact.phone}
            </a>
            <div className="flex flex-col gap-k-3">
              <Knopf
                href={`tel:${contact.phoneLink}`}
                auf="tinte"
                groesse="gross"
                breit
                vorne={<Icon name="telefon" groesse={20} />}
                hinten={<Icon name="pfeil" groesse={20} />}
              >
                {buttonText}
              </Knopf>
              <Knopf
                href={siteConfig.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                art="neben"
                auf="tinte"
                groesse="gross"
                breit
                aria-label="WhatsApp Nachricht an Fliesenverlegung Tezgel senden"
                vorne={<Icon name="whatsapp" groesse={20} />}
              >
                WhatsApp
              </Knopf>
            </div>
            <Knopf href="/kontakt#express-anfrage" art="text" auf="tinte" className="w-fit">
              Kostenloses Vor-Ort-Aufmaß anfordern
            </Knopf>
          </Rasterfeld>

          {/* Feld 3 · Beleg und Zusagen in Mono (Maß statt Behauptung) */}
          <Rasterfeld flaeche="tinte" innen="keiner" breite={{ mobil: 4, tablett: 8, desktop: 12 }} className="flex flex-col gap-k-2 px-k-5 py-k-4 lg:flex-row lg:items-center lg:justify-between lg:px-k-7">
            <p className="flex items-center gap-k-2 k-mono text-k-2 text-k-kalk">
              <Icon name="stern-voll" groesse={16} />
              <span>{socialProof}</span>
            </p>
            <p className="k-mono text-k-1 text-k-nacht-2">{subtitle}</p>
          </Rasterfeld>
        </Feldraster>

        {kurzformular ? <div className="mt-k-7 max-w-(--k-mass)">{kurzformular}</div> : null}
      </div>
    </section>
  );
}

export default function Abschluss({ showQuickForm = false, quickFormSource, ...ansicht }: AbschlussProps) {
  return (
    <AbschlussAnsicht
      {...ansicht}
      kurzformular={
        showQuickForm ? (
          <Schnellanfrage
            variant="card"
            sourceTag={quickFormSource || ansicht.serviceContext || 'final-cta'}
            heading={KURZFORMULAR_TITEL}
            subheading={KURZFORMULAR_TEXT}
          />
        ) : null
      }
    />
  );
}

export { Abschluss };
