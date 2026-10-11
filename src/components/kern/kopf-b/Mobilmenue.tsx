'use client';

// Mobilmenü unter xl (Variante B „Achse“, F-13, V-06). Der Schalter öffnet das Blatt als natives Popover
// (`popovertarget` → `popover="auto"`, role="dialog" „Hauptnavigation“): Öffnen, Escape (Fokus zurück zum Schalter)
// und Schließen per Tippen außerhalb leistet der Browser – auch bevor React geladen ist; der Zustand bleibt beim
// Hydrieren stabil (das Skript liest ihn nur aus dem toggle-Ereignis bzw. `:popover-open`).
// Das Blatt liegt unter dem Kopf (top = --k-kopf-hoehe, bis zum unteren Rand); der Schalter bleibt sichtbar und wird
// zum Schließen-Zeichen. Client-JS ergänzt nur: aria-expanded und Zeichen, Scroll-Sperre, Fokus-Ring zwischen Schalter
// und Blatt (Tab), Bereiche aufklappen (aria-expanded), Schließen beim Folgen eines Links, beim Pfadwechsel und ab xl,
// Aufklappen über das Register (`aufklappen`; reduziert sofort).
import { usePathname } from 'next/navigation';
import { useEffect, useId, useRef, useState, type MouseEvent } from 'react';
import { fokus, verbinde } from '@/components/kern/basis';
import Icon from '@/components/kern/icons/Icon';
import MobilBlatt from '@/components/kern/kopf-b/MobilBlatt';
import {
  AB_XL,
  TEXT,
  aktiverBereich,
  aufklappenAb,
  aufklappenAuf,
  istOffen,
  menueName,
  type Eintrag,
  type Kontakt,
  type Ziel,
} from '@/components/kern/kopf-b/modell';
import { openWhatsApp } from '@/lib/whatsapp';

export type MobilmenueProps = {
  eintraege: Eintrag[];
  kontakt: Kontakt;
  anfrage: Ziel;
};

const FOKUSSIERBAR = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

function fokusZiele(wurzel: HTMLElement): HTMLElement[] {
  return Array.from(wurzel.querySelectorAll<HTMLElement>(FOKUSSIERBAR)).filter((el) => !el.closest('[inert]'));
}

