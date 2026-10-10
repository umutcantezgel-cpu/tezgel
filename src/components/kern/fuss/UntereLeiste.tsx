'use client';

// Untere Leiste (P3-07, KERN v1.2 K-003 Prinzip 7, K-011 „Mobil unten“, E-012): unter lg die einzige feste Ebene neben
// dem Kopf – drei gleich breite Felder mit 1-px-Fugen: Anrufen · WhatsApp · Aufmaß. Kein Ein-/Ausblenden per Scroll-Richtung.
// Daten wie im Bestand `src/components/layout/MobileBottomBar.tsx`: Telefon aus COMPANY_DATA (gleiches Ziel wie
// siteConfig.contact.phone.link), Anfrage-Ziel `/kontakt#express-anfrage`, zugängliche Namen wörtlich.
// WhatsApp: Mobil entfällt der schwebende Knopf; seine Funktion (seitenbezogener Text, Ereignis `whatsapp_click`,
// 450-ms-Sperre) liegt hier über den Hook `useWhatsAppKanal` (E-012). Ohne JavaScript öffnet der Link dasselbe Ziel.
// Wie im Bestand ausgeblendet auf den Funnel-Seiten, damit die Leiste keine Schritte verdeckt.
//
// Höhe – CSS-Variablen (Definition gehört nach `src/styles/kern.css`, Vorschlag in der Rückgabe P3-07):
//   --k-leiste-hoehe  sichtbare Leiste ohne Sicherheitsrand = calc(var(--spacing-k-7) + var(--k-fuge)) (48 px + 1 px Fuge); ab lg 0px
//   --k-leiste-sicher env(safe-area-inset-bottom, 0px); ab lg 0px
//   --k-leiste-platz  calc(var(--k-leiste-hoehe) + var(--k-leiste-sicher)) – belegter Raum unten; der Banner (P3-08) sitzt darüber.
// Platz für den Seiteninhalt schafft der Platzhalter vor der Leiste selbst (gleiche Höhe, im Fluss): er verschwindet mit
// der Leiste (ab lg, Funnel-Seiten), sodass kein Layout den Wert kennen muss.
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { MouseEvent } from 'react';
import { COMPANY_DATA } from '@/config/company';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { useWhatsAppKanal } from '@/lib/formulare/useWhatsAppKanal';
import { verbinde } from '@/components/kern/basis';
import Icon from '@/components/kern/icons/Icon';

// Funnel-Seiten ohne Leiste (Bestand MobileBottomBar: „Hide on dedicated interactive funnel pages to not block steps“).
const OHNE_LEISTE = ['/badanfrage', '/projekt-check', '/badplaner', '/konfigurator'] as const;

// Feld: ≥ 48 px hoch, ein Drittel der Breite (≥ 106 px bei 320 px); Zeichen über der Beschriftung.
// Fokus innen (die Leiste liegt am Bildschirmrand, ein äußerer Rahmen würde dort abgeschnitten).
const FELD = verbinde(
  'flex min-h-k-7 flex-col items-center justify-center gap-k-1 px-k-2 py-k-1',
  'k-text text-k-1 font-semibold',
  'focus-visible:outline-2 focus-visible:-outline-offset-4',
);
const HELL = 'bg-k-fliese text-k-tinte pointer-fine:hover:bg-k-kalk active:bg-k-fuge focus-visible:outline-k-tinte';
const TINTE = 'bg-k-tinte text-k-kalk pointer-fine:hover:bg-k-tinte-2 active:bg-k-tinte-2 focus-visible:outline-k-kalk';

export default function UntereLeiste() {
  const pathname = usePathname() || '';
  const { triggerWhatsAppAction, contextMessage } = useWhatsAppKanal(pathname);

  if (OHNE_LEISTE.some((teil) => pathname.includes(teil))) {
    return null;
  }

  const { contact } = COMPANY_DATA;

  const whatsApp = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    triggerWhatsAppAction();
  };

  return (
    <>
      {/* Platzhalter im Fluss: gleiche Höhe wie die Leiste, damit das Seitenende nicht verdeckt wird */}
      <div aria-hidden="true" className="min-h-k-7 border-t border-transparent pb-(--k-leiste-sicher) lg:hidden" />
      <aside
        aria-label="Schnellkontakt Daumenleiste"
        data-leiste="unten"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-k-fuge bg-k-fliese pb-(--k-leiste-sicher) lg:hidden"
      >
        <div className="grid grid-cols-3 gap-px bg-k-fuge">
          <a
            href={`tel:${contact.phoneLink}`}
            data-motion="druck"
            className={verbinde(FELD, HELL)}
            aria-label={`Fliesenverlegung Tezgel anrufen: ${contact.phone}`}
          >
            <Icon name="telefon" groesse={20} />
            <span>Anrufen</span>
          </a>
          <a
            href={buildWhatsAppUrl(contact.whatsappNumber, contextMessage)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={whatsApp}
            data-motion="druck"
            className={verbinde(FELD, HELL)}
            aria-label="WhatsApp-Chat starten"
          >
            <Icon name="whatsapp" groesse={20} />
            <span>WhatsApp</span>
          </a>
          <Link href="/kontakt#express-anfrage" data-motion="druck" className={verbinde(FELD, TINTE)}>
            <Icon name="kalender" groesse={20} />
            <span>Aufmaß</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
