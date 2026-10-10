// Mobilmenü-Inhalt Variante B „Achse“ (K-003 Prinzip 7 „Mobil ist ein eigenes Blatt“): die Achse steht als Lot am
// linken Rand (2 px Laser auf --k-rand), die Bereiche groß im Anzeige-Satz, Mono-Ziffern 01–05 davor. Der aktive Bereich
// trägt ein Fugenkreuz auf dem Lot (Laser) und den Namen in Laser tief – nicht nur Farbe. Darunter Anfrage, Telefon,
// WhatsApp (Ziele aus COMPANY_DATA), Erreichbarkeit und Rechtliches wie im Bestand.
// Rein darstellend: Zustand (welcher Bereich aufgeklappt ist) und Handler kommen von `Mobilmenue`, die Vorschau zeigt
// das Blatt statisch. Aufklappen über das Register (`aufklappen`); zugeklappte Bereiche sind `inert`.
import Link from 'next/link';
import type { MouseEvent } from 'react';
import { Etikett, Fugenkreuz, Knopf, Textlink, fokus, verbinde } from '@/components/kern/basis';
import Icon from '@/components/kern/icons/Icon';
import {
  TEXT,
  aktiverBereich,
  alleZu,
  telefonName,
  whatsappName,
  type Eintrag,
  type Kontakt,
  type Ziel,
} from '@/components/kern/kopf-b/modell';

export type MobilBlattProps = {
  eintraege: Eintrag[];
  kontakt: Kontakt;
  anfrage: Ziel;
  pfad: string;
  /** Index des aufgeklappten Bereichs */
  offen: number | null;
  /** eindeutiger Präfix für aria-controls (useId des Aufrufers) */
  idPraefix: string;
  umschalten?: (i: number) => void;
  beimFolgen?: () => void;
  beiWhatsApp?: (e: MouseEvent<HTMLAnchorElement>) => void;
};

const zweistellig = (n: number) => String(n).padStart(2, '0');