export default function Mobilmenue({ eintraege, kontakt, anfrage }: MobilmenueProps) {
  const pfad = usePathname() || '/';
  const basisId = useId();
  const blattId = `k-kopf-b-mobil${basisId}`;
  const [offen, setOffen] = useState(false);
  const [bereich, setBereich] = useState<number | null>(() => aktiverBereich(pfad, eintraege));
  const blatt = useRef<HTMLDivElement>(null);
  const schalter = useRef<HTMLButtonElement>(null);
  const pfadRef = useRef(pfad);
  const letzterPfad = useRef(pfad);

  useEffect(() => {
    pfadRef.current = pfad;
  }, [pfad]);

  // toggle-Ereignis → Zustand, Scroll-Sperre, Aufklappen; ab xl schließen.
  useEffect(() => {
    const b = blatt.current;
    if (!b) return undefined;
    const wurzel = document.documentElement;
    let vorher: string | null = null;
    const sperren = () => {
      if (vorher !== null) return;
      vorher = wurzel.style.overflow;
      wurzel.style.overflow = 'hidden';
    };
    const freigeben = () => {
      if (vorher === null) return;
      wurzel.style.overflow = vorher;
      vorher = null;
    };
    const innen = () => b.querySelector(':scope > [data-motion="aufklappen"]');
    const vorToggle = (e: Event) => {
      if ((e as ToggleEvent).newState !== 'open') return;
      aufklappenAb(innen());
      // Beim Öffnen steht der aktive Bereich offen (wie im Bestand).
      setBereich(aktiverBereich(pfadRef.current, eintraege));
    };
    const nachToggle = (e: Event) => {
      const auf = (e as ToggleEvent).newState === 'open';
      aufklappenAuf(innen());
      setOffen(auf);
      if (auf) sperren();
      else freigeben();
    };
    b.addEventListener('beforetoggle', vorToggle);
    b.addEventListener('toggle', nachToggle);

    // Vor der Hydrierung geöffnet? Zustand nachziehen (asynchron, das Blatt bleibt offen).
    const sync = window.requestAnimationFrame(() => {
      if (istOffen(b)) {
        setOffen(true);
        sperren();
      }
    });

    const mq = window.matchMedia(AB_XL);
    const breite = () => {
      if (mq.matches && istOffen(b)) b.hidePopover();
    };
    mq.addEventListener('change', breite);

    return () => {
      window.cancelAnimationFrame(sync);
      b.removeEventListener('beforetoggle', vorToggle);
      b.removeEventListener('toggle', nachToggle);
      mq.removeEventListener('change', breite);
      freigeben();
    };
  }, [eintraege]);

  // Fokus-Ring: Tab nach dem letzten Ziel im Blatt → Schalter; Umschalt+Tab am Schalter → letztes Ziel im Blatt.
  useEffect(() => {
    if (!offen) return undefined;
    const tab = (e: KeyboardEvent) => {
      const b = blatt.current;
      const s = schalter.current;
      if (e.key !== 'Tab' || !b || !s) return;
      const ziele = fokusZiele(b);
      if (ziele.length === 0) return;
      const aktiv = document.activeElement;
      if (!e.shiftKey && aktiv === ziele[ziele.length - 1]) {
        e.preventDefault();
        s.focus();
      } else if (e.shiftKey && aktiv === s) {
        e.preventDefault();
        ziele[ziele.length - 1].focus();
      } else if (e.shiftKey && aktiv === ziele[0]) {
        e.preventDefault();
        s.focus();
      }
    };
    document.addEventListener('keydown', tab);
    return () => document.removeEventListener('keydown', tab);
  }, [offen]);

  // Pfadwechsel schließt das Blatt (nicht beim ersten Lauf).
  useEffect(() => {
    if (letzterPfad.current === pfad) return;
    letzterPfad.current = pfad;
    const b = blatt.current;
    if (istOffen(b)) b?.hidePopover();
  }, [pfad]);

  const schliessen = () => {
    const b = blatt.current;
    if (istOffen(b)) b?.hidePopover();
  };

  const beiWhatsApp = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    openWhatsApp({ phone: kontakt.whatsappNummer });
  };

  return (
    <div className="flex shrink-0 items-center border-l border-k-fuge pl-k-2 xl:hidden">
      <button
        ref={schalter}
        type="button"
        popoverTarget={blattId}
        aria-expanded={offen}
        aria-controls={blattId}
        aria-label={menueName(offen)}
        data-motion="druck"
        className={verbinde(
          'flex size-k-7 cursor-pointer items-center justify-center rounded-k-0 text-k-tinte pointer-fine:hover:bg-k-fliese active:bg-k-fuge',
          'forced-colors:border',
          fokus('hell'),
        )}
      >
        <Icon name={offen ? 'schliessen' : 'menue'} groesse={24} />
      </button>
      <div
        ref={blatt}
        id={blattId}
        popover="auto"
        role="dialog"
        aria-label={TEXT.dialog}
        className="inset-x-0 top-(--k-kopf-hoehe) bottom-0 h-auto w-full overflow-y-auto overscroll-contain bg-k-kalk text-k-tinte xl:hidden"
      >
        <div data-motion="aufklappen" data-offen="">
          <div>
            <MobilBlatt
              eintraege={eintraege}
              kontakt={kontakt}
              anfrage={anfrage}
              pfad={pfad}
              offen={bereich}
              idPraefix={blattId}
              umschalten={(i) => setBereich((o) => (o === i ? null : i))}
              beimFolgen={schliessen}
              beiWhatsApp={beiWhatsApp}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
