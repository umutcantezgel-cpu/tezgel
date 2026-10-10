// Inhalt des Mobilblatts (unter lg) – Variante A „Schriftfeld“: Felder untereinander, Lot am linken Rand (K-003 Prinzip 7,
// K-007: Lot bei `--k-rand` − 1 px, in Laser; die Fugen der Felder setzen am Lot an, kein Text berührt es).
// Reihenfolge: Kopfzeile (Logo-Feld · Schließen-Feld an der Stelle des Schalters) · Etikett · Bereiche als Akkordeon
// (<details>, klappt ohne JavaScript auf) · Öffnungszeit und Rechtliches · unten fest: Hauptknopf, Anrufen, WhatsApp.
// Server-Komponente; mit `statisch` als Standbild für die Vorschau-Tafel (ohne Popover-Auslöser und ohne Autofokus).
import { COMPANY_DATA } from '@/config/company';
import { Akkordeon, AkkordeonEintrag } from '@/components/kern/basis/Akkordeon';
import Etikett from '@/components/kern/basis/Etikett';
import Knopf from '@/components/kern/basis/Knopf';
import { fokus, verbinde } from '@/components/kern/basis/klassen';
import Icon from '@/components/kern/icons/Icon';
import LogoFeld from '@/components/kern/kopf-a/Logo';
import NavLink from '@/components/kern/kopf-a/NavLink';
import { BEREICHE, HAUPTZIEL } from '@/components/kern/kopf-a/daten';
import { BLATT_ID, TEXTE } from '@/components/kern/kopf-a/texte';

export type MobilInhaltProps = {
  /** Standbild (Vorschau): kein Popover-Auslöser, kein Autofokus, eigene Akkordeon-Gruppe. */
  statisch?: boolean;
  /** Standbild: dieser Bereich (Index) ist aufgeklappt. */
  offenerBereich?: number;
};

const FELD = 'flex min-h-k-8 items-center justify-center gap-k-2 k-text text-k-2 font-semibold text-k-tinte';
const FELD_WIRKUNG = 'pointer-fine:hover:bg-k-kalk active:bg-k-fuge';

