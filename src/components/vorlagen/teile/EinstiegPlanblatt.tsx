// Vorlagen · 1 Worum es geht als Planblatt (KERN v3 K-006, K-007, K-009; E-037, E-044): der Einstieg der Startseite als
// Variante des Vorlagen-Einstiegs, für jede Erzählseite mit Plan. Links die H1 in festen Zeilen (rücken in die Flucht:
// sig-flucht), Ort, Hauptknopf, Anruf, ab xl WhatsApp, Vorspann; rechts die Bewertungszeile als Kennzeile über dem Plan, an
// seiner Achse geschnitten. Die Schnittkante ist die rote Waage über die ganze Breite; sie wächst mit dem Lot des Plans aus
// dem Kreuzpunkt und knickt links ins Lot zur Leitachse (sig-kreuzlinie, gesamt 1,52 s). Unter der Waage steht ab lg ein
// Foto im Querformat zwischen den Wänden des Plans (planblatt-wand): aus der Zeichnung wird der echte Boden. Mobil eine
// Spalte: Text, dann der ganze Plan (rückt beim Eintritt in die Flucht), dann das hohe Foto; das Lot wächst im Seitenrand
// neben dem Text. Raster und Lage der Linien sind die der Startseite (`.kreuzlinie-aus-start` in bewegung.css hängt daran).
// Die fünf Pflichtelemente des ersten Bildschirms tragen data-erstes-bild (Logo im Kopf). Serverkomponente.
import type { CSSProperties, ReactNode } from 'react';
import Icon from '@/components/icons/Icon';
import WhatsAppLogo from '@/components/ui/WhatsAppLogo';
import Bewertungszeile from '@/components/kern/Bewertungszeile';
import Bildfeld from '@/components/kern/Bildfeld';
import Brotkrumen, { type Krume } from '@/components/kern/Brotkrumen';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import Hauptknopf from '@/components/kern/Hauptknopf';
import Rufnummer from '@/components/kern/Rufnummer';
import Textmarken from '@/components/kern/Textmarken';
import Verlegeplan, { wandEinzug } from '@/components/kern/Verlegeplan';
import { knopfKlassen, seitenKlassen } from '@/components/kern/stile';
import { COMPANY_DATA } from '@/config/company';
import type { ArbeitId } from '@/config/arbeiten';
import type { PlanName } from '@/lib/plaene/vorgaben';
import { buildWhatsAppUrl, kontextNachricht } from '@/lib/whatsapp';
import type { Markentext } from '../inhalt';

export interface EinstiegPlanblattProps {
  pfad: string;
  brotkrumen?: Krume[];
  /** Zeile in Mono über der H1 (Startseite: Firmensitz); Brotkrumen stehen an ihrer Stelle */
  firmensitz?: string;
  /** H1 in festen Zeilen, höchstens 15 Zeichen je Zeile (fs-7 ab lg ohne Umbruch, E3-START-01); die Zeilen rücken in die Flucht */
  titelZeilen: string[];
  ort: string;
  vorspann: Markentext;
  hauptziel: string;
  plan: PlanName;
  /** unter lg das hohe Foto (Kennung oder eigener Bildplatz, z. B. das Startbild mit seinem großen Moment) */
  bildKlein: ArbeitId | ReactNode;
  /** ab lg das Querformat zwischen den Wänden des Plans */
  bildGross: ArbeitId;
  /** Bewertungszeile als Kennzeile über dem Plan */
  bewertung?: boolean;
}

