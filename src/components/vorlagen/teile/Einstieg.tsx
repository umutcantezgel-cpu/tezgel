// Vorlagen · 1 Worum es geht (KERN v3 K-006, K-009; E-025; K-016 „Ruhe“, E-047): erster Bildschirm jeder Wissens-, Orts- und
// Arbeitsseite (und der Erzählseiten ohne Planblatt oder mittigen Einstieg). Ruhig und mittig wie der Einstieg der
// Startseite, kein zweiter Strang daneben: Brotkrumen, H1, Ort, Hauptknopf, Anruf (WhatsApp erst ab lg, darunter trägt die
// untere Leiste ihn), dann der Vorspann (nach den Knöpfen, damit sie auch bei großer Systemschrift im ersten Bildschirm
// stehen); darunter das Einstiegsbild vollständig als einziges preload der Seite (bzw. der Schlitz, z. B. das Einzugsband
// der Ortsseite). Die Pflichtelemente des ersten Bildschirms tragen data-erstes-bild (Logo im Kopf).
// Eingang ohne Vorhang (E-067-4, bewegung.css „eingang“), nicht in Arbeitsansichten (kompakt: kein Signaturmoment, K-007):
// Der Abschnitt ist der Behälter (data-motion="eingang"). Die H1 steht ab dem ersten Bild, ohne Zeilenmaske (UM-E4-SICHT-FIX
// M-A3 Nr. 2): Sie ist auf den Wissensseiten das LCP-Element (vorher der Vorspann), und LCP-Kandidaten starten nie unsichtbar
// (E-067-4). Ohne Schnur setzen sich Ort und Knopfzeile, über die Oberkante eines Fotos zieht ein Fugenriss; unter sm (Handy)
// stehen Ort und Knopfzeile ab dem ersten Bild (max-sm:animate-none), der Fugenriss entfällt. Der Vorspann steht auf jeder
// Breite ab dem ersten Bild (LCP-Kandidat).
// Lot (UM-E4-VORL, Leitfaden wie auf /): Steht der Einstieg in einer Seitenformel vor der Leitachse (Wissens- und
// Ortsseiten, Erzählseite mit einfachem Einstieg), trägt er sein eigenes Lot in Grundschicht an derselben Stelle wie die
// Leitachse danach (`lot`, wie Leitachse mit gezogen={false}, R-02a). Es läuft ohne Lücke in den Leitfaden über; rot wird
// erst das Lot nach dem Einstieg, so steht im ersten Bildschirm kein zweites Rot neben Karte oder Plan (K-003). Die Zierebene
// liegt unter dem Inhalt, der Inhalt in einer positionierten Hülle ohne eigenen Stapelkontext (wie in kern/Leitachse).
// An der Schnur (`schnur`, mit `lot`, nicht kompakt; UM-E4-SICHT-FIX M-A3, Sicht E4 Anlauf 1: im Einstieg der Unterseiten
// keine Schnur, auf /fliesen mobil eine reine Textfläche, der Vorspann zentriert über sechs bis zwölf Zeilen): dieselbe Figur
// wie der mittige Einstieg (Schnurebene). Die Grundlinie der letzten H1-Zeile steht auf der Schnur (schnur-grundlinie, der
// Titel steht dafür in Block-Zeilen), von der Schnur reicht das rote Lotstück bis an das Bild bzw. den Vorspann, darunter
// übernimmt das gezogene Lot (Laserachse). Reihenfolge wie die Figur: H1, Ort, Knöpfe (Fugenstufe 12), Bewertungszeile
// (`bewertung`), dann Bild oder Plan, dann der Vorspann; so zeigt /fliesen mobil den Plan im ersten Bild. Ein Rot im ersten
// Bildschirm, die Schnur: Ein Plan im Bildplatz steht ohne seine rote Achse (WissensSeite, `ohneAchse`); die Ortsseiten
// schalten die Schnur erst zusammen mit dem Einzugsband außerhalb des Einstiegs ein (M-C6), nie Schnur und rotes Band zugleich.
// Im Eingang ziehen nur Schnur und Lotstück (data-einstieg="schnur", bewegung.css: Schnur in dauer-1); H1, Ort, Knöpfe,
// Bewertung, Bild und Vorspann stehen ab dem ersten Bild.
// Vorspann (M-A3 Nr. 4): über VORSPANN_LANG Zeichen (mobil rund drei Zeilen) linksbündig im Satzmaß, sonst mittig; in schmaler
// Spalte (unter 20rem, große Systemschrift) immer linksbündig.
// Flach (Handy quer, q844; M-A3 Nr. 6, auch kompakt): Brotkrumen aus, Abstände und H1 eine Stufe kleiner, damit Hauptknopf und
// Anruf im ersten Bild stehen; die Ortszeile bricht weiter um. Feste Satzzeilen (`titelZeilen`, auch kompakt) stehen als
// Block-Zeilen und fließen flach als ein Satz.
// Serverkomponente.
import type { ReactNode } from 'react';
import clsx from 'clsx';
import Icon from '@/components/icons/Icon';
import WhatsAppLogo from '@/components/ui/WhatsAppLogo';
import Bewertungszeile from '@/components/kern/Bewertungszeile';
import Bildfeld from '@/components/kern/Bildfeld';
import Brotkrumen, { type Krume } from '@/components/kern/Brotkrumen';
import Hauptknopf from '@/components/kern/Hauptknopf';
import { ACHSE_LAGE } from '@/components/kern/Leitachse';
import Rufnummer from '@/components/kern/Rufnummer';
import Textmarken from '@/components/kern/Textmarken';
import { knopfKlassen, seitenKlassen } from '@/components/kern/stile';
import { mitFugen } from '@/components/kern/zusammen';
import { COMPANY_DATA } from '@/config/company';
import type { ArbeitId } from '@/config/arbeiten';
import { klartext } from '@/lib/textmarken';
import { buildWhatsAppUrl, kontextNachricht } from '@/lib/whatsapp';
import Schnurebene, { Aufhaengung, Lotstueck } from './Schnurebene';

