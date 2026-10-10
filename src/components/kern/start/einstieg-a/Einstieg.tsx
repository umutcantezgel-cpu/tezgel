// Startseite · Einstieg Variante A „Achse über der Seite“ (P3-09a, KERN v1.2): erster Bildschirm von `/` mit SIG-1.
// Komposition (K-001, K-007, K-011 Erzählseite): Das Lot steht an der linken Textkante (`--k-rand` − 1 px, Text eingerückt),
// die Waage läuft über die volle Breite auf der Grundlinie der H1 (Unterkante der letzten H1-Zeile, unter den Unterlängen),
// der Kreuzpunkt ist ein Fugenkreuz. Unter der Waage beginnt die Arbeit: links Absatz, Knöpfe, Zusagen, Motto; rechts hängt
// der Formularplatz mit seiner Oberkante an der Waage (Desktop). Mobil: eine Spalte, Lot am linken Rand, Waage unter der H1,
// das Formular erst nach Text, Knöpfen, Zusagen und Motto (K-011 „Ein Formular je Bildschirm“).
// LCP: H1 (Desktop) bzw. Absatz (mobil) – beide ohne Startzustand, ohne transform, ohne opacity; animiert werden nur die
// SVG-Linien (Register `sig-kreuzlinie`). Der Kopf ist sticky im Fluss, der Einstieg liegt darunter und verdeckt nichts.
// Wortlaut wörtlich aus `src/app/(bestand)/page.tsx` (Abschnitt „1. HERO“), Daten aus `@/config/company` und `@/config/reviews`.
// Server-Komponente ohne Interaktion; das Formular kommt als Prop (P3-13).
import type { ReactNode } from 'react';
import { COMPANY_DATA } from '@/config/company';
import { RATING_SUMMARY } from '@/config/reviews';
import Etikett from '@/components/kern/basis/Etikett';
import Knopf from '@/components/kern/basis/Knopf';
import Icon from '@/components/kern/icons/Icon';
import Kreuzlinie from '@/components/kern/start/einstieg-a/Kreuzlinie';

const ZUSAGEN = ['Kostenloses Aufmaß vor Ort', 'Staubschutzgarantie', 'Verbindlicher Festpreis'] as const;

export type EinstiegProps = {
  /** Platz für das Hero-Formular (P3-13). Desktop rechts an der Waage, mobil nach Text, Knöpfen und Zusagen. */
  formular?: ReactNode;
};

export default function Einstieg({ formular }: EinstiegProps) {
  const { contact, motto, owner } = COMPANY_DATA;
  const google = RATING_SUMMARY.google;

  return (
    <section className="relative overflow-hidden bg-k-kalk">
      <div className="mx-auto max-w-(--k-seite) px-(--k-rand) pt-k-8 pb-k-9 lg:pt-k-9 lg:pb-k-10">
        {/* Kopfbereich bis zur Waage: Etiketten (Klasse 3) und H1. Der Kreuzpunkt sitzt unten links an diesem Block. */}
        <div className="relative pl-k-4 lg:pl-k-6">
          <div className="flex flex-wrap items-center gap-x-k-5 gap-y-k-2">
            <Etikett ton="tinte" rahmen>
              Handwerkskammer-eingetragener Fachbetrieb Deniz Tezgel
            </Etikett>
            <Etikett ton="tinte">
              <span className="inline-flex items-center gap-k-2">
                <Icon name="stern-voll" groesse={16} />
                <span>
                  {google.displayRating} ({google.count} Bewertungen)
                </span>
              </span>
            </Etikett>
          </div>

          <h1 className="mt-k-6 pb-k-5 k-anzeige text-k-tinte lg:mt-k-7 lg:pb-k-6">
            <span className="block text-k-7">Perfektion auf jedem Quadrat&shy;meter.</span>
            <span className="mt-k-3 block text-k-5 text-k-tinte-2 lg:mt-k-4">
              Fliesen&shy;verlegung &amp; Bad&shy;sanierung aus Aßlar
            </span>
          </h1>

          <Kreuzlinie className="absolute -left-px bottom-0" />
        </div>

        {/* Unter der Waage: links Text und Wege, rechts der Formularplatz (Oberkante auf der Waage) */}
        <div className="lg:grid lg:grid-cols-12">
          <div className="pt-k-6 pl-k-4 lg:col-span-7 lg:pt-k-7 lg:pr-k-7 lg:pl-k-6">
            <p className="max-w-(--k-mass) k-text text-k-4 text-k-tinte">
              Fugenarme XXL-Großformatfliesen, barrierefreie Walk-in-Duschen, repräsentative Wohnbereiche und
              frostsichere Terrassen – millimetergenau verlegt, normgerecht abgedichtet nach DIN 18534 und
              mit Staubschutzgarantie im bewohnten Zuhause.
            </p>

            <div className="mt-k-6 flex flex-col gap-k-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Knopf href="/kontakt" hinten={<Icon name="pfeil" groesse={20} />}>
                Aufmaß vor Ort anfragen
              </Knopf>
              <Knopf
                art="neben"
                href={contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                vorne={<Icon name="whatsapp" groesse={20} />}
              >
                WhatsApp
              </Knopf>
              <Knopf
                art="neben"
                href={`tel:${contact.phoneLink}`}
                aria-label={`Fliesenverlegung Tezgel telefonisch anrufen: ${contact.phone}`}
                vorne={<Icon name="telefon" groesse={20} />}
              >
                <span className="k-mono font-normal">{contact.phone}</span>
              </Knopf>
            </div>

            {/* Zusagen als Feldreihe mit Fugen (K-003 „Fuge statt Karte“); mobil untereinander */}
            <ul className="mt-k-7 grid divide-y divide-k-fuge border-y border-k-fuge sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {ZUSAGEN.map((zusage) => (
                <li key={zusage} className="flex items-start gap-k-2 py-k-3 text-k-tinte sm:px-k-3 sm:first:pl-0">
                  <Icon name="haken" groesse={20} className="mt-k-1" />
                  <span className="k-text text-k-2 font-semibold">{zusage}</span>
                </li>
              ))}
            </ul>

            <figure className="mt-k-7 max-w-(--k-mass)">
              <blockquote className="k-text text-k-3 text-k-tinte">&bdquo;{motto}&ldquo;</blockquote>
              <figcaption className="mt-k-2 k-mono text-k-1 text-k-tinte-2">— {owner.fullName}, Inhaber</figcaption>
            </figure>
          </div>

          {formular ? (
            <div className="mt-k-8 pl-k-4 lg:col-span-5 lg:col-start-8 lg:mt-0 lg:pl-0">{formular}</div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