export default function EinstiegPlanblatt({ pfad, brotkrumen, firmensitz, titelZeilen, ort, vorspann, hauptziel, plan, bildKlein, bildGross, bewertung = false }: EinstiegPlanblattProps) {
  const { contact } = COMPANY_DATA;
  const titelId = 'seite-titel';
  // ab lg setzt das Foto die Wände des geschnittenen Plans nach unten fort; mobil steht der ganze Plan bündig mit der Textkante
  const wand = { '--wand': `${(wandEinzug(plan) * 100).toFixed(3)}%` } as CSSProperties;
  const rand = wandEinzug(plan, false);
  const wandAussen = { '--wand-aussen': `${((rand / (1 - 2 * rand)) * 100).toFixed(3)}%` } as CSSProperties;
  return (
    <section aria-labelledby={titelId} data-formel="worum" className="relative">
      {/* oben Platz für den festen Kopf (64 px, wie der Baustein Einstieg). Ab lg zwei Zeilen ohne Abstand: oben H1 und Plan
          (Schnittkante auf der Waage), unten Text und Foto. Flaches Querformat (q844): weniger Luft oben, H1 eine Stufe kleiner,
          ohne Firmensitz-Zeile, damit Hauptknopf und Telefon im ersten Bildschirm stehen (Sichtabnahme E2, Befund 11) */}
      <div className={`${seitenKlassen} relative grid grid-cols-4 gap-y-12 pt-24 pb-16 flach:pt-16 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-0 lg:pt-32 lg:pb-24`}>
        {/* Textspalte: mobil ein Block (Abstände wie gesetzt, kein Rasterabstand zwischen H1 und Ort), ab lg zwei Rasterzellen */}
        <div className="relative col-span-4 md:col-span-8 lg:contents">
          {/* mobil: das rote Lot wächst im Seitenrand neben dem Text (Achse 8 bzw. 16 px vor der Textkante, ACHSE_LAGE); unter md
              beginnt es eine Zeile höher am Fugenkreuz */}
          <div aria-hidden="true" data-motion="sig-kreuzlinie" className="pointer-events-none absolute inset-y-0 -left-2 max-md:-top-4 md:-left-4 lg:hidden">
            <span className="kreuzlinie-lot" />
          </div>
          {/* Container: unter 20 rem Spaltenbreite (nur bei großer Systemschrift, P1 mit 200 %) entfällt die Firmensitz-Zeile, die
              H1 steht eine Stufe kleiner und fließt als ein Satz (fs-6 und fs-7 treffen dort beide ihr Minimum) */}
          <div className="@container relative lg:col-span-6 lg:row-start-1 lg:self-start lg:pb-4">
            {/* Fugenkreuz als Anschlag auf der Achse, mit dem Firmensitz in Mono (Oberkante der H1 = pt-32 + diese Zeile + mt-4:
                daran richtet das Intro der Startseite seine Reihen aus, bewegung.css html.k-intro-start). Unter md steht die
                Achse nur 8 px vor der Textkante: dort sitzt das Kreuz eine Zeile höher am Anfang des Lots, statt den ersten
                Buchstaben zu berühren (m360 und 200 %, E2-SICHT-2 Befund 10) */}
            <Fugenkreuz className="pointer-events-none absolute top-1 -left-2 size-3 -translate-x-1/2 text-tinte max-md:-top-4 max-md:-translate-y-1/2 md:-left-4" />
            {brotkrumen && brotkrumen.length > 1 ? (
              <Brotkrumen wege={brotkrumen} className="flach:hidden @max-xs:hidden" />
            ) : (
              firmensitz && <p className="font-mono text-fs-1 text-tinte-2 flach:hidden @max-xs:hidden">{firmensitz}</p>
            )}
            {/* die Zeilen sind Block-Kinder, sonst wirkt die Flucht nicht; flach und schmal fließen sie als ein Satz */}
            <h1 id={titelId} data-erstes-bild="ueberschrift" data-motion="sig-flucht" className="mt-4 text-fs-7 text-tinte flach:mt-0 flach:text-fs-6 @max-xs:mt-0 @max-xs:text-fs-5">
              {titelZeilen.map((zeile, i) => (
                <span key={zeile} className="block flach:inline @max-xs:inline">
                  {zeile}
                  {i < titelZeilen.length - 1 && ' '}
                </span>
              ))}
            </h1>
          </div>
          {/* ab lg klebt der Text unter der Waage, damit neben dem höheren Foto keine leere Spalte steht (wie im alten Stand) */}
          <div className="lg:sticky lg:top-24 lg:col-span-6 lg:row-start-2 lg:self-start lg:pt-8">
            {/* balance: keine Schusterzeile („Orte rundherum.“ allein, Sichtabnahme E2, Befund 14) */}
            <p data-erstes-bild="ort" className="mt-6 font-text text-fs-4 text-balance text-tinte flach:mt-4 lg:mt-0">
              {ort}
            </p>
            {/* auf jeder Breite folgen Hauptknopf und Telefon direkt auf Überschrift und Ort, der Vorspann erklärt danach den
                Termin (K-006; bei großer Systemschrift stand der Knopf sonst erst nach fast zwei Bildschirmen, auf t1024 und d1280
                an der Falz, Sichtabnahme E2 Befund 10, E2-SICHT-2 Befund 6) */}
            <div className="flex flex-col">
              <p className="order-1 mt-8 max-w-mass font-text text-fs-3 text-pretty text-tinte-2">
                <Textmarken text={vorspann} />
              </p>
              {/* Container für die Rufnummer: bei großer Systemschrift Vorwahl über der Nummer (Rufnummer.tsx). Reicht die Zeile
                  nicht für Anruf und WhatsApp nebeneinander (d1280), rückt WhatsApp in die nächste Zeile, statt dass beide
                  Beschriftungen umbrechen */}
              <div className="@container mt-8 flex flex-col gap-3 flach:mt-6 sm:flex-row sm:flex-wrap sm:items-center">
                <Hauptknopf href={hauptziel} erstesBild breit />
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <a
                    href={`tel:${contact.phoneLink}`}
                    data-erstes-bild="kontakt"
                    data-motion="druck"
                    className={knopfKlassen('neben', 'w-full px-4 sm:w-auto')}
                  >
                    <Icon name="telefon" groesse={5} className="shrink-0" />
                    <span className="min-w-0">
                      {/* inline-block: reicht der Platz nicht, rückt die ganze Nummer unter „Anrufen:“, statt nach „06441 /“ zu
                          brechen (Sichtabnahme E2, Befund 9) */}
                      Anrufen: <Rufnummer nummer={contact.phone} className="inline-block" />
                    </span>
                  </a>
                  <a
                    href={buildWhatsAppUrl(contact.whatsappNumber, kontextNachricht(pfad))}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-motion="druck"
                    // unter lg trägt die untere Leiste WhatsApp, unter xl der Kopf (weniger doppelte Bedienflächen, Sichtprüfung E2;
                    // auf t1024 brach der Knopf um, Sichtabnahme E2, Befund 10)
                    className={knopfKlassen('neben', 'px-4 max-xl:hidden')}
                  >
                    <WhatsAppLogo className="size-5 shrink-0" />
                    <span>Nachricht per WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Plan mit Kennzeile: ab lg rechts, an der Achse geschnitten, die Schnittkante liegt auf der Waage; die Bewertungszeile
            steht direkt über seiner Maßkette (vorher oben rechts mit 240 bis 500 px Lücke zum Plan, E2-SICHT-2 Befund 2). Das
            Lot des Plans wächst mit der Waage aus dem Kreuzpunkt, die Fugen rücken beim Laden in die Flucht. Unter lg ist die
            Hülle aufgelöst (contents): der ganze Plan ohne Achse, ab md wie das Foto rechtsbündig an der Textkante (Kanten von
            Plan und Foto fluchten, E2-SICHT-2 Befund 11), er rückt beim Eintritt in die Flucht; die Bewertungszeile rückt per
            order ans Ende, unter das Foto */}
        <div className="contents lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:flex lg:flex-col lg:gap-6 lg:self-end">
          {bewertung && (
            <div className="col-span-4 max-lg:order-1 md:col-span-6 md:col-start-3" style={wand}>
              <Bewertungszeile geteilt className="planblatt-wand font-text text-fs-2 text-tinte-2 hyphens-none max-lg:-mt-8" />
            </div>
          )}
          <div className="col-span-4 md:col-span-6 md:col-start-3">
            <div className="plan-buendig lg:hidden" style={wandAussen}>
              <Verlegeplan plan={plan} ohneAchse bemassung={false} flucht="zeigen" />
            </div>
            <div data-motion="sig-kreuzlinie" className="hidden lg:block">
              <Verlegeplan plan={plan} schnitt flucht="laden" />
            </div>
          </div>
        </div>
        {/* Foto unter der Waage. Unter lg das hohe Foto, ab md rechtsbündig an der Textkante (Runde 3). Ab lg von Wand zu Wand
            des Plans das Querformat (eigener Zuschnitt, K-012): so hoch wie die Textspalte daneben, der Einstieg bleibt kurz
            (vorher 4:5 mit 400 px Leere unter den Knöpfen, E2-SICHT-2 Befund 6). Das jeweils verborgene Bild lädt nicht
            (verzögertes Laden, display: none) */}
        <div className="col-span-4 md:col-span-6 md:col-start-3 lg:col-span-6 lg:col-start-7 lg:row-start-2" style={wand}>
          <div className="planblatt-wand lg:pt-8">
            <div className="lg:hidden">
              {typeof bildKlein === 'string' ? <Bildfeld arbeit={bildKlein as ArbeitId} sizes="(min-width: 768px) 75vw, 100vw" /> : bildKlein}
            </div>
            <Bildfeld arbeit={bildGross} sizes="(min-width: 1312px) 520px, 40vw" className="hidden lg:block" />
          </div>
        </div>
        {/* ab lg: die Waage als Schnittkante über die ganze Breite (wächst aus dem Kreuzpunkt mit dem Lot des Plans) und das
            Lot nach dem Knick an der Achse bis zum Fuß des Einstiegs, wo die Leitachse übernimmt */}
        <div aria-hidden="true" data-motion="sig-kreuzlinie" className="pointer-events-none absolute top-0 right-0 -left-4 hidden lg:col-span-full lg:row-start-2 lg:block">
          <span className="kreuzlinie-waage kreuzlinie-aus-start" />
        </div>
        {/* bottom-0: die Rasterfläche der letzten Zeile reicht für absolute Kinder bis zur Polsterkante, also bis zum Fuß */}
        <div aria-hidden="true" data-motion="sig-kreuzlinie" className="pointer-events-none absolute top-0 bottom-0 -left-4 hidden lg:col-start-1 lg:row-start-2 lg:block">
          <span className="kreuzlinie-lot kreuzlinie-nach-waage" />
        </div>
      </div>
    </section>
  );
}