/** Ab dieser Zeichenzahl steht die H1 eine Stufe kleiner (höchstens drei Zeilen bei 1440 px) */
const LANGER_TITEL = 44;
/** Ab dieser Zeichenzahl (Klartext) steht der Vorspann linksbündig: mobil rund drei Zeilen (M-A3 Nr. 4) */
const VORSPANN_LANG = 90;

export interface EinstiegProps {
  pfad: string;
  brotkrumen?: Krume[];
  titel: string;
  /** H1 in festen Satzzeilen (auch kompakt); zusammen ergeben sie den Titel. Flach fließen sie als ein Satz */
  titelZeilen?: string[];
  ort: string;
  vorspann: string;
  /** Einstiegsbild aus ARBEITEN (preload) oder eigener Bildplatz (Startseite: Startbild mit Belag) */
  bild?: ArbeitId | ReactNode;
  /** unter dem Bild, z. B. die Kennzeile der Bewertungen */
  unterBild?: ReactNode;
  /** Ziel des Hauptknopfs: `/kontakt`, auf der Startseite das Formular `#termin` */
  hauptziel?: string;
  /** Arbeitsseite (K-009: ruhig, dicht, schnell): weniger Raum, H1 eine Stufe kleiner, ohne Bildspalte */
  kompakt?: boolean;
  /** eigenes Lot in Grundschicht: Der Einstieg steht in der Seitenformel vor der Leitachse (Leitfaden, UM-E4-VORL) */
  lot?: boolean;
  /** Figur „An der Schnur“ (mit `lot`, nicht kompakt; UM-E4-SICHT-FIX M-A3): Schnur unter der H1, rotes Lotstück, Bild vor dem
   *  Vorspann. Wissensseiten; Ortsseiten erst mit dem Einzugsband außerhalb des Einstiegs (M-C6) */
  schnur?: boolean;
  /** Bewertungszeile unter den Knöpfen (an der Schnur; Bewertungszahlen nur über die Bewertungszeile, G8) */
  bewertung?: boolean;
  /** Der nächste Abschnitt steht auf Fliese (LageInhalt.aufFliese, wie EinstiegMitte, UM-E4-CHOR-FIX): ab lg bleibt unter dem
   *  letzten Block eine Stufe 16 Kalk bis zur Fuge statt einer Stufe 24 (dahinter eine Stufe 16 bis zum Kopf der Lage). Innen
   *  gesetzt, damit das Lot des Einstiegs bis an die Fuge reicht */
  fugeUnten?: boolean;
}