export default function MobilInhalt({ statisch = false, offenerBereich }: MobilInhaltProps) {
  const { contact, hours } = COMPANY_DATA;
  return (
    <div className="flex min-h-full flex-col">
      {/* Kopfzeile: deckt sich mit dem Kopf, das Schließen-Feld liegt genau über dem Schalter */}
      <div className="flex h-(--k-kopf-hoehe) shrink-0 border-b border-k-fuge bg-k-fliese">
        <LogoFeld etikett={statisch ? 'hidden' : 'hidden sm:flex'} />
        <span aria-hidden="true" className="flex-1" />
        <button
          type="button"
          popoverTarget={statisch ? undefined : BLATT_ID}
          popoverTargetAction={statisch ? undefined : 'hide'}
          autoFocus={!statisch}
          aria-label={TEXTE.menueSchliessen}
          data-motion="zustand"
          className={verbinde(
            'flex h-full w-(--k-kopf-hoehe) shrink-0 cursor-pointer items-center justify-center border-l border-k-fuge text-k-tinte',
            FELD_WIRKUNG,
            fokus('hell'),
          )}
        >
          <Icon name="schliessen" groesse={24} />
        </button>
      </div>

      {/* Bereiche am Lot */}
      <div className="flex-1 pl-(--k-rand)">
        <div className="relative h-full before:absolute before:inset-y-0 before:-left-px before:w-px before:bg-k-laser">
          <div className="pt-k-5 pr-(--k-rand) pb-k-3 pl-k-4">
            <Etikett als="p">
              {TEXTE.bereiche}
            </Etikett>
          </div>
          <nav aria-label={TEXTE.navKategorien}>
            <Akkordeon>
              {BEREICHE.map((bereich, index) => (
                <AkkordeonEintrag
                  key={bereich.name}
                  name={statisch ? 'k-kopf-a-bereich-standbild' : 'k-kopf-a-bereich'}
                  offen={statisch && offenerBereich === index}
                  groesse="gross"
                  className="pr-(--k-rand) pl-k-4"
                  titel={
                    <span className="flex flex-col gap-k-1">
                      <span className="flex flex-wrap items-center gap-x-k-3 gap-y-k-1">
                        <span>{bereich.name}</span>
                        {bereich.featured ? <Etikett rahmen>{bereich.featured.eyebrow}</Etikett> : null}
                      </span>
                      <span className="text-k-2 font-normal text-k-tinte-2">{bereich.description}</span>
                    </span>
                  }
                >
                  <div className="flex flex-col gap-k-5">
                    {bereich.kategorien.map((kategorie) => (
                      <div key={kategorie.category}>
                        <Etikett als="p">
                          {kategorie.category}
                        </Etikett>
                        <ul className="mt-k-2 border-t border-k-fuge">
                          {kategorie.items.map((punkt) => (
                            <li key={punkt.path + punkt.name} className="border-b border-k-fuge">
                              <NavLink
                                href={punkt.path}
                                marke="lot"
                                prefetch={false}
                                className={verbinde(
                                  'relative flex min-h-k-7 items-start gap-k-2 py-k-3 pl-k-3 data-aktiv:bg-k-fliese',
                                  FELD_WIRKUNG,
                                  fokus('hell'),
                                )}
                              >
                                <span className="flex min-w-0 flex-col">
                                  <span className="text-k-3 font-semibold text-k-tinte">{punkt.name}</span>
                                  {punkt.desc ? <span className="text-k-2 text-k-tinte-2">{punkt.desc}</span> : null}
                                </span>
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    <NavLink
                      href={bereich.path}
                      prefetch={false}
                      className={verbinde(
                        'flex min-h-k-7 w-fit items-center gap-k-2 rounded-k-1 text-k-2 font-semibold text-k-tinte underline decoration-k-strich decoration-1 underline-offset-4 pointer-fine:hover:decoration-k-tinte pointer-fine:hover:decoration-2',
                        fokus('hell'),
                      )}
                    >
                      {TEXTE.alleZu(bereich.name)}
                      <Icon name="pfeil" groesse={16} />
                    </NavLink>
                  </div>
                </AkkordeonEintrag>
              ))}
            </Akkordeon>
          </nav>
          <div className="flex flex-wrap items-center justify-between gap-x-k-4 gap-y-k-2 py-k-4 pr-(--k-rand) pl-k-4">
            <span className="flex items-center gap-k-2 k-mono text-k-1 text-k-tinte-2">
              <Icon name="uhr" groesse={16} />
              {hours.formattedWeekdays}
            </span>
            <span className="flex items-center gap-k-3 text-k-1">
              <NavLink href="/impressum" prefetch={false} className={verbinde('flex min-h-k-7 items-center text-k-tinte-2 underline decoration-k-strich underline-offset-4 pointer-fine:hover:text-k-tinte', fokus('hell'))}>
                {TEXTE.impressum}
              </NavLink>
              <span aria-hidden="true" className="text-k-strich">
                ·
              </span>
              <NavLink href="/datenschutz" prefetch={false} className={verbinde('flex min-h-k-7 items-center text-k-tinte-2 underline decoration-k-strich underline-offset-4 pointer-fine:hover:text-k-tinte', fokus('hell'))}>
                {TEXTE.datenschutz}
              </NavLink>
            </span>
          </div>
        </div>
      </div>

      {/* Unten fest: Hauptknopf über die ganze Breite, darunter Anrufen | WhatsApp als zwei Felder */}
      <div className="sticky bottom-0 border-t border-k-fuge bg-k-fliese">
        <Knopf href={HAUPTZIEL} breit className="min-h-k-8" hinten={<Icon name="pfeil" groesse={20} />}>
          {TEXTE.blattKnopf}
        </Knopf>
        <div className="grid grid-cols-2">
          <a
            href={`tel:${contact.phoneLink}`}
            aria-label={TEXTE.telefon(contact.phone)}
            data-motion="zustand"
            className={verbinde(FELD, FELD_WIRKUNG, fokus('hell'))}
          >
            <Icon name="telefon" groesse={20} />
            {TEXTE.anrufen}
          </a>
          <a
            href={contact.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={TEXTE.whatsapp(contact.whatsapp)}
            data-motion="zustand"
            className={verbinde(FELD, FELD_WIRKUNG, 'border-l border-k-fuge', fokus('hell'))}
          >
            <Icon name="whatsapp" groesse={20} />
            {TEXTE.whatsappKurz}
          </a>
        </div>
      </div>
    </div>
  );
}
