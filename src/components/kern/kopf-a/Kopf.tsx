// Kern-Kopf · Variante A „Schriftfeld“ (P3-06a, KERN v1.2, K-011).
// Der Kopf ist das Schriftfeld eines Plans: eine Zeile von Feldern mit 1-px-Fugen –
//   Logo-Feld (+ Orts-Etikett, wo Platz ist) | Hauptnavigation (ab lg, je Bereich ein Feld) | Telefon (Mono) | Hauptknopf
// und unter lg am rechten Rand das Feld des Menü-Schalters.
// Fest über `position: sticky` am oberen Rand (bleibt im Fluss: kein Platzhalter, kein Sprung), Höhe `--k-kopf-hoehe`
// (64 px, texte.ts), kein Schrumpfen, kein Farbwechsel beim Scrollen, unten die 1-px-Fuge (`shadow-k-1`, K-008).
// Server-Komponente ohne Props; den Pfad lesen die kleinen Client-Teile selbst (NavLink, MegaEintrag, MobilBlatt).
// Vor der Hydrierung bedienbar (V-06): Planblätter und Mobilblatt sind native Popovers (`popover` + `popovertarget`).
import type { CSSProperties } from 'react';
import { COMPANY_DATA } from '@/config/company';
import Knopf from '@/components/kern/basis/Knopf';
import { fokus, verbinde } from '@/components/kern/basis/klassen';
import Icon from '@/components/kern/icons/Icon';
import LogoFeld from '@/components/kern/kopf-a/Logo';
import MegaEintrag from '@/components/kern/kopf-a/MegaEintrag';
import MenueSchalter from '@/components/kern/kopf-a/MenueSchalter';
import MobilBlatt from '@/components/kern/kopf-a/MobilBlatt';
import MobilInhalt from '@/components/kern/kopf-a/MobilInhalt';
import Planblatt from '@/components/kern/kopf-a/Planblatt';
import { BEREICHE, HAUPTZIEL } from '@/components/kern/kopf-a/daten';
import { KOPF_HOEHE, KOPF_REST, TEXTE, megaId } from '@/components/kern/kopf-a/texte';

export default function Kopf() {
  const { contact } = COMPANY_DATA;
  return (
    <header
      style={{ '--k-kopf-hoehe': KOPF_HOEHE, '--k-kopf-rest': KOPF_REST } as CSSProperties}
      className="sticky top-0 z-40 h-(--k-kopf-hoehe) shrink-0 bg-k-fliese text-k-tinte shadow-k-1"
    >
      <div className="mx-auto flex h-full max-w-(--k-seite) border-x border-k-fuge">
        <LogoFeld sofort etikett="hidden sm:flex lg:hidden" />

        <nav aria-label={TEXTE.nav} className="hidden h-full lg:flex">
          <ul className="flex h-full">
            {BEREICHE.map((bereich, index) => (
              <MegaEintrag key={bereich.name} id={megaId(index)} name={bereich.name} href={bereich.path} pfade={bereich.pfade}>
                <Planblatt bereich={bereich} />
              </MegaEintrag>
            ))}
          </ul>
        </nav>

        {/* leeres Feld: die Zeile füllt die Seitenbreite, rechts fluchten Telefon und Hauptknopf */}
        <span aria-hidden="true" className="min-w-0 flex-1" />

        <a
          href={`tel:${contact.phoneLink}`}
          aria-label={TEXTE.telefon(contact.phone)}
          data-motion="zustand"
          className={verbinde(
            'hidden h-full min-w-(--k-kopf-hoehe) shrink-0 items-center justify-center gap-k-1 border-l border-k-fuge px-k-4 text-k-tinte pointer-fine:hover:bg-k-kalk active:bg-k-fuge md:flex xl:flex-col xl:items-start',
            fokus('hell'),
          )}
        >
          <Icon name="telefon" groesse={20} />
          <span className="hidden k-mono text-k-1 whitespace-nowrap xl:inline">{contact.phone}</span>
        </a>

        <div className="hidden h-full shrink-0 md:flex">
          <Knopf href={HAUPTZIEL} className="h-full whitespace-nowrap">
            {TEXTE.hauptknopf}
          </Knopf>
        </div>

        <MenueSchalter />
        <MobilBlatt>
          <MobilInhalt />
        </MobilBlatt>
      </div>
    </header>
  );
}