export default function Einstieg({ pfad, brotkrumen, titel, titelZeilen, ort, vorspann, bild, unterBild, hauptziel = '/kontakt', kompakt = false, lot = false, schnur = false, bewertung = false, fugeUnten = false }: EinstiegProps) {
  const { contact } = COMPANY_DATA;
  const titelId = 'seite-titel';
  const foto = typeof bild === 'string';
  const mitBild = Boolean(bild) && !kompakt;
  const anDerSchnur = schnur && lot && !kompakt;
  // Abstand unter dem letzten Block: ab lg eine Stufe 24, vor einer Fuge eine Stufe 16 (fugeUnten)
  const unten = clsx('pb-16', fugeUnten ? 'lg:pb-16' : 'lg:pb-24');
  // H1 eine Stufe kleiner bei langem Titel, flach noch eine Stufe kleiner (M-A3 Nr. 6)
  const langerTitel = !kompakt && titel.length > LANGER_TITEL;
  const titelStufe = langerTitel ? 'text-fs-5 flach:text-fs-4' : 'text-fs-6 flach:text-fs-5';
  // Satzzeilen als Blöcke, flach als ein Satz; an der Schnur steht der Titel in einem Block, damit die Grundlinie seiner
  // letzten Zeile auf der Schnur steht (schnur-grundlinie > :last-child)
  const titelInhalt = titelZeilen
    ? titelZeilen.map((zeile, i) => (
        <span key={zeile} className="block flach:inline">
          {zeile}
          {i < titelZeilen.length - 1 && ' '}
        </span>
      ))
    : anDerSchnur
      ? <span className="block">{titel}</span>
      : titel;
  const h1 = (
    <h1
      id={titelId}
      tabIndex={-1}
      data-erstes-bild="ueberschrift"
      className={clsx(titelStufe, anDerSchnur && 'schnur-grundlinie', 'max-w-mass text-balance text-tinte outline-none @max-3xs:text-fs-5')}
    >
      {titelInhalt}
    </h1>
  );
  const knoepfe = (
    <>
      <Hauptknopf href={hauptziel} erstesBild breit />
      <a href={`tel:${contact.phoneLink}`} data-erstes-bild="kontakt" data-motion="druck" className={knopfKlassen('neben', 'w-full px-4 sm:w-auto @max-3xs:flex-col @max-3xs:gap-1')}>
        <Icon name="telefon" groesse={5} className="shrink-0" />
        <span className="min-w-0">
          Anrufen: <Rufnummer nummer={contact.phone} />
        </span>
      </a>
      <a
        href={buildWhatsAppUrl(contact.whatsappNumber, kontextNachricht(pfad))}
        target="_blank"
        rel="noopener noreferrer"
        data-motion="druck"
        className={knopfKlassen('neben', 'px-4 max-lg:hidden')}
      >
        <WhatsAppLogo className="size-5 shrink-0" />
        <span>Nachricht per WhatsApp</span>
      </a>
    </>
  );
  // Vorspann: lang linksbündig im Satzmaß, kurz mittig; in schmaler Spalte immer linksbündig (M-A3 Nr. 4, nur an der Schnur)
  const vorspannBuendig = klartext(vorspann).length > VORSPANN_LANG ? 'text-left' : '@max-xs:text-left';
  const vorspannAbsatz = (
    <p className={clsx('max-w-mass font-text text-fs-3 text-pretty text-tinte-2', anDerSchnur ? vorspannBuendig : 'mt-8 flach:mt-4')}>
      <Textmarken text={vorspann} fugen />
    </p>
  );

  if (anDerSchnur) {
    // Figur „An der Schnur“: H1 auf der Schnur, darunter in der Ebene der Schnur Ort, Knöpfe, Bewertung, Bild, Vorspann
    return (
      <section aria-labelledby={titelId} data-formel="worum" data-motion="eingang" data-einstieg="schnur" className="@container relative">
        {/* über der Ebene der Schnur (z-10): Die Unterlängen der letzten Zeile ragen über die Schnur in den Block darunter */}
        <div className={clsx(seitenKlassen, 'relative z-10 flex flex-col items-center pt-24 text-center flach:pt-16 lg:pt-32')}>
          {brotkrumen && brotkrumen.length > 1 && <Brotkrumen wege={brotkrumen} className="mb-6 flach:hidden" />}
          {h1}
        </div>
        <div className="relative">
          <Schnurebene stark />
          <div className="relative">
            <div className={clsx(seitenKlassen, 'relative flex flex-col items-center pt-6 text-center flach:pt-3')}>
              {/* rotes Lot von der Schnur bis an den nächsten Block (dessen Abstand pt-8, flach pt-4, ab lg pt-6) */}
              <Lotstueck className="-bottom-8 flach:-bottom-4 lg:-bottom-6" />
              {/* Ort, Knöpfe und Bewertung stehen ab dem ersten Bild (animate-none: kein Setzen im Eingang) */}
              <p data-erstes-bild="ort" className="max-w-mass font-text text-fs-4 text-balance text-tinte-2 animate-none">
                {mitFugen(ort)}
              </p>
              <div className="mt-3 flex w-full flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center lg:mt-4">{knoepfe}</div>
              {bewertung && <Bewertungszeile className="mt-4 font-text text-fs-2 text-tinte-2 hyphens-none flach:mt-3" />}
            </div>
            {mitBild && (
              <div className={clsx(seitenKlassen, 'relative pt-8 flach:pt-4 lg:pt-6')}>
                {/* ein Foto hängt an einer Fuge, die das Lot an seinem Ende kreuzt (ab sm); ein Plan steht ohne */}
                {foto && <Aufhaengung lage="top-8 flach:top-4 lg:top-6" />}
                <div className="mx-auto w-full max-w-md lg:w-1/2 lg:max-w-full">
                  {foto ? <Bildfeld arbeit={bild as ArbeitId} lcp sizes="(min-width: 1024px) 50vw, (min-width: 640px) 28rem, 100vw" /> : bild}
                  {unterBild}
                </div>
              </div>
            )}
            <div className={clsx(seitenKlassen, 'flex flex-col items-center', mitBild ? 'pt-8' : 'pt-8 flach:pt-4 lg:pt-6', unten)}>{vorspannAbsatz}</div>
          </div>
        </div>
      </section>
    );
  }

  const inhalt = (
    <>
      {/* oben Platz für den festen Kopf (h-16); bei großer Systemschrift am Handy (unter 16 rem Breite) steht die H1 eine Stufe
          kleiner, damit der Hauptknopf über der unteren Leiste steht (E3-SICHT, E-061) */}
      <div className={clsx(seitenKlassen, 'flex flex-col items-center pt-24 text-center flach:pt-16 lg:pt-32', kompakt ? 'pb-12 lg:pb-16' : mitBild ? 'pb-16 lg:pb-24' : unten)}>
        {brotkrumen && brotkrumen.length > 1 && <Brotkrumen wege={brotkrumen} className="mb-6 flach:hidden" />}
        {h1}
        {/* die Ortszeile trägt Wörter aus FUGEN („Fliesenverlegung Tezgel aus Aßlar …“): Trennstelle an der Fuge, nicht im Wortteil
            (UM-E4-INHALT Teil B, FS-K Nr. 10; bei m360 und 200 % gemessen) */}
        <p data-erstes-bild="ort" className="mt-6 max-w-mass font-text text-fs-4 text-balance text-tinte-2 max-sm:animate-none flach:mt-3">
          {mitFugen(ort)}
        </p>
        <div data-eingang="knoepfe" className="mt-8 flex w-full flex-col items-center gap-3 max-sm:animate-none sm:flex-row sm:flex-wrap sm:justify-center flach:mt-4">
          {knoepfe}
        </div>
        {/* ohne data-eingang: LCP-Kandidat (E-067-4, siehe oben). Wörter aus FUGEN trennen an ihrer Fuge („Bad-sanierung“,
            „Fliesen-verlegung“; UM-E4-INHALT Teil B, FS-K Nr. 10) */}
        {vorspannAbsatz}
      </div>
      {mitBild && (
        <div className={clsx(seitenKlassen, unten)}>
          {/* vollständig, mittig; am Desktop so groß, dass es wirkt, ohne die Seite zu sprengen (wie auf der Startseite).
              Fugenriss im Eingang nur über einem Foto (Kennung; relative als Halt), nicht über Karte oder Plan im Bildplatz;
              unter sm entfällt er (max-sm:after:hidden, wie im mittigen Einstieg) */}
          <div data-eingang={foto ? 'bild' : undefined} className={clsx(foto && 'relative max-sm:after:hidden', 'mx-auto w-full max-w-md lg:w-1/2 lg:max-w-full')}>
            {foto ? <Bildfeld arbeit={bild as ArbeitId} lcp sizes="(min-width: 1024px) 50vw, (min-width: 640px) 28rem, 100vw" /> : bild}
            {unterBild}
          </div>
        </div>
      )}
    </>
  );
  return (
    <section aria-labelledby={titelId} data-formel="worum" data-motion={kompakt ? undefined : 'eingang'} className="@container relative">
      {lot ? (
        <>
          {/* Zierebene: Lot in Grundschicht an der Stelle der Leitachse (data-leitachse für die Überlappungsprüfung) */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className={clsx(seitenKlassen, 'relative h-full')}>
              <div data-leitachse="" className={clsx('leitachse', ACHSE_LAGE)} />
            </div>
          </div>
          <div className="relative">{inhalt}</div>
        </>
      ) : (
        inhalt
      )}
    </section>
  );
}