export default function MobilBlatt({ eintraege, kontakt, anfrage, pfad, offen, idPraefix, umschalten, beimFolgen, beiWhatsApp }: MobilBlattProps) {
  const aktiv = aktiverBereich(pfad, eintraege);
  return (
    <div className="relative px-(--k-rand) pb-k-8">
      {/* Lot: Achse am linken Rand, mittig auf --k-rand */}
      <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-(--k-rand) w-(--k-linie-2) -translate-x-1/2 bg-k-laser" />

      <div className="pl-k-5 pt-k-5">
        <Etikett als="p">{TEXT.mobilEtikett}</Etikett>
      </div>

      <nav aria-label={TEXT.navMobil} className="mt-k-3">
        <ul className="border-t border-k-fuge">
          {eintraege.map((eintrag, i) => {
            const istAuf = offen === i;
            const istAktiv = aktiv === i;
            const bereichId = `${idPraefix}-bereich-${i}`;
            return (
              <li key={eintrag.pfad} className="relative border-b border-k-fuge pl-k-5">
                {istAktiv ? (
                  <span aria-hidden="true" className="absolute left-0 top-k-5 flex -translate-x-1/2 text-k-laser">
                    <Fugenkreuz className="size-k-4" />
                  </span>
                ) : null}
                <button
                  type="button"
                  aria-expanded={istAuf}
                  aria-controls={bereichId}
                  onClick={umschalten ? () => umschalten(i) : undefined}
                  data-motion="zustand"
                  className={verbinde(
                    'group/bereich flex min-h-k-8 w-full cursor-pointer items-start gap-k-3 rounded-k-1 py-k-4 text-left',
                    fokus('hell'),
                  )}
                >
                  <span aria-hidden="true" className={verbinde('flex h-lh shrink-0 items-center k-mono text-k-1', istAktiv ? 'text-k-laser-tief' : 'text-k-tinte-2')}>
                    {zweistellig(i + 1)}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span
                      className={verbinde(
                        'block k-anzeige text-k-5 decoration-2 underline-offset-4 pointer-fine:group-hover/bereich:underline',
                        istAktiv ? 'text-k-laser-tief' : 'text-k-tinte',
                      )}
                    >
                      {eintrag.name}
                    </span>
                    {eintrag.beschreibung ? <span className="mt-k-1 block k-text text-k-2 text-k-tinte-2">{eintrag.beschreibung}</span> : null}
                    {eintrag.hervorhebung ? (
                      <Etikett rahmen className="mt-k-2">
                        {eintrag.hervorhebung.etikett}
                      </Etikett>
                    ) : null}
                  </span>
                  <span className="flex h-k-6 shrink-0 items-center text-k-tinte">
                    <Icon name={istAuf ? 'minus' : 'plus'} groesse={24} />
                  </span>
                </button>

                <div id={bereichId} data-motion="aufklappen" data-offen={istAuf ? '' : undefined} inert={!istAuf}>
                  <div>
                    <div className="flex flex-col gap-k-5 pb-k-5">
                      {eintrag.kategorien.map((kat) => (
                        <div key={kat.titel}>
                          <Etikett als="p" kreuz>
                            {kat.titel}
                          </Etikett>
                          <ul className="mt-k-2">
                            {kat.punkte.map((p) => {
                              const hier = pfad === p.pfad;
                              return (
                                <li key={p.pfad + p.name}>
                                  <Link
                                    href={p.pfad}
                                    prefetch={false}
                                    onClick={beimFolgen}
                                    aria-current={hier ? 'page' : undefined}
                                    data-motion="zustand"
                                    className={verbinde(
                                      'group/punkt relative flex min-h-k-7 flex-col justify-center rounded-k-1 py-k-2 pl-k-3 k-text',
                                      fokus('hell'),
                                    )}
                                  >
                                    <span
                                      aria-hidden="true"
                                      className={verbinde(
                                        'pointer-events-none absolute inset-y-k-2 left-0 border-l-2 border-k-laser',
                                        hier ? 'opacity-100' : 'opacity-0 pointer-fine:group-hover/punkt:opacity-100',
                                      )}
                                    />
                                    <span className={verbinde('text-k-3 font-semibold', hier ? 'text-k-laser-tief' : 'text-k-tinte')}>{p.name}</span>
                                    {p.beschreibung ? <span className="text-k-2 text-k-tinte-2">{p.beschreibung}</span> : null}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      ))}
                      <Knopf
                        href={eintrag.pfad}
                        art="text"
                        onClick={beimFolgen}
                        aria-current={pfad === eintrag.pfad ? 'page' : undefined}
                        hinten={<Icon name="pfeil" groesse={16} />}
                        className="self-start"
                      >
                        {alleZu(eintrag.name)}
                      </Knopf>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="flex flex-col gap-k-3 pl-k-5 pt-k-6">
        <Knopf href={anfrage.pfad} breit onClick={beimFolgen} hinten={<Icon name="pfeil" groesse={16} />}>
          {TEXT.mobilAnfrage}
        </Knopf>
        <div className="grid gap-k-2 sm:grid-cols-2">
          <Knopf
            href={`tel:${kontakt.telefonLink}`}
            art="neben"
            breit
            aria-label={telefonName(kontakt.telefon)}
            vorne={<Icon name="telefon" groesse={20} />}
          >
            {TEXT.anrufen}
          </Knopf>
          <Knopf
            href={kontakt.whatsappLink}
            art="neben"
            breit
            target="_blank"
            rel="noopener noreferrer"
            onClick={beiWhatsApp}
            aria-label={whatsappName(kontakt.whatsapp)}
            vorne={<Icon name="whatsapp" groesse={20} />}
          >
            {TEXT.whatsapp}
          </Knopf>
        </div>
        <p className="flex items-center gap-k-2 k-mono text-k-1 text-k-tinte-2">
          <Icon name="uhr" groesse={16} />
          {kontakt.zeiten}
        </p>
        <p className="flex gap-k-5 k-text text-k-2">
          <Textlink href="/impressum" onClick={beimFolgen} className="inline-flex min-h-k-7 items-center">
            {TEXT.impressum}
          </Textlink>
          <Textlink href="/datenschutz" onClick={beimFolgen} className="inline-flex min-h-k-7 items-center">
            {TEXT.datenschutz}
          </Textlink>
        </p>
      </div>
    </div>
  );
}
